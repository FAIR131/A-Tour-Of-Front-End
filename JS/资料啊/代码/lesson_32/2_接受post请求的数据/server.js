const http = require("http");

const server = http.createServer((req,res)=>{
    let body = "";
//    console.log(req.url);//post请求参数是包(数据流,请求报文)

    //接受数据事件,接受的是数据流
    /*
        APIPOST - post传参
            - 
    */

    //on是不是异步
    req.on("data",chunk=>{//chunk->数据块
        body += chunk.toString();
        res.end(body);
    })


    
    
})


server.listen(80,()=>{
    console.log("running.....");
})