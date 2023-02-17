import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import http from ''
//1.引入并挂载
import Vuex from 'vuex'
import store from './store'

Vue.config.productionTip = false

new Vue({
  //3.将路由实例配置到Vue实例中
  router,
  store,//3、将Vuex配置到vue实例中
  render: h => h(App),
}).$mount('#app')
