const express = require("express");

const valiaddr = require("../middlewares/admin_middleware");
//路由中不需要去new express
//因为app.js当中已经实例过了

//路由对象
const router = express.Router();

//api
//valiaddr

router.get("/abc",valiaddr,(req,res,next)=>{
    console.log(2);
    res.send("/admin/abc")
    next()
})

//导出
module.exports = router;