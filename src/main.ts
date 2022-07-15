import { createApp } from 'vue'
import App from './App.vue'
import router from '~/router'

import '@unocss/reset/normalize.css'
import './styles/main.css'
import 'uno.css'

import 'vant/es/toast/style'
import 'vant/es/dialog/style'

const app = createApp(App)
app.use(router)
app.mount('#app')

