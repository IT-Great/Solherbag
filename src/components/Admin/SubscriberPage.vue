<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px] animate-fade-in"
  >
    <Breadcrumb />
    <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
      <div class="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
        <p class="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">
          Total Subscribers
        </p>
        <p class="text-4xl font-black text-black">{{ totalSubs }}</p>
      </div>
      <div class="p-6 border border-blue-100 bg-blue-50/50 rounded-2xl">
        <p class="mb-1 text-xs font-bold tracking-widest text-blue-500 uppercase">
          Registered Users
        </p>
        <p class="text-4xl font-black text-blue-600">{{ registeredSubs }}</p>
      </div>
      <div class="p-6 border bg-amber-50/50 rounded-2xl border-amber-100">
        <p class="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">
          Guest Subscribers
        </p>
        <p class="text-4xl font-black text-amber-700">{{ guestSubs }}</p>
      </div>
    </div>

    <!-- <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Mailing List</h1>
        <p class="text-sm text-gray-500">Manage your newsletter audience.</p>
      </div>
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
          placeholder="Search email..."
          class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
        />
      </div>
    </div> -->

    <div class="flex flex-col items-end justify-between gap-4 mb-6 md:flex-row">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Mailing List</h1>
        <p class="text-sm text-gray-500">Manage your newsletter audience.</p>
      </div>
      
      <div class="flex flex-col w-full gap-3 sm:flex-row md:w-auto">
        <!-- Search Input -->
        <div class="relative w-full md:w-80">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search email..."
            class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
          />
        </div>
        
        <!-- 👇 TOMBOL EXPORT BARU 👇 -->
        <button
          @click="exportToCSV"
          :disabled="isExporting"
          class="flex items-center justify-center gap-2 px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:bg-emerald-300"
        >
          <svg v-if="!isExporting" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div v-else class="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
          {{ isExporting ? 'Exporting...' : 'Export CSV' }}
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-xs tracking-widest text-gray-400 uppercase border-b">
            <th class="pb-4 pl-2 font-medium">Email Address</th>
            <th class="pb-4 font-medium text-center">Identity</th>
            <th class="pb-4 font-medium text-center">Status</th>
            <th class="pb-4 font-medium text-center">Subscribed On</th>
            <th class="pb-4 pr-2 font-medium text-right">Action</th>
          </tr>
        </thead>

        <tbody v-if="isLoading" class="text-gray-600">
          <tr
            v-for="i in 5"
            :key="`skeleton-${i}`"
            class="border-b animate-pulse border-gray-50"
          >
            <td class="py-6 pl-2"><div class="w-48 h-4 bg-gray-200 rounded"></div></td>
            <td class="py-6"><div class="w-24 h-4 mx-auto bg-gray-200 rounded"></div></td>
            <td class="py-6"><div class="w-16 h-4 mx-auto bg-gray-200 rounded"></div></td>
            <td class="py-6"><div class="w-24 h-4 mx-auto bg-gray-200 rounded"></div></td>
            <td class="py-6 pr-2">
              <div class="w-16 h-6 ml-auto bg-gray-200 rounded"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr
            v-for="sub in filteredSubs"
            :key="sub.id"
            class="transition border-b hover:bg-gray-50 border-gray-50"
          >
            <td class="py-4 pl-2 font-bold text-gray-900">{{ sub.email }}</td>
            <td class="py-4 text-center">
              <span
                v-if="sub.is_registered"
                class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                >Registered</span
              >
              <span
                v-else
                class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                >Guest</span
              >
            </td>
            <td class="py-4 text-center">
              <span
                v-if="sub.is_active"
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                >Active</span
              >
              <span
                v-else
                class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                >Unsubscribed</span
              >
            </td>
            <td class="py-4 text-xs text-center text-gray-400">
              {{ new Date(sub.created_at).toLocaleDateString("id-ID") }}
            </td>
            <td class="py-4 pr-2 text-right">
              <button
                @click="openDetail(sub)"
                class="text-[10px] font-bold text-black border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-black hover:text-white transition"
              >
                Detail
              </button>
            </td>
          </tr>

          <tr v-if="filteredSubs.length === 0">
            <td colspan="5" class="py-12 italic text-center text-gray-400">
              No subscribers found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      @click="showModal = false"
    >
      <div
        class="relative w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl"
        @click.stop
      >
        <button
          @click="showModal = false"
          class="absolute text-gray-400 top-6 right-6 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2
          class="pb-4 mb-6 text-xl font-bold tracking-widest text-gray-800 uppercase border-b"
        >
          Subscriber Info
        </h2>

        <div class="space-y-4">
          <div>
            <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
              Email Address
            </p>
            <p class="text-lg font-bold text-black break-all">{{ selectedSub?.email }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                Account Type
              </p>
              <p class="text-sm font-medium">
                {{ selectedSub?.is_registered ? "Registered Member" : "Guest Visitor" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                Newsletter Status
              </p>
              <p
                :class="selectedSub?.is_active ? 'text-green-600' : 'text-red-500'"
                class="text-sm font-bold"
              >
                {{ selectedSub?.is_active ? "Active Receiver" : "Unsubscribed" }}
              </p>
            </div>
          </div>
          <div>
            <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
              Subscribed Since
            </p>
            <p class="text-sm font-medium">
              {{ new Date(selectedSub?.created_at).toLocaleString("id-ID") }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js"; // Sesuaikan path
import Breadcrumb from "./Layout/Breadcrumb.vue";

const subscribers = ref([]);
const isLoading = ref(true);
const searchQuery = ref("");

const showModal = ref(false);
const selectedSub = ref(null);

const isExporting = ref(false);

const exportToCSV = async () => {
  isExporting.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/subscribers/export`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      responseType: 'blob', // Penting agar Axios membaca response sebagai file, bukan JSON
    });

    // Buat objek URL dari blob data
    const url = window.URL.createObjectURL(new Blob([res.data]));
    
    // Buat elemen link tersembunyi untuk memicu download
    const link = document.createElement('a');
    link.href = url;
    
    // Format nama file: solher_subscribers_YYYY-MM-DD.csv
    const date = new Date().toISOString().split('T')[0];
    link.setAttribute('download', `solher_subscribers_${date}.csv`);
    
    // Append, klik, lalu bersihkan dari DOM
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
  } catch (error) {
    console.error("Gagal melakukan export CSV:", error);
    alert("Terjadi kesalahan saat mengunduh data.");
  } finally {
    isExporting.value = false;
  }
};

const fetchSubscribers = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/subscribers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    subscribers.value = res.data;
  } catch (error) {
    console.error(error);
  } finally {
    // setTimeout opsional untuk estetika animasi
    setTimeout(() => {
      isLoading.value = false;
    }, 400);
  }
};

const filteredSubs = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return subscribers.value.filter((sub) => sub.email.toLowerCase().includes(query));
});

const totalSubs = computed(() => subscribers.value.length);
const registeredSubs = computed(
  () => subscribers.value.filter((s) => s.is_registered).length
);
const guestSubs = computed(
  () => subscribers.value.filter((s) => !s.is_registered).length
);

const openDetail = (sub) => {
  selectedSub.value = sub;
  showModal.value = true;
};

onMounted(fetchSubscribers);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
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
</style>
