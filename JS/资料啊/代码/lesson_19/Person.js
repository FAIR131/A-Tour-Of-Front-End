(function(){
    class Person{
        static a = 1;
        #b = 2;
        static #c = null;
        constructor(name){
            //单例
            if(!Person.#c){
                this.name = name;
                Person.#c = this;
            }else{
                Person.#c.name = name;
                return Person.#c
            }
        }
    
        func1(){
            return "func1"
        }
    }

    class White extends Person{
        
        constructor(name){
           super(name);//super() = this     call
        //    console.log("a---》",Black.a);
        //    console.log("#b--->",this.#b);
            
        }

        //重写
        func1(){
            return "white-func1"
        }

    }


    class Yellow extends Person{
        
        constructor(name){
           super(name);//super() = this     call
        //    console.log("a---》",Black.a);
        //    console.log("#b--->",this.#b);
        }

        //重写
        func1(){
            return "yellow-func1"
        }
    }


    class Black extends Person{
        
        constructor(name){
           super(name);//super() = this     call
        //    console.log("a---》",Black.a);
        //    console.log("#b--->",this.#b);
        }

        //重写
        func1(){
            return "black-func1"
        }
    }

    //自实例对象
    // window.person = new Person();
    window.black = new Black("阿三");
})()




