<!-- <template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]">
    
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
        <p class="mt-4 text-xs font-bold tracking-widest text-black uppercase animate-pulse">Retrieving Messages...</p>
      </div>
    </div>

    <h1 class="mb-8 text-2xl font-bold text-gray-800">Inbound Messages</h1>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-xs tracking-widest text-gray-400 uppercase border-b">
            <th class="pb-4 font-medium">Sender</th>
            <th class="pb-4 font-medium">Contact Info</th>
            <th class="pb-4 font-medium">Message</th>
            <th class="pb-4 font-medium text-center">Date</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr v-for="msg in messages" :key="msg.id" class="transition border-b hover:bg-gray-50 border-gray-50">
            <td class="py-4 align-top">
              <p class="font-bold text-gray-900">{{ msg.sender.name }}</p>
              <span v-if="msg.sender.is_registered" class="bg-blue-100 px-2 py-0.5 rounded-full font-bold text-[10px] text-blue-600 uppercase">Registered User</span>
              <span v-else class="bg-gray-100 px-2 py-0.5 rounded-full font-bold text-[10px] text-gray-500 uppercase">Guest</span>
            </td>
            <td class="py-4 text-sm align-top">
              <p>{{ msg.sender.email }}</p>
              <p class="text-gray-400">{{ msg.sender.phone || '-' }}</p>
            </td>
            <td class="max-w-xs py-4 align-top">
              <p class="text-sm leading-relaxed truncate hover:whitespace-normal cursor-help">
                {{ msg.content.message }}
              </p>
            </td>
            <td class="py-4 text-xs text-center text-gray-400 align-top">
              {{ new Date(msg.metadata.full_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}
            </td>
          </tr>

          <tr v-if="!isLoading && messages.length === 0">
            <td colspan="4" class="py-20 font-serif text-lg italic text-center text-gray-400">
              No inbound messages found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from "../../config/api.js";

const messages = ref([]);
const isLoading = ref(false); // State untuk mengontrol animasi

const fetchMessages = async () => {
  isLoading.value = true; // Aktifkan spinner
  try {
    const res = await axios.get(`${BASE_URL}/admin/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    messages.value = res.data.data;
  } catch (error) {
    console.error("Failed to load messages", error);
  } finally {
    // Memberikan delay 500ms agar transisi visual lebih smooth dan profesional
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

onMounted(fetchMessages);
</script>

<style scoped>
/* Spinner Animation Logic */
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Memperhalus tampilan teks pesan saat hover */
.leading-relaxed {
  transition: all 0.3s ease;
}
</style> -->

<!-- <template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]">
    
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
        <p class="mt-4 text-xs font-bold tracking-widest text-black uppercase animate-pulse">Retrieving Messages...</p>
      </div>
    </div>

    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Inbound Messages</h1>
      <p class="text-sm text-gray-500">View inquiries from customers and guests.</p>
    </div>

    <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search sender, email, or message..." 
          class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-bold tracking-wide text-gray-400 uppercase">Show:</span>
        <select 
          v-model="itemsPerPage" 
          class="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-xs tracking-widest text-gray-400 uppercase border-b">
            <th class="pb-4 font-medium">Sender</th>
            <th class="pb-4 font-medium">Contact Info</th>
            <th class="pb-4 font-medium">Message</th>
            <th class="pb-4 font-medium text-center">Date</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr v-for="msg in paginatedMessages" :key="msg.id" class="transition border-b hover:bg-gray-50 border-gray-50">
            <td class="py-4 align-top">
              <p class="font-bold text-gray-900">{{ msg.sender.name }}</p>
              <span v-if="msg.sender.is_registered" class="bg-blue-100 px-2 py-0.5 rounded-full font-bold text-[10px] text-blue-600 uppercase">Registered User</span>
              <span v-else class="bg-gray-100 px-2 py-0.5 rounded-full font-bold text-[10px] text-gray-500 uppercase">Guest</span>
            </td>
            <td class="py-4 text-sm align-top">
              <p>{{ msg.sender.email }}</p>
              <p class="text-gray-400">{{ msg.sender.phone || '-' }}</p>
            </td>
            <td class="max-w-xs py-4 align-top">
              <p class="text-sm leading-relaxed truncate hover:whitespace-normal cursor-help">
                {{ msg.content.message }}
              </p>
            </td>
            <td class="py-4 text-xs text-center text-gray-400 align-top">
              {{ new Date(msg.metadata.full_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) }}
            </td>
          </tr>

          <tr v-if="!isLoading && paginatedMessages.length === 0">
            <td colspan="4" class="py-20 font-serif italic text-center text-gray-400">
              {{ searchQuery ? 'No messages match your search.' : 'No inbound messages found.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!isLoading && filteredMessages.length > 0" class="flex flex-col items-center justify-between gap-4 pt-6 mt-8 border-t md:flex-row border-gray-50">
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to <span class="font-bold text-black">{{ showingEnd }}</span> of <span class="font-bold text-black">{{ filteredMessages.length }}</span> messages
      </p>

      <div class="flex gap-2">
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <button 
          v-for="page in displayedPages" 
          :key="page" 
          @click="currentPage = page"
          :class="currentPage === page ? 'bg-black text-white border-black' : 'hover:bg-gray-50 border-gray-200'"
          class="flex items-center justify-center w-10 h-10 text-sm font-medium transition border rounded-xl"
        >
          {{ page }}
        </button>

        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { BASE_URL } from "../../config/api.js";

const messages = ref([]);
const isLoading = ref(false);

// --- State untuk Pagination & Filter ---
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10); // Default 10 item per halaman

// --- Computed Properties ---

// 1. Filter Messages berdasarkan Search Query
const filteredMessages = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return messages.value;

  return messages.value.filter(msg => 
    msg.sender.name.toLowerCase().includes(query) ||
    msg.sender.email.toLowerCase().includes(query) ||
    msg.content.message.toLowerCase().includes(query)
  );
});

// 2. Hitung Total Halaman
const totalPages = computed(() => Math.ceil(filteredMessages.value.length / itemsPerPage.value));

// 3. Potong Data (Slice) sesuai halaman aktif
const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredMessages.value.slice(start, end);
});

// 4. Logic Teks "Showing X to Y"
const showingStart = computed(() => {
  if (filteredMessages.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredMessages.value.length));

// 5. Logic Tombol Halaman (Agar rapi jika halaman banyak)
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2; 
  let range = [];
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i);
  }
  return range;
});

// --- Watchers ---
// Reset ke halaman 1 jika user mencari sesuatu atau mengubah limit row
watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

// --- Fetch Data ---
const fetchMessages = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
    });
    // Asumsi response structure sesuai ContactResource { data: [...] }
    messages.value = res.data.data ? res.data.data : res.data; 
  } catch (error) {
    console.error("Failed to load messages", error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

onMounted(fetchMessages);
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.leading-relaxed {
  transition: all 0.3s ease;
}

/* Transisi halus untuk row tabel */
tr {
  transition: all 0.2s ease-in-out;
}
</style> -->

<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]"
  >
    <Breadcrumb />
    <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
      <div class="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
        <p class="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
          Total Messages
        </p>
        <p class="text-4xl font-black text-black">{{ totalMessages }}</p>
      </div>
      <div class="p-6 border border-blue-100 bg-blue-50/50 rounded-2xl">
        <p class="mb-1 text-xs font-bold tracking-widest text-blue-500 uppercase">
          Unread
        </p>
        <p class="text-4xl font-black text-blue-600">{{ unreadMessages }}</p>
      </div>
      <div class="p-6 border border-green-100 bg-green-50/50 rounded-2xl">
        <p class="mb-1 text-xs font-bold tracking-widest text-green-600 uppercase">
          Responded
        </p>
        <p class="text-4xl font-black text-green-700">{{ respondedMessages }}</p>
      </div>
    </div>

    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Inbound Messages</h1>
      <p class="text-sm text-gray-500">View and respond to inquiries from customers.</p>
    </div>

    <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search sender or email..."
          class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
        />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-xs tracking-widest text-gray-400 uppercase border-b">
            <th class="pb-4 font-medium">Status</th>
            <th class="pb-4 font-medium">Sender</th>
            <th class="pb-4 font-medium">Message Snippet</th>
            <th class="pb-4 font-medium text-center">Date</th>
            <th class="pb-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="msg in paginatedMessages"
            :key="msg.id"
            :class="!msg.is_read ? 'bg-blue-50/20' : 'hover:bg-gray-50'"
            class="transition border-b border-gray-50"
          >
            <td class="py-4 align-middle">
              <span
                v-if="msg.response"
                class="bg-green-100 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                >Replied</span
              >
              <span
                v-else-if="!msg.is_read"
                class="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider animate-pulse"
                >New</span
              >
              <span
                v-else
                class="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider"
                >Read</span
              >
            </td>
            <td class="py-4 align-middle">
              <p class="font-bold text-gray-900">{{ msg.name }}</p>
              <p class="text-xs text-gray-500">{{ msg.email }}</p>
            </td>
            <td class="max-w-xs py-4 align-middle">
              <p class="text-sm truncate">{{ msg.description }}</p>
            </td>
            <td class="py-4 text-xs text-center text-gray-400 align-middle">
              {{ new Date(msg.created_at).toLocaleDateString("id-ID") }}
            </td>
            <td class="py-4 text-right align-middle">
              <button
                @click="$router.push(`/admin/messages/${msg.id}`)"
                class="px-4 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-lg hover:bg-gray-800"
              >
                Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const messages = ref([]);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const fetchMessages = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    messages.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

const totalMessages = computed(() => messages.value.length);
const unreadMessages = computed(() => messages.value.filter((m) => !m.is_read).length);
const respondedMessages = computed(() => messages.value.filter((m) => m.response).length);

const filteredMessages = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return messages.value.filter(
    (msg) =>
      msg.name.toLowerCase().includes(query) || msg.email.toLowerCase().includes(query)
  );
});

const paginatedMessages = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredMessages.value.slice(start, start + itemsPerPage.value);
});

onMounted(fetchMessages);
</script>
