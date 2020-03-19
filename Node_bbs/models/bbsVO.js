const mongoose = require("mongoose");
const bbsVO = mongoose.Schema({
  b_date: String,
  b_time: String,
  b_title: String,
  b_text: String
});

module.exports = mongoose.model("tbl_bbs", bbsVO);
