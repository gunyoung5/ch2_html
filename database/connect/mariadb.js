const mariadb = require('mysql'); // 강의와 다름

const conn = mariadb.createConnection(
    {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'Tennis'
    }
);

module.exports = conn;