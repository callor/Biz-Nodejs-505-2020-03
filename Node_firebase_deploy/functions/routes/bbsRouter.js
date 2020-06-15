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
/*
.once("value")
- firebase DB에서 데이터를 조회할때 사용하는 이벤트 메서드
db.ref("bbs") : firebase에 데이터를 요청하는 호출 메서드
데이터 요청이 허락되면 value 라는 이름으로
응답을 수행하는데
그때 응답을 수신하는 메서드
.then(call back 함수) : callback 함수를 통해서
수신된 데이터를 처리
orderByKey() : Key 값을 기준으로 오름차순 정렬
-- DB의 Key값이 UUID값이기 때문에 정렬하는데 별로 의미가 없다
.orderByChild("b_date") : b_date 칼럼을 기준으로 오름차순 정렬
키값으로 오름차순 정렬은 되는데 내림차순(DESC)정렬이 불가능하다
복수(2개 이상)의 칼럼으로 정렬이 불가능하다.
*/
router.get("/", (req, res, next) => {
  var db = firebase.database();
  db.ref("bbs")
    // .orderByKey()
    .orderByChild("b_date")
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

router.get("/view/:seq", (req, res, next) => {
  var seq = req.params.seq;

  var db = firebase.database();
  // bbs DB에서 키값이 seq와 같은 데이터를 찾아라
  db.ref("bbs/" + seq)
    .once("value")
    .then((resultSet) => {
      res.render("bbs/view", { bbs: resultSet.val() });
    });
});

router.get("/update/:seq", (req, res) => {
  var seq = req.params.seq;

  var db = firebase.database();
  db.ref("/bbs/" + seq)
    .once("value")
    .then((result) => {
      res.render("bbs/write", { bbs: result.val() });
    });
});

/*
write form을 입력, 수정에서 공유하여 사용하기 위해
새로작성을 선택하면 비어있는 bbs데이터를 만들어서
form으로 전달해주어야 한다.

newData 객체를 생성하고 비어있는 칼럼을 지정해서 보내는데
이때 칼럼은 지정하지 않아도 newData 객체만 만들어서
전달해도 된다.
*/
router.get("/input", (req, res) => {
  var newData = {
    b_title: "",
    b_text: "",
    b_writer: "",
    b_date: "",
    b_time: "",
  };

  res.render("bbs/write", { bbs: newData });
});

router.post("/input", (req, res) => {
  let seq = req.body.seq;

  // 1. db schema  접속하기
  // firebaseDB는 접속하는 방법이 인터넷을 통한
  // 클라우드 네트워크에 접속하는 것이므로
  // db접속을 CRUD매번마다 접속하여
  // 수행하라 라는 문서상 규칙이 있다.
  var db = firebase.database();
  // input form에서 전송되어 온 데이터를 newData에 복제
  var newData = req.body;

  // form에서 전송되어온 seq 값이 없으면
  // 새로운 seq를 생성해서 insert 상태로 만들고
  // 날짜와 시각을 생성하여 data(req.body) 에 추가
  // js 에서 "", undefined  값은 모두 false로 인식
  if (!seq) {
    // moment를 사용하여
    // 현재 날짜를 년-월-일 형태의 문자열로 추출하기
    let bDate = moment().format("YYYY[-]MM[-]DD");
    let bTime = moment().format("HH:mm:ss");
    //2. insert를 수행하기전 PK값을 만들어달라고 요청
    // 접속된 db에서 bbs라는 table을 참조하여
    // 새로운 PK 값을 만들어 달라
    seq = db.ref().child("bbs").push().key;
    // newData객체에 b_date, b_time 필드변수(칼럼)을
    // 생성하고 각각 bDate, bTime값을 저장하라
    newData.b_date = bDate;
    newData.b_time = bTime;
    // 새로 생성된 PK값을 seq 필드변수를 생성하고 저장
    newData.seq = seq;
  }

  // bbs테이블에 newKey값을 PK로 하는
  // 레코드를 만들고 newData 데이터를 setting
  db.ref("/bbs/" + seq).set(newData);
  // res.send("데이터 추가 완료");
  res.redirect("/bbs");
});

router.get("/delete/:seq", (req, res) => {
  let seq = req.params.seq;

  firebase
    .database()
    .ref("bbs/" + seq)
    .remove();
  res.redirect("/bbs");
});

module.exports = router;
