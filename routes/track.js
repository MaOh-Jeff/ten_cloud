var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    var memberData = req.session.user;
    var data =JSON.parse(JSON.stringify(memberData.data));
    var member_id = data[0].member_id;
    var sql = 'call fsp_focus_count(?);'
    var data = [member_id]
    // console.log(member_id);
    db.exec(sql, data, function(results, fields){
        var focus_count = results[0];
        var tracknum = focus_count[0].count;
        // console.log(data);
        var sql = 'call fsp_focus_search(?, ?, ?);'					
        var data = [member_id,tracknum,1]
        db.exec(sql, data, function(results, fields) {
            console.log(results);
            var focus_search = JSON.parse(JSON.stringify(results));
            var focus_search_num = focus_search[0]
            var product_id = [];
            var product_name = [];
            var img_path = [];
            focus_search_num.forEach((item, index) => {
                product_name.push(item.product_name);
                img_path.push((item.img_path));
                
              });
            console.log(product_name);
            res.render('track',{
                tracknum: tracknum,
                product_id : product_id,
                product_name : product_name,
                img_path : img_path
            });
        })
    })
});




module.exports = router;