import Vue from 'vue'
import App from './App.vue'
//1.引入路由并挂载
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home";

//挂载路由
Vue.use(VueRouter)

Vue.config.productionTip = false
//2、创建路由对象并定义路由规则
const router = new VueRouter({
  routes:[
    {path:'/login',component:Login},
    {path:'/home',component:Home},

  ]
})

new Vue({
  //3.将路由对象配置到实例中
  router,
  render: h => h(App),
}).$mount('#app')
