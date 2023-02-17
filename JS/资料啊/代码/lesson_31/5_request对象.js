const http = require("http");

const server = http.createServer((request ,response)=>{

    //request : 请求对象
    //1.获取请求的方式
    // console.log(request.method);
    //2.获取请求的url
    // console.log(request.url);
    //3.获取http协议的版本号 1.1
    // console.log(request.httpVersion);
    //4.获取http的请求头信息
    // console.log(request.headers);
    //5.获取请求者的ip
    let ip = (request.headers['x-forwarded-for'] || '').split(',').pop().trim() || 
    request.connection.remoteAddress || request.socket.remoteAddress || request.connection.socket.remoteAddress;


    console.log(`IP = ${ip}`);
    
    response.end("end");

})

server.listen(80,()=>{
    console.log("i can fly ....");
});