var express = require('express');
var bodyParser = require('body-parser'); //用于处理 JSON, Raw, Text 和 URL 编码的数据
var app = express();
var router = require('./router/router');
var session = require('express-session');

//设置session配置
app.use(session({
    resave: false,  //重新保存
    saveUninitialized: true, //
    secret: 'ghost castle', //通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
    cookie:{ maxAge: 1000*60*60} //失效时间
}));

app.use(bodyParser.json()); //解析json数据
app.use(bodyParser.urlencoded({ extended: true })); //解析form表单提交上来的数据

app.set('view engine', 'pug');            // 配置模板引擎
app.use(express.static('public'));
app.use('/', router);

var server = app.listen(3001, function() {

	var host = server.address().address;
	var port = server.address().port;

	console.log("http://%s:%s", host, port);

});