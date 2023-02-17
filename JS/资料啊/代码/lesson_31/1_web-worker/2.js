
//当获取消息时触发的事件
//event : MessageEvent 消息事件
self.onmessage = function(e){
    // console.log("--->",e.data); //e.data 数据

    function fibo(ind){
        if(ind===0 || ind ===1){
            return 1
        }else{
            return fibo(ind-2) + fibo(ind-1);
        }
    }

    //把运行的结果返回2_index.html
    self.postMessage(fibo(e.data));
}