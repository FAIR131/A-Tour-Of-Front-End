var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/demo', function(req, res, next) {

  res.setHeader("Access-Control-Allow-Origin","*");"10.11.12.13 , 10.11.12.14"
  //认为设置阻塞
  setTimeout(function(){
    res.send("okok")
  },3000)
  // res.send("ok")
});

module.exports = router;
