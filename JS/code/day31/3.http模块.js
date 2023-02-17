//1.引入模块
const http = require('http');
//2.创建服务
const server = http.createServer((request,response)=>{
    response.setHeader('Content-Type',' text/html;charset=utf-8')

    response.end('hello,世界');
})

//3.监听端口
server.listen(80,()=>{
//    当前回调可写可不写，服务器开始给一个提示
    console.log('server is runing...')
})

// 10.31.155.74