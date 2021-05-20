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

                console.log(category)
                temp += "<tr>";
                temp += "<td>" + category.name + "</td>";
                temp += "<td><button class=\"btn btn-warning\" onClick=editCategory()>Edit</button></td>";
                temp += "<td><button class=\"btn btn-danger\" onClick=deleteCategory()>Delete</button></td>";
                temp += "</tr>";
                // temp += "<td>" + itemData.employee_name + "</td>";
                // temp += "<td>" + itemData.employee_salary + "</td></tr>";
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
function editCategory(){

}
function deleteCategory(){

}
