function login(){
    $('.err-message').addClass('d-none');

    // validation
    const email = $('#txtUserName').val();
    const password = $('#txtPassword').val();

    if(email.length === 0){
        $('.err-username').removeClass('d-none');
        return;
    }else{
        $('.err-username').addClass('d-none');
    }

    if(password.length === 0){
        $('.err-password').removeClass('d-none');
        return;
    }else{
        $('.err-password').addClass('d-none');
    }

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "POST"; // POST type function
    ajaxCallParams.Url = AUTH_END_POINT; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    // Set Data parameters
    ajaxDataParams.email = email;
    ajaxDataParams.password = password;

    ajaxCall(ajaxCallParams, ajaxDataParams, function (result, data, settings){

        // check qpi request is success
        if(result.status === 200){
            // fetch the data
            const authData = result.responseJSON;

            // get current session and set nessary data
            const sessionData = getSession();
            sessionData.authenticated = true;
            sessionData.token = authData.data.token;
            sessionData.authData = authData.data;

            // save data to session
            SetSession(sessionData);

            // check if the logged user is admin
            if(authData.data.user.role.name === 'Administrator'){
                window.location.replace('index.html');
            }else{
                window.location.replace('../index.html');
            }

            return;
        }

        // show the error message
        $('.err-message').removeClass('d-none').html(result.responseJSON.message);
    });
}
