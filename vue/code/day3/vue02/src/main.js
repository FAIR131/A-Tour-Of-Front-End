import Vue from 'vue'
import App from './App.vue'
import bus from "@/bus";

Vue.config.productionTip = false

Vue.prototype.$bus=bus

new Vue({
  render: h => h(App),
}).$mount('#app')
