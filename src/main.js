// import { createApp } from 'vue'
// // import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import router

// [PERBAIKAN KRITIS] Panggil file bootstrap/echo Anda di sini!
import './echo'; // Atau import './echo' (Tergantung nama file konfigurasi Pusher Anda)

const app = createApp(App)
app.use(router) // Gunakan router
app.mount('#app')