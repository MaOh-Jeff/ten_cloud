$(function(){
    $(".top_forum").on('click', function(event){
        var forum_id = $(this).find("input[name='forum_id']").val();
        // console.log(product_id);
        var url = "/article/" + forum_id;
    
        window.location.href = url;
    });
})