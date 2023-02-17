const express = require('express');
//路由级别
const  router = express.Router()
router.get('/home',(req,res)=>{
    res.send('home')
})

router.get('/login',(req,res)=>{
    res.send('login')
})

app.use((req,res)=>{
    res.status(404).send('丢了')
})
module.exports = router