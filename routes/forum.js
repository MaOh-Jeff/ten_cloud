var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.query.text);
  var text = req.query.text;
  var type = req.query.type;
  console.log(text);
  var sql = 'call fsp_forum_search(? ,? ,?);'
  var data = [type,9,text]
  db.exec(sql,data,function(results, fields){
    console.log(results[0]);
    var forum_search = results[0]
    var promulgator = []
    var title = []
    var time = []
    var forum_id = []
    forum_search.forEach((item,index) => {
      promulgator.push(item.nickname),
      title.push(item.title),
      time.push(item.bdate),
      forum_id.push(item.forum_id)
    })
    res.render('forum',{
      title: title,
      promulgator: promulgator,
      time: time,
      forum_id: forum_id
    });
  })
});

router.post('/',function(req,res){
  var body = req.body
  console.log(body);
  var memberData = req.session.user;
  var Mdata =JSON.parse(JSON.stringify(memberData.data));
  var member_id = Mdata[0].member_id;
  console.log(member_id);
  var sql = `call fsp_forum_add(? ,? ,?, ?);`
  var data = [body.type,body.title,member_id,body.content]
  db.exec(sql, data, function(results, fields) {
    console.log(results);
})
});

module.exports = router;
