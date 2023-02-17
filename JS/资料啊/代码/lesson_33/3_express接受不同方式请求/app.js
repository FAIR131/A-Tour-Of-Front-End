const express = require("express");

const app = new express();

//接受post请求
//enctype="application/x-www-form-urlencoded"
app.use(express.urlencoded({extended:false}));
/*
    REST-Ful-API
        - 路由是一致的
        - 但是请求的方式不一样
        - 一个小网站路由有上百个
        - 节省路由名称

    浏览的url地址栏只能发出get请求
    要么使用form表单,要么使用ajax

    使用APIpost
    
*/

//当前内容只有一个API，根据路由定义的

app.get("/index",(req,res)=>{
    //query是从url当中解析的
    console.log(req.query);
    res.send("ok");
})

app.post("/index",(req,res)=>{
    //post把数据放在请求体  数据包
    //body--->请求体
    console.log(req.body);
    res.send("end");
})



app.listen(80,()=>{
    console.log(".......")
})