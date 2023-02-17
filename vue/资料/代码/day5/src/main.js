import Vue from 'vue'
import App from './App.vue'
import bus from './bus'
// 1、引入路由并挂载
import VueRouter from 'vue-router'
import Login from './views/Login'
import Home from './views/Home'

// 挂载路由
Vue.use(VueRouter)

Vue.config.productionTip = false

Vue.prototype.$bus = bus

// 2、创建路由对象并定义路由规则
const router=new VueRouter({
  routes: [
    {path:"/login",component:Login},
    {path:"/home",component:Home}
  ]
})

new Vue({
  router,//3、将路由对象配置到vue实例中
  render: h => h(App),
}).$mount('#app')
