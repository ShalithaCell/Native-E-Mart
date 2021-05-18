function getAllCategories()
{

    console.log("called 2");

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_CATEGORIES; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    console.log("called 3");

    let categories;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {

        console.log(result);
        console.log('inside');

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

}