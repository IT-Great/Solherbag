<!-- <template>
  <div
    class="mx-auto px-6 py-12 md:py-24 max-w-4xl min-h-screen animate-fade-in"
  >
    <h1
      class="mb-12 font-serif text-3xl md:text-4xl uppercase tracking-tighter"
    >
      Checkout
    </h1>

    <div class="flex lg:flex-row flex-col gap-12">
      <div class="space-y-12 flex-grow">
        <section>
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >1</span
            >
            <h2
              class="font-bold text-gray-900 text-sm uppercase tracking-widest"
            >
              Contact Information
            </h2>
          </div>
          <div class="bg-gray-50 p-6 border border-gray-100 rounded-2xl">
            <p class="text-gray-500 text-xs uppercase tracking-wider mb-1">
              Email Address
            </p>
            <p class="font-medium text-gray-900">{{ userData?.email }}</p>
          </div>
        </section>

        <section>
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >2</span
            >
            <h2
              class="font-bold text-gray-900 text-sm uppercase tracking-widest"
            >
              Shipping Address
            </h2>
          </div>
          <div
            v-if="addresses.length === 0"
            class="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300"
          >
            <p class="text-gray-500 text-sm italic">No address found.</p>
            <router-link
              to="/profilepage"
              class="text-blue-600 text-xs font-bold underline"
              >+ Add New Address</router-link
            >
          </div>
          <div v-else class="space-y-4">
            <label
              v-for="addr in addresses"
              :key="addr.id"
              :class="[
                selectedAddressId === addr.id
                  ? 'border-black ring-1 ring-black bg-white'
                  : 'border-gray-100 bg-gray-50/50',
              ]"
              class="relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all hover:bg-white"
            >
              <input
                type="radio"
                name="address"
                :value="addr.id"
                v-model="selectedAddressId"
                class="mt-1 w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <div class="ml-4 flex-grow">
                <div class="flex justify-between">
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ addr.receiver.full_name }}
                  </p>
                  <span
                    v-if="addr.is_default"
                    class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                    >Default</span
                  >
                </div>
                <p class="mt-2 text-gray-600 text-sm leading-relaxed">
                  {{ addr.details.location }}, {{ addr.details.type }} <br />
                  {{ addr.details.city }}, {{ addr.details.province }} <br />
                  {{ addr.details.region }} - {{ addr.details.postal_code }}
                </p>
              </div>
            </label>
          </div>
        </section>

        <section v-if="selectedAddressId">
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >3</span
            >
            <h2
              class="font-bold text-gray-900 text-sm uppercase tracking-widest"
            >
              Shipping Method
            </h2>
          </div>

          <div class="space-y-4">
            <label
              :class="[
                shippingMethod === 'free'
                  ? 'border-black ring-1 ring-black bg-white'
                  : 'border-gray-100 bg-gray-50/50',
              ]"
              class="relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all"
            >
              <input
                type="radio"
                value="free"
                v-model="shippingMethod"
                class="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <div class="ml-4 flex-grow flex justify-between items-center">
                <div>
                  <p
                    class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                  >
                    Free Shipping
                  </p>
                  <p class="text-green-600 font-bold text-xs mt-1">
                    Ships next day
                  </p>
                </div>
                <p class="font-black text-black">Rp 0</p>
              </div>
            </label>

            <label
              :class="[
                shippingMethod === 'biteship'
                  ? 'border-black ring-1 ring-black bg-white'
                  : 'border-gray-100 bg-gray-50/50',
              ]"
              class="relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all"
            >
              <input
                type="radio"
                value="biteship"
                v-model="shippingMethod"
                class="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <div class="ml-4 flex-grow flex justify-between items-center">
                <div>
                  <p
                    class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                  >
                    Standard / Express
                  </p>
                  <p class="text-gray-500 text-xs mt-1">Powered by Biteship</p>
                </div>
              </div>
            </label>

            <div
              v-if="shippingMethod === 'biteship'"
              class="pl-10 space-y-3 mt-2"
            >
              <div
                v-if="isLoadingRates"
                class="text-sm text-gray-500 animate-pulse"
              >
                Calculating couriers...
              </div>
              <div
                v-else-if="shippingRates.length === 0"
                class="text-xs text-red-500 italic"
              >
                No couriers available.
              </div>

              <label
                v-else
                v-for="(rate, idx) in shippingRates"
                :key="idx"
                :class="[
                  selectedRate?.company === rate.company &&
                  selectedRate?.type === rate.type
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200',
                ]"
                class="flex items-center p-4 border rounded-xl cursor-pointer transition-all hover:bg-gray-50"
              >
                <input
                  type="radio"
                  :value="rate"
                  v-model="selectedRate"
                  class="w-3 h-3 text-black focus:ring-black border-gray-300"
                />
                <div class="ml-3 flex-grow flex justify-between items-center">
                  <div>
                    <p
                      class="font-bold text-gray-800 text-xs uppercase tracking-wide"
                    >
                      {{ rate.company }} - {{ rate.type }}
                    </p>
                    <p class="text-gray-500 text-[10px] mt-0.5">
                      {{ rate.courier_name }} ({{ rate.duration }})
                    </p>
                  </div>
                  <p class="font-bold text-black text-xs">
                    {{ formatPrice(rate.price) }}
                  </p>
                </div>
              </label>
            </div>
          </div>
        </section>
      </div>

      <div class="lg:w-[380px] space-y-6">
        <div
          class="bg-white shadow-xl p-8 border border-gray-100 rounded-3xl sticky top-28"
        >
          <h2
            class="mb-6 font-bold text-gray-900 text-sm uppercase tracking-widest border-b pb-4"
          >
            Order Summary
          </h2>

          <div
            class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
          >
            <div
              v-for="item in transactionData?.details"
              :key="item.id"
              class="flex gap-4"
            >
              <img
                :src="item.product.image"
                class="w-16 h-16 object-cover rounded-xl bg-gray-100"
              />
              <div class="flex-grow">
                <p
                  class="font-bold text-gray-900 text-[11px] uppercase truncate w-32"
                >
                  {{ item.product.name }}
                </p>
                <p class="text-gray-400 text-[10px]">
                  Qty: {{ item.quantity }}
                </p>
                <p class="font-medium text-gray-900 text-xs mt-1">
                  {{ formatPrice(item.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-3 pt-4 border-t border-gray-50 text-sm">
            <div class="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{{ formatPrice(transactionData?.total_amount) }}</span>
            </div>

            <div class="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span
                v-if="shippingMethod === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >
              <span
                v-else-if="shippingMethod === 'biteship' && selectedRate"
                class="font-medium text-gray-900"
                >{{ formatPrice(selectedRate.price) }}</span
              >
              <span v-else class="italic text-[10px]">Select method</span>
            </div>

            <div
              class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
            >
              <span class="uppercase tracking-widest text-xs mt-1"
                >Total Amount</span
              >
              <span class="text-xl">{{ formatPrice(grandTotal) }}</span>
            </div>
          </div>

          <button
            @click="handlePayment"
            :disabled="
              isProcessing ||
              !selectedAddressId ||
              (shippingMethod === 'biteship' && !selectedRate)
            "
            class="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 py-5 rounded-2xl font-bold text-white text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-black/10"
          >
            <span v-if="!isProcessing">Pay Now</span>
            <span v-else class="flex justify-center items-center gap-2">
              <div
                class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              Processing...
            </span>
          </button>

          <p
            v-if="!selectedAddressId"
            class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
          >
            * Please select a shipping address
          </p>
          <p
            v-else-if="shippingMethod === 'biteship' && !selectedRate"
            class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
          >
            * Please select a courier service
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();

const userData = ref(null);
const addresses = ref([]);
const transactionData = ref(null);
const selectedAddressId = ref(null);
const isProcessing = ref(false);

// State Baru untuk Metode Pengiriman
const shippingMethod = ref("free"); // Default ke 'free'
const shippingRates = ref([]);
const selectedRate = ref(null);
const isLoadingRates = ref(false);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

watch(selectedAddressId, async (newVal) => {
  if (newVal) {
    selectedRate.value = null;
    isLoadingRates.value = true;
    shippingRates.value = [];

    try {
      const res = await axios.post(
        `${BASE_URL}/shipping/rates`,
        { address_id: newVal },
        axiosConfig,
      );
      if (res.data && res.data.pricing) {
        shippingRates.value = res.data.pricing;
      }
    } catch (error) {
      console.error("Gagal mengambil ongkir", error);
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: error.response?.data?.message || "Failed to calculate shipping.",
        showConfirmButton: false,
        timer: 4000,
      });
    } finally {
      isLoadingRates.value = false;
    }
  }
});

// Reset courier selection jika user bolak-balik mengubah tipe shipping method
watch(shippingMethod, (newVal) => {
  if (newVal === "free") {
    selectedRate.value = null;
  }
});

const grandTotal = computed(() => {
  let total = parseFloat(transactionData.value?.total_amount) || 0;
  if (shippingMethod.value === "biteship" && selectedRate.value) {
    total += parseFloat(selectedRate.value.price);
  }
  return total;
});

const fetchData = async () => {
  try {
    const user = localStorage.getItem("user");
    if (user) userData.value = JSON.parse(user);

    const transactionId = route.params.id;
    const resTrx = await axios.get(
      `${BASE_URL}/transactions/${transactionId}`,
      axiosConfig,
    );
    transactionData.value = resTrx.data;

    const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
    addresses.value = resAddr.data.data;

    const defaultAddr = addresses.value.find((a) => a.is_default);
    if (defaultAddr) selectedAddressId.value = defaultAddr.id;
  } catch (error) {
    console.error("Fetch data failed", error);
    Swal.fire("Error", "Failed to load checkout data", "error");
  }
};

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const payload = {
      transaction_id: transactionData.value.id,
      address_id: selectedAddressId.value,
      shipping_method: shippingMethod.value, // Kirim metode pengiriman ke server
      // Kirim null jika 'free', agar validasi backend tetap aman
      courier_company:
        shippingMethod.value === "biteship"
          ? selectedRate.value?.company
          : null,
      courier_type:
        shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
      shipping_cost:
        shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
    };

    const res = await axios.post(
      `${BASE_URL}/payments/invoice`,
      payload,
      axiosConfig,
    );
    if (res.data.checkout_url) window.location.href = res.data.checkout_url;
  } catch (error) {
    Swal.fire(
      "Payment Error",
      error.response?.data?.message || "Failed to create invoice",
      "error",
    );
  } finally {
    isProcessing.value = false;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

onMounted(fetchData);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}
</style> -->

<template>
  <div
    class="mx-auto px-6 py-12 md:py-24 max-w-6xl min-h-screen animate-fade-in"
  >
    <h1
      class="mb-12 font-serif text-3xl md:text-4xl uppercase tracking-tighter"
    >
      Checkout
    </h1>

    <div class="flex lg:flex-row flex-col gap-12">
      <div class="space-y-12 flex-grow">
        <section>
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >1</span
            >
            <h2
              class="font-bold text-gray-900 text-sm uppercase tracking-widest"
            >
              Shipping Address
            </h2>
          </div>
          <div
            v-if="addresses.length === 0"
            class="text-center py-10 bg-gray-50 rounded-2xl border border-dashed border-gray-300"
          >
            <p class="text-gray-500 text-sm italic">No address found.</p>
            <router-link
              to="/profilepage"
              class="text-blue-600 text-xs font-bold underline"
              >+ Add New Address</router-link
            >
          </div>
          <div v-else class="space-y-4">
            <label
              v-for="addr in addresses"
              :key="addr.id"
              :class="[
                selectedAddressId === addr.id
                  ? 'border-black ring-1 ring-black bg-white shadow-md'
                  : 'border-gray-100 bg-gray-50/50',
              ]"
              class="relative flex items-start p-6 border rounded-2xl cursor-pointer transition-all hover:bg-white"
            >
              <input
                type="radio"
                name="address"
                :value="addr.id"
                v-model="selectedAddressId"
                class="mt-1 w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <div class="ml-4 flex-grow">
                <div class="flex justify-between">
                  <p class="font-bold text-gray-900 text-sm uppercase">
                    {{ addr.receiver.full_name }}
                  </p>
                  <span
                    v-if="addr.is_default"
                    class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                    >Default</span
                  >
                </div>
                <p class="mt-2 text-gray-600 text-sm leading-relaxed">
                  {{ addr.details.location }}, {{ addr.details.type }} <br />
                  {{ addr.details.city }}, {{ addr.details.province }} <br />
                  {{ addr.details.region }} - {{ addr.details.postal_code }}
                </p>
              </div>
            </label>
          </div>
        </section>

        <section v-if="!selectedAddressId">
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >2</span
            >
            <h2
              class="font-bold text-gray-900 text-sm uppercase tracking-widest"
            >
              Shipping Method
            </h2>
          </div>

          <div>
            <h4 class="text-gray-900 text-sm uppercase tracking-widest">
              Choose the shipping address first
            </h4>
          </div>
        </section>

        <section v-if="selectedAddressId">
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >2</span
            >
            <h2
              class="font-bold text-gray-900 text-sm uppercase tracking-widest"
            >
              Shipping Method
            </h2>
          </div>

          <div class="space-y-4">
            <label
              :class="[
                shippingMethod === 'free'
                  ? 'border-black ring-1 ring-black bg-white shadow-md'
                  : 'border-gray-100 bg-gray-50/50',
              ]"
              class="relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all"
            >
              <input
                type="radio"
                value="free"
                v-model="shippingMethod"
                class="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <div class="ml-4 flex-grow flex justify-between items-center">
                <div>
                  <p
                    class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                  >
                    Free Shipping
                  </p>
                  <p class="text-green-600 font-bold text-xs mt-1">
                    In-Store Pickup (Ambil barang di toko)
                  </p>
                </div>
                <p class="font-black text-black">Rp 0</p>
              </div>
            </label>

            <label
              :class="[
                shippingMethod === 'biteship'
                  ? 'border-black ring-1 ring-black bg-white shadow-md'
                  : 'border-gray-100 bg-gray-50/50',
              ]"
              class="relative flex items-center p-6 border rounded-2xl cursor-pointer transition-all"
            >
              <input
                type="radio"
                value="biteship"
                v-model="shippingMethod"
                class="w-4 h-4 text-black focus:ring-black border-gray-300"
              />
              <div class="ml-4 flex-grow flex justify-between items-center">
                <div>
                  <p
                    class="font-bold text-gray-900 text-sm uppercase tracking-wide"
                  >
                    Standard / Express
                  </p>
                  <p class="text-gray-500 text-xs mt-1">Powered by Biteship</p>
                </div>
              </div>
            </label>

            <div
              v-if="shippingMethod === 'biteship'"
              class="p-6 border border-gray-200 rounded-3xl mt-4 bg-white space-y-8 animate-fade-in"
            >
              <div
                class="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-2xl"
              >
                <div>
                  <h3
                    class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                  >
                    Shipper Origin
                  </h3>
                  <p class="font-bold text-gray-900 text-xs uppercase">
                    {{ shipperInfo.name }}
                  </p>
                  <p class="text-gray-500 text-xs mt-1">
                    {{ shipperInfo.phone }}
                  </p>
                  <p class="text-gray-500 text-xs mt-1 line-clamp-2">
                    {{ shipperInfo.address }} - {{ shipperInfo.postal_code }}
                  </p>
                </div>
                <div>
                  <h3
                    class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                  >
                    Destination
                  </h3>
                  <p class="font-bold text-gray-900 text-xs uppercase">
                    {{ destinationInfo?.name }}
                  </p>
                  <p class="text-gray-500 text-xs mt-1">
                    {{ destinationInfo?.phone }}
                  </p>
                  <p class="text-gray-500 text-xs mt-1 line-clamp-2">
                    {{ destinationInfo?.address }} -
                    {{ destinationInfo?.postal_code }}
                  </p>
                </div>
              </div>

              <div>
                <h3 class="font-bold text-sm uppercase tracking-widest mb-4">
                  Pickup Schedule
                </h3>
                <div class="flex flex-col md:flex-row gap-4 mb-4">
                  <label
                    :class="
                      deliveryType === 'later'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200'
                    "
                    class="flex-1 p-4 border rounded-xl cursor-pointer transition"
                  >
                    <input
                      type="radio"
                      value="later"
                      v-model="deliveryType"
                      class="hidden"
                    />
                    <p class="font-bold text-xs uppercase">Standard Pickup</p>
                    <p class="text-[10px] text-gray-500 mt-1">
                      Pickup within next hour
                    </p>
                  </label>
                  <label
                    :class="
                      deliveryType === 'scheduled'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200'
                    "
                    class="flex-1 p-4 border rounded-xl cursor-pointer transition"
                  >
                    <input
                      type="radio"
                      value="scheduled"
                      v-model="deliveryType"
                      class="hidden"
                    />
                    <p class="font-bold text-xs uppercase">Scheduled Pickup</p>
                    <p class="text-[10px] text-gray-500 mt-1">
                      Choose specific date & time
                    </p>
                  </label>
                </div>

                <div
                  v-if="deliveryType === 'scheduled'"
                  class="flex gap-4 p-4 border border-blue-100 bg-blue-50/30 rounded-xl animate-fade-in"
                >
                  <div class="flex-1">
                    <label
                      class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                      >Pickup Date</label
                    >
                    <input
                      type="date"
                      v-model="deliveryDate"
                      :min="todayDate"
                      class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-black focus:border-black outline-none"
                      required
                    />
                  </div>
                  <div class="flex-1">
                    <label
                      class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                      >Pickup Time</label
                    >
                    <input
                      type="time"
                      v-model="deliveryTime"
                      class="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-black focus:border-black outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3
                  class="font-bold text-sm uppercase tracking-widest mb-4 border-t pt-6"
                >
                  Select Courier
                </h3>

                <div
                  v-if="isLoadingRates"
                  class="text-sm text-gray-500 animate-pulse text-center py-4"
                >
                  Calculating couriers...
                </div>
                <div
                  v-else-if="shippingRates.length === 0"
                  class="text-xs text-red-500 italic text-center py-4"
                >
                  No couriers available.
                </div>

                <div v-else class="space-y-3">
                  <label
                    v-for="(rate, idx) in shippingRates"
                    :key="idx"
                    :class="[
                      selectedRate?.company === rate.company &&
                      selectedRate?.type === rate.type
                        ? 'border-black bg-gray-50 shadow-sm'
                        : 'border-gray-200',
                    ]"
                    class="flex items-center p-4 border rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      :value="rate"
                      v-model="selectedRate"
                      class="w-4 h-4 text-black focus:ring-black border-gray-300"
                    />

                    <!-- <div class="ml-4 flex-grow flex items-center gap-4">
                      <div
                        class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex justify-center items-center overflow-hidden shrink-0"
                      >
                        <img
                          v-if="getCourierLogo(rate.company)"
                          :src="getCourierLogo(rate.company)"
                          :alt="rate.company"
                          class="w-full h-full object-contain p-1"
                        />
                        <span v-else class="font-black text-gray-300 text-xs">{{
                          rate.company.toUpperCase()
                        }}</span>
                      </div>
                      <div>
                        <p
                          class="font-bold text-gray-800 text-sm uppercase tracking-wide"
                        >
                          {{ rate.company }} - {{ rate.type }}
                        </p>
                        <p class="text-gray-500 text-[10px] mt-0.5">
                          {{ rate.courier_name }} ({{ rate.duration }})
                        </p>
                      </div>
                    </div> -->

                    <div class="ml-4 flex-grow flex items-center gap-4">
                      <div
                        class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex justify-center items-center overflow-hidden shrink-0"
                      >
                        <img
                          v-show="!imageErrors[rate.company]"
                          v-if="getCourierLogo(rate.company)"
                          :src="getCourierLogo(rate.company)"
                          :alt="rate.company"
                          class="w-full h-full object-contain p-1"
                          @error="handleImageError(rate.company)"
                        />

                        <span
                          v-show="
                            imageErrors[rate.company] ||
                            !getCourierLogo(rate.company)
                          "
                          class="font-black text-gray-300 text-xs"
                        >
                          {{ rate.company.toUpperCase() }}
                        </span>
                      </div>
                      <div>
                        <p
                          class="font-bold text-gray-800 text-sm uppercase tracking-wide"
                        >
                          {{ rate.company }} - {{ rate.type }}
                        </p>
                        <p class="text-gray-500 text-[10px] mt-0.5">
                          {{ rate.courier_name }} ({{ rate.duration }})
                        </p>
                      </div>
                    </div>

                    <p class="font-black text-black text-sm">
                      {{ formatPrice(rate.price) }}
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="lg:w-[400px] space-y-6">
        <div
          class="bg-white shadow-xl p-8 border border-gray-100 rounded-3xl sticky top-28"
        >
          <h2
            class="mb-6 font-bold text-gray-900 text-sm uppercase tracking-widest border-b pb-4"
          >
            Order Summary
          </h2>

          <div
            class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
          >
            <div
              v-for="item in transactionData?.details"
              :key="item.id"
              class="flex gap-4"
            >
              <img
                :src="item.product.image"
                class="w-16 h-16 object-cover rounded-xl bg-gray-100 shrink-0"
              />
              <div class="flex-grow">
                <p
                  class="font-bold text-gray-900 text-[11px] uppercase truncate w-32"
                >
                  {{ item.product.name }}
                </p>
                <p class="text-gray-400 text-[10px]">
                  Qty: {{ item.quantity }}
                </p>
                <p class="font-medium text-gray-900 text-xs mt-1">
                  {{ formatPrice(item.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>

          <!-- <div class="space-y-3 pt-4 border-t border-gray-50 text-sm">
            <div class="flex justify-between text-gray-500">
              <span>Total Items</span>
              <span class="font-bold text-gray-900"
                >{{ totalQuantity }} items</span
              >
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{{ formatPrice(transactionData?.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Shipping</span>
              <span
                v-if="shippingMethod === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >
              <span
                v-else-if="shippingMethod === 'biteship' && selectedRate"
                class="font-medium text-gray-900"
                >{{ formatPrice(selectedRate.price) }}</span
              >
              <span v-else class="italic text-[10px]">Select method</span>
            </div>

            <div
              class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
            >
              <span class="uppercase tracking-widest text-xs mt-1"
                >Grand Total</span
              >
              <span class="text-xl">{{ formatPrice(grandTotal) }}</span>
            </div>
          </div> -->

          <!-- <div class="space-y-3 pt-4 border-t border-gray-50 text-sm">
            <div class="flex justify-between text-gray-500">
              <span>Total Items</span>
              <span class="font-bold text-gray-900"
                >{{ totalQuantity }} items</span
              >
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{{ formatPrice(transactionData?.total_amount) }}</span>
            </div>

            <div class="flex justify-between text-gray-500 items-start">
              <span>Shipping</span>
              <span
                v-if="shippingMethod === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >

              <div
                v-else-if="shippingMethod === 'biteship' && selectedRate"
                class="text-right"
              >
                <span class="font-medium text-gray-900 block">
                  {{ formatPrice(selectedRate.price * totalQuantity) }}
                </span>
                <p class="text-[10px] text-gray-400 mt-1">
                  {{ formatPrice(selectedRate.price) }} x
                  {{ totalQuantity }} items
                </p>
              </div>

              <span v-else class="italic text-[10px]">Select method</span>
            </div>

            <div
              class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
            >
              <span class="uppercase tracking-widest text-xs mt-1"
                >Grand Total</span
              >
              <span class="text-xl">{{ formatPrice(grandTotal) }}</span>
            </div>
          </div> -->

          <div class="space-y-3 pt-4 border-t border-gray-50 text-sm">
            <!-- <div class="flex justify-between text-gray-500">
              <span>Total Items</span>
              <span class="font-bold text-gray-900"
                >{{ totalQuantity }} items</span
              >
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{{ formatPrice(transactionData?.total_amount) }}</span>
            </div>

            <div class="flex justify-between text-gray-500 items-start">
              <span>Shipping</span>
              <span
                v-if="shippingMethod === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >
              <div
                v-else-if="shippingMethod === 'biteship' && selectedRate"
                class="text-right"
              >
                <span class="font-medium text-gray-900 block">{{
                  formatPrice(selectedRate.price * totalQuantity)
                }}</span>
                <p class="text-[10px] text-gray-400 mt-1">
                  {{ formatPrice(selectedRate.price) }} x
                  {{ totalQuantity }} items
                </p>
              </div>
              <span v-else class="italic text-[10px]">Select method</span>
            </div>

            <div
              class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
            >
              <span class="uppercase tracking-widest text-xs mt-1"
                >Grand Total</span
              >
              <span class="text-xl">{{ formatPrice(grandTotal) }}</span>
            </div> -->

            <div class="flex justify-between text-gray-500">
              <span>Total Items</span>
              <span class="font-bold text-gray-900"
                >{{ totalQuantity }} items</span
              >
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{{ formatPrice(transactionData?.total_amount) }}</span>
            </div>

            <div
              v-if="userData?.is_membership && userData?.point > 0"
              class="pt-4 mt-2 border-t border-dashed border-gray-200"
            >
              <div class="flex justify-between items-center mb-2">
                <span
                  class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3 text-yellow-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                  Redeem Points
                </span>
                <span class="text-xs text-gray-500"
                  >Bal: {{ userData.point }} Pts</span
                >
              </div>

              <div class="flex gap-2">
                <input
                  type="number"
                  v-model="pointsToUse"
                  :max="maxUsablePoints"
                  min="0"
                  class="flex-1 bg-white border border-yellow-300 rounded-lg px-3 py-1.5 text-sm focus:ring-yellow-500 outline-none"
                  placeholder="0"
                />
                <button
                  @click="useAllPoints"
                  class="bg-yellow-100 text-yellow-800 text-[10px] font-bold uppercase px-3 rounded-lg hover:bg-yellow-200 transition"
                >
                  Use All
                </button>
              </div>
              <p
                v-if="pointsToUse > 0"
                class="text-[10px] text-green-600 mt-1 font-medium text-right"
              >
                - {{ formatPrice(pointDiscountAmount) }}
              </p>
            </div>
            <div class="flex justify-between text-gray-500 items-start">
              <span>Shipping</span>
              <span
                v-if="shippingMethod === 'free'"
                class="font-bold text-green-600"
                >Free</span
              >

              <div
                v-else-if="shippingMethod === 'biteship' && selectedRate"
                class="text-right"
              >
                <span class="font-medium text-gray-900 block">{{
                  formatPrice(selectedRate.price * totalQuantity)
                }}</span>
                <p class="text-[10px] text-gray-400 mt-1">
                  {{ formatPrice(selectedRate.price) }} x
                  {{ totalQuantity }} items
                </p>
              </div>

              <span v-else class="italic text-[10px]">Select method</span>
            </div>

            <div
              class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
            >
              <span class="uppercase tracking-widest text-xs mt-1"
                >Grand Total</span
              >
              <span class="text-xl">{{
                formatPrice(grandTotalWithDiscount)
              }}</span>
            </div>

            <div
              v-if="userData?.is_membership"
              class="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-xl flex items-center gap-3"
            >
              <div
                class="w-8 h-8 bg-yellow-400 text-white rounded-full flex justify-center items-center shrink-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4"
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
                  Points to earn
                </p>
                <p class="text-sm font-black text-yellow-600">
                  +{{ calculateEarnedPoints }} Pts
                </p>
              </div>
            </div>
          </div>

          <button
            @click="handlePayment"
            :disabled="isButtonDisabled"
            class="mt-8 w-full bg-black hover:bg-gray-800 disabled:bg-gray-300 py-5 rounded-2xl font-bold text-white text-xs uppercase tracking-[0.3em] transition-all duration-500 shadow-xl shadow-black/10"
          >
            <span v-if="!isProcessing">Pay Now</span>
            <span v-else class="flex justify-center items-center gap-2">
              <div
                class="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"
              ></div>
              Processing...
            </span>
          </button>

          <p
            v-if="!selectedAddressId"
            class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
          >
            * Please select a shipping address
          </p>
          <p
            v-else-if="shippingMethod === 'biteship' && !selectedRate"
            class="mt-4 text-[10px] text-red-500 text-center uppercase tracking-tighter"
          >
            * Please select a courier service
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();

const userData = ref(null);
const addresses = ref([]);
const transactionData = ref(null);
const selectedAddressId = ref(null);
const isProcessing = ref(false);

const shippingMethod = ref("free");
const shippingRates = ref([]);
const selectedRate = ref(null);
const isLoadingRates = ref(false);

// State untuk Jadwal Pengiriman
const deliveryType = ref("later"); // 'later' atau 'scheduled'
const deliveryDate = ref("");
const deliveryTime = ref("");

// [BARU] STATE UNTUK PENGGUNAAN POIN
const pointsToUse = ref(0);
const pointConversionRate = 1000; // 1 Poin = Rp 1.000

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

// Data Statis Shipper
const shipperInfo = {
  name: "Solher Store",
  phone: "08883888585",
  address: "Jalan Kecilung N0. 8A, Kota Surabaya, Jawa Timur 60275, Indonesia",
  postal_code: "60275",
};

// Auto-fill Date Time ketika halaman dimuat / method diubah ke later
const initDateTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1); // Default 1 jam ke depan
  deliveryDate.value = now.toISOString().split("T")[0];
  deliveryTime.value =
    now.toTimeString().split(":")[0] + ":" + now.toTimeString().split(":")[1];
};

const todayDate = computed(() => new Date().toISOString().split("T")[0]);

// Computed Destination Info berdasarkan alamat yang dipilih
const destinationInfo = computed(() => {
  if (!selectedAddressId.value || !addresses.value) return null;
  const addr = addresses.value.find((a) => a.id === selectedAddressId.value);
  if (!addr) return null;
  return {
    name: addr.receiver.full_name,
    phone: userData.value?.phone || "No Phone Provided", // Ambil dari users.phone
    address: `${addr.details.location}, ${addr.details.city}, ${addr.details.province}`,
    postal_code: addr.details.postal_code,
  };
});

const totalQuantity = computed(() => {
  if (!transactionData.value || !transactionData.value.details) return 0;
  return transactionData.value.details.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );
});

const grandTotal = computed(() => {
  let total = parseFloat(transactionData.value?.total_amount) || 0;
  if (shippingMethod.value === "biteship" && selectedRate.value) {
    total += parseFloat(selectedRate.value.price) * totalQuantity.value;
  }
  return total;
});

const imageErrors = ref({});

const handleImageError = (company) => {
  imageErrors.value[company] = true;
};

// Helper untuk menampilkan logo kurir
const getCourierLogo = (company) => {
  // Ganti baseUrl ke folder public/images/couriers/ di project Vue Anda
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

  const logo = map[company.toLowerCase()];
  return logo ? baseUrl + logo : null;
};

// Helper untuk menampilkan logo kurir
// const getCourierLogo = (company) => {
//   // Biteship CDN menyediakan logo untuk kurir-kurir utama di Indonesia
//   const baseUrl = "https://biteship.com/assets/images/couriers/";
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
//   const logo = map[company.toLowerCase()];
//   return logo ? baseUrl + logo : null;
// };

const isButtonDisabled = computed(() => {
  if (isProcessing.value) return true;
  if (!selectedAddressId.value) return true;
  if (shippingMethod.value === "biteship") {
    if (!selectedRate.value) return true;
    if (
      deliveryType.value === "scheduled" &&
      (!deliveryDate.value || !deliveryTime.value)
    )
      return true;
  }
  return false;
});

watch(selectedAddressId, async (newVal) => {
  if (newVal) {
    selectedRate.value = null;
    isLoadingRates.value = true;
    shippingRates.value = [];
    try {
      const res = await axios.post(
        `${BASE_URL}/shipping/rates`,
        { address_id: newVal },
        axiosConfig,
      );
      if (res.data && res.data.pricing) shippingRates.value = res.data.pricing;
    } catch (error) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "error",
        title: "Failed to calculate shipping.",
        showConfirmButton: false,
        timer: 4000,
      });
    } finally {
      isLoadingRates.value = false;
    }
  }
});

watch(shippingMethod, (newVal) => {
  if (newVal === "free") selectedRate.value = null;
});

watch(deliveryType, (newVal) => {
  if (newVal === "later") initDateTime();
});

// const fetchData = async () => {
//   try {
//     const user = localStorage.getItem("user");
//     if (user) userData.value = JSON.parse(user);

//     const transactionId = route.params.id;
//     const resTrx = await axios.get(
//       `${BASE_URL}/transactions/${transactionId}`,
//       axiosConfig,
//     );
//     transactionData.value = resTrx.data;

//     const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
//     addresses.value = resAddr.data.data;

//     const defaultAddr = addresses.value.find((a) => a.is_default);
//     if (defaultAddr) selectedAddressId.value = defaultAddr.id;

//     initDateTime(); // Setup awal waktu
//   } catch (error) {
//     Swal.fire("Error", "Failed to load checkout data", "error");
//   }
// };

const fetchData = async () => {
  try {
    const user = localStorage.getItem("user");
    if (user) userData.value = JSON.parse(user);

    const transactionId = route.params.id;
    const resTrx = await axios.get(
      `${BASE_URL}/transactions/${transactionId}`,
      axiosConfig,
    );
    transactionData.value = resTrx.data;

    const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
    addresses.value = resAddr.data.data;

    // [PERBAIKAN] Logika pengecekan alamat kosong
    if (addresses.value.length === 0) {
      Swal.fire({
        title: "Address Required",
        text: "You must add a shipping address before you can proceed with the payment.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Add Address Now",
        cancelButtonText: "Later",
        confirmButtonColor: "#000",
        allowOutsideClick: false, // Memaksa user untuk memilih
      }).then((result) => {
        if (result.isConfirmed) {
          // Arahkan ke Profile Page jika user memilih Add Address
          router.push("/profilepage");
        }
      });
    } else {
      // Jika alamat ada, pilih yang default
      const defaultAddr = addresses.value.find((a) => a.is_default);
      if (defaultAddr) {
        selectedAddressId.value = defaultAddr.id;
      } else {
        // Jika tidak ada yang default tapi ada alamat, pilih yang pertama
        selectedAddressId.value = addresses.value[0].id;
      }
    }

    initDateTime(); // Setup awal waktu
  } catch (error) {
    Swal.fire("Error", "Failed to load checkout data", "error");
  }
};

// Maksimal poin yang bisa digunakan (tidak boleh melebihi saldo ATAU total harga produk)
const maxUsablePoints = computed(() => {
  if (!userData.value || !transactionData.value) return 0;
  const userBalance = userData.value.point || 0;
  const maxPointsForPrice = Math.floor(
    parseFloat(transactionData.value.total_amount) / pointConversionRate,
  );
  return Math.min(userBalance, maxPointsForPrice);
});

// Nominal Rupiah dari poin yang digunakan
const pointDiscountAmount = computed(() => {
  return (pointsToUse.value || 0) * pointConversionRate;
});

// Fungsi tombol "Use All"
const useAllPoints = () => {
  pointsToUse.value = maxUsablePoints.value;
};

// Pastikan user tidak mengetik poin melebihi batas manual
watch(pointsToUse, (newVal) => {
  if (newVal < 0) pointsToUse.value = 0;
  if (newVal > maxUsablePoints.value) pointsToUse.value = maxUsablePoints.value;
});

// [PERBAIKAN] Grand total yang sudah dikurangi diskon poin
const grandTotalWithDiscount = computed(() => {
  let total = parseFloat(transactionData.value?.total_amount) || 0;
  if (shippingMethod.value === "biteship" && selectedRate.value) {
    total += parseFloat(selectedRate.value.price) * totalQuantity.value;
  }
  return total - pointDiscountAmount.value;
});

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const payload = {
      transaction_id: transactionData.value.id,
      address_id: selectedAddressId.value,
      shipping_method: shippingMethod.value,

      // Kirim data penggunaan poin ke backend
      use_points: pointsToUse.value,

      // Data Kurir
      courier_company:
        shippingMethod.value === "biteship"
          ? selectedRate.value?.company
          : null,
      courier_type:
        shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
      shipping_cost:
        shippingMethod.value === "biteship" ? selectedRate.value?.price : null,

      // Data Jadwal Pickup (Diteruskan ke Backend)
      delivery_type:
        shippingMethod.value === "biteship" ? deliveryType.value : null,
      delivery_date:
        shippingMethod.value === "biteship" ? deliveryDate.value : null,
      delivery_time:
        shippingMethod.value === "biteship" ? deliveryTime.value : null,
    };

    const res = await axios.post(
      `${BASE_URL}/payments/invoice`,
      payload,
      axiosConfig,
    );
    if (res.data.checkout_url) window.location.href = res.data.checkout_url;
  } catch (error) {
    Swal.fire(
      "Payment Error",
      error.response?.data?.message || "Failed to create invoice",
      "error",
    );
  } finally {
    isProcessing.value = false;
  }
};

// Hitung calon poin: Rp 100.000 = 1 Poin (diambil dari subtotal produk saja)
const calculateEarnedPoints = computed(() => {
  if (!transactionData.value || !transactionData.value.total_amount) return 0;
  return Math.floor(parseFloat(transactionData.value.total_amount) / 100000);
});

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

onMounted(fetchData);
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #eee;
  border-radius: 10px;
}
</style>
