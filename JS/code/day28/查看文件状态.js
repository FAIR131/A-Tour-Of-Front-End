const fs = require('fs');


//nodejs关键字
// console.log(_dirname);

//查看文件状态
fs.stat(__dirname+'/3_buffer.js',(err,status)=>{
    // 状态
    if(err) throw  err
    // console.log(status)
    //判断是不是目录
    status.isDirectory();
    //判断是不是文件
    status.isFile();
});