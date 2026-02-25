<!-- <template>
  <div class="mx-auto px-6 py-12 max-w-5xl min-h-screen">
    <div class="flex justify-between items-center mb-10">
      <button @click="$router.back()" class="group flex items-center gap-2 text-gray-500 hover:text-black transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span class="font-bold text-sm uppercase tracking-widest">Back to List</span>
      </button>
      
      <div class="text-right">
        <span :class="statusClass(transaction?.status)" class="shadow-sm px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest">
          {{ transaction?.status }}
        </span>
      </div>
    </div>

    <div v-if="isLoading" class="py-20 font-serif text-gray-400 text-center italic animate-pulse">
      Synchronizing transaction details...
    </div>

    <div v-else-if="transaction" class="gap-8 grid grid-cols-1 lg:grid-cols-3 animate-fade-in">
      <div class="space-y-6 lg:col-span-2">
        <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]">
          <h2 class="mb-6 font-bold text-gray-800 text-xl tracking-tight">Order Items</h2>
          <div class="divide-y divide-gray-50">
            <div v-for="item in transaction.details" :key="item.id" class="flex gap-6 py-6 first:pt-0 last:pb-0">
              <img :src="item.product.image" class="bg-gray-50 shadow-sm rounded-2xl w-24 h-24 object-cover" />
              <div class="flex flex-col flex-grow justify-center">
                <h3 class="font-bold text-gray-900 text-sm uppercase tracking-wide">{{ item.product.name }}</h3>
                <p class="mt-1 text-gray-400 text-xs">Code: {{ item.product.code }}</p>
                <div class="flex justify-between items-end mt-4">
                  <p class="text-gray-600 text-sm">{{ item.quantity }} x {{ formatPrice(item.price) }}</p>
                  <p class="font-bold text-black">{{ formatPrice(item.quantity * item.price) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="bg-black shadow-xl p-8 rounded-[2rem] text-white">
          <h2 class="opacity-50 mb-4 font-black text-[10px] uppercase tracking-[0.3em]">Customer Details</h2>
          <p class="font-bold text-lg leading-none">{{ transaction.user.first_name }} {{ transaction.user.last_name }}</p>
          <p class="mt-2 text-gray-400 text-sm">{{ transaction.user.email }}</p>
          <div class="flex items-center gap-3 mt-6 pt-6 border-white/10 border-t">
             <div class="bg-white/10 p-2 rounded-lg font-mono text-[10px] uppercase tracking-tighter">ID: {{ transaction.order_id }}</div>
          </div>
        </div>

        <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]">
          <h2 class="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em]">Payment Summary</h2>
          <div class="space-y-4">
            <div class="flex justify-between text-gray-500 text-sm">
              <span>Subtotal Items</span>
              <span>{{ formatPrice(transaction.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-gray-500 text-sm">
              <span>Shipping Fee</span>
              <span class="italic">Calculated at checkout</span>
            </div>
            <div class="flex justify-between items-end pt-4 border-gray-100 border-t">
              <span class="font-bold text-gray-900 text-xs uppercase">Total Amount</span>
              <span class="font-bold text-blue-600 text-2xl">{{ formatPrice(transaction.total_amount) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const transaction = ref(null);
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// const fetchData = async () => {
//   // 1. Cek state dari navigasi (Instan!)
//   const stateData = window.history.state?.transactionData;
//   if (stateData) {
//     transaction.value = stateData;
//     isLoading.value = false;
//   }

//   // 2. Tetap fetch API di background atau jika refresh (Data Integrity)
//   try {
//     const res = await axios.get(`${BASE_URL}/admin/transactions/${route.params.id}`, axiosConfig);
//     transaction.value = res.data;
//   } catch (error) {
//     console.error("Detail fetch error:", error);
//   } finally {
//     isLoading.value = false;
//   }
// };

const fetchData = async () => {
  // 1. Ambil data dari state navigasi
  const stateData = window.history.state?.transactionData;
  
  if (stateData) {
    transaction.value = stateData;
    isLoading.value = false;
    
    // Skenario Senior: Tetap fetch di background untuk memastikan data terbaru 
    // tanpa menampilkan loading spinner (Silent Refresh)
    try {
      const res = await axios.get(`${BASE_URL}/admin/transactions/${route.params.id}`, axiosConfig);
      transaction.value = res.data;
    } catch (error) {
      console.error("Background sync failed", error);
    }
  } else {
    // 2. Jika tidak ada state (user akses langsung via URL/Refresh), baru tampilkan loading
    isLoading.value = true;
    try {
      const res = await axios.get(`${BASE_URL}/admin/transactions/${route.params.id}`, axiosConfig);
      transaction.value = res.data;
    } catch (error) {
      console.error("Detail fetch error:", error);
    } finally {
      isLoading.value = false;
    }
  }
};

const statusClass = (status) => {
  const map = {
    pending: 'bg-amber-50 text-amber-600 border border-amber-200',
    processing: 'bg-blue-50 text-blue-600 border border-blue-200',
    completed: 'bg-green-50 text-green-600 border border-green-200',
    cancelled: 'bg-red-50 text-red-600 border border-red-200'
  };
  return map[status] || 'bg-gray-100 text-gray-500';
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> -->

<!-- Update tampilan -->
<!-- <template>
  <div class="mx-auto px-6 py-12 max-w-6xl min-h-screen">
    <div
      class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10"
    >
      <button
        @click="$router.back()"
        class="group flex items-center gap-2 text-gray-500 hover:text-black transition-colors w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span class="font-bold text-sm uppercase tracking-widest"
          >Back to List</span
        >
      </button>

      <div class="flex items-center gap-4">
        <div class="text-right">
          <p
            class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
          >
            Order Date
          </p>
          <p class="text-sm font-bold text-gray-900">
            {{ formatDate(transaction?.created_at) }}
          </p>
        </div>
        <div class="h-8 w-px bg-gray-200"></div>
        <span
          :class="statusClass(transaction?.status)"
          class="shadow-sm px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest"
        >
          {{ formatStatus(transaction?.status) }}
        </span>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="py-20 flex flex-col items-center justify-center animate-pulse"
    >
      <div
        class="border-4 border-gray-100 border-t-black rounded-full w-12 h-12 animate-spin mb-4"
      ></div>
      <p class="font-serif text-gray-400 text-center italic">
        Loading transaction details...
      </p>
    </div>

    <div
      v-else-if="transaction"
      class="gap-8 grid grid-cols-1 lg:grid-cols-3 animate-fade-in"
    >
      <div class="space-y-6 lg:col-span-2">
        <div
          class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]"
        >
          <div
            class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4"
          >
            <h2 class="font-bold text-gray-800 text-xl tracking-tight">
              Order Items
            </h2>
            <span
              class="text-xs font-bold bg-gray-100 px-3 py-1 rounded-full text-gray-600"
            >
              {{ transaction.details.length }} Items
            </span>
          </div>

          <div class="divide-y divide-gray-50">
            <div
              v-for="item in transaction.details"
              :key="item.id"
              class="flex gap-6 py-6 first:pt-0 last:pb-0"
            >
              <img
                :src="item.product.image"
                class="bg-gray-50 shadow-sm border border-gray-100 rounded-2xl w-24 h-24 object-cover shrink-0"
              />
              <div class="flex flex-col flex-grow justify-center">
                <h3
                  class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                >
                  {{ item.product.name }}
                </h3>
                <p class="mt-1 text-gray-400 text-xs font-mono">
                  SKU: {{ item.product.code }}
                </p>
                <div class="flex justify-between items-end mt-4">
                  <p
                    class="text-gray-600 text-sm bg-gray-50 px-3 py-1 rounded-lg"
                  >
                    {{ item.quantity }} <span class="text-[10px] mx-1">x</span>
                    {{ formatPrice(item.price) }}
                  </p>
                  <p class="font-bold text-black">
                    {{ formatPrice(item.quantity * item.price) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col"
          >
            <h2
              class="font-bold text-gray-800 text-sm tracking-widest uppercase mb-6 border-b border-gray-100 pb-4"
            >
              Logistics
            </h2>

            <div
              v-if="transaction.shipping_method !== 'free'"
              class="flex-grow flex flex-col justify-between"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-16 h-12 bg-white border border-gray-200 rounded-xl flex justify-center items-center p-1 shrink-0"
                >
                  <img
                    v-if="getCourierLogo(transaction.courier_company)"
                    :src="getCourierLogo(transaction.courier_company)"
                    class="w-full h-full object-contain"
                  />
                  <span v-else class="text-[10px] font-black text-gray-400">{{
                    transaction.courier_company?.toUpperCase()
                  }}</span>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ transaction.courier_company }}
                  </p>
                  <p class="text-xs text-gray-500 uppercase">
                    {{ transaction.courier_type }}
                  </p>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-xl space-y-2 mt-auto">
                <p
                  class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >
                  Tracking Number (Resi)
                </p>
                <div class="flex items-center justify-between">
                  <p class="font-mono font-bold text-black text-sm">
                    {{ transaction.tracking_number || "Pending Allocation" }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-else
              class="flex-grow flex flex-col justify-center items-center text-center bg-gray-50 rounded-xl p-6"
            >
              <div
                class="w-12 h-12 bg-black text-white rounded-full flex justify-center items-center mb-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
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
              </div>
              <p class="font-bold text-gray-900 text-sm uppercase">
                Internal Courier
              </p>
              <p class="text-xs text-green-600 font-bold mt-1">Free Shipping</p>
            </div>
          </div>

          <div
            class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col"
          >
            <h2
              class="font-bold text-gray-800 text-sm tracking-widest uppercase mb-6 border-b border-gray-100 pb-4"
            >
              Payment Method
            </h2>

            <div
              v-if="transaction.payment_method"
              class="flex-grow flex flex-col justify-center"
            >
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-16 h-12 bg-gray-50 border border-gray-100 rounded-xl flex justify-center items-center p-1 shrink-0"
                >
                  <img
                    v-if="getPaymentLogo(transaction.payment_method)"
                    :src="getPaymentLogo(transaction.payment_method)"
                    class="w-full h-full object-contain"
                  />
                  <span v-else class="text-[10px] font-black text-gray-400"
                    >PAY</span
                  >
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ transaction.payment_method.replace("_", " ") }}
                  </p>
                  <p
                    :class="getPaymentStatusColor(transaction.status)"
                    class="text-[10px] font-bold uppercase tracking-wider mt-1"
                  >
                    Status: {{ getPaymentStatusText(transaction.status) }}
                  </p>
                </div>
              </div>

              <div
                v-if="transaction.payment"
                class="bg-blue-50/50 border border-blue-100 p-4 rounded-xl mt-auto"
              >
                <p
                  class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1"
                >
                  Xendit Ref ID
                </p>
                <p class="font-mono text-blue-900 text-xs truncate">
                  {{ transaction.payment.external_id }}
                </p>
              </div>
            </div>

            <div v-else class="flex-grow flex justify-center items-center">
              <p class="text-sm text-gray-400 italic">Method not selected</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div
          class="bg-black shadow-xl p-8 rounded-[2rem] text-white relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"
          ></div>

          <h2
            class="opacity-50 mb-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Customer Details
          </h2>

          <p class="font-bold text-xl leading-none uppercase">
            {{ transaction.user.first_name }} {{ transaction.user.last_name }}
          </p>

          <div class="mt-4 space-y-2 opacity-80">
            <p class="text-sm flex items-center gap-2">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {{ transaction.user.email }}
            </p>
            <p class="text-sm flex items-center gap-2">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {{ transaction.user.phone || "No phone" }}
            </p>
          </div>

          <div class="mt-6 pt-6 border-white/10 border-t space-y-4">
            <div>
              <p
                class="text-[10px] text-gray-400 uppercase tracking-widest mb-1"
              >
                Order ID
              </p>
              <div class="bg-white/10 px-3 py-2 rounded-lg font-mono text-xs">
                {{ transaction.order_id }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]"
        >
          <h2
            class="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4"
          >
            Financial Summary
          </h2>

          <div class="space-y-4">
            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Subtotal ({{ transaction.details.length }} items)</span>
              <span class="font-medium text-gray-900">{{
                formatPrice(transaction.total_amount)
              }}</span>
            </div>

            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Shipping Fee</span>
              <span
                v-if="transaction.shipping_method === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >
              <span v-else class="font-medium text-gray-900">{{
                formatPrice(transaction.shipping_cost)
              }}</span>
            </div>

            <div
              class="flex justify-between items-end pt-4 border-gray-100 border-t border-dashed"
            >
              <div>
                <span
                  class="block font-bold text-gray-900 text-xs uppercase tracking-widest"
                  >Grand Total</span
                >
                <span class="text-[10px] text-gray-400 italic"
                  >Paid by customer</span
                >
              </div>
              <span class="font-bold text-black text-2xl">{{
                formatPrice(getGrandTotal(transaction))
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const transaction = ref(null);
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchData = async () => {
  const stateData = window.history.state?.transactionData;

  if (stateData) {
    transaction.value = stateData;
    isLoading.value = false;
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/transactions/${route.params.id}`,
        axiosConfig,
      );
      transaction.value = res.data;
    } catch (error) {
      console.error("Background sync failed", error);
    }
  } else {
    isLoading.value = true;
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/transactions/${route.params.id}`,
        axiosConfig,
      );
      transaction.value = res.data;
    } catch (error) {
      console.error("Detail fetch error:", error);
    } finally {
      isLoading.value = false;
    }
  }
};

// --- Helper Functions ---
const getGrandTotal = (trx) => {
  const subtotal = parseFloat(trx.total_amount) || 0;
  const shipping = parseFloat(trx.shipping_cost) || 0;
  return subtotal + shipping;
};

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

const statusClass = (status) => {
  if (!status) return "bg-gray-100 text-gray-500";
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

const formatStatus = (s) => {
  if (!s) return "";
  return s.replace(/_/g, " ");
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
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
</style> -->

<!-- Sebelum Visualisasi Timeline -->
<!-- <template>
  <div class="mx-auto px-6 py-12 max-w-6xl min-h-screen">
    <div
      class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10"
    >
      <button
        @click="$router.back()"
        class="group flex items-center gap-2 text-gray-500 hover:text-black transition-colors w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span class="font-bold text-sm uppercase tracking-widest"
          >Back to List</span
        >
      </button>

      <div class="flex items-center gap-4">
        <div class="text-right">
          <p
            class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
          >
            Order Date
          </p>
          <p class="text-sm font-bold text-gray-900">
            {{ formatDate(transaction?.created_at) }}
          </p>
        </div>
        <div class="h-8 w-px bg-gray-200"></div>
        <span
          :class="statusClass(transaction?.status)"
          class="shadow-sm px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest"
        >
          {{ formatStatus(transaction?.status) }}
        </span>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="py-20 flex flex-col items-center justify-center animate-pulse"
    >
      <div
        class="border-4 border-gray-100 border-t-black rounded-full w-12 h-12 animate-spin mb-4"
      ></div>
      <p class="font-serif text-gray-400 text-center italic">
        Loading transaction details...
      </p>
    </div>

    <div
      v-else-if="transaction"
      class="gap-8 grid grid-cols-1 lg:grid-cols-3 animate-fade-in"
    >
      <div class="space-y-6 lg:col-span-2">
        <div
          class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]"
        >
          <div
            class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4"
          >
            <h2 class="font-bold text-gray-800 text-xl tracking-tight">
              Order Items
            </h2>
            <div class="flex items-center gap-2">
              <span
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >{{ transaction.details.length }} Variants</span
              >
              <span
                class="text-xs font-bold bg-black text-white px-3 py-1 rounded-full"
              >
                {{ totalQuantity }} Total Items
              </span>
            </div>
          </div>

          <div class="divide-y divide-gray-50">
            <div
              v-for="item in transaction.details"
              :key="item.id"
              class="flex gap-6 py-6 first:pt-0 last:pb-0"
            >
              <img
                :src="item.product.image"
                class="bg-gray-50 shadow-sm border border-gray-100 rounded-2xl w-24 h-24 object-cover shrink-0"
              />
              <div class="flex flex-col flex-grow justify-center">
                <h3
                  class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                >
                  {{ item.product.name }}
                </h3>
                <p class="mt-1 text-gray-400 text-xs font-mono">
                  SKU: {{ item.product.code }}
                </p>
                <div class="flex justify-between items-end mt-4">
                  <p
                    class="text-gray-600 text-sm bg-gray-50 px-3 py-1 rounded-lg"
                  >
                    {{ item.quantity }} <span class="text-[10px] mx-1">x</span>
                    {{ formatPrice(item.price) }}
                  </p>
                  <p class="font-bold text-black">
                    {{ formatPrice(item.quantity * item.price) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col"
          >
            <h2
              class="font-bold text-gray-800 text-sm tracking-widest uppercase mb-6 border-b border-gray-100 pb-4"
            >
              Logistics
            </h2>

            <div
              v-if="transaction.shipping_method !== 'free'"
              class="flex-grow flex flex-col justify-between"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-16 h-12 bg-white border border-gray-200 rounded-xl flex justify-center items-center p-1 shrink-0"
                >
                  <img
                    v-if="getCourierLogo(transaction.courier_company)"
                    :src="getCourierLogo(transaction.courier_company)"
                    class="w-full h-full object-contain"
                  />
                  <span v-else class="text-[10px] font-black text-gray-400">{{
                    transaction.courier_company?.toUpperCase()
                  }}</span>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ transaction.courier_company }}
                  </p>
                  <p class="text-xs text-gray-500 uppercase">
                    {{ transaction.courier_type }}
                  </p>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-xl space-y-2 mt-auto">
                <p
                  class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >
                  Tracking Number (Resi)
                </p>
                <div class="flex items-center justify-between">
                  <p class="font-mono font-bold text-black text-sm">
                    {{ transaction.tracking_number || "Pending Allocation" }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-else
              class="flex-grow flex flex-col justify-center items-center text-center bg-gray-50 rounded-xl p-6"
            >
              <div
                class="w-12 h-12 bg-black text-white rounded-full flex justify-center items-center mb-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
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
              </div>
              <p class="font-bold text-gray-900 text-sm uppercase">
                Internal Courier
              </p>
              <p class="text-xs text-green-600 font-bold mt-1">Free Shipping</p>
            </div>
          </div>

          <div
            class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col"
          >
            <h2
              class="font-bold text-gray-800 text-sm tracking-widest uppercase mb-6 border-b border-gray-100 pb-4"
            >
              Payment Method
            </h2>

            <div
              v-if="transaction.payment_method"
              class="flex-grow flex flex-col justify-center"
            >
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-16 h-12 bg-gray-50 border border-gray-100 rounded-xl flex justify-center items-center p-1 shrink-0"
                >
                  <img
                    v-if="getPaymentLogo(transaction.payment_method)"
                    :src="getPaymentLogo(transaction.payment_method)"
                    class="w-full h-full object-contain"
                  />
                  <span v-else class="text-[10px] font-black text-gray-400"
                    >PAY</span
                  >
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ transaction.payment_method.replace("_", " ") }}
                  </p>
                  <p
                    :class="getPaymentStatusColor(transaction.status)"
                    class="text-[10px] font-bold uppercase tracking-wider mt-1"
                  >
                    Status: {{ getPaymentStatusText(transaction.status) }}
                  </p>
                </div>
              </div>

              <div
                v-if="transaction.payment"
                class="bg-blue-50/50 border border-blue-100 p-4 rounded-xl mt-auto"
              >
                <p
                  class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1"
                >
                  Xendit Ref ID
                </p>
                <p class="font-mono text-blue-900 text-xs truncate">
                  {{ transaction.payment.external_id }}
                </p>
              </div>
            </div>

            <div v-else class="flex-grow flex justify-center items-center">
              <p class="text-sm text-gray-400 italic">Method not selected</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div
          class="bg-black shadow-xl p-8 rounded-[2rem] text-white relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"
          ></div>

          <h2
            class="opacity-50 mb-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Customer Details
          </h2>

          <p class="font-bold text-xl leading-none uppercase">
            {{ transaction.user.first_name }} {{ transaction.user.last_name }}
          </p>

          <div class="mt-4 space-y-2 opacity-80">
            <p class="text-sm flex items-center gap-2">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {{ transaction.user.email }}
            </p>
            <p class="text-sm flex items-center gap-2">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {{ transaction.user.phone || "No phone" }}
            </p>
          </div>

          <div class="mt-6 pt-6 border-white/10 border-t space-y-4">
            <div>
              <p
                class="text-[10px] text-gray-400 uppercase tracking-widest mb-1"
              >
                Order ID
              </p>
              <div class="bg-white/10 px-3 py-2 rounded-lg font-mono text-xs">
                {{ transaction.order_id }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]"
        >
          <h2
            class="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4"
          >
            Financial Summary
          </h2>

          <div class="space-y-4">
            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Subtotal ({{ totalQuantity }} items)</span>
              <span class="font-medium text-gray-900">{{
                formatPrice(transaction.total_amount)
              }}</span>
            </div>

            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Shipping Fee</span>
              <span
                v-if="transaction.shipping_method === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >
              <span v-else class="font-medium text-gray-900">{{
                formatPrice(transaction.shipping_cost)
              }}</span>
            </div>

            <div
              class="flex justify-between items-end pt-4 border-gray-100 border-t border-dashed"
            >
              <div>
                <span
                  class="block font-bold text-gray-900 text-xs uppercase tracking-widest"
                  >Grand Total</span
                >
                <span class="text-[10px] text-gray-400 italic"
                  >Paid by customer</span
                >
              </div>
              <span class="font-bold text-black text-2xl">{{
                formatPrice(getGrandTotal(transaction))
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const transaction = ref(null);
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// [BARU] Computed Property untuk menjumlahkan semua kuantitas barang
const totalQuantity = computed(() => {
  if (!transaction.value || !transaction.value.details) return 0;
  return transaction.value.details.reduce(
    (sum, item) => sum + parseInt(item.quantity),
    0,
  );
});

const fetchData = async () => {
  const stateData = window.history.state?.transactionData;

  if (stateData) {
    transaction.value = stateData;
    isLoading.value = false;
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/transactions/${route.params.id}`,
        axiosConfig,
      );
      transaction.value = res.data;
    } catch (error) {
      console.error("Background sync failed", error);
    }
  } else {
    isLoading.value = true;
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/transactions/${route.params.id}`,
        axiosConfig,
      );
      transaction.value = res.data;
    } catch (error) {
      console.error("Detail fetch error:", error);
    } finally {
      isLoading.value = false;
    }
  }
};

// --- Helper Functions ---
const getGrandTotal = (trx) => {
  const subtotal = parseFloat(trx.total_amount) || 0;
  const shipping = parseFloat(trx.shipping_cost) || 0;
  return subtotal + shipping;
};

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

const statusClass = (status) => {
  if (!status) return "bg-gray-100 text-gray-500";
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

const formatStatus = (s) => {
  if (!s) return "";
  return s.replace(/_/g, " ");
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
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
</style> -->

<!-- Dengan Visualisasi Timeline -->
<!-- <template>
  <div class="mx-auto px-6 py-12 max-w-6xl min-h-screen">
    <div
      class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10"
    >
      <button
        @click="$router.back()"
        class="group flex items-center gap-2 text-gray-500 hover:text-black transition-colors w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span class="font-bold text-sm uppercase tracking-widest"
          >Back to List</span
        >
      </button>

      <div class="flex items-center gap-4">
        <div class="text-right">
          <p
            class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
          >
            Order Date
          </p>
          <p class="text-sm font-bold text-gray-900">
            {{ formatDate(transaction?.created_at) }}
          </p>
        </div>
        <div class="h-8 w-px bg-gray-200"></div>
        <span
          :class="statusClass(transaction?.status)"
          class="shadow-sm px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest"
        >
          {{ formatStatus(transaction?.status) }}
        </span>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="py-20 flex flex-col items-center justify-center animate-pulse"
    >
      <div
        class="border-4 border-gray-100 border-t-black rounded-full w-12 h-12 animate-spin mb-4"
      ></div>
      <p class="font-serif text-gray-400 text-center italic">
        Loading transaction details...
      </p>
    </div>

    <div
      v-else-if="transaction"
      class="gap-8 grid grid-cols-1 lg:grid-cols-3 animate-fade-in"
    >
      <div class="space-y-6 lg:col-span-2">
        <div
          class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]"
        >
          <div
            class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4"
          >
            <h2 class="font-bold text-gray-800 text-xl tracking-tight">
              Order Items
            </h2>
            <div class="flex items-center gap-2">
              <span
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >{{ transaction.details.length }} Variants</span
              >
              <span
                class="text-xs font-bold bg-black text-white px-3 py-1 rounded-full"
              >
                {{ totalQuantity }} Total Items
              </span>
            </div>
          </div>

          <div class="divide-y divide-gray-50">
            <div
              v-for="item in transaction.details"
              :key="item.id"
              class="flex gap-6 py-6 first:pt-0 last:pb-0"
            >
              <img
                :src="item.product.image"
                class="bg-gray-50 shadow-sm border border-gray-100 rounded-2xl w-24 h-24 object-cover shrink-0"
              />
              <div class="flex flex-col flex-grow justify-center">
                <h3
                  class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                >
                  {{ item.product.name }}
                </h3>
                <p class="mt-1 text-gray-400 text-xs font-mono">
                  SKU: {{ item.product.code }}
                </p>
                <div class="flex justify-between items-end mt-4">
                  <p
                    class="text-gray-600 text-sm bg-gray-50 px-3 py-1 rounded-lg"
                  >
                    {{ item.quantity }} <span class="text-[10px] mx-1">x</span>
                    {{ formatPrice(item.price) }}
                  </p>
                  <p class="font-bold text-black">
                    {{ formatPrice(item.quantity * item.price) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col relative overflow-hidden"
          >
            <h2
              class="font-bold text-gray-800 text-sm tracking-widest uppercase mb-6 border-b border-gray-100 pb-4"
            >
              Logistics
            </h2>

            <div
              v-if="trackingLoading"
              class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col justify-center items-center"
            >
              <div
                class="border-2 border-gray-200 border-t-black rounded-full w-8 h-8 animate-spin"
              ></div>
              <p
                class="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold"
              >
                Syncing Biteship...
              </p>
            </div>

            <div
              v-if="transaction.shipping_method !== 'free'"
              class="flex-grow flex flex-col justify-between"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-16 h-12 bg-white border border-gray-200 rounded-xl flex justify-center items-center p-1 shrink-0"
                >
                  <img
                    v-if="getCourierLogo(transaction.courier_company)"
                    :src="getCourierLogo(transaction.courier_company)"
                    class="w-full h-full object-contain"
                  />
                  <span v-else class="text-[10px] font-black text-gray-400">{{
                    transaction.courier_company?.toUpperCase()
                  }}</span>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ transaction.courier_company }}
                  </p>
                  <p class="text-xs text-gray-500 uppercase">
                    {{ transaction.courier_type }}
                  </p>
                </div>
              </div>

              <div class="bg-gray-50 p-4 rounded-xl space-y-2 mt-auto">
                <p
                  class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >
                  Tracking Number (Resi)
                </p>
                <div class="flex items-center justify-between">
                  <p class="font-mono font-bold text-black text-sm">
                    {{
                      biteshipData?.courier?.waybill_id ||
                      transaction.tracking_number ||
                      "Pending Allocation"
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div
              v-else
              class="flex-grow flex flex-col justify-center items-center text-center bg-gray-50 rounded-xl p-6"
            >
              <div
                class="w-12 h-12 bg-black text-white rounded-full flex justify-center items-center mb-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
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
              <p class="font-bold text-gray-900 text-sm uppercase">
                No Courier
              </p>
              <p class="text-xs text-gray-500 font-bold mt-1">
                In-Store Pickup
              </p>
            </div>
          </div>

          <div
            class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col"
          >
            <h2
              class="font-bold text-gray-800 text-sm tracking-widest uppercase mb-6 border-b border-gray-100 pb-4"
            >
              Payment Method
            </h2>

            <div
              v-if="transaction.payment_method"
              class="flex-grow flex flex-col justify-center"
            >
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-16 h-12 bg-gray-50 border border-gray-100 rounded-xl flex justify-center items-center p-1 shrink-0"
                >
                  <img
                    v-if="getPaymentLogo(transaction.payment_method)"
                    :src="getPaymentLogo(transaction.payment_method)"
                    class="w-full h-full object-contain"
                  />
                  <span v-else class="text-[10px] font-black text-gray-400"
                    >PAY</span
                  >
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ transaction.payment_method.replace("_", " ") }}
                  </p>
                  <p
                    :class="getPaymentStatusColor(transaction.status)"
                    class="text-[10px] font-bold uppercase tracking-wider mt-1"
                  >
                    Status: {{ getPaymentStatusText(transaction.status) }}
                  </p>
                </div>
              </div>

              <div
                v-if="transaction.payment"
                class="bg-blue-50/50 border border-blue-100 p-4 rounded-xl mt-auto"
              >
                <p
                  class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1"
                >
                  Xendit Ref ID
                </p>
                <p class="font-mono text-blue-900 text-xs truncate">
                  {{ transaction.payment.external_id }}
                </p>
              </div>
            </div>

            <div v-else class="flex-grow flex justify-center items-center">
              <p class="text-sm text-gray-400 italic">Method not selected</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div
          class="bg-black shadow-xl p-8 rounded-[2rem] text-white relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"
          ></div>

          <h2
            class="opacity-50 mb-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Customer Details
          </h2>

          <p class="font-bold text-xl leading-none uppercase">
            {{ transaction.user.first_name }} {{ transaction.user.last_name }}
          </p>

          <div class="mt-4 space-y-2 opacity-80">
            <p class="text-sm flex items-center gap-2">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {{ transaction.user.email }}
            </p>
            <p class="text-sm flex items-center gap-2">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {{ transaction.user.phone || "No phone" }}
            </p>
          </div>

          <div class="mt-6 pt-6 border-white/10 border-t space-y-4">
            <div>
              <p
                class="text-[10px] text-gray-400 uppercase tracking-widest mb-1"
              >
                Order ID
              </p>
              <div class="bg-white/10 px-3 py-2 rounded-lg font-mono text-xs">
                {{ transaction.order_id }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]"
        >
          <h2
            class="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4"
          >
            Financial Summary
          </h2>

          <div class="space-y-4">
            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Subtotal ({{ totalQuantity }} items)</span>
              <span class="font-medium text-gray-900">{{
                formatPrice(transaction.total_amount)
              }}</span>
            </div>

            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Shipping Fee</span>
              <span
                v-if="transaction.shipping_method === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >
              <span v-else class="font-medium text-gray-900">{{
                formatPrice(transaction.shipping_cost)
              }}</span>
            </div>

            <div
              class="flex justify-between items-end pt-4 border-gray-100 border-t border-dashed"
            >
              <div>
                <span
                  class="block font-bold text-gray-900 text-xs uppercase tracking-widest"
                  >Grand Total</span
                >
                <span class="text-[10px] text-gray-400 italic"
                  >Paid by customer</span
                >
              </div>
              <span class="font-bold text-black text-2xl">{{
                formatPrice(getGrandTotal(transaction))
              }}</span>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]"
        >
          <h2
            class="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4 flex justify-between items-center"
          >
            <span>Tracking Timeline</span>
            <span
              v-if="biteshipData && transaction.shipping_method === 'biteship'"
              class="flex items-center gap-1 text-[8px] text-green-600 bg-green-50 px-2 py-1 rounded"
            >
              <span
                class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
              ></span>
              Live
            </span>
          </h2>

          <div
            v-if="transaction.shipping_method === 'free'"
            class="text-center py-6"
          >
            <p class="text-xs text-gray-500 italic mb-2">
              No physical shipping required.
            </p>
            <p class="text-sm font-bold text-black uppercase">
              In-Store Pickup
            </p>
          </div>

          <div v-else-if="trackingLoading" class="flex justify-center py-6">
            <div
              class="border-2 border-gray-200 border-t-black rounded-full w-6 h-6 animate-spin"
            ></div>
          </div>

          <div
            v-else
            class="relative border-l-2 border-gray-100 ml-2 space-y-6"
          >
            <div
              v-for="(history, index) in timelineHistory"
              :key="index"
              class="relative pl-6"
            >
              <span
                :class="
                  index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'
                "
                class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
              ></span>

              <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
                <p
                  class="font-bold text-gray-900 text-xs uppercase tracking-wide mb-1"
                >
                  {{ formatStatusTitle(history.status) }}
                </p>
                <p class="text-gray-600 text-[11px] mb-1.5 leading-tight">
                  {{ history.note }}
                </p>
                <p class="text-[9px] text-gray-400 font-medium font-mono">
                  {{ formatDateTime(history.updated_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const transaction = ref(null);
const isLoading = ref(true);

// [BARU] State khusus untuk data Tracking Biteship
const biteshipData = ref(null);
const trackingLoading = ref(false);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const totalQuantity = computed(() => {
  if (!transaction.value || !transaction.value.details) return 0;
  return transaction.value.details.reduce(
    (sum, item) => sum + parseInt(item.quantity),
    0,
  );
});

// [BARU] Logika Timeline dari API Biteship
const timelineHistory = computed(() => {
  const apiHistory = biteshipData.value?.courier?.history || [];

  if (apiHistory.length > 0) {
    return [...apiHistory].reverse();
  }

  // Default state awal jika belum ada history
  return [
    {
      status:
        biteshipData.value?.status || transaction.value?.status || "Processing",
      note: getNoteFromStatus(
        biteshipData.value?.status || transaction.value?.status,
      ),
      updated_at:
        biteshipData.value?.delivery?.datetime ||
        transaction.value?.created_at ||
        new Date().toISOString(),
    },
  ];
});

const formatStatusTitle = (status) => {
  if (!status) return "Processing";
  const formatted = status.replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getNoteFromStatus = (status) => {
  const map = {
    pending: "Waiting for payment.",
    placed:
      "Your order has been recorded and is waiting for courier allocation.",
    allocated: "Courier has been allocated to pick up your package.",
    picking_up: "Courier is on the way to pick up the package from the origin.",
    picked: "Package has been picked up by the courier.",
    dropping_off: "Package is on the way to the destination.",
    delivered: "Package has been delivered to the recipient.",
    rejected: "Delivery was rejected.",
    cancelled: "Delivery was cancelled.",
  };
  return map[status] || "Order is currently being processed by the system.";
};

// [BARU] Fetch data dari Biteship
const fetchTrackingData = async (trxId) => {
  if (
    transaction.value.shipping_method !== "biteship" ||
    !transaction.value.biteship_order_id
  )
    return;

  trackingLoading.value = true;
  try {
    const res = await axios.get(
      `${BASE_URL}/admin/transactions/${trxId}/tracking`,
      axiosConfig,
    );
    biteshipData.value = res.data;
  } catch (error) {
    console.error("Failed to fetch biteship data:", error);
  } finally {
    trackingLoading.value = false;
  }
};

const fetchData = async () => {
  const stateData = window.history.state?.transactionData;

  if (stateData) {
    transaction.value = stateData;
    isLoading.value = false;

    // Walaupun sudah ada state, fetch DB lokal ulang untuk kepastian, dan fetch Tracking
    fetchTrackingData(stateData.id);

    try {
      const res = await axios.get(
        `${BASE_URL}/admin/transactions/${route.params.id}`,
        axiosConfig,
      );
      transaction.value = res.data;
    } catch (error) {
      console.error("Background sync failed", error);
    }
  } else {
    isLoading.value = true;
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/transactions/${route.params.id}`,
        axiosConfig,
      );
      transaction.value = res.data;

      // Setelah DB lokal didapat, ambil data Biteship
      fetchTrackingData(res.data.id);
    } catch (error) {
      console.error("Detail fetch error:", error);
    } finally {
      isLoading.value = false;
    }
  }
};

// --- Helper Functions ---
const getGrandTotal = (trx) => {
  const subtotal = parseFloat(trx.total_amount) || 0;
  const shipping = parseFloat(trx.shipping_cost) || 0;
  return subtotal + shipping;
};

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

const statusClass = (status) => {
  if (!status) return "bg-gray-100 text-gray-500";
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

const formatStatus = (s) => {
  if (!s) return "";
  return s.replace(/_/g, " ");
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatDateTime = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
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
</style> -->

<!-- Tambahan Tombol untuk Cetak Resi -->
<template>
  <div class="mx-auto px-6 py-12 max-w-6xl min-h-screen relative">
    <div
      v-show="isPreparingPDF"
      class="fixed inset-0 z-[999999] bg-gray-900/95 overflow-y-auto"
    >
      <div class="min-h-screen flex flex-col items-center py-10 px-4">
        <div
          class="flex items-center gap-3 text-white font-bold tracking-widest uppercase mb-8 animate-pulse"
        >
          <div
            class="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"
          ></div>
          Generating PDF Document...
        </div>

        <div
          id="print-label-template"
          class="bg-white text-black p-8 w-[800px] shrink-0 border-[3px] border-black flex flex-col gap-4"
        >
          <div v-if="transaction">
            <div
              class="flex justify-between items-center border-b-2 border-black pb-4"
            >
              <div class="w-1/3">
                <img
                  v-if="getCourierLogo(transaction.courier_company)"
                  :src="getCourierLogo(transaction.courier_company)"
                  class="h-12 object-contain"
                />
                <span v-else class="font-black text-2xl uppercase">{{
                  transaction.courier_company
                }}</span>
              </div>
              <div class="w-1/3 text-center">
                <h1
                  class="font-black text-3xl tracking-widest uppercase text-black"
                >
                  SOLHER BAG
                </h1>
                <p class="text-[10px] font-bold mt-1 text-black">
                  solherbag.com
                </p>
              </div>
              <div class="w-1/3 text-right">
                <p class="font-black text-xl uppercase text-black">
                  {{ transaction.courier_type }}
                </p>
              </div>
            </div>

            <div
              class="text-center py-6 border-b-2 border-black flex flex-col items-center"
            >
              <img
                :src="`https://bwipjs-api.metafloor.com/?bcid=code128&text=${biteshipData?.courier?.waybill_id || transaction.tracking_number || transaction.order_id}&scale=4&includetext=false`"
                class="h-24 object-contain mb-4"
                crossorigin="anonymous"
              />
              <p class="font-black text-2xl tracking-widest text-black">
                Nomor Resi -
                {{
                  biteshipData?.courier?.waybill_id ||
                  transaction.tracking_number ||
                  "N/A"
                }}
              </p>
            </div>

            <div
              v-if="printSettings.shipping_fee_shown"
              class="text-center py-4 border-b-2 border-black"
            >
              <p class="font-black text-2xl text-black">
                Ongkos Kirim: {{ formatPrice(transaction.shipping_cost) }}
              </p>
              <p class="font-bold text-lg mt-1 text-black">
                Jenis Layanan - {{ transaction.courier_type }}
              </p>
            </div>

            <div class="flex py-6 border-b-2 border-black gap-6">
              <div class="w-1/2 flex flex-col border-r-2 border-black pr-6">
                <p class="text-sm font-bold mb-3 text-black">
                  Reference Number:
                </p>
                <img
                  :src="`https://bwipjs-api.metafloor.com/?bcid=code128&text=${transaction.order_id}&scale=3&includetext=false`"
                  class="h-16 object-contain self-start"
                  crossorigin="anonymous"
                />
                <p class="text-sm font-bold mt-2 text-black">
                  {{ transaction.order_id }}
                </p>
              </div>
              <div
                class="w-1/2 flex flex-col justify-center text-xl space-y-3 text-black"
              >
                <p>
                  Quantity <span class="mx-2">:</span
                  ><span class="font-black">{{ totalQuantity }} Pcs</span>
                </p>
                <p>
                  Weight <span class="mx-4">:</span
                  ><span class="font-black">{{ totalQuantity }} Kg</span>
                </p>
              </div>
            </div>

            <div class="flex py-6 border-b-2 border-black gap-6">
              <div class="w-1/2 border-r-2 border-black pr-6 text-black">
                <p class="font-black text-sm mb-3 uppercase">
                  Alamat Penerima:
                </p>
                <p class="font-black text-xl leading-tight">
                  {{ getCensoredName() }}
                </p>
                <p
                  v-if="printSettings.receiver_phone_shown"
                  class="text-xl mt-1 font-mono font-bold"
                >
                  {{ transaction.user.phone || "-" }}
                </p>
                <p class="text-lg mt-3 leading-snug">
                  {{
                    transaction.address?.address_location ||
                    "Alamat tidak tersedia"
                  }}, {{ transaction.address?.postal_code || "" }}
                </p>
              </div>
              <div class="w-1/2 pr-6 text-black">
                <p class="font-black text-sm mb-3 uppercase">
                  Alamat Pengirim:
                </p>
                <p class="font-black text-xl leading-tight">Solher Store</p>
                <p
                  v-if="printSettings.origin_phone_shown"
                  class="text-xl mt-1 font-mono font-bold"
                >
                  08123456789
                </p>
                <p
                  v-if="printSettings.origin_address_shown"
                  class="text-lg mt-3 leading-snug"
                >
                  Gudang Solher, Jl. Utama No. 1, Genteng, Surabaya, Jawa Timur,
                  60272
                </p>
              </div>
            </div>

            <div
              v-if="printSettings.item_description_shown"
              class="py-6 border-b-2 border-black text-lg leading-relaxed text-black"
            >
              <div class="flex">
                <span class="font-black uppercase w-40 shrink-0"
                  >Jenis Barang:
                </span>
                <span class="font-bold">{{ getItemsDescription() }}</span>
              </div>
            </div>

            <div class="text-lg flex py-4 border-b-2 border-black text-black">
              <span class="font-black uppercase w-40 shrink-0">Catatan: </span>
              <span class="font-bold">Tidak Ada</span>
            </div>

            <div class="text-center pt-4 text-sm font-bold text-black">
              Pengiriman melalui platform Solher Bag
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10 relative z-10"
    >
      <button
        @click="$router.back()"
        class="group flex items-center gap-2 text-gray-500 hover:text-black transition-colors w-fit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 transition-transform group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span class="font-bold text-sm uppercase tracking-widest"
          >Back to List</span
        >
      </button>

      <div class="flex items-center gap-4">
        <button
          v-if="
            transaction?.shipping_method === 'biteship' &&
            transaction?.biteship_order_id
          "
          @click="showPrintModal = true"
          class="bg-[#4a148c] hover:bg-[#380e6b] text-white px-4 py-2 rounded-lg font-bold text-xs flex items-center gap-2 transition shadow-sm"
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
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Cetak Resi
        </button>

        <div
          class="h-8 w-px bg-gray-200"
          v-if="transaction?.shipping_method === 'biteship'"
        ></div>

        <div class="text-right">
          <p
            class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
          >
            Order Date
          </p>
          <p class="text-sm font-bold text-gray-900">
            {{ formatDate(transaction?.created_at) }}
          </p>
        </div>
        <div class="h-8 w-px bg-gray-200"></div>
        <span
          :class="statusClass(transaction?.status)"
          class="shadow-sm px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest"
        >
          {{ formatStatus(transaction?.status) }}
        </span>
      </div>
    </div>

    <div
      v-if="showPrintModal"
      class="fixed inset-0 z-[500] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in px-4"
    >
      <div
        class="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
      >
        <div
          class="flex justify-between items-center px-6 py-4 border-b border-gray-100"
        >
          <h3 class="font-bold text-lg text-gray-800">Print Label</h3>
          <button
            @click="showPrintModal = false"
            class="text-gray-400 hover:text-red-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
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

        <div class="p-6 space-y-6 flex-grow overflow-y-auto max-h-[70vh]">
          <div>
            <h4 class="font-bold text-gray-800 mb-4">Isi Detail Resi</h4>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="space-y-3">
                <label class="flex items-center gap-3 cursor-pointer group"
                  ><input
                    type="checkbox"
                    v-model="printSettings.insurance_shown"
                    class="w-5 h-5 border-gray-300 rounded focus:ring-[#4a148c] cursor-pointer"
                  /><span class="text-sm text-gray-600 group-hover:text-black"
                    >Nilai Asuransi</span
                  ></label
                >
                <label class="flex items-center gap-3 cursor-pointer group"
                  ><input
                    type="checkbox"
                    v-model="printSettings.shipping_fee_shown"
                    class="w-5 h-5 border-gray-300 rounded focus:ring-[#4a148c] cursor-pointer"
                  /><span class="text-sm text-gray-600 group-hover:text-black"
                    >Ongkos Kirim</span
                  ></label
                >
                <label class="flex items-center gap-3 cursor-pointer group"
                  ><input
                    type="checkbox"
                    v-model="printSettings.item_description_shown"
                    class="w-5 h-5 border-gray-300 rounded focus:ring-[#4a148c] cursor-pointer"
                  /><span class="text-sm text-gray-600 group-hover:text-black"
                    >Deskripsi Barang</span
                  ></label
                >
                <label class="flex items-center gap-3 cursor-pointer group"
                  ><input
                    type="checkbox"
                    v-model="printSettings.item_sku_shown"
                    class="w-5 h-5 border-gray-300 rounded focus:ring-[#4a148c] cursor-pointer"
                  /><span class="text-sm text-gray-600 group-hover:text-black"
                    >SKU Barang</span
                  ></label
                >
              </div>
              <div class="space-y-3">
                <label class="flex items-center gap-3 cursor-pointer group"
                  ><input
                    type="checkbox"
                    v-model="printSettings.origin_phone_shown"
                    class="w-5 h-5 border-gray-300 rounded focus:ring-[#4a148c] cursor-pointer"
                  /><span class="text-sm text-gray-600 group-hover:text-black"
                    >No. Telp Pengirim</span
                  ></label
                >
                <label class="flex items-center gap-3 cursor-pointer group"
                  ><input
                    type="checkbox"
                    v-model="printSettings.origin_address_shown"
                    class="w-5 h-5 border-gray-300 rounded focus:ring-[#4a148c] cursor-pointer"
                  /><span class="text-sm text-gray-600 group-hover:text-black"
                    >Alamat Pengirim</span
                  ></label
                >
                <label class="flex items-center gap-3 cursor-pointer group"
                  ><input
                    type="checkbox"
                    v-model="printSettings.receiver_phone_shown"
                    class="w-5 h-5 border-gray-300 rounded focus:ring-[#4a148c] cursor-pointer"
                  /><span class="text-sm text-gray-600 group-hover:text-black"
                    >No. Telp Penerima</span
                  ></label
                >
                <label class="flex items-center gap-3 cursor-pointer group"
                  ><input
                    type="checkbox"
                    v-model="printSettings.censor_receiver_name"
                    class="w-5 h-5 border-gray-300 rounded focus:ring-[#4a148c] cursor-pointer"
                  /><span class="text-sm text-gray-600 group-hover:text-black"
                    >Sensor Nama Penerima</span
                  ></label
                >
              </div>
            </div>
          </div>
          <div>
            <h4 class="font-bold text-gray-800 mb-3">Tipe Label</h4>
            <select
              v-model="printSettings.paper_size"
              class="w-full bg-white border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-[#4a148c] focus:border-[#4a148c] block p-3 outline-none cursor-pointer"
            >
              <option value="a4">Default Kertas (A4)</option>
              <option value="thermal">Thermal 1 (8 x 10 cm)</option>
              <option value="thermal2">Thermal 2 (10 x 15 cm)</option>
            </select>
          </div>
        </div>

        <div class="p-6 border-t border-gray-100 bg-gray-50">
          <button
            @click="generateAndDownloadPDF"
            class="w-full bg-[#4a148c] hover:bg-[#380e6b] text-white font-bold py-3 px-4 rounded-lg transition shadow-md"
          >
            Download Label (PDF)
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="isLoading"
      class="py-20 flex flex-col items-center justify-center animate-pulse relative z-10"
    >
      <div
        class="border-4 border-gray-100 border-t-black rounded-full w-12 h-12 animate-spin mb-4"
      ></div>
      <p class="font-serif text-gray-400 text-center italic">
        Loading transaction details...
      </p>
    </div>

    <div
      v-else-if="transaction"
      class="gap-8 grid grid-cols-1 lg:grid-cols-3 animate-fade-in relative z-10"
    >
      <div class="space-y-6 lg:col-span-2">
        <div
          class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]"
        >
          <div
            class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4"
          >
            <h2 class="font-bold text-gray-800 text-xl tracking-tight">
              Order Items
            </h2>
            <div class="flex items-center gap-2">
              <span
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >{{ transaction.details.length }} Variants</span
              >
              <span
                class="text-xs font-bold bg-black text-white px-3 py-1 rounded-full"
                >{{ totalQuantity }} Total Items</span
              >
            </div>
          </div>
          <div class="divide-y divide-gray-50">
            <div
              v-for="item in transaction.details"
              :key="item.id"
              class="flex gap-6 py-6 first:pt-0 last:pb-0"
            >
              <img
                :src="item.product.image"
                class="bg-gray-50 shadow-sm border border-gray-100 rounded-2xl w-24 h-24 object-cover shrink-0"
              />
              <div class="flex flex-col flex-grow justify-center">
                <h3
                  class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                >
                  {{ item.product.name }}
                </h3>
                <p class="mt-1 text-gray-400 text-xs font-mono">
                  SKU: {{ item.product.code }}
                </p>
                <div class="flex justify-between items-end mt-4">
                  <p
                    class="text-gray-600 text-sm bg-gray-50 px-3 py-1 rounded-lg"
                  >
                    {{ item.quantity }} <span class="text-[10px] mx-1">x</span>
                    {{ formatPrice(item.price) }}
                  </p>
                  <p class="font-bold text-black">
                    {{ formatPrice(item.quantity * item.price) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col relative overflow-hidden"
          >
            <h2
              class="font-bold text-gray-800 text-sm tracking-widest uppercase mb-6 border-b border-gray-100 pb-4"
            >
              Logistics
            </h2>
            <div
              v-if="trackingLoading"
              class="absolute inset-0 bg-white/80 backdrop-blur-sm z-10 flex flex-col justify-center items-center"
            >
              <div
                class="border-2 border-gray-200 border-t-black rounded-full w-8 h-8 animate-spin"
              ></div>
              <p
                class="text-[10px] uppercase tracking-widest text-gray-500 mt-2 font-bold"
              >
                Syncing Biteship...
              </p>
            </div>
            <div
              v-if="transaction.shipping_method !== 'free'"
              class="flex-grow flex flex-col justify-between"
            >
              <div class="flex items-center gap-4 mb-4">
                <div
                  class="w-16 h-12 bg-white border border-gray-200 rounded-xl flex justify-center items-center p-1 shrink-0"
                >
                  <img
                    v-if="getCourierLogo(transaction.courier_company)"
                    :src="getCourierLogo(transaction.courier_company)"
                    class="w-full h-full object-contain"
                  />
                  <span v-else class="text-[10px] font-black text-gray-400">{{
                    transaction.courier_company?.toUpperCase()
                  }}</span>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ transaction.courier_company }}
                  </p>
                  <p class="text-xs text-gray-500 uppercase">
                    {{ transaction.courier_type }}
                  </p>
                </div>
              </div>
              <div class="bg-gray-50 p-4 rounded-xl space-y-2 mt-auto">
                <p
                  class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
                >
                  Tracking Number (Resi)
                </p>
                <div class="flex items-center justify-between">
                  <p class="font-mono font-bold text-black text-sm">
                    {{
                      biteshipData?.courier?.waybill_id ||
                      transaction.tracking_number ||
                      "Pending Allocation"
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div
              v-else
              class="flex-grow flex flex-col justify-center items-center text-center bg-gray-50 rounded-xl p-6"
            >
              <div
                class="w-12 h-12 bg-black text-white rounded-full flex justify-center items-center mb-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
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
              <p class="font-bold text-gray-900 text-sm uppercase">
                No Courier
              </p>
              <p class="text-xs text-gray-500 font-bold mt-1">
                In-Store Pickup
              </p>
            </div>
          </div>

          <div
            class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem] flex flex-col"
          >
            <h2
              class="font-bold text-gray-800 text-sm tracking-widest uppercase mb-6 border-b border-gray-100 pb-4"
            >
              Payment Method
            </h2>
            <div
              v-if="transaction.payment_method"
              class="flex-grow flex flex-col justify-center"
            >
              <div class="flex items-center gap-4 mb-6">
                <div
                  class="w-16 h-12 bg-gray-50 border border-gray-100 rounded-xl flex justify-center items-center p-1 shrink-0"
                >
                  <img
                    v-if="getPaymentLogo(transaction.payment_method)"
                    :src="getPaymentLogo(transaction.payment_method)"
                    class="w-full h-full object-contain"
                  />
                  <span v-else class="text-[10px] font-black text-gray-400"
                    >PAY</span
                  >
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ transaction.payment_method.replace("_", " ") }}
                  </p>
                  <p
                    :class="getPaymentStatusColor(transaction.status)"
                    class="text-[10px] font-bold uppercase tracking-wider mt-1"
                  >
                    Status: {{ getPaymentStatusText(transaction.status) }}
                  </p>
                </div>
              </div>
              <div
                v-if="transaction.payment"
                class="bg-blue-50/50 border border-blue-100 p-4 rounded-xl mt-auto"
              >
                <p
                  class="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1"
                >
                  Xendit Ref ID
                </p>
                <p class="font-mono text-blue-900 text-xs truncate">
                  {{ transaction.payment.external_id }}
                </p>
              </div>
            </div>
            <div v-else class="flex-grow flex justify-center items-center">
              <p class="text-sm text-gray-400 italic">Method not selected</p>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6 lg:col-span-1">
        <div
          class="bg-black shadow-xl p-8 rounded-[2rem] text-white relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl pointer-events-none"
          ></div>
          <h2
            class="opacity-50 mb-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-2"
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
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Customer Details
          </h2>
          <p class="font-bold text-xl leading-none uppercase">
            {{ transaction.user.first_name }} {{ transaction.user.last_name }}
          </p>
          <div class="mt-4 space-y-2 opacity-80">
            <p class="text-sm flex items-center gap-2">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {{ transaction.user.email }}
            </p>
            <p class="text-sm flex items-center gap-2">
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              {{ transaction.user.phone || "No phone" }}
            </p>
          </div>
          <div class="mt-6 pt-6 border-white/10 border-t space-y-4">
            <div>
              <p
                class="text-[10px] text-gray-400 uppercase tracking-widest mb-1"
              >
                Order ID
              </p>
              <div class="bg-white/10 px-3 py-2 rounded-lg font-mono text-xs">
                {{ transaction.order_id }}
              </div>
            </div>
          </div>
        </div>

        <!-- <div
          class="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]"
        >
          <h2
            class="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4"
          >
            Financial Summary
          </h2>
          <div class="space-y-4">
            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Subtotal ({{ totalQuantity }} items)</span
              ><span class="font-medium text-gray-900">{{
                formatPrice(transaction.total_amount)
              }}</span>
            </div>
            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Shipping Fee</span
              ><span
                v-if="transaction.shipping_method === 'free'"
                class="font-bold text-green-600"
                >Free</span
              ><span v-else class="font-medium text-gray-900">{{
                formatPrice(transaction.shipping_cost)
              }}</span>
            </div>
            <div
              class="flex justify-between items-end pt-4 border-gray-100 border-t border-dashed"
            >
              <div>
                <span
                  class="block font-bold text-gray-900 text-xs uppercase tracking-widest"
                  >Grand Total</span
                ><span class="text-[10px] text-gray-400 italic"
                  >Paid by customer</span
                >
              </div>
              <span class="font-bold text-black text-2xl">{{
                formatPrice(getGrandTotal(transaction))
              }}</span>
            </div>
          </div>
        </div> -->

        <div
          class="bg-white shadow-sm p-8 border border-gray-100 rounded-[2rem]"
        >
          <h2
            class="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4"
          >
            Financial Summary
          </h2>
          <div class="space-y-4">
            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Subtotal ({{ totalQuantity }} items)</span>
              <span class="font-medium text-gray-900">{{
                formatPrice(transaction.total_amount)
              }}</span>
            </div>
            <div
              class="flex justify-between items-center text-gray-600 text-sm"
            >
              <span>Shipping Fee</span>
              <span
                v-if="transaction.shipping_method === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >
              <span v-else class="font-medium text-gray-900">{{
                formatPrice(transaction.shipping_cost)
              }}</span>
            </div>
            <div
              class="flex justify-between items-end pt-4 border-gray-100 border-t border-dashed"
            >
              <div>
                <span
                  class="block font-bold text-gray-900 text-xs uppercase tracking-widest"
                  >Grand Total</span
                >
                <span class="text-[10px] text-gray-400 italic"
                  >Paid by customer</span
                >
              </div>
              <span class="font-bold text-black text-2xl">{{
                formatPrice(getGrandTotal(transaction))
              }}</span>
            </div>

            <div
              v-if="transaction.point > 0 && transaction.status === 'completed'"
              class="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-white border border-yellow-100 rounded-xl flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-10 h-10 bg-yellow-400 text-white rounded-full flex justify-center items-center shadow-sm"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest"
                  >
                    Loyalty Reward
                  </p>
                  <p class="text-xs text-gray-500 mt-0.5">
                    Points awarded to user
                  </p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-2xl font-black text-yellow-600"
                  >+{{ transaction.point }}</span
                >
                <span class="text-xs font-bold text-yellow-800 ml-1">Pts</span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white shadow-sm p-6 sm:p-8 border border-gray-100 rounded-[2rem]"
        >
          <h2
            class="mb-6 font-black text-[10px] text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 pb-4 flex justify-between items-center"
          >
            <span>Tracking Timeline</span>
            <span
              v-if="biteshipData && transaction.shipping_method === 'biteship'"
              class="flex items-center gap-1 text-[8px] text-green-600 bg-green-50 px-2 py-1 rounded"
              ><span
                class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"
              ></span>
              Live</span
            >
          </h2>
          <div
            v-if="transaction.shipping_method === 'free'"
            class="text-center py-6"
          >
            <p class="text-xs text-gray-500 italic mb-2">
              No physical shipping required.
            </p>
            <p class="text-sm font-bold text-black uppercase">
              In-Store Pickup
            </p>
          </div>
          <div v-else-if="trackingLoading" class="flex justify-center py-6">
            <div
              class="border-2 border-gray-200 border-t-black rounded-full w-6 h-6 animate-spin"
            ></div>
          </div>
          <div
            v-else
            class="relative border-l-2 border-gray-100 ml-2 space-y-6"
          >
            <div
              v-for="(history, index) in timelineHistory"
              :key="index"
              class="relative pl-6"
            >
              <span
                :class="
                  index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'
                "
                class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
              ></span>
              <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
                <p
                  class="font-bold text-gray-900 text-xs uppercase tracking-wide mb-1"
                >
                  {{ formatStatusTitle(history.status) }}
                </p>
                <p class="text-gray-600 text-[11px] mb-1.5 leading-tight">
                  {{ history.note }}
                </p>
                <p class="text-[9px] text-gray-400 font-medium font-mono">
                  {{ formatDateTime(history.updated_at) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import Swal from "sweetalert2";
import html2pdf from "html2pdf.js";

const route = useRoute();
const transaction = ref(null);
const isLoading = ref(true);

const biteshipData = ref(null);
const trackingLoading = ref(false);

const showPrintModal = ref(false);
const isPreparingPDF = ref(false); // [BARU] State overlay rendering PDF

const printSettings = ref({
  insurance_shown: true,
  shipping_fee_shown: true,
  item_description_shown: true,
  item_sku_shown: true,
  origin_phone_shown: true,
  origin_address_shown: true,
  receiver_phone_shown: true,
  censor_receiver_name: true,
  paper_size: "a4",
});

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const totalQuantity = computed(() => {
  if (!transaction.value || !transaction.value.details) return 0;
  return transaction.value.details.reduce(
    (sum, item) => sum + parseInt(item.quantity),
    0,
  );
});

const timelineHistory = computed(() => {
  const apiHistory = biteshipData.value?.courier?.history || [];
  if (apiHistory.length > 0) return [...apiHistory].reverse();
  return [
    {
      status:
        biteshipData.value?.status || transaction.value?.status || "Processing",
      note: getNoteFromStatus(
        biteshipData.value?.status || transaction.value?.status,
      ),
      updated_at:
        biteshipData.value?.delivery?.datetime ||
        transaction.value?.created_at ||
        new Date().toISOString(),
    },
  ];
});

const formatStatusTitle = (status) => {
  if (!status) return "Processing";
  const formatted = status.replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getNoteFromStatus = (status) => {
  const map = {
    pending: "Waiting for payment.",
    placed:
      "Your order has been recorded and is waiting for courier allocation.",
    allocated: "Courier has been allocated to pick up your package.",
    picking_up: "Courier is on the way to pick up the package from the origin.",
    picked: "Package has been picked up by the courier.",
    dropping_off: "Package is on the way to the destination.",
    delivered: "Package has been delivered to the recipient.",
    rejected: "Delivery was rejected.",
    cancelled: "Delivery was cancelled.",
  };
  return map[status] || "Order is currently being processed by the system.";
};

const fetchTrackingData = async (trxId) => {
  if (
    transaction.value.shipping_method !== "biteship" ||
    !transaction.value.biteship_order_id
  )
    return;
  trackingLoading.value = true;
  try {
    const res = await axios.get(
      `${BASE_URL}/admin/transactions/${trxId}/tracking`,
      axiosConfig,
    );
    biteshipData.value = res.data;
  } catch (error) {
    console.error("Failed to fetch biteship data:", error);
  } finally {
    trackingLoading.value = false;
  }
};

const fetchData = async () => {
  const stateData = window.history.state?.transactionData;
  if (stateData) {
    transaction.value = stateData;
    isLoading.value = false;
    fetchTrackingData(stateData.id);
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/transactions/${route.params.id}`,
        axiosConfig,
      );
      transaction.value = res.data;
    } catch (error) {
      console.error("Background sync failed", error);
    }
  } else {
    isLoading.value = true;
    try {
      const res = await axios.get(
        `${BASE_URL}/admin/transactions/${route.params.id}`,
        axiosConfig,
      );
      transaction.value = res.data;
      fetchTrackingData(res.data.id);
    } catch (error) {
      console.error("Detail fetch error:", error);
    } finally {
      isLoading.value = false;
    }
  }
};

const getCensoredName = () => {
  let name =
    transaction.value?.address?.first_name_address +
    " " +
    transaction.value?.address?.last_name_address;
  if (name.trim() === "undefined undefined" || name.trim() === "")
    name =
      transaction.value?.user?.first_name +
      " " +
      transaction.value?.user?.last_name;
  if (!printSettings.value.censor_receiver_name) return name;
  return name
    .split(" ")
    .map((word) => {
      if (word.length <= 1) return word;
      return word.charAt(0) + "*".repeat(word.length - 1);
    })
    .join(" ");
};

const getItemsDescription = () => {
  if (!transaction.value?.details) return "-";
  return transaction.value.details
    .map((d) => {
      let desc = `${d.quantity}x ${d.product.name}`;
      if (printSettings.value.item_sku_shown && d.product.code)
        desc += ` (${d.product.code})`;
      return desc;
    })
    .join(", ");
};

// [PERBAIKAN] LOGIKA GENERATE PDF BARU
const generateAndDownloadPDF = () => {
  showPrintModal.value = false;
  isPreparingPDF.value = true; // Munculkan overlay dan template

  // Tunggu 1.5 detik agar overlay terlihat sempurna dan Barcode terload
  setTimeout(() => {
    const element = document.getElementById("print-label-template");

    let formatSetting = "a4";
    if (printSettings.value.paper_size === "thermal")
      formatSetting = [3.15, 3.93];
    if (printSettings.value.paper_size === "thermal2")
      formatSetting = [3.93, 5.9];

    const opt = {
      margin: 0.1,
      filename: `Resi-${transaction.value.order_id}.pdf`,
      image: { type: "jpeg", quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        scrollY: 0,
        scrollX: 0,
      },
      jsPDF: { unit: "in", format: formatSetting, orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        isPreparingPDF.value = false; // Sembunyikan setelah selesai
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Resi PDF berhasil diunduh.",
          confirmButtonColor: "#000",
        });
      })
      .catch((err) => {
        console.error("Error generating PDF:", err);
        isPreparingPDF.value = false;
        Swal.fire("Error", "Gagal memproses PDF", "error");
      });
  }, 1500);
};

const getGrandTotal = (trx) =>
  parseFloat(trx.total_amount) + parseFloat(trx.shipping_cost);
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
const formatStatus = (s) => (s ? s.replace(/_/g, " ") : "");
const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );
const formatDate = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "-";
const formatDateTime = (dateString) =>
  dateString
    ? new Date(dateString).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";

onMounted(fetchData);
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
input[type="checkbox"] {
  accent-color: #4a148c;
}
</style>
