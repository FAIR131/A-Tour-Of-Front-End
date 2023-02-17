const http = require('http');
const server = http.createServer((request,response)=>{
//request 请求对象
//     console.log(request.method)
//     console.log(request.url)
//     console.log(request.httpVersion)




    response.end('end')
})

server.listen(80,()=>{
    console.log('aaaa')
})



