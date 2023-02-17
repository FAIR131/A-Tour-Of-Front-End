const express = require ('express')
const app = express()

/*
app.get('/ab?cd',(req,res)=>{
    //b可以不带 acd,abcd
    res.send('ok')
})
*/

/*app.get('/ab/:id',(req,res)=>{
    //b可以不带 acd,abcd
    res.send('ok')
})*/

/*app.get('/home',(req,res,next)=>{
    //验证用户token过期
    console.log('验证token')
    const  isValid = true
    if(isValid){
        next()
    }else{
        res.send('error')
    }
},(req,res)=>{
    //查询数据
    //返回内容
    res.send({list:[1,2,3]})
})*/

const  func1 = (req,res,next)=>{
    //验证用户token过期
    console.log('验证token')
    const  isValid = true
    if(isValid){
        next()
    }else{
        res.send('error')
    }
}

const func2=(req,res)=>{
    //查询数据
    //返回内容
    res.send({list:[1,2,3]})
}

app.get('/home',[func1,func2])
app.get('/list',[func1],(req,res)=>{
    res.send('111')
})

app.listen(3000,()=>{
    console.log('run')
})