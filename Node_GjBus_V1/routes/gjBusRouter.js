var express = require('express')
var router = express.Router()

var request = require('request')
var gjStation = require("../models/gjbusStation")

// router를 선언하는 곳에서(app.js에서)
// 매개변수로 config 값을 전달하기 위해서
// model.exports 이전과 다른 방법으로 선언

module.exports = function(app,config){

    /*
        전체데이터 개수가 몇개인지 알려주고
        한페이지에 몇줄씩 보일리 알려주기
        현재 선택된 페이지가 몇번인지 알려주고
    */
    var paginate = require('express-paginate')

    // express framework에서 pagination을 구현할 객체 선언하여
    // 사용할수 있도록 초기화 
    // 기본 limte 10, 최대 limite 10개로 설정
    app.use(paginate.middleware(10,10))

    // 한페이지에 몇개씩 보여줄것인가를 설정한 값
    const pageLimit = 10

    // 이하의 router method를 실행하기전에
    // 먼저 실행하여 변수, 세팅등을 설정한 후
    // req로 요청한 다음번(next) router로 전달하라
    router.all(function(req,res,next){
        if(req.query.limit <= 5 ) req.query.limit = 5
        next()
    })

    router.get("/bustime",function(req,res){
        let busstop_id = req.query.id
        let url = config.gjbus.arrive_url
        let apiKey = config.gjbus.apiKey

        apiKey = encodeURIComponent(apiKey)
        let queryParams = "?"
        queryParams += encodeURIComponent("ServiceKey") 
                    + "=" 
                    + apiKey
        queryParams += "&"
        queryParams += encodeURIComponent("BUSSTOP_ID") 
                    + "="
                    + encodeURIComponent(busstop_id)

        request({
            url : url + queryParams,
            method : 'GET'
        },function(err,response,body){
            
            console.log(err)

            var stop_info = JSON.parse(body)
            if(stop_info.RESULT.RESULT_CODE == 'ERROR') {
                res.send('도착정보 없음')
            } else {
                res.render("gjbus/bustime",
                    {bustimes:stop_info.BUSSTOP_LIST}
                )
            }
        })



    })

    router.get("/searchStation",function(req,res){

        /*
        mongoose 문자열 검색
        {칼럼명 : 값} : 완전히 일치하는 문자열만 검색
        {칼럼명 : RegExp('^' + 값)} : 시작문자열검사 SQL에서 값%
        {칼럼명 : RegExp(값,'ig')} : 중간문자열 검사 SQL에서 %값%
        */
        let station = req.query.station
        gjStation.find({BUSSTOP_NAME : RegExp(station,'ig')})
        .sort({BUSSTOP_NAME : 'asc'})
        .exec(function(err,stations){
          res.render("gjbus/station_small",{stations:stations})
        })

    })

    router.get("/viewStation",function(req,res){

        // 현재 선택된 페이지 번호가 req.query.page에 담겨서
        // 전달되어 오면
        // 그 페이지번호에 pageLimite값을 곱하여
        // 몇번째 데이터부터 읽어 올것인지를 정하는
        //      값을 계산
        // offset == skip
        let offset = (req.query.page - 1) * pageLimit

        // 조건검색이 없다는 전제하에서
        // 전체 데이터 개수구하기
        gjStation.count({})
        .exec(function(err,count){

            // 전체데이터가 구해지면
            // 한페이지 데이터 개수로 나누어
            // 총 몇페이가 필요한지를 계산한다.
            // Math.ceil : 소수점이하 무조건 자리올림 정수로 변환
            let pageCount = Math.ceil(count / pageLimit)

            // 한페이지에 보일 데이터(pageLimit)
            // 전체 페이지 개수(pageCount)
            // 현재 선택된 페이지(req.query.page, 
            //      페이지에서 클릭한 페이지 번호)
            // 이 3가지의 데이터를 paginate의 getArrayPages 메서드한테
            // 전달하면
            // 페이지를 그리는데 필요한 정보가 담긴 pageArray객체를
            //  자동으로 생성해 준다.

            // let pageMain = pagination.getArrayPages(req)
            // let pageA = pageMain(pageLimit,pageCount,req.query.page)

            let pageArray = paginate.getArrayPages(req)(
                pageLimit,pageCount,req.query.page
            )

            // 실제 한페이지에 보여줄 데이터를 읽어오는데(select,find)
            // 위에서 계산 pageLimit, offset값을 활용하여
            // 필요한 데이터만 추출한다.
            gjStation.find({})
            .limit(pageLimit)
            .skip(offset)
            .exec(function(err,stations){
                // 데이터 리스트 페이지에
                // 지금까지 생성한 값들을
                // 전달하여 데이터리스트를 보이고
                // 하단에 페이지 리스트를 보여서
                // pagination을 구현한다.
                res.render("gjbus/station",{
                    stations:stations, // 실제 리스트데이터
                    pageCount:pageCount,
                    itemCount : count, // 전체 개수
                    currentPage : req.query.page,
                    pages:pageArray
                })
            })
        })
        // gjStation.find({})
        // .skip(100)
        // .limit(100)
        // .sort({BUSSTOP_NAME:'asc'})
        // .exec(function(err,stations){
        //     res.render("gjbus/station",{stations:stations})
        // })
    })

    router.get("/getStation",function(req,res){

        var url = config.gjbus.station_url
        var apiKey = config.gjbus.apiKey
        apiKey = encodeURIComponent(apiKey)

        var queryParams = '?'
        queryParams += encodeURIComponent('ServiceKey') + "=" + apiKey

        request({
            url : url + queryParams,
            method : 'GET'
        },function(err,response,body) {

            // json 문자열형태로 수신된 body에 담긴 정보를
            // json Object로 변환
            var resultJson = JSON.parse(body)
            if(resultJson.RESULT.RESULT_CODE == 'SUCCESS') {

                // 데이터가 정상 수신
                // 만약 기존 데이터가 있으면 모두 삭제를 하고
                // 새로운 데이터로 대체
                
                gjStation.deleteMany(function(){
                    var station_list = resultJson.STATION_LIST

                    gjStation.collection.insertMany(station_list,function(err,result){
                        if(err) {
                            res.send("Data Bulk Insert Errror")
                        } else {
                            // res.json(result)
                            res.render('gjbus/station',
                                    {stations:result.ops}
                            )
                        }
                    })

                    // station_list.forEach(function(station){
                    //     var vo = new gjStation(station)
                    //     vo.save(function(err,data){
                    //         res.json(data)
                    //     })
                    // })
                })
                
           
                // res.json(resultJson)
            } else {
                res.write(resultJson.RESULT.RESULT_MSG)
                res.end("데이터 수신 오류")
            }
        })
    })
    return router
}