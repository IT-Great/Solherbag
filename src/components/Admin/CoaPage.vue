<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]"
  >
    <Breadcrumb />
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-6"
    >
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Chart of Accounts</h1>
        <p class="text-gray-500 text-sm">Manage your financial records and journals.</p>
      </div>
      <div class="flex gap-3">
        <router-link
          to="/admin/category-coas"
          class="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-gray-700 transition flex items-center"
        >
          Manage Categories
        </router-link>
        <button
          @click="openModal()"
          class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition"
        >
          + Add Entry
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr
            class="border-b border-gray-200 text-gray-400 text-xs uppercase tracking-widest bg-gray-50"
          >
            <th class="p-4 rounded-tl-xl">COA No</th>
            <th class="p-4">Account Name</th>
            <th class="p-4">Category</th>
            <th class="p-4 text-right">Debit (Rp)</th>
            <th class="p-4 text-right">Credit (Rp)</th>
            <th class="p-4 text-center">Status</th>
            <th class="p-4 text-center rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm">
          <tr
            v-for="coa in coas"
            :key="coa.id"
            class="border-b border-gray-50 hover:bg-gray-50 transition group"
          >
            <td class="p-4 font-mono font-bold text-blue-600">{{ coa.coa_no }}</td>
            <td class="p-4">
              <p class="font-bold text-gray-900 uppercase">{{ coa.name }}</p>
              <p class="text-[10px] text-gray-400 mt-1">{{ formatDate(coa.date) }}</p>
            </td>
            <td class="p-4 text-xs font-bold text-gray-500 uppercase">
              {{ coa.category?.category_name }}
            </td>
            <td class="p-4 text-right font-mono">{{ formatPrice(coa.debit) }}</td>
            <td class="p-4 text-right font-mono text-red-600">
              {{ formatPrice(coa.credit) }}
            </td>
            <td class="p-4 text-center">
              <span
                v-if="coa.posted"
                class="bg-green-100 text-green-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest"
                >Posted</span
              >
              <span
                v-else
                class="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest"
                >Draft</span
              >
            </td>
            <td class="p-4 text-center space-x-3">
              <button
                v-if="!coa.posted"
                @click="postEntry(coa.id)"
                class="text-green-600 hover:underline font-bold text-xs uppercase"
              >
                Post
              </button>
              <button
                v-if="!coa.posted"
                @click="openModal(coa)"
                class="text-amber-500 hover:underline font-bold text-xs uppercase"
              >
                Edit
              </button>
              <button
                v-if="!coa.posted"
                @click="confirmDelete(coa.id)"
                class="text-red-500 hover:underline font-bold text-xs uppercase"
              >
                Del
              </button>
              <span v-if="coa.posted" class="text-gray-300 text-xs italic">Locked</span>
            </td>
          </tr>
          <tr v-if="coas.length === 0">
            <td colspan="7" class="text-center py-16 text-gray-400 italic">
              No journal entries found.
            </td>
          </tr>
        </tbody>
        <tfoot class="bg-gray-50 border-t-2 border-gray-200 font-bold">
          <tr>
            <td colspan="3" class="p-4 text-right uppercase tracking-widest text-xs">
              Total Balance
            </td>
            <td class="p-4 text-right font-mono text-lg text-black">
              {{ formatPrice(totalDebit) }}
            </td>
            <td class="p-4 text-right font-mono text-lg text-red-600">
              {{ formatPrice(totalCredit) }}
            </td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-2xl my-8">
        <h2 class="mb-6 font-bold text-2xl">
          {{ isEdit ? "Edit Entry" : "New Journal Entry" }}
        </h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest"
                >COA No</label
              >
              <input
                v-model="form.coa_no"
                type="text"
                placeholder="e.g. 1-1000"
                class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full font-mono"
                required
              />
            </div>
            <div>
              <label
                class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest"
                >Account Name</label
              >
              <input
                v-model="form.name"
                type="text"
                placeholder="e.g. Cash in Bank"
                class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full uppercase"
                required
              />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest"
                >Category</label
              >
              <select
                v-model="form.coa_category_id"
                class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full"
                required
              >
                <option value="" disabled>Select Category</option>
                <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                  {{ cat.category_name }}
                </option>
              </select>
            </div>
            <div>
              <label
                class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest"
                >Transaction Date</label
              >
              <input
                v-model="form.date"
                type="date"
                class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full"
                required
              />
            </div>
          </div>

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-b border-gray-100 py-4 my-4"
          >
            <div>
              <label
                class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest"
                >Type</label
              >
              <div class="flex gap-4 mt-2">
                <label class="flex items-center gap-2 cursor-pointer font-bold"
                  ><input
                    type="radio"
                    v-model="form.type"
                    value="Debit"
                    class="w-4 h-4 accent-black"
                  />
                  Debit</label
                >
                <label class="flex items-center gap-2 cursor-pointer font-bold"
                  ><input
                    type="radio"
                    v-model="form.type"
                    value="Kredit"
                    class="w-4 h-4 accent-black"
                  />
                  Kredit</label
                >
              </div>
            </div>
            <div>
              <label
                class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest"
                >Amount (Rp)</label
              >
              <input
                v-model="form.amount"
                type="number"
                class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full font-mono text-lg"
                required
              />
            </div>
          </div>

          <div>
            <label
              class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest"
              >Description</label
            >
            <textarea
              v-model="form.description"
              rows="2"
              class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full"
            ></textarea>
          </div>

          <div class="flex gap-4 pt-4 mt-8">
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
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const coas = ref([]);
const categories = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const isSubmitting = ref(false);

const form = ref({
  id: null,
  name: "",
  coa_no: "",
  coa_category_id: "",
  type: "Debit",
  amount: "",
  date: new Date().toISOString().split("T")[0],
  description: "",
});

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const totalDebit = computed(() =>
  coas.value.reduce((acc, curr) => acc + parseFloat(curr.debit || 0), 0)
);
const totalCredit = computed(() =>
  coas.value.reduce((acc, curr) => acc + parseFloat(curr.credit || 0), 0)
);

const fetchData = async () => {
  try {
    const [resCoas, resCat] = await Promise.all([
      axios.get(`${BASE_URL}/admin/coas`, axiosConfig),
      axios.get(`${BASE_URL}/admin/category-coas`, axiosConfig),
    ]);
    coas.value = resCoas.data;
    categories.value = resCat.data;
  } catch (error) {
    console.error(error);
  }
};

const openModal = (data = null) => {
  isEdit.value = !!data;
  if (data) {
    form.value = {
      ...data,
      amount: data.type === "Debit" ? data.debit : data.credit,
    };
  } else {
    form.value = {
      id: null,
      name: "",
      coa_no: "",
      coa_category_id: "",
      type: "Debit",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      description: "",
    };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    if (isEdit.value) {
      await axios.put(`${BASE_URL}/admin/coas/${form.value.id}`, form.value, axiosConfig);
    } else {
      await axios.post(`${BASE_URL}/admin/coas`, form.value, axiosConfig);
    }
    showModal.value = false;
    fetchData();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Entry saved",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (err) {
    Swal.fire("Error", "Validation failed or duplicate Data.", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Delete Entry?",
    text: "Cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then(async (res) => {
    if (res.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/admin/coas/${id}`, axiosConfig);
        fetchData();
      } catch (err) {
        Swal.fire("Error", "Failed to delete. It might be locked.", "error");
      }
    }
  });
};

const postEntry = (id) => {
  Swal.fire({
    title: "Post Entry?",
    text: "Posted entry cannot be edited or deleted.",
    icon: "info",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, Post it",
  }).then(async (res) => {
    if (res.isConfirmed) {
      try {
        await axios.post(`${BASE_URL}/admin/coas/${id}/post`, {}, axiosConfig);
        fetchData();
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Entry Posted",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        Swal.fire("Error", "Failed to post entry.", "error");
      }
    }
  });
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(v || 0);
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

onMounted(fetchData);
</script>
