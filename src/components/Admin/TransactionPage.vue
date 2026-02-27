<!-- <template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]"
  >
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"></div>
        <p class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse">Processing Data...</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transaction Monitoring</h1>
        <p class="text-gray-500 text-sm">Manage and track all customer orders in real-time.</p>
      </div>
      <div class="bg-gray-50 px-6 py-3 border border-gray-100 rounded-2xl">
        <span class="block font-black text-[10px] text-gray-400 uppercase tracking-widest">Total Revenue</span>
        <span class="font-bold text-green-600 text-xl">{{ formatPrice(totalRevenue) }}</span>
      </div>
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
          placeholder="Search Order ID, Name, or Email..." 
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Rows:</span>
        <select 
          v-model="itemsPerPage" 
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Order ID & Date</th>
            <th class="pb-4">Customer</th>
            <th class="pb-4">Items</th>
            <th class="pb-4">Total Amount</th>
            <th class="pb-4">Status</th>
            <th class="pb-4 text-center">Update Status</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="trx in paginatedTransactions"
            :key="trx.id"
            @click="goToDetail(trx)"
            class="group hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer"
          >
            <td class="py-6">
              <span class="block font-mono font-bold text-black group-hover:text-blue-600 text-sm uppercase transition-colors">
                {{ trx.order_id }}
              </span>
              <span class="text-gray-400 text-xs">{{ formatDate(trx.created_at) }}</span>
            </td>
            <td class="py-6">
              <span class="block font-bold text-gray-800 text-sm">{{ trx.user.first_name }} {{ trx.user.last_name }}</span>
              <span class="text-gray-400 text-xs">{{ trx.user.email }}</span>
            </td>
            <td class="py-6">
              <div class="flex -space-x-2">
                <img
                  v-for="detail in trx.details.slice(0, 3)"
                  :key="detail.id"
                  :src="detail.product.image"
                  class="shadow-sm border-2 border-white rounded-full w-8 h-8 object-cover"
                  :title="detail.product.name"
                />
                <div
                  v-if="trx.details.length > 3"
                  class="flex justify-center items-center bg-gray-200 shadow-sm border-2 border-white rounded-full w-8 h-8 font-bold text-[10px] text-gray-600"
                >
                  +{{ trx.details.length - 3 }}
                </div>
              </div>
            </td>
            <td class="py-6">
              <span class="font-bold text-black">{{ formatPrice(trx.total_amount) }}</span>
            </td>
            <td class="py-6">
              <span :class="statusClass(trx.status)" class="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">
                {{ trx.status }}
              </span>
            </td>
            <td class="py-6 text-center" @click.stop>
              <select
                @change="updateStatus(trx.id, $event.target.value)"
                :value="trx.status"
                class="bg-gray-100 px-3 py-2 border-none rounded-xl focus:ring-2 focus:ring-black font-bold text-[10px] uppercase transition-all cursor-pointer"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </td>
          </tr>
          
          <tr v-if="!isLoading && paginatedTransactions.length === 0">
            <td colspan="6" class="py-20 font-serif text-gray-400 text-center italic">
              {{ searchQuery ? 'No transactions match your search.' : 'No transactions found.' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!isLoading && filteredTransactions.length > 0" class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50">
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to <span class="font-bold text-black">{{ showingEnd }}</span> of <span class="font-bold text-black">{{ filteredTransactions.length }}</span> orders
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
          v-for="page in displayedPages" 
          :key="page" 
          @click="currentPage = page"
          :class="currentPage === page ? 'bg-black text-white border-black' : 'hover:bg-gray-50 border-gray-200'"
          class="w-10 h-10 border rounded-xl font-medium transition flex items-center justify-center text-sm"
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";

const transactions = ref([]);
const isLoading = ref(false);
const router = useRouter();

// --- Pagination & Filter States ---
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10); // Default 10 items

const goToDetail = (trx) => {
  router.push({
    name: 'TransactionDetail',
    params: { id: trx.id },
    state: { transactionData: JSON.parse(JSON.stringify(trx)) } 
  });
};

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0);
});

// --- Computed Logic untuk Searching & Pagination ---

const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return transactions.value;

  return transactions.value.filter(t => 
    t.order_id.toLowerCase().includes(query) ||
    t.user.first_name.toLowerCase().includes(query) ||
    t.user.last_name.toLowerCase().includes(query) ||
    t.user.email.toLowerCase().includes(query)
  );
});

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / itemsPerPage.value));

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTransactions.value.slice(start, end);
});

// Logic text "Showing X to Y"
const showingStart = computed(() => {
  if (filteredTransactions.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredTransactions.value.length));

// Logic agar tombol pagination tidak terlalu panjang jika halaman banyak
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2; // Jumlah halaman yang muncul di kiri/kanan current page
  
  let range = [];
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i);
  }
  return range;
});

// Reset halaman ke 1 jika filter berubah
watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

// --- Fetch Actions ---

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    transactions.value = res.data;
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const updateStatus = async (id, newStatus) => {
  try {
    isLoading.value = true;
    const res = await axios.put(
      `${BASE_URL}/admin/transactions/${id}/status`,
      { status: newStatus },
      axiosConfig,
    );

    // Update data lokal agar tidak perlu fetch ulang seluruh tabel
    const index = transactions.value.findIndex((t) => t.id === id);
    if (index !== -1) transactions.value[index].status = newStatus;

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    Swal.fire("Failed", "Could not update status", "error");
  } finally {
    isLoading.value = false;
  }
};

const statusClass = (status) => {
  const map = {
    pending: "bg-amber-100 text-amber-600",
    processing: "bg-blue-100 text-blue-600",
    completed: "bg-green-100 text-green-600",
    cancelled: "bg-red-100 text-red-600",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

onMounted(fetchTransactions);
</script>

<style scoped>
/* Transisi untuk tabel */
tr {
  transition: all 0.2s ease-in-out;
}
</style> -->

<!-- <template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]">
    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Order ID & Date</th>
            <th class="pb-4">Customer</th>
            <th class="pb-4">Items</th>
            <th class="pb-4">Total Amount</th>
            <th class="pb-4">Status</th>
            <th class="pb-4 text-center">Action</th> </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr v-for="trx in paginatedTransactions" :key="trx.id" 
              class="group hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer"
              @click="goToDetail(trx)">
            
            <td class="py-6">
                <span class="block font-mono font-bold text-black">{{ trx.order_id }}</span>
                <span class="text-gray-400 text-xs">{{ formatDate(trx.created_at) }}</span>
            </td>
            <td class="py-6">
                <span class="block font-bold text-gray-800 text-sm">{{ trx.user.first_name }}</span>
            </td>
            <td class="py-6">
               <span class="text-xs">{{ trx.details.length }} items</span>
            </td>
            <td class="py-6">
               <span class="font-bold text-black">{{ formatPrice(trx.total_amount) }}</span>
            </td>

            <td class="py-6">
              <span :class="statusClass(trx.status)" class="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">
                {{ formatStatus(trx.status) }}
              </span>
            </td>

            <td class="py-6 text-center" @click.stop>
              
              <div v-if="trx.status === 'refund_requested'" class="flex justify-center gap-2">
                <button 
                  @click="handleRefundAction(trx.id, 'approve')"
                  class="bg-green-100 hover:bg-green-200 p-2 rounded-lg text-green-600 transition" 
                  title="Approve Refund"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </button>
                <button 
                  @click="handleRefundAction(trx.id, 'reject')"
                  class="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-600 transition"
                  title="Reject Refund"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <span v-else class="text-gray-400 text-[10px] italic">
                 No Action
              </span>

            </td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";

// const transactions = ref([]);
const isLoading = ref(false);
const router = useRouter();

// --- Pagination & Filter States ---
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10); // Default 10 items

const transactions = ref([]);
const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const goToDetail = (trx) => {
  router.push({
    name: 'TransactionDetail',
    params: { id: trx.id },
    state: { transactionData: JSON.parse(JSON.stringify(trx)) } 
  });
};

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0);
});

// --- Computed Logic untuk Searching & Pagination ---

const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return transactions.value;

  return transactions.value.filter(t => 
    t.order_id.toLowerCase().includes(query) ||
    t.user.first_name.toLowerCase().includes(query) ||
    t.user.last_name.toLowerCase().includes(query) ||
    t.user.email.toLowerCase().includes(query)
  );
});

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / itemsPerPage.value));

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTransactions.value.slice(start, end);
});

// Logic text "Showing X to Y"
const showingStart = computed(() => {
  if (filteredTransactions.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredTransactions.value.length));

// Logic agar tombol pagination tidak terlalu panjang jika halaman banyak
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2; // Jumlah halaman yang muncul di kiri/kanan current page
  
  let range = [];
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i);
  }
  return range;
});

// Reset halaman ke 1 jika filter berubah
watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

// --- Fetch Actions ---

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    transactions.value = res.data;
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const updateStatus = async (id, newStatus) => {
  try {
    isLoading.value = true;
    const res = await axios.put(
      `${BASE_URL}/admin/transactions/${id}/status`,
      { status: newStatus },
      axiosConfig,
    );

    // Update data lokal agar tidak perlu fetch ulang seluruh tabel
    const index = transactions.value.findIndex((t) => t.id === id);
    if (index !== -1) transactions.value[index].status = newStatus;

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    Swal.fire("Failed", "Could not update status", "error");
  } finally {
    isLoading.value = false;
  }
};

const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700", 
    pending: "bg-orange-100 text-orange-700", 
    processing: "bg-blue-100 text-blue-700", 
    completed: "bg-green-100 text-green-700", 
    cancelled: "bg-red-100 text-red-700", 
    refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700",
    refund_rejected: "bg-gray-200 text-gray-600 line-through",
    refunded: "bg-teal-100 text-teal-700",
    refund_manual_required: "bg-pink-100 text-pink-700",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const handleRefundAction = async (id, action) => {
  const endpoint = action === 'approve' ? 'refund-approve' : 'refund-reject';
  const confirmText = action === 'approve' ? 'Approve this refund request?' : 'Reject this refund request?';

  const result = await Swal.fire({
    title: 'Confirm Action',
    text: confirmText,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#000',
    confirmButtonText: 'Yes, proceed!'
  });

  if (result.isConfirmed) {
    try {
      await axios.post(`${BASE_URL}/admin/transactions/${id}/${endpoint}`, {}, axiosConfig);
      Swal.fire('Success', `Refund ${action}d successfully`, 'success');
      fetchTransactions(); // Refresh table
    } catch (err) {
      Swal.fire('Error', 'Action failed', 'error');
    }
  }
};

const formatStatus = (s) => s.replace(/_/g, ' ');

onMounted(fetchTransactions);
</script>
<style scoped>
/* Transisi untuk tabel */
tr {
  transition: all 0.2s ease-in-out;
}
</style> -->

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
          class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse"
        >
          Processing Data...
        </p>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transaction Monitoring</h1>
        <p class="text-gray-500 text-sm">
          Manage and track all customer orders in real-time.
        </p>
      </div>
      <div class="bg-gray-50 px-6 py-3 border border-gray-100 rounded-2xl">
        <span
          class="block font-black text-[10px] text-gray-400 uppercase tracking-widest"
          >Total Revenue</span
        >
        <span class="font-bold text-green-600 text-xl">{{
          formatPrice(totalRevenue)
        }}</span>
      </div>
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
          placeholder="Search Order ID, Name, or Email..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >Show:</span
        >
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Order ID & Date</th>
            <th class="pb-4">Customer</th>
            <th class="pb-4">Items</th>
            <th class="pb-4">Total Amount</th>
            <th class="pb-4">Status</th>
            <th class="pb-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600">
          <tr
            v-for="trx in paginatedTransactions"
            :key="trx.id"
            class="group hover:bg-gray-50 border-gray-50 border-b transition cursor-pointer"
            @click="goToDetail(trx)"
          >
            <td class="py-6">
              <span class="block font-mono font-bold text-black">{{
                trx.order_id
              }}</span>
              <span class="text-gray-400 text-xs">{{
                formatDate(trx.created_at)
              }}</span>
            </td>
            <td class="py-6">
              <span class="block font-bold text-gray-800 text-sm">{{
                trx.user.first_name
              }}</span>
            </td>
            <td class="py-6">
              <span class="text-xs">{{ trx.details.length }} items</span>
            </td>
            <td class="py-6">
              <span class="font-bold text-black">{{
                formatPrice(trx.total_amount)
              }}</span>
            </td>

            <td class="py-6">
              <span
                :class="statusClass(trx.status)"
                class="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter"
              >
                {{ formatStatus(trx.status) }}
              </span>
            </td>

            <td class="py-6 text-center" @click.stop>
              <div
                v-if="trx.status === 'refund_requested'"
                class="flex justify-center gap-2"
              >
                <button
                  @click="handleRefundAction(trx.id, 'approve')"
                  class="bg-green-100 hover:bg-green-200 p-2 rounded-lg text-green-600 transition"
                  title="Approve Refund"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  @click="handleRefundAction(trx.id, 'reject')"
                  class="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-600 transition"
                  title="Reject Refund"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <span v-else class="text-gray-400 text-[10px] italic"
                >No Action</span
              >
            </td>
          </tr>

          <tr v-if="!isLoading && paginatedTransactions.length === 0">
            <td
              colspan="6"
              class="py-20 font-serif text-gray-400 text-center italic"
            >
              {{
                searchQuery
                  ? "No transactions match your search."
                  : "No transactions found."
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredTransactions.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to
        <span class="font-bold text-black">{{ showingEnd }}</span> of
        <span class="font-bold text-black">{{
          filteredTransactions.length
        }}</span>
        orders
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
          v-for="page in displayedPages"
          :key="page"
          @click="currentPage = page"
          :class="
            currentPage === page
              ? 'bg-black text-white border-black'
              : 'hover:bg-gray-50 border-gray-200'
          "
          class="w-10 h-10 border rounded-xl font-medium transition flex items-center justify-center text-sm"
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
  </div>
</template>

<script setup>
// Script tetap sama karena logika sudah ada sebelumnya
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";

const transactions = ref([]); // Pastikan ini array kosong dulu
const isLoading = ref(false);
const router = useRouter();

// --- Pagination & Filter States ---
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10); // Default 10 items

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const goToDetail = (trx) => {
  router.push({
    name: "TransactionDetail",
    params: { id: trx.id },
    state: { transactionData: JSON.parse(JSON.stringify(trx)) },
  });
};

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0);
});

// --- Computed Logic untuk Searching & Pagination ---

const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return transactions.value;

  return transactions.value.filter(
    (t) =>
      t.order_id.toLowerCase().includes(query) ||
      t.user.first_name.toLowerCase().includes(query) ||
      t.user.last_name.toLowerCase().includes(query) ||
      t.user.email.toLowerCase().includes(query),
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / itemsPerPage.value),
);

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTransactions.value.slice(start, end);
});

const showingStart = computed(() => {
  if (filteredTransactions.value.length === 0) return 0;
  return (currentPage.value - 1) * itemsPerPage.value + 1;
});

const showingEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredTransactions.value.length,
  ),
);

const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;

  let range = [];
  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  ) {
    range.push(i);
  }
  return range;
});

watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    transactions.value = res.data;
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

// ... (Sisa fungsi helper seperti formatPrice, formatDate, handleRefundAction tetap sama) ...
const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700",
    pending: "bg-orange-100 text-orange-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700",
    refund_rejected: "bg-gray-200 text-gray-600 line-through",
    refunded: "bg-teal-100 text-teal-700",
    refund_manual_required: "bg-pink-100 text-pink-700",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const formatStatus = (s) => s.replace(/_/g, " ");

const handleRefundAction = async (id, action) => {
  const endpoint = action === "approve" ? "refund-approve" : "refund-reject";
  const confirmText =
    action === "approve"
      ? "Approve this refund request?"
      : "Reject this refund request?";

  const result = await Swal.fire({
    title: "Confirm Action",
    text: confirmText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, proceed!",
  });

  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/admin/transactions/${id}/${endpoint}`,
        {},
        axiosConfig,
      );
      Swal.fire("Success", `Refund ${action}d successfully`, "success");
      fetchTransactions();
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  }
};

onMounted(fetchTransactions);
</script>

<style scoped>
tr {
  transition: all 0.2s ease-in-out;
}
</style> -->

<!-- Menambahkan field dan tampilan -->
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
          class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse"
        >
          Processing Data...
        </p>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transaction Monitoring</h1>
        <p class="text-gray-500 text-sm">
          Manage and track all customer orders in real-time.
        </p>
      </div>
      <div class="bg-gray-50 px-6 py-3 border border-gray-100 rounded-2xl">
        <span
          class="block font-black text-[10px] text-gray-400 uppercase tracking-widest"
          >Total Revenue</span
        >
        <span class="font-bold text-green-600 text-xl">{{
          formatPrice(totalRevenue)
        }}</span>
      </div>
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
          placeholder="Search Order ID, Name, or Email..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >Show:</span
        >
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer"
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
          <tr
            class="border-b text-gray-400 text-[10px] uppercase tracking-widest"
          >
            <th class="pb-4 pl-2">Order Details</th>
            <th class="pb-4">Product Sample</th>
            <th class="pb-4">Logistics (Pay & Ship)</th>
            <th class="pb-4">Financials</th>
            <th class="pb-4">Status</th>
            <th class="pb-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
          <tr
            v-for="trx in paginatedTransactions"
            :key="trx.id"
            class="group hover:bg-gray-50 border-b border-gray-50 transition cursor-pointer align-top"
            @click="goToDetail(trx)"
          >
            <td class="py-6 pl-2 w-[15%]">
              <div class="flex flex-col gap-1">
                <span class="font-mono font-bold text-black text-sm">{{
                  trx.order_id
                }}</span>
                <span class="text-gray-400 text-xs">{{
                  formatDate(trx.created_at)
                }}</span>
                <span class="font-bold text-gray-800 text-xs mt-1"
                  >{{ trx.user.first_name }} {{ trx.user.last_name }}</span
                >

                <div
                  v-if="
                    ['pending', 'awaiting_payment'].includes(trx.status) &&
                    countdowns[trx.id] !== 'Expired'
                  "
                  class="mt-2 flex items-center gap-1 text-red-600 bg-red-50 w-fit px-2 py-1 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="font-mono font-bold text-[10px]">{{
                    countdowns[trx.id]
                  }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[20%]">
              <div class="flex flex-col gap-2">
                <div class="flex -space-x-3 overflow-hidden py-1 pl-1">
                  <img
                    v-for="(detail, idx) in trx.details.slice(0, 3)"
                    :key="idx"
                    :src="detail.product.image"
                    class="inline-block h-10 w-10 rounded-full border-2 border-white object-cover bg-gray-100 shadow-sm"
                    :alt="detail.product.name"
                  />
                  <div
                    v-if="trx.details.length > 3"
                    class="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white bg-gray-100 text-[10px] font-bold text-gray-500"
                  >
                    +{{ trx.details.length - 3 }}
                  </div>
                </div>
                <span class="text-xs text-gray-500 font-medium"
                  >{{ trx.details.length }} Items purchased</span
                >
              </div>
            </td>

            <td class="py-6 w-[25%]">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0"
                  >
                    <img
                      v-if="getPaymentLogo(trx.payment_method)"
                      :src="getPaymentLogo(trx.payment_method)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >PAY</span
                    >
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      {{
                        trx.payment_method
                          ? trx.payment_method.replace(/_/g, " ")
                          : "Not Selected"
                      }}
                    </p>
                    <p
                      :class="getPaymentStatusColor(trx.status)"
                      class="text-[9px] font-bold uppercase tracking-wider"
                    >
                      {{ getPaymentStatusText(trx.status) }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="trx.shipping_method !== 'free'"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0"
                  >
                    <img
                      v-if="getCourierLogo(trx.courier_company)"
                      :src="getCourierLogo(trx.courier_company)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >SHIP</span
                    >
                  </div>
                  <div>
                    <p
                      class="font-bold text-gray-800 text-[11px] uppercase truncate w-32"
                    >
                      {{ trx.courier_company || "Pending" }} -
                      {{ trx.courier_type || "-" }}
                    </p>
                    <p class="text-[10px] text-gray-500 font-mono">
                      Resi:
                      <span class="font-bold text-black">{{
                        trx.tracking_number || "-"
                      }}</span>
                    </p>
                  </div>
                </div>
                <div v-else class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-black text-white rounded flex justify-center items-center p-1 shrink-0"
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      Internal Courier
                    </p>
                    <p class="text-[10px] text-green-600 font-bold">
                      Free Shipping
                    </p>
                  </div>
                </div>
              </div>
            </td>

            <td class="py-6 w-[15%]">
              <div class="flex flex-col gap-1">
                <div class="flex justify-between text-[10px] text-gray-400">
                  <span>Shipping:</span>
                  <span>{{ formatPrice(trx.shipping_cost) }}</span>
                </div>
                <div
                  class="flex justify-between text-sm font-bold text-black border-t border-dashed border-gray-200 pt-1 mt-1"
                >
                  <span>Total:</span>
                  <span>{{ formatPrice(trx.total_amount) }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[10%]">
              <span
                :class="statusClass(trx.status)"
                class="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter block w-fit"
              >
                {{ formatStatus(trx.status) }}
              </span>
            </td>

            <td class="py-6 text-center w-[15%]" @click.stop>
              <div
                v-if="trx.status === 'refund_requested'"
                class="flex justify-center gap-2"
              >
                <button
                  @click="handleRefundAction(trx.id, 'approve')"
                  class="bg-green-100 hover:bg-green-200 p-2 rounded-lg text-green-600 transition shadow-sm"
                  title="Approve Refund"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  @click="handleRefundAction(trx.id, 'reject')"
                  class="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-600 transition shadow-sm"
                  title="Reject Refund"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-else-if="['completed', 'processing'].includes(trx.status)"
                class="flex justify-center"
              >
                <button
                  @click="goToDetail(trx)"
                  class="text-[10px] font-bold text-blue-600 hover:underline"
                >
                  View Detail
                </button>
              </div>
              <span v-else class="text-gray-300 text-[10px] italic"
                >No Action</span
              >
            </td>
          </tr>

          <tr v-if="!isLoading && paginatedTransactions.length === 0">
            <td
              colspan="6"
              class="py-20 font-serif text-gray-400 text-center italic"
            >
              {{
                searchQuery
                  ? "No transactions match your search."
                  : "No transactions found."
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredTransactions.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to
        <span class="font-bold text-black">{{ showingEnd }}</span> of
        <span class="font-bold text-black">{{
          filteredTransactions.length
        }}</span>
        orders
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
          v-for="page in displayedPages"
          :key="page"
          @click="currentPage = page"
          :class="
            currentPage === page
              ? 'bg-black text-white border-black'
              : 'hover:bg-gray-50 border-gray-200'
          "
          class="w-10 h-10 border rounded-xl font-medium transition flex items-center justify-center text-sm"
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";

const transactions = ref([]);
const isLoading = ref(false);
const router = useRouter();

// --- Pagination & Filter States ---
const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

// --- Timer State ---
const countdowns = ref({});
let timerInterval = null;

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const goToDetail = (trx) => {
  router.push({
    name: "TransactionDetail",
    params: { id: trx.id },
    state: { transactionData: JSON.parse(JSON.stringify(trx)) },
  });
};

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => acc + parseFloat(curr.total_amount), 0);
});

// --- Helper Functions for UI ---

// 1. Payment Logo
const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(" ")[1]?.toLowerCase();
  if (!channel) return null;
  const baseUrl = "/payment_images/";
  const map = {
    bca: "bca.png",
    bni: "bni.png",
    bri: "bri.png",
    mandiri: "mandiri.png",
    bsi: "bsi.png",
    permata: "permata.png",
    ovo: "ovo.png",
    dana: "dana.png",
    linkaja: "linkaja.png",
    shopeepay: "shopeepay.png",
    alfamart: "alfamart.png",
    indomaret: "indomaret.png",
    qris: "qris.png",
  };
  return map[channel] ? baseUrl + map[channel] : null;
};

// 2. Payment Status Text & Color
const getPaymentStatusText = (status) => {
  if (
    [
      "completed",
      "processing",
      "refund_requested",
      "refund_approved",
      "refund_rejected",
    ].includes(status)
  )
    return "PAID";
  if (status === "cancelled") return "CANCELLED";
  if (status === "refunded") return "REFUNDED";
  return "UNPAID";
};

const getPaymentStatusColor = (status) => {
  if (
    [
      "completed",
      "processing",
      "refund_requested",
      "refund_approved",
      "refund_rejected",
    ].includes(status)
  )
    return "text-green-600";
  if (status === "cancelled") return "text-red-500";
  if (status === "refunded") return "text-teal-600";
  return "text-orange-500"; // Unpaid
};

// 3. Courier Logo
const getCourierLogo = (company) => {
  if (!company) return null;
  const baseUrl = "/courier_images/";
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
  };
  return map[company.toLowerCase()]
    ? baseUrl + map[company.toLowerCase()]
    : null;
};

// 4. Timer Logic (Centralized)
const calculateTimeLeft = (createdAt) => {
  const expiryTime = new Date(createdAt).getTime() + 86400000; // +24 Jam
  const now = new Date().getTime();
  const diff = expiryTime - now;
  if (diff <= 0) return "Expired";
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`; // Short format for table
};

const startTimers = () => {
  // Clear existing to avoid double interval
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    transactions.value.forEach((trx) => {
      // Hanya jalankan timer untuk status pending/awaiting
      if (["pending", "awaiting_payment"].includes(trx.status)) {
        // Gunakan payment creation time jika ada (lebih akurat untuk Xendit), atau fallback ke trx created_at
        const timeRef = trx.payment?.created_at || trx.created_at;
        countdowns.value[trx.id] = calculateTimeLeft(timeRef);
      }
    });
  }, 60000); // Update setiap 1 menit (tidak perlu per detik agar tidak berat di list view)

  // Trigger sekali di awal
  transactions.value.forEach((trx) => {
    if (["pending", "awaiting_payment"].includes(trx.status)) {
      const timeRef = trx.payment?.created_at || trx.created_at;
      countdowns.value[trx.id] = calculateTimeLeft(timeRef);
    }
  });
};

// --- Computed Logic untuk Searching & Pagination (Sama) ---
const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return transactions.value;
  return transactions.value.filter(
    (t) =>
      t.order_id.toLowerCase().includes(query) ||
      t.user.first_name.toLowerCase().includes(query) ||
      t.user.email.toLowerCase().includes(query),
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / itemsPerPage.value),
);
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTransactions.value.slice(start, end);
});
const showingStart = computed(() =>
  filteredTransactions.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1,
);
const showingEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredTransactions.value.length,
  ),
);
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  let range = [];
  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  )
    range.push(i);
  return range;
});

watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    transactions.value = res.data;
    startTimers(); // Start timers after data loaded
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700",
    pending: "bg-orange-100 text-orange-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700",
    refund_rejected: "bg-gray-200 text-gray-600 line-through",
    refunded: "bg-teal-100 text-teal-700",
    refund_manual_required: "bg-pink-100 text-pink-700",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const formatStatus = (s) => s.replace(/_/g, " ");

const handleRefundAction = async (id, action) => {
  const endpoint = action === "approve" ? "refund-approve" : "refund-reject";
  const confirmText =
    action === "approve"
      ? "Approve this refund request?"
      : "Reject this refund request?";
  const result = await Swal.fire({
    title: "Confirm Action",
    text: confirmText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, proceed!",
  });
  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/admin/transactions/${id}/${endpoint}`,
        {},
        axiosConfig,
      );
      Swal.fire("Success", `Refund ${action}d successfully`, "success");
      fetchTransactions();
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  }
};

onMounted(fetchTransactions);
onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
tr {
  transition: all 0.2s ease-in-out;
}
</style> -->

<!-- Revisi tampilan baru -->
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
          class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse"
        >
          Processing Data...
        </p>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transaction Monitoring</h1>
        <p class="text-gray-500 text-sm">
          Manage and track all customer orders in real-time.
        </p>
      </div>
      <div class="bg-gray-50 px-6 py-3 border border-gray-100 rounded-2xl">
        <span
          class="block font-black text-[10px] text-gray-400 uppercase tracking-widest"
          >Total Revenue</span
        >
        <span class="font-bold text-green-600 text-xl">{{
          formatPrice(totalRevenue)
        }}</span>
      </div>
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
          placeholder="Search Order ID, Name, or Email..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >Show:</span
        >
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer"
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
          <tr
            class="border-b text-gray-400 text-[10px] uppercase tracking-widest"
          >
            <th class="pb-4 pl-2">Order Details</th>
            <th class="pb-4">Product Sample</th>
            <th class="pb-4">Logistics (Pay & Ship)</th>
            <th class="pb-4">Financials</th>
            <th class="pb-4">Status</th>
            <th class="pb-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
          <tr
            v-for="trx in paginatedTransactions"
            :key="trx.id"
            class="group hover:bg-gray-50 border-b border-gray-50 transition cursor-pointer align-top"
            @click="goToDetail(trx)"
          >
            <td class="py-6 pl-2 w-[15%]">
              <div class="flex flex-col gap-1">
                <span class="font-mono font-bold text-black text-sm">{{
                  trx.order_id
                }}</span>
                <span class="text-gray-400 text-xs">{{
                  formatDate(trx.created_at)
                }}</span>

                <div class="mt-2">
                  <span
                    class="block font-bold text-gray-800 text-xs truncate max-w-[150px]"
                    :title="trx.user.first_name + ' ' + trx.user.last_name"
                  >
                    {{ trx.user.first_name }} {{ trx.user.last_name }}
                  </span>
                  <span
                    class="block text-gray-400 text-[10px] truncate max-w-[150px]"
                    :title="trx.user.email"
                  >
                    {{ trx.user.email }}
                  </span>
                </div>

                <div
                  v-if="
                    ['pending'].includes(trx.status) &&
                    countdowns[trx.id] !== 'Expired'
                  "
                  class="mt-2 flex items-center gap-1 text-red-600 bg-red-50 w-fit px-2 py-1 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="font-mono font-bold text-[10px]">{{
                    countdowns[trx.id]
                  }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[20%]">
              <div class="flex flex-col gap-2">
                <div class="flex -space-x-3 overflow-hidden py-1 pl-1">
                  <img
                    v-for="(detail, idx) in trx.details.slice(0, 3)"
                    :key="idx"
                    :src="detail.product.image"
                    class="inline-block h-10 w-10 rounded-full border-2 border-white object-cover bg-gray-100 shadow-sm"
                    :alt="detail.product.name"
                  />
                  <div
                    v-if="trx.details.length > 3"
                    class="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white bg-gray-100 text-[10px] font-bold text-gray-500"
                  >
                    +{{ trx.details.length - 3 }}
                  </div>
                </div>
                <span class="text-xs text-gray-500 font-medium"
                  >{{ trx.details.length }} Items purchased</span
                >
              </div>
            </td>

            <td class="py-6 w-[25%]">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0"
                  >
                    <img
                      v-if="getPaymentLogo(trx.payment_method)"
                      :src="getPaymentLogo(trx.payment_method)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >PAY</span
                    >
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      {{
                        trx.payment_method
                          ? trx.payment_method.replace(/_/g, " ")
                          : "Not Selected"
                      }}
                    </p>
                    <p
                      :class="getPaymentStatusColor(trx.status)"
                      class="text-[9px] font-bold uppercase tracking-wider"
                    >
                      {{ getPaymentStatusText(trx.status) }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="trx.shipping_method !== 'free'"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0"
                  >
                    <img
                      v-if="getCourierLogo(trx.courier_company)"
                      :src="getCourierLogo(trx.courier_company)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >SHIP</span
                    >
                  </div>
                  <div>
                    <p
                      class="font-bold text-gray-800 text-[11px] uppercase truncate w-32"
                    >
                      {{ trx.courier_company || "Pending" }} -
                      {{ trx.courier_type || "-" }}
                    </p>
                    <p class="text-[10px] text-gray-500 font-mono">
                      Resi:
                      <span class="font-bold text-black">{{
                        trx.tracking_number || "-"
                      }}</span>
                    </p>
                  </div>
                </div>

                <div v-else class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-black text-white rounded flex justify-center items-center p-1 shrink-0"
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
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      Internal Courier
                    </p>
                    <p class="text-[10px] text-green-600 font-bold">
                      Free Shipping
                    </p>
                  </div>
                </div>
              </div>
            </td>

            <td class="py-6 w-[20%] pr-2">
              <div class="flex flex-col gap-1.5">
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Subtotal:</span>
                  <span>{{ formatPrice(trx.total_amount) }}</span>
                </div>
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Shipping:</span>
                  <span>{{ formatPrice(trx.shipping_cost) }}</span>
                </div>
                <div
                  class="flex justify-between text-sm font-bold text-black border-t border-dashed border-gray-200 pt-1.5 mt-1"
                >
                  <span>Total:</span>
                  <span>{{ formatPrice(getGrandTotal(trx)) }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[10%]">
              <span
                :class="statusClass(trx.status)"
                class="px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter block w-fit"
              >
                {{ formatStatus(trx.status) }}
              </span>
            </td>

            <td class="py-6 text-center w-[10%]" @click.stop>
              <div
                v-if="trx.status === 'refund_requested'"
                class="flex justify-center gap-2"
              >
                <button
                  @click="handleRefundAction(trx.id, 'approve')"
                  class="bg-green-100 hover:bg-green-200 p-2 rounded-lg text-green-600 transition shadow-sm"
                  title="Approve Refund"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  @click="handleRefundAction(trx.id, 'reject')"
                  class="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-600 transition shadow-sm"
                  title="Reject Refund"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-else-if="['completed', 'processing'].includes(trx.status)"
                class="flex justify-center"
              >
                <button
                  @click="goToDetail(trx)"
                  class="text-[10px] font-bold text-blue-600 hover:underline"
                >
                  View Detail
                </button>
              </div>
              <span v-else class="text-gray-300 text-[10px] italic"
                >No Action</span
              >
            </td>
          </tr>

          <tr v-if="!isLoading && paginatedTransactions.length === 0">
            <td
              colspan="6"
              class="py-20 font-serif text-gray-400 text-center italic"
            >
              {{
                searchQuery
                  ? "No transactions match your search."
                  : "No transactions found."
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredTransactions.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to
        <span class="font-bold text-black">{{ showingEnd }}</span> of
        <span class="font-bold text-black">{{
          filteredTransactions.length
        }}</span>
        orders
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
          v-for="page in displayedPages"
          :key="page"
          @click="currentPage = page"
          :class="
            currentPage === page
              ? 'bg-black text-white border-black'
              : 'hover:bg-gray-50 border-gray-200'
          "
          class="w-10 h-10 border rounded-xl font-medium transition flex items-center justify-center text-sm"
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";

const transactions = ref([]);
const isLoading = ref(false);
const router = useRouter();

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const countdowns = ref({});
let timerInterval = null;

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const goToDetail = (trx) => {
  router.push({
    name: "TransactionDetail",
    params: { id: trx.id },
    state: { transactionData: JSON.parse(JSON.stringify(trx)) },
  });
};

// [PERBAIKAN] Fungsi untuk mendapatkan Total Keseluruhan (Barang + Ongkir) secara dinamis di Frontend
const getGrandTotal = (trx) => {
  const subtotal = parseFloat(trx.total_amount) || 0;
  const shipping = parseFloat(trx.shipping_cost) || 0;
  return subtotal + shipping;
};

// [PERBAIKAN] Update Total Revenue Admin agar menyertakan Ongkir
const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => {
      // Kita gunakan fungsi getGrandTotal untuk mengakumulasi pendapatan kotor (termasuk ongkir)
      return acc + getGrandTotal(curr);
    }, 0);
});

const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(" ")[1]?.toLowerCase();
  if (!channel) return null;
  const baseUrl = "/payment_images/";
  const map = {
    bca: "bca.png",
    bni: "bni.png",
    bri: "bri.png",
    mandiri: "mandiri.png",
    bsi: "bsi.png",
    permata: "permata.png",
    ovo: "ovo.png",
    dana: "dana.png",
    linkaja: "linkaja.png",
    shopeepay: "shopeepay.png",
    alfamart: "alfamart.png",
    indomaret: "indomaret.png",
    qris: "qris.png",
  };
  return map[channel] ? baseUrl + map[channel] : null;
};

const getPaymentStatusText = (status) => {
  if (
    [
      "completed",
      "processing",
      "refund_requested",
      "refund_approved",
      "refund_rejected",
    ].includes(status)
  )
    return "PAID";
  if (status === "cancelled") return "CANCELLED";
  if (status === "refunded") return "REFUNDED";
  return "UNPAID";
};

const getPaymentStatusColor = (status) => {
  if (
    [
      "completed",
      "processing",
      "refund_requested",
      "refund_approved",
      "refund_rejected",
    ].includes(status)
  )
    return "text-green-600";
  if (status === "cancelled") return "text-red-500";
  if (status === "refunded") return "text-teal-600";
  return "text-orange-500";
};

const getCourierLogo = (company) => {
  if (!company) return null;
  const baseUrl = "/courier_images/";
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
  };
  return map[company.toLowerCase()]
    ? baseUrl + map[company.toLowerCase()]
    : null;
};

const calculateTimeLeft = (createdAt) => {
  const expiryTime = new Date(createdAt).getTime() + 86400000;
  const now = new Date().getTime();
  const diff = expiryTime - now;
  if (diff <= 0) return "Expired";
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const startTimers = () => {
  if (timerInterval) clearInterval(timerInterval);

  timerInterval = setInterval(() => {
    transactions.value.forEach((trx) => {
      if (["pending"].includes(trx.status)) {
        const timeRef = trx.payment?.created_at || trx.created_at;
        countdowns.value[trx.id] = calculateTimeLeft(timeRef);
      }
    });
  }, 60000);

  transactions.value.forEach((trx) => {
    if (["pending"].includes(trx.status)) {
      const timeRef = trx.payment?.created_at || trx.created_at;
      countdowns.value[trx.id] = calculateTimeLeft(timeRef);
    }
  });
};

const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return transactions.value;
  return transactions.value.filter(
    (t) =>
      t.order_id.toLowerCase().includes(query) ||
      t.user.first_name.toLowerCase().includes(query) ||
      t.user.email.toLowerCase().includes(query),
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / itemsPerPage.value),
);
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredTransactions.value.slice(start, end);
});
const showingStart = computed(() =>
  filteredTransactions.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1,
);
const showingEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredTransactions.value.length,
  ),
);
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  let range = [];
  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  )
    range.push(i);
  return range;
});

watch([searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    transactions.value = res.data;
    startTimers();
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700",
    pending: "bg-orange-100 text-orange-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700",
    refund_rejected: "bg-gray-200 text-gray-600 line-through",
    refunded: "bg-teal-100 text-teal-700",
    refund_manual_required: "bg-pink-100 text-pink-700",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const formatStatus = (s) => s.replace(/_/g, " ");

const handleRefundAction = async (id, action) => {
  const endpoint = action === "approve" ? "refund-approve" : "refund-reject";
  const confirmText =
    action === "approve"
      ? "Approve this refund request?"
      : "Reject this refund request?";
  const result = await Swal.fire({
    title: "Confirm Action",
    text: confirmText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, proceed!",
  });
  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/admin/transactions/${id}/${endpoint}`,
        {},
        axiosConfig,
      );
      Swal.fire("Success", `Refund ${action}d successfully`, "success");
      fetchTransactions();
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  }
};

onMounted(fetchTransactions);
onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
tr {
  transition: all 0.2s ease-in-out;
}
</style> -->

<!-- Dengan Filter -->
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
          class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse"
        >
          Processing Data...
        </p>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transaction Monitoring</h1>
        <p class="text-gray-500 text-sm">
          Manage and track all customer orders in real-time.
        </p>
      </div>
      <div class="bg-gray-50 px-6 py-3 border border-gray-100 rounded-2xl">
        <span
          class="block font-black text-[10px] text-gray-400 uppercase tracking-widest"
          >Total Revenue</span
        >
        <span class="font-bold text-green-600 text-xl">{{
          formatPrice(totalRevenue)
        }}</span>
      </div>
    </div>

    <div class="mb-8 space-y-4">
      <div
        class="flex items-center gap-4 overflow-x-auto pb-2 border-b border-gray-100"
      >
        <span
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap"
          >Transaction:</span
        >
        <button
          v-for="tab in transactionTabs"
          :key="tab.value"
          @click="activeTransactionTab = tab.value"
          :class="[
            'px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2',
            activeTransactionTab === tab.value
              ? 'border-black text-black bg-gray-50'
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <div
        class="flex items-center gap-4 overflow-x-auto pb-2 border-b border-gray-100"
      >
        <span
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap"
          >Shipping:</span
        >
        <button
          v-for="tab in shippingTabs"
          :key="tab.value"
          @click="activeShippingTab = tab.value"
          :class="[
            'px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2',
            activeShippingTab === tab.value
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
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
          placeholder="Search Order ID, Name, or Email..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex items-center gap-3">
        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >Show:</span
        >
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer"
        >
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
          <tr
            class="border-b text-gray-400 text-[10px] uppercase tracking-widest"
          >
            <th class="pb-4 pl-2">Order Details</th>
            <th class="pb-4">Product Sample</th>
            <th class="pb-4">Logistics (Pay & Ship)</th>
            <th class="pb-4">Financials</th>
            <th class="pb-4">Trans. Status</th>
            <th class="pb-4">Ship. Status</th>
            <th class="pb-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
          <tr
            v-for="trx in paginatedTransactions"
            :key="trx.id"
            class="group hover:bg-gray-50 border-b border-gray-50 transition cursor-pointer align-top"
            @click="goToDetail(trx)"
          >
            <td class="py-6 pl-2 w-[15%]">
              <div class="flex flex-col gap-1">
                <span class="font-mono font-bold text-black text-sm">{{
                  trx.order_id
                }}</span>
                <span class="text-gray-400 text-xs">{{
                  formatDate(trx.created_at)
                }}</span>

                <div class="mt-2">
                  <span
                    class="block font-bold text-gray-800 text-xs truncate max-w-[150px]"
                    :title="trx.user.first_name + ' ' + trx.user.last_name"
                  >
                    {{ trx.user.first_name }} {{ trx.user.last_name }}
                  </span>
                  <span
                    class="block text-gray-400 text-[10px] truncate max-w-[150px]"
                    :title="trx.user.email"
                  >
                    {{ trx.user.email }}
                  </span>
                </div>

                <div
                  v-if="
                    ['pending'].includes(trx.status) &&
                    countdowns[trx.id] !== 'Expired'
                  "
                  class="mt-2 flex items-center gap-1 text-red-600 bg-red-50 w-fit px-2 py-1 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="font-mono font-bold text-[10px]">{{
                    countdowns[trx.id]
                  }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[15%]">
              <div class="flex flex-col gap-2">
                <div class="flex -space-x-3 overflow-hidden py-1 pl-1">
                  <img
                    v-for="(detail, idx) in trx.details.slice(0, 3)"
                    :key="idx"
                    :src="detail.product.image"
                    class="inline-block h-10 w-10 rounded-full border-2 border-white object-cover bg-gray-100 shadow-sm"
                    :alt="detail.product.name"
                  />
                  <div
                    v-if="trx.details.length > 3"
                    class="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white bg-gray-100 text-[10px] font-bold text-gray-500"
                  >
                    +{{ trx.details.length - 3 }}
                  </div>
                </div>
                <span class="text-xs text-gray-500 font-medium"
                  >{{ trx.details.length }} Items</span
                >
              </div>
            </td>

            <td class="py-6 w-[20%]">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0"
                  >
                    <img
                      v-if="getPaymentLogo(trx.payment_method)"
                      :src="getPaymentLogo(trx.payment_method)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >PAY</span
                    >
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      {{
                        trx.payment_method
                          ? trx.payment_method.replace(/_/g, " ")
                          : "Not Selected"
                      }}
                    </p>
                    <p
                      :class="getPaymentStatusColor(trx.status)"
                      class="text-[9px] font-bold uppercase tracking-wider"
                    >
                      {{ getPaymentStatusText(trx.status) }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="trx.shipping_method !== 'free'"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0"
                  >
                    <img
                      v-if="getCourierLogo(trx.courier_company)"
                      :src="getCourierLogo(trx.courier_company)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >SHIP</span
                    >
                  </div>
                  <div>
                    <p
                      class="font-bold text-gray-800 text-[11px] uppercase truncate w-32"
                    >
                      {{ trx.courier_company || "Pending" }} -
                      {{ trx.courier_type || "-" }}
                    </p>
                    <div
                      v-if="trx.biteshipDataLoading"
                      class="text-[10px] text-gray-400 italic mt-0.5"
                    >
                      Fetching Waybill...
                    </div>
                    <p v-else class="text-[10px] text-gray-500 font-mono">
                      Resi:
                      <span class="font-bold text-black">{{
                        trx.biteshipData?.courier?.waybill_id ||
                        trx.tracking_number ||
                        "Waiting..."
                      }}</span>
                    </p>
                  </div>
                </div>

                <div v-else class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-gray-100 text-gray-400 rounded flex justify-center items-center p-1 shrink-0 border border-gray-200"
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      No Courier
                    </p>
                    <p class="text-[10px] text-gray-500 font-medium mt-0.5">
                      In-store Pickup
                    </p>
                  </div>
                </div>
              </div>
            </td>

            <td class="py-6 w-[15%] pr-2">
              <div class="flex flex-col gap-1.5">
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Subtotal:</span>
                  <span>{{ formatPrice(trx.total_amount) }}</span>
                </div>
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Shipping:</span>
                  <span>{{ formatPrice(trx.shipping_cost) }}</span>
                </div>
                <div
                  class="flex justify-between text-sm font-bold text-black border-t border-dashed border-gray-200 pt-1.5 mt-1"
                >
                  <span>Total:</span>
                  <span>{{ formatPrice(getGrandTotal(trx)) }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[10%]">
              <span
                :class="statusClass(trx.status)"
                class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit"
              >
                {{ formatStatus(trx.status) }}
              </span>
            </td>

            <td class="py-6 w-[10%]">
              <span
                v-if="trx.shipping_method === 'free'"
                class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border bg-gray-100 text-gray-600"
              >
                In-Store Pickup
              </span>
              <span
                v-else-if="trx.biteshipDataLoading"
                class="text-[9px] text-gray-400 italic animate-pulse"
              >
                Loading...
              </span>
              <span
                v-else
                :class="shippingStatusClass(trx.biteshipData?.status)"
                class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border"
              >
                {{ formatStatus(trx.biteshipData?.status || "Pending") }}
              </span>
            </td>

            <td class="py-6 text-center w-[10%]" @click.stop>
              <div
                v-if="trx.status === 'refund_requested'"
                class="flex justify-center gap-2"
              >
                <button
                  @click="handleRefundAction(trx.id, 'approve')"
                  class="bg-green-100 hover:bg-green-200 p-2 rounded-lg text-green-600 transition shadow-sm"
                  title="Approve Refund"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  @click="handleRefundAction(trx.id, 'reject')"
                  class="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-600 transition shadow-sm"
                  title="Reject Refund"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-else-if="['completed', 'processing'].includes(trx.status)"
                class="flex justify-center"
              >
                <button
                  @click="goToDetail(trx)"
                  class="text-[10px] font-bold text-blue-600 hover:underline"
                >
                  View Detail
                </button>
              </div>
              <span v-else class="text-gray-300 text-[10px] italic"
                >No Action</span
              >
            </td>
          </tr>

          <tr v-if="!isLoading && paginatedTransactions.length === 0">
            <td
              colspan="7"
              class="py-20 font-serif text-gray-400 text-center italic"
            >
              {{
                searchQuery
                  ? "No transactions match your search."
                  : "No transactions found."
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredTransactions.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to
        <span class="font-bold text-black">{{ showingEnd }}</span> of
        <span class="font-bold text-black">{{
          filteredTransactions.length
        }}</span>
        orders
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
          v-for="page in displayedPages"
          :key="page"
          @click="currentPage = page"
          :class="
            currentPage === page
              ? 'bg-black text-white border-black'
              : 'hover:bg-gray-50 border-gray-200'
          "
          class="w-10 h-10 border rounded-xl font-medium transition flex items-center justify-center text-sm"
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";

const transactions = ref([]);
const isLoading = ref(false);
const router = useRouter();

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const countdowns = ref({});
let timerInterval = null;

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// --- STATE FILTER TABS ---
const activeTransactionTab = ref("all");
const activeShippingTab = ref("all");

const transactionTabs = [
  { label: "All", value: "all" },
  { label: "Pending / Unpaid", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Refund Issues", value: "refund" },
];

const shippingTabs = [
  { label: "All", value: "all" },
  { label: "Placed / Pending", value: "placed" },
  { label: "Allocated", value: "allocated" },
  { label: "Picking Up", value: "picking_up" },
  { label: "In Transit", value: "dropping_off" },
  { label: "Delivered", value: "delivered" },
  { label: "No Shipping", value: "no_shipping" },
];

const goToDetail = (trx) => {
  router.push({
    name: "TransactionDetail",
    params: { id: trx.id },
    state: { transactionData: JSON.parse(JSON.stringify(trx)) },
  });
};

const getGrandTotal = (trx) => {
  const subtotal = parseFloat(trx.total_amount) || 0;
  const shipping = parseFloat(trx.shipping_cost) || 0;
  return subtotal + shipping;
};

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => {
      return acc + getGrandTotal(curr);
    }, 0);
});

const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(" ")[1]?.toLowerCase();
  if (!channel) return null;
  const baseUrl = "/payment_images/";
  const map = {
    bca: "bca.png",
    bni: "bni.png",
    bri: "bri.png",
    mandiri: "mandiri.png",
    bsi: "bsi.png",
    permata: "permata.png",
    ovo: "ovo.png",
    dana: "dana.png",
    linkaja: "linkaja.png",
    shopeepay: "shopeepay.png",
    alfamart: "alfamart.png",
    indomaret: "indomaret.png",
    qris: "qris.png",
  };
  return map[channel] ? baseUrl + map[channel] : null;
};

const getPaymentStatusText = (status) => {
  if (
    [
      "completed",
      "processing",
      "refund_requested",
      "refund_approved",
      "refund_rejected",
    ].includes(status)
  )
    return "PAID";
  if (status === "cancelled") return "CANCELLED";
  if (status === "refunded") return "REFUNDED";
  return "UNPAID";
};

const getPaymentStatusColor = (status) => {
  if (
    [
      "completed",
      "processing",
      "refund_requested",
      "refund_approved",
      "refund_rejected",
    ].includes(status)
  )
    return "text-green-600";
  if (status === "cancelled") return "text-red-500";
  if (status === "refunded") return "text-teal-600";
  return "text-orange-500";
};

const getCourierLogo = (company) => {
  if (!company) return null;
  const baseUrl = "/courier_images/";
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
  };
  return map[company.toLowerCase()]
    ? baseUrl + map[company.toLowerCase()]
    : null;
};

const calculateTimeLeft = (createdAt) => {
  const expiryTime = new Date(createdAt).getTime() + 86400000;
  const now = new Date().getTime();
  const diff = expiryTime - now;
  if (diff <= 0) return "Expired";
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const startTimers = () => {
  if (timerInterval) clearInterval(timerInterval);
  const updateTimers = () => {
    transactions.value.forEach((trx) => {
      if (["pending"].includes(trx.status)) {
        const timeRef = trx.payment?.created_at || trx.created_at;
        countdowns.value[trx.id] = calculateTimeLeft(timeRef);
      }
    });
  };
  timerInterval = setInterval(updateTimers, 60000);
  updateTimers();
};

// --- FILTERING LOGIC ---
const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();

  return transactions.value.filter((order) => {
    // 1. Search Match
    let matchSearch = true;
    if (query) {
      matchSearch =
        order.order_id.toLowerCase().includes(query) ||
        order.user.first_name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query) ||
        (order.tracking_number &&
          order.tracking_number.toLowerCase().includes(query));
    }

    // 2. Transaction Status Match
    let matchTransaction = false;
    if (activeTransactionTab.value === "all") matchTransaction = true;
    else if (activeTransactionTab.value === "pending")
      matchTransaction = ["pending", "awaiting_payment"].includes(order.status);
    else if (activeTransactionTab.value === "refund")
      matchTransaction = order.status.includes("refund");
    else matchTransaction = order.status === activeTransactionTab.value;

    // 3. Shipping Status Match
    let matchShipping = false;
    if (activeShippingTab.value === "all") {
      matchShipping = true;
    } else if (activeShippingTab.value === "no_shipping") {
      matchShipping = order.shipping_method === "free";
    } else {
      if (order.shipping_method === "free") {
        matchShipping = false;
      } else {
        const shipStatus = order.biteshipData?.status || "pending";
        if (activeShippingTab.value === "placed")
          matchShipping = ["pending", "placed"].includes(shipStatus);
        else if (activeShippingTab.value === "dropping_off")
          matchShipping = ["picked", "dropping_off"].includes(shipStatus);
        else matchShipping = shipStatus === activeShippingTab.value;
      }
    }

    return matchSearch && matchTransaction && matchShipping;
  });
});

const resetFilters = () => {
  activeTransactionTab.value = "all";
  activeShippingTab.value = "all";
  searchQuery.value = "";
};

const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / itemsPerPage.value),
);
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredTransactions.value.slice(start, start + itemsPerPage.value);
});
const showingStart = computed(() =>
  filteredTransactions.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1,
);
const showingEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredTransactions.value.length,
  ),
);
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  let range = [];
  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  )
    range.push(i);
  return range;
});

watch(
  [searchQuery, itemsPerPage, activeTransactionTab, activeShippingTab],
  () => {
    currentPage.value = 1;
  },
);

// [FITUR BARU] Fetch detail tracking langsung dari Biteship per Order
const fetchBulkTracking = async (orders) => {
  const biteshipOrders = orders.filter(
    (o) => o.shipping_method === "biteship" && o.biteship_order_id,
  );
  const idsToTrack = biteshipOrders.map((o) => o.id);

  if (idsToTrack.length === 0) return;

  biteshipOrders.forEach((o) => (o.biteshipDataLoading = true));

  try {
    const res = await axios.post(
      `${BASE_URL}/admin/transactions/tracking/bulk`,
      {
        transaction_ids: idsToTrack,
      },
      axiosConfig,
    );

    const bulkData = res.data;

    transactions.value.forEach((order) => {
      if (bulkData[order.id]) {
        order.biteshipData = bulkData[order.id];
      }
    });
  } catch (error) {
    console.error("Failed to fetch bulk tracking from server", error);
    biteshipOrders.forEach(
      (o) => (o.biteshipData = { status: "Pending Data" }),
    );
  } finally {
    biteshipOrders.forEach((o) => (o.biteshipDataLoading = false));
  }
};

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);

    // Inisialisasi properti untuk tracking dinamis
    transactions.value = res.data.map((order) => ({
      ...order,
      biteshipData: null,
      biteshipDataLoading: false,
    }));

    startTimers();

    // Jalankan Bulk Tracking
    fetchBulkTracking(transactions.value);
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700",
    pending: "bg-orange-100 text-orange-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700",
    refund_rejected: "bg-gray-200 text-gray-600 line-through",
    refunded: "bg-teal-100 text-teal-700",
    refund_manual_required: "bg-pink-100 text-pink-700",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

// Style khusus untuk Status Shipping Biteship
const shippingStatusClass = (status) => {
  if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
  const str = status.toLowerCase();
  if (["delivered"].includes(str))
    return "bg-green-50 border-green-200 text-green-700";
  if (["cancelled", "rejected"].includes(str))
    return "bg-red-50 border-red-200 text-red-700";
  if (["picking_up", "picked", "dropping_off", "allocated"].includes(str))
    return "bg-blue-50 border-blue-200 text-blue-700";
  return "bg-gray-50 border-gray-200 text-gray-600"; // Placed / Pending
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const formatStatus = (s) => s.replace(/_/g, " ");

const handleRefundAction = async (id, action) => {
  const endpoint = action === "approve" ? "refund-approve" : "refund-reject";
  const confirmText =
    action === "approve"
      ? "Approve this refund request?"
      : "Reject this refund request?";
  const result = await Swal.fire({
    title: "Confirm Action",
    text: confirmText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, proceed!",
  });
  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/admin/transactions/${id}/${endpoint}`,
        {},
        axiosConfig,
      );
      Swal.fire("Success", `Refund ${action}d successfully`, "success");
      fetchTransactions();
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  }
};

onMounted(fetchTransactions);
onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
tr {
  transition: all 0.2s ease-in-out;
}
</style> -->

<!-- Tambah Fitur Ekspor PDF/Excel -->
<!-- <template>
  <div class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]">
    <div v-if="isLoading" class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300">
      <div class="flex flex-col items-center">
        <div class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"></div>
        <p class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse">Processing Data...</p>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transaction Monitoring</h1>
        <p class="text-gray-500 text-sm">Manage and track all customer orders in real-time.</p>
      </div>
      <div class="bg-gray-50 px-6 py-3 border border-gray-100 rounded-2xl flex items-center gap-4">
        <div>
           <span class="block font-black text-[10px] text-gray-400 uppercase tracking-widest">Total Revenue</span>
           <span class="font-bold text-green-600 text-xl">{{ formatPrice(totalRevenue) }}</span>
        </div>
      </div>
    </div>

    <div class="mb-8 space-y-4">
      <div class="flex items-center gap-4 overflow-x-auto pb-2 border-b border-gray-100">
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Transaction:</span>
        <button
          v-for="tab in transactionTabs"
          :key="tab.value"
          @click="activeTransactionTab = tab.value"
          :class="[
            'px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2',
            activeTransactionTab === tab.value
              ? 'border-black text-black bg-gray-50'
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tab.label }}
          <span v-if="getTransactionTabCount(tab.value) > 0" 
                :class="activeTransactionTab === tab.value ? 'bg-black text-white' : 'bg-gray-200 text-gray-600'" 
                class="px-1.5 py-0.5 rounded-md text-[9px] font-black">
            {{ getTransactionTabCount(tab.value) }}
          </span>
        </button>
      </div>

      <div class="flex items-center gap-4 overflow-x-auto pb-2 border-b border-gray-100">
        <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">Shipping:</span>
        <button
          v-for="tab in shippingTabs"
          :key="tab.value"
          @click="activeShippingTab = tab.value"
          :class="[
            'px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2',
            activeShippingTab === tab.value
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tab.label }}
          <span v-if="getShippingTabCount(tab.value) > 0" 
                :class="activeShippingTab === tab.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'" 
                class="px-1.5 py-0.5 rounded-md text-[9px] font-black">
            {{ getShippingTabCount(tab.value) }}
          </span>
        </button>
      </div>
    </div>

    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input v-model="searchQuery" type="text" placeholder="Search Order ID, Name, or Email..." class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition" />
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button @click="exportToPDF" :disabled="paginatedTransactions.length === 0" class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          PDF
        </button>
        <button @click="exportToExcel" :disabled="paginatedTransactions.length === 0" class="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
          Excel
        </button>
        
        <div class="h-6 w-px bg-gray-200 mx-1"></div>

        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide">Show:</span>
        <select v-model="itemsPerPage" class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto" id="exportable-table">
      <div class="hidden export-header mb-4">
        <h2 class="text-2xl font-bold text-black">Transaction Report</h2>
        <p class="text-gray-500 text-sm">Generated on: {{ new Date().toLocaleString() }}</p>
      </div>

      <table class="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr class="border-b text-gray-400 text-[10px] uppercase tracking-widest">
            <th class="pb-4 pl-2">Order Details</th>
            <th class="pb-4 no-export">Product Sample</th>
            <th class="pb-4">Logistics (Pay & Ship)</th>
            <th class="pb-4">Financials</th>
            <th class="pb-4">Trans. Status</th>
            <th class="pb-4">Ship. Status</th>
            <th class="pb-4 text-center no-export">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
          <tr v-for="trx in paginatedTransactions" :key="trx.id" class="group hover:bg-gray-50 border-b border-gray-50 transition cursor-pointer align-top" @click="goToDetail(trx)">
            <td class="py-6 pl-2 w-[15%]">
              <div class="flex flex-col gap-1">
                <span class="font-mono font-bold text-black text-sm">{{ trx.order_id }}</span>
                <span class="text-gray-400 text-xs">{{ formatDate(trx.created_at) }}</span>
                <div class="mt-2">
                  <span class="block font-bold text-gray-800 text-xs truncate max-w-[150px]">{{ trx.user.first_name }} {{ trx.user.last_name }}</span>
                  <span class="block text-gray-400 text-[10px] truncate max-w-[150px]">{{ trx.user.email }}</span>
                </div>
                <div v-if="['pending'].includes(trx.status) && countdowns[trx.id] !== 'Expired'" class="no-export mt-2 flex items-center gap-1 text-red-600 bg-red-50 w-fit px-2 py-1 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span class="font-mono font-bold text-[10px]">{{ countdowns[trx.id] }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[15%] no-export">
              <div class="flex flex-col gap-2">
                <div class="flex -space-x-3 overflow-hidden py-1 pl-1">
                  <img v-for="(detail, idx) in trx.details.slice(0, 3)" :key="idx" :src="detail.product.image" class="inline-block h-10 w-10 rounded-full border-2 border-white object-cover bg-gray-100 shadow-sm" crossorigin="anonymous" />
                  <div v-if="trx.details.length > 3" class="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white bg-gray-100 text-[10px] font-bold text-gray-500">+{{ trx.details.length - 3 }}</div>
                </div>
                <span class="text-xs text-gray-500 font-medium">{{ trx.details.length }} Items</span>
              </div>
            </td>

            <td class="py-6 w-[20%]">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0 no-export">
                    <img v-if="getPaymentLogo(trx.payment_method)" :src="getPaymentLogo(trx.payment_method)" class="w-full h-full object-contain" />
                    <span v-else class="text-[8px] font-bold text-gray-400">PAY</span>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">{{ trx.payment_method ? trx.payment_method.replace(/_/g, " ") : "Not Selected" }}</p>
                    <p :class="getPaymentStatusColor(trx.status)" class="text-[9px] font-bold uppercase tracking-wider">{{ getPaymentStatusText(trx.status) }}</p>
                  </div>
                </div>

                <div v-if="trx.shipping_method !== 'free'" class="flex items-center gap-3">
                  <div class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0 no-export">
                    <img v-if="getCourierLogo(trx.courier_company)" :src="getCourierLogo(trx.courier_company)" class="w-full h-full object-contain" />
                    <span v-else class="text-[8px] font-bold text-gray-400">SHIP</span>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase truncate w-32">{{ trx.courier_company || "Pending" }} - {{ trx.courier_type || "-" }}</p>
                    <div v-if="trx.biteshipDataLoading" class="no-export text-[10px] text-gray-400 italic mt-0.5">Fetching Waybill...</div>
                    <p v-else class="text-[10px] text-gray-500 font-mono">Resi: <span class="font-bold text-black">{{ trx.biteshipData?.courier?.waybill_id || trx.tracking_number || "Waiting..." }}</span></p>
                  </div>
                </div>

                <div v-else class="flex items-center gap-3">
                  <div class="w-10 h-7 bg-gray-100 text-gray-400 rounded flex justify-center items-center p-1 shrink-0 border border-gray-200 no-export">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">No Courier</p>
                    <p class="text-[10px] text-gray-500 font-medium mt-0.5">In-store Pickup</p>
                  </div>
                </div>
              </div>
            </td>

            <td class="py-6 w-[15%] pr-2">
              <div class="flex flex-col gap-1.5">
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Subtotal:</span><span>{{ formatPrice(trx.total_amount) }}</span>
                </div>
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Shipping:</span><span>{{ formatPrice(trx.shipping_cost) }}</span>
                </div>
                <div class="flex justify-between text-sm font-bold text-black border-t border-dashed border-gray-200 pt-1.5 mt-1">
                  <span>Total:</span><span>{{ formatPrice(getGrandTotal(trx)) }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[10%]">
              <span :class="statusClass(trx.status)" class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit">{{ formatStatus(trx.status) }}</span>
            </td>

            <td class="py-6 w-[10%]">
              <span v-if="trx.shipping_method === 'free'" class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border bg-gray-100 text-gray-600">In-Store Pickup</span>
              <span v-else-if="trx.biteshipDataLoading" class="no-export text-[9px] text-gray-400 italic animate-pulse">Loading...</span>
              <span v-else :class="shippingStatusClass(trx.biteshipData?.status)" class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border">{{ formatStatus(trx.biteshipData?.status || "Pending") }}</span>
            </td>

            <td class="py-6 text-center w-[10%] no-export" @click.stop>
              <div v-if="trx.status === 'refund_requested'" class="flex justify-center gap-2">
                <button @click="handleRefundAction(trx.id, 'approve')" class="bg-green-100 hover:bg-green-200 p-2 rounded-lg text-green-600 transition shadow-sm" title="Approve Refund">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                </button>
                <button @click="handleRefundAction(trx.id, 'reject')" class="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-600 transition shadow-sm" title="Reject Refund">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div v-else-if="['completed', 'processing'].includes(trx.status)" class="flex justify-center">
                <button @click="goToDetail(trx)" class="text-[10px] font-bold text-blue-600 hover:underline">View Detail</button>
              </div>
              <span v-else class="text-gray-300 text-[10px] italic">No Action</span>
            </td>
          </tr>

          <tr v-if="!isLoading && paginatedTransactions.length === 0">
            <td colspan="7" class="py-20 font-serif text-gray-400 text-center italic">
              {{ searchQuery ? "No transactions match your search." : "No transactions found." }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!isLoading && filteredTransactions.length > 0" class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50">
      <p class="text-sm text-gray-400">Showing <span class="font-bold text-black">{{ showingStart }}</span> to <span class="font-bold text-black">{{ showingEnd }}</span> of <span class="font-bold text-black">{{ filteredTransactions.length }}</span> orders</p>
      <div class="flex gap-2">
        <button @click="currentPage--" :disabled="currentPage === 1" class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium">Previous</button>
        <button v-for="page in displayedPages" :key="page" @click="currentPage = page" :class="currentPage === page ? 'bg-black text-white border-black' : 'hover:bg-gray-50 border-gray-200'" class="w-10 h-10 border rounded-xl font-medium transition flex items-center justify-center text-sm">{{ page }}</button>
        <button @click="currentPage++" :disabled="currentPage === totalPages" class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium">Next</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";

// Import Library Export
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";

const transactions = ref([]);
const isLoading = ref(false);
const router = useRouter();

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const countdowns = ref({});
let timerInterval = null;

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// --- STATE FILTER TABS ---
const activeTransactionTab = ref("all");
const activeShippingTab = ref("all");

const transactionTabs = [
  { label: "All", value: "all" },
  { label: "Pending / Unpaid", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Refund Issues", value: "refund" },
];

const shippingTabs = [
  { label: "All", value: "all" },
  { label: "Placed / Pending", value: "placed" },
  { label: "Allocated", value: "allocated" },
  { label: "Picking Up", value: "picking_up" },
  { label: "In Transit", value: "dropping_off" },
  { label: "Delivered", value: "delivered" },
  { label: "No Shipping", value: "no_shipping" },
];

// --- FUNGSI PENGHITUNG BADGE ---
const getTransactionTabCount = (tabValue) => {
  return transactions.value.filter((order) => {
    if (tabValue === "all") return true;
    if (tabValue === "pending") return ["pending", "awaiting_payment"].includes(order.status);
    if (tabValue === "refund") return order.status.includes("refund");
    return order.status === tabValue;
  }).length;
};

const getShippingTabCount = (tabValue) => {
  return transactions.value.filter((order) => {
    if (tabValue === "all") return true;
    if (tabValue === "no_shipping") return order.shipping_method === "free";
    if (order.shipping_method === "free") return false;
    
    const shipStatus = order.biteshipData?.status || "pending";
    if (tabValue === "placed") return ["pending", "placed"].includes(shipStatus);
    if (tabValue === "dropping_off") return ["picked", "dropping_off"].includes(shipStatus);
    return shipStatus === tabValue;
  }).length;
};


const goToDetail = (trx) => {
  router.push({
    name: "TransactionDetail",
    params: { id: trx.id },
    state: { transactionData: JSON.parse(JSON.stringify(trx)) },
  });
};

const getGrandTotal = (trx) => {
  const subtotal = parseFloat(trx.total_amount) || 0;
  const shipping = parseFloat(trx.shipping_cost) || 0;
  return subtotal + shipping;
};

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => acc + getGrandTotal(curr), 0);
});

const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(" ")[1]?.toLowerCase();
  if (!channel) return null;
  const baseUrl = "/payment_images/";
  const map = { bca: "bca.png", bni: "bni.png", bri: "bri.png", mandiri: "mandiri.png", bsi: "bsi.png", permata: "permata.png", ovo: "ovo.png", dana: "dana.png", linkaja: "linkaja.png", shopeepay: "shopeepay.png", alfamart: "alfamart.png", indomaret: "indomaret.png", qris: "qris.png" };
  return map[channel] ? baseUrl + map[channel] : null;
};

const getPaymentStatusText = (status) => {
  if (["completed", "processing", "refund_requested", "refund_approved", "refund_rejected"].includes(status)) return "PAID";
  if (status === "cancelled") return "CANCELLED";
  if (status === "refunded") return "REFUNDED";
  return "UNPAID";
};

const getPaymentStatusColor = (status) => {
  if (["completed", "processing", "refund_requested", "refund_approved", "refund_rejected"].includes(status)) return "text-green-600";
  if (status === "cancelled") return "text-red-500";
  if (status === "refunded") return "text-teal-600";
  return "text-orange-500";
};

const getCourierLogo = (company) => {
  if (!company) return null;
  const baseUrl = "/courier_images/";
  const map = { jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png", anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png", paxel: "paxel.png", ninja: "ninja.png" };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
};

const calculateTimeLeft = (createdAt) => {
  const expiryTime = new Date(createdAt).getTime() + 86400000;
  const now = new Date().getTime();
  const diff = expiryTime - now;
  if (diff <= 0) return "Expired";
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const startTimers = () => {
  if (timerInterval) clearInterval(timerInterval);
  const updateTimers = () => {
    transactions.value.forEach((trx) => {
      if (["pending"].includes(trx.status)) {
        const timeRef = trx.payment?.created_at || trx.created_at;
        countdowns.value[trx.id] = calculateTimeLeft(timeRef);
      }
    });
  };
  timerInterval = setInterval(updateTimers, 60000);
  updateTimers();
};

const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return transactions.value.filter((order) => {
    let matchSearch = true;
    if (query) {
      matchSearch =
        order.order_id.toLowerCase().includes(query) ||
        order.user.first_name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query) ||
        (order.tracking_number && order.tracking_number.toLowerCase().includes(query));
    }

    let matchTransaction = false;
    if (activeTransactionTab.value === "all") matchTransaction = true;
    else if (activeTransactionTab.value === "pending") matchTransaction = ["pending", "awaiting_payment"].includes(order.status);
    else if (activeTransactionTab.value === "refund") matchTransaction = order.status.includes("refund");
    else matchTransaction = order.status === activeTransactionTab.value;

    let matchShipping = false;
    if (activeShippingTab.value === "all") matchShipping = true;
    else if (activeShippingTab.value === "no_shipping") matchShipping = order.shipping_method === "free";
    else {
      if (order.shipping_method === "free") matchShipping = false;
      else {
        const shipStatus = order.biteshipData?.status || "pending";
        if (activeShippingTab.value === "placed") matchShipping = ["pending", "placed"].includes(shipStatus);
        else if (activeShippingTab.value === "dropping_off") matchShipping = ["picked", "dropping_off"].includes(shipStatus);
        else matchShipping = shipStatus === activeShippingTab.value;
      }
    }
    return matchSearch && matchTransaction && matchShipping;
  });
});

const resetFilters = () => {
  activeTransactionTab.value = "all";
  activeShippingTab.value = "all";
  searchQuery.value = "";
};

const totalPages = computed(() => Math.ceil(filteredTransactions.value.length / itemsPerPage.value));
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredTransactions.value.slice(start, start + itemsPerPage.value);
});
const showingStart = computed(() => filteredTransactions.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1);
const showingEnd = computed(() => Math.min(currentPage.value * itemsPerPage.value, filteredTransactions.value.length));
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  let range = [];
  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) range.push(i);
  return range;
});

watch([searchQuery, itemsPerPage, activeTransactionTab, activeShippingTab], () => { currentPage.value = 1; });

const fetchBulkTracking = async (orders) => {
  const biteshipOrders = orders.filter((o) => o.shipping_method === "biteship" && o.biteship_order_id);
  const idsToTrack = biteshipOrders.map((o) => o.id);
  if (idsToTrack.length === 0) return;
  biteshipOrders.forEach((o) => (o.biteshipDataLoading = true));

  try {
    const res = await axios.post(`${BASE_URL}/admin/transactions/tracking/bulk`, { transaction_ids: idsToTrack }, axiosConfig);
    const bulkData = res.data;
    transactions.value.forEach((order) => {
      if (bulkData[order.id]) order.biteshipData = bulkData[order.id];
    });
  } catch (error) {
    biteshipOrders.forEach((o) => (o.biteshipData = { status: "Pending Data" }));
  } finally {
    biteshipOrders.forEach((o) => (o.biteshipDataLoading = false));
  }
};

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    transactions.value = res.data.map((order) => ({ ...order, biteshipData: null, biteshipDataLoading: false }));
    startTimers();
    fetchBulkTracking(transactions.value);
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

// --- FITUR EXPORT ---
const exportToPDF = () => {
  const element = document.getElementById("exportable-table");
  
  // Sembunyikan kolom Action dan gambar
  const noExportElements = element.querySelectorAll(".no-export");
  noExportElements.forEach(el => el.classList.add("hidden"));

  const headers = element.querySelectorAll(".export-header");
  headers.forEach((h) => h.classList.remove("hidden"));
  headers.forEach((h) => h.classList.add("block"));

  const fileName = `Transaction_Report_${new Date().toISOString().split('T')[0]}.pdf`;

  const opt = {
    margin: 0.3,
    filename: fileName,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "landscape" }, // Landscape karena tabel lebar
  };

  html2pdf().set(opt).from(element).save().then(() => {
    headers.forEach((h) => h.classList.add("hidden"));
    headers.forEach((h) => h.classList.remove("block"));
    noExportElements.forEach(el => el.classList.remove("hidden"));
  });
};

const exportToExcel = () => {
  const excelData = paginatedTransactions.value.map((item, index) => ({
    "No": index + 1,
    "Order ID": item.order_id,
    "Date": formatDate(item.created_at),
    "Customer Name": `${item.user.first_name} ${item.user.last_name}`,
    "Email": item.user.email,
    "Total Items": item.details.length,
    "Payment Method": item.payment_method ? item.payment_method.replace(/_/g, " ").toUpperCase() : "-",
    "Payment Status": getPaymentStatusText(item.status),
    "Shipping Method": item.shipping_method === 'free' ? 'In-Store Pickup' : `${item.courier_company} - ${item.courier_type}`,
    "Tracking Number": item.biteshipData?.courier?.waybill_id || item.tracking_number || "-",
    "Subtotal (IDR)": parseFloat(item.total_amount),
    "Shipping Cost (IDR)": parseFloat(item.shipping_cost),
    "Grand Total (IDR)": getGrandTotal(item),
    "Transaction Status": item.status.replace(/_/g, " ").toUpperCase(),
    "Shipping Status": item.shipping_method === 'free' ? "IN-STORE" : (item.biteshipData?.status || "PENDING").toUpperCase()
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
  const fileName = `Transaction_Data_${new Date().toISOString().split('T')[0]}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700", pending: "bg-orange-100 text-orange-700", processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700", cancelled: "bg-red-100 text-red-700", refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700", refund_rejected: "bg-gray-200 text-gray-600 line-through", refunded: "bg-teal-100 text-teal-700",
    refund_manual_required: "bg-pink-100 text-pink-700",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

const shippingStatusClass = (status) => {
  if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
  const str = status.toLowerCase();
  if (["delivered"].includes(str)) return "bg-green-50 border-green-200 text-green-700";
  if (["cancelled", "rejected"].includes(str)) return "bg-red-50 border-red-200 text-red-700";
  if (["picking_up", "picked", "dropping_off", "allocated"].includes(str)) return "bg-blue-50 border-blue-200 text-blue-700";
  return "bg-gray-50 border-gray-200 text-gray-600";
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);
const formatDate = (date) => new Date(date).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
const formatStatus = (s) => s.replace(/_/g, " ");

const handleRefundAction = async (id, action) => {
  const endpoint = action === "approve" ? "refund-approve" : "refund-reject";
  const confirmText = action === "approve" ? "Approve this refund request?" : "Reject this refund request?";
  const result = await Swal.fire({ title: "Confirm Action", text: confirmText, icon: "warning", showCancelButton: true, confirmButtonColor: "#000", confirmButtonText: "Yes, proceed!" });
  if (result.isConfirmed) {
    try {
      await axios.post(`${BASE_URL}/admin/transactions/${id}/${endpoint}`, {}, axiosConfig);
      Swal.fire("Success", `Refund ${action}d successfully`, "success");
      fetchTransactions();
    } catch (err) { Swal.fire("Error", "Action failed", "error"); }
  }
};

onMounted(fetchTransactions);
onUnmounted(() => { if (timerInterval) clearInterval(timerInterval); });
</script>

<style scoped>
@media print {
  .export-header { display: block !important; }
  .no-export { display: none !important; }
}
</style> -->

<!-- Tambahan Status di Filter Tab -->
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
          class="border-4 border-gray-200 border-t-black rounded-full w-12 h-12 animate-spin"
        ></div>
        <p
          class="mt-4 font-bold text-black text-xs uppercase tracking-widest animate-pulse"
        >
          Processing Data...
        </p>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transaction Monitoring</h1>
        <p class="text-gray-500 text-sm">
          Manage and track all customer orders in real-time.
        </p>
      </div>
      <div
        class="bg-gray-50 px-6 py-3 border border-gray-100 rounded-2xl flex items-center gap-4"
      >
        <div>
          <span
            class="block font-black text-[10px] text-gray-400 uppercase tracking-widest"
            >Total Revenue</span
          >
          <span class="font-bold text-green-600 text-xl">{{
            formatPrice(totalRevenue)
          }}</span>
        </div>
      </div>
    </div>

    <div class="mb-8 space-y-4">
      <div
        class="flex items-center gap-4 overflow-x-auto pb-2 border-b border-gray-100"
      >
        <span
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap"
          >Transaction:</span
        >
        <button
          v-for="tab in transactionTabs"
          :key="tab.value"
          @click="activeTransactionTab = tab.value"
          :class="[
            'px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2',
            activeTransactionTab === tab.value
              ? 'border-black text-black bg-gray-50'
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tab.label }}
          <span
            v-if="getTransactionTabCount(tab.value) > 0"
            :class="
              activeTransactionTab === tab.value
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-600'
            "
            class="px-1.5 py-0.5 rounded-md text-[9px] font-black"
          >
            {{ getTransactionTabCount(tab.value) }}
          </span>
        </button>
      </div>

      <div
        class="flex items-center gap-4 overflow-x-auto pb-2 border-b border-gray-100"
      >
        <span
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap"
          >Shipping:</span
        >
        <button
          v-for="tab in shippingTabs"
          :key="tab.value"
          @click="activeShippingTab = tab.value"
          :class="[
            'px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2',
            activeShippingTab === tab.value
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tab.label }}
          <span
            v-if="getShippingTabCount(tab.value) > 0"
            :class="
              activeShippingTab === tab.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            "
            class="px-1.5 py-0.5 rounded-md text-[9px] font-black"
          >
            {{ getShippingTabCount(tab.value) }}
          </span>
        </button>
      </div>
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
          placeholder="Search Order ID, Name, or Email..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          @click="exportToPDF"
          :disabled="paginatedTransactions.length === 0"
          class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition"
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          PDF
        </button>
        <button
          @click="exportToExcel"
          :disabled="paginatedTransactions.length === 0"
          class="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition"
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
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Excel
        </button>

        <div class="h-6 w-px bg-gray-200 mx-1"></div>

        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >Show:</span
        >
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto" id="exportable-table">
      <div class="hidden export-header mb-4">
        <h2 class="text-2xl font-bold text-black">Transaction Report</h2>
        <p class="text-gray-500 text-sm">
          Generated on: {{ new Date().toLocaleString() }}
        </p>
      </div>

      <table class="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr
            class="border-b text-gray-400 text-[10px] uppercase tracking-widest"
          >
            <th class="pb-4 pl-2">Order Details</th>
            <th class="pb-4 no-export">Product Sample</th>
            <th class="pb-4">Logistics (Pay & Ship)</th>
            <th class="pb-4">Financials</th>
            <th class="pb-4">Trans. Status</th>
            <th class="pb-4">Ship. Status</th>
            <th class="pb-4 text-center no-export">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
          <tr
            v-for="trx in paginatedTransactions"
            :key="trx.id"
            class="group hover:bg-gray-50 border-b border-gray-50 transition cursor-pointer align-top"
            @click="goToDetail(trx)"
          >
            <td class="py-6 pl-2 w-[15%]">
              <div class="flex flex-col gap-1">
                <span class="font-mono font-bold text-black text-sm">{{
                  trx.order_id
                }}</span>
                <span class="text-gray-400 text-xs">{{
                  formatDate(trx.created_at)
                }}</span>
                <div class="mt-2">
                  <span
                    class="block font-bold text-gray-800 text-xs truncate max-w-[150px]"
                    :title="trx.user.first_name + ' ' + trx.user.last_name"
                    >{{ trx.user.first_name }} {{ trx.user.last_name }}</span
                  >
                  <span
                    class="block text-gray-400 text-[10px] truncate max-w-[150px]"
                    :title="trx.user.email"
                    >{{ trx.user.email }}</span
                  >
                </div>
                <div
                  v-if="
                    ['pending'].includes(trx.status) &&
                    countdowns[trx.id] !== 'Expired'
                  "
                  class="no-export mt-2 flex items-center gap-1 text-red-600 bg-red-50 w-fit px-2 py-1 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="font-mono font-bold text-[10px]">{{
                    countdowns[trx.id]
                  }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[15%] no-export">
              <div class="flex flex-col gap-2">
                <div class="flex -space-x-3 overflow-hidden py-1 pl-1">
                  <img
                    v-for="(detail, idx) in trx.details.slice(0, 3)"
                    :key="idx"
                    :src="detail.product.image"
                    class="inline-block h-10 w-10 rounded-full border-2 border-white object-cover bg-gray-100 shadow-sm"
                    crossorigin="anonymous"
                  />
                  <div
                    v-if="trx.details.length > 3"
                    class="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white bg-gray-100 text-[10px] font-bold text-gray-500"
                  >
                    +{{ trx.details.length - 3 }}
                  </div>
                </div>
                <span class="text-xs text-gray-500 font-medium"
                  >{{ trx.details.length }} Items</span
                >
              </div>
            </td>

            <td class="py-6 w-[20%]">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0 no-export"
                  >
                    <img
                      v-if="getPaymentLogo(trx.payment_method)"
                      :src="getPaymentLogo(trx.payment_method)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >PAY</span
                    >
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      {{
                        trx.payment_method
                          ? trx.payment_method.replace(/_/g, " ")
                          : "Not Selected"
                      }}
                    </p>
                    <p
                      :class="getPaymentStatusColor(trx.status)"
                      class="text-[9px] font-bold uppercase tracking-wider"
                    >
                      {{ getPaymentStatusText(trx.status) }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="trx.shipping_method !== 'free'"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0 no-export"
                  >
                    <img
                      v-if="getCourierLogo(trx.courier_company)"
                      :src="getCourierLogo(trx.courier_company)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >SHIP</span
                    >
                  </div>
                  <div>
                    <p
                      class="font-bold text-gray-800 text-[11px] uppercase truncate w-32"
                    >
                      {{ trx.courier_company || "Pending" }} -
                      {{ trx.courier_type || "-" }}
                    </p>
                    <div
                      v-if="trx.biteshipDataLoading"
                      class="no-export text-[10px] text-gray-400 italic mt-0.5"
                    >
                      Fetching Waybill...
                    </div>
                    <p v-else class="text-[10px] text-gray-500 font-mono">
                      Resi:
                      <span class="font-bold text-black">{{
                        trx.biteshipData?.courier?.waybill_id ||
                        trx.tracking_number ||
                        "Waiting..."
                      }}</span>
                    </p>
                  </div>
                </div>

                <div v-else class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-gray-100 text-gray-400 rounded flex justify-center items-center p-1 shrink-0 border border-gray-200 no-export"
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      No Courier
                    </p>
                    <p class="text-[10px] text-gray-500 font-medium mt-0.5">
                      In-store Pickup
                    </p>
                  </div>
                </div>
              </div>
            </td>

            <td class="py-6 w-[15%] pr-2">
              <div class="flex flex-col gap-1.5">
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Subtotal:</span
                  ><span>{{ formatPrice(trx.total_amount) }}</span>
                </div>
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Shipping:</span
                  ><span>{{ formatPrice(trx.shipping_cost) }}</span>
                </div>
                <div
                  class="flex justify-between text-sm font-bold text-black border-t border-dashed border-gray-200 pt-1.5 mt-1"
                >
                  <span>Total:</span
                  ><span>{{ formatPrice(getGrandTotal(trx)) }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[10%]">
              <span
                :class="statusClass(trx.status)"
                class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit"
                >{{ formatStatus(trx.status) }}</span
              >
            </td>

            <td class="py-6 w-[10%]">
              <span
                v-if="trx.shipping_method === 'free'"
                class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border bg-gray-100 text-gray-600"
                >In-Store Pickup</span
              >
              <span
                v-else-if="trx.biteshipDataLoading"
                class="no-export text-[9px] text-gray-400 italic animate-pulse"
                >Loading...</span
              >
              <span
                v-else
                :class="shippingStatusClass(trx.biteshipData?.status)"
                class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border"
                >{{ formatStatus(trx.biteshipData?.status || "Pending") }}</span
              >
            </td>

            <td class="py-6 text-center w-[10%] no-export" @click.stop>
              <div
                v-if="trx.status === 'refund_requested'"
                class="flex justify-center gap-2"
              >
                <button
                  @click="handleRefundAction(trx.id, 'approve')"
                  class="bg-green-100 hover:bg-green-200 p-2 rounded-lg text-green-600 transition shadow-sm"
                  title="Approve Refund"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  @click="handleRefundAction(trx.id, 'reject')"
                  class="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-600 transition shadow-sm"
                  title="Reject Refund"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-else-if="['completed', 'processing'].includes(trx.status)"
                class="flex justify-center"
              >
                <button
                  @click="goToDetail(trx)"
                  class="text-[10px] font-bold text-blue-600 hover:underline"
                >
                  View Detail
                </button>
              </div>
              <span v-else class="text-gray-300 text-[10px] italic"
                >No Action</span
              >
            </td>
          </tr>

          <tr v-if="!isLoading && paginatedTransactions.length === 0">
            <td
              colspan="7"
              class="py-20 font-serif text-gray-400 text-center italic"
            >
              {{
                searchQuery
                  ? "No transactions match your search."
                  : "No transactions found."
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredTransactions.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to
        <span class="font-bold text-black">{{ showingEnd }}</span> of
        <span class="font-bold text-black">{{
          filteredTransactions.length
        }}</span>
        orders
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
          v-for="page in displayedPages"
          :key="page"
          @click="currentPage = page"
          :class="
            currentPage === page
              ? 'bg-black text-white border-black'
              : 'hover:bg-gray-50 border-gray-200'
          "
          class="w-10 h-10 border rounded-xl font-medium transition flex items-center justify-center text-sm"
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
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";

import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";

const transactions = ref([]);
const isLoading = ref(false);
const router = useRouter();

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const countdowns = ref({});
let timerInterval = null;

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// --- STATE FILTER TABS ---
const activeTransactionTab = ref("all");
const activeShippingTab = ref("all");

// [PERBAIKAN] TAB FILTER DISAMAKAN DENGAN ORDERPAGE.VUE
const transactionTabs = [
  { label: "All", value: "all" },
  { label: "Pending / Unpaid", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Refund Issues", value: "refund" },
  { label: "Returned/Failed", value: "failed_returned" },
];

const shippingTabs = [
  { label: "All", value: "all" },
  { label: "Placed / Pending", value: "placed" },
  { label: "Allocated", value: "allocated" },
  { label: "Picking Up", value: "picking_up" },
  { label: "In Transit", value: "dropping_off" },
  { label: "On Hold", value: "on_hold" },
  { label: "Delivered", value: "delivered" },
  { label: "Returning", value: "returning" },
  { label: "Issues / Cancelled", value: "issues" },
  { label: "No Shipping", value: "no_shipping" },
];

// --- FUNGSI PENGHITUNG BADGE (SAMA PERSIS DENGAN ORDERPAGE) ---
const getTransactionTabCount = (tabValue) => {
  return transactions.value.filter((order) => {
    if (tabValue === "all") return true;
    if (tabValue === "pending")
      return ["pending", "awaiting_payment"].includes(order.status);
    if (tabValue === "refund") return order.status.includes("refund");
    if (tabValue === "failed_returned")
      return ["returned", "shipping_failed"].includes(order.status);
    return order.status === tabValue;
  }).length;
};

const getShippingTabCount = (tabValue) => {
  return transactions.value.filter((order) => {
    if (tabValue === "all") return true;
    if (tabValue === "no_shipping") return order.shipping_method === "free";
    if (order.shipping_method === "free") return false;

    const shipStatus = order.biteshipData?.status
      ? order.biteshipData.status.toLowerCase()
      : "pending";
    if (tabValue === "placed")
      return ["pending", "placed"].includes(shipStatus);
    if (tabValue === "dropping_off")
      return ["picked", "dropping_off"].includes(shipStatus);
    if (tabValue === "returning")
      return ["return_in_transit", "returned"].includes(shipStatus);
    if (tabValue === "issues")
      return ["cancelled", "rejected", "disposed"].includes(shipStatus);

    return shipStatus === tabValue;
  }).length;
};

const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return transactions.value.filter((order) => {
    let matchSearch = true;
    if (query) {
      matchSearch =
        order.order_id.toLowerCase().includes(query) ||
        order.user.first_name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query) ||
        (order.tracking_number &&
          order.tracking_number.toLowerCase().includes(query));
    }

    let matchTransaction = false;
    if (activeTransactionTab.value === "all") matchTransaction = true;
    else if (activeTransactionTab.value === "pending")
      matchTransaction = ["pending", "awaiting_payment"].includes(order.status);
    else if (activeTransactionTab.value === "refund")
      matchTransaction = order.status.includes("refund");
    else if (activeTransactionTab.value === "failed_returned")
      matchTransaction = ["returned", "shipping_failed"].includes(order.status);
    else matchTransaction = order.status === activeTransactionTab.value;

    let matchShipping = false;
    if (activeShippingTab.value === "all") matchShipping = true;
    else if (activeShippingTab.value === "no_shipping")
      matchShipping = order.shipping_method === "free";
    else {
      if (order.shipping_method === "free") matchShipping = false;
      else {
        const shipStatus = order.biteshipData?.status
          ? order.biteshipData.status.toLowerCase()
          : "pending";
        if (activeShippingTab.value === "placed")
          matchShipping = ["pending", "placed"].includes(shipStatus);
        else if (activeShippingTab.value === "dropping_off")
          matchShipping = ["picked", "dropping_off"].includes(shipStatus);
        else if (activeShippingTab.value === "returning")
          matchShipping = ["return_in_transit", "returned"].includes(
            shipStatus,
          );
        else if (activeShippingTab.value === "issues")
          matchShipping = ["cancelled", "rejected", "disposed"].includes(
            shipStatus,
          );
        else matchShipping = shipStatus === activeShippingTab.value;
      }
    }
    return matchSearch && matchTransaction && matchShipping;
  });
});

const resetFilters = () => {
  activeTransactionTab.value = "all";
  activeShippingTab.value = "all";
  searchQuery.value = "";
};

const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / itemsPerPage.value),
);
const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredTransactions.value.slice(start, start + itemsPerPage.value);
});
const showingStart = computed(() =>
  filteredTransactions.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1,
);
const showingEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredTransactions.value.length,
  ),
);
const displayedPages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 2;
  let range = [];
  for (
    let i = Math.max(1, current - delta);
    i <= Math.min(total, current + delta);
    i++
  )
    range.push(i);
  return range;
});

watch(
  [searchQuery, itemsPerPage, activeTransactionTab, activeShippingTab],
  () => {
    currentPage.value = 1;
  },
);

const goToDetail = (trx) => {
  router.push({
    name: "TransactionDetail",
    params: { id: trx.id },
    state: { transactionData: JSON.parse(JSON.stringify(trx)) },
  });
};

const getGrandTotal = (trx) =>
  parseFloat(trx.total_amount) || 0 + parseFloat(trx.shipping_cost) || 0;

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => acc + getGrandTotal(curr), 0);
});

const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(" ")[1]?.toLowerCase();
  const map = {
    bca: "bca.png",
    bni: "bni.png",
    bri: "bri.png",
    mandiri: "mandiri.png",
    bsi: "bsi.png",
    permata: "permata.png",
    ovo: "ovo.png",
    dana: "dana.png",
    linkaja: "linkaja.png",
    shopeepay: "shopeepay.png",
    alfamart: "alfamart.png",
    indomaret: "indomaret.png",
    qris: "qris.png",
  };
  return map[channel] ? "/payment_images/" + map[channel] : null;
};

const getPaymentStatusText = (status) =>
  [
    "completed",
    "processing",
    "refund_requested",
    "refund_approved",
    "refund_rejected",
  ].includes(status)
    ? "PAID"
    : status === "cancelled"
      ? "CANCELLED"
      : status === "refunded"
        ? "REFUNDED"
        : "UNPAID";
const getPaymentStatusColor = (status) =>
  [
    "completed",
    "processing",
    "refund_requested",
    "refund_approved",
    "refund_rejected",
  ].includes(status)
    ? "text-green-600"
    : status === "cancelled"
      ? "text-red-500"
      : status === "refunded"
        ? "text-teal-600"
        : "text-orange-500";
const getCourierLogo = (company) => {
  if (!company) return null;
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
  };
  return map[company.toLowerCase()]
    ? "/courier_images/" + map[company.toLowerCase()]
    : null;
};

const calculateTimeLeft = (createdAt) => {
  const expiryTime = new Date(createdAt).getTime() + 86400000;
  const now = new Date().getTime();
  const diff = expiryTime - now;
  if (diff <= 0) return "Expired";
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return `${hours}h ${minutes}m`;
};

const startTimers = () => {
  if (timerInterval) clearInterval(timerInterval);
  const updateTimers = () => {
    transactions.value.forEach((trx) => {
      if (["pending"].includes(trx.status)) {
        const timeRef = trx.payment?.created_at || trx.created_at;
        countdowns.value[trx.id] = calculateTimeLeft(timeRef);
      }
    });
  };
  timerInterval = setInterval(updateTimers, 60000);
  updateTimers();
};

const fetchBulkTracking = async (orders) => {
  const biteshipOrders = orders.filter(
    (o) => o.shipping_method === "biteship" && o.biteship_order_id,
  );
  const idsToTrack = biteshipOrders.map((o) => o.id);
  if (idsToTrack.length === 0) return;
  biteshipOrders.forEach((o) => (o.biteshipDataLoading = true));

  try {
    const res = await axios.post(
      `${BASE_URL}/admin/transactions/tracking/bulk`,
      { transaction_ids: idsToTrack },
      axiosConfig,
    );
    const bulkData = res.data;
    transactions.value.forEach((order) => {
      if (bulkData[order.id]) order.biteshipData = bulkData[order.id];
    });
  } catch (error) {
    biteshipOrders.forEach(
      (o) => (o.biteshipData = { status: "Pending Data" }),
    );
  } finally {
    biteshipOrders.forEach((o) => (o.biteshipDataLoading = false));
  }
};

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    transactions.value = res.data.map((order) => ({
      ...order,
      biteshipData: null,
      biteshipDataLoading: false,
    }));
    startTimers();
    fetchBulkTracking(transactions.value);
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

const exportToPDF = () => {
  const element = document.getElementById("exportable-table");
  const noExportElements = element.querySelectorAll(".no-export");
  noExportElements.forEach((el) => el.classList.add("hidden"));
  const headers = element.querySelectorAll(".export-header");
  headers.forEach((h) => {
    h.classList.remove("hidden");
    h.classList.add("block");
  });

  const opt = {
    margin: 0.3,
    filename: `Transaction_Report_${new Date().toISOString().split("T")[0]}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      headers.forEach((h) => {
        h.classList.add("hidden");
        h.classList.remove("block");
      });
      noExportElements.forEach((el) => el.classList.remove("hidden"));
    });
};

const exportToExcel = () => {
  const excelData = paginatedTransactions.value.map((item, index) => ({
    No: index + 1,
    "Order ID": item.order_id,
    Date: formatDate(item.created_at),
    "Customer Name": `${item.user.first_name} ${item.user.last_name}`,
    Email: item.user.email,
    "Total Items": item.details.length,
    "Payment Method": item.payment_method
      ? item.payment_method.replace(/_/g, " ").toUpperCase()
      : "-",
    "Payment Status": getPaymentStatusText(item.status),
    "Shipping Method":
      item.shipping_method === "free"
        ? "In-Store Pickup"
        : `${item.courier_company} - ${item.courier_type}`,
    "Tracking Number":
      item.biteshipData?.courier?.waybill_id || item.tracking_number || "-",
    "Subtotal (IDR)": parseFloat(item.total_amount),
    "Shipping Cost (IDR)": parseFloat(item.shipping_cost),
    "Grand Total (IDR)": getGrandTotal(item),
    "Transaction Status": item.status.replace(/_/g, " ").toUpperCase(),
    "Shipping Status":
      item.shipping_method === "free"
        ? "IN-STORE"
        : (item.biteshipData?.status || "PENDING").toUpperCase(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
  XLSX.writeFile(
    workbook,
    `Transaction_Data_${new Date().toISOString().split("T")[0]}.xlsx`,
  );
};

// [PERBAIKAN] Sinkronisasi Warna Status dengan OrderPage
const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700",
    pending: "bg-orange-100 text-orange-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700",
    refund_rejected: "bg-gray-200 text-gray-600 line-through",
    refunded: "bg-teal-100 text-teal-700",
    refund_manual_required: "bg-pink-100 text-pink-700",
    returned: "bg-gray-800 text-white",
    shipping_failed: "bg-red-800 text-white",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

// [PERBAIKAN] Sinkronisasi Warna Status Pengiriman dengan OrderPage
const shippingStatusClass = (status) => {
  if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
  const str = status.toLowerCase();
  if (["delivered"].includes(str))
    return "bg-green-50 border-green-200 text-green-700";
  if (["cancelled", "rejected", "disposed"].includes(str))
    return "bg-red-50 border-red-200 text-red-700";
  if (["on_hold", "return_in_transit", "returned"].includes(str))
    return "bg-amber-50 border-amber-200 text-amber-700";
  if (["picking_up", "picked", "dropping_off", "allocated"].includes(str))
    return "bg-blue-50 border-blue-200 text-blue-700";
  return "bg-gray-50 border-gray-200 text-gray-600";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const formatStatus = (s) => s.replace(/_/g, " ");

const handleRefundAction = async (id, action) => {
  const endpoint = action === "approve" ? "refund-approve" : "refund-reject";
  const confirmText =
    action === "approve"
      ? "Approve this refund request?"
      : "Reject this refund request?";
  const result = await Swal.fire({
    title: "Confirm Action",
    text: confirmText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, proceed!",
  });
  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/admin/transactions/${id}/${endpoint}`,
        {},
        axiosConfig,
      );
      Swal.fire("Success", `Refund ${action}d successfully`, "success");
      fetchTransactions();
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  }
};

onMounted(fetchTransactions);
onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
@media print {
  .export-header {
    display: block !important;
  }
  .no-export {
    display: none !important;
  }
}
</style> -->

<!-- Menghapus fungsi fetchBulkTracking method -->
<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]"
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
          Processing Data...
        </p>
      </div>
    </div>

    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">Transaction Monitoring</h1>
        <p class="text-gray-500 text-sm">
          Manage and track all customer orders in real-time.
        </p>
      </div>
      <div
        class="bg-gray-50 px-6 py-3 border border-gray-100 rounded-2xl flex items-center gap-4"
      >
        <div>
          <span
            class="block font-black text-[10px] text-gray-400 uppercase tracking-widest"
            >Total Revenue</span
          >
          <span class="font-bold text-green-600 text-xl">{{
            formatPrice(totalRevenue)
          }}</span>
        </div>
      </div>
    </div>

    <div class="mb-8 space-y-4">
      <div
        class="flex items-center gap-4 overflow-x-auto pb-2 border-b border-gray-100"
      >
        <span
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap"
          >Transaction:</span
        >
        <button
          v-for="tab in transactionTabs"
          :key="tab.value"
          @click="activeTransactionTab = tab.value"
          :class="[
            'px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2',
            activeTransactionTab === tab.value
              ? 'border-black text-black bg-gray-50'
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tab.label }}
          <span
            v-if="getTransactionTabCount(tab.value) > 0"
            :class="
              activeTransactionTab === tab.value
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-600'
            "
            class="px-1.5 py-0.5 rounded-md text-[9px] font-black"
          >
            {{ getTransactionTabCount(tab.value) }}
          </span>
        </button>
      </div>

      <div
        class="flex items-center gap-4 overflow-x-auto pb-2 border-b border-gray-100"
      >
        <span
          class="text-[10px] font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap"
          >Shipping:</span
        >
        <button
          v-for="tab in shippingTabs"
          :key="tab.value"
          @click="activeShippingTab = tab.value"
          :class="[
            'px-4 py-2 rounded-t-lg font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap border-b-2 flex items-center gap-2',
            activeShippingTab === tab.value
              ? 'border-blue-600 text-blue-600 bg-blue-50/50'
              : 'border-transparent text-gray-400 hover:text-gray-700 hover:bg-gray-50',
          ]"
        >
          {{ tab.label }}
          <span
            v-if="getShippingTabCount(tab.value) > 0"
            :class="
              activeShippingTab === tab.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            "
            class="px-1.5 py-0.5 rounded-md text-[9px] font-black"
          >
            {{ getShippingTabCount(tab.value) }}
          </span>
        </button>
      </div>
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
          placeholder="Search Order ID, Name, or Email..."
          class="bg-gray-50 pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm transition"
        />
      </div>

      <div class="flex flex-wrap items-center gap-3">
        <button
          @click="exportToPDF"
          :disabled="paginatedTransactions.length === 0"
          class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition"
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
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          PDF
        </button>
        <button
          @click="exportToExcel"
          :disabled="paginatedTransactions.length === 0"
          class="flex items-center gap-2 bg-green-50 hover:bg-green-100 text-green-600 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition"
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
              d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Excel
        </button>

        <div class="h-6 w-px bg-gray-200 mx-1"></div>

        <span class="text-xs font-bold text-gray-400 uppercase tracking-wide"
          >Show:</span
        >
        <select
          v-model="itemsPerPage"
          class="bg-gray-50 px-3 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none text-sm font-bold cursor-pointer"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
          <option :value="50">50</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto" id="exportable-table">
      <div class="hidden export-header mb-4">
        <h2 class="text-2xl font-bold text-black">Transaction Report</h2>
        <p class="text-gray-500 text-sm">
          Generated on: {{ new Date().toLocaleString() }}
        </p>
      </div>

      <table class="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr
            class="border-b text-gray-400 text-[10px] uppercase tracking-widest"
          >
            <th class="pb-4 pl-2">Order Details</th>
            <th class="pb-4 no-export">Product Sample</th>
            <th class="pb-4">Logistics (Pay & Ship)</th>
            <th class="pb-4">Financials</th>
            <th class="pb-4">Trans. Status</th>
            <th class="pb-4">Ship. Status</th>
            <th class="pb-4 text-center no-export">Action</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
          <tr
            v-for="trx in paginatedTransactions"
            :key="trx.id"
            class="group hover:bg-gray-50 border-b border-gray-50 transition cursor-pointer align-top"
            @click="goToDetail(trx)"
          >
            <td class="py-6 pl-2 w-[15%]">
              <div class="flex flex-col gap-1">
                <span class="font-mono font-bold text-black text-sm">{{
                  trx.order_id
                }}</span>
                <span class="text-gray-400 text-xs">{{
                  formatDate(trx.created_at)
                }}</span>
                <div class="mt-2">
                  <span
                    class="block font-bold text-gray-800 text-xs truncate max-w-[150px]"
                    :title="trx.user.first_name + ' ' + trx.user.last_name"
                    >{{ trx.user.first_name }} {{ trx.user.last_name }}</span
                  >
                  <span
                    class="block text-gray-400 text-[10px] truncate max-w-[150px]"
                    :title="trx.user.email"
                    >{{ trx.user.email }}</span
                  >
                </div>
                <div
                  v-if="
                    ['pending', 'awaiting_payment'].includes(trx.status) &&
                    countdowns[trx.id] !== 'Expired'
                  "
                  class="no-export mt-2 flex items-center gap-1 text-red-600 bg-red-50 w-fit px-2 py-1 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3 animate-pulse"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span class="font-mono font-bold text-[10px]">{{
                    countdowns[trx.id]
                  }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[15%] no-export">
              <div class="flex flex-col gap-2">
                <div class="flex -space-x-3 overflow-hidden py-1 pl-1">
                  <img
                    v-for="(detail, idx) in trx.details.slice(0, 3)"
                    :key="idx"
                    :src="detail.product.image"
                    class="inline-block h-10 w-10 rounded-full border-2 border-white object-cover bg-gray-100 shadow-sm"
                  />
                  <div
                    v-if="trx.details.length > 3"
                    class="flex items-center justify-center h-10 w-10 rounded-full border-2 border-white bg-gray-100 text-[10px] font-bold text-gray-500"
                  >
                    +{{ trx.details.length - 3 }}
                  </div>
                </div>
                <span class="text-xs text-gray-500 font-medium"
                  >{{ trx.details.length }} Items</span
                >
              </div>
            </td>

            <td class="py-6 w-[20%]">
              <div class="space-y-4">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0 no-export"
                  >
                    <img
                      v-if="getPaymentLogo(trx.payment_method)"
                      :src="getPaymentLogo(trx.payment_method)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >PAY</span
                    >
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      {{
                        trx.payment_method
                          ? trx.payment_method.replace(/_/g, " ")
                          : "Not Selected"
                      }}
                    </p>
                    <p
                      :class="getPaymentStatusColor(trx.status)"
                      class="text-[9px] font-bold uppercase tracking-wider"
                    >
                      {{ getPaymentStatusText(trx.status) }}
                    </p>
                  </div>
                </div>

                <div
                  v-if="trx.shipping_method !== 'free'"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-7 bg-white border border-gray-200 rounded flex justify-center items-center p-0.5 shrink-0 no-export"
                  >
                    <img
                      v-if="getCourierLogo(trx.courier_company)"
                      :src="getCourierLogo(trx.courier_company)"
                      class="w-full h-full object-contain"
                    />
                    <span v-else class="text-[8px] font-bold text-gray-400"
                      >SHIP</span
                    >
                  </div>
                  <div>
                    <p
                      class="font-bold text-gray-800 text-[11px] uppercase truncate w-32"
                    >
                      {{ trx.courier_company || "Pending" }} -
                      {{ trx.courier_type || "-" }}
                    </p>
                    <p class="text-[10px] text-gray-500 font-mono">
                      Resi:
                      <span class="font-bold text-black">{{
                        trx.tracking_number || "Waiting..."
                      }}</span>
                    </p>
                  </div>
                </div>

                <div v-else class="flex items-center gap-3">
                  <div
                    class="w-10 h-7 bg-gray-100 text-gray-400 rounded flex justify-center items-center p-1 shrink-0 border border-gray-200 no-export"
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
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <div>
                    <p class="font-bold text-gray-800 text-[11px] uppercase">
                      No Courier
                    </p>
                    <p class="text-[10px] text-gray-500 font-medium mt-0.5">
                      In-store Pickup
                    </p>
                  </div>
                </div>
              </div>
            </td>

            <!-- <td class="py-6 w-[15%] pr-2">
              <div class="flex flex-col gap-1.5">
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Subtotal:</span
                  ><span>{{ formatPrice(trx.total_amount) }}</span>
                </div>
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Shipping:</span
                  ><span>{{ formatPrice(trx.shipping_cost) }}</span>
                </div>
                <div
                  class="flex justify-between text-sm font-bold text-black border-t border-dashed border-gray-200 pt-1.5 mt-1"
                >
                  <span>Total:</span
                  ><span>{{ formatPrice(getGrandTotal(trx)) }}</span>
                </div>
              </div>
            </td> -->

            <td class="py-6 w-[15%] pr-2">
              <div class="flex flex-col gap-1.5">
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Subtotal:</span
                  ><span>{{ formatPrice(trx.total_amount) }}</span>
                </div>
                <div class="flex justify-between text-[10px] text-gray-500">
                  <span>Shipping:</span
                  ><span>{{ formatPrice(trx.shipping_cost) }}</span>
                </div>
                <div
                  class="flex justify-between text-sm font-bold text-black border-t border-dashed border-gray-200 pt-1.5 mt-1"
                >
                  <span>Total:</span
                  ><span>{{ formatPrice(getGrandTotal(trx)) }}</span>
                </div>

                <div
                  v-if="trx.point > 0 && trx.status === 'completed'"
                  class="flex justify-between items-center text-[10px] text-yellow-600 font-bold bg-yellow-50 px-2 py-1 rounded border border-yellow-100 mt-1"
                >
                  <span class="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                      />
                    </svg>
                    Points Earned:
                  </span>
                  <span>+{{ trx.point }}</span>
                </div>
              </div>
            </td>

            <td class="py-6 w-[10%]">
              <span
                :class="statusClass(trx.status)"
                class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit"
                >{{ formatStatus(trx.status) }}</span
              >
            </td>

            <td class="py-6 w-[10%]">
              <span
                v-if="trx.shipping_method === 'free'"
                class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border bg-gray-100 text-gray-600"
                >In-Store Pickup</span
              >
              <span
                v-else
                :class="shippingStatusClass(trx.shipping_status)"
                class="px-3 py-1 rounded-full font-bold text-[9px] uppercase tracking-tighter block w-fit border"
                >{{ formatStatus(trx.shipping_status || "Pending") }}</span
              >
            </td>

            <!-- <td class="py-6 text-center w-[10%] no-export" @click.stop>
              <div
                v-if="trx.status === 'refund_requested'"
                class="flex justify-center gap-2"
              >
                <button
                  @click="handleRefundAction(trx.id, 'approve')"
                  class="bg-green-100 hover:bg-green-200 p-2 rounded-lg text-green-600 transition shadow-sm"
                  title="Approve Refund"
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </button>
                <button
                  @click="handleRefundAction(trx.id, 'reject')"
                  class="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-600 transition shadow-sm"
                  title="Reject Refund"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div
                v-else-if="['completed', 'processing'].includes(trx.status)"
                class="flex justify-center"
              >
                <button
                  @click="goToDetail(trx)"
                  class="text-[10px] font-bold text-blue-600 hover:underline"
                >
                  View Detail
                </button>
              </div>
              <span v-else class="text-gray-300 text-[10px] italic"
                >No Action</span
              >
            </td> -->

            <td class="py-6 w-[10%] align-middle no-export" @click.stop>
              <div
                class="flex flex-col gap-2 justify-center items-center h-full"
              >
                <template
                  v-if="
                    trx.status === 'processing' &&
                    trx.shipping_method === 'biteship'
                  "
                >
                  <div
                    v-if="
                      ['pending', 'placed'].includes(
                        trx.shipping_status || 'pending',
                      )
                    "
                    class="flex flex-col gap-1.5 w-full"
                  >
                    <button
                      @click="updateShipping(trx.id, 'confirm')"
                      class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-sm transition w-full"
                    >
                      Konfirmasi
                    </button>
                    <button
                      @click="updateShipping(trx.id, 'cancel')"
                      class="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-sm transition w-full border border-red-100"
                    >
                      Batalkan
                    </button>
                  </div>

                  <div
                    v-else-if="trx.shipping_status === 'confirmed'"
                    class="flex flex-col gap-1.5 w-full"
                  >
                    <button
                      @click="updateShipping(trx.id, 'allocate')"
                      class="bg-green-600 hover:bg-green-700 text-white py-2 px-2 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-sm transition w-full"
                    >
                      Alokasi Kurir
                    </button>
                    <button
                      @click="updateShipping(trx.id, 'cancel')"
                      class="bg-red-50 hover:bg-red-100 text-red-600 py-2 px-2 rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-sm transition w-full border border-red-100"
                    >
                      Batalkan
                    </button>
                  </div>
                </template>

                <div
                  v-if="trx.status === 'refund_requested'"
                  class="flex justify-center gap-2 mt-2"
                >
                  <button
                    @click="handleRefundAction(trx.id, 'approve')"
                    class="bg-green-100 hover:bg-green-200 p-2 rounded-lg text-green-600 transition shadow-sm"
                    title="Approve Refund"
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </button>
                  <button
                    @click="handleRefundAction(trx.id, 'reject')"
                    class="bg-red-100 hover:bg-red-200 p-2 rounded-lg text-red-600 transition shadow-sm"
                    title="Reject Refund"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  @click="goToDetail(trx)"
                  class="text-[10px] font-bold text-gray-500 hover:text-black underline w-full text-center mt-1"
                >
                  View Detail
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="!isLoading && paginatedTransactions.length === 0">
            <td
              colspan="7"
              class="py-20 font-serif text-gray-400 text-center italic"
            >
              {{
                searchQuery
                  ? "No transactions match your search."
                  : "No transactions found."
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredTransactions.length > 0"
      class="flex flex-col md:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-50"
    >
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to
        <span class="font-bold text-black">{{ showingEnd }}</span> of
        <span class="font-bold text-black">{{
          filteredTransactions.length
        }}</span>
        orders
      </p>
      <!-- <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 border rounded-xl hover:bg-gray-50 disabled:opacity-30 transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Previous
        </button>
        <button
          v-for="page in displayedPages"
          :key="page"
          @click="currentPage = page"
          :class="
            currentPage === page
              ? 'bg-black text-white border-black'
              : 'hover:bg-gray-50 border-gray-200'
          "
          class="w-10 h-10 border rounded-xl font-medium transition flex items-center justify-center text-sm"
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
      </div> -->
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
            currentPage === page
              ? 'bg-black text-white border-black'
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
  </div>
</template>

<script setup>
// import { ref, onMounted, computed, watch, onUnmounted } from "vue";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api.js";
// import { useRouter } from "vue-router";
// import html2pdf from "html2pdf.js";
// import * as XLSX from "xlsx";

// const transactions = ref([]);
// const isLoading = ref(false);
// const router = useRouter();

// const searchQuery = ref("");
// const currentPage = ref(1);
// const itemsPerPage = ref(10);

// const countdowns = ref({});
// let timerInterval = null;

// const axiosConfig = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
// };

// // --- STATE FILTER TABS ---
// const activeTransactionTab = ref("all");
// const activeShippingTab = ref("all");

// const transactionTabs = [
//   { label: "All", value: "all" },
//   { label: "Pending / Unpaid", value: "pending" },
//   { label: "Processing", value: "processing" },
//   { label: "Completed", value: "completed" },
//   { label: "Cancelled", value: "cancelled" },
//   { label: "Refund Issues", value: "refund" },
//   { label: "Returned/Failed", value: "failed_returned" },
// ];

// const shippingTabs = [
//   { label: "All", value: "all" },
//   { label: "Placed / Pending", value: "placed" },
//   { label: "Allocated", value: "allocated" },
//   { label: "Picking Up", value: "picking_up" },
//   { label: "In Transit", value: "dropping_off" },
//   { label: "On Hold", value: "on_hold" },
//   { label: "Delivered", value: "delivered" },
//   { label: "Returning", value: "returning" },
//   { label: "Issues / Cancelled", value: "issues" },
//   { label: "No Shipping", value: "no_shipping" },
// ];

// // --- FUNGSI PENGHITUNG BADGE ---
// const getTransactionTabCount = (tabValue) => {
//   return transactions.value.filter((order) => {
//     if (tabValue === "all") return true;
//     if (tabValue === "pending")
//       return ["pending", "awaiting_payment"].includes(order.status);
//     if (tabValue === "refund") return order.status.includes("refund");
//     if (tabValue === "failed_returned")
//       return ["returned", "shipping_failed"].includes(order.status);
//     return order.status === tabValue;
//   }).length;
// };

// // [PERBAIKAN] Menghitung dari order.shipping_status bukan dari API Biteship
// const getShippingTabCount = (tabValue) => {
//   return transactions.value.filter((order) => {
//     if (tabValue === "all") return true;
//     if (tabValue === "no_shipping") return order.shipping_method === "free";
//     if (order.shipping_method === "free") return false;

//     const shipStatus = order.shipping_status
//       ? order.shipping_status.toLowerCase()
//       : "pending";
//     if (tabValue === "placed")
//       return ["pending", "placed"].includes(shipStatus);
//     if (tabValue === "dropping_off")
//       return ["picked", "dropping_off"].includes(shipStatus);
//     if (tabValue === "returning")
//       return ["return_in_transit", "returned"].includes(shipStatus);
//     if (tabValue === "issues")
//       return ["cancelled", "rejected", "disposed"].includes(shipStatus);

//     return shipStatus === tabValue;
//   }).length;
// };

// // [PERBAIKAN] Memfilter dari order.shipping_status
// const filteredTransactions = computed(() => {
//   const query = searchQuery.value.toLowerCase();
//   return transactions.value.filter((order) => {
//     // 1. Search Query Match
//     let matchSearch = true;
//     if (query) {
//       matchSearch =
//         order.order_id.toLowerCase().includes(query) ||
//         order.user.first_name.toLowerCase().includes(query) ||
//         order.user.email.toLowerCase().includes(query) ||
//         (order.tracking_number &&
//           order.tracking_number.toLowerCase().includes(query));
//     }

//     // 2. Transaction Tab Match
//     let matchTransaction = false;
//     if (activeTransactionTab.value === "all") matchTransaction = true;
//     else if (activeTransactionTab.value === "pending")
//       matchTransaction = ["pending", "awaiting_payment"].includes(order.status);
//     else if (activeTransactionTab.value === "refund")
//       matchTransaction = order.status.includes("refund");
//     else if (activeTransactionTab.value === "failed_returned")
//       matchTransaction = ["returned", "shipping_failed"].includes(order.status);
//     else matchTransaction = order.status === activeTransactionTab.value;

//     // 3. Shipping Tab Match
//     let matchShipping = false;
//     if (activeShippingTab.value === "all") matchShipping = true;
//     else if (activeShippingTab.value === "no_shipping")
//       matchShipping = order.shipping_method === "free";
//     else {
//       if (order.shipping_method === "free") {
//         matchShipping = false;
//       } else {
//         const shipStatus = order.shipping_status
//           ? order.shipping_status.toLowerCase()
//           : "pending";
//         if (activeShippingTab.value === "placed")
//           matchShipping = ["pending", "placed"].includes(shipStatus);
//         else if (activeShippingTab.value === "dropping_off")
//           matchShipping = ["picked", "dropping_off"].includes(shipStatus);
//         else if (activeShippingTab.value === "returning")
//           matchShipping = ["return_in_transit", "returned"].includes(
//             shipStatus,
//           );
//         else if (activeShippingTab.value === "issues")
//           matchShipping = ["cancelled", "rejected", "disposed"].includes(
//             shipStatus,
//           );
//         else matchShipping = shipStatus === activeShippingTab.value;
//       }
//     }

//     return matchSearch && matchTransaction && matchShipping;
//   });
// });

// const resetFilters = () => {
//   activeTransactionTab.value = "all";
//   activeShippingTab.value = "all";
//   searchQuery.value = "";
// };

// const totalPages = computed(() =>
//   Math.ceil(filteredTransactions.value.length / itemsPerPage.value),
// );
// const paginatedTransactions = computed(() => {
//   const start = (currentPage.value - 1) * itemsPerPage.value;
//   return filteredTransactions.value.slice(start, start + itemsPerPage.value);
// });
// const showingStart = computed(() =>
//   filteredTransactions.value.length === 0
//     ? 0
//     : (currentPage.value - 1) * itemsPerPage.value + 1,
// );
// const showingEnd = computed(() =>
//   Math.min(
//     currentPage.value * itemsPerPage.value,
//     filteredTransactions.value.length,
//   ),
// );

// // const displayedPages = computed(() => {
// //   const total = totalPages.value;
// //   const current = currentPage.value;
// //   const delta = 2;
// //   let range = [];
// //   for (
// //     let i = Math.max(1, current - delta);
// //     i <= Math.min(total, current + delta);
// //     i++
// //   )
// //     range.push(i);
// //   return range;
// // });

// const visiblePages = computed(() => {
//   const current = currentPage.value;
//   const total = totalPages.value;
//   const maxVisible = 7;

//   if (total <= maxVisible) {
//     return Array.from({ length: total }, (_, i) => i + 1);
//   }

//   if (current <= 4) {
//     return [1, 2, 3, 4, 5, '...', total];
//   }

//   if (current >= total - 3) {
//     return [1, '...', total - 4, total - 3, total - 2, total - 1, total];
//   }

//   return [1, '...', current - 1, current, current + 1, '...', total];
// });

// watch(
//   [searchQuery, itemsPerPage, activeTransactionTab, activeShippingTab],
//   () => {
//     currentPage.value = 1;
//   },
// );

// const goToDetail = (trx) => {
//   router.push({
//     name: "TransactionDetail",
//     params: { id: trx.id },
//     state: { transactionData: JSON.parse(JSON.stringify(trx)) },
//   });
// };

// const getGrandTotal = (trx) =>
//   parseFloat(trx.total_amount) || 0 + parseFloat(trx.shipping_cost) || 0;

// const totalRevenue = computed(() => {
//   return transactions.value
//     .filter((t) => t.status === "completed")
//     .reduce((acc, curr) => acc + getGrandTotal(curr), 0);
// });

// const getPaymentLogo = (methodString) => {
//   if (!methodString) return null;
//   const channel = methodString.split(" ")[1]?.toLowerCase();
//   const map = {
//     bca: "bca.png",
//     bni: "bni.png",
//     bri: "bri.png",
//     mandiri: "mandiri.png",
//     bsi: "bsi.png",
//     permata: "permata.png",
//     ovo: "ovo.png",
//     dana: "dana.png",
//     linkaja: "linkaja.png",
//     shopeepay: "shopeepay.png",
//     alfamart: "alfamart.png",
//     indomaret: "indomaret.png",
//     qris: "qris.png",
//   };
//   return map[channel] ? "/payment_images/" + map[channel] : null;
// };

// const getPaymentStatusText = (status) =>
//   [
//     "completed",
//     "processing",
//     "refund_requested",
//     "refund_approved",
//     "refund_rejected",
//   ].includes(status)
//     ? "PAID"
//     : status === "cancelled"
//       ? "CANCELLED"
//       : status === "refunded"
//         ? "REFUNDED"
//         : "UNPAID";
// const getPaymentStatusColor = (status) =>
//   [
//     "completed",
//     "processing",
//     "refund_requested",
//     "refund_approved",
//     "refund_rejected",
//   ].includes(status)
//     ? "text-green-600"
//     : status === "cancelled"
//       ? "text-red-500"
//       : status === "refunded"
//         ? "text-teal-600"
//         : "text-orange-500";
// const getCourierLogo = (company) => {
//   if (!company) return null;
//   const map = {
//     jne: "jne.png",
//     sicepat: "sicepat.png",
//     jnt: "jnt.png",
//     anteraja: "anteraja.png",
//     gojek: "gojek.png",
//     grab: "grab.png",
//     paxel: "paxel.png",
//     ninja: "ninja.png",
//   };
//   return map[company.toLowerCase()]
//     ? "/courier_images/" + map[company.toLowerCase()]
//     : null;
// };

// const calculateTimeLeft = (createdAt) => {
//   const expiryTime = new Date(createdAt).getTime() + 86400000;
//   const now = new Date().getTime();
//   const diff = expiryTime - now;
//   if (diff <= 0) return "Expired";
//   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   return `${hours}h ${minutes}m`;
// };

// const startTimers = () => {
//   if (timerInterval) clearInterval(timerInterval);
//   const updateTimers = () => {
//     transactions.value.forEach((trx) => {
//       if (["pending"].includes(trx.status)) {
//         const timeRef = trx.payment?.created_at || trx.created_at;
//         countdowns.value[trx.id] = calculateTimeLeft(timeRef);
//       }
//     });
//   };
//   timerInterval = setInterval(updateTimers, 60000);
//   updateTimers();
// };

// const fetchTransactions = async () => {
//   isLoading.value = true;
//   try {
//     const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
//     // [PERBAIKAN] Tidak ada lagi inisiasi biteshipData Loading dan tidak memanggil API Bulk Tracking
//     transactions.value = res.data;
//     startTimers();
//   } catch (error) {
//     Swal.fire("Error", "Failed to fetch transactions", "error");
//   } finally {
//     setTimeout(() => (isLoading.value = false), 500);
//   }
// };

// const exportToPDF = () => {
//   const element = document.getElementById("exportable-table");
//   const noExportElements = element.querySelectorAll(".no-export");
//   noExportElements.forEach((el) => el.classList.add("hidden"));
//   const headers = element.querySelectorAll(".export-header");
//   headers.forEach((h) => {
//     h.classList.remove("hidden");
//     h.classList.add("block");
//   });

//   const opt = {
//     margin: 0.3,
//     filename: `Transaction_Report_${new Date().toISOString().split("T")[0]}.pdf`,
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 2, useCORS: true },
//     jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
//   };

//   html2pdf()
//     .set(opt)
//     .from(element)
//     .save()
//     .then(() => {
//       headers.forEach((h) => {
//         h.classList.add("hidden");
//         h.classList.remove("block");
//       });
//       noExportElements.forEach((el) => el.classList.remove("hidden"));
//     });
// };

// // const exportToExcel = () => {
// //   const excelData = paginatedTransactions.value.map((item, index) => ({
// //     No: index + 1,
// //     "Order ID": item.order_id,
// //     Date: formatDate(item.created_at),
// //     "Customer Name": `${item.user.first_name} ${item.user.last_name}`,
// //     Email: item.user.email,
// //     "Total Items": item.details.length,
// //     "Payment Method": item.payment_method
// //       ? item.payment_method.replace(/_/g, " ").toUpperCase()
// //       : "-",
// //     "Payment Status": getPaymentStatusText(item.status),
// //     "Shipping Method":
// //       item.shipping_method === "free"
// //         ? "In-Store Pickup"
// //         : `${item.courier_company} - ${item.courier_type}`,
// //     // [PERBAIKAN] Menggunakan tracking_number & shipping_status langsung dari database
// //     "Tracking Number": item.tracking_number || "-",
// //     "Subtotal (IDR)": parseFloat(item.total_amount),
// //     "Shipping Cost (IDR)": parseFloat(item.shipping_cost),
// //     "Grand Total (IDR)": getGrandTotal(item),
// //     "Transaction Status": item.status.replace(/_/g, " ").toUpperCase(),
// //     "Shipping Status":
// //       item.shipping_method === "free"
// //         ? "IN-STORE"
// //         : (item.shipping_status || "PENDING").toUpperCase(),
// //   }));

// //   const worksheet = XLSX.utils.json_to_sheet(excelData);
// //   const workbook = XLSX.utils.book_new();
// //   XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
// //   XLSX.writeFile(
// //     workbook,
// //     `Transaction_Data_${new Date().toISOString().split("T")[0]}.xlsx`,
// //   );
// // };

// const exportToExcel = () => {
//   const excelData = paginatedTransactions.value.map((item, index) => ({
//     No: index + 1,
//     "Order ID": item.order_id,
//     Date: formatDate(item.created_at),
//     "Customer Name": `${item.user.first_name} ${item.user.last_name}`,
//     Email: item.user.email,
//     "Total Items": item.details.length,
//     "Payment Method": item.payment_method
//       ? item.payment_method.replace(/_/g, " ").toUpperCase()
//       : "-",
//     "Payment Status": getPaymentStatusText(item.status),
//     "Shipping Method":
//       item.shipping_method === "free"
//         ? "In-Store Pickup"
//         : `${item.courier_company} - ${item.courier_type}`,
//     "Tracking Number": item.tracking_number || "-",
//     "Subtotal (IDR)": parseFloat(item.total_amount),
//     "Shipping Cost (IDR)": parseFloat(item.shipping_cost),
//     "Grand Total (IDR)": getGrandTotal(item),
//     "Points Earned": item.status === "completed" ? item.point || 0 : 0, // [TAMBAHAN]
//     "Transaction Status": item.status.replace(/_/g, " ").toUpperCase(),
//     "Shipping Status":
//       item.shipping_method === "free"
//         ? "IN-STORE"
//         : (item.shipping_status || "PENDING").toUpperCase(),
//   }));
//   const worksheet = XLSX.utils.json_to_sheet(excelData);
//   const workbook = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
//   XLSX.writeFile(
//     workbook,
//     `Transaction_Data_${new Date().toISOString().split("T")[0]}.xlsx`,
//   );
// };

// const statusClass = (status) => {
//   const map = {
//     awaiting_payment: "bg-yellow-100 text-yellow-700",
//     pending: "bg-orange-100 text-orange-700",
//     processing: "bg-blue-100 text-blue-700",
//     completed: "bg-green-100 text-green-700",
//     cancelled: "bg-red-100 text-red-700",
//     refund_requested: "bg-purple-100 text-purple-700",
//     refund_approved: "bg-indigo-100 text-indigo-700",
//     refund_rejected: "bg-gray-200 text-gray-600 line-through",
//     refunded: "bg-teal-100 text-teal-700",
//     refund_manual_required: "bg-pink-100 text-pink-700",
//     returned: "bg-gray-800 text-white",
//     shipping_failed: "bg-red-800 text-white",
//   };
//   return map[status] || "bg-gray-100 text-gray-500";
// };

// const shippingStatusClass = (status) => {
//   if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
//   const str = status.toLowerCase();
//   if (["delivered"].includes(str))
//     return "bg-green-50 border-green-200 text-green-700";
//   if (["cancelled", "rejected", "disposed"].includes(str))
//     return "bg-red-50 border-red-200 text-red-700";
//   if (["on_hold", "return_in_transit", "returned"].includes(str))
//     return "bg-amber-50 border-amber-200 text-amber-700";
//   if (["picking_up", "picked", "dropping_off", "allocated"].includes(str))
//     return "bg-blue-50 border-blue-200 text-blue-700";
//   return "bg-gray-50 border-gray-200 text-gray-600";
// };

// const formatPrice = (v) =>
//   new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
//     v,
//   );
// const formatDate = (date) =>
//   new Date(date).toLocaleDateString("id-ID", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// const formatStatus = (s) => s.replace(/_/g, " ");

// const handleRefundAction = async (id, action) => {
//   const endpoint = action === "approve" ? "refund-approve" : "refund-reject";
//   const confirmText =
//     action === "approve"
//       ? "Approve this refund request?"
//       : "Reject this refund request?";
//   const result = await Swal.fire({
//     title: "Confirm Action",
//     text: confirmText,
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#000",
//     confirmButtonText: "Yes, proceed!",
//   });
//   if (result.isConfirmed) {
//     try {
//       await axios.post(
//         `${BASE_URL}/admin/transactions/${id}/${endpoint}`,
//         {},
//         axiosConfig,
//       );
//       Swal.fire("Success", `Refund ${action}d successfully`, "success");
//       fetchTransactions();
//     } catch (err) {
//       Swal.fire("Error", "Action failed", "error");
//     }
//   }
// };

// onMounted(fetchTransactions);
// onUnmounted(() => {
//   if (timerInterval) clearInterval(timerInterval);
// });

import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useRouter } from "vue-router";
import html2pdf from "html2pdf.js";
import * as XLSX from "xlsx";

const transactions = ref([]);
const isLoading = ref(false);
const router = useRouter();

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const countdowns = ref({});
let timerInterval = null;

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// --- STATE FILTER TABS ---
const activeTransactionTab = ref("all");
const activeShippingTab = ref("all");

const transactionTabs = [
  { label: "All", value: "all" },
  { label: "Pending / Unpaid", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Refund Issues", value: "refund" },
  { label: "Returned/Failed", value: "failed_returned" },
];

const shippingTabs = [
  { label: "All", value: "all" },
  // [PERBAIKAN 1] Nama Tab Shipping Diperbarui
  { label: "Placed / Pending / Confirmed", value: "placed" },
  { label: "Allocated", value: "allocated" },
  { label: "Picking Up", value: "picking_up" },
  { label: "In Transit", value: "dropping_off" },
  { label: "On Hold", value: "on_hold" },
  { label: "Delivered", value: "delivered" },
  { label: "Returning", value: "returning" },
  { label: "Issues / Cancelled", value: "issues" },
  { label: "No Shipping", value: "no_shipping" },
];

// --- FUNGSI PENGHITUNG BADGE ---
const getTransactionTabCount = (tabValue) => {
  return transactions.value.filter((order) => {
    if (tabValue === "all") return true;
    if (tabValue === "pending")
      return ["pending", "awaiting_payment"].includes(order.status);
    if (tabValue === "refund") return order.status.includes("refund");
    if (tabValue === "failed_returned")
      return ["returned", "shipping_failed"].includes(order.status);
    return order.status === tabValue;
  }).length;
};

const getShippingTabCount = (tabValue) => {
  return transactions.value.filter((order) => {
    if (tabValue === "all") return true;
    if (tabValue === "no_shipping") return order.shipping_method === "free";
    if (order.shipping_method === "free") return false;

    const shipStatus = order.shipping_status
      ? order.shipping_status.toLowerCase()
      : "pending";

    // [PERBAIKAN 2] Penyesuaian klasifikasi status shipping
    if (tabValue === "placed")
      return ["pending", "placed", "confirmed"].includes(shipStatus);
    if (tabValue === "dropping_off")
      return ["picked", "dropping_off"].includes(shipStatus);
    if (tabValue === "returning")
      return ["return_in_transit", "returned"].includes(shipStatus);
    if (tabValue === "issues")
      return [
        "cancelled",
        "rejected",
        "disposed",
        "courier_not_found",
      ].includes(shipStatus);

    return shipStatus === tabValue;
  }).length;
};

const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return transactions.value.filter((order) => {
    // 1. Search Query Match
    let matchSearch = true;
    if (query) {
      matchSearch =
        order.order_id.toLowerCase().includes(query) ||
        order.user.first_name.toLowerCase().includes(query) ||
        order.user.email.toLowerCase().includes(query) ||
        (order.tracking_number &&
          order.tracking_number.toLowerCase().includes(query));
    }

    // 2. Transaction Tab Match
    let matchTransaction = false;
    if (activeTransactionTab.value === "all") matchTransaction = true;
    else if (activeTransactionTab.value === "pending")
      matchTransaction = ["pending", "awaiting_payment"].includes(order.status);
    else if (activeTransactionTab.value === "refund")
      matchTransaction = order.status.includes("refund");
    else if (activeTransactionTab.value === "failed_returned")
      matchTransaction = ["returned", "shipping_failed"].includes(order.status);
    else matchTransaction = order.status === activeTransactionTab.value;

    // 3. Shipping Tab Match
    let matchShipping = false;
    if (activeShippingTab.value === "all") matchShipping = true;
    else if (activeShippingTab.value === "no_shipping")
      matchShipping = order.shipping_method === "free";
    else {
      if (order.shipping_method === "free") {
        matchShipping = false;
      } else {
        const shipStatus = order.shipping_status
          ? order.shipping_status.toLowerCase()
          : "pending";

        // [PERBAIKAN 3] Penyesuaian klasifikasi filter
        if (activeShippingTab.value === "placed")
          matchShipping = ["pending", "placed", "confirmed"].includes(
            shipStatus,
          );
        else if (activeShippingTab.value === "dropping_off")
          matchShipping = ["picked", "dropping_off"].includes(shipStatus);
        else if (activeShippingTab.value === "returning")
          matchShipping = ["return_in_transit", "returned"].includes(
            shipStatus,
          );
        else if (activeShippingTab.value === "issues")
          matchShipping = [
            "cancelled",
            "rejected",
            "disposed",
            "courier_not_found",
          ].includes(shipStatus);
        else matchShipping = shipStatus === activeShippingTab.value;
      }
    }

    return matchSearch && matchTransaction && matchShipping;
  });
});

const resetFilters = () => {
  activeTransactionTab.value = "all";
  activeShippingTab.value = "all";
  searchQuery.value = "";
};

const totalPages = computed(() =>
  Math.ceil(filteredTransactions.value.length / itemsPerPage.value),
);

const paginatedTransactions = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredTransactions.value.slice(start, start + itemsPerPage.value);
});

const showingStart = computed(() =>
  filteredTransactions.value.length === 0
    ? 0
    : (currentPage.value - 1) * itemsPerPage.value + 1,
);
const showingEnd = computed(() =>
  Math.min(
    currentPage.value * itemsPerPage.value,
    filteredTransactions.value.length,
  ),
);

// Pagination Visual (Max 7 box)
const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  const maxVisible = 7;

  if (total <= maxVisible)
    return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
});

watch(
  [searchQuery, itemsPerPage, activeTransactionTab, activeShippingTab],
  () => {
    currentPage.value = 1;
  },
);

const goToDetail = (trx) => {
  router.push({
    name: "TransactionDetail",
    params: { id: trx.id },
    state: { transactionData: JSON.parse(JSON.stringify(trx)) },
  });
};

const getGrandTotal = (trx) =>
  parseFloat(trx.total_amount) || 0 + parseFloat(trx.shipping_cost) || 0;

const totalRevenue = computed(() => {
  return transactions.value
    .filter((t) => t.status === "completed")
    .reduce((acc, curr) => acc + getGrandTotal(curr), 0);
});

const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(" ")[1]?.toLowerCase();
  const map = {
    bca: "bca.png",
    bni: "bni.png",
    bri: "bri.png",
    mandiri: "mandiri.png",
    bsi: "bsi.png",
    permata: "permata.png",
    ovo: "ovo.png",
    dana: "dana.png",
    linkaja: "linkaja.png",
    shopeepay: "shopeepay.png",
    alfamart: "alfamart.png",
    indomaret: "indomaret.png",
    qris: "qris.png",
  };
  return map[channel] ? "/payment_images/" + map[channel] : null;
};

const getPaymentStatusText = (status) =>
  [
    "completed",
    "processing",
    "refund_requested",
    "refund_approved",
    "refund_rejected",
  ].includes(status)
    ? "PAID"
    : status === "cancelled"
      ? "CANCELLED"
      : status === "refunded"
        ? "REFUNDED"
        : "UNPAID";

const getPaymentStatusColor = (status) =>
  [
    "completed",
    "processing",
    "refund_requested",
    "refund_approved",
    "refund_rejected",
  ].includes(status)
    ? "text-green-600"
    : status === "cancelled"
      ? "text-red-500"
      : status === "refunded"
        ? "text-teal-600"
        : "text-orange-500";

const getCourierLogo = (company) => {
  if (!company) return null;
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
  };
  return map[company.toLowerCase()]
    ? "/courier_images/" + map[company.toLowerCase()]
    : null;
};

// [PERBAIKAN 4] Logika Penghitungan Mundur 24 Jam dengan format HH:MM:SS
const calculateTimeLeft = (referenceDate) => {
  if (!referenceDate) return "Expired";
  const expiryTime = new Date(referenceDate).getTime() + 86400000; // +24 Jam
  const now = new Date().getTime();
  const diff = expiryTime - now;

  if (diff <= 0) return "Expired";

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

// [BARU] Fungsi auto cancel (Admin side fallback)
const autoCancelSilent = async (id) => {
  try {
    await axios.post(
      `${BASE_URL}/admin/transactions/${id}/cancel`,
      {},
      axiosConfig,
    ); // Pastikan rute admin cancel ada jika diperlukan, atau andalkan backend
    fetchTransactions();
  } catch (e) {
    console.error("Auto cancel failed", e);
  }
};

const startTimers = () => {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    transactions.value.forEach((trx) => {
      if (["awaiting_payment", "pending"].includes(trx.status)) {
        // [PERBAIKAN 5] Penentuan Waktu Acuan sesuai Status
        const timeReference =
          trx.status === "pending" && trx.payment?.created_at
            ? trx.payment.created_at
            : trx.created_at;

        const timeLeft = calculateTimeLeft(timeReference);
        countdowns.value[trx.id] = timeLeft;

        if (timeLeft === "Expired" && !trx.isCancelling) {
          trx.isCancelling = true;
          // Anda dapat memanggil autoCancelSilent di sini jika ingin Admin Panel juga mentrigger pembatalan
          // Namun idealnya ini sudah ditangani otomatis oleh Backend (Controller) saat fetch
        }
      }
    });
  }, 1000);
};

const fetchTransactions = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    transactions.value = res.data.map((o) => ({ ...o, isCancelling: false }));
    startTimers();
  } catch (error) {
    Swal.fire("Error", "Failed to fetch transactions", "error");
  } finally {
    setTimeout(() => (isLoading.value = false), 500);
  }
};

// ... (exportToPDF dan exportToExcel tetap sama) ...
const exportToPDF = () => {
  const element = document.getElementById("exportable-table");
  const noExportElements = element.querySelectorAll(".no-export");
  noExportElements.forEach((el) => el.classList.add("hidden"));
  const headers = element.querySelectorAll(".export-header");
  headers.forEach((h) => {
    h.classList.remove("hidden");
    h.classList.add("block");
  });

  const opt = {
    margin: 0.3,
    filename: `Transaction_Report_${new Date().toISOString().split("T")[0]}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: "in", format: "letter", orientation: "landscape" },
  };

  html2pdf()
    .set(opt)
    .from(element)
    .save()
    .then(() => {
      headers.forEach((h) => {
        h.classList.add("hidden");
        h.classList.remove("block");
      });
      noExportElements.forEach((el) => el.classList.remove("hidden"));
    });
};

const exportToExcel = () => {
  const excelData = paginatedTransactions.value.map((item, index) => ({
    No: index + 1,
    "Order ID": item.order_id,
    Date: formatDate(item.created_at),
    "Customer Name": `${item.user.first_name} ${item.user.last_name}`,
    Email: item.user.email,
    "Total Items": item.details.length,
    "Payment Method": item.payment_method
      ? item.payment_method.replace(/_/g, " ").toUpperCase()
      : "-",
    "Payment Status": getPaymentStatusText(item.status),
    "Shipping Method":
      item.shipping_method === "free"
        ? "In-Store Pickup"
        : `${item.courier_company} - ${item.courier_type}`,
    "Tracking Number": item.tracking_number || "-",
    "Subtotal (IDR)": parseFloat(item.total_amount),
    "Shipping Cost (IDR)": parseFloat(item.shipping_cost),
    "Grand Total (IDR)": getGrandTotal(item),
    "Points Earned": item.status === "completed" ? item.point || 0 : 0,
    "Transaction Status": item.status.replace(/_/g, " ").toUpperCase(),
    "Shipping Status":
      item.shipping_method === "free"
        ? "IN-STORE"
        : (item.shipping_status || "PENDING").toUpperCase(),
  }));
  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");
  XLSX.writeFile(
    workbook,
    `Transaction_Data_${new Date().toISOString().split("T")[0]}.xlsx`,
  );
};

const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700",
    pending: "bg-orange-100 text-orange-700",
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700",
    refund_rejected: "bg-gray-200 text-gray-600 line-through",
    refunded: "bg-teal-100 text-teal-700",
    refund_manual_required: "bg-pink-100 text-pink-700",
    returned: "bg-gray-800 text-white",
    shipping_failed: "bg-red-800 text-white",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

const shippingStatusClass = (status) => {
  if (!status) return "bg-gray-50 border-gray-200 text-gray-500";
  const str = status.toLowerCase();
  if (["delivered"].includes(str))
    return "bg-green-50 border-green-200 text-green-700";

  // [PERBAIKAN 6] Penyesuaian warna class
  if (["cancelled", "rejected", "disposed", "courier_not_found"].includes(str))
    return "bg-red-50 border-red-200 text-red-700";
  if (["on_hold", "return_in_transit", "returned"].includes(str))
    return "bg-amber-50 border-amber-200 text-amber-700";
  if (
    ["picking_up", "picked", "dropping_off", "allocated", "confirmed"].includes(
      str,
    )
  )
    return "bg-blue-50 border-blue-200 text-blue-700";

  return "bg-gray-50 border-gray-200 text-gray-600";
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (date) =>
  new Date(date).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
const formatStatus = (s) => s.replace(/_/g, " ");

const handleRefundAction = async (id, action) => {
  const endpoint = action === "approve" ? "refund-approve" : "refund-reject";
  const confirmText =
    action === "approve"
      ? "Approve this refund request?"
      : "Reject this refund request?";
  const result = await Swal.fire({
    title: "Confirm Action",
    text: confirmText,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, proceed!",
  });
  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/admin/transactions/${id}/${endpoint}`,
        {},
        axiosConfig,
      );
      Swal.fire("Success", `Refund ${action}d successfully`, "success");
      fetchTransactions();
    } catch (err) {
      Swal.fire("Error", "Action failed", "error");
    }
  }
};

// --- [BARU] FUNGSI AKSI ADMIN ---
const updateShipping = async (id, action) => {
  let title = "";
  let text = "";
  let confirmBtn = "";
  let color = "#000";

  if (action === "confirm") {
    title = "Konfirmasi Pesanan?";
    text =
      "Pesanan akan diverifikasi. Anda dapat mengalokasikan kurir setelahnya.";
    confirmBtn = "Ya, Konfirmasi";
  } else if (action === "allocate") {
    title = "Panggil Kurir Sekarang?";
    text = "Biteship akan menugaskan kurir untuk mengambil paket ke toko Anda.";
    confirmBtn = "Ya, Alokasikan";
    color = "#16a34a"; // Hijau
  } else if (action === "cancel") {
    title = "Batalkan Pesanan?";
    text = "Pesanan akan dibatalkan secara sistem dan uang dikembalikan.";
    confirmBtn = "Ya, Batalkan";
    color = "#d33"; // Merah
  }

  const result = await Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: color,
    confirmButtonText: confirmBtn,
  });

  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/admin/transactions/${id}/shipping-action`,
        { action },
        axiosConfig,
      );
      Swal.fire("Berhasil", "Status pesanan berhasil diperbarui.", "success");
      fetchTransactions(); // Segarkan tabel
    } catch (err) {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Gagal memperbarui status.",
        "error",
      );
    }
  }
};

onMounted(fetchTransactions);
onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script>

<style scoped>
@media print {
  .export-header {
    display: block !important;
  }
  .no-export {
    display: none !important;
  }
}
</style>
