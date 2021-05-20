$( document ).ready(function() {
    const header = renderNavigationBar('cart');
    $("#header").append( header );
});

function addToCart(_id){
    console.log(_id);
    window.location.replace('cart.html');
}
