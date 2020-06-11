// firebase DB와 연동하기 위한 미들웨어 설정
var firebase = require("firebase");
require("firebase/auth");
require("firebase/firestore");

const firebaseConfig = require("../config/firebaseConfig.json");
firebase.initializeApp(firebaseConfig);

var express = require("express");
var router = express.Router();
// js에서 날짜와 관련된 이슈를 피하기 위한.
// 날짜 미들웨어
var moment = require("moment");
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

router.get("/", (req, res, next) => {
  var db = firebase.database();
  db.ref("bbs")
    .once("value")
    .then((resultSet) => {
      var bbsList = [];
      resultSet.forEach((bbs) => {
        console.log(bbs.val());
        bbsList.push(bbs.val());
      });
      res.render("bbs/list", { bbsList });
    });
});

router.get("/input", (req, res) => {
  res.render("bbs/write");
});

router.post("/input", (req, res) => {
  // moment를 사용하여
  // 현재 날짜를 년-월-일 형태의 문자열로 추출하기
  let bDate = moment().format("YYYY[-]MM[-]DD");
  let bTime = moment().format("HH:mm:ss");

  // 1. db schema  접속하기
  // firebaseDB는 접속하는 방법이 인터넷을 통한
  // 클라우드 네트워크에 접속하는 것이므로
  // db접속을 CRUD매번마다 접속하여
  // 수행하라 라는 문서상 규칙이 있다.
  var db = firebase.database();

  //2. insert를 수행하기전 PK값을 만들어달라고 요청
  // 접속된 db에서 bbs라는 table을 참조하여
  // 새로운 PK 값을 만들어 달라
  var newKey = db.ref().child("bbs").push().key;

  // input form에서 전송되어 온 데이터를 newData에 복제
  var newData = req.body;

  // newData객체에 b_date, b_time 필드변수(칼럼)을
  // 생성하고 각각 bDate, bTime값을 저장하라
  newData.b_date = bDate;
  newData.b_time = bTime;
  // 새로 생성된 PK값을 seq 필드변수를 생성하고 저장
  newData.seq = newKey;

  // bbs테이블에 newKey값을 PK로 하는
  // 레코드를 만들고 newData 데이터를 setting
  db.ref("/bbs/" + newKey).set(newData);
  res.send("데이터 추가 완료");
});

module.exports = router;
