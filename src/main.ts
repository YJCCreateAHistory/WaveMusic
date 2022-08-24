import { createApp } from 'vue'
import App from './App.vue' 
import './style.css'
import router from "./router/index"
import "./assets/iconfont/iconfont.css"
import  store from "./store/store"
const app = createApp(App)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store)
app.use(router)
app.mount('#app')
