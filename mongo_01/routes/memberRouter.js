// web에서 request한 path 관련 정보를 추출하기 위한
// 도구(미들웨어)를 선언
var express = require("express")
var router = express.Router()

// mongoDB에 CRUD를 구현하기 위한 VO 객체 선언
var memberVO = require("../models/memberVO")

router.get("/list",function(req,res){
    memberVO.find(function(err,data){
        res.render("list",{members:data});
    })
})

router.get("/update/:id",function(req,res){
    var id = req.params.id

    memberVO.findOne({_id:id},function(err,data){
        res.render("write",{
            item:data,
            action:'/member/update',
            pageTitle : '회원정보 수정'
        })
    })
})

router.post("/update/:id",function(req,res){
    let id = req.params.id

    memberVO.update({_id:id},{$set:req.body}, 
        function(err,data){
        res.redirect("/member/list")
    })

})

router.get("/delete/:id",function(req,res){
    let id = req.params.id
    memberVO.deleteOne({_id:id},function(err,data){
        res.redirect("/member/list")
    })
})

router.get("/insert",function(req,res){

     let data = new memberVO()
     res.render("write",{
         item:data,
         action:'/member/update',
         pageTitle : '회원정보 추가'
     })

})


router.post("/insert",function(req,res){

    /*
    web으로 부터 데이터 전달받기
    query(?변수=값&변수1=값) 문자열로 보낸 데이터
        req.query.변수 형식으로 받는다
    path valiable( /path/:변수1/:변수2) 형식으로 받는 데이터는
        req.params.변수1 형식으로 받는다
    
    form에 담겨서 전달되는 데이터는
        req.body에 담겨서 vo 형식으로 받는다


    req.body에 담겨져 온 데이터를
    newVO 변수에 복사하고
    save() 메서드를 실행한후
    정상적으로 save() 되면 callback 함수를 실행하여
    현재 DB에 저장된 레코드를 web에 확인시켜라    
    */
    let newVO = new memberVO(req.body)
    newVO.save(function(err,data){
        // res.json(data)
        res.redirect("/member/list")
    })
    
}) // router.post("/insert")

router.get("/listjson",function(req,res){
    memberVO.find(function(err,data){
        res.json(data)
    })
})




module.exports = router