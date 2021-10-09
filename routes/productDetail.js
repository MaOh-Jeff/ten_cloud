var express = require('express');
var router = express.Router();
var conn = require( './mysqlConnection');


router.get('/:id', function(req, res, next) {

  // console.log(req.params.id);
  conn.query('select p_product.product_name, p_product.img_path, p_product.price, p_product_detail.specification, p_product.type_id,p_product_detail.description from p_product JOIN p_product_detail on (p_product.product_id = p_product_detail.product_id ) where p_product_detail.product_id IN ( '+ req.params.id +')' ,
    [],
    function(err,result){
      // 去除imgPath的'.'，將相對路徑改成絕對路徑
      var imgpath = result[0].img_path.replace(".","");
      
      var temp = JSON.parse(result[0].specification);
      var Title = Object.keys( temp );
      var Content = Object.values( temp );

      
      // 將購買網址URL改成a連結
      Title.forEach((items,index) => {
        if(items == "購買網址" || items == "販售網址" ){
          Content[index] = "<a href= " + Content[index] + ">點此前往</a>";
        }
      });


      console.log( result[0].description  );






      res.render('productDetail',{
    
        prodName: result[0].product_name,
        prodImg: imgpath,
        prodPrice: result[0].price,
        specificationTitle: Title,
        specificationContent: Content,
        description: result[0].description
      });

  });



  












});

module.exports = router;
