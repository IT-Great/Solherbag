<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px] max-w-6xl mx-auto"
  >
    <Breadcrumb />
    <div
      v-if="isLoading"
      class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
        <p
          class="mt-4 text-xs font-bold tracking-widest text-black uppercase animate-pulse"
        >
          Loading Details...
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between pb-6 mb-8 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="p-2 text-gray-400 transition-colors rounded-full hover:text-black hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Category Detail</h1>
          <p class="mt-1 text-xs tracking-widest text-gray-500 uppercase">
            Overview and related products
          </p>
        </div>
      </div>
    </div>

    <div v-if="category" class="space-y-10 animate-fade-in">
      <div
        class="flex flex-col items-start justify-between gap-8 p-6 border border-gray-100 bg-gray-50 md:p-8 rounded-2xl md:flex-row"
      >
        <div class="space-y-4">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Category Code
            </p>
            <p class="font-mono text-lg font-bold text-blue-600">
              {{ category.category_code }}
            </p>
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Category Name
            </p>
            <p class="text-2xl font-black tracking-tight text-gray-900 uppercase">
              {{ category.category_name }}
            </p>
          </div>
          <div class="max-w-xl">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Description
            </p>
            <p class="text-sm leading-relaxed text-gray-600">
              {{
                category.meta?.description || "No description provided for this category."
              }}
            </p>
          </div>
        </div>

        <div
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-w-[200px] shrink-0 flex flex-col items-center justify-center"
        >
          <p class="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
            Total Products
          </p>
          <p class="text-4xl font-black text-black">
            {{ category.products?.length || 0 }}
          </p>
          <span
            class="mt-2 px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-lg uppercase tracking-widest"
          >
            {{ activeProductsCount }} Active
          </span>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-bold tracking-widest text-gray-800 uppercase">
            Products in this Category
          </h2>
        </div>

        <div
          v-if="!category.products || category.products.length === 0"
          class="py-16 text-center border border-gray-200 border-dashed bg-gray-50 rounded-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-12 h-12 mx-auto mb-4 text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <p class="font-medium text-gray-500">No products found in this category.</p>
          <router-link
            to="/admin/products/add"
            class="inline-block mt-4 text-xs font-bold tracking-widest text-blue-600 uppercase hover:underline"
          >
            + Add New Product
          </router-link>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="product in category.products"
            :key="product.id"
            @click="goToProductDetail(product.id)"
            class="flex flex-col overflow-hidden transition-all duration-300 bg-white border border-gray-100 cursor-pointer group rounded-xl hover:shadow-lg"
          >
            <div class="relative overflow-hidden bg-gray-100 aspect-square">
              <img
                v-if="product.image"
                :src="product.image"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                alt="Product Image"
              />
              <div
                v-else
                class="flex items-center justify-center w-full h-full text-xs font-bold text-gray-400"
              >
                NO IMAGE
              </div>

              <div class="absolute flex flex-col gap-1 top-2 left-2">
                <span
                  :class="
                    product.status === 'active'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-500 text-white'
                  "
                  class="px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest"
                >
                  {{ product.status }}
                </span>
                <span
                  v-if="product.discount_price"
                  class="bg-red-500 text-white px-2 py-1 rounded text-[8px] font-black uppercase tracking-widest shadow-sm w-fit"
                >
                  SALE
                </span>
              </div>
            </div>

            <div class="flex flex-col flex-grow p-4">
              <p class="text-[9px] font-mono text-gray-400 mb-1">
                SKU: {{ product.code }}
              </p>
              <h3
                class="mb-2 text-sm font-bold tracking-wide text-gray-900 uppercase line-clamp-2"
              >
                {{ product.name }}
              </h3>

              <div
                class="flex items-end justify-between pt-3 mt-auto border-t border-gray-50"
              >
                <div>
                  <p
                    class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5"
                  >
                    Price
                  </p>
                  <div class="flex items-center gap-2">
                    <span
                      v-if="product.discount_price"
                      class="text-sm font-black text-red-600"
                      >{{ formatPrice(product.discount_price) }}</span
                    >
                    <span
                      :class="
                        product.discount_price
                          ? 'text-[10px] text-gray-400 line-through'
                          : 'font-black text-gray-900 text-sm'
                      "
                    >
                      {{ formatPrice(product.price) }}
                    </span>
                  </div>
                </div>
                <div class="text-right">
                  <p
                    class="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-0.5"
                  >
                    Stock
                  </p>
                  <p
                    :class="product.stock <= 5 ? 'text-red-500' : 'text-gray-900'"
                    class="text-sm font-black"
                  >
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
import Breadcrumb from "./Layout/Breadcrumb.vue";

const route = useRoute();
const router = useRouter();
const category = ref(null);
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const activeProductsCount = computed(() => {
  if (!category.value || !category.value.products) return 0;
  return category.value.products.filter((p) => p.status === "active").length;
});

const fetchCategoryDetail = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/categories/${route.params.id}`, axiosConfig);
    category.value = res.data.data;
  } catch (error) {
    console.error("Fetch error:", error);
    Swal.fire("Error", "Failed to load category details.", "error");
    router.push("/admin/categories");
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 400);
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
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
