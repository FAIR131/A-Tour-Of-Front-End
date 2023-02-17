/*
*   fs模块
*       file system 文件 系统
* */

// import {writeFile} from "node:fs"

// const fs = require("fs");//require引入

//文件的写入
/*
*  @path : 写入的路径
*  @data : 写入的数据
*  @flag : {a:append(追加),w:write(写入),r:read(读取)}
*  @callback : 回调函数
* */

//异步写入
fs.writeFile("./demo/1.txt","徐志摩",{flag:"w"},(error)=>{
    //error是错误对象
    if(error) throw error

    //没有错误
    console.log("文件写入成功");
});


// fs.writeFile("./demo/1.txt","\n李白",{flag:"a"},(error)=>{
//     //error是错误对象
//     if(error) throw error
//     //没有错误
//     console.log("文件写入成功");
// });


//同步写入

//加入文字有1000万亿个,写入的事件要多长?
/*
    try{
        写代码的逻辑
    }catch(error){
        错误捕获
        // throw error
    }


*/

let sign = false;
try{//试一试
    fs.writeFileSync("./demo/2.txt","托尼老师,给我剪个10亿身价的发型");
    sign = true;
    console.log(sign);
}catch(e){//捕获错误
    sign = false;
}

console.log(1);







