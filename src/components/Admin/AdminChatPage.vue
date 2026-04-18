<template>
  <div class="min-h-screen bg-[#F9FAFB] flex flex-col max-w-3xl mx-auto pt-20">
    <div class="flex items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm shrink-0">
      <button @click="$router.back()" class="p-2 mr-4 text-gray-400 transition rounded-full bg-gray-50 hover:text-black hover:bg-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <div>
        <h2 class="text-sm font-bold tracking-widest text-black uppercase">Live Support</h2>
        <p class="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
          <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
        </p>
      </div>
    </div>

    <div class="flex flex-col p-6 overflow-y-auto grow" ref="chatContainer">
      <div v-if="isLoading" class="flex justify-center py-10">
        <div class="w-8 h-8 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>
      </div>
      
      <div v-for="msg in messages" :key="msg.id" class="flex w-full mb-4" :class="msg.sender_id === myId ? 'justify-end' : 'justify-start'">
        <div :class="msg.sender_id === myId ? 'bg-black text-white rounded-l-2xl rounded-tr-2xl' : 'bg-white border border-gray-200 text-black rounded-r-2xl rounded-tl-2xl'" class="px-5 py-3 max-w-[75%] shadow-sm relative group">
          <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ msg.message }}</p>
          <span class="block mt-1 text-[9px] opacity-50 text-right" :class="msg.sender_id === myId ? 'text-gray-300' : 'text-gray-500'">
             {{ new Date(msg.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) }}
          </span>
        </div>
      </div>
    </div>

    <div class="p-4 bg-white border-t border-gray-200 shrink-0 sm:p-6">
      <form @submit.prevent="sendMessage" class="flex items-center gap-3">
        <input 
          v-model="newMessage" 
          type="text" 
          placeholder="Type your message..." 
          class="flex-grow p-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white"
        />
        <button 
          type="submit" 
          :disabled="!newMessage.trim() || isSending"
          class="flex items-center justify-center w-12 h-12 text-white transition-all bg-black shadow-lg rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="!isSending" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <div v-else class="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted, onUnmounted, nextTick } from 'vue';
// import { useRoute } from 'vue-router';
// import axios from 'axios';
// import { BASE_URL } from '../../config/api';
// import Echo from 'laravel-echo';
// import Pusher from 'pusher-js';

// const route = useRoute();
// const receiverId = route.params.id; // ID Admin / Lawan bicara
// const messages = ref([]);
// const newMessage = ref('');
// const isLoading = ref(true);
// const isSending = ref(false);
// const chatContainer = ref(null);

// // Ambil ID User yang sedang login
// const myId = ref(JSON.parse(localStorage.getItem('user'))?.id);
// const token = localStorage.getItem('admin_token'); // Gunakan 'admin_token' untuk versi AdminChatPage

// const scrollToBottom = () => {
//   nextTick(() => {
//     if (chatContainer.value) {
//       chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
//     }
//   });
// };

// const fetchMessages = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/chat/messages/${receiverId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     messages.value = res.data;
//     scrollToBottom();
//   } catch (error) {
//     console.error(error);
//   } finally {
//     isLoading.value = false;
//   }
// };

// const sendMessage = async () => {
//   if (!newMessage.value.trim()) return;
//   isSending.value = true;
  
//   // Optimistic UI Update (Langsung tampil di layar)
//   const tempMessage = {
//     id: Date.now(),
//     sender_id: myId.value,
//     message: newMessage.value,
//     created_at: new Date().toISOString()
//   };
//   messages.value.push(tempMessage);
//   const sentMessage = newMessage.value;
//   newMessage.value = '';
//   scrollToBottom();

//   try {
//     const res = await axios.post(`${BASE_URL}/chat/send`, {
//       receiver_id: receiverId,
//       message: sentMessage
//     }, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     // Ganti ID temp dengan ID asli dari server
//     const index = messages.value.findIndex(m => m.id === tempMessage.id);
//     if (index !== -1) messages.value[index] = res.data;
//   } catch (error) {
//     console.error("Gagal mengirim pesan", error);
//   } finally {
//     isSending.value = false;
//   }
// };

// onMounted(() => {
//   fetchMessages();

//   // Inisialisasi Laravel Echo & Pusher untuk Real-Time
//   window.Pusher = Pusher;
//   window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY, // Pastikan ada di .env Vue Anda
//     cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
//     forceTLS: true,
//     authEndpoint: `${BASE_URL}/broadcasting/auth`,
//     auth: {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     }
//   });

//   // Mendengarkan channel privat
//   window.Echo.private(`chat.${myId.value}`)
//     .listen('.message.sent', (e) => {
//       // Jika pesan masuk dari user yang sedang kita buka chat-nya
//       if (e.message.sender_id == receiverId) {
//         messages.value.push(e.message);
//         scrollToBottom();
//       }
//     });
// });

// onUnmounted(() => {
//   if (window.Echo) {
//     window.Echo.leave(`chat.${myId.value}`);
//   }
// });

import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from '../../config/api';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

const route = useRoute();
// [PERBAIKAN] Konversi ID rute menjadi Number
const receiverId = Number(route.params.id); 

const messages = ref([]);
const newMessage = ref('');
const isLoading = ref(true);
const isSending = ref(false);
const chatContainer = ref(null);

// [PERBAIKAN KUNCI] Ambil ID Admin, bukan 'user', lalu konversi ke Number
const adminData = JSON.parse(localStorage.getItem('admin'));
const myId = ref(adminData ? Number(adminData.id) : null);
const token = localStorage.getItem('admin_token'); 

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const fetchMessages = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/messages/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    messages.value = res.data;
    scrollToBottom();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  isSending.value = true;
  
  const tempMessage = {
    id: Date.now(),
    sender_id: myId.value,
    message: newMessage.value,
    created_at: new Date().toISOString()
  };
  messages.value.push(tempMessage);
  const sentMessage = newMessage.value;
  newMessage.value = '';
  scrollToBottom();

  try {
    const res = await axios.post(`${BASE_URL}/chat/send`, {
      receiver_id: receiverId,
      message: sentMessage
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const index = messages.value.findIndex(m => m.id === tempMessage.id);
    if (index !== -1) messages.value[index] = res.data;
  } catch (error) {
    console.error("Gagal mengirim pesan", error);
  } finally {
    isSending.value = false;
  }
};

onMounted(() => {
  fetchMessages();

  window.Pusher = Pusher;
  window.Echo = new Echo({
    broadcaster: 'pusher',
    key: import.meta.env.VITE_PUSHER_APP_KEY, 
    cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
    forceTLS: true,
    authEndpoint: `${BASE_URL}/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  // Karena myId.value sekarang sudah benar, Echo akan masuk ke channel yang tepat!
  window.Echo.private(`chat.${myId.value}`)
    .listen('.message.sent', (e) => {
      // [PERBAIKAN] Gunakan == atau konversi receiverId agar aman dari tipe data
      if (e.message.sender_id == receiverId) {
        messages.value.push(e.message);
        scrollToBottom();
      }
    });
});

onUnmounted(() => {
  if (window.Echo && myId.value) {
    window.Echo.leave(`chat.${myId.value}`);
  }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
</style>