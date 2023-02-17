var createError = require('http-errors');
var express = require('express');
var path = require('path');    //路径拼接的
var cookieParser = require('cookie-parser');  //cookie
var logger = require('morgan');                //开发的时刻显示请求信息

//routes是一个文件夹
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();//实例

//指定模板
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));//开发模式
app.use(express.json()); //支持json
app.use(express.urlencoded({ extended: false }));//支持post
app.use(cookieParser());//支持cookie
app.use(express.static(path.join(__dirname, 'public')));//支持静态

app.use('/', indexRouter);  //路由注册   -->   把模块导入,并且把路由写入到app对象中
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {  //404
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
