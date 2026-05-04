<!-- <template>
  <div class="space-y-8 animate-fade-in">
    
    <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
       <div class="flex flex-wrap items-end gap-4">
        <div class="w-full sm:w-auto">
          <label class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">Year</label>
          <select v-model="filters.year" class="w-full px-4 py-2 font-bold border outline-none bg-gray-50 rounded-xl sm:w-32 focus:ring-2 focus:ring-black">
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
        <div class="w-full sm:w-auto">
          <label class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">Month</label>
          <select v-model="filters.month" class="w-full px-4 py-2 border outline-none bg-gray-50 rounded-xl sm:w-40 focus:ring-2 focus:ring-black">
            <option value="">All Months</option>
            <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
          </select>
        </div>
        <div class="flex-grow w-full sm:w-auto">
          <label class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase">Search Product</label>
          <div class="relative">
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Search by product name or code..." 
              class="w-full py-2 pl-10 pr-4 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
            />
            <svg class="top-2.5 left-3 absolute w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <button @click="fetchReport" class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-bold text-white transition h-[42px]">
          Apply Filter
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div class="p-6 border border-blue-100 bg-blue-50 rounded-2xl">
        <p class="text-xs font-bold text-blue-600 uppercase">Total Revenue</p>
        <p class="text-2xl font-black">{{ formatPrice(grandTotalRevenue) }}</p>
      </div>
      <div class="p-6 border border-green-100 bg-green-50 rounded-2xl">
        <p class="text-xs font-bold text-green-600 uppercase">Total Units Sold</p>
        <p class="text-2xl font-black">{{ totalUnitsSold }} pcs</p>
      </div>
      <div class="p-6 border border-purple-100 bg-purple-50 rounded-2xl">
        <p class="text-xs font-bold text-purple-600 uppercase">Best Seller</p>
        <p class="text-lg font-black truncate">{{ bestSellerName }}</p>
      </div>
    </div>

    <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]">
      
      <div v-if="isLoading" class="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
        <div class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
      </div>

      <div class="flex items-center justify-between mb-6">
        <h2 class="text-xl font-bold text-gray-800">Product Performance</h2>
        <div class="flex items-center gap-2">
          <span class="text-xs text-gray-500 uppercase">Show:</span>
          <select v-model="itemsPerPage" @change="fetchReport" class="px-2 py-1 text-sm border rounded-lg bg-gray-50">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead>
            <tr class="text-xs tracking-widest text-gray-400 uppercase border-b">
              <th class="pb-4">Product Info</th>
              <th class="pb-4">Category</th>
              <th class="pb-4 text-right">Units Sold</th>
              <th class="pb-4 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody class="text-gray-600">
            <tr v-for="(item, index) in reportData" :key="index" class="transition border-b hover:bg-gray-50 border-gray-50">
              <td class="py-4">
                <div class="flex items-center gap-4">
                  <img 
                    :src="item.image" 
                    alt="Product" 
                    class="object-cover w-12 h-12 bg-gray-100 rounded-lg shadow-sm"
                  />
                  <div>
                    <p class="font-bold text-gray-900">{{ item.name }}</p>
                    <p class="font-mono text-xs text-gray-400">{{ item.code }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 text-sm">{{ item.category_name }}</td>
              <td class="py-4 font-medium text-right text-gray-900">{{ item.total_sold }}</td>
              <td class="py-4 font-bold text-right text-green-600">{{ formatPrice(item.total_revenue) }}</td>
            </tr>
            <tr v-if="!isLoading && reportData.length === 0">
              <td colspan="4" class="py-12 italic text-center text-gray-400">No sales data found for this period.</td>
            </tr>
          </tbody>
          
          <tfoot v-if="reportData.length > 0 && !isLoading">
            <tr class="font-bold text-gray-800 border-t-2 border-gray-100 bg-gray-50/50">
              <td colspan="2" class="py-4 pl-4 text-xs tracking-widest text-right text-gray-500 uppercase">
                Total (This Page)
              </td>
              <td class="py-4 text-right">
                {{ totalUnitsSold }}
              </td>
              <td class="py-4 text-right text-green-700">
                {{ formatPrice(grandTotalRevenue) }}
              </td>
            </tr>
          </tfoot>

        </table>
      </div>

      <div v-if="lastPage > 1" class="flex items-center justify-between pt-4 mt-6 border-t">
        <span class="text-xs text-gray-400">Page {{ currentPage }} of {{ lastPage }}</span>
        <div class="flex gap-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-3 py-1 text-xs border rounded-lg hover:bg-gray-100 disabled:opacity-50">Prev</button>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === lastPage" class="px-3 py-1 text-xs border rounded-lg hover:bg-gray-100 disabled:opacity-50">Next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Script tetap sama dengan sebelumnya
import { ref, onMounted, computed, watch } from 'vue';
import axios from 'axios';
import { BASE_URL } from "../../config/api.js";

const reportData = ref([]);
const isLoading = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);
const itemsPerPage = ref(10);

const grandTotalRevenue = ref(0);
const totalUnitsSold = ref(0);
const bestSellerName = ref("-");

const currentYear = new Date().getFullYear();
const years = Array.from({length: 5}, (_, i) => currentYear - i);
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const filters = ref({
  year: currentYear,
  month: new Date().getMonth() + 1,
  search: ''
});

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchReport = async (page = 1) => {
  isLoading.value = true;
  try {
    const params = {
      month: filters.value.month,
      year: filters.value.year,
      search: filters.value.search,
      per_page: itemsPerPage.value,
      page: page
    };

    const res = await axios.get(`${BASE_URL}/admin/sales-report`, { ...axiosConfig, params });
    
    reportData.value = res.data.data;
    currentPage.value = res.data.current_page;
    lastPage.value = res.data.last_page;

    calculateLocalSummary(res.data.data);

  } catch (error) {
    console.error("Fetch report failed", error);
  } finally {
    setTimeout(() => isLoading.value = false, 500);
  }
};

const calculateLocalSummary = (data) => {
  if (data.length > 0) {
    grandTotalRevenue.value = data.reduce((acc, item) => acc + parseFloat(item.total_revenue), 0);
    totalUnitsSold.value = data.reduce((acc, item) => acc + parseInt(item.total_sold), 0);
    bestSellerName.value = data[0].name; 
  } else {
    grandTotalRevenue.value = 0;
    totalUnitsSold.value = 0;
    bestSellerName.value = "-";
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= lastPage.value) {
    fetchReport(page);
  }
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

let timeout = null;
watch(() => filters.value.search, () => {
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    currentPage.value = 1; 
    fetchReport();
  }, 600);
});

onMounted(fetchReport);
</script> -->

<!-- Update sales report -->
<!-- <template>
  <div class="space-y-8 animate-fade-in">
    <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <div class="flex flex-wrap items-end gap-4">
        <div class="w-full sm:w-auto">
          <label
            class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase"
            >Year</label
          >
          <select
            v-model="filters.year"
            class="w-full px-4 py-2 font-bold border outline-none bg-gray-50 rounded-xl sm:w-32 focus:ring-2 focus:ring-black"
          >
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
        <div class="w-full sm:w-auto">
          <label
            class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase"
            >Month</label
          >
          <select
            v-model="filters.month"
            class="w-full px-4 py-2 border outline-none bg-gray-50 rounded-xl sm:w-40 focus:ring-2 focus:ring-black"
          >
            <option value="">All Months</option>
            <option v-for="(m, i) in months" :key="i" :value="i + 1">
              {{ m }}
            </option>
          </select>
        </div>
        <div class="flex-grow w-full sm:w-auto">
          <label
            class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase"
            >Search Product</label
          >
          <div class="relative">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by product name or code..."
              class="w-full py-2 pl-10 pr-4 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
            />
            <svg
              class="top-2.5 left-3 absolute w-5 h-5 text-gray-400"
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
        <button
          @click="fetchReport(1)"
          class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-bold text-white transition h-[42px]"
        >
          Apply Filter
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div class="p-6 border border-blue-100 bg-blue-50 rounded-2xl">
        <p class="text-xs font-bold text-blue-600 uppercase">Total Revenue</p>
        <p class="text-2xl font-black">{{ formatPrice(grandTotalRevenue) }}</p>
      </div>
      <div class="p-6 border border-green-100 bg-green-50 rounded-2xl">
        <p class="text-xs font-bold text-green-600 uppercase">
          Total Units Sold
        </p>
        <p class="text-2xl font-black">{{ totalUnitsSold }} pcs</p>
      </div>
      <div class="p-6 border border-purple-100 bg-purple-50 rounded-2xl">
        <p class="text-xs font-bold text-purple-600 uppercase">Best Seller</p>
        <p class="text-lg font-black truncate">{{ bestSellerName }}</p>
      </div>
    </div>

    <div
      class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]"
    >
      <div
        v-if="isInitialLoading"
        class="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl"
      >
        <div
          class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
      </div>

      <div
        class="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center"
      >
        <h2 class="text-xl font-bold text-gray-800">Product Performance</h2>

        <div class="flex items-center gap-4">
          <div class="flex gap-2">
            <button
              @click="exportToPDF"
              :disabled="reportData.length === 0"
              class="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              PDF
            </button>
            <button
              @click="exportToExcel"
              :disabled="reportData.length === 0"
              class="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-green-600 uppercase transition bg-green-50 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Excel
            </button>
          </div>

          <div class="hidden w-px h-6 bg-gray-200 md:block"></div>

          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500 uppercase">Show:</span>
            <select
              v-model="itemsPerPage"
              @change="fetchReport(1)"
              class="px-2 py-1 text-sm border rounded-lg outline-none bg-gray-50"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto" id="exportable-table">
        <div class="hidden mb-4 export-header">
          <h2 class="text-2xl font-bold text-black">Sales Report</h2>
          <p class="text-sm text-gray-500">
            Period:
            {{ filters.month ? months[filters.month - 1] : "All Months" }}
            {{ filters.year }}
          </p>
        </div>

        <table class="w-full text-left bg-white">
          <thead>
            <tr
              class="text-xs tracking-widest text-gray-400 uppercase border-b"
            >
              <th class="pb-4">Product Info</th>
              <th class="pb-4">Category</th>
              <th class="pb-4 text-right">Units Sold</th>
              <th class="pb-4 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody
            class="text-gray-600 transition-opacity duration-300"
            :class="{ 'opacity-30 pointer-events-none': isLoading }"
          >
            <tr
              v-for="(item, index) in reportData"
              :key="index"
              class="transition border-b hover:bg-gray-50 border-gray-50"
            >
              <td class="py-4">
                <div class="flex items-center gap-4">
                  <img
                    :src="`${item.image}?t=${new Date().getTime()}`"
                    alt="Product"
                    class="object-cover w-12 h-12 bg-gray-100 rounded-lg shadow-sm"
                    crossorigin="anonymous"
                  />
                  <div>
                    <p class="font-bold text-gray-900">{{ item.name }}</p>
                    <p class="font-mono text-xs text-gray-400">
                      {{ item.code }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="py-4 text-sm">{{ item.category_name }}</td>
              <td class="py-4 font-medium text-right text-gray-900">
                {{ item.total_sold }}
              </td>
              <td class="py-4 font-bold text-right text-green-600">
                {{ formatPrice(item.total_revenue) }}
              </td>
            </tr>
            <tr v-if="!isLoading && reportData.length === 0">
              <td colspan="4" class="py-12 italic text-center text-gray-400">
                No sales data found for this period.
              </td>
            </tr>
          </tbody>

          <tfoot v-if="reportData.length > 0 && !isLoading">
            <tr
              class="font-bold text-gray-800 border-t-2 border-gray-100 bg-gray-50/50"
            >
              <td
                colspan="2"
                class="py-4 pl-4 text-xs tracking-widest text-right text-gray-500 uppercase"
              >
                Total (This Page)
              </td>
              <td class="py-4 text-right">
                {{ totalUnitsSold }}
              </td>
              <td class="py-4 text-right text-green-700">
                {{ formatPrice(grandTotalRevenue) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div
        v-if="lastPage > 0 || reportData.length > 0"
        class="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t md:flex-row"
      >
        <p class="text-sm text-gray-400">
          Showing
          <span class="font-bold text-gray-800">{{ showingStart }}</span> to
          <span class="font-bold text-gray-800">{{ showingEnd }}</span> of
          <span class="font-bold text-gray-800">{{ totalItems }}</span> products
        </p>

        <div class="flex gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <div class="flex gap-1">
            <button
              v-for="(page, index) in visiblePages"
              :key="index"
              @click="typeof page === 'number' ? changePage(page) : null"
              :disabled="page === '...'"
              :class="[
                currentPage === page
                  ? 'bg-black text-white border-black'
                  : 'hover:bg-gray-50 border-gray-200',
                page === '...'
                  ? 'cursor-default border-transparent hover:bg-transparent'
                  : 'border',
              ]"
              class="flex items-center justify-center w-10 h-10 text-sm font-medium transition rounded-xl"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === lastPage || lastPage === 0"
            class="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// 1. IMPORT VUE STANDAR (Bersih, tanpa alias atau react)
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

// 2. IMPORT LIBRARY EXPORT
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";

const reportData = ref([]);
const isLoading = ref(false);
const isInitialLoading = ref(true);
const currentPage = ref(1);
const lastPage = ref(1);
const totalItems = ref(0);
const itemsPerPage = ref(10);

const grandTotalRevenue = ref(0);
const totalUnitsSold = ref(0);
const bestSellerName = ref("-");

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const filters = ref({
  year: currentYear,
  month: new Date().getMonth() + 1,
  search: "",
});

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const showingStart = computed(() => {
  if (totalItems.value === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, totalItems.value);
});

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = lastPage.value;
  const maxVisible = 7;

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }

  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
});

const fetchReport = async (page = 1) => {
  isLoading.value = true;
  try {
    const params = {
      month: filters.value.month,
      year: filters.value.year,
      search: filters.value.search,
      per_page: itemsPerPage.value,
      page: page,
    };

    const res = await axios.get(`${BASE_URL}/admin/sales-report`, {
      ...axiosConfig,
      params,
    });

    reportData.value = res.data.data;
    currentPage.value = res.data.current_page;
    lastPage.value = res.data.last_page;

    // [PERBAIKAN] Tangkap total data dari API (Penyebab 0 to 0 of 0)
    totalItems.value = res.data.total;

    calculateLocalSummary(res.data.data);
  } catch (error) {
    console.error("Fetch report failed", error);
  } finally {
    isLoading.value = false;
    isInitialLoading.value = false;
  }
};

const calculateLocalSummary = (data) => {
  if (data.length > 0) {
    grandTotalRevenue.value = data.reduce(
      (acc, item) => acc + parseFloat(item.total_revenue),
      0,
    );
    totalUnitsSold.value = data.reduce(
      (acc, item) => acc + parseInt(item.total_sold),
      0,
    );
    bestSellerName.value = data[0].name;
  } else {
    grandTotalRevenue.value = 0;
    totalUnitsSold.value = 0;
    bestSellerName.value = "-";
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= lastPage.value) {
    fetchReport(page);
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

let timeout = null;
watch(
  () => filters.value.search,
  () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      currentPage.value = 1;
      fetchReport();
    }, 600);
  },
);

// --- FUNGSI EXPORT PDF ---
const exportToPDF = () => {
  const element = document.getElementById("exportable-table");

  const headers = element.querySelectorAll(".export-header");
  headers.forEach((h) => h.classList.remove("hidden"));
  headers.forEach((h) => h.classList.add("block"));

  const monthName = filters.value.month
    ? months[filters.value.month - 1]
    : "All";
  const fileName = `Sales_Report_${filters.value.year}_${monthName}.pdf`;

  const opt = {
    margin: 0.5,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      headers.forEach((h) => h.classList.add("hidden"));
      headers.forEach((h) => h.classList.remove("block"));
    });
};

// --- FUNGSI EXPORT EXCEL ---
const exportToExcel = () => {
  const excelData = reportData.value.map((item, index) => ({
    No: index + 1,
    "Product Code": item.code,
    "Product Name": item.name,
    Category: item.category_name,
    "Units Sold": parseInt(item.total_sold),
    "Total Revenue (IDR)": parseFloat(item.total_revenue),
  }));

  excelData.push({
    No: "",
    "Product Code": "",
    "Product Name": "",
    Category: "GRAND TOTAL",
    "Units Sold": totalUnitsSold.value,
    "Total Revenue (IDR)": grandTotalRevenue.value,
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

  const monthName = filters.value.month
    ? months[filters.value.month - 1]
    : "All";
  const fileName = `Sales_Report_${filters.value.year}_${monthName}.xlsx`;

  XLSX.writeFile(workbook, fileName);
};

onMounted(fetchReport);
</script>

<style scoped>
/* Pastikan styling untuk export header tertangani jika diperlukan */
@media print {
  .export-header {
    display: block !important;
  }
}
</style> -->

<!-- Updated Pagination & Data Load -->
<!-- <template>
  <div class="space-y-8 animate-fade-in">
    <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <div class="flex flex-wrap items-end gap-4">
        <div class="w-full sm:w-auto">
          <label
            class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase"
            >Year</label
          >
          <select
            v-model="filters.year"
            class="w-full px-4 py-2 font-bold border outline-none bg-gray-50 rounded-xl sm:w-32 focus:ring-2 focus:ring-black"
          >
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
        <div class="w-full sm:w-auto">
          <label
            class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase"
            >Month</label
          >
          <select
            v-model="filters.month"
            class="w-full px-4 py-2 border outline-none bg-gray-50 rounded-xl sm:w-40 focus:ring-2 focus:ring-black"
          >
            <option value="">All Months</option>
            <option v-for="(m, i) in months" :key="i" :value="i + 1">
              {{ m }}
            </option>
          </select>
        </div>
        <div class="flex-grow w-full sm:w-auto">
          <label
            class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase"
            >Search Product</label
          >
          <div class="relative">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by product name or code..."
              class="w-full py-2 pl-10 pr-4 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
            />
            <svg
              class="top-2.5 left-3 absolute w-5 h-5 text-gray-400"
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
        <button
          @click="fetchReport"
          class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-bold text-white transition h-[42px]"
        >
          Apply Filter
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div class="p-6 border border-blue-100 bg-blue-50 rounded-2xl">
        <p class="text-xs font-bold text-blue-600 uppercase">Total Revenue</p>
        <p class="text-2xl font-black">{{ formatPrice(grandTotalRevenue) }}</p>
      </div>
      <div class="p-6 border border-green-100 bg-green-50 rounded-2xl">
        <p class="text-xs font-bold text-green-600 uppercase">
          Total Units Sold
        </p>
        <p class="text-2xl font-black">{{ totalUnitsSold }} pcs</p>
      </div>
      <div class="p-6 border border-purple-100 bg-purple-50 rounded-2xl">
        <p class="text-xs font-bold text-purple-600 uppercase">Best Seller</p>
        <p class="text-lg font-black truncate">{{ bestSellerName }}</p>
      </div>
    </div>

    <div
      class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]"
    >
      <div
        v-if="isInitialLoading"
        class="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl"
      >
        <div
          class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
      </div>

      <div
        class="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center"
      >
        <h2 class="text-xl font-bold text-gray-800">Product Performance</h2>

        <div class="flex items-center gap-4">
          <div class="flex gap-2">
            <button
              @click="exportToPDF"
              :disabled="allReportData.length === 0"
              class="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              PDF
            </button>
            <button
              @click="exportToExcel"
              :disabled="allReportData.length === 0"
              class="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-green-600 uppercase transition bg-green-50 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Excel
            </button>
          </div>

          <div class="hidden w-px h-6 bg-gray-200 md:block"></div>

          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500 uppercase">Show:</span>
            <select
              v-model="itemsPerPage"
              class="px-2 py-1 text-sm border rounded-lg outline-none bg-gray-50"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto" id="exportable-table">
        <div class="hidden mb-4 export-header">
          <h2 class="text-2xl font-bold text-black">Sales Report</h2>
          <p class="text-sm text-gray-500">
            Period:
            {{ filters.month ? months[filters.month - 1] : "All Months" }}
            {{ filters.year }}
          </p>
        </div>

        <table class="w-full text-left bg-white">
          <thead>
            <tr
              class="text-xs tracking-widest text-gray-400 uppercase border-b"
            >
              <th class="pb-4">Product Info</th>
              <th class="pb-4">Category</th>
              <th class="pb-4 text-right">Units Sold</th>
              <th class="pb-4 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody
            class="text-gray-600 transition-opacity duration-300"
            :class="{ 'opacity-30 pointer-events-none': isLoading }"
          >
            <tr
              v-for="(item, index) in paginatedData"
              :key="index"
              class="transition border-b hover:bg-gray-50 border-gray-50"
            >
              <td class="py-4">
                <div class="flex items-center gap-4">
                  <img
                    :src="`${item.image}?t=${new Date().getTime()}`"
                    alt="Product"
                    class="object-cover w-12 h-12 bg-gray-100 rounded-lg shadow-sm"
                    crossorigin="anonymous"
                  />
                  <div>
                    <p class="font-bold text-gray-900">{{ item.name }}</p>
                    <p class="font-mono text-xs text-gray-400">
                      {{ item.code }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="py-4 text-sm">{{ item.category_name }}</td>
              <td class="py-4 font-medium text-right text-gray-900">
                {{ item.total_sold }}
              </td>
              <td class="py-4 font-bold text-right text-green-600">
                {{ formatPrice(item.total_revenue) }}
              </td>
            </tr>
            <tr v-if="!isLoading && allReportData.length === 0">
              <td colspan="4" class="py-12 italic text-center text-gray-400">
                No sales data found for this period.
              </td>
            </tr>
          </tbody>

          <tfoot v-if="allReportData.length > 0 && !isLoading">
            <tr
              class="font-bold text-gray-800 border-t-2 border-gray-100 bg-gray-50/50"
            >
              <td
                colspan="2"
                class="py-4 pl-4 text-xs tracking-widest text-right text-gray-500 uppercase"
              >
                Grand Total (All Pages)
              </td>
              <td class="py-4 text-right">{{ totalUnitsSold }}</td>
              <td class="py-4 text-right text-green-700">
                {{ formatPrice(grandTotalRevenue) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div
        v-if="totalPages > 0 || allReportData.length > 0"
        class="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t md:flex-row"
      >
        <p class="text-sm text-gray-400">
          Showing
          <span class="font-bold text-gray-800">{{ showingStart }}</span> to
          <span class="font-bold text-gray-800">{{ showingEnd }}</span> of
          <span class="font-bold text-gray-800">{{ totalItems }}</span> products
        </p>

        <div v-if="totalPages > 1" class="flex gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <div class="flex gap-1">
            <button
              v-for="(page, index) in visiblePages"
              :key="index"
              @click="typeof page === 'number' ? changePage(page) : null"
              :disabled="page === '...'"
              :class="[
                currentPage === page
                  ? 'bg-black text-white border-black'
                  : 'hover:bg-gray-50 border-gray-200',
                page === '...'
                  ? 'cursor-default border-transparent hover:bg-transparent'
                  : 'border',
              ]"
              class="flex items-center justify-center w-10 h-10 text-sm font-medium transition rounded-xl"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";

// DATA & STATES
const allReportData = ref([]);
const isLoading = ref(false);
const isInitialLoading = ref(true);

const currentPage = ref(1);
const itemsPerPage = ref(10);

const grandTotalRevenue = ref(0);
const totalUnitsSold = ref(0);
const bestSellerName = ref("-");

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const filters = ref({
  year: currentYear,
  month: new Date().getMonth() + 1,
  search: "",
});

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// ==========================================
// CLIENT-SIDE PAGINATION LOGIC
// ==========================================

const totalItems = computed(() => allReportData.value.length);
const totalPages = computed(() =>
  Math.ceil(totalItems.value / itemsPerPage.value),
);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allReportData.value.slice(start, end);
});

const showingStart = computed(() => {
  if (totalItems.value === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, totalItems.value);
});

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const maxVisible = 7;

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }

  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
});

// ==========================================
// DATA FETCHING & CALCULATIONS
// ==========================================

const fetchReport = async () => {
  isLoading.value = true;
  try {
    const params = {
      month: filters.value.month,
      year: filters.value.year,
      search: filters.value.search,
    };

    const res = await axios.get(`${BASE_URL}/admin/sales-report`, {
      ...axiosConfig,
      params,
    });

    allReportData.value = res.data.data;
    currentPage.value = 1;

    calculateGlobalSummary(res.data.data);
  } catch (error) {
    console.error("Fetch report failed", error);
  } finally {
    // Menghilangkan delay setTimeout agar instan
    isLoading.value = false;
    isInitialLoading.value = false;
  }
};

const calculateGlobalSummary = (data) => {
  if (data.length > 0) {
    grandTotalRevenue.value = data.reduce(
      (acc, item) => acc + parseFloat(item.total_revenue),
      0,
    );
    totalUnitsSold.value = data.reduce(
      (acc, item) => acc + parseInt(item.total_sold),
      0,
    );
    bestSellerName.value = data[0].name;
  } else {
    grandTotalRevenue.value = 0;
    totalUnitsSold.value = 0;
    bestSellerName.value = "-";
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

// Watcher untuk Fitur Pencarian (Debounce)
let timeout = null;
watch(
  () => filters.value.search,
  () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetchReport();
    }, 600);
  },
);

// Jika Limit Show Item diubah, reset ke halaman 1 tanpa reload API
watch(itemsPerPage, () => {
  currentPage.value = 1;
});

// ==========================================
// EXPORT FUNCTIONS (Menggunakan allReportData)
// ==========================================

const exportToPDF = () => {
  const element = document.getElementById("exportable-table");
  const headers = element.querySelectorAll(".export-header");
  headers.forEach((h) => {
    h.classList.remove("hidden");
    h.classList.add("block");
  });

  const monthName = filters.value.month
    ? months[filters.value.month - 1]
    : "All";
  const fileName = `Sales_Report_${filters.value.year}_${monthName}.pdf`;

  const opt = {
    margin: 0.5,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      headers.forEach((h) => {
        h.classList.add("hidden");
        h.classList.remove("block");
      });
    });
};

const exportToExcel = () => {
  const excelData = allReportData.value.map((item, index) => ({
    No: index + 1,
    "Product Code": item.code,
    "Product Name": item.name,
    Category: item.category_name,
    "Units Sold": parseInt(item.total_sold),
    "Total Revenue (IDR)": parseFloat(item.total_revenue),
  }));

  excelData.push({
    No: "",
    "Product Code": "",
    "Product Name": "",
    Category: "GRAND TOTAL",
    "Units Sold": totalUnitsSold.value,
    "Total Revenue (IDR)": grandTotalRevenue.value,
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

  const monthName = filters.value.month
    ? months[filters.value.month - 1]
    : "All";
  const fileName = `Sales_Report_${filters.value.year}_${monthName}.xlsx`;

  XLSX.writeFile(workbook, fileName);
};

onMounted(fetchReport);
</script>

<style scoped>
@media print {
  .export-header {
    display: block !important;
  }
}
</style> -->

<template>
  <div class="pb-10 space-y-8 animate-fade-in">
    <Breadcrumb />
    <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <div class="flex flex-wrap items-end gap-4">
        <div class="w-full sm:w-auto">
          <label
            class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase"
          >
            Year
          </label>
          <select
            v-model="filters.year"
            class="w-full px-4 py-2 font-bold transition border border-gray-200 outline-none bg-gray-50 rounded-xl sm:w-32 focus:ring-2 focus:ring-black"
          >
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
        <div class="w-full sm:w-auto">
          <label
            class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase"
          >
            Month
          </label>
          <select
            v-model="filters.month"
            class="w-full px-4 py-2 transition border border-gray-200 outline-none bg-gray-50 rounded-xl sm:w-40 focus:ring-2 focus:ring-black"
          >
            <option value="">All Months</option>
            <option v-for="(m, i) in months" :key="i" :value="i + 1">
              {{ m }}
            </option>
          </select>
        </div>
        <div class="flex-grow w-full sm:w-auto">
          <label
            class="block mb-1 text-xs font-bold tracking-wide text-gray-500 uppercase"
          >
            Search Product
          </label>
          <div class="relative">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by product name or code..."
              class="w-full py-2 pl-10 pr-4 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
            />
            <svg
              class="top-2.5 left-3 absolute w-5 h-5 text-gray-400"
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
        <button
          @click="fetchReport"
          class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-bold text-white transition h-[42px] shadow-sm"
        >
          Apply Filter
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div
        class="relative p-6 overflow-hidden border border-blue-100 bg-blue-50 rounded-2xl"
      >
        <p class="mb-1 text-xs font-bold tracking-widest text-blue-600 uppercase">
          Total Revenue
        </p>
        <p v-if="!isLoading" class="text-3xl font-black text-blue-900">
          {{ formatPrice(grandTotalRevenue) }}
        </p>
        <div v-else class="w-3/4 h-8 mt-1 bg-blue-200 rounded animate-pulse"></div>
      </div>
      <div
        class="relative p-6 overflow-hidden border border-green-100 bg-green-50 rounded-2xl"
      >
        <p class="mb-1 text-xs font-bold tracking-widest text-green-600 uppercase">
          Total Units Sold
        </p>
        <p v-if="!isLoading" class="text-3xl font-black text-green-900">
          {{ totalUnitsSold }} pcs
        </p>
        <div v-else class="w-1/2 h-8 mt-1 bg-green-200 rounded animate-pulse"></div>
      </div>
      <div
        class="relative p-6 overflow-hidden border border-purple-100 bg-purple-50 rounded-2xl"
      >
        <p class="mb-1 text-xs font-bold tracking-widest text-purple-600 uppercase">
          Top Best Seller
        </p>
        <p v-if="!isLoading" class="text-xl font-black text-purple-900 truncate">
          {{ bestSellerName }}
        </p>
        <div v-else class="w-3/4 h-6 mt-2 bg-purple-200 rounded animate-pulse"></div>
      </div>
    </div>

    <div
      class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]"
    >
      <div
        class="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center"
      >
        <h2 class="text-xl font-bold text-gray-800">Product Performance</h2>

        <div class="flex items-center gap-4">
          <div class="flex gap-2">
            <button
              @click="exportToPDF"
              :disabled="allReportData.length === 0 || isLoading"
              class="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-red-600 uppercase transition bg-red-50 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              PDF
            </button>
            <button
              @click="exportToExcel"
              :disabled="allReportData.length === 0 || isLoading"
              class="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest text-green-600 uppercase transition bg-green-50 hover:bg-green-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
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
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Excel
            </button>
          </div>

          <div class="hidden w-px h-6 bg-gray-200 md:block"></div>

          <div class="flex items-center gap-2">
            <span class="text-xs text-gray-500 uppercase">Show:</span>
            <select
              v-model="itemsPerPage"
              class="px-2 py-1 text-sm border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50"
            >
              <option :value="5">5</option>
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto" id="exportable-table">
        <div class="hidden mb-4 export-header">
          <h2 class="text-2xl font-bold text-black">Sales Report</h2>
          <p class="text-sm text-gray-500">
            Period:
            {{ filters.month ? months[filters.month - 1] : "All Months" }}
            {{ filters.year }}
          </p>
        </div>

        <table class="w-full text-left bg-white border-collapse">
          <thead>
            <tr
              class="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-100"
            >
              <th class="pb-4 pl-2 font-medium">Product Info</th>
              <th class="pb-4 font-medium">Category</th>
              <th class="pb-4 font-medium text-right">Units Sold</th>
              <th class="pb-4 pr-2 font-medium text-right">Revenue</th>
            </tr>
          </thead>

          <tbody v-if="isLoading">
            <tr
              v-for="i in itemsPerPage > 10 ? 10 : itemsPerPage"
              :key="`skel-${i}`"
              class="border-b border-gray-50"
            >
              <td class="py-4 pl-2">
                <div class="flex items-center gap-4">
                  <div
                    class="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0"
                  ></div>
                  <div class="space-y-2">
                    <div class="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div class="w-20 h-3 bg-gray-100 rounded animate-pulse"></div>
                  </div>
                </div>
              </td>
              <td class="py-4">
                <div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td class="py-4">
                <div class="w-12 h-4 ml-auto bg-gray-200 rounded animate-pulse"></div>
              </td>
              <td class="py-4 pr-2">
                <div class="w-24 h-4 ml-auto bg-gray-200 rounded animate-pulse"></div>
              </td>
            </tr>
          </tbody>

          <tbody v-else class="text-gray-600">
            <tr
              v-for="(item, index) in paginatedData"
              :key="index"
              class="transition border-b hover:bg-gray-50 border-gray-50"
            >
              <!-- <td class="py-4 pl-2">
                <div class="flex items-center gap-4">
                  <img
                    :src="item.image"
                    alt="Product"
                    class="object-cover w-12 h-12 bg-gray-100 border border-gray-100 rounded-lg shadow-sm"
                  />
                  <div>
                    <p class="font-bold text-gray-900">{{ item.name }}</p>
                    <p class="font-mono text-gray-400 text-xs mt-0.5">{{ item.code }}</p>
                  </div>
                </div>
              </td> -->
              <td class="py-4 pl-2">
                <div class="flex items-center gap-4">
                  <img
                    v-if="item.image"
                    :src="getImgUrl(item.image)"
                    @error="item.image = null"
                    alt="Product"
                    class="object-cover w-12 h-12 bg-gray-100 border border-gray-100 rounded-lg shadow-sm"
                  />
                  <div
                    v-else
                    class="flex items-center justify-center w-12 h-12 bg-gray-100 border border-gray-200 rounded-lg shadow-sm shrink-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 text-gray-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>

                  <div>
                    <p class="font-bold text-gray-900">{{ item.name }}</p>
                    <p class="font-mono text-gray-400 text-xs mt-0.5">
                      {{ item.code }}
                    </p>
                  </div>
                </div>
              </td>
              <td class="py-4 text-sm">{{ item.category_name }}</td>
              <td class="py-4 font-medium text-right text-gray-900">
                {{ item.total_sold }}
              </td>
              <td class="py-4 pr-2 font-bold text-right text-green-600">
                {{ formatPrice(item.total_revenue) }}
              </td>
            </tr>
            <tr v-if="allReportData.length === 0">
              <td colspan="4" class="py-16 text-sm italic text-center text-gray-400">
                No sales data found for this period.
              </td>
            </tr>
          </tbody>

          <tfoot v-if="allReportData.length > 0 && !isLoading">
            <tr class="font-bold text-gray-800 border-t-2 border-gray-100 bg-gray-50/50">
              <td
                colspan="2"
                class="py-4 pl-4 text-xs tracking-widest text-right text-gray-500 uppercase"
              >
                Grand Total (All Pages)
              </td>
              <td class="py-4 text-lg text-right">{{ totalUnitsSold }}</td>
              <td class="py-4 pr-2 text-xl text-right text-green-700">
                {{ formatPrice(grandTotalRevenue) }}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div
        v-if="!isLoading && (totalPages > 0 || allReportData.length > 0)"
        class="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row"
      >
        <p class="text-sm text-gray-400">
          Showing
          <span class="font-bold text-gray-800">{{ showingStart }}</span> to
          <span class="font-bold text-gray-800">{{ showingEnd }}</span> of
          <span class="font-bold text-gray-800">{{ totalItems }}</span> products
        </p>

        <div v-if="totalPages > 1" class="flex gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          <div class="flex hidden gap-1 sm:flex">
            <button
              v-for="(page, index) in visiblePages"
              :key="index"
              @click="typeof page === 'number' ? changePage(page) : null"
              :disabled="page === '...'"
              :class="[
                currentPage === page
                  ? 'bg-black text-white border-black'
                  : 'hover:bg-gray-50 border-gray-200',
                page === '...'
                  ? 'cursor-default border-transparent hover:bg-transparent'
                  : 'border',
              ]"
              class="flex items-center justify-center w-10 h-10 text-sm font-medium transition rounded-xl"
            >
              {{ page }}
            </button>
          </div>

          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const allReportData = ref([]);
const isLoading = ref(true); // Mulai dengan True agar skeleton muncul di awal

const currentPage = ref(1);
const itemsPerPage = ref(10);

const grandTotalRevenue = ref(0);
const totalUnitsSold = ref(0);
const bestSellerName = ref("-");

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const filters = ref({
  year: currentYear,
  month: new Date().getMonth() + 1,
  search: "",
});

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// ==========================================
// [BARU] FUNGSI FORMAT URL GAMBAR
// ==========================================
const getImgUrl = (path) => {
  if (!path) return "";
  // Jika sudah URL lengkap (termasuk dari Clever Cloud), pakai langsung
  if (path.startsWith("http")) return path;

  // Jika path relatif, gabungkan dengan BASE_URL backend
  const baseUrlFixed = BASE_URL.replace("/api", "");
  return `${baseUrlFixed}/storage/${path}`;
};
// ==========================================

// ==========================================
// CLIENT-SIDE PAGINATION LOGIC
// ==========================================

const totalItems = computed(() => allReportData.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return allReportData.value.slice(start, end);
});

const showingStart = computed(() => {
  if (totalItems.value === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() => {
  return Math.min(currentPage.value * itemsPerPage.value, totalItems.value);
});

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const maxVisible = 7;

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }

  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
});

// ==========================================
// DATA FETCHING & CALCULATIONS
// ==========================================

const fetchReport = async () => {
  isLoading.value = true;
  try {
    const params = {
      month: filters.value.month,
      year: filters.value.year,
      search: filters.value.search,
    };

    const res = await axios.get(`${BASE_URL}/admin/sales-report`, {
      ...axiosConfig,
      params,
    });

    allReportData.value = res.data.data;
    currentPage.value = 1;

    calculateGlobalSummary(res.data.data);
  } catch (error) {
    console.error("Fetch report failed", error);
  } finally {
    // Tambahkan sedikit delay (misal 500ms) agar skeleton terbaca matanya (mencegah flickering jika internet terlalu cepat)
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

const calculateGlobalSummary = (data) => {
  if (data.length > 0) {
    grandTotalRevenue.value = data.reduce(
      (acc, item) => acc + parseFloat(item.total_revenue),
      0
    );
    totalUnitsSold.value = data.reduce((acc, item) => acc + parseInt(item.total_sold), 0);
    bestSellerName.value = data[0].name; // Karena data dari backend sudah diorder by total_sold DESC
  } else {
    grandTotalRevenue.value = 0;
    totalUnitsSold.value = 0;
    bestSellerName.value = "-";
  }
};

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

let timeout = null;
watch(
  () => filters.value.search,
  () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetchReport();
    }, 600);
  }
);

watch(itemsPerPage, () => {
  currentPage.value = 1;
});

// ==========================================
// EXPORT FUNCTIONS
// ==========================================

const exportToPDF = () => {
  const element = document.getElementById("exportable-table");
  const headers = element.querySelectorAll(".export-header");
  headers.forEach((h) => {
    h.classList.remove("hidden");
    h.classList.add("block");
  });

  const monthName = filters.value.month ? months[filters.value.month - 1] : "All";
  const fileName = `Sales_Report_${filters.value.year}_${monthName}.pdf`;

  const opt = {
    margin: 0.5,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      headers.forEach((h) => {
        h.classList.add("hidden");
        h.classList.remove("block");
      });
    });
};

const exportToExcel = () => {
  const excelData = allReportData.value.map((item, index) => ({
    No: index + 1,
    "Product Code": item.code,
    "Product Name": item.name,
    Category: item.category_name,
    "Units Sold": parseInt(item.total_sold),
    "Total Revenue (IDR)": parseFloat(item.total_revenue),
  }));

  excelData.push({
    No: "",
    "Product Code": "",
    "Product Name": "",
    Category: "GRAND TOTAL",
    "Units Sold": totalUnitsSold.value,
    "Total Revenue (IDR)": grandTotalRevenue.value,
  });

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

  const monthName = filters.value.month ? months[filters.value.month - 1] : "All";
  const fileName = `Sales_Report_${filters.value.year}_${monthName}.xlsx`;

  XLSX.writeFile(workbook, fileName);
};

onMounted(fetchReport);
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

@media print {
  .export-header {
    display: block !important;
  }
}
</style>
