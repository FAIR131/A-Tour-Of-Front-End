//fs file system 

const fs = require("fs");

//fs.writeFileSync(path,content) 同步

// let a;
// fs.writeFile(path,content,{flag:awr},err=> {

//})

// console.log(a);//undefined

//流式写入适合大文件

//创建流写入管理器
//流 
/*

    - 打开
        - write()
        - 写入
    - 关闭
*/
const cws = fs.createWriteStream("./demo/3.txt");


//mode : 文件权限
//user(自己) group(小组成员) other(其他人)     
//r (4)   w (2)  x 文件夹执行(1) - (0)
//750
// console.log(cws);

/*  
    fs.writeFile
    - 打开文件
    -  写入
    -  关闭文件
*/
cws.write("123\n");

cws.write("321\n");

cws.write("213\n");

cws.close();










