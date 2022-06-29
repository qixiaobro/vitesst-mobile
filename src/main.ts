import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from 'virtual:generated-pages'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'
import App from './App.vue'

import '@unocss/reset/normalize.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
app.use(router)
app.mount('#app')

