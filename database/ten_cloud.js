const mysql = require("mysql");
const bluebird = require("bluebird");
const connection = mysql.createConnection({
    // host: "127.0.0.1",
    host: "tencloud-20210929.cqycwxgazyr4.us-east-2.rds.amazonaws.com",
    port: 3306,
    user: "web_server",
    password: "a123456",
    database: "ten_cloud"
    // multipleStatements: true
});

connection.on('error', (event) =>{
    console.log(JSON.stringify(event));
})
connection.connect();
bluebird.promisifyAll(connection);

module.exports = connection;