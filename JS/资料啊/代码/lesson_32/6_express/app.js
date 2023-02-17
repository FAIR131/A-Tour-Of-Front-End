//1.引入express
/*
    npm init -y
    cnpm i express
*/
/*
    express 最轻量的框架
    egg     重量级
    koa2    重量级
*/
const express = require("express");

//express是一个类
const app = new express();


//第一个API
//get请求
app.get("/home",(request,response)=>{
    response.send("这是首页");
})

app.post("/admin",(request,response)=>{
    response.send("admin");
})

//任意,只能写在最后
app.get("/*",(request,response)=>{
    response.send("404");
})

app.listen(80,()=>{
    console.log('runding...')
})