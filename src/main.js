import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Buefy from 'buefy'
import { router } from './router'
import App from './App.vue'
import '@/css/styles.css'

createApp(App).use(createPinia()).use(router).use(Buefy).mount('#app')
