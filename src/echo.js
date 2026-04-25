import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
window.Pusher = Pusher;

// Ambil token dari local storage
const token = localStorage.getItem('token');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY,
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    // Pastikan ini mengarah ke rute auth yang benar (tambahkan /api jika perlu)
    authEndpoint: 'https://back.solher.co.id/api/broadcasting/auth', 
    auth: {
        headers: {
            // INI YANG PALING PENTING!
            Authorization: token ? `Bearer ${token}` : ''
        }
    }
});