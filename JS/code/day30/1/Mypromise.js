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
    if (this.status === 'fulfilled') {
        successCB && successCB(this.result);
    }
    if (this.status === 'rejected') {
        failCB && failCB(this.result)
    }

    if (this.status === 'pending') {
        //收集回调
        this.callback.push({
            successCB: successCB,
            failCB: failCB
        })
    }
}