var express = require("express")
var router = express.Router()
router.get('/',function(req,res){
    res.writeHead(200,{'Content-Type' : 'text/html;charset=UTF-8'})
    res.end("도서 정보 리스트 보기")
})
router.get('/input',function(req,res){
})
router.post('/input',function(req,res){
})
router.get('/update',function(req,res){
})
router.post('/update',function(req,res){
})
router.get('/delete',function(req,res){
})

module.exports = router