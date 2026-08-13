<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[500px] max-w-5xl mx-auto animate-fade-in"
  >
    <Breadcrumb />
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
          <h1 class="text-2xl font-bold text-gray-800">Bag Type Detail</h1>
          <p class="mt-1 text-xs tracking-widest text-gray-500 uppercase">Overview</p>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
      ></div>
    </div>

    <div v-else-if="category" class="space-y-8">
      <div
        class="flex flex-col items-start justify-between gap-8 p-6 bg-gray-50 rounded-2xl md:flex-row"
      >
        <div class="space-y-4">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Code
            </p>
            <p class="font-mono text-lg font-bold text-blue-600">{{ category.code }}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Type Name
            </p>
            <p class="text-2xl font-black tracking-tight text-gray-900 uppercase">
              {{ category.name }}
            </p>
          </div>
          <div class="max-w-xl">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Description
            </p>
            <p class="text-sm leading-relaxed text-gray-600">
              {{ category.description || "No description provided." }}
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
          <span class="mt-2 text-[10px] text-gray-400 italic"
            >Connected to this type</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const route = useRoute();
const router = useRouter();
const category = ref(null);
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchDetail = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/admin/bag-categories/${route.params.id}`,
      axiosConfig
    );
    category.value = res.data.data;
  } catch (error) {
    console.error(error);
    router.push("/admin/bag-categories");
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchDetail);
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
