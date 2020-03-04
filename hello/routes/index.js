var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '반갑습니다' });
});

router.post('/insert',function(req,res){
	// 내용 처리
})

router.get('/hello',function(req,res){
	res.write("반갑습니다")
	res.end()
})

router.put('/update',function(req,res){
})

router.delete("/delete",function(req,res){
})

module.exports = router;
