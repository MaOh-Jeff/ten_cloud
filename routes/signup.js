var express = require('express');
var router = express.Router();
var { Success, Error } = require('../response');
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup');
});

router.post('/', function (req, res) {
  var body = req.body
  console.log(body);
  var sql = `call fsp_member_add(?, ?, ?, ?, ?);`
  var data = [body.account, body.password, body.full_name, body.nickname, body.email]
  db.exec(sql, data, function (results, fields) {
    var message = JSON.stringify(results[0][0]);
    console.log(message);
    if (message.includes('註冊成功') != false) {
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
})


module.exports = router;
