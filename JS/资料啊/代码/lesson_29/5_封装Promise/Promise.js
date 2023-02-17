function Promise(executor){
    if(this instanceof Promise){
        this.PromoiseState = "pending";
        this.PromoiseResult = undefined;

        //用来记录onFulfilled和onRejected函数的
        this.callbacks = [];
    
        let resolve = value =>{
            if(this.PromoiseState === "pending"){
                this.PromoiseState = "fulfilled";
                this.PromoiseResult = value;

                this.callbacks.forEach(item=>{
                    //item  = obj
                    item.onFulfilled(value);//调用
                })
            }
        }
    
        let reject = reason =>{
            if(this.PromoiseState === "pending"){
                this.PromoiseState = "rejected";
                this.PromoiseResult = reason;

                this.callbacks.forEach(item=>{
                    item.onRejected(reason);
                })
            }
        }

        executor(resolve,reject);
    }else{
        return new Promise(executor);
    }
}


Promise.prototype.then = function(onFulfilled,onRejected){

    if(this.PromoiseState === "fulfilled"){
        onFulfilled(this.PromoiseResult);
    }

    if(this.PromoiseState === "rejected"){
        onRejected(this.PromoiseResult);
    }

    if(this.PromoiseState === "pending"){
        this.callbacks.push({
            onFulfilled,
            onRejected
        })
    }


}