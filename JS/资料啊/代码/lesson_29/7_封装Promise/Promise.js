class Promise{

    constructor(executor){

        this.PromiseState = "pending";
        this.PromiseResult = undefined
        this.callbacks = []; //映射  key->val

        let resolve = value=>{
            if(this.PromiseState === "pending"){
                this.PromiseState = "fulfilled";
                this.PromiseResult = value;
                
                this.callbacks.forEach(item=>{
                    // item.onFulfilled = ()=>{callback(onFulfilled)}
                    /*
                      let callback = (type) => {
                        //type = onFulfilled
                        //res = onFulfilled(this.PromiseResult);//调用函数
                        //res =  new Promise((resolve,reject)=>{
                        //           reject("ok");
                        //       })
                        let res = type(this.PromiseResult);//调用函数
                        
                        if(res instanceof Promise){
                            res.then(v=>{
                                resolve(v);
                            },r=>{//res = promise -> state = "rejected" -> onRejected
                                reject(r);
                            })
                        }else{
                            resolve(res);
                        }
                    }
                    
                    
                    */
                    item.onFulfilled();
                })
            }
        }

        let reject = reason=>{
            if(this.PromiseState === "pending"){
                this.PromiseState = "rejected";
                this.PromiseResult = reason;
                this.callbacks.forEach(item=>{
                    item.onRejected()
                })
            }

        }

        executor(resolve,reject);
    }

    then(onFulfilled,onRejected){
        //无论如何返回一个promise
        return new Promise((resolve,reject)=>{

            //定一函数
            let callback = (type) => {
                //type 也是一个函数
                let res = type(this.PromiseResult);//调用函数
                
                if(res instanceof Promise){
                    res.then(v=>{
                        resolve(v);
                    },r=>{//res = promise -> state = "rejected" -> onRejected
                        reject(r);
                    })
                }else{
                    resolve(res);
                }
            }


            //状态判断
            if(this.PromiseState === "fulfilled"){
                callback(onFulfilled);
            }

            //状态判断
            if(this.PromiseState === "rejected"){
                callback(onRejected);
            }

            //状态判断
            if(this.PromiseState === "pending"){
                this.callbacks.push({
                    onFulfilled : ()=>{callback(onFulfilled)},
                    onRejected : ()=>{callback(onRejected)},
                })
            }
        })
    }
}