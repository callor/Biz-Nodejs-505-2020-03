var naver = require("../config/naver_secret")
var express = require('express')
var router = express.Router()
var request = require('request')

var reqOptions = (api_url)=>{
    var options = {
        url : api_url,
        headers : {
            'X-Naver-Client-Id' : naver.client_id,
            'X-Naver-Client-Secret' : naver.client_secret
        }
    }
    return options
}

/*
    module.exports = function() {} 의 구조
    이 모듈을 사용하는 곳에서
    어떤 값을 매개변수로 전달하고자할때
    사용하는 코드
*/
// module.exports = function() {} 
/*
 ()=>{}
 화살표 함수 ES5 이상에서 사용할수 있는 단축형 함수
 한가지 단점이 변수 scope가 상당히 민감하다
 특히 this라는 키워드의 변수는 scope 때문에
 사용하면서 많은 테스트를 수행해야 한다.
 이유는 function 방식의 함수와는 다르게 작동되기 때문이다
*/ 
module.exports = (app)=> {

    // router.get("/",function(req,res){
    router.get("/",(req,res)=>{    
        res.json(naver)
    })

    router.get('/movie',(req,res)=>{

        let searchName = req.query.search
        let api_url = naver.movie_url
        api_url += '?query=' + encodeURI(searchName)

        request.get(reqOptions(api_url),(err,response,body)=>{

            // 오류가 없으면 err 은 null값이 된다
            if(err) {
                console.log(err)
                res.send(response.statusMessage)
            } else if(response.statusCode == 200) {
                var naverJson = JSON.parse(body).items
                // res.json(naverJson)
                res.render('movie/list',{movies:naverJson})
            } else {
                res.send("unKnow Error response")
            }

        })
    })

    return router

}




