//打印目录结构树
const fs = require("fs");

/*
    fs.stat();
    [] 空目录过滤


*/

//读取目录
let path = "C:/Users/ruidong/Desktop/code/lesson_28";


/*
    /
    ----base
    --------lesson_1
    ------------imgs
    ----------------1.pngt
    ----lesson_24

*/
let pathTree = ["/"];

function rec(path,level=0){
    /*
        @path : 路径
        @pathTree : 拼接的树字符串
        @level : 层级
    */
    level++  
    let sign = "----";
    fs.readdir(path,(error,files)=>{
        
        if(error) throw error

        // console.log(files);
        files.forEach(item=>{//当数组为空不循环
            
            //item就是子文件的名称
            

            //向下一层检测
            //判断是不是个目录,是目录则递归
            //如何判断是不是目录了
            
            let cpath = `${path}/${item}`;
            fs.stat(cpath,(err,status)=>{
                if(status.isDirectory()){
                    pathTree[0] += `\n${sign.repeat(level)}${item}`;
                    rec(cpath,level);
                }
            })
        })
       console.log(pathTree[0]);
    })
    
}

rec(path);

