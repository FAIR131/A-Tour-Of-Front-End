const http = require("http");
const fs = require("fs");

const server = http.createServer((request,response)=>{
    //request : 请求对象  前 ---> 后
    //response : 响应对象  后 ----> 前

    let res = fs.readFileSync("../lesson_31/2_lazy-loading/data.json");

    response.end(res);
})


server.listen(80);