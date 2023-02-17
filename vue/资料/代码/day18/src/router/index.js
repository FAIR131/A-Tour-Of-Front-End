import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:"/film",
    component:()=>import("../views/Film.vue"),
    // children:[
    //   {
    //     path:"/film/hotfilm",
    //     component:()=>import("../views/film/HotFilm.vue")
    //   },
    //   {
    //     path:"/film/newfilm",
    //     component:()=>import("../views/film/NewFilm.vue")
    //   },{
    //     path:"/film",
    //     redirect:"/film/hotfilm"
    //   }
    // ]
  },
  {
    path:"/cinema",
    component:()=>import("../views/Cinema.vue")
  },
  {
    path:"/news",
    component:()=>import("../views/News.vue")
  },
  {
    path:"/mine",
    component:()=>import("../views/Mine.vue")
  },
  {
    path: '/',
    redirect:"/film"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
