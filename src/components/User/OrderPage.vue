<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-5xl min-h-screen">
    <h1 class="mb-10 font-serif text-gray-900 text-4xl uppercase tracking-tighter">My Orders</h1>

    <div v-if="loading" class="py-20 text-center">Loading orders...</div>
    
    <div v-else-if="transactions.length === 0" class="bg-white p-12 border rounded-2xl text-center">
      <p class="text-gray-400 italic">You haven't placed any orders yet.</p>
      <router-link to="/catalog" class="inline-block mt-4 font-bold text-black text-xs underline uppercase tracking-widest">Start Shopping</router-link>
    </div>

    <div v-else class="space-y-6">
      <div v-for="order in transactions" :key="order.id" class="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden">
        <div class="flex md:flex-row flex-col justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-b">
          <div>
            <p class="font-bold text-gray-400 text-xs uppercase tracking-widest">Order ID</p>
            <p class="font-mono text-sm">{{ order.order_id }}</p>
          </div>
          <div class="mt-4 md:mt-0 md:text-center">
            <p class="font-bold text-gray-400 text-xs uppercase tracking-widest">Date</p>
            <p class="text-sm">{{ formatDate(order.created_at) }}</p>
          </div>
          <div class="mt-4 md:mt-0 md:text-right">
            <span :class="statusClass(order.status)" class="px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div v-for="detail in order.details" :key="detail.id" class="flex items-center gap-4 py-4 border-gray-50 last:border-0 border-b">
            <img :src="detail.product.image" class="bg-gray-100 rounded-lg w-16 h-16 object-cover" />
            <div class="flex-grow">
              <h4 class="font-bold text-gray-900 text-sm uppercase">{{ detail.product.name }}</h4>
              <p class="text-gray-400 text-xs">{{ detail.quantity }} x {{ formatPrice(detail.price) }}</p>
            </div>
            <p class="font-bold text-gray-900 text-sm">{{ formatPrice(detail.quantity * detail.price) }}</p>
          </div>
        </div>

        <div class="flex justify-between items-center bg-gray-50/50 px-6 py-4 border-t">
          <p class="font-bold text-gray-400 text-xs uppercase tracking-widest">Total Amount</p>
          <p class="font-bold text-black text-xl">{{ formatPrice(order.total_amount) }} IDR</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from "../../config/api";

const transactions = ref([]);
const loading = ref(true);

const fetchOrders = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    transactions.value = res.data;
  } catch (err) {
    console.error("Failed fetch orders", err);
  } finally {
    loading.value = false;
  }
};

const statusClass = (status) => {
  const map = {
    pending: 'bg-amber-100 text-amber-600',
    processing: 'bg-blue-100 text-blue-600',
    completed: 'bg-green-100 text-green-600',
    cancelled: 'bg-red-100 text-red-600'
  };
  return map[status] || 'bg-gray-100';
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

onMounted(fetchOrders);
</script> -->

<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-5xl min-h-screen">
    <h1 class="mb-10 font-serif text-gray-900 text-4xl uppercase tracking-tighter">My Orders</h1>

    <div v-if="loading" class="space-y-6">
      <div v-for="n in 3" :key="n" class="bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse">
        <div class="flex justify-between items-center bg-gray-50 px-6 py-4">
          <div class="space-y-2">
            <div class="bg-gray-200 rounded w-16 h-3"></div>
            <div class="bg-gray-200 rounded w-32 h-4"></div>
          </div>
          <div class="bg-gray-200 rounded-full w-20 h-6"></div>
        </div>
        <div class="space-y-4 p-6">
          <div class="flex items-center gap-4 py-2">
            <div class="bg-gray-100 rounded-lg w-16 h-16"></div>
            <div class="flex-grow space-y-2">
              <div class="bg-gray-100 rounded w-1/2 h-4"></div>
              <div class="bg-gray-100 rounded w-1/4 h-3"></div>
            </div>
            <div class="bg-gray-100 rounded w-20 h-4"></div>
          </div>
        </div>
        <div class="flex justify-between items-center bg-gray-50/50 px-6 py-4 border-gray-50 border-t">
          <div class="bg-gray-200 rounded w-20 h-3"></div>
          <div class="bg-gray-200 rounded w-32 h-6"></div>
        </div>
      </div>
    </div>
    
    <div v-else-if="transactions.length === 0" class="bg-white p-12 border rounded-2xl text-center animate-fade-in">
      <div class="flex justify-center mb-6">
         <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
         </svg>
      </div>
      <p class="text-gray-400 italic">You haven't placed any orders yet.</p>
      <router-link to="/catalog" class="inline-block mt-6 font-bold text-black hover:text-gray-500 text-xs underline uppercase tracking-widest transition-colors">Start Shopping</router-link>
    </div>

    <div v-else class="space-y-6 animate-fade-in">
      <div v-for="order in transactions" :key="order.id" class="bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-shadow duration-300">
        <div class="flex md:flex-row flex-col justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-b">
          <div>
            <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]">Order ID</p>
            <p class="font-mono font-bold text-gray-800 text-sm">{{ order.order_id }}</p>
          </div>
          <div class="mt-4 md:mt-0 md:text-center">
            <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]">Date</p>
            <p class="text-gray-600 text-sm">{{ formatDate(order.created_at) }}</p>
          </div>
          <div class="mt-4 md:mt-0 md:text-right">
            <span :class="statusClass(order.status)" class="px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">
              {{ order.status }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div v-for="detail in order.details" :key="detail.id" class="group flex items-center gap-4 py-4 border-gray-50 last:border-0 border-b">
            <img :src="detail.product.image" class="bg-gray-100 shadow-sm rounded-lg w-16 h-16 object-cover group-hover:scale-105 transition-transform" />
            <div class="flex-grow">
              <h4 class="font-bold text-gray-900 text-sm uppercase tracking-tight">{{ detail.product.name }}</h4>
              <p class="text-gray-400 text-xs">{{ detail.quantity }} x {{ formatPrice(detail.price) }}</p>
            </div>
            <p class="font-bold text-gray-900 text-sm">{{ formatPrice(detail.quantity * detail.price) }}</p>
          </div>
        </div>

        <div class="flex justify-between items-center bg-gray-50/50 px-6 py-4 border-t">
          <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]">Total Amount</p>
          <p class="font-bold text-black text-xl">{{ formatPrice(order.total_amount) }} <span class="font-normal text-gray-400 text-xs">IDR</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from "../../config/api";

const transactions = ref([]);
const loading = ref(true);

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    transactions.value = res.data;
  } catch (err) {
    console.error("Failed fetch orders", err);
  } finally {
    // Memberikan sedikit delay (600ms) agar transisi skeleton ke data tidak terasa "flicker"
    setTimeout(() => {
      loading.value = false;
    }, 600);
  }
};

const statusClass = (status) => {
  const map = {
    pending: 'bg-amber-50 text-amber-600 border border-amber-100',
    processing: 'bg-blue-50 text-blue-600 border border-blue-100',
    completed: 'bg-green-50 text-green-600 border border-green-100',
    cancelled: 'bg-red-50 text-red-600 border border-red-100'
  };
  return map[status] || 'bg-gray-100';
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);
const formatDate = (date) => new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

onMounted(fetchOrders);
</script>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> -->

<!-- Sebelum Timer untuk Expired -->
<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-5xl min-h-screen">
    <h1
      class="mb-10 font-serif text-gray-900 text-4xl uppercase tracking-tighter"
    >
      My Orders
    </h1>

    <div v-if="loading" class="space-y-6">
      <div class="bg-gray-100 h-40 rounded-2xl animate-pulse"></div>
    </div>

    <div
      v-else-if="transactions.length === 0"
      class="bg-white p-12 border rounded-2xl text-center animate-fade-in"
    >
      <p class="text-gray-400 italic">You haven't placed any orders yet.</p>
      <router-link
        to="/catalog"
        class="inline-block mt-6 font-bold text-black underline uppercase tracking-widest"
        >Start Shopping</router-link
      >
    </div>

    <div v-else class="space-y-8 animate-fade-in">
      <div
        v-for="order in transactions"
        :key="order.id"
        class="bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-shadow duration-300 relative"
      >
        <div
          class="flex md:flex-row flex-col justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-b"
        >
          <div>
            <p
              class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]"
            >
              Order ID
            </p>
            <p class="font-mono font-bold text-gray-800 text-sm">
              {{ order.order_id }}
            </p>
          </div>
          <div class="mt-2 md:mt-0 text-right">
            <span
              :class="statusClass(order.status)"
              class="px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter"
            >
              {{ formatStatus(order.status) }}
            </span>
          </div>
        </div>

        <div
          @click="handleOrderClick(order)"
          :class="[
            'p-6',
            canPay(order.status)
              ? 'cursor-pointer hover:bg-blue-50/30 transition-colors'
              : '',
          ]"
        >
          <div
            v-if="canPay(order.status)"
            class="mb-4 text-blue-600 text-xs text-center uppercase tracking-widest animate-pulse"
          >
            Tap here to complete payment
          </div>

          <div
            v-for="detail in order.details"
            :key="detail.id"
            class="flex items-center gap-4 py-4 border-gray-50 last:border-0 border-b"
          >
            <img
              :src="detail.product.image"
              class="bg-gray-100 shadow-sm rounded-lg w-16 h-16 object-cover"
            />
            <div class="flex-grow">
              <h4 class="font-bold text-gray-900 text-sm uppercase">
                {{ detail.product.name }}
              </h4>
              <p class="text-gray-400 text-xs">
                {{ detail.quantity }} x {{ formatPrice(detail.price) }}
              </p>
            </div>
            <p class="font-bold text-gray-900 text-sm">
              {{ formatPrice(detail.quantity * detail.price) }}
            </p>
          </div>
        </div>

        <div class="bg-gray-50/50 px-6 py-4 border-t">
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div>
              <p
                class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]"
              >
                Total Amount
              </p>
              <p class="font-bold text-black text-xl">
                {{ formatPrice(order.total_amount) }}
              </p>
            </div>

            <div class="flex gap-3">
              <button
                v-if="canPay(order.status)"
                @click="cancelOrder(order.id)"
                class="hover:bg-red-50 px-6 py-2 border border-red-200 rounded-xl font-bold text-red-600 text-xs uppercase tracking-widest transition"
              >
                Cancel Order
              </button>

              <button
                v-if="canPay(order.status)"
                @click="redirectToPayment(order)"
                class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition"
              >
                Pay Now
              </button>

              <button
                v-if="order.status === 'processing'"
                @click="confirmReceived(order.id)"
                class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition"
              >
                Order Received
              </button>

              <button
                v-if="['completed', 'processing'].includes(order.status)"
                @click="requestRefund(order.id)"
                class="hover:bg-gray-100 px-6 py-2 border border-gray-300 rounded-xl font-bold text-gray-600 text-xs uppercase tracking-widest transition"
              >
                Request Refund
              </button>

              <div
                v-if="order.status === 'refund_requested'"
                class="bg-amber-100 px-4 py-2 rounded-xl text-amber-700 text-xs font-bold"
              >
                Waiting Admin Confirmation
              </div>

              <div
                v-if="order.status === 'refund_manual_required'"
                class="bg-pink-100 px-4 py-2 rounded-xl text-pink-700 text-xs font-bold"
              >
                Process via Manual Transfer (Contact Admin)
              </div>

              <button
                v-if="order.status === 'refund_approved'"
                @click="processRefund(order.id)"
                class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition"
              >
                Refund Now
              </button>

              <div
                v-if="order.status === 'refund_rejected'"
                class="text-red-500 text-xs font-bold italic"
              >
                Refund Request Rejected
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

const transactions = ref([]);
const loading = ref(true);

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    transactions.value = res.data;
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 600);
  }
};

// Helper: Cek status apakah user masih bisa bayar
const canPay = (status) => ["awaiting_payment", "pending"].includes(status);

// Logic Redirect ke Xendit (Nomor 1 & 2)
const handleOrderClick = (order) => {
  if (canPay(order.status)) {
    redirectToPayment(order);
  }
};

const redirectToPayment = (order) => {
  if (order.payment && order.payment.checkout_url) {
    window.location.href = order.payment.checkout_url;
  } else {
    Swal.fire("Error", "Payment URL not found", "error");
  }
};

// Logic Cancel (Nomor 3)
const cancelOrder = async (id) => {
  const result = await Swal.fire({
    title: "Cancel Order?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/transactions/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
      fetchOrders();
    } catch (err) {
      Swal.fire("Error", "Failed to cancel order", "error");
    }
  }
};

// Logic Confirm Complete (Nomor 5)
const confirmReceived = async (id) => {
  const result = await Swal.fire({
    title: "Confirm Receipt",
    text: "Have you received your items?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, I have!",
  });

  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/transactions/${id}/confirm`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      fetchOrders();
      Swal.fire("Completed!", "Thank you for shopping with us.", "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message, "error");
    }
  }
};

// Logic Request Refund (Nomor 6)
const requestRefund = async (id) => {
  const { value: text } = await Swal.fire({
    title: "Request Refund",
    input: "textarea",
    inputLabel: "Reason for refund",
    inputPlaceholder: "Type your reason here...",
    inputAttributes: { "aria-label": "Type your reason here" },
    showCancelButton: true,
    confirmButtonColor: "#000",
  });

  if (text) {
    try {
      await axios.post(
        `${BASE_URL}/transactions/${id}/refund-request`,
        { reason: text },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      fetchOrders();
      Swal.fire("Requested", "Refund request sent to admin.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to request refund", "error");
    }
  }
};

// Logic Process Refund (Refund Now button)
const processRefund = async (id) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/transactions/${id}/refund-process`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    fetchOrders();
    Swal.fire("Refunded", res.data.message, "success");
  } catch (err) {
    Swal.fire("Error", "Refund process failed", "error");
  }
};

const formatStatus = (status) => status.replace(/_/g, " ");

const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700", // Nomor 1
    pending: "bg-orange-100 text-orange-700", // Nomor 2
    processing: "bg-blue-100 text-blue-700", // Nomor 4
    completed: "bg-green-100 text-green-700", // Nomor 5
    cancelled: "bg-red-100 text-red-700", // Nomor 3
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
    day: "numeric",
    month: "short",
    year: "numeric",
  });

onMounted(fetchOrders);
</script>

<!-- Sesudah Timer untuk Expired -->
<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-5xl min-h-screen">
    <h1
      class="mb-10 font-serif text-gray-900 text-4xl uppercase tracking-tighter"
    >
      Track My Orders
    </h1>

    <div v-if="loading" class="space-y-6">
      <div class="bg-gray-100 h-40 rounded-2xl animate-pulse"></div>
    </div>

    <div
      v-else-if="transactions.length === 0"
      class="bg-white p-12 border rounded-2xl text-center animate-fade-in"
    >
      <p class="text-gray-400 italic">You haven't placed any orders yet.</p>
      <router-link
        to="/catalog"
        class="inline-block mt-6 font-bold text-black underline uppercase tracking-widest"
        >Start Shopping</router-link
      >
    </div>

    <div v-else class="space-y-8 animate-fade-in">
      <div
        v-for="order in transactions"
        :key="order.id"
        class="bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-shadow duration-300 relative"
      >

        <div
          class="flex md:flex-row flex-col justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-b"
        >
          <div>
            <div class="flex items-center gap-3">
              <p
                class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]"
              >
                Order ID
              </p>
              <span
                v-if="order.payment_method"
                class="bg-gray-200 text-gray-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest"
              >
                {{ order.payment_method.replace("_", " ") }}
              </span>
            </div>
            <p class="font-mono font-bold text-gray-800 text-sm mt-0.5">
              {{ order.order_id }}
            </p>
          </div>
          <div class="mt-2 md:mt-0 text-right">
            <span
              :class="statusClass(order.status)"
              class="px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter"
            >
              {{ formatStatus(order.status) }}
            </span>
          </div>
        </div>

        <div
          @click="handleOrderClick(order)"
          :class="[
            'p-6',
            canPay(order.status) && countdowns[order.id] !== 'Expired'
              ? 'cursor-pointer hover:bg-blue-50/30 transition-colors'
              : '',
          ]"
        >
          <div
            v-if="canPay(order.status) && countdowns[order.id] !== 'Expired'"
            class="mb-4 text-blue-600 text-xs text-center uppercase tracking-widest animate-pulse"
          >
            Tap here to complete payment
          </div>

          <div
            v-for="detail in order.details"
            :key="detail.id"
            class="flex items-center gap-4 py-4 border-gray-50 last:border-0 border-b"
          >
            <img
              :src="detail.product.image"
              class="bg-gray-100 shadow-sm rounded-lg w-16 h-16 object-cover"
            />
            <div class="flex-grow">
              <h4 class="font-bold text-gray-900 text-sm uppercase">
                {{ detail.product.name }}
              </h4>
              <p class="text-gray-400 text-xs">
                {{ detail.quantity }} x {{ formatPrice(detail.price) }}
              </p>
            </div>
            <p class="font-bold text-gray-900 text-sm">
              {{ formatPrice(detail.quantity * detail.price) }}
            </p>
          </div>
        </div>

        <div class="bg-gray-50/50 px-6 py-4 border-t">
          <div
            class="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <div>
              <p
                class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]"
              >
                Total Amount
              </p>
              <p class="font-bold text-black text-xl">
                {{ formatPrice(order.total_amount) }}
              </p>
            </div>

            <div class="flex flex-col md:flex-row items-center gap-4">
              <div
                v-if="canPay(order.status) && order.payment"
                class="flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-red-500 animate-pulse"
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
                <span class="font-mono font-bold text-red-500 text-sm">
                  {{ countdowns[order.id] }}
                </span>
              </div>

              <div class="flex gap-3">
                <button
                  v-if="canPay(order.status)"
                  @click="cancelOrder(order.id)"
                  class="hover:bg-red-50 px-6 py-2 border border-red-200 rounded-xl font-bold text-red-600 text-xs uppercase tracking-widest transition"
                >
                  Cancel Order
                </button>

                <button
                  v-if="canPay(order.status)"
                  @click="redirectToPayment(order)"
                  :disabled="countdowns[order.id] === 'Expired'"
                  class="bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition"
                >
                  Pay Now
                </button>

                <button
                  v-if="order.status === 'processing'"
                  @click="confirmReceived(order.id)"
                  class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition"
                >
                  Order Received
                </button>

                <button
                  v-if="
                    ['processing', 'completed'].includes(order.status) &&
                    order.shipping_method === 'biteship'
                  "
                  @click="
                    $router.push({
                      path: `/tracking/${order.id}`,
                      state: { paymentMethod: order.payment_method },
                    })
                  "
                  class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition"
                >
                  Track Order
                </button>

                <button
                  v-if="['completed', 'processing'].includes(order.status)"
                  @click="requestRefund(order.id)"
                  class="hover:bg-gray-100 px-6 py-2 border border-gray-300 rounded-xl font-bold text-gray-600 text-xs uppercase tracking-widest transition"
                >
                  Request Refund
                </button>

                <div
                  v-if="order.status === 'refund_requested'"
                  class="bg-amber-100 px-4 py-2 rounded-xl text-amber-700 text-xs font-bold"
                >
                  Waiting Admin Confirmation
                </div>

                <div
                  v-if="order.status === 'refund_manual_required'"
                  class="bg-pink-100 px-4 py-2 rounded-xl text-pink-700 text-xs font-bold"
                >
                  Process via Manual Transfer (Contact Admin)
                </div>

                <button
                  v-if="order.status === 'refund_approved'"
                  @click="processRefund(order.id)"
                  class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition"
                >
                  Refund Now
                </button>

                <div
                  v-if="order.status === 'refund_rejected'"
                  class="text-red-500 text-xs font-bold italic"
                >
                  Refund Request Rejected
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted, onUnmounted } from "vue";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api";

// const transactions = ref([]);
// const loading = ref(true);

// // State untuk menyimpan waktu hitung mundur setiap order
// const countdowns = ref({});
// let timerInterval = null;

// // Fungsi untuk menghitung sisa waktu (Berdasarkan 24 Jam Xendit Default)
// const calculateTimeLeft = (createdAt) => {
//   // Tambah 24 Jam (24 * 60 * 60 * 1000 ms) ke waktu invoice dibuat
//   const expiryTime = new Date(createdAt).getTime() + 86400000;
//   const now = new Date().getTime();
//   const diff = expiryTime - now;

//   if (diff <= 0) return "Expired";

//   // Kalkulasi Jam, Menit, Detik
//   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//   // Format menjadi HH:MM:SS
//   return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
// };

// // Fungsi untuk memulai loop timer
// const startTimers = () => {
//   timerInterval = setInterval(() => {
//     transactions.value.forEach((order) => {
//       // Hanya hitung jika status pending/awaiting payment dan ada data pembayaran
//       if (canPay(order.status) && order.payment?.created_at) {
//         countdowns.value[order.id] = calculateTimeLeft(
//           order.payment.created_at,
//         );
//       }
//     });
//   }, 1000);
// };

// const fetchOrders = async () => {
//   loading.value = true;
//   try {
//     const res = await axios.get(`${BASE_URL}/transactions`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     transactions.value = res.data;

//     // Mulai timer setelah data berhasil di-fetch
//     startTimers();
//   } catch (err) {
//     console.error(err);
//   } finally {
//     setTimeout(() => {
//       loading.value = false;
//     }, 600);
//   }
// };

// const canPay = (status) => ["awaiting_payment", "pending"].includes(status);

// const handleOrderClick = (order) => {
//   if (canPay(order.status) && countdowns.value[order.id] !== "Expired") {
//     redirectToPayment(order);
//   }
// };

// const redirectToPayment = (order) => {
//   if (order.payment && order.payment.checkout_url) {
//     window.location.href = order.payment.checkout_url;
//   } else {
//     Swal.fire("Error", "Payment URL not found", "error");
//   }
// };

// const cancelOrder = async (id) => {
//   const result = await Swal.fire({
//     title: "Cancel Order?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#000",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, cancel it!",
//   });

//   if (result.isConfirmed) {
//     try {
//       await axios.post(
//         `${BASE_URL}/transactions/${id}/cancel`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         },
//       );
//       Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
//       fetchOrders();
//     } catch (err) {
//       Swal.fire("Error", "Failed to cancel order", "error");
//     }
//   }
// };

// const confirmReceived = async (id) => {
//   const result = await Swal.fire({
//     title: "Confirm Receipt",
//     text: "Have you received your items?",
//     icon: "question",
//     showCancelButton: true,
//     confirmButtonColor: "#000",
//     confirmButtonText: "Yes, I have!",
//   });

//   if (result.isConfirmed) {
//     try {
//       await axios.post(
//         `${BASE_URL}/transactions/${id}/confirm`,
//         {},
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         },
//       );
//       fetchOrders();
//       Swal.fire("Completed!", "Thank you for shopping with us.", "success");
//     } catch (err) {
//       Swal.fire("Error", err.response?.data?.message, "error");
//     }
//   }
// };

// const requestRefund = async (id) => {
//   const { value: text } = await Swal.fire({
//     title: "Request Refund",
//     input: "textarea",
//     inputLabel: "Reason for refund",
//     inputPlaceholder: "Type your reason here...",
//     inputAttributes: { "aria-label": "Type your reason here" },
//     showCancelButton: true,
//     confirmButtonColor: "#000",
//   });

//   if (text) {
//     try {
//       await axios.post(
//         `${BASE_URL}/transactions/${id}/refund-request`,
//         { reason: text },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         },
//       );
//       fetchOrders();
//       Swal.fire("Requested", "Refund request sent to admin.", "success");
//     } catch (err) {
//       Swal.fire("Error", "Failed to request refund", "error");
//     }
//   }
// };

// const processRefund = async (id) => {
//   try {
//     const res = await axios.post(
//       `${BASE_URL}/transactions/${id}/refund-process`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       },
//     );
//     fetchOrders();
//     Swal.fire("Refunded", res.data.message, "success");
//   } catch (err) {
//     Swal.fire("Error", "Refund process failed", "error");
//   }
// };

// const formatStatus = (status) => status.replace(/_/g, " ");

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
//   };
//   return map[status] || "bg-gray-100 text-gray-500";
// };

// const formatPrice = (v) =>
//   new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
//     v,
//   );
// const formatDate = (date) =>
//   new Date(date).toLocaleDateString("id-ID", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

// onMounted(fetchOrders);

// // Pastikan untuk membersihkan interval saat user pindah halaman agar tidak bocor memori (Memory Leak)
// onUnmounted(() => {
//   if (timerInterval) clearInterval(timerInterval);
// });

import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";
import { useRouter } from "vue-router"; // [BARU] Import useRouter

const router = useRouter(); // [BARU] Inisialisasi router
const transactions = ref([]);
const loading = ref(true);

const countdowns = ref({});
let timerInterval = null;

const calculateTimeLeft = (createdAt) => {
  const expiryTime = new Date(createdAt).getTime() + 86400000; // +24 Jam
  const now = new Date().getTime();
  const diff = expiryTime - now;

  if (diff <= 0) return "Expired";

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const startTimers = () => {
  timerInterval = setInterval(() => {
    transactions.value.forEach((order) => {
      if (canPay(order.status)) {
        // [PERBAIKAN] Jika sudah 'pending' pakai waktu invoice Xendit.
        // Jika masih 'awaiting_payment' (belum ada invoice), pakai waktu transaksi dibuat.
        const timeReference = order.payment?.created_at || order.created_at;
        countdowns.value[order.id] = calculateTimeLeft(timeReference);
      }
    });
  }, 1000);
};

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    transactions.value = res.data;
    startTimers();
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 600);
  }
};

const canPay = (status) => ["awaiting_payment", "pending"].includes(status);

const handleOrderClick = (order) => {
  if (canPay(order.status) && countdowns.value[order.id] !== "Expired") {
    redirectToPayment(order);
  }
};

// [PERBAIKAN] Logika Redirect dipisah berdasarkan status
const redirectToPayment = (order) => {
  if (order.status === "awaiting_payment") {
    // 1. Belum pilih alamat & kurir -> Arahkan ke PaymentPage
    router.push(`/payment/${order.id}`);
  } else if (order.status === "pending" && order.payment?.checkout_url) {
    // 2. Sudah pilih kurir (Invoice Xendit sudah ada) -> Arahkan ke Xendit
    window.location.href = order.payment.checkout_url;
  } else {
    // 3. Fallback jika ada yang salah
    Swal.fire("Error", "Payment URL not found or invalid status", "error");
  }
};

const cancelOrder = async (id) => {
  // ... (Logika Cancel tetap persis sama)
  const result = await Swal.fire({
    title: "Cancel Order?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, cancel it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/transactions/${id}/cancel`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
      fetchOrders();
    } catch (err) {
      Swal.fire("Error", "Failed to cancel order", "error");
    }
  }
};

const confirmReceived = async (id) => {
  // ... (Logika Confirm tetap persis sama)
  const result = await Swal.fire({
    title: "Confirm Receipt",
    text: "Have you received your items?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, I have!",
  });

  if (result.isConfirmed) {
    try {
      await axios.post(
        `${BASE_URL}/transactions/${id}/confirm`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      fetchOrders();
      Swal.fire("Completed!", "Thank you for shopping with us.", "success");
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message, "error");
    }
  }
};

const requestRefund = async (id) => {
  // ... (Logika Request Refund tetap persis sama)
  const { value: text } = await Swal.fire({
    title: "Request Refund",
    input: "textarea",
    inputLabel: "Reason for refund",
    inputPlaceholder: "Type your reason here...",
    showCancelButton: true,
    confirmButtonColor: "#000",
  });

  if (text) {
    try {
      await axios.post(
        `${BASE_URL}/transactions/${id}/refund-request`,
        { reason: text },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      fetchOrders();
      Swal.fire("Requested", "Refund request sent to admin.", "success");
    } catch (err) {
      Swal.fire("Error", "Failed to request refund", "error");
    }
  }
};

const processRefund = async (id) => {
  // ... (Logika Process Refund tetap persis sama)
  try {
    const res = await axios.post(
      `${BASE_URL}/transactions/${id}/refund-process`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    fetchOrders();
    Swal.fire("Refunded", res.data.message, "success");
  } catch (err) {
    Swal.fire("Error", "Refund process failed", "error");
  }
};

const formatStatus = (status) => status.replace(/_/g, " ");

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
    day: "numeric",
    month: "short",
    year: "numeric",
  });

onMounted(fetchOrders);

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});
</script> -->

<template>
  <div class="mx-auto px-6 py-20 max-w-5xl min-h-screen">
    <h1 class="mb-10 font-serif text-gray-900 text-4xl uppercase tracking-tighter">Track My Orders</h1>

    <div v-if="loading" class="space-y-6">
      <div class="bg-gray-100 h-40 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else-if="transactions.length === 0" class="bg-white p-12 border rounded-2xl text-center animate-fade-in">
      <p class="text-gray-400 italic">You haven't placed any orders yet.</p>
      <router-link to="/catalog" class="inline-block mt-6 font-bold text-black underline uppercase tracking-widest">Start Shopping</router-link>
    </div>

    <div v-else class="space-y-8 animate-fade-in">
      <div v-for="order in transactions" :key="order.id" class="bg-white shadow-sm hover:shadow-md border border-gray-100 rounded-2xl overflow-hidden transition-shadow duration-300 relative">
        
        <div class="flex md:flex-row flex-col justify-between items-start md:items-center bg-gray-50 px-6 py-4 border-b gap-4">
          
          <div class="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div>
              <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">Order ID</p>
              <p class="font-mono font-bold text-gray-800 text-sm">{{ order.order_id }}</p>
            </div>

            <div>
              <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-1">Date</p>
              <p class="font-bold text-gray-800 text-xs">{{ formatDateTime(order.created_at) }}</p>
            </div>

            <div class="md:hidden mt-2">
               <span :class="statusClass(order.status)" class="px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">
                {{ formatStatus(order.status) }}
              </span>
            </div>
          </div>

          <div class="hidden md:block text-right">
            <span :class="statusClass(order.status)" class="px-4 py-1 rounded-full font-bold text-[10px] uppercase tracking-tighter">
              {{ formatStatus(order.status) }}
            </span>
          </div>
        </div>

        <div class="bg-white px-6 py-4 border-b flex flex-col md:flex-row gap-6 md:gap-12">
          
          <div class="flex-1">
            <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">Payment Info</p>
            <div v-if="order.payment_method" class="flex items-center gap-3">
              <div class="w-12 h-8 bg-gray-50 border border-gray-100 rounded flex justify-center items-center overflow-hidden shrink-0">
                <img v-if="getPaymentLogo(order.payment_method)" :src="getPaymentLogo(order.payment_method)" class="w-full h-full object-contain p-1" />
                <span v-else class="font-black text-gray-300 text-[8px]">{{ order.payment_method.split(' ')[1] || 'PAY' }}</span>
              </div>
              <div>
                <p class="font-bold text-gray-800 text-xs uppercase">{{ order.payment_method.replace('_', ' ') }}</p>
                <p class="text-[10px] text-green-600 font-bold mt-0.5" v-if="!canPay(order.status) && order.status !== 'cancelled'">PAID</p>
                <p class="text-[10px] text-orange-500 font-bold mt-0.5" v-else-if="canPay(order.status)">UNPAID</p>
              </div>
            </div>
            <p v-else class="text-xs text-gray-400 italic">Waiting for payment selection...</p>
          </div>

          <div class="flex-1">
             <p class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3">Shipping Info</p>
             <div v-if="order.shipping_method === 'free'" class="flex items-center gap-3">
                <div class="w-12 h-12 bg-black text-white rounded-lg flex justify-center items-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                </div>
                <div>
                  <p class="font-bold text-gray-800 text-xs uppercase">Internal Courier</p>
                  <p class="text-[10px] text-gray-500 mt-0.5">Free Shipping - Next Day</p>
                </div>
             </div>
             
             <div v-else-if="order.shipping_method === 'biteship' && order.courier_company" class="flex items-center gap-3">
                <div class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex justify-center items-center overflow-hidden shrink-0">
                  <img v-if="getCourierLogo(order.courier_company)" :src="getCourierLogo(order.courier_company)" class="w-full h-full object-contain p-1" />
                  <span v-else class="font-black text-gray-300 text-xs">{{ order.courier_company.toUpperCase() }}</span>
                </div>
                <div>
                  <p class="font-bold text-gray-800 text-xs uppercase">{{ order.courier_company }} - {{ order.courier_type }}</p>
                  <p class="text-[10px] text-gray-500 mt-0.5">Resi: <span class="font-mono font-bold text-black">{{ order.tracking_number || 'Waiting...' }}</span></p>
                </div>
             </div>

             <div v-else class="text-xs text-gray-400 italic">
               Setup shipping at checkout
             </div>
          </div>
        </div>

        <div 
          @click="handleOrderClick(order)"
          :class="['px-6 py-2', canPay(order.status) && countdowns[order.id] !== 'Expired' ? 'cursor-pointer hover:bg-blue-50/30 transition-colors' : '']"
        >
          <div v-if="canPay(order.status) && countdowns[order.id] !== 'Expired'" class="my-3 text-blue-600 text-[10px] text-center uppercase tracking-widest animate-pulse font-bold bg-blue-50 py-2 rounded-lg">
            Tap anywhere here to complete payment
          </div>

          <div v-for="detail in order.details" :key="detail.id" class="flex items-center gap-4 py-4 border-gray-50 last:border-0 border-b">
            <img :src="detail.product.image" class="bg-gray-100 shadow-sm rounded-lg w-16 h-16 object-cover" />
            <div class="flex-grow">
              <h4 class="font-bold text-gray-900 text-sm uppercase">{{ detail.product.name }}</h4>
              <p class="text-gray-400 text-xs">{{ detail.quantity }} x {{ formatPrice(detail.price) }}</p>
            </div>
            <p class="font-bold text-gray-900 text-sm">{{ formatPrice(detail.quantity * detail.price) }}</p>
          </div>
        </div>

        <div class="bg-gray-50/50 px-6 py-4 border-t">
          
          <div class="flex flex-col mb-4 space-y-1 pb-4 border-b border-gray-200">
             <div class="flex justify-between text-xs text-gray-500">
               <span>Subtotal for Products</span>
               <span>{{ formatPrice(getSubtotal(order)) }}</span>
             </div>
             <div class="flex justify-between text-xs text-gray-500">
               <span>Shipping Subtotal ({{ order.shipping_cost > 0 ? formatPrice(order.shipping_cost / getOrderQuantity(order)) + ' x ' + getOrderQuantity(order) : 'Free' }})</span>
               <span>{{ formatPrice(order.shipping_cost) }}</span>
             </div>
             <div class="flex justify-between text-sm font-bold text-gray-900 mt-2 pt-2 border-t border-gray-200 border-dashed">
               <span class="uppercase tracking-widest text-[10px] mt-1">Final Amount</span>
               <span class="text-lg">{{ formatPrice(getGrandTotal(order)) }}</span>
             </div>
          </div>

          <div class="flex flex-col md:flex-row justify-between items-center gap-4">
            <div class="w-full md:w-auto text-left">
              <div v-if="canPay(order.status) && order.payment" class="flex items-center gap-2 justify-center md:justify-start">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-red-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span class="font-mono font-bold text-red-500 text-sm">{{ countdowns[order.id] }}</span>
              </div>
            </div>

            <div class="flex flex-wrap justify-center md:justify-end gap-3 w-full md:w-auto">
              <button v-if="canPay(order.status)" @click="cancelOrder(order.id)" class="hover:bg-red-50 px-6 py-2 border border-red-200 rounded-xl font-bold text-red-600 text-xs uppercase tracking-widest transition w-full md:w-auto">Cancel</button>
              <button v-if="canPay(order.status)" @click="redirectToPayment(order)" :disabled="countdowns[order.id] === 'Expired'" class="bg-black hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition w-full md:w-auto">Pay Now</button>
              
              <button v-if="order.status === 'processing'" @click="confirmReceived(order.id)" class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition w-full md:w-auto">Order Received</button>
              
              <button v-if="['processing', 'completed'].includes(order.status) && order.shipping_method === 'biteship'" @click="$router.push({ path: `/tracking/${order.id}`, state: { paymentMethod: order.payment_method } })" class="bg-black hover:bg-gray-800 px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition w-full md:w-auto">Track Order</button>
              
              <button v-if="['completed', 'processing'].includes(order.status)" @click="requestRefund(order.id)" class="hover:bg-gray-100 px-6 py-2 border border-gray-300 rounded-xl font-bold text-gray-600 text-xs uppercase tracking-widest transition w-full md:w-auto">Refund</button>
              
              <div v-if="order.status === 'refund_requested'" class="bg-amber-100 px-4 py-2 rounded-xl text-amber-700 text-xs font-bold w-full md:w-auto text-center">Waiting Admin</div>
              <div v-if="order.status === 'refund_manual_required'" class="bg-pink-100 px-4 py-2 rounded-xl text-pink-700 text-xs font-bold w-full md:w-auto text-center">Manual Refund</div>
              <button v-if="order.status === 'refund_approved'" @click="processRefund(order.id)" class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold text-white text-xs uppercase tracking-widest transition w-full md:w-auto">Refund Now</button>
              <div v-if="order.status === 'refund_rejected'" class="text-red-500 text-xs font-bold italic w-full md:w-auto text-center">Refund Rejected</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";
import { useRouter } from "vue-router"; 

const router = useRouter(); 
const transactions = ref([]);
const loading = ref(true);

const countdowns = ref({});
let timerInterval = null;

// Helper Logo Kurir
const getCourierLogo = (company) => {
  if(!company) return null;
  const baseUrl = "/courier_images/"; // Pastikan file gambar ada
  const map = {
    'jne': "jne.png", 'sicepat': "sicepat.png", 'jnt': "jnt.png",
    'anteraja': "anteraja.png", 'gojek': "gojek.png", 'grab': "grab.png",
    'paxel': "paxel.png", 'ninja': "ninja.png",
  };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
};

// Helper Logo Bank/Payment (Ekspektasi format dari Xendit: "BANK_TRANSFER BCA" atau "EWALLET OVO")
const getPaymentLogo = (methodString) => {
  if(!methodString) return null;
  const channel = methodString.split(' ')[1]?.toLowerCase();
  if(!channel) return null;
  
  const baseUrl = "/payment_images/"; // Silakan buat folder ini dan isi dengan logo bank
  const map = {
    'bca': 'bca.png', 'bni': 'bni.png', 'bri': 'bri.png', 'mandiri': 'mandiri.png', 'bsi': 'bsi.png', 'permata': 'permata.png',
    'ovo': 'ovo.png', 'dana': 'dana.png', 'linkaja': 'linkaja.png', 'shopeepay': 'shopeepay.png',
    'alfamart': 'alfamart.png', 'indomaret': 'indomaret.png',
    'qris': 'qris.png'
  };
  return map[channel] ? baseUrl + map[channel] : null;
};

// Kalkulasi Harga Helper
const getSubtotal = (order) => {
  // return order.total_amount - parseFloat(order.shipping_cost || 0);
  return order.total_amount;
};

// const getGrandTotal = (order) => {
//   return order.total_amount + order.shipping_cost;
// }

const getGrandTotal = (order) => {
  console.log(`ID: ${order.order_id} | Total:`, order.total_amount, "| Shipping:", order.shipping_cost);
  
  const total = parseFloat(order.total_amount || 0);
  const shipping = parseFloat(order.shipping_cost || 0);
  
  return total + shipping;
}

const getOrderQuantity = (order) => {
  return order.details.reduce((sum, item) => sum + item.quantity, 0);
};

const calculateTimeLeft = (createdAt) => {
  const expiryTime = new Date(createdAt).getTime() + 86400000; // +24 Jam
  const now = new Date().getTime();
  const diff = expiryTime - now;

  if (diff <= 0) return "Expired";

  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

const startTimers = () => {
  timerInterval = setInterval(() => {
    transactions.value.forEach((order) => {
      if (canPay(order.status)) {
        const timeReference = order.payment?.created_at || order.created_at;
        countdowns.value[order.id] = calculateTimeLeft(timeReference);
      }
    });
  }, 1000);
};

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/transactions`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    transactions.value = res.data;
    startTimers();
  } catch (err) {
    console.error(err);
  } finally {
    setTimeout(() => { loading.value = false; }, 600);
  }
};

const canPay = (status) => ["awaiting_payment", "pending"].includes(status);

const handleOrderClick = (order) => {
  if (canPay(order.status) && countdowns.value[order.id] !== "Expired") {
    redirectToPayment(order);
  }
};

const redirectToPayment = (order) => {
  if (order.status === "awaiting_payment") {
    router.push(`/payment/${order.id}`);
  } else if (order.status === "pending" && order.payment?.checkout_url) {
    window.location.href = order.payment.checkout_url;
  } else {
    Swal.fire("Error", "Payment URL not found or invalid status", "error");
  }
};

// ... (Sisa fungsi API Cancel, Confirm, Refund tetap sama persis)
const cancelOrder = async (id) => {
  const result = await Swal.fire({ title: "Cancel Order?", text: "You won't be able to revert this!", icon: "warning", showCancelButton: true, confirmButtonColor: "#000", cancelButtonColor: "#d33", confirmButtonText: "Yes, cancel it!" });
  if (result.isConfirmed) {
    try {
      await axios.post(`${BASE_URL}/transactions/${id}/cancel`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      Swal.fire("Cancelled!", "Your order has been cancelled.", "success");
      fetchOrders();
    } catch (err) { Swal.fire("Error", "Failed to cancel order", "error"); }
  }
};

const confirmReceived = async (id) => {
  const result = await Swal.fire({ title: "Confirm Receipt", text: "Have you received your items?", icon: "question", showCancelButton: true, confirmButtonColor: "#000", confirmButtonText: "Yes, I have!" });
  if (result.isConfirmed) {
    try {
      await axios.post(`${BASE_URL}/transactions/${id}/confirm`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      fetchOrders();
      Swal.fire("Completed!", "Thank you for shopping with us.", "success");
    } catch (err) { Swal.fire("Error", err.response?.data?.message, "error"); }
  }
};

const requestRefund = async (id) => {
  const { value: text } = await Swal.fire({ title: "Request Refund", input: "textarea", inputLabel: "Reason for refund", inputPlaceholder: "Type your reason here...", showCancelButton: true, confirmButtonColor: "#000" });
  if (text) {
    try {
      await axios.post(`${BASE_URL}/transactions/${id}/refund-request`, { reason: text }, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      fetchOrders();
      Swal.fire("Requested", "Refund request sent to admin.", "success");
    } catch (err) { Swal.fire("Error", "Failed to request refund", "error"); }
  }
};

const processRefund = async (id) => {
  try {
    const res = await axios.post(`${BASE_URL}/transactions/${id}/refund-process`, {}, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    fetchOrders();
    Swal.fire("Refunded", res.data.message, "success");
  } catch (err) { Swal.fire("Error", "Refund process failed", "error"); }
};

const formatStatus = (status) => status.replace(/_/g, " ");

const statusClass = (status) => {
  const map = {
    awaiting_payment: "bg-yellow-100 text-yellow-700", pending: "bg-orange-100 text-orange-700", processing: "bg-blue-100 text-blue-700",
    completed: "bg-green-100 text-green-700", cancelled: "bg-red-100 text-red-700", refund_requested: "bg-purple-100 text-purple-700",
    refund_approved: "bg-indigo-100 text-indigo-700", refund_rejected: "bg-gray-200 text-gray-600 line-through", refunded: "bg-teal-100 text-teal-700",
    refund_manual_required: "bg-pink-100 text-pink-700",
  };
  return map[status] || "bg-gray-100 text-gray-500";
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);
const formatDateTime = (date) => new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute:"2-digit" });

onMounted(fetchOrders);

onUnmounted(() => { if (timerInterval) clearInterval(timerInterval); });
</script>