function getAllCategories()
{
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_CATEGORIES; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let categories;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {

        console.log(result);

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            categories = result.responseJSON;
            console.log(categories.data);

            let temp = "";

            categories.data.category.map(category => {


                // console.log(category._id)
                temp += "<tr>";
                temp += "<td>" + category.name + "</td>";
                temp += `<td><button class=\"btn btn-warning\" onClick=editCategory("${category._id}")>Edit</button></td>`;
                temp += `<td><button class=\"btn btn-danger\" onClick=deleteCategory("${category._id}")>Delete</button></td>`;
                temp += "</tr>";
            });
            document.getElementById('categoryData').innerHTML = temp;

        }else {
            console.log(result.status)
        }
        return categories;
    });

}

function addCategory(){

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


function editCategory(_id){

    console.log(_id)

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_CATEGORY_BY_ID + `${_id}`; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let categories='';

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {

        console.log(result);

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            categories = result.responseJSON;
            console.log(category.data);

        }else {
            console.log(result.status)
        }
        // return category;
    });

    categories.map(category => {

        category.name = this.$content.find('.categoryName').val();

    });



    $.confirm({
        title: 'Edit Category!',
        content: '' +
            '<form action="" class="formName">' +
            '<div class="form-group">' +
            '<label>Category Name</label>' +
            '<input type="text" placeholder="Category Name" class="categoryName form-control" required />' +
            '</div>' +
            '</form>',
        buttons: {
            formSubmit: {
                text: 'Submit',
                btnClass: 'btn-blue',
                action: function () {
                    let name = this.$content.find('.categoryName').val();
                    if(!name){
                        $.alert('provide a valid name');
                        return false;
                    }


                    // $.alert('Category updated');
                    window.location.href = '../../dashboard/category.html';
                }
            },
            cancel: function () {
                //close
            },
        },
        onContentReady: function () {
            // bind to events
            var jc = this;

            this.$content.find('form').on('submit', function (e) {
                // if the user submits the form by pressing enter in the field.
                e.preventDefault();
                jc.$$formSubmit.trigger('click'); // reference the button and click it








            });
        }
    });

}



function deleteCategory(_id){
    console.log(_id)

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "DELETE"; // GET type function
    ajaxCallParams.Url = DELETE_CATEGORY+`${_id}`; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

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
