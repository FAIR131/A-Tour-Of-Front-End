const express = require("express")

const app = new express();

app.get("/testAJAX", function (req, res) {
    console.log("收到请求");

    var callback = req.query.callback;

    var obj = {
        name: "孙悟空",
        age: 18
    }
    res.send(callback + "(" + JSON.stringify(obj) + ")");//abc({name:,age})
});


app.listen(80,()=>{
    console.log("......");
})