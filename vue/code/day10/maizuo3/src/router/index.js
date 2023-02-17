// 1.引入并挂载
import Vue from "vue";
import VueRouter from 'vue-router'
// import Film from "@/views/Film";
// import Cinema from "@/views/Cinema";
// import News from "@/views/News";
// import Mine from "@/views/Mine";
// import Notfound from "@/views/Notfound";
// import HotFilm from "@/views/films/HotFilm";
// import NewFilm from "@/views/films/NewFilm";
// import Login from "@/views/Login";

Vue.use(VueRouter)

//2.创建路由实例
const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/film',
            // component: Film,
            component: () => import('@/views/Film'),
            children: [
                {
                    //相对路由地址
                    path: 'hotfilm',
                    // component: HotFilm,
                    component: () => import('@/views/films/HotFilm'),

                },
                {
                    // 绝对路由地址
                    path: '/film/newfilm',
                    // component: NewFilm
                    component: () => import('@/views/films/NewFilm'),

                },
                {
                    path: '/film',
                    redirect: '/film/hotfilm'
                }

            ]
        },
        {
            path: '/cinema',
            // component: Cinema,
            component: () => import('@/views/Cinema'),

            beforeEnter: (to, from, next) => {
                next();
                //    局部路由守卫，只针对某个路由生效
            }
        },
        {
            path: '/news/:id',//声明动态路由
            name: 'xinwen',
            // component: News
            component: () => import('@/views/News'),

        },
        {
            path: '/mine',
            // component: Mine,
            component: () => import('@/views/Mine'),

            meta: {login: true}
        },
        {
            path: '/login',
            component: () => import('@/views/Login'),

        },
        {
            path: '/',
            redirect: '/film'
            //    声明重定向，当访问/的时候默认跳转到/film
        },
        {
            path: '*',
            // component: Notfound
            component: () => import('@/views/Notfound'),
            //  404，使用通配符路由，当上面的路由都匹配不到时，则会走此路由
        }
    ]
})

router.beforeEach((to, from, next) => {
//    to 是目标路由，from 是源路由
    /*   console.log('去哪儿',to)
       console.log('从哪来',from)*/
    if (to.meta.login && to.path !== '/login') {
        if (sessionStorage.getItem('currentUser')) {
            next();//next函数是放行路由跳转操作的,必须执行
        } else {
            // 跳转登录页
            next("/login")
        }

    } else {
        next()
    }

})

router.beforeResolve((to, from, next) => {
    // console.log("beforeResolve执行了");
    next();
})

router.afterEach((to, from) => {
    // console.log('afterEach执行了')
})

export default router;

/**
 * (组件内守卫:beforeRouteLeave)->beforeEach->局部路由守卫:beforeEnter->(组件内守卫:beforeRouteEnter,beforeRouteUpdate)->beforeResolve->afterEach
 */