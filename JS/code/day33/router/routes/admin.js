const express = require('express');
//路由中，不需要new express
//app。js 中已经实例过了

const router = express.Router();

//api
router.get('/abc',(req,res)=>{
    res.send('/admin/abc')
})




