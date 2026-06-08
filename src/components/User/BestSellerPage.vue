<!-- <template>
  <div class="min-h-screen px-6 py-12 mx-auto md:py-24 max-w-7xl">
    <div class="mb-12 text-center md:mb-16 animate-fade-in">
      <h1
        class="mb-4 font-serif text-4xl tracking-tighter text-gray-900 uppercase md:text-5xl"
      >
        Best Sellers
      </h1>
      <p class="max-w-2xl mx-auto text-sm text-gray-500 md:text-base">
        Discover our most loved pieces. Handcrafted perfection that defines the SolHer
        experience.
      </p>
    </div>

    <div
      class="flex flex-col items-center justify-between gap-6 p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl md:flex-row animate-fade-in"
    >
      <div class="flex flex-col w-full gap-4 md:flex-row md:w-auto">
        <select
          v-model="selectedCategory"
          class="block w-full p-3 text-xs font-bold tracking-widest text-gray-700 uppercase bg-white border border-gray-200 outline-none cursor-pointer rounded-xl focus:ring-black focus:border-black md:w-48"
        >
          <option value="all">All Categories</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <select
          v-model="sortOption"
          class="block w-full p-3 text-xs font-bold tracking-widest text-gray-700 uppercase bg-white border border-gray-200 outline-none cursor-pointer rounded-xl focus:ring-black focus:border-black md:w-48"
        >
          <option value="sales_desc">Top Sales</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="stock_desc">Highest Stock</option>
        </select>
      </div>

      <div class="text-xs font-bold tracking-widest text-gray-400 uppercase">
        Showing {{ processedProducts.length }} Products
      </div>
    </div>

    <div v-if="isLoading" class="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div v-for="i in 8" :key="`skel-${i}`" class="flex flex-col gap-2 animate-pulse">
        <div class="bg-gray-200 aspect-square rounded-2xl"></div>
        <div class="w-3/4 h-3 mt-1 bg-gray-200 rounded"></div>
        <div class="w-1/2 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>

    <TransitionGroup
      v-else-if="processedProducts.length > 0"
      name="list"
      tag="div"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
    >
      <div
        v-for="(product, index) in processedProducts"
        :key="product.id"
        class="flex flex-col cursor-pointer group"
        @click="$router.push(`/products/${product.slug || product.id}`)"
      >
        <div
          class="relative mb-4 overflow-hidden transition-all duration-300 border border-gray-100 shadow-sm aspect-square rounded-2xl bg-gray-50 group-hover:shadow-md"
        >
          <img
            :src="product.image"
            class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            :alt="product.name"
            loading="lazy"
          />

          <div
            v-if="sortOption === 'sales_desc'"
            class="absolute flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-black rounded-full shadow-md top-3 left-3"
          >
            #{{ index + 1 }}
          </div>

          <div
            v-if="product.stock <= 5 && product.stock > 0"
            class="absolute bottom-3 left-3 bg-amber-100 text-amber-800 px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded shadow-sm"
          >
            Only {{ product.stock }} left
          </div>
          <div
            v-if="product.stock === 0"
            class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center"
          >
            <span
              class="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full"
              >Out of Stock</span
            >
          </div>
        </div>

        <h4
          class="mb-1 text-xs font-bold tracking-wide text-gray-900 uppercase truncate transition-colors group-hover:text-gray-600"
        >
          {{ product.name }}
        </h4>
        <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-2 truncate">
          {{ product.category?.name || "Uncategorized" }}
        </p>

        <div class="flex items-center gap-2 mt-auto">
          <p v-if="product.discount_price" class="text-sm font-bold text-red-600">
            {{ formatPrice(product.discount_price) }}
          </p>
          <p
            :class="
              product.discount_price
                ? 'text-[10px] text-gray-400 line-through'
                : 'font-bold text-sm text-gray-900'
            "
          >
            {{ formatPrice(product.price) }}
          </p>
        </div>
      </div>
    </TransitionGroup>

    <div v-else class="py-20 text-center border border-gray-100 bg-gray-50 rounded-3xl">
      <h3 class="mb-2 font-serif text-2xl italic text-gray-400">No products found</h3>
      <p class="text-sm text-gray-500">Try adjusting your filters to see more results.</p>
      <button
        @click="resetFilters"
        class="mt-6 text-xs font-bold tracking-widest text-black underline uppercase hover:text-gray-600"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const router = useRouter();
const isLoading = ref(true);
const products = ref([]);

// Filter States
const selectedCategory = ref("all");
const sortOption = ref("sales_desc"); // Default sort: Best Sellers

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    let data = res.data?.data?.data || res.data?.data || res.data;

    if (Array.isArray(data)) {
      // Pastikan hanya produk yang aktif yang ditampilkan
      products.value = data.filter((p) => p.status === "active");
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    isLoading.value = false;
  }
};

// Mengambil daftar kategori unik dari data produk
const uniqueCategories = computed(() => {
  const categories = products.value
    .map((p) => p.category?.name)
    .filter((name) => name !== undefined && name !== null);
  return [...new Set(categories)].sort();
});

// Engine Filter & Sorting Terpadu
const processedProducts = computed(() => {
  let result = [...products.value];

  // 1. Filter by Category
  if (selectedCategory.value !== "all") {
    result = result.filter((p) => p.category?.name === selectedCategory.value);
  }

  // 2. Sort Logic
  result.sort((a, b) => {
    const priceA = parseFloat(a.discount_price ?? a.price);
    const priceB = parseFloat(b.discount_price ?? b.price);

    switch (sortOption.value) {
      case "price_asc":
        return priceA - priceB;
      case "price_desc":
        return priceB - priceA;
      case "stock_desc":
        return b.stock - a.stock;
      case "sales_desc":
      default:
        // Asumsi: Backend memiliki field 'total_sold' atau 'sales'.
        // Jika tidak ada, kita fallback ke random (untuk simulasi best seller) atau ID terlama
        const salesA = a.total_sold || a.sales || 0;
        const salesB = b.total_sold || b.sales || 0;

        // Jika backend belum memiliki field sales_count pada endpoint /products,
        // pengurutan ini tidak akan memberikan efek visual yang signifikan sampai backend diperbarui.
        return salesB - salesA;
    }
  });

  return result;
});

const resetFilters = () => {
  selectedCategory.value = "all";
  sortOption.value = "sales_desc";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style> -->

<template>
  <div class="min-h-screen px-6 py-12 mx-auto md:py-24 max-w-7xl">
    <div class="mb-12 text-center md:mb-16 animate-fade-in">
      <h1
        class="mb-4 font-serif text-4xl tracking-tighter text-gray-900 uppercase md:text-5xl"
      >
        Best Sellers
      </h1>
      <p class="max-w-2xl mx-auto text-sm text-gray-500 md:text-base">
        Discover our most loved pieces. Handcrafted perfection that defines the SolHer
        experience.
      </p>
    </div>

    <div
      class="flex flex-col items-center justify-between gap-6 p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl md:flex-row animate-fade-in"
    >
      <div class="flex flex-col w-full gap-4 md:flex-row md:w-auto">
        <select
          v-model="selectedCategory"
          class="block w-full p-3 text-xs font-bold tracking-widest text-gray-700 uppercase bg-white border border-gray-200 outline-none cursor-pointer rounded-xl focus:ring-black focus:border-black md:w-48"
        >
          <option value="all">All Categories</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <select
          v-model="sortOption"
          class="block w-full p-3 text-xs font-bold tracking-widest text-gray-700 uppercase bg-white border border-gray-200 outline-none cursor-pointer rounded-xl focus:ring-black focus:border-black md:w-48"
        >
          <option value="sales_desc">Top Sales</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="stock_desc">Highest Stock</option>
        </select>
      </div>

      <div class="text-xs font-bold tracking-widest text-gray-400 uppercase">
        Showing {{ processedProducts.length }} Products
      </div>
    </div>

    <div v-if="isLoading" class="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div v-for="i in 8" :key="`skel-${i}`" class="flex flex-col gap-2 animate-pulse">
        <div class="bg-gray-200 aspect-square rounded-2xl"></div>
        <div class="w-3/4 h-3 mt-1 bg-gray-200 rounded"></div>
        <div class="w-1/2 h-3 bg-gray-200 rounded"></div>
      </div>
    </div>

    <TransitionGroup
      v-else-if="processedProducts.length > 0"
      name="list"
      tag="div"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
    >
      <div
        v-for="(product, index) in processedProducts"
        :key="product.id"
        class="flex flex-col cursor-pointer group"
        @click="$router.push(`/products/${product.slug || product.id}`)"
      >
        <div
          class="relative mb-4 overflow-hidden transition-all duration-300 border border-gray-100 shadow-sm aspect-square rounded-2xl bg-gray-50 group-hover:shadow-md"
        >
          <img
            :src="product.image"
            class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            :alt="product.name"
            loading="lazy"
          />

          <div
            v-if="product.discount_price && getDiscountStatus(product).active"
            class="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest rounded-sm z-10"
          >
            SALE
          </div>

          <div
            v-if="sortOption === 'sales_desc'"
            class="absolute flex items-center justify-center w-8 h-8 text-xs font-bold text-white bg-black rounded-full shadow-md top-3 left-3"
          >
            #{{ index + 1 }}
          </div>

          <div
            v-if="product.stock <= 5 && product.stock > 0"
            class="absolute bottom-3 left-3 bg-amber-100 text-amber-800 px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded shadow-sm"
          >
            Only {{ product.stock }} left
          </div>
          <div
            v-if="product.stock === 0"
            class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center"
          >
            <span
              class="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full"
              >Out of Stock</span
            >
          </div>
        </div>

        <h4
          class="mb-1 text-xs font-bold tracking-wide text-gray-900 uppercase truncate transition-colors group-hover:text-gray-600"
        >
          {{ product.name }}
        </h4>
        <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-2 truncate">
          {{ product.category?.name || "Uncategorized" }}
        </p>

        <div class="flex items-center gap-2 mt-auto">
          <template v-if="product.discount_price && getDiscountStatus(product).active">
            <p class="text-sm font-bold text-red-600">
              {{ formatPrice(product.discount_price) }}
            </p>
            <p class="text-[10px] text-gray-400 line-through">
              {{ formatPrice(product.price) }}
            </p>
          </template>
          <template v-else>
            <p class="text-sm font-bold text-gray-900">
              {{ formatPrice(product.price) }}
            </p>
          </template>
        </div>
      </div>
    </TransitionGroup>

    <div v-else class="py-20 text-center border border-gray-100 bg-gray-50 rounded-3xl">
      <h3 class="mb-2 font-serif text-2xl italic text-gray-400">No products found</h3>
      <p class="text-sm text-gray-500">Try adjusting your filters to see more results.</p>
      <button
        @click="resetFilters"
        class="mt-6 text-xs font-bold tracking-widest text-black underline uppercase hover:text-gray-600"
      >
        Reset Filters
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const router = useRouter();
const isLoading = ref(true);
const products = ref([]);

// Filter States
const selectedCategory = ref("all");
const sortOption = ref("sales_desc");

// ==========================================
// [BARU] LOGIKA STATUS DISKON (TIME-BASED)
// Menggunakan konversi natural JavaScript agar tidak ada offset ganda
// ==========================================
const getDiscountStatus = (p) => {
  if (!p || !p.discount_price) return { active: false, upcoming: false, expired: false };

  const now = new Date();
  let active = true;
  let upcoming = false;
  let expired = false;

  if (p.discount_start_date) {
    const startDate = new Date(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }
  if (p.discount_end_date) {
    const endDate = new Date(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }

  return { active, upcoming, expired };
};

// Helper untuk mendapatkan harga yang sah saat ini (untuk keperluan Sorting)
const getActivePrice = (product) => {
  if (!product) return 0;
  return getDiscountStatus(product).active
    ? parseFloat(product.discount_price)
    : parseFloat(product.price);
};
// ==========================================

const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    let data = res.data?.data?.data || res.data?.data || res.data;

    if (Array.isArray(data)) {
      products.value = data.filter((p) => p.status === "active");
    }
  } catch (error) {
    console.error("Failed to fetch products:", error);
  } finally {
    isLoading.value = false;
  }
};

const uniqueCategories = computed(() => {
  const categories = products.value
    .map((p) => p.category?.name)
    .filter((name) => name !== undefined && name !== null);
  return [...new Set(categories)].sort();
});

const processedProducts = computed(() => {
  let result = [...products.value];

  if (selectedCategory.value !== "all") {
    result = result.filter((p) => p.category?.name === selectedCategory.value);
  }

  // [PERBAIKAN] Gunakan getActivePrice() agar pengurutan selalu akurat!
  result.sort((a, b) => {
    const priceA = getActivePrice(a);
    const priceB = getActivePrice(b);

    switch (sortOption.value) {
      case "price_asc":
        return priceA - priceB;
      case "price_desc":
        return priceB - priceA;
      case "stock_desc":
        return b.stock - a.stock;
      case "sales_desc":
      default:
        const salesA = a.total_sold || a.sales || 0;
        const salesB = b.total_sold || b.sales || 0;
        return salesB - salesA;
    }
  });

  return result;
});

const resetFilters = () => {
  selectedCategory.value = "all";
  sortOption.value = "sales_desc";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
