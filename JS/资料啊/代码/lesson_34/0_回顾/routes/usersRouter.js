const express = require("express");

const router = express.Router();

//RESTFul-API
router.get("/login",(req,res)=>{
    //get请求怎么获取参数
    console.log(req.query);//url
    res.send("ok");
})

router.post("/login",(req,res)=>{
    //get请求怎么获取参数
    console.log(req.body);
    res.send("ok");
})


module.exports = router;