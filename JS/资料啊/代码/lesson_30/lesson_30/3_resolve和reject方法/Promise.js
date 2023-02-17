class Promise{
    constructor(executor){

        this.PromiseState = "pending";
        this.PromiseResult = undefined;
        this.callbacks = [];
        
        //局部函数
        let resolve = value => {
            if(this.PromiseState === "pending"){
                this.PromiseState = "fulfilled";
                this.PromiseResult = value;

                this.callbacks.forEach(item=>{
                    item.onFulfilled();
                })
            }
        }

        let reject = reason => {
            if(this.PromiseState === "pending"){
                this.PromiseState = "rejected";
                this.PromiseResult = reason;

                this.callbacks.forEach(item=>{
                    item.onRejected();
                })
            }
        }

        try {
            executor(resolve,reject);
        } catch (error) {
            reject(error);
        }
        
    }


    then(onFulfilled,onRejected){
        return new Promise((resolve,reject)=>{

            //局部函数
            let callback = type => {
                let res = type(this.PromiseResult);

                if(res instanceof Promise){
                    res.then(v=>{
                        resolve(v);
                    },r=>{
                        reject(v);
                    })
                }else{
                    resolve(res);
                }
            }



            if(this.PromiseState === "fulfilled"){
              
                    callback(onFulfilled);
                
                
            }

            if(this.PromiseState === "rejected"){
                
                    callback(onRejected);
                
            }

            if(this.PromiseState === "pending"){
                //解决异步问题
               
                    this.callbacks.push({
                        onFulfilled : ()=>{callback(onFulfilled)},
                        onRejected : ()=>{callback(onRejected)},
                    })
                
                
            }
        })
    }


    catch(onRejected){
        return this.then(undefined,onRejected);
    }

    finally(callback){

        //最后运行的
        setTimeout(()=>{
            callback();
        })
        
    }


    static resolve(value){
        return new Promise((resolve,reject)=>{
            if(value instanceof Promise){
                value.then(resolve,reject);
            }else{
                resolve(value);
            }
        })
    }

    static reject(reason){
        return new Promise((resolve,reject)=>{
            reject(reason);
        })

    }


}