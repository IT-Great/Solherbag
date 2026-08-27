<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]">
    <!-- Optional: Jika Breadcrumb Anda support custom routing -->
    <Breadcrumb />
    
    <div class="flex flex-col justify-between gap-4 mb-8 md:flex-row md:items-end">
      <div>
        <h1 class="flex items-center gap-3 text-2xl font-bold text-gray-800">
          <button @click="$router.back()" class="p-2 transition-colors bg-gray-100 rounded-full hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          Promo Claims
        </h1>
        <p class="mt-2 text-sm text-gray-500">Track and manage users who claimed promotional vouchers.</p>
      </div>
    </div>

    <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by email or promo code..."
          class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-bold tracking-wide text-gray-400 uppercase">Show:</span>
        <select
          v-model="itemsPerPage"
          class="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
        >
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
          <option :value="100">100</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-xs tracking-widest text-gray-400 uppercase border-b">
            <th class="pb-4 pl-2 font-medium">Claim ID</th>
            <th class="pb-4 font-medium">Email Address</th>
            <th class="pb-4 font-medium">Promo Code</th>
            <th class="pb-4 font-medium">Discount Value</th>
            <th class="pb-4 font-medium text-center">Status</th>
            <th class="pb-4 pr-2 font-medium text-right">Claimed Date</th>
          </tr>
        </thead>

        <tbody v-if="isLoading">
          <tr v-for="i in itemsPerPage > 10 ? 10 : itemsPerPage" :key="`skel-${i}`" class="border-b border-gray-50">
            <td class="py-4 pl-2"><div class="w-16 h-4 bg-gray-200 rounded animate-pulse"></div></td>
            <td class="py-4"><div class="w-48 h-4 bg-gray-200 rounded animate-pulse"></div></td>
            <td class="py-4"><div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div></td>
            <td class="py-4"><div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div></td>
            <td class="py-4 text-center"><div class="inline-block w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div></td>
            <td class="py-4 pr-2 text-right"><div class="inline-block w-24 h-4 bg-gray-200 rounded animate-pulse"></div></td>
          </tr>
        </tbody>

        <tbody v-else class="text-sm text-gray-600">
          <tr v-for="claim in paginatedClaims" :key="claim.id" class="transition border-b border-gray-50 hover:bg-gray-50">
            <td class="py-4 pl-2 font-mono font-medium text-gray-900">#{{ claim.id }}</td>
            <td class="py-4 font-medium text-gray-800">{{ claim.email }}</td>
            <td class="py-4">
              <span class="px-2.5 py-1 text-xs font-bold text-gray-700 bg-gray-100 border border-gray-200 rounded-md tracking-wider">
                {{ claim.promo_code }}
              </span>
            </td>
            <td class="py-4 font-medium text-emerald-600">Rp {{ claim.discount_value?.toLocaleString('id-ID') }}</td>
            <td class="py-4 text-center">
              <span v-if="claim.is_used" class="px-3 py-1 text-[10px] font-bold tracking-widest text-red-700 uppercase bg-red-100 rounded-full">
                USED
              </span>
              <span v-else class="px-3 py-1 text-[10px] font-bold tracking-widest text-green-700 uppercase bg-green-100 rounded-full">
                ACTIVE
              </span>
            </td>
            <td class="py-4 pr-2 text-right text-gray-500 whitespace-nowrap">
              {{ formatDate(claim.created_at) }}
            </td>
          </tr>

          <tr v-if="paginatedClaims.length === 0">
            <td colspan="6" class="py-20 text-sm italic text-center text-gray-400">
              {{ searchQuery ? "No claims found matching your search." : "No promo claims recorded yet." }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- PAGINASI -->
    <div v-if="!isLoading && sortedAndFilteredClaims.length > 0" class="flex flex-col items-center justify-between gap-4 pt-6 mt-8 border-t md:flex-row border-gray-50">
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-gray-800">{{ showingStart }}</span> to
        <span class="font-bold text-gray-800">{{ showingEnd }}</span> of
        <span class="font-bold text-gray-800">{{ sortedAndFilteredClaims.length }}</span> entries
      </p>

      <div class="flex gap-2">
        <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
          Previous
        </button>
        <div class="flex gap-1">
          <button
            v-for="(page, index) in visiblePages"
            :key="index"
            @click="typeof page === 'number' ? (currentPage = page) : null"
            :disabled="page === '...'"
            :class="[
              currentPage === page ? 'bg-black text-white border-black shadow-sm' : 'hover:bg-gray-50 border-gray-200',
              page === '...' ? 'cursor-default border-transparent hover:bg-transparent' : 'border'
            ]"
            class="flex items-center justify-center w-10 h-10 text-sm font-bold transition rounded-xl"
          >
            {{ page }}
          </button>
        </div>
        <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 text-sm font-medium transition border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed">
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "../../components/Admin/Layout/Breadcrumb.vue";
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const claims = ref([]);
const isLoading = ref(true);
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const sortedAndFilteredClaims = computed(() => {
  const query = searchQuery.value.toLowerCase();
  let result = claims.value;

  if (query) {
    result = result.filter(
      (claim) =>
        claim.email.toLowerCase().includes(query) ||
        claim.promo_code.toLowerCase().includes(query)
    );
  }

  // Sort dari yang terbaru
  return result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
});

const totalPages = computed(() => Math.ceil(sortedAndFilteredClaims.value.length / itemsPerPage.value));

const paginatedClaims = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedAndFilteredClaims.value.slice(start, end);
});

const showingStart = computed(() => {
  if (sortedAndFilteredClaims.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, sortedAndFilteredClaims.value.length)
);

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
});

watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

const fetchClaims = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/users/promo-claims`, axiosConfig);
    claims.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil data promo claims:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchClaims();
});
</script>