const http = require ('http');
const server = http.createServer((req,res)=>{
  let body = '';
    // console.log(req.url)

    //接受数据事件，接收的是数据流
    req.on('data',chunk=>{
        body +=chunk.toString()
    })
    res.end(body)

})

server.listen(80,()=>{
    console.log('running')
})

