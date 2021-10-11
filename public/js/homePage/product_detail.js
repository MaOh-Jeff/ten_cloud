$(function(){
    $(".single_product").on('click', function(event){
        var product_id = $(this).find("input[name='product_id']").val();
        // console.log(product_id);
        var url = "/productDetail/" + product_id;
    
        window.location.href = url;
    });
})