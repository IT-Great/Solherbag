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

<!-- <template>
  <div class="max-w-4xl min-h-screen px-6 py-24 mx-auto animate-fade-in">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        {{ $t("chat.chat_page_title") }}
      </h1>
      <p class="mt-4 font-serif italic text-gray-500">
        {{ $t("chat.select_admin") }}
      </p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
      ></div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div
        v-for="admin in admins"
        :key="admin.id"
        @click="$router.push(`/chat/${admin.id}`)"
        class="flex items-center p-6 transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-2xl hover:shadow-lg hover:border-black group"
      >
        <img
          :src="
            admin.profile_image ||
            `https://ui-avatars.com/api/?name=${admin.first_name}+${admin.last_name}&background=000&color=fff`
          "
          class="object-cover w-16 h-16 rounded-full shadow-sm"
        />
        <div class="flex-grow ml-4">
          <h3
            class="text-lg font-bold tracking-widest text-gray-900 uppercase group-hover:text-black"
          >
            {{ admin.first_name }} {{ admin.last_name }}
          </h3>
          <p class="text-xs font-bold tracking-widest text-gray-400 uppercase">
            {{ admin.usertype }} Support
          </p>
        </div>

        <transition name="pop">
          <div
            v-if="admin.unread_count > 0"
            class="flex items-center justify-center w-6 h-6 mr-3 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-md shrink-0"
          >
            {{ admin.unread_count > 99 ? "99+" : admin.unread_count }}
          </div>
        </transition>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-gray-300 transition-transform transform group-hover:translate-x-2 group-hover:text-black shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const admins = ref([]);
const isLoading = ref(true);

const fetchAdmins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    admins.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const handleNewMessage = (e) => {
  const senderId = e.detail.sender_id;
  const targetAdminIndex = admins.value.findIndex((a) => a.id === senderId);

  if (targetAdminIndex !== -1) {
    admins.value[targetAdminIndex].unread_count =
      (admins.value[targetAdminIndex].unread_count || 0) + 1;
    const movedAdmin = admins.value.splice(targetAdminIndex, 1)[0];
    admins.value.unshift(movedAdmin);
  } else {
    fetchAdmins();
  }
};

onMounted(async () => {
  await fetchAdmins();
  // Hanya mendengarkan Header, tidak mengurus Echo sama sekali!
  window.addEventListener("new-chat-message", handleNewMessage);
});

onUnmounted(() => {
  window.removeEventListener("new-chat-message", handleNewMessage);
  // TIDAK ADA LAGI window.Echo.leave() DI SINI!
});
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}
</style> -->

<!-- 1 akun untuk AI ChatBot dan CS Admin -->
<!-- <template>
  <div class="max-w-4xl min-h-screen px-6 py-24 mx-auto animate-fade-in">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        {{ $t("chat.chat_page_title") }}
      </h1>
      <p class="mt-4 font-serif italic text-gray-500">
        {{ $t("chat.select_admin") }}
      </p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
      ></div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div
        v-for="admin in admins"
        :key="admin.id"
        @click="$router.push(`/chat/${admin.id}`)"
        class="flex items-center p-6 transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-2xl hover:shadow-lg hover:border-black group"
      >
        <img
          :src="
            isAiUser(admin)
              ? `https://api.dicebear.com/7.x/bottts/svg?seed=${admin.first_name}&backgroundColor=000000`
              : admin.profile_image ||
                `https://ui-avatars.com/api/?name=${admin.first_name}+${admin.last_name}&background=000&color=fff`
          "
          class="object-cover w-16 h-16 rounded-full shadow-sm"
        />
        <div class="flex-grow ml-4">
          <h3
            class="text-lg font-bold tracking-widest text-gray-900 uppercase group-hover:text-black"
          >
            {{ admin.first_name }} {{ admin.last_name }}
          </h3>
          <p class="text-xs font-bold tracking-widest text-gray-400 uppercase">
            {{ isAiUser(admin) ? "AI Assistant" : admin.usertype + " Support" }}
          </p>
        </div>

        <transition name="pop">
          <div
            v-if="admin.unread_count > 0"
            class="flex items-center justify-center w-6 h-6 mr-3 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-md shrink-0"
          >
            {{ admin.unread_count > 99 ? "99+" : admin.unread_count }}
          </div>
        </transition>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 text-gray-300 transition-transform transform group-hover:translate-x-2 group-hover:text-black shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const admins = ref([]);
const isLoading = ref(true);

// Fungsi untuk mendeteksi apakah admin adalah AI
// const isAiUser = (user) => {
//   if (!user) return false;
//   return (
//     user.usertype === "ai" ||
//     (user.first_name && user.first_name.toLowerCase().includes("ai"))
//   );
// };

// Fungsi untuk mendeteksi apakah admin adalah AI
const isAiUser = (user) => {
  if (!user) return false;

  const type = user.usertype?.toLowerCase() || "";
  const fName = user.first_name?.toLowerCase() || "";
  const lName = user.last_name?.toLowerCase() || "";
  const email = user.email?.toLowerCase() || "";

  // Deteksi dari usertype, nama depan, nama belakang, atau email
  return (
    type === "ai" || fName.includes("ai") || lName.includes("ai") || email.includes("ai@")
  );
};

const fetchAdmins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    admins.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const handleNewMessage = (e) => {
  const senderId = e.detail.sender_id;
  const targetAdminIndex = admins.value.findIndex((a) => a.id === senderId);

  if (targetAdminIndex !== -1) {
    admins.value[targetAdminIndex].unread_count =
      (admins.value[targetAdminIndex].unread_count || 0) + 1;
    const movedAdmin = admins.value.splice(targetAdminIndex, 1)[0];
    admins.value.unshift(movedAdmin);
  } else {
    fetchAdmins();
  }
};

onMounted(async () => {
  await fetchAdmins();
  window.addEventListener("new-chat-message", handleNewMessage);
});

onUnmounted(() => {
  window.removeEventListener("new-chat-message", handleNewMessage);
});
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}
</style> -->

<!-- <template>
  <div class="max-w-4xl min-h-screen px-6 py-24 mx-auto animate-fade-in">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        Bantuan & Dukungan
      </h1>
      <p class="mt-4 font-serif italic text-gray-500">
        Hubungi layanan pelanggan resmi kami
      </p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
      ></div>
    </div>

    <div v-else class="flex justify-center">
      <div
        v-for="admin in admins"
        :key="admin.id"
        @click="$router.push(`/chat/${admin.id}`)"
        class="flex items-center w-full max-w-lg p-6 transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-2xl hover:shadow-lg hover:border-black group"
      >
        <img
          src="https://api.dicebear.com/7.x/initials/svg?seed=SC&backgroundColor=000000"
          class="object-cover w-16 h-16 rounded-full shadow-sm shrink-0"
        />
        <div class="flex-grow ml-4">
          <h3
            class="flex items-center gap-2 text-lg font-bold tracking-widest text-gray-900 uppercase group-hover:text-black"
          >
            {{ admin.first_name }} {{ admin.last_name }}
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.1 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 7.1-7.1 1.4 1.4-8.5 8.5z"
              />
            </svg>
          </h3>
          <p class="mt-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Official Business Account
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const admins = ref([]);
const isLoading = ref(true);

const fetchAdmins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    admins.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchAdmins);
</script> -->

<!-- 
<template>
  <div class="max-w-4xl min-h-screen px-6 py-24 mx-auto animate-fade-in">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        Bantuan & Dukungan
      </h1>
      <p class="mt-4 font-serif italic text-gray-500">
        Hubungi layanan pelanggan resmi kami
      </p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
      ></div>
    </div>

    <div v-else class="flex justify-center">
      <div
        v-for="admin in admins"
        :key="admin.id"
        @click="$router.push(`/chat/${admin.id}`)"
        class="relative flex items-center w-full max-w-lg p-6 transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-2xl hover:shadow-lg hover:border-black group"
      >
        <img
          src="https://api.dicebear.com/7.x/initials/svg?seed=SC&backgroundColor=000000"
          class="object-cover w-16 h-16 rounded-full shadow-sm shrink-0"
        />
        <div class="flex-grow ml-4">
          <h3
            class="flex items-center gap-2 text-lg font-bold tracking-widest text-gray-900 uppercase transition-colors group-hover:text-black"
          >
            {{ admin.first_name }} {{ admin.last_name }}
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.1 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 7.1-7.1 1.4 1.4-8.5 8.5z"
              />
            </svg>
          </h3>
          <p class="mt-1 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Official Business Account
          </p>
        </div>

        <transition name="pop">
          <div
            v-if="admin.unread_count > 0"
            class="flex items-center justify-center w-6 h-6 ml-auto text-[10px] font-bold text-white bg-red-600 rounded-full shadow-md shrink-0"
          >
            {{ admin.unread_count > 99 ? "99+" : admin.unread_count }}
          </div>
        </transition>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 ml-auto text-gray-300 transition-transform transform shrink-0 group-hover:translate-x-1 group-hover:text-black"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const admins = ref([]);
const isLoading = ref(true);

const fetchAdmins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    admins.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

// 👇 PERBAIKAN: Fungsi untuk menangkap event Real-Time dari Header.vue
const handleNewMessage = () => {
  // Jika ada pesan baru masuk saat User masih melihat daftar ini, langsung tambahkan angkanya
  if (admins.value.length > 0) {
    admins.value[0].unread_count = (admins.value[0].unread_count || 0) + 1;
  }
};

onMounted(() => {
  fetchAdmins();
  // Menyadap sinyal pesan masuk global dari Header
  window.addEventListener("new-chat-message", handleNewMessage);
  window.addEventListener("refresh-chat-badge", fetchAdmins);
});

onUnmounted(() => {
  window.removeEventListener("new-chat-message", handleNewMessage);
  window.removeEventListener("refresh-chat-badge", fetchAdmins);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animasi memantul (Pop-up) untuk Badge Chat */
.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}
</style> -->
<template>
  <div class="max-w-4xl min-h-screen px-6 py-24 mx-auto animate-fade-in">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        Bantuan & Dukungan
      </h1>
      <p class="mt-4 font-serif italic text-gray-500">
        Hubungi layanan pelanggan resmi kami
      </p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
      ></div>
    </div>

    <div v-else class="flex justify-center">
      <div
        v-for="admin in admins"
        :key="admin.id"
        @click="$router.push(`/chat/${admin.id}`)"
        class="relative flex items-center w-full max-w-lg p-6 transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-2xl hover:shadow-lg hover:border-black group"
      >
        <img
          src="https://api.dicebear.com/7.x/initials/svg?seed=SC&backgroundColor=000000"
          class="object-cover w-16 h-16 rounded-full shadow-sm shrink-0"
        />
        <div class="flex-grow ml-4">
          <h3
            class="flex items-center gap-2 text-lg font-bold tracking-widest text-gray-900 uppercase transition-colors group-hover:text-black"
          >
            {{ admin.first_name }} {{ admin.last_name }}
            <!-- Verified Badge -->
            <svg class="w-5 h-5 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.1 14.6l-4.2-4.2 1.4-1.4 2.8 2.8 7.1-7.1 1.4 1.4-8.5 8.5z"
              />
            </svg>
          </h3>
          <p class="text-xs font-bold tracking-widest text-gray-400 uppercase mt-1">
            Official Business Account
          </p>
        </div>

        <!-- 👇 PERBAIKAN: Menjadikan v-if dan v-else sepadan / sejajar 👇 -->
        <div class="flex items-center ml-auto h-6">
          <transition name="pop" mode="out-in">
            <div
              v-if="admin.unread_count > 0"
              class="flex items-center justify-center w-6 h-6 text-[10px] font-bold text-white bg-red-600 rounded-full shadow-md shrink-0"
            >
              {{ admin.unread_count > 99 ? "99+" : admin.unread_count }}
            </div>

            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-300 transition-transform transform shrink-0 group-hover:translate-x-1 group-hover:text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const admins = ref([]);
const isLoading = ref(true);

const fetchAdmins = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    admins.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
};

const handleNewMessage = () => {
  if (admins.value.length > 0) {
    admins.value[0].unread_count = (admins.value[0].unread_count || 0) + 1;
  }
};

onMounted(() => {
  fetchAdmins();
  window.addEventListener("new-chat-message", handleNewMessage);
  window.addEventListener("refresh-chat-badge", fetchAdmins);
});

onUnmounted(() => {
  window.removeEventListener("new-chat-message", handleNewMessage);
  window.removeEventListener("refresh-chat-badge", fetchAdmins);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.pop-enter-active,
.pop-leave-active {
  transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.2s;
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0.5);
  opacity: 0;
}
</style>
