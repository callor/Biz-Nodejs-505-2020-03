var mongoose = require("mongoose");

var photoVO = mongoose.Schema({
  pTitle: String,
  pText: String,
  pOriginalName: String,
  pPhotoName: String,
  pDate: { type: Date, default: Date.now() },
});

// 실제 table은 tbl_photo_books 이름으로 생성
module.exports = mongoose.model("tbl_photo_book", photoVO);
