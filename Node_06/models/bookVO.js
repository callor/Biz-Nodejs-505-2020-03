var mongoose = require("mongoose")
var bookVO = mongoose.Schema({
    bTitle : String,
    bWriter : String,
    bComp : String,
    bPrice : Number
})
// tbl_books 이름으로 생성
module.exports = mongoose.model("tbl_book",bookVO)