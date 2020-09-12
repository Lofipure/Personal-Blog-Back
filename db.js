const mysql = require('mysql');// 引入模块

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "blog",
    port: 3308
});

connection.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("connect mysql success!");
});

module.exports = connection;