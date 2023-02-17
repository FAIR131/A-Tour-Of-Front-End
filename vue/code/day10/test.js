class axios{
    get=function (){
        console.log('这是实例方法')
    }

    static creat=function (){
       return new  axios()
    }

}

let r=axios.creat();

// r.get()
// Request.get()
console.log(r);
r.get()