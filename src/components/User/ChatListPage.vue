<!-- <template>
  <div class="max-w-4xl min-h-screen px-6 py-24 mx-auto animate-fade-in">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">Customer Support</h1>
      <p class="mt-4 font-serif italic text-gray-500">Select an admin below to start a conversation.</p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div 
        v-for="admin in admins" 
        :key="admin.id"
        @click="$router.push(`/chat/${admin.id}`)"
        class="flex items-center p-6 transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-2xl hover:shadow-lg hover:border-black group"
      >
        <img 
          :src="admin.profile_image || `https://ui-avatars.com/api/?name=${admin.first_name}+${admin.last_name}&background=000&color=fff`" 
          class="object-cover w-16 h-16 rounded-full shadow-sm"
        />
        <div class="flex-grow ml-4">
          <h3 class="text-lg font-bold tracking-widest text-gray-900 uppercase group-hover:text-black">{{ admin.first_name }} {{ admin.last_name }}</h3>
          <p class="text-xs font-bold tracking-widest text-gray-400 uppercase">{{ admin.usertype }} Support</p>
        </div>
        
        <div 
          v-if="admin.unread_count > 0" 
          class="flex items-center justify-center w-6 h-6 mr-3 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-md shrink-0"
        >
          {{ admin.unread_count > 99 ? '99+' : admin.unread_count }}
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-300 transition-transform transform group-hover:translate-x-2 group-hover:text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

const admins = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    admins.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});
</script> -->

<!-- <template>
  <div class="max-w-4xl min-h-screen px-6 py-24 mx-auto animate-fade-in">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">Customer Support</h1>
      <p class="mt-4 font-serif italic text-gray-500">Select an admin below to start a conversation.</p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div 
        v-for="admin in admins" 
        :key="admin.id"
        @click="$router.push(`/chat/${admin.id}`)"
        class="flex items-center p-6 transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-2xl hover:shadow-lg hover:border-black group"
      >
        <img 
          :src="admin.profile_image || `https://ui-avatars.com/api/?name=${admin.first_name}+${admin.last_name}&background=000&color=fff`" 
          class="object-cover w-16 h-16 rounded-full shadow-sm"
        />
        <div class="flex-grow ml-4">
          <h3 class="text-lg font-bold tracking-widest text-gray-900 uppercase group-hover:text-black">{{ admin.first_name }} {{ admin.last_name }}</h3>
          <p class="text-xs font-bold tracking-widest text-gray-400 uppercase">{{ admin.usertype }} Support</p>
        </div>
        
        <transition name="pop">
          <div 
            v-if="admin.unread_count > 0" 
            class="flex items-center justify-center w-6 h-6 mr-3 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-md shrink-0"
          >
            {{ admin.unread_count > 99 ? '99+' : admin.unread_count }}
          </div>
        </transition>

        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-300 transition-transform transform group-hover:translate-x-2 group-hover:text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

const admins = ref([]);
const isLoading = ref(true);
const currentUser = ref(null);

const fetchAdmins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    admins.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  // 1. Dapatkan data user login
  const userStr = localStorage.getItem('user');
  if (userStr) {
    currentUser.value = JSON.parse(userStr);
  }

  // 2. Fetch data list admin
  await fetchAdmins();

  // 3. [BARU] Setup Laravel Echo Listener untuk Real-Time Badge
  if (currentUser.value && window.Echo) {
    // Dengarkan channel private milik user (Sesuai dengan di MessageSent.php)
    window.Echo.private(`chat.${currentUser.value.id}`)
      // Gunakan DOT (.) di depan nama event karena memakai fungsi broadcastAs()
      .listen('.message.sent', (e) => {
        
        const senderId = e.message.sender_id;
        const targetAdminIndex = admins.value.findIndex(a => a.id === senderId);
        
        if (targetAdminIndex !== -1) {
            // Tambah angka badge admin terkait secara otomatis (+1)
            admins.value[targetAdminIndex].unread_count = (admins.value[targetAdminIndex].unread_count || 0) + 1;
            
            // Opsional (Bagus untuk UX): Geser admin yang baru mengirim pesan ke urutan paling atas
            const movedAdmin = admins.value.splice(targetAdminIndex, 1)[0];
            admins.value.unshift(movedAdmin);
        } else {
            // Jika ada staf admin baru yang mengirim chat dan belum ada di list, fetch ulang
            fetchAdmins();
        }
      });
  }
});

onUnmounted(() => {
  // [BARU] Tinggalkan channel untuk menghindari memori bocor (memory leak) atau double-listening
  if (currentUser.value && window.Echo) {
    window.Echo.leave(`chat.${currentUser.value.id}`);
  }
});
</script>

<style scoped>
.pop-enter-active, .pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from, .pop-leave-to {
  transform: scale(0);
}
</style> -->

<template>
  <div class="max-w-4xl min-h-screen px-6 py-24 mx-auto animate-fade-in">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">Customer Support</h1>
      <p class="mt-4 font-serif italic text-gray-500">Select an admin below to start a conversation.</p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div 
        v-for="admin in admins" 
        :key="admin.id"
        @click="$router.push(`/chat/${admin.id}`)"
        class="flex items-center p-6 transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-2xl hover:shadow-lg hover:border-black group"
      >
        <img 
          :src="admin.profile_image || `https://ui-avatars.com/api/?name=${admin.first_name}+${admin.last_name}&background=000&color=fff`" 
          class="object-cover w-16 h-16 rounded-full shadow-sm"
        />
        <div class="flex-grow ml-4">
          <h3 class="text-lg font-bold tracking-widest text-gray-900 uppercase group-hover:text-black">{{ admin.first_name }} {{ admin.last_name }}</h3>
          <p class="text-xs font-bold tracking-widest text-gray-400 uppercase">{{ admin.usertype }} Support</p>
        </div>
        
        <transition name="pop">
          <div 
            v-if="admin.unread_count > 0" 
            class="flex items-center justify-center w-6 h-6 mr-3 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-md shrink-0"
          >
            {{ admin.unread_count > 99 ? '99+' : admin.unread_count }}
          </div>
        </transition>

        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-300 transition-transform transform group-hover:translate-x-2 group-hover:text-black shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted, onUnmounted } from 'vue';
// import axios from 'axios';
// import { BASE_URL } from '../../config/api';

// const admins = ref([]);
// const isLoading = ref(true);
// const currentUser = ref(null);

// const fetchAdmins = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/chat/admins`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//     });
//     admins.value = res.data;
//   } catch (e) {
//     console.error(e);
//   } finally {
//     isLoading.value = false;
//   }
// };

// onMounted(async () => {
//   // 1. Dapatkan data user login
//   const userStr = localStorage.getItem('user');
//   if (userStr) {
//     currentUser.value = JSON.parse(userStr);
//   }

//   // 2. Fetch data list admin
//   await fetchAdmins();

//   // 3. [BARU] Setup Laravel Echo Listener untuk Real-Time Badge
//   if (currentUser.value && window.Echo) {
//     // Dengarkan channel private milik user (Sesuai dengan di MessageSent.php)
//     window.Echo.private(`chat.${currentUser.value.id}`)
//       // Gunakan DOT (.) di depan nama event karena memakai fungsi broadcastAs()
//       .listen('.message.sent', (e) => {
        
//         const senderId = e.message.sender_id;
//         const targetAdminIndex = admins.value.findIndex(a => a.id === senderId);
        
//         if (targetAdminIndex !== -1) {
//             // Tambah angka badge admin terkait secara otomatis (+1)
//             admins.value[targetAdminIndex].unread_count = (admins.value[targetAdminIndex].unread_count || 0) + 1;
            
//             // Opsional (Bagus untuk UX): Geser admin yang baru mengirim pesan ke urutan paling atas
//             const movedAdmin = admins.value.splice(targetAdminIndex, 1)[0];
//             admins.value.unshift(movedAdmin);
//         } else {
//             // Jika ada staf admin baru yang mengirim chat dan belum ada di list, fetch ulang
//             fetchAdmins();
//         }
//       });
//   }
// });

// onUnmounted(() => {
//   // [BARU] Tinggalkan channel untuk menghindari memori bocor (memory leak) atau double-listening
//   if (currentUser.value && window.Echo) {
//     window.Echo.leave(`chat.${currentUser.value.id}`);
//   }
// });

import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

const admins = ref([]);
const isLoading = ref(true);
const currentUser = ref(null);

const fetchAdmins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    admins.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

// [PERBAIKAN] Fungsi untuk merespons sinyal dari Header
const handleNewMessage = (e) => {
  const senderId = e.detail.sender_id;
  const targetAdminIndex = admins.value.findIndex(a => a.id === senderId);
  
  if (targetAdminIndex !== -1) {
      // Tambah angka badge
      admins.value[targetAdminIndex].unread_count = (admins.value[targetAdminIndex].unread_count || 0) + 1;
      
      // Geser admin ke paling atas karena pesannya terbaru
      const movedAdmin = admins.value.splice(targetAdminIndex, 1)[0];
      admins.value.unshift(movedAdmin);
  } else {
      // Refresh jika itu adalah admin baru
      fetchAdmins();
  }
};

onMounted(async () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    currentUser.value = JSON.parse(userStr);
  }

  await fetchAdmins();

  // Dengarkan sinyal lokal dari Header
  window.addEventListener('new-chat-message', handleNewMessage);
});

onUnmounted(() => {
  // Matikan pendengaran lokal tanpa membunuh koneksi soket utama
  window.removeEventListener('new-chat-message', handleNewMessage);
});
</script>

<style scoped>
.pop-enter-active, .pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from, .pop-leave-to {
  transform: scale(0);
}
</style>