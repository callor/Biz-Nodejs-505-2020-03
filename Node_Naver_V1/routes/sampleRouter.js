var express = require('express')
var router = express.Router()

router.get('/',function(req,res){
    res.send("sample Router")
})

module.exports = router