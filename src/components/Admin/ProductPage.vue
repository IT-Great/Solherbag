<!-- <template>
  <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-2xl">
    <div
      class="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 mb-8"
    >
      <h1 class="font-bold text-gray-800 text-2xl">Products</h1>

      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div class="relative flex-grow md:flex-grow-0">
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
            placeholder="Search product name..."
            class="bg-gray-50 py-2 pr-4 pl-10 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black w-full md:w-64 text-sm transition"
          />
        </div>

        <select
          v-model="selectedCategory"
          class="bg-gray-50 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black h-[42px] text-gray-700 text-sm transition"
        >
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>

        <router-link
          to="/admin/products/add"
          class="flex items-center bg-black hover:bg-gray-800 px-6 py-2 rounded-xl h-[42px] font-bold text-white whitespace-nowrap transition"
          >+ New Product</router-link
        >
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Image</th>
            <th class="pb-4">Code</th>
            <th class="pb-4">Name</th>
            <th class="pb-4">Category</th>
            <th class="pb-4">Price</th>
            <th class="pb-4">Stock</th>
            <th class="pb-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="p in paginatedProducts"
            :key="p.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition"
          >
            <td class="py-4">
              <img
                :src="p.image"
                class="shadow-sm rounded-lg w-16 h-16 object-cover"
                alt="Product Image"
              />
            </td>
            <td class="py-4 font-mono text-sm">{{ p.code }}</td>
            <td class="py-4 font-bold text-gray-800">{{ p.name }}</td>
            <td class="py-4">
              <span
                class="bg-blue-50 px-3 py-1 rounded-full font-medium text-blue-600 text-xs"
              >
                {{ p.category?.name }}
              </span>
            </td>
            <td class="py-4 font-bold">
              <div v-if="p.discount_price">
                <span class="text-red-500">{{
                  formatPrice(p.discount_price)
                }}</span>
                <span class="block text-gray-400 text-xs line-through">{{
                  formatPrice(p.price)
                }}</span>
              </div>
              <div v-else>
                {{ formatPrice(p.price) }}
              </div>
            </td>
            <td class="py-4">
              <span :class="p.stock < 5 ? 'text-red-500 font-bold' : ''">
                {{ p.stock }} pcs
              </span>
            </td>
            <td class="py-4 text-center">
              <router-link
                :to="`/admin/products/edit/${p.id}`"
                class="mr-4 font-medium text-amber-500 hover:text-amber-600"
                >Edit</router-link
              >
              <button
                @click="confirmDelete(p.id)"
                class="font-medium text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="filteredProducts.length > 0"
      class="flex justify-between items-center mt-8 pt-6 border-gray-50 border-t"
    >
      <p class="text-gray-400 text-sm">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}
        of {{ filteredProducts.length }} products
      </p>

      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="hover:bg-gray-50 disabled:opacity-30 px-4 py-2 border rounded-xl transition"
        >
          Previous
        </button>
        <button
          v-for="page in totalPages"
          :key="page"
          @click="currentPage = page"
          :class="
            currentPage === page ? 'bg-black text-white' : 'hover:bg-gray-50'
          "
          class="border rounded-xl w-10 h-10 font-medium transition"
        >
          {{ page }}
        </button>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="hover:bg-gray-50 disabled:opacity-30 px-4 py-2 border rounded-xl transition"
        >
          Next
        </button>
      </div>
    </div>

    <div v-else class="py-20 text-gray-400 text-center">
      <p>No products found matching your search or filter.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref("");
const searchQuery = ref(""); 

const currentPage = ref(1);
const itemsPerPage = 5;

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchesCategory =
      selectedCategory.value === "" ||
      p.category?.name === selectedCategory.value;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage),
);

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProducts.value.slice(start, end);
});

watch([selectedCategory, searchQuery], () => {
  currentPage.value = 1;
});

const fetchData = async () => {
  try {
    const [resProd, resCat] = await Promise.all([
      axios.get(`${BASE_URL}/products`, axiosConfig),
      axios.get(`${BASE_URL}/categories`, axiosConfig),
    ]);
    products.value = resProd.data;
    categories.value = resCat.data;
  } catch (error) {
    console.error("Fetch error:", error);
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      await axios.delete(`${BASE_URL}/products/${id}`, axiosConfig);
      fetchData();
      Swal.fire("Deleted!", "Success", "success");
    }
  });
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );

onMounted(fetchData);
</script> -->

<!-- <template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[500px]"
  >
    <div
      v-if="isLoading"
      class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300"
    >
      <div class="flex flex-col items-center">
        <div
          class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse"
        >
          Loading Products...
        </p>
      </div>
    </div>

    <div
      class="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 mb-8"
    >
      <h1 class="font-bold text-gray-800 text-2xl">Products</h1>

      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div class="relative flex-grow md:flex-grow-0">
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
            placeholder="Search product name..."
            class="bg-gray-50 py-2 pr-4 pl-10 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black w-full md:w-64 text-sm transition"
          />
        </div>

        <div
          class="flex items-center bg-gray-50 px-3 border border-gray-200 rounded-xl h-[42px]"
        >
          <span class="mr-2 text-gray-400 text-xs">Show:</span>
          <select
            v-model="itemsPerPage"
            class="bg-transparent outline-none font-bold text-gray-700 text-sm cursor-pointer"
          >
            <option :value="1">1</option>
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
          </select>
        </div>

        <select
          v-model="selectedCategory"
          class="bg-gray-50 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black h-[42px] text-gray-700 text-sm transition"
        >
          <option value="">All Categories</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.category_name"
          >
            {{ cat.category_name }}
          </option>
        </select>

        <router-link
          to="/admin/products/inactive"
          class="flex items-center hover:bg-gray-50 px-6 py-2 border border-black rounded-xl h-[42px] font-bold text-black transition"
        >
          Inactive Archive
        </router-link>

        <router-link
          to="/admin/products/add"
          class="flex items-center bg-black hover:bg-gray-800 px-6 py-2 rounded-xl h-[42px] font-bold text-white whitespace-nowrap transition"
          >+ New Product</router-link
        >
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Image</th>
            <th class="pb-4">Code</th>
            <th class="pb-4">Name</th>
            <th class="pb-4">Category</th>
            <th class="pb-4">Price</th>
            <th class="pb-4">Stock</th>
            <th class="pb-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="p in paginatedProducts"
            :key="p.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition"
          >
            <td class="py-4">
              <img
                :src="p.image"
                class="shadow-sm rounded-lg w-16 h-16 object-cover"
                alt="Product Image"
              />
            </td>
            <td class="py-4 font-mono text-sm">{{ p.code }}</td>
            <td class="py-4 font-bold text-gray-800">{{ p.name }}</td>
            <td class="py-4">
              <span
                class="bg-blue-50 px-3 py-1 rounded-full font-medium text-blue-600 text-xs"
              >
                {{ p.category?.name }}
              </span>
            </td>
            <td class="py-4 font-bold">
              <div v-if="p.discount_price">
                <span class="text-red-500">{{
                  formatPrice(p.discount_price)
                }}</span>
                <span class="block text-gray-400 text-xs line-through">{{
                  formatPrice(p.price)
                }}</span>
              </div>
              <div v-else>
                {{ formatPrice(p.price) }}
              </div>
            </td>
            <td class="py-4">
              <span :class="p.stock < 5 ? 'text-red-500 font-bold' : ''">
                {{ p.stock }} pcs
              </span>
            </td>
            <td class="py-4 text-center">
              <router-link
                :to="`/admin/products/view/${p.id}`"
                class="mr-4 font-medium text-blue-500 hover:text-blue-600"
              >
                View
              </router-link>
              <button
                @click="goToEdit(p)"
                class="mr-4 font-medium text-amber-500 hover:text-amber-600"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(p.id)"
                class="font-medium text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredProducts.length > 0"
      class="flex justify-between items-center mt-8 pt-6 border-gray-50 border-t"
    >
      <p class="text-gray-400 text-sm">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}
        of {{ filteredProducts.length }} products
      </p>

      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="hover:bg-gray-50 disabled:opacity-30 px-4 py-2 border rounded-xl transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Previous
        </button>

        <button
          v-for="(page, index) in visiblePages"
          :key="index"
          @click="typeof page === 'number' ? (currentPage = page) : null"
          :disabled="page === '...'"
          :class="[
            page === currentPage ? 'bg-black text-white' : 'hover:bg-gray-50',
            page === '...'
              ? 'cursor-default border-transparent hover:bg-transparent'
              : 'border',
          ]"
          class="rounded-xl w-10 h-10 font-medium transition"
        >
          {{ page }}
        </button>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="hover:bg-gray-50 disabled:opacity-30 px-4 py-2 border rounded-xl transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>

    <div v-else-if="!isLoading" class="py-20 text-gray-400 text-center">
      <p>No products found matching your search or filter.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref("");
const searchQuery = ref("");
const isLoading = ref(false); // State loading

const currentPage = ref(1);
const itemsPerPage = ref(5);
const router = useRouter();

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchesCategory =
      selectedCategory.value === "" ||
      p.category?.name === selectedCategory.value;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage.value),
);

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const maxVisible = 7;

  if (total <= maxVisible) {
    // Jika total halaman 7 atau kurang, tampilkan semua angka (misal: 1 2 3 4 5 6 7)
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  // Jika user berada di 4 halaman pertama
  // Format: 1, 2, 3, 4, 5, ..., {total}
  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }

  // Jika user berada di 4 halaman terakhir
  // Format: 1, ..., {total-4}, {total-3}, {total-2}, {total-1}, {total}
  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }

  // Jika user berada di tengah-tengah
  // Format: 1, ..., {current-1}, {current}, {current+1}, ..., {total}
  return [1, "...", current - 1, current, current + 1, "...", total];
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

const goToEdit = (product) => {
  // Pindah halaman sekaligus membawa 'state' data produk secara utuh
  router.push({
    name: "ProductEdit", // Pastikan nama route ini sesuai dengan di router/index.js Anda
    params: { id: product.id },
    state: { productData: JSON.parse(JSON.stringify(product)) },
  });
};

watch([selectedCategory, searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

const fetchData = async () => {
  isLoading.value = true; // Mulai loading
  try {
    const [resProd, resCat] = await Promise.all([
      axios.get(`${BASE_URL}/products`, axiosConfig),
      axios.get(`${BASE_URL}/categories`, axiosConfig),
    ]);
    products.value = resProd.data;
    categories.value = resCat.data.data;
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    // Sedikit delay agar transisi tidak flicker jika internet terlalu cepat
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      isLoading.value = true;
      try {
        await axios.delete(`${BASE_URL}/products/${id}`, axiosConfig);
        await fetchData();
        Swal.fire("Deleted!", "Success", "success");
      } catch (err) {
        isLoading.value = false;
        Swal.fire("Error", "Failed to delete product.", "error");
      }
    }
  });
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );

onMounted(fetchData);
</script> -->

<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[500px] animate-fade-in"
  >
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100">
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Total Products</p>
        <p class="text-4xl font-black text-black">{{ products.length }}</p>
      </div>
      <div class="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
        <p class="text-xs text-blue-500 font-bold uppercase tracking-widest mb-1">Healthy Stock</p>
        <p class="text-4xl font-black text-blue-600">{{ healthyStockCount }}</p>
      </div>
      <div class="p-6 bg-red-50/50 rounded-2xl border border-red-100">
        <p class="text-xs text-red-600 font-bold uppercase tracking-widest mb-1">Low Stock (under 5)</p>
        <p class="text-4xl font-black text-red-700">{{ lowStockCount }}</p>
      </div>
      <div class="p-6 bg-purple-50/50 rounded-2xl border border-purple-100">
        <p class="text-xs text-purple-600 font-bold uppercase tracking-widest mb-1">On Discount</p>
        <p class="text-4xl font-black text-purple-700">{{ discountedProductsCount }}</p>
      </div>
    </div>

    <div
      class="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 mb-8"
    >
      <h1 class="font-bold text-gray-800 text-2xl">Products</h1>

      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div class="relative flex-grow md:flex-grow-0">
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
            placeholder="Search product name..."
            class="bg-gray-50 py-2 pr-4 pl-10 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black w-full md:w-64 text-sm transition"
          />
        </div>

        <div
          class="flex items-center bg-gray-50 px-3 border border-gray-200 rounded-xl h-[42px]"
        >
          <span class="mr-2 text-gray-400 text-xs">Show:</span>
          <select
            v-model="itemsPerPage"
            class="bg-transparent outline-none font-bold text-gray-700 text-sm cursor-pointer"
          >
            <option :value="1">1</option>
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
          </select>
        </div>

        <select
          v-model="selectedCategory"
          class="bg-gray-50 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black h-[42px] text-gray-700 text-sm transition cursor-pointer"
        >
          <option value="">All Categories</option>
          <option
            v-for="cat in categories"
            :key="cat.id"
            :value="cat.category_name"
          >
            {{ cat.category_name }}
          </option>
        </select>

        <router-link
          to="/admin/products/inactive"
          class="flex items-center hover:bg-gray-50 px-6 py-2 border border-black rounded-xl h-[42px] font-bold text-black transition"
        >
          Inactive Archive
        </router-link>

        <router-link
          to="/admin/products/add"
          class="flex items-center bg-black hover:bg-gray-800 px-6 py-2 rounded-xl h-[42px] font-bold text-white whitespace-nowrap transition"
          >+ New Product</router-link
        >
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Image</th>
            <th class="pb-4">Code</th>
            <th class="pb-4">Name</th>
            <th class="pb-4">Category</th>
            <th class="pb-4">Price</th>
            <th class="pb-4">Stock</th>
            <th class="pb-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody v-if="isLoading" class="text-gray-600">
          <tr v-for="i in 5" :key="`skeleton-${i}`" class="animate-pulse border-b border-gray-50">
            <td class="py-4"><div class="h-16 w-16 bg-gray-200 rounded-lg"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-12"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-32"></div></td>
            <td class="py-4"><div class="h-5 bg-gray-200 rounded-full w-20"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-10"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-32 mx-auto"></div></td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr
            v-for="p in paginatedProducts"
            :key="p.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition"
          >
            <td class="py-4">
              <img
                :src="`http://31.97.60.207:8246/${p.image}`"
                class="shadow-sm rounded-lg w-16 h-16 object-cover"
                alt="Product Image"
              />
            </td>
            <td class="py-4 font-mono text-sm">{{ p.code }}</td>
            <td class="py-4 font-bold text-gray-800">{{ p.name }}</td>
            <td class="py-4">
              <span
                class="bg-blue-50 px-3 py-1 rounded-full font-medium text-blue-600 text-xs"
              >
                {{ p.category?.name }}
              </span>
            </td>
            <td class="py-4 font-bold">
              <div v-if="p.discount_price">
                <span class="text-red-500">{{
                  formatPrice(p.discount_price)
                }}</span>
                <span class="block text-gray-400 text-xs line-through">{{
                  formatPrice(p.price)
                }}</span>
              </div>
              <div v-else>
                {{ formatPrice(p.price) }}
              </div>
            </td>
            <td class="py-4">
              <span :class="p.stock < 5 ? 'text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded' : ''">
                {{ p.stock }} pcs
              </span>
            </td>
            <td class="py-4 text-center">
              <router-link
                :to="`/admin/products/view/${p.id}`"
                class="mr-4 font-medium text-blue-500 hover:text-blue-600"
              >
                View
              </router-link>
              <button
                @click="goToEdit(p)"
                class="mr-4 font-medium text-amber-500 hover:text-amber-600"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(p.id)"
                class="font-medium text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="filteredProducts.length === 0">
            <td colspan="7" class="py-12 text-center text-gray-400 italic">No products found matching your criteria.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredProducts.length > 0"
      class="flex justify-between items-center mt-8 pt-6 border-gray-50 border-t"
    >
      <p class="text-gray-400 text-sm">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}
        of {{ filteredProducts.length }} products
      </p>

      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="hover:bg-gray-50 disabled:opacity-30 px-4 py-2 border rounded-xl transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Previous
        </button>

        <button
          v-for="(page, index) in visiblePages"
          :key="index"
          @click="typeof page === 'number' ? (currentPage = page) : null"
          :disabled="page === '...'"
          :class="[
            page === currentPage ? 'bg-black text-white' : 'hover:bg-gray-50',
            page === '...'
              ? 'cursor-default border-transparent hover:bg-transparent'
              : 'border',
          ]"
          class="rounded-xl w-10 h-10 font-medium transition"
        >
          {{ page }}
        </button>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="hover:bg-gray-50 disabled:opacity-30 px-4 py-2 border rounded-xl transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref("");
const searchQuery = ref("");
const isLoading = ref(true);

const currentPage = ref(1);
const itemsPerPage = ref(5);
const router = useRouter();

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// --- COMPUTED METRICS ---
const healthyStockCount = computed(() => {
  return products.value.filter(p => p.stock >= 5).length;
});

const lowStockCount = computed(() => {
  return products.value.filter(p => p.stock < 5).length;
});

// [BARU] Menghitung produk yang memiliki discount_price (dianggap diskon/sale)
const discountedProductsCount = computed(() => {
  return products.value.filter(p => p.discount_price && parseFloat(p.discount_price) < parseFloat(p.price)).length;
});

// --- FILTERING & PAGINATION ---
const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchesCategory =
      selectedCategory.value === "" ||
      p.category?.name === selectedCategory.value;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage.value),
);

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const maxVisible = 7;

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 4) {
    return [1, 2, 3, 4, 5, "...", total];
  }

  if (current >= total - 3) {
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  }

  return [1, "...", current - 1, current, current + 1, "...", total];
});

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredProducts.value.slice(start, end);
});

// --- ACTIONS ---
const goToEdit = (product) => {
  router.push({
    name: "ProductEdit", 
    params: { id: product.id },
    state: { productData: JSON.parse(JSON.stringify(product)) },
  });
};

watch([selectedCategory, searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resProd, resCat] = await Promise.all([
      axios.get(`${BASE_URL}/products`, axiosConfig),
      axios.get(`${BASE_URL}/categories`, axiosConfig),
    ]);
    products.value = resProd.data;
    categories.value = resCat.data.data;
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      isLoading.value = true;
      try {
        await axios.delete(`${BASE_URL}/products/${id}`, axiosConfig);
        await fetchData();
        Swal.fire("Deleted!", "Success", "success");
      } catch (err) {
        isLoading.value = false;
        Swal.fire("Error", "Failed to delete product.", "error");
      }
    }
  });
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style>