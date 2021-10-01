var express = require('express');
var router = express.Router();


// 資料庫連線
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'four_db',
  port: 3306
});
conn.connect(function (err) {
  if (err) {
    console.log(JSON.stringify(err));
  }
});

/* GET users listing. */
router.get('/', function (req, res, next) {


  conn.query("select * from productlist",
    [],
    function (err, result) {
      // res.send(result[0]);
      var productNameAll = [];
      var productImgPath = [];
      var productIdAll = [];
      result.forEach((items, index) => {
        productNameAll.push(items.productName);
        productImgPath.push((items.imgPath));
        productIdAll.push(index + 1);
      });
      // res.send(productImgPath);

      res.render('product', {
        // 商品導覽列
        prodListId: ['v-allItems-tab', "v-motherboard-tab", "v-Memory-tab", "v-PowerSupplier-tab", "v-graphicsCard-tab", "v-CPU-tab"],
        prodListTarget: ['#v-allItems', "#v-motherboard", '#v-Memory', "#v-PowerSupplier", "#v-graphicsCard", "#v-CPU"],
        prodList: ['所有商品', '主機板', '記憶體', '電源供應器', '顯示卡', 'CPU'],
        // 商品列表
        prodImg: productImgPath,
        prodName: productNameAll,
        prodId: productIdAll,
        prodNameMotherboard: ['123'],
        prodNameMemory: ['456'],
        prodNamePowerSupplier: ['789'],
        prodNameGraphicsCard: ['111'],
        prodNameCPU: ['222']
      });
    });



});

// router.get('/detail/:id', function (req, res, next) {
//   res.send('prodist' + req.params.id);

// });

router.post('/parity', function (req, res, next) {
  if(req.session.productId==undefined)
    req.session.productId=[];
  req.session.productId.push( req.body.prodId);
  // console.log( req.session );
  // console.log( req.body );
  res.send("OK");
});



module.exports = router;
