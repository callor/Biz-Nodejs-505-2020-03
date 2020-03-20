var express = require("express");
var router = express.Router();
var bbsVO = require("../models/bbsVO");
var moment = require("moment");
var cors = require("cors");

var app = express();
app.use(cors());
var corsOption = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200 // IE 버전때문에 생기는문제 제거
};

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

router.get("/", (req, res) => {
  /*
  cors 모듈 없이 CORS 정책을 허용하기 위한 설정
  모든 router에 공통으로 설정을 해야 한다.
  */
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header("Access-Control-Allow-Headers", "X-requested-With");

  bbsVO.find({}).exec((err, data) => {
    res.json(data);
  });
});

router.post("/", (req, res) => {
  req.body.b_date = moment().format("YYYY[-]MM[-]DD");
  req.body.b_time = moment().format("HH:mm:ss");
  console.log(req.body);
  console.log(req.body.b_title);

  var bbs = new bbsVO(req.body);
  bbs.save((err, data) => {
    res.json(data);
  });
});

router.put("/", (req, res) => {
  console.log(req.body);

  bbsVO
    .update({ _id: req.body._id }, { $set: req.body })
    .exec((err, result) => {
      res.json(result);
    });
});

router.delete("/", (req, res) => {
  console.log("바디값:", req.body);
  bbsVO.deleteOne({ _id: req.body._id }).exec((err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
