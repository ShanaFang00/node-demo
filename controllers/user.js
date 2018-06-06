/**
 * Created by shana on 2017/6/15.
 * 用户操作
 */
var query = require('../models/query.js');
var nodeExcel = require('excel-export');
var Excel = require('exceljs');
var log4js = require('log4js');
var log = log4js.getLogger('user');

module.exports = {
    getUserInfo: function (req, res) {
        let param = req.body;
        let callback = function (err, result) {
            if(err){
                log.error("getUserInfo err: [ " + err + " ]");
                res.json({
                    "result": false,
                    "errorMsg": "数据库连接失败",
                    "errorDetail": err.toString()
                });
            }else{
                res.json({
                    "result": true,
                    "errorMsg": "成功",
                    "aaData": result.rows
                });
            }
        };
        query.getUserById(param.uid, callback);
    },
    addUserInfo: function (req, res) {
        let param = req.body;
        let callback = function (err, result) {
            if(err){
                log.error("addUserInfo err: [ " + err + " ]");
                res.json({
                    "result": false,
                    "errorMsg": "数据库连接失败",
                    "errorDetail": err.toString()
                });
            }else{
                res.json({
                    "result": true,
                    "errorMsg": "成功"
                });
            }
        }
        query.addUserInfo(param, callback);
    },
    updateUserInfo: function (req, res) {
        let param = req.body;
        let callback = function (err, result) {
            if(err){
                log.error("updateUserInfo err: [ " + err + " ]");
                res.json({
                    "result": false,
                    "errorMsg": "数据库连接失败",
                    "errorDetail": err.toString()
                });
            }else{
                res.json({
                    "result": true,
                    "errorMsg": "成功"
                });
            }
        }
        query.updateUserInfo(param, callback);
    },
    deleteUserInfo: function (req, res) {
        let param = req.body;
        let callback = function (err, result) {
            if(err){
                log.error("updateUserInfo err: [ " + err + " ]");
                res.json({
                    "result": false,
                    "errorMsg": "数据库连接失败",
                    "errorDetail": err.toString()
                });
            }else{
                res.json({
                    "result": true,
                    "errorMsg": "成功"
                });
            }
        }
        query.deleteUserInfo(param.uid, callback);
    },
    exportUser: function (req, res) {
        let callback = function (err, result) {
            if(err){
                res.json({
                    "result": false,
                    "errorMsg": "数据库连接失败",
                    "errorDetail": err.toString()
                });
            }else {
                //导出
                let conf = {};
                //conf.stylesXmlFile = 'styles.xml';
                conf.cols = [
                    {caption: '序号', type:'number'},
                    {caption: '用户名', type: 'string'},
                    {caption: '性别', type: 'string'},
                    {caption: '地址', type: 'string'},
                    {caption: '注册时间', type: 'string'},
                    {caption: '更新时间', type: 'string'}
                ];
                let datas = result.rows;
                conf.rows = [];
                debugger
                datas.map(function (item, index) {
                    let itemArr = [];
                    itemArr.push(index+1);
                    itemArr.push(item.uname);
                    let sex = '男';
                    if(item.usex == 1){
                        sex = '女';
                    }else if(item.usex == 2){
                        sex = '保密';
                    }
                    itemArr.push(sex);
                    itemArr.push(item.uaddress);
                    itemArr.push(item.udate.Format('yyyy-MM-dd hh:mm:ss'));
                    if(item.update_date != null && item.update_date != ''){
                        itemArr.push(item.update_date.Format('yyyy-MM-dd hh:mm:ss'));
                    }else{
                        itemArr.push(item.update_date);
                    }
                    conf.rows.push(itemArr);
                });
                let exlx = nodeExcel.execute(conf);
                res.setHeader('Content-Type', 'application/vnd.openxmlformats');
                res.setHeader("Content-Disposition", "attachment; filename=" + "userInfo.xlsx");
                res.end(exlx, 'binary');
            }
        }
        query.getUserById('', callback);
    },
    exportUser2: function (req, res) {
        const workbook = new Excel.Workbook(); //创建工作本
        //设置工作本属性
        workbook.creator = 'dandanfang';
        workbook.lastModifiedBy = 'shana';
        workbook.created = new Date(2017,10,01);
        workbook.modified = new Date();
        workbook.lastPrinted = new Date(2017, 10, 27);
        // Set workbook dates to 1904 date system
        workbook.properties.date1904 = true;
        //The Workbook views controls how many separate windows Excel will open when viewing the workbook.
        workbook.views = [
            {
                x: 0, y: 0, width: 10000, height: 20000,
                firstSheet: 0, activeTab: 1, visibility: 'visible'
            }
        ];
        // create a sheet with red tab colour
        var sheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});

        // create a sheet where the grid lines are hidden
        var sheet = workbook.addWorksheet('My Sheet', {properties: {showGridLines: false}});

        // create a sheet with the first row and column frozen
        var sheet = workbook.addWorksheet('My Sheet', {views:[{xSplit: 1, ySplit:1}]});
    }
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
