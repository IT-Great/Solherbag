<!-- <template>
  <div class="space-y-8 animate-fade-in">
    
    <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
       <div class="flex flex-wrap items-end gap-4">
        <div class="w-full sm:w-auto">
          <label class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-wide">Year</label>
          <select v-model="filters.year" class="bg-gray-50 px-4 py-2 border rounded-xl w-full sm:w-32 focus:ring-2 focus:ring-black outline-none font-bold">
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
        <div class="w-full sm:w-auto">
          <label class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-wide">Month</label>
          <select v-model="filters.month" class="bg-gray-50 px-4 py-2 border rounded-xl w-full sm:w-40 focus:ring-2 focus:ring-black outline-none">
            <option value="">All Months</option>
            <option v-for="(m, i) in months" :key="i" :value="i + 1">{{ m }}</option>
          </select>
        </div>
        <div class="flex-grow w-full sm:w-auto">
          <label class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-wide">Search Product</label>
          <div class="relative">
            <input 
              v-model="filters.search" 
              type="text" 
              placeholder="Search by product name or code..." 
              class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full transition"
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

    <div class="gap-6 grid grid-cols-1 md:grid-cols-3">
      <div class="bg-blue-50 p-6 border border-blue-100 rounded-2xl">
        <p class="font-bold text-blue-600 text-xs uppercase">Total Revenue</p>
        <p class="font-black text-2xl">{{ formatPrice(grandTotalRevenue) }}</p>
      </div>
      <div class="bg-green-50 p-6 border border-green-100 rounded-2xl">
        <p class="font-bold text-green-600 text-xs uppercase">Total Units Sold</p>
        <p class="font-black text-2xl">{{ totalUnitsSold }} pcs</p>
      </div>
      <div class="bg-purple-50 p-6 border border-purple-100 rounded-2xl">
        <p class="font-bold text-purple-600 text-xs uppercase">Best Seller</p>
        <p class="font-black text-lg truncate">{{ bestSellerName }}</p>
      </div>
    </div>

    <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]">
      
      <div v-if="isLoading" class="z-10 absolute inset-0 flex justify-center items-center bg-white/80 backdrop-blur-sm rounded-2xl">
        <div class="border-4 border-gray-200 border-t-black rounded-full w-10 h-10 animate-spin"></div>
      </div>

      <div class="flex justify-between items-center mb-6">
        <h2 class="font-bold text-gray-800 text-xl">Product Performance</h2>
        <div class="flex items-center gap-2">
          <span class="text-gray-500 text-xs uppercase">Show:</span>
          <select v-model="itemsPerPage" @change="fetchReport" class="bg-gray-50 px-2 py-1 border rounded-lg text-sm">
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
            <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
              <th class="pb-4">Product Info</th>
              <th class="pb-4">Category</th>
              <th class="pb-4 text-right">Units Sold</th>
              <th class="pb-4 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody class="text-gray-600">
            <tr v-for="(item, index) in reportData" :key="index" class="hover:bg-gray-50 border-gray-50 border-b transition">
              <td class="py-4">
                <div class="flex items-center gap-4">
                  <img 
                    :src="item.image" 
                    alt="Product" 
                    class="bg-gray-100 shadow-sm rounded-lg w-12 h-12 object-cover"
                  />
                  <div>
                    <p class="font-bold text-gray-900">{{ item.name }}</p>
                    <p class="font-mono text-gray-400 text-xs">{{ item.code }}</p>
                  </div>
                </div>
              </td>
              <td class="py-4 text-sm">{{ item.category_name }}</td>
              <td class="py-4 font-medium text-right text-gray-900">{{ item.total_sold }}</td>
              <td class="py-4 font-bold text-right text-green-600">{{ formatPrice(item.total_revenue) }}</td>
            </tr>
            <tr v-if="!isLoading && reportData.length === 0">
              <td colspan="4" class="py-12 text-center text-gray-400 italic">No sales data found for this period.</td>
            </tr>
          </tbody>
          
          <tfoot v-if="reportData.length > 0 && !isLoading">
            <tr class="bg-gray-50/50 font-bold text-gray-800 border-gray-100 border-t-2">
              <td colspan="2" class="py-4 pl-4 text-right text-gray-500 text-xs uppercase tracking-widest">
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

      <div v-if="lastPage > 1" class="flex justify-between items-center mt-6 pt-4 border-t">
        <span class="text-gray-400 text-xs">Page {{ currentPage }} of {{ lastPage }}</span>
        <div class="flex gap-2">
          <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="hover:bg-gray-100 px-3 py-1 border rounded-lg disabled:opacity-50 text-xs">Prev</button>
          <button @click="changePage(currentPage + 1)" :disabled="currentPage === lastPage" class="hover:bg-gray-100 px-3 py-1 border rounded-lg disabled:opacity-50 text-xs">Next</button>
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
<template>
  <div class="space-y-8 animate-fade-in">
    <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
      <div class="flex flex-wrap items-end gap-4">
        <div class="w-full sm:w-auto">
          <label
            class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-wide"
            >Year</label
          >
          <select
            v-model="filters.year"
            class="bg-gray-50 px-4 py-2 border rounded-xl w-full sm:w-32 focus:ring-2 focus:ring-black outline-none font-bold"
          >
            <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
          </select>
        </div>
        <div class="w-full sm:w-auto">
          <label
            class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-wide"
            >Month</label
          >
          <select
            v-model="filters.month"
            class="bg-gray-50 px-4 py-2 border rounded-xl w-full sm:w-40 focus:ring-2 focus:ring-black outline-none"
          >
            <option value="">All Months</option>
            <option v-for="(m, i) in months" :key="i" :value="i + 1">
              {{ m }}
            </option>
          </select>
        </div>
        <div class="flex-grow w-full sm:w-auto">
          <label
            class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-wide"
            >Search Product</label
          >
          <div class="relative">
            <input
              v-model="filters.search"
              type="text"
              placeholder="Search by product name or code..."
              class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full transition"
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

    <div class="gap-6 grid grid-cols-1 md:grid-cols-3">
      <div class="bg-blue-50 p-6 border border-blue-100 rounded-2xl">
        <p class="font-bold text-blue-600 text-xs uppercase">Total Revenue</p>
        <p class="font-black text-2xl">{{ formatPrice(grandTotalRevenue) }}</p>
      </div>
      <div class="bg-green-50 p-6 border border-green-100 rounded-2xl">
        <p class="font-bold text-green-600 text-xs uppercase">
          Total Units Sold
        </p>
        <p class="font-black text-2xl">{{ totalUnitsSold }} pcs</p>
      </div>
      <div class="bg-purple-50 p-6 border border-purple-100 rounded-2xl">
        <p class="font-bold text-purple-600 text-xs uppercase">Best Seller</p>
        <p class="font-black text-lg truncate">{{ bestSellerName }}</p>
      </div>
    </div>

    <div
      class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]"
    >
      <div
        v-if="isLoading"
        class="z-10 absolute inset-0 flex justify-center items-center bg-white/80 backdrop-blur-sm rounded-2xl"
      >
        <div
          class="border-4 border-gray-200 border-t-black rounded-full w-10 h-10 animate-spin"
        ></div>
      </div>

      <div
        class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"
      >
        <h2 class="font-bold text-gray-800 text-xl">Product Performance</h2>

        <div class="flex items-center gap-4">
          <div class="flex gap-2">
            <button
              @click="exportToPDF"
              :disabled="reportData.length === 0"
              class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition"
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
              class="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 disabled:opacity-50 disabled:cursor-not-allowed px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition"
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

          <div class="h-6 w-px bg-gray-200 hidden md:block"></div>

          <div class="flex items-center gap-2">
            <span class="text-gray-500 text-xs uppercase">Show:</span>
            <select
              v-model="itemsPerPage"
              @change="fetchReport(1)"
              class="bg-gray-50 px-2 py-1 border rounded-lg text-sm outline-none"
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
        <div class="hidden export-header mb-4">
          <h2 class="text-2xl font-bold text-black">Sales Report</h2>
          <p class="text-gray-500 text-sm">
            Period:
            {{ filters.month ? months[filters.month - 1] : "All Months" }}
            {{ filters.year }}
          </p>
        </div>

        <table class="w-full text-left bg-white">
          <thead>
            <tr
              class="border-b text-gray-400 text-xs uppercase tracking-widest"
            >
              <th class="pb-4">Product Info</th>
              <th class="pb-4">Category</th>
              <th class="pb-4 text-right">Units Sold</th>
              <th class="pb-4 text-right">Revenue</th>
            </tr>
          </thead>
          <tbody class="text-gray-600">
            <tr
              v-for="(item, index) in reportData"
              :key="index"
              class="hover:bg-gray-50 border-gray-50 border-b transition"
            >
              <td class="py-4">
                <div class="flex items-center gap-4">
                  <img
                    :src="item.image"
                    alt="Product"
                    class="bg-gray-100 shadow-sm rounded-lg w-12 h-12 object-cover"
                    crossorigin="anonymous"
                  />
                  <div>
                    <p class="font-bold text-gray-900">{{ item.name }}</p>
                    <p class="font-mono text-gray-400 text-xs">
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
              <td colspan="4" class="py-12 text-center text-gray-400 italic">
                No sales data found for this period.
              </td>
            </tr>
          </tbody>

          <tfoot v-if="reportData.length > 0 && !isLoading">
            <tr
              class="bg-gray-50/50 font-bold text-gray-800 border-gray-100 border-t-2"
            >
              <td
                colspan="2"
                class="py-4 pl-4 text-right text-gray-500 text-xs uppercase tracking-widest"
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
        v-if="lastPage > 1"
        class="flex justify-between items-center mt-6 pt-4 border-t"
      >
        <span class="text-gray-400 text-xs"
          >Page {{ currentPage }} of {{ lastPage }}</span
        >
        <div class="flex gap-2">
          <button
            @click="changePage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="hover:bg-gray-100 px-3 py-1 border rounded-lg disabled:opacity-50 text-xs"
          >
            Prev
          </button>
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage === lastPage"
            class="hover:bg-gray-100 px-3 py-1 border rounded-lg disabled:opacity-50 text-xs"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted, watch } from "react"; // Pastikan 'vue' bukan 'react', karena di atas sepertinya typo bawaan jika tidak hati-hati. Import vue yang benar di bawah ini.
// import {
//   ref as vueRef,
//   onMounted as vueOnMounted,
//   watch as vueWatch,
// } from "vue"; // Reset to standard vue imports
// import axios from "axios";
// import { BASE_URL } from "../../config/api.js";

// // [BARU] Import Library untuk Export
// import html2pdf from "html2pdf.js";
// import * as XLSX from "xlsx";

// // Alias agar konsisten dengan Vue
// const ref = vueRef;
// const onMounted = vueOnMounted;
// const watch = vueWatch;

// const reportData = ref([]);
// const isLoading = ref(false);
// const currentPage = ref(1);
// const lastPage = ref(1);
// const itemsPerPage = ref(10);

// const grandTotalRevenue = ref(0);
// const totalUnitsSold = ref(0);
// const bestSellerName = ref("-");

// const currentYear = new Date().getFullYear();
// const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
// const months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// const filters = ref({
//   year: currentYear,
//   month: new Date().getMonth() + 1,
//   search: "",
// });

// const axiosConfig = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
// };

// const fetchReport = async (page = 1) => {
//   isLoading.value = true;
//   try {
//     const params = {
//       month: filters.value.month,
//       year: filters.value.year,
//       search: filters.value.search,
//       per_page: itemsPerPage.value,
//       page: page,
//     };

//     const res = await axios.get(`${BASE_URL}/admin/sales-report`, {
//       ...axiosConfig,
//       params,
//     });

//     reportData.value = res.data.data;
//     currentPage.value = res.data.current_page;
//     lastPage.value = res.data.last_page;

//     calculateLocalSummary(res.data.data);
//   } catch (error) {
//     console.error("Fetch report failed", error);
//   } finally {
//     setTimeout(() => (isLoading.value = false), 500);
//   }
// };

// const calculateLocalSummary = (data) => {
//   if (data.length > 0) {
//     grandTotalRevenue.value = data.reduce(
//       (acc, item) => acc + parseFloat(item.total_revenue),
//       0,
//     );
//     totalUnitsSold.value = data.reduce(
//       (acc, item) => acc + parseInt(item.total_sold),
//       0,
//     );
//     bestSellerName.value = data[0].name;
//   } else {
//     grandTotalRevenue.value = 0;
//     totalUnitsSold.value = 0;
//     bestSellerName.value = "-";
//   }
// };

// const changePage = (page) => {
//   if (page >= 1 && page <= lastPage.value) {
//     fetchReport(page);
//   }
// };

// const formatPrice = (v) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(v);

// let timeout = null;
// watch(
//   () => filters.value.search,
//   () => {
//     clearTimeout(timeout);
//     timeout = setTimeout(() => {
//       currentPage.value = 1;
//       fetchReport();
//     }, 600);
//   },
// );

// // --- FUNGSI EXPORT PDF ---
// const exportToPDF = () => {
//   // Ambil elemen tabel
//   const element = document.getElementById("exportable-table");

//   // Tampilkan header khusus (Judul dan Tanggal) agar terlihat di PDF
//   const headers = element.querySelectorAll(".export-header");
//   headers.forEach((h) => h.classList.remove("hidden"));
//   headers.forEach((h) => h.classList.add("block"));

//   const monthName = filters.value.month
//     ? months[filters.value.month - 1]
//     : "All";
//   const fileName = `Sales_Report_${filters.value.year}_${monthName}.pdf`;

//   const opt = {
//     margin: 0.5,
//     filename: fileName,
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 2, useCORS: true }, // useCORS sangat penting agar gambar dari server/CDN bisa ter-render
//     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//   };

//   html2pdf()
//     .set(opt)
//     .from(element)
//     .save()
//     .then(() => {
//       // Sembunyikan kembali header setelah selesai di-export
//       headers.forEach((h) => h.classList.add("hidden"));
//       headers.forEach((h) => h.classList.remove("block"));
//     });
// };

// // --- FUNGSI EXPORT EXCEL ---
// const exportToExcel = () => {
//   // Mapping data dari array reportData ke format yang bersih untuk Excel
//   const excelData = reportData.value.map((item, index) => ({
//     No: index + 1,
//     "Product Code": item.code,
//     "Product Name": item.name,
//     Category: item.category_name,
//     "Units Sold": parseInt(item.total_sold),
//     "Total Revenue (IDR)": parseFloat(item.total_revenue),
//   }));

//   // Menambahkan baris total di paling bawah
//   excelData.push({
//     No: "",
//     "Product Code": "",
//     "Product Name": "",
//     Category: "GRAND TOTAL",
//     "Units Sold": totalUnitsSold.value,
//     "Total Revenue (IDR)": grandTotalRevenue.value,
//   });

//   const worksheet = XLSX.utils.json_to_sheet(excelData);
//   const workbook = XLSX.utils.book_new();

//   XLSX.utils.book_append_sheet(workbook, worksheet, "Sales Data");

//   const monthName = filters.value.month
//     ? months[filters.value.month - 1]
//     : "All";
//   const fileName = `Sales_Report_${filters.value.year}_${monthName}.xlsx`;

//   XLSX.writeFile(workbook, fileName);
// };

// onMounted(fetchReport);

// 1. IMPORT VUE STANDAR (Bersih, tanpa alias atau react)
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

// 2. IMPORT LIBRARY EXPORT
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";

const reportData = ref([]);
const isLoading = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);
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

    calculateLocalSummary(res.data.data);
  } catch (error) {
    console.error("Fetch report failed", error);
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
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
</style>
