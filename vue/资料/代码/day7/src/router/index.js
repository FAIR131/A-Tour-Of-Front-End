// 1、引入并挂载
import Vue from'vue'
import VueRouter from 'vue-router'
// import Film from '../views/Film'
// import Cinema from '../views/Cinema'
// import News from '../views/News'
// import Mine from '../views/Mine'
// import NotFound from '../views/NotFound'
// import HotFilm from '../views/films/HotFilm'
// import NewFilm from '../views/films/NewFilm'
// import Login from '../views/Login'

Vue.use(VueRouter)

// 2、创建路由实例

const router = new VueRouter({
    mode:"history",
    routes:[        
        {
            path:"/film",
            // component:Film,
            component:()=>import("../views/Film"),
            children:[
                // {path:"hotfilm",component:HotFilm},//相对路由地址
                // {path:"newfilm",component:NewFilm}

                {path:"/film/hotfilm",component:()=>import("../views/films/HotFilm")},//绝对路由地址
                {path:"/film/newfilm",component:()=>import("../views/films/NewFilm")},
                {path:"/film",redirect:"/film/hotfilm"}
            ]
        },
        {
            path:"/cinema",
            component:()=>import("../views/Cinema"),
            meta:{login:true},
            beforeEnter:(to,from,next)=>{//局部路由守卫,只针对某个路由规则生效
                next()
            }
        },
        {
            path:"/news/:id",//声明动态路由
            name:"xinwen",//声明命名路由
            component:()=>import("../views/News")
        },
        {
            path:"/mine",
            component:()=>import("../views/Mine"),
            meta:{login:true}
        },
        {
            path:"/login",
            component:()=>import("../views/Login")
        },
        {
            path:"/",
            redirect:"/film" //声明重定向,当访问/的时候默认跳转到/film
        },
        {
            path:"*",
            component:()=>import("../views/NotFound") //404处理,使用通配符路由,当上面的路由都匹配不到时,则会走此路由
        },
    ]
})

// 全局前置守卫
router.beforeEach((to,from,next)=>{
    // to是目标路由,from是源路由

    // console.log("去哪儿?",to);
    // console.log("从哪来?",from);
    // console.log("beforeEach执行了");
    if(to.meta.login && to.path!=='/login'){        
        if(sessionStorage.getItem("currentUser")){
            next();//next函数是放行路由跳转操作的,必须执行
        }else{
            // 跳转登录页
            next("/login")
        }
    }else{
       next() 
    }  
})

// 全局解析守卫
router.beforeResolve((to,from,next)=>{
    console.log("beforeResolve执行了");
    next();
})

// 全局后置守卫
router.afterEach((to,from)=>{
    console.log("afterEach执行了");
})

export default router;

/**
 * (组件内守卫:beforeRouteLeave)->beforeEach->局部路由守卫:beforeEnter->(组件内守卫:beforeRouteEnter,beforeRouteUpdate)->beforeResolve->afterEach
 */