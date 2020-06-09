var express = require("express");
// express framework에서 router 모듈을 사용할수 있도록
// 추출하여 초기화
var router = express.Router();

// req(request) : 사용자가 웹을 통해서 요청한 정보들이 담긴 객체
// res(response) : 서버에서 웹에 return하는 정보들이 담길 개체
router.get("/", function (req, res) {
  // res객체의 send() method : 일반적인 문자열 형태로
  //       응답을 할때 사용한다
  // send() method를 한번 실행하면
  // 이후에 res객체의 다른 method는 호출할 수 없다.
  res.send("반갑습니다");
});

router.get("/nation", function (req, res) {
  // 여러번의 메시지를 전송하고자 할때 사용하는 method

  res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
  res.write("우리나라만세<br/>");
  res.write("대한민국만세<br/>");
  // write() 메서드로 메시지를 전송하고 나면
  // 끝에 반드시 end() method를 호출해 주어야 한다.
  res.end("end");
});

// 모듈 객체를 외부에서 require하여 사용할수 있도록
// return하는 명령문
module.exports = router;
