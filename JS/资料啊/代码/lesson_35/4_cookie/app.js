const express = require("express");
const cookieParser = require("cookie-parser")

const app = new express();

app.use(express.urlencoded({extended:false}));

app.use(cookieParser());
/*
        cookie : 浏览器自带的微型数据库 ,存储方式时键值对形式
            - 首先,http协议时无状态协议
                - 任何用户通过http发起访问,服务器并不知道时那个用户发出的
            - cookie记录用户的信息
            - 浏览器接受到服务端返回的session-id,会保存到cookie当中
                - {http://127.0.0.1:3000 : session-id(session-key)}
            - 浏览器只要打开相同的网站,会自动把cookie传递给服务端不能
        
        session : 服务端自带的一个记录机制 ,存储方式时键值对形式,临时存储再内存当中,存储再redis数据库
            - 首先,http协议时无状态协议
                - 任何用户通过http发起访问,服务器并不知道时那个用户发出的
            - 存储一个Object类型的数据{id:1001,username:"admin",images:"http://xxxxxx.png"}
                - 会把当前的信息再设置一层键值对 { session-id : {id:1001,username:"admin",images:"http://xxxxxx.png"}}
                - 自动生成的 , 有最大生命周期(一组session-id保存多长时间)
                - 把session-id发给浏览器
    
    */

app.post("/set-cookie",(req,res)=>{
    //response对象操控cookie

    //只能再当前网站的/set-cookie路由自动携带cookie
    // res.setHeader("Set-Cookie","Path=/set-cookie")
    res.cookie("username",req.body.username,{maxAge : 100000}); //20秒
    //重定向
    res.send("ok")

})

app.get("/get-cookie",(req,res)=>{
    //获取cookie使用的时request
    console.log(req.cookies);
    res.send("ok")

})

//清楚cookie
app.get("/clear-cookie",(req,res)=>{
    //服务端发出清理的指令给浏览器,浏览器清理
    res.clearCookie("username");
    res.send("xxxx")
})

app.listen(80,()=>{
    console.log(".......");
})