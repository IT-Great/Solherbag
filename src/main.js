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

import axios from 'axios';

// [PERBAIKAN KRITIS] Panggil file bootstrap/echo Anda di sini!
import './echo'; 

// [BARU] Import instance i18n yang sudah Anda buat
import i18n from './i18n'; 

const app = createApp(App)
const pinia = createPinia() 

app.use(router) 
app.use(i18n) // [BARU] Daftarkan plugin i18n ke aplikasi Vue
app.use(pinia) // <-- Tambahkan ini sebelum app.mount

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Jika API Backend mengatakan sedang maintenance...
    if (error.response && error.response.status === 503 && error.response.data.maintenance) {
      // Hapus seluruh UI Vue dan ganti dengan layar hitam elegan
      document.body.innerHTML = `
        <div style="height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; background: #000; color: #fff; font-family: ui-sans-serif, system-ui, sans-serif;">
          <h1 style="font-size: 2rem; font-weight: 900; letter-spacing: 0.2em; text-transform: uppercase; margin-bottom: 1rem;">System Upgrade</h1>
          <p style="color: #9ca3af; font-size: 0.875rem; letter-spacing: 0.05em;">Solher is currently undergoing scheduled maintenance to improve your experience.</p>
        </div>
      `;
    }
    return Promise.reject(error);
  }
);


app.mount('#app')