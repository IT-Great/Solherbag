<template>
  <div class="h-[100dvh] overflow-hidden bg-[#F9FAFB] flex flex-col max-w-3xl mx-auto pt-20 animate-fade-in">
    
    <div class="relative z-10 flex items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm shrink-0">
      <button @click="$router.back()" class="p-2 mr-4 text-gray-400 transition rounded-full bg-gray-50 hover:text-black hover:bg-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <div v-if="receiverProfile" class="flex items-center gap-3">
        <img 
          :src="receiverProfile.profile_image || `https://ui-avatars.com/api/?name=${receiverProfile.first_name}+${receiverProfile.last_name}&background=000&color=fff`" 
          class="object-cover w-10 h-10 rounded-full shadow-sm"
        />
        <div>
          <h2 class="text-sm font-bold tracking-widest text-black uppercase">{{ receiverProfile.first_name }} {{ receiverProfile.last_name }}</h2>
          <p class="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
            <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Support
          </p>
        </div>
      </div>

      <div v-else class="flex items-center gap-3 animate-pulse">
         <div class="w-10 h-10 bg-gray-200 rounded-full"></div>
         <div>
           <div class="w-24 h-3 mb-1 bg-gray-200 rounded"></div>
           <div class="w-12 h-2 bg-gray-200 rounded"></div>
         </div>
      </div>
    </div>

    <div class="flex flex-col p-6 overflow-y-auto grow custom-scrollbar" ref="chatContainer">
      <div v-if="isLoading" class="flex justify-center py-10">
        <div class="w-8 h-8 border-2 border-gray-300 rounded-full border-t-black animate-spin"></div>
      </div>

      <div
        v-for="msg in messages"
        :key="msg.id"
        class="flex w-full mb-4"
        :class="msg.sender_id === myId ? 'justify-end' : 'justify-start'"
      >
        <div
          :class="msg.sender_id === myId ? 'bg-black text-white rounded-l-2xl rounded-tr-2xl' : 'bg-white border border-gray-200 text-black rounded-r-2xl rounded-tl-2xl'"
          class="px-5 py-3 max-w-[75%] shadow-sm relative group"
        >
          <p class="text-sm leading-relaxed whitespace-pre-wrap">{{ msg.message }}</p>
          <span
            class="block mt-1 text-[9px] opacity-50 text-right"
            :class="msg.sender_id === myId ? 'text-gray-300' : 'text-gray-500'"
          >
            {{ new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
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
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const route = useRoute();
const receiverId = Number(route.params.id);

const messages = ref([]);
const newMessage = ref("");
const isLoading = ref(true);
const isSending = ref(false);
const chatContainer = ref(null);

// [BARU] State untuk menyimpan data profil lawan bicara
const receiverProfile = ref(null);

const userData = JSON.parse(localStorage.getItem("user"));
const myId = ref(userData ? Number(userData.id) : null);
const token = localStorage.getItem("token");

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
};

const fetchMessages = async () => {
  if (!token) return; 
  try {
    const res = await axios.get(`${BASE_URL}/chat/messages/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    messages.value = res.data;
    
    // [BARU] Curi data profil lawan dari pesan pertama yang ada (jika ada history)
    if (messages.value.length > 0) {
        const firstMessage = messages.value[0];
        receiverProfile.value = firstMessage.sender_id === receiverId ? firstMessage.sender : firstMessage.receiver;
    }

    scrollToBottom();
  } catch (error) {
    console.error("Gagal mengambil pesan", error);
  } finally {
    isLoading.value = false;
  }
};

const sendMessage = async () => {
  if (!newMessage.value.trim() || !myId.value) return;
  isSending.value = true;

  const tempMessage = {
    id: Date.now(),
    sender_id: myId.value,
    message: newMessage.value,
    created_at: new Date().toISOString(),
  };
  messages.value.push(tempMessage);
  const sentMessage = newMessage.value;
  newMessage.value = "";
  scrollToBottom();

  try {
    const res = await axios.post(
      `${BASE_URL}/chat/send`,
      {
        receiver_id: receiverId,
        message: sentMessage,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const index = messages.value.findIndex((m) => m.id === tempMessage.id);
    if (index !== -1) messages.value[index] = res.data;
  } catch (error) {
    console.error("Gagal mengirim pesan", error);
  } finally {
    isSending.value = false;
  }
};

onMounted(() => {
  fetchMessages();

  if (myId.value && token) {
    window.Pusher = Pusher;
    Pusher.logToConsole = true;
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      authEndpoint: `${BASE_URL}/broadcasting/auth`,
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    window.Echo.private(`chat.${myId.value}`).listen(".message.sent", (e) => {
      if (e.message.sender_id === receiverId) {
        messages.value.push(e.message);
        scrollToBottom();
      }
    });
  }
});

onUnmounted(() => {
  if (window.Echo && myId.value) {
    window.Echo.leave(`chat.${myId.value}`);
  }
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
</style>