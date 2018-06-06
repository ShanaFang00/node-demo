/**
 * Created by shana on 2017/6/15.
 * 数据库连接池配置
 */
var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'microblog'
});

module.exports = pool;