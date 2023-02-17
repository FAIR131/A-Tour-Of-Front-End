const http = require("http");
const query = require("./query");//导入本地模块


const server = http.createServer((req,res)=>{
    let data = null;
    //发送过来参数属于request 
    if(req.method === "GET"){
        data = query.urlQuery(req.url);
    }
   
    //后端返回的数据必须是string类型
    res.end(JSON.stringify(data));
})
/*
APIPOST get - query 

*/

server.listen(80,()=>{
    console.log("running......");
})