var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    var memberData = req.session.user;
    var data =JSON.parse(JSON.stringify(memberData.data));
    var member_id = data[0].member_id;
    var sql = 'call fsp_member_forum_search(?);'
    var data = [member_id]
    // console.log(member_id);
    db.exec(sql, data, function(results, fields){
        console.log(results);
        var forum_search = results[0];
        var title = [];
        var forum_id = forum_search[0].forum_id;
        forum_search.forEach((item,index) => {
            title.push(item.title)
        });
        console.log(forum_id);
        res.render('published',{
            title: title,
            forum_id: forum_id 
        })
    })
});




module.exports = router;