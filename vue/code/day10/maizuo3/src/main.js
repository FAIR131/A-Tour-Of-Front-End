import Vue from 'vue'
import App from './App.vue'
import router from "@/router";

//1.引入并挂载
import Vuex from 'vuex'
import store from './store'
import http from '@/utils/request2'

Vue.config.productionTip = false
Vue.prototype.$http=http
new Vue({
  //3.将路由实例配置到Vue实例中
  router,
  store,//3、将Vuex配置到vue实例中
  render: h => h(App),
}).$mount('#app')
