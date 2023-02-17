import route from "./router.js"

//SPA  url->hash

//汇总js,把逻辑处理也写好

//事件
window.onhashchange = HashChangeHandler;  //Handler处理


function HashChangeHandler(){
    let hash = location.hash.slice(1) || "/"; // #/first-->/first
   
    //item=Object
    /*
        当前的find返回一个对象
        info = {
            name : "/first",
            component : () => import("./components/first.js"),//导入
        }
    */
    const info = route.find(item=>item.name === hash); //find查找值   findIndex查找索引
   
    
    //如果没有查找到内容
    if(!info) return


    //优先判断从定向
    if(info.redirect) return location.hash = info.redirect; "/first"
    

    //执行页面的渲染
    const res = info.component();

    console.log(res);

    //res也要判断
    if(!res) return 

    //返回的结果是一个Promise实例对象
    res.then(r => r.default());
}

