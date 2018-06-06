/**
 * Created by shana on 2017/6/15.
 * 数据库操作
 */
var pool = require('./db.js');

//通用数据库操作方法
module.exports.query = function (sql, param, callback) {
    pool.getConnection(function (err, connection) {
        if(err){
            logger.error(err.message, err);
            if(callback){
                callback(err);
            }
        }else{
            connection.query(sql, param, callback);
            connection.release();
        }
    });
};