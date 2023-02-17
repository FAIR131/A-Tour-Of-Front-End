// const https=require("https");
// https.get("https://www.baidu.com",(res)=>{

//     let data="";
//     res.on("data",chunk=>{
//         data+=chunk;
//     })

//     res.on("end",()=>{
//         console.log(data);
//     })
// })

const express = require('express')
// var cors = require('cors')
const app = express()
// app.use(cors())
app.get('/api', function (req, res) {
  res.send('Hello World123 456')
})

app.post('/api/haha', function (req, res) {
  res.send('post响应')
})

app.listen(5000,function(){
    console.log("服务成功运行在5000端口");
})