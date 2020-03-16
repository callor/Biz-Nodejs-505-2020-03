var express = require('express');
var router = express.Router();
var tmapConfig = require('./tmap_sec')

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { tmap_api : tmapConfig.api_key});
  res.redirect('/mask/search')
});

module.exports = router;
