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

<!-- <template>
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
            <button
              @click="openModal()"
              class="text-blue-600 text-xs font-bold underline"
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

          

        

          <div class="space-y-3 pt-4 border-t border-gray-50 text-sm">

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
  ]
  <div
    v-if="showModal"
    class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
  >
    <div
      class="relative bg-white shadow-2xl p-6 rounded-2xl w-full max-w-2xl my-4"
    >
      <button
        @click="showModal = false"
        class="top-4 right-5 absolute text-gray-400 hover:text-black text-xl"
      >
        ✕
      </button>
      <h3 class="mb-4 font-bold text-xl">Add New Address</h3>

      <form @submit.prevent="saveAddress" class="space-y-3">
        <div class="flex items-center gap-2 mb-2">
          <input type="checkbox" v-model="form.is_default" id="def" />
          <label for="def" class="text-sm">Set as my default address</label>
        </div>

        <div class="gap-3 grid grid-cols-2">
          <input
            v-model="form.first_name_address"
            placeholder="First name"
            class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
            required
          />
          <input
            v-model="form.last_name_address"
            placeholder="Last name"
            class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
            required
          />
        </div>

        <div class="gap-3 grid grid-cols-2">
          <select
            v-model="form.province"
            class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
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
            class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
            required
          />
        </div>

        <div
          class="border border-gray-200 rounded-xl overflow-hidden mt-2 relative"
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
            class="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center gap-2"
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
                  class="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer border-b last:border-0 text-gray-700"
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

          <div class="h-40 sm:h-48 w-full relative z-0">
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
          <div class="flex justify-between items-end mb-1">
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
            class="bg-gray-50 py-2 px-3 border rounded-xl outline-none w-full resize-none focus:ring-2 focus:ring-blue-500 text-sm"
            required
          ></textarea>
        </div>

        <div class="gap-3 grid grid-cols-2 pt-1">
          <input
            v-model="form.location_type"
            placeholder="Apartment, suite (optional)"
            class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
          />
          <input
            v-model="form.postal_code"
            placeholder="Postal code"
            class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
            required
          />
        </div>

        <div class="flex justify-end pt-4">
          <div class="flex gap-3">
            <button
              type="button"
              @click="showModal = false"
              class="text-gray-500 hover:text-gray-800 font-bold px-3 text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold text-white shadow-md shadow-blue-500/30 transition-colors text-sm"
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
    class="mx-auto px-6 py-12 md:py-24 max-w-6xl min-h-screen animate-fade-in"
  >
    <div v-if="cartItems.length === 0" class="text-center py-20">
      <h2 class="font-serif text-3xl mb-4">Your bag is empty</h2>
      <button
        @click="$router.push('/catalog')"
        class="bg-black text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold"
      >
        Return to Shop
      </button>
    </div>

    <div v-else>
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
              <p class="text-gray-500 text-sm italic mb-2">No address found.</p>
              <button
                @click="openModal()"
                class="text-blue-600 text-xs font-bold underline"
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
              <button
                @click="openModal()"
                class="mt-4 text-gray-500 text-xs font-bold underline hover:text-black"
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
                    <p class="text-gray-500 text-xs mt-1">
                      Powered by Biteship
                    </p>
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
                      <p class="font-bold text-xs uppercase">
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
                            >{{ rate.company.toUpperCase() }}</span
                          >
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
              <div v-for="item in cartItems" :key="item.id" class="flex gap-4">
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

            <div class="space-y-3 pt-4 border-t border-gray-50 text-sm">
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
      class="border-4 border-gray-100 border-t-black rounded-full w-12 h-12 animate-spin"
    ></div>
    <p class="mt-4 font-serif text-gray-400 italic animate-pulse">
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
      class="font-serif text-gray-500 italic tracking-widest text-sm animate-pulse"
    >
      Preparing your checkout...
    </p>
  </div>

  <!-- <div
    v-else
    class="mx-auto px-6 py-12 md:py-24 max-w-6xl min-h-screen animate-fade-in"
  >
    <div v-if="checkoutItems.length === 0" class="text-center py-20">
      <h2 class="font-serif text-3xl mb-4">Your bag is empty</h2>
      <button
        @click="$router.push('/catalog')"
        class="bg-black text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold"
      >
        Return to Shop
      </button>
    </div>

    <div v-else>
      <h1
        class="mb-12 font-serif text-3xl md:text-4xl uppercase tracking-tighter"
      >
        Checkout
      </h1> -->
  <div
    v-else
    class="mx-auto px-6 py-12 md:py-24 max-w-6xl min-h-screen animate-fade-in"
  >
    <div v-if="checkoutItems.length === 0" class="text-center py-20">
      <h2 class="font-serif text-3xl mb-4">Your bag is empty</h2>
      <button
        @click="$router.push('/catalog')"
        class="bg-black text-white px-8 py-3 rounded-full uppercase tracking-widest text-xs font-bold"
      >
        Return to Shop
      </button>
    </div>

    <div v-else>
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
              <p class="text-gray-500 text-sm italic mb-2">No address found.</p>
              <button
                @click="openModal()"
                class="text-blue-600 text-xs font-bold underline"
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
              <button
                @click="openModal()"
                class="mt-4 text-gray-500 text-xs font-bold underline hover:text-black"
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
                    <p class="text-gray-500 text-xs mt-1">
                      Powered by Biteship
                    </p>
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
                  <!-- <div class="flex flex-col md:flex-row gap-4 mb-4">
                    <label
                      :class="
                        deliveryType === 'now'
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
                      <p class="font-bold text-xs uppercase">
                        Scheduled Pickup
                      </p>
                      <p class="text-[10px] text-gray-500 mt-1">
                        Choose specific date & time
                      </p>
                    </label>
                  </div> -->

                  <div class="flex flex-col md:flex-row gap-4 mb-4">
                    <label
                      :class="
                        deliveryType === 'now'
                          ? 'border-black bg-gray-50'
                          : 'border-gray-200'
                      "
                      class="flex-1 p-4 border rounded-xl cursor-pointer transition"
                    >
                      <input
                        type="radio"
                        value="now" 
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
                      <p class="font-bold text-xs uppercase">
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
                    v-else-if="processedShippingRates.length === 0"
                    class="text-xs text-red-500 italic text-center py-4"
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
                      class="flex items-center p-4 border rounded-xl cursor-pointer transition-all hover:bg-gray-50"
                    >
                      <input
                        type="radio"
                        :value="rate"
                        v-model="selectedRate"
                        class="w-4 h-4 text-black focus:ring-black border-gray-300"
                      />
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
                            >{{ rate.company.toUpperCase() }}</span
                          >
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
                      class="flex flex-col p-4 border rounded-xl relative"
                    >
                      <div class="flex items-center w-full">
                        <input
                          type="radio"
                          :value="rate"
                          v-model="selectedRate"
                          :disabled="rate.is_disabled"
                          class="w-4 h-4 text-black focus:ring-black border-gray-300 disabled:opacity-50"
                        />
                        <div class="ml-4 flex-grow flex items-center gap-4">
                          <div class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex justify-center items-center overflow-hidden shrink-0">
                            <img
                              v-show="!imageErrors[rate.company]"
                              v-if="getCourierLogo(rate.company)"
                              :src="getCourierLogo(rate.company)"
                              :alt="rate.company"
                              class="w-full h-full object-contain p-1"
                              @error="handleImageError(rate.company)"
                            />
                            <span v-show="imageErrors[rate.company] || !getCourierLogo(rate.company)" class="font-black text-gray-300 text-xs">
                              {{ rate.company.toUpperCase() }}
                            </span>
                          </div>
                          <div>
                            <p class="font-bold text-gray-800 text-sm uppercase tracking-wide">
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
                        rate.is_disabled ? 'opacity-40 bg-gray-100 border-gray-200 pointer-events-none select-none' :
                        (selectedRate?.company === rate.company && selectedRate?.type === rate.type
                          ? 'border-black bg-gray-50 shadow-sm'
                          : 'border-gray-200 hover:bg-gray-50 cursor-pointer transition-all'),
                      ]"
                      class="flex flex-col p-4 border rounded-xl relative"
                    >
                      <div class="flex items-center w-full">
                        <input
                          type="radio"
                          :value="rate"
                          v-model="selectedRate"
                          :disabled="rate.is_disabled"
                          class="w-4 h-4 text-black focus:ring-black border-gray-300 disabled:opacity-50"
                        />
                        <div class="ml-4 flex-grow flex items-center gap-4">
                          <div class="w-12 h-12 bg-white border border-gray-100 rounded-lg flex justify-center items-center overflow-hidden shrink-0">
                            <img
                              v-show="!imageErrors[rate.company]"
                              v-if="getCourierLogo(rate.company)"
                              :src="getCourierLogo(rate.company)"
                              :alt="rate.company"
                              class="w-full h-full object-contain p-1"
                              @error="handleImageError(rate.company)"
                            />
                            <span v-show="imageErrors[rate.company] || !getCourierLogo(rate.company)" class="font-black text-gray-300 text-xs">
                              {{ rate.company.toUpperCase() }}
                            </span>
                          </div>
                          <div>
                            <p class="font-bold text-gray-800 text-sm uppercase tracking-wide">
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
                      </div>

                      <div v-if="rate.is_disabled" class="mt-3 ml-8 text-[10px] text-red-600 bg-red-50 px-3 py-1.5 rounded-lg border border-red-100 font-bold uppercase tracking-widest">
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
              <!-- <div v-for="item in cartItems" :key="item.id" class="flex gap-4"> -->
              <div
                v-for="item in checkoutItems"
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

            <div class="space-y-3 pt-4 border-t border-gray-50 text-sm">
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

    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div
        class="relative bg-white shadow-2xl p-6 rounded-2xl w-full max-w-2xl my-4"
      >
        <button
          @click="showModal = false"
          class="top-4 right-5 absolute text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>
        <h3 class="mb-4 font-bold text-xl">Add New Address</h3>

        <form @submit.prevent="saveAddress" class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <input type="checkbox" v-model="form.is_default" id="def" />
            <label for="def" class="text-sm">Set as my default address</label>
          </div>

          <div class="gap-3 grid grid-cols-2">
            <input
              v-model="form.first_name_address"
              placeholder="First name"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
            <input
              v-model="form.last_name_address"
              placeholder="Last name"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
          </div>

          <div class="gap-3 grid grid-cols-2">
            <select
              v-model="form.province"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
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
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
          </div>

          <div
            class="border border-gray-200 rounded-xl overflow-hidden mt-2 relative"
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
              class="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center gap-2"
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
                    class="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer border-b last:border-0 text-gray-700"
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

            <div class="h-40 sm:h-48 w-full relative z-0">
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
            <div class="flex justify-between items-end mb-1">
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
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none w-full resize-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            ></textarea>
          </div>

          <div class="gap-3 grid grid-cols-2 pt-1">
            <input
              v-model="form.location_type"
              placeholder="Apartment, suite (optional)"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
            />
            <input
              v-model="form.postal_code"
              placeholder="Postal code"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
          </div>

          <div class="flex justify-end pt-4">
            <div class="flex gap-3">
              <button
                type="button"
                @click="showModal = false"
                class="text-gray-500 hover:text-gray-800 font-bold px-3 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold text-white shadow-md shadow-blue-500/30 transition-colors text-sm"
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
import { ref, onMounted, watch, computed, nextTick } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

// Import State dari useCart
import { useCart } from "../../composables/useCart.js";

// const { cartItems, cartCount, totalCartAmount, clearCart } = useCart();
const {
  cartItems,
  checkoutCount, // Gantikan cartCount dengan checkoutCount
  checkoutTotalAmount, // Gantikan totalCartAmount dengan checkoutTotalAmount
  selectedItemIds,
  clearSelectedCart, // Gantikan clearCart dengan clearSelectedCart
} = useCart();

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

const router = useRouter();

const userData = ref(null);
const addresses = ref([]);
const selectedAddressId = ref(null);
const isProcessing = ref(false);

const shippingMethod = ref("free");
// const shippingRates = ref([]);
const selectedRate = ref(null);
const isLoadingRates = ref(false);

const deliveryType = ref("now");
const deliveryDate = ref("");
const deliveryTime = ref("");

const pointsToUse = ref(0);
const pointConversionRate = 1000;

// =========================================================================
// [PERBAIKAN] LOGIKA PENGIRIMAN SUPER-REAKTIF & VALIDASI KETAT
// =========================================================================
const rawShippingRates = ref([]); // Data murni dari API

// NEW STATE
const isPageLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
};

const shipperInfo = {
  name: "Solher Store",
  phone: "08883888585",
  address: "Jalan Kecilung N0. 8A, Kota Surabaya, Jawa Timur 60275, Indonesia",
  postal_code: "60275",
};

// 1. Hitung Kuantitas Total Barang (Bukan jenis barang, tapi total buah)
const totalQuantityToCheckout = computed(() => {
  return checkoutItems.value.reduce((sum, item) => sum + item.quantity, 0);
});

// 2. Rumus Haversine: Mengukur Jarak Koordinat Asli dari Toko (Surabaya) ke Alamat User
const getDistanceFromOrigin = (destLat, destLng) => {
  if (!destLat || !destLng) return 999; 
  const lat1 = -7.25706;  // Latitude Solher Store
  const lon1 = 112.74549; // Longitude Solher Store
  const lat2 = parseFloat(destLat);
  const lon2 = parseFloat(destLng);

  const R = 6371; // Radius bumi dalam KM
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Hasil dalam KM
};

// 3. Computed Property: Akan otomatis berjalan Ulang setiap kali Jam, Tanggal, Alamat, atau Berat berubah!
// const processedShippingRates = computed(() => {
//   if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];

//   let checkHour = new Date().getHours();

//   // Validasi Waktu Dinamis
//   if (deliveryType.value === 'scheduled' && deliveryTime.value) {
//      if (deliveryDate.value === todayDate.value) {
//         checkHour = parseInt(deliveryTime.value.split(':')[0]);
//      } else {
//         checkHour = 12; // Jika pilih besok, jam aman dianggap jam 12 siang
//      }
//   } else {
//      checkHour += 1; // Jika 'now', asumsi API Backend menjadwalkan 1 jam ke depan
//   }

//   const totalWeightKg = totalQuantityToCheckout.value; // Asumsi 1 barang = 1 KG

//   // Validasi Jarak Dinamis
//   const destInfo = addresses.value.find(a => a.id === selectedAddressId.value);
//   const distanceKm = destInfo ? getDistanceFromOrigin(destInfo.details.latitude, destInfo.details.longitude) : 999;

//   const rates = rawShippingRates.value.map(rate => {
//     let is_disabled = false;
//     let disable_reason = "";
//     const type = rate.type.toLowerCase();
//     const company = rate.company.toLowerCase();

//     // A. Aturan Jarak (Maks 40KM untuk Ojek Online)
//     if (company === 'gojek' || company === 'grab') {
//        if (distanceKm > 40) {
//          is_disabled = true;
//          disable_reason = `Jarak > 40km (${distanceKm.toFixed(1)}km)`;
//        }
//     }

//     // B. Aturan Gojek
//     if (!is_disabled && company === 'gojek') {
//       if (type.includes('same day') || type.includes('sameday')) {
//         if (checkHour >= 15 || checkHour < 6) {
//           is_disabled = true;
//           disable_reason = "Tutup. Jam Operasional 06:00 - 15:00";
//         } else if (totalWeightKg > 7) {
//           is_disabled = true;
//           disable_reason = "Berat Maksimal 7kg";
//         }
//       }
//       else if (type.includes('instant')) {
//         if (checkHour >= 17 || checkHour < 6) {
//           is_disabled = true;
//           disable_reason = "Tutup. Jam Operasional 06:00 - 17:00";
//         } else if (totalWeightKg > 20) {
//           is_disabled = true;
//           disable_reason = "Berat Maksimal 20kg";
//         }
//       }
//     }
//     // C. Aturan Grab
//     else if (!is_disabled && company === 'grab') {
//       if (type.includes('same day') || type.includes('sameday')) {
//         if (checkHour >= 14 || checkHour < 9) { // Aturan ketat dari Error Log Anda
//           is_disabled = true;
//           disable_reason = "Tutup. Jam Operasional 09:00 - 14:00";
//         } else if (totalWeightKg > 7) {
//           is_disabled = true;
//           disable_reason = "Berat Maksimal 7kg";
//         }
//       }
//       else if (type.includes('instant')) {
//         if (checkHour >= 18 || checkHour < 8) {
//           is_disabled = true;
//           disable_reason = "Tutup. Jam Operasional 08:00 - 18:00";
//         } else if (totalWeightKg > 20) {
//           is_disabled = true;
//           disable_reason = "Berat Maksimal 20kg";
//         }
//       }
//     }

//     return { ...rate, is_disabled, disable_reason };
//   });

//   // Urutkan: Kurir yang aktif di atas, yang disabled di bawah
//   return rates.sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));
// });

// 3. Computed Property: Auto-Run saat Jam, Tanggal, Alamat, atau Berat berubah
// const processedShippingRates = computed(() => {
//   // Pastikan data mentah tersedia
//   if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];

//   let checkHour = new Date().getHours();

//   // Validasi Waktu Dinamis
//   if (deliveryType.value === 'scheduled' && deliveryTime.value) {
//      if (deliveryDate.value === todayDate.value) {
//         checkHour = parseInt(deliveryTime.value.split(':')[0]);
//      } else {
//         checkHour = 12; // Jika besok, selalu aman (jam 12)
//      }
//   } else {
//      checkHour += 1; // Jika 'now', asumsi pickup 1 jam dari sekarang
//   }

//   const totalWeightKg = totalQuantityToCheckout.value || 1; 

//   // Validasi Jarak Dinamis
//   let distanceKm = 999;
//   if (addresses.value && selectedAddressId.value) {
//       const destInfo = addresses.value.find(a => a.id === selectedAddressId.value);
//       if (destInfo && destInfo.details.latitude && destInfo.details.longitude) {
//           distanceKm = getDistanceFromOrigin(destInfo.details.latitude, destInfo.details.longitude);
//       }
//   }

//   const rates = rawShippingRates.value.map(rate => {
//     let is_disabled = false;
//     let disable_reason = "";
    
//     // Pastikan aman jika API Biteship mengirim data kosong
//     const type = rate.type ? rate.type.toLowerCase() : '';
//     const company = rate.company ? rate.company.toLowerCase() : '';

//     // A. Aturan Jarak (Maks 40KM untuk Ojek Online)
//     if (company === 'gojek' || company === 'grab') {
//        if (distanceKm > 40) {
//          is_disabled = true;
//          disable_reason = `Jarak > 40km (${distanceKm.toFixed(1)}km)`;
//        }
//     }

//     // B. Aturan Gojek
//     if (!is_disabled && company === 'gojek') {
//       if (type.includes('same day') || type.includes('sameday')) {
//         if (checkHour >= 14 || checkHour < 6) { // Tutup jam 15, batas aman jam 14
//           is_disabled = true;
//           disable_reason = "Tutup. Operasional 06:00 - 14:00";
//         } else if (totalWeightKg > 7) {
//           is_disabled = true;
//           disable_reason = "Berat Maks 7kg";
//         }
//       }
//       else if (type.includes('instant')) {
//         if (checkHour >= 16 || checkHour < 6) { // Tutup jam 17, batas aman jam 16
//           is_disabled = true;
//           disable_reason = "Tutup. Operasional 06:00 - 16:00";
//         } else if (totalWeightKg > 20) {
//           is_disabled = true;
//           disable_reason = "Berat Maks 20kg";
//         }
//       }
//     }
//     // C. Aturan Grab
//     else if (!is_disabled && company === 'grab') {
//       if (type.includes('same day') || type.includes('sameday')) {
//         if (checkHour >= 14 || checkHour < 9) { 
//           is_disabled = true;
//           disable_reason = "Tutup. Operasional 09:00 - 14:00";
//         } else if (totalWeightKg > 7) {
//           is_disabled = true;
//           disable_reason = "Berat Maks 7kg";
//         }
//       }
//       else if (type.includes('instant')) {
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

//   // [PERBAIKAN PENTING] Jangan mengurutkan langsung pada array yang dihasilkan map() jika memori rentan.
//   // Buat salinan (spread operator) lalu urutkan.
//   return [...rates].sort((a, b) => {
//     if (a.is_disabled === b.is_disabled) return 0;
//     return a.is_disabled ? 1 : -1;
//   });
// });

// 3. Computed Property: Akan otomatis berjalan Ulang setiap kali Jam, Tanggal, Alamat, atau Berat berubah!
const processedShippingRates = computed(() => {
  // Pastikan data mentah tersedia
  if (!rawShippingRates.value || rawShippingRates.value.length === 0) return [];

  let checkHour = new Date().getHours();

  // Validasi Waktu Dinamis
  if (deliveryType.value === 'scheduled' && deliveryTime.value) {
     if (deliveryDate.value === todayDate.value) {
        checkHour = parseInt(deliveryTime.value.split(':')[0]);
     } else {
        checkHour = 12; // Jika besok, selalu aman (jam 12 siang)
     }
  } else {
     // Jika 'now', kita gunakan jam saat ini
     checkHour = new Date().getHours();
  }

  const totalWeightKg = totalQuantityToCheckout.value || 1; 

  // Validasi Jarak Dinamis
  let distanceKm = 999;
  if (addresses.value && selectedAddressId.value) {
      const destInfo = addresses.value.find(a => a.id === selectedAddressId.value);
      if (destInfo && destInfo.details.latitude && destInfo.details.longitude) {
          distanceKm = getDistanceFromOrigin(destInfo.details.latitude, destInfo.details.longitude);
      }
  }

  const rates = rawShippingRates.value.map(rate => {
    let is_disabled = false;
    let disable_reason = "";
    
    // [PERBAIKAN KRUSIAL] Hapus underscore (_) agar "same_day" berubah jadi "same day"
    const type = rate.type ? rate.type.toLowerCase().replace(/_/g, ' ') : '';
    const company = rate.company ? rate.company.toLowerCase() : '';

    // A. Aturan Jarak (Maks 40KM untuk Ojek Online)
    if (company === 'gojek' || company === 'grab') {
       if (distanceKm > 40) {
         is_disabled = true;
         disable_reason = `Jarak > 40km (${distanceKm.toFixed(1)}km)`;
       }
    }

    // B. Aturan Gojek
    if (!is_disabled && company === 'gojek') {
      if (type.includes('same day') || type.includes('sameday')) {
        // Gojek Same Day: Tutup Jam 15:00
        if (checkHour >= 15 || checkHour < 6) { 
          is_disabled = true;
          disable_reason = "Tutup. Operasional 06:00 - 15:00";
        } else if (totalWeightKg > 7) {
          is_disabled = true;
          disable_reason = "Berat Maks 7kg";
        }
      }
      else if (type.includes('instant')) {
        // Gojek Instant: Tutup Jam 17:00
        if (checkHour >= 17 || checkHour < 6) { 
          is_disabled = true;
          disable_reason = "Tutup. Operasional 06:00 - 17:00";
        } else if (totalWeightKg > 20) {
          is_disabled = true;
          disable_reason = "Berat Maks 20kg";
        }
      }
    }
    // C. Aturan Grab
    else if (!is_disabled && company === 'grab') {
      if (type.includes('same day') || type.includes('sameday')) {
        // Grab Same Day: Tutup Jam 14:00 (Sesuai Error Biteship)
        if (checkHour >= 14 || checkHour < 9) { 
          is_disabled = true;
          disable_reason = "Tutup. Operasional 09:00 - 14:00";
        } else if (totalWeightKg > 7) {
          is_disabled = true;
          disable_reason = "Berat Maks 7kg";
        }
      }
      else if (type.includes('instant')) {
        // Grab Instant: Tutup Jam 18:00
        if (checkHour >= 18 || checkHour < 8) {
          is_disabled = true;
          disable_reason = "Tutup. Operasional 08:00 - 18:00";
        } else if (totalWeightKg > 20) {
          is_disabled = true;
          disable_reason = "Berat Maks 20kg";
        }
      }
    }

    return { ...rate, is_disabled, disable_reason };
  });

  // Urutkan agar kurir yang "Disabled" turun ke posisi paling bawah
  return [...rates].sort((a, b) => {
    if (a.is_disabled === b.is_disabled) return 0;
    return a.is_disabled ? 1 : -1;
  });
});

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

const grandTotal = computed(() => {
  let total = checkoutTotalAmount.value;
  if (shippingMethod.value === "biteship" && selectedRate.value) {
    total += parseFloat(selectedRate.value.price) * checkoutCount.value;
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

// watch(selectedAddressId, async (newVal) => {
//   if (newVal) {
//     selectedRate.value = null;
//     isLoadingRates.value = true;
//     shippingRates.value = [];
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/shipping/rates`,
//         { address_id: newVal },
//         axiosConfig,
//       );
//       if (res.data && res.data.pricing) shippingRates.value = res.data.pricing;
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

// watch(selectedAddressId, async (newVal) => {
//   if (newVal) {
//     selectedRate.value = null;
//     isLoadingRates.value = true;
//     shippingRates.value = [];
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/shipping/rates`,
//         { 
//           address_id: newVal,
//           total_quantity: checkoutCount.value // [PERBAIKAN] Kirim total quantity ke backend
//         },
//         axiosConfig,
//       );
      
//       if (res.data && res.data.pricing) {
//         const currentHour = new Date().getHours();
//         const totalWeightKg = checkoutCount.value; // Karena 1 item = 1kg

//         // [PERBAIKAN] Menyuntikkan aturan Validasi Lokal (Ojek Online)
//         const processedRates = res.data.pricing.map(rate => {
//           let is_disabled = false;
//           let disable_reason = "";

//           const type = rate.type.toLowerCase();
//           const company = rate.company.toLowerCase();

//           if (company === 'gojek' || company === 'grab') {
//             if (type.includes('same day') || type.includes('sameday')) {
//               // Same Day maksimal jam 15:00
//               if (currentHour >= 15 || currentHour < 6) {
//                 is_disabled = true;
//                 disable_reason = "Out of operational hours (06:00 - 15:00)";
//               } else if (totalWeightKg > 7) {
//                 is_disabled = true;
//                 disable_reason = "Weight exceeds max limit (7kg)";
//               }
//             } 
//             else if (type.includes('instant')) {
//               // Instant maksimal jam 17:00
//               if (currentHour >= 17 || currentHour < 6) {
//                 is_disabled = true;
//                 disable_reason = "Out of operational hours (06:00 - 17:00)";
//               } else if (totalWeightKg > 20) {
//                 is_disabled = true;
//                 disable_reason = "Weight exceeds max limit (20kg)";
//               }
//             }
//           }

//           return { ...rate, is_disabled, disable_reason };
//         });

//         // Urutkan agar kurir yang "Disabled" turun ke posisi paling bawah
//         processedRates.sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));

//         shippingRates.value = processedRates;
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

// watch(selectedAddressId, async (newVal) => {
//   if (newVal) {
//     selectedRate.value = null;
//     isLoadingRates.value = true;
//     shippingRates.value = [];
//     try {
//       const res = await axios.post(
//         `${BASE_URL}/shipping/rates`,
//         { 
//           address_id: newVal,
//           total_quantity: checkoutCount.value 
//         },
//         axiosConfig,
//       );
      
//       if (res.data && res.data.pricing) {
//         const currentHour = new Date().getHours();
//         const totalWeightKg = checkoutCount.value; 

//         const processedRates = res.data.pricing.map(rate => {
//           let is_disabled = false;
//           let disable_reason = "";

//           const type = rate.type.toLowerCase();
//           const company = rate.company.toLowerCase();

//           if (company === 'gojek' || company === 'grab') {
//             if (type.includes('same day') || type.includes('sameday')) {
//               // [PERBAIKAN] Same Day tutup jam 15:00. Kita blokir di jam 14:00.
//               if (currentHour >= 14 || currentHour < 6) {
//                 is_disabled = true;
//                 disable_reason = "Out of operational hours (06:00 - 14:00)";
//               } else if (totalWeightKg > 7) {
//                 is_disabled = true;
//                 disable_reason = "Weight exceeds max limit (7kg)";
//               }
//             } 
//             else if (type.includes('instant')) {
//               // [PERBAIKAN] Instant tutup 17:00, kita blokir di jam 16:00
//               if (currentHour >= 16 || currentHour < 6) {
//                 is_disabled = true;
//                 disable_reason = "Out of operational hours (06:00 - 16:00)";
//               } else if (totalWeightKg > 20) {
//                 is_disabled = true;
//                 disable_reason = "Weight exceeds max limit (20kg)";
//               }
//             }
//           }

//           return { ...rate, is_disabled, disable_reason };
//         });

//         // Sort agar yang disabled pindah ke paling bawah
//         processedRates.sort((a, b) => (a.is_disabled === b.is_disabled ? 0 : a.is_disabled ? 1 : -1));

//         shippingRates.value = processedRates;
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

// 4. API Fetcher
watch(selectedAddressId, async (newVal) => {
  if (newVal) {
    selectedRate.value = null;
    isLoadingRates.value = true;
    rawShippingRates.value = [];
    try {
      const res = await axios.post(
        `${BASE_URL}/shipping/rates`,
        { 
          address_id: newVal,
          total_quantity: totalQuantityToCheckout.value // Kuantitas akurat
        },
        axiosConfig,
      );
      if (res.data && res.data.pricing) {
        rawShippingRates.value = res.data.pricing;
      }
    } catch (error) {
      Swal.fire({
        toast: true, position: "top-end", icon: "error", title: "Failed to calculate shipping.", showConfirmButton: false, timer: 4000,
      });
    } finally {
      isLoadingRates.value = false;
    }
  }
});

// 5. [Auto-Healing] Batalkan pilihan jika user iseng mengganti jam hingga kurir tersebut expired
watch(processedShippingRates, (newRates) => {
   if (selectedRate.value) {
      const match = newRates.find(r => r.company === selectedRate.value.company && r.type === selectedRate.value.type);
      if (match && match.is_disabled) {
         selectedRate.value = null; // Auto un-select!
      }
   }
}, { deep: true });

watch(shippingMethod, (newVal) => {
  if (newVal === "free") selectedRate.value = null;
});
watch(deliveryType, (newVal) => {
  if (newVal === "now") initDateTime();
});

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

//     // KITA TIDAK FETCH TRANSAKSI DISINI LAGI. Data langsung dari cartItems.

//     const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
//     addresses.value = resAddr.data.data;

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
//           openModal(); // Function Modal Address Anda (Pastikan logic modal ada di file)
//         }
//       });
//     } else {
//       const defaultAddr = addresses.value.find((a) => a.is_default);
//       if (defaultAddr) {
//         selectedAddressId.value = defaultAddr.id;
//       } else {
//         selectedAddressId.value = addresses.value[0].id;
//       }
//     }

//     initDateTime();
//   } catch (error) {
//     Swal.fire("Error", "Failed to load checkout data", "error");
//   }
// };

const fetchData = async () => {
  try {
    const user = localStorage.getItem("user");
    if (user) userData.value = JSON.parse(user);

    const resAddr = await axios.get(`${BASE_URL}/addresses`, axiosConfig);
    addresses.value = resAddr.data.data;

    if (addresses.value.length > 0) {
      const defaultAddr = addresses.value.find((a) => a.is_default);
      if (defaultAddr) {
        selectedAddressId.value = defaultAddr.id;
      } else {
        selectedAddressId.value = addresses.value[0].id;
      }
    }

    initDateTime();

    // Matikan loading, DOM halaman akan me-render kerangka
    isPageLoading.value = false;

    // Tunggu sampai Vue selesai menggambar struktur HTML baru
    await nextTick();

    // Tampilkan popup SEKARANG! (akan muncul bersamaan dengan halaman secara visual)
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
          openModal();
        }
      });
    }
  } catch (error) {
    isPageLoading.value = false;
    Swal.fire("Error", "Failed to load checkout data", "error");
  }
};

const maxUsablePoints = computed(() => {
  if (!userData.value || checkoutTotalAmount.value === 0) return 0;
  const userBalance = userData.value.point || 0;
  const maxPointsForPrice = Math.floor(
    checkoutTotalAmount.value / pointConversionRate,
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
// const handlePayment = async () => {
//   isProcessing.value = true;
//   try {
//     const payload = {
//       address_id: selectedAddressId.value,
//       shipping_method: shippingMethod.value,
//       use_points: pointsToUse.value,
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
//     };

//     // Tembak API /checkout (yang sekarang membuat Transaksi sekaligus Invoice Xendit)
//     const res = await axios.post(`${BASE_URL}/checkout`, payload, axiosConfig);

//     // Xendit Checkout URL didapat dari response
//     if (res.data.checkout_url) {
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

const handlePayment = async () => {
  isProcessing.value = true;
  try {
    const payload = {
      address_id: selectedAddressId.value,
      shipping_method: shippingMethod.value,
      use_points: pointsToUse.value,
      cart_ids: selectedItemIds.value,
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
      // [PERBAIKAN] KOSONGKAN KERANJANG DI MEMORI FRONTEND
      // clearCart();

      // [PERBAIKAN] KOSONGKAN KERANJANG (HANYA BARANG YANG DIBELI) DI MEMORI FRONTEND
      clearSelectedCart();

      // Redirect ke Xendit
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
  if (!checkoutTotalAmount.value) return 0;
  return Math.floor(checkoutTotalAmount.value / 100000);
});

// Buat computed untuk menyaring barang yang benar-benar akan dibayar
const checkoutItems = computed(() => {
  return cartItems.value.filter((item) =>
    selectedItemIds.value.includes(item.id),
  );
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
  0%, 80%, 100% {
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
