var express = require('express');
var router = express.Router();
var { Success, Error , Account} = require('../response');
var db = require('../db/db');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function (req, res) {
  var sql = `call fsp_member_login(?, ?);`
  var data = [req.body.account, req.body.password]
  db.exec(sql, data, function (results, fields) {
    console.log(results);
    var data = JSON.stringify(results);
    // var dataclear = JSON.parse(data);
    // var member_id = JSON.stringify(results,['member_id'])
    // var account = JSON.stringify(results,['account'])
    // var full_name = JSON.stringify(results,['full_name'])
    // var nickname = JSON.stringify(results,['nickname'])
    // var email = JSON.stringify(results,['email'])
    // console.log(dataclear)
  

    if (data.includes('密碼錯誤') != false) {
      res.end(
        JSON.stringify(new Error('login failed'))
      )

    }
    else if(data.includes('帳號不存在') != false){
      res.end(
        JSON.stringify(new Account('login failed'))
      )
    }

    else if(data.includes('帳號禁用') != false){
      res.end(
        JSON.stringify(new Account('login failed'))
      )
    }
    else {
      req.session.user = {
        data: results[0],
        // member_id: member_id ,
        // account: account,
        // full_name: full_name,
        // nickname: nickname,
        // email: email
      }
      res.send(
        JSON.stringify(new Success('login success'))
      )
    }
    console.log(req.session.user);
  })
}) 

module.exports = router;
