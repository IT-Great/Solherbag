<!-- <template>
  <div 
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    @click.self="$router.back()"
  >
    
    <div class="flex flex-col w-full max-w-2xl bg-[#F9FAFB] shadow-2xl rounded-2xl overflow-hidden h-[85vh] md:h-[75vh]">
      
      <div class="relative z-10 flex items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm shrink-0">
        <button @click="$router.back()" class="p-2 mr-4 text-gray-400 transition rounded-full bg-gray-50 hover:text-black hover:bg-gray-200 focus:outline-none">
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
            <p v-if="isOpponentTyping" class="text-[10px] text-blue-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5 animate-pulse">
              Typing...
            </p>
            <p v-else class="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
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

        <button @click="$router.back()" class="p-2 ml-auto text-gray-400 transition hover:text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="relative flex flex-col p-4 overflow-y-auto md:p-6 grow custom-scrollbar" ref="chatContainer">
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-[#F9FAFB]/80 z-10">
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
            class="px-4 md:px-5 py-3 max-w-[85%] md:max-w-[75%] shadow-sm relative group min-w-[100px]"
          >
            <p class="text-[13px] md:text-sm leading-relaxed whitespace-pre-wrap">{{ msg.message }}</p>
            <div class="flex justify-end items-center gap-1.5 mt-1.5">
              <span
                class="text-[9px] opacity-70"
                :class="msg.sender_id === myId ? 'text-gray-300' : 'text-gray-500'"
              >
                {{ new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
              </span>
              <span v-if="msg.sender_id === myId">
                <svg v-if="msg.is_read" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 6 7 17 2 12"></polyline>
                  <polyline points="22 10 11 21 6 16"></polyline>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-3 bg-white border-t border-gray-200 md:p-4 shrink-0">
        <form @submit.prevent="sendMessage" class="flex items-center gap-2 md:gap-3">
          <input
            v-model="newMessage"
            @input="handleTyping"
            type="text"
            placeholder="Type your message..."
            class="flex-grow p-3 text-xs transition border border-gray-200 outline-none md:p-4 md:text-sm bg-gray-50 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white"
          />
          <button
            type="submit"
            :disabled="!newMessage.trim() || isSending"
            class="flex items-center justify-center w-10 h-10 text-white transition-all bg-black shadow-lg md:w-12 md:h-12 shrink-0 rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="!isSending" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <div v-else class="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const route = useRoute();
const router = useRouter(); // Pastikan useRouter di-import
const receiverId = Number(route.params.id);

const messages = ref([]);
const newMessage = ref("");
const isLoading = ref(true);
const isSending = ref(false);
const chatContainer = ref(null);
const receiverProfile = ref(null);

const isOpponentTyping = ref(false);
let typingTimeout = null;
let lastTypingTime = 0;

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

const handleTyping = () => {
  const now = Date.now();
  if (now - lastTypingTime > 1500) {
    lastTypingTime = now;
    axios.post(`${BASE_URL}/chat/typing`, { receiver_id: receiverId }, { headers: { Authorization: `Bearer ${token}` } }).catch(()=>{});
  }
};

const markAsRead = async () => {
  try {
    await axios.post(`${BASE_URL}/chat/read/${receiverId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  } catch (e) {}
};

const fetchMessages = async () => {
  if (!token) return; 
  try {
    const res = await axios.get(`${BASE_URL}/chat/messages/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    messages.value = res.data;
    
    if (messages.value.length > 0) {
        const firstMessage = messages.value[0];
        receiverProfile.value = firstMessage.sender_id === receiverId ? firstMessage.sender : firstMessage.receiver;
    }

    scrollToBottom();
    markAsRead();
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
    is_read: false
  };
  messages.value.push(tempMessage);
  const sentMessage = newMessage.value;
  newMessage.value = "";
  scrollToBottom();

  try {
    const res = await axios.post(
      `${BASE_URL}/chat/send`,
      { receiver_id: receiverId, message: sentMessage },
      { headers: { Authorization: `Bearer ${token}` } },
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
  // Cegah scroll di body utama saat modal terbuka
  document.body.style.overflow = 'hidden';

  fetchMessages();

  if (myId.value && token) {
    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      authEndpoint: `${BASE_URL}/broadcasting/auth`,
      auth: { headers: { Authorization: `Bearer ${token}` } },
    });

    window.Echo.private(`chat.${myId.value}`)
      .listen(".message.sent", (e) => {
        if (e.message.sender_id === receiverId) {
          messages.value.push(e.message);
          scrollToBottom();
          markAsRead(); 
        }
      })
      .listen(".message.read", (e) => {
        if (e.reader_id === receiverId) {
          messages.value.forEach(m => {
            if (m.sender_id === myId.value) m.is_read = true;
          });
        }
      })
      .listen(".user.typing", (e) => {
        if (e.typer_id === receiverId) {
          isOpponentTyping.value = true;
          clearTimeout(typingTimeout);
          typingTimeout = setTimeout(() => isOpponentTyping.value = false, 2000);
        }
      });
  }
});

onUnmounted(() => {
  // Kembalikan fungsi scroll body saat modal ditutup
  document.body.style.overflow = 'auto';

  if (window.Echo && myId.value) {
    window.Echo.leave(`chat.${myId.value}`);
  }
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.2s ease-out; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
</style> -->

<!-- <template>
  <div 
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    @click.self="$router.back()"
  >
    <div class="flex flex-col w-full max-w-2xl bg-[#F9FAFB] shadow-2xl rounded-2xl overflow-hidden h-[85vh] md:h-[75vh]">
      
      <div class="relative z-10 flex items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm shrink-0">
        <button @click="$router.back()" class="p-2 mr-4 text-gray-400 transition rounded-full bg-gray-50 hover:text-black hover:bg-gray-200 focus:outline-none">
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
            <p v-if="isOpponentTyping" class="text-[10px] text-blue-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5 animate-pulse">
              Typing...
            </p>
            <p v-else class="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
            </p>
          </div>
        </div>

        <button @click="$router.back()" class="p-2 ml-auto text-gray-400 transition hover:text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="relative flex flex-col p-4 overflow-y-auto md:p-6 grow custom-scrollbar" ref="chatContainer">
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-[#F9FAFB]/80 z-10">
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
            class="px-4 md:px-5 py-3 max-w-[85%] md:max-w-[75%] shadow-sm relative group min-w-[100px]"
          >
            <div v-if="msg.attachment" class="mb-2">
              <img v-if="msg.attachment_type === 'image'" :src="getAttachmentUrl(msg.attachment)" class="object-cover max-w-full rounded-lg cursor-pointer max-h-48" @click="openImage(getAttachmentUrl(msg.attachment))" />
              <video v-else-if="msg.attachment_type === 'video'" :src="getAttachmentUrl(msg.attachment)" controls class="max-w-full rounded-lg max-h-48"></video>
            </div>

            <p v-if="msg.message" class="text-[13px] md:text-sm leading-relaxed whitespace-pre-wrap">{{ msg.message }}</p>
            
            <div class="flex justify-end items-center gap-1.5 mt-1.5">
              <span class="text-[9px] opacity-70" :class="msg.sender_id === myId ? 'text-gray-300' : 'text-gray-500'">
                {{ new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
              </span>
              <span v-if="msg.sender_id === myId">
                <svg v-if="msg.is_read" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 6 7 17 2 12"></polyline><polyline points="22 10 11 21 6 16"></polyline>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-3 bg-white border-t border-gray-200 shrink-0">
        <div v-if="filePreview" class="relative inline-block mb-3 ml-2">
          <img v-if="selectedFileType === 'image'" :src="filePreview" class="object-cover w-20 h-20 border-2 border-gray-200 rounded-xl" />
          <div v-else-if="selectedFileType === 'video'" class="flex items-center justify-center w-20 h-20 bg-gray-800 rounded-xl">
             <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <button @click="removeFile" class="absolute p-1 text-white bg-red-500 rounded-full shadow-md -top-2 -right-2 hover:bg-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form @submit.prevent="sendMessage" class="flex items-end gap-2 md:gap-3">
          <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*,video/*" class="hidden" />
          
          <button type="button" @click="$refs.fileInput.click()" class="p-3 text-gray-400 transition bg-gray-50 rounded-2xl hover:text-black hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          <input
            v-model="newMessage"
            @input="handleTyping"
            type="text"
            placeholder="Type your message..."
            class="flex-grow p-3 text-xs transition border border-gray-200 outline-none md:p-4 md:text-sm bg-gray-50 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white"
          />
          
          <button
            type="submit"
            :disabled="(!newMessage.trim() && !selectedFile) || isSending"
            class="flex items-center justify-center w-10 h-10 text-white transition-all bg-black shadow-lg md:w-12 md:h-12 shrink-0 rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="!isSending" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <div v-else class="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

const route = useRoute();
const router = useRouter(); 
const receiverId = Number(route.params.id);

const messages = ref([]);
const newMessage = ref("");
const isLoading = ref(true);
const isSending = ref(false);
const chatContainer = ref(null);
const receiverProfile = ref(null);

// [BARU] State untuk File Upload
const fileInput = ref(null);
const selectedFile = ref(null);
const filePreview = ref(null);
const selectedFileType = ref(null);

const isOpponentTyping = ref(false);
let typingTimeout = null;
let lastTypingTime = 0;

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

// [BARU] Logic URL Gambar Storage
const getAttachmentUrl = (path) => {
  // Menghapus '/api' dari BASE_URL lalu menambahkan path storage
  const baseUrlFixed = BASE_URL.replace('/api', '');
  return `${baseUrlFixed}/storage/${path}`;
};

// [BARU] Fitur Zoom/Buka Gambar di Tab Baru
const openImage = (url) => {
  window.open(url, '_blank');
};

// [BARU] Menangani pemilihan file
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Validasi Ukuran (Maks 10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert("File is too large. Maximum size is 10MB.");
    return;
  }

  selectedFile.value = file;
  selectedFileType.value = file.type.startsWith('video') ? 'video' : 'image';
  
  if (selectedFileType.value === 'image') {
    filePreview.value = URL.createObjectURL(file);
  } else {
    filePreview.value = true; // Placeholder untuk video
  }
};

const removeFile = () => {
  selectedFile.value = null;
  filePreview.value = null;
  selectedFileType.value = null;
  if (fileInput.value) fileInput.value.value = "";
};

const handleTyping = () => {
  const now = Date.now();
  if (now - lastTypingTime > 1500) {
    lastTypingTime = now;
    axios.post(`${BASE_URL}/chat/typing`, { receiver_id: receiverId }, { headers: { Authorization: `Bearer ${token}` } }).catch(()=>{});
  }
};

const markAsRead = async () => {
  try {
    await axios.post(`${BASE_URL}/chat/read/${receiverId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
  } catch (e) {}
};

const fetchMessages = async () => {
  if (!token) return; 
  try {
    const res = await axios.get(`${BASE_URL}/chat/messages/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    messages.value = res.data;
    if (messages.value.length > 0) {
        const firstMessage = messages.value[0];
        receiverProfile.value = firstMessage.sender_id === receiverId ? firstMessage.sender : firstMessage.receiver;
    }
    scrollToBottom();
    markAsRead();
  } catch (error) {
    console.error("Gagal mengambil pesan", error);
  } finally {
    isLoading.value = false;
  }
};

// const sendMessage = async () => {
//   // Boleh kirim jika ada teks ATAU ada file
//   if ((!newMessage.value.trim() && !selectedFile.value) || !myId.value) return;
//   isSending.value = true;

//   // [PERBAIKAN] Menggunakan FormData untuk mengirim File
//   const formData = new FormData();
//   formData.append('receiver_id', receiverId);
//   if (newMessage.value.trim()) formData.append('message', newMessage.value);
//   if (selectedFile.value) formData.append('attachment', selectedFile.value);

//   // Optimistic Update khusus teks (karena file sulit dirender sebelum diupload)
//   const tempId = Date.now();
//   if (newMessage.value.trim() && !selectedFile.value) {
//       messages.value.push({
//         id: tempId,
//         sender_id: myId.value,
//         message: newMessage.value,
//         created_at: new Date().toISOString(),
//         is_read: false
//       });
//       scrollToBottom();
//   }

//   const sentMessage = newMessage.value;
//   newMessage.value = "";

//   try {
//     const res = await axios.post(`${BASE_URL}/chat/send`, formData, { 
//       headers: { 
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'multipart/form-data'
//       } 
//     });
    
//     // Hapus file dari preview
//     removeFile();

//     if (sentMessage && !selectedFile.value) {
//       const index = messages.value.findIndex((m) => m.id === tempId);
//       if (index !== -1) messages.value[index] = res.data;
//     } else {
//       // Jika mengirim file, kita push response asli dari server agar gambarnya muncul
//       messages.value.push(res.data);
//       scrollToBottom();
//     }
    
//   } catch (error) {
//     console.error("Gagal mengirim pesan", error);
//   } finally {
//     isSending.value = false;
//   }
// };

const sendMessage = async () => {
  // Boleh kirim jika ada teks ATAU ada file
  if ((!newMessage.value.trim() && !selectedFile.value) || !myId.value) return;
  isSending.value = true;

  const formData = new FormData();
  formData.append('receiver_id', receiverId);
  if (newMessage.value.trim()) formData.append('message', newMessage.value);
  if (selectedFile.value) formData.append('attachment', selectedFile.value);

  // [PERBAIKAN KRUSIAL] Tangkap status apakah ada file yang dikirim saat ini
  const isSendingFile = !!selectedFile.value;

  // Optimistic Update khusus pesan teks murni (tanpa file)
  const tempId = Date.now();
  if (newMessage.value.trim() && !isSendingFile) {
      messages.value.push({
        id: tempId,
        sender_id: myId.value,
        message: newMessage.value,
        created_at: new Date().toISOString(),
        is_read: false
      });
      scrollToBottom();
  }

  const sentMessage = newMessage.value;
  newMessage.value = "";

  try {
    const res = await axios.post(`${BASE_URL}/chat/send`, formData, { 
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      } 
    });
    
    // Hapus file dari state setelah dikirim ke server
    removeFile();

    // [PERBAIKAN KRUSIAL] Gunakan variabel isSendingFile yang ditangkap di atas
    if (!isSendingFile) {
      // Jika murni teks, timpa data Optimistic Update dengan data asli dari server
      const index = messages.value.findIndex((m) => m.id === tempId);
      if (index !== -1) messages.value[index] = res.data;
    } else {
      // Jika ada file (gambar/video), langsung masukkan respons dari server ke layar
      messages.value.push(res.data);
      scrollToBottom();
    }
    
  } catch (error) {
    console.error("Gagal mengirim pesan", error);
  } finally {
    isSending.value = false;
  }
};

onMounted(() => {
  document.body.style.overflow = 'hidden';
  fetchMessages();

  if (myId.value && token) {
    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: import.meta.env.VITE_PUSHER_APP_KEY,
      cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
      forceTLS: true,
      authEndpoint: `${BASE_URL}/broadcasting/auth`,
      auth: { headers: { Authorization: `Bearer ${token}` } },
    });

    window.Echo.private(`chat.${myId.value}`)
      .listen(".message.sent", (e) => {
        if (e.message.sender_id === receiverId) {
          messages.value.push(e.message);
          scrollToBottom();
          markAsRead(); 
        }
      })
      .listen(".message.read", (e) => {
        if (e.reader_id === receiverId) {
          messages.value.forEach(m => {
            if (m.sender_id === myId.value) m.is_read = true;
          });
        }
      })
      .listen(".user.typing", (e) => {
        if (e.typer_id === receiverId) {
          isOpponentTyping.value = true;
          clearTimeout(typingTimeout);
          typingTimeout = setTimeout(() => isOpponentTyping.value = false, 2000);
        }
      });
  }
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
  if (window.Echo && myId.value) {
    window.Echo.leave(`chat.${myId.value}`);
  }
});
</script> -->

<template>
  <div 
    class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    @click.self="$router.back()"
  >
    <div class="flex flex-col w-full max-w-2xl bg-[#F9FAFB] shadow-2xl rounded-2xl overflow-hidden h-[85vh] md:h-[75vh]">
      
      <div class="relative z-10 flex items-center px-6 py-4 bg-white border-b border-gray-200 shadow-sm shrink-0">
        <button @click="$router.back()" class="p-2 mr-4 text-gray-400 transition rounded-full bg-gray-50 hover:text-black hover:bg-gray-200 focus:outline-none">
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
            <p v-if="isOpponentTyping" class="text-[10px] text-blue-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5 animate-pulse">
              Typing...
            </p>
            <p v-else class="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Online
            </p>
          </div>
        </div>

        <button @click="$router.back()" class="p-2 ml-auto text-gray-400 transition hover:text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="relative flex flex-col p-4 overflow-y-auto md:p-6 grow custom-scrollbar" ref="chatContainer">
        <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center bg-[#F9FAFB]/80 z-10">
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
            class="px-4 md:px-5 py-3 max-w-[85%] md:max-w-[75%] shadow-sm relative group min-w-[100px]"
          >
            <div v-if="msg.attachment" class="mb-2">
              <img v-if="msg.attachment_type === 'image'" :src="getAttachmentUrl(msg.attachment)" class="object-cover max-w-full rounded-lg cursor-pointer max-h-48" @click="openImage(getAttachmentUrl(msg.attachment))" />
              <video v-else-if="msg.attachment_type === 'video'" :src="getAttachmentUrl(msg.attachment)" controls class="max-w-full rounded-lg max-h-48"></video>
            </div>

            <p v-if="msg.message" class="text-[13px] md:text-sm leading-relaxed whitespace-pre-wrap">{{ msg.message }}</p>
            
            <div class="flex justify-end items-center gap-1.5 mt-1.5">
              <span class="text-[9px] opacity-70" :class="msg.sender_id === myId ? 'text-gray-300' : 'text-gray-500'">
                {{ new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }}
              </span>
              <span v-if="msg.sender_id === myId">
                <svg v-if="msg.is_read" xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="18 6 7 17 2 12"></polyline><polyline points="22 10 11 21 6 16"></polyline>
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-3 bg-white border-t border-gray-200 shrink-0">
        <div v-if="filePreview" class="relative inline-block mb-3 ml-2">
          <img v-if="selectedFileType === 'image'" :src="filePreview" class="object-cover w-20 h-20 border-2 border-gray-200 rounded-xl" />
          <div v-else-if="selectedFileType === 'video'" class="flex items-center justify-center w-20 h-20 bg-gray-800 rounded-xl">
             <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <button @click="removeFile" class="absolute p-1 text-white bg-red-500 rounded-full shadow-md -top-2 -right-2 hover:bg-red-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form @submit.prevent="sendMessage" class="flex items-end gap-2 md:gap-3">
          <input type="file" ref="fileInput" @change="handleFileSelect" accept="image/*,video/*" class="hidden" />
          
          <button type="button" @click="$refs.fileInput.click()" class="p-3 text-gray-400 transition bg-gray-50 rounded-2xl hover:text-black hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          <input
            v-model="newMessage"
            @input="handleTyping"
            type="text"
            placeholder="Type your message..."
            class="flex-grow p-3 text-xs transition border border-gray-200 outline-none md:p-4 md:text-sm bg-gray-50 rounded-2xl focus:ring-2 focus:ring-black focus:bg-white"
          />
          
          <button
            type="submit"
            :disabled="(!newMessage.trim() && !selectedFile) || isSending"
            class="flex items-center justify-center w-10 h-10 text-white transition-all bg-black shadow-lg md:w-12 md:h-12 shrink-0 rounded-2xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg v-if="!isSending" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 md:w-5 md:h-5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <div v-else class="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const route = useRoute();
const router = useRouter(); 
const receiverId = Number(route.params.id);

const messages = ref([]);
const newMessage = ref("");
const isLoading = ref(true);
const isSending = ref(false);
const chatContainer = ref(null);
const receiverProfile = ref(null);

const fileInput = ref(null);
const selectedFile = ref(null);
const filePreview = ref(null);
const selectedFileType = ref(null);

const isOpponentTyping = ref(false);
let typingTimeout = null;
let lastTypingTime = 0;

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

const getAttachmentUrl = (path) => {
  const baseUrlFixed = BASE_URL.replace('/api', '');
  return `${baseUrlFixed}/storage/${path}`;
};

const openImage = (url) => {
  window.open(url, '_blank');
};

const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 10 * 1024 * 1024) {
    alert("File is too large. Maximum size is 10MB.");
    return;
  }

  selectedFile.value = file;
  selectedFileType.value = file.type.startsWith('video') ? 'video' : 'image';
  
  if (selectedFileType.value === 'image') {
    filePreview.value = URL.createObjectURL(file);
  } else {
    filePreview.value = true;
  }
};

const removeFile = () => {
  selectedFile.value = null;
  filePreview.value = null;
  selectedFileType.value = null;
  if (fileInput.value) fileInput.value.value = "";
};

const handleTyping = () => {
  const now = Date.now();
  if (now - lastTypingTime > 1500) {
    lastTypingTime = now;
    axios.post(`${BASE_URL}/chat/typing`, { receiver_id: receiverId }, { headers: { Authorization: `Bearer ${token}` } }).catch(()=>{});
  }
};

const markAsRead = async () => {
  try {
    await axios.post(`${BASE_URL}/chat/read/${receiverId}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    // [BARU] Beri tahu Header untuk mereset angkanya karena kita sudah membaca pesan
    window.dispatchEvent(new Event('refresh-chat-badge'));
  } catch (e) {}
};

const fetchMessages = async () => {
  if (!token) return; 
  try {
    const res = await axios.get(`${BASE_URL}/chat/messages/${receiverId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    messages.value = res.data;
    if (messages.value.length > 0) {
        const firstMessage = messages.value[0];
        receiverProfile.value = firstMessage.sender_id === receiverId ? firstMessage.sender : firstMessage.receiver;
    }
    scrollToBottom();
    markAsRead();
  } catch (error) {
    console.error("Gagal mengambil pesan", error);
  } finally {
    isLoading.value = false;
  }
};

const sendMessage = async () => {
  if ((!newMessage.value.trim() && !selectedFile.value) || !myId.value) return;
  isSending.value = true;

  const formData = new FormData();
  formData.append('receiver_id', receiverId);
  if (newMessage.value.trim()) formData.append('message', newMessage.value);
  if (selectedFile.value) formData.append('attachment', selectedFile.value);

  const isSendingFile = !!selectedFile.value;
  const tempId = Date.now();

  if (newMessage.value.trim() && !isSendingFile) {
      messages.value.push({
        id: tempId,
        sender_id: myId.value,
        message: newMessage.value,
        created_at: new Date().toISOString(),
        is_read: false
      });
      scrollToBottom();
  }

  const sentMessage = newMessage.value;
  newMessage.value = "";

  try {
    const res = await axios.post(`${BASE_URL}/chat/send`, formData, { 
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      } 
    });
    
    removeFile();

    if (!isSendingFile) {
      const index = messages.value.findIndex((m) => m.id === tempId);
      if (index !== -1) messages.value[index] = res.data;
    } else {
      messages.value.push(res.data);
      scrollToBottom();
    }
    
  } catch (error) {
    console.error("Gagal mengirim pesan", error);
  } finally {
    isSending.value = false;
  }
};

// [PERBAIKAN KRITIS] Gunakan listener untuk memanipulasi pesan masuk
const handleIncomingMessage = (e) => {
  // Hanya proses jika pesan dari lawan bicara kita saat ini (receiverId)
  if (e.detail.sender_id === receiverId) {
    messages.value.push(e.detail);
    scrollToBottom();
    markAsRead(); 
  }
};

// Listener tambahan untuk typing dan read receipt
const handleIncomingTypingAndRead = () => {
  if (myId.value && window.Echo) {
    window.Echo.private(`chat.${myId.value}`)
      .listen(".message.read", (e) => {
        if (e.reader_id === receiverId) {
          messages.value.forEach(m => {
            if (m.sender_id === myId.value) m.is_read = true;
          });
        }
      })
      .listen(".user.typing", (e) => {
        if (e.typer_id === receiverId) {
          isOpponentTyping.value = true;
          clearTimeout(typingTimeout);
          typingTimeout = setTimeout(() => isOpponentTyping.value = false, 2000);
        }
      });
  }
};


onMounted(() => {
  document.body.style.overflow = 'hidden';
  fetchMessages();

  // 1. Dengarkan event lokal dari Header (Agar koneksi Echo tidak bertabrakan)
  window.addEventListener('new-chat-message', handleIncomingMessage);

  // 2. Setup listener lain (Read receipt & typing)
  handleIncomingTypingAndRead();
});

onUnmounted(() => {
  document.body.style.overflow = 'auto';
  
  // [PERBAIKAN] Matikan listener lokal
  window.removeEventListener('new-chat-message', handleIncomingMessage);

  // Matikan pendengar spesifik agar tidak bocor, tanpa memutus koneksi Echo secara brutal
  if (myId.value && window.Echo) {
    window.Echo.private(`chat.${myId.value}`)
      .stopListening(".message.read")
      .stopListening(".user.typing");
  }
});
</script>