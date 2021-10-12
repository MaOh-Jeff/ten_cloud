var express = require('express');
var router = express.Router();
var conn = require( './mysqlConnection');




router.get('/', function (req, res, next) {
  // console.log(req.session.productId);

  // 初始化比價車導覽列最初位置
  if( req.session.tempNavbar == undefined )
    req.session.tempNavbar = 0 ;

  // 比價車的排序編號初始化
  var productIdAllMotherboard = [];
  var productIdAllMemory = [];
  var productIdAllPowerSupplier = [];
  var productIdAllGraphicsCard = [];
  var productIdAllCPU = []; 

  // 如果session商品ID有資料、req.session.productId變成空字串
  if ( req.session.productId && req.session.productId != "" ) {

    var tatal = "?";
    var orderby = req.session.productId.toString();
    // ---初始化---
    // 比價車欄位初始化
    var parityAllMotherboard = [];
    var parityAllMemory = [];
    var parityAllPowerSupplier = [];
    var parityAllGraphicsCard = [];
    var parityAllCPU = [];
    // 比價車的欄位內容初始化
    var prodAllMotherboard = [];
    var prodAllMemory = [];
    var prodAllPowerSupplier = [];
    var prodAllGraphicsCard = [];
    var prodAllCPU = [];
    
    // 初始化各分類排列編號計數
    var countMotherboard = 0;
    var countMemory = 0;
    var countPowerSupplier = 0;
    var countGraphicsCard = 0;
    var countCPU = 0;
    
    // console.log(orderby);

    // 計算參數化查詢?個數
    for (var i = 0; i < req.session.productId.length - 1; i++) {
      tatal += ",?";
    }
    
    // 依照按鈕請求刪除session的商品ID
    // req.session.productId.splice(req.body.prodId, 1 );
    
    conn.query("select p_product.product_name, p_product.img_path, p_product.price, p_product_detail.specification, p_product.type_id from p_product JOIN p_product_detail on (p_product.product_id = p_product_detail.product_id ) where p_product_detail.product_id IN (" + tatal + ") order by field( p_product_detail.product_id," + orderby + ")",
      req.session.productId,
      function (err, result) {
        // console.log(result);
        // var parityAll = [];
        // var prodAll = [];
        
        
        result.forEach((items, index) => {
          // parityAll.push(items.productName);
          var temp = Object.values(items);
          // temp.splice(0, 1);
          
          // console.log( temp[4] ) ;

          // 將資料庫傳來的JSON字串轉成JSON物件
          var temp2 = JSON.parse( temp[3] );
          
          // console.log( Object.values( temp2 ) );

          


          // ----將傳來的商品分類
          // 電源供應器
          if( temp[4]==1 ){
            // 將資料庫的欄位的值傳入
            var prodTemp = [];
            for( var i=0; i<temp.length; i++){
              
              if( i == 3 ){
                // 將specification欄位內容的值傳入
                for(var k=0;k< Object.values( temp2 ).length;k++){
                  prodTemp.push( Object.values( temp2 )[k] );
                }
              }else if( i == 4){
                
              }else{
                prodTemp.push( temp[i] );
              }

              // console.log(prodTemp);

            }
            prodAllPowerSupplier.push( prodTemp );
            
            // 該分類比價車的商品順序編號
            productIdAllPowerSupplier.push(countPowerSupplier);
            countPowerSupplier+=1;

            // ----------------------------------------------------------
            // 將資料庫的欄位傳入--只做一次
            if( parityAllPowerSupplier.length == 0 ){
              // 抓取欄位
              var parityTemp = Object.keys(result[index]);
  
              // console.log(parityTemp);
  
              // 將欄位名稱輸入
              parityTemp.forEach((items,index) => {
                if( parityTemp[index] == 'product_name'){
                  parityAllPowerSupplier.push(parityTemp[index]);
                }
                if( parityTemp[index] == 'img_path'){
                  parityAllPowerSupplier.splice( 1 , 0 , parityTemp[index] );
                }
                if( parityTemp[index] == 'price'){
                  parityAllPowerSupplier.push(parityTemp[index]);
                }
                
              });
              // console.log(parityAll);
  
              // 將欄位specification轉成內容的key值
              var temp = Object.values( result[index] );
              var temp2 = JSON.parse( temp[3] );
              var temp3 = Object.keys( temp2 );
  
              // console.log( temp3 );
  
              temp3.forEach((items,index) =>{
                parityAllPowerSupplier.push(items);
              })
              // console.log(parityAllPowerSupplier);

              // // 資料庫的英文改中文
              parityAllPowerSupplier.forEach((items, index) => {
                if (items == 'product_name')
                  parityAllPowerSupplier[index] = "名稱";
                if (items == 'img_path')
                  parityAllPowerSupplier[index] = "商品圖片";
                if (items == 'price')
                  parityAllPowerSupplier[index] = "價格";
              
              });

            }

          }
          // 主機板
          if( temp[4]==2 ){
            // 將資料庫的欄位的值傳入
            var prodTemp = [];
            for( var i=0; i<temp.length; i++){
              
              if( i == 3 ){
                // 將specification欄位內容的值傳入
                for(var k=0;k< Object.values( temp2 ).length;k++){
                  prodTemp.push( Object.values( temp2 )[k] );
                }
              }else if( i == 4){
                
              }else{
                prodTemp.push( temp[i] );
              }

              // console.log(prodTemp);

            }
            prodAllMotherboard.push( prodTemp );
            
            // 該分類比價車的商品順序編號
            productIdAllMotherboard.push(countMotherboard);
            countMotherboard+=1;
            
            // ----------------------------------------------------------
            // 將資料庫的欄位傳入--只做一次
            if( parityAllMotherboard.length == 0 ){
              // 抓取欄位
              var parityTemp = Object.keys(result[index]);
  
              // console.log(parityTemp);
  
              // 將欄位名稱輸入
              parityTemp.forEach((items,index) => {
                if( parityTemp[index] == 'product_name'){
                  parityAllMotherboard.push(parityTemp[index]);
                }
                if( parityTemp[index] == 'img_path'){
                  parityAllMotherboard.splice( 1 , 0 , parityTemp[index] );
                }
                if( parityTemp[index] == 'price'){
                  parityAllMotherboard.push(parityTemp[index]);
                }
                
              });
              // console.log(parityAll);
  
              // 將欄位specification轉成內容的key值
              var temp = Object.values( result[index] );
              var temp2 = JSON.parse( temp[3] );
              var temp3 = Object.keys( temp2 );
  
              // console.log( temp3 );
  
              temp3.forEach((items,index) =>{
                parityAllMotherboard.push(items);
              })

              // 資料庫的英文改中文
              parityAllMotherboard.forEach((items, index) => {
                if (items == 'product_name')
                  parityAllMotherboard[index] = "名稱";
                if (items == 'img_path')
                  parityAllMotherboard[index] = "商品圖片";
                if (items == 'price')
                  parityAllMotherboard[index] = "價格";
                
              });

            }
            
          }
          // 記憶體
          if( temp[4]==3 ){
            // 將資料庫的欄位的值傳入
            var prodTemp = [];
            for( var i=0; i<temp.length; i++){
              
              if( i == 3 ){
                // 將specification欄位內容的值傳入
                for(var k=0;k< Object.values( temp2 ).length;k++){
                  prodTemp.push( Object.values( temp2 )[k] );
                }
              }else if( i == 4){
                
              }else{
                prodTemp.push( temp[i] );
              }

              // console.log(prodTemp);

            }
            prodAllMemory.push( prodTemp );
            
            // 該分類比價車的商品順序編號
            productIdAllMemory.push(countMemory);
            countMemory+=1;

            // ----------------------------------------------------------
            // 將資料庫的欄位傳入--只做一次
            if( parityAllMemory == 0  ){
              // 抓取欄位
              var parityTemp = Object.keys(result[index]);
  
              // console.log(parityTemp);
  
              // 將欄位名稱輸入
              parityTemp.forEach((items,index) => {
                if( parityTemp[index] == 'product_name'){
                  parityAllMemory.push(parityTemp[index]);
                }
                if( parityTemp[index] == 'img_path'){
                  parityAllMemory.splice( 1 , 0 , parityTemp[index] );
                }
                if( parityTemp[index] == 'price'){
                  parityAllMemory.push(parityTemp[index]);
                }
                
              });
              // console.log(parityAll);
  
              // 將欄位specification轉成內容的key值
              var temp = Object.values( result[index] );
              var temp2 = JSON.parse( temp[3] );
              var temp3 = Object.keys( temp2 );
  
              // console.log( temp3 );
  
              temp3.forEach((items,index) =>{
                parityAllMemory.push(items);
              })

              // 資料庫的英文改中文
              parityAllMemory.forEach((items, index) => {
                if (items == 'product_name')
                  parityAllMemory[index] = "名稱";
                if (items == 'img_path')
                  parityAllMemory[index] = "商品圖片";
                if (items == 'price')
                  parityAllMemory[index] = "價格";
               
              });

            }

          }
          // 顯示卡
          if( temp[4]==4 ){
            // 將資料庫的欄位的值傳入
            var prodTemp = [];
            for( var i=0; i<temp.length; i++){
              
              if( i == 3 ){
                // 將specification欄位內容的值傳入
                for(var k=0;k< Object.values( temp2 ).length;k++){
                  prodTemp.push( Object.values( temp2 )[k] );
                }
              }else if( i == 4){
                
              }else{
                prodTemp.push( temp[i] );
              }

              // console.log(prodTemp);

            }
            prodAllGraphicsCard.push( prodTemp );
            
            // 該分類比價車的商品順序編號
            productIdAllGraphicsCard.push(countGraphicsCard);
            countGraphicsCard+=1;

            // ----------------------------------------------------------
            // 將資料庫的欄位傳入--只做一次
            if( parityAllGraphicsCard == 0  ){
              // 抓取欄位
              var parityTemp = Object.keys(result[index]);
  
              // console.log(parityTemp);
  
              // 將欄位名稱輸入
              parityTemp.forEach((items,index) => {
                if( parityTemp[index] == 'product_name'){
                  parityAllGraphicsCard.push(parityTemp[index]);
                }
                if( parityTemp[index] == 'img_path'){
                  parityAllGraphicsCard.splice( 1 , 0 , parityTemp[index] );
                }
                if( parityTemp[index] == 'price'){
                  parityAllGraphicsCard.push(parityTemp[index]);
                }
                
              });
              // console.log(parityAll);
  
              // 將欄位specification轉成內容的key值
              var temp = Object.values( result[index] );
              var temp2 = JSON.parse( temp[3] );
              var temp3 = Object.keys( temp2 );
  
              // console.log( temp3 );
  
              temp3.forEach((items,index) =>{
                parityAllGraphicsCard.push(items);
              })

              // 資料庫的英文改中文
              parityAllGraphicsCard.forEach((items, index) => {
                if (items == 'product_name')
                  parityAllGraphicsCard[index] = "名稱";
                if (items == 'img_path')
                  parityAllGraphicsCard[index] = "商品圖片";
                if (items == 'price')
                  parityAllGraphicsCard[index] = "價格";
                
              });

            }

          }
          // CPU
          if( temp[4]==5 ){
            // 將資料庫的欄位的值傳入
            var prodTemp = [];
            for( var i=0; i<temp.length; i++){
              
              if( i == 3 ){
                // 將specification欄位內容的值傳入
                for(var k=0;k< Object.values( temp2 ).length;k++){
                  prodTemp.push( Object.values( temp2 )[k] );
                }
              }else if( i == 4){
                
              }else{
                prodTemp.push( temp[i] );
              }

              // console.log(prodTemp);

            }
            prodAllCPU.push( prodTemp );
            
            // 該分類比價車的商品順序編號
            productIdAllCPU.push(countCPU);
            countCPU+=1;

            // ----------------------------------------------------------
            // 將資料庫的欄位傳入--只做一次
            if( parityAllCPU == 0  ){
              // 抓取欄位
              var parityTemp = Object.keys(result[index]);
  
              // console.log(parityTemp);
  
              // 將欄位名稱輸入
              parityTemp.forEach((items,index) => {
                if( parityTemp[index] == 'product_name'){
                  parityAllCPU.push(parityTemp[index]);
                }
                if( parityTemp[index] == 'img_path'){
                  parityAllCPU.splice( 1 , 0 , parityTemp[index] );
                }
                if( parityTemp[index] == 'price'){
                  parityAllCPU.push(parityTemp[index]);
                }
                
              });
              // console.log(parityAll);
  
              // 將欄位specification轉成內容的key值
              var temp = Object.values( result[index] );
              var temp2 = JSON.parse( temp[3] );
              var temp3 = Object.keys( temp2 );
  
              // console.log( temp3 );
  
              temp3.forEach((items,index) =>{
                parityAllCPU.push(items);
              })

              // 資料庫的英文改中文
              parityAllCPU.forEach((items, index) => {
                if (items == 'product_name')
                  parityAllCPU[index] = "名稱";
                if (items == 'img_path')
                  parityAllCPU[index] = "商品圖片";
                if (items == 'price')
                  parityAllCPU[index] = "價格";
                
                
              });

            }

          }
          

          
        });

        // // 將購買網址URL改成a連結
        // parityAllPowerSupplier.forEach((items,index) =>{
        //   if (items == '購買網址'){
        //     for(var i=0; i< prodAllPowerSupplier.length ; i++ ){
        //       prodAllPowerSupplier[i][index] = "<a href= " + prodAllPowerSupplier[i][index] + ">點此前往</a>";
        //     }

        //   }

        // })

        // 將購買網址URL改成a連結
        function URLChangeArray ( parityArray, prodArray ){
          parityArray.forEach((items,index) =>{
            if (items == '購買網址' || items == '販售網址' ){
              for(var i=0; i< prodArray.length ; i++ ){
                prodArray[i][index] = "<a href= " + prodArray[i][index] + ">點此前往</a>";
              }
            }
          })
        }

        URLChangeArray( parityAllPowerSupplier, prodAllPowerSupplier );
        URLChangeArray( parityAllMotherboard, prodAllMotherboard );
        URLChangeArray( parityAllMemory, prodAllMemory );
        URLChangeArray( parityAllGraphicsCard, prodAllGraphicsCard );
        URLChangeArray( parityAllCPU, prodAllCPU );

        


        res.render('parity', {
          // 商品導覽列
          prodListId: [ "v-motherboard-tab", "v-Memory-tab", "v-PowerSupplier-tab", "v-graphicsCard-tab", "v-CPU-tab"],
          prodListTarget: [ "#v-motherboard", '#v-Memory', "#v-PowerSupplier", "#v-graphicsCard", "#v-CPU"],
          prodList: [ '主機板', '記憶體', '電源供應器', '顯示卡', 'CPU'],
          sessionProductId: req.session.productId,
          
          // ----------比價車
          // 比價車的欄位
          parityMotherboard: parityAllMotherboard,
          parityMemory: parityAllMemory,
          parityPowerSupplier: parityAllPowerSupplier,
          parityGraphicsCard: parityAllGraphicsCard,
          parityCPU: parityAllCPU,

          // 比價車的欄位內容
          prodMotherboard: prodAllMotherboard ,
          prodMemory: prodAllMemory ,
          prodPowerSupplier: prodAllPowerSupplier ,
          prodGraphicsCard: prodAllGraphicsCard ,
          prodCPU: prodAllCPU ,

          // 比價車的排序編號
          prodIdMotherboard:productIdAllMotherboard,
          prodIdMemory:productIdAllMemory,
          prodIdPowerSupplier:productIdAllPowerSupplier,
          prodIdGraphicsCard:productIdAllGraphicsCard,
          prodIdCPU:productIdAllCPU,

          // 找最後導覽列位置
          tempNavbar: req.session.tempNavbar



          // prodId: productIdAll,
          // prodNameMotherboard: ['123'],
          // prodNameMemory: ['456'],
          // prodNamePowerSupplier: ['789'],
          // prodNameGraphicsCard: ['111'],
          // prodNameCPU: ['222']
        });

      });
  } else {
    var productIdAll = [];
    // session的商品ID沒資料
    res.render('parity', {
      // 商品導覽列
      prodListId: [ "v-motherboard-tab", "v-Memory-tab", "v-PowerSupplier-tab", "v-graphicsCard-tab", "v-CPU-tab"],
      prodListTarget: [ "#v-motherboard", '#v-Memory', "#v-PowerSupplier", "#v-graphicsCard", "#v-CPU"],
      prodList: [ '主機板', '記憶體', '電源供應器', '顯示卡', 'CPU'],
      sessionProductId: req.session.productId,
      
      // 找最後導覽列位置
      tempNavbar: req.session.tempNavbar,

      // 比價車的排序編號
      prodIdMotherboard:productIdAllMotherboard,
      prodIdMemory:productIdAllMemory,
      prodIdPowerSupplier:productIdAllPowerSupplier,
      prodIdGraphicsCard:productIdAllGraphicsCard,
      prodIdCPU:productIdAllCPU,


      // 比價車
      // parity: parityAll,
      // prod: prodAll

      // prodId: productIdAll,
      // prodNameMotherboard: ['123'],
      // prodNameMemory: ['456'],
      // prodNamePowerSupplier: ['789'],
      // prodNameGraphicsCard: ['111'],
      // prodNameCPU: ['222']
    });
  }






});


router.post('/delete', function (req, res, next) {

  // console.log(req.session.productId);
  // console.log(req.body.prodId);
  // 刪除比價車選擇的商品編號的商品
  req.session.productId.splice(req.body.prodId, 1 );
  
   // 儲存比價車最後導覽列位置
  req.session.tempNavbar = req.body.tempNavbar ;

  res.send( "已刪除" );

});




module.exports = router;
