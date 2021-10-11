var express = require('express');
var router = express.Router();
var db = require('../database/ten_cloud.js');
var moment = require("moment");

/* GET home page. */
router.get('/', function(req, res, next) {
  const homePage = new Object();

  db.queryAsync("call fsp_HomePage_carousel_rand_search(?);", [15])
    .then(result_recommended_list => {
      // console.log(1, result_recommended_list[0]);
      homePage.recommended_list = result_recommended_list[0];
      return db.queryAsync("call fsp_HomePage_top_forum_search(?);", [3]);
    })
    .then(result_forum_list => {
      // console.log(1, result_forum_list[0]);
      homePage.forum_list = result_forum_list[0];
      return db.queryAsync("call fsp_HomePage_latest_product_search(?);", [5]);
    })
    .then(result_product_list => {
      // console.log(2, result_product_list[0]);
      homePage.product_list = result_product_list[0];
      return db.queryAsync("call fsp_HomePage_hot_compare_search(?);", [2]);
    })
    .then(result_compare_list => {
      // console.log(3, result_compare_list[0]);
      homePage.compare_list = result_compare_list[0];

      // console.log(homePage);
      res.render(
        'index',
        {
          recommended_list: homePage.recommended_list,
          forum_list: homePage.forum_list,
          product_list: homePage.product_list,
          compare_list: homePage.compare_list,
          moment: moment
        }
      );
    })
    .catch(exception => {
      console.log(exception);
    });

});

/* Get Compare Product Info */
router.post('/compare', function(req, res, next){
  const compare_list = new Object();
    
  db.queryAsync("call fsp_product_detail_search(?);", [req.body.product_01])
    .then(result_product_01 => {
      // console.log('商品1', result_product_01[0][0]);
      var specification_json = JSON.parse(result_product_01[0][0].specification);
      result_product_01[0][0].specification_key = Object.keys(specification_json);
      result_product_01[0][0].specification_value = Object.values(specification_json);

      compare_list.product_01 = result_product_01[0][0];
      return db.queryAsync("call fsp_product_detail_search(?);", [req.body.product_02]);
    })
    .then(result_product_02 => {
      // console.log('商品2', result_product_02[0][0]);
      var specification_json = JSON.parse(result_product_02[0][0].specification);
      result_product_02[0][0].specification_key = Object.keys(specification_json);
      result_product_02[0][0].specification_value = Object.values(specification_json);

      compare_list.product_02 = result_product_02[0][0];

      // console.log(compare_list);
      res.send(compare_list);
    })
    .catch(exception => {
      console.log(exception);
    });
});

module.exports = router;