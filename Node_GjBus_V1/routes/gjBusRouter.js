var express = require('express')
var router = express.Router()

var request = require('request')
var gjStation = require("../models/gjbusStation")

// router를 선언하는 곳에서(app.js에서)
// 매개변수로 config 값을 전달하기 위해서
// model.exports 이전과 다른 방법으로 선언

module.exports = function(config){
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
                            res.json(result)
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