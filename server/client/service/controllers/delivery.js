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

            deliverys.data.deliver.map((delivery) =>
            {
               console.log(delivery)
                temp += "<tr>";
                temp += "<td>" + delivery.deliveryId + "</td>";
                temp += "<td>" + delivery.name + "</td>";
                temp += "<td>" + delivery.address + "</td>";
                temp += "<td>" + delivery.email + "</td>";
                temp += "<td>" + delivery.phone + "</td>";
                temp += "<td>" + delivery.cashOnDelivery + "</td>";
                temp += "<td>" + delivery.deliveryType + "</td>";
                temp += "<td>" + delivery.costPerKm + "</td>";
                temp += `<td><button class=\"btn btn-warning\" onClick=editDelivery("${delivery._id}")>Edit</button></td>`;
                temp += `<td><button class=\"btn btn-danger\" onClick=deleteDelivery("${delivery._id}")>Delete</button></td></tr>`;

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
    let deliveryName  = $('#delivery-name').val();
    let deliveryAddress  = $('#delivery-address').val();
    let deliveryEmail  = $('#delivery-email').val();
    let deliveryPhone  = $('#delivery-phone').val();
    let deliveryCashOnDelivery = $('#delivery-cashOnDelivery').val();
    let deliveryType  = $('#delivery-Type').val();
    let deliveryCost  = $('#delivery-Cost').val();

    // check validations - delivery id
    if (deliveryId.length <= 0)
    {
        $('.err-deliveryId').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryId').addClass('d-none');
    }

    // check validations - deliveryName
    if (deliveryName.length <= 0)
    {
        $('.err-deliveryName').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryName').addClass('d-none');
    }

    // check validations - deliveryAddress
    if (deliveryAddress.length <= 0)
    {
        $('.err-deliveryAddress').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryAddress').addClass('d-none');
    }

    // check validations - deliveryEmail
    if (deliveryEmail.length <= 0)
    {
        $('.err-deliveryEmail').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryEmail').addClass('d-none');
    }

    // check validations - deliveryPhone
    if (deliveryPhone.length <= 0)
    {
        $('.err-deliveryPhone').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryPhone').addClass('d-none');
    }


    // check validations - deliveryCashOnDelivery
    if (deliveryCashOnDelivery.length <= 0)
    {
        $('.err-deliveryCashOnDelivery').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryCashOnDelivery').addClass('d-none');
    }

    // check validations - deliveryType
    if (deliveryType.length <= 0)
    {
        $('.err-deliveryType').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryType').addClass('d-none');
    }

    // check validations - deliveryCost
    if (deliveryCost.length <= 0)
    {
        $('.err-deliveryCost').removeClass('d-none');

        return;
    }
    else
    {
        $('.err-deliveryCost').addClass('d-none');
    }


    // set the api call
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "POST"; // POST type function
    ajaxCallParams.Url = ADD_DELIVERY; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    // Set Data parameters

    ajaxDataParams.deliveryId = deliveryId;
    ajaxDataParams.name = deliveryName;
    ajaxDataParams.address = deliveryAddress;
    ajaxDataParams.email = deliveryEmail;
    ajaxDataParams.phone = deliveryPhone;
    ajaxDataParams.cashOnDelivery = deliveryCashOnDelivery;
    ajaxDataParams.deliveryType = deliveryType;
    ajaxDataParams.costPerKm = deliveryCost;

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


function deleteDelivery(_id)
{
    console.log(_id);

    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "DELETE"; // GET type function
    ajaxCallParams.Url = DELETE_DELIVERY+`${_id}`; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {
        // check qpi request is success
        if (result.status === 200)
        {
            console.log("Delete Delivery Details Success.");
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

