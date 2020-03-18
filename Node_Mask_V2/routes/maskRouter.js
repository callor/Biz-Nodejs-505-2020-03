var express = require('express')
var router = express.Router()
var maskDataURL = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByAddr/json"
var tmapConfig = require("./tmap_sec")
var request = require('request')

router.get('/search',(req,res)=>{

    let address = req.query.address
    let api_url = encodeURI(maskDataURL)

    api_url += "?address=" + encodeURI(address)

    console.log(api_url)

    request(api_url,(err,response,data)=>{
        if(err)
            res.send(err)
        else
            var stores = JSON.parse(data).stores
            var plentyList = stores.filter(function(item){
              
                return item.remain_stat === 'plenty'
            })
            var someList = stores.filter(function(item){
              
                return item.remain_stat === 'some'
            })

            var fewList = stores.filter(function(item){
              
                return item.remain_stat === 'few'
            })

            var sortList = [...plentyList,...someList,...fewList]


            res.render('index',
            {
                stores : sortList,
                tmap_api : tmapConfig.api_key
            })            
    })

})




module.exports = router