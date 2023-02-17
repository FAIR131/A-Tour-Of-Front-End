//现在有目录dirA ,如果子文件不为空，如果存在则 复制 到dirB当中，

const fs = require("fs");


let path1 = "./dir/dirA";
let path2 = "./dir/dirB";

//打开A
fs.readdir(path1,(err,files)=>{
    if(err) throw err

    //files是一个数组
    files.forEach(item=>{//[]
        //item - > "a.txt"
        let cpath = `${path1}/${item}`;

        fs.stat(cpath,(err,status)=>{//状态
            if(err) throw err

            if(status.isFile()){//是文件

                //复制文件过去
                fs.readFile(cpath,(err,content)=>{
                    if(err) throw err

                    let r = content.toString();

                     //先在dirB当中创建一个空文件
                    //./dir/dirB/a.txt
                    let bpath = `${path2}/${item}`;

                    fs.writeFile(bpath,r,(err)=>{
                        if(err) throw err

                        console.log("搞定");
                    })
                })
            }
        })
    })
})

