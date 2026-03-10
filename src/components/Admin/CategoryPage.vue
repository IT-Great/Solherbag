<!-- <template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]"
  >
    <div
      v-if="isLoading"
      class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300"
    >
      <div class="flex flex-col items-center">
        <div
          class="border-4 border-blue-100 border-t-blue-600 rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-blue-600 text-xs uppercase tracking-widest animate-pulse"
        >
          Fetching Data...
        </p>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Category Management</h1>
        <p class="text-gray-500 text-sm">
          Manage your product categories here.
        </p>
      </div>
      <button
        @click="openModal()"
        class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-semibold text-white transition"
      >
        + Add Category
      </button>
    </div>

    <div
      class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6"
    >
      <div class="relative w-full md:w-64">
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
          placeholder="Search categories..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">Show:</span>
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm cursor-pointer"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="border-b border-gray-100 text-gray-400 text-sm uppercase tracking-wider"
          >
            <th class="pb-4 font-medium">Code</th>
            <th class="pb-4 font-medium">Name</th>
            <th class="pb-4 font-medium">Description</th>
            <th class="pb-4 font-medium text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="cat in paginatedCategories"
            :key="cat.id"
            class="hover:bg-gray-50 border-b border-gray-50 transition"
          >
            <td class="py-4 font-mono text-blue-600 text-sm">
              {{ cat.category_code }}
            </td>
            <td class="py-4 font-medium text-gray-800">
              {{ cat.category_name }}
            </td>
            <td class="py-4 text-sm max-w-xs truncate">
              {{ cat.meta?.description || "-" }}
            </td>
            <td class="py-4">
              <div class="flex justify-center gap-3">
                <router-link
                  :to="`/admin/categories/${cat.id}`"
                  class="bg-blue-50 hover:bg-blue-100 p-2 rounded-lg text-blue-500 transition"
                  title="View Details"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </router-link>
                <button
                  @click="openModal(cat)"
                  class="bg-amber-50 hover:bg-amber-100 p-2 rounded-lg text-amber-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  @click="confirmDelete(cat.id)"
                  class="bg-red-50 hover:bg-red-100 p-2 rounded-lg text-red-500 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!isLoading && paginatedCategories.length === 0">
            <td colspan="4" class="py-20 text-center text-gray-400 italic">
              {{
                searchQuery
                  ? "No matching categories found."
                  : "No categories found."
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredCategories.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing
        <span class="font-bold text-gray-700">{{ showingStart }}</span> to
        <span class="font-bold text-gray-700">{{ showingEnd }}</span> of
        <span class="font-bold text-gray-700">{{
          filteredCategories.length
        }}</span>
        categories
      </p>
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Previous
        </button>

        <button
          v-for="(page, index) in visiblePages"
          :key="index"
          @click="typeof page === 'number' ? (currentPage = page) : null"
          :disabled="page === '...'"
          :class="[
            page === currentPage
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

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>

    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h2 class="mb-6 font-bold text-xl">
          {{ isEdit ? "Update Category" : "Create New Category" }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block mb-1 font-bold text-sm">Category Code</label>
            <input
              v-model="form.category_code"
              type="text"
              class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="e.g. LTHR-BAG"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-bold text-sm">Category Name</label>
            <input
              v-model="form.category_name"
              type="text"
              class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full"
              placeholder="e.g. Leather Bag"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-bold text-sm">Description</label>
            <textarea
              v-model="form.meta.description"
              class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full"
              rows="3"
            ></textarea>
          </div>
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 py-3 font-bold text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 py-3 rounded-xl font-bold text-white transition"
            >
              {{ isSubmitting ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const categories = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const isLoading = ref(false);
const isSubmitting = ref(false);
const currentId = ref(null);

// Form dengan struktur Industrial (Nested)
const form = ref({
  category_code: "",
  category_name: "",
  meta: { description: "" },
});

// Pagination & Filter States
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5); // Default 5 items

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// --- Computed Properties for Pagination ---

const filteredCategories = computed(() => {
  return categories.value.filter((cat) => {
    const term = searchQuery.value.toLowerCase();
    return (
      cat.category_name.toLowerCase().includes(term) ||
      cat.category_code.toLowerCase().includes(term)
    );
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredCategories.value.length / itemsPerPage.value),
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

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCategories.value.slice(start, end);
});

// Logic "Showing x to y"
const showingStart = computed(
  () => (currentPage.value - 1) * itemsPerPage.value + 1,
);
const showingEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredCategories.value.length,
  ),
);

// Reset halaman saat search/limit berubah
watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

// --- API Actions ---

const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/categories`, axiosConfig);
    categories.value = res.data.data;
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

const openModal = (data = null) => {
  isEdit.value = !!data;
  currentId.value = data ? data.id : null;

  if (data) {
    form.value = JSON.parse(JSON.stringify(data)); // Deep Copy
  } else {
    form.value = {
      category_code: "",
      category_name: "",
      meta: { description: "" },
    };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  const payload = {
    code: form.value.category_code,
    name: form.value.category_name,
    description: form.value.meta.description,
  };

  try {
    if (isEdit.value) {
      await axios.put(
        `${BASE_URL}/categories/${currentId.value}`,
        payload,
        axiosConfig,
      );
    } else {
      await axios.post(`${BASE_URL}/categories`, payload, axiosConfig);
    }
    showModal.value = false;
    fetchCategories();
    Swal.fire("Success", "Category saved!", "success");
  } catch (err) {
    Swal.fire("Error", "Check your data", "error");
  } finally {
    isSubmitting.value = false;
  }
};

// const confirmDelete = (id) => {
//   Swal.fire({
//     title: 'Are you sure?',
//     text: "Cannot be undone!",
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonColor: '#d33',
//     confirmButtonText: 'Yes, delete it!'
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       isLoading.value = true;
//       try {
//         await axios.delete(`${BASE_URL}/categories/${id}`, axiosConfig);
//         fetchCategories();
//         Swal.fire('Deleted!', 'Category removed.', 'success');
//       } catch (err) {
//         isLoading.value = false;
//         Swal.fire('Error', 'Delete failed.', 'error');
//       }
//     }
//   });
// };

const confirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      isLoading.value = true;
      try {
        await axios.delete(`${BASE_URL}/categories/${id}`, axiosConfig);
        fetchCategories();
        Swal.fire("Deleted!", "Category removed.", "success");
      } catch (err) {
        isLoading.value = false;

        if (err.response && err.response.status === 409) {
          Swal.fire({
            icon: "warning",
            title: "Action Blocked",
            text: "This category contains products. Please remove or move the products first.",
            confirmButtonColor: "#000",
          });
        } else {
          Swal.fire("Error", "Delete failed. Server might be busy.", "error");
        }
      }
    }
  });
};

onMounted(fetchCategories);
</script> -->

<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]">
    
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Category Management</h1>
        <p class="text-gray-500 text-sm">
          Manage your product categories here.
        </p>
      </div>
      <button
        @click="openModal()"
        class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-semibold text-white transition shadow-sm shadow-blue-500/30"
      >
        + Add Category
      </button>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div class="relative w-full md:w-64">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search categories..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-500">Show:</span>
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm cursor-pointer"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="25">25</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-100 text-gray-400 text-sm uppercase tracking-wider">
            <th class="pb-4 font-medium pl-2">Code</th>
            <th class="pb-4 font-medium">Name</th>
            <th class="pb-4 font-medium">Description</th>
            <th class="pb-4 font-medium text-center pr-2">Actions</th>
          </tr>
        </thead>
        
        <tbody v-if="isLoading" class="text-gray-600">
          <tr v-for="i in itemsPerPage" :key="'skel-'+i" class="border-b border-gray-50">
            <td class="py-5 pl-2"><div class="h-4 bg-gray-200 rounded w-20 animate-pulse"></div></td>
            <td class="py-5"><div class="h-5 bg-gray-200 rounded w-32 animate-pulse"></div></td>
            <td class="py-5"><div class="h-4 bg-gray-100 rounded w-full max-w-xs animate-pulse"></div></td>
            <td class="py-5">
              <div class="flex justify-center gap-3">
                <div class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr
            v-for="cat in paginatedCategories"
            :key="cat.id"
            class="hover:bg-gray-50 border-b border-gray-50 transition"
          >
            <td class="py-4 font-mono text-blue-600 text-sm pl-2 font-bold">
              {{ cat.category_code }}
            </td>
            <td class="py-4 font-bold text-gray-800">
              {{ cat.category_name }}
            </td>
            <td class="py-4 text-sm max-w-xs truncate text-gray-500">
              {{ cat.meta?.description || "No description provided." }}
            </td>
            <td class="py-4 pr-2">
              <div class="flex justify-center gap-3">
                <router-link
                  :to="`/admin/categories/${cat.id}`"
                  class="bg-blue-50 hover:bg-blue-100 p-2 rounded-lg text-blue-500 transition"
                  title="View Details"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </router-link>
                <button
                  @click="openModal(cat)"
                  class="bg-amber-50 hover:bg-amber-100 p-2 rounded-lg text-amber-500 transition"
                  title="Edit Category"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  @click="confirmDelete(cat.id)"
                  class="bg-red-50 hover:bg-red-100 p-2 rounded-lg text-red-500 transition"
                  title="Delete Category"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="!isLoading && paginatedCategories.length === 0">
            <td colspan="4" class="py-20 text-center text-gray-400 italic">
              {{ searchQuery ? "No matching categories found." : "No categories found." }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredCategories.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing
        <span class="font-bold text-gray-700">{{ showingStart }}</span> to
        <span class="font-bold text-gray-700">{{ showingEnd }}</span> of
        <span class="font-bold text-gray-700">{{ filteredCategories.length }}</span>
        categories
      </p>

      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Previous
        </button>

        <button
          v-for="(page, index) in visiblePages"
          :key="index"
          @click="typeof page === 'number' ? (currentPage = page) : null"
          :disabled="page === '...'"
          :class="[
            page === currentPage
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

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>

    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h2 class="mb-6 font-bold text-xl">
          {{ isEdit ? "Update Category" : "Create New Category" }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block mb-1 font-bold text-xs uppercase tracking-widest text-gray-500">Category Code</label>
            <input
              v-model="form.category_code"
              type="text"
              class="bg-gray-50 p-3 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full font-mono text-sm"
              placeholder="e.g. LTHR-BAG"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-bold text-xs uppercase tracking-widest text-gray-500">Category Name</label>
            <input
              v-model="form.category_name"
              type="text"
              class="bg-gray-50 p-3 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
              placeholder="e.g. Leather Bag"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-bold text-xs uppercase tracking-widest text-gray-500">Description</label>
            <textarea
              v-model="form.meta.description"
              class="bg-gray-50 p-3 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm resize-none"
              rows="3"
            ></textarea>
          </div>
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-50 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 py-3 rounded-xl font-bold text-white transition shadow-sm shadow-blue-500/30"
            >
              {{ isSubmitting ? "Saving..." : "Save Changes" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// JANGAN UBAH BAGIAN INI SAMA SEKALI, TINGGAL PASTE KODE SCRIPT ASLI ANDA.
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const categories = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const isLoading = ref(true); // Pastikan ini true di awal agar skeleton langsung jalan
const isSubmitting = ref(false);
const currentId = ref(null);

const form = ref({
  category_code: "",
  category_name: "",
  meta: { description: "" },
});

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(5); 

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const filteredCategories = computed(() => {
  return categories.value.filter((cat) => {
    const term = searchQuery.value.toLowerCase();
    return (
      cat.category_name.toLowerCase().includes(term) ||
      cat.category_code.toLowerCase().includes(term)
    );
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredCategories.value.length / itemsPerPage.value),
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

const paginatedCategories = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredCategories.value.slice(start, end);
});

const showingStart = computed(
  () => (currentPage.value - 1) * itemsPerPage.value + 1,
);
const showingEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredCategories.value.length,
  ),
);

watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/categories`, axiosConfig);
    categories.value = res.data.data;
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

const openModal = (data = null) => {
  isEdit.value = !!data;
  currentId.value = data ? data.id : null;

  if (data) {
    form.value = JSON.parse(JSON.stringify(data)); 
  } else {
    form.value = {
      category_code: "",
      category_name: "",
      meta: { description: "" },
    };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  const payload = {
    code: form.value.category_code,
    name: form.value.category_name,
    description: form.value.meta.description,
  };

  try {
    if (isEdit.value) {
      await axios.put(
        `${BASE_URL}/categories/${currentId.value}`,
        payload,
        axiosConfig,
      );
    } else {
      await axios.post(`${BASE_URL}/categories`, payload, axiosConfig);
    }
    showModal.value = false;
    fetchCategories();
    Swal.fire({ toast: true, position: 'top-end', icon: "success", title: "Category saved!", showConfirmButton: false, timer: 1500 });
  } catch (err) {
    Swal.fire("Error", "Check your data", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    text: "Cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      isLoading.value = true;
      try {
        await axios.delete(`${BASE_URL}/categories/${id}`, axiosConfig);
        fetchCategories();
        Swal.fire({ toast: true, position: 'top-end', icon: "success", title: "Category removed.", showConfirmButton: false, timer: 1500 });
      } catch (err) {
        isLoading.value = false;

        if (err.response && err.response.status === 409) {
          Swal.fire({
            icon: "warning",
            title: "Action Blocked",
            text: "This category contains products. Please remove or move the products first.",
            confirmButtonColor: "#000",
          });
        } else {
          Swal.fire("Error", "Delete failed. Server might be busy.", "error");
        }
      }
    }
  });
};

onMounted(fetchCategories);
</script>

