<!-- <template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px] animate-fade-in">
    <div class="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Stock Management (FIFO)</h1>
        <p class="text-sm text-gray-500">Monitor and add stock batches to your products.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 mb-8 sm:grid-cols-2 md:grid-cols-4">
      <div class="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
        <p class="mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase">Total Products</p>
        <div v-if="!isLoading" class="text-4xl font-black text-black">{{ products.length }}</div>
        <div v-else class="w-16 h-10 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div class="p-6 border border-green-100 bg-green-50/50 rounded-2xl">
        <p class="mb-1 text-xs font-bold tracking-widest text-green-600 uppercase">Safe Stock (≥ 10)</p>
        <div v-if="!isLoading" class="text-4xl font-black text-green-700">{{ safeStockCount }}</div>
        <div v-else class="w-16 h-10 bg-green-200 rounded animate-pulse"></div>
      </div>
      
      <div class="p-6 border bg-amber-50/50 rounded-2xl border-amber-100">
        <p class="mb-1 text-xs font-bold tracking-widest uppercase text-amber-600">Low Stock (under 10)</p>
        <div v-if="!isLoading" class="text-4xl font-black text-amber-700">{{ lowStockCount }}</div>
        <div v-else class="w-16 h-10 rounded bg-amber-200 animate-pulse"></div>
      </div>
      
      <div class="p-6 border border-red-100 bg-red-50/50 rounded-2xl">
        <p class="mb-1 text-xs font-bold tracking-widest text-red-600 uppercase">Out of Stock</p>
        <div v-if="!isLoading" class="text-4xl font-black text-red-700">{{ outOfStockCount }}</div>
        <div v-else class="w-16 h-10 bg-red-200 rounded animate-pulse"></div>
      </div>
    </div>

    <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input v-model="searchQuery" type="text" placeholder="Search product name..." class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black" />
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-xs tracking-widest text-gray-400 uppercase border-b">
            <th class="pb-4 pl-2">Product</th>
            <th class="pb-4 text-center">Total Stock</th>
            <th class="pb-4">Active Batches (FIFO)</th>
            <th class="pb-4">Status</th>
            <th class="pb-4 pr-2 text-center">Action</th>
          </tr>
        </thead>
        
        <tbody v-if="isLoading">
          <tr v-for="i in 5" :key="`skel-${i}`" class="border-b border-gray-50">
            <td class="py-6 pl-2">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
                <div class="space-y-2"><div class="w-32 h-4 bg-gray-200 rounded animate-pulse"></div></div>
              </div>
            </td>
            <td class="py-6 text-center"><div class="w-10 h-6 mx-auto bg-gray-200 rounded animate-pulse"></div></td>
            <td class="py-6"><div class="w-48 h-10 bg-gray-100 rounded-lg animate-pulse"></div></td>
            <td class="py-6"><div class="w-20 h-5 bg-gray-200 rounded-full animate-pulse"></div></td>
            <td class="py-6 pr-2 text-center"><div class="w-24 h-8 mx-auto bg-gray-200 rounded-lg animate-pulse"></div></td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr v-for="product in filteredProducts" :key="product.id" class="align-top transition border-b border-gray-50 hover:bg-gray-50">
            <td class="py-4 pl-2 w-[25%]">
              <div class="flex items-center gap-4">
                <img :src="product.image || defaultBagIcon" class="object-cover w-12 h-12 border border-gray-100 rounded-lg shadow-sm" />
                <div>
                  <p class="text-sm font-bold text-gray-900">{{ product.name }}</p>
                  <p class="text-[10px] text-gray-400 font-mono">{{ product.code }}</p>
                </div>
              </div>
            </td>
            
            <td class="py-4 text-center w-[15%]">
              <span class="text-xl font-black text-gray-900">{{ product.stock }}</span>
              <span class="ml-1 text-xs text-gray-400">pcs</span>
            </td>

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
                      <span :class="batch.is_legacy ? 'text-gray-500' : 'text-blue-600'" class="block font-mono font-bold">
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
                  <div class="px-3 py-1 font-bold text-gray-800 bg-gray-100 rounded">
                    {{ batch.quantity }} pcs
                  </div>
                </div>
              </div>
              <div v-else class="p-2 text-xs italic text-center text-gray-400 border border-dashed rounded-lg bg-gray-50">
                No active batches.
              </div>
            </td>

            <td class="py-4 w-[15%]">
              <span v-if="product.stock >= 10" class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">Safe</span>
              <span v-else-if="product.stock > 0" class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">Low Stock</span>
              <span v-else class="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest animate-pulse">Out of Stock</span>
            </td>

            <td class="py-4 text-center pr-2 w-[10%]">
              <button @click="openAddStockModal(product)" class="w-full px-4 py-2 text-xs font-bold text-white transition bg-black shadow-sm hover:bg-gray-800 rounded-xl whitespace-nowrap">
                + Add Batch
              </button>
            </td>
          </tr>
          
          <tr v-if="filteredProducts.length === 0">
             <td colspan="5" class="py-12 italic text-center text-gray-400">No products found matching "{{ searchQuery }}".</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-[2rem] shadow-2xl p-8 w-full max-w-sm relative">
        <button @click="showModal = false" class="absolute text-gray-400 top-6 right-6 hover:text-black">✕</button>
        <h2 class="mb-2 text-xl font-bold text-gray-900">Receive New Stock</h2>
        <p class="mb-6 text-xs text-gray-500">Add a new stock batch for <span class="font-bold text-black">{{ selectedProduct?.name }}</span>.</p>

        <form @submit.prevent="submitAddStock" class="space-y-4">
          <div>
            <label class="block mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Quantity Arrived</label>
            <input v-model="newQuantity" type="number" min="1" class="w-full p-4 text-xl font-black text-center border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black" required />
          </div>
          <button type="submit" :disabled="isSubmitting" class="w-full py-3 font-bold text-white transition bg-blue-600 shadow-md hover:bg-blue-700 disabled:bg-blue-300 rounded-xl shadow-blue-500/30">
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
</style> -->

<!-- <template>
  <div
    class="relative bg-white shadow-sm p-6 md:p-8 border border-gray-100 rounded-2xl min-h-[600px] animate-fade-in"
  >
    <div
      class="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Stock Management (FIFO)</h1>
        <p class="text-sm text-gray-500">
          Monitor and add stock batches to your products.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4 md:gap-6">
      <div class="p-4 border border-gray-100 bg-gray-50 rounded-2xl md:p-6">
        <p
          class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase"
        >
          Total Products
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-black md:text-4xl">
          {{ products.length }}
        </div>
        <div v-else class="w-16 h-8 bg-gray-200 rounded md:h-10 animate-pulse"></div>
      </div>

      <div class="p-4 border border-green-100 bg-green-50/50 rounded-2xl md:p-6">
        <p
          class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-green-600 uppercase"
        >
          Safe (≥ 10)
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-green-700 md:text-4xl">
          {{ safeStockCount }}
        </div>
        <div v-else class="w-16 h-8 bg-green-200 rounded md:h-10 animate-pulse"></div>
      </div>

      <div class="p-4 border bg-amber-50/50 rounded-2xl border-amber-100 md:p-6">
        <p
          class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-amber-600 uppercase"
        >
          Low (< 10)
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-amber-700 md:text-4xl">
          {{ lowStockCount }}
        </div>
        <div v-else class="w-16 h-8 rounded bg-amber-200 md:h-10 animate-pulse"></div>
      </div>

      <div class="p-4 border border-red-100 bg-red-50/50 rounded-2xl md:p-6">
        <p
          class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-red-600 uppercase"
        >
          Out of Stock
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-red-700 md:text-4xl">
          {{ outOfStockCount }}
        </div>
        <div v-else class="w-16 h-8 bg-red-200 rounded md:h-10 animate-pulse"></div>
      </div>
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

      <div class="w-full md:w-80">
        <div class="relative">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search product code or name..."
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
            <th class="p-4 font-medium">Product</th>
            <th class="p-4 font-medium text-center">Total Stock</th>
            <th class="p-4 font-medium">Active Batches (FIFO)</th>
            <th class="p-4 font-medium">Status</th>
            <th class="p-4 font-medium text-center">Action</th>
          </tr>
        </thead>

        <tbody v-if="isLoading">
          <tr
            v-for="i in itemsPerPage > 5 ? 5 : itemsPerPage"
            :key="`skel-${i}`"
            class="border-b border-gray-50"
          >
            <td class="p-4">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0"
                ></div>
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
              No products found matching your criteria.
            </td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr
            v-for="product in paginatedProducts"
            :key="product.id"
            class="align-top transition border-b hover:bg-gray-50 border-gray-50"
          >
            <td class="p-4 w-[25%]">
              <div class="flex items-center gap-4">
                <img
                  :src="getImgUrl(product.image)"
                  @error="handleImgError"
                  class="object-cover w-12 h-12 border border-gray-100 rounded-lg shadow-sm shrink-0"
                />
                <div>
                  <p class="text-sm font-bold text-gray-900">{{ product.name }}</p>
                  <p class="text-[10px] text-gray-400 font-mono mt-0.5">
                    {{ product.code }}
                  </p>
                </div>
              </div>
            </td>

            <td class="p-4 text-center w-[15%]">
              <span class="text-xl font-black text-gray-900">{{ product.stock }}</span>
              <span class="ml-1 text-xs text-gray-400">pcs</span>
            </td>

            <td class="p-4 w-[35%]">
              <div
                v-if="product.display_stocks && product.display_stocks.length > 0"
                class="flex flex-col gap-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar"
              >
                <div
                  v-for="(batch, index) in product.display_stocks"
                  :key="batch.id"
                  :class="[
                    'flex justify-between items-center bg-white border rounded-lg p-2 shadow-sm text-xs transition-colors shrink-0',
                    index === 0 ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200',
                  ]"
                >
                  <div>
                    <div class="flex items-center gap-2 mb-0.5">
                      <span
                        :class="batch.is_legacy ? 'text-gray-500' : 'text-blue-600'"
                        class="block font-mono font-bold"
                      >
                        {{ batch.batch_code }}
                      </span>

                      <span
                        v-if="index === 0"
                        class="bg-blue-600 text-white text-[8px] px-1.5 py-0.5 rounded uppercase tracking-widest font-bold shadow-sm animate-pulse"
                      >
                        Next to Use
                      </span>
                      <span
                        v-else-if="
                          index === product.display_stocks.length - 1 &&
                          product.display_stocks.length > 1 &&
                          !batch.is_legacy
                        "
                        class="bg-green-100 text-green-700 text-[8px] px-1.5 py-0.5 rounded uppercase tracking-widest font-bold border border-green-200"
                      >
                        Newest
                      </span>
                    </div>

                    <span class="text-[9px] text-gray-400">
                      {{
                        batch.is_legacy
                          ? "Legacy System Stock"
                          : formatDate(batch.created_at)
                      }}
                    </span>
                  </div>
                  <div class="px-3 py-1 font-bold text-gray-800 bg-gray-100 rounded">
                    {{ batch.quantity }} pcs
                  </div>
                </div>
              </div>
              <div
                v-else
                class="p-2 text-xs italic text-center text-gray-400 border border-dashed rounded-lg bg-gray-50"
              >
                No active batches.
              </div>
            </td>

            <td class="p-4 w-[15%]">
              <span
                v-if="product.stock >= 10"
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest"
                >Safe</span
              >
              <span
                v-else-if="product.stock > 0"
                class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest"
                >Low Stock</span
              >
              <span
                v-else
                class="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest animate-pulse"
                >Out of Stock</span
              >
            </td>

            <td class="p-4 text-center w-[10%]">
              <button
                @click="openAddStockModal(product)"
                class="w-full px-4 py-2 text-xs font-bold text-white transition bg-black shadow-sm rounded-xl hover:bg-gray-800 whitespace-nowrap"
              >
                + Add Batch
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
        <span class="font-bold text-gray-900">{{ totalItems }}</span> products
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
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div class="relative w-full max-w-sm p-8 bg-white shadow-2xl rounded-[2rem]">
        <button
          @click="showModal = false"
          class="absolute text-gray-400 top-6 right-6 hover:text-black"
        >
          ✕
        </button>
        <h2 class="mb-2 text-xl font-bold text-gray-900">Receive New Stock</h2>
        <p class="mb-6 text-xs text-gray-500">
          Add a new stock batch for
          <span class="font-bold text-black">{{ selectedProduct?.name }}</span
          >.
        </p>

        <form @submit.prevent="submitAddStock" class="space-y-4">
          <div>
            <label
              class="block mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase"
              >Quantity Arrived</label
            >
            <input
              v-model="newQuantity"
              type="number"
              min="1"
              class="w-full p-4 text-xl font-black text-center border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3 font-bold text-white transition bg-blue-600 shadow-md rounded-xl hover:bg-blue-700 disabled:bg-blue-300 shadow-blue-500/30"
          >
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

// Data Utama
const products = ref([]);
const isLoading = ref(true);

// Data Filter & Pagination
const filters = ref({
  search: "",
  status: "All",
});
const currentPage = ref(1);
const itemsPerPage = ref(10);

// Data Modal
const showModal = ref(false);
const isSubmitting = ref(false);
const selectedProduct = ref(null);
const newQuantity = ref(1);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// --- SUMMARY CARDS ---
const safeStockCount = computed(() => products.value.filter((p) => p.stock >= 10).length);
const lowStockCount = computed(
  () => products.value.filter((p) => p.stock > 0 && p.stock < 10).length
);
const outOfStockCount = computed(
  () => products.value.filter((p) => p.stock === 0).length
);

// --- FETCH DATA ---
const fetchStocks = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/product-stocks`, axiosConfig);

    const processedProducts = res.data.map((product) => {
      let batches = [];
      if (product.stocks && Array.isArray(product.stocks)) {
        batches = [...product.stocks].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
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
    Swal.fire("Error", "Failed to load stock data", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

// --- LOGIKA FILTER (CLIENT-SIDE) ---
const filteredProducts = computed(() => {
  let result = products.value;

  // Filter Search (Name atau Code)
  if (filters.value.search) {
    const q = filters.value.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
    );
  }

  // Filter Status
  if (filters.value.status !== "All") {
    if (filters.value.status === "Safe") result = result.filter((p) => p.stock >= 10);
    else if (filters.value.status === "Low")
      result = result.filter((p) => p.stock > 0 && p.stock < 10);
    else if (filters.value.status === "Out") result = result.filter((p) => p.stock === 0);
  }

  return result;
});

// --- LOGIKA PAGINATION ---
const totalItems = computed(() => filteredProducts.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
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

const changePage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

// Reset ke halaman 1 jika filter berubah
watch([() => filters.value.search, () => filters.value.status, itemsPerPage], () => {
  currentPage.value = 1;
});

// --- MODAL ACTION ---
const openAddStockModal = (product) => {
  selectedProduct.value = product;
  newQuantity.value = 1;
  showModal.value = true;
};

const submitAddStock = async () => {
  isSubmitting.value = true;
  try {
    await axios.post(
      `${BASE_URL}/admin/product-stocks/${selectedProduct.value.id}`,
      { quantity: newQuantity.value },
      axiosConfig
    );
    showModal.value = false;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Stock batch added!",
      showConfirmButton: false,
      timer: 1500,
    });
    fetchStocks();
  } catch (err) {
    Swal.fire("Error", "Failed to add stock", "error");
  } finally {
    isSubmitting.value = false;
  }
};

// --- HELPER FORMATTING ---
const getImgUrl = (path) => {
  if (!path) return defaultBagIcon;
  if (path.startsWith("http")) return path;
  const baseUrlFixed = BASE_URL.replace("/api", "");
  return `${baseUrlFixed}/storage/${path}`;
};

const handleImgError = (e) => {
  e.target.src = defaultBagIcon;
};

const formatDate = (date) =>
  new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

onMounted(fetchStocks);
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

/* Custom Scrollbar untuk kolom Batch */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style> -->

<template>
  <div
    class="relative bg-white shadow-sm p-6 md:p-8 border border-gray-100 rounded-2xl min-h-[600px] animate-fade-in"
  >
    <div
      class="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Stock Management (FIFO)</h1>
        <p class="text-sm text-gray-500">
          Monitor and add stock batches to your products.
        </p>
      </div>
      <!-- [BARU] Tombol Export Excel -->
      <button
        @click="exportToExcel"
        class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-green-700 transition bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 shadow-sm"
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
        Export Excel
      </button>
    </div>

    <!-- ... (Bagian Summary Cards Tetap Sama) ... -->
    <div class="grid grid-cols-2 gap-4 mb-8 md:grid-cols-4 md:gap-6">
      <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100 md:p-6">
        <p
          class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-gray-500 uppercase"
        >
          Total Products
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-black md:text-4xl">
          {{ products.length }}
        </div>
        <div v-else class="w-16 h-8 bg-gray-200 rounded md:h-10 animate-pulse"></div>
      </div>

      <div class="p-4 border bg-green-50/50 rounded-2xl border-green-100 md:p-6">
        <p
          class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-green-600 uppercase"
        >
          Safe (≥ 10)
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-green-700 md:text-4xl">
          {{ safeStockCount }}
        </div>
        <div v-else class="w-16 h-8 bg-green-200 rounded md:h-10 animate-pulse"></div>
      </div>

      <div class="p-4 border bg-amber-50/50 rounded-2xl border-amber-100 md:p-6">
        <p
          class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-amber-600 uppercase"
        >
          Low (< 10)
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-amber-700 md:text-4xl">
          {{ lowStockCount }}
        </div>
        <div v-else class="w-16 h-8 bg-amber-200 rounded md:h-10 animate-pulse"></div>
      </div>

      <div class="p-4 border bg-red-50/50 rounded-2xl border-red-100 md:p-6">
        <p
          class="mb-1 text-[10px] md:text-xs font-bold tracking-widest text-red-600 uppercase"
        >
          Out of Stock
        </p>
        <div v-if="!isLoading" class="text-3xl font-black text-red-700 md:text-4xl">
          {{ outOfStockCount }}
        </div>
        <div v-else class="w-16 h-8 bg-red-200 rounded md:h-10 animate-pulse"></div>
      </div>
    </div>

    <!-- ... (Sisa Template Tetap Sama Persis) ... -->
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

      <div class="w-full md:w-80">
        <div class="relative">
          <input
            v-model="filters.search"
            type="text"
            placeholder="Search product code or name..."
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

    <!-- Data Table -->
    <div class="overflow-x-auto border border-gray-100 rounded-xl">
      <table class="w-full text-left border-collapse bg-white/50">
        <thead>
          <tr
            class="text-xs tracking-widest text-gray-400 uppercase bg-gray-50/50 border-b border-gray-100"
          >
            <th class="p-4 font-medium">Product</th>
            <th class="p-4 font-medium text-center">Total Stock</th>
            <th class="p-4 font-medium">Active Batches (FIFO)</th>
            <th class="p-4 font-medium">Status</th>
            <th class="p-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody v-if="isLoading">
          <tr
            v-for="i in itemsPerPage > 5 ? 5 : itemsPerPage"
            :key="`skel-${i}`"
            class="border-b border-gray-50"
          >
            <td class="p-4">
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-gray-200 rounded-lg animate-pulse shrink-0"
                ></div>
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
              No products found matching your criteria.
            </td>
          </tr>
        </tbody>
        <tbody v-else class="text-gray-600">
          <tr
            v-for="product in paginatedProducts"
            :key="product.id"
            class="transition border-b hover:bg-gray-50 border-gray-50 align-top"
          >
            <td class="p-4 w-[25%]">
              <div class="flex items-center gap-4">
                <img
                  :src="getImgUrl(product.image)"
                  @error="handleImgError"
                  class="object-cover w-12 h-12 border border-gray-100 rounded-lg shadow-sm shrink-0"
                />
                <div>
                  <p class="text-sm font-bold text-gray-900">{{ product.name }}</p>
                  <p class="text-[10px] text-gray-400 font-mono mt-0.5">
                    {{ product.code }}
                  </p>
                </div>
              </div>
            </td>
            <td class="p-4 text-center w-[15%]">
              <span class="text-xl font-black text-gray-900">{{ product.stock }}</span>
              <span class="ml-1 text-xs text-gray-400">pcs</span>
            </td>
            <td class="p-4 w-[35%]">
              <div
                v-if="product.display_stocks && product.display_stocks.length > 0"
                class="flex flex-col gap-2 max-h-[150px] overflow-y-auto pr-2 custom-scrollbar"
              >
                <div
                  v-for="(batch, index) in product.display_stocks"
                  :key="batch.id"
                  :class="[
                    'flex justify-between items-center bg-white border rounded-lg p-2 shadow-sm text-xs transition-colors shrink-0',
                    index === 0 ? 'border-blue-300 bg-blue-50/50' : 'border-gray-200',
                  ]"
                >
                  <div>
                    <div class="flex items-center gap-2 mb-0.5">
                      <span
                        :class="batch.is_legacy ? 'text-gray-500' : 'text-blue-600'"
                        class="block font-mono font-bold"
                        >{{ batch.batch_code }}</span
                      >
                      <span
                        v-if="index === 0"
                        class="bg-blue-600 text-white text-[8px] px-1.5 py-0.5 rounded uppercase tracking-widest font-bold shadow-sm animate-pulse"
                        >Next to Use</span
                      >
                      <span
                        v-else-if="
                          index === product.display_stocks.length - 1 &&
                          product.display_stocks.length > 1 &&
                          !batch.is_legacy
                        "
                        class="bg-green-100 text-green-700 text-[8px] px-1.5 py-0.5 rounded uppercase tracking-widest font-bold border border-green-200"
                        >Newest</span
                      >
                    </div>
                    <span class="text-[9px] text-gray-400">{{
                      batch.is_legacy
                        ? "Legacy System Stock"
                        : formatDate(batch.created_at)
                    }}</span>
                  </div>
                  <div class="px-3 py-1 font-bold text-gray-800 bg-gray-100 rounded">
                    {{ batch.quantity }} pcs
                  </div>
                </div>
              </div>
              <div
                v-else
                class="p-2 text-xs italic text-center text-gray-400 border border-dashed rounded-lg bg-gray-50"
              >
                No active batches.
              </div>
            </td>
            <td class="p-4 w-[15%]">
              <span
                v-if="product.stock >= 10"
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest"
                >Safe</span
              >
              <span
                v-else-if="product.stock > 0"
                class="bg-amber-100 text-amber-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest"
                >Low Stock</span
              >
              <span
                v-else
                class="bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest animate-pulse"
                >Out of Stock</span
              >
            </td>
            <td class="p-4 text-center w-[10%]">
              <button
                @click="openAddStockModal(product)"
                class="w-full px-4 py-2 text-xs font-bold text-white transition bg-black shadow-sm rounded-xl hover:bg-gray-800 whitespace-nowrap"
              >
                + Add Batch
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div
      v-if="!isLoading && totalItems > 0"
      class="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row"
    >
      <p class="text-sm text-gray-500">
        Showing <span class="font-bold text-gray-900">{{ showingStart }}</span> to
        <span class="font-bold text-gray-900">{{ showingEnd }}</span> of
        <span class="font-bold text-gray-900">{{ totalItems }}</span> products
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

    <!-- Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div class="relative w-full max-w-sm p-8 bg-white shadow-2xl rounded-[2rem]">
        <button
          @click="showModal = false"
          class="absolute text-gray-400 top-6 right-6 hover:text-black"
        >
          ✕
        </button>
        <h2 class="mb-2 text-xl font-bold text-gray-900">Receive New Stock</h2>
        <p class="mb-6 text-xs text-gray-500">
          Add a new stock batch for
          <span class="font-bold text-black">{{ selectedProduct?.name }}</span
          >.
        </p>
        <form @submit.prevent="submitAddStock" class="space-y-4">
          <div>
            <label
              class="block mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase"
              >Quantity Arrived</label
            >
            <input
              v-model="newQuantity"
              type="number"
              min="1"
              class="w-full p-4 text-xl font-black text-center border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
              required
            />
          </div>
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full py-3 font-bold text-white transition bg-blue-600 shadow-md rounded-xl hover:bg-blue-700 disabled:bg-blue-300 shadow-blue-500/30"
          >
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
const lowStockCount = computed(
  () => products.value.filter((p) => p.stock > 0 && p.stock < 10).length
);
const outOfStockCount = computed(
  () => products.value.filter((p) => p.stock === 0).length
);

const fetchStocks = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/product-stocks`, axiosConfig);
    const processedProducts = res.data.map((product) => {
      let batches = [];
      if (product.stocks && Array.isArray(product.stocks)) {
        batches = [...product.stocks].sort(
          (a, b) => new Date(a.created_at) - new Date(b.created_at)
        );
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
    Swal.fire("Error", "Failed to load stock data", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const filteredProducts = computed(() => {
  let result = products.value;
  if (filters.value.search) {
    const q = filters.value.search.toLowerCase();
    result = result.filter(
      (p) => p.name.toLowerCase().includes(q) || p.code.toLowerCase().includes(q)
    );
  }
  if (filters.value.status !== "All") {
    if (filters.value.status === "Safe") result = result.filter((p) => p.stock >= 10);
    else if (filters.value.status === "Low")
      result = result.filter((p) => p.stock > 0 && p.stock < 10);
    else if (filters.value.status === "Out") result = result.filter((p) => p.stock === 0);
  }
  return result;
});

// [BARU] Fungsi Native Export Excel (CSV)
const exportToExcel = () => {
  if (filteredProducts.value.length === 0) {
    Swal.fire("Peringatan", "Tidak ada data untuk diekspor.", "warning");
    return;
  }

  // 1. Definisikan Header
  const headers = [
    "Product Code",
    "Product Name",
    "Total Stock (pcs)",
    "Status",
    "Total Active Batches",
  ];

  // 2. Map Data sesuai Filter
  const rows = filteredProducts.value.map((p) => {
    let status = "Out of Stock";
    if (p.stock >= 10) status = "Safe";
    else if (p.stock > 0) status = "Low Stock";

    // Escape string dengan tanda kutip untuk mencegah koma merusak kolom CSV
    return [
      `"${p.code}"`,
      `"${p.name}"`,
      p.stock,
      `"${status}"`,
      p.display_stocks ? p.display_stocks.length : 0,
    ];
  });

  // 3. Gabungkan Header dan Baris Data menjadi string CSV
  const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  // 4. Buat Blob dan Paksa Download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  const date = new Date().toISOString().split("T")[0];
  link.setAttribute("href", url);
  link.setAttribute("download", `Solher_Stock_Report_${date}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    title: "Excel file downloaded!",
    showConfirmButton: false,
    timer: 1500,
  });
};

const totalItems = computed(() => filteredProducts.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
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
watch([() => filters.value.search, () => filters.value.status, itemsPerPage], () => {
  currentPage.value = 1;
});

const openAddStockModal = (product) => {
  selectedProduct.value = product;
  newQuantity.value = 1;
  showModal.value = true;
};
const submitAddStock = async () => {
  isSubmitting.value = true;
  try {
    await axios.post(
      `${BASE_URL}/admin/product-stocks/${selectedProduct.value.id}`,
      { quantity: newQuantity.value },
      axiosConfig
    );
    showModal.value = false;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Stock batch added!",
      showConfirmButton: false,
      timer: 1500,
    });
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
  const baseUrlFixed = BASE_URL.replace("/api", "");
  return `${baseUrlFixed}/storage/${path}`;
};
const handleImgError = (e) => {
  e.target.src = defaultBagIcon;
};
const formatDate = (date) =>
  new Date(date).toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

onMounted(fetchStocks);
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
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style>
