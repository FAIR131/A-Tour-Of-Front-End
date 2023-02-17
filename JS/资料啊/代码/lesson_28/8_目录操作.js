const fs = require("fs");


//创建目录
// fs.mkdir("./demo/demo2",function(err){
//     if(err) throw err
//     console.log("红包创建好了,等你放钱")
// })


//读取目录的子列表
// fs.readdir("../",(err,files)=>{
//     if(err) throw err

//     console.log(files);//数组类型 , 名词叫做文件列表
// });


//递归创建目录
// fs.mkdir("./demo/demo3/demo31/demo311",{recursive:true},(err)=>{
//     if(err) throw err
//     console.log(1111);
// })


//删除文件夹
// fs.rmdir("./demo/demo3",{recursive:true},(err)=>{
//     if(err) throw err
//     console.log(1111);
// })