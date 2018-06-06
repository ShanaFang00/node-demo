/**
 * Created by shana on 2017/6/15.
 * 登录
 */
var query = require('../models/query.js');
var log4js = require('log4js');
var log = log4js.getLogger('user');

module.exports = {
    login: function (req, res) {
        let param = req.body;
        let callback = function (err, result) {
            if(err){
                log.error("login err: [ " + err + " ]");
                res.json({
                    "result": false,
                    "errorMsg": "数据库连接失败",
                    "errorDetail": err.toString()
                });
            }else{
                if(result.rows.length == 0){
                    res.json({
                        "result": false,
                        "errorMsg": "登录失败"
                    });
                }else{
                    req.session.user = result.rows;  // 将用户信息写入 session
                    res.json({
                        "result": true,
                        "errorMsg": "登录成功"
                    });
                }

            }
        };
        query.login(param, callback);
    },
    register: function (req, res) {
        let param = req.body;
        let callback = function (err, result) {
            if(err){
                log.error("register err: [ " + err + " ]");
                res.json({
                    "result": false,
                    "errorMsg": "数据库连接失败",
                    "errorDetail": err.toString()
                });
            }else{
                res.json({
                    "result": true,
                    "errorMsg": "注册成功"
                });
            }
        }
        query.addUserInfo(param, callback);
    },
}