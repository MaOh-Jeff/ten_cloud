var express = require('express');
var router = express.Router();
var conn = require( './mysqlConnection');



router.get('/', function (req, res, next) {

  conn.query("select * from p_product",
  [],
  function (err, result) {
    // 初始化
    var productNameAll = [];
    var productImgPath = [];
    var productIdAll = [];

    // console.log(result);

    result.forEach((items, index) => {
      productNameAll.push(items.product_name);
      productImgPath.push((items.img_path));
      productIdAll.push( items.product_id );
    });
    // res.send(result[0]);

    // ------------主機板---------------
    conn.query("select * from p_product where type_id=2 ",
    [],
    function (err, result){
      // 初始化
      var productNameMotherboardAll = [];
      var productImgPathMotherboard = [];
      var productIdMotherboardAll = [];
      // console.log(result);

      result.forEach((items, index) => {
        productNameMotherboardAll.push(items.product_name);
        productImgPathMotherboard.push((items.img_path));
        productIdMotherboardAll.push( items.product_id );
      });

      // -----------------------記憶體---------------------
      conn.query("select * from p_product where type_id=3 ",
      [],
      function (err, result){
        // 初始化
        var productNameMemoryAll = [];
        var productImgPathMemory = [];
        var productIdMemoryAll = [];

        result.forEach((items, index) => {
          productNameMemoryAll.push(items.product_name);
          productImgPathMemory.push((items.img_path));
          productIdMemoryAll.push( items.product_id );
        });
        // --------------------------電源供應器-----------------------------
        conn.query("select * from p_product where type_id=1 ",
        [],
        function (err, result){
          // 初始化
          var productNamePowerSupplierAll = [];
          var productImgPathPowerSupplier = [];
          var productIdPowerSupplierAll = [];

          result.forEach((items, index) => {
            productNamePowerSupplierAll.push(items.product_name);
            productImgPathPowerSupplier.push((items.img_path));
            productIdPowerSupplierAll.push( items.product_id );
          });

          // --------------------------顯示卡-----------------------------
          conn.query("select * from p_product where type_id=4 ",
          [],
          function (err, result){
            // 初始化
            var productNameGraphicsCardAll = [];
            var productImgPathGraphicsCard = [];
            var productIdGraphicsCardAll = [];

            result.forEach((items, index) => {
              productNameGraphicsCardAll.push(items.product_name);
              productImgPathGraphicsCard.push((items.img_path));
              productIdGraphicsCardAll.push( items.product_id );
            });

            // --------------------------CPU-----------------------------
            conn.query("select * from p_product where type_id=5 ",
            [],
            function (err, result){
              // 初始化
              var productNameCPUAll = [];
              var productImgPathCPU = [];
              var productIdCPUAll = [];

              result.forEach((items, index) => {
                productNameCPUAll.push(items.product_name);
                productImgPathCPU.push((items.img_path));
                productIdCPUAll.push( items.product_id );
              });


              res.render('product', {
                // 商品導覽列
                prodListId: ['v-allItems-tab', "v-motherboard-tab", "v-Memory-tab", "v-PowerSupplier-tab", "v-graphicsCard-tab", "v-CPU-tab"],
                prodListTarget: ['#v-allItems', "#v-motherboard", '#v-Memory', "#v-PowerSupplier", "#v-graphicsCard", "#v-CPU"],
                prodList: ['所有商品', '主機板', '記憶體', '電源供應器', '顯示卡', 'CPU'],
                // --商品列表--
                // 所有商品
                prodName: productNameAll,
                prodImg: productImgPath,
                prodId: productIdAll,
                // 主機板
                prodNameMotherboard: productNameMotherboardAll,
                prodImgMotherboard: productImgPathMotherboard,
                prodIdMotherboard: productIdMotherboardAll,
                // 記憶體
                prodNameMemory: productNameMemoryAll,
                prodImgMemory: productImgPathMemory,
                prodIdMemory: productIdMemoryAll,
                // 電源供應器
                prodNamePowerSupplier: productNamePowerSupplierAll,
                prodImgPowerSupplier: productImgPathPowerSupplier,
                prodIdPowerSupplier: productIdPowerSupplierAll,
                // 顯示卡
                prodNameGraphicsCard: productNameGraphicsCardAll,
                prodImgGraphicsCard: productImgPathGraphicsCard,
                prodIdGraphicsCard: productIdGraphicsCardAll,
                // CPU
                prodNameCPU: productNameCPUAll,
                prodImgCPU: productImgPathCPU,
                prodIdCPU: productIdCPUAll,
      
              });
              
            });
            

          });

          


        });


        
      });

      

    });

    
    
  });



});

// router.get('/detail/:id', function (req, res, next) {
//   res.send('prodist' + req.params.id);

// });

router.post('/parity', function (req, res, next) {
  if(req.session.productId==undefined)
    req.session.productId=[];
  // 將點選的商品編號加入session
  req.session.productId.push( req.body.prodId);
  // 從session去除重複的商品編號
  req.session.productId = req.session.productId.filter(function(element, index, arr){
    return arr.indexOf(element) === index ;
  })
  // console.log( req.session );
  // console.log( req.body.prodId );
  res.send("OK");
});



module.exports = router;
