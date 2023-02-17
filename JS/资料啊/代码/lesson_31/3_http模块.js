/*
    node.js 当中内置一个http模块
    可以使用http模块创建了后端服务(后端API,后端接口)
*/

//1.引入模块
const http = require("http");
//2.创建服务 server服务器
/*
    request  : 请求对象 (前端 把信息 传递给后端 , 可以解析请求报文)
    response : 响应对象 (后端 把信息 返回给前端 , 设置响应报文)
*/
const server = http.createServer((request,response)=>{
    
    response.setHeader("Content-Type" , "text/html;charset=utf-8");
    //end():返回数据,并且停止运行   
    response.end("Hello NodeJS-HTTP module 中文能不能识别");
}); 

//3.监听端口
/*
    端口号 : 计算机服务窗口号 , 一共有65535个
    监听端口 , 等待数据传递 , 然后处理什么逻辑
    80:http  443:https
    不建议使用的 3306:MySQL  27017:MongoDB  6379:Redis  5500:live server 25:SMTP 
    建议使用的 : 3000  8080  9000  8000
*/
//listen : 
server.listen(8000 , ()=>{
    //当前回调可以写也可以不写,服务器开启给一个提示
    console.log("server is runing......")
});

//cmd ipconfig
//macos ifconfig       ip addr

//10.31.155.86          局域网ip
//127.0.0.1 = localhost = 本地默认ip
