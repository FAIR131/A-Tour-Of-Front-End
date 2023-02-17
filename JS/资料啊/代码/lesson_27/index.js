//静态导入
import o from "./router.js"
import obj from "./other.js"

let a = 1;

//动态导入 then 然后
//异步的 setTimeout 
// import("./other.js").then(obj=>{
//     console.log("===>",obj);

//     a = 10;
// })


console.log("--->",o,a,obj);