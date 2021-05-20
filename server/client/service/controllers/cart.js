$( document ).ready(function() {
    const header = renderNavigationBar('cart');
    $("#header").append( header );
});


function addToCart(_id){
    console.log(_id);
    window.location.replace('cart.html');
  
}

function getCart()
{
    const ajaxCallParams = {};
    const ajaxDataParams = {};

    ajaxCallParams.Type = "GET"; // GET type function
    ajaxCallParams.Url = GET_CART; // Pass Complete end point Url e-g Payment Controller, Create Action
    ajaxCallParams.DataType = "JSON"; // Return data type e-g Html, Json etc

    let cart;

    ajaxCall(ajaxCallParams, ajaxDataParams, (result, data, settings) =>
    {

        console.log(result.status);

        // check qpi request is success
        if (result.status === 200)
        {
            // fetch the data
            cart = result.responseJSON;
            console.log(cart.data);

            let temp = "";

            cart.data.cart.map(cart => {

                console.log(cart)


                temp += "<tr>";
                temp += " <td className=\"cart_product_img\">";
                temp += "<a href=\"#\"><img src=\"./assets/images/bg-img/cart1.jpg\" alt=\"Product\"></a>";
                temp += "</td>";
                temp += " <td className=\"cart_product_desc\">";
                temp += " <h5>"+cart.name+"</h5>";
                temp += " </td>";
                temp += " <td className=\"price\">";
                temp += " <span>$130</span>";
                temp += "</td>";
                temp += " <td className=\"qty\">";
                temp += "<div className=\"qty-btn d-flex\">";
                temp += "<p>Qty</p>";
                temp += "<div className=\"quantity\">";
                temp += " <span className=\"qty-minus\"";
                temp += " onClick=\"var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty ) &amp;&amp; qty &gt; 1 ) effect.value--;return false;\">\" + \"<i";
                temp += "className=\"fa fa-minus\" aria-hidden=\"true\"></i></span>";
                temp += "<input type=\"number\" className=\"qty-text\" id=\"qty\" step=\"1\" min=\"1\" max=\"300\" ";
                temp += `name=\"quantity\" value="${cart.qty}">`;
                temp += " <span className=\"qty-plus\"";
                temp += "  onClick=\"var effect = document.getElementById('qty'); var qty = effect.value; if( !isNaN( qty )) effect.value++;return false;\"><i";
                temp += "className=\"fa fa-plus\" aria-hidden=\"true\"></i></span>";
                temp += " </div>";
                temp += " </div>";
                temp += " </td>";
                temp += "</tr>";
                // temp += "<td>" + itemData.employee_name + "</td>";
                // temp += "<td>" + itemData.employee_salary + "</td></tr>";
            });
            document.getElementById('cartData').innerHTML = temp;

        }else {
            console.log(result.status)
        }
        return cart;
    });
