
//同步先运行,然后再异步

new Promise((resolve,reject)=>{

    console.log(1);//promise同步
    resolve(undefined);

}).then(value=>{

    console.log(2); //异步
})


console.log(3);   //同步