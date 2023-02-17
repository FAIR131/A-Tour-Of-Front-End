import route from "./router.js"

//spa  url -> hash

//汇总JS，把逻辑处理也写好

//事件
window.onhashchange = HashChangeHandler;//Handler处理



function  HashChangeHandler(){
    let hash = location.hash.slice(1)||'/';//#first
    // console.log(hash);
    // console.log(route)
    // item=Object

    /*
   当前find返回一个对象
     {name: '/first',
     component: ()=> import('./components/first.js')}

    * */
  const info =  route.find(item=>item.name===hash);//find查找 值  findindex 查找索引

//    如果没找到
    if(!info) return

  //优先判断重定向
  if(info.redirect)  return location.hash = info.redirect;//'/first'

  const res = info.component();
    // console.log(res)
    //res也要判断

    if(!res) return;

    //返回的结果是一个promise实例对象
    res.then(r =>r.default());


}