<template>
  <div class="relative min-h-[600px] p-8 bg-white border border-gray-100 shadow-sm rounded-2xl animate-fade-in">
    <div class="flex items-end justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">System Audit Trail</h1>
        <p class="text-sm text-gray-500">Monitor all critical data changes in real-time.</p>
      </div>
      <button @click="fetchLogs" class="p-2 transition bg-gray-100 rounded-lg hover:bg-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-xs tracking-widest text-gray-400 uppercase border-b">
            <th class="pb-4 pl-2 font-medium">Timestamp</th>
            <th class="pb-4 font-medium">Actor</th>
            <th class="pb-4 font-medium">Action</th>
            <th class="pb-4 font-medium">Module</th>
            <th class="pb-4 font-medium">Details</th>
          </tr>
        </thead>
        
        <tbody v-if="isLoading">
          <tr v-for="i in 5" :key="i" class="border-b border-gray-50">
            <td colspan="5" class="py-6">
              <div class="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr v-for="log in logs" :key="log.id" class="transition border-b border-gray-50 hover:bg-gray-50">
            <td class="py-4 pl-2 text-xs">{{ new Date(log.created_at).toLocaleString() }}</td>
            <td class="py-4 text-sm font-bold text-gray-800">
              {{ log.user ? `${log.user.first_name} ${log.user.last_name}` : 'System/Deleted User' }}
              <span class="block text-[10px] font-normal text-gray-400">{{ log.user?.usertype || '-' }} | IP: {{ log.ip_address }}</span>
            </td>
            <td class="py-4">
              <span :class="{
                'bg-green-100 text-green-700': log.action === 'created',
                'bg-blue-100 text-blue-700': log.action === 'updated',
                'bg-red-100 text-red-700': log.action === 'deleted'
              }" class="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded">
                {{ log.action }}
              </span>
            </td>
            <td class="py-4 text-sm font-bold">{{ log.model_type }} <span class="text-xs font-normal text-gray-400">#{{ log.model_id }}</span></td>
            <td class="py-4">
              <button @click="viewDetails(log)" class="text-xs font-bold text-blue-600 hover:underline">View Payload</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="selectedLog" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" @click="selectedLog = null">
      <div class="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-xl max-h-[85vh] flex flex-col" @click.stop>
        
        <div class="flex items-center justify-between mb-6 shrink-0">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Data Change Analysis</h3>
            <p class="mt-1 text-xs text-gray-500">
              Module: <span class="font-bold text-black">{{ selectedLog.model_type }} #{{ selectedLog.model_id }}</span> | 
              Action: <span class="font-bold tracking-wider text-black uppercase">{{ selectedLog.action }}</span>
            </p>
          </div>
          <button @click="selectedLog = null" class="p-2 text-gray-400 transition-colors bg-gray-100 rounded-full hover:text-black hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 gap-6 pr-2 overflow-y-auto md:grid-cols-2 custom-scrollbar grow">
          
          <div class="p-5 border border-red-100 bg-red-50/50 rounded-xl h-fit">
            <h4 class="flex items-center gap-2 pb-3 mb-4 text-xs font-black tracking-widest text-red-800 uppercase border-b border-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Previous Data
            </h4>
            
            <div v-if="isEmpty(selectedLog.old_values)" class="py-4 text-sm italic text-center text-red-400">
              No previous data recorded.
            </div>
            
            <ul v-else class="space-y-4">
              <li v-for="(value, key) in selectedLog.old_values" :key="key" class="flex flex-col">
                <span class="text-[10px] font-bold text-red-800/60 uppercase tracking-widest mb-1">{{ formatKey(key) }}</span>
                <span class="text-sm font-medium leading-relaxed break-words text-red-950">{{ formatValue(value) }}</span>
              </li>
            </ul>
          </div>

          <div class="p-5 border border-green-100 bg-green-50/50 rounded-xl h-fit">
            <h4 class="flex items-center gap-2 pb-3 mb-4 text-xs font-black tracking-widest text-green-800 uppercase border-b border-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Updated Data
            </h4>
            
            <div v-if="isEmpty(selectedLog.new_values)" class="py-4 text-sm italic text-center text-green-400">
              No new data recorded.
            </div>
            
            <ul v-else class="space-y-4">
              <li v-for="(value, key) in selectedLog.new_values" :key="key" class="flex flex-col">
                <span class="text-[10px] font-bold text-green-800/60 uppercase tracking-widest mb-1">{{ formatKey(key) }}</span>
                <span class="text-sm font-medium leading-relaxed break-words text-green-950">{{ formatValue(value) }}</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

const logs = ref([]);
const isLoading = ref(true);
const selectedLog = ref(null);

const fetchLogs = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/audit-logs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
    });
    logs.value = res.data.data; 
  } catch (error) {
    console.error("Gagal mengambil audit log", error);
  } finally {
    isLoading.value = false;
  }
};

const viewDetails = (log) => {
  selectedLog.value = log;
};

// [BARU] Helper untuk mengecek objek kosong
const isEmpty = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

// [BARU] Helper penerjemah bahasa mesin (Key) ke bahasa manusia
const formatKey = (key) => {
  if (!key) return '';
  // Mengubah 'discount_price' menjadi 'Discount Price'
  return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

// [BARU] Helper penerjemah nilai data (Value)
const formatValue = (val) => {
  if (val === null || val === undefined || val === '') return '-';
  if (typeof val === 'boolean') return val ? 'Yes' : 'No';
  // Jika nilainya ternyata array atau object bersarang, kita stringify agar tidak error
  if (typeof val === 'object') return JSON.stringify(val); 
  return val;
};

onMounted(() => {
  fetchLogs();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Scrollbar Custom untuk di dalam Modal */
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }
</style>