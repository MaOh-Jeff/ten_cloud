$( function() {
    $("#compare_product").dialog({
        autoOpen: false,
        show: {
            effect: "clip",
            duration: 750
        },
        hide: {
            effect: "explode",
            duration: 750
        },
        draggable: false,
        resizable : false,
        modal: true,
        width: "750",
        position: {
            my: "center",
            at: "center",
            of: window,
            collision: "fit"
        },
    });

    $(".compare_click").on( "click", async function(event) {
        var compare_list = new Object();
        // 取得編號
        var product_01 = $(this).find("input[name='product_01']").val();
        var product_02 = $(this).find("input[name='product_02']").val();
        var data_json = `{"product_01":"${product_01}", "product_02":"${product_02}"}`;

        // 使用 API 取得 商品資訊
        await $.ajax({
            type: "POST",
            url: "/compare",
            data: data_json,
            contentType: "application/json",
            success: function(result){
                // console.log(result);
                compare_list = result;
            }
        });

        // 裝填資訊
        console.log(1, compare_list);
        var info_html = '';
        // combination card info
        // title
        $("#compare_product").dialog( "option", "title", compare_list.product_01.type);

        info_html = `<img src="${compare_list.product_01.img_path}" class="card-img-top" alt="">`;
        info_html += `<div class="card-body" style="font-weight: 600;">商品名稱：${compare_list.product_01.product_name}</div>`;
        var compareKey = compare_list.product_01.specification_key;
        var compareValue = compare_list.product_01.specification_value;
        for(i=0; i< compareKey.length; i++){
            if(compareValue[i].length < 15){
                info_html += `<div class="card-body">${compareKey[i]}：${compareValue[i]}</div>`;
            }
        }
        info_html += `<div class="card-body">價錢：$${compare_list.product_01.price}</div>`;
        $("#compare_01").html(info_html);

        info_html = `<img src="${compare_list.product_02.img_path}" class="card-img-top" alt="">`;
        info_html += `<div class="card-body" style="font-weight: 600;">商品名稱：${compare_list.product_02.product_name}</div>`;
        var compareKey = compare_list.product_02.specification_key;
        var compareValue = compare_list.product_02.specification_value;
        for(i=0; i< compareKey.length; i++){
            if(compareValue[i].length < 15){
                info_html += `<div class="card-body">${compareKey[i]}：${compareValue[i]}</div>`;
            }
        }
        info_html += `<div class="card-body">價錢：$${compare_list.product_02.price}</div>`;
        $("#compare_02").html(info_html);


        // Show compare Dialog
        $("#compare_product").dialog( "open" );
        // stop
        event.stopPropagation();
    });

    // 點選空白處, 關閉卡片資訊
    $(document).on("click", function(event){
        var c_modal = $("#compare_product");

        if(!c_modal.is(event.target) && c_modal.has(event.target).length === 0){ // Mark 1
            $("#compare_product").dialog("close");
        }
        // $("#compare_product").dialog("close");
    });
} );