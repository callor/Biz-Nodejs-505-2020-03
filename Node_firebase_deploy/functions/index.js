var express = require("express");
var path = require("path");

var firebaseFunction = require("firebase-functions");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var bbsRouter = require("./routes/bbsRouter");

var app = express();

// view engine setup
// pug template을 firebase Hosting에서 사용할수 있도록 설정
app.engine("pug", require("pug").__express);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/bbs", bbsRouter);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });
/*
firebase 에 nodejs 프로젝트를 deploy 하기 위해서
app.js functions/index.js로 이동하고
module.exports = app 대신
exports.application = firbase...
으로 변경
exports하는 application 이름은 
프로젝트 root firbase.json에 명시해 주어야 한다.

index.js에는 꼭 필요한 미들웨어만 남기고
나머지는 삭제해주는 것이 좋다.
미들웨어가 많으면 호환성등의 문제를 일으키기 쉽다.
*/
// module.exports = app;
exports.application = firebaseFunction.https.onRequest(app);
