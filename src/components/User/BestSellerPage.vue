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

<!-- <template>
  <div class="min-h-screen px-6 py-12 mx-auto md:py-24 max-w-7xl">
    <div class="mb-12 text-center md:mb-16 animate-fade-in">
      <h1
        class="mb-4 font-serif text-4xl tracking-tighter text-gray-900 uppercase md:text-5xl"
      >
        {{ $t("best_seller.title") }}
      </h1>
      <p class="max-w-2xl mx-auto text-sm text-gray-500 md:text-base">
        {{ $t("best_seller.desc") }}
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
          <option value="all">{{ $t("best_seller.all_categories") }}</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <select
          v-model="sortOption"
          class="block w-full p-3 text-xs font-bold tracking-widest text-gray-700 uppercase bg-white border border-gray-200 outline-none cursor-pointer rounded-xl focus:ring-black focus:border-black md:w-48"
        >
          <option value="sales_desc">{{ $t("best_seller.sort_sales") }}</option>
          <option value="price_asc">{{ $t("best_seller.sort_price_low") }}</option>
          <option value="price_desc">{{ $t("best_seller.sort_price_high") }}</option>
          <option value="stock_desc">{{ $t("best_seller.sort_stock") }}</option>
        </select>
      </div>
      <div class="text-xs font-bold tracking-widest text-gray-400 uppercase">
        {{ $t("best_seller.showing", { count: processedProducts.length }) }}
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
            v-if="getDiscountToDisplay(product) && getDiscountStatus(product).active"
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
              >{{ $t("best_seller.only_left", { stock: product.stock }) }}</span
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
              {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
            </p>
            <p class="text-[10px] text-gray-400 line-through">
              {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
            </p>
          </template>
          <template v-else>
            <p class="text-sm font-bold text-gray-900">
              {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
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
        {{ $t("best_seller.reset") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { useI18n } from "vue-i18n";

// import { formatPrice } from "../../utils/currency";

const router = useRouter();
const isLoading = ref(true);
const products = ref([]);
const { t } = useI18n();

// Filter States
const selectedCategory = ref("all");
const sortOption = ref("sales_desc");

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// ==========================================
// [BARU] LOGIKA STATUS DISKON (TIME-BASED)
// Menggunakan konversi natural JavaScript agar tidak ada offset ganda
// ==========================================
// const getDiscountStatus = (p) => {
//   if (!p || !p.discount_price) return { active: false, upcoming: false, expired: false };

//   const now = new Date();
//   let active = true;
//   let upcoming = false;
//   let expired = false;

//   if (p.discount_start_date) {
//     const startDate = new Date(p.discount_start_date);
//     if (now < startDate) {
//       active = false;
//       upcoming = true;
//     }
//   }
//   if (p.discount_end_date) {
//     const endDate = new Date(p.discount_end_date);
//     if (now > endDate) {
//       active = false;
//       expired = true;
//     }
//   }

//   return { active, upcoming, expired };
// };

// Tambahkan helper ini dulu jika belum ada di file Anda
const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  // Sesuaikan UTC server menjadi WIB dengan mengurangi 7 jam (seperti logika sebelumnya)
  date.setHours(date.getHours() - 7);
  return date;
};

// Fungsi getDiscountStatus yang sudah diperbarui
const getDiscountStatus = (p) => {
  // 👇 PERBAIKAN 1: Gunakan helper multi-currency untuk mengecek diskon
  const discObj = getDiscountToDisplay(p);

  if (!p || !discObj || !discObj.value) {
    return { active: false, upcoming: false, expired: false };
  }

  const now = new Date();
  let active = true;
  let upcoming = false;
  let expired = false;

  // 👇 PERBAIKAN 2: Gunakan convertToWIB agar akurat
  if (p.discount_start_date) {
    const startDate = convertToWIB(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }

  if (p.discount_end_date) {
    const endDate = convertToWIB(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }

  return { active, upcoming, expired };
};

// Mengambil harga dasar sesuai mata uang
const getPriceToDisplay = (product) => {
  if (!product) return { value: 0, curr: "IDR" };
  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: product.price, curr: "IDR" };

  const prices =
    typeof product.prices === "string"
      ? JSON.parse(product.prices)
      : product.prices || {};

  if (prices[curr]) {
    return { value: parseFloat(prices[curr]), curr: curr };
  }
  return { value: product.price, curr: "IDR" };
};

// Mengambil harga diskon sesuai mata uang
const getDiscountToDisplay = (product) => {
  if (!product) return null;
  const curr = currentCurrency.value;

  if (curr === "IDR") {
    return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
  }

  const discountPrices =
    typeof product.discount_prices === "string"
      ? JSON.parse(product.discount_prices)
      : product.discount_prices || {};

  if (discountPrices[curr]) {
    return { value: parseFloat(discountPrices[curr]), curr: curr };
  }
  return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
};

// Memformat angka menjadi string (Misal: 10 => $10.00)
const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;

  const symbols = {
    USD: "$",
    SGD: "S$",
    EUR: "€",
    AUD: "A$",
    MYR: "RM",
    IDR: "Rp ",
  };

  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });

  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

// Menghitung persentase diskon dinamis
const calculateDynamicDiscount = (product) => {
  const priceObj = getPriceToDisplay(product);
  const discObj = getDiscountToDisplay(product);
  if (!priceObj || !discObj) return 0;

  return Math.round(((priceObj.value - discObj.value) / priceObj.value) * 100);
};

// Anda juga harus mengubah currentActivePrice agar membaca harga dinamis (penting untuk analytics)
const currentActivePrice = computed(() => {
  if (!product.value) return 0;
  if (product.value.discount_price && getDiscountStatus(product.value).active) {
    const discObj = getDiscountToDisplay(product.value);
    return discObj ? discObj.value : 0;
  }
  const priceObj = getPriceToDisplay(product.value);
  return priceObj ? priceObj.value : 0;
});

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

// const formatPrice = (v) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(v);

onMounted(() => {
  fetchProducts();

  // Dengarkan perubahan mata uang
  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
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
        {{ $t("best_seller.title") }}
      </h1>
      <p class="max-w-2xl mx-auto text-sm text-gray-500 md:text-base">
        Jelajahi kurasi eksklusif karya terpopuler kami. Dihitung berdasarkan data
        pembelian pelanggan secara real-time.
      </p>
    </div>

    <!-- Filter Bar -->
    <div
      class="flex flex-col items-center justify-between gap-6 p-6 mb-10 border border-gray-100 bg-gray-50 rounded-2xl md:flex-row animate-fade-in"
    >
      <div class="flex flex-col w-full gap-4 md:flex-row md:w-auto">
        <select
          v-model="selectedCategory"
          class="block w-full p-3 text-xs font-bold tracking-widest text-gray-700 uppercase transition-colors bg-white border border-gray-200 outline-none cursor-pointer rounded-xl focus:ring-1 focus:ring-black focus:border-black md:w-48 hover:bg-gray-50"
        >
          <option value="all">{{ $t("best_seller.all_categories") }}</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <select
          v-model="sortOption"
          class="block w-full p-3 text-xs font-bold tracking-widest text-gray-700 uppercase transition-colors bg-white border border-gray-200 outline-none cursor-pointer rounded-xl focus:ring-1 focus:ring-black focus:border-black md:w-48 hover:bg-gray-50"
        >
          <option value="sales_desc">{{ $t("best_seller.sort_sales") }}</option>
          <option value="price_asc">{{ $t("best_seller.sort_price_low") }}</option>
          <option value="price_desc">{{ $t("best_seller.sort_price_high") }}</option>
          <option value="stock_desc">{{ $t("best_seller.sort_stock") }}</option>
        </select>
      </div>

      <div class="text-[11px] font-black tracking-widest text-gray-400 uppercase">
        {{ $t("best_seller.showing", { count: processedProducts.length }) }}
      </div>
    </div>

    <!-- Loading Skeletons -->
    <div
      v-if="isLoading"
      class="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4 md:gap-x-6 md:gap-y-12"
    >
      <div v-for="i in 8" :key="`skel-${i}`" class="flex flex-col gap-2 animate-pulse">
        <div class="bg-gray-200 aspect-[4/5] rounded-2xl"></div>
        <div class="w-3/4 h-3 mt-2 bg-gray-200 rounded-full"></div>
        <div class="w-1/2 h-3 bg-gray-200 rounded-full"></div>
      </div>
    </div>

    <!-- Product Grid -->
    <TransitionGroup
      v-else-if="processedProducts.length > 0"
      name="list"
      tag="div"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12"
    >
      <div
        v-for="(product, index) in processedProducts"
        :key="product.id"
        class="flex flex-col cursor-pointer group"
        @click="$router.push(`/products/${product.slug || product.id}`)"
      >
        <div
          class="relative mb-4 overflow-hidden transition-all duration-500 border border-gray-100 shadow-sm aspect-[4/5] rounded-2xl bg-gray-50 group-hover:shadow-xl group-hover:-translate-y-1"
        >
          <img
            :src="product.image"
            class="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
            :alt="product.name"
            loading="lazy"
          />

          <!-- Label Sale -->
          <div
            v-if="getDiscountToDisplay(product) && getDiscountStatus(product).active"
            class="absolute top-3 right-3 bg-red-600 text-white px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-md z-10 shadow-sm"
          >
            SALE
          </div>

          <!-- 👇 [BARU] RANKING MEDALI EMAS/PERAK/PERUNGGU 👇 -->
          <div
            v-if="sortOption === 'sales_desc'"
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-xs font-black shadow-lg top-3 left-3 rounded-xl"
            :class="[
              index === 0
                ? 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-yellow-900 border border-yellow-200 ring-2 ring-yellow-400/30'
                : index === 1
                ? 'bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800 border border-gray-100 ring-2 ring-gray-300/30'
                : index === 2
                ? 'bg-gradient-to-br from-orange-300 to-amber-700 text-orange-950 border border-orange-200 ring-2 ring-orange-500/30'
                : 'bg-black/80 backdrop-blur-sm text-white border border-gray-700',
            ]"
          >
            <span v-if="index === 0" class="text-lg drop-shadow-md">🏆</span>
            <span v-else>#{{ index + 1 }}</span>
          </div>

          <!-- Stock Warning -->
          <div
            v-if="product.stock <= 5 && product.stock > 0"
            class="absolute bottom-3 left-3 bg-amber-400/90 backdrop-blur-sm text-white px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded-md shadow-sm animate-pulse"
          >
            Only {{ product.stock }} left
          </div>

          <div
            v-if="product.stock <= 0"
            class="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex items-center justify-center z-20"
          >
            <span
              class="px-5 py-2 text-xs font-black tracking-[0.2em] text-white uppercase transform bg-black rounded-sm shadow-xl -rotate-12 border border-gray-800"
            >
              Sold Out
            </span>
          </div>

          <!-- Quick Add Overlay (CRO) -->
          <div
            class="absolute inset-x-0 bottom-0 z-10 flex justify-center p-4 transition-transform duration-300 translate-y-full bg-gradient-to-t from-black/60 to-transparent group-hover:translate-y-0"
          >
            <span
              class="text-[10px] font-bold text-white tracking-widest uppercase border-b border-white pb-0.5"
              >View Detail</span
            >
          </div>
        </div>

        <h4
          class="mb-0.5 text-xs font-bold tracking-wide text-gray-900 uppercase truncate transition-colors group-hover:text-red-700"
        >
          {{ product.name }}
        </h4>

        <!-- 👇 [BARU] INDIKATOR PENJUALAN ASLI 👇 -->
        <div class="flex items-center gap-1 mb-2">
          <p
            class="text-[10px] font-black text-amber-600 uppercase tracking-widest bg-amber-50 px-1.5 py-0.5 rounded"
          >
            🔥 {{ parseInt(product.total_sold) }} Terjual
          </p>
          <span class="text-gray-300">•</span>
          <p class="text-[9px] text-gray-400 uppercase tracking-widest truncate">
            {{ product.category?.name || "Uncategorized" }}
          </p>
        </div>

        <div class="flex items-center gap-2 mt-auto">
          <template
            v-if="getDiscountToDisplay(product) && getDiscountStatus(product).active"
          >
            <p class="text-sm font-extrabold text-red-600">
              {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
            </p>
            <p class="text-[10px] font-medium text-gray-400 line-through">
              {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
            </p>
          </template>
          <template v-else>
            <p class="text-sm font-bold text-gray-900">
              {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
            </p>
          </template>
        </div>
      </div>
    </TransitionGroup>

    <!-- Empty State -->
    <div
      v-else
      class="flex flex-col items-center justify-center py-32 border-2 border-gray-200 border-dashed rounded-3xl bg-gray-50/50"
    >
      <div
        class="flex items-center justify-center w-16 h-16 mb-4 text-gray-400 bg-white rounded-full shadow-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </div>
      <h3 class="mb-2 font-serif text-2xl italic text-gray-400">Belum Ada Transaksi</h3>
      <p class="text-sm text-gray-500">
        Coba sesuaikan filter Anda untuk melihat produk lainnya.
      </p>
      <button
        @click="resetFilters"
        class="px-6 py-2.5 mt-6 text-xs font-bold text-white bg-black rounded-full hover:bg-gray-800 shadow-md transition-all hover:scale-105 uppercase tracking-widest"
      >
        {{ $t("best_seller.reset") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { useI18n } from "vue-i18n";

const router = useRouter();
const isLoading = ref(true);
const products = ref([]);
const { t } = useI18n();

const selectedCategory = ref("all");
const sortOption = ref("sales_desc");

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(date.getHours() - 7);
  return date;
};

const getDiscountStatus = (p) => {
  const discObj = getDiscountToDisplay(p);
  if (!p || !discObj || !discObj.value) {
    return { active: false, upcoming: false, expired: false };
  }
  const now = new Date();
  let active = true,
    upcoming = false,
    expired = false;

  if (p.discount_start_date) {
    const startDate = convertToWIB(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }
  if (p.discount_end_date) {
    const endDate = convertToWIB(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }
  return { active, upcoming, expired };
};

const getPriceToDisplay = (product) => {
  if (!product) return { value: 0, curr: "IDR" };
  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: product.price, curr: "IDR" };

  const prices =
    typeof product.prices === "string"
      ? JSON.parse(product.prices)
      : product.prices || {};
  if (prices[curr]) {
    return { value: parseFloat(prices[curr]), curr: curr };
  }
  return { value: product.price, curr: "IDR" };
};

const getDiscountToDisplay = (product) => {
  if (!product) return null;
  const curr = currentCurrency.value;
  if (curr === "IDR") {
    return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
  }

  const discountPrices =
    typeof product.discount_prices === "string"
      ? JSON.parse(product.discount_prices)
      : product.discount_prices || {};
  if (discountPrices[curr]) {
    return { value: parseFloat(discountPrices[curr]), curr: curr };
  }
  return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
};

const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;
  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });
  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

const calculateDynamicDiscount = (product) => {
  const priceObj = getPriceToDisplay(product);
  const discObj = getDiscountToDisplay(product);
  if (!priceObj || !discObj) return 0;
  return Math.round(((priceObj.value - discObj.value) / priceObj.value) * 100);
};

const getActivePrice = (product) => {
  if (!product) return 0;
  return getDiscountStatus(product).active
    ? parseFloat(product.discount_price)
    : parseFloat(product.price);
};

// 👇 [PERBAIKAN] Endpoint sekarang mengarah ke API Best Sellers asli 👇
const fetchProducts = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/home/best-sellers`);
    let data = res.data?.data || [];
    products.value = data;
  } catch (error) {
    console.error("Failed to fetch best sellers:", error);
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

  result.sort((a, b) => {
    const priceA = getActivePrice(a);
    const priceB = getActivePrice(b);
    // Parse Int agar data yang datang dari raw SQL (berbentuk string) dikalkulasi secara numerik
    const salesA = parseInt(a.total_sold) || 0;
    const salesB = parseInt(b.total_sold) || 0;

    switch (sortOption.value) {
      case "price_asc":
        return priceA - priceB;
      case "price_desc":
        return priceB - priceA;
      case "stock_desc":
        return b.stock - a.stock;
      case "sales_desc":
      default:
        return salesB - salesA;
    }
  });

  return result;
});

const resetFilters = () => {
  selectedCategory.value = "all";
  sortOption.value = "sales_desc";
};

onMounted(() => {
  fetchProducts();
  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
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
