class Ana {
    constructor(options = {}) {
        //你在对象传递当中没有写过el怎么办
        //throw 手动抛出一个错误
        // new Error();
        if (!options.el) throw new Error("您的el传递有误 ^_^!!");

        //找到el指定的dom对象
        const root = document.querySelector(options.el);

        //加入没找到
        if (!root) throw new Error("您的el写入的id有误 o(^_^)o!!");

        //数据驱动视图
        //数据填写在data当中
        //加入data没有写,代表没有数据

        if (!options.data) return

        //假如data不是Object数据类型
        if (options.data.constructor !== Object)
            throw new Error("data不是Object数据类型 o(*-。-*!)o");

        //留存一份数据
        this._data = options.data;

        //保留结构
        let rootStr = root.innerHTML

        let _this = this;
        /*-----------------数据代理--------------------*/
        this._data = new Proxy(_this._data, {
            get(target,property){
                /*  
                    target是代理的对象
                    property 是对象的属性
                */
                //obj[sex]
      
                return target[property]
            },
            set(target,property,val){
                //val 值
                //obj[sex] = 传递进来的值 val = "男"
                
                target[property] = val;
                
                _this.render(root, _this._data, rootStr);
            }
        })

        
        /*-------------------------------------*/

        //替换模板的代码
        /*
            root : id=box的dom对象
            _data : 数据劫持
            rootStr : root.innerHTML
        */
        // rootStr = this.afor(root, this._data, rootStr);
        this.render(root, this._data, rootStr);
    }


    render(root, _data, rootStr) {
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
        
        res.forEach(function (item) {
           
            let k = item.match(reg1)[0];

            str = str.replace(item, _data[k]);
        });

        root.innerHTML = str;
    }

    afor(root, _data, rootStr) {
        let str = rootStr;//字符串
        let res = root.querySelectorAll("*[a-for]");

        //数组
        res.forEach(item=>{
            let nodeName = res[0] ? res[0].nodeName.toLowerCase() : undefined;
            if(!nodeName) throw new Error("标签名称不正确");

            let av = item.getAttribute("a-for");
            let [k,v] = av.split("in");
            //获取循环数据
            let val = _data[v.trim()];

            val.forEach(i=>{
                if(!["string","number","boolean"].includes(typeof i)){
                    i = JSON.stringify(i);
                }
                let target = document.createElement(nodeName);
                target.innerHTML = item.innerHTML;
                item.parentNode.append(target);
                this.render(target,{[k.trim()]:i},target.innerHTML);
            })
            item.remove();
        })
        return root.innerHTML
    }
}


//render主要赋值渲染数据到模板上