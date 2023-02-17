self.onmessage = function (e) {
    // console.log(e.data)
    //e.data = [{}]
    //e.data.
    
    function qs(obj, start, end) {
        var base = obj[start];
        var i = start;
        var j = end;
        while (i < j) {
            while (obj[j].age > base.age && i < j) {
                j--
            }

            //替换整行
            obj[i] = obj[j];

            while (obj[i].age <= base.age && i < j) {
                i++
            }

            //替换整行
            obj[j] = obj[i];
        }
        if (i > j) {
            return
        }

        //替换整行
        obj[i] = base;

        qs(obj, start, i - 1);
        qs(obj, i + 1, end);
        return obj;
    }

    self.postMessage(qs(e.data,0,e.data.length-1));
}
