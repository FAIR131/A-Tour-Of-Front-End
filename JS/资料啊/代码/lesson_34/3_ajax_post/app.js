const express = require("express");

const app = new express();

app.use(express.urlencoded({ extended: false }));


app.get("/index",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    
    console.log(req.query);
    res.json(req.query);
})

app.post("/index",(req,res)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    
    console.log(req.body);
    res.json(req.body);
})


app.listen(80,()=>{
    console.log("..........")
})