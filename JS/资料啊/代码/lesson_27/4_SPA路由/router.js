/*
    按照策略模式的方式来写

    只写路由
*/

const route = [
    {
        name : "/first",
        component : () => import("./components/first.js"),//导入 render
    },
    {
        name : "/second",
        component : () => import("./components/second.js"),
    },
    {
        name : "/third",
        component : () => import("./components/third.js"),
    },
    {
        name : "/last",
        component : () => import("./components/last.js"),
    },
    {   //redirect重定向 
        name : "/",
        redirect : "/first",
    },
];


export default route