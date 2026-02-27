<template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]">
    
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"></div>
        <p class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse">Loading Data...</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-gray-100 pb-6">
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transfer & Receive</h1>
        <p class="text-gray-500 text-sm">Manage incoming and outgoing cash flow.</p>
      </div>
      <button @click="openModal()" class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest text-white transition">
        + Record Payment
      </button>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div class="flex items-center gap-4 w-full md:w-auto">
        <div class="relative w-full md:w-64">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input v-model="searchQuery" type="text" placeholder="Search No. Trans or Name..." class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition" />
        </div>
        <select v-model="typeFilter" class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm cursor-pointer">
          <option value="all">All Types</option>
          <option value="receive">Receive</option>
          <option value="transfer">Transfer</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Show:</span>
        <select v-model="itemsPerPage" class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr class="border-b border-gray-200 text-gray-400 text-xs uppercase tracking-widest bg-gray-50">
            <th class="p-4 rounded-tl-xl">Transaction</th>
            <th class="p-4">Recipient/Sender</th>
            <th class="p-4">Debit (To)</th>
            <th class="p-4">Credit (From)</th>
            <th class="p-4 text-right">Amount (Rp)</th>
            <th class="p-4 text-center rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-700 text-sm">
          <tr v-for="payment in paginatedPayments" :key="payment.id" class="border-b border-gray-50 hover:bg-gray-50 transition">
            <td class="p-4">
              <div class="flex items-center gap-3">
                <div :class="payment.type === 'receive' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'" class="p-2 rounded-lg shrink-0">
                  <svg v-if="payment.type === 'receive'" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                </div>
                <div>
                  <p class="font-bold text-gray-900 font-mono">{{ payment.no_transaction }}</p>
                  <p class="text-[10px] text-gray-400 uppercase tracking-wider">{{ formatDate(payment.date) }}</p>
                </div>
              </div>
            </td>
            <td class="p-4 font-bold">{{ payment.recipient_name || '-' }}</td>
            <td class="p-4">
              <span class="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{{ payment.debit_coa?.coa_no }}</span>
              <p class="text-xs text-gray-500 mt-1 truncate w-32">{{ payment.debit_coa?.name }}</p>
            </td>
            <td class="p-4">
              <span class="bg-gray-100 px-2 py-1 rounded text-xs font-mono">{{ payment.kredit_coa?.coa_no }}</span>
              <p class="text-xs text-gray-500 mt-1 truncate w-32">{{ payment.kredit_coa?.name }}</p>
            </td>
            <td class="p-4 text-right font-black text-base">{{ formatPrice(payment.amount) }}</td>
            <td class="p-4 text-center space-x-3">
              <button @click="openModal(payment)" class="text-amber-500 hover:underline font-bold text-xs uppercase">Edit</button>
              <button @click="confirmDelete(payment.id)" class="text-red-500 hover:underline font-bold text-xs uppercase">Del</button>
            </td>
          </tr>
          <tr v-if="paginatedPayments.length === 0">
            <td colspan="6" class="text-center py-16 text-gray-400 italic">No records found.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="filteredPayments.length > 0" class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-100">
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to
        <span class="font-bold text-black">{{ showingEnd }}</span> of
        <span class="font-bold text-black">{{ filteredPayments.length }}</span> entries
      </p>

      <div class="flex gap-2">
        <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium">
          Previous
        </button>

        <div class="flex gap-1">
          <button
            v-for="(page, index) in visiblePages"
            :key="index"
            @click="typeof page === 'number' ? (currentPage = page) : null"
            :disabled="page === '...'"
            :class="[
              currentPage === page ? 'bg-black text-white border-black' : 'hover:bg-gray-50 border-gray-200',
              page === '...' ? 'cursor-default border-transparent hover:bg-transparent' : 'border',
            ]"
            class="w-10 h-10 rounded-xl font-medium transition flex items-center justify-center text-sm"
          >
            {{ page }}
          </button>
        </div>

        <button @click="currentPage++" :disabled="currentPage === totalPages || totalPages === 0" class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium">
          Next
        </button>
      </div>
    </div>

    <div v-if="showModal" class="z-50 fixed inset-0 flex justify-center items-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-2xl my-8">
        <h2 class="mb-6 font-bold text-2xl">{{ isEdit ? "Edit Record" : "New Payment Record" }}</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest">Type</label>
              <select v-model="form.type" class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full font-bold" required>
                <option value="receive">Receive (In)</option>
                <option value="transfer">Transfer (Out)</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest">Date</label>
              <input v-model="form.date" type="datetime-local" class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full" required />
            </div>
          </div>

          <div>
            <label class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest">Recipient / Sender Name</label>
            <input v-model="form.recipient_name" type="text" placeholder="Name of person or company" class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full" />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50/50 p-4 border rounded-xl">
            <div>
              <label class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest">Debit Account (To)</label>
              <select v-model="form.debit_coa_id" class="bg-white p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black w-full" required>
                <option value="" disabled>Select COA</option>
                <option v-for="coa in coasList" :key="coa.id" :value="coa.id">[{{ coa.coa_no }}] {{ coa.name }}</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest">Credit Account (From)</label>
              <select v-model="form.kredit_coa_id" class="bg-white p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black w-full" required>
                <option value="" disabled>Select COA</option>
                <option v-for="coa in coasList" :key="coa.id" :value="coa.id">[{{ coa.coa_no }}] {{ coa.name }}</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest">Amount (Rp)</label>
            <input v-model="form.amount" type="number" class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full font-mono text-xl text-black font-black" required />
          </div>

          <div>
            <label class="block mb-1 font-bold text-xs uppercase text-gray-500 tracking-widest">Description</label>
            <textarea v-model="form.description" rows="2" class="bg-gray-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black w-full"></textarea>
          </div>

          <div class="flex gap-4 pt-4 mt-8">
            <button type="button" @click="showModal = false" class="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-100 rounded-xl transition">Cancel</button>
            <button type="submit" :disabled="isSubmitting" class="flex-1 bg-black py-3 rounded-xl font-bold text-white transition disabled:opacity-50">Save Record</button>
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

const payments = ref([]);
const coasList = ref([]);
const isLoading = ref(false);
const showModal = ref(false);
const isEdit = ref(false);
const isSubmitting = ref(false);

const searchQuery = ref("");
const typeFilter = ref("all");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const form = ref({
  id: null,
  kredit_coa_id: "",
  debit_coa_id: "",
  recipient_name: "",
  amount: "",
  date: "",
  type: "receive",
  description: ""
});

const axiosConfig = { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } };

// Fetch Initial Data
const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resPayments, resCoas] = await Promise.all([
      axios.get(`${BASE_URL}/admin/payments`, axiosConfig),
      axios.get(`${BASE_URL}/admin/coas`, axiosConfig)
    ]);
    payments.value = resPayments.data;
    coasList.value = resCoas.data;
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => { isLoading.value = false; }, 500);
  }
};

// --- Computed Properties for Filtering & Pagination ---
const filteredPayments = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return payments.value.filter((p) => {
    const matchSearch = 
      (p.no_transaction && p.no_transaction.toLowerCase().includes(query)) ||
      (p.recipient_name && p.recipient_name.toLowerCase().includes(query));
    
    const matchType = typeFilter.value === "all" ? true : p.type === typeFilter.value;

    return matchSearch && matchType;
  });
});

const totalPages = computed(() => Math.ceil(filteredPayments.value.length / itemsPerPage.value));

const paginatedPayments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredPayments.value.slice(start, start + itemsPerPage.value);
});

const showingStart = computed(() => filteredPayments.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1);
const showingEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredPayments.value.length));

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const maxVisible = 7;

  if (total <= maxVisible) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
});

watch([searchQuery, typeFilter, itemsPerPage], () => {
  currentPage.value = 1;
});

// --- Actions ---
const openModal = (data = null) => {
  isEdit.value = !!data;
  if (data) {
    // Format date for datetime-local input
    const formattedDate = data.date ? new Date(data.date).toISOString().slice(0, 16) : "";
    form.value = { ...data, date: formattedDate };
  } else {
    const now = new Date();
    // Adjust to local timezone for default input
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    form.value = { 
      id: null, kredit_coa_id: "", debit_coa_id: "", recipient_name: "", 
      amount: "", date: now.toISOString().slice(0, 16), type: "receive", description: "" 
    };
  }
  showModal.value = true;
};

const handleSubmit = async () => {
  isSubmitting.value = true;
  
  // Format date to string for backend (MySQL datetime format)
  const payload = {
      ...form.value,
      date: form.value.date.replace("T", " ") + ":00"
  };

  try {
    if (isEdit.value) {
      await axios.put(`${BASE_URL}/admin/payments/${form.value.id}`, payload, axiosConfig);
    } else {
      await axios.post(`${BASE_URL}/admin/payments`, payload, axiosConfig);
    }
    showModal.value = false;
    fetchData();
    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Payment saved', showConfirmButton: false, timer: 1500 });
  } catch (err) {
    Swal.fire("Error", "Validation failed. Ensure COA selection is valid.", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Delete Record?", text: "This action cannot be undone.", icon: "warning", showCancelButton: true, confirmButtonColor: "#d33", confirmButtonText: "Yes, delete"
  }).then(async (res) => {
    if (res.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/admin/payments/${id}`, axiosConfig);
        fetchData();
      } catch (err) {
        Swal.fire("Error", "Failed to delete record.", "error");
      }
    }
  });
};

// --- Helpers ---
const formatPrice = (v) => new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(v || 0);
const formatDate = (date) => date ? new Date(date).toLocaleDateString("id-ID", { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : "-";

onMounted(fetchData);
</script>