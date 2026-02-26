<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px] max-w-6xl mx-auto">
    
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"></div>
        <p class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse">Loading Details...</p>
      </div>
    </div>

    <div class="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <button @click="$router.back()" class="text-gray-400 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-50">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div>
          <h1 class="font-bold text-gray-800 text-2xl">Category Detail</h1>
          <p class="text-gray-500 text-xs mt-1 uppercase tracking-widest">Overview and related products</p>
        </div>
      </div>
    </div>

    <div v-if="category" class="animate-fade-in space-y-10">
      
      <div class="bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100 flex flex-col md:flex-row justify-between items-start gap-8">
        <div class="space-y-4">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Category Code</p>
            <p class="font-mono font-bold text-blue-600 text-lg">{{ category.category_code }}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Category Name</p>
            <p class="font-black text-gray-900 text-2xl uppercase tracking-tight">{{ category.category_name }}</p>
          </div>
          <div class="max-w-xl">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Description</p>
            <p class="text-gray-600 text-sm leading-relaxed">{{ category.meta?.description || 'No description provided for this category.' }}</p>
          </div>
        </div>

        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-w-[200px] shrink-0 flex flex-col items-center justify-center">
           <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Total Products</p>
           <p class="text-4xl font-black text-black">{{ category.products?.length || 0 }}</p>
           <span class="mt-2 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-lg uppercase tracking-widest">
             {{ activeProductsCount }} Active
           </span>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-center mb-6">
           <h2 class="font-bold text-lg text-gray-800 uppercase tracking-widest">Products in this Category</h2>
        </div>

        <div v-if="!category.products || category.products.length === 0" class="py-16 text-center bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
           <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
           <p class="text-gray-500 font-medium">No products found in this category.</p>
           <router-link to="/admin/products/add" class="inline-block mt-4 text-xs font-bold text-blue-600 hover:underline uppercase tracking-widest">
             + Add New Product
           </router-link>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="product in category.products" :key="product.id" @click="goToProductDetail(product.id)" class="group cursor-pointer bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
            
            <div class="relative aspect-square bg-gray-100 overflow-hidden">
              <img v-if="product.image" :src="product.image" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Product Image" />
              <div v-else class="w-full h-full flex justify-center items-center text-gray-400 text-xs font-bold">NO IMAGE</div>
              
              <div class="absolute top-2 left-2 flex flex-col gap-1">
                <span :class="product.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'" class="px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest">
                  {{ product.status }}
                </span>
                <span v-if="product.discount_price" class="bg-red-500 text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest shadow-sm w-fit">
                  SALE
                </span>
              </div>
            </div>

            <div class="p-4 flex flex-col flex-grow">
              <p class="text-[9px] font-mono text-gray-400 mb-1">SKU: {{ product.code }}</p>
              <h3 class="font-bold text-sm text-gray-900 uppercase tracking-wide line-clamp-2 mb-2">{{ product.name }}</h3>
              
              <div class="mt-auto pt-3 border-t border-gray-50 flex justify-between items-end">
                <div>
                  <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Price</p>
                  <div class="flex items-center gap-2">
                    <span v-if="product.discount_price" class="font-black text-red-600 text-sm">{{ formatPrice(product.discount_price) }}</span>
                    <span :class="product.discount_price ? 'text-[10px] text-gray-400 line-through' : 'font-black text-gray-900 text-sm'">
                      {{ formatPrice(product.price) }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5">Stock</p>
                  <p :class="product.stock <= 5 ? 'text-red-500' : 'text-gray-900'" class="font-black text-sm">
                    {{ product.stock }}
                  </p>
                </div>
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
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();
const category = ref(null);
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const activeProductsCount = computed(() => {
  if (!category.value || !category.value.products) return 0;
  return category.value.products.filter(p => p.status === 'active').length;
});

const fetchCategoryDetail = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/categories/${route.params.id}`, axiosConfig);
    category.value = res.data.data;
  } catch (error) {
    console.error("Fetch error:", error);
    Swal.fire("Error", "Failed to load category details.", "error");
    router.push('/admin/categories');
  } finally {
    setTimeout(() => { isLoading.value = false; }, 400);
  }
};

const goToProductDetail = (productId) => {
  // Arahkan ke halaman detail produk admin (yang baru saja Anda buat sebelumnya)
  router.push(`/admin/products/view/${productId}`);
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);
};

onMounted(fetchCategoryDetail);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>