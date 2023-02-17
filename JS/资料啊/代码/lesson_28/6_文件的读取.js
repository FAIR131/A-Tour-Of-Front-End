//导入fs模块
const fs = require("fs");

//同步
// let content = fs.readFileSync("./demo/1.txt"); //返回的结果是Buffer

// //cpu调度 硬盘 把"./demo/1.txt"文件 读取到内存当中  程序只能从内存当中获取内容

// console.log(content.toString());


//异步


// fs.readFile("./demo/1.txt",function(err,data){
// error-first
//     if(err) throw err
//
//     console.log(data.toString());
// });



//流读取
const rs = fs.createReadStream("./demo/1.mp4");

//拷贝
const ws = fs.createWriteStream("./demo/2.mp4");

// rs.on("data",chunk=>{//数据块  64M
//     console.log(chunk.toString());
//     ws.write(chunk);
// })

// rs.on("end",status=>{//数据传输结束
//     rs.close();
//     ws.close();
// })


//pipeline  管道
// rs.pipe(ws);

// rs.close();
// ws.close();


