// 資料庫連線
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'f_article',
  port: 3306
});
conn.connect(function (err) {
  if (err) {
    console.log(JSON.stringify(err));
  }
});


module.exports = conn ;