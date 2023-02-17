import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false

new Vue({
  router,//3、将路由实例配置到vue实例中
  render: h => h(App),
}).$mount('#app')
