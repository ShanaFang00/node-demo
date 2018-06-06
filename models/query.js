/**
 * Created by shana on 2017/6/15.
 * 数据库操作
 */
var dao = require('./dao_mysql.js');

module.exports = {
    /**
     * 根据用户名密码查询用户
     * @param
     */
    login: function (param, callback) {
        const name = param.name;
        const password = param.password;
        let sql = 'select * from user where uname="' + name + '" and upwd="' + password + '"';
        dao.query(sql, '', function (err, result) {
            if(callback){
                if(!err){
                    let users = {
                        rows: result
                    };
                    callback(null, users);
                }else{
                    callback(err);
                }
            }
        });
    },
    /**
     * 根据uid查询用户
     * @param uid
     */
    getUserById: function (uid, callback) {
        let sql = 'select * from user';
        if(uid !== '' && uid !== undefined){
            sql += ' where uid=' + uid;
        }
        let param = '';
        dao.query(sql, param, function (err, result) {
            if(callback){
                if(!err){
                    let users = {
                        rows: result
                    };
                    callback(null, users);
                }else{
                    callback(err);
                }
            }
        });
    },
    /**
     * 添加用户
     * @param param
     */
    addUserInfo: function (param, callback) {
        let valFillArr = [],
            insertKey = [],
            insertValue = [];
        for (let key in param) {
            valFillArr.push("?");
            insertKey.push("user." + key);
            insertValue.push(param[key]);
        }
        let sql = 'insert user (' + insertKey.toString() + ') values (' + valFillArr.toString() + ')';
        dao.query(sql, insertValue, function (err, result) {
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        });
    },
    /**
     * 更新用户
     * @param param
     */
    updateUserInfo: function (param, callback) {
        let insertKey = [],
            insertValue = [];
        for (let key in param) {
            if(param[key] != '' && key != 'uid'){
                insertKey.push("user." + key + "=?");
                insertValue.push(param[key]);
            }
        }
        let sql = 'update user set ' + insertKey.toString() + ' where uid=' + param.uid;
        dao.query(sql, insertValue, function (err, result) {
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        });
    },
    /**
     * 删除用户
     * @param uid
     */
    deleteUserInfo: function (uid, callback) {

        let sql = 'delete from  user where uid=' + uid;
        let param = '';

        dao.query(sql, param, function (err, result) {
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        });
    }
};
