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

}