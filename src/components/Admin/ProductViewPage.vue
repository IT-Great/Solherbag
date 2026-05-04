<!-- <template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px] mx-auto max-w-5xl"
  >
    <div
      v-if="isLoading"
      class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300"
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

    <div
      class="flex items-center justify-between pb-6 mb-10 border-b border-gray-100"
    >
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
          <p
            class="mt-1 font-mono text-xs tracking-widest text-gray-500 uppercase"
          >
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

    <div
      v-if="product"
      class="grid grid-cols-1 gap-12 md:grid-cols-2 animate-fade-in"
    >
      <div class="space-y-4">
        <div
          class="relative bg-gray-50 rounded-2xl aspect-[4/5] overflow-hidden group select-none border border-gray-100"
        >
          <img
            v-if="currentMediaType === 'image'"
            :src="currentMediaUrl"
            class="object-cover w-full h-full transition-opacity duration-300"
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
          <p
            class="mb-2 text-xs font-bold tracking-widest text-blue-600 uppercase"
          >
            {{ product.category?.name || "Uncategorized" }}
          </p>
          <h2
            class="text-3xl font-black tracking-tight text-gray-900 uppercase"
          >
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
        </div>

        <div
          class="flex flex-wrap gap-6 p-6 mb-6 border border-gray-100 bg-gray-50 rounded-2xl"
        >
          <div>
            <p
              class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
            >
              Weight
            </p>
            <p class="font-bold text-gray-900">
              {{ product.weight }} <span class="text-xs font-medium">gr</span>
            </p>
          </div>
          <div v-if="product.length || product.width || product.height">
            <p
              class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
            >
              Dimensions (L x W x H)
            </p>
            <p class="font-mono font-bold text-gray-900">
              {{ product.length || "-" }}
              <span class="text-xs text-gray-400">x</span>
              {{ product.width || "-" }}
              <span class="text-xs text-gray-400">x</span>
              {{ product.height || "-" }}
              <span class="text-xs font-medium">cm</span>
            </p>
          </div>
          <div v-else>
            <p
              class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
            >
              Dimensions (L x W x H)
            </p>
            <p class="font-mono font-bold text-gray-900">
              {{ product.length || "-" }}
              <span class="text-xs text-gray-400">x</span>
              {{ product.width || "-" }}
              <span class="text-xs text-gray-400">x</span>
              {{ product.height || "-" }}
              <span class="text-xs font-medium">cm</span>
            </p>
          </div>
          <div v-if="product.material">
            <p
              class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
            >
              Material
            </p>
            <p class="font-bold text-gray-900">{{ product.material }}</p>
          </div>
          <div
            v-if="product.strap_length"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Strap Length</span
            >
            <span class="font-medium text-right text-gray-900">{{
              product.strap_length
            }}</span>
          </div>
          <div v-if="parsedProductColors && parsedProductColors.length > 0">
            <p
              class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
            >
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
              class="bg-white border border-gray-200 hover:border-blue-500 hover:text-blue-600 px-4 py-2.5 rounded-xl text-xs font-bold text-gray-700 transition-all flex items-center gap-2 shadow-sm group"
            >
              Manage Batches
              <span class="transition-transform group-hover:translate-x-1"
                >&rarr;</span
              >
            </router-link>
          </div>

          <div
            v-if="product.stocks && product.stocks.length > 0"
            class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl"
          >
            <div
              class="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-100/50"
            >
              <p
                class="text-[10px] font-bold text-gray-600 uppercase tracking-widest"
              >
                Active Stock Batches (FIFO)
              </p>
              <span
                class="text-[10px] font-bold text-gray-400 bg-gray-200 px-2 py-0.5 rounded-md"
              >
                {{ product.stocks.length }} Batch
              </span>
            </div>

            <div class="p-2 overflow-y-auto max-h-48 custom-scrollbar">
              <div
                v-for="batch in product.stocks"
                :key="batch.id"
                class="flex items-center justify-between p-3 transition-colors border border-transparent rounded-lg hover:bg-gray-50 hover:border-gray-100"
              >
                <div class="flex items-center gap-4">
                  <div
                    class="relative flex items-center justify-center w-3 h-3"
                  >
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
                >
                  {{ batch.quantity }} pcs
                </span>
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
            <p
              class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
            >
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
              <span
                class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Description</span
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
              @click="toggleSection('design')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span
                class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Design Details</span
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

// [BARU] Import gambar default
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const isLoading = ref(true);

const activeSlide = ref(0);
const activeSection = ref("description");

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// Gabungkan semua media ke dalam satu array untuk mempermudah slider
const allMedia = computed(() => {
  if (!product.value) return [];

  // let media = [{ type: "image", url: product.value.image }];
  // [PERBAIKAN] Berikan fallback defaultBagIcon jika product.value.image kosong
  let media = [{ type: "image", url: product.value.image || defaultBagIcon }];

  if (
    product.value.variant_images &&
    Array.isArray(product.value.variant_images)
  ) {
    product.value.variant_images.forEach((img) => {
      media.push({ type: "image", url: img });
    });
  }

  if (product.value.variant_video) {
    media.push({ type: "video", url: product.value.variant_video });
  }

  return media;
});

const currentMediaType = computed(
  () => allMedia.value[activeSlide.value]?.type || "image",
);
const currentMediaUrl = computed(
  () => allMedia.value[activeSlide.value]?.url || "",
);

const nextSlide = () => {
  activeSlide.value =
    activeSlide.value === allMedia.value.length - 1 ? 0 : activeSlide.value + 1;
};

const prevSlide = () => {
  activeSlide.value =
    activeSlide.value === 0 ? allMedia.value.length - 1 : activeSlide.value - 1;
};

const toggleSection = (section) => {
  activeSection.value = activeSection.value === section ? null : section;
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(
      `${BASE_URL}/products/${route.params.id}`,
      axiosConfig,
    );
    product.value = res.data;
  } catch (error) {
    console.error("Fetch product error:", error);
    // Jika tidak ditemukan, kembalikan ke list
    router.push("/admin/products");
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  return new Date(dateString).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// [BARU] Fungsi melempar State Data Produk secara Instan
// const goToEditPage = () => {
//   router.push({
//     path: `/admin/products/edit/${product.value.id}`,
//     state: { productData: JSON.stringify(product.value) }, // Lempar data mentah ke halaman tujuan
//   });
// };

// [PERBAIKAN] Melempar data instan tanpa JSON.stringify
const goToEditPage = () => {
  router.push({
    path: `/admin/products/edit/${product.value.id}`,
    state: { productData: product.value }, 
  });
};

// // [BARU] Array warna yang sama untuk mencari kode HEX
// const colorMap = {
//   Black: "#000000",
//   White: "#FFFFFF",
//   Brown: "#8B4513",
//   Beige: "#F5F5DC",
//   Red: "#DC143C",
//   Navy: "#000080",
//   Green: "#008000",
//   Grey: "#808080",
//   Pink: "#FFC0CB",
//   Yellow: "#FFD700",
//   Blue: "#4169E1",
//   Cream: '#FFFDD0', // <--- Warna Baru
//   Sage: '#9DC183',   // <--- Warna Baru
//   Mocca: '#967969', // <--- WARNA BARU
// };

// const getColorHex = (colorName) => {
//   return colorMap[colorName] || "#cccccc"; // Default abu-abu jika warna tidak dikenali
// };

// [BARU] Parsing data warna dari format "Name|#Hex"
const parsedProductColors = computed(() => {
  if (
    !product.value ||
    !product.value.color ||
    !Array.isArray(product.value.color)
  )
    return [];

  return product.value.color.map((c) => {
    // Jika format baru (ada tanda pipa '|')
    if (typeof c === "string" && c.includes("|")) {
      const [name, hex] = c.split("|");
      return { name, hex };
    }
    // Jika format data lama di database yang cuma menyimpan nama
    return { name: c, hex: "#cccccc" };
  });
});

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
        >
          <img
            v-if="currentMediaType === 'image'"
            :src="currentMediaUrl"
            class="object-cover w-full h-full transition-opacity duration-300"
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
          <p class="mb-2 text-xs font-bold tracking-widest text-blue-600 uppercase">
            {{ product.category?.name || "Uncategorized" }}
          </p>
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
            <span class="font-medium text-right text-gray-900">{{
              product.strap_length
            }}</span>
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
                >Description</span
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
              @click="toggleSection('design')"
              class="flex items-center justify-between w-full text-left focus:outline-none"
            >
              <span class="text-sm font-bold tracking-widest text-gray-800 uppercase"
                >Design Details</span
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

const goToEditPage = () => {
  router.push({
    path: `/admin/products/edit/${product.value.id}`,
    state: { productData: product.value },
  });
};

// // [BARU] Logika Parsing Warna yang Menyesuaikan dengan Format "Name|#Hex"
// const parsedProductColors = computed(() => {
//   if (!product.value || !product.value.color || !Array.isArray(product.value.color)) return [];

//   return product.value.color.map((c) => {
//     // Jika format baru (ada pipa '|')
//     if (typeof c === "string" && c.includes("|")) {
//       const [name, hex] = c.split("|");
//       return { name, hex };
//     }
//     // Fallback untuk data lawas yang tidak punya kode Hex
//     return { name: c, hex: "#cccccc" };
//   });
// });

// [PERBAIKAN] Kamus Penerjemah untuk Data Lawas
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

// Logika Parsing Warna
const parsedProductColors = computed(() => {
  if (!product.value || !product.value.color || !Array.isArray(product.value.color))
    return [];

  return product.value.color.map((c) => {
    // 1. Jika format baru (ada pipa '|'), pisahkan dan gunakan hex-nya
    if (typeof c === "string" && c.includes("|")) {
      const [name, hex] = c.split("|");
      return { name, hex };
    }

    // 2. Jika format lawas, cari di legacyColorMap. Kalau tidak ketemu, baru pakai abu-abu.
    const fallbackHex = legacyColorMap[c] || "#cccccc";
    return { name: c, hex: fallbackHex };
  });
});

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
