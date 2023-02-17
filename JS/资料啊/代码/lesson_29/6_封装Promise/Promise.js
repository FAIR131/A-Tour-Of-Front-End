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
                    item.onFulfilled(value)
                })
            }
        }

        let reject = reason=>{
            if(this.PromiseState === "pending"){
                this.PromiseState = "rejected";
                this.PromiseResult = reason;
                this.callbacks.forEach(item=>{
                    item.onRejected(reason)
                })
            }

        }

        executor(resolve,reject);
    }

    then(onFulfilled,onRejected){

        if(this.PromiseState === "fulfilled"){
            return new Promise((resolve,reject)=>{
                let res = onFulfilled(this.PromiseResult);
                
                //res有2种结果    Promise对象  不是Promise对象
                if(res instanceof Promise){//undefined 
                    //如果是promise对象,要调用resolve
                    res.then(v=>{
                        resolve(v);
                    },r=>{
                        reject(r);
                    })
                }else{
                    resolve(res); 
                }
            })
            
        }

        if(this.PromiseState === "rejected"){
            return new Promise((resolve,reject)=>{
                let res = onRejected(this.PromiseResult);
                
                //res有2种结果    Promise对象  不是Promise对象
                if(res instanceof Promise){//undefined 
                    //如果是promise对象,要调用resolve
                    res.then(v=>{
                        resolve(v);
                    },r=>{
                        reject(r);
                    })
                }else{
                    resolve(res); 
                }
            })
        }

        if(this.PromiseState === "pending"){

            //当前位置的状态不太好修改
            return new Promise((resolve,reject)=>{
                this.callbacks.push({
                    onFulfilled,
                    onRejected
                })
            })
              
            
        }

       
    }
}