/*
    get : 
        前端form

        method="get"  enctype="text/plain"

        url参数拼接的 http://www.xxx.com/path?name=xxx&age=xxx

        get上传的数据量有限2k,4k,8k

        后端

        request.url

    post : 
        前端form 只能传递数据,不能上传文件
        method="post"  enctype="application/x-www-form-urlencode"

        参数不显示在url中,显示在数据包(载荷)当中

        前端form 只能传递数据,能上传文件
        method="post"  enctype="multipart/form-data"

        上传的数据量无限

        后端

        request.on("data",chunk=>{
            chunk.toString()
        })



*/

/*
        npm
            npm init -y : package.json

            C:\Users\username\AppData\Roaming\npm\node_modules
            npm i xxxxx -g   全局
            npm i xxxxx      局部

            全局安装一次,可以一直使用
            局部在什么目录安装,在那个目录使用

            npm remove xxxx 删除包

            npm i xxxx@4.17.20

        express 后端框架
            
        const exp = require("express");

        const app = new exp();

        //路由 API
        app.get("/path",(request,response)=>{
            response.send("string");
        })

        app.listen(80,()=>{

        })


*/