<!-- <template>
  <div class="bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="mb-8 font-bold text-black text-3xl uppercase tracking-tight">
        Products
      </h1>

      <div class="flex md:flex-row flex-col justify-between gap-6 mb-12">
        <div class="relative w-full md:w-80">
          <span class="left-0 absolute inset-y-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search our collection..." 
            class="bg-white shadow-sm py-3 pr-4 pl-10 border-none rounded-full outline-none focus:ring-2 focus:ring-black w-full text-sm transition"
          />
        </div>

        <div class="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
          <button 
            @click="resetAllFilters"
            :class="[selectedCategory === '' && !showOnlySale ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100']"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            All
          </button>

          <button 
            @click="toggleSaleFilter"
            :class="[showOnlySale ? 'bg-red-600 text-white' : 'bg-white text-red-500 hover:bg-red-50']"
            class="shadow-sm px-6 py-2 border border-red-100 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            % Sale
          </button>

          <button 
            v-for="cat in categories" 
            :key="cat.id"
            @click="selectCategory(cat.name)"
            :class="[selectedCategory === cat.name && !showOnlySale ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-100']"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            {{ cat.name }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="paginatedProducts.length > 0">
      <div class="gap-x-4 gap-y-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 mx-auto max-w-7xl">
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="group cursor-pointer"
          @click="$router.push(`/product/${product.id}`)"
        >
          <div class="relative bg-white shadow-sm mb-4 rounded-sm aspect-square overflow-hidden">
            <img
              :src="product.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Product Image"
            />
            
            <div v-if="product.discount_price" class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter">
              -{{ calculateDiscount(product.price, product.discount_price) }}%
            </div>

            <div v-if="product.stock <= 3 && product.stock > 0" class="top-2 left-2 absolute bg-amber-500 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase">
              Low Stock
            </div>
          </div>

          <div class="space-y-1">
            <h3 class="font-medium text-[10px] text-gray-900 md:text-xs truncate uppercase tracking-widest">
              {{ product.name }}
            </h3>
            
            <div class="flex items-center gap-2">
              <template v-if="product.discount_price">
                <p class="font-bold text-red-600 text-xs md:text-sm">
                  {{ formatPrice(product.discount_price) }}
                </p>
                <p class="text-[10px] text-gray-400 md:text-xs line-through">
                  {{ formatPrice(product.price) }}
                </p>
              </template>
              <p v-else class="font-semibold text-gray-600 text-xs md:text-sm">
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-4 mt-20">
        <button @click="currentPage--" :disabled="currentPage === 1" class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span class="font-bold text-xs uppercase tracking-widest">Page {{ currentPage }} of {{ totalPages || 1 }}</span>
        <button @click="currentPage++" :disabled="currentPage === totalPages || totalPages === 0" class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <div v-else class="py-24 text-center">
      <p class="font-serif text-gray-400 text-xl italic">No items found matching your selection.</p>
      <button @click="resetAllFilters" class="mt-4 font-bold text-black text-sm underline uppercase tracking-widest">Reset All Filters</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const products = ref([]);
const categories = ref([]);

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false); 

const currentPage = ref(1);
const itemsPerPage = 12;

const fetchInitialData = async () => {
  try {
    const [prodRes, catRes] = await Promise.all([
      axios.get(`${BASE_URL}/products`),
      axios.get(`${BASE_URL}/guest/categories`)
    ]);
    products.value = prodRes.data;
    categories.value = catRes.data;
  } catch (error) {
    console.error("Error loading data:", error);
  }
};

const filteredProducts = computed(() => {
  return products.value.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === "" || p.category?.name === selectedCategory.value;
    const matchesSale = showOnlySale.value ? (p.discount_price !== null && p.discount_price > 0) : true;
    
    return matchesSearch && matchesCategory && matchesSale;
  });
});

const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage));
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const calculateDiscount = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

onMounted(fetchInitialData);
</script> -->

<!-- <template>
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <div
      v-if="isLoading"
      class="z-40 fixed inset-0 flex flex-col justify-center items-center bg-[#F3F4F6]/60 backdrop-blur-[2px]"
    >
      <div
        class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"
      ></div>
      <p
        class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse"
      >
        Loading Collection
      </p>
    </div>

    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="mb-8 font-bold text-black text-3xl uppercase tracking-tight">
        Products
      </h1>

      <div class="flex md:flex-row flex-col justify-between gap-6 mb-12">
        <div class="relative w-full md:w-80">
          <span
            class="left-0 absolute inset-y-0 flex items-center pl-3 text-gray-400"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search our collection..."
            class="bg-white shadow-sm py-3 pr-4 pl-10 border-none rounded-full outline-none focus:ring-2 focus:ring-black w-full text-sm transition"
          />
        </div>

        <div class="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
          <button
            @click="resetAllFilters"
            :class="[
              selectedCategory === '' && !showOnlySale
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100',
            ]"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            All
          </button>

          <button
            @click="toggleSaleFilter"
            :class="[
              showOnlySale
                ? 'bg-red-600 text-white'
                : 'bg-white text-red-500 hover:bg-red-50',
            ]"
            class="shadow-sm px-6 py-2 border border-red-100 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            % Sale
          </button>

          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectCategory(cat.category_name)"
            :class="[
              selectedCategory === cat.category_name && !showOnlySale
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100',
            ]"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            {{ cat.category_name }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="paginatedProducts.length > 0">
      <div
        class="gap-x-6 gap-y-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-7xl"
      >
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="group cursor-pointer"
          @click="$router.push(`/product/${product.id}`)"
        >
          <div
            class="relative bg-white shadow-sm mb-4 rounded-sm aspect-[4/5] overflow-hidden"
          >
            <img
              :src="product.image"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              alt="Product Image"
            />

            <div
              v-if="product.discount_price"
              class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter"
            >
              -{{ calculateDiscount(product.price, product.discount_price) }}%
            </div>

            <div
              v-if="product.stock <= 3 && product.stock > 0"
              class="top-2 left-2 absolute bg-amber-500 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase"
            >
              Low Stock
            </div>
          </div>

          <div class="space-y-2 text-center md:text-left">
            <h3
              class="font-medium text-xs text-gray-900 md:text-sm truncate uppercase tracking-widest"
            >
              {{ product.name }}
            </h3>

            <div
              class="flex justify-center md:justify-start items-center gap-2"
            >
              <template v-if="product.discount_price">
                <p class="font-bold text-red-600 text-sm md:text-base">
                  {{ formatPrice(product.discount_price) }}
                </p>
                <p class="text-xs text-gray-400 md:text-sm line-through">
                  {{ formatPrice(product.price) }}
                </p>
              </template>
              <p
                v-else
                class="font-semibold text-gray-600 text-sm md:text-base"
              >
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-center items-center gap-4 mt-20">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span class="font-bold text-xs uppercase tracking-widest"
          >Page {{ currentPage }} of {{ totalPages || 1 }}</span
        >
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages || totalPages === 0"
          class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-else-if="!isLoading" class="py-24 text-center">
      <p class="font-serif text-gray-400 text-xl italic">
        No items found matching your selection.
      </p>
      <button
        @click="resetAllFilters"
        class="mt-4 font-bold text-black text-sm underline uppercase tracking-widest"
      >
        Reset All Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useProductStore } from "../../composables/useProductStore";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const { state, fetchCatalogData } = useProductStore();

// const products = ref([]);
// const categories = ref([]);

const categories = computed(() => state.categories);
const isLoading = ref(false); // State baru untuk loading

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false);

const currentPage = ref(1);
const itemsPerPage = 12;

const initCatalog = async () => {
  if (!state.isCatalogLoaded) {
    isLoading.value = true;
    await fetchCatalogData();
    // Beri sedikit delay untuk UX loading pertama kali saja
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  } else {
    fetchCatalogData();
  }
};

const fetchInitialData = async () => {
  isLoading.value = true; // Mulai loading
  try {
    const [prodRes, catRes] = await Promise.all([
      axios.get(`${BASE_URL}/products`),
      axios.get(`${BASE_URL}/guest/categories`),
    ]);
    products.value = prodRes.data;
    categories.value = catRes.data.data;
  } catch (error) {
    console.error("Error loading data:", error);
  } finally {
    // Delay 500ms agar transisi halus
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

// Logika Filtering (Tetap sama)
// const filteredProducts = computed(() => {
//   return products.value.filter(p => {
//     const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
//     const matchesCategory = selectedCategory.value === "" || p.category?.name === selectedCategory.value;
//     const matchesSale = showOnlySale.value ? (p.discount_price !== null && p.discount_price > 0) : true;

//     return matchesSearch && matchesCategory && matchesSale;
//   });
// });

// const filteredProducts = computed(() => {
//   return state.catalogProducts.filter((p) => {
//     const matchesSearch = p.name
//       .toLowerCase()
//       .includes(searchQuery.value.toLowerCase());
//     const matchesCategory =
//       selectedCategory.value === "" ||
//       p.category?.name === selectedCategory.value;
//     const matchesSale = showOnlySale.value
//       ? p.discount_price !== null && p.discount_price > 0
//       : true;
//     return matchesSearch && matchesCategory && matchesSale;
//   });
// });

// Logika Filtering (Menggunakan state.catalogProducts)
const filteredProducts = computed(() => {
  // Pastikan state.catalogProducts ada isinya sebelum filter
  const sourceProducts = state.catalogProducts || [];

  return sourceProducts.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    // Perhatikan: Pastikan API mengembalikan 'category_name' atau 'category.name'
    // Sesuaikan logic ini dengan struktur JSON Anda
    const productCategory = p.category?.name || p.category_name;

    const matchesCategory =
      selectedCategory.value === "" ||
      productCategory === selectedCategory.value;

    const matchesSale = showOnlySale.value
      ? p.discount_price !== null && p.discount_price > 0
      : true;

    return matchesSearch && matchesCategory && matchesSale;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage),
);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const calculateDiscount = (price, discountPrice) => {
  return Math.round(((price - discountPrice) / price) * 100);
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

onMounted(initCatalog);
</script> -->

<!-- <template>
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <div
      v-if="isLoading"
      class="z-40 fixed inset-0 flex flex-col justify-center items-center bg-[#F3F4F6]/60 backdrop-blur-[2px]"
    >
      <div
        class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"
      ></div>
      <p
        class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse"
      >
        Loading Collection
      </p>
    </div>

    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="mb-8 font-bold text-black text-3xl uppercase tracking-tight">
        Products
      </h1>

      <div class="flex md:flex-row flex-col justify-between gap-6 mb-12">
        <div class="relative w-full md:w-80">
          <span
            class="left-0 absolute inset-y-0 flex items-center pl-3 text-gray-400"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search our collection..."
            class="bg-white shadow-sm py-3 pr-4 pl-10 border-none rounded-full outline-none focus:ring-2 focus:ring-black w-full text-sm transition"
          />
        </div>

        <div class="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
          <button
            @click="resetAllFilters"
            :class="[
              selectedCategory === '' && !showOnlySale
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100',
            ]"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            All
          </button>
          <button
            @click="toggleSaleFilter"
            :class="[
              showOnlySale
                ? 'bg-red-600 text-white'
                : 'bg-white text-red-500 hover:bg-red-50',
            ]"
            class="shadow-sm px-6 py-2 border border-red-100 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            % Sale
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectCategory(cat.category_name)"
            :class="[
              selectedCategory === cat.category_name && !showOnlySale
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100',
            ]"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            {{ cat.category_name }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="paginatedProducts.length > 0">
      <div
        class="gap-x-6 gap-y-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-7xl"
      >
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="group cursor-pointer"
          @click="goToDetail(product)"
        >
          <div
            class="relative bg-white shadow-sm mb-4 rounded-sm aspect-[4/5] overflow-hidden group/slider"
          >
            <div
              class="flex w-full h-full transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
              }"
            >
              <template
                v-for="(media, index) in getMediaArray(product)"
                :key="index"
              >
                <div
                  class="w-full h-full flex-shrink-0 relative overflow-hidden"
                >
                  <img
                    v-if="media.type === 'image'"
                    :src="media.url"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Product Image"
                  />
                  <video
                    v-else-if="media.type === 'video'"
                    :src="media.url"
                    class="absolute inset-0 w-full h-full object-cover bg-black"
                    autoplay
                    loop
                    muted
                    playsinline
                  ></video>
                </div>
              </template>
            </div>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="
                prevSlide(product.id, getMediaArray(product).length - 1)
              "
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="
                nextSlide(product.id, getMediaArray(product).length - 1)
              "
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              class="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10"
              v-if="getMediaArray(product).length > 1"
            >
              <div
                v-for="(m, idx) in getMediaArray(product)"
                :key="idx"
                :class="
                  (activeSlides[product.id] || 0) === idx
                    ? 'w-3 bg-black'
                    : 'w-1 bg-white/80'
                "
                class="h-1 rounded-full transition-all duration-300 shadow-sm"
              ></div>
            </div>

            <div
              v-if="product.discount_price"
              class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter z-20"
            >
              -{{ calculateDiscount(product.price, product.discount_price) }}%
            </div>
            <button
              @click.stop="toggleWishlist(product.id)"
              class="absolute top-2 left-2 z-20 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-transform hover:scale-110"
            >
              <svg
                v-if="isFavorited(product.id)"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-400 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
            <div
              v-if="product.stock <= 3 && product.stock > 0"
              class="top-2 left-2 absolute bg-amber-500 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase z-20"
            >
              Low Stock
            </div>
          </div>

          <div class="space-y-2 text-center md:text-left">
            <h3
              class="font-medium text-xs text-gray-900 md:text-sm truncate uppercase tracking-widest"
            >
              {{ product.name }}
            </h3>
            <div
              class="flex justify-center md:justify-start items-center gap-2"
            >
              <template v-if="product.discount_price">
                <p class="font-bold text-red-600 text-sm md:text-base">
                  {{ formatPrice(product.discount_price) }}
                </p>
                <p class="text-xs text-gray-400 md:text-sm line-through">
                  {{ formatPrice(product.price) }}
                </p>
              </template>
              <p
                v-else
                class="font-semibold text-gray-600 text-sm md:text-base"
              >
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-4 mt-20">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span class="font-bold text-xs uppercase tracking-widest"
          >Page {{ currentPage }} of {{ totalPages || 1 }}</span
        >
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages || totalPages === 0"
          class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-else-if="!isLoading" class="py-24 text-center">
      <p class="font-serif text-gray-400 text-xl italic">
        No items found matching your selection.
      </p>
      <button
        @click="resetAllFilters"
        class="mt-4 font-bold text-black text-sm underline uppercase tracking-widest"
      >
        Reset All Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // [BARU] Import useRoute
import Swal from "sweetalert2"; // Pastikan Swal diimport
import { useProductStore } from "../../composables/useProductStore";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const route = useRoute(); // [BARU] Inisialisasi route
const router = useRouter();

const { state, fetchCatalogData } = useProductStore();
const categories = computed(() => state.categories);
const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false);
const currentPage = ref(1);
const itemsPerPage = 12;

// [BARU] WISHLIST LOGIC
const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const isFavorited = (id) => userWishlists.value.includes(id);

// [BARU] State untuk menyimpan index slide per produk
const activeSlides = ref({});

// [BARU] Logika menyatukan gambar utama, varian, dan video
const getMediaArray = (prod) => {
  let media = [{ type: "image", url: prod.image }];
  if (prod.variant_images && Array.isArray(prod.variant_images)) {
    prod.variant_images.forEach((img) =>
      media.push({ type: "image", url: img }),
    );
  }
  if (prod.variant_video) {
    media.push({ type: "video", url: prod.variant_video });
  }
  return media;
};

// [BARU] Fungsi Navigasi Mini Slider
const nextSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] >= max ? 0 : activeSlides.value[prodId] + 1;
};

const prevSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] <= 0 ? max : activeSlides.value[prodId] - 1;
};

const fetchWishlists = async () => {
  if (!isAuthenticated) return;
  try {
    const res = await axios.get(`${BASE_URL}/wishlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    userWishlists.value = res.data.map((w) => w.product_id);
  } catch (error) {
    console.error("Failed to fetch wishlists");
  }
};

const toggleWishlist = async (productId) => {
  if (!isAuthenticated) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      text: "Please login to add favorites.",
    });
    return;
  }

  // Optimistic UI Update
  if (isFavorited(productId)) {
    userWishlists.value = userWishlists.value.filter((id) => id !== productId);
  } else {
    userWishlists.value.push(productId);
  }

  try {
    await axios.post(
      `${BASE_URL}/wishlists/toggle`,
      { product_id: productId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
  } catch (error) {
    fetchWishlists(); // Rollback jika API gagal
  }
};

const initCatalog = async () => {
  if (!state.isCatalogLoaded) {
    isLoading.value = true;
    await fetchCatalogData();
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  } else {
    fetchCatalogData();
  }
};

const filteredProducts = computed(() => {
  const sourceProducts = state.catalogProducts || [];
  return sourceProducts.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const productCategory = p.category?.name || p.category_name;
    const matchesCategory =
      selectedCategory.value === "" ||
      productCategory === selectedCategory.value;
    const matchesSale = showOnlySale.value
      ? p.discount_price !== null && p.discount_price > 0
      : true;
    return matchesSearch && matchesCategory && matchesSale;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage),
);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const calculateDiscount = (price, discountPrice) =>
  Math.round(((price - discountPrice) / price) * 100);
const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

// [BARU] Fungsi Lempar Data Instan ke Detail
const goToDetail = (product) => {
  router.push({
    path: `/product/${product.id}`,
    // Melemparkan data JSON mentah ke memory browser
    state: { productData: JSON.stringify(product) } 
  });
};

// onMounted(initCatalog);

// onMounted(async () => {
//   initCatalog();
//   fetchWishlists();
//   window.addEventListener("wishlist-updated", fetchWishlists);
// });

// [PERBAIKAN] Ubah blok onMounted untuk menangkap query param
onMounted(async () => {
  // Cek apakah ada query parameter 'search' saat halaman dimuat
  if (route.query.search) {
    searchQuery.value = route.query.search;
  }

  initCatalog();
  fetchWishlists();
  window.addEventListener("wishlist-updated", fetchWishlists);
});

// [BARU] Tambahkan watcher agar jika query url berubah (meski sudah di halaman catalog), search box ikut update
watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch !== undefined) {
      searchQuery.value = newSearch;
    }
  },
);

onUnmounted(() => {
  window.removeEventListener("wishlist-updated", fetchWishlists);
});
</script> -->

<template>
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    
    <div
      v-if="isLoading"
      class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-[#F3F4F6]/80 backdrop-blur-sm transition-all duration-300"
    >
      <div class="flex gap-2 mb-4">
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
      </div>
      <p class="font-serif text-gray-500 italic tracking-widest text-sm animate-pulse">
        Loading Collection...
      </p>
    </div>

    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="mb-8 font-bold text-black text-3xl uppercase tracking-tight">
        Products
      </h1>

      <div class="flex md:flex-row flex-col justify-between gap-6 mb-12">
        <div class="relative w-full md:w-80">
          <span
            class="left-0 absolute inset-y-0 flex items-center pl-3 text-gray-400"
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search our collection..."
            class="bg-white shadow-sm py-3 pr-4 pl-10 border-none rounded-full outline-none focus:ring-2 focus:ring-black w-full text-sm transition"
          />
        </div>

        <div class="flex gap-2 pb-2 overflow-x-auto scrollbar-hide">
          <button
            @click="resetAllFilters"
            :class="[
              selectedCategory === '' && !showOnlySale
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100',
            ]"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            All
          </button>
          <button
            @click="toggleSaleFilter"
            :class="[
              showOnlySale
                ? 'bg-red-600 text-white'
                : 'bg-white text-red-500 hover:bg-red-50',
            ]"
            class="shadow-sm px-6 py-2 border border-red-100 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            % Sale
          </button>
          <button
            v-for="cat in categories"
            :key="cat.id"
            @click="selectCategory(cat.category_name)"
            :class="[
              selectedCategory === cat.category_name && !showOnlySale
                ? 'bg-black text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100',
            ]"
            class="shadow-sm px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap transition"
          >
            {{ cat.category_name }}
          </button>
        </div>
      </div>
    </div>

    <div v-if="paginatedProducts.length > 0">
      <div
        class="gap-x-6 gap-y-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto max-w-7xl"
      >
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="group cursor-pointer"
          @click="goToDetail(product)"
        >
          <div
            class="relative bg-white shadow-sm mb-4 rounded-sm aspect-[4/5] overflow-hidden group/slider"
          >
            <div
              class="flex w-full h-full transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
              }"
            >
              <template
                v-for="(media, index) in getMediaArray(product)"
                :key="index"
              >
                <div
                  class="w-full h-full flex-shrink-0 relative overflow-hidden"
                >
                  <img
                    v-if="media.type === 'image'"
                    :src="media.url"
                    class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt="Product Image"
                  />
                  <video
                    v-else-if="media.type === 'video'"
                    :src="media.url"
                    class="absolute inset-0 w-full h-full object-cover bg-black"
                    autoplay
                    loop
                    muted
                    playsinline
                  ></video>
                </div>
              </template>
            </div>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="
                prevSlide(product.id, getMediaArray(product).length - 1)
              "
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="
                nextSlide(product.id, getMediaArray(product).length - 1)
              "
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              class="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10"
              v-if="getMediaArray(product).length > 1"
            >
              <div
                v-for="(m, idx) in getMediaArray(product)"
                :key="idx"
                :class="
                  (activeSlides[product.id] || 0) === idx
                    ? 'w-3 bg-black'
                    : 'w-1 bg-white/80'
                "
                class="h-1 rounded-full transition-all duration-300 shadow-sm"
              ></div>
            </div>

            <div
              v-if="product.discount_price"
              class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter z-20"
            >
              -{{ calculateDiscount(product.price, product.discount_price) }}%
            </div>

            <button
              @click.stop="toggleWishlist(product.id)"
              class="absolute top-2 left-2 z-20 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-transform hover:scale-110"
            >
              <svg
                v-if="isFavorited(product.id)"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-400 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <div
              v-if="product.stock <= 5 && product.stock > 0"
              class="bottom-2 left-2 absolute bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded-md font-bold text-[9px] text-white uppercase tracking-widest z-20 shadow-sm animate-pulse"
            >
              Only {{ product.stock }} left!
            </div>
            
            <div
              v-else-if="product.stock <= 0"
              class="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex justify-center items-center z-20"
            >
              <span class="bg-black text-white px-4 py-1 rounded font-bold text-xs uppercase tracking-widest transform -rotate-12 shadow-lg">
                Sold Out
              </span>
            </div>
            
          </div>

          <div class="space-y-2 text-center md:text-left">
            <h3
              class="font-medium text-xs text-gray-900 md:text-sm truncate uppercase tracking-widest"
            >
              {{ product.name }}
            </h3>
            <div
              class="flex justify-center md:justify-start items-center gap-2"
            >
              <template v-if="product.discount_price">
                <p class="font-bold text-red-600 text-sm md:text-base">
                  {{ formatPrice(product.discount_price) }}
                </p>
                <p class="text-xs text-gray-400 md:text-sm line-through">
                  {{ formatPrice(product.price) }}
                </p>
              </template>
              <p
                v-else
                class="font-semibold text-gray-600 text-sm md:text-base"
              >
                {{ formatPrice(product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-center items-center gap-4 mt-20">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed"
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span class="font-bold text-xs uppercase tracking-widest"
          >Page {{ currentPage }} of {{ totalPages || 1 }}</span
        >
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages || totalPages === 0"
          class="bg-white hover:bg-gray-50 disabled:opacity-30 shadow-sm p-2 rounded-full transition disabled:cursor-not-allowed"
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <div v-else-if="!isLoading" class="py-24 text-center">
      <p class="font-serif text-gray-400 text-xl italic">
        No items found matching your selection.
      </p>
      <button
        @click="resetAllFilters"
        class="mt-4 font-bold text-black text-sm underline uppercase tracking-widest"
      >
        Reset All Filters
      </button>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted, computed, watch, onUnmounted } from "vue";
// import { useRoute, useRouter } from "vue-router";
// import Swal from "sweetalert2";
// import { useProductStore } from "../../composables/useProductStore";
// import axios from "axios";
// import { BASE_URL } from "../../config/api.js";

// const route = useRoute();
// const router = useRouter();

// const { state, fetchCatalogData } = useProductStore();
// const categories = computed(() => state.categories);
// const isLoading = ref(false);

// const searchQuery = ref("");
// const selectedCategory = ref("");
// const showOnlySale = ref(false);
// const currentPage = ref(1);
// const itemsPerPage = 12;

// const userWishlists = ref([]);
// const isAuthenticated = !!localStorage.getItem("token");

// const isFavorited = (id) => userWishlists.value.includes(id);

// const activeSlides = ref({});

// const getMediaArray = (prod) => {
//   let media = [{ type: "image", url: prod.image }];
//   if (prod.variant_images && Array.isArray(prod.variant_images)) {
//     prod.variant_images.forEach((img) =>
//       media.push({ type: "image", url: img }),
//     );
//   }
//   if (prod.variant_video) {
//     media.push({ type: "video", url: prod.variant_video });
//   }
//   return media;
// };

// const nextSlide = (prodId, max) => {
//   if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
//   activeSlides.value[prodId] =
//     activeSlides.value[prodId] >= max ? 0 : activeSlides.value[prodId] + 1;
// };

// const prevSlide = (prodId, max) => {
//   if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
//   activeSlides.value[prodId] =
//     activeSlides.value[prodId] <= 0 ? max : activeSlides.value[prodId] - 1;
// };

// const fetchWishlists = async () => {
//   if (!isAuthenticated) return;
//   try {
//     const res = await axios.get(`${BASE_URL}/wishlists`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     userWishlists.value = res.data.map((w) => w.product_id);
//   } catch (error) {
//     console.error("Failed to fetch wishlists");
//   }
// };

// const toggleWishlist = async (productId) => {
//   if (!isAuthenticated) {
//     Swal.fire({
//       icon: "info",
//       title: "Login Required",
//       text: "Please login to add favorites.",
//     });
//     return;
//   }

//   if (isFavorited(productId)) {
//     userWishlists.value = userWishlists.value.filter((id) => id !== productId);
//   } else {
//     userWishlists.value.push(productId);
//   }

//   try {
//     await axios.post(
//       `${BASE_URL}/wishlists/toggle`,
//       { product_id: productId },
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       },
//     );
//   } catch (error) {
//     fetchWishlists(); 
//   }
// };

// const initCatalog = async () => {
//   if (!state.isCatalogLoaded) {
//     isLoading.value = true;
//     await fetchCatalogData();
//     setTimeout(() => {
//       isLoading.value = false;
//     }, 500);
//   } else {
//     fetchCatalogData();
//   }
// };

// const filteredProducts = computed(() => {
//   const sourceProducts = state.catalogProducts || [];
//   return sourceProducts.filter((p) => {
//     const matchesSearch = p.name
//       .toLowerCase()
//       .includes(searchQuery.value.toLowerCase());
//     const productCategory = p.category?.name || p.category_name;
//     const matchesCategory =
//       selectedCategory.value === "" ||
//       productCategory === selectedCategory.value;
//     const matchesSale = showOnlySale.value
//       ? p.discount_price !== null && p.discount_price > 0
//       : true;
//     return matchesSearch && matchesCategory && matchesSale;
//   });
// });

// const totalPages = computed(() =>
//   Math.ceil(filteredProducts.value.length / itemsPerPage),
// );
// const paginatedProducts = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage;
//   return filteredProducts.value.slice(start, start + itemsPerPage);
// });

// watch([searchQuery, selectedCategory, showOnlySale], () => {
//   currentPage.value = 1;
// });

// const toggleSaleFilter = () => {
//   showOnlySale.value = !showOnlySale.value;
//   if (showOnlySale.value) selectedCategory.value = "";
// };

// const selectCategory = (name) => {
//   selectedCategory.value = name;
//   showOnlySale.value = false;
// };

// const resetAllFilters = () => {
//   searchQuery.value = "";
//   selectedCategory.value = "";
//   showOnlySale.value = false;
// };

// const calculateDiscount = (price, discountPrice) =>
//   Math.round(((price - discountPrice) / price) * 100);
// const formatPrice = (value) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(value);

// const goToDetail = (product) => {
//   router.push({
//     path: `/product/${product.id}`,
//     state: { productData: JSON.stringify(product) } 
//   });
// };

// onMounted(async () => {
//   if (route.query.search) {
//     searchQuery.value = route.query.search;
//   }

//   initCatalog();
//   fetchWishlists();
//   window.addEventListener("wishlist-updated", fetchWishlists);
// });

// watch(
//   () => route.query.search,
//   (newSearch) => {
//     if (newSearch !== undefined) {
//       searchQuery.value = newSearch;
//     }
//   },
// );

// onUnmounted(() => {
//   window.removeEventListener("wishlist-updated", fetchWishlists);
// });

import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useProductStore } from "../../composables/useProductStore";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
// [BARU] Import Fuse.js
import Fuse from "fuse.js";

const route = useRoute();
const router = useRouter();

const { state, fetchCatalogData } = useProductStore();
const categories = computed(() => state.categories);
const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false);
const currentPage = ref(1);
const itemsPerPage = 12;

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const isFavorited = (id) => userWishlists.value.includes(id);

const activeSlides = ref({});

const getMediaArray = (prod) => {
  let media = [{ type: "image", url: prod.image }];
  if (prod.variant_images && Array.isArray(prod.variant_images)) {
    prod.variant_images.forEach((img) =>
      media.push({ type: "image", url: img }),
    );
  }
  if (prod.variant_video) {
    media.push({ type: "video", url: prod.variant_video });
  }
  return media;
};

const nextSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] >= max ? 0 : activeSlides.value[prodId] + 1;
};

const prevSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] <= 0 ? max : activeSlides.value[prodId] - 1;
};

const fetchWishlists = async () => {
  if (!isAuthenticated) return;
  try {
    const res = await axios.get(`${BASE_URL}/wishlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    userWishlists.value = res.data.map((w) => w.product_id);
  } catch (error) {
    console.error("Failed to fetch wishlists");
  }
};

const toggleWishlist = async (productId) => {
  if (!isAuthenticated) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      text: "Please login to add favorites.",
    });
    return;
  }

  if (isFavorited(productId)) {
    userWishlists.value = userWishlists.value.filter((id) => id !== productId);
  } else {
    userWishlists.value.push(productId);
  }

  try {
    await axios.post(
      `${BASE_URL}/wishlists/toggle`,
      { product_id: productId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
  } catch (error) {
    fetchWishlists(); 
  }
};

const initCatalog = async () => {
  if (!state.isCatalogLoaded) {
    isLoading.value = true;
    await fetchCatalogData();
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  } else {
    fetchCatalogData();
  }
};

// ============================================================================
// [PERBAIKAN] LOGIKA PENCARIAN TYPO-TOLERANT DENGAN FUSE.JS
// ============================================================================
const filteredProducts = computed(() => {
  let sourceProducts = state.catalogProducts || [];

  // 1. Terapkan Filter Kategori & Diskon terlebih dahulu (Meringankan beban pencarian)
  sourceProducts = sourceProducts.filter((p) => {
    const productCategory = p.category?.name || p.category_name;
    const matchesCategory = selectedCategory.value === "" || productCategory === selectedCategory.value;
    const matchesSale = showOnlySale.value ? p.discount_price !== null && p.discount_price > 0 : true;
    
    return matchesCategory && matchesSale;
  });

  // 2. Jika ada query pencarian, jalankan algoritma Fuzzy Search (Typo-Tolerant)
  if (searchQuery.value.trim() !== "") {
    const fuseOptions = {
      // Bobot pencarian: Nama lebih penting dari kategori, kode SKU lebih penting dari kategori
      keys: [
        { name: 'name', weight: 0.7 },
        { name: 'code', weight: 0.2 },
        { name: 'category.name', weight: 0.1 }
      ],
      // Threshold: 0.0 (Sama persis), 1.0 (Cocok dengan apapun). 
      // 0.3 adalah angka emas (Golden Ratio) untuk menoleransi typo 1-2 huruf.
      threshold: 0.3,
      // Mengabaikan huruf besar/kecil (otomatis aktif di Fuse)
      ignoreLocation: true 
    };

    const fuse = new Fuse(sourceProducts, fuseOptions);
    const results = fuse.search(searchQuery.value);
    
    // Fuse mengembalikan objek berupa { item: product, refIndex: ... }, kita ambil item-nya saja
    return results.map(result => result.item);
  }

  // Jika tidak ada pencarian, kembalikan produk yang sudah difilter kategori/sale
  return sourceProducts;
});
// ============================================================================

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage),
);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const calculateDiscount = (price, discountPrice) =>
  Math.round(((price - discountPrice) / price) * 100);
const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

const goToDetail = (product) => {
  router.push({
    path: `/product/${product.id}`,
    state: { productData: JSON.stringify(product) } 
  });
};

onMounted(async () => {
  if (route.query.search) {
    searchQuery.value = route.query.search;
  }

  initCatalog();
  fetchWishlists();
  window.addEventListener("wishlist-updated", fetchWishlists);
});

watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch !== undefined) {
      searchQuery.value = newSearch;
    }
  },
);

onUnmounted(() => {
  window.removeEventListener("wishlist-updated", fetchWishlists);
});
</script>

<style scoped>
/* [BARU] CSS untuk animasi Pulse Dots persis seperti di PaymentPage */
.animate-bounce-1 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.32s;
}
.animate-bounce-2 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.16s;
}
.animate-bounce-3 {
  animation: bounceDots 1.4s infinite ease-in-out both;
}

@keyframes bounceDots {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
