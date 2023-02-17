function Mypromise(executor) {
    this.status = 'pending';
    this.result = undefined;
    this.callback = [];
    const _this = this;

    function resolve(res) {
        if (_this.status !== 'pending')
            return
        // console.log('resolve');
        // console.log(_this);
        _this.status = 'fulfilled';
        _this.result = res;
        _this.callback.forEach(item=>{
            item.successCB && item.successCB(_this.result)
        })
    }

    function reject(res) {
        if (_this.status !== 'pending')
            return
        // console.log('reject');
        _this.status = 'rejected';
        _this.result = res;

        _this.callback.forEach(item=>{
            item.failCB && item.failCB(_this.result)
        })
    }

    executor(resolve, reject)
}

Mypromise.prototype.then = function (successCB, failCB) {
    return new Mypromise((resolve,reject)=>{
        if (this.status === 'fulfilled') {
          const result = successCB && successCB(this.result);
            // console.log(result);
            if(result instanceof Mypromise){
                result.then(res=>{
                    // console.log(res)
                    resolve(res);
                },err=>{
                    // console.log(err)
                    reject(err);

                })
            }else{
                resolve(result);
            }

        }

        if (this.status === 'rejected') {

            const result = failCB && failCB(this.result);
            // console.log(result);
            if(result instanceof Mypromise){
                result.then(res=>{
                    // console.log(res)
                    resolve(res);
                },err=>{
                    // console.log(err)
                   reject(err);
                })
            }else{
                resolve(result);
            }

        }

        if (this.status === 'pending') {
            //收集回调
            this.callback.push({
                successCB:( )=>{
                  const result =   successCB(this.result);
                    if(result instanceof Mypromise){
                        result.then(res=>{
                            // console.log(res)
                            resolve(res);
                        },err=>{
                            // console.log(err)
                            reject(err);

                        })
                    }else{
                        resolve(result);
                    }
                },
                failCB: ()=>{
                  const  result = failCB(this.result);

                    if(result instanceof Mypromise){
                        result.then(res=>{
                            // console.log(res)
                            resolve(res);
                        },err=>{
                            // console.log(err)
                            reject(err);
                        })
                    }else{
                        resolve(result);
                    }

                }
            })
        }
    })

}