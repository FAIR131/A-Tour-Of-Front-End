const fs = require("fs");


//Nodejs的关键字
//console.log(__dirname);//C:\Users\ruidong\Desktop\code\lesson_28
//console.log(__filename);//C:\Users\ruidong\Desktop\code\lesson_28\9_查看文件状态.js

//查看文件的状态
fs.stat(__dirname,(err,status)=>{
    //status状态
    if(err) throw err
    console.log(status.isDirectory()); //判断是不是目录
    console.log(status.isFile());      //判断是不是文件
});