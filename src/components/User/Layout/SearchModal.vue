<!-- <template>
  <div
    class="z-[110] fixed inset-0 flex justify-center items-start px-6 pt-[73px]"
    @click="$emit('close')"
  >
    <div class="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

    <div
      @click.stop
      class="relative flex flex-col bg-white shadow-2xl border border-gray-100 rounded-b-[2rem] w-full max-w-2xl max-h-[75vh] overflow-hidden animate-slide-down"
    >
      <div class="bg-gray-50 px-8 py-6 border-gray-100 border-b">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-4 w-5 h-5 text-gray-400"
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
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search products..."
            class="flex-grow bg-transparent border-none outline-none focus:ring-0 font-serif text-base placeholder-gray-300"
            ref="searchInputRef"
          />
          <button
            @click="$emit('close')"
            class="ml-4 text-gray-400 hover:text-black transition-all"
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
      </div>

      <div class="flex-grow px-8 py-8 overflow-y-auto custom-scrollbar">
        <div v-if="recentlyViewed.length > 0" class="mb-10">
          <div class="flex justify-between items-end mb-4">
            <h3
              class="font-bold text-[9px] text-gray-400 uppercase tracking-[0.25em]"
            >
              Recently Viewed
            </h3>
            <button
              @click="clearRecentlyViewed"
              class="font-bold text-[9px] text-gray-300 hover:text-red-500 uppercase tracking-widest transition-colors"
            >
              Clear
            </button>
          </div>
          <div class="gap-4 grid grid-cols-3 md:grid-cols-4">
            <div
              v-for="item in recentlyViewed"
              :key="item.id"
              class="group cursor-pointer"
              @click="navigateToProduct(item.id)"
            >
              <div
                class="relative bg-gray-50 shadow-sm mb-2 rounded-xl aspect-square overflow-hidden"
              >
                <img
                  :src="item.image"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 class="font-bold text-[9px] text-gray-900 truncate uppercase">
                {{ item.name }}
              </h4>
            </div>
          </div>
        </div>

        <div>
          <h3
            class="mb-4 font-bold text-[9px] text-gray-400 uppercase tracking-[0.25em]"
          >
            You May Also Like
          </h3>
          <div
            v-if="randomProducts.length === 0"
            class="gap-4 grid grid-cols-3 md:grid-cols-4"
          >
            <div
              v-for="i in 6"
              :key="i"
              class="animate-pulse bg-gray-100 rounded-xl aspect-square"
            ></div>
          </div>
          <div class="gap-4 grid grid-cols-3 md:grid-cols-4">
            <div
              v-for="product in randomProducts"
              :key="product.id"
              class="group cursor-pointer"
              @click="navigateToProduct(product.id)"
            >
              <div
                class="relative bg-gray-50 shadow-sm mb-2 rounded-xl aspect-square overflow-hidden"
              >
                <img
                  :src="product.image"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 class="font-bold text-[9px] text-gray-900 truncate uppercase">
                {{ product.name }}
              </h4>
              <p class="mt-0.5 text-[8px] text-gray-400">
                {{ formatPrice(product.discount_price ?? product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../../config/api";

const emit = defineEmits(["close"]);

const router = useRouter();

/* ======================
   STATE
====================== */
const searchInput = ref("");
const searchInputRef = ref(null);

const recentlyViewed = ref([]);
const randomProducts = ref([]);
const allProducts = ref([]); // Untuk penampung semua produk dari API

const loadCachedRandomProducts = () => {
  const cached = localStorage.getItem("random_products");
  randomProducts.value = cached ? JSON.parse(cached) : [];
};

/* ======================
   RECENTLY VIEWED
====================== */
const loadRecentlyViewed = () => {
  const data = localStorage.getItem("recently_viewed");
  recentlyViewed.value = data ? JSON.parse(data) : [];
};

const clearRecentlyViewed = () => {
  localStorage.removeItem("recently_viewed");
  recentlyViewed.value = [];
};

/* ======================
   NAVIGATION
====================== */
const navigateToProduct = (id) => {
  emit("close");
  router.push(`/product/${id}`);
};

/* ======================
   FORMAT
====================== */
const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(v);

const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);

    // 🔍 ambil data produk dengan aman
    const products =
      res.data?.data?.data || // pagination
      res.data?.data || // normal resource
      res.data || // plain array
      [];

    allProducts.value = Array.isArray(products) ? products : [];

    getRandomProducts();
  } catch (err) {
    console.error("Search fetch failed", err);
    allProducts.value = [];
  }
};

// const getRandomProducts = () => {
//   if (!Array.isArray(allProducts.value) || allProducts.value.length === 0) {
//     randomProducts.value = [];
//     return;
//   }

//   const shuffled = [...allProducts.value].sort(() => 0.5 - Math.random());
//   randomProducts.value = shuffled.slice(0, 6);
// };

const getRandomProducts = () => {
  if (!Array.isArray(allProducts.value) || allProducts.value.length === 0) {
    return;
  }

  const shuffled = [...allProducts.value].sort(() => 0.5 - Math.random());
  randomProducts.value = shuffled.slice(0, 6);

  localStorage.setItem("random_products", JSON.stringify(randomProducts.value));
};

/* ======================
   LIFECYCLE
====================== */
onMounted(() => {
  loadRecentlyViewed();
  loadCachedRandomProducts();
  // fetchRandomProducts();
  fetchAllProducts();
  searchInputRef.value?.focus();
});
</script> -->

<template>
  <div
    class="z-[110] fixed inset-0 flex justify-center items-start px-6 pt-[73px]"
    @click="$emit('close')"
  >
    <div class="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

    <div
      @click.stop
      class="relative flex flex-col bg-white shadow-2xl border border-gray-100 rounded-b-[2rem] w-full max-w-2xl max-h-[75vh] overflow-hidden animate-slide-down"
    >
      <div class="bg-gray-50 px-8 py-6 border-gray-100 border-b">
        <div class="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="mr-4 w-5 h-5 text-gray-400"
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
          <input
            v-model="searchInput"
            type="text"
            placeholder="Search products..."
            class="flex-grow bg-transparent border-none outline-none focus:ring-0 font-serif text-base placeholder-gray-300"
            ref="searchInputRef"
          />
          <button
            v-if="searchInput"
            @click="searchInput = ''"
            class="ml-2 text-gray-300 hover:text-red-500 transition-all mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
          <button
            @click="$emit('close')"
            class="ml-2 pl-4 border-l border-gray-200 text-gray-400 hover:text-black transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      </div>

      <div class="flex-grow px-8 py-8 overflow-y-auto custom-scrollbar">
        
        <div v-if="searchInput">
          <h3 class="mb-4 font-bold text-[9px] text-gray-400 uppercase tracking-[0.25em]">
            Search Results
          </h3>
          
          <div v-if="filteredSearchResults.length > 0" class="gap-4 grid grid-cols-3 md:grid-cols-4">
            <div
              v-for="product in filteredSearchResults.slice(0, 8)"
              :key="product.id"
              class="group cursor-pointer"
              @click="navigateToProduct(product.id)"
            >
              <div class="relative bg-gray-50 shadow-sm mb-2 rounded-xl aspect-square overflow-hidden">
                <img
                  :src="product.image"
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h4 class="font-bold text-[9px] text-gray-900 truncate uppercase">
                {{ product.name }}
              </h4>
              <p class="mt-0.5 text-[8px] text-gray-400">
                {{ formatPrice(product.discount_price ?? product.price) }}
              </p>
            </div>
          </div>
          
          <div v-else class="py-10 text-center text-gray-400 font-serif italic">
            No products found for "{{ searchInput }}".
          </div>

          <div class="mt-8 border-t border-gray-100 pt-6 text-center">
            <button 
              @click="viewAllResults"
              class="bg-black hover:bg-gray-800 text-white font-bold text-[10px] uppercase tracking-widest px-8 py-3 rounded-full transition-colors"
            >
              View All Results
            </button>
          </div>
        </div>

        <div v-else>
          <div v-if="recentlyViewed.length > 0" class="mb-10">
            <div class="flex justify-between items-end mb-4">
              <h3 class="font-bold text-[9px] text-gray-400 uppercase tracking-[0.25em]">
                Recently Viewed
              </h3>
              <button
                @click="clearRecentlyViewed"
                class="font-bold text-[9px] text-gray-300 hover:text-red-500 uppercase tracking-widest transition-colors"
              >
                Clear
              </button>
            </div>
            <div class="gap-4 grid grid-cols-3 md:grid-cols-4">
              <div
                v-for="item in recentlyViewed"
                :key="item.id"
                class="group cursor-pointer"
                @click="navigateToProduct(item.id)"
              >
                <div class="relative bg-gray-50 shadow-sm mb-2 rounded-xl aspect-square overflow-hidden">
                  <img
                    :src="item.image"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 class="font-bold text-[9px] text-gray-900 truncate uppercase">
                  {{ item.name }}
                </h4>
              </div>
            </div>
          </div>

          <div>
            <h3 class="mb-4 font-bold text-[9px] text-gray-400 uppercase tracking-[0.25em]">
              You May Also Like
            </h3>
            <div v-if="randomProducts.length === 0" class="gap-4 grid grid-cols-3 md:grid-cols-4">
              <div v-for="i in 6" :key="i" class="animate-pulse bg-gray-100 rounded-xl aspect-square"></div>
            </div>
            <div class="gap-4 grid grid-cols-3 md:grid-cols-4">
              <div
                v-for="product in randomProducts"
                :key="product.id"
                class="group cursor-pointer"
                @click="navigateToProduct(product.id)"
              >
                <div class="relative bg-gray-50 shadow-sm mb-2 rounded-xl aspect-square overflow-hidden">
                  <img
                    :src="product.image"
                    class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 class="font-bold text-[9px] text-gray-900 truncate uppercase">
                  {{ product.name }}
                </h4>
                <p class="mt-0.5 text-[8px] text-gray-400">
                  {{ formatPrice(product.discount_price ?? product.price) }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../../config/api";

const emit = defineEmits(["close"]);
const router = useRouter();

const searchInput = ref("");
const searchInputRef = ref(null);

const recentlyViewed = ref([]);
const randomProducts = ref([]);
const allProducts = ref([]); 

// Logika Pencarian Lokal (Real-time)
const filteredSearchResults = computed(() => {
  if (!searchInput.value) return [];
  const query = searchInput.value.toLowerCase();
  return allProducts.value.filter(
    (product) => 
      product.name.toLowerCase().includes(query) || 
      product.category?.name.toLowerCase().includes(query)
  );
});

const loadCachedRandomProducts = () => {
  const cached = localStorage.getItem("random_products");
  randomProducts.value = cached ? JSON.parse(cached) : [];
};

const loadRecentlyViewed = () => {
  const data = localStorage.getItem("recently_viewed");
  recentlyViewed.value = data ? JSON.parse(data) : [];
};

const clearRecentlyViewed = () => {
  localStorage.removeItem("recently_viewed");
  recentlyViewed.value = [];
};

const navigateToProduct = (id) => {
  emit("close");
  router.push(`/product/${id}`);
};

// [BARU] Fungsi Lempar Hasil Pencarian ke Katalog
const viewAllResults = () => {
  emit("close");
  // Navigasi ke katalog dengan membawa query parameter 'search'
  router.push({ path: '/catalog', query: { search: searchInput.value } });
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(v);

const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    const products = res.data?.data?.data || res.data?.data || res.data || [];
    allProducts.value = Array.isArray(products) ? products : [];
    getRandomProducts();
  } catch (err) {
    allProducts.value = [];
  }
};

const getRandomProducts = () => {
  if (!Array.isArray(allProducts.value) || allProducts.value.length === 0) return;
  const shuffled = [...allProducts.value].sort(() => 0.5 - Math.random());
  randomProducts.value = shuffled.slice(0, 6);
  localStorage.setItem("random_products", JSON.stringify(randomProducts.value));
};

onMounted(() => {
  loadRecentlyViewed();
  loadCachedRandomProducts();
  fetchAllProducts();
  // Tambahkan sedikit timeout agar focus bekerja setelah animasi slide-down selesai
  setTimeout(() => {
    searchInputRef.value?.focus();
  }, 100);
});
</script>