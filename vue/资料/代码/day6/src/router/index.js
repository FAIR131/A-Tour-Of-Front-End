// 1、引入并挂载
import Vue from'vue'
import VueRouter from 'vue-router'
import Film from '../views/Film'
import Cinema from '../views/Cinema'
import News from '../views/News'
import Mine from '../views/Mine'
import NotFound from '../views/NotFound'
import HotFilm from '../views/films/HotFilm'
import NewFilm from '../views/films/NewFilm'


Vue.use(VueRouter)

// 2、创建路由实例

export default new VueRouter({
    mode:"history",
    routes:[        
        {
            path:"/film",
            component:Film,
            children:[
                // {path:"hotfilm",component:HotFilm},//相对路由地址
                // {path:"newfilm",component:NewFilm}

                {path:"/film/hotfilm",component:HotFilm},//绝对路由地址
                {path:"/film/newfilm",component:NewFilm},
                {path:"/film",redirect:"/film/hotfilm"}
            ]
        },
        {
            path:"/cinema",
            component:Cinema
        },
        {
            path:"/news/:id",//声明动态路由
            name:"xinwen",//声明命名路由
            component:News
        },
        {
            path:"/mine",
            component:Mine
        },
        {
            path:"/",
            redirect:"/film" //声明重定向,当访问/的时候默认跳转到/film
        },
        {
            path:"*",
            component:NotFound //404处理,使用通配符路由,当上面的路由都匹配不到时,则会走此路由
        },
    ]
})