<!-- <template>
  <div
    class="max-w-4xl min-h-screen px-6 py-12 mx-auto md:py-24 animate-fade-in"
  >
    <h1
      class="mb-12 font-serif text-3xl tracking-tighter uppercase md:text-4xl"
    >
      Checkout
    </h1>

    <div class="flex flex-col gap-12 lg:flex-row">
      <div class="flex-grow space-y-12">
        <section>
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >1</span
            >
            <h2
              class="text-sm font-bold tracking-widest text-gray-900 uppercase"
            >
              Contact Information
            </h2>
          </div>
          <div class="p-6 border border-gray-100 bg-gray-50 rounded-2xl">
            <p class="mb-1 text-xs tracking-wider text-gray-500 uppercase">
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
              class="text-sm font-bold tracking-widest text-gray-900 uppercase"
            >
              Shipping Address
            </h2>
          </div>
          <div
            v-if="addresses.length === 0"
            class="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl"
          >
            <p class="text-sm italic text-gray-500">No address found.</p>
            <router-link
              to="/profilepage"
              class="text-xs font-bold text-blue-600 underline"
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
              class="relative flex items-start p-6 transition-all border cursor-pointer rounded-2xl hover:bg-white"
            >
              <input
                type="radio"
                name="address"
                :value="addr.id"
                v-model="selectedAddressId"
                class="w-4 h-4 mt-1 text-black border-gray-300 focus:ring-black"
              />
              <div class="flex-grow ml-4">
                <div class="flex justify-between">
                  <p class="text-sm font-bold text-gray-900 uppercase">
                    {{ addr.receiver.full_name }}
                  </p>
                  <span
                    v-if="addr.is_default"
                    class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                    >Default</span
                  >
                </div>
                <p class="mt-2 text-sm leading-relaxed text-gray-600">
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
              class="text-sm font-bold tracking-widest text-gray-900 uppercase"
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
              class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
            >
              <input
                type="radio"
                value="free"
                v-model="shippingMethod"
                class="w-4 h-4 text-black border-gray-300 focus:ring-black"
              />
              <div class="flex items-center justify-between flex-grow ml-4">
                <div>
                  <p
                    class="text-sm font-bold tracking-wide text-gray-900 uppercase"
                  >
                    Free Shipping
                  </p>
                  <p class="mt-1 text-xs font-bold text-green-600">
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
              class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
            >
              <input
                type="radio"
                value="biteship"
                v-model="shippingMethod"
                class="w-4 h-4 text-black border-gray-300 focus:ring-black"
              />
              <div class="flex items-center justify-between flex-grow ml-4">
                <div>
                  <p
                    class="text-sm font-bold tracking-wide text-gray-900 uppercase"
                  >
                    Standard / Express
                  </p>
                  <p class="mt-1 text-xs text-gray-500">Powered by Biteship</p>
                </div>
              </div>
            </label>

            <div
              v-if="shippingMethod === 'biteship'"
              class="pl-10 mt-2 space-y-3"
            >
              <div
                v-if="isLoadingRates"
                class="text-sm text-gray-500 animate-pulse"
              >
                Calculating couriers...
              </div>
              <div
                v-else-if="shippingRates.length === 0"
                class="text-xs italic text-red-500"
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
                class="flex items-center p-4 transition-all border cursor-pointer rounded-xl hover:bg-gray-50"
              >
                <input
                  type="radio"
                  :value="rate"
                  v-model="selectedRate"
                  class="w-3 h-3 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-3">
                  <div>
                    <p
                      class="text-xs font-bold tracking-wide text-gray-800 uppercase"
                    >
                      {{ rate.company }} - {{ rate.type }}
                    </p>
                    <p class="text-gray-500 text-[10px] mt-0.5">
                      {{ rate.courier_name }} ({{ rate.duration }})
                    </p>
                  </div>
                  <p class="text-xs font-bold text-black">
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
          class="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-28"
        >
          <h2
            class="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b"
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
                class="object-cover w-16 h-16 bg-gray-100 rounded-xl"
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
                <p class="mt-1 text-xs font-medium text-gray-900">
                  {{ formatPrice(item.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>

          <div class="pt-4 space-y-3 text-sm border-t border-gray-50">
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
              <span class="mt-1 text-xs tracking-widest uppercase"
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
            <span v-else class="flex items-center justify-center gap-2">
              <div
                class="w-3 h-3 border-2 rounded-full border-white/30 border-t-white animate-spin"
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

<!-- <template>
  <div
    class="max-w-6xl min-h-screen px-6 py-12 mx-auto md:py-24 animate-fade-in"
  >
    <h1
      class="mb-12 font-serif text-3xl tracking-tighter uppercase md:text-4xl"
    >
      Checkout
    </h1>

    <div class="flex flex-col gap-12 lg:flex-row">
      <div class="flex-grow space-y-12">
        <section>
          <div class="flex items-center gap-4 mb-4">
            <span
              class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
              >1</span
            >
            <h2
              class="text-sm font-bold tracking-widest text-gray-900 uppercase"
            >
              Shipping Address
            </h2>
          </div>
          <div
            v-if="addresses.length === 0"
            class="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl"
          >
            <p class="text-sm italic text-gray-500">No address found.</p>
            <button
              @click="openModal()"
              class="text-xs font-bold text-blue-600 underline"
            >
              + Add New Address
            </button>
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
              class="relative flex items-start p-6 transition-all border cursor-pointer rounded-2xl hover:bg-white"
            >
              <input
                type="radio"
                name="address"
                :value="addr.id"
                v-model="selectedAddressId"
                class="w-4 h-4 mt-1 text-black border-gray-300 focus:ring-black"
              />
              <div class="flex-grow ml-4">
                <div class="flex justify-between">
                  <p class="text-sm font-bold text-gray-900 uppercase">
                    {{ addr.receiver.full_name }}
                  </p>
                  <span
                    v-if="addr.is_default"
                    class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                    >Default</span
                  >
                </div>
                <p class="mt-2 text-sm leading-relaxed text-gray-600">
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
              class="text-sm font-bold tracking-widest text-gray-900 uppercase"
            >
              Shipping Method
            </h2>
          </div>

          <div>
            <h4 class="text-sm tracking-widest text-gray-900 uppercase">
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
              class="text-sm font-bold tracking-widest text-gray-900 uppercase"
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
              class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
            >
              <input
                type="radio"
                value="free"
                v-model="shippingMethod"
                class="w-4 h-4 text-black border-gray-300 focus:ring-black"
              />
              <div class="flex items-center justify-between flex-grow ml-4">
                <div>
                  <p
                    class="text-sm font-bold tracking-wide text-gray-900 uppercase"
                  >
                    Free Shipping
                  </p>
                  <p class="mt-1 text-xs font-bold text-green-600">
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
              class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
            >
              <input
                type="radio"
                value="biteship"
                v-model="shippingMethod"
                class="w-4 h-4 text-black border-gray-300 focus:ring-black"
              />
              <div class="flex items-center justify-between flex-grow ml-4">
                <div>
                  <p
                    class="text-sm font-bold tracking-wide text-gray-900 uppercase"
                  >
                    Standard / Express
                  </p>
                  <p class="mt-1 text-xs text-gray-500">Powered by Biteship</p>
                </div>
              </div>
            </label>

            <div
              v-if="shippingMethod === 'biteship'"
              class="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in"
            >
              <div
                class="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 bg-gray-50 rounded-2xl"
              >
                <div>
                  <h3
                    class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                  >
                    Shipper Origin
                  </h3>
                  <p class="text-xs font-bold text-gray-900 uppercase">
                    {{ shipperInfo.name }}
                  </p>
                  <p class="mt-1 text-xs text-gray-500">
                    {{ shipperInfo.phone }}
                  </p>
                  <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                    {{ shipperInfo.address }} - {{ shipperInfo.postal_code }}
                  </p>
                </div>
                <div>
                  <h3
                    class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                  >
                    Destination
                  </h3>
                  <p class="text-xs font-bold text-gray-900 uppercase">
                    {{ destinationInfo?.name }}
                  </p>
                  <p class="mt-1 text-xs text-gray-500">
                    {{ destinationInfo?.phone }}
                  </p>
                  <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                    {{ destinationInfo?.address }} -
                    {{ destinationInfo?.postal_code }}
                  </p>
                </div>
              </div>

              <div>
                <h3 class="mb-4 text-sm font-bold tracking-widest uppercase">
                  Pickup Schedule
                </h3>
                <div class="flex flex-col gap-4 mb-4 md:flex-row">
                  <label
                    :class="
                      deliveryType === 'later'
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200'
                    "
                    class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                  >
                    <input
                      type="radio"
                      value="later"
                      v-model="deliveryType"
                      class="hidden"
                    />
                    <p class="text-xs font-bold uppercase">Standard Pickup</p>
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
                    class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                  >
                    <input
                      type="radio"
                      value="scheduled"
                      v-model="deliveryType"
                      class="hidden"
                    />
                    <p class="text-xs font-bold uppercase">Scheduled Pickup</p>
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
                      class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
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
                      class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3
                  class="pt-6 mb-4 text-sm font-bold tracking-widest uppercase border-t"
                >
                  Select Courier
                </h3>

                <div
                  v-if="isLoadingRates"
                  class="py-4 text-sm text-center text-gray-500 animate-pulse"
                >
                  Calculating couriers...
                </div>
                <div
                  v-else-if="shippingRates.length === 0"
                  class="py-4 text-xs italic text-center text-red-500"
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
                    class="flex items-center p-4 transition-all border cursor-pointer rounded-xl hover:bg-gray-50"
                  >
                    <input
                      type="radio"
                      :value="rate"
                      v-model="selectedRate"
                      class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                    />

                    <div class="flex items-center flex-grow gap-4 ml-4">
                      <div
                        class="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0"
                      >
                        <img
                          v-show="!imageErrors[rate.company]"
                          v-if="getCourierLogo(rate.company)"
                          :src="getCourierLogo(rate.company)"
                          :alt="rate.company"
                          class="object-contain w-full h-full p-1"
                          @error="handleImageError(rate.company)"
                        />

                        <span
                          v-show="
                            imageErrors[rate.company] ||
                            !getCourierLogo(rate.company)
                          "
                          class="text-xs font-black text-gray-300"
                        >
                          {{ rate.company.toUpperCase() }}
                        </span>
                      </div>
                      <div>
                        <p
                          class="text-sm font-bold tracking-wide text-gray-800 uppercase"
                        >
                          {{ rate.company }} - {{ rate.type }}
                        </p>
                        <p class="text-gray-500 text-[10px] mt-0.5">
                          {{ rate.courier_name }} ({{ rate.duration }})
                        </p>
                      </div>
                    </div>

                    <p class="text-sm font-black text-black">
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
          class="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-28"
        >
          <h2
            class="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b"
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
                class="object-cover w-16 h-16 bg-gray-100 rounded-xl shrink-0"
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
                <p class="mt-1 text-xs font-medium text-gray-900">
                  {{ formatPrice(item.price * item.quantity) }}
                </p>
              </div>
            </div>
          </div>

          

        

          <div class="pt-4 space-y-3 text-sm border-t border-gray-50">

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
              class="pt-4 mt-2 border-t border-gray-200 border-dashed"
            >
              <div class="flex items-center justify-between mb-2">
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
            <div class="flex items-start justify-between text-gray-500">
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
                <span class="block font-medium text-gray-900">{{
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
              <span class="mt-1 text-xs tracking-widest uppercase"
                >Grand Total</span
              >
              <span class="text-xl">{{
                formatPrice(grandTotalWithDiscount)
              }}</span>
            </div>

            <div
              v-if="userData?.is_membership"
              class="flex items-center gap-3 p-3 mt-4 border border-yellow-100 bg-yellow-50 rounded-xl"
            >
              <div
                class="flex items-center justify-center w-8 h-8 text-white bg-yellow-400 rounded-full shrink-0"
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
            <span v-else class="flex items-center justify-center gap-2">
              <div
                class="w-3 h-3 border-2 rounded-full border-white/30 border-t-white animate-spin"
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
  ]
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm"
  >
    <div
      class="relative w-full max-w-2xl p-6 my-4 bg-white shadow-2xl rounded-2xl"
    >
      <button
        @click="showModal = false"
        class="absolute text-xl text-gray-400 top-4 right-5 hover:text-black"
      >
        ✕
      </button>
      <h3 class="mb-4 text-xl font-bold">Add New Address</h3>

      <form @submit.prevent="saveAddress" class="space-y-3">
        <div class="flex items-center gap-2 mb-2">
          <input type="checkbox" v-model="form.is_default" id="def" />
          <label for="def" class="text-sm">Set as my default address</label>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <input
            v-model="form.first_name_address"
            placeholder="First name"
            class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
            required
          />
          <input
            v-model="form.last_name_address"
            placeholder="Last name"
            class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-3">
          <select
            v-model="form.province"
            class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
            required
          >
            <option value="" disabled>Select Province</option>
            <option v-for="p in filteredProvinces" :key="p" :value="p">
              {{ p }}
            </option>
          </select>
          <input
            v-model="form.city"
            placeholder="City"
            class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
            required
          />
        </div>

        <div
          class="relative mt-2 overflow-hidden border border-gray-200 rounded-xl"
        >
          <div
            class="bg-amber-50 border-b border-amber-100 py-1.5 px-3 flex items-start gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <p class="text-[10px] text-amber-700 leading-tight">
              <span class="font-bold">Important:</span> Ensure the blue pin on
              the map is accurately placed exactly at your location to prevent
              delivery failures.
            </p>
          </div>

          <div
            class="flex items-center justify-between gap-2 p-2 border-b border-gray-200 bg-gray-50"
          >
            <div class="relative flex-1">
              <input
                type="text"
                v-model="searchQuery"
                @input="handleSearchInput"
                placeholder="Search area (e.g. Tunjungan Plaza)"
                class="w-full text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div
                v-if="searchResults.length > 0"
                class="absolute z-[999] mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto"
              >
                <div
                  v-for="(result, idx) in searchResults"
                  :key="idx"
                  @click="selectSearchResult(result)"
                  class="px-3 py-2 text-xs text-gray-700 border-b cursor-pointer hover:bg-blue-50 last:border-0"
                >
                  {{ result.display_name }}
                </div>
              </div>
            </div>
            <button
              type="button"
              @click="getCurrentLocation"
              class="text-[10px] bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-200 transition whitespace-nowrap"
            >
              Current Loc
            </button>
          </div>

          <div class="relative z-0 w-full h-40 sm:h-48">
            <l-map
              ref="map"
              v-model:zoom="zoom"
              :center="center"
              :use-global-leaflet="false"
              @click="onMapClick"
            >
              <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                layer-type="base"
                name="OpenStreetMap"
              ></l-tile-layer>
              <l-marker
                :lat-lng="markerLatLng"
                draggable
                @update:latLng="onMarkerDrag"
              ></l-marker>
            </l-map>
            <div
              class="absolute bottom-2 right-2 z-[400] bg-white/90 backdrop-blur px-2 py-1 rounded shadow text-[9px] font-mono text-gray-600 pointer-events-none"
            >
              {{ form.latitude ? parseFloat(form.latitude).toFixed(5) : "-" }},
              {{ form.longitude ? parseFloat(form.longitude).toFixed(5) : "-" }}
            </div>
          </div>
        </div>

        <div class="relative pt-1">
          <div class="flex items-end justify-between mb-1">
            <label
              class="font-bold text-gray-700 text-[10px] uppercase tracking-widest"
              >Detail Address</label
            >
            <span
              class="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium"
              >Editable</span
            >
          </div>
          <textarea
            v-model="form.address_location"
            rows="2"
            placeholder="Enter full street address and specific details..."
            class="w-full px-3 py-2 text-sm border outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>

        <div class="grid grid-cols-2 gap-3 pt-1">
          <input
            v-model="form.location_type"
            placeholder="Apartment, suite (optional)"
            class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
          />
          <input
            v-model="form.postal_code"
            placeholder="Postal code"
            class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
            required
          />
        </div>

        <div class="flex justify-end pt-4">
          <div class="flex gap-3">
            <button
              type="button"
              @click="showModal = false"
              class="px-3 text-sm font-bold text-gray-500 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-6 py-2 text-sm font-bold text-white transition-colors bg-blue-600 shadow-md hover:bg-blue-700 rounded-xl shadow-blue-500/30"
            >
              Save Address
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { Country, State } from "country-state-city";

// Import Leaflet (Wajib untuk Peta)
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url,
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

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

// ==========================================
// [BARU] STATE & LOGIKA UNTUK MODAL ADDRESS
// ==========================================
const showModal = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);

const form = ref({
  id: null,
  region: "Indonesia",
  first_name_address: "",
  last_name_address: "",
  address_location: "",
  location_type: "",
  city: "",
  province: "",
  postal_code: "",
  latitude: null,
  longitude: null,
  is_default: true, // Default true agar mempermudah user yang baru pertama kali tambah
});

const map = ref(null);
const zoom = ref(13);
const center = ref([-7.250445, 112.768845]); // Default Surabaya
const markerLatLng = ref([-7.250445, 112.768845]);
const searchQuery = ref("");
const searchResults = ref([]);
let debounceTimeout = null;

// Fungsi Navigasi & Map
const fetchProvinces = () => {
  const selectedCountry = countries.value.find(
    (c) => c.name === form.value.region,
  );
  if (selectedCountry) {
    filteredProvinces.value = State.getStatesOfCountry(
      selectedCountry.isoCode,
    ).map((s) => s.name);
  }
};

const openModal = () => {
  form.value = {
    region: "Indonesia",
    is_default: true,
    first_name_address: userData.value?.first_name || "",
    last_name_address: userData.value?.last_name || "",
    address_location: "",
    location_type: "",
    city: "",
    province: "",
    postal_code: "",
    latitude: null,
    longitude: null,
  };
  center.value = [-7.250445, 112.768845];
  markerLatLng.value = [-7.250445, 112.768845];
  fetchProvinces();
  showModal.value = true;
};

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    if (res.data && res.data.display_name) {
      form.value.address_location = res.data.display_name;
      if (res.data.address && res.data.address.postcode) {
        form.value.postal_code = res.data.address.postcode;
      }
    }
  } catch (error) {
    console.error("Reverse Geocode Error", error);
  }
};

const handleSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`,
      );
      searchResults.value = res.data;
    } catch (error) {
      console.error("Search Error", error);
    }
  }, 500);
};

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);

  if (map.value && map.value.leafletObject) {
    map.value.leafletObject.flyTo([lat, lng], 16);
  } else {
    center.value = [lat, lng];
    zoom.value = 16;
  }
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  form.value.address_location = result.display_name;
  searchResults.value = [];
  searchQuery.value = "";
};

const onMapClick = (event) => {
  const { lat, lng } = event.latlng;
  updateLocation(lat, lng);
};

const onMarkerDrag = (event) => {
  const { lat, lng } = event.target.getLatLng();
  updateLocation(lat, lng);
};

const updateLocation = (lat, lng) => {
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocode(lat, lng);
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if (map.value && map.value.leafletObject) {
          map.value.leafletObject.flyTo([lat, lng], 16);
        } else {
          center.value = [lat, lng];
          zoom.value = 16;
        }
        updateLocation(lat, lng);
      },
      () => {
        Swal.fire("Error", "Please allow location access.", "error");
      },
    );
  }
};

const saveAddress = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/addresses`,
      form.value,
      axiosConfig,
    );
    showModal.value = false;

    // Fetch ulang data alamat di halaman Checkout
    const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
    addresses.value = resAddr.data.data;

    // Otomatis pilih alamat yang baru saja dibuat
    const newAddressId = res.data.id || res.data.data?.id;
    if (newAddressId) {
      selectedAddressId.value = newAddressId;
    } else {
      // Fallback jika response tidak standar
      selectedAddressId.value = addresses.value[addresses.value.length - 1].id;
    }

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Address Added!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  }
};

// ==========================================
// [AKHIR] LOGIKA MODAL ADDRESS
// ==========================================

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

//     // [PERBAIKAN] Logika pengecekan alamat kosong
//     // if (addresses.value.length === 0) {
//     //   Swal.fire({
//     //     title: "Address Required",
//     //     text: "You must add a shipping address before you can proceed with the payment.",
//     //     icon: "warning",
//     //     showCancelButton: true,
//     //     confirmButtonText: "Add Address Now",
//     //     cancelButtonText: "Later",
//     //     confirmButtonColor: "#000",
//     //     allowOutsideClick: false, // Memaksa user untuk memilih
//     //   }).then((result) => {
//     //     if (result.isConfirmed) {
//     //       // Arahkan ke Profile Page jika user memilih Add Address
//     //       router.push("/profilepage");
//     //     }
//     //   });
//     // }

//     if (addresses.value.length === 0) {
//       Swal.fire({
//         title: "Address Required",
//         text: "You must add a shipping address before you can proceed with the payment.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Add Address Now",
//         cancelButtonText: "Later",
//         confirmButtonColor: "#000",
//         allowOutsideClick: false, // Memaksa user untuk memilih
//       }).then((result) => {
//         if (result.isConfirmed) {
//           // [PERBAIKAN] Langsung buka modal di halaman ini, bukan dialihkan
//           openModal();
//         }
//       });
//     } else {
//       // Jika alamat ada, pilih yang default
//       const defaultAddr = addresses.value.find((a) => a.is_default);
//       if (defaultAddr) {
//         selectedAddressId.value = defaultAddr.id;
//       } else {
//         // Jika tidak ada yang default tapi ada alamat, pilih yang pertama
//         selectedAddressId.value = addresses.value[0].id;
//       }
//     }

//     initDateTime(); // Setup awal waktu
//   } catch (error) {
//     Swal.fire("Error", "Failed to load checkout data", "error");
//   }
// };

const fetchData = async () => {
  // 1. Ambil data user dari localStorage (Instan)
  const user = localStorage.getItem("user");
  if (user) userData.value = JSON.parse(user);

  // 2. ASUMSI AWAL: Munculkan loading atau periksa State bawaan (Optional)
  // Jika Anda sebelumnya mem-passing data address via router (history.state),
  // Anda bisa mengeceknya di sini. Jika tidak, kita langsung memanggil API.

  const transactionId = route.params.id;

  // 3. Tembak API secara PARALEL untuk mempercepat proses
  try {
    const [resTrx, resAddr] = await Promise.all([
      axios.get(`${BASE_URL}/transactions/${transactionId}`, axiosConfig),
      axios.get(`${BASE_URL}/addresses`, axiosConfig),
    ]);

    transactionData.value = resTrx.data;
    addresses.value = resAddr.data.data;

    // 4. Logika Pengecekan Alamat
    if (addresses.value.length === 0) {
      // Jika kosong, pastikan Alert muncul secepat mungkin
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
          openModal(); // Langsung buka modal di halaman ini
        }
      });
    } else {
      // Jika alamat ada, otomatis pilih yang default
      const defaultAddr = addresses.value.find((a) => a.is_default);
      if (defaultAddr) {
        selectedAddressId.value = defaultAddr.id;
      } else {
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
</style> -->

<!-- <template>
  <div
    class="max-w-6xl min-h-screen px-6 py-12 mx-auto md:py-24 animate-fade-in"
  >
    <div v-if="cartItems.length === 0" class="py-20 text-center">
      <h2 class="mb-4 font-serif text-3xl">Your bag is empty</h2>
      <button
        @click="$router.push('/collections')"
        class="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-full"
      >
        Return to Shop
      </button>
    </div>

    <div v-else>
      <h1
        class="mb-12 font-serif text-3xl tracking-tighter uppercase md:text-4xl"
      >
        Checkout
      </h1>

      <div class="flex flex-col gap-12 lg:flex-row">
        <div class="flex-grow space-y-12">
          <section>
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >1</span
              >
              <h2
                class="text-sm font-bold tracking-widest text-gray-900 uppercase"
              >
                Shipping Address
              </h2>
            </div>

            <div
              v-if="addresses.length === 0"
              class="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl"
            >
              <p class="mb-2 text-sm italic text-gray-500">No address found.</p>
              <button
                @click="openModal()"
                class="text-xs font-bold text-blue-600 underline"
              >
                + Add New Address
              </button>
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
                class="relative flex items-start p-6 transition-all border cursor-pointer rounded-2xl hover:bg-white"
              >
                <input
                  type="radio"
                  name="address"
                  :value="addr.id"
                  v-model="selectedAddressId"
                  class="w-4 h-4 mt-1 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex-grow ml-4">
                  <div class="flex justify-between">
                    <p class="text-sm font-bold text-gray-900 uppercase">
                      {{ addr.receiver.full_name }}
                    </p>
                    <span
                      v-if="addr.is_default"
                      class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                      >Default</span
                    >
                  </div>
                  <p class="mt-2 text-sm leading-relaxed text-gray-600">
                    {{ addr.details.location }}, {{ addr.details.type }} <br />
                    {{ addr.details.city }}, {{ addr.details.province }} <br />
                    {{ addr.details.region }} - {{ addr.details.postal_code }}
                  </p>
                </div>
              </label>
              <button
                @click="openModal()"
                class="mt-4 text-xs font-bold text-gray-500 underline hover:text-black"
              >
                + Add Another Address
              </button>
            </div>
          </section>

          <section v-if="selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2
                class="text-sm font-bold tracking-widest text-gray-900 uppercase"
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
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="free"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p
                      class="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Free Shipping
                    </p>
                    <p class="mt-1 text-xs font-bold text-green-600">
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
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="biteship"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p
                      class="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Standard / Express
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      Powered by Biteship
                    </p>
                  </div>
                </div>
              </label>

              <div
                v-if="shippingMethod === 'biteship'"
                class="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in"
              >
                <div
                  class="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 bg-gray-50 rounded-2xl"
                >
                  <div>
                    <h3
                      class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                    >
                      Shipper Origin
                    </h3>
                    <p class="text-xs font-bold text-gray-900 uppercase">
                      {{ shipperInfo.name }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ shipperInfo.phone }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                      {{ shipperInfo.address }} - {{ shipperInfo.postal_code }}
                    </p>
                  </div>
                  <div>
                    <h3
                      class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                    >
                      Destination
                    </h3>
                    <p class="text-xs font-bold text-gray-900 uppercase">
                      {{ destinationInfo?.name }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ destinationInfo?.phone }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                      {{ destinationInfo?.address }} -
                      {{ destinationInfo?.postal_code }}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 class="mb-4 text-sm font-bold tracking-widest uppercase">
                    Pickup Schedule
                  </h3>
                  <div class="flex flex-col gap-4 mb-4 md:flex-row">
                    <label
                      :class="
                        deliveryType === 'later'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="later"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">Standard Pickup</p>
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
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="scheduled"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        Scheduled Pickup
                      </p>
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
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
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
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    class="pt-6 mb-4 text-sm font-bold tracking-widest uppercase border-t"
                  >
                    Select Courier
                  </h3>
                  <div
                    v-if="isLoadingRates"
                    class="py-4 text-sm text-center text-gray-500 animate-pulse"
                  >
                    Calculating couriers...
                  </div>
                  <div
                    v-else-if="shippingRates.length === 0"
                    class="py-4 text-xs italic text-center text-red-500"
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
                      class="flex items-center p-4 transition-all border cursor-pointer rounded-xl hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        :value="rate"
                        v-model="selectedRate"
                        class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div class="flex items-center flex-grow gap-4 ml-4">
                        <div
                          class="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0"
                        >
                          <img
                            v-show="!imageErrors[rate.company]"
                            v-if="getCourierLogo(rate.company)"
                            :src="getCourierLogo(rate.company)"
                            :alt="rate.company"
                            class="object-contain w-full h-full p-1"
                            @error="handleImageError(rate.company)"
                          />
                          <span
                            v-show="
                              imageErrors[rate.company] ||
                              !getCourierLogo(rate.company)
                            "
                            class="text-xs font-black text-gray-300"
                            >{{ rate.company.toUpperCase() }}</span
                          >
                        </div>
                        <div>
                          <p
                            class="text-sm font-bold tracking-wide text-gray-800 uppercase"
                          >
                            {{ rate.company }} - {{ rate.type }}
                          </p>
                          <p class="text-gray-500 text-[10px] mt-0.5">
                            {{ rate.courier_name }} ({{ rate.duration }})
                          </p>
                        </div>
                      </div>
                      <p class="text-sm font-black text-black">
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
            class="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-28"
          >
            <h2
              class="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b"
            >
              Order Summary
            </h2>

            <div
              class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            >
              <div v-for="item in cartItems" :key="item.id" class="flex gap-4">
                <img
                  :src="item.product.image"
                  class="object-cover w-16 h-16 bg-gray-100 rounded-xl shrink-0"
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
                  <p class="mt-1 text-xs font-medium text-gray-900">
                    {{
                      formatPrice(
                        (item.product.discount_price ?? item.product.price) *
                          item.quantity,
                      )
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-4 space-y-3 text-sm border-t border-gray-50">
              <div class="flex justify-between text-gray-500">
                <span>Total Items</span>
                <span class="font-bold text-gray-900"
                  >{{ cartCount }} items</span
                >
              </div>
              <div class="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{{ formatPrice(totalCartAmount) }}</span>
              </div>

              <div
                v-if="userData?.is_membership && userData?.point > 0"
                class="pt-4 mt-2 border-t border-gray-200 border-dashed"
              >
                <div class="flex items-center justify-between mb-2">
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

              <div class="flex items-start justify-between text-gray-500">
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
                  <span class="block font-medium text-gray-900">{{
                    formatPrice(selectedRate.price * cartCount)
                  }}</span>
                  <p class="text-[10px] text-gray-400 mt-1">
                    {{ formatPrice(selectedRate.price) }} x
                    {{ cartCount }} items
                  </p>
                </div>
                <span v-else class="italic text-[10px]">Select method</span>
              </div>

              <div
                class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
              >
                <span class="mt-1 text-xs tracking-widest uppercase"
                  >Grand Total</span
                >
                <span class="text-xl">{{
                  formatPrice(grandTotalWithDiscount)
                }}</span>
              </div>

              <div
                v-if="userData?.is_membership"
                class="flex items-center gap-3 p-3 mt-4 border border-yellow-100 bg-yellow-50 rounded-xl"
              >
                <div
                  class="flex items-center justify-center w-8 h-8 text-white bg-yellow-400 rounded-full shrink-0"
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
              <span v-else class="flex items-center justify-center gap-2">
                <div
                  class="w-3 h-3 border-2 rounded-full border-white/30 border-t-white animate-spin"
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

// Import State dari useCart
import { useCart } from "../../composables/useCart.js";

const { cartItems, cartCount, totalCartAmount } = useCart();
const router = useRouter();

const userData = ref(null);
const addresses = ref([]);
const selectedAddressId = ref(null);
const isProcessing = ref(false);

const shippingMethod = ref("free");
const shippingRates = ref([]);
const selectedRate = ref(null);
const isLoadingRates = ref(false);

const deliveryType = ref("later");
const deliveryDate = ref("");
const deliveryTime = ref("");

const pointsToUse = ref(0);
const pointConversionRate = 1000;

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const shipperInfo = {
  name: "Solher Store",
  phone: "08883888585",
  address: "Jalan Kecilung N0. 8A, Kota Surabaya, Jawa Timur 60275, Indonesia",
  postal_code: "60275",
};

const initDateTime = () => {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  deliveryDate.value = now.toISOString().split("T")[0];
  deliveryTime.value =
    now.toTimeString().split(":")[0] + ":" + now.toTimeString().split(":")[1];
};

const todayDate = computed(() => new Date().toISOString().split("T")[0]);

const destinationInfo = computed(() => {
  if (!selectedAddressId.value || !addresses.value) return null;
  const addr = addresses.value.find((a) => a.id === selectedAddressId.value);
  if (!addr) return null;
  return {
    name: addr.receiver.full_name,
    phone: userData.value?.phone || "No Phone Provided",
    address: `${addr.details.location}, ${addr.details.city}, ${addr.details.province}`,
    postal_code: addr.details.postal_code,
  };
});

const openModal = () => {
  form.value = {
    region: "Indonesia",
    is_default: true,
    first_name_address: userData.value?.first_name || "",
    last_name_address: userData.value?.last_name || "",
    address_location: "",
    location_type: "",
    city: "",
    province: "",
    postal_code: "",
    latitude: null,
    longitude: null,
  };
  center.value = [-7.250445, 112.768845];
  markerLatLng.value = [-7.250445, 112.768845];
  fetchProvinces();
  showModal.value = true;
};

const grandTotal = computed(() => {
  let total = totalCartAmount.value;
  if (shippingMethod.value === "biteship" && selectedRate.value) {
    total += parseFloat(selectedRate.value.price) * cartCount.value;
  }
  return total;
});

const imageErrors = ref({});
const handleImageError = (company) => {
  imageErrors.value[company] = true;
};
const getCourierLogo = (company) => {
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

const isButtonDisabled = computed(() => {
  if (isProcessing.value || cartItems.value.length === 0) return true;
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

const fetchData = async () => {
  try {
    const user = localStorage.getItem("user");
    if (user) userData.value = JSON.parse(user);

    // KITA TIDAK FETCH TRANSAKSI DISINI LAGI. Data langsung dari cartItems.

    const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
    addresses.value = resAddr.data.data;

    if (addresses.value.length === 0) {
      Swal.fire({
        title: "Address Required",
        text: "You must add a shipping address before you can proceed.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Add Address Now",
        cancelButtonText: "Later",
        confirmButtonColor: "#000",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          openModal(); // Function Modal Address Anda (Pastikan logic modal ada di file)
        }
      });
    } else {
      const defaultAddr = addresses.value.find((a) => a.is_default);
      if (defaultAddr) {
        selectedAddressId.value = defaultAddr.id;
      } else {
        selectedAddressId.value = addresses.value[0].id;
      }
    }

    initDateTime();
  } catch (error) {
    Swal.fire("Error", "Failed to load checkout data", "error");
  }
};

const maxUsablePoints = computed(() => {
  if (!userData.value || totalCartAmount.value === 0) return 0;
  const userBalance = userData.value.point || 0;
  const maxPointsForPrice = Math.floor(
    totalCartAmount.value / pointConversionRate,
  );
  return Math.min(userBalance, maxPointsForPrice);
});

const pointDiscountAmount = computed(
  () => (pointsToUse.value || 0) * pointConversionRate,
);

const useAllPoints = () => {
  pointsToUse.value = maxUsablePoints.value;
};

watch(pointsToUse, (newVal) => {
  if (newVal < 0) pointsToUse.value = 0;
  if (newVal > maxUsablePoints.value) pointsToUse.value = maxUsablePoints.value;
});

const grandTotalWithDiscount = computed(
  () => grandTotal.value - pointDiscountAmount.value,
);

// ===============================================
// [PERBAIKAN] API POST /CHECKOUT DIPINDAH KE SINI
// ===============================================
const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const payload = {
      address_id: selectedAddressId.value,
      shipping_method: shippingMethod.value,
      use_points: pointsToUse.value,
      courier_company:
        shippingMethod.value === "biteship"
          ? selectedRate.value?.company
          : null,
      courier_type:
        shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
      shipping_cost:
        shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
      delivery_type:
        shippingMethod.value === "biteship" ? deliveryType.value : null,
      delivery_date:
        shippingMethod.value === "biteship" ? deliveryDate.value : null,
      delivery_time:
        shippingMethod.value === "biteship" ? deliveryTime.value : null,
    };

    // Tembak API /checkout (yang sekarang membuat Transaksi sekaligus Invoice Xendit)
    const res = await axios.post(`${BASE_URL}/checkout`, payload, axiosConfig);

    // Xendit Checkout URL didapat dari response
    if (res.data.checkout_url) {
      window.location.href = res.data.checkout_url;
    }
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

const calculateEarnedPoints = computed(() => {
  if (!totalCartAmount.value) return 0;
  return Math.floor(totalCartAmount.value / 100000);
});

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

onMounted(fetchData);

// (Pastikan Anda menyalin sisa function `openModal`, `saveAddress`, dll di bagian bawah script ini)
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
  <!-- <div
    v-if="isPageLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div
      class="w-12 h-12 border-4 border-gray-100 rounded-full border-t-black animate-spin"
    ></div>
    <p class="mt-4 font-serif italic text-gray-400 animate-pulse">
      Preparing your checkout...
    </p>
  </div> -->
  <div
    v-if="isPageLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div class="flex gap-2 mb-4">
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
      <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
    </div>
    <p
      class="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse"
    >
      Preparing your checkout...
    </p>
  </div>

  <!-- <div
    v-else
    class="max-w-6xl min-h-screen px-6 py-12 mx-auto md:py-24 animate-fade-in"
  >
    <div v-if="checkoutItems.length === 0" class="py-20 text-center">
      <h2 class="mb-4 font-serif text-3xl">Your bag is empty</h2>
      <button
        @click="$router.push('/collections')"
        class="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-full"
      >
        Return to Shop
      </button>
    </div>

    <div v-else>
      <h1
        class="mb-12 font-serif text-3xl tracking-tighter uppercase md:text-4xl"
      >
        Checkout
      </h1> -->
  <div
    v-else
    class="max-w-6xl min-h-screen px-6 py-12 mx-auto md:py-24 animate-fade-in"
  >
    <div v-if="checkoutItems.length === 0" class="py-20 text-center">
      <h2 class="mb-4 font-serif text-3xl">Your bag is empty</h2>
      <button
        @click="$router.push('/collections')"
        class="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase bg-black rounded-full"
      >
        Return to Shop
      </button>
    </div>

    <div v-else>
      <h1
        class="mb-12 font-serif text-3xl tracking-tighter uppercase md:text-4xl"
      >
        Checkout
      </h1>

      <div class="flex flex-col gap-12 lg:flex-row">
        <div class="flex-grow space-y-12">
          <section>
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >1</span
              >
              <h2
                class="text-sm font-bold tracking-widest text-gray-900 uppercase"
              >
                Shipping Address
              </h2>
            </div>

            <div
              v-if="addresses.length === 0"
              class="py-10 text-center border border-gray-300 border-dashed bg-gray-50 rounded-2xl"
            >
              <p class="mb-2 text-sm italic text-gray-500">No address found.</p>
              <button
                @click="openModal()"
                class="text-xs font-bold text-blue-600 underline"
              >
                + Add New Address
              </button>
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
                class="relative flex items-start p-6 transition-all border cursor-pointer rounded-2xl hover:bg-white"
              >
                <input
                  type="radio"
                  name="address"
                  :value="addr.id"
                  v-model="selectedAddressId"
                  class="w-4 h-4 mt-1 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex-grow ml-4">
                  <div class="flex justify-between">
                    <p class="text-sm font-bold text-gray-900 uppercase">
                      {{ addr.receiver.full_name }}
                    </p>
                    <span
                      v-if="addr.is_default"
                      class="text-[9px] bg-gray-200 px-2 py-0.5 rounded font-bold uppercase"
                      >Default</span
                    >
                  </div>
                  <p class="mt-2 text-sm leading-relaxed text-gray-600">
                    {{ addr.details.location }}, {{ addr.details.type }} <br />
                    {{ addr.details.city }}, {{ addr.details.province }} <br />
                    {{ addr.details.region }} - {{ addr.details.postal_code }}
                  </p>
                </div>
              </label>
              <button
                @click="openModal()"
                class="mt-4 text-xs font-bold text-gray-500 underline hover:text-black"
              >
                + Add Another Address
              </button>
            </div>
          </section>

          <section v-if="!selectedAddressId">
            <div class="flex items-center gap-4 mb-4">
              <span
                class="flex justify-center items-center bg-black rounded-full w-6 h-6 font-bold text-[10px] text-white"
                >2</span
              >
              <h2
                class="text-sm font-bold tracking-widest text-gray-900 uppercase"
              >
                Shipping Method
              </h2>
            </div>

            <div>
              <h4 class="text-sm tracking-widest text-gray-900 uppercase">
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
                class="text-sm font-bold tracking-widest text-gray-900 uppercase"
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
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="free"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p
                      class="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Free Shipping
                    </p>
                    <p class="mt-1 text-xs font-bold text-green-600">
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
                class="relative flex items-center p-6 transition-all border cursor-pointer rounded-2xl"
              >
                <input
                  type="radio"
                  value="biteship"
                  v-model="shippingMethod"
                  class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                />
                <div class="flex items-center justify-between flex-grow ml-4">
                  <div>
                    <p
                      class="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Standard / Express
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      Powered by Biteship
                    </p>
                  </div>
                </div>
              </label>

              <div
                v-if="shippingMethod === 'biteship'"
                class="p-6 mt-4 space-y-8 bg-white border border-gray-200 rounded-3xl animate-fade-in"
              >
                <div
                  class="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 bg-gray-50 rounded-2xl"
                >
                  <!-- <div>
                    <h3
                      class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                    >
                      Shipper Origin
                    </h3>
                    <p class="text-xs font-bold text-gray-900 uppercase">
                      {{ shipperInfo.name }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ shipperInfo.phone }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                      {{ shipperInfo.address }} - {{ shipperInfo.postal_code }}
                    </p>
                  </div> -->
                  <div>
                    <h3
                      class="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em] mb-3"
                    >
                      Destination
                    </h3>
                    <p class="text-xs font-bold text-gray-900 uppercase">
                      {{ destinationInfo?.name }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500">
                      {{ destinationInfo?.phone }}
                    </p>
                    <p class="mt-1 text-xs text-gray-500 line-clamp-2">
                      {{ destinationInfo?.address }} -
                      {{ destinationInfo?.postal_code }}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 class="mb-4 text-sm font-bold tracking-widest uppercase">
                    Pickup Schedule
                  </h3>
                  <!-- <div class="flex flex-col gap-4 mb-4 md:flex-row">
                    <label
                      :class="
                        deliveryType === 'now'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="later"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">Standard Pickup</p>
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
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="scheduled"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        Scheduled Pickup
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        Choose specific date & time
                      </p>
                    </label>
                  </div> -->

                  <div class="flex flex-col gap-4 mb-4 md:flex-row">
                    <label
                      :class="
                        deliveryType === 'now'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="now"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">Standard Pickup</p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        Pickup Now
                      </p>
                    </label>
                    <label
                      :class="
                        deliveryType === 'scheduled'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 transition border cursor-pointer rounded-xl"
                    >
                      <input
                        type="radio"
                        value="scheduled"
                        v-model="deliveryType"
                        class="hidden"
                      />
                      <p class="text-xs font-bold uppercase">
                        Scheduled Pickup
                      </p>
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
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
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
                        class="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:ring-black focus:border-black"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3
                    class="pt-6 mb-4 text-sm font-bold tracking-widest uppercase border-t"
                  >
                    Select Courier
                  </h3>
                  <div
                    v-if="isLoadingRates"
                    class="py-4 text-sm text-center text-gray-500 animate-pulse"
                  >
                    Calculating couriers...
                  </div>
                  <div
                    v-else-if="processedShippingRates.length === 0"
                    class="py-4 text-xs italic text-center text-red-500"
                  >
                    No couriers available.
                  </div>
                  <!-- <div v-else class="space-y-3">
                    <label 
                      v-for="(rate, idx) in shippingRates"
                      :key="idx"
                      :class="[
                        selectedRate?.company === rate.company &&
                        selectedRate?.type === rate.type
                          ? 'border-black bg-gray-50 shadow-sm'
                          : 'border-gray-200',
                      ]"
                      class="flex items-center p-4 transition-all border cursor-pointer rounded-xl hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        :value="rate"
                        v-model="selectedRate"
                        class="w-4 h-4 text-black border-gray-300 focus:ring-black"
                      />
                      <div class="flex items-center flex-grow gap-4 ml-4">
                        <div
                          class="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0"
                        >
                          <img
                            v-show="!imageErrors[rate.company]"
                            v-if="getCourierLogo(rate.company)"
                            :src="getCourierLogo(rate.company)"
                            :alt="rate.company"
                            class="object-contain w-full h-full p-1"
                            @error="handleImageError(rate.company)"
                          />
                          <span
                            v-show="
                              imageErrors[rate.company] ||
                              !getCourierLogo(rate.company)
                            "
                            class="text-xs font-black text-gray-300"
                            >{{ rate.company.toUpperCase() }}</span
                          >
                        </div>
                        <div>
                          <p
                            class="text-sm font-bold tracking-wide text-gray-800 uppercase"
                          >
                            {{ rate.company }} - {{ rate.type }}
                          </p>
                          <p class="text-gray-500 text-[10px] mt-0.5">
                            {{ rate.courier_name }} ({{ rate.duration }})
                          </p>
                        </div>
                      </div>
                      <p class="text-sm font-black text-black">
                        {{ formatPrice(rate.price) }}
                      </p>
                    </label>
                  </div> -->
                  <!-- <div v-else class="space-y-3">
                    <label
                      v-for="(rate, idx) in shippingRates"
                      :key="idx"
                      :class="[
                        rate.is_disabled ? 'opacity-40 bg-gray-100 border-gray-200 pointer-events-none select-none' :
                        (selectedRate?.company === rate.company && selectedRate?.type === rate.type
                          ? 'border-black bg-gray-50 shadow-sm'
                          : 'border-gray-200 hover:bg-gray-50 cursor-pointer transition-all'),
                      ]"
                      class="relative flex flex-col p-4 border rounded-xl"
                    >
                      <div class="flex items-center w-full">
                        <input
                          type="radio"
                          :value="rate"
                          v-model="selectedRate"
                          :disabled="rate.is_disabled"
                          class="w-4 h-4 text-black border-gray-300 focus:ring-black disabled:opacity-50"
                        />
                        <div class="flex items-center flex-grow gap-4 ml-4">
                          <div class="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0">
                            <img
                              v-show="!imageErrors[rate.company]"
                              v-if="getCourierLogo(rate.company)"
                              :src="getCourierLogo(rate.company)"
                              :alt="rate.company"
                              class="object-contain w-full h-full p-1"
                              @error="handleImageError(rate.company)"
                            />
                            <span v-show="imageErrors[rate.company] || !getCourierLogo(rate.company)" class="text-xs font-black text-gray-300">
                              {{ rate.company.toUpperCase() }}
                            </span>
                          </div>
                          <div>
                            <p class="text-sm font-bold tracking-wide text-gray-800 uppercase">
                              {{ rate.company }} - {{ rate.type }}
                            </p>
                            <p class="text-gray-500 text-[10px] mt-0.5">
                              {{ rate.courier_name }} ({{ rate.duration }})
                            </p>
                          </div>
                        </div>
                        <p class="text-sm font-black text-black">
                          {{ formatPrice(rate.price) }}
                        </p>
                      </div>

                      <div v-if="rate.is_disabled" class="mt-3 ml-8 text-[10px] text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 font-bold uppercase tracking-widest">
                        ⚠️ Unavailable: {{ rate.disable_reason }}
                      </div>
                    </label>
                  </div> -->
                  <div v-else class="space-y-3">
                    <label
                      v-for="(rate, idx) in processedShippingRates"
                      :key="idx"
                      :class="[
                        rate.is_disabled
                          ? 'opacity-40 bg-gray-100 border-gray-200 pointer-events-none select-none'
                          : selectedRate?.company === rate.company &&
                              selectedRate?.type === rate.type
                            ? 'border-black bg-gray-50 shadow-sm'
                            : 'border-gray-200 hover:bg-gray-50 cursor-pointer transition-all',
                      ]"
                      class="relative flex flex-col p-4 border rounded-xl"
                    >
                      <div class="flex items-center w-full">
                        <input
                          type="radio"
                          :value="rate"
                          v-model="selectedRate"
                          :disabled="rate.is_disabled"
                          class="w-4 h-4 text-black border-gray-300 focus:ring-black disabled:opacity-50"
                        />
                        <div class="flex items-center flex-grow gap-4 ml-4">
                          <div
                            class="flex items-center justify-center w-12 h-12 overflow-hidden bg-white border border-gray-100 rounded-lg shrink-0"
                          >
                            <img
                              v-show="!imageErrors[rate.company]"
                              v-if="getCourierLogo(rate.company)"
                              :src="getCourierLogo(rate.company)"
                              :alt="rate.company"
                              class="object-contain w-full h-full p-1"
                              @error="handleImageError(rate.company)"
                            />
                            <span
                              v-show="
                                imageErrors[rate.company] ||
                                !getCourierLogo(rate.company)
                              "
                              class="text-xs font-black text-gray-300"
                            >
                              {{ rate.company.toUpperCase() }}
                            </span>
                          </div>
                          <div>
                            <p
                              class="text-sm font-bold tracking-wide text-gray-800 uppercase"
                            >
                              {{ rate.company }} - {{ rate.type }}
                            </p>
                            <p class="text-gray-500 text-[10px] mt-0.5">
                              {{ rate.courier_name }} ({{ rate.duration }})
                            </p>
                          </div>
                        </div>
                        <p class="text-sm font-black text-black">
                          {{ formatPrice(rate.price) }}
                        </p>
                      </div>

                      <div
                        v-if="rate.is_disabled"
                        class="mt-3 ml-8 text-[10px] text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 font-bold uppercase tracking-widest"
                      >
                        ⚠️ Unavailable: {{ rate.disable_reason }}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div class="lg:w-[400px] space-y-6">
          <div
            class="sticky p-8 bg-white border border-gray-100 shadow-xl rounded-3xl top-28"
          >
            <h2
              class="pb-4 mb-6 text-sm font-bold tracking-widest text-gray-900 uppercase border-b"
            >
              Order Summary
            </h2>

            <div
              class="space-y-4 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar"
            >
              <!-- <div v-for="item in cartItems" :key="item.id" class="flex gap-4"> -->
              <div
                v-for="item in checkoutItems"
                :key="item.id"
                class="flex gap-4"
              >
                <img
                  :src="item.product.image"
                  class="object-cover w-16 h-16 bg-gray-100 rounded-xl shrink-0"
                />
                <div class="flex-grow">
                  <!-- <p
                    class="font-bold text-gray-900 text-[11px] uppercase truncate w-32"
                  >
                    {{ item.product.name }}
                  </p> -->
                  <p
                    class="font-bold text-gray-900 text-[11px] uppercase truncate w-32"
                    :title="item.product.name"
                  >
                    {{ item.product.name }}
                  </p>
                  <p v-if="item.color" class="text-gray-500 text-[9px] uppercase tracking-widest mt-0.5">
                    Color: <span class="font-bold text-gray-700">{{ item.color }}</span>
                  </p>
                  <p class="text-gray-400 text-[10px]">
                    Qty: {{ item.quantity }}
                  </p>
                  <p class="mt-1 text-xs font-medium text-gray-900">
                    {{
                      formatPrice(
                        (item.product.discount_price ?? item.product.price) *
                          item.quantity,
                      )
                    }}
                  </p>
                </div>
              </div>
            </div>

            <div class="pt-4 space-y-3 text-sm border-t border-gray-50">
              <div class="flex justify-between text-gray-500">
                <span>Total Items</span>
                <span class="font-bold text-gray-900"
                  >{{ checkoutCount }} items</span
                >
              </div>
              <div class="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>{{ formatPrice(checkoutTotalAmount) }}</span>
              </div>

              <div class="pt-4 mt-2 border-t border-gray-200 border-dashed">
                <label
                  class="text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-2 block"
                >
                  Promo Code
                </label>
                <div class="flex gap-2">
                  <input
                    type="text"
                    v-model="promoInput"
                    :disabled="appliedPromoCode !== null || isVerifyingPromo"
                    placeholder="Enter your promo code"
                    class="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-1.5 text-sm uppercase focus:ring-black outline-none disabled:bg-gray-100 disabled:text-gray-400"
                  />
                  <button
                    v-if="!appliedPromoCode"
                    @click="applyPromo"
                    :disabled="!promoInput || isVerifyingPromo"
                    class="bg-black text-white text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-gray-800 transition disabled:bg-gray-300 w-20 flex justify-center items-center"
                  >
                    <span v-if="!isVerifyingPromo">Apply</span>
                    <div
                      v-else
                      class="w-3 h-3 border-2 rounded-full border-white/40 border-t-white animate-spin"
                    ></div>
                  </button>
                  <button
                    v-else
                    @click="removePromo"
                    class="bg-red-50 text-red-600 border border-red-200 text-[10px] font-bold uppercase px-4 rounded-lg hover:bg-red-100 transition w-20"
                  >
                    Remove
                  </button>
                </div>
                <p
                  v-if="promoMessage"
                  :class="promoSuccess ? 'text-green-600' : 'text-red-500'"
                  class="text-[10px] mt-2 font-medium"
                >
                  {{ promoMessage }}
                </p>
                <div
                  v-if="appliedPromoCode"
                  class="flex items-center justify-between mt-2"
                >
                  <span
                    class="text-[10px] font-bold text-gray-500 uppercase tracking-widest"
                    >Promo Applied</span
                  >
                  <span class="text-[11px] text-green-600 font-medium"
                    >- {{ formatPrice(promoDiscountAmount) }}</span
                  >
                </div>
              </div>

              <div
                v-if="userData?.is_membership && userData?.point > 0"
                class="pt-4 mt-2 border-t border-gray-200 border-dashed"
              >
                <div class="flex items-center justify-between mb-2">
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
              <div class="flex items-start justify-between text-gray-500">
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
                  <span class="block font-medium text-gray-900">{{
                    formatPrice(selectedRate.price * checkoutCount)
                  }}</span>
                  <p class="text-[10px] text-gray-400 mt-1">
                    {{ formatPrice(selectedRate.price) }} x
                    {{ checkoutCount }} items
                  </p>
                </div>
                <span v-else class="italic text-[10px]">Select method</span>
              </div>

              <div
                class="flex justify-between pt-4 font-bold text-gray-900 border-t border-gray-100"
              >
                <span class="mt-1 text-xs tracking-widest uppercase"
                  >Grand Total</span
                >
                <span class="text-xl">{{
                  formatPrice(grandTotalWithDiscount)
                }}</span>
              </div>

              <div
                v-if="userData?.is_membership"
                class="flex items-center gap-3 p-3 mt-4 border border-yellow-100 bg-yellow-50 rounded-xl"
              >
                <div
                  class="flex items-center justify-center w-8 h-8 text-white bg-yellow-400 rounded-full shrink-0"
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
              <span v-else class="flex items-center justify-center gap-2">
                <div
                  class="w-3 h-3 border-2 rounded-full border-white/30 border-t-white animate-spin"
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

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/40 backdrop-blur-sm"
    >
      <div
        class="relative w-full max-w-2xl p-6 my-4 bg-white shadow-2xl rounded-2xl"
      >
        <button
          @click="showModal = false"
          class="absolute text-xl text-gray-400 top-4 right-5 hover:text-black"
        >
          ✕
        </button>
        <h3 class="mb-4 text-xl font-bold">Add New Address</h3>

        <form @submit.prevent="saveAddress" class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <input type="checkbox" v-model="form.is_default" id="def" />
            <label for="def" class="text-sm">Set as my default address</label>
          </div>

          <div class="grid grid-cols-2 gap-3">
            <input
              v-model="form.first_name_address"
              placeholder="First name"
              class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
              required
            />
            <input
              v-model="form.last_name_address"
              placeholder="Last name"
              class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
              required
            />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <select
              v-model="form.province"
              class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
              required
            >
              <option value="" disabled>Select Province</option>
              <option v-for="p in filteredProvinces" :key="p" :value="p">
                {{ p }}
              </option>
            </select>
            <input
              v-model="form.city"
              placeholder="City"
              class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
              required
            />
          </div>

          <div
            class="relative mt-2 overflow-hidden border border-gray-200 rounded-xl"
          >
            <div
              class="bg-amber-50 border-b border-amber-100 py-1.5 px-3 flex items-start gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p class="text-[10px] text-amber-700 leading-tight">
                <span class="font-bold">Important:</span> Ensure the blue pin on
                the map is accurately placed exactly at your location to prevent
                delivery failures.
              </p>
            </div>

            <div
              class="flex items-center justify-between gap-2 p-2 border-b border-gray-200 bg-gray-50"
            >
              <div class="relative flex-1">
                <input
                  type="text"
                  v-model="searchQuery"
                  @input="handleSearchInput"
                  placeholder="Search area (e.g. Tunjungan Plaza)"
                  class="w-full text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div
                  v-if="searchResults.length > 0"
                  class="absolute z-[999] mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto"
                >
                  <div
                    v-for="(result, idx) in searchResults"
                    :key="idx"
                    @click="selectSearchResult(result)"
                    class="px-3 py-2 text-xs text-gray-700 border-b cursor-pointer hover:bg-blue-50 last:border-0"
                  >
                    {{ result.display_name }}
                  </div>
                </div>
              </div>
              <button
                type="button"
                @click="getCurrentLocation"
                class="text-[10px] bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-200 transition whitespace-nowrap"
              >
                Current Loc
              </button>
            </div>

            <div class="relative z-0 w-full h-40 sm:h-48">
              <l-map
                ref="map"
                v-model:zoom="zoom"
                :center="center"
                :use-global-leaflet="false"
                @click="onMapClick"
              >
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>
                <l-marker
                  :lat-lng="markerLatLng"
                  draggable
                  @update:latLng="onMarkerDrag"
                ></l-marker>
              </l-map>
              <div
                class="absolute bottom-2 right-2 z-[400] bg-white/90 backdrop-blur px-2 py-1 rounded shadow text-[9px] font-mono text-gray-600 pointer-events-none"
              >
                {{
                  form.latitude ? parseFloat(form.latitude).toFixed(5) : "-"
                }},
                {{
                  form.longitude ? parseFloat(form.longitude).toFixed(5) : "-"
                }}
              </div>
            </div>
          </div>

          <div class="relative pt-1">
            <div class="flex items-end justify-between mb-1">
              <label
                class="font-bold text-gray-700 text-[10px] uppercase tracking-widest"
                >Detail Address</label
              >
              <span
                class="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium"
                >Editable</span
              >
            </div>
            <textarea
              v-model="form.address_location"
              rows="2"
              placeholder="Enter full street address and specific details..."
              class="w-full px-3 py-2 text-sm border outline-none resize-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div class="grid grid-cols-2 gap-3 pt-1">
            <input
              v-model="form.location_type"
              placeholder="Apartment, suite (optional)"
              class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
            />
            <input
              v-model="form.postal_code"
              placeholder="Postal code"
              class="px-3 py-2 text-sm border outline-none bg-gray-50 rounded-xl"
              required
            />
          </div>

          <div class="flex justify-end pt-4">
            <div class="flex gap-3">
              <button
                type="button"
                @click="showModal = false"
                class="px-3 text-sm font-bold text-gray-500 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="px-6 py-2 text-sm font-bold text-white transition-colors bg-blue-600 shadow-md hover:bg-blue-700 rounded-xl shadow-blue-500/30"
              >
                Save Address
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted, watch, computed, nextTick } from "vue";
// import { useRouter } from "vue-router";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api.js";

// // Import State dari useCart
// import { useCart } from "../../composables/useCart.js";

// // const { cartItems, cartCount, totalCartAmount, clearCart } = useCart();
// const {
//   cartItems,
//   checkoutCount, // Gantikan cartCount dengan checkoutCount
//   checkoutTotalAmount, // Gantikan totalCartAmount dengan checkoutTotalAmount
//   selectedItemIds,
//   clearSelectedCart, // Gantikan clearCart dengan clearSelectedCart
// } = useCart();

// import { Country, State } from "country-state-city";

// // Import Leaflet (Wajib untuk Peta)
// import "leaflet/dist/leaflet.css";
// import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
// import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: new URL(
//     "leaflet/dist/images/marker-icon-2x.png",
//     import.meta.url,
//   ).href,
//   iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
//   shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
//     .href,
// });

// const router = useRouter();

// const userData = ref(null);
// const addresses = ref([]);
// const selectedAddressId = ref(null);
// const isProcessing = ref(false);

// const shippingMethod = ref("free");
// // const shippingRates = ref([]);
// const selectedRate = ref(null);
// const isLoadingRates = ref(false);

// const deliveryType = ref("now");
// const deliveryDate = ref("");
// const deliveryTime = ref("");

// const pointsToUse = ref(0);
// const pointConversionRate = 1000;

// // State Promo
// const promoInput = ref("");
// const appliedPromoCode = ref(null);
// const promoDiscountAmount = ref(0);
// const promoMessage = ref("");
// const promoSuccess = ref(false);
// const isVerifyingPromo = ref(false);

// // const applyPromo = async () => {
// //   if (!promoInput.value) return;
// //   isVerifyingPromo.value = true;
// //   try {
// //     const res = await axios.post(
// //       `${BASE_URL}/promo/verify`,
// //       { promo_code: promoInput.value },
// //       axiosConfig,
// //     );

// //     // Cek batas minimal belanja Rp 50.000
// //     if (checkoutTotalAmount.value < 50000) {
// //       throw new Error("Minimum spend for this promo is Rp 50.000");
// //     }

// //     promoSuccess.value = true;
// //     promoMessage.value = "✅ " + res.data.message;
// //     appliedPromoCode.value = promoInput.value.toUpperCase();

// //     // Terapkan Zero-Floor (Diskon tidak boleh lebih dari total barang)
// //     promoDiscountAmount.value = Math.min(
// //       res.data.discount_value,
// //       checkoutTotalAmount.value,
// //     );

// //     // Reset points jika poin melebihi sisa harga setelah promo
// //     if (pointsToUse.value > maxUsablePoints.value) {
// //       pointsToUse.value = maxUsablePoints.value;
// //     }
// //   } catch (error) {
// //     promoSuccess.value = false;
// //     promoMessage.value =
// //       "❌ " +
// //       (error.message || error.response?.data?.message || "Invalid promo");
// //     appliedPromoCode.value = null;
// //     promoDiscountAmount.value = 0;
// //   } finally {
// //     isVerifyingPromo.value = false;
// //   }
// // };

// const applyPromo = async () => {
//   if (!promoInput.value) return;
//   isVerifyingPromo.value = true;
//   try {
//     const res = await axios.post(
//       `${BASE_URL}/promo/verify`,
//       { promo_code: promoInput.value },
//       axiosConfig,
//     );

//     // Cek batas minimal belanja Rp 50.000
//     if (checkoutTotalAmount.value < 50000) {
//       throw new Error("Minimum spend for this promo is Rp 50.000");
//     }

//     promoSuccess.value = true;
//     promoMessage.value = "✅ " + res.data.message;
//     appliedPromoCode.value = promoInput.value.toUpperCase();

//     // Terapkan Zero-Floor (Diskon tidak boleh lebih dari total barang)
//     promoDiscountAmount.value = Math.min(
//       res.data.discount_value,
//       checkoutTotalAmount.value,
//     );

//     // Reset points jika poin melebihi sisa harga setelah promo
//     if (pointsToUse.value > maxUsablePoints.value) {
//       pointsToUse.value = maxUsablePoints.value;
//     }
//   } catch (error) {
//     // =========================================================================
//     // [PERBAIKAN] TAMPILKAN PESAN ERROR SPESIFIK DARI BACKEND
//     // =========================================================================
//     promoSuccess.value = false;
    
//     // Prioritas 1: Ambil pesan error spesifik dari Backend (response 404/400)
//     // Prioritas 2: Ambil pesan error buatan Frontend (seperti "Minimum spend...")
//     // Prioritas 3: Pesan error default
//     let errorMessage = "Invalid promo code.";
//     if (error.response && error.response.data && error.response.data.message) {
//       errorMessage = error.response.data.message;
//     } else if (error.message) {
//       errorMessage = error.message;
//     }

//     promoMessage.value = "❌ " + errorMessage;
//     appliedPromoCode.value = null;
//     promoDiscountAmount.value = 0;
//   } finally {
//     isVerifyingPromo.value = false;
//   }
// };

// const removePromo = () => {
//   promoInput.value = "";
//   appliedPromoCode.value = null;
//   promoDiscountAmount.value = 0;
//   promoMessage.value = "";
//   promoSuccess.value = false;
// };

// // =========================================================================
// // [PERBAIKAN] LOGIKA PENGIRIMAN SUPER-REAKTIF & VALIDASI KETAT
// // =========================================================================
// const rawShippingRates = ref([]); // Data murni dari API

// // NEW STATE
// const isPageLoading = ref(true);

// const axiosConfig = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// };

// const shipperInfo = {
//   name: "Solher Store",
//   phone: "08883888585",
//   address: "Jalan Kecilung N0. 8A, Kota Surabaya, Jawa Timur 60275, Indonesia",
//   postal_code: "60275",
// };

// // 1. Hitung Kuantitas Total Barang (Bukan jenis barang, tapi total buah)
// const totalQuantityToCheckout = computed(() => {
//   return checkoutItems.value.reduce((sum, item) => sum + item.quantity, 0);
// });

// // 2. Rumus Haversine: Mengukur Jarak Koordinat Asli dari Toko (Surabaya) ke Alamat User
// const getDistanceFromOrigin = (destLat, destLng) => {
//   if (!destLat || !destLng) return 999;
//   const lat1 = -7.25706; // Latitude Solher Store
//   const lon1 = 112.74549; // Longitude Solher Store
//   const lat2 = parseFloat(destLat);
//   const lon2 = parseFloat(destLng);

//   const R = 6371; // Radius bumi dalam KM
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) *
//       Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   return R * c; // Hasil dalam KM
// };

// // 3. Computed Property: Akan otomatis berjalan Ulang setiap kali Jam, Tanggal, Alamat, atau Berat berubah!
// // const processedShippingRates = computed(() => {
// //   if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];

// //   let checkHour = new Date().getHours();

// //   // Validasi Waktu Dinamis
// //   if (deliveryType.value === 'scheduled' && deliveryTime.value) {
// //      if (deliveryDate.value === todayDate.value) {
// //         checkHour = parseInt(deliveryTime.value.split(':')[0]);
// //      } else {
// //         checkHour = 12; // Jika pilih besok, jam aman dianggap jam 12 siang
// //      }
// //   } else {
// //      checkHour += 1; // Jika 'now', asumsi API Backend menjadwalkan 1 jam ke depan
// //   }

// //   const totalWeightKg = totalQuantityToCheckout.value; // Asumsi 1 barang = 1 KG

// //   // Validasi Jarak Dinamis
// //   const destInfo = addresses.value.find(a => a.id === selectedAddressId.value);
// //   const distanceKm = destInfo ? getDistanceFromOrigin(destInfo.details.latitude, destInfo.details.longitude) : 999;

// //   const rates = rawShippingRates.value.map(rate => {
// //     let is_disabled = false;
// //     let disable_reason = "";
// //     const type = rate.type.toLowerCase();
// //     const company = rate.company.toLowerCase();

// //     // A. Aturan Jarak (Maks 40KM untuk Ojek Online)
// //     if (company === 'gojek' || company === 'grab') {
// //        if (distanceKm > 40) {
// //          is_disabled = true;
// //          disable_reason = `Jarak > 40km (${distanceKm.toFixed(1)}km)`;
// //        }
// //     }

// //     // B. Aturan Gojek
// //     if (!is_disabled && company === 'gojek') {
// //       if (type.includes('same day') || type.includes('sameday')) {
// //         if (checkHour >= 15 || checkHour < 6) {
// //           is_disabled = true;
// //           disable_reason = "Tutup. Jam Operasional 06:00 - 15:00";
// //         } else if (totalWeightKg > 7) {
// //           is_disabled = true;
// //           disable_reason = "Berat Maksimal 7kg";
// //         }
// //       }
// //       else if (type.includes('instant')) {
// //         if (checkHour >= 17 || checkHour < 6) {
// //           is_disabled = true;
// //           disable_reason = "Tutup. Jam Operasional 06:00 - 17:00";
// //         } else if (totalWeightKg > 20) {
// //           is_disabled = true;
// //           disable_reason = "Berat Maksimal 20kg";
// //         }
// //       }
// //     }
// //     // C. Aturan Grab
// //     else if (!is_disabled && company === 'grab') {
// //       if (type.includes('same day') || type.includes('sameday')) {
// //         if (checkHour >= 14 || checkHour < 9) { // Aturan ketat dari Error Log Anda
// //           is_disabled = true;
// //           disable_reason = "Tutup. Jam Operasional 09:00 - 14:00";
// //         } else if (totalWeightKg > 7) {
// //           is_disabled = true;
// //           disable_reason = "Berat Maksimal 7kg";
// //         }
// //       }
// //       else if (type.includes('instant')) {
// //         if (checkHour >= 18 || checkHour < 8) {
// //           is_disabled = true;
// //           disable_reason = "Tutup. Jam Operasional 08:00 - 18:00";
// //         } else if (totalWeightKg > 20) {
// //           is_disabled = true;
// //           disable_reason = "Berat Maksimal 20kg";
// //         }
// //       }
// //     }

// //     return { ...rate, is_disabled, disable_reason };
// //   });

// //   // Urutkan: Kurir yang aktif di atas, yang disabled di bawah
// //   return rates.sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));
// // });

// // 3. Computed Property: Auto-Run saat Jam, Tanggal, Alamat, atau Berat berubah
// // const processedShippingRates = computed(() => {
// //   // Pastikan data mentah tersedia
// //   if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];

// //   let checkHour = new Date().getHours();

// //   // Validasi Waktu Dinamis
// //   if (deliveryType.value === 'scheduled' && deliveryTime.value) {
// //      if (deliveryDate.value === todayDate.value) {
// //         checkHour = parseInt(deliveryTime.value.split(':')[0]);
// //      } else {
// //         checkHour = 12; // Jika besok, selalu aman (jam 12)
// //      }
// //   } else {
// //      checkHour += 1; // Jika 'now', asumsi pickup 1 jam dari sekarang
// //   }

// //   const totalWeightKg = totalQuantityToCheckout.value || 1;

// //   // Validasi Jarak Dinamis
// //   let distanceKm = 999;
// //   if (addresses.value && selectedAddressId.value) {
// //       const destInfo = addresses.value.find(a => a.id === selectedAddressId.value);
// //       if (destInfo && destInfo.details.latitude && destInfo.details.longitude) {
// //           distanceKm = getDistanceFromOrigin(destInfo.details.latitude, destInfo.details.longitude);
// //       }
// //   }

// //   const rates = rawShippingRates.value.map(rate => {
// //     let is_disabled = false;
// //     let disable_reason = "";

// //     // Pastikan aman jika API Biteship mengirim data kosong
// //     const type = rate.type ? rate.type.toLowerCase() : '';
// //     const company = rate.company ? rate.company.toLowerCase() : '';

// //     // A. Aturan Jarak (Maks 40KM untuk Ojek Online)
// //     if (company === 'gojek' || company === 'grab') {
// //        if (distanceKm > 40) {
// //          is_disabled = true;
// //          disable_reason = `Jarak > 40km (${distanceKm.toFixed(1)}km)`;
// //        }
// //     }

// //     // B. Aturan Gojek
// //     if (!is_disabled && company === 'gojek') {
// //       if (type.includes('same day') || type.includes('sameday')) {
// //         if (checkHour >= 14 || checkHour < 6) { // Tutup jam 15, batas aman jam 14
// //           is_disabled = true;
// //           disable_reason = "Tutup. Operasional 06:00 - 14:00";
// //         } else if (totalWeightKg > 7) {
// //           is_disabled = true;
// //           disable_reason = "Berat Maks 7kg";
// //         }
// //       }
// //       else if (type.includes('instant')) {
// //         if (checkHour >= 16 || checkHour < 6) { // Tutup jam 17, batas aman jam 16
// //           is_disabled = true;
// //           disable_reason = "Tutup. Operasional 06:00 - 16:00";
// //         } else if (totalWeightKg > 20) {
// //           is_disabled = true;
// //           disable_reason = "Berat Maks 20kg";
// //         }
// //       }
// //     }
// //     // C. Aturan Grab
// //     else if (!is_disabled && company === 'grab') {
// //       if (type.includes('same day') || type.includes('sameday')) {
// //         if (checkHour >= 14 || checkHour < 9) {
// //           is_disabled = true;
// //           disable_reason = "Tutup. Operasional 09:00 - 14:00";
// //         } else if (totalWeightKg > 7) {
// //           is_disabled = true;
// //           disable_reason = "Berat Maks 7kg";
// //         }
// //       }
// //       else if (type.includes('instant')) {
// //         if (checkHour >= 18 || checkHour < 8) {
// //           is_disabled = true;
// //           disable_reason = "Tutup. Operasional 08:00 - 18:00";
// //         } else if (totalWeightKg > 20) {
// //           is_disabled = true;
// //           disable_reason = "Berat Maks 20kg";
// //         }
// //       }
// //     }

// //     return { ...rate, is_disabled, disable_reason };
// //   });

// //   // [PERBAIKAN PENTING] Jangan mengurutkan langsung pada array yang dihasilkan map() jika memori rentan.
// //   // Buat salinan (spread operator) lalu urutkan.
// //   return [...rates].sort((a, b) => {
// //     if (a.is_disabled === b.is_disabled) return 0;
// //     return a.is_disabled ? 1 : -1;
// //   });
// // });

// // 3. Computed Property: Akan otomatis berjalan Ulang setiap kali Jam, Tanggal, Alamat, atau Berat berubah!
// const processedShippingRates = computed(() => {
//   // Pastikan data mentah tersedia
//   if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];

//   let checkHour = new Date().getHours();

//   // Validasi Waktu Dinamis
//   if (deliveryType.value === "scheduled" && deliveryTime.value) {
//     if (deliveryDate.value === todayDate.value) {
//       checkHour = parseInt(deliveryTime.value.split(":")[0]);
//     } else {
//       checkHour = 12; // Jika besok, selalu aman (jam 12 siang)
//     }
//   } else {
//     // Jika 'now', kita gunakan jam saat ini
//     checkHour = new Date().getHours();
//   }

//   const totalWeightKg = totalQuantityToCheckout.value || 1;

//   // Validasi Jarak Dinamis
//   let distanceKm = 999;
//   if (addresses.value && selectedAddressId.value) {
//     const destInfo = addresses.value.find(
//       (a) => a.id === selectedAddressId.value,
//     );
//     if (destInfo && destInfo.details.latitude && destInfo.details.longitude) {
//       distanceKm = getDistanceFromOrigin(
//         destInfo.details.latitude,
//         destInfo.details.longitude,
//       );
//     }
//   }

//   const rates = rawShippingRates.value.map((rate) => {
//     let is_disabled = false;
//     let disable_reason = "";

//     // [PERBAIKAN KRUSIAL] Hapus underscore (_) agar "same_day" berubah jadi "same day"
//     const type = rate.type ? rate.type.toLowerCase().replace(/_/g, " ") : "";
//     const company = rate.company ? rate.company.toLowerCase() : "";

//     // A. Aturan Jarak (Maks 40KM untuk Ojek Online)
//     if (company === "gojek" || company === "grab") {
//       if (distanceKm > 40) {
//         is_disabled = true;
//         disable_reason = `Jarak > 40km (${distanceKm.toFixed(1)}km)`;
//       }
//     }

//     // B. Aturan Gojek
//     if (!is_disabled && company === "gojek") {
//       if (type.includes("same day") || type.includes("sameday")) {
//         // Gojek Same Day: Tutup Jam 15:00
//         if (checkHour >= 15 || checkHour < 6) {
//           is_disabled = true;
//           disable_reason = "Tutup. Operasional 06:00 - 15:00";
//         } else if (totalWeightKg > 7) {
//           is_disabled = true;
//           disable_reason = "Berat Maks 7kg";
//         }
//       } else if (type.includes("instant")) {
//         // Gojek Instant: Tutup Jam 17:00
//         if (checkHour >= 17 || checkHour < 6) {
//           is_disabled = true;
//           disable_reason = "Tutup. Operasional 06:00 - 17:00";
//         } else if (totalWeightKg > 20) {
//           is_disabled = true;
//           disable_reason = "Berat Maks 20kg";
//         }
//       }
//     }
//     // C. Aturan Grab
//     else if (!is_disabled && company === "grab") {
//       if (type.includes("same day") || type.includes("sameday")) {
//         // Grab Same Day: Tutup Jam 14:00 (Sesuai Error Biteship)
//         if (checkHour >= 14 || checkHour < 9) {
//           is_disabled = true;
//           disable_reason = "Tutup. Operasional 09:00 - 14:00";
//         } else if (totalWeightKg > 7) {
//           is_disabled = true;
//           disable_reason = "Berat Maks 7kg";
//         }
//       } else if (type.includes("instant")) {
//         // Grab Instant: Tutup Jam 18:00
//         if (checkHour >= 18 || checkHour < 8) {
//           is_disabled = true;
//           disable_reason = "Tutup. Operasional 08:00 - 18:00";
//         } else if (totalWeightKg > 20) {
//           is_disabled = true;
//           disable_reason = "Berat Maks 20kg";
//         }
//       }
//     }

//     return { ...rate, is_disabled, disable_reason };
//   });

//   // Urutkan agar kurir yang "Disabled" turun ke posisi paling bawah
//   return [...rates].sort((a, b) => {
//     if (a.is_disabled === b.is_disabled) return 0;
//     return a.is_disabled ? 1 : -1;
//   });
// });

// const initDateTime = () => {
//   const now = new Date();
//   now.setHours(now.getHours() + 1);
//   deliveryDate.value = now.toISOString().split("T")[0];
//   deliveryTime.value =
//     now.toTimeString().split(":")[0] + ":" + now.toTimeString().split(":")[1];
// };

// const todayDate = computed(() => new Date().toISOString().split("T")[0]);

// const destinationInfo = computed(() => {
//   if (!selectedAddressId.value || !addresses.value) return null;
//   const addr = addresses.value.find((a) => a.id === selectedAddressId.value);
//   if (!addr) return null;
//   return {
//     name: addr.receiver.full_name,
//     phone: userData.value?.phone || "No Phone Provided",
//     address: `${addr.details.location}, ${addr.details.city}, ${addr.details.province}`,
//     postal_code: addr.details.postal_code,
//   };
// });

// const grandTotal = computed(() => {
//   let total = checkoutTotalAmount.value;
//   if (shippingMethod.value === "biteship" && selectedRate.value) {
//     total += parseFloat(selectedRate.value.price) * checkoutCount.value;
//   }
//   return total;
// });

// const imageErrors = ref({});
// const handleImageError = (company) => {
//   imageErrors.value[company] = true;
// };
// const getCourierLogo = (company) => {
//   const baseUrl = "/courier_images/";
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

// const isButtonDisabled = computed(() => {
//   if (isProcessing.value || cartItems.value.length === 0) return true;
//   if (!selectedAddressId.value) return true;
//   if (shippingMethod.value === "biteship") {
//     if (!selectedRate.value) return true;
//     if (
//       deliveryType.value === "scheduled" &&
//       (!deliveryDate.value || !deliveryTime.value)
//     )
//       return true;
//   }
//   return false;
// });

// // watch(selectedAddressId, async (newVal) => {
// //   if (newVal) {
// //     selectedRate.value = null;
// //     isLoadingRates.value = true;
// //     shippingRates.value = [];
// //     try {
// //       const res = await axios.post(
// //         `${BASE_URL}/shipping/rates`,
// //         { address_id: newVal },
// //         axiosConfig,
// //       );
// //       if (res.data && res.data.pricing) shippingRates.value = res.data.pricing;
// //     } catch (error) {
// //       Swal.fire({
// //         toast: true,
// //         position: "top-end",
// //         icon: "error",
// //         title: "Failed to calculate shipping.",
// //         showConfirmButton: false,
// //         timer: 4000,
// //       });
// //     } finally {
// //       isLoadingRates.value = false;
// //     }
// //   }
// // });

// // watch(selectedAddressId, async (newVal) => {
// //   if (newVal) {
// //     selectedRate.value = null;
// //     isLoadingRates.value = true;
// //     shippingRates.value = [];
// //     try {
// //       const res = await axios.post(
// //         `${BASE_URL}/shipping/rates`,
// //         {
// //           address_id: newVal,
// //           total_quantity: checkoutCount.value // [PERBAIKAN] Kirim total quantity ke backend
// //         },
// //         axiosConfig,
// //       );

// //       if (res.data && res.data.pricing) {
// //         const currentHour = new Date().getHours();
// //         const totalWeightKg = checkoutCount.value; // Karena 1 item = 1kg

// //         // [PERBAIKAN] Menyuntikkan aturan Validasi Lokal (Ojek Online)
// //         const processedRates = res.data.pricing.map(rate => {
// //           let is_disabled = false;
// //           let disable_reason = "";

// //           const type = rate.type.toLowerCase();
// //           const company = rate.company.toLowerCase();

// //           if (company === 'gojek' || company === 'grab') {
// //             if (type.includes('same day') || type.includes('sameday')) {
// //               // Same Day maksimal jam 15:00
// //               if (currentHour >= 15 || currentHour < 6) {
// //                 is_disabled = true;
// //                 disable_reason = "Out of operational hours (06:00 - 15:00)";
// //               } else if (totalWeightKg > 7) {
// //                 is_disabled = true;
// //                 disable_reason = "Weight exceeds max limit (7kg)";
// //               }
// //             }
// //             else if (type.includes('instant')) {
// //               // Instant maksimal jam 17:00
// //               if (currentHour >= 17 || currentHour < 6) {
// //                 is_disabled = true;
// //                 disable_reason = "Out of operational hours (06:00 - 17:00)";
// //               } else if (totalWeightKg > 20) {
// //                 is_disabled = true;
// //                 disable_reason = "Weight exceeds max limit (20kg)";
// //               }
// //             }
// //           }

// //           return { ...rate, is_disabled, disable_reason };
// //         });

// //         // Urutkan agar kurir yang "Disabled" turun ke posisi paling bawah
// //         processedRates.sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));

// //         shippingRates.value = processedRates;
// //       }
// //     } catch (error) {
// //       Swal.fire({
// //         toast: true,
// //         position: "top-end",
// //         icon: "error",
// //         title: "Failed to calculate shipping.",
// //         showConfirmButton: false,
// //         timer: 4000,
// //       });
// //     } finally {
// //       isLoadingRates.value = false;
// //     }
// //   }
// // });

// // watch(selectedAddressId, async (newVal) => {
// //   if (newVal) {
// //     selectedRate.value = null;
// //     isLoadingRates.value = true;
// //     shippingRates.value = [];
// //     try {
// //       const res = await axios.post(
// //         `${BASE_URL}/shipping/rates`,
// //         {
// //           address_id: newVal,
// //           total_quantity: checkoutCount.value
// //         },
// //         axiosConfig,
// //       );

// //       if (res.data && res.data.pricing) {
// //         const currentHour = new Date().getHours();
// //         const totalWeightKg = checkoutCount.value;

// //         const processedRates = res.data.pricing.map(rate => {
// //           let is_disabled = false;
// //           let disable_reason = "";

// //           const type = rate.type.toLowerCase();
// //           const company = rate.company.toLowerCase();

// //           if (company === 'gojek' || company === 'grab') {
// //             if (type.includes('same day') || type.includes('sameday')) {
// //               // [PERBAIKAN] Same Day tutup jam 15:00. Kita blokir di jam 14:00.
// //               if (currentHour >= 14 || currentHour < 6) {
// //                 is_disabled = true;
// //                 disable_reason = "Out of operational hours (06:00 - 14:00)";
// //               } else if (totalWeightKg > 7) {
// //                 is_disabled = true;
// //                 disable_reason = "Weight exceeds max limit (7kg)";
// //               }
// //             }
// //             else if (type.includes('instant')) {
// //               // [PERBAIKAN] Instant tutup 17:00, kita blokir di jam 16:00
// //               if (currentHour >= 16 || currentHour < 6) {
// //                 is_disabled = true;
// //                 disable_reason = "Out of operational hours (06:00 - 16:00)";
// //               } else if (totalWeightKg > 20) {
// //                 is_disabled = true;
// //                 disable_reason = "Weight exceeds max limit (20kg)";
// //               }
// //             }
// //           }

// //           return { ...rate, is_disabled, disable_reason };
// //         });

// //         // Sort agar yang disabled pindah ke paling bawah
// //         processedRates.sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));

// //         shippingRates.value = processedRates;
// //       }
// //     } catch (error) {
// //       Swal.fire({
// //         toast: true,
// //         position: "top-end",
// //         icon: "error",
// //         title: "Failed to calculate shipping.",
// //         showConfirmButton: false,
// //         timer: 4000,
// //       });
// //     } finally {
// //       isLoadingRates.value = false;
// //     }
// //   }
// // });

// // 4. API Fetcher
// watch(selectedAddressId, async (newVal) => {
//   if (newVal) {
//     // [PERBAIKAN PENTING] Rem darurat: Jangan tembak API jika keranjang masih kosong
//     if (!selectedItemIds.value || selectedItemIds.value.length === 0) return;
//     selectedRate.value = null;
//     isLoadingRates.value = true;
//     rawShippingRates.value = [];
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/shipping/rates`,
//         {
//           address_id: newVal,
//           // total_quantity: totalQuantityToCheckout.value, // Kuantitas akurat
//           // [PERBAIKAN] Kirim ID barang yang dipilih, biarkan backend yang menimbang
//           cart_ids: selectedItemIds.value,
//         },
//         axiosConfig,
//       );
//       if (res.data && res.data.pricing) {
//         rawShippingRates.value = res.data.pricing;
//       }
//     } catch (error) {
//       Swal.fire({
//         toast: true,
//         position: "top-end",
//         icon: "error",
//         title: "Failed to calculate shipping.",
//         showConfirmButton: false,
//         timer: 4000,
//       });
//     } finally {
//       isLoadingRates.value = false;
//     }
//   }
// });

// // 5. [Auto-Healing] Batalkan pilihan jika user iseng mengganti jam hingga kurir tersebut expired
// watch(
//   processedShippingRates,
//   (newRates) => {
//     if (selectedRate.value) {
//       const match = newRates.find(
//         (r) =>
//           r.company === selectedRate.value.company &&
//           r.type === selectedRate.value.type,
//       );
//       if (match && match.is_disabled) {
//         selectedRate.value = null; // Auto un-select!
//       }
//     }
//   },
//   { deep: true },
// );

// watch(shippingMethod, (newVal) => {
//   if (newVal === "free") selectedRate.value = null;
// });
// watch(deliveryType, (newVal) => {
//   if (newVal === "now") initDateTime();
// });

// // ==========================================
// // [BARU] STATE & LOGIKA UNTUK MODAL ADDRESS
// // ==========================================
// const showModal = ref(false);
// const countries = ref(Country.getAllCountries());
// const filteredProvinces = ref([]);

// const form = ref({
//   id: null,
//   region: "Indonesia",
//   first_name_address: "",
//   last_name_address: "",
//   address_location: "",
//   location_type: "",
//   city: "",
//   province: "",
//   postal_code: "",
//   latitude: null,
//   longitude: null,
//   is_default: true, // Default true agar mempermudah user yang baru pertama kali tambah
// });

// const map = ref(null);
// const zoom = ref(13);
// const center = ref([-7.250445, 112.768845]); // Default Surabaya
// const markerLatLng = ref([-7.250445, 112.768845]);
// const searchQuery = ref("");
// const searchResults = ref([]);
// let debounceTimeout = null;

// // Fungsi Navigasi & Map
// const fetchProvinces = () => {
//   const selectedCountry = countries.value.find(
//     (c) => c.name === form.value.region,
//   );
//   if (selectedCountry) {
//     filteredProvinces.value = State.getStatesOfCountry(
//       selectedCountry.isoCode,
//     ).map((s) => s.name);
//   }
// };

// const openModal = () => {
//   form.value = {
//     region: "Indonesia",
//     is_default: true,
//     first_name_address: userData.value?.first_name || "",
//     last_name_address: userData.value?.last_name || "",
//     address_location: "",
//     location_type: "",
//     city: "",
//     province: "",
//     postal_code: "",
//     latitude: null,
//     longitude: null,
//   };
//   center.value = [-7.250445, 112.768845];
//   markerLatLng.value = [-7.250445, 112.768845];
//   fetchProvinces();
//   showModal.value = true;
// };

// const reverseGeocode = async (lat, lng) => {
//   try {
//     const res = await axios.get(
//       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
//     );
//     if (res.data && res.data.display_name) {
//       form.value.address_location = res.data.display_name;
//       if (res.data.address && res.data.address.postcode) {
//         form.value.postal_code = res.data.address.postcode;
//       }
//     }
//   } catch (error) {
//     console.error("Reverse Geocode Error", error);
//   }
// };

// const handleSearchInput = () => {
//   if (debounceTimeout) clearTimeout(debounceTimeout);
//   if (searchQuery.value.length < 3) {
//     searchResults.value = [];
//     return;
//   }
//   debounceTimeout = setTimeout(async () => {
//     try {
//       const res = await axios.get(
//         `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`,
//       );
//       searchResults.value = res.data;
//     } catch (error) {
//       console.error("Search Error", error);
//     }
//   }, 500);
// };

// const selectSearchResult = (result) => {
//   const lat = parseFloat(result.lat);
//   const lng = parseFloat(result.lon);

//   if (map.value && map.value.leafletObject) {
//     map.value.leafletObject.flyTo([lat, lng], 16);
//   } else {
//     center.value = [lat, lng];
//     zoom.value = 16;
//   }
//   markerLatLng.value = [lat, lng];
//   form.value.latitude = lat.toString();
//   form.value.longitude = lng.toString();
//   form.value.address_location = result.display_name;
//   searchResults.value = [];
//   searchQuery.value = "";
// };

// const onMapClick = (event) => {
//   const { lat, lng } = event.latlng;
//   updateLocation(lat, lng);
// };

// const onMarkerDrag = (event) => {
//   const { lat, lng } = event.target.getLatLng();
//   updateLocation(lat, lng);
// };

// const updateLocation = (lat, lng) => {
//   markerLatLng.value = [lat, lng];
//   form.value.latitude = lat.toString();
//   form.value.longitude = lng.toString();
//   reverseGeocode(lat, lng);
// };

// const getCurrentLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         if (map.value && map.value.leafletObject) {
//           map.value.leafletObject.flyTo([lat, lng], 16);
//         } else {
//           center.value = [lat, lng];
//           zoom.value = 16;
//         }
//         updateLocation(lat, lng);
//       },
//       () => {
//         Swal.fire("Error", "Please allow location access.", "error");
//       },
//     );
//   }
// };

// const saveAddress = async () => {
//   try {
//     const res = await axios.post(
//       `${BASE_URL}/addresses`,
//       form.value,
//       axiosConfig,
//     );
//     showModal.value = false;

//     // Fetch ulang data alamat di halaman Checkout
//     const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
//     addresses.value = resAddr.data.data;

//     // Otomatis pilih alamat yang baru saja dibuat
//     const newAddressId = res.data.id || res.data.data?.id;
//     if (newAddressId) {
//       selectedAddressId.value = newAddressId;
//     } else {
//       // Fallback jika response tidak standar
//       selectedAddressId.value = addresses.value[addresses.value.length - 1].id;
//     }

//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon: "success",
//       title: "Address Added!",
//       showConfirmButton: false,
//       timer: 1500,
//     });
//   } catch (e) {
//     Swal.fire("Error", "Failed to save address", "error");
//   }
// };

// // ==========================================
// // [AKHIR] LOGIKA MODAL ADDRESS
// // ==========================================

// // const fetchData = async () => {
// //   try {
// //     const user = localStorage.getItem("user");
// //     if (user) userData.value = JSON.parse(user);

// //     // KITA TIDAK FETCH TRANSAKSI DISINI LAGI. Data langsung dari cartItems.

// //     const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
// //     addresses.value = resAddr.data.data;

// //     if (addresses.value.length === 0) {
// //       Swal.fire({
// //         title: "Address Required",
// //         text: "You must add a shipping address before you can proceed.",
// //         icon: "warning",
// //         showCancelButton: true,
// //         confirmButtonText: "Add Address Now",
// //         cancelButtonText: "Later",
// //         confirmButtonColor: "#000",
// //         allowOutsideClick: false,
// //       }).then((result) => {
// //         if (result.isConfirmed) {
// //           openModal(); // Function Modal Address Anda (Pastikan logic modal ada di file)
// //         }
// //       });
// //     } else {
// //       const defaultAddr = addresses.value.find((a) => a.is_default);
// //       if (defaultAddr) {
// //         selectedAddressId.value = defaultAddr.id;
// //       } else {
// //         selectedAddressId.value = addresses.value[0].id;
// //       }
// //     }

// //     initDateTime();
// //   } catch (error) {
// //     Swal.fire("Error", "Failed to load checkout data", "error");
// //   }
// // };

// const fetchData = async () => {
//   try {
//     const user = localStorage.getItem("user");
//     if (user) userData.value = JSON.parse(user);

//     const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
//     addresses.value = resAddr.data.data;

//     if (addresses.value.length > 0) {
//       const defaultAddr = addresses.value.find((a) => a.is_default);
//       if (defaultAddr) {
//         selectedAddressId.value = defaultAddr.id;
//       } else {
//         selectedAddressId.value = addresses.value[0].id;
//       }
//     }

//     initDateTime();

//     // Matikan loading, DOM halaman akan me-render kerangka
//     isPageLoading.value = false;

//     // Tunggu sampai Vue selesai menggambar struktur HTML baru
//     await nextTick();

//     // Tampilkan popup SEKARANG! (akan muncul bersamaan dengan halaman secara visual)
//     if (addresses.value.length === 0) {
//       Swal.fire({
//         title: "Address Required",
//         text: "You must add a shipping address before you can proceed.",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Add Address Now",
//         cancelButtonText: "Later",
//         confirmButtonColor: "#000",
//         allowOutsideClick: false,
//       }).then((result) => {
//         if (result.isConfirmed) {
//           openModal();
//         }
//       });
//     }
//   } catch (error) {
//     isPageLoading.value = false;
//     Swal.fire("Error", "Failed to load checkout data", "error");
//   }
// };

// // const maxUsablePoints = computed(() => {
// //   if (!userData.value || checkoutTotalAmount.value === 0) return 0;
// //   const userBalance = userData.value.point || 0;
// //   const maxPointsForPrice = Math.floor(
// //     checkoutTotalAmount.value / pointConversionRate,
// //   );
// //   return Math.min(userBalance, maxPointsForPrice);
// // });

// // [PERBAIKAN] Pastikan Poin tidak memotong Harga Promo
// const maxUsablePoints = computed(() => {
//   if (!userData.value || checkoutTotalAmount.value === 0) return 0;
//   const userBalance = userData.value.point || 0;

//   // Harga yang bisa dipotong poin = Subtotal Barang - Diskon Promo
//   const priceAfterPromo = checkoutTotalAmount.value - promoDiscountAmount.value;
//   const maxPointsForPrice = Math.floor(
//     Math.max(0, priceAfterPromo) / pointConversionRate,
//   );

//   return Math.min(userBalance, maxPointsForPrice);
// });

// const pointDiscountAmount = computed(
//   () => (pointsToUse.value || 0) * pointConversionRate,
// );

// const useAllPoints = () => {
//   pointsToUse.value = maxUsablePoints.value;
// };

// watch(pointsToUse, (newVal) => {
//   if (newVal < 0) pointsToUse.value = 0;
//   if (newVal > maxUsablePoints.value) pointsToUse.value = maxUsablePoints.value;
// });

// // const grandTotalWithDiscount = computed(
// //   () => grandTotal.value - pointDiscountAmount.value,
// // );

// // [PERBAIKAN] Grand Total Akhir
// const grandTotalWithDiscount = computed(() => {
//   let total = grandTotal.value; // (Subtotal + Ongkir)
//   return total - promoDiscountAmount.value - pointDiscountAmount.value;
// });

// // ===============================================
// // [PERBAIKAN] API POST /CHECKOUT DIPINDAH KE SINI
// // ===============================================
// // const handlePayment = async () => {
// //   isProcessing.value = true;
// //   try {
// //     const payload = {
// //       address_id: selectedAddressId.value,
// //       shipping_method: shippingMethod.value,
// //       use_points: pointsToUse.value,
// //       courier_company:
// //         shippingMethod.value === "biteship"
// //           ? selectedRate.value?.company
// //           : null,
// //       courier_type:
// //         shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
// //       shipping_cost:
// //         shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
// //       delivery_type:
// //         shippingMethod.value === "biteship" ? deliveryType.value : null,
// //       delivery_date:
// //         shippingMethod.value === "biteship" ? deliveryDate.value : null,
// //       delivery_time:
// //         shippingMethod.value === "biteship" ? deliveryTime.value : null,
// //     };

// //     // Tembak API /checkout (yang sekarang membuat Transaksi sekaligus Invoice Xendit)
// //     const res = await axios.post(`${BASE_URL}/checkout`, payload, axiosConfig);

// //     // Xendit Checkout URL didapat dari response
// //     if (res.data.checkout_url) {
// //       window.location.href = res.data.checkout_url;
// //     }
// //   } catch (error) {
// //     Swal.fire(
// //       "Payment Error",
// //       error.response?.data?.message || "Failed to create invoice",
// //       "error",
// //     );
// //   } finally {
// //     isProcessing.value = false;
// //   }
// // };

// const handlePayment = async () => {
//   isProcessing.value = true;
//   try {
//     const payload = {
//       address_id: selectedAddressId.value,
//       shipping_method: shippingMethod.value,
//       use_points: pointsToUse.value,
//       cart_ids: selectedItemIds.value,
//       courier_company:
//         shippingMethod.value === "biteship"
//           ? selectedRate.value?.company
//           : null,
//       courier_type:
//         shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
//       shipping_cost:
//         shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
//       delivery_type:
//         shippingMethod.value === "biteship" ? deliveryType.value : null,
//       delivery_date:
//         shippingMethod.value === "biteship" ? deliveryDate.value : null,
//       delivery_time:
//         shippingMethod.value === "biteship" ? deliveryTime.value : null,
//       promo_code: appliedPromoCode.value,
//     };

//     // Tembak API /checkout (yang sekarang membuat Transaksi sekaligus Invoice Xendit)
//     const res = await axios.post(`${BASE_URL}/checkout`, payload, axiosConfig);

//     // Xendit Checkout URL didapat dari response
//     if (res.data.checkout_url) {
//       // [PERBAIKAN] KOSONGKAN KERANJANG DI MEMORI FRONTEND
//       // clearCart();

//       // [PERBAIKAN] KOSONGKAN KERANJANG (HANYA BARANG YANG DIBELI) DI MEMORI FRONTEND
//       clearSelectedCart();

//       // Redirect ke Xendit
//       window.location.href = res.data.checkout_url;
//     }
//   } catch (error) {
//     Swal.fire(
//       "Payment Error",
//       error.response?.data?.message || "Failed to create invoice",
//       "error",
//     );
//   } finally {
//     isProcessing.value = false;
//   }
// };

// const calculateEarnedPoints = computed(() => {
//   if (!checkoutTotalAmount.value) return 0;
//   return Math.floor(checkoutTotalAmount.value / 100000);
// });

// // Buat computed untuk menyaring barang yang benar-benar akan dibayar
// const checkoutItems = computed(() => {
//   return cartItems.value.filter((item) =>
//     selectedItemIds.value.includes(item.id),
//   );
// });

// const formatPrice = (v) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(v);

// onMounted(fetchData);

// // (Pastikan Anda menyalin sisa function `openModal`, `saveAddress`, dll di bagian bawah script ini)

import { ref, onMounted, watch, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useCart } from "../../composables/useCart.js";
import { Country, State } from "country-state-city";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const router = useRouter();

// =======================================================
// [PERBAIKAN SUPER KRITIS]: FUNGSI DINAMIS UNTUK TOKEN
// Ini akan mengambil token paling segar agar tidak kena 401
// =======================================================
const getAxiosConfig = () => {
  return {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };
};

const {
  cartItems, checkoutCount, checkoutTotalAmount, selectedItemIds, clearSelectedCart,
} = useCart();

const userData = ref(null);
const addresses = ref([]);
const selectedAddressId = ref(null);
const isProcessing = ref(false);
const shippingMethod = ref("free");
const selectedRate = ref(null);
const isLoadingRates = ref(false);
const deliveryType = ref("now");
const deliveryDate = ref("");
const deliveryTime = ref("");
const pointsToUse = ref(0);
const pointConversionRate = 1000;
const promoInput = ref("");
const appliedPromoCode = ref(null);
const promoDiscountAmount = ref(0);
const promoMessage = ref("");
const promoSuccess = ref(false);
const isVerifyingPromo = ref(false);
const rawShippingRates = ref([]);
const isPageLoading = ref(true);

const shipperInfo = {
  name: "Solher Store",
  phone: "08883888585",
  address: "Jalan Wijaya Kusuma No.57, Kota Surabaya, Jawa Timur 60272, Indonesia",
  postal_code: "60272",
};

const totalQuantityToCheckout = computed(() => {
  return checkoutItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

const getDistanceFromOrigin = (destLat, destLng) => {
  if (!destLat || !destLng) return 999;
  // const lat1 = -7.25706; 
  const lat1 = -7.25653; 
  // const lon1 = 112.74549; 
  const lon1 = 112.74877; 
  const lat2 = parseFloat(destLat);
  const lon2 = parseFloat(destLng);
  const R = 6371; 
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

const processedShippingRates = computed(() => {
  if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];
  let checkHour = new Date().getHours();
  if (deliveryType.value === "scheduled" && deliveryTime.value) {
    if (deliveryDate.value === todayDate.value) {
      checkHour = parseInt(deliveryTime.value.split(":")[0]);
    } else {
      checkHour = 12; 
    }
  } else {
    checkHour = new Date().getHours();
  }

  const totalWeightKg = totalQuantityToCheckout.value || 1;
  let distanceKm = 999;
  if (addresses.value && selectedAddressId.value) {
    const destInfo = addresses.value.find((a) => a.id === selectedAddressId.value);
    if (destInfo && destInfo.details.latitude && destInfo.details.longitude) {
      distanceKm = getDistanceFromOrigin(destInfo.details.latitude, destInfo.details.longitude);
    }
  }

  const rates = rawShippingRates.value.map((rate) => {
    let is_disabled = false;
    let disable_reason = "";
    const type = rate.type ? rate.type.toLowerCase().replace(/_/g, " ") : "";
    const company = rate.company ? rate.company.toLowerCase() : "";

    if (company === "gojek" || company === "grab") {
      if (distanceKm > 40) {
        is_disabled = true;
        disable_reason = `Jarak > 40km (${distanceKm.toFixed(1)}km)`;
      }
    }
    if (!is_disabled && company === "gojek") {
      if (type.includes("same day") || type.includes("sameday")) {
        if (checkHour >= 15 || checkHour < 6) {
          is_disabled = true; disable_reason = "Tutup. Operasional 06:00 - 15:00";
        } else if (totalWeightKg > 7) {
          is_disabled = true; disable_reason = "Berat Maks 7kg";
        }
      } else if (type.includes("instant")) {
        if (checkHour >= 17 || checkHour < 6) {
          is_disabled = true; disable_reason = "Tutup. Operasional 06:00 - 17:00";
        } else if (totalWeightKg > 20) {
          is_disabled = true; disable_reason = "Berat Maks 20kg";
        }
      }
    }
    else if (!is_disabled && company === "grab") {
      if (type.includes("same day") || type.includes("sameday")) {
        if (checkHour >= 14 || checkHour < 9) {
          is_disabled = true; disable_reason = "Tutup. Operasional 09:00 - 14:00";
        } else if (totalWeightKg > 7) {
          is_disabled = true; disable_reason = "Berat Maks 7kg";
        }
      } else if (type.includes("instant")) {
        if (checkHour >= 18 || checkHour < 8) {
          is_disabled = true; disable_reason = "Tutup. Operasional 08:00 - 18:00";
        } else if (totalWeightKg > 20) {
          is_disabled = true; disable_reason = "Berat Maks 20kg";
        }
      }
    }
    return { ...rate, is_disabled, disable_reason };
  });

  return [...rates].sort((a, b) => {
    if (a.is_disabled === b.is_disabled) return 0;
    return a.is_disabled ? 1 : -1;
  });
});

const applyPromo = async () => {
  if (!promoInput.value) return;
  isVerifyingPromo.value = true;
  try {
    const res = await axios.post(`${BASE_URL}/promo/verify`, { promo_code: promoInput.value }, getAxiosConfig());
    if (checkoutTotalAmount.value < 50000) throw new Error("Minimum spend for this promo is Rp 50.000");
    promoSuccess.value = true;
    promoMessage.value = "✅ " + res.data.message;
    appliedPromoCode.value = promoInput.value.toUpperCase();
    promoDiscountAmount.value = Math.min(res.data.discount_value, checkoutTotalAmount.value);
    if (pointsToUse.value > maxUsablePoints.value) pointsToUse.value = maxUsablePoints.value;
  } catch (error) {
    promoSuccess.value = false;
    let errorMessage = "Invalid promo code.";
    if (error.response && error.response.data && error.response.data.message) errorMessage = error.response.data.message;
    else if (error.message) errorMessage = error.message;
    promoMessage.value = "❌ " + errorMessage;
    appliedPromoCode.value = null;
    promoDiscountAmount.value = 0;
  } finally {
    isVerifyingPromo.value = false;
  }
};

const removePromo = () => {
  promoInput.value = ""; appliedPromoCode.value = null; promoDiscountAmount.value = 0; promoMessage.value = ""; promoSuccess.value = false;
};

const initDateTime = () => {
  const now = new Date(); now.setHours(now.getHours() + 1);
  deliveryDate.value = now.toISOString().split("T")[0];
  deliveryTime.value = now.toTimeString().split(":")[0] + ":" + now.toTimeString().split(":")[1];
};

const todayDate = computed(() => new Date().toISOString().split("T")[0]);

const destinationInfo = computed(() => {
  if (!selectedAddressId.value || !addresses.value) return null;
  const addr = addresses.value.find((a) => a.id === selectedAddressId.value);
  if (!addr) return null;
  return {
    name: addr.receiver.full_name, phone: userData.value?.phone || "No Phone Provided",
    address: `${addr.details.location}, ${addr.details.city}, ${addr.details.province}`, postal_code: addr.details.postal_code,
  };
});

const grandTotal = computed(() => {
  let total = checkoutTotalAmount.value;
  if (shippingMethod.value === "biteship" && selectedRate.value) total += parseFloat(selectedRate.value.price) * checkoutCount.value;
  return total;
});

const imageErrors = ref({});
const handleImageError = (company) => { imageErrors.value[company] = true; };
const getCourierLogo = (company) => {
  const baseUrl = "/courier_images/";
  const map = { jne: "jne.png", sicepat: "sicepat.png", jnt: "jnt.png", anteraja: "anteraja.png", gojek: "gojek.png", grab: "grab.png", paxel: "paxel.png", ninja: "ninja.png" };
  const logo = map[company.toLowerCase()]; return logo ? baseUrl + logo : null;
};

const isButtonDisabled = computed(() => {
  if (isProcessing.value || cartItems.value.length === 0 || !selectedAddressId.value) return true;
  if (shippingMethod.value === "biteship") {
    if (!selectedRate.value) return true;
    if (deliveryType.value === "scheduled" && (!deliveryDate.value || !deliveryTime.value)) return true;
  }
  return false;
});

// ==============================================================
// WATCHER SHIPPING RATES: Menggunakan token dinamis agar aman
// ==============================================================
watch(selectedAddressId, async (newVal) => {
  if (newVal) {
    if (!selectedItemIds.value || selectedItemIds.value.length === 0) return;
    selectedRate.value = null; isLoadingRates.value = true; rawShippingRates.value = [];
    try {
      const res = await axios.post(`${BASE_URL}/shipping/rates`, { address_id: newVal, cart_ids: selectedItemIds.value }, getAxiosConfig());
      if (res.data && res.data.pricing) rawShippingRates.value = res.data.pricing;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        return Swal.fire("Session Expired", "Please login again.", "warning").then(() => router.push("/login"));
      }
      Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Failed to calculate shipping.", showConfirmButton: false, timer: 4000 });
    } finally {
      isLoadingRates.value = false;
    }
  }
});

watch(processedShippingRates, (newRates) => {
  if (selectedRate.value) {
    const match = newRates.find((r) => r.company === selectedRate.value.company && r.type === selectedRate.value.type);
    if (match && match.is_disabled) selectedRate.value = null;
  }
}, { deep: true });

watch(shippingMethod, (newVal) => { if (newVal === "free") selectedRate.value = null; });
watch(deliveryType, (newVal) => { if (newVal === "now") initDateTime(); });

const showModal = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const form = ref({ id: null, region: "Indonesia", first_name_address: "", last_name_address: "", address_location: "", location_type: "", city: "", province: "", postal_code: "", latitude: null, longitude: null, is_default: true });
const map = ref(null); const zoom = ref(13); const center = ref([-7.250445, 112.768845]); const markerLatLng = ref([-7.250445, 112.768845]);
const searchQuery = ref(""); const searchResults = ref([]); let debounceTimeout = null;

const fetchProvinces = () => {
  const selectedCountry = countries.value.find((c) => c.name === form.value.region);
  if (selectedCountry) filteredProvinces.value = State.getStatesOfCountry(selectedCountry.isoCode).map((s) => s.name);
};

const openModal = () => {
  form.value = { region: "Indonesia", is_default: true, first_name_address: userData.value?.first_name || "", last_name_address: userData.value?.last_name || "", address_location: "", location_type: "", city: "", province: "", postal_code: "", latitude: null, longitude: null };
  center.value = [-7.250445, 112.768845]; markerLatLng.value = [-7.250445, 112.768845]; fetchProvinces(); showModal.value = true;
};

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    if (res.data && res.data.display_name) { form.value.address_location = res.data.display_name; if (res.data.address && res.data.address.postcode) form.value.postal_code = res.data.address.postcode; }
  } catch (error) { console.error("Reverse Geocode Error", error); }
};

const handleSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  if (searchQuery.value.length < 3) { searchResults.value = []; return; }
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`);
      searchResults.value = res.data;
    } catch (error) {}
  }, 500);
};

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat); const lng = parseFloat(result.lon);
  if (map.value && map.value.leafletObject) map.value.leafletObject.flyTo([lat, lng], 16); else { center.value = [lat, lng]; zoom.value = 16; }
  markerLatLng.value = [lat, lng]; form.value.latitude = lat.toString(); form.value.longitude = lng.toString(); form.value.address_location = result.display_name; searchResults.value = []; searchQuery.value = "";
};

const onMapClick = (event) => { const { lat, lng } = event.latlng; updateLocation(lat, lng); };
const onMarkerDrag = (event) => { const { lat, lng } = event.target.getLatLng(); updateLocation(lat, lng); };
const updateLocation = (lat, lng) => { markerLatLng.value = [lat, lng]; form.value.latitude = lat.toString(); form.value.longitude = lng.toString(); reverseGeocode(lat, lng); };

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude; const lng = position.coords.longitude;
      if (map.value && map.value.leafletObject) map.value.leafletObject.flyTo([lat, lng], 16); else { center.value = [lat, lng]; zoom.value = 16; }
      updateLocation(lat, lng);
    }, () => Swal.fire("Error", "Please allow location access.", "error"));
  }
};

const saveAddress = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/addresses`, form.value, getAxiosConfig());
    showModal.value = false;
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data;
    selectedAddressId.value = res.data.id || res.data.data?.id || addresses.value[addresses.value.length - 1].id;
    Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Address Added!", showConfirmButton: false, timer: 1500 });
  } catch (e) { Swal.fire("Error", "Failed to save address", "error"); }
};

const fetchData = async () => {
  try {
    const user = localStorage.getItem("user"); if (user) userData.value = JSON.parse(user);
    const resAddr = await axios.get(`${BASE_URL}/addresses`, getAxiosConfig());
    addresses.value = resAddr.data.data;
    if (addresses.value.length > 0) {
      const defaultAddr = addresses.value.find((a) => a.is_default);
      selectedAddressId.value = defaultAddr ? defaultAddr.id : addresses.value[0].id;
    }
    initDateTime();
    isPageLoading.value = false; await nextTick();
    if (addresses.value.length === 0) {
      Swal.fire({ title: "Address Required", text: "You must add a shipping address before you can proceed.", icon: "warning", showCancelButton: true, confirmButtonText: "Add Address Now", cancelButtonText: "Later", confirmButtonColor: "#000", allowOutsideClick: false })
      .then((result) => { if (result.isConfirmed) openModal(); });
    }
  } catch (error) {
    isPageLoading.value = false;
    if (error.response && error.response.status === 401) {
      router.push("/login");
    } else {
      Swal.fire("Error", "Failed to load checkout data", "error");
    }
  }
};

const maxUsablePoints = computed(() => {
  if (!userData.value || checkoutTotalAmount.value === 0) return 0;
  const userBalance = userData.value.point || 0;
  const priceAfterPromo = checkoutTotalAmount.value - promoDiscountAmount.value;
  const maxPointsForPrice = Math.floor(Math.max(0, priceAfterPromo) / pointConversionRate);
  return Math.min(userBalance, maxPointsForPrice);
});

const pointDiscountAmount = computed(() => (pointsToUse.value || 0) * pointConversionRate);
const useAllPoints = () => { pointsToUse.value = maxUsablePoints.value; };
watch(pointsToUse, (newVal) => { if (newVal < 0) pointsToUse.value = 0; if (newVal > maxUsablePoints.value) pointsToUse.value = maxUsablePoints.value; });

const grandTotalWithDiscount = computed(() => {
  return grandTotal.value - promoDiscountAmount.value - pointDiscountAmount.value;
});

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const payload = {
      address_id: selectedAddressId.value, shipping_method: shippingMethod.value, use_points: pointsToUse.value, cart_ids: selectedItemIds.value,
      courier_company: shippingMethod.value === "biteship" ? selectedRate.value?.company : null,
      courier_type: shippingMethod.value === "biteship" ? selectedRate.value?.type : null,
      shipping_cost: shippingMethod.value === "biteship" ? selectedRate.value?.price : null,
      delivery_type: shippingMethod.value === "biteship" ? deliveryType.value : null,
      delivery_date: shippingMethod.value === "biteship" ? deliveryDate.value : null,
      delivery_time: shippingMethod.value === "biteship" ? deliveryTime.value : null,
      promo_code: appliedPromoCode.value,
    };
    const res = await axios.post(`${BASE_URL}/checkout`, payload, getAxiosConfig());
    if (res.data.checkout_url) {
      clearSelectedCart(); window.location.href = res.data.checkout_url;
    }
  } catch (error) {
    Swal.fire("Payment Error", error.response?.data?.message || "Failed to create invoice", "error");
  } finally { isProcessing.value = false; }
};

const calculateEarnedPoints = computed(() => Math.floor(checkoutTotalAmount.value / 100000));
const checkoutItems = computed(() => cartItems.value.filter((item) => selectedItemIds.value.includes(item.id)));
const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

onMounted(fetchData);
</script>

<style scoped>
/* [BARU] CSS Keyframes untuk Animasi Bouncing Dots */
.animate-bounce-1 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.32s;
}
.animate-bounce-2 {
  animation: bounceDots 1.4s infinite ease-in-out both;
  animation-delay: -0.16s;
}
.animate-bounce-3 {
  animation: bounceDots 1.4s infinite ease-in-out both;
}

@keyframes bounceDots {
  0%,
  80%,
  100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
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

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
  width: 6px; /* Tambahkan width agar scroll vertikal juga rapi */
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
