var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  // res.render('index', { title: 'Express' });

  // localhost:3000/로 request가 오면
  // localhost:3000/photo로 redirect 실행을 하라
  res.redirect("/photo");
});

module.exports = router;
