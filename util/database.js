const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'node-online-store',
    password: '831126'
});

module.exports = pool.promise();