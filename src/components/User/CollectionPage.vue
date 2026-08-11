<!-- <template>
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <div
      v-if="isLoading"
      class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-[#F3F4F6]/80 backdrop-blur-sm transition-all duration-300"
    >
      <div class="flex gap-2 mb-4">
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
      </div>
      <p class="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
        Loading Collection...
      </p>
    </div>

    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="mb-8 text-3xl font-bold tracking-tight text-black uppercase">
        {{ $t("collection.products") }}
      </h1>

      <div class="flex flex-col justify-between gap-4 mb-12 md:flex-row md:items-center">
        <div class="relative w-full md:w-80">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
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
            :placeholder="$t('collection.search_placeholder')"
            class="w-full py-3 pl-10 pr-4 text-sm transition bg-white border-none rounded-full shadow-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div class="flex flex-wrap items-center gap-2 md:flex-nowrap">
          <button
            @click="toggleSaleFilter"
            :class="[
              showOnlySale
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-red-500 hover:bg-red-50 border-red-100',
            ]"
            class="flex-1 md:flex-none px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition border rounded-full shadow-sm whitespace-nowrap text-center"
          >
            {{ $t("collection.sale") }}
          </button>

          <div class="relative flex-1 min-w-[140px] md:flex-none">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-black pr-8 truncate"
            >
              <option value="">{{ $t("collection.all_categories") }}</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.category_name">
                {{ cat.category_name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 flex items-center text-gray-400 pointer-events-none right-3"
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="paginatedProducts.length > 0">
      <div
        class="grid grid-cols-2 mx-auto gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 max-w-7xl"
      >
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="cursor-pointer group"
          @click="goToDetail(product)"
        >
          <div
            class="relative bg-white shadow-sm mb-4 rounded-sm aspect-[4/5] overflow-hidden group/slider"
          >
            <div
              class="flex w-full h-full transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
              }"
            >
              <template v-for="(media, index) in getMediaArray(product)" :key="index">
                <div class="relative flex-shrink-0 w-full h-full overflow-hidden">
                  <img
                    v-if="media.type === 'image'"
                    :src="media.url || defaultBagIcon"
                    class="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    alt="Product Image"
                  />
                  <video
                    v-else-if="media.type === 'video'"
                    :src="media.url"
                    class="absolute inset-0 object-cover w-full h-full bg-black"
                    autoplay
                    loop
                    muted
                    playsinline
                  ></video>
                </div>
              </template>
            </div>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="prevSlide(product.id, getMediaArray(product).length - 1)"
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="nextSlide(product.id, getMediaArray(product).length - 1)"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              class="absolute left-0 right-0 z-10 flex justify-center gap-1 bottom-2"
              v-if="getMediaArray(product).length > 1"
            >
              <div
                v-for="(m, idx) in getMediaArray(product)"
                :key="idx"
                :class="
                  (activeSlides[product.id] || 0) === idx
                    ? 'w-3 bg-black'
                    : 'w-1 bg-white/80'
                "
                class="h-1 transition-all duration-300 rounded-full shadow-sm"
              ></div>
            </div>

            <div
              v-if="product.discount_price && getDiscountStatus(product).active"
              class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter z-20"
            >
              -{{ calculateDiscount(product.price, product.discount_price) }}%
            </div>

            <button
              @click.stop="toggleWishlist(product.id)"
              class="absolute top-2 left-2 z-20 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-transform hover:scale-110"
            >
              <svg
                v-if="isFavorited(product.id)"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-400 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <div
              v-if="product.stock <= 5 && product.stock > 0"
              class="bottom-2 left-2 absolute bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded-md font-bold text-[9px] text-white uppercase tracking-widest z-20 shadow-sm animate-pulse"
            >
              Only {{ product.stock }} left!
            </div>

            <div
              v-else-if="product.stock <= 0"
              class="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex justify-center items-center z-20"
            >
              <span
                class="px-4 py-1 text-xs font-bold tracking-widest text-white uppercase transform bg-black rounded shadow-lg -rotate-12"
              >
                Sold Out
              </span>
            </div>
          </div>

          <div class="space-y-2 text-center md:text-left">
            <h3
              class="text-xs font-medium tracking-widest text-gray-900 uppercase truncate md:text-sm"
            >
              {{ product.name }}
            </h3>

            <div
              class="flex flex-wrap items-center justify-center gap-2 md:justify-start"
            >
              <template
                v-if="product.discount_price && !getDiscountStatus(product).expired"
              >
                <template v-if="getDiscountStatus(product).active">
                  <p class="text-sm font-bold text-red-600 md:text-base">
                    {{ formatPrice(product.discount_price) }}
                  </p>
                  <p class="text-xs text-gray-400 line-through md:text-sm">
                    {{ formatPrice(product.price) }}
                  </p>
                </template>

                <template v-else-if="getDiscountStatus(product).upcoming">
                  <div class="flex flex-col items-center w-full md:items-start">
                    <p class="text-sm font-semibold text-gray-600 md:text-base">
                      {{ formatPrice(product.price) }}
                    </p>

                    <p
                      class="text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded mt-1 uppercase tracking-widest text-center md:text-left"
                    >
                      Sale {{ formatPrice(product.discount_price) }} is scheduled:
                      {{
                        formatUpcomingDate(
                          product.discount_start_date,
                          product.discount_end_date
                        )
                      }}
                    </p>
                  </div>
                </template>
              </template>

              <template v-else>
                <p class="text-sm font-semibold text-gray-600 md:text-base">
                  {{ formatPrice(product.price) }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-4 mt-20">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="p-2 transition bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
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
        
        <span class="text-xs font-bold tracking-widest uppercase">
          {{ $t("collection.page", { current: currentPage, total: totalPages || 1 }) }}
        </span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages || totalPages === 0"
          class="p-2 transition bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
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
    </div>

    <div v-else-if="!isLoading" class="py-24 text-center">
      <p class="font-serif text-xl italic text-gray-400">
        {{ $t("collection.no_items") }}
      </p>
      <button
        @click="resetAllFilters"
        class="mt-4 text-sm font-bold tracking-widest text-black underline uppercase"
      >
        {{ $t("collection.reset_filters") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useProductStore } from "../../composables/useProductStore.js";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
// [BARU] Import Fuse.js
import Fuse from "fuse.js";
import { useI18n } from "vue-i18n";

// [BARU] Import gambar default
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

// [BARU] Import fungsi format mata uang global yang reaktif terhadap Pinia
import { formatPrice } from "../../utils/currency";

const route = useRoute();
const router = useRouter();

const { state, fetchCollectionsData } = useProductStore();
const categories = computed(() => state.categories);
const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false);
const currentPage = ref(1);
const itemsPerPage = 12;

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const isFavorited = (id) => userWishlists.value.includes(id);

const activeSlides = ref({});

const { t } = useI18n();

const getMediaArray = (prod) => {
  // let media = [{ type: "image", url: prod.image }];

  // [PERBAIKAN] Berikan defaultBagIcon jika prod.image kosong
  let media = [{ type: "image", url: prod.image || defaultBagIcon }];

  if (prod.variant_images && Array.isArray(prod.variant_images)) {
    prod.variant_images.forEach((img) => media.push({ type: "image", url: img }));
  }
  if (prod.variant_video) {
    media.push({ type: "video", url: prod.variant_video });
  }
  return media;
};

const nextSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] >= max ? 0 : activeSlides.value[prodId] + 1;
};

const prevSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] <= 0 ? max : activeSlides.value[prodId] - 1;
};

const fetchWishlists = async () => {
  if (!isAuthenticated) return;
  try {
    const res = await axios.get(`${BASE_URL}/wishlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    userWishlists.value = res.data.map((w) => w.product_id);
  } catch (error) {
    console.error("Failed to fetch wishlists");
  }
};

const toggleWishlist = async (productId) => {
  if (!isAuthenticated) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      text: "Please login to add favorites.",
    });
    return;
  }

  if (isFavorited(productId)) {
    userWishlists.value = userWishlists.value.filter((id) => id !== productId);
  } else {
    userWishlists.value.push(productId);
  }

  try {
    await axios.post(
      `${BASE_URL}/wishlists/toggle`,
      { product_id: productId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  } catch (error) {
    fetchWishlists();
  }
};

const initCollections = async () => {
  if (!state.isCollectionsLoaded) {
    isLoading.value = true;
    await fetchCollectionsData();
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  } else {
    fetchCollectionsData();
  }
};

// ============================================================================
// [PERBAIKAN] LOGIKA PENCARIAN TYPO-TOLERANT DENGAN FUSE.JS
// ============================================================================
const filteredProducts = computed(() => {
  let sourceProducts = state.collectionsProducts || [];

  // 1. Terapkan Filter Kategori & Diskon terlebih dahulu (Meringankan beban pencarian)
  sourceProducts = sourceProducts.filter((p) => {
    const productCategory = p.category?.name || p.category_name;
    const matchesCategory =
      selectedCategory.value === "" || productCategory === selectedCategory.value;
    // const matchesSale = showOnlySale.value
    //   ? p.discount_price !== null && p.discount_price > 0
    //   : true;

    const matchesSale = showOnlySale.value
      ? p.discount_price !== null && getDiscountStatus(p).active // Hanya yang sedang aktif
      : true;

    return matchesCategory && matchesSale;
  });

  // 2. Jika ada query pencarian, jalankan algoritma Fuzzy Search (Typo-Tolerant)
  if (searchQuery.value.trim() !== "") {
    const fuseOptions = {
      // Bobot pencarian: Nama lebih penting dari kategori, kode SKU lebih penting dari kategori
      keys: [
        { name: "name", weight: 0.7 },
        { name: "code", weight: 0.2 },
        { name: "category.name", weight: 0.1 },
      ],
      // Threshold: 0.0 (Sama persis), 1.0 (Cocok dengan apapun).
      // 0.3 adalah angka emas (Golden Ratio) untuk menoleransi typo 1-2 huruf.
      threshold: 0.3,
      // Mengabaikan huruf besar/kecil (otomatis aktif di Fuse)
      ignoreLocation: true,
    };

    const fuse = new Fuse(sourceProducts, fuseOptions);
    const results = fuse.search(searchQuery.value);

    // Fuse mengembalikan objek berupa { item: product, refIndex: ... }, kita ambil item-nya saja
    return results.map((result) => result.item);
  }

  // Jika tidak ada pencarian, kembalikan produk yang sudah difilter kategori/sale
  return sourceProducts;
});
// ============================================================================

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const calculateDiscount = (price, discountPrice) =>
  Math.round(((price - discountPrice) / price) * 100);
// const formatPrice = (value) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(value);

// const goToDetail = (product) => {
//   router.push({
//     path: `/product/${product.id}`,
//     state: { productData: JSON.stringify(product) }
//   });
// };

const goToDetail = (product) => {
  router.push({
    // [PERBAIKAN] Gunakan slug jika ada, jika produk lama belum punya slug, fallback ke id
    path: `/products/${product.slug || product.id}`,
    state: { productData: JSON.stringify(product) },
  });
};

const handleCategoryChange = () => {
  // Jika kategori dipilih, pastikan filter sale mati
  if (selectedCategory.value !== "") {
    showOnlySale.value = false;
  }
};

// ==========================================
// [PERBAIKAN] LOGIKA STATUS DISKON & ZONA WAKTU
// ==========================================

// Helper internal untuk mengonversi waktu UTC ke WIB (UTC+7)
const convertToWIB = (dateString) => {
  if (!dateString) return null;
  // Laravel mengirim UTC dengan format '2026-06-06T00:00:00.000000Z'
  const date = new Date(dateString);
  // Tambahkan 7 jam untuk menjadi WIB (karena server menyimpan UTC murni)
  // Perhatikan: Karena Anda minta "dikurangi 7 jam", pastikan ini benar.
  // Biasanya dari UTC ke WIB justru DITAMBAH (+7 jam).
  // Jika database Anda terlanjur menyimpan waktu +7 sebagai UTC,
  // dan Anda ingin menguranginya, gunakan: date.setHours(date.getHours() - 7);
  // Di sini saya berikan contoh standar konversi UTC ke WIB (+7).
  date.setHours(date.getHours() - 7);
  return date;
};

const getDiscountStatus = (p) => {
  if (!p || !p.discount_price) return { active: false, upcoming: false, expired: false };

  // Waktu perangkat lokal pengguna saat membuka web
  const now = new Date();
  let active = true;
  let upcoming = false;
  let expired = false;

  if (p.discount_start_date) {
    const startDate = convertToWIB(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }
  if (p.discount_end_date) {
    const endDate = convertToWIB(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }

  return { active, upcoming, expired };
};

// Format tanggal menjadi: "06 Jun, 07:00 - 07 Jun, 23:59 WIB"
const formatUpcomingDate = (startDateStr, endDateStr) => {
  if (!startDateStr) return "";

  const start = convertToWIB(startDateStr);
  const end = endDateStr ? convertToWIB(endDateStr) : null;

  const options = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Memaksa format 24 jam (misal 23:59)
  };

  const startFormatted = start.toLocaleString("id-ID", options).replace(/\./g, ":");

  if (end) {
    const endFormatted = end.toLocaleString("id-ID", options).replace(/\./g, ":");
    return `${startFormatted} to ${endFormatted} WIB`;
  }

  return `${startFormatted} WIB`;
};
// ==========================================

onMounted(async () => {
  if (route.query.search) {
    searchQuery.value = route.query.search;
  }

  // [BARU] Tangkap query category saat halaman pertama kali dimuat
  if (route.query.category) {
    selectedCategory.value = route.query.category;
    showOnlySale.value = false;
  }

  initCollections();
  fetchWishlists();
  window.addEventListener("wishlist-updated", fetchWishlists);
});

watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch !== undefined) {
      searchQuery.value = newSearch;
    }
  }
);

// [BARU] Pantau perubahan URL kategori
// Ini berguna jika user sudah berada di halaman Collection, lalu dia menekan
// kategori lain dari Header Mega Menu. Sistem akan otomatis memindahkan filternya.
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      selectedCategory.value = newCategory;
      showOnlySale.value = false; // Matikan filter sale jika berpindah kategori
    } else {
      // Jika user klik "All Bags" dari header, reset filter
      selectedCategory.value = "";
    }
  }
);

onUnmounted(() => {
  window.removeEventListener("wishlist-updated", fetchWishlists);
});
</script>

<style scoped>
/* [BARU] CSS untuk animasi Pulse Dots persis seperti di PaymentPage */
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

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style> -->

<!-- <template>
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <div
      v-if="isLoading"
      class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-[#F3F4F6]/80 backdrop-blur-sm transition-all duration-300"
    >
      <div class="flex gap-2 mb-4">
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
      </div>
      <p class="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
        Loading Collection...
      </p>
    </div>

    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="mb-8 text-3xl font-bold tracking-tight text-black uppercase">
        {{ $t("collection.products") }}
      </h1>

      <div class="flex flex-col justify-between gap-4 mb-12 md:flex-row md:items-center">
        <div class="relative w-full md:w-80">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
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
            :placeholder="$t('collection.search_placeholder')"
            class="w-full py-3 pl-10 pr-4 text-sm transition bg-white border-none rounded-full shadow-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div class="flex flex-wrap items-center gap-2 md:flex-nowrap">
          <button
            @click="toggleSaleFilter"
            :class="[
              showOnlySale
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-red-500 hover:bg-red-50 border-red-100',
            ]"
            class="flex-1 md:flex-none px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition border rounded-full shadow-sm whitespace-nowrap text-center"
          >
            {{ $t("collection.sale") }}
          </button>

          <div class="relative flex-1 min-w-[140px] md:flex-none">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-black pr-8 truncate"
            >
              <option value="">{{ $t("collection.all_categories") }}</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.category_name">
                {{ cat.category_name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 flex items-center text-gray-400 pointer-events-none right-3"
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="paginatedProducts.length > 0">
      <div
        class="grid grid-cols-2 mx-auto gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 max-w-7xl"
      >
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="cursor-pointer group"
          @click="goToDetail(product)"
        >
          <div
            class="relative bg-white shadow-sm mb-4 rounded-sm aspect-[4/5] overflow-hidden group/slider"
          >
            <div
              class="flex w-full h-full transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
              }"
            >
              <template v-for="(media, index) in getMediaArray(product)" :key="index">
                <div class="relative flex-shrink-0 w-full h-full overflow-hidden">
                  <img
                    v-if="media.type === 'image'"
                    :src="media.url || defaultBagIcon"
                    class="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    alt="Product Image"
                  />
                  <video
                    v-else-if="media.type === 'video'"
                    :src="media.url"
                    class="absolute inset-0 object-cover w-full h-full bg-black"
                    autoplay
                    loop
                    muted
                    playsinline
                  ></video>
                </div>
              </template>
            </div>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="prevSlide(product.id, getMediaArray(product).length - 1)"
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="nextSlide(product.id, getMediaArray(product).length - 1)"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              class="absolute left-0 right-0 z-10 flex justify-center gap-1 bottom-2"
              v-if="getMediaArray(product).length > 1"
            >
              <div
                v-for="(m, idx) in getMediaArray(product)"
                :key="idx"
                :class="
                  (activeSlides[product.id] || 0) === idx
                    ? 'w-3 bg-black'
                    : 'w-1 bg-white/80'
                "
                class="h-1 transition-all duration-300 rounded-full shadow-sm"
              ></div>
            </div>

            <div
              v-if="product.discount_price && getDiscountStatus(product).active"
              class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter z-20"
            >
              -{{ calculateDynamicDiscount(product) }}%
            </div>

            <button
              @click.stop="toggleWishlist(product.id)"
              class="absolute top-2 left-2 z-20 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-transform hover:scale-110"
            >
              <svg
                v-if="isFavorited(product.id)"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-400 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <div
              v-if="product.stock <= 5 && product.stock > 0"
              class="bottom-2 left-2 absolute bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded-md font-bold text-[9px] text-white uppercase tracking-widest z-20 shadow-sm animate-pulse"
            >
              Only {{ product.stock }} left!
            </div>

            <div
              v-else-if="product.stock <= 0"
              class="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex justify-center items-center z-20"
            >
              <span
                class="px-4 py-1 text-xs font-bold tracking-widest text-white uppercase transform bg-black rounded shadow-lg -rotate-12"
              >
                Sold Out
              </span>
            </div>
          </div>

          <div class="space-y-2 text-center md:text-left">
            <h3
              class="text-xs font-medium tracking-widest text-gray-900 uppercase truncate md:text-sm"
            >
              {{ product.name }}
            </h3>

            <div
              class="flex flex-wrap items-center justify-center gap-2 md:justify-start"
            >
              <template
                v-if="product.discount_price && !getDiscountStatus(product).expired"
              >
                <template v-if="getDiscountStatus(product).active">
                  <p class="text-sm font-bold text-red-600 md:text-base">
                    {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
                  </p>
                  <p class="text-xs text-gray-400 line-through md:text-sm">
                    {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                  </p>
                </template>

                <template v-else-if="getDiscountStatus(product).upcoming">
                  <div class="flex flex-col items-center w-full md:items-start">
                    <p class="text-sm font-semibold text-gray-600 md:text-base">
                      {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                    </p>

                    <p
                      class="text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded mt-1 uppercase tracking-widest text-center md:text-left"
                    >
                      Sale {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }} is
                      scheduled:
                      {{
                        formatUpcomingDate(
                          product.discount_start_date,
                          product.discount_end_date
                        )
                      }}
                    </p>
                  </div>
                </template>
              </template>

              <template v-else>
                <p class="text-sm font-semibold text-gray-600 md:text-base">
                  {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-4 mt-20">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="p-2 transition bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
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

        <span class="text-xs font-bold tracking-widest uppercase">
          {{ $t("collection.page", { current: currentPage, total: totalPages || 1 }) }}
        </span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages || totalPages === 0"
          class="p-2 transition bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
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
    </div>

    <div v-else-if="!isLoading" class="py-24 text-center">
      <p class="font-serif text-xl italic text-gray-400">
        {{ $t("collection.no_items") }}
      </p>
      <button
        @click="resetAllFilters"
        class="mt-4 text-sm font-bold tracking-widest text-black underline uppercase"
      >
        {{ $t("collection.reset_filters") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useProductStore } from "../../composables/useProductStore.js";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import Fuse from "fuse.js";
import { useI18n } from "vue-i18n";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

// Mempertahankan fungsi bawaan tapi kini penggunaannya disesuaikan di logika bawah
import { formatPrice } from "../../utils/currency";

const route = useRoute();
const router = useRouter();

const { state, fetchCollectionsData } = useProductStore();
const categories = computed(() => state.categories);
const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false);
const currentPage = ref(1);
const itemsPerPage = 12;

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const isFavorited = (id) => userWishlists.value.includes(id);

const activeSlides = ref({});

const { t } = useI18n();

// ============================================================================
// [BARU] LOGIKA HARGA MULTI-CURRENCY & FALLBACK IDR
// ============================================================================
const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

onMounted(() => {
  window.addEventListener("currency-changed", updateCurrencyState);
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
});

const getPriceToDisplay = (product) => {
  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: product.price, curr: "IDR" };

  const prices =
    typeof product.prices === "string"
      ? JSON.parse(product.prices)
      : product.prices || {};

  // Jika mata uang yang dipilih ADA di database, kembalikan nilainya
  if (prices[curr]) {
    return { value: parseFloat(prices[curr]), curr: curr };
  }

  // Fallback: Tampilkan kembali ke harga dasar (IDR) karena belum diinput admin
  return { value: product.price, curr: "IDR" };
};

const getDiscountToDisplay = (product) => {
  if (!product.discount_price) return null; // Produk tidak sedang diskon

  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: product.discount_price, curr: "IDR" };

  const discountPrices =
    typeof product.discount_prices === "string"
      ? JSON.parse(product.discount_prices)
      : product.discount_prices || {};

  // Jika mata uang yang dipilih ADA di database, kembalikan nilainya
  if (discountPrices[curr]) {
    return { value: parseFloat(discountPrices[curr]), curr: curr };
  }

  // Fallback: Tampilkan kembali ke harga diskon dasar (IDR)
  return { value: product.discount_price, curr: "IDR" };
};

// Formatting Helper Khusus agar simbol fallback sesuai
const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;

  const symbols = {
    USD: "$",
    SGD: "S$",
    EUR: "€",
    AUD: "A$",
    MYR: "RM",
    IDR: "Rp ",
  };

  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });

  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

const calculateDynamicDiscount = (product) => {
  const priceObj = getPriceToDisplay(product);
  const discObj = getDiscountToDisplay(product);
  if (!priceObj || !discObj) return 0;

  return Math.round(((priceObj.value - discObj.value) / priceObj.value) * 100);
};
// ============================================================================

const getMediaArray = (prod) => {
  let media = [{ type: "image", url: prod.image || defaultBagIcon }];
  if (prod.variant_images && Array.isArray(prod.variant_images)) {
    prod.variant_images.forEach((img) => media.push({ type: "image", url: img }));
  }
  if (prod.variant_video) {
    media.push({ type: "video", url: prod.variant_video });
  }
  return media;
};

const nextSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] >= max ? 0 : activeSlides.value[prodId] + 1;
};

const prevSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] <= 0 ? max : activeSlides.value[prodId] - 1;
};

const fetchWishlists = async () => {
  if (!isAuthenticated) return;
  try {
    const res = await axios.get(`${BASE_URL}/wishlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    userWishlists.value = res.data.map((w) => w.product_id);
  } catch (error) {
    console.error("Failed to fetch wishlists");
  }
};

const toggleWishlist = async (productId) => {
  if (!isAuthenticated) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      text: "Please login to add favorites.",
    });
    return;
  }

  if (isFavorited(productId)) {
    userWishlists.value = userWishlists.value.filter((id) => id !== productId);
  } else {
    userWishlists.value.push(productId);
  }

  try {
    await axios.post(
      `${BASE_URL}/wishlists/toggle`,
      { product_id: productId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  } catch (error) {
    fetchWishlists();
  }
};

const initCollections = async () => {
  if (!state.isCollectionsLoaded) {
    isLoading.value = true;
    await fetchCollectionsData();
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  } else {
    fetchCollectionsData();
  }
};

// ============================================================================
// LOGIKA PENCARIAN TYPO-TOLERANT DENGAN FUSE.JS
// ============================================================================
const filteredProducts = computed(() => {
  let sourceProducts = state.collectionsProducts || [];

  sourceProducts = sourceProducts.filter((p) => {
    const productCategory = p.category?.name || p.category_name;
    const matchesCategory =
      selectedCategory.value === "" || productCategory === selectedCategory.value;

    const matchesSale = showOnlySale.value
      ? p.discount_price !== null && getDiscountStatus(p).active
      : true;

    return matchesCategory && matchesSale;
  });

  if (searchQuery.value.trim() !== "") {
    const fuseOptions = {
      keys: [
        { name: "name", weight: 0.7 },
        { name: "code", weight: 0.2 },
        { name: "category.name", weight: 0.1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
    };

    const fuse = new Fuse(sourceProducts, fuseOptions);
    const results = fuse.search(searchQuery.value);

    return results.map((result) => result.item);
  }

  return sourceProducts;
});
// ============================================================================

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const goToDetail = (product) => {
  router.push({
    path: `/products/${product.slug || product.id}`,
    state: { productData: JSON.stringify(product) },
  });
};

const handleCategoryChange = () => {
  if (selectedCategory.value !== "") {
    showOnlySale.value = false;
  }
};

// ==========================================
// LOGIKA STATUS DISKON & ZONA WAKTU
// ==========================================
const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(date.getHours() - 7);
  return date;
};

const getDiscountStatus = (p) => {
  if (!p || !p.discount_price) return { active: false, upcoming: false, expired: false };

  const now = new Date();
  let active = true;
  let upcoming = false;
  let expired = false;

  if (p.discount_start_date) {
    const startDate = convertToWIB(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }
  if (p.discount_end_date) {
    const endDate = convertToWIB(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }

  return { active, upcoming, expired };
};

const formatUpcomingDate = (startDateStr, endDateStr) => {
  if (!startDateStr) return "";

  const start = convertToWIB(startDateStr);
  const end = endDateStr ? convertToWIB(endDateStr) : null;

  const options = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const startFormatted = start.toLocaleString("id-ID", options).replace(/\./g, ":");

  if (end) {
    const endFormatted = end.toLocaleString("id-ID", options).replace(/\./g, ":");
    return `${startFormatted} to ${endFormatted} WIB`;
  }

  return `${startFormatted} WIB`;
};
// ==========================================

onMounted(async () => {
  if (route.query.search) {
    searchQuery.value = route.query.search;
  }

  if (route.query.category) {
    selectedCategory.value = route.query.category;
    showOnlySale.value = false;
  }

  initCollections();
  fetchWishlists();
  window.addEventListener("wishlist-updated", fetchWishlists);
});

watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch !== undefined) {
      searchQuery.value = newSearch;
    }
  }
);

watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      selectedCategory.value = newCategory;
      showOnlySale.value = false;
    } else {
      selectedCategory.value = "";
    }
  }
);

onUnmounted(() => {
  window.removeEventListener("wishlist-updated", fetchWishlists);
});
</script>

<style scoped>
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

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style> -->

<!-- <template>
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <div
      v-if="isLoading"
      class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-[#F3F4F6]/80 backdrop-blur-sm transition-all duration-300"
    >
      <div class="flex gap-2 mb-4">
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
      </div>
      <p class="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
        Loading Collection...
      </p>
    </div>

    <div class="mx-auto mb-10 max-w-7xl">
      <h1 class="mb-8 text-3xl font-bold tracking-tight text-black uppercase">
        {{ $t("collection.products") }}
      </h1>

      <div class="flex flex-col justify-between gap-4 mb-12 md:flex-row md:items-center">
        <div class="relative w-full md:w-80">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
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
            :placeholder="$t('collection.search_placeholder')"
            class="w-full py-3 pl-10 pr-4 text-sm transition bg-white border-none rounded-full shadow-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div class="flex flex-wrap items-center gap-2 md:flex-nowrap">
          <button
            @click="toggleSaleFilter"
            :class="[
              showOnlySale
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-white text-red-500 hover:bg-red-50 border-red-100',
            ]"
            class="flex-1 md:flex-none px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition border rounded-full shadow-sm whitespace-nowrap text-center"
          >
            {{ $t("collection.sale") }}
          </button>

          <div class="relative flex-1 min-w-[140px] md:flex-none">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-black pr-8 truncate"
            >
              <option value="">{{ $t("collection.all_categories") }}</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.category_name">
                {{ cat.category_name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 flex items-center text-gray-400 pointer-events-none right-3"
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="paginatedProducts.length > 0">
      <div
        class="grid grid-cols-2 mx-auto gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 max-w-7xl"
      >
        <div
          v-for="product in paginatedProducts"
          :key="product.id"
          class="cursor-pointer group"
          @click="goToDetail(product)"
        >
          <div
            class="relative bg-white shadow-sm mb-4 rounded-sm aspect-[4/5] overflow-hidden group/slider"
          >
            <div
              class="flex w-full h-full transition-transform duration-500 ease-in-out"
              :style="{
                transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
              }"
            >
              <template v-for="(media, index) in getMediaArray(product)" :key="index">
                <div class="relative flex-shrink-0 w-full h-full overflow-hidden">
                  <img
                    v-if="media.type === 'image'"
                    :src="media.url || defaultBagIcon"
                    class="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    alt="Product Image"
                  />
                  <video
                    v-else-if="media.type === 'video'"
                    :src="media.url"
                    class="absolute inset-0 object-cover w-full h-full bg-black"
                    autoplay
                    loop
                    muted
                    playsinline
                  ></video>
                </div>
              </template>
            </div>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="prevSlide(product.id, getMediaArray(product).length - 1)"
              class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              v-if="getMediaArray(product).length > 1"
              @click.stop="nextSlide(product.id, getMediaArray(product).length - 1)"
              class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-sm text-black"
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            <div
              class="absolute left-0 right-0 z-10 flex justify-center gap-1 bottom-2"
              v-if="getMediaArray(product).length > 1"
            >
              <div
                v-for="(m, idx) in getMediaArray(product)"
                :key="idx"
                :class="
                  (activeSlides[product.id] || 0) === idx
                    ? 'w-3 bg-black'
                    : 'w-1 bg-white/80'
                "
                class="h-1 transition-all duration-300 rounded-full shadow-sm"
              ></div>
            </div>
            <div
              v-if="getDiscountToDisplay(product) && getDiscountStatus(product).active"
              class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter z-20"
            >
              -{{ calculateDynamicDiscount(product) }}%
            </div>

            <button
              @click.stop="toggleWishlist(product.id)"
              class="absolute top-2 left-2 z-20 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-transform hover:scale-110"
            >
              <svg
                v-if="isFavorited(product.id)"
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-gray-400 hover:text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>

            <div
              v-if="product.stock <= 5 && product.stock > 0"
              class="bottom-2 left-2 absolute bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded-md font-bold text-[9px] text-white uppercase tracking-widest z-20 shadow-sm animate-pulse"
            >
              Only {{ product.stock }} left!
            </div>

            <div
              v-else-if="product.stock <= 0"
              class="absolute inset-0 bg-white/60 backdrop-blur-[1px] flex justify-center items-center z-20"
            >
              <span
                class="px-4 py-1 text-xs font-bold tracking-widest text-white uppercase transform bg-black rounded shadow-lg -rotate-12"
              >
                Sold Out
              </span>
            </div>
          </div>

          <div class="space-y-2 text-center md:text-left">
            <h3
              class="text-xs font-medium tracking-widest text-gray-900 uppercase truncate md:text-sm"
            >
              {{ product.name }}
            </h3>
            <div
              class="flex flex-wrap items-center justify-center gap-2 md:justify-start"
            >
              <template
                v-if="
                  getDiscountToDisplay(product) && !getDiscountStatus(product).expired
                "
              >
                <template v-if="getDiscountStatus(product).active">
                  <p class="text-sm font-bold text-red-600 md:text-base">
                    {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
                  </p>
                  <p class="text-xs text-gray-400 line-through md:text-sm">
                    {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                  </p>
                </template>

                <template v-else-if="getDiscountStatus(product).upcoming">
                  <div class="flex flex-col items-center w-full md:items-start">
                    <p class="text-sm font-semibold text-gray-600 md:text-base">
                      {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                    </p>

                    <p
                      class="text-[9px] text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded mt-1 uppercase tracking-widest text-center md:text-left"
                    >
                      Sale {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }} is
                      scheduled:
                      {{
                        formatUpcomingDate(
                          product.discount_start_date,
                          product.discount_end_date
                        )
                      }}
                    </p>
                  </div>
                </template>
              </template>

              <template v-else>
                <p class="text-sm font-semibold text-gray-600 md:text-base">
                  {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-center gap-4 mt-20">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="p-2 transition bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
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

        <span class="text-xs font-bold tracking-widest uppercase">
          {{ $t("collection.page", { current: currentPage, total: totalPages || 1 }) }}
        </span>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages || totalPages === 0"
          class="p-2 transition bg-white rounded-full shadow-sm hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
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
    </div>

    <div v-else-if="!isLoading" class="py-24 text-center">
      <p class="font-serif text-xl italic text-gray-400">
        {{ $t("collection.no_items") }}
      </p>
      <button
        @click="resetAllFilters"
        class="mt-4 text-sm font-bold tracking-widest text-black underline uppercase"
      >
        {{ $t("collection.reset_filters") }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useProductStore } from "../../composables/useProductStore.js";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import Fuse from "fuse.js";
import { useI18n } from "vue-i18n";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const route = useRoute();
const router = useRouter();

const { state, fetchCollectionsData } = useProductStore();
const categories = computed(() => state.categories);
const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false);
const currentPage = ref(1);
const itemsPerPage = 12;

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const isFavorited = (id) => userWishlists.value.includes(id);

const activeSlides = ref({});

const { t } = useI18n();

// ============================================================================
// [BARU] LOGIKA HARGA MULTI-CURRENCY & FALLBACK IDR
// ============================================================================
const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

onMounted(() => {
  // 1. Dengarkan custom event jika navigasi/Header menembakkan event
  window.addEventListener("currency-changed", updateCurrencyState);

  // 2. Dengarkan perubahan dari tab lain
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });

  // 3. [HACK INTERCEPTOR] Mencegat fungsi localStorage.setItem secara global
  // agar komponen ini langsung tahu jika Header mengubah mata uang.
  if (!window.isLocalStorageOverride) {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "currency") {
        window.dispatchEvent(new Event("currency-changed"));
      }
    };
    window.isLocalStorageOverride = true;
  }
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
});

// Menentukan harga dasar (Price) yang akan dirender
const getPriceToDisplay = (product) => {
  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: product.price, curr: "IDR" };

  const prices =
    typeof product.prices === "string"
      ? JSON.parse(product.prices)
      : product.prices || {};

  // Jika mata uang yang dipilih ADA di database, kembalikan nilainya
  if (prices[curr]) {
    return { value: parseFloat(prices[curr]), curr: curr };
  }

  // Fallback: Tampilkan kembali ke harga dasar (IDR) karena belum diinput admin
  return { value: product.price, curr: "IDR" };
};

// Menentukan harga diskon (Discount Price) yang akan dirender
const getDiscountToDisplay = (product) => {
  const curr = currentCurrency.value;

  if (curr === "IDR") {
    return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
  }

  const discountPrices =
    typeof product.discount_prices === "string"
      ? JSON.parse(product.discount_prices)
      : product.discount_prices || {};

  // Jika mata uang yang dipilih ADA di database
  if (discountPrices[curr]) {
    return { value: parseFloat(discountPrices[curr]), curr: curr };
  }

  // Fallback: Jika tidak ada, kembalikan diskon IDR-nya
  return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
};

// Formatting Helper Khusus agar simbol fallback sesuai
const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;

  const symbols = {
    USD: "$",
    SGD: "S$",
    EUR: "€",
    AUD: "A$",
    MYR: "RM",
    IDR: "Rp ",
  };

  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });

  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

const calculateDynamicDiscount = (product) => {
  const priceObj = getPriceToDisplay(product);
  const discObj = getDiscountToDisplay(product);
  if (!priceObj || !discObj) return 0;

  return Math.round(((priceObj.value - discObj.value) / priceObj.value) * 100);
};
// ============================================================================

const getMediaArray = (prod) => {
  let media = [{ type: "image", url: prod.image || defaultBagIcon }];
  if (prod.variant_images && Array.isArray(prod.variant_images)) {
    prod.variant_images.forEach((img) => media.push({ type: "image", url: img }));
  }
  if (prod.variant_video) {
    media.push({ type: "video", url: prod.variant_video });
  }
  return media;
};

const nextSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] >= max ? 0 : activeSlides.value[prodId] + 1;
};

const prevSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] <= 0 ? max : activeSlides.value[prodId] - 1;
};

const fetchWishlists = async () => {
  if (!isAuthenticated) return;
  try {
    const res = await axios.get(`${BASE_URL}/wishlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    userWishlists.value = res.data.map((w) => w.product_id);
  } catch (error) {
    console.error("Failed to fetch wishlists");
  }
};

const toggleWishlist = async (productId) => {
  if (!isAuthenticated) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      text: "Please login to add favorites.",
    });
    return;
  }

  if (isFavorited(productId)) {
    userWishlists.value = userWishlists.value.filter((id) => id !== productId);
  } else {
    userWishlists.value.push(productId);
  }

  try {
    await axios.post(
      `${BASE_URL}/wishlists/toggle`,
      { product_id: productId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
  } catch (error) {
    fetchWishlists();
  }
};

const initCollections = async () => {
  if (!state.isCollectionsLoaded) {
    isLoading.value = true;
    await fetchCollectionsData();
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  } else {
    fetchCollectionsData();
  }
};

// ==========================================
// LOGIKA STATUS DISKON & ZONA WAKTU
// ==========================================
const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(date.getHours() - 7);
  return date;
};

const getDiscountStatus = (p) => {
  const discObj = getDiscountToDisplay(p);
  if (!p || !discObj || !discObj.value)
    return { active: false, upcoming: false, expired: false };

  const now = new Date();
  let active = true;
  let upcoming = false;
  let expired = false;

  if (p.discount_start_date) {
    const startDate = convertToWIB(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }
  if (p.discount_end_date) {
    const endDate = convertToWIB(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }

  return { active, upcoming, expired };
};

const formatUpcomingDate = (startDateStr, endDateStr) => {
  if (!startDateStr) return "";

  const start = convertToWIB(startDateStr);
  const end = endDateStr ? convertToWIB(endDateStr) : null;

  const options = {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const startFormatted = start.toLocaleString("id-ID", options).replace(/\./g, ":");

  if (end) {
    const endFormatted = end.toLocaleString("id-ID", options).replace(/\./g, ":");
    return `${startFormatted} to ${endFormatted} WIB`;
  }

  return `${startFormatted} WIB`;
};
// ==========================================

// ============================================================================
// LOGIKA PENCARIAN TYPO-TOLERANT DENGAN FUSE.JS
// ============================================================================
const filteredProducts = computed(() => {
  let sourceProducts = state.collectionsProducts || [];

  sourceProducts = sourceProducts.filter((p) => {
    const productCategory = p.category?.name || p.category_name;
    const matchesCategory =
      selectedCategory.value === "" || productCategory === selectedCategory.value;

    const matchesSale = showOnlySale.value ? getDiscountStatus(p).active : true;

    return matchesCategory && matchesSale;
  });

  if (searchQuery.value.trim() !== "") {
    const fuseOptions = {
      keys: [
        { name: "name", weight: 0.7 },
        { name: "code", weight: 0.2 },
        { name: "category.name", weight: 0.1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
    };

    const fuse = new Fuse(sourceProducts, fuseOptions);
    const results = fuse.search(searchQuery.value);

    return results.map((result) => result.item);
  }

  return sourceProducts;
});
// ============================================================================

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const goToDetail = (product) => {
  router.push({
    path: `/products/${product.slug || product.id}`,
    state: { productData: JSON.stringify(product) },
  });
};

const handleCategoryChange = () => {
  if (selectedCategory.value !== "") {
    showOnlySale.value = false;
  }
};

onMounted(async () => {
  if (route.query.search) {
    searchQuery.value = route.query.search;
  }

  if (route.query.category) {
    selectedCategory.value = route.query.category;
    showOnlySale.value = false;
  }

  initCollections();
  fetchWishlists();
  window.addEventListener("wishlist-updated", fetchWishlists);
});

watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch !== undefined) {
      searchQuery.value = newSearch;
    }
  }
);

watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      selectedCategory.value = newCategory;
      showOnlySale.value = false;
    } else {
      selectedCategory.value = "";
    }
  }
);

onUnmounted(() => {
  window.removeEventListener("wishlist-updated", fetchWishlists);
});
</script>

<style scoped>
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

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style> -->

<template>
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-4 pb-24 min-h-screen">
    <div
      v-if="isLoading"
      class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-[#F3F4F6]/80 backdrop-blur-sm transition-all duration-300"
    >
      <div class="flex gap-2 mb-4">
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-1"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-2"></div>
        <div class="w-3 h-3 bg-black rounded-full animate-bounce-3"></div>
      </div>
      <p class="font-serif text-sm italic tracking-widest text-gray-500 animate-pulse">
        Loading Collection...
      </p>
    </div>

    <!-- 👇 [BARU] 1. FLASH SALE COUNTDOWN BANNER (URGENCY) 👇 -->
    <div class="w-full mx-auto mb-10 overflow-hidden shadow-2xl max-w-7xl rounded-xl">
      <div
        class="relative flex flex-col items-center justify-center gap-3 px-4 py-4 overflow-hidden text-white bg-red-600 md:flex-row md:py-3 md:gap-6"
      >
        <!-- Efek kilat background -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"
        ></div>

        <div class="z-10 flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 animate-pulse"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clip-rule="evenodd"
            />
          </svg>
          <span
            class="text-sm font-black tracking-widest uppercase md:text-base text-shadow-sm"
          >
            Flash Sale Ends In
          </span>
        </div>

        <!-- Timer Digital -->
        <div class="z-10 flex gap-2">
          <div
            class="bg-black/40 backdrop-blur-sm rounded-md px-3 py-1.5 min-w-[48px] text-center shadow-inner"
          >
            <span class="font-mono text-xl font-bold">{{
              formatTime(timeLeft.hours)
            }}</span>
            <span class="block text-[8px] uppercase tracking-widest -mt-1 opacity-80"
              >Hrs</span
            >
          </div>
          <span class="self-start mt-1 text-xl font-bold animate-pulse">:</span>
          <div
            class="bg-black/40 backdrop-blur-sm rounded-md px-3 py-1.5 min-w-[48px] text-center shadow-inner"
          >
            <span class="font-mono text-xl font-bold">{{
              formatTime(timeLeft.minutes)
            }}</span>
            <span class="block text-[8px] uppercase tracking-widest -mt-1 opacity-80"
              >Min</span
            >
          </div>
          <span class="self-start mt-1 text-xl font-bold animate-pulse">:</span>
          <div
            class="bg-red-800/80 backdrop-blur-sm rounded-md px-3 py-1.5 min-w-[48px] text-center shadow-inner ring-1 ring-white/30"
          >
            <span class="font-mono text-xl font-bold animate-pulse">{{
              formatTime(timeLeft.seconds)
            }}</span>
            <span class="block text-[8px] uppercase tracking-widest -mt-1 opacity-80"
              >Sec</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 👆 ========================================= 👆 -->

    <div class="mx-auto mb-10 max-w-7xl">
      <div class="flex flex-col justify-between gap-4 mb-12 md:flex-row md:items-center">
        <div class="relative w-full md:w-80">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
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
            :placeholder="$t('collection.search_placeholder')"
            class="w-full py-3 pl-10 pr-4 text-sm transition bg-white border-none rounded-full shadow-sm outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div class="flex flex-wrap items-center gap-2 md:flex-nowrap">
          <button
            @click="toggleSaleFilter"
            :class="[
              showOnlySale
                ? 'bg-red-600 text-white border-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                : 'bg-white text-red-500 hover:bg-red-50 border-red-100',
            ]"
            class="flex-1 md:flex-none px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full shadow-sm whitespace-nowrap text-center"
          >
            🔥 {{ $t("collection.sale") }}
          </button>

          <div class="relative flex-1 min-w-[140px] md:flex-none">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:ring-2 focus:ring-black pr-8 truncate"
            >
              <option value="">{{ $t("collection.all_categories") }}</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.category_name">
                {{ cat.category_name }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 flex items-center text-gray-400 pointer-events-none right-3"
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div v-if="paginatedProducts.length > 0">
        <div
          class="grid grid-cols-2 mx-auto gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4 max-w-7xl"
        >
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="relative cursor-pointer group"
            @click="goToDetail(product)"
          >
            <!-- 👇 [BARU] 2. OVERLAY SCARCITY (HOVER) 👇 -->
            <div
              class="absolute transition-all duration-300 pointer-events-none -inset-2 bg-red-50/0 group-hover:bg-red-50/50 rounded-xl -z-10 blur-sm"
            ></div>

            <div
              class="relative bg-white shadow-sm mb-4 rounded-sm aspect-[4/5] overflow-hidden group/slider border border-transparent group-hover:border-red-200 transition-colors"
            >
              <div
                class="flex w-full h-full transition-transform duration-500 ease-in-out"
                :style="{
                  transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
                }"
              >
                <template v-for="(media, index) in getMediaArray(product)" :key="index">
                  <div class="relative flex-shrink-0 w-full h-full overflow-hidden">
                    <img
                      v-if="media.type === 'image'"
                      :src="media.url || defaultBagIcon"
                      class="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                      alt="Product Image"
                    />
                    <video
                      v-else-if="media.type === 'video'"
                      :src="media.url"
                      class="absolute inset-0 object-cover w-full h-full bg-black"
                      autoplay
                      loop
                      muted
                      playsinline
                    ></video>
                  </div>
                </template>
              </div>

              <!-- Slider Buttons -->
              <button
                v-if="getMediaArray(product).length > 1"
                @click.stop="prevSlide(product.id, getMediaArray(product).length - 1)"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black hover:text-red-600"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                v-if="getMediaArray(product).length > 1"
                @click.stop="nextSlide(product.id, getMediaArray(product).length - 1)"
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black hover:text-red-600"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <!-- Discount Tag -->
              <div
                v-if="getDiscountToDisplay(product) && getDiscountStatus(product).active"
                class="top-2 right-2 absolute bg-red-600 shadow-[0_2px_10px_rgba(220,38,38,0.5)] px-2.5 py-1 rounded font-black text-[10px] text-white uppercase tracking-wider z-20 animate-pulse"
              >
                SAVE {{ calculateDynamicDiscount(product) }}%
              </div>

              <!-- Wishlist -->
              <button
                @click.stop="toggleWishlist(product.id)"
                class="absolute top-2 left-2 z-20 p-1.5 bg-white/90 hover:bg-white rounded-full shadow-md transition-transform hover:scale-110"
              >
                <svg
                  v-if="isFavorited(product.id)"
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-red-600 drop-shadow-md"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  stroke="none"
                >
                  <path
                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                  />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4 text-gray-500 hover:text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
              </button>

              <!-- 👇 [BARU] 3. AGGRESSIVE LOW STOCK BADGE 👇 -->
              <div
                v-if="product.stock <= 5 && product.stock > 0"
                class="bottom-0 w-full absolute bg-gradient-to-t from-red-700 to-red-500/90 backdrop-blur-[2px] py-1.5 px-2 text-center z-20 shadow-[0_-4px_15px_rgba(220,38,38,0.4)]"
              >
                <div class="flex items-center justify-center gap-1.5 animate-pulse">
                  <span class="relative flex w-2 h-2">
                    <span
                      class="absolute inline-flex w-full h-full bg-white rounded-full opacity-75 animate-ping"
                    ></span>
                    <span
                      class="relative inline-flex w-2 h-2 bg-white rounded-full"
                    ></span>
                  </span>
                  <span
                    class="font-black text-[10px] text-white uppercase tracking-widest text-shadow"
                  >
                    HURRY! ONLY {{ product.stock }} LEFT
                  </span>
                </div>
              </div>

              <div
                v-else-if="product.stock <= 0"
                class="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex justify-center items-center z-20"
              >
                <span
                  class="px-6 py-2 text-sm font-black tracking-widest text-white uppercase transform bg-black border border-gray-800 rounded shadow-2xl -rotate-12"
                >
                  Sold Out
                </span>
              </div>
            </div>

            <div class="relative space-y-1 text-center md:text-left">
              <h3
                class="text-xs font-bold tracking-widest text-gray-900 uppercase truncate transition-colors md:text-sm group-hover:text-red-600"
              >
                {{ product.name }}
              </h3>

              <div
                class="flex flex-wrap items-center justify-center gap-2 md:justify-start"
              >
                <template
                  v-if="
                    getDiscountToDisplay(product) && !getDiscountStatus(product).expired
                  "
                >
                  <template v-if="getDiscountStatus(product).active">
                    <p
                      class="text-sm font-black text-red-600 md:text-base drop-shadow-sm"
                    >
                      {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
                    </p>
                    <p class="text-xs text-gray-400 line-through md:text-sm">
                      {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                    </p>
                  </template>

                  <template v-else-if="getDiscountStatus(product).upcoming">
                    <p class="text-sm font-bold text-gray-800 md:text-base">
                      {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                    </p>
                  </template>
                </template>

                <template v-else>
                  <p class="text-sm font-bold text-gray-800 md:text-base">
                    {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                  </p>
                </template>
              </div>

              <!-- 👇 [BARU] 4. FAKE SOCIAL PROOF (COMPETITION) 👇 -->
              <div v-if="product.stock > 0" class="mt-2 text-left">
                <p
                  class="text-[9.5px] font-bold text-red-600 flex items-center justify-center md:justify-start gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3 h-3 animate-bounce"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  In {{ getSimulatedCartCount(product.id) }} carts right now!
                </p>
              </div>

              <!-- Bundle Promo -->
              <div
                v-if="getBundlePromo(product)"
                class="pt-2 mt-2 border-t border-gray-100/50"
              >
                <span
                  class="inline-block px-2 py-1 text-[9px] font-black text-white bg-blue-600 rounded uppercase tracking-widest shadow-md animate-pulse"
                >
                  HOT BUNDLE: {{ getBundlePromo(product).qty }} FOR
                  {{
                    formatCurrencyDisplay({
                      value: getBundlePromo(product).price,
                      curr: getBundlePromo(product).curr,
                    })
                  }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center gap-4 mt-20">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 transition bg-white rounded-full shadow-sm hover:bg-gray-50 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
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
          <span class="text-xs font-bold tracking-widest text-gray-700 uppercase">
            {{ $t("collection.page", { current: currentPage, total: totalPages || 1 }) }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="p-2 transition bg-white rounded-full shadow-sm hover:bg-gray-50 hover:text-red-600 disabled:opacity-30 disabled:cursor-not-allowed"
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
      </div>

      <!-- No Items State -->
      <div v-else-if="!isLoading" class="py-32 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <p class="font-serif text-xl italic text-gray-400">
          {{ $t("collection.no_items") }}
        </p>
        <button
          @click="resetAllFilters"
          class="px-6 py-2 mt-6 text-xs font-bold tracking-widest text-white uppercase transition-transform bg-black rounded-full shadow-lg hover:scale-105"
        >
          {{ $t("collection.reset_filters") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useProductStore } from "../../composables/useProductStore.js";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import Fuse from "fuse.js";
import { useI18n } from "vue-i18n";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const route = useRoute();
const router = useRouter();

const { state, fetchCollectionsData } = useProductStore();
const categories = computed(() => state.categories);
const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const showOnlySale = ref(false);
const currentPage = ref(1);
const itemsPerPage = 12;

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");
const isFavorited = (id) => userWishlists.value.includes(id);
const activeSlides = ref({});
const { t } = useI18n();
const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

// 👇 TIMER STATE UNTUK FLASH SALE 👇
const timeLeft = ref({ hours: 2, minutes: 45, seconds: 30 });
let timerInterval = null;

const formatTime = (value) => {
  return value < 10 ? `0${value}` : value;
};

const startCountdown = () => {
  // Simulasi Countdown selama 2 jam 45 menit 30 detik
  let totalSeconds = 2 * 3600 + 45 * 60 + 30;

  timerInterval = setInterval(() => {
    totalSeconds--;
    if (totalSeconds <= 0) {
      totalSeconds = 2 * 3600 + 59 * 60; // Reset timer otomatis untuk demo FOMO tak berujung
    }
    timeLeft.value.hours = Math.floor(totalSeconds / 3600);
    timeLeft.value.minutes = Math.floor((totalSeconds % 3600) / 60);
    timeLeft.value.seconds = totalSeconds % 60;
  }, 1000);
};

// Simulasi keranjang aktif yang angkanya konsisten berdasarkan ID produk
const getSimulatedCartCount = (id) => {
  return (id % 18) + 5; // Menghasilkan angka acak antara 5 hingga 22
};

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

onMounted(() => {
  startCountdown(); // Jalankan Timer FOMO

  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
  if (!window.isLocalStorageOverride) {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "currency") {
        window.dispatchEvent(new Event("currency-changed"));
      }
    };
    window.isLocalStorageOverride = true;
  }
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval); // Bersihkan interval
  window.removeEventListener("currency-changed", updateCurrencyState);
});

const getPriceToDisplay = (product) => {
  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: product.price, curr: "IDR" };

  const prices =
    typeof product.prices === "string"
      ? JSON.parse(product.prices)
      : product.prices || {};

  if (prices[curr]) {
    return { value: parseFloat(prices[curr]), curr: curr };
  }
  return { value: product.price, curr: "IDR" };
};

const getDiscountToDisplay = (product) => {
  const curr = currentCurrency.value;
  if (curr === "IDR") {
    return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
  }

  const discountPrices =
    typeof product.discount_prices === "string"
      ? JSON.parse(product.discount_prices)
      : product.discount_prices || {};

  if (discountPrices[curr]) {
    return { value: parseFloat(discountPrices[curr]), curr: curr };
  }
  return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
};

const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;

  const symbols = {
    USD: "$",
    SGD: "S$",
    EUR: "€",
    AUD: "A$",
    MYR: "RM",
    IDR: "Rp ",
  };

  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });

  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

const calculateDynamicDiscount = (product) => {
  const priceObj = getPriceToDisplay(product);
  const discObj = getDiscountToDisplay(product);
  if (!priceObj || !discObj) return 0;
  return Math.round(((priceObj.value - discObj.value) / priceObj.value) * 100);
};

const getBundlePromo = (product) => {
  if (!product || !product.category) return null;

  const curr = currentCurrency.value || "IDR";

  let promoData = null;
  if (product.category.bundle_promo && product.category.bundle_promo.is_active) {
    promoData = product.category.bundle_promo;
  } else if (product.category.bundle_qty && product.category.bundle_price) {
    const now = new Date();
    const start = product.category.bundle_start_date
      ? convertToWIB(product.category.bundle_start_date)
      : null;
    const end = product.category.bundle_end_date
      ? convertToWIB(product.category.bundle_end_date)
      : null;

    if ((!start || now >= start) && (!end || now <= end)) {
      promoData = {
        qty: product.category.bundle_qty,
        price: product.category.bundle_price,
      };
    }
  }

  if (!promoData) return null;

  let finalPrice = 0;
  let finalCurr = "IDR";

  if (typeof promoData.price === "object") {
    if (promoData.price[curr]) {
      finalPrice = promoData.price[curr];
      finalCurr = curr;
    } else {
      finalPrice = promoData.price["IDR"];
    }
  } else {
    finalPrice = promoData.price;
  }

  return {
    qty: promoData.qty,
    price: finalPrice,
    curr: finalCurr,
  };
};

const getMediaArray = (prod) => {
  let media = [{ type: "image", url: prod.image || defaultBagIcon }];
  if (prod.variant_images && Array.isArray(prod.variant_images)) {
    prod.variant_images.forEach((img) => media.push({ type: "image", url: img }));
  }
  if (prod.variant_video) {
    media.push({ type: "video", url: prod.variant_video });
  }
  return media;
};

const nextSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] >= max ? 0 : activeSlides.value[prodId] + 1;
};

const prevSlide = (prodId, max) => {
  if (activeSlides.value[prodId] === undefined) activeSlides.value[prodId] = 0;
  activeSlides.value[prodId] =
    activeSlides.value[prodId] <= 0 ? max : activeSlides.value[prodId] - 1;
};

const fetchWishlists = async () => {
  if (!isAuthenticated) return;
  try {
    const res = await axios.get(`${BASE_URL}/wishlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    userWishlists.value = res.data.map((w) => w.product_id);
  } catch (error) {}
};

const toggleWishlist = async (productId) => {
  if (!isAuthenticated) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      text: "Please login to add favorites.",
      confirmButtonColor: "#000",
    });
    return;
  }

  if (isFavorited(productId)) {
    userWishlists.value = userWishlists.value.filter((id) => id !== productId);
  } else {
    userWishlists.value.push(productId);
  }

  try {
    await axios.post(
      `${BASE_URL}/wishlists/toggle`,
      { product_id: productId },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
  } catch (error) {
    fetchWishlists();
  }
};

const initCollections = async () => {
  if (!state.isCollectionsLoaded) {
    isLoading.value = true;
    await fetchCollectionsData();
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  } else {
    fetchCollectionsData();
  }
};

const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(date.getHours() - 7);
  return date;
};

const getDiscountStatus = (p) => {
  const discObj = getDiscountToDisplay(p);
  if (!p || !discObj || !discObj.value)
    return { active: false, upcoming: false, expired: false };

  const now = new Date();
  let active = true,
    upcoming = false,
    expired = false;

  if (p.discount_start_date) {
    const startDate = convertToWIB(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }
  if (p.discount_end_date) {
    const endDate = convertToWIB(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }
  return { active, upcoming, expired };
};

const filteredProducts = computed(() => {
  let sourceProducts = state.collectionsProducts || [];
  sourceProducts = sourceProducts.filter((p) => {
    const productCategory = p.category?.name || p.category_name;
    const matchesCategory =
      selectedCategory.value === "" || productCategory === selectedCategory.value;
    const matchesSale = showOnlySale.value ? getDiscountStatus(p).active : true;
    return matchesCategory && matchesSale;
  });

  if (searchQuery.value.trim() !== "") {
    const fuseOptions = {
      keys: [
        { name: "name", weight: 0.7 },
        { name: "code", weight: 0.2 },
        { name: "category.name", weight: 0.1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
    };
    const fuse = new Fuse(sourceProducts, fuseOptions);
    return fuse.search(searchQuery.value).map((result) => result.item);
  }
  return sourceProducts;
});

const totalPages = computed(() =>
  Math.ceil(filteredProducts.value.length / itemsPerPage)
);
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredProducts.value.slice(start, start + itemsPerPage);
});

watch([searchQuery, selectedCategory, showOnlySale], () => {
  currentPage.value = 1;
});

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) selectedCategory.value = "";
};

const selectCategory = (name) => {
  selectedCategory.value = name;
  showOnlySale.value = false;
};
const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  showOnlySale.value = false;
};

const goToDetail = (product) => {
  router.push({
    path: `/products/${product.slug || product.id}`,
    state: { productData: JSON.stringify(product) },
  });
};

const handleCategoryChange = () => {
  if (selectedCategory.value !== "") showOnlySale.value = false;
};

onMounted(async () => {
  if (route.query.search) searchQuery.value = route.query.search;
  if (route.query.category) {
    selectedCategory.value = route.query.category;
    showOnlySale.value = false;
  }
  initCollections();
  fetchWishlists();
  window.addEventListener("wishlist-updated", fetchWishlists);
});

watch(
  () => route.query.search,
  (newSearch) => {
    if (newSearch !== undefined) searchQuery.value = newSearch;
  }
);
watch(
  () => route.query.category,
  (newCategory) => {
    if (newCategory) {
      selectedCategory.value = newCategory;
      showOnlySale.value = false;
    } else {
      selectedCategory.value = "";
    }
  }
);
onUnmounted(() => {
  window.removeEventListener("wishlist-updated", fetchWishlists);
});
</script>

<style scoped>
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
@keyframes shimmer {
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.text-shadow-sm {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}
.text-shadow {
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.6);
}
</style>
