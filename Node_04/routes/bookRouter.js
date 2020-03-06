var express = require('express');
var router = express.Router();

router.get("/list",function(req,res){
    res.end("list")
})
router.get("/insert",function(req,res){
    // res.render("write")
    res.end('insert')
})
router.post("/insert",function(req,res){
    // 데이터를 추가하는 코드
    res.end("insert_post")
})
router.get('/update/:id',function(req,res){
    // id를 기준으로 1개의 데이터를 조회
    // render에 건네주는 코드
    // res.render("write")
    res.end('update')
})
rounter.put("/update/:id",function(req,res){
    res.end("update_put")
})
rounter.delete("/delete/:id",function(req,res){
    res.end("delete_delete")
})




module.exports = router