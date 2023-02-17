class Ana{
    constructor(options = {}){
       //你在对象传递当中没有写过el怎么办
       //throw 手动抛出一个错误
       // new Error();
       if(!options.el) throw new Error("您的el传递有误 ^_^!!");

       //找到el指定的dom对象
       const root = document.querySelector(options.el);4

       //假如没找到
       if(!root) throw new Error("您的el写入的id有误 o(^_^)o!!");

       //数据驱动视图
       //数据填写在data当中
       //假如data没有写,代表没有数据
   
       if(!options.data) return 

       //假如data不是Object数据类型
       if(options.data.constructor !== Object) 
           throw new Error("data不是Object数据类型 o(*-。-*!)o");

       //留存一份数据
       this._data = {};

       //origin 原始的
       this._data.origin = options.data;

       //保留结构
       const rootStr= root.innerHTML

       /*-----------------数据劫持--------------------*/

       let _this = this;
       for(let k in options.data){
           Object.defineProperty(_this._data,k,{
               get(){
                   return options.data[k];
               },
               set(val){
                   options.data[k] = val;
                   _this.render(root,_this._data,rootStr);
               }
           })
       }
       /*-------------------------------------*/

       //替换模板的代码
       /*
           root : id=box的dom对象
           _data : 数据劫持
           rootStr : root.innerHTML
       */
       this.render(root,this._data,rootStr);

       
   }


   render(root,_data,rootStr){
       let str = rootStr;//字符串

       //正则
       //. : 任意字符
       //* : 0到多个
       //+ : 1到多个
       //\d: 数字
       //\w: [A-Za-z0-9_]
       //i : 不区分大小写
       //g : global全局
       const reg = /{{ *[A-Za-z0-9_$]+ *}}/g;

       //match正则根据规则,把复合条件的内容分割成数组
       const res = str.match(reg); //text ->true false

       const reg1 = /[A-Za-z0-9_$]+/;
       
       res.forEach(function(item){
       
           let k = item.match(reg1)[0];
           
           str = str.replace(item,_data[k]);
       })

       root.innerHTML = str;            

   }
}


//render主要赋值渲染数据到模板上