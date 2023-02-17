
//js的宏队列和微队列
/*
    同步第一个运行,其次是 微 ,最后是宏

    微队列 : promise.then() 
    宏队列 : ajax  setTimeout setIntervel
*/

console.log(0);//同步

new Promise((resolve,reject)=>{

    setTimeout(()=>{
        console.log(1); //异步 宏
    })

    console.log(2);  //同步   


    resolve(undefined);

}).then(value=>{

    console.log(3);   //异步  微

    setTimeout(()=>{
        console.log(4);    // 微 - 宏
    })
    
})


setTimeout(()=>{
    console.log(5);     //异步 宏
})

//0 2 3 1 5 4
