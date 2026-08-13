<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[400px]"
  >
    <Breadcrumb />
    <div
      class="flex flex-col items-start justify-between gap-4 mb-8 md:flex-row md:items-center"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Bag Types Management</h1>
        <p class="text-sm text-gray-500">
          Manage general bag classifications (e.g. Totebag, Handbag).
        </p>
      </div>
      <button
        @click="openModal()"
        class="px-6 py-2 font-semibold text-white transition bg-blue-600 shadow-sm hover:bg-blue-700 rounded-xl shadow-blue-500/30"
      >
        + Add Bag Type
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr
            class="text-sm tracking-wider text-gray-400 uppercase border-b border-gray-100"
          >
            <th class="pb-4 pl-2 font-medium">Code</th>
            <th class="pb-4 font-medium">Name</th>
            <th class="pb-4 font-medium">Description</th>
            <th class="pb-4 pr-2 font-medium text-center">Actions</th>
          </tr>
        </thead>
        <tbody v-if="isLoading">
          <tr v-for="i in 5" :key="'skel-' + i" class="border-b border-gray-50">
            <td class="py-5 pl-2">
              <div class="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="py-5">
              <div class="w-32 h-5 bg-gray-200 rounded animate-pulse"></div>
            </td>
            <td class="py-5">
              <div class="w-48 h-4 bg-gray-100 rounded animate-pulse"></div>
            </td>
            <td class="py-5">
              <div class="flex justify-center">
                <div class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="cat in bagCategories"
            :key="cat.id"
            class="transition border-b hover:bg-gray-50 border-gray-50"
          >
            <td class="py-4 pl-2 font-mono text-sm font-bold text-blue-600">
              {{ cat.code }}
            </td>
            <td class="py-4 font-bold text-gray-800">{{ cat.name }}</td>
            <td class="py-4 text-sm text-gray-500 truncate max-w-[200px]">
              {{ cat.description || "-" }}
            </td>
            <td class="py-4 pr-2">
              <div class="flex justify-center gap-3">
                <router-link
                  :to="`/admin/bag-categories/${cat.id}`"
                  class="p-2 text-blue-500 transition rounded-lg bg-blue-50 hover:bg-blue-100"
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
                  class="p-2 transition rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-500"
                  title="Edit"
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
                  class="p-2 text-red-500 transition rounded-lg bg-red-50 hover:bg-red-100"
                  title="Delete"
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
        </tbody>
      </table>
    </div>

    <!-- Modal Create/Edit -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div class="w-full max-w-lg p-8 bg-white shadow-2xl rounded-3xl animate-fade-in">
        <h2 class="mb-6 text-xl font-bold">
          {{ isEdit ? "Update Bag Type" : "Create New Bag Type" }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase"
                >Code</label
              >
              <input
                v-model="form.code"
                type="text"
                class="w-full p-3 font-mono text-sm border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. BT-TOTE"
                required
              />
            </div>
            <div>
              <label
                class="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase"
                >Name</label
              >
              <input
                v-model="form.name"
                type="text"
                class="w-full p-3 text-sm border border-gray-100 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Totebag"
                required
              />
            </div>
          </div>
          <div>
            <label
              class="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase"
              >Description</label
            >
            <textarea
              v-model="form.description"
              class="w-full p-3 text-sm border border-gray-100 outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 py-3 font-bold text-gray-500 transition hover:bg-gray-50 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 py-3 font-bold text-white transition bg-blue-600 rounded-xl hover:bg-blue-700"
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
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const bagCategories = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const isLoading = ref(true);
const isSubmitting = ref(false);
const currentId = ref(null);

const form = ref({ code: "", name: "", description: "" });

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchCategories = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/bag-categories`, axiosConfig);
    bagCategories.value = res.data.data;
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

const openModal = (data = null) => {
  isEdit.value = !!data;
  currentId.value = data ? data.id : null;
  form.value = data
    ? { code: data.code, name: data.name, description: data.description }
    : { code: "", name: "", description: "" };
  showModal.value = true;
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    if (isEdit.value) {
      await axios.put(
        `${BASE_URL}/admin/bag-categories/${currentId.value}`,
        form.value,
        axiosConfig
      );
    } else {
      await axios.post(`${BASE_URL}/admin/bag-categories`, form.value, axiosConfig);
    }
    showModal.value = false;
    fetchCategories();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Saved!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Validation Error", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes, delete",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/admin/bag-categories/${id}`, axiosConfig);
        fetchCategories();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        if (err.response?.status === 409)
          Swal.fire("Blocked", "Cannot delete because it contains products.", "warning");
        else Swal.fire("Error", "Delete failed.", "error");
      }
    }
  });
};

onMounted(fetchCategories);
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
