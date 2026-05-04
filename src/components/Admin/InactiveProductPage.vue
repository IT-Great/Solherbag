<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[500px]"
  >
    <Breadcrumb />
    <div
      v-if="isLoading"
      class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300"
    >
      <div class="flex flex-col items-center">
        <div
          class="border-4 border-gray-200 border-t-red-600 rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-red-600 text-xs uppercase tracking-widest animate-pulse"
        >
          Fetching Archive...
        </p>
      </div>
    </div>

    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="font-bold text-gray-400 text-2xl uppercase tracking-tighter">
          Inactive Products
        </h1>
        <button @click="$router.back()" class="text-blue-600 text-sm hover:underline">
          ← Back to Active Products
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead class="bg-gray-50">
          <tr class="text-gray-400 text-xs uppercase tracking-widest">
            <th class="p-4 rounded-l-xl">Info</th>
            <th class="p-4">Category</th>
            <th class="p-4 rounded-r-xl text-center">Management Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="p in products"
            :key="p.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition"
          >
            <td class="flex items-center gap-4 p-4">
              <img :src="p.image" class="grayscale rounded-lg w-12 h-12 object-cover" />
              <div>
                <p class="font-bold text-gray-800">{{ p.name }}</p>
                <p class="font-mono text-xs">{{ p.code }}</p>
              </div>
            </td>
            <td class="p-4">
              <span class="bg-gray-100 px-3 py-1 rounded-full text-gray-500 text-xs">{{
                p.category?.name
              }}</span>
            </td>
            <td class="p-4 text-center">
              <div class="flex justify-center gap-3">
                <button
                  @click="restoreProduct(p.id)"
                  class="bg-green-50 hover:bg-green-100 px-4 py-2 rounded-xl font-bold text-green-600 text-xs transition"
                >
                  Activate
                </button>
                <button
                  @click="confirmPermanentDelete(p.id)"
                  class="bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl font-bold text-red-600 text-xs transition"
                >
                  Delete Permanently
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && products.length === 0"
      class="py-20 text-gray-400 text-center"
    >
      <p class="font-serif italic">Archive is empty.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const products = ref([]);
const isLoading = ref(false);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// const fetchData = async () => {
//   isLoading.value = true;
//   try {
//     const res = await axios.get(`${BASE_URL}/products/inactive`, axiosConfig);
//     products.value = res.data;
//   } catch (error) {
//     console.error(error);
//   } finally {
//     setTimeout(() => isLoading.value = false, 500);
//   }
// };

// const restoreProduct = async (id) => {
//   try {
//     await axios.put(`${BASE_URL}/products/${id}/restore`, {}, axiosConfig);
//     Swal.fire("Activated!", "Product is now live.", "success");
//     fetchData();
//   } catch (error) {
//     Swal.fire("Error", "Failed to restore product", "error");
//   }
// };

// const confirmPermanentDelete = (id) => {
//   Swal.fire({
//     title: "Delete Permanently?",
//     text: "This data will be gone forever from S3 and DB!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#d33",
//     confirmButtonText: "Yes, destroy it!",
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         await axios.delete(`${BASE_URL}/products/${id}/force`, axiosConfig);
//         Swal.fire("Destroyed!", "Data has been wiped.", "success");
//         fetchData();
//       } catch (err) {
//         Swal.fire("Error", "Action failed", "error");
//       }
//     }
//   });
// };

const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products/inactive`, axiosConfig);
    products.value = res.data;
  } catch (error) {
    // Menampilkan pesan error dari backend saat gagal ambil data
    const msg = error.response?.data?.message || "Gagal mengambil data dari server";
    Swal.fire("Error", msg, "error");
    console.error(error);
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const restoreProduct = async (id) => {
  try {
    await axios.put(`${BASE_URL}/products/${id}/restore`, {}, axiosConfig);
    Swal.fire("Activated!", "Product is now live.", "success");
    fetchData();
  } catch (error) {
    // Mengambil pesan error dari JSON response
    const msg = error.response?.data?.message || "Gagal memulihkan produk";
    Swal.fire("Error", msg, "error");
  }
};

const confirmPermanentDelete = (id) => {
  Swal.fire({
    title: "Delete Permanently?",
    text: "This data will be gone forever from S3 and DB!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, destroy it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/products/${id}/force`, axiosConfig);
        Swal.fire("Destroyed!", "Data has been wiped.", "success");
        fetchData();
      } catch (error) {
        // Mengambil pesan error dari JSON response
        const msg =
          error.response?.data?.message || "Gagal menghapus data secara permanen";
        Swal.fire("Error", msg, "error");
      }
    }
  });
};

onMounted(fetchData);
</script>
