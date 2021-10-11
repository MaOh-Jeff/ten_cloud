// 資料庫連線
var mysql = require('mysql');
var conn = mysql.createConnection({
  host: 'tencloud-20210929.cqycwxgazyr4.us-east-2.rds.amazonaws.com',
  port: 3306,
  user: 'web_server',
  password: 'a123456',
  database: 'ten_cloud'
});
conn.connect(function (err) {
  if (err) {
    console.log(JSON.stringify(err));
  }
});


module.exports = conn ;