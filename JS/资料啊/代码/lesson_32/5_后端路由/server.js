const http = require("http");
const fs = require("fs");


const server = http.createServer((req,res)=>{
    //路由 get post
    //http://127.0.0.1/admin?name=tom&age=18
    //http://127.0.0.1/index

    let {method,url} = req; //req.method   req.url

    //设置响应头
    res.setHeader("Content-Type","text/html;charset=utf-8")

    if(method === "GET" && url === "/index"){//首页
        res.end("首页");
    }else if(method === "GET" && url === "/admin"){//后台
        res.end("后台");
    }else if(method === "GET" && url === "/login"){ //登录页面
        res.end("登录");
    }else{
        //status(状态)Code(码)
        // req.statusCode =
        let page = fs.readFileSync("./404.html").toString();

        res.end(page);
    }



    // res.end("不需要重启")
})


server.listen(80,()=>{
    console.log("开机....");
})