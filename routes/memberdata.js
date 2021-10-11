var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  // 宣告memberData是session.user
  var memberData = req.session.user;
  // 提取memberData的資料
  var data =JSON.parse(JSON.stringify(memberData.data));
  var nickname = data[0].nickname;
  var full_name = data[0].full_name;
  var email = data[0].email;
  var account = data[0].account;
  // var nickname = JSON.parse(test);
  // console.log(nickname);
  res.render('memberdata',{
    nickname : nickname,
    full_name : full_name,
    email : email,
    account : account
  });
});

router.post('/',function(req,res){
  var memberData = req.session.user;
  var data =JSON.parse(JSON.stringify(memberData.data));
  var member_id = data[0].member_id;
  console.log('member_id');
  var sql = 'call fsp_member_enable_toggle(?);'
  var data = [member_id]
  db.exec(sql,data,function(results, fields){
      console.log(results);
  })
})
module.exports = router;
