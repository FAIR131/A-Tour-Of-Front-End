/*
    Promise : 异步解决方案,解决异步嵌套问题
            : 工具
            : 他是一个类对象

            : Promise((resolve , reject)=>{
                resolve(result); //成功使用resolve 
                reject();  //失败使用reject
            })

            Promise有状态 
                : PromiseState 
                    - pending : 等待
                    - resolve ----> fullfilled : 成功
                    - reject -----> rejected   : 失败

                只能是pending变为fullfilled或rejected
                fullfilled不能转变为rejected
                rejected不能转变为fullfilled

            resolve函数
                - 返回的是一个Primise对象
                - resolve,reject把结果返回给then

                - Promise.then(value=>{
                        resolve
                },reason=>{
                        reject
                })     

*/
const fs = require("fs");


let path1 = "./dir/dirA";
let path2 = "./dir/dirB";



let p = new Promise((resolve , reject)=>{//容器

    fs.readdir(path1,(err,files)=>{
        if(err) reject(err) //throw 相当于reject()
        resolve(files); //files = ["a.txt"]
    })
});

//return new Promise 
let p1 = p.then(value=>{
    return new Promise((resolve , reject)=>{
        value.forEach(item=>{
            let cpath = `${path1}/${item}`;
            fs.stat(cpath,(err,status)=>{
                if(err) reject(err)
                resolve({status,cpath,item});
            })
        })
    })

})

let p2 = p1.then(value=>{//value=obj
    return new Promise((resolve,reject)=>{
        if(value.status.isFile()){//是文件
            //复制文件过去
            fs.readFile(value.cpath,(err,content)=>{
                if(err) reject(err)
                resolve({content:content.toString(),item: value.item});
            })
        }
    })
    
           
})

p2.then(value=>{
    let bpath = `${path2}/${value.item}`;
    fs.writeFile(bpath,value.content,(err)=>{
        if(err) throw err
        console.log("搞定");
    })
})