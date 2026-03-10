<!-- <template>
  <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-2xl">
    <h1 class="mb-8 font-bold text-gray-800 text-2xl">Registered Users</h1>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4 font-medium">Profile</th>
            <th class="pb-4 font-medium">Full Name</th>
            <th class="pb-4 font-medium">Email</th>
            <th class="pb-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer"
          >
            <td class="py-4">
              <img
                :src="
                  user.profile_image
                    ? `${user.profile_image}`
                    : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
                "
                class="rounded-full w-10 h-10 object-cover"
              />
            </td>
            <td class="py-4 font-bold">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="py-4">{{ user.email }}</td>
            <td class="py-4 text-center">
              <button
                @click="$router.push(`/admin/users/${user.id}`)"
                class="font-medium text-blue-600 text-sm hover:underline"
              >
                View Addresses
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const users = ref([]);
const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchUsers = async () => {
  const res = await axios.get(
    `${BASE_URL}/admin/users`,
    axiosConfig,
  ); //
  users.value = res.data;
};

onMounted(fetchUsers);
</script> -->

<!-- <template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]">
    
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="border-4 border-gray-200 border-t-blue-600 rounded-full w-12 h-12 animate-spin"></div>
        <p class="mt-4 font-bold text-blue-600 text-xs uppercase tracking-widest animate-pulse">Fetching Users...</p>
      </div>
    </div>

    <h1 class="mb-8 font-bold text-gray-800 text-2xl">Registered Users</h1>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4 font-medium">Profile</th>
            <th class="pb-4 font-medium">Full Name</th>
            <th class="pb-4 font-medium">Email</th>
            <th class="pb-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="user in users"
            :key="user.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer"
            @click="$router.push(`/admin/users/${user.id}`)"
          >
            <td class="py-4">
              <img
                :src="
                  user.profile_image
                    ? `${user.profile_image}`
                    : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`
                "
                class="shadow-sm rounded-full w-10 h-10 object-cover"
                alt="User Profile"
              />
            </td>
            <td class="py-4 font-bold">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="py-4">{{ user.email }}</td>
            <td class="py-4 text-center">
              <button
                class="font-medium text-blue-600 text-sm hover:underline"
              >
                View Addresses
              </button>
            </td>
          </tr>
          
          <tr v-if="!isLoading && users.length === 0">
            <td colspan="4" class="py-20 text-gray-400 text-center italic">
              No registered users found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const users = ref([]);
const isLoading = ref(false); // State Loading

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const fetchUsers = async () => {
  isLoading.value = true; // Aktifkan spinner
  try {
    const res = await axios.get(
      `${BASE_URL}/admin/users`,
      axiosConfig,
    );
    users.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
  } finally {
    // Memberikan delay 500ms agar transisi halus (tidak flicker)
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

onMounted(fetchUsers);
</script> -->

<!-- <template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]"
  >
    <div
      v-if="isLoading"
      class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300"
    >
      <div class="flex flex-col items-center">
        <div
          class="border-4 border-gray-200 border-t-blue-600 rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-blue-600 text-xs uppercase tracking-widest animate-pulse"
        >
          Fetching Users...
        </p>
      </div>
    </div>

    <div class="mb-8">
      <h1 class="font-bold text-gray-800 text-2xl">Registered Users</h1>
      <p class="text-gray-500 text-sm">
        Manage all registered members of the platform.
      </p>
    </div>

    <div
      class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6"
    >
      <div class="relative w-full md:w-80">
        <span
          class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"
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
          placeholder="Search by name or email..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >Show:</span
        >
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold cursor-pointer"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4 font-medium">Profile</th>
            <th class="pb-4 font-medium">Full Name</th>
            <th class="pb-4 font-medium">Email</th>
            <th class="pb-4 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer group"
            @click="$router.push(`/admin/users/${user.id}`)"
          >
            <td class="py-4">
              <img
                :src="
                  user.profile_image
                    ? `${user.profile_image}`
                    : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`
                "
                class="shadow-sm rounded-full w-10 h-10 object-cover"
                alt="User Profile"
              />
            </td>
            <td
              class="py-4 font-bold text-gray-800 group-hover:text-blue-600 transition-colors"
            >
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="py-4">{{ user.email }}</td>
            <td class="py-4 text-center">
              <button
                class="bg-gray-100 hover:bg-blue-50 px-4 py-2 rounded-lg font-medium text-blue-600 text-xs transition"
              >
                View Details
              </button>
            </td>
          </tr>

          <tr v-if="!isLoading && paginatedUsers.length === 0">
            <td colspan="4" class="py-20 text-gray-400 text-center italic">
              {{
                searchQuery
                  ? "No users found matching your search."
                  : "No registered users found."
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredUsers.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing
        <span class="font-bold text-gray-800">{{ showingStart }}</span> to
        <span class="font-bold text-gray-800">{{ showingEnd }}</span> of
        <span class="font-bold text-gray-800">{{ filteredUsers.length }}</span>
        users
      </p>
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Previous
        </button>

        <div class="flex gap-1">
          <button
            v-for="(page, index) in visiblePages"
            :key="index"
            @click="typeof page === 'number' ? (currentPage = page) : null"
            :disabled="page === '...'"
            :class="[
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'hover:bg-gray-50 border-gray-200',
              page === '...'
                ? 'cursor-default border-transparent hover:bg-transparent'
                : 'border',
            ]"
            class="w-10 h-10 rounded-xl font-medium transition flex items-center justify-center text-sm"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const users = ref([]);
const isLoading = ref(false);

// --- State untuk Pagination & Filter ---
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10); // Default tampilkan 10 user per halaman

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// --- Computed Properties ---

// 1. Filter User berdasarkan Search Query
const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return users.value;

  return users.value.filter(
    (user) =>
      user.first_name.toLowerCase().includes(query) ||
      user.last_name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query),
  );
});

// 2. Hitung Total Halaman
const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage.value),
);

// 3. Potong Data (Slice) sesuai halaman aktif
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

// 4. Logic Teks "Showing X to Y"
const showingStart = computed(() => {
  if (filteredUsers.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, filteredUsers.value.length),
);

// 5. Logic Tombol Halaman (Agar tidak terlalu panjang jika halaman banyak)
// const displayedPages = computed(() => {
//   const total = totalPages.value;
//   const current = currentPage.value;
//   const delta = 2;
//   let range = [];
//   for (
//     let i = Math.max(1, current - delta);
//     i <= Math.min(total, current + delta);
//     i++
//   ) {
//     range.push(i);
//   }
//   return range;
// });

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const maxVisible = 7;

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }

  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, '...', current - 1, current, current + 1, '...', total];
});

// --- Watchers ---
// Reset ke halaman 1 jika user mencari sesuatu atau mengubah limit row
watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

// --- Fetch Data ---
const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/users`, axiosConfig);
    users.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
/* Transisi halus saat hover row */
tr {
  transition: all 0.2s ease-in-out;
}
</style> -->

<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]">
    
    <div class="mb-8">
      <h1 class="font-bold text-gray-800 text-2xl">Registered Users</h1>
      <p class="text-gray-500 text-sm">
        Manage all registered members of the platform.
      </p>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Show:</span>
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm font-bold cursor-pointer"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4 font-medium pl-2">Profile</th>
            <th class="pb-4 font-medium">Full Name</th>
            <th class="pb-4 font-medium">Email</th>
            <th class="pb-4 font-medium text-center pr-2">Action</th>
          </tr>
        </thead>
        
        <tbody v-if="isLoading">
          <tr v-for="i in (itemsPerPage > 10 ? 10 : itemsPerPage)" :key="`skel-${i}`" class="border-b border-gray-50">
            <td class="py-4 pl-2">
              <div class="shadow-sm rounded-full w-10 h-10 bg-gray-200 animate-pulse"></div>
            </td>
            <td class="py-4">
              <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="py-4">
              <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="py-4 pr-2 text-center">
              <div class="inline-block h-8 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
            </td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr
            v-for="user in paginatedUsers"
            :key="user.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer group"
            @click="$router.push(`/admin/users/${user.id}`)"
          >
            <td class="py-4 pl-2">
              <img
                :src="user.profile_image ? `${user.profile_image}` : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}&background=random`"
                class="shadow-sm rounded-full w-10 h-10 object-cover"
                alt="User Profile"
              />
            </td>
            <td class="py-4 font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
              {{ user.first_name }} {{ user.last_name }}
            </td>
            <td class="py-4 text-sm">{{ user.email }}</td>
            <td class="py-4 text-center pr-2">
              <button class="bg-gray-100 group-hover:bg-blue-50 px-4 py-2 rounded-lg font-medium text-gray-600 group-hover:text-blue-600 text-xs transition-colors">
                View Details
              </button>
            </td>
          </tr>

          <tr v-if="paginatedUsers.length === 0">
            <td colspan="4" class="py-20 text-gray-400 text-center italic text-sm">
              {{ searchQuery ? "No users found matching your search." : "No registered users found." }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredUsers.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing
        <span class="font-bold text-gray-800">{{ showingStart }}</span> to
        <span class="font-bold text-gray-800">{{ showingEnd }}</span> of
        <span class="font-bold text-gray-800">{{ filteredUsers.length }}</span>
        users
      </p>

      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Previous
        </button>

        <div class="flex gap-1">
          <button
            v-for="(page, index) in visiblePages"
            :key="index"
            @click="typeof page === 'number' ? (currentPage = page) : null"
            :disabled="page === '...'"
            :class="[
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'hover:bg-gray-50 border-gray-200',
              page === '...'
                ? 'cursor-default border-transparent hover:bg-transparent'
                : 'border',
            ]"
            class="w-10 h-10 rounded-xl font-bold transition flex items-center justify-center text-sm"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
// LOGIKA SCRIPT TETAP SAMA PERSIS.
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const users = ref([]);
const isLoading = ref(true); // Pastikan ini true di awal agar skeleton langsung jalan saat halaman dimuat

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10); 

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const filteredUsers = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return users.value;

  return users.value.filter(
    (user) =>
      user.first_name.toLowerCase().includes(query) ||
      user.last_name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query),
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredUsers.value.length / itemsPerPage.value),
);

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredUsers.value.slice(start, end);
});

const showingStart = computed(() => {
  if (filteredUsers.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, filteredUsers.value.length),
);

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const maxVisible = 7;

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, '...', total];
  }

  if (current >= total - 3) {
    return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, '...', current - 1, current, current + 1, '...', total];
});

watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

const fetchUsers = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/users`, axiosConfig);
    users.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil data user:", error);
  } finally {
    // Sedikit delay (400ms) agar skeleton loading terasa lebih natural dan tidak "flickering" 
    setTimeout(() => {
      isLoading.value = false;
    }, 400);
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
tr {
  transition: all 0.2s ease-in-out;
}
</style>