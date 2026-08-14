<!-- <template>
  <div
    class="relative max-w-5xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[600px]"
  >
    <breadcrumb />
    <div
      v-if="isLoading"
      class="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 bg-white/60 backdrop-blur-[2px] rounded-2xl"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
        <p
          class="mt-4 text-xs font-bold tracking-widest text-black uppercase animate-pulse"
        >
          Loading Product...
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between pb-6 mb-10 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="p-2 text-gray-400 transition-colors rounded-full hover:text-black hover:bg-gray-50"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Product Details</h1>
          <p class="mt-1 font-mono text-xs tracking-widest text-gray-500 uppercase">
            SKU: {{ product?.code || "..." }}
          </p>
        </div>
      </div>
      <div class="flex gap-3">
        <button
          @click="goToEditPage"
          v-if="product"
          class="px-6 py-2 text-xs font-bold tracking-widest text-gray-700 uppercase transition bg-gray-100 hover:bg-gray-200 rounded-xl"
        >
          Edit Product
        </button>
      </div>
    </div>

    <div v-if="product" class="grid grid-cols-1 gap-12 md:grid-cols-2 animate-fade-in">
      <div class="space-y-4">
        <div
          class="relative overflow-hidden border border-gray-100 select-none bg-gray-50 rounded-2xl aspect-[4/5] group"
          @mousemove="handleZoom"
          @mouseleave="resetZoom"
        >
          <img
            v-if="currentMediaType === 'image'"
            :src="currentMediaUrl"
            class="object-cover w-full h-full transition-transform duration-500 hover:scale-[2] cursor-zoom-in"
            alt="Product View"
          />
          <video
            v-else-if="currentMediaType === 'video'"
            :src="currentMediaUrl"
            class="object-cover w-full h-full bg-black"
            controls
            autoplay
            muted
            loop
          ></video>

          <div class="absolute flex flex-col gap-2 top-4 left-4">
            <span
              :class="
                product.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              "
              class="px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest w-fit shadow-sm"
            >
              {{ product.status }}
            </span>
            <span
              v-if="product.discount_price"
              class="bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest w-fit shadow-sm"
            >
              Sale
            </span>
          </div>

          <button
            v-if="allMedia.length > 1"
            @click="prevSlide"
            class="absolute flex items-center justify-center w-10 h-10 text-gray-800 transition -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            v-if="allMedia.length > 1"
            @click="nextSlide"
            class="absolute flex items-center justify-center w-10 h-10 text-gray-800 transition -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="allMedia.length > 1"
          class="flex gap-3 pb-2 overflow-x-auto custom-scrollbar"
        >
          <div
            v-for="(media, idx) in allMedia"
            :key="idx"
            @click="activeSlide = idx"
            :class="
              activeSlide === idx
                ? 'ring-2 ring-black border-transparent'
                : 'border-gray-200 opacity-60 hover:opacity-100'
            "
            class="relative w-20 h-24 overflow-hidden transition-all border-2 cursor-pointer shrink-0 rounded-xl bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="object-cover w-full h-full"
            />
            <div
              v-else
              class="relative flex items-center justify-center w-full h-full text-gray-500 bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute z-10 w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <div>
          
          <div class="flex items-center gap-2 mb-2">
            <span
              class="px-2 py-1 text-[10px] font-bold tracking-widest text-blue-700 bg-blue-100 rounded-md uppercase"
            >
              {{ product.category?.name || "Uncategorized" }}
            </span>
            <span
              v-if="product.bag_category"
              class="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-700 bg-gray-200 rounded-md uppercase"
            >
              {{ product.bag_category.name }}
            </span>
          </div>
          <h2 class="text-3xl font-black tracking-tight text-gray-900 uppercase">
            {{ product.name }}
          </h2>

          <div class="flex items-end gap-4 mt-6">
            <template v-if="product.discount_price">
              <span class="text-3xl font-black text-red-600">{{
                formatPrice(product.discount_price)
              }}</span>
              <span class="mb-1 text-lg text-gray-400 line-through">{{
                formatPrice(product.price)
              }}</span>
            </template>
            <span v-else class="text-3xl font-black text-gray-900">{{
              formatPrice(product.price)
            }}</span>
          </div>

          <div
            v-if="product.prices && Object.keys(product.prices).length > 0"
            class="flex flex-wrap gap-2 pt-4 mt-4 border-t border-gray-100"
          >
            <div
              v-for="(val, curr) in product.prices"
              :key="curr"
              class="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg flex flex-col min-w-[80px]"
            >
              <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest"
                >{{ curr }} Price</span
              >
              <div class="flex items-center gap-2 mt-0.5">
                <span
                  v-if="product.discount_prices && product.discount_prices[curr]"
                  class="text-sm font-black text-red-600"
                >
                  {{ getCurrencySymbol(curr) }}{{ product.discount_prices[curr] }}
                </span>
                <span
                  :class="
                    product.discount_prices && product.discount_prices[curr]
                      ? 'line-through text-gray-400 text-xs'
                      : 'text-sm font-black text-gray-900'
                  "
                >
                  {{ getCurrencySymbol(curr) }}{{ val }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-wrap gap-6 p-6 mb-6 border border-gray-100 bg-gray-50 rounded-2xl"
        >
          <div>
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Weight
            </p>
            <p class="font-bold text-gray-900">
              {{ product.weight }} <span class="text-xs font-medium">gr</span>
            </p>
          </div>

          <div v-if="product.length || product.width || product.height">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Dimensions (L x W x H)
            </p>
            <p class="font-mono font-bold text-gray-900">
              {{ product.length || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.width || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.height || "-" }} <span class="text-xs font-medium">cm</span>
            </p>
          </div>

          <div v-if="product.material">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Material
            </p>
            <p class="font-bold text-gray-900">{{ product.material }}</p>
          </div>

          <div
            v-if="product.strap_length"
            class="flex items-start justify-between w-full pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Strap Length</span
            >
            <span class="font-medium text-right text-gray-900">
              <template
                v-if="
                  Array.isArray(product.strap_length) && product.strap_length.length > 0
                "
              >
                {{ product.strap_length.join(", ") }}
              </template>
              <template v-else-if="!Array.isArray(product.strap_length)">
                {{ product.strap_length }}
              </template>
            </span>
          </div>

          <div
            v-if="parsedProductColors && parsedProductColors.length > 0"
            class="w-full pt-3 border-t border-gray-100"
          >
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Colors
            </p>
            <div class="flex flex-wrap items-center gap-3">
              <div
                v-for="(c, idx) in parsedProductColors"
                :key="idx"
                class="flex items-center gap-1.5 bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm"
              >
                <div
                  class="w-3 h-3 border border-gray-300 rounded-full"
                  :style="{ backgroundColor: c.hex }"
                ></div>
                <span
                  class="font-bold text-gray-800 text-[10px] uppercase tracking-wider"
                  >{{ c.name }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col gap-5 p-6 mb-6 border border-gray-100 bg-gray-50 rounded-2xl"
        >
          <div
            class="flex flex-col items-start justify-between gap-4 sm:items-center sm:flex-row"
          >
            <div>
              <p
                class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
              >
                Total Available Stock
              </p>
              <p
                :class="product.stock <= 5 ? 'text-red-600' : 'text-gray-900'"
                class="text-3xl font-black"
              >
                {{ product.stock }}
                <span class="text-sm font-medium text-gray-500">pcs</span>
              </p>
            </div>
            <router-link
              to="/admin/stocks"
              class="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-700 transition-all bg-white border border-gray-200 shadow-sm hover:border-blue-500 hover:text-blue-600 rounded-xl group"
            >
              Manage Batches
              <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
            </router-link>
          </div>

          <div
            v-if="product.stocks && product.stocks.length > 0"
            class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            <div
              class="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-100/50"
            >
              <p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                Active Stock Batches (FIFO)
              </p>
              <span
                class="text-[10px] font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-md"
                >{{ product.stocks.length }} Batch</span
              >
            </div>
            <div class="p-2 overflow-y-auto max-h-48 custom-scrollbar">
              <div
                v-for="batch in product.stocks"
                :key="batch.id"
                class="flex items-center justify-between p-3 transition-colors border border-transparent rounded-lg hover:bg-gray-50 hover:border-gray-100"
              >
                <div class="flex items-center gap-4">
                  <div class="relative flex items-center justify-center w-3 h-3">
                    <span
                      class="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"
                    ></span>
                    <span
                      class="relative inline-flex w-2 h-2 bg-green-500 rounded-full"
                    ></span>
                  </div>
                  <div>
                    <p class="font-mono text-sm font-bold text-gray-800">
                      {{ batch.batch_code }}
                    </p>
                    <p
                      class="text-[10px] font-medium text-gray-400 mt-0.5 uppercase tracking-wide"
                    >
                      Added: {{ formatDate(batch.created_at) }}
                    </p>
                  </div>
                </div>
                <span
                  class="font-black text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg text-xs shadow-sm"
                  >{{ batch.quantity }} pcs</span
                >
              </div>
            </div>
          </div>
          <div
            v-else
            class="py-6 text-center bg-white border border-gray-200 border-dashed rounded-xl"
          >
            <p class="text-xs font-medium text-gray-500">
              No active stock batches found.
            </p>
          </div>

          <div
            class="flex items-center justify-between pt-4 mt-2 border-t border-gray-200"
          >
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Data Record
            </p>
            <div class="text-right">
              <p
                class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5"
              >
                Created At
              </p>
              <p class="text-xs font-bold text-gray-700">
                {{ formatDate(product.created_at) }}
              </p>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-100 divide-y divide-gray-100">
          <div class="py-4">
            <button
              @click="toggleSection('description')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Description (ID)</span
              >
              <span class="text-gray-400">{{
                activeSection === "description" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'description'"
              class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
            >
              {{ product.description || "No description provided." }}
            </div>
          </div>

          <div class="py-4">
            <button
              @click="toggleSection('description_en')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Description (EN)</span
              >
              <span class="text-gray-400">{{
                activeSection === "description_en" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'description_en'"
              class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
            >
              {{ product.description_en || "No English description provided." }}
            </div>
          </div>

          <div class="py-4">
            <button
              @click="toggleSection('design')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Design Details (ID)</span
              >
              <span class="text-gray-400">{{
                activeSection === "design" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'design'"
              class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
            >
              {{ product.design || "No design details provided." }}
            </div>
          </div>

          <div class="py-4">
            <button
              @click="toggleSection('design_en')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Design Details (EN)</span
              >
              <span class="text-gray-400">{{
                activeSection === "design_en" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'design_en'"
              class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
            >
              {{ product.design_en || "No English design details provided." }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const isLoading = ref(true);
const activeSlide = ref(0);
const activeSection = ref("description");

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const allMedia = computed(() => {
  if (!product.value) return [];
  let media = [{ type: "image", url: product.value.image || defaultBagIcon }];
  if (product.value.variant_images && Array.isArray(product.value.variant_images)) {
    product.value.variant_images.forEach((img) =>
      media.push({ type: "image", url: img })
    );
  }
  if (product.value.variant_video)
    media.push({ type: "video", url: product.value.variant_video });
  return media;
});

const currentMediaType = computed(
  () => allMedia.value[activeSlide.value]?.type || "image"
);
const currentMediaUrl = computed(() => allMedia.value[activeSlide.value]?.url || "");

const nextSlide = () =>
  (activeSlide.value =
    activeSlide.value === allMedia.value.length - 1 ? 0 : activeSlide.value + 1);
const prevSlide = () =>
  (activeSlide.value =
    activeSlide.value === 0 ? allMedia.value.length - 1 : activeSlide.value - 1);
const toggleSection = (section) =>
  (activeSection.value = activeSection.value === section ? null : section);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products/${route.params.id}`, axiosConfig);
    product.value = res.data;
  } catch (error) {
    console.error("Fetch product error:", error);
    router.push("/admin/products");
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getCurrencySymbol = (currencyCode) => {
  const symbols = {
    USD: "$",
    SGD: "S$",
    EUR: "€",
    AUD: "A$",
    MYR: "RM",
  };
  return symbols[currencyCode] || `${currencyCode} `;
};

const goToEditPage = () => {
  router.push({
    path: `/admin/products/edit/${product.value.id}`,
    state: { productData: product.value },
  });
};

const legacyColorMap = {
  Black: "#000000",
  White: "#FFFFFF",
  Brown: "#8B4513",
  Beige: "#F5F5DC",
  Red: "#DC143C",
  Navy: "#000080",
  Green: "#008000",
  Grey: "#808080",
  Pink: "#FFC0CB",
  Yellow: "#FFD700",
  Blue: "#4169E1",
  Cream: "#FFFDD0",
  Sage: "#9DC183",
  Mocca: "#967969",
};

const parsedProductColors = computed(() => {
  if (!product.value || !product.value.color || !Array.isArray(product.value.color))
    return [];
  return product.value.color.map((c) => {
    if (typeof c === "string" && c.includes("|")) {
      const [name, hex] = c.split("|");
      return { name, hex };
    }
    const fallbackHex = legacyColorMap[c] || "#cccccc";
    return { name: c, hex: fallbackHex };
  });
});

// ==========================================
// [BARU] LOGIKA MOUSE TRACK ZOOM
// ==========================================
const handleZoom = (e) => {
  // Cari gambar di dalam container yang sedang di-hover
  const img = e.currentTarget.querySelector(".main-product-image");
  if (!img) return;

  // Dapatkan dimensi dan koordinat dari container
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();

  // Hitung persentase posisi mouse relatif terhadap gambar
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  // Pindahkan titik pusat zoom sesuai posisi mouse
  img.style.transformOrigin = `${x}% ${y}%`;
};

const resetZoom = (e) => {
  const img = e.currentTarget.querySelector(".main-product-image");
  // Kembalikan ke tengah saat mouse pergi
  if (img) img.style.transformOrigin = "center center";
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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
</style> -->

<template>
  <div
    class="relative max-w-5xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl min-h-[600px]"
  >
    <breadcrumb />
    <div
      v-if="isLoading"
      class="absolute inset-0 z-20 flex items-center justify-center transition-all duration-300 bg-white/60 backdrop-blur-[2px] rounded-2xl"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
        <p
          class="mt-4 text-xs font-bold tracking-widest text-black uppercase animate-pulse"
        >
          Loading Product...
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between pb-6 mb-10 border-b border-gray-100">
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="p-2 text-gray-400 transition-colors rounded-full hover:text-black hover:bg-gray-50"
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
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Product Details</h1>
          <p class="mt-1 font-mono text-xs tracking-widest text-gray-500 uppercase">
            SKU: {{ product?.code || "..." }}
          </p>
        </div>
      </div>
      <div class="flex gap-3">
        <button
          @click="goToEditPage"
          v-if="product"
          class="px-6 py-2 text-xs font-bold tracking-widest text-gray-700 uppercase transition bg-gray-100 hover:bg-gray-200 rounded-xl"
        >
          Edit Product
        </button>
      </div>
    </div>

    <div v-if="product" class="grid grid-cols-1 gap-12 md:grid-cols-2 animate-fade-in">
      <div class="space-y-4">
        <div
          class="relative overflow-hidden border border-gray-100 select-none bg-gray-50 rounded-2xl aspect-[4/5] group"
          @mousemove="handleZoom"
          @mouseleave="resetZoom"
        >
          <img
            v-if="currentMediaType === 'image'"
            :src="currentMediaUrl"
            class="object-cover w-full h-full transition-transform duration-500 hover:scale-[2] cursor-zoom-in"
            alt="Product View"
          />
          <video
            v-else-if="currentMediaType === 'video'"
            :src="currentMediaUrl"
            class="object-cover w-full h-full bg-black"
            controls
            autoplay
            muted
            loop
          ></video>

          <div class="absolute flex flex-col gap-2 top-4 left-4">
            <span
              :class="
                product.status === 'active'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              "
              class="px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest w-fit shadow-sm"
            >
              {{ product.status }}
            </span>
            <!-- 👇 BADGE FINAL SALE 👇 -->
            <span
              v-if="product.is_final_sale"
              class="bg-red-800 text-white px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest w-fit shadow-sm"
            >
              Final Sale
            </span>
            <span
              v-else-if="product.discount_price"
              class="bg-red-600 text-white px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-widest w-fit shadow-sm"
            >
              Sale
            </span>
          </div>

          <button
            v-if="allMedia.length > 1"
            @click="prevSlide"
            class="absolute flex items-center justify-center w-10 h-10 text-gray-800 transition -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            v-if="allMedia.length > 1"
            @click="nextSlide"
            class="absolute flex items-center justify-center w-10 h-10 text-gray-800 transition -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/90 hover:bg-white group-hover:opacity-100"
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <div
          v-if="allMedia.length > 1"
          class="flex gap-3 pb-2 overflow-x-auto custom-scrollbar"
        >
          <div
            v-for="(media, idx) in allMedia"
            :key="idx"
            @click="activeSlide = idx"
            :class="
              activeSlide === idx
                ? 'ring-2 ring-black border-transparent'
                : 'border-gray-200 opacity-60 hover:opacity-100'
            "
            class="relative w-20 h-24 overflow-hidden transition-all border-2 cursor-pointer shrink-0 rounded-xl bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="object-cover w-full h-full"
            />
            <div
              v-else
              class="relative flex items-center justify-center w-full h-full text-gray-500 bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute z-10 w-8 h-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <div>
          <div class="flex items-center gap-2 mb-2">
            <span
              class="px-2 py-1 text-[10px] font-bold tracking-widest text-blue-700 bg-blue-100 rounded-md uppercase"
            >
              {{ product.category?.name || "Uncategorized" }}
            </span>
            <span
              v-if="product.bag_category"
              class="px-2 py-1 text-[10px] font-bold tracking-widest text-gray-700 bg-gray-200 rounded-md uppercase"
            >
              {{ product.bag_category.name }}
            </span>
          </div>
          <h2 class="text-3xl font-black tracking-tight text-gray-900 uppercase">
            {{ product.name }}
          </h2>

          <div class="flex items-end gap-4 mt-6">
            <template v-if="product.discount_price">
              <span class="text-3xl font-black text-red-600">{{
                formatPrice(product.discount_price)
              }}</span>
              <span class="mb-1 text-lg text-gray-400 line-through">{{
                formatPrice(product.price)
              }}</span>
            </template>
            <span v-else class="text-3xl font-black text-gray-900">{{
              formatPrice(product.price)
            }}</span>
          </div>

          <div
            v-if="product.prices && Object.keys(product.prices).length > 0"
            class="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100"
          >
            <div
              v-for="(val, curr) in product.prices"
              :key="curr"
              class="bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg flex flex-col min-w-[80px]"
            >
              <span class="text-[9px] font-bold text-gray-500 uppercase tracking-widest"
                >{{ curr }} Price</span
              >
              <div class="flex items-center gap-2 mt-0.5">
                <span
                  v-if="product.discount_prices && product.discount_prices[curr]"
                  class="text-sm font-black text-red-600"
                >
                  {{ getCurrencySymbol(curr) }}{{ product.discount_prices[curr] }}
                </span>
                <span
                  :class="
                    product.discount_prices && product.discount_prices[curr]
                      ? 'line-through text-gray-400 text-xs'
                      : 'text-sm font-black text-gray-900'
                  "
                >
                  {{ getCurrencySymbol(curr) }}{{ val }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-wrap gap-6 p-6 mb-6 border border-gray-100 bg-gray-50 rounded-2xl"
        >
          <div>
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Weight
            </p>
            <p class="font-bold text-gray-900">
              {{ product.weight }} <span class="text-xs font-medium">gr</span>
            </p>
          </div>
          <div v-if="product.length || product.width || product.height">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Dimensions (L x W x H)
            </p>
            <p class="font-mono font-bold text-gray-900">
              {{ product.length || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.width || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.height || "-" }} <span class="text-xs font-medium">cm</span>
            </p>
          </div>
          <div v-if="product.material">
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">
              Material
            </p>
            <p class="font-bold text-gray-900">{{ product.material }}</p>
          </div>
          <div
            v-if="product.strap_length"
            class="flex items-start justify-between w-full pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Strap Length</span
            >
            <span class="font-medium text-right text-gray-900">
              <template
                v-if="
                  Array.isArray(product.strap_length) && product.strap_length.length > 0
                "
                >{{ product.strap_length.join(", ") }}</template
              >
              <template v-else-if="!Array.isArray(product.strap_length)">{{
                product.strap_length
              }}</template>
            </span>
          </div>
          <div
            v-if="parsedProductColors && parsedProductColors.length > 0"
            class="w-full pt-3 border-t border-gray-100"
          >
            <p class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
              Colors
            </p>
            <div class="flex flex-wrap items-center gap-3">
              <div
                v-for="(c, idx) in parsedProductColors"
                :key="idx"
                class="flex items-center gap-1.5 bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm"
              >
                <div
                  class="w-3 h-3 border border-gray-300 rounded-full"
                  :style="{ backgroundColor: c.hex }"
                ></div>
                <span
                  class="font-bold text-gray-800 text-[10px] uppercase tracking-wider"
                  >{{ c.name }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col gap-5 p-6 mb-6 border border-gray-100 bg-gray-50 rounded-2xl"
        >
          <div
            class="flex flex-col items-start justify-between gap-4 sm:items-center sm:flex-row"
          >
            <div>
              <p
                class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
              >
                Total Available Stock
              </p>
              <p
                :class="product.stock <= 5 ? 'text-red-600' : 'text-gray-900'"
                class="text-3xl font-black"
              >
                {{ product.stock }}
                <span class="text-sm font-medium text-gray-500">pcs</span>
              </p>
            </div>
            <router-link
              to="/admin/stocks"
              class="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-gray-700 transition-all bg-white border border-gray-200 shadow-sm hover:border-blue-500 hover:text-blue-600 rounded-xl group"
            >
              Manage Batches
              <span class="transition-transform group-hover:translate-x-1">&rarr;</span>
            </router-link>
          </div>

          <div
            v-if="product.stocks && product.stocks.length > 0"
            class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            <div
              class="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-100/50"
            >
              <p class="text-[10px] font-bold text-gray-600 uppercase tracking-widest">
                Active Stock Batches (FIFO)
              </p>
              <span
                class="text-[10px] font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-md"
                >{{ product.stocks.length }} Batch</span
              >
            </div>
            <div class="p-2 overflow-y-auto max-h-48 custom-scrollbar">
              <div
                v-for="batch in product.stocks"
                :key="batch.id"
                class="flex items-center justify-between p-3 transition-colors border border-transparent rounded-lg hover:bg-gray-50 hover:border-gray-100"
              >
                <div class="flex items-center gap-4">
                  <div class="relative flex items-center justify-center w-3 h-3">
                    <span
                      class="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"
                    ></span>
                    <span
                      class="relative inline-flex w-2 h-2 bg-green-500 rounded-full"
                    ></span>
                  </div>
                  <div>
                    <p class="font-mono text-sm font-bold text-gray-800">
                      {{ batch.batch_code }}
                    </p>
                    <p
                      class="text-[10px] font-medium text-gray-400 mt-0.5 uppercase tracking-wide"
                    >
                      Added: {{ formatDate(batch.created_at) }}
                    </p>
                  </div>
                </div>
                <span
                  class="font-black text-blue-700 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-lg text-xs shadow-sm"
                  >{{ batch.quantity }} pcs</span
                >
              </div>
            </div>
          </div>
          <div
            v-else
            class="py-6 text-center bg-white border border-gray-200 border-dashed rounded-xl"
          >
            <p class="text-xs font-medium text-gray-500">
              No active stock batches found.
            </p>
          </div>

          <div
            class="flex items-center justify-between pt-4 mt-2 border-t border-gray-200"
          >
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Data Record
            </p>
            <div class="text-right">
              <p
                class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-0.5"
              >
                Created At
              </p>
              <p class="text-xs font-bold text-gray-700">
                {{ formatDate(product.created_at) }}
              </p>
            </div>
          </div>
        </div>

        <div class="border-t border-gray-100 divide-y divide-gray-100">
          <div class="py-4">
            <button
              @click="toggleSection('description')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Description (ID)</span
              >
              <span class="text-gray-400">{{
                activeSection === "description" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'description'"
              class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
            >
              {{ product.description || "No description provided." }}
            </div>
          </div>

          <div class="py-4">
            <button
              @click="toggleSection('description_en')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Description (EN)</span
              >
              <span class="text-gray-400">{{
                activeSection === "description_en" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'description_en'"
              class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
            >
              {{ product.description_en || "No English description provided." }}
            </div>
          </div>

          <div class="py-4">
            <button
              @click="toggleSection('design')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Design Details (ID)</span
              >
              <span class="text-gray-400">{{
                activeSection === "design" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'design'"
              class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
            >
              {{ product.design || "No design details provided." }}
            </div>
          </div>

          <div class="py-4">
            <button
              @click="toggleSection('design_en')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Design Details (EN)</span
              >
              <span class="text-gray-400">{{
                activeSection === "design_en" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'design_en'"
              class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
            >
              {{ product.design_en || "No English design details provided." }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const isLoading = ref(true);
const activeSlide = ref(0);
const activeSection = ref("description");

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const allMedia = computed(() => {
  if (!product.value) return [];
  let media = [{ type: "image", url: product.value.image || defaultBagIcon }];
  if (product.value.variant_images && Array.isArray(product.value.variant_images)) {
    product.value.variant_images.forEach((img) =>
      media.push({ type: "image", url: img })
    );
  }
  if (product.value.variant_video)
    media.push({ type: "video", url: product.value.variant_video });
  return media;
});

const currentMediaType = computed(
  () => allMedia.value[activeSlide.value]?.type || "image"
);
const currentMediaUrl = computed(() => allMedia.value[activeSlide.value]?.url || "");

const nextSlide = () =>
  (activeSlide.value =
    activeSlide.value === allMedia.value.length - 1 ? 0 : activeSlide.value + 1);
const prevSlide = () =>
  (activeSlide.value =
    activeSlide.value === 0 ? allMedia.value.length - 1 : activeSlide.value - 1);
const toggleSection = (section) =>
  (activeSection.value = activeSection.value === section ? null : section);

const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products/${route.params.id}`, axiosConfig);
    product.value = res.data;
  } catch (error) {
    console.error("Fetch product error:", error);
    router.push("/admin/products");
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);
const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getCurrencySymbol = (currencyCode) => {
  const symbols = {
    USD: "$",
    SGD: "S$",
    EUR: "€",
    AUD: "A$",
    MYR: "RM",
  };
  return symbols[currencyCode] || `${currencyCode} `;
};

const goToEditPage = () => {
  router.push({
    path: `/admin/products/edit/${product.value.id}`,
    state: { productData: product.value },
  });
};

const legacyColorMap = {
  Black: "#000000",
  White: "#FFFFFF",
  Brown: "#8B4513",
  Beige: "#F5F5DC",
  Red: "#DC143C",
  Navy: "#000080",
  Green: "#008000",
  Grey: "#808080",
  Pink: "#FFC0CB",
  Yellow: "#FFD700",
  Blue: "#4169E1",
  Cream: "#FFFDD0",
  Sage: "#9DC183",
  Mocca: "#967969",
};

const parsedProductColors = computed(() => {
  if (!product.value || !product.value.color || !Array.isArray(product.value.color))
    return [];
  return product.value.color.map((c) => {
    if (typeof c === "string" && c.includes("|")) {
      const [name, hex] = c.split("|");
      return { name, hex };
    }
    const fallbackHex = legacyColorMap[c] || "#cccccc";
    return { name: c, hex: fallbackHex };
  });
});

const handleZoom = (e) => {
  const img = e.currentTarget.querySelector(".main-product-image");
  if (!img) return;
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;
  img.style.transformOrigin = `${x}% ${y}%`;
};

const resetZoom = (e) => {
  const img = e.currentTarget.querySelector(".main-product-image");
  if (img) img.style.transformOrigin = "center center";
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
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

* "ProductPage.vue" :

<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[500px] animate-fade-in"
  >
    <Breadcrumb />
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      <div class="p-6 bg-gray-50 rounded-2xl border border-gray-100">
        <p class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">
          Total Products
        </p>
        <p class="text-4xl font-black text-black">{{ products.length }}</p>
      </div>
      <div class="p-6 bg-blue-50/50 rounded-2xl border border-blue-100">
        <p class="text-xs text-blue-500 font-bold uppercase tracking-widest mb-1">
          Healthy Stock
        </p>
        <p class="text-4xl font-black text-blue-600">{{ healthyStockCount }}</p>
      </div>
      <div class="p-6 bg-red-50/50 rounded-2xl border border-red-100">
        <p class="text-xs text-red-600 font-bold uppercase tracking-widest mb-1">
          Low Stock (under 5)
        </p>
        <p class="text-4xl font-black text-red-700">{{ lowStockCount }}</p>
      </div>
      <div class="p-6 bg-purple-50/50 rounded-2xl border border-purple-100">
        <p class="text-xs text-purple-600 font-bold uppercase tracking-widest mb-1">
          On Discount
        </p>
        <p class="text-4xl font-black text-purple-700">{{ discountedProductsCount }}</p>
      </div>
    </div>

    <div
      class="flex md:flex-row flex-col justify-between items-start md:items-center gap-4 mb-8"
    >
      <h1 class="font-bold text-gray-800 text-2xl">Products</h1>

      <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
        <div class="relative flex-grow md:flex-grow-0">
          <span class="left-0 absolute inset-y-0 flex items-center pl-3 text-gray-400">
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
            placeholder="Search product name..."
            class="bg-gray-50 py-2 pr-4 pl-10 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black w-full md:w-64 text-sm transition"
          />
        </div>

        <div
          class="flex items-center bg-gray-50 px-3 border border-gray-200 rounded-xl h-[42px]"
        >
          <span class="mr-2 text-gray-400 text-xs">Show:</span>
          <select
            v-model="itemsPerPage"
            class="bg-transparent outline-none font-bold text-gray-700 text-sm cursor-pointer"
          >
            <option :value="1">1</option>
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
          </select>
        </div>

        <select
          v-model="selectedCategory"
          class="bg-gray-50 px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-black h-[42px] text-gray-700 text-sm transition cursor-pointer"
        >
          <option value="">All Categories</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.category_name">
            {{ cat.category_name }}
          </option>
        </select>

        <router-link
          to="/admin/products/inactive"
          class="flex items-center hover:bg-gray-50 px-6 py-2 border border-black rounded-xl h-[42px] font-bold text-black transition"
        >
          Inactive Archive
        </router-link>

        <!-- [PERBAIKAN] Tampilkan tombol ADD hanya jika punya akses Create atau dia adalah SuperAdmin -->
        <router-link
          v-if="canCreate || isSuperAdmin"
          to="/admin/products/add"
          class="flex items-center bg-black hover:bg-gray-800 px-6 py-2 rounded-xl h-[42px] font-bold text-white whitespace-nowrap transition"
          >+ New Product</router-link
        >
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left">
        <thead>
          <tr class="border-b text-gray-400 text-xs uppercase tracking-widest">
            <th class="pb-4">Image</th>
            <th class="pb-4">Code</th>
            <th class="pb-4">Name</th>
            <th class="pb-4">Category</th>
            <th class="pb-4">Price</th>
            <th class="pb-4">Stock</th>
            <th class="pb-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody v-if="isLoading" class="text-gray-600">
          <tr
            v-for="i in 5"
            :key="`skeleton-${i}`"
            class="animate-pulse border-b border-gray-50"
          >
            <td class="py-4"><div class="h-16 w-16 bg-gray-200 rounded-lg"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-12"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-32"></div></td>
            <td class="py-4"><div class="h-5 bg-gray-200 rounded-full w-20"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-24"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-10"></div></td>
            <td class="py-4"><div class="h-4 bg-gray-200 rounded w-32 mx-auto"></div></td>
          </tr>
        </tbody>

        <tbody v-else class="text-gray-600">
          <tr
            v-for="p in paginatedProducts"
            :key="p.id"
            class="hover:bg-gray-50 border-gray-50 border-b transition"
          >
            <td class="py-4">
              <img
                :src="p.image || defaultBagIcon"
                class="shadow-sm rounded-lg w-16 h-16 object-cover"
                alt="Product Image"
              />
            </td>
            <td class="py-4 font-mono text-sm">{{ p.code }}</td>
            <td class="py-4 font-bold text-gray-800">{{ p.name }}</td>
            <!-- <td class="py-4">
              <span
                class="bg-blue-50 px-3 py-1 rounded-full font-medium text-blue-600 text-xs"
              >
                {{ p.category?.name }}
              </span>
            </td> -->
            <td class="py-4">
              <div class="flex flex-col items-start gap-1">
                <span
                  class="bg-blue-50 px-2 py-0.5 rounded text-blue-600 text-[10px] font-bold uppercase tracking-widest"
                >
                  {{ p.category?.name || "No Collection" }}
                </span>

                <!-- 👇 TAMPILKAN TIPE TAS 👇 -->
                <span
                  v-if="p.bag_category"
                  class="text-[9px] text-gray-400 font-bold uppercase tracking-widest border border-gray-200 px-1.5 py-0.5 rounded"
                >
                  {{ p.bag_category.name }}
                </span>
              </div>
            </td>
            <td class="py-4 font-bold">
              <div v-if="p.discount_price">
                <span class="text-red-500">{{ formatPrice(p.discount_price) }}</span>
                <span class="block text-gray-400 text-xs line-through">{{
                  formatPrice(p.price)
                }}</span>
              </div>
              <div v-else>
                {{ formatPrice(p.price) }}
              </div>
            </td>
            <td class="py-4">
              <span
                :class="
                  p.stock < 5
                    ? 'text-red-500 font-bold bg-red-50 px-2 py-0.5 rounded'
                    : ''
                "
              >
                {{ p.stock }} pcs
              </span>
            </td>
            <td class="py-4 text-center">
              <router-link
                :to="`/admin/products/view/${p.id}`"
                class="mr-4 font-medium text-blue-500 hover:text-blue-600"
              >
                View
              </router-link>

              <!-- [PERBAIKAN] Tampilkan tombol EDIT hanya jika punya akses Update atau SuperAdmin -->
              <button
                v-if="canUpdate || isSuperAdmin"
                @click="goToEdit(p)"
                class="mr-4 font-medium text-amber-500 hover:text-amber-600"
              >
                Edit
              </button>

              <!-- [PERBAIKAN] Tampilkan tombol DELETE hanya jika punya akses Delete atau SuperAdmin -->
              <button
                v-if="canDelete || isSuperAdmin"
                @click="confirmDelete(p.id)"
                class="font-medium text-red-500 hover:text-red-600"
              >
                Delete
              </button>
            </td>
          </tr>

          <tr v-if="filteredProducts.length === 0">
            <td colspan="7" class="py-12 text-center text-gray-400 italic">
              No products found matching your criteria.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="!isLoading && filteredProducts.length > 0"
      class="flex justify-between items-center mt-8 pt-6 border-gray-50 border-t"
    >
      <p class="text-gray-400 text-sm">
        Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to
        {{ Math.min(currentPage * itemsPerPage, filteredProducts.length) }}
        of {{ filteredProducts.length }} products
      </p>

      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="hover:bg-gray-50 disabled:opacity-30 px-4 py-2 border rounded-xl transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Previous
        </button>

        <button
          v-for="(page, index) in visiblePages"
          :key="index"
          @click="typeof page === 'number' ? (currentPage = page) : null"
          :disabled="page === '...'"
          :class="[
            page === currentPage ? 'bg-black text-white' : 'hover:bg-gray-50',
            page === '...'
              ? 'cursor-default border-transparent hover:bg-transparent'
              : 'border',
          ]"
          class="rounded-xl w-10 h-10 font-medium transition"
        >
          {{ page }}
        </button>

        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="hover:bg-gray-50 disabled:opacity-30 px-4 py-2 border rounded-xl transition disabled:cursor-not-allowed text-sm font-medium"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const products = ref([]);
const categories = ref([]);
const selectedCategory = ref("");
const searchQuery = ref("");
const isLoading = ref(true);

const currentPage = ref(1);
const itemsPerPage = ref(5);
const router = useRouter();

// --- STATE PERMISSIONS (BARU) ---
const userRole = ref("");
const isSuperAdmin = computed(() => userRole.value === "superadmin");

// State untuk menyimpan hak akses spesifik di modul "products"
const myPermissions = ref({
  create: false,
  read: false,
  update: false,
  delete: false,
});

const canCreate = computed(() => myPermissions.value.create);
const canUpdate = computed(() => myPermissions.value.update);
const canDelete = computed(() => myPermissions.value.delete);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// [BARU] Mengambil data hak akses pengguna yang sedang login
const fetchUserPermissions = async () => {
  const adminStr = localStorage.getItem("admin");
  if (adminStr) {
    const admin = JSON.parse(adminStr);
    userRole.value = admin.usertype;
  }

  // Jika superadmin, tidak perlu repot-repot nge-fetch rule, langsung full akses
  if (isSuperAdmin.value) return;

  try {
    const res = await axios.get(`${BASE_URL}/admin/access-policies`, axiosConfig);
    const policies = res.data.permissions;

    // Mengekstrak array ['create', 'update', dll] milik role yang sedang login untuk modul 'products'
    const productPerms = policies[userRole.value]?.products || [];

    myPermissions.value = {
      create: productPerms.includes("create"),
      read: productPerms.includes("read"),
      update: productPerms.includes("update"),
      delete: productPerms.includes("delete"),
    };
  } catch (error) {
    console.error("Gagal mengambil kebijakan akses untuk tombol", error);
  }
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resProd, resCat] = await Promise.all([
      axios.get(`${BASE_URL}/products`, axiosConfig),
      axios.get(`${BASE_URL}/categories`, axiosConfig),
    ]);
    products.value = resProd.data;
    categories.value = resCat.data.data;
  } catch (error) {
    console.error("Fetch error:", error);
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      isLoading.value = true;
      try {
        await axios.delete(`${BASE_URL}/products/${id}`, axiosConfig);
        await fetchData();
        Swal.fire("Deleted!", "Success", "success");
      } catch (err) {
        isLoading.value = false;
        Swal.fire("Error", "Failed to delete product.", "error");
      }
    }
  });
};

const goToEdit = (product) => {
  router.push({
    name: "ProductEdit",
    params: { id: product.id },
    state: { productData: JSON.parse(JSON.stringify(product)) },
  });
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);

// ... (computed filter & pagination tetap utuh dari sebelumnya) ...
const healthyStockCount = computed(
  () => products.value.filter((p) => p.stock >= 5).length
);
const lowStockCount = computed(() => products.value.filter((p) => p.stock < 5).length);
const discountedProductsCount = computed(() => {
  return products.value.filter(
    (p) => p.discount_price && parseFloat(p.discount_price) < parseFloat(p.price)
  ).length;
});

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchesCategory =
      selectedCategory.value === "" || p.category?.name === selectedCategory.value;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage.value)
);
const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
});
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredProducts.value.slice(start, start + itemsPerPage.value);
});

watch([selectedCategory, searchQuery, itemsPerPage], () => {
  currentPage.value = 1;
});

onMounted(() => {
  // Panggil fetchUserPermissions dulu agar UI tombol bisa segera bersiap
  fetchUserPermissions().then(() => {
    fetchData();
  });
});
</script>

<style scoped>
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
</style>
