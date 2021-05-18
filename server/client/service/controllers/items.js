function getAllItems()
{

    console.log("called 2");

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_ITEMS; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    console.log("called 3");

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