const express = require("express");
const fs = require("fs");

const app = new express();

//安装ejs
// npm i ejs
//配置视图模板
//ejs模板
app.set("views",__dirname+"/views"); 
//配置解析引擎
app.set("view engine","ejs");



app.get("/home",(req,res)=>{

    //send返回字符串
    res.send(fs.readFileSync("./views/home.html").toString());
})




app.get("/index",(req,res)=>{

    let title = "你好node";
    let arr = [
        {name:1,age:2},
        {name:1,age:3},
    ]

    let s = ` <script>
                while(true){
                    alert("你个大傻X")
                }
            </script>`;

    //CSRF攻击
    /*
        我的网站可以评论
        <script>
            while(true){
                alert("你个大傻X")
            }
        </script>


        %lt;script&gt;
    */
    /*
        index.ejs当作字符串读取过来
        使用正则匹配<%= %>
        把变量对应
    */
    res.render("index",{title,arr,s});
    
})



//下载
app.get("/download",(req,res)=>{
    res.download("./views/home.html");
})

//重定向
app.get("/*",(req,res)=>{
    res.redirect("/home");
})




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