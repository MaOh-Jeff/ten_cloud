var express = require('express');
var router = express.Router();
var db = require('../db/db');
var { Success, Error } = require('../response');

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
      var results = JSON.stringify(results[0])
      if (results.includes('修改成功') != false) {
        res.send(
          JSON.stringify(new Success('login success'))
        )
      }
      else{
        res.end(
          JSON.stringify(new Error('login failed'))
        )
      }
})
});



module.exports = router;
