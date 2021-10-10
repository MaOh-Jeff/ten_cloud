var express = require('express');
var router = express.Router();
var db = require('../database/db.js');
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

module.exports = router;