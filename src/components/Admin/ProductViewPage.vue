<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px] mx-auto max-w-5xl"
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
          Loading Product...
        </p>
      </div>
    </div>

    <div
      class="flex justify-between items-center mb-10 pb-6 border-b border-gray-100"
    >
      <div class="flex items-center gap-4">
        <button
          @click="$router.back()"
          class="text-gray-400 hover:text-black transition-colors p-2 rounded-full hover:bg-gray-50"
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
          <h1 class="font-bold text-gray-800 text-2xl">Product Details</h1>
          <p
            class="text-gray-500 text-xs mt-1 uppercase tracking-widest font-mono"
          >
            SKU: {{ product?.code || "..." }}
          </p>
        </div>
      </div>
      <div class="flex gap-3">
        <!-- <router-link :to="`/admin/products/edit/${product?.id}`" v-if="product" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition">
          Edit Product
        </router-link> -->
        <button
          @click="goToEditPage"
          v-if="product"
          class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-widest transition"
        >
          Edit Product
        </button>
      </div>
    </div>

    <div
      v-if="product"
      class="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in"
    >
      <div class="space-y-4">
        <div
          class="relative bg-gray-50 rounded-2xl aspect-[4/5] overflow-hidden group select-none border border-gray-100"
        >
          <img
            v-if="currentMediaType === 'image'"
            :src="currentMediaUrl"
            class="w-full h-full object-cover transition-opacity duration-300"
            alt="Product View"
          />

          <video
            v-else-if="currentMediaType === 'video'"
            :src="currentMediaUrl"
            class="w-full h-full object-cover bg-black"
            controls
            autoplay
            muted
            loop
          ></video>

          <div class="absolute top-4 left-4 flex flex-col gap-2">
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
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg text-gray-800"
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
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg text-gray-800"
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
          class="flex gap-3 overflow-x-auto pb-2 custom-scrollbar"
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
            class="w-20 h-24 shrink-0 rounded-xl overflow-hidden cursor-pointer border-2 transition-all relative bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 absolute z-10"
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
            class="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2"
          >
            {{ product.category?.name || "Uncategorized" }}
          </p>
          <h2
            class="text-3xl font-black text-gray-900 uppercase tracking-tight"
          >
            {{ product.name }}
          </h2>

          <div class="flex items-end gap-4 mt-6">
            <template v-if="product.discount_price">
              <span class="text-3xl font-black text-red-600">{{
                formatPrice(product.discount_price)
              }}</span>
              <span class="text-lg text-gray-400 line-through mb-1">{{
                formatPrice(product.price)
              }}</span>
            </template>
            <span v-else class="text-3xl font-black text-gray-900">{{
              formatPrice(product.price)
            }}</span>
          </div>
        </div>

        <div
          class="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex flex-wrap gap-6 mb-6"
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
            <p class="font-bold text-gray-900 font-mono">
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
            <p class="font-bold text-gray-900 font-mono">
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
            class="flex justify-between items-start text-sm border-t border-gray-100 pt-3"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Strap Length</span
            >
            <span class="text-gray-900 font-medium text-right">{{
              product.strap_length
            }}</span>
          </div>

          <!-- <div v-if="product.color">
            <p
              class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
            >
              Color
            </p>
            <div class="flex items-center gap-2">
              <div
                class="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                :style="{ backgroundColor: getColorHex(product.color) }"
              ></div>
              <p class="font-bold text-gray-900">{{ product.color }}</p>
            </div>
          </div> -->
          <div v-if="product.color && product.color.length > 0">
            <p
              class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
            >
              Colors
            </p>
            <div class="flex flex-wrap items-center gap-3">
              <div
                v-for="(c, idx) in product.color"
                :key="idx"
                class="flex items-center gap-1.5 bg-white border border-gray-200 px-2 py-1 rounded-lg shadow-sm"
              >
                <div
                  class="w-3 h-3 rounded-full border border-gray-300"
                  :style="{ backgroundColor: getColorHex(c) }"
                ></div>
                <span
                  class="font-bold text-gray-800 text-[10px] uppercase tracking-wider"
                  >{{ c }}</span
                >
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex justify-between items-center"
        >
          <div>
            <p
              class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1"
            >
              Current Stock
            </p>
            <p
              :class="product.stock <= 5 ? 'text-red-600' : 'text-gray-900'"
              class="text-2xl font-black"
            >
              {{ product.stock }} <span class="text-sm font-medium">pcs</span>
            </p>
          </div>
          <div
            class="bg-gray-50 p-6 rounded-2xl border border-gray-100 flex justify-between items-center"
          >
            <div>
              <p
                class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1"
              >
                Current Total Stock
              </p>
              <p
                :class="product.stock <= 5 ? 'text-red-600' : 'text-gray-900'"
                class="text-2xl font-black"
              >
                {{ product.stock }} <span class="text-sm font-medium">pcs</span>
              </p>
            </div>
            <router-link
              to="/admin/stocks"
              class="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              Manage Batches <span>→</span>
            </router-link>
          </div>

          <div
            v-if="product.stocks && product.stocks.length > 0"
            class="mt-4 border border-gray-200 rounded-xl overflow-hidden"
          >
            <div class="bg-gray-100 px-4 py-2 border-b border-gray-200">
              <p
                class="text-[10px] font-bold text-gray-600 uppercase tracking-widest"
              >
                Active Stock Batches (FIFO)
              </p>
            </div>
            <div
              class="p-4 space-y-3 max-h-40 overflow-y-auto custom-scrollbar"
            >
              <div
                v-for="batch in product.stocks"
                :key="batch.id"
                class="flex justify-between items-center text-sm"
              >
                <div class="flex items-center gap-3">
                  <div
                    class="w-2 h-2 bg-green-500 rounded-full animate-pulse"
                  ></div>
                  <div>
                    <p class="font-mono font-bold text-gray-800 text-xs">
                      {{ batch.batch_code }}
                    </p>
                    <p class="text-[10px] text-gray-400">
                      {{ formatDate(batch.created_at) }}
                    </p>
                  </div>
                </div>
                <span
                  class="font-black text-gray-700 bg-gray-50 px-2 py-1 rounded"
                  >{{ batch.quantity }} pcs</span
                >
              </div>
            </div>
          </div>
          <div class="text-right">
            <p
              class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1"
            >
              Created At
            </p>
            <p class="text-sm font-medium text-gray-900">
              {{ formatDate(product.created_at) }}
            </p>
          </div>
        </div>

        <div class="border-t border-gray-100 divide-y divide-gray-100">
          <div class="py-4">
            <button
              @click="toggleSection('description')"
              class="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <span
                class="font-bold text-sm uppercase tracking-widest text-gray-800"
                >Description</span
              >
              <span class="text-gray-400">{{
                activeSection === "description" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'description'"
              class="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap"
            >
              {{ product.description || "No description provided." }}
            </div>
          </div>

          <!-- <div class="py-4">
            <button
              @click="toggleSection('care')"
              class="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <span
                class="font-bold text-sm uppercase tracking-widest text-gray-800"
                >Care Instructions</span
              >
              <span class="text-gray-400">{{
                activeSection === "care" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'care'"
              class="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap"
            >
              {{ product.care || "No care instructions provided." }}
            </div>
          </div> -->

          <div class="py-4">
            <button
              @click="toggleSection('design')"
              class="w-full flex justify-between items-center text-left focus:outline-none"
            >
              <span
                class="font-bold text-sm uppercase tracking-widest text-gray-800"
                >Design Details</span
              >
              <span class="text-gray-400">{{
                activeSection === "design" ? "−" : "+"
              }}</span>
            </button>
            <div
              v-show="activeSection === 'design'"
              class="mt-4 text-sm text-gray-600 leading-relaxed whitespace-pre-wrap"
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
const goToEditPage = () => {
  router.push({
    path: `/admin/products/edit/${product.value.id}`,
    state: { productData: JSON.stringify(product.value) }, // Lempar data mentah ke halaman tujuan
  });
};

// [BARU] Array warna yang sama untuk mencari kode HEX
const colorMap = {
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
  Cream: '#FFFDD0', // <--- Warna Baru
  Sage: '#9DC183'   // <--- Warna Baru
};

const getColorHex = (colorName) => {
  return colorMap[colorName] || "#cccccc"; // Default abu-abu jika warna tidak dikenali
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
