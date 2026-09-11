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

// const fetchMessages = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/admin/messages`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
//     });
//     messages.value = res.data;
//   } catch (error) {
//     console.error(error);
//   }
// };

const fetchMessages = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/messages`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    
    // 👇 PERBAIKAN: Ambil array 'data' jika Laravel mengirim format Pagination
    messages.value = res.data.data !== undefined ? res.data.data : res.data;
    
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
