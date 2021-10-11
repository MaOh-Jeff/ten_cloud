var mysql = require('mysql');
// 建立資料庫連線
exports.exec = (sql,data,callback) => {
    const connection = mysql.createConnection({
        host:'localhost',
        port: 3306,
        user:'root',
        password:'root',
        database:'tencloudtest',
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
