<template>
  <div class="mx-auto px-6 py-12 max-w-7xl min-h-screen animate-fade-in">
    <div
      class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8"
    >
      <div>
        <h1 class="font-bold text-gray-800 text-2xl">
          Shipping & Logistics (Simulator)
        </h1>
        <p class="text-gray-500 text-sm">
          Monitor and manually simulate courier statuses for testing purposes.
        </p>
      </div>
      <div class="relative w-full md:w-80">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Order ID, Resi, or Courier..."
          class="bg-white pl-4 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none w-full text-sm shadow-sm"
        />
      </div>
    </div>

    <div
      v-if="isLoading"
      class="py-20 flex flex-col items-center justify-center animate-pulse"
    >
      <div
        class="border-4 border-gray-100 border-t-black rounded-full w-10 h-10 animate-spin mb-4"
      ></div>
      <p class="font-bold text-gray-400 text-xs uppercase tracking-widest">
        Loading Logistics Data...
      </p>
    </div>

    <div
      v-else
      class="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="bg-gray-50 border-b border-gray-100 text-gray-500 text-[10px] uppercase tracking-widest"
            >
              <th class="p-4 whitespace-nowrap">Order Info</th>
              <th class="p-4 whitespace-nowrap">Destination</th>
              <th class="p-4 whitespace-nowrap">Package Details</th>
              <th class="p-4 whitespace-nowrap">Courier Info</th>
              <th class="p-4 whitespace-nowrap bg-blue-50/50">
                Simulation Panel
              </th>
            </tr>
          </thead>
          <tbody class="text-gray-700 text-sm divide-y divide-gray-50">
            <tr
              v-for="trx in filteredTransactions"
              :key="trx.id"
              class="hover:bg-gray-50/50 align-top transition-colors"
            >
              <td class="p-4">
                <p class="font-mono font-bold text-black">{{ trx.order_id }}</p>
                <p class="text-[10px] text-gray-400 mt-1">
                  {{ formatDate(trx.created_at) }}
                </p>
                <div class="mt-3">
                  <p class="font-bold text-xs">
                    {{ trx.user.first_name }} {{ trx.user.last_name }}
                  </p>
                  <p
                    class="text-[10px] text-gray-500 truncate w-32"
                    :title="trx.user.email"
                  >
                    {{ trx.user.email }}
                  </p>
                </div>
              </td>

              <td class="p-4">
                <div v-if="trx.address">
                  <p class="font-bold text-xs">
                    {{ trx.address.first_name_address }}
                    {{ trx.address.last_name_address }}
                  </p>
                  <p class="text-xs text-gray-600 mt-1 flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-3 h-3 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    {{ trx.user.phone || "No Phone" }}
                  </p>
                  <p
                    class="text-[10px] text-gray-500 mt-2 bg-gray-100 px-2 py-1 rounded inline-block font-mono"
                  >
                    POSTAL: {{ trx.address.postal_code }}
                  </p>
                </div>
                <div v-else class="text-xs text-gray-400 italic">
                  Address data missing
                </div>
              </td>

              <td class="p-4">
                <div class="space-y-2 text-xs">
                  <div
                    class="flex justify-between items-center border-b border-gray-100 pb-1"
                  >
                    <span class="text-gray-500">Weight:</span>
                    <span class="font-bold"
                      >{{ calculateWeight(trx) }} gram</span
                    >
                  </div>
                  <div
                    class="flex justify-between items-center border-b border-gray-100 pb-1"
                  >
                    <span class="text-gray-500">Shipping Cost:</span>
                    <span class="font-bold text-green-600">{{
                      formatPrice(trx.shipping_cost)
                    }}</span>
                  </div>
                  <div class="flex justify-between items-center pt-1">
                    <span class="text-gray-500 text-[10px] uppercase"
                      >Main Status:</span
                    >
                    <span
                      :class="statusClass(trx.status)"
                      class="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full"
                      >{{ trx.status.replace("_", " ") }}</span
                    >
                  </div>
                </div>
              </td>

              <td class="p-4">
                <div
                  v-if="trx.shipping_method === 'biteship'"
                  class="space-y-2"
                >
                  <p class="font-bold text-xs uppercase">
                    {{ trx.courier_company }} -
                    <span class="font-normal">{{ trx.courier_type }}</span>
                  </p>
                  <div
                    class="bg-gray-100 p-2 rounded-lg text-[10px] font-mono break-all"
                  >
                    <span class="text-gray-400 block mb-0.5">Biteship ID:</span>
                    {{ trx.biteship_order_id || "Not Generated" }}
                  </div>
                </div>
                <div
                  v-else
                  class="text-xs font-bold text-gray-500 uppercase flex items-center gap-2"
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
                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                    />
                  </svg>
                  Internal Delivery
                </div>
              </td>

              <td class="p-4 bg-blue-50/20 border-l border-blue-50">
                <div
                  v-if="trx.shipping_method === 'biteship'"
                  class="space-y-3"
                >
                  <div>
                    <label
                      class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
                      >Tracking Number (Resi)</label
                    >
                    <input
                      type="text"
                      v-model="trx.tracking_number"
                      placeholder="Input resi..."
                      class="w-full text-xs px-3 py-1.5 border border-gray-300 rounded outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label
                      class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
                      >Shipping Status</label
                    >
                    <select
                      v-model="trx.shipping_status"
                      class="w-full text-xs px-3 py-1.5 border border-gray-300 rounded outline-none focus:border-blue-500 bg-white cursor-pointer"
                    >
                      <option value="pending">Pending</option>
                      <option value="allocated">
                        Allocated (Kurir Ditemukan)
                      </option>
                      <option value="picking_up">
                        Picking Up (Kurir Menuju Toko)
                      </option>
                      <option value="picked">Picked (Barang Diambil)</option>
                      <option value="dropping_off">
                        Dropping Off (Kurir Menuju Tujuan)
                      </option>
                      <option value="delivered">Delivered (Terkirim)</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <button
                    @click="saveSimulation(trx)"
                    :disabled="isSaving === trx.id"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold uppercase tracking-widest py-2 rounded transition disabled:opacity-50"
                  >
                    {{ isSaving === trx.id ? "Saving..." : "Update" }}
                  </button>
                </div>

                <div
                  v-else
                  class="text-[10px] text-gray-400 italic text-center py-4"
                >
                  Manual simulation not required for internal delivery.
                </div>
              </td>
            </tr>

            <tr v-if="!isLoading && filteredTransactions.length === 0">
              <td
                colspan="5"
                class="py-20 font-serif text-gray-400 text-center italic"
              >
                No orders match your search criteria.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const transactions = ref([]);
const isLoading = ref(true);
const isSaving = ref(null);
const searchQuery = ref("");

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchLogistics = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/transactions`, axiosConfig);
    // Kita filter hanya menampilkan pesanan yang sudah dibayar (bukan awaiting_payment)
    // agar panel simulasi logistik bersih dari keranjang yang belum selesai.
    const validTransactions = res.data.filter(
      (t) => t.status !== "awaiting_payment" && t.status !== "pending",
    );

    // Inisialisasi shipping_status jika di database masih null (karena kolom baru)
    transactions.value = validTransactions.map((t) => ({
      ...t,
      shipping_status: t.shipping_status || "pending",
    }));
  } catch (error) {
    console.error("Fetch error:", error);
    Swal.fire("Error", "Failed to load logistics data", "error");
  } finally {
    isLoading.value = false;
  }
};

const filteredTransactions = computed(() => {
  const query = searchQuery.value.toLowerCase();
  if (!query) return transactions.value;

  return transactions.value.filter(
    (t) =>
      t.order_id.toLowerCase().includes(query) ||
      (t.tracking_number && t.tracking_number.toLowerCase().includes(query)) ||
      (t.courier_company && t.courier_company.toLowerCase().includes(query)),
  );
});

// Asumsi 1 barang = 1000 gram
const calculateWeight = (trx) => {
  if (!trx.details) return 0;
  const totalQty = trx.details.reduce(
    (sum, item) => sum + parseInt(item.quantity),
    0,
  );
  return totalQty * 1000;
};

// Eksekusi Update ke Backend
// const saveSimulation = async (trx) => {
//   isSaving.value = trx.id;
//   try {
//     await axios.put(`${BASE_URL}/admin/transactions/${trx.id}/shipping`, {
//       tracking_number: trx.tracking_number,
//       shipping_status: trx.shipping_status
//     }, axiosConfig);

//     Swal.fire({
//       toast: true,
//       position: 'top-end',
//       icon: 'success',
//       title: 'Simulation Updated',
//       text: `${trx.order_id} set to ${trx.shipping_status.toUpperCase()}`,
//       showConfirmButton: false,
//       timer: 3000
//     });
//   } catch (error) {
//     console.error(error);
//     Swal.fire("Error", "Failed to update simulation data", "error");
//   } finally {
//     isSaving.value = null;
//   }
// };

// Eksekusi Update ke Backend
const saveSimulation = async (trx) => {
  isSaving.value = trx.id;
  try {
    const response = await axios.put(
      `${BASE_URL}/admin/transactions/${trx.id}/shipping`,
      {
        tracking_number: trx.tracking_number,
        shipping_status: trx.shipping_status,
      },
      axiosConfig,
    );

    // Pastikan API benar-benar merespon status 200 OK sebelum menampilkan success
    if (response.status === 200) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Simulation Updated",
        text: `${trx.order_id} set to ${trx.shipping_status.toUpperCase()}`,
        showConfirmButton: false,
        timer: 3000,
      });

      // (Opsional) Fetch ulang data untuk memastikan sinkronisasi jika diperlukan
      // fetchLogistics();
    }
  } catch (error) {
    console.error("Simulation API Error:", error.response || error);

    // Tampilkan pesan error yang lebih spesifik jika ada dari Laravel
    const errorMsg =
      error.response?.data?.message || "Failed to update simulation data";
    Swal.fire("Error", errorMsg, "error");

    // Jika gagal, kembalikan pilihan dropdown ke 'pending' (Rollback UI)
    trx.shipping_status = "pending";
  } finally {
    isSaving.value = null;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const statusClass = (status) => {
  if (!status) return "bg-gray-100 text-gray-500";
  const map = {
    processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
    refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700",
    refunded: "bg-teal-100 text-teal-700",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

onMounted(fetchLogistics);
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
