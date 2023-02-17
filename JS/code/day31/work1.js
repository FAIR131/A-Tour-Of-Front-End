self.onmessage = function (e){
    function qs(obj,start,end){
        let base = obj[start];
        let i = start;
        let j = end;
        while(i<j){
            while (obj[j].age > base.age &&i<j){
                j--;
            }


            obj[i]=obj[j];

            while (obj[i].age <= base.age && i<j){
                i++
            }

            obj[j]=obj[i];
        }

        if(i>j){
            return
        }

        obj[i] =base

        qs(obj,start,i-1)
        qs(obj,i+1,end)

        return obj;
    }

    self.postMessage(qs(e.data,0,e.data.length-1))
}