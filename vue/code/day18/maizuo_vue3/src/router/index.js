import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/film',
        name: 'film',
        component: () => import("@/views/Film"),
       /* children:[
            {
                path:"/film/hotfilm",
                component:()=>import("@/views/film/HotFilm.vue")
            },
            {
                path:"/film/newfilm",
                component:()=>import("@/views/film/NewFilm.vue")
            },

        ]*/
    },
    {
        path: '/cinema',
        name: 'cinema',
        component: () => import(/* webpackChunkName: "about" */ '../views/Cinema.vue')
    },
    {
        path: '/news',
        name: 'news',
        component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
    },
    {
        path: '/mine',
        name: 'mine',
        component: () => import(/* webpackChunkName: "about" */ '../views/Mine.vue')
    },
    {
        path: '/',
        redirect: "/film"
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
