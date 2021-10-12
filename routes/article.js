var express = require('express');
var router = express.Router();
var db = require('../db/db');

/* GET home page. */
router.get('/:id', function (req, res, next) {
  var forum_id = req.params.id;
  console.log(forum_id);
  var sql = 'call fsp_forum_article_search(? ,? ,?);'
  var data = [forum_id, 1, 1]
  db.exec(sql,data,function(results, fields){
    data = results[0];
    nickname = data[0].nickname;
    content = data[0].content;
    console.log(nickname)
    res.render('article',{
      nickname: nickname,
      content: content
    });
  })
});

module.exports = router;
