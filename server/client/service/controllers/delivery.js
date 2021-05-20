function getAllDelivery()
{


    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_ALL_DELIVERY; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc


    let deliverys;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {

        console.log(result);
        console.log('inside');

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            deliverys = result.responseJSON;
            console.log(deliverys.data);

            let temp = "";

            deliverys.data.deliver.map(delivery => {
               console.log(delivery)
                temp += "<tr>";
                temp += "<td>" + delivery.deliveryId + "</td>";
                temp += "<td>" + delivery.name + "</td>";
                temp += "<td>" + delivery.address + "</td>";
                temp += "<td>" + delivery.email + "</td>";
                temp += "<td>" + delivery.phone + "</td>";
                temp += "<td>" + delivery.cashOnDelivery + "</td>";
                temp += "<td>" + delivery.deliveryType + "</td>";
                temp += "<td>" + delivery.costPerKm + "</td></tr>";

            });

            document.getElementById('deliveryData').innerHTML = temp;

        }else {
            console.log(result.status)
        }

        return deliverys;


    });

}

function addDelivery(){

    console.log('inside');

    let deliveryId  = $('#delivery-Id').val();

    // check validations
    if (deliveryId.length <= 0)
    {
        $('.err-deliveryId').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryId').addClass('d-none');
    }

    // set the api call
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "POST"; // POST type function
    ajaxCallParams.Url = Add_CATEGORY; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    // Set Data parameters
    ajaxDataParams.name = deliveryId;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        // check qpi request is success
        if (result.status === 200)
        {
            console.log("Add deliver details success");
            window.location.href = '../../dashboard/delivery.html';
        }
        else if (result.status === 403)
        {
            // show the error message
            $('.err-deliveryId').removeClass('d-none').html(`${result.responseJSON.message}, ${result.responseJSON.data.message.message}`);
        }
        else if (result.status === 400)
        {
            // show the error message
            $('.err-deliveryId').removeClass('d-none').html(result.responseJSON.message);
        }
    });
}
function editDelivery(){

}
function deleteDelivery(){

}
