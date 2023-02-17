import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'
// // 创建vue实例
// const app = createApp(App)
// // vue实例挂载路由
// app.use(router)
// // vue实例挂载到页面
// app.mount('#app')
createApp(App).use(router).mount('#app')//连缀写法
