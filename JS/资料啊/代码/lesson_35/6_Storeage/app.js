const express = require("express");
//cnpm i express-session
const session = require("express-session"); //session 会话

const app = new express();

app.use(express.urlencoded({extended:false}));

const cookieParser = require("cookie-parser")

app.use(cookieParser());


//配置
app.use(session({
    name : "demo",
    //秘钥 session-id加密的
    secret : "web2211",
    //每一次是否要重新写入,session-id
    resave : false,
    //每次请求都需要创建新的session
    saveUninitialized : false,
    cookie :{
        maxAge : 60*60*1000,
    }
}))


app.post("/login",(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin","*");
    //接受post传递的参数
    if(req.body.name === "admin"){
        //登录成功以后保存session
        req.session.username = req.body.name;

        res.json({code:1,msg:"登录成功",data:{name:req.body.name}})
    }else{
        res.json({code:0,msg:"登录失败"})
    }


})




app.listen(80,()=>{
    console.log(".......");
})


/*
    cookie :
        - 浏览器端的
        - 保存的session-id
        - cookie可以设置生命周期

    session :
        - 服务端的
        - session保存的是用户信息
        - session自己没有设置生命周期的功能,可以借助其它工具redis


    cookie和session有什么关系
        session设置成功会自动把sessionid返回给浏览器的cookie

        浏览器访问网站的时候,会自动的把cookie传递给服务端，服务端获取到sessionid,返回用户信息

    我再chrome当进行登录,再firefox当中查询cookie可以查到嘛?
        - 不能,每个浏览器都有属于自己的cookie存储


*/