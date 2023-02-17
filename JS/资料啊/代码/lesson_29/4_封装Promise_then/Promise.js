class Promise{
    constructor(executor){//构造函数
        //executor执行器 = (resolve,reject)=>{}
        //Promise当中包含状态
      
        this.PromiseState = "pending";
        this.PromiseResult = undefined;

        //局部函数
        let resolve = (value)=>{
            if(this.PromiseState === "pending"){
                //改变状态
                this.PromiseState = "fulfilled";
                //改变结果
                this.PromiseResult = value;
            }
        }
        //局部函数
        let reject = (reason)=>{
            if(this.PromiseState === "pending"){
                //改变状态
                this.PromiseState = "rejected";
                //改变结果
                this.PromiseResult = reason;
            }
        }

        executor(resolve,reject);//调用
    }

    then(onFulfilled , onRejected){
        //onFulfilled 处理成功的回调
        //onRejected  处理失败的回调
        //可以根据状态选中调用谁
        if(this.PromiseState === "fulfilled"){
            //传递结果
            onFulfilled(this.PromiseResult);
        }
        
        if(this.PromiseState === "rejected"){
            onRejected(this.PromiseResult);
        }


    }



}