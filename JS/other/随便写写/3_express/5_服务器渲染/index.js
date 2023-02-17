const express = require('express');
const app = express()
const homeRouter = require("./router/homeRouter")
const loginRouter = require("./router/loginRouter")

//应用级别
app.use(function (req,res,next){
    console.log('验证token');
    next()
})

//配置静态资源
app.use(express.static('public'))
app.use(express.static('static'))

//配置解析post参数的的--不用下载第三方，内置了
app.use(express.urlencoded({extended:false}))//post参数-username=abc&password=123
app.use(express.json())//post参数-{"username":"abf","age":18}

//应用级别
app.use("/home",homeRouter)
app.use("/login",loginRouter)

app.listen(3000,()=>{
    console.log('run')
})