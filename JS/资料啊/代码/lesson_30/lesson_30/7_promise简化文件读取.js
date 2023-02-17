// const fs = require("fs");


//异步函数
// let a = async function(){

// }

// async function demo (){

// }

// //IIAFE
// (async function (){

// })()


// async function demo(){
//     let a = await "123";

//     //b应该是promise对象
//     //await 把promise对象的返回结果直接取出来
//     let b = await new Promise((resolve,reject)=>{
//         resolve("ok")
//     })

//     let c = await Promise.resolve("js");

//     return a + b +c
// }

// demo().then(v=>{
//     console.log(v)
// })







//内置库  ---> 内库
const fs = require("fs");
const util = require("util");//工具打包
let path = __dirname + "/files"; // lesson_30

//ify 转化
const myReadFile = util.promisify(fs.readFile);//promise 版本的 readFile 函数

//异步函数
async function readAll(){
    try{
        //异步的内容 看上去 很像同步代码
        //await 后面必须是promise对象
        let f1 = await myReadFile(path+"/1.txt");
        let f2 = await myReadFile(path+"/2.txt");
        let f3 = await myReadFile(path+"/3.txt");

        return f1+f2+f3
    }catch(e){
        throw e
    }
}

readAll().then(v=>{
    console.log(v);
})