
const fs = require("fs");
const { resolve } = require("path");

let path = __dirname + "/files"; // lesson_30

//读取1 2 3 .txt 把内容合并输出
// let p1 = new Promise((resolve,reject)=>{
//     fs.readFile(path + "/1.txt",(error,content)=>{
//         if(error) throw error
//         resolve(content.toString());
//     })
// })

// let p2 = new Promise((resolve,reject)=>{
//     fs.readFile(path + "/2.txt",(error,content)=>{
//         if(error) throw error
//         resolve(content.toString());
//     })
// })

// let p3 = new Promise((resolve,reject)=>{
//     fs.readFile(path + "/3.txt",(error,content)=>{
//         if(error) reject(errot);
//         resolve(content.toString());
//     })
// })

// let all = Promise.all([p1,p2,p3]);

// all.then(value=>{
//     let str = "";
//     value.forEach(item=>{
//         str += item
//     })

//     console.log(str);
// }).catch(reason=>{

// })





/*
    async : 异步 关键字
        - async 只能写在函数之前
        - async 是promise的语法糖
        - 把函数的返回值变成promise对象
*/

async function readf(){

    //try-catch-throw 代表的是reject
    // try {//错误捕获
    //     let
    // } catch (error) {
    //     throw "err"
    // }

    return 123 //async函数昂中return 代表的是 resolve
}

// console.log("--->",readf());

// readf().then(value=>{
//     console.log("---->",value);
// }).catch(reason=>{

// })


/*
    await 关键字
        - Promise.all
        - 只能写在async函数当中
*/


// async function readall(){

//     async function read1(){
//         fs.readFile(path + "/1.txt",(error,content)=>{
//             if(error) throw error
//             return content.toString()
//         })
//     }

//     async function read2(){
//         fs.readFile(path + "/2.txt",(error,content)=>{
//             if(error) throw error
//             return content.toString()
//         })
//     }

//     async function read3(){
//         fs.readFile(path + "/3.txt",(error,content)=>{
//             if(error) throw error
//             return content.toString()
//         })
//     }

// }

