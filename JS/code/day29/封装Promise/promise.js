class Promise {
    constructor(executor) {//构造函数
        //executor执行器 = （resolve，reject）=>{}
        //promise当中包含状态
        this.PromiseState = 'pending';
        this.PromiseResult = undefined;

        //用来记录onFulfilled和onRejected函数的
        this.callbacks = [];
        //局部函数
        let resolve = (value) => {
            if (this.PromiseState === 'pending') {
                //改变状态
                this.PromiseState = 'fulfilled';
                //改变结果
                this.PromiseResult = value;
                this.callbacks.onFulfilled(value)
            }

        }

        //局部函数
        let reject = (reason) => {
            if (this.PromiseState === 'pending') {
                this.PromiseState = 'rejected';
                this.PromiseResult = reason;

                this.callbacks.forEach(item=>{
                    item.onRejected(reason);
                })
            }
        }

        executor(resolve, reject);//调用
    }

    then(onFulfilled,onRejected){
    //    可以根据状态选择调用谁
        if(this.PromiseState==='fulfilled'){
            onFulfilled(this.PromiseResult);
        }

        if(this.PromiseState==='rejected'){
            onRejected(this.PromiseResult);
        }

        if(this.PromiseState==='pending'){
            this.callbacks.push({
                onFulfilled,
                onRejected
            })
        }
    }
}