<template>
  <div class="mx-auto px-6 py-12 md:py-24 max-w-7xl min-h-screen">
    <div class="text-center mb-12 md:mb-16 animate-fade-in">
      <h1 class="font-serif text-4xl md:text-5xl uppercase tracking-tighter text-gray-900 mb-4">
        Best Sellers
      </h1>
      <p class="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
        Discover our most loved pieces. Handcrafted perfection that defines the SolHer experience.
      </p>
    </div>

    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-100 mb-10 flex flex-col md:flex-row gap-6 items-center justify-between animate-fade-in">
      <div class="flex flex-col md:flex-row gap-4 w-full md:w-auto">
        <select v-model="selectedCategory" class="bg-white border border-gray-200 text-gray-700 text-xs uppercase tracking-widest font-bold rounded-xl focus:ring-black focus:border-black block w-full md:w-48 p-3 outline-none cursor-pointer">
          <option value="all">All Categories</option>
          <option v-for="cat in uniqueCategories" :key="cat" :value="cat">
            {{ cat }}
          </option>
        </select>

        <select v-model="sortOption" class="bg-white border border-gray-200 text-gray-700 text-xs uppercase tracking-widest font-bold rounded-xl focus:ring-black focus:border-black block w-full md:w-48 p-3 outline-none cursor-pointer">
          <option value="sales_desc">Top Sales</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="stock_desc">Highest Stock</option>
        </select>
      </div>

      <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">
        Showing {{ processedProducts.length }} Products
      </div>
    </div>

    <div v-if="isLoading" class="grid grid-cols-2 md:grid-cols-4 gap-6">
      <div v-for="i in 8" :key="`skel-${i}`" class="flex flex-col gap-2 animate-pulse">
        <div class="bg-gray-200 aspect-square rounded-2xl"></div>
        <div class="bg-gray-200 h-3 w-3/4 rounded mt-1"></div>
        <div class="bg-gray-200 h-3 w-1/2 rounded"></div>
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
        class="group flex flex-col cursor-pointer"
        @click="$router.push(`/product/${product.id}`)"
      >
        <div class="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 mb-4 border border-gray-100 shadow-sm transition-all duration-300 group-hover:shadow-md">
          <img
            :src="product.image"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            :alt="product.name"
            loading="lazy"
          />
          
          <div v-if="sortOption === 'sales_desc'" class="absolute top-3 left-3 w-8 h-8 bg-black text-white rounded-full flex justify-center items-center font-bold text-xs shadow-md">
            #{{ index + 1 }}
          </div>
          
          <div v-if="product.stock <= 5 && product.stock > 0" class="absolute bottom-3 left-3 bg-amber-100 text-amber-800 px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded shadow-sm">
            Only {{ product.stock }} left
          </div>
          <div v-if="product.stock === 0" class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
            <span class="bg-black text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest rounded-full">Out of Stock</span>
          </div>
        </div>

        <h4 class="font-bold text-xs uppercase truncate tracking-wide text-gray-900 mb-1 group-hover:text-gray-600 transition-colors">
          {{ product.name }}
        </h4>
        <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-2 truncate">
          {{ product.category?.name || 'Uncategorized' }}
        </p>
        
        <div class="flex items-center gap-2 mt-auto">
          <p v-if="product.discount_price" class="font-bold text-red-600 text-sm">
            {{ formatPrice(product.discount_price) }}
          </p>
          <p :class="product.discount_price ? 'text-[10px] text-gray-400 line-through' : 'font-bold text-sm text-gray-900'">
            {{ formatPrice(product.price) }}
          </p>
        </div>
      </div>
    </TransitionGroup>

    <div v-else class="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
      <h3 class="font-serif text-2xl text-gray-400 italic mb-2">No products found</h3>
      <p class="text-sm text-gray-500">Try adjusting your filters to see more results.</p>
      <button @click="resetFilters" class="mt-6 font-bold text-black text-xs uppercase tracking-widest underline hover:text-gray-600">
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
      products.value = data.filter(p => p.status === 'active');
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
    .map(p => p.category?.name)
    .filter(name => name !== undefined && name !== null);
  return [...new Set(categories)].sort();
});

// Engine Filter & Sorting Terpadu
const processedProducts = computed(() => {
  let result = [...products.value];

  // 1. Filter by Category
  if (selectedCategory.value !== "all") {
    result = result.filter(p => p.category?.name === selectedCategory.value);
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
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
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