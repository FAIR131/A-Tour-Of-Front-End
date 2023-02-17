const express = require("express");

const app = new express();

app.use(express.urlencoded({extended:false}));


app.get("/index",(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin","*");
    console.log(req.query);
    res.json(req.query);
    // res.send("123");
})

app.post("/index",(req,res)=>{

    res.setHeader("Access-Control-Allow-Origin","*");
    console.log(req.body);
    // console.log(req.query);
    res.json(req.body);
    // res.send("123");
})


app.listen(80,()=>{
    console.log(".......");
})