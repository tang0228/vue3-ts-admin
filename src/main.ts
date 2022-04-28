import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from "./router";
import "./mock/index"
import { createPinia } from "pinia"
const pinia = createPinia();
createApp(App).use(pinia).use(Antd).use(router).mount('#app')
 