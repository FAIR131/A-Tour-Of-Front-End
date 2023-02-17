const http = require ('http');
const query = require('./query');//导入本地模块
const server = http.createServer((request,response)=>{
    //发送过来的参数
    // console.log(request.url)
    // console.log(query.urlQuery(request.url))
    let data = null;
    if(request.method){
       data = query.urlQuery(request.url)
    }

    //后端返回的数据必须是string类型
    response.end(JSON.stringify(data))
})

server.listen(80,()=>{
    console.log('running')
})

