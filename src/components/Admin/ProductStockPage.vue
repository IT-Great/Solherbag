<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px] animate-fade-in">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Stock Management (FIFO)</h1>
        <p class="text-gray-500 text-sm">Monitor and add stock batches to your products.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
      <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100">
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Products</p>
        <div v-if="!isLoading" class="text-4xl font-black text-black">{{ products.length }}</div>
        <div v-else class="h-10 w-16 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div class="p-6 bg-green-50/50 rounded-2xl border border-green-100">
        <p class="text-xs text-green-600 font-bold uppercase tracking-widest mb-1">Safe Stock (≥ 10)</p>
        <div v-if="!isLoading" class="text-4xl font-black text-green-700">{{ safeStockCount }}</div>
        <div v-else class="h-10 w-16 bg-green-200 rounded animate-pulse"></div>
      </div>
      
      <div class="p-6 bg-amber-50/50 rounded-2xl border border-amber-100">
        <p class="text-xs text-amber-600 font-bold uppercase tracking-widest mb-1">Low Stock (under 10)</p>
        <div v-if="!isLoading" class="text-4xl font-black text-amber-700">{{ lowStockCount }}</div>
        <div v-else class="h-10 w-16 bg-amber-200 rounded animate-pulse"></div>
      </div>
      
      <div class="p-6 bg-red-50/50 rounded-2xl border border-red-100">
        <p class="text-xs text-red-600 font-bold uppercase tracking-widest mb-1">Out of Stock</p>
        <div v-if="!isLoading" class="text-4xl font-black text-red-700">{{ outOfStockCount }}</div>
        <div v-else class="h-10 w-16 bg-red-200 rounded animate-pulse"></div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input v-model="searchQuery" type="text" placeholder="Search product name..." class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition" />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4 pl-2">Product</th>
            <th class="pb-4 text-center">Total Stock</th>
            <th class="pb-4">Active Batches (FIFO)</th>
            <th class="pb-4">Status</th>
            <th class="pb-4 text-center pr-2">Action</th>
          </tr>
        </thead>
        
        <tbody v-if="isLoading">
          <tr v-for="i in 5" :key="`skel-${i}`" class="border-b border-gray-50">
            <td class="py-6 pl-2">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
                <div class="space-y-2"><div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div></div>
              </div>
            </td>
            <td class="py-6 text-center"><div class="h-6 w-10 mx-auto bg-gray-200 rounded animate-pulse"></div></td>
            <td class="py-6"><div class="h-10 w-48 bg-gray-100 rounded-lg animate-pulse"></div></td>
            <td class="py-6"><div class="h-5 w-20 bg-gray-200 rounded-full animate-pulse"></div></td>
            <td class="py-6 text-center pr-2"><div class="h-8 w-24 mx-auto bg-gray-200 rounded-lg animate-pulse"></div></td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr v-for="product in filteredProducts" :key="product.id" class="border-b border-gray-50 hover:bg-gray-50 transition align-top">
            <td class="py-4 pl-2 w-[25%]">
              <div class="flex items-center gap-4">
                <img :src="product.image || defaultBagIcon" class="w-12 h-12 rounded-lg object-cover border border-gray-100 shadow-sm" />
                <div>
                  <p class="font-bold text-gray-900 text-sm">{{ product.name }}</p>
                  <p class="text-[10px] text-gray-400 font-mono">{{ product.code }}</p>
                </div>
              </div>
            </td>
            
            <td class="py-4 text-center w-[15%]">
              <span class="text-xl font-black text-gray-900">{{ product.stock }}</span>
              <span class="text-xs text-gray-400 ml-1">pcs</span>
            </td>

            <!-- <td class="py-4 w-[35%]">
              <div v-if="product.stocks && product.stocks.length > 0" class="flex flex-col gap-2">
                <div v-for="batch in product.stocks" :key="batch.id" class="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm text-xs">
                  <div>
                    <span class="font-mono font-bold text-blue-600 block">{{ batch.batch_code }}</span>
                    <span class="text-[9px] text-gray-400">{{ formatDate(batch.created_at) }}</span>
                  </div>
                  <div class="bg-gray-100 px-3 py-1 rounded font-bold text-gray-800">
                    {{ batch.quantity }} pcs
                  </div>
                </div>
              </div>
              <div v-else class="text-xs text-gray-400 italic bg-gray-50 p-2 rounded-lg border border-dashed text-center">
                No active batches.
              </div>
            </td> -->

            <!-- <td class="py-4 w-[35%]">
              <div v-if="product.stocks && product.stocks.length > 0" class="flex flex-col gap-2">
                <div 
                  v-for="(batch, index) in sortBatchesFIFO(product.stocks)" 
                  :key="batch.id" 
                  :class="[
                    'flex justify-between items-center bg-white border rounded-lg p-2 shadow-sm text-xs transition-colors',
                    index === 0 ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200'
                  ]"
                >
                  <div>
                    <div class="flex items-center gap-2 mb-0.5">
                      <span class="font-mono font-bold text-blue-600 block">{{ batch.batch_code }}</span>
                      
                      <span v-if="index === 0" class="bg-blue-600 text-white text-[8px] px-1.5 py-0.5 rounded uppercase tracking-widest font-bold shadow-sm animate-pulse">
                        Next to Use
                      </span>
                      <span v-else-if="index === product.stocks.length - 1 && product.stocks.length > 1" class="bg-green-100 text-green-700 text-[8px] px-1.5 py-0.5 rounded uppercase tracking-widest font-bold border border-green-200">
                        Newest
                      </span>
                    </div>
                    
                    <span class="text-[9px] text-gray-400">{{ formatDate(batch.created_at) }}</span>
                  </div>
                  <div class="bg-gray-100 px-3 py-1 rounded font-bold text-gray-800">
                    {{ batch.quantity }} pcs
                  </div>
                </div>
              </div>
              <div v-else class="text-xs text-gray-400 italic bg-gray-50 p-2 rounded-lg border border-dashed text-center">
                No active batches.
              </div>
            </td> -->

            <td class="py-4 w-[35%]">
              <div v-if="product.display_stocks && product.display_stocks.length > 0" class="flex flex-col gap-2">
                <div 
                  v-for="(batch, index) in product.display_stocks" 
                  :key="batch.id" 
                  :class="[
                    'flex justify-between items-center bg-white border rounded-lg p-2 shadow-sm text-xs transition-colors',
                    index === 0 ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200'
                  ]"
                >
                  <div>
                    <div class="flex items-center gap-2 mb-0.5">
                      <span :class="batch.is_legacy ? 'text-gray-500' : 'text-blue-600'" class="font-mono font-bold block">
                        {{ batch.batch_code }}
                      </span>
                      
                      <span v-if="index === 0" class="bg-blue-600 text-white text-[8px] px-1.5 py-0.5 rounded uppercase tracking-widest font-bold shadow-sm animate-pulse">
                        Next to Use
                      </span>
                      <span v-else-if="index === product.display_stocks.length - 1 && product.display_stocks.length > 1 && !batch.is_legacy" class="bg-green-100 text-green-700 text-[8px] px-1.5 py-0.5 rounded uppercase tracking-widest font-bold border border-green-200">
                        Newest
                      </span>
                    </div>
                    
                    <span class="text-[9px] text-gray-400">
                      {{ batch.is_legacy ? 'Legacy System Stock' : formatDate(batch.created_at) }}
                    </span>
                  </div>
                  <div class="bg-gray-100 px-3 py-1 rounded font-bold text-gray-800">
                    {{ batch.quantity }} pcs
                  </div>
                </div>
              </div>
              <div v-else class="text-xs text-gray-400 italic bg-gray-50 p-2 rounded-lg border border-dashed text-center">
                No active batches.
              </div>
            </td>

            <td class="py-4 w-[15%]">
              <span v-if="product.stock >= 10" class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">Safe</span>
              <span v-else-if="product.stock > 0" class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">Low Stock</span>
              <span v-else class="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest animate-pulse">Out of Stock</span>
            </td>

            <td class="py-4 text-center pr-2 w-[10%]">
              <button @click="openAddStockModal(product)" class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm w-full whitespace-nowrap">
                + Add Batch
              </button>
            </td>
          </tr>
          
          <tr v-if="filteredProducts.length === 0">
             <td colspan="5" class="py-12 text-center text-gray-400 italic">No products found matching "{{ searchQuery }}".</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4">
      <div class="bg-white rounded-[2rem] shadow-2xl p-8 w-full max-w-sm relative">
        <button @click="showModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-black">✕</button>
        <h2 class="text-xl font-bold text-gray-900 mb-2">Receive New Stock</h2>
        <p class="text-xs text-gray-500 mb-6">Add a new stock batch for <span class="font-bold text-black">{{ selectedProduct?.name }}</span>.</p>

        <form @submit.prevent="submitAddStock" class="space-y-4">
          <div>
            <label class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Quantity Arrived</label>
            <input v-model="newQuantity" type="number" min="1" class="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-black text-xl font-black text-center" required />
          </div>
          <button type="submit" :disabled="isSubmitting" class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-3 rounded-xl transition shadow-md shadow-blue-500/30">
            {{ isSubmitting ? 'Processing...' : 'Confirm Stock Entry' }}
          </button>
        </form>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

// [BARU] Import gambar default sebagai fallback
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const products = ref([]);
const isLoading = ref(true);
const searchQuery = ref("");

const showModal = ref(false);
const isSubmitting = ref(false);
const selectedProduct = ref(null);
const newQuantity = ref(1);

const axiosConfig = { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } };

// --- [BARU] COMPUTED PROPERTIES UNTUK SUMMARY CARDS ---
const safeStockCount = computed(() => {
  return products.value.filter(p => p.stock >= 10).length;
});

const lowStockCount = computed(() => {
  return products.value.filter(p => p.stock > 0 && p.stock < 10).length;
});

const outOfStockCount = computed(() => {
  return products.value.filter(p => p.stock === 0).length;
});
// -------------------------------------------------------

const filteredProducts = computed(() => {
  return products.value.filter(p => p.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

// const fetchStocks = async () => {
//   isLoading.value = true;
//   try {
//     const res = await axios.get(`${BASE_URL}/admin/product-stocks`, axiosConfig);
//     products.value = res.data;
//   } catch (error) {
//     Swal.fire("Error", "Failed to load stock data", "error");
//   } finally {
//     setTimeout(() => (isLoading.value = false), 500);
//   }
// };

const fetchStocks = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/product-stocks`, axiosConfig);
    
    // ====================================================================
    // [PERBAIKAN] LOGIKA PENGGABUNGAN STOK LAMA (LEGACY) & STOK BARU (BATCH)
    // ====================================================================
    const processedProducts = res.data.map(product => {
      let batches = [];
      
      // 1. Ambil dan urutkan batch asli dari database (FIFO: Paling lama di atas)
      if (product.stocks && Array.isArray(product.stocks)) {
        batches = [...product.stocks].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      }
      
      // 2. Hitung jumlah barang yang ada di dalam sistem batch
      const trackedQuantity = batches.reduce((sum, b) => sum + Number(b.quantity), 0);
      
      // 3. Hitung selisih dengan stok utama (Stok yang diinput sebelum fitur Batch dibuat)
      const unbatchedQuantity = Number(product.stock) - trackedQuantity;
      
      // 4. Jika ada selisih (Stok Siluman), buatkan Batch Fiktif dan taruh di URUTAN PALING ATAS
      if (unbatchedQuantity > 0) {
        batches.unshift({
          id: 'legacy-' + product.id,
          batch_code: 'SYS-INITIAL-STOCK',
          quantity: unbatchedQuantity,
          created_at: product.created_at, // Menggunakan tanggal produk dibuat
          is_legacy: true // Penanda khusus untuk frontend
        });
      }
      
      // Simpan ke properti baru bernama 'display_stocks' untuk dirender di tabel
      product.display_stocks = batches;
      return product;
    });

    products.value = processedProducts;
    // ====================================================================

  } catch (error) {
    Swal.fire("Error", "Failed to load stock data", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
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
    Swal.fire({ toast: true, position: 'top-end', icon: "success", title: "Stock batch added!", showConfirmButton: false, timer: 1500 });
    fetchStocks();
  } catch (err) {
    Swal.fire("Error", "Failed to add stock", "error");
  } finally {
    isSubmitting.value = false;
  }
};

// --- [BARU] FUNGSI SORTING FIFO ---
const sortBatchesFIFO = (stocks) => {
  if (!stocks || !Array.isArray(stocks)) return [];
  
  // Melakukan 'Deep Copy' agar tidak merusak data asli, lalu mengurutkan secara Ascending.
  // Waktu terlama (Oldest) akan berada di index 0 (Atas).
  // Waktu terbaru (Newest) akan berada di index terakhir (Bawah).
  return [...stocks].sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
};
// ----------------------------------

const formatDate = (date) => new Date(date).toLocaleString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

onMounted(fetchStocks);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>