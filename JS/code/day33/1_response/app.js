const express = require('express')

const app = new express();

//路由 API接口
app.get('/',(req,res)=>{
    //
    res.end('ok');
})

app.get('/*',(req,res)=>{
   // res.write('123') 有多个 ； end('123')

    //404是路径写错了，
    res.status( 404)
    res.send('not fund 404');
})

app.listen(80,()=>{
    console.log('run')
})