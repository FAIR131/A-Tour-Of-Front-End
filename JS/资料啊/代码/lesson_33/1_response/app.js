const express = require("express");

const app = new express();


//路由 API接口
app.get("/index",(req,res)=>{
    //response对象
    res.send("ok");
})

app.get("/*",(req,res)=>{
    //404是状态  路径写错了
    res.status(404);
    //设置响应头
    res.setHeader("Content-Type" , "text/html;charset=gbk");
    res.setHeader("name" , "tom");

    //res.write("123") 有多个;  end("123");

    //end()
    res.send("页面被外星人劫持了");
})

/*
    http网络状态
       100-199 用于指定客户端应相应的某些动作。(基本看不到)

    　　200-299 用于表示请求成功。 (希望的)

    　　300-399 用于已经移动的文件并且常被包含在定位头信息中指定新的地址信息。

    　　400-499 用于指出客户端的错误。(路径写错了)
  
    　　500-599 用于支持服务器错误。  (后端代码错误)

*/
app.listen(80,()=>{
    console.log("running......")
})

/*
    node app.js

    nodemon app.js

    package.json
        - scripts  "start":"nodemon app.js"
    npm start
*/