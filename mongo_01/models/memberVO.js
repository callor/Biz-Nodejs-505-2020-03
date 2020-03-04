/*
mongoDB monoose를 사용하여 ODM(ORM) 방식으로 
사용하기 위해서
임의 table 형식의 데이터 구화를 위한 클래스를 선언
*/
var mongoose = require("mongoose")
// 4개의 속성(필드)변수를 갖는 
// memberModel(VO)를 선언
var memberModel = mongoose.Schema({
    strName : String,
    strAddr : String,
    strTel : String,
    intAge : Number
})

// 다른 js 파일(클래스등)에서 사용할수 있도록
// export하기
// module.exports 항목이 설정된 js 파일은
// 클래스 라고 인식해도 된다.
module.exports = mongoose.model("member",memberModel)

