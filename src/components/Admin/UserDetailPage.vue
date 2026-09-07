<!-- <template>
  <div v-if="user" class="space-y-8">
    <Breadcrumb />
    <div class="flex items-center gap-6 bg-white shadow-sm p-8 rounded-2xl">
      <img
        :src="
          user.profile_image
            ? `${user.profile_image}`
            : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
        "
        class="rounded-full w-20 h-20 object-cover"
      />
      <div class="flex-1 flex justify-between items-start">
        <div>
          <h2 class="font-bold text-2xl">{{ user.first_name }} {{ user.last_name }}</h2>
          <p class="text-gray-500 font-medium mt-1">{{ user.email }}</p>
        </div>
        <div class="text-right bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
          <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">
            Member Since
          </p>
          <p class="text-xs font-semibold text-gray-800">
            {{ formatDateLong(user.created_at) }}
          </p>
        </div>
      </div>
    </div>

    <h3 class="font-bold text-xl">Registered Addresses ({{ user.addresses.length }})</h3>

    <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
      <div
        v-for="addr in user.addresses"
        :key="addr.id"
        class="relative bg-white shadow-sm p-6 border border-gray-200 rounded-xl"
      >
        <span
          v-if="addr.is_default"
          class="top-4 right-4 absolute bg-green-100 px-2 py-1 rounded-full font-bold text-[10px] text-green-700 uppercase"
          >Default</span
        >
        <p class="mb-2 font-bold text-lg">
          {{ addr.first_name_address }} {{ addr.last_name_address }}
        </p>
        <div class="space-y-1 text-gray-600 text-sm">
          <p>{{ addr.address_location }} ({{ addr.location_type }})</p>
          <p>{{ addr.city }}, {{ addr.province }}</p>
          <p>{{ addr.region }} - {{ addr.postal_code }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "../../components/Admin/Layout/Breadcrumb.vue"; // Sesuaikan path-nya
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const user = ref(null);
const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const formatDateLong = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(async () => {
  const res = await axios.get(`${BASE_URL}/admin/users/${route.params.id}`, axiosConfig); //
  user.value = res.data;
});
</script> -->

<template>
  <!-- TAMPILAN SAAT DATA BERHASIL DIMUAT -->
  <div v-if="user" class="space-y-8">
    <Breadcrumb />
    <div class="flex items-center gap-6 bg-white shadow-sm p-8 rounded-2xl">
      <img
        :src="
          user.profile_image
            ? `${user.profile_image}`
            : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
        "
        class="rounded-full w-20 h-20 object-cover"
      />
      
      <div class="flex-1 flex justify-between items-start">
        <div>
          <h2 class="font-bold text-2xl">{{ user.first_name }} {{ user.last_name }}</h2>
          <p class="text-gray-500 font-medium mt-1">{{ user.email }}</p>
          
          <!-- BADGE LOYALTY POINTS (DIAMANKAN DENGAN NUMBER CASTING) -->
          <div class="inline-flex items-center gap-1.5 mt-3 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="text-xs font-bold text-amber-700">
              {{ Number(user.point || 0).toLocaleString('id-ID') }} Loyalty Points
            </span>
          </div>
          
        </div>
        
        <div class="text-right bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
          <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">
            Member Since
          </p>
          <p class="text-xs font-semibold text-gray-800">
            {{ formatDateLong(user.created_at) }}
          </p>
        </div>
      </div>
    </div>

    <!-- DIAMANKAN DENGAN OPTIONAL CHAINING (?.) -->
    <h3 class="font-bold text-xl">Registered Addresses ({{ user.addresses?.length || 0 }})</h3>

    <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
      <!-- FALLBACK ARRAY KOSONG AGAR TIDAK CRASH -->
      <div
        v-for="addr in (user.addresses || [])"
        :key="addr.id"
        class="relative bg-white shadow-sm p-6 border border-gray-200 rounded-xl"
      >
        <span
          v-if="addr.is_default"
          class="top-4 right-4 absolute bg-green-100 px-2 py-1 rounded-full font-bold text-[10px] text-green-700 uppercase"
          >Default</span
        >
        <p class="mb-2 font-bold text-lg">
          {{ addr.first_name_address }} {{ addr.last_name_address }}
        </p>
        <div class="space-y-1 text-gray-600 text-sm">
          <p>{{ addr.address_location }} ({{ addr.location_type }})</p>
          <p>{{ addr.city }}, {{ addr.province }}</p>
          <p>{{ addr.region }} - {{ addr.postal_code }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- TAMPILAN SAAT SEDANG LOADING MEMANGGIL API -->
  <div v-else class="flex flex-col items-center justify-center min-h-[400px]">
    <div class="w-10 h-10 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
    <p class="mt-4 text-sm text-gray-500 font-medium tracking-wide">Memuat data pengguna...</p>
  </div>
</template>

<script setup>
import Breadcrumb from "../../components/Admin/Layout/Breadcrumb.vue"; 
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const user = ref(null);
const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const formatDateLong = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/users/${route.params.id}`, axiosConfig);
    user.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil detail user:", error);
    // Tambahkan alert atau redirect jika API gagal
  }
});
</script>