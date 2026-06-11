// // import { createApp } from 'vue'
// // // import './style.css'
// // import App from './App.vue'

// // createApp(App).mount('#app')

// import { createApp } from 'vue'
// import App from './App.vue'
// import router from './router' // Import router

// // [PERBAIKAN KRITIS] Panggil file bootstrap/echo Anda di sini!
// import './echo'; // Atau import './echo' (Tergantung nama file konfigurasi Pusher Anda)

// const app = createApp(App)
// app.use(router) // Gunakan router
// app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' 

// [PERBAIKAN KRITIS] Panggil file bootstrap/echo Anda di sini!
import './echo'; 

// [BARU] Import instance i18n yang sudah Anda buat
import i18n from './i18n'; 

const app = createApp(App)
const pinia = createPinia() 

app.use(router) 
app.use(i18n) // [BARU] Daftarkan plugin i18n ke aplikasi Vue
app.use(pinia) // <-- Tambahkan ini sebelum app.mount
app.mount('#app')