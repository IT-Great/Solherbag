<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]">
    
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"></div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-gray-50 p-4 rounded-xl border border-gray-100">
        <p class="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Total Supplier</p>
        <p class="text-2xl font-black mt-1">{{ stats.total_supplier || 0 }}</p>
      </div>
      <div class="bg-blue-50 p-4 rounded-xl border border-blue-100">
        <p class="text-[10px] text-blue-500 uppercase tracking-widest font-bold">Total Invoices</p>
        <p class="text-2xl font-black mt-1 text-blue-700">{{ stats.total_invoice || 0 }}</p>
      </div>
      <div class="bg-red-50 p-4 rounded-xl border border-red-100">
        <p class="text-[10px] text-red-500 uppercase tracking-widest font-bold">Unpaid Invoices</p>
        <p class="text-2xl font-black mt-1 text-red-700">{{ stats.unpaid_invoice || 0 }}</p>
      </div>
      <div class="bg-green-50 p-4 rounded-xl border border-green-100">
        <p class="text-[10px] text-green-500 uppercase tracking-widest font-bold">Total Value (Rp)</p>
        <p class="text-xl font-black mt-1 text-green-700">{{ formatPrice(stats.total_nominal || 0) }}</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </span>
        <input v-model="searchQuery" type="text" placeholder="Search Supplier Name..." class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition" />
      </div>
      
      <div class="flex items-center gap-3">
        <select v-model="itemsPerPage" class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer">
          <option :value="5">5</option><option :value="10">10</option><option :value="20">20</option>
        </select>
        <button @click="openModal()" class="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-xl text-sm font-bold transition">
          + Add Supplier
        </button>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[800px]">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Supplier Name</th>
            <th class="pb-4">Contact</th>
            <th class="pb-4">Bank Account</th>
            <th class="pb-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
          <tr v-for="sup in paginatedData" :key="sup.id" class="border-b border-gray-50 hover:bg-gray-50 transition">
            <td class="py-4 font-bold text-gray-800">{{ sup.name }}</td>
            <td class="py-4">
              <p>{{ sup.email }}</p>
              <p class="text-xs text-gray-400">{{ sup.no_telp }}</p>
            </td>
            <td class="py-4">
              <p class="font-bold">{{ sup.bank_name || '-' }}</p>
              <p class="text-xs font-mono">{{ sup.accountnumber || '-' }}</p>
            </td>
            <td class="py-4 text-center space-x-3">
              <button @click="openModal(sup)" class="text-amber-500 font-bold hover:underline uppercase text-xs">Edit</button>
              <button @click="confirmDelete(sup.id)" class="text-red-500 font-bold hover:underline uppercase text-xs">Del</button>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td colspan="4" class="text-center py-10 italic text-gray-400">No suppliers found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredData.length > 0" class="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 pt-4 border-t border-gray-100">
      <p class="text-sm text-gray-400">Showing <span class="font-bold text-black">{{ showingStart }}</span> to <span class="font-bold text-black">{{ showingEnd }}</span> of <span class="font-bold text-black">{{ filteredData.length }}</span></p>
      <div class="flex gap-2">
        <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium">Prev</button>
        <div class="flex gap-1">
          <button v-for="(page, index) in visiblePages" :key="index" @click="typeof page === 'number' ? currentPage = page : null" :disabled="page === '...'" :class="[currentPage === page ? 'bg-black text-white border-black' : 'hover:bg-gray-50 border-gray-200', page === '...' ? 'cursor-default border-transparent hover:bg-transparent' : 'border']" class="w-10 h-10 rounded-xl font-medium transition flex items-center justify-center text-sm">{{ page }}</button>
        </div>
        <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium">Next</button>
      </div>
    </div>

    <div v-if="showModal" class="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div class="bg-white p-8 rounded-3xl w-full max-w-2xl my-8">
        <h2 class="mb-6 font-bold text-xl">{{ isEdit ? "Edit Supplier" : "Add Supplier" }}</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div><label class="text-xs font-bold text-gray-500 uppercase">Name</label><input v-model="form.name" type="text" class="w-full bg-gray-50 p-3 rounded-xl border outline-none focus:border-black" required/></div>
            <div><label class="text-xs font-bold text-gray-500 uppercase">Phone</label><input v-model="form.no_telp" type="text" class="w-full bg-gray-50 p-3 rounded-xl border outline-none focus:border-black" required/></div>
            <div><label class="text-xs font-bold text-gray-500 uppercase">Email</label><input v-model="form.email" type="email" class="w-full bg-gray-50 p-3 rounded-xl border outline-none focus:border-black" required/></div>
            <div><label class="text-xs font-bold text-gray-500 uppercase">Bank Name</label><input v-model="form.bank_name" type="text" class="w-full bg-gray-50 p-3 rounded-xl border outline-none focus:border-black" /></div>
            <div><label class="text-xs font-bold text-gray-500 uppercase">Acc Number</label><input v-model="form.accountnumber" type="text" class="w-full bg-gray-50 p-3 rounded-xl border outline-none focus:border-black" /></div>
            <div><label class="text-xs font-bold text-gray-500 uppercase">Acc Holder</label><input v-model="form.accountnumber_holders_name" type="text" class="w-full bg-gray-50 p-3 rounded-xl border outline-none focus:border-black" /></div>
          </div>
          <div><label class="text-xs font-bold text-gray-500 uppercase">Address</label><textarea v-model="form.address" rows="2" class="w-full bg-gray-50 p-3 rounded-xl border outline-none focus:border-black"></textarea></div>
          <div class="flex gap-4 pt-4 mt-4 border-t">
            <button type="button" @click="showModal = false" class="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 bg-black py-3 rounded-xl font-bold text-white transition disabled:opacity-50">Save</button>
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
import { BASE_URL } from "../../config/api";

const suppliers = ref([]);
const stats = ref({});
const isLoading = ref(false);
const showModal = ref(false);
const isEdit = ref(false);
const isSubmitting = ref(false);

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const form = ref({});
const axiosConfig = { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } };

const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/suppliers`, axiosConfig);
    suppliers.value = res.data.suppliers;
    stats.value = res.data.stats;
  } catch (e) { console.error(e); }
  isLoading.value = false;
};

const filteredData = computed(() => {
  if (!searchQuery.value) return suppliers.value;
  return suppliers.value.filter(s => s.name.toLowerCase().includes(searchQuery.value.toLowerCase()));
});

const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value));
const paginatedData = computed(() => filteredData.value.slice((currentPage.value - 1) * itemsPerPage.value, currentPage.value * itemsPerPage.value));
const showingStart = computed(() => filteredData.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1);
const showingEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredData.value.length));

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, '...', total];
  if (current >= total - 3) return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
});

watch([searchQuery, itemsPerPage], () => { currentPage.value = 1; });

const openModal = (data = null) => {
  isEdit.value = !!data;
  form.value = data ? { ...data } : { name:'', no_telp:'', email:'', bank_name:'', accountnumber:'', address:'' };
  showModal.value = true;
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  try {
    if (isEdit.value) await axios.put(`${BASE_URL}/admin/suppliers/${form.value.id}`, form.value, axiosConfig);
    else await axios.post(`${BASE_URL}/admin/suppliers`, form.value, axiosConfig);
    showModal.value = false;
    fetchData();
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Saved!', showConfirmButton: false, timer: 1500 });
  } catch (e) { Swal.fire('Error', 'Validation failed', 'error'); }
  isSubmitting.value = false;
};

const confirmDelete = (id) => {
  Swal.fire({ title: "Delete?", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Yes" }).then(async (res) => {
    if (res.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/admin/suppliers/${id}`, axiosConfig);
        fetchData();
      } catch (e) { Swal.fire('Error', e.response?.data?.message || 'Delete failed', 'error'); }
    }
  });
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(v || 0);

onMounted(fetchData);
</script>