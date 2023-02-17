const express = require('express')
const fs = require('fs')
const app = new express();

//返回HTML
//前后端不分离
app.get('./home',(req,res)=>{
    //send返回的是字符串
    res.send(fs.readFileSync('./vieews/home.html').toString())
})
app.get('./index',(req,res)=>{
    //send返回的是字符串
    res.send(fs.readFileSync('./vieews/home.html').toString())
})


app.listen(80,()=>{
    console.log('run')
})