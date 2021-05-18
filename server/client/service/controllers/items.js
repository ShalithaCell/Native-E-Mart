function getAllItems()
{


    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_ITEMS; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc


    let items;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {

        console.log(result);
        console.log('inside');

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            items = result.responseJSON;
            console.log(items.data);

            let temp = "";

            items.data.category.map(item => {

                console.log(item)
                temp += "<tr>";
                temp += "<td>" + item.name + "</td>";
                temp += "<td>" + item.description + "</td>";
                temp += "<td>" + item.itemCode + "</td>";
                temp += "<td>" + item.buyPrice + "</td>";
                temp += "<td>" + item.sellPrice + "</td>";
                temp += "<td>" + item.weight + "</td>";
                temp += "<td>" + item.quantity + "</td>";
                temp += "<td>" + item.category + "</td></tr>";
            });

            document.getElementById('itemData').innerHTML = temp;

        }else {
            console.log(result.status)
        }

        return items;


    });

}
function addItem(){

    console.log('inside');

    let categoryName = $('#category-name').val();

    // check validations
    if (categoryName.length <= 0)
    {
        $('.err-categoryName').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-categoryName').addClass('d-none');
    }

    // set the api call
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "POST"; // POST type function
    ajaxCallParams.Url = Add_CATEGORY; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    // Set Data parameters
    ajaxDataParams.name = categoryName;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        // check qpi request is success
        if (result.status === 200)
        {
            console.log("add category success");
            window.location.href = '../../dashboard/category.html';
        }
        else if (result.status === 403)
        {
            // show the error message
            $('.err-categoryName').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
        }
        else if (result.status === 400)
        {
            // show the error message
            $('.err-categoryName').removeClass('d-none').html(result.responseJSON.message);
        }
    });


}