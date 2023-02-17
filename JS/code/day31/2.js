self.onmessage = function (e){
    function fibo(ind){
        if(ind===0||ind===1){
            return 1
        }else{
            return fibo(ind-2)+fibo(ind-1)
        }
    }

    self.postMessage(fibo(e.data))
}