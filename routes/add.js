var express = require('express');
var router = express.Router();
var db = require('../db/db')
var app = express();

// router.post('/add', function(req, res){
//   var body = req.body
//   console.log(body)
//     var sql = `call fsp_member_add(?, ?, ?, ?, ?);`
//     var data = [body.account,body.password,body.full_name,body.nickname,body.email]
//     db.exec(sql, data, function(results, fields) {
//       console.log(results)
//   })
// })

// app.get('/memberdata',function(req,res){
//   var session = session.user.member_id;
//   console.log(session)
//   res.render('memberdata',{ data:session });
// })

  module.exports = router;
