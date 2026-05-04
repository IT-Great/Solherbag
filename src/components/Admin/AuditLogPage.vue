<!-- <template>
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
</style> -->

<!-- <template>
  <div
    class="relative min-h-[600px] p-6 md:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl animate-fade-in"
  >
    <div class="flex items-end justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">System Audit Trail</h1>
        <p class="text-sm text-gray-500">
          Monitor all critical data changes in real-time.
        </p>
      </div>
      <button
        @click="fetchLogs"
        class="p-2 transition bg-gray-100 rounded-lg hover:bg-gray-200"
        title="Refresh Logs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>

    <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <div class="flex flex-wrap items-center w-full gap-3 md:w-auto">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold tracking-widest text-gray-400 uppercase"
            >Show:</span
          >
          <select
            v-model="itemsPerPage"
            class="px-3 py-1.5 text-sm font-bold border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-black"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>

        <div class="hidden w-px h-6 bg-gray-200 md:block"></div>

        <select
          v-model="filters.action"
          class="px-3 py-1.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-black"
        >
          <option value="All">All Actions</option>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
          <option value="deleted">Deleted</option>
        </select>

        <input
          type="date"
          v-model="filters.date"
          class="px-3 py-1.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-black"
        />

        <button
          v-if="filters.action !== 'All' || filters.date || filters.search"
          @click="resetFilters"
          class="text-xs font-bold text-red-500 hover:underline"
        >
          Clear Filter
        </button>
      </div>

      <div class="w-full md:w-72">
        <div class="relative">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search actor, module..."
            class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-1 focus:ring-black"
          />
          <svg
            class="top-2.5 left-3 absolute w-4 h-4 text-gray-400"
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
        </div>
      </div>
    </div>

    <div class="overflow-x-auto border border-gray-100 rounded-xl">
      <table class="w-full text-left border-collapse bg-white/50">
        <thead>
          <tr
            class="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-100 bg-gray-50/50"
          >
            <th class="p-4 font-bold">Timestamp</th>
            <th class="p-4 font-bold">Actor</th>
            <th class="p-4 font-bold">Action</th>
            <th class="p-4 font-bold">Module</th>
            <th class="p-4 font-bold text-right">Details</th>
          </tr>
        </thead>

        <tbody v-if="isLoading">
          <tr
            v-for="i in itemsPerPage > 10 ? 10 : itemsPerPage"
            :key="i"
            class="border-b border-gray-50"
          >
            <td colspan="5" class="py-6">
              <div class="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else-if="paginatedLogs.length === 0">
          <tr>
            <td colspan="5" class="py-16 text-sm italic text-center text-gray-400">
              No audit logs found matching your criteria.
            </td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr
            v-for="log in paginatedLogs"
            :key="log.id"
            class="transition border-b border-gray-50 hover:bg-gray-50/80"
          >
            <td class="p-4 text-xs">{{ new Date(log.created_at).toLocaleString() }}</td>
            <td class="p-4 text-sm font-bold text-gray-800">
              {{
                log.user
                  ? `${log.user.first_name} ${log.user.last_name}`
                  : "System/Deleted User"
              }}
              <span class="block text-[10px] font-normal text-gray-400 mt-0.5">
                {{ log.user?.usertype || "system" }} | IP: {{ log.ip_address }}
              </span>
            </td>
            <td class="p-4">
              <span
                :class="{
                  'bg-green-100 text-green-700': log.action === 'created',
                  'bg-blue-100 text-blue-700': log.action === 'updated',
                  'bg-red-100 text-red-700': log.action === 'deleted',
                }"
                class="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-md"
              >
                {{ log.action }}
              </span>
            </td>
            <td class="p-4 text-sm font-bold">
              {{ log.model_type }}
              <span class="text-xs font-normal text-gray-400">#{{ log.model_id }}</span>
            </td>
            <td class="p-4 text-right">
              <button
                @click="viewDetails(log)"
                class="text-xs font-bold text-blue-600 hover:underline"
              >
                View Payload
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && totalItems > 0"
      class="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row"
    >
      <p class="text-sm text-gray-500">
        Showing <span class="font-bold text-gray-900">{{ showingStart }}</span> to
        <span class="font-bold text-gray-900">{{ showingEnd }}</span> of
        <span class="font-bold text-gray-900">{{ totalItems }}</span> entries
      </p>

      <div v-if="totalPages > 1" class="flex items-center gap-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Prev
        </button>

        <div class="hidden gap-1 sm:flex">
          <button
            v-for="(page, index) in visiblePages"
            :key="index"
            @click="typeof page === 'number' ? changePage(page) : null"
            :disabled="page === '...'"
            :class="[
              currentPage === page
                ? 'bg-black text-white border-black shadow-sm'
                : 'hover:bg-gray-50 border-gray-200 text-gray-600',
              page === '...'
                ? 'cursor-default border-transparent hover:bg-transparent'
                : 'border',
            ]"
            class="flex items-center justify-center w-8 h-8 text-xs font-bold transition rounded-lg"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

    <div
      v-if="selectedLog"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click="selectedLog = null"
    >
      <div
        class="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-xl max-h-[85vh] flex flex-col"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6 shrink-0">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Data Change Analysis</h3>
            <p class="mt-1 text-xs text-gray-500">
              Module:
              <span class="font-bold text-black"
                >{{ selectedLog.model_type }} #{{ selectedLog.model_id }}</span
              >
              | Action:
              <span class="font-bold tracking-wider text-black uppercase">{{
                selectedLog.action
              }}</span>
            </p>
          </div>
          <button
            @click="selectedLog = null"
            class="p-2 text-gray-400 transition-colors bg-gray-100 rounded-full hover:text-black hover:bg-gray-200"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div
          class="grid grid-cols-1 gap-6 pr-2 overflow-y-auto md:grid-cols-2 custom-scrollbar grow"
        >
          <div class="p-5 border border-red-100 bg-red-50/50 rounded-xl h-fit">
            <h4
              class="flex items-center gap-2 pb-3 mb-4 text-xs font-black tracking-widest text-red-800 uppercase border-b border-red-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Previous Data
            </h4>

            <div
              v-if="isEmpty(selectedLog.old_values)"
              class="py-4 text-sm italic text-center text-red-400"
            >
              No previous data recorded.
            </div>

            <ul v-else class="space-y-4">
              <li
                v-for="(value, key) in selectedLog.old_values"
                :key="key"
                class="flex flex-col"
              >
                <span
                  class="text-[10px] font-bold text-red-800/60 uppercase tracking-widest mb-1"
                  >{{ formatKey(key) }}</span
                >
                <span
                  class="text-sm font-medium leading-relaxed break-words text-red-950"
                  >{{ formatValue(value) }}</span
                >
              </li>
            </ul>
          </div>

          <div class="p-5 border border-green-100 bg-green-50/50 rounded-xl h-fit">
            <h4
              class="flex items-center gap-2 pb-3 mb-4 text-xs font-black tracking-widest text-green-800 uppercase border-b border-green-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Updated Data
            </h4>

            <div
              v-if="isEmpty(selectedLog.new_values)"
              class="py-4 text-sm italic text-center text-green-400"
            >
              No new data recorded.
            </div>

            <ul v-else class="space-y-4">
              <li
                v-for="(value, key) in selectedLog.new_values"
                :key="key"
                class="flex flex-col"
              >
                <span
                  class="text-[10px] font-bold text-green-800/60 uppercase tracking-widest mb-1"
                  >{{ formatKey(key) }}</span
                >
                <span
                  class="text-sm font-medium leading-relaxed break-words text-green-950"
                  >{{ formatValue(value) }}</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

// State Utama
const logs = ref([]);
const isLoading = ref(true);
const selectedLog = ref(null);

// State Filters
const filters = ref({
  search: "",
  action: "All",
  date: "",
});

// State Pagination
const currentPage = ref(1);
const itemsPerPage = ref(10);

const fetchLogs = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/audit-logs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    logs.value = res.data.data || res.data; // Tangani jika backend mengembalikan array atau object pagination
    currentPage.value = 1; // Reset halaman
  } catch (error) {
    console.error("Gagal mengambil audit log", error);
  } finally {
    isLoading.value = false;
  }
};

const resetFilters = () => {
  filters.value.search = "";
  filters.value.action = "All";
  filters.value.date = "";
};

// ==========================================
// LOGIKA FILTERING (CLIENT SIDE)
// ==========================================
const filteredLogs = computed(() => {
  let result = logs.value;

  // 1. Filter Action (Created, Updated, Deleted)
  if (filters.value.action !== "All") {
    result = result.filter((log) => log.action === filters.value.action);
  }

  // 2. Filter Date (Format YYYY-MM-DD)
  if (filters.value.date) {
    result = result.filter((log) => {
      // Potong format ISO (2026-04-29T14:23:24.000Z) untuk mengambil tanggalnya saja
      const logDate = new Date(log.created_at).toISOString().split("T")[0];
      return logDate === filters.value.date;
    });
  }

  // 3. Filter Search (Actor Name, Module, Action)
  if (filters.value.search) {
    const q = filters.value.search.toLowerCase();
    result = result.filter((log) => {
      const actorName = log.user
        ? `${log.user.first_name} ${log.user.last_name}`.toLowerCase()
        : "system/deleted user";
      const moduleType = log.model_type ? log.model_type.toLowerCase() : "";
      return actorName.includes(q) || moduleType.includes(q);
    });
  }

  return result;
});

// ==========================================
// LOGIKA PAGINATION
// ==========================================
const totalItems = computed(() => filteredLogs.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredLogs.value.slice(start, end);
});

const showingStart = computed(() => {
  if (totalItems.value === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, totalItems.value);
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const maxVisible = 5;

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    return [1, 2, 3, 4, "...", total];
  }

  if (current >= total - 2) {
    return [1, "...", total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
});

// Kembalikan ke halaman 1 setiap kali ada filter yang berubah
watch(
  [
    () => filters.value.action,
    () => filters.value.date,
    () => filters.value.search,
    itemsPerPage,
  ],
  () => {
    currentPage.value = 1;
  }
);

// ==========================================
// HELPER MODAL
// ==========================================
const viewDetails = (log) => {
  selectedLog.value = log;
};

const isEmpty = (obj) => {
  return !obj || Object.keys(obj).length === 0;
};

const formatKey = (key) => {
  if (!key) return "";
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const formatValue = (val) => {
  if (val === null || val === undefined || val === "") return "-";
  if (typeof val === "boolean") return val ? "Yes" : "No";
  if (typeof val === "object") return JSON.stringify(val);
  return val;
};

onMounted(() => {
  fetchLogs();
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

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style> -->

<template>
  <div
    class="relative min-h-[600px] p-6 md:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl animate-fade-in"
  >
    <div class="flex items-end justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">System Audit Trail</h1>
        <p class="text-sm text-gray-500">
          Monitor all critical data changes in real-time.
        </p>
      </div>
      <button
        @click="fetchLogs"
        class="p-2 transition bg-gray-100 rounded-lg hover:bg-gray-200"
        title="Refresh Logs"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      </button>
    </div>

    <!-- Toolbar: Filters, Search & EXPORT BUTTONS -->
    <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <!-- Kiri: Filters -->
      <div class="flex flex-wrap items-center w-full gap-3 md:w-auto">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold tracking-widest text-gray-400 uppercase"
            >Show:</span
          >
          <select
            v-model="itemsPerPage"
            class="px-3 py-1.5 text-sm font-bold border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-black"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>

        <div class="hidden w-px h-6 bg-gray-200 md:block"></div>

        <select
          v-model="filters.action"
          class="px-3 py-1.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-black"
        >
          <option value="All">All Actions</option>
          <option value="created">Created</option>
          <option value="updated">Updated</option>
          <option value="deleted">Deleted</option>
        </select>

        <input
          type="date"
          v-model="filters.date"
          class="px-3 py-1.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-black"
        />

        <button
          v-if="filters.action !== 'All' || filters.date || filters.search"
          @click="resetFilters"
          class="text-xs font-bold text-red-500 hover:underline"
        >
          Clear Filter
        </button>
      </div>

      <!-- Kanan: Search & Export -->
      <div class="flex flex-col items-center gap-3 w-full md:w-auto md:flex-row">
        <div class="relative w-full md:w-64">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search actor, module..."
            class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-1 focus:ring-black"
          />
          <svg
            class="top-2.5 left-3 absolute w-4 h-4 text-gray-400"
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
        </div>

        <!-- [BARU] Tombol Export -->
        <div class="flex gap-2 w-full md:w-auto">
          <button
            @click="exportToExcel"
            class="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-green-700 transition bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 w-full md:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="8" y1="13" x2="16" y2="13"></line>
              <line x1="8" y1="17" x2="16" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            Excel
          </button>
          <button
            @click="exportToPDF"
            class="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-red-700 transition bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 w-full md:w-auto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            PDF
          </button>
        </div>
      </div>
    </div>

    <!-- Data Table (Sama seperti sebelumnya) -->
    <div class="overflow-x-auto border border-gray-100 rounded-xl">
      <table class="w-full text-left border-collapse bg-white/50">
        <thead>
          <tr
            class="text-xs tracking-widest text-gray-400 uppercase bg-gray-50/50 border-b border-gray-100"
          >
            <th class="p-4 font-bold">Timestamp</th>
            <th class="p-4 font-bold">Actor</th>
            <th class="p-4 font-bold">Action</th>
            <th class="p-4 font-bold">Module</th>
            <th class="p-4 font-bold text-right">Details</th>
          </tr>
        </thead>

        <tbody v-if="isLoading">
          <tr
            v-for="i in itemsPerPage > 10 ? 10 : itemsPerPage"
            :key="i"
            class="border-b border-gray-50"
          >
            <td colspan="5" class="py-6">
              <div class="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else-if="paginatedLogs.length === 0">
          <tr>
            <td colspan="5" class="py-16 text-sm italic text-center text-gray-400">
              No audit logs found matching your criteria.
            </td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr
            v-for="log in paginatedLogs"
            :key="log.id"
            class="transition border-b border-gray-50 hover:bg-gray-50/80"
          >
            <td class="p-4 text-xs">{{ new Date(log.created_at).toLocaleString() }}</td>
            <td class="p-4 text-sm font-bold text-gray-800">
              {{
                log.user
                  ? `${log.user.first_name} ${log.user.last_name}`
                  : "System/Deleted User"
              }}
              <span class="block text-[10px] font-normal text-gray-400 mt-0.5"
                >{{ log.user?.usertype || "system" }} | IP: {{ log.ip_address }}</span
              >
            </td>
            <td class="p-4">
              <span
                :class="{
                  'bg-green-100 text-green-700': log.action === 'created',
                  'bg-blue-100 text-blue-700': log.action === 'updated',
                  'bg-red-100 text-red-700': log.action === 'deleted',
                }"
                class="px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-md"
              >
                {{ log.action }}
              </span>
            </td>
            <td class="p-4 text-sm font-bold">
              {{ log.model_type }}
              <span class="text-xs font-normal text-gray-400">#{{ log.model_id }}</span>
            </td>
            <td class="p-4 text-right">
              <button
                @click="viewDetails(log)"
                class="text-xs font-bold text-blue-600 hover:underline"
              >
                View Payload
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer (Sama seperti sebelumnya) -->
    <div
      v-if="!isLoading && totalItems > 0"
      class="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row"
    >
      <p class="text-sm text-gray-500">
        Showing <span class="font-bold text-gray-900">{{ showingStart }}</span> to
        <span class="font-bold text-gray-900">{{ showingEnd }}</span> of
        <span class="font-bold text-gray-900">{{ totalItems }}</span> entries
      </p>
      <div v-if="totalPages > 1" class="flex items-center gap-2">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <div class="hidden gap-1 sm:flex">
          <button
            v-for="(page, index) in visiblePages"
            :key="index"
            @click="typeof page === 'number' ? changePage(page) : null"
            :disabled="page === '...'"
            :class="[
              currentPage === page
                ? 'bg-black text-white border-black shadow-sm'
                : 'hover:bg-gray-50 border-gray-200 text-gray-600',
              page === '...'
                ? 'cursor-default border-transparent hover:bg-transparent'
                : 'border',
            ]"
            class="flex items-center justify-center w-8 h-8 text-xs font-bold transition rounded-lg"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="changePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

    <!-- Modal Detail Log (Sama seperti sebelumnya) -->
    <div
      v-if="selectedLog"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      @click="selectedLog = null"
    >
      <div
        class="w-full max-w-4xl p-6 bg-white rounded-2xl shadow-xl max-h-[85vh] flex flex-col"
        @click.stop
      >
        <div class="flex items-center justify-between mb-6 shrink-0">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Data Change Analysis</h3>
            <p class="mt-1 text-xs text-gray-500">
              Module:
              <span class="font-bold text-black"
                >{{ selectedLog.model_type }} #{{ selectedLog.model_id }}</span
              >
              | Action:
              <span class="font-bold tracking-wider text-black uppercase">{{
                selectedLog.action
              }}</span>
            </p>
          </div>
          <button
            @click="selectedLog = null"
            class="p-2 text-gray-400 transition-colors bg-gray-100 rounded-full hover:text-black hover:bg-gray-200"
          >
            ✕
          </button>
        </div>

        <div
          class="grid grid-cols-1 gap-6 pr-2 overflow-y-auto md:grid-cols-2 custom-scrollbar grow"
        >
          <div class="p-5 border border-red-100 bg-red-50/50 rounded-xl h-fit">
            <h4
              class="flex items-center gap-2 pb-3 mb-4 text-xs font-black tracking-widest text-red-800 uppercase border-b border-red-100"
            >
              Previous Data
            </h4>
            <div
              v-if="isEmpty(selectedLog.old_values)"
              class="py-4 text-sm italic text-center text-red-400"
            >
              No previous data recorded.
            </div>
            <ul v-else class="space-y-4">
              <li
                v-for="(value, key) in selectedLog.old_values"
                :key="key"
                class="flex flex-col"
              >
                <span
                  class="text-[10px] font-bold text-red-800/60 uppercase tracking-widest mb-1"
                  >{{ formatKey(key) }}</span
                >
                <span
                  class="text-sm font-medium leading-relaxed break-words text-red-950"
                  >{{ formatValue(value) }}</span
                >
              </li>
            </ul>
          </div>
          <div class="p-5 border border-green-100 bg-green-50/50 rounded-xl h-fit">
            <h4
              class="flex items-center gap-2 pb-3 mb-4 text-xs font-black tracking-widest text-green-800 uppercase border-b border-green-100"
            >
              Updated Data
            </h4>
            <div
              v-if="isEmpty(selectedLog.new_values)"
              class="py-4 text-sm italic text-center text-green-400"
            >
              No new data recorded.
            </div>
            <ul v-else class="space-y-4">
              <li
                v-for="(value, key) in selectedLog.new_values"
                :key="key"
                class="flex flex-col"
              >
                <span
                  class="text-[10px] font-bold text-green-800/60 uppercase tracking-widest mb-1"
                  >{{ formatKey(key) }}</span
                >
                <span
                  class="text-sm font-medium leading-relaxed break-words text-green-950"
                  >{{ formatValue(value) }}</span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

// [BARU] Import Library Export
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const logs = ref([]);
const isLoading = ref(true);
const selectedLog = ref(null);

const filters = ref({ search: "", action: "All", date: "" });
const currentPage = ref(1);
const itemsPerPage = ref(10);

const fetchLogs = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/audit-logs`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    logs.value = res.data.data || res.data;
    currentPage.value = 1;
  } catch (error) {
    console.error("Gagal mengambil audit log", error);
  } finally {
    isLoading.value = false;
  }
};

const resetFilters = () => {
  filters.value.search = "";
  filters.value.action = "All";
  filters.value.date = "";
};

const filteredLogs = computed(() => {
  let result = logs.value;
  if (filters.value.action !== "All")
    result = result.filter((log) => log.action === filters.value.action);
  if (filters.value.date) {
    result = result.filter((log) => {
      const logDate = new Date(log.created_at).toISOString().split("T")[0];
      return logDate === filters.value.date;
    });
  }
  if (filters.value.search) {
    const q = filters.value.search.toLowerCase();
    result = result.filter((log) => {
      const actorName = log.user
        ? `${log.user.first_name} ${log.user.last_name}`.toLowerCase()
        : "system/deleted user";
      const moduleType = log.model_type ? log.model_type.toLowerCase() : "";
      return actorName.includes(q) || moduleType.includes(q);
    });
  }
  return result;
});

const totalItems = computed(() => filteredLogs.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredLogs.value.slice(start, end);
});
const showingStart = computed(() =>
  totalItems.value === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1
);
const showingEnd = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, totalItems.value)
);

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "...", total];
  if (current >= total - 2) return [1, "...", total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
});

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) currentPage.value = page;
};
watch(
  [
    () => filters.value.action,
    () => filters.value.date,
    () => filters.value.search,
    itemsPerPage,
  ],
  () => {
    currentPage.value = 1;
  }
);

// ==========================================
// [BARU] FUNGSI EXPORT DATA
// ==========================================
const getExportData = () => {
  return filteredLogs.value.map((log) => ({
    "Date & Time": new Date(log.created_at).toLocaleString(),
    Actor: log.user ? `${log.user.first_name} ${log.user.last_name}` : "System",
    Role: log.user?.usertype || "system",
    "IP Address": log.ip_address,
    Action: log.action.toUpperCase(),
    Module: log.model_type,
    "Module ID": log.model_id,
  }));
};

const exportToExcel = () => {
  const data = getExportData();
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Audit Logs");
  XLSX.writeFile(
    workbook,
    `Solher_System_Audit_${new Date().toISOString().split("T")[0]}.xlsx`
  );
};

const exportToPDF = () => {
  const doc = new jsPDF();
  const data = getExportData();

  doc.setFontSize(16);
  doc.text("Solher - System Audit Trail", 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

  const columns = ["Date & Time", "Actor", "Role", "Action", "Module", "ID"];
  const rows = data.map((item) => [
    item["Date & Time"],
    item["Actor"],
    item["Role"],
    item["Action"],
    item["Module"],
    item["Module ID"],
  ]);

  doc.autoTable({
    startY: 28,
    head: [columns],
    body: rows,
    theme: "grid",
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 0, 0] }, // Black header
  });

  doc.save(`Solher_System_Audit_${new Date().toISOString().split("T")[0]}.pdf`);
};
// ==========================================

const viewDetails = (log) => {
  selectedLog.value = log;
};
const isEmpty = (obj) => !obj || Object.keys(obj).length === 0;
const formatKey = (key) => {
  if (!key) return "";
  return key
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
const formatValue = (val) => {
  if (val === null || val === undefined || val === "") return "-";
  if (typeof val === "boolean") return val ? "Yes" : "No";
  if (typeof val === "object") return JSON.stringify(val);
  return val;
};

onMounted(() => {
  fetchLogs();
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
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style>
