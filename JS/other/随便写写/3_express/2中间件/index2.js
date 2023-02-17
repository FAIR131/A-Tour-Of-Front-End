const express = require('express');
const app = express()
const indexRouter=require('./route2/indexRouter')
//应用级别
app.use(function (req,res,next){
    console.log('验证token');
    next()
})

//应用级别
app.use('/',indexRouter)

app.listen(3000,()=>{
    console.log('run')
})