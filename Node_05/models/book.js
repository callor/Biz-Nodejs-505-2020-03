var mongoose = require("mongoose")
var book = mongoose.Schema({

    bTitle : String,
    bWriter : String,
    bComp : String,
    bPrice : Number
})

module.exports = mongoose.model("book",book)