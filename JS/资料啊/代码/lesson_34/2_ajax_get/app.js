const express = require("express");

const app = new express();


app.get("/index",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    //url
    //res.send(JSON.stringify(req.query))
    console.log(req.query);
    res.json(req.query);
})


app.listen(80,()=>{
    console.log("..........")
})