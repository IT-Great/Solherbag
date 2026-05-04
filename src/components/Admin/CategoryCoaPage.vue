<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[500px]"
  >
    <Breadcrumb />
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">COA Categories</h1>
        <p class="text-gray-500 text-sm">Manage chart of account categories.</p>
      </div>
      <button
        @click="openModal()"
        class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-semibold text-white transition"
      >
        + Add Category
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="border-b border-gray-100 text-gray-400 text-xs uppercase tracking-wider"
          >
            <th class="pb-4 font-bold">ID</th>
            <th class="pb-4 font-bold">Category Name</th>
            <th class="pb-4 font-bold text-right">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm">
          <tr
            v-for="cat in categories"
            :key="cat.id"
            class="border-b border-gray-50 hover:bg-gray-50 transition"
          >
            <td class="py-4 font-mono">{{ cat.id }}</td>
            <td class="py-4 font-bold">{{ cat.category_name }}</td>
            <td class="py-4 text-right">
              <button
                @click="openModal(cat)"
                class="text-amber-500 hover:underline font-medium mr-4"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(cat.id)"
                class="text-red-500 hover:underline font-medium"
              >
                Delete
              </button>
            </td>
          </tr>
          <tr v-if="categories.length === 0">
            <td colspan="3" class="text-center py-10 text-gray-400 italic">
              No COA categories found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h2 class="mb-6 font-bold text-xl">
          {{ isEdit ? "Edit Category" : "New Category" }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block mb-1 font-bold text-sm">Category Name</label>
            <input
              v-model="form.category_name"
              type="text"
              class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full"
              required
            />
          </div>
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 bg-black py-3 rounded-xl font-bold text-white transition disabled:opacity-50"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const categories = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const isSubmitting = ref(false);
const form = ref({ id: null, category_name: "" });

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/category-coas`, axiosConfig);
    categories.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

const openModal = (data = null) => {
  isEdit.value = !!data;
  if (data) {
    form.value = { ...data };
  } else {
    form.value = { id: null, category_name: "" };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    if (isEdit.value) {
      await axios.put(
        `${BASE_URL}/admin/category-coas/${form.value.id}`,
        form.value,
        axiosConfig
      );
    } else {
      await axios.post(`${BASE_URL}/admin/category-coas`, form.value, axiosConfig);
    }
    showModal.value = false;
    fetchData();
    Swal.fire("Success", "Saved successfully", "success");
  } catch (err) {
    Swal.fire("Error", "Validation failed or duplicate name", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Delete Category?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, delete",
  }).then(async (res) => {
    if (res.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/admin/category-coas/${id}`, axiosConfig);
        fetchData();
        Swal.fire("Deleted", "Category deleted", "success");
      } catch (err) {
        Swal.fire("Error", err.response?.data?.message || "Failed to delete", "error");
      }
    }
  });
};

onMounted(fetchData);
</script>
