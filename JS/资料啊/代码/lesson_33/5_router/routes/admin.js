const express = require("express");
//路由中不需要去new express
//因为app.js当中已经实例过了

//路由对象
const router = express.Router();

//api
router.get("/abc",(req,res)=>{
    res.send("/admin/abc")
})

//导出
module.exports = router;