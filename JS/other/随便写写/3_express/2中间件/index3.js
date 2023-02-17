const express = require('express');
const app = express()
const homeRouter = require("./router3/homeRouter")
const loginRouter = require("./router3/loginRouter")

//应用级别
app.use(function (req,res,next){
    console.log('验证token');
    next()
})

//应用级别
app.use("/home",homeRouter)
app.use("/login",loginRouter)

app.listen(3000,()=>{
    console.log('run')
})