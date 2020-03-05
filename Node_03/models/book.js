/*
js의 변수 선언자
var : 전역변수, 현재 모듈(*.js)어디에서나
    값을 읽고 쓸수 있는 선언
const : 상수, 현재 모듈 어디에서나
    값을 읽수 있고
    최초 한번만 값을 할당할 수 있다.    
let : 지역변수, 현재 함수내에서만 
    값을 읽고 쓸수 있으며
    함수를 벗어나면 변수가 해제된다.
*/
var mong = require("mongoose")
var bookModel = mong.Schema({
    BName : {
        type: String,
        required : true, // not Null
        unique : true, // UNIQUE
        trim : true
    },
    BComp : String,
    BWriter : String,
    BPrice : Number,
    BYear : {
        type : String,
        lowercase : true
    }
})

/*
model()에 설정하는 docment(book)이름을
반드시 단수로 지정한다(하는 것이 좋다.)

실제 db에 저장될때는
document 이름이 복수로 변경되어 저장
mongo console에서 조회를 할때는 다음과 같이
    db.books.find({})
*/
module.exports = mong.model("book",bookModel)

