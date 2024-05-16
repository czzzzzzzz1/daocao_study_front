
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
// 导入路由规则
import router from './router'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
