/*
    event(事件)-loop(循环)
        - 是js当中的运行机制
        - 在js当中一共有3运行队列
            - 同步队列(第一运行单位)
                - 从上到下的顺序执行
            - 异步队列
                - 微队列(第二运行单位)
                    - 从上到下的顺序执行
                - 宏队列(第三运行单位)
                    - 从上到下的顺序执行
                    - setTimeout有时间的,按照时间大小排列，小的排前列

    event-loop : 给微队列和宏队列设定的
                每次只获取一个代码执行事件,运行完成以后,再去获取
    不同代码的类型运行的优先级
*/


new Promise((resolve,reject)=>{
    //同步
    console.log(1);

    resolve(undefined);
}).then(value=>{
    //异步的微队列
    console.log(2);

    new Promise((resolve,reject)=>{
        //异步的微队列
        console.log(3);

        resolve(undefined);
    }).then(value=>{

        //异步的微队列-->异步的微队列
        console.log(4);

        setTimeout(()=>{
            ////异步的微队列-->异步的微队列---->宏队列
            console.log(5);
        })
    })
})

console.log(6); //同步   

//1 6 2 3 4 5