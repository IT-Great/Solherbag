<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px] animate-fade-in">
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100">
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Subscribers</p>
        <p class="text-4xl font-black text-black">{{ totalSubs }}</p>
      </div>
      <div class="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
        <p class="text-xs text-blue-500 font-bold uppercase tracking-widest mb-1">Registered Users</p>
        <p class="text-4xl font-black text-blue-600">{{ registeredSubs }}</p>
      </div>
      <div class="p-6 bg-amber-50/50 rounded-2xl border border-amber-100">
        <p class="text-xs text-amber-600 font-bold uppercase tracking-widest mb-1">Guest Subscribers</p>
        <p class="text-4xl font-black text-amber-700">{{ guestSubs }}</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Mailing List</h1>
        <p class="text-gray-500 text-sm">Manage your newsletter audience.</p>
      </div>
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input v-model="searchQuery" type="text" placeholder="Search email..." class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition"/>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4 font-medium pl-2">Email Address</th>
            <th class="pb-4 font-medium text-center">Identity</th>
            <th class="pb-4 font-medium text-center">Status</th>
            <th class="pb-4 font-medium text-center">Subscribed On</th>
            <th class="pb-4 font-medium text-right pr-2">Action</th>
          </tr>
        </thead>
        
        <tbody v-if="isLoading" class="text-gray-600">
          <tr v-for="i in 5" :key="`skeleton-${i}`" class="animate-pulse border-b border-gray-50">
            <td class="py-6 pl-2"><div class="h-4 bg-gray-200 rounded w-48"></div></td>
            <td class="py-6"><div class="h-4 bg-gray-200 rounded w-24 mx-auto"></div></td>
            <td class="py-6"><div class="h-4 bg-gray-200 rounded w-16 mx-auto"></div></td>
            <td class="py-6"><div class="h-4 bg-gray-200 rounded w-24 mx-auto"></div></td>
            <td class="py-6 pr-2"><div class="h-6 bg-gray-200 rounded w-16 ml-auto"></div></td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr v-for="sub in filteredSubs" :key="sub.id" class="hover:bg-gray-50 border-gray-50 border-b transition">
            <td class="py-4 pl-2 font-bold text-gray-900">{{ sub.email }}</td>
            <td class="py-4 text-center">
              <span v-if="sub.is_registered" class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Registered</span>
              <span v-else class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Guest</span>
            </td>
            <td class="py-4 text-center">
              <span v-if="sub.is_active" class="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Active</span>
              <span v-else class="bg-red-100 text-red-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">Unsubscribed</span>
            </td>
            <td class="py-4 text-gray-400 text-xs text-center">
              {{ new Date(sub.created_at).toLocaleDateString('id-ID') }}
            </td>
            <td class="py-4 text-right pr-2">
              <button @click="openDetail(sub)" class="text-[10px] font-bold text-black border border-gray-300 px-3 py-1.5 rounded-lg hover:bg-black hover:text-white transition">
                Detail
              </button>
            </td>
          </tr>
          
          <tr v-if="filteredSubs.length === 0">
            <td colspan="5" class="py-12 text-center text-gray-400 italic">No subscribers found.</td>
          </tr>
        </tbody>

      </table>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 flex justify-center items-center p-4 bg-black/40 backdrop-blur-sm" @click="showModal = false">
      <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative" @click.stop>
        <button @click="showModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <h2 class="text-xl font-bold mb-6 uppercase tracking-widest text-gray-800 border-b pb-4">Subscriber Info</h2>
        
        <div class="space-y-4">
          <div>
            <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Email Address</p>
            <p class="font-bold text-black text-lg break-all">{{ selectedSub?.email }}</p>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Account Type</p>
              <p class="font-medium text-sm">{{ selectedSub?.is_registered ? 'Registered Member' : 'Guest Visitor' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Newsletter Status</p>
              <p :class="selectedSub?.is_active ? 'text-green-600' : 'text-red-500'" class="font-bold text-sm">
                {{ selectedSub?.is_active ? 'Active Receiver' : 'Unsubscribed' }}
              </p>
            </div>
          </div>
          <div>
            <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Subscribed Since</p>
            <p class="font-medium text-sm">{{ new Date(selectedSub?.created_at).toLocaleString('id-ID') }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import { BASE_URL } from "../../config/api.js"; // Sesuaikan path

const subscribers = ref([]);
const isLoading = ref(true);
const searchQuery = ref("");

const showModal = ref(false);
const selectedSub = ref(null);

const fetchSubscribers = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/subscribers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
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
  return subscribers.value.filter(sub => sub.email.toLowerCase().includes(query));
});

const totalSubs = computed(() => subscribers.value.length);
const registeredSubs = computed(() => subscribers.value.filter(s => s.is_registered).length);
const guestSubs = computed(() => subscribers.value.filter(s => !s.is_registered).length);

const openDetail = (sub) => {
  selectedSub.value = sub;
  showModal.value = true;
};

onMounted(fetchSubscribers);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>