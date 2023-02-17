const express = require ('express')
const app = express()

app.get('/',(req,res)=>{
    res.send({
        name:abc,
        age:100
    })
})

app.get('/login',(req,res)=>{

    res.send('login')
})


const  func1 = (req,res,next)=>{
    //验证用户token过期
    console.log('验证token')
    const  isValid = true
    if(isValid){
        res.abc='这是fun1计算结果'
        next()
    }else{
        res.send('error')
    }
}

app.use(func1)

const func2=(req,res)=>{
    //查询数据
    //返回内容
    res.send({list:[1,2,3]})
}

app.get('/home',[func2])
app.get('/list',(req,res)=>{
    res.send('111')
})

app.listen(3000,()=>{
    console.log('run')
})