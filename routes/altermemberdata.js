var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('altermemberdata');
});

router.post('/',function(req,res){
    var body = req.body
    console.log(body);
    var memberData = req.session.user;
    var data =JSON.parse(JSON.stringify(memberData.data));
    var member_id = data[0].member_id;
    console.log(member_id);
    var sql = `call fsp_member_edit(?, ?, ?, ?, ?);`
    var data = [member_id,body.password,body.full_name,body.nickname,body.email]
    db.exec(sql, data, function(results, fields) {
      console.log(results);
})
});



module.exports = router;
