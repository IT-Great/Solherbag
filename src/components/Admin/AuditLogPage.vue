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

    <div v-if="selectedLog" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" @click="selectedLog = null">
      <div class="w-full max-w-2xl p-6 bg-white rounded-2xl shadow-xl max-h-[80vh] overflow-y-auto" @click.stop>
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-bold">Data Payload Analysis</h3>
          <button @click="selectedLog = null" class="text-gray-400 hover:text-black">✖</button>
        </div>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 border border-red-100 bg-red-50 rounded-xl">
            <h4 class="mb-3 text-xs font-bold tracking-widest text-red-800 uppercase">Old Values</h4>
            <pre class="text-[10px] overflow-x-auto text-red-900">{{ formatJson(selectedLog.old_values) }}</pre>
          </div>
          <div class="p-4 border border-green-100 bg-green-50 rounded-xl">
            <h4 class="mb-3 text-xs font-bold tracking-widest text-green-800 uppercase">New Values</h4>
            <pre class="text-[10px] overflow-x-auto text-green-900">{{ formatJson(selectedLog.new_values) }}</pre>
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
    logs.value = res.data.data; // Karena kita pakai paginate di backend
  } catch (error) {
    console.error("Gagal mengambil audit log", error);
  } finally {
    isLoading.value = false;
  }
};

const viewDetails = (log) => {
  selectedLog.value = log;
};

const formatJson = (data) => {
  if (!data) return 'No data recorded.';
  return JSON.stringify(data, null, 2);
};

onMounted(() => {
  fetchLogs();
});
</script>