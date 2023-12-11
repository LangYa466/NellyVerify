const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '',
    user: '',
    password: '',
});

connection.connect(function(err) {
    if (err) {
        console.error('无法连接到MySQL数据库：', err);
        return;
    }

    console.log('已成功连接到MySQL数据库！');

    // 创建数据库和表格
    connection.query('CREATE DATABASE IF NOT EXISTS card_verification', function(err, results, fields) {
        if (err) {
            console.error('无法创建数据库：', err);
            return;
        }

        console.log('已成功创建数据库！');

        connection.query('USE card_verification', function(err, results, fields) {
            if (err) {
                console.error('无法使用数据库：', err);
                return;
            }

            console.log('已切换到数据库！');

            connection.query(`CREATE TABLE IF NOT EXISTS cards (
                id INT(11) NOT NULL AUTO_INCREMENT,
                code VARCHAR(255) NOT NULL,
                is_used TINYINT(1) NOT NULL DEFAULT '0',
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id)
            )`, function(err, results, fields) {
                if (err) {
                    console.error('无法创建表格：', err);
                    return;
                }

                console.log('已成功创建表格！');
            });
        });
    });
});
