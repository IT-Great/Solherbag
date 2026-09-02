<template>
  <div
    class="relative bg-white shadow-sm p-6 md:p-8 border border-gray-100 rounded-2xl min-h-[600px] animate-fade-in"
  >
    <Breadcrumb />
    <!-- Header -->
    <div
      class="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Inactive Stock Management</h1>
        <p class="text-sm text-gray-500">
          Manage stock for <span class="font-bold text-red-600">discontinued/inactive</span> products.
        </p>
      </div>
      <!-- 👇 TOMBOL KEMBALI KE HALAMAN AKTIF 👇 -->
      <router-link
        to="/admin/stocks"
        class="flex items-center gap-2 px-4 py-2 text-xs font-bold text-gray-700 transition bg-white border border-gray-200 shadow-sm rounded-xl hover:bg-gray-50 hover:text-black"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Active Products
      </router-link>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4 md:gap-6">
      <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100 md:p-6">
        <p class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase">
          Inactive Products
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-black md:text-4xl">
          {{ products.length }}
        </div>
        <div v-else class="w-16 h-8 bg-gray-200 rounded md:h-10 animate-pulse"></div>
      </div>

      <div class="p-4 border bg-green-50/50 rounded-2xl border-green-100 md:p-6">
        <p class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-green-600 uppercase">
          Safe (≥ 10)
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-green-700 md:text-4xl">
          {{ safeStockCount }}
        </div>
        <div v-else class="w-16 h-8 bg-green-200 rounded md:h-10 animate-pulse"></div>
      </div>

      <div class="p-4 border bg-amber-50/50 rounded-2xl border-amber-100 md:p-6">
        <p class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-amber-600 uppercase">
          Low (< 10)
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-amber-700 md:text-4xl">
          {{ lowStockCount }}
        </div>
        <div v-else class="w-16 h-8 bg-amber-200 rounded md:h-10 animate-pulse"></div>
      </div>

      <div class="p-4 border bg-red-50/50 rounded-2xl border-red-100 md:p-6">
        <p class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-red-600 uppercase">
          Out of Stock
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-red-700 md:text-4xl">
          {{ outOfStockCount }}
        </div>
        <div v-else class="w-16 h-8 bg-red-200 rounded md:h-10 animate-pulse"></div>
      </div>
    </div>

    <!-- Toolbar: Filters, Search & EXPORT BUTTONS -->
    <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <!-- Kiri: Filters -->
      <div class="flex flex-wrap items-center w-full gap-3 md:w-auto">
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold tracking-widest text-gray-400 uppercase">Show:</span>
          <select
            v-model="itemsPerPage"
            class="px-3 py-1.5 text-sm font-bold border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-black"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
        </div>
        <div class="hidden w-px h-6 bg-gray-200 md:block"></div>
        <select
          v-model="filters.status"
          class="px-3 py-1.5 text-sm font-bold text-gray-600 border border-gray-200 rounded-lg outline-none cursor-pointer bg-gray-50 focus:ring-1 focus:ring-black"
        >
          <option value="All">All Status</option>
          <option value="Safe">Safe Stock</option>
          <option value="Low">Low Stock</option>
          <option value="Out">Out of Stock</option>
        </select>
      </div>

      <!-- Kanan: Search & Export -->
      <div class="flex flex-col items-center gap-3 w-full md:w-auto md:flex-row">
        <div class="relative w-full md:w-64">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search code or name..."
            class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-1 focus:ring-black"
          />
          <svg class="top-2.5 left-3 absolute w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <div class="flex gap-2 w-full md:w-auto">
          <button
            @click="exportToExcel"
            class="flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-green-700 transition bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 w-full md:w-auto"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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

    <!-- Data Table -->
    <div class="overflow-x-auto border border-gray-100 rounded-xl">
      <table class="w-full text-left border-collapse bg-white/50">
        <thead>
          <tr class="text-xs tracking-widest text-gray-400 uppercase bg-gray-50/50 border-b border-gray-100">
            <th class="p-4 font-medium">Product</th>
            <th class="p-4 font-medium text-center">Total Stock</th>
            <th class="p-4 font-medium">Active Batches (FIFO)</th>
            <th class="p-4 font-medium">Status</th>
            <th class="p-4 font-medium text-center">Action</th>
          </tr>
        </thead>

        <tbody v-if="isLoading">
          <tr v-for="i in itemsPerPage > 5 ? 5 : itemsPerPage" :key="`skel-${i}`" class="border-b border-gray-50">
            <td class="p-4">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
                <div class="space-y-2">
                  <div class="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </td>
            <td class="p-4 text-center">
              <div class="w-10 h-6 mx-auto bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="p-4">
              <div class="w-48 h-10 bg-gray-100 rounded-lg animate-pulse"></div>
            </td>
            <td class="p-4">
              <div class="w-20 h-5 bg-gray-200 rounded-full animate-pulse"></div>
            </td>
            <td class="p-4 text-center">
              <div class="w-24 h-8 mx-auto bg-gray-200 rounded-lg animate-pulse"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else-if="paginatedProducts.length === 0">
          <tr>
            <td colspan="5" class="py-16 text-sm italic text-center text-gray-400">
              No inactive products found matching your criteria.
            </td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr v-for="product in paginatedProducts" :key="product.id" class="transition border-b hover:bg-gray-50 border-gray-50 align-top">
            <td class="p-4 w-[25%]">
              <div class="flex items-center gap-4">
                <img :src="getImgUrl(product.image)" @error="handleImgError" class="object-cover w-12 h-12 border border-gray-100 rounded-lg shadow-sm shrink-0 opacity-50 grayscale" />
                <div>
                  <p class="text-sm font-bold text-gray-500 line-through">{{ product.name }}</p>
                  <p class="text-[10px] text-gray-400 font-mono mt-0.5">{{ product.code }}</p>
                </div>
              </div>
            </td>

            <td class="p-4 text-center w-[15%]">
              <span class="text-xl font-black text-gray-900">{{ product.stock }}</span>
              <span class="ml-1 text-xs text-gray-400">pcs</span>
            </td>

            <td class="p-4 w-[35%]">
              <div v-if="product.display_stocks && product.display_stocks.length > 0" class="flex flex-col gap-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar">
                <div v-for="(batch, index) in product.display_stocks" :key="batch.id" class="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm text-xs transition-colors shrink-0">
                  <div>
                    <div class="flex items-center gap-2 mb-0.5">
                      <span class="block font-mono font-bold text-gray-500">{{ batch.batch_code }}</span>
                    </div>
                    <span class="text-[9px] text-gray-400">{{ batch.is_legacy ? "Legacy System Stock" : formatDate(batch.created_at) }}</span>
                  </div>
                  <div class="px-3 py-1 font-bold text-gray-600 bg-gray-200 rounded">
                    {{ batch.quantity }} pcs
                  </div>
                </div>
              </div>
              <div v-else class="p-2 text-xs italic text-center text-gray-400 border border-dashed rounded-lg bg-gray-50">
                No active batches.
              </div>
            </td>

            <td class="p-4 w-[15%]">
              <span v-if="product.stock >= 10" class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">Safe</span>
              <span v-else-if="product.stock > 0" class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">Low Stock</span>
              <span v-else class="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">Out of Stock</span>
            </td>

            <td class="p-4 text-center w-[10%]">
              <button @click="openAddStockModal(product)" class="w-full px-4 py-2 text-xs font-bold text-white transition bg-gray-400 shadow-sm rounded-xl hover:bg-gray-600 whitespace-nowrap">
                + Add Batch
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div v-if="!isLoading && totalItems > 0" class="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row">
      <p class="text-sm text-gray-500">
        Showing <span class="font-bold text-gray-900">{{ showingStart }}</span> to
        <span class="font-bold text-gray-900">{{ showingEnd }}</span> of
        <span class="font-bold text-gray-900">{{ totalItems }}</span> products
      </p>
      <div v-if="totalPages > 1" class="flex items-center gap-2">
        <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">Prev</button>
        <div class="hidden gap-1 sm:flex">
          <button v-for="(page, index) in visiblePages" :key="index" @click="typeof page === 'number' ? changePage(page) : null" :disabled="page === '...'" :class="[currentPage === page ? 'bg-black text-white border-black shadow-sm' : 'hover:bg-gray-50 border-gray-200 text-gray-600', page === '...' ? 'cursor-default border-transparent hover:bg-transparent' : 'border']" class="flex items-center justify-center w-8 h-8 text-xs font-bold transition rounded-lg">{{ page }}</button>
        </div>
        <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages" class="px-4 py-2 text-xs font-bold tracking-widest text-gray-600 uppercase transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">Next</button>
      </div>
    </div>

    <!-- Modal Input Batch -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="relative w-full max-w-sm p-8 bg-white shadow-2xl rounded-[2rem]">
        <button @click="showModal = false" class="absolute text-gray-400 top-6 right-6 hover:text-black">✕</button>
        <h2 class="mb-2 text-xl font-bold text-gray-900">Receive New Stock</h2>
        <p class="mb-6 text-xs text-gray-500">
          Add a new stock batch for <span class="font-bold text-black">{{ selectedProduct?.name }}</span>.
        </p>
        <form @submit.prevent="submitAddStock" class="space-y-4">
          <div>
            <label class="block mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Quantity Arrived</label>
            <input v-model="newQuantity" type="number" min="1" class="w-full p-4 text-xl font-black text-center border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black" required />
          </div>
          <button type="submit" :disabled="isSubmitting" class="w-full py-3 font-bold text-white transition bg-gray-600 shadow-md rounded-xl hover:bg-black disabled:bg-gray-300">
            {{ isSubmitting ? "Processing..." : "Confirm Stock Entry" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const products = ref([]);
const isLoading = ref(true);
const filters = ref({ search: "", status: "All" });
const currentPage = ref(1);
const itemsPerPage = ref(10);
const showModal = ref(false);
const isSubmitting = ref(false);
const selectedProduct = ref(null);
const newQuantity = ref(1);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const safeStockCount = computed(() => products.value.filter((p) => p.stock >= 10).length);
const lowStockCount = computed(() => products.value.filter((p) => p.stock > 0 && p.stock < 10).length);
const outOfStockCount = computed(() => products.value.filter((p) => p.stock === 0).length);

const fetchStocks = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/product-stocks`, axiosConfig);
    
    // 👇 FUNGSI FILTER: HANYA MEMPROSES PRODUK INAKTIF 👇
    const inactiveProducts = res.data.filter(p => p.status !== 'active');

    const processedProducts = inactiveProducts.map((product) => {
      let batches = [];
      if (product.stocks && Array.isArray(product.stocks)) {
        batches = [...product.stocks].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }
      const trackedQuantity = batches.reduce((sum, b) => sum + Number(b.quantity), 0);
      const unbatchedQuantity = Number(product.stock) - trackedQuantity;

      if (unbatchedQuantity > 0) {
        batches.unshift({
          id: "legacy-" + product.id,
          batch_code: "SYS-INITIAL-STOCK",
          quantity: unbatchedQuantity,
          created_at: product.created_at,
          is_legacy: true,
        });
      }
      product.display_stocks = batches;
      return product;
    });
    products.value = processedProducts;
  } catch (error) {
    Swal.fire("Error", "Failed to load inactive stock data", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const filteredProducts = computed(() => {
  let result = products.value;
  if (filters.value.search) {
    const q = filters.value.search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q));
  }
  if (filters.value.status !== "All") {
    if (filters.value.status === "Safe") result = result.filter((p) => p.stock >= 10);
    else if (filters.value.status === "Low") result = result.filter((p) => p.stock > 0 && p.stock < 10);
    else if (filters.value.status === "Out") result = result.filter((p) => p.stock === 0);
  }
  return result;
});

const totalItems = computed(() => filteredProducts.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProducts.value.slice(start, start + itemsPerPage.value);
});
const showingStart = computed(() => totalItems.value === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1);
const showingEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, totalItems.value));

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

watch([() => filters.value.search, () => filters.value.status, itemsPerPage], () => {
  currentPage.value = 1;
});

const getExportData = () => {
  return filteredProducts.value.map((p) => ({
    "Product Code": p.code,
    "Product Name": p.name,
    "Total Stock (pcs)": p.stock,
    Status: p.stock >= 10 ? "Safe" : p.stock > 0 ? "Low Stock" : "Out of Stock",
    "Active Batches": p.display_stocks ? p.display_stocks.map((b) => `${b.batch_code} (${b.quantity} pcs)`).join(", ") : "None",
  }));
};

const exportToExcel = () => {
  const data = getExportData();
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Inactive_Stock");
  XLSX.writeFile(workbook, `Solher_InactiveStock_${new Date().toISOString().split("T")[0]}.xlsx`);
};

const exportToPDF = () => {
  const doc = new jsPDF();
  const data = getExportData();

  doc.setFontSize(16);
  doc.text("Solher - Inactive Stock Report", 14, 15);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);

  const columns = ["Code", "Product Name", "Stock", "Status", "Batches"];
  const rows = data.map((item) => [item["Product Code"], item["Product Name"], item["Total Stock (pcs)"], item["Status"], item["Active Batches"]]);

  doc.autoTable({
    startY: 28,
    head: [columns],
    body: rows,
    theme: "grid",
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 0, 0] },
  });

  doc.save(`Solher_InactiveStock_${new Date().toISOString().split("T")[0]}.pdf`);
};

const openAddStockModal = (product) => {
  selectedProduct.value = product;
  newQuantity.value = 1;
  showModal.value = true;
};

const submitAddStock = async () => {
  isSubmitting.value = true;
  try {
    await axios.post(`${BASE_URL}/admin/product-stocks/${selectedProduct.value.id}`, { quantity: newQuantity.value }, axiosConfig);
    showModal.value = false;
    Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Stock batch added!", showConfirmButton: false, timer: 1500 });
    fetchStocks();
  } catch (err) {
    Swal.fire("Error", "Failed to add stock", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const getImgUrl = (path) => {
  if (!path) return defaultBagIcon;
  if (path.startsWith("http")) return path;
  return `${BASE_URL.replace("/api", "")}/storage/${path}`;
};
const handleImgError = (e) => { e.target.src = defaultBagIcon; };
const formatDate = (date) => new Date(date).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

onMounted(fetchStocks);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }
</style>