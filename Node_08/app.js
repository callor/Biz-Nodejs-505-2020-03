var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')

// ./models 폴더에 index.js 파일이 있는지 찾아서
// 있으면 require 하여 사용할수 있도록 준비하라


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var bbsRouter = require("./routes/bbsRouter")
var sequelize = require("./models").sequelize

var app = express();

// db에 연결하라
sequelize.sync()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

/*
express의 json과 urlencoded는 대용량 Text(데이터)를 
json 구조나 post로 전송할때 문제글 일으켜서
body-parser의 도움을 받아 대용량 Text를 업로드 할수 있도록
한다.
*/
app.use(bodyParser.json({limit:"10kb"}))
app.use(bodyParser.urlencoded(
              {
                limit:"10kb",
                extended:true,
                parameterLimit:10000
              }))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/bbs",bbsRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
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
