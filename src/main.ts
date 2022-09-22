import { createApp } from 'vue'
import App from './App.vue' 
import './style.css'
import router from "./router/index"
import "./assets/iconfont/iconfont.css"
import  store from "./store/store"
import VuePlyr from "vue-plyr"
import 'vue-plyr/dist/vue-plyr.css'
import FtPlayMusic from "./components/btmplay/play.vue";
import Nmheader from "./components/navigation/Nmheader.vue"
const app = createApp(App)
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component("FtPlayMusic", FtPlayMusic)
app.component("Nmheader", Nmheader)
app.use(VuePlyr)
app.use(store)
app.use(router)
app.mount('#app')
