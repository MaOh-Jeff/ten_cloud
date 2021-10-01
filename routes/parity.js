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


/* GET home page. */
router.get('/', function (req, res, next) {
  // console.log(req.session.productId);

  if (req.session.productId) {
    var tatal = "?";
    var orderby = req.session.productId.toString();
    var parityAll = [];
    var prodAll = [];
    // console.log(orderby);
    // 計算參數化查詢?個數
    for (var i = 0; i < req.session.productId.length - 1; i++) {
      tatal += ",?";
    }
    var productIdAll = [];
    conn.query("select * from productlist where id in (" + tatal + ") order by field(id," + orderby + ")",
      req.session.productId,
      function (err, result) {
        // console.log(JSON.stringify(result));
        // var parityAll = [];
        // var prodAll = [];
        

        result.forEach((items, index) => {
          // parityAll.push(items.productName);
          var temp = Object.values(items);
          temp.splice(0, 1);
          prodAll.push(temp);
          parityAll = Object.keys(items);
          parityAll.splice(0, 1);
          productIdAll.push(index+1);
        });
        parityAll.forEach((items, index) => {
          if (items == 'productName')
            parityAll[index] = "名稱";
          if (items == 'imgPath')
            parityAll[index] = "商品圖片";
          if (items == '購買網址') {
            for (var i = 0; i < prodAll.length; i++) {
              prodAll[i][index] = "<a href= " + prodAll[i][index] + ">點此前往</a>"
            }
            // console.log(prodAll[0][index]);
          }
        })

        // console.log(prodAll);



        res.render('parity', {
          // 商品導覽列
          prodListId: ['v-allItems-tab', "v-motherboard-tab", "v-Memory-tab", "v-PowerSupplier-tab", "v-graphicsCard-tab", "v-CPU-tab"],
          prodListTarget: ['#v-allItems', "#v-motherboard", '#v-Memory', "#v-PowerSupplier", "#v-graphicsCard", "#v-CPU"],
          prodList: ['所有商品', '主機板', '記憶體', '電源供應器', '顯示卡', 'CPU'],
          session: req.session.productId,
          
          // 比價車
          parity: parityAll,
          prod: prodAll ,
          prodId:productIdAll

          // prodId: productIdAll,
          // prodNameMotherboard: ['123'],
          // prodNameMemory: ['456'],
          // prodNamePowerSupplier: ['789'],
          // prodNameGraphicsCard: ['111'],
          // prodNameCPU: ['222']
        });

      });
  } else {
    res.render('parity', {
      // 商品導覽列
      prodListId: ['v-allItems-tab', "v-motherboard-tab", "v-Memory-tab", "v-PowerSupplier-tab", "v-graphicsCard-tab", "v-CPU-tab"],
      prodListTarget: ['#v-allItems', "#v-motherboard", '#v-Memory', "#v-PowerSupplier", "#v-graphicsCard", "#v-CPU"],
      prodList: ['所有商品', '主機板', '記憶體', '電源供應器', '顯示卡', 'CPU'],
     
     
      session: req.session.productId,
      prod: prodAll,
      prodId:productIdAll
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
  
  res.send("delete");
});




module.exports = router;
