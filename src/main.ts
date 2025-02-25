import '@/assets/tailwind.css'
import '@/assets/main.scss'

import App from '@/App.vue'
import router from '@/router'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.component('Icon', Icon)
app.use(pinia)
app.use(router)

app.mount('#app')
