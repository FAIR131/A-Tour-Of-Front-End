/*
    按照策略模式的方式来写
    只写路由
 */

const route = [
    {
        name:'/first',
        //导入
        component:()=> import('./components/first.js'),
    },
    {
        name:'/second',
        //导入
        component:()=> import('./components/second.js'),
    },
   {
        name:'/third',
        //导入
        component:()=> import('./components/third.js'),
   },
   {
        name:'/last',
        //导入
        component:()=> import('./components/last.js'),
   },
{
    //redirect 重定向
        name:'/',
        //导入
        redirect:'/first',
   },


];


export  default route