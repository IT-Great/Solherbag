<template>
  <div class="max-w-4xl min-h-screen px-6 py-20 mx-auto">
    <div class="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
      <div>
        <button
          @click="$router.push('/orderpage')"
          class="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-black"
        >
          <span>&larr;</span> {{ $t("tracking.back_to_order") }}
        </button>
        <h1
          class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl"
        >
          {{ $t("tracking.shipment_tracking") }}
        </h1>
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"
      ></div>
      <p
        class="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse"
      >
        {{ $t("tracking.fetching_order") }}
      </p>
    </div>

    <div
      v-else-if="error"
      class="p-8 text-center border border-red-100 bg-red-50 rounded-2xl"
    >
      <p class="font-bold text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="orderData" class="space-y-6 animate-fade-in">
      <div class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div
          class="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center"
        >
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              {{ $t("tracking.waybill") }}
            </p>
            <p class="font-mono text-xl font-bold text-black">
              {{
                trackingData?.courier?.waybill_id ||
                orderData.tracking_number ||
                $t("tracking.waiting_for_courier")
              }}
            </p>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span
                class="bg-black text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest"
              >
                {{ formatStatusTitle(trackingData?.status || orderData.status) }}
              </span>
            </div>
          </div>

          <div class="flex items-center w-full gap-6 md:w-auto">
            <div
              v-if="activePaymentMethod"
              class="flex flex-col items-start md:items-end"
            >
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
              >
                {{ $t("tracking.payment") }}
              </p>
              <div class="flex items-center gap-3">
                <div
                  class="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0"
                >
                  <img
                    v-if="getPaymentLogo(activePaymentMethod)"
                    :src="getPaymentLogo(activePaymentMethod)"
                    class="w-full h-full object-contain p-0.5"
                  />
                  <span v-else class="font-black text-gray-300 text-[8px]">{{
                    activePaymentMethod.split(" ")[1] || "PAY"
                  }}</span>
                </div>
                <p class="text-xs font-bold text-green-600 uppercase">
                  {{ activePaymentMethod.replace("_", " ") }}
                </p>
              </div>
            </div>

            <div class="hidden w-px h-8 bg-gray-200 md:block"></div>

            <div class="flex flex-col items-start md:items-end">
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
              >
                {{ $t("tracking.courier") }}
              </p>
              <div class="flex items-center gap-3">
                <div
                  class="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0"
                >
                  <img
                    v-if="
                      getCourierLogo(
                        trackingData?.courier?.company || orderData.courier_company
                      )
                    "
                    :src="
                      getCourierLogo(
                        trackingData?.courier?.company || orderData.courier_company
                      )
                    "
                    class="object-contain w-full h-full p-1"
                  />
                  <span v-else class="font-black text-gray-300 text-[8px]">{{
                    trackingData?.courier?.company || orderData.courier_company || "N/A"
                  }}</span>
                </div>
                <div class="text-left md:text-right">
                  <p class="text-xs font-bold text-gray-800 uppercase">
                    {{ trackingData?.courier?.company || orderData.courier_company }}
                  </p>
                  <p class="text-[10px] text-gray-500 font-bold uppercase">
                    {{ trackingData?.courier?.type || orderData.courier_type }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="trackingData"
          class="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2"
        >
          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.origin_detail") }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.sender_name") }}
              </p>
              <p class="font-bold text-gray-900">
                {{ trackingData.origin?.contact_name || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">
                {{ trackingData.origin?.contact_phone || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.full_address") }}
              </p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.origin?.address || "-" }}<br />
                <span v-if="trackingData.origin?.postal_code" class="font-bold"
                  >{{ $t("tracking.postal_code") }}
                  {{ trackingData.origin.postal_code }}</span
                >
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-black rounded-full"></span>
              <p class="text-[10px] font-bold text-black uppercase tracking-widest">
                {{ $t("tracking.destination_details") }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.recipient_name") }}
              </p>
              <p class="font-bold text-gray-900">
                {{ trackingData.destination?.contact_name || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">
                {{ trackingData.destination?.contact_phone || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.full_address") }}
              </p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.destination?.address || "-" }}<br />
                <span v-if="trackingData.destination?.postal_code" class="font-bold"
                  >{{ $t("tracking.postal_code") }}
                  {{ trackingData.destination.postal_code }}</span
                >
              </p>
            </div>
            <div v-if="trackingData.destination?.note">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.courier_note") }}
              </p>
              <p class="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
                "{{ trackingData.destination.note }}"
              </p>
            </div>
          </div>
        </div>
        <div v-else class="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
          {{ $t("tracking.waiting_courier_loc") }}
        </div>
      </div>

      <div
        v-if="orderData.details && orderData.details.length > 0"
        class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl"
      >
        <div class="p-4 border-b border-gray-100 bg-gray-50">
          <h3 class="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
            {{ $t("tracking.order_summary") }}
          </h3>
        </div>

        <div class="p-6">
          <div class="mb-6 space-y-4">
            <div
              v-for="detail in orderData.details"
              :key="detail.id"
              class="flex items-center gap-4 py-2 pb-4 border-b border-gray-50 last:border-0"
            >
              <img
                :src="detail.product.image_url || defaultBagIcon"
                class="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
              />
              <div class="flex-grow">
                <div class="flex items-center gap-2">
                  <h4 class="text-sm font-bold text-gray-900 uppercase">
                    {{ detail.product.name }}
                  </h4>
                  <span
                    v-if="isWholesaleOrder"
                    class="px-1.5 py-0.5 text-[8px] font-bold text-white bg-blue-600 rounded"
                  >
                    GROSIR
                  </span>
                </div>

                <p
                  v-if="detail.color"
                  class="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5"
                >
                  {{ $t("tracking.color") }}
                  <span class="font-bold text-gray-700">{{ detail.color }}</span>
                </p>
                <p class="mt-1 text-xs text-gray-400">
                  {{ detail.quantity }} x {{ formatLocalPrice(detail.price, orderData) }}
                </p>
              </div>
              <p class="text-sm font-bold text-gray-900">
                {{ formatLocalPrice(detail.quantity * detail.price, orderData) }}
              </p>
            </div>
          </div>

          <div class="pt-4 space-y-2 border-t border-gray-100">
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ $t("tracking.subtotal_products") }}</span>
              <span>{{ formatLocalPrice(orderData.total_amount, orderData) }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ $t("tracking.shipping_cost") }}</span>
              <span>{{ formatLocalPrice(orderData.shipping_cost, orderData) }}</span>
            </div>
            <div
              v-if="orderData.promo_discount > 0"
              class="flex justify-between text-xs font-medium text-green-600"
            >
              <span
                >{{ $t("tracking.promo_applied") }} (<span class="font-mono uppercase">{{
                  orderData.promo_code
                }}</span
                >)</span
              >
              <span>- {{ formatLocalPrice(orderData.promo_discount, orderData) }}</span>
            </div>

            <div
              v-if="orderData.points_used > 0"
              class="flex justify-between text-xs font-medium text-yellow-600"
            >
              <span
                >{{ $t("tracking.points_redeemed") }} ({{
                  orderData.points_used
                }}
                Pts)</span
              >
              <span
                >- {{ formatLocalPrice(orderData.points_used * 1000, orderData) }}</span
              >
            </div>
            <div
              class="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed"
            >
              <span class="font-bold text-[10px] uppercase tracking-widest text-black">{{
                $t("tracking.grand_total")
              }}</span>
              <span class="text-xl font-black text-black">{{
                formatLocalPrice(getGrandTotal(orderData), orderData)
              }}</span>
            </div>
          </div>

          <div
            v-if="
              userData?.is_membership &&
              orderData.point > 0 &&
              orderData.status === 'completed'
            "
            class="flex items-center justify-between p-4 mt-6 border border-yellow-100 bg-gradient-to-r from-yellow-50 to-white rounded-xl"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 text-white bg-yellow-400 rounded-full shadow-sm"
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
                  {{ $t("tracking.loyalty_reward") }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5">
                  {{ $t("tracking.points_credited") }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-2xl font-black text-yellow-600"
                >+{{ orderData.point }}</span
              >
              <span class="ml-1 text-xs font-bold text-yellow-800">Pts</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl md:p-8">
        <h3
          class="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100"
        >
          {{ $t("tracking.tracking_timeline") }}
        </h3>

        <div class="relative ml-3 space-y-8 border-l-2 border-gray-100">
          <div
            v-for="(history, index) in timelineHistory"
            :key="index"
            class="relative pl-8"
          >
            <span
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>

            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="mb-2 text-xs text-gray-600">{{ history.note }}</p>
              <p class="text-[10px] text-gray-400 font-medium font-mono">
                {{ formatDate(history.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import { useI18n } from "vue-i18n";

const userData = ref(null);
const route = useRoute();
const router = useRouter();

const orderData = ref(null);
const trackingData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const { t } = useI18n();

const paymentMethodInfo = ref(history.state?.paymentMethod || "");

// 👇 [PERBAIKAN] State Multi-Currency
const exchangeRates = ref({ IDR: 1 });
const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

const fetchRates = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/exchange-rates`);
    if (res.data?.data?.rates) {
      exchangeRates.value = res.data.data.rates;
    }
  } catch (error) {
    console.error("Failed to fetch rates", error);
  }
};

const activePaymentMethod = computed(() => {
  if (orderData.value?.payment_method) return orderData.value.payment_method;
  if (paymentMethodInfo.value) return paymentMethodInfo.value;
  return null;
});

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
    dhl: "dhl.png",
  };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
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

// 👇 [PERBAIKAN] Helper Grosir & Multi-Currency Formatter 👇
const getOrderQuantity = (order) => {
  if (!order || !order.details) return 0;
  return order.details.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);
};

const isWholesaleOrder = computed(() => {
  if (!orderData.value) return false;
  return (
    userData.value?.usertype === "reseller" && getOrderQuantity(orderData.value) >= 24
  );
});

const formatLocalPrice = (value, order) => {
  const safeValue = parseFloat(value || 0);
  const code = order?.currency_code || currentCurrency.value || "IDR";
  const rate = exchangeRates.value[code] || 1;
  const convertedValue = safeValue * rate;

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    minimumFractionDigits: code === "IDR" || code === "JPY" ? 0 : 2,
  }).format(convertedValue);
};

const getGrandTotal = (order) => {
  if (!order) return 0;
  const total = parseFloat(order.total_amount || 0);
  const shipping = parseFloat(order.shipping_cost || 0);
  const promo = parseFloat(order.promo_discount || 0);
  const pointsDiscount = parseFloat((order.points_used || 0) * 1000);
  return total + shipping - promo - pointsDiscount;
};

const fetchAllData = async () => {
  isLoading.value = true;
  error.value = null;

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  try {
    const orderRes = await axios.get(
      `${BASE_URL}/transactions/${route.params.id}`,
      config
    );
    orderData.value = orderRes.data;

    try {
      const trackingRes = await axios.get(
        `${BASE_URL}/transactions/${route.params.id}/tracking`,
        config
      );
      trackingData.value = trackingRes.data;
    } catch (trackErr) {
      console.warn("Tracking data is not ready yet:", trackErr);
      if (orderData.value?.courier_company?.toLowerCase() === "dhl") {
        trackingData.value = {
          courier: {
            company: "DHL",
            type: "Express Worldwide",
            history: [
              {
                status: "processing",
                note: "Order data received by DHL",
                updated_at: orderData.value.created_at,
              },
            ],
          },
          origin: { contact_name: "Gycora Store", address: "Surabaya, ID" },
          destination: {
            contact_name:
              orderData.value.user?.name || orderData.value.address?.first_name_address,
            address: "International Route",
          },
        };
      }
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch order details.";
  } finally {
    isLoading.value = false;
  }
};

const timelineHistory = computed(() => {
  const apiHistory = trackingData.value?.courier?.history || [];
  if (apiHistory.length > 0) {
    return [...apiHistory].reverse();
  }
  return [
    {
      status: trackingData.value?.status || orderData.value?.status || "Processing",
      note: getNoteFromStatus(trackingData.value?.status || orderData.value?.status),
      updated_at:
        trackingData.value?.delivery?.datetime ||
        orderData.value?.created_at ||
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
    placed: "Your order has been recorded and is waiting for courier allocation.",
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

// onMounted(async () => {
//   const user = localStorage.getItem("user");
//   if (user) {
//     userData.value = JSON.parse(user);
//   }

//   // Register event listener untuk multi-currency
//   window.addEventListener("currency-changed", updateCurrencyState);
//   window.addEventListener("storage", (e) => {
//     if (e.key === "currency") updateCurrencyState();
//   });

//   await fetchRates();
//   fetchAllData();
// });

onMounted(async () => {
  const userStr = localStorage.getItem("user");
  let userId = null;
  if (userStr) {
    userData.value = JSON.parse(userStr);
    userId = JSON.parse(userStr).id;
  }

  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });

  await fetchRates();
  fetchAllData();

  // 👇 [BARU] WEBSOCKET LISTENER 👇
  if (window.Echo && userId) {
    window.Echo.channel(`user.${userId}`)
      .listen('.shipping.updated', (e) => {
        // Cek apakah socket yang masuk sesuai dengan halaman pesanan yang sedang dibuka
        if (transaction.value && transaction.value.id === e.transaction.id) {
           console.log("Live Tracking Updated!");
           
           // Update state transaction Vue
           transaction.value.status = e.transaction.status;
           transaction.value.shipping_status = e.transaction.shipping_status;
           transaction.value.tracking_number = e.transaction.tracking_number;

           // Paksa fetch ulang data spesifik biteship agar History Timeline termutakhir
           fetchTrackingData(e.transaction.id);
        }
      });
  }
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.leading-relaxed {
  transition: all 0.3s ease;
}

.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
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

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
