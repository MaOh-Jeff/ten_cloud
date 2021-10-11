var mysql = require('mysql');
// 建立資料庫連線
exports.exec = (sql,data,callback) => {
    const connection = mysql.createConnection({
        host: "tencloud-20210929.cqycwxgazyr4.us-east-2.rds.amazonaws.com",
        port: 3306,
        user:'web_server',
        password:'a123456',
        database:'ten_cloud',
        multipleStatements: true,
    });
    connection.connect();

    connection.query(sql,data,function(error,results,fields){
        if(error) {
            console.log(error)
        };
        callback(results, fields);
    })
    connection.end();
}
