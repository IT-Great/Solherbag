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
                    </div>
                  </template>
                </template>

                <template v-else>
                  <p class="text-sm font-semibold text-gray-600 md:text-base">
                    {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                  </p>
                </template>
              </div>

              <div
                v-if="getBundlePromo(product)"
                class="pt-3 mt-3 border-t border-gray-50"
              >
                <span
                  class="inline-block px-2 py-1 text-[8px] font-black text-blue-700 bg-blue-50 border border-blue-100 rounded uppercase tracking-widest"
                >
                  Bundle: Buy {{ getBundlePromo(product).qty }} for
                  {{
                    formatCurrencyDisplay({
                      value: getBundlePromo(product).price,
                      curr: getBundlePromo(product).curr, // <--- GUNAKAN CURRENCY DINAMIS
                    })
                  }}
                </span>
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

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

onMounted(() => {
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

// ==========================================
// [BARU] HELPER BUNDLE PROMO DYNAMIC
// ==========================================
// const getBundlePromo = (product) => {
//   if (!product || !product.category) return null;

//   // Jika formatnya bersumber dari CategoryResource (ada array bundle_promo)
//   if (product.category.bundle_promo && product.category.bundle_promo.is_active) {
//     return product.category.bundle_promo;
//   }

//   // Jika formatnya bersumber dari Model Category mentah (raw database row)
//   if (product.category.bundle_qty && product.category.bundle_price) {
//     const now = new Date();
//     const start = product.category.bundle_start_date
//       ? convertToWIB(product.category.bundle_start_date)
//       : null;
//     const end = product.category.bundle_end_date
//       ? convertToWIB(product.category.bundle_end_date)
//       : null;

//     if ((!start || now >= start) && (!end || now <= end)) {
//       return {
//         qty: product.category.bundle_qty,
//         price: product.category.bundle_price,
//       };
//     }
//   }
//   return null;
// };

const getBundlePromo = (product) => {
  if (!product || !product.category) return null;

  const curr = currentCurrency.value || "IDR"; // Ambil status mata uang saat ini

  // Parse JSON/Array (Jika formatnya dari endpoint CategoryResource atau Database)
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

  // 👇 PERBAIKAN: Baca array harga berdasarkan Currency 👇
  let finalPrice = 0;
  let finalCurr = "IDR";

  // Pastikan promoData.price adalah objek JSON
  if (typeof promoData.price === "object") {
    if (promoData.price[curr]) {
      finalPrice = promoData.price[curr];
      finalCurr = curr;
    } else {
      finalPrice = promoData.price["IDR"]; // Fallback jika USD/SGD kosong
    }
  } else {
    finalPrice = promoData.price; // Legacy decimal format
  }

  return {
    qty: promoData.qty,
    price: finalPrice,
    curr: finalCurr,
  };
};
// ==========================================

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
      <div
        class="flex flex-col items-start justify-between mb-8 md:flex-row md:items-end"
      >
        <h1 class="text-3xl font-bold tracking-tight text-black uppercase">
          {{ $t("collection.products") }}
        </h1>
        <p v-if="!isLoading" class="mt-2 text-sm font-medium text-gray-500 md:mt-0">
          Showing {{ filteredProducts.length }} items
        </p>
      </div>

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
            class="w-full py-3 pl-10 pr-4 text-sm transition bg-white border border-gray-200 rounded-full shadow-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
          />
        </div>

        <div class="flex flex-wrap items-center gap-2 md:flex-nowrap">
          <button
            @click="toggleSaleFilter"
            :class="[
              showOnlySale
                ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105'
                : 'bg-white text-red-500 hover:bg-red-50 border-red-100',
            ]"
            class="flex-1 md:flex-none px-6 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center justify-center gap-1"
          >
            <svg
              v-if="!showOnlySale"
              class="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            {{ $t("collection.sale") }}
          </button>

          <div class="relative flex-1 min-w-[160px] md:flex-none">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black pr-8 truncate hover:bg-gray-50"
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
          class="grid grid-cols-2 mx-auto gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 md:grid-cols-3 lg:grid-cols-4 max-w-7xl"
        >
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="relative cursor-pointer group"
            @click="goToDetail(product)"
          >
            <div
              class="relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 mb-4 rounded-lg aspect-[4/5] overflow-hidden group/slider border border-gray-100/50"
            >
              <div class="absolute z-20 flex flex-col gap-1 top-2 left-2">
                <div
                  v-if="
                    getDiscountToDisplay(product) && getDiscountStatus(product).active
                  "
                  class="bg-red-600 px-2 py-1 rounded-[4px] font-extrabold text-[10px] text-white uppercase tracking-wider shadow-sm"
                >
                  -{{ calculateDynamicDiscount(product) }}% OFF
                </div>

                <div
                  v-if="isNewArrival(product.created_at)"
                  class="bg-black text-white px-2 py-1 rounded-[4px] font-extrabold text-[9px] uppercase tracking-widest shadow-sm"
                >
                  NEW
                </div>
              </div>

              <button
                @click.stop="toggleWishlist(product.id)"
                class="absolute z-20 p-2 transition-transform rounded-full shadow-sm top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110"
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
                Hurry, Only {{ product.stock }} left!
              </div>

              <div
                v-else-if="product.stock <= 0"
                class="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex justify-center items-center z-20"
              >
                <span
                  class="px-5 py-2 text-xs font-black tracking-[0.2em] text-white uppercase transform bg-black rounded-sm shadow-xl -rotate-12 border border-gray-800"
                >
                  Sold Out
                </span>
              </div>

              <div
                class="flex w-full h-full transition-transform duration-500 ease-in-out"
                :style="{
                  transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
                }"
              >
                <template v-for="(media, index) in getMediaArray(product)" :key="index">
                  <div
                    class="relative flex-shrink-0 w-full h-full overflow-hidden bg-gray-100"
                  >
                    <img
                      v-if="media.type === 'image'"
                      :src="media.url || defaultBagIcon"
                      class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                      alt="Product Media"
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
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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
                      ? 'w-4 bg-black'
                      : 'w-1.5 bg-gray-400/80'
                  "
                  class="h-1.5 transition-all duration-300 rounded-full shadow-sm"
                ></div>
              </div>
            </div>

            <div class="flex flex-col px-1 space-y-1 text-left">
              <h3
                class="text-sm font-bold tracking-wider text-gray-900 uppercase truncate transition-colors group-hover:text-red-700"
              >
                {{ product.name }}
              </h3>

              <div
                v-if="product.rating || product.reviews_avg_rating"
                class="flex items-center gap-1 mt-0.5"
              >
                <div class="flex text-yellow-400">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-3 h-3 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <span class="text-[10px] text-gray-500 font-medium"
                  >({{ product.reviews_count || product.rating_count || "10+" }})</span
                >
              </div>

              <div class="flex flex-wrap items-center gap-2 mt-1">
                <template
                  v-if="
                    getDiscountToDisplay(product) && !getDiscountStatus(product).expired
                  "
                >
                  <template v-if="getDiscountStatus(product).active">
                    <p class="text-sm font-extrabold text-red-600 md:text-base">
                      {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
                    </p>
                    <p
                      class="text-[11px] text-gray-400 line-through md:text-xs font-medium"
                    >
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

              <div v-if="getBundlePromo(product)" class="pt-2 mt-2">
                <span
                  class="inline-block px-2 py-1 text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-200 rounded-[4px] uppercase tracking-widest shadow-sm"
                >
                  Bundle: Buy {{ getBundlePromo(product).qty }} for
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

        <div class="flex items-center justify-center gap-4 mt-20">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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
          <span class="text-xs font-bold tracking-widest text-gray-600 uppercase">
            {{ $t("collection.page", { current: currentPage, total: totalPages || 1 }) }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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

      <div
        v-else-if="!isLoading"
        class="flex flex-col items-center justify-center py-32 border border-gray-200 border-dashed rounded-2xl bg-white/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mb-4 text-gray-300"
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
        <p class="font-serif text-xl italic text-gray-500">
          {{ $t("collection.no_items") }}
        </p>
        <button
          @click="resetAllFilters"
          class="mt-6 px-6 py-2.5 text-xs font-bold tracking-widest text-white transition bg-black rounded-full uppercase shadow-md hover:bg-gray-800"
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

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// 👇 Fungsi Baru (CRO): Cek apakah produk dibuat dalam 14 hari terakhir 👇
const isNewArrival = (dateString) => {
  if (!dateString) return false;
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
};

onMounted(() => {
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
  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
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

  return { qty: promoData.qty, price: finalPrice, curr: finalCurr };
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
      <div
        class="flex flex-col items-start justify-between mb-8 md:flex-row md:items-end"
      >
        <h1 class="text-3xl font-bold tracking-tight text-black uppercase">
          {{ $t("collection.products") }}
        </h1>
        <p v-if="!isLoading" class="mt-2 text-sm font-medium text-gray-500 md:mt-0">
          Showing {{ filteredProducts.length }} items
        </p>
      </div>

      <div class="flex flex-col gap-4 mb-12">
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
              class="w-full py-3 pl-10 pr-4 text-sm transition bg-white border border-gray-200 rounded-full shadow-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              @click="toggleSpecialFilter('new-arrivals')"
              :class="
                activeFilter === 'new-arrivals'
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center gap-1"
            >
              ✨ New Arrivals
            </button>

            <button
              @click="toggleSpecialFilter('final-sale')"
              :class="
                activeFilter === 'final-sale'
                  ? 'bg-black text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center gap-1"
            >
              🔥 Final Sale
            </button>

            <button
              @click="toggleSaleFilter"
              :class="
                showOnlySale
                  ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105'
                  : 'bg-white text-red-500 hover:bg-red-50 border-red-100'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center justify-center gap-1"
            >
              <svg
                v-if="!showOnlySale"
                class="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              {{ $t("collection.sale") }}
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row">
          <div class="relative flex-1">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black pr-8 truncate hover:bg-gray-50"
            >
              <option value="">All Collections</option>
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

          <div class="relative flex-1">
            <select
              v-model="selectedBagCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black pr-8 truncate hover:bg-gray-50"
            >
              <option value="">All Bag Types</option>
              <option v-for="bag in bagCategories" :key="bag.id" :value="bag.name">
                {{ bag.name }}
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
          class="grid grid-cols-2 mx-auto gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 md:grid-cols-3 lg:grid-cols-4 max-w-7xl"
        >
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="relative cursor-pointer group"
            @click="goToDetail(product)"
          >
            <div
              class="relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 mb-4 rounded-lg aspect-[4/5] overflow-hidden group/slider border border-gray-100/50"
            >
              <div class="absolute z-20 flex flex-col gap-1 top-2 left-2">
                <div
                  v-if="
                    getDiscountToDisplay(product) && getDiscountStatus(product).active
                  "
                  class="bg-red-600 px-2 py-1 rounded-[4px] font-extrabold text-[10px] text-white uppercase tracking-wider shadow-sm"
                >
                  -{{ calculateDynamicDiscount(product) }}% OFF
                </div>
                <div
                  v-if="isNewArrival(product.created_at)"
                  class="bg-black text-white px-2 py-1 rounded-[4px] font-extrabold text-[9px] uppercase tracking-widest shadow-sm"
                >
                  NEW
                </div>
              </div>

              <button
                @click.stop="toggleWishlist(product.id)"
                class="absolute z-20 p-2 transition-transform rounded-full shadow-sm top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110"
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
                Hurry, Only {{ product.stock }} left!
              </div>
              <div
                v-else-if="product.stock <= 0"
                class="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex justify-center items-center z-20"
              >
                <span
                  class="px-5 py-2 text-xs font-black tracking-[0.2em] text-white uppercase transform bg-black rounded-sm shadow-xl -rotate-12 border border-gray-800"
                  >Sold Out</span
                >
              </div>

              <div
                class="flex w-full h-full transition-transform duration-500 ease-in-out"
                :style="{
                  transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
                }"
              >
                <template v-for="(media, index) in getMediaArray(product)" :key="index">
                  <div
                    class="relative flex-shrink-0 w-full h-full overflow-hidden bg-gray-100"
                  >
                    <img
                      v-if="media.type === 'image'"
                      :src="media.url || defaultBagIcon"
                      class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                      alt="Product Media"
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
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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
                      ? 'w-4 bg-black'
                      : 'w-1.5 bg-gray-400/80'
                  "
                  class="h-1.5 transition-all duration-300 rounded-full shadow-sm"
                ></div>
              </div>
            </div>

            <div class="flex flex-col px-1 space-y-1 text-left">
              <div class="flex gap-2 items-center mb-0.5">
                <span
                  v-if="product.bag_category"
                  class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
                >
                  {{ product.bag_category.name }}
                </span>
                <span
                  v-else
                  class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
                >
                  {{ product.category?.name || "Uncategorized" }}
                </span>
              </div>
              <h3
                class="text-sm font-bold tracking-wider text-gray-900 uppercase truncate transition-colors group-hover:text-red-700"
              >
                {{ product.name }}
              </h3>

              <div
                v-if="product.rating || product.reviews_avg_rating"
                class="flex items-center gap-1 mt-0.5"
              >
                <div class="flex text-yellow-400">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-3 h-3 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <span class="text-[10px] text-gray-500 font-medium"
                  >({{ product.reviews_count || product.rating_count || "10+" }})</span
                >
              </div>

              <div class="flex flex-wrap items-center gap-2 mt-1">
                <template
                  v-if="
                    getDiscountToDisplay(product) && !getDiscountStatus(product).expired
                  "
                >
                  <template v-if="getDiscountStatus(product).active">
                    <p class="text-sm font-extrabold text-red-600 md:text-base">
                      {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
                    </p>
                    <p
                      class="text-[11px] text-gray-400 line-through md:text-xs font-medium"
                    >
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

              <div v-if="getBundlePromo(product)" class="pt-2 mt-2">
                <span
                  class="inline-block px-2 py-1 text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-200 rounded-[4px] uppercase tracking-widest shadow-sm"
                >
                  Bundle: Buy {{ getBundlePromo(product).qty }} for
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

        <div class="flex items-center justify-center gap-4 mt-20">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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
          <span class="text-xs font-bold tracking-widest text-gray-600 uppercase">{{
            $t("collection.page", { current: currentPage, total: totalPages || 1 })
          }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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

      <div
        v-else-if="!isLoading"
        class="flex flex-col items-center justify-center py-32 border border-gray-200 border-dashed rounded-2xl bg-white/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mb-4 text-gray-300"
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
        <p class="font-serif text-xl italic text-gray-500">
          {{ $t("collection.no_items") }}
        </p>
        <button
          @click="resetAllFilters"
          class="mt-6 px-6 py-2.5 text-xs font-bold tracking-widest text-white transition bg-black rounded-full uppercase shadow-md hover:bg-gray-800"
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

// 👇 [BARU] State untuk Bag Categories 👇
const bagCategories = ref([]);

const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const selectedBagCategory = ref(""); // Tipe Tas Fisik (Tote, Handbag, dll)
const showOnlySale = ref(false);
const activeFilter = ref(""); // Menyimpan status filter 'new-arrivals' atau 'final-sale'

const currentPage = ref(1);
const itemsPerPage = 12;

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const isFavorited = (id) => userWishlists.value.includes(id);

const activeSlides = ref({});
const { t } = useI18n();

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// Cek produk dibuat dalam 14 hari terakhir
const isNewArrival = (dateString) => {
  if (!dateString) return false;
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
};

// Tarik data Bag Categories dari endpoint publik
const fetchBagCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/bag-categories`);
    bagCategories.value = res.data.data || res.data;
  } catch (err) {
    console.error("Gagal mengambil Bag Categories:", err);
  }
};

onMounted(() => {
  fetchBagCategories();

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
  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
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

  return { qty: promoData.qty, price: finalPrice, curr: finalCurr };
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

// 👇 [PERBAIKAN] Modifikasi Logika Komputasi Filter Lanjutan 👇
const filteredProducts = computed(() => {
  let sourceProducts = state.collectionsProducts || [];

  // 1. Filter Koleksi Utama
  if (selectedCategory.value !== "") {
    sourceProducts = sourceProducts.filter(
      (p) => (p.category?.name || p.category_name) === selectedCategory.value
    );
  }

  // 2. Filter Bag Category
  if (selectedBagCategory.value !== "") {
    sourceProducts = sourceProducts.filter(
      (p) => p.bag_category?.name === selectedBagCategory.value
    );
  }

  // 3. Filter "Sale" Normal
  if (showOnlySale.value) {
    sourceProducts = sourceProducts.filter((p) => getDiscountStatus(p).active);
  }

  // 4. Search Filter (FUSE.js)
  if (searchQuery.value.trim() !== "") {
    const fuseOptions = {
      keys: [
        { name: "name", weight: 0.7 },
        { name: "code", weight: 0.2 },
        { name: "category.name", weight: 0.1 },
        { name: "bag_category.name", weight: 0.1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
    };
    const fuse = new Fuse(sourceProducts, fuseOptions);
    sourceProducts = fuse.search(searchQuery.value).map((result) => result.item);
  }

  // 5. Special Filter: NEW ARRIVALS & FINAL SALE
  if (activeFilter.value === "new-arrivals") {
    sourceProducts = [...sourceProducts]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);
  } else if (activeFilter.value === "final-sale") {
    // Karena tabel produk tidak menyimpan tanggal "terakhir dibeli",
    // cara paling akurat & aman di sisi frontend adalah mengurutkan dari produk yang pernah laku (total_sold > 0)
    // dan mengurutkannya berdasarkan `updated_at` (yang akan berubah saat stock dikurangi karena transaksi).
    sourceProducts = [...sourceProducts]
      .filter((p) => p.total_sold > 0 || getDiscountStatus(p).active)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
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

// Reset page saat ada perubahan di parameter filter apa pun
watch(
  [searchQuery, selectedCategory, selectedBagCategory, showOnlySale, activeFilter],
  () => {
    currentPage.value = 1;
  }
);

const toggleSaleFilter = () => {
  showOnlySale.value = !showOnlySale.value;
  if (showOnlySale.value) {
    activeFilter.value = ""; // Matikan filter spesial lainnya
    selectedCategory.value = "";
    selectedBagCategory.value = "";
  }
};

const toggleSpecialFilter = (filterName) => {
  if (activeFilter.value === filterName) {
    activeFilter.value = ""; // Toggle OFF
  } else {
    activeFilter.value = filterName; // Toggle ON
    showOnlySale.value = false; // Matikan filter sale reguler
  }
};

const handleCategoryChange = () => {
  showOnlySale.value = false;
  activeFilter.value = "";
};

const resetAllFilters = () => {
  searchQuery.value = "";
  selectedCategory.value = "";
  selectedBagCategory.value = "";
  showOnlySale.value = false;
  activeFilter.value = "";
};

const goToDetail = (product) => {
  router.push({
    path: `/products/${product.slug || product.id}`,
    state: { productData: JSON.stringify(product) },
  });
};

onMounted(async () => {
  if (route.query.search) searchQuery.value = route.query.search;

  if (route.query.category) {
    selectedCategory.value = route.query.category;
  }

  if (route.query.bag_category) {
    selectedBagCategory.value = route.query.bag_category;
  }

  if (route.query.filter) {
    activeFilter.value = route.query.filter;
  }

  initCollections();
  fetchWishlists();
  window.addEventListener("wishlist-updated", fetchWishlists);
});

// Listener perubahan parameter route secara instan
watch(
  () => route.query,
  (newQuery) => {
    searchQuery.value = newQuery.search || "";
    selectedCategory.value = newQuery.category || "";
    selectedBagCategory.value = newQuery.bag_category || "";
    activeFilter.value = newQuery.filter || "";
    showOnlySale.value = false;
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
</style>
-->

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
      <div
        class="flex flex-col items-start justify-between mb-8 md:flex-row md:items-end"
      >
        <h1 class="text-3xl font-bold tracking-tight text-black uppercase">
          {{ $t("collection.products") }}
        </h1>
        <p v-if="!isLoading" class="mt-2 text-sm font-medium text-gray-500 md:mt-0">
          Showing {{ filteredProducts.length }} items
        </p>
      </div>

      <div class="flex flex-col gap-4 mb-12">
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
              class="w-full py-3 pl-10 pr-4 text-sm transition bg-white border border-gray-200 rounded-full shadow-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              @click="toggleSpecialFilter('new-arrivals')"
              :class="
                activeFilter === 'new-arrivals'
                  ? 'bg-black text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center gap-1.5"
            >
              <span class="text-sm">✨</span> New Arrivals
            </button>

            <button
              @click="toggleSpecialFilter('final-sale')"
              :class="
                activeFilter === 'final-sale'
                  ? 'bg-black text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center gap-1.5"
            >
              <span class="text-sm">🔥</span> Final Sale
            </button>

            <button
              @click="toggleSaleFilter"
              :class="
                showOnlySale
                  ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105'
                  : 'bg-white text-red-500 hover:bg-red-50 border-red-100'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center justify-center gap-1"
            >
              <svg
                v-if="!showOnlySale"
                class="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              {{ $t("collection.sale") }}
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row">
          <div class="relative flex-1">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black pr-8 truncate hover:bg-gray-50"
            >
              <option value="">All Collections</option>
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

          <div class="relative flex-1">
            <select
              v-model="selectedBagCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black pr-8 truncate hover:bg-gray-50"
            >
              <option value="">All Bag Types</option>
              <option v-for="bag in bagCategories" :key="bag.id" :value="bag.name">
                {{ bag.name }}
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
          class="grid grid-cols-2 mx-auto gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 md:grid-cols-3 lg:grid-cols-4 max-w-7xl"
        >
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="relative cursor-pointer group"
            @click="goToDetail(product)"
          >
            <div
              class="relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 mb-4 rounded-lg aspect-[4/5] overflow-hidden group/slider border border-gray-100/50"
            >
              <div class="absolute z-20 flex flex-col gap-1 top-2 left-2">
                <div
                  v-if="
                    getDiscountToDisplay(product) && getDiscountStatus(product).active
                  "
                  class="bg-red-600 px-2 py-1 rounded-[4px] font-extrabold text-[10px] text-white uppercase tracking-wider shadow-sm"
                >
                  -{{ calculateDynamicDiscount(product) }}% OFF
                </div>
                <div
                  v-if="isNewArrival(product.created_at)"
                  class="bg-black text-white px-2 py-1 rounded-[4px] font-extrabold text-[9px] uppercase tracking-widest shadow-sm"
                >
                  NEW
                </div>
              </div>

              <button
                @click.stop="toggleWishlist(product.id)"
                class="absolute z-20 p-2 transition-transform rounded-full shadow-sm top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110"
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
                Hurry, Only {{ product.stock }} left!
              </div>
              <div
                v-else-if="product.stock <= 0"
                class="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex justify-center items-center z-20"
              >
                <span
                  class="px-5 py-2 text-xs font-black tracking-[0.2em] text-white uppercase transform bg-black rounded-sm shadow-xl -rotate-12 border border-gray-800"
                  >Sold Out</span
                >
              </div>

              <div
                class="flex w-full h-full transition-transform duration-500 ease-in-out"
                :style="{
                  transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
                }"
              >
                <template v-for="(media, index) in getMediaArray(product)" :key="index">
                  <div
                    class="relative flex-shrink-0 w-full h-full overflow-hidden bg-gray-100"
                  >
                    <img
                      v-if="media.type === 'image'"
                      :src="media.url || defaultBagIcon"
                      class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                      alt="Product Media"
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
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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
                      ? 'w-4 bg-black'
                      : 'w-1.5 bg-gray-400/80'
                  "
                  class="h-1.5 transition-all duration-300 rounded-full shadow-sm"
                ></div>
              </div>
            </div>

            <div class="flex flex-col px-1 space-y-1 text-left">
              <div class="flex gap-2 items-center mb-0.5">
                <span
                  v-if="product.bag_category"
                  class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
                >
                  {{ product.bag_category.name }}
                </span>
                <span
                  v-else
                  class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
                >
                  {{ product.category?.name || "Uncategorized" }}
                </span>
              </div>
              <h3
                class="text-sm font-bold tracking-wider text-gray-900 uppercase truncate transition-colors group-hover:text-red-700"
              >
                {{ product.name }}
              </h3>

              <div
                v-if="product.rating || product.reviews_avg_rating"
                class="flex items-center gap-1 mt-0.5"
              >
                <div class="flex text-yellow-400">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-3 h-3 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <span class="text-[10px] text-gray-500 font-medium"
                  >({{ product.reviews_count || product.rating_count || "10+" }})</span
                >
              </div>

              <div class="flex flex-wrap items-center gap-2 mt-1">
                <template
                  v-if="
                    getDiscountToDisplay(product) && !getDiscountStatus(product).expired
                  "
                >
                  <template v-if="getDiscountStatus(product).active">
                    <p class="text-sm font-extrabold text-red-600 md:text-base">
                      {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
                    </p>
                    <p
                      class="text-[11px] text-gray-400 line-through md:text-xs font-medium"
                    >
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

              <div v-if="getBundlePromo(product)" class="pt-2 mt-2">
                <span
                  class="inline-block px-2 py-1 text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-200 rounded-[4px] uppercase tracking-widest shadow-sm"
                >
                  Bundle: Buy {{ getBundlePromo(product).qty }} for
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

        <div class="flex items-center justify-center gap-4 mt-20">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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
          <span class="text-xs font-bold tracking-widest text-gray-600 uppercase">{{
            $t("collection.page", { current: currentPage, total: totalPages || 1 })
          }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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

      <div
        v-else-if="!isLoading"
        class="flex flex-col items-center justify-center py-32 border border-gray-200 border-dashed rounded-2xl bg-white/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mb-4 text-gray-300"
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
        <p class="font-serif text-xl italic text-gray-500">
          {{ $t("collection.no_items") }}
        </p>
        <button
          @click="resetAllFilters"
          class="mt-6 px-6 py-2.5 text-xs font-bold tracking-widest text-white transition bg-black rounded-full uppercase shadow-md hover:bg-gray-800"
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
const bagCategories = ref([]);
const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const selectedBagCategory = ref("");
const showOnlySale = ref(false);
const activeFilter = ref("");

const currentPage = ref(1);
const itemsPerPage = 12;

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const isFavorited = (id) => userWishlists.value.includes(id);

const activeSlides = ref({});
const { t } = useI18n();

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// Cek produk dibuat dalam 14 hari terakhir
const isNewArrival = (dateString) => {
  if (!dateString) return false;
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
};

// Tarik data Bag Categories
const fetchBagCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/bag-categories`);
    bagCategories.value = res.data.data || res.data;
  } catch (err) {
    console.error("Gagal mengambil Bag Categories:", err);
  }
};

// ==========================================
// [BARU] LOGIKA SINKRONISASI FILTER DENGAN URL (ROUTER PUSH)
// ==========================================
const pushToRouter = (updates) => {
  const query = {
    search: searchQuery.value || undefined,
    category: selectedCategory.value || undefined,
    bag_category: selectedBagCategory.value || undefined,
    filter: activeFilter.value || undefined,
    sale: showOnlySale.value ? "true" : undefined,
    ...updates, // Timpa jika ada parameter spesifik yang diklik
  };

  // Bersihkan properti undefined agar URL rapi
  Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

  router.push({ path: "/collections", query });
};

// Saat Dropdown atau Tombol diklik, kita tidak lagi sekadar ubah variabel (ref),
// melainkan PUSH ke Router. Biarkan Vue Router yang menjadi "Sumber Kebenaran".
const toggleSaleFilter = () => {
  pushToRouter({
    sale: !showOnlySale.value ? "true" : undefined,
    filter: undefined,
    category: undefined,
    bag_category: undefined,
  });
};

const toggleSpecialFilter = (filterName) => {
  const newFilter = activeFilter.value === filterName ? undefined : filterName;
  pushToRouter({
    filter: newFilter,
    sale: undefined,
  });
};

const handleCategoryChange = () => {
  pushToRouter({
    filter: undefined,
    sale: undefined,
  });
};

const resetAllFilters = () => {
  searchQuery.value = "";
  router.push({ path: "/collections" }); // Hapus semua query
};

// Fungsi ini menangkap URL saat ini, lalu menyalakan tombol/dropdown yang sesuai
const syncStateWithQuery = (query) => {
  if (query.search !== undefined) searchQuery.value = query.search;
  selectedCategory.value = query.category || "";
  selectedBagCategory.value = query.bag_category || "";
  activeFilter.value = query.filter || "";
  showOnlySale.value = query.sale === "true";
  currentPage.value = 1;
};

onMounted(() => {
  // Panggil sinkronisasi saat pertama kali halaman dimuat
  syncStateWithQuery(route.query);

  fetchBagCategories();
  initCollections();
  fetchWishlists();

  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
  window.addEventListener("wishlist-updated", fetchWishlists);
});

// Pantau secara real-time. Jika pengguna klik Mega Menu, URL berubah, dan Watcher ini menyalakan filternya.
watch(
  () => route.query,
  (newQuery) => {
    syncStateWithQuery(newQuery);
  }
);
// ==========================================

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
  window.removeEventListener("wishlist-updated", fetchWishlists);
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
  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
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

  return { qty: promoData.qty, price: finalPrice, curr: finalCurr };
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

  // 1. Filter Koleksi Utama
  if (selectedCategory.value !== "") {
    sourceProducts = sourceProducts.filter(
      (p) => (p.category?.name || p.category_name) === selectedCategory.value
    );
  }

  // 2. Filter Bag Category
  if (selectedBagCategory.value !== "") {
    sourceProducts = sourceProducts.filter(
      (p) => p.bag_category?.name === selectedBagCategory.value
    );
  }

  // 3. Filter "Sale" Normal
  if (showOnlySale.value) {
    sourceProducts = sourceProducts.filter((p) => getDiscountStatus(p).active);
  }

  // 4. Search Filter (FUSE.js)
  if (searchQuery.value.trim() !== "") {
    const fuseOptions = {
      keys: [
        { name: "name", weight: 0.7 },
        { name: "code", weight: 0.2 },
        { name: "category.name", weight: 0.1 },
        { name: "bag_category.name", weight: 0.1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
    };
    const fuse = new Fuse(sourceProducts, fuseOptions);
    sourceProducts = fuse.search(searchQuery.value).map((result) => result.item);
  }

  // 5. Special Filter: NEW ARRIVALS & FINAL SALE
  if (activeFilter.value === "new-arrivals") {
    sourceProducts = [...sourceProducts]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);
  } else if (activeFilter.value === "final-sale") {
    // Mengurutkan dari produk yang pernah laku atau yang sedang sale,
    // berdasarkan aktivitas update terakhir.
    sourceProducts = [...sourceProducts]
      .filter((p) => p.total_sold > 0 || getDiscountStatus(p).active)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
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

const goToDetail = (product) => {
  router.push({
    path: `/products/${product.slug || product.id}`,
    state: { productData: JSON.stringify(product) },
  });
};
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
      <div
        class="flex flex-col items-start justify-between mb-8 md:flex-row md:items-end"
      >
        <h1 class="text-3xl font-bold tracking-tight text-black uppercase">
          {{ $t("collection.products") }}
        </h1>
        <p v-if="!isLoading" class="mt-2 text-sm font-medium text-gray-500 md:mt-0">
          Showing {{ filteredProducts.length }} items
        </p>
      </div>

      <div class="flex flex-col gap-4 mb-8">
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
              class="w-full py-3 pl-10 pr-4 text-sm transition bg-white border border-gray-200 rounded-full shadow-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <button
              @click="toggleSpecialFilter('new-arrivals')"
              :class="
                activeFilter === 'new-arrivals'
                  ? 'bg-black text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center gap-1.5"
            >
              <span class="text-sm">✨</span> New Arrivals
            </button>

            <button
              @click="toggleSpecialFilter('final-sale')"
              :class="
                activeFilter === 'final-sale'
                  ? 'bg-red-700 text-white shadow-md transform scale-105 border-red-700'
                  : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-700 border-gray-200 hover:border-red-200'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center gap-1.5"
            >
              <span class="text-sm">🔥</span> Final Sale
            </button>

            <button
              @click="toggleSaleFilter"
              :class="
                showOnlySale
                  ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105'
                  : 'bg-white text-red-500 hover:bg-red-50 border-red-100'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center justify-center gap-1"
            >
              <svg
                v-if="!showOnlySale"
                class="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              {{ $t("collection.sale") }}
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 md:flex-row">
          <div class="relative flex-1">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black pr-8 truncate hover:bg-gray-50"
            >
              <option value="">All Collections</option>
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

          <div class="relative flex-1">
            <select
              v-model="selectedBagCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black pr-8 truncate hover:bg-gray-50"
            >
              <option value="">All Bag Types</option>
              <option v-for="bag in bagCategories" :key="bag.id" :value="bag.name">
                {{ bag.name }}
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

      <transition name="fade">
        <div
          v-if="activeFilter === 'final-sale'"
          class="flex items-start gap-4 p-5 mb-8 border-l-4 border-red-600 bg-red-50 rounded-r-xl"
        >
          <div class="p-2 bg-white rounded-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-red-600"
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
          </div>
          <div>
            <h3 class="mb-1 text-sm font-black tracking-widest text-red-800 uppercase">
              Final Sale Policy
            </h3>
            <p class="text-xs leading-relaxed text-red-700 md:max-w-4xl">
              Koleksi di bawah ini dijual dengan diskon pembersihan gudang (Clearance).
              <strong class="font-black text-red-900"
                >Semua pembelian bersifat permanen.</strong
              >
              Kami tidak menerima pengembalian (return), penukaran (exchange), maupun
              pengembalian dana (refund) dengan alasan apa pun.
            </p>
          </div>
        </div>
      </transition>

      <div v-if="paginatedProducts.length > 0">
        <div
          class="grid grid-cols-2 mx-auto gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 md:grid-cols-3 lg:grid-cols-4 max-w-7xl"
        >
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="relative cursor-pointer group"
            @click="goToDetail(product)"
          >
            <div
              class="relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 mb-4 rounded-lg aspect-[4/5] overflow-hidden group/slider border border-gray-100/50"
            >
              <div class="absolute z-20 flex flex-col gap-1 top-2 left-2">
                <div
                  v-if="
                    getDiscountToDisplay(product) && getDiscountStatus(product).active
                  "
                  :class="activeFilter === 'final-sale' ? 'bg-red-800' : 'bg-red-600'"
                  class="px-2 py-1 rounded-[4px] font-extrabold text-[10px] text-white uppercase tracking-wider shadow-sm"
                >
                  {{ activeFilter === "final-sale" ? "FINAL SALE" : "SALE" }} -{{
                    calculateDynamicDiscount(product)
                  }}%
                </div>

                <div
                  v-if="isNewArrival(product.created_at) && activeFilter !== 'final-sale'"
                  class="bg-black text-white px-2 py-1 rounded-[4px] font-extrabold text-[9px] uppercase tracking-widest shadow-sm"
                >
                  NEW
                </div>
              </div>

              <button
                @click.stop="toggleWishlist(product.id)"
                class="absolute z-20 p-2 transition-transform rounded-full shadow-sm top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110"
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
                Hurry, Only {{ product.stock }} left!
              </div>

              <div
                v-else-if="product.stock <= 0"
                class="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex justify-center items-center z-20"
              >
                <span
                  class="px-5 py-2 text-xs font-black tracking-[0.2em] text-white uppercase transform bg-black rounded-sm shadow-xl -rotate-12 border border-gray-800"
                >
                  Sold Out
                </span>
              </div>

              <div
                class="flex w-full h-full transition-transform duration-500 ease-in-out"
                :style="{
                  transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
                }"
              >
                <template v-for="(media, index) in getMediaArray(product)" :key="index">
                  <div
                    class="relative flex-shrink-0 w-full h-full overflow-hidden bg-gray-100"
                  >
                    <img
                      v-if="media.type === 'image'"
                      :src="media.url || defaultBagIcon"
                      class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                      alt="Product Media"
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
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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
                      ? 'w-4 bg-black'
                      : 'w-1.5 bg-gray-400/80'
                  "
                  class="h-1.5 transition-all duration-300 rounded-full shadow-sm"
                ></div>
              </div>
            </div>

            <div class="flex flex-col px-1 space-y-1 text-left">
              <div class="flex gap-2 items-center mb-0.5">
                <span
                  v-if="product.bag_category"
                  class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
                >
                  {{ product.bag_category.name }}
                </span>
                <span
                  v-else
                  class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
                >
                  {{ product.category?.name || "Uncategorized" }}
                </span>
              </div>
              <h3
                class="text-sm font-bold tracking-wider text-gray-900 uppercase truncate transition-colors group-hover:text-red-700"
              >
                {{ product.name }}
              </h3>

              <div
                v-if="product.rating || product.reviews_avg_rating"
                class="flex items-center gap-1 mt-0.5"
              >
                <div class="flex text-yellow-400">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-3 h-3 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <span class="text-[10px] text-gray-500 font-medium"
                  >({{ product.reviews_count || product.rating_count || "10+" }})</span
                >
              </div>

              <div class="flex flex-wrap items-center gap-2 mt-1">
                <template
                  v-if="
                    getDiscountToDisplay(product) && !getDiscountStatus(product).expired
                  "
                >
                  <template v-if="getDiscountStatus(product).active">
                    <p class="text-sm font-extrabold text-red-600 md:text-base">
                      {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
                    </p>
                    <p
                      class="text-[11px] text-gray-400 line-through md:text-xs font-medium"
                    >
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

              <div v-if="getBundlePromo(product)" class="pt-2 mt-2">
                <span
                  class="inline-block px-2 py-1 text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-200 rounded-[4px] uppercase tracking-widest shadow-sm"
                >
                  Bundle: Buy {{ getBundlePromo(product).qty }} for
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

        <div class="flex items-center justify-center gap-4 mt-20">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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
          <span class="text-xs font-bold tracking-widest text-gray-600 uppercase">
            {{ $t("collection.page", { current: currentPage, total: totalPages || 1 }) }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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
                d="M9 5l7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        v-else-if="!isLoading"
        class="flex flex-col items-center justify-center py-32 border border-gray-200 border-dashed rounded-2xl bg-white/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mb-4 text-gray-300"
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
        <p class="font-serif text-xl italic text-gray-500">
          {{ $t("collection.no_items") }}
        </p>
        <button
          @click="resetAllFilters"
          class="mt-6 px-6 py-2.5 text-xs font-bold tracking-widest text-white transition bg-black rounded-full uppercase shadow-md hover:bg-gray-800"
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

const bagCategories = ref([]);

const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const selectedBagCategory = ref("");
const showOnlySale = ref(false);
const activeFilter = ref("");

const currentPage = ref(1);
const itemsPerPage = 12;

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const isFavorited = (id) => userWishlists.value.includes(id);

const activeSlides = ref({});
const { t } = useI18n();

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// Cek produk dibuat dalam 14 hari terakhir
const isNewArrival = (dateString) => {
  if (!dateString) return false;
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
};

// Tarik data Bag Categories dari endpoint publik
const fetchBagCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/bag-categories`);
    bagCategories.value = res.data.data || res.data;
  } catch (err) {
    console.error("Gagal mengambil Bag Categories:", err);
  }
};

// ==========================================
// LOGIKA SINKRONISASI FILTER DENGAN URL (ROUTER PUSH)
// ==========================================
const pushToRouter = (updates) => {
  const query = {
    search: searchQuery.value || undefined,
    category: selectedCategory.value || undefined,
    bag_category: selectedBagCategory.value || undefined,
    filter: activeFilter.value || undefined,
    sale: showOnlySale.value ? "true" : undefined,
    ...updates,
  };

  Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

  router.push({ path: "/collections", query });
};

const toggleSaleFilter = () => {
  pushToRouter({
    sale: !showOnlySale.value ? "true" : undefined,
    filter: undefined,
    category: undefined,
    bag_category: undefined,
  });
};

const toggleSpecialFilter = (filterName) => {
  const newFilter = activeFilter.value === filterName ? undefined : filterName;
  pushToRouter({
    filter: newFilter,
    sale: undefined,
  });
};

const handleCategoryChange = () => {
  pushToRouter({
    filter: undefined,
    sale: undefined,
  });
};

const resetAllFilters = () => {
  searchQuery.value = "";
  router.push({ path: "/collections" });
};

const syncStateWithQuery = (query) => {
  if (query.search !== undefined) searchQuery.value = query.search;
  selectedCategory.value = query.category || "";
  selectedBagCategory.value = query.bag_category || "";
  activeFilter.value = query.filter || "";
  showOnlySale.value = query.sale === "true";
  currentPage.value = 1;
};

onMounted(() => {
  syncStateWithQuery(route.query);
  fetchBagCategories();
  initCollections();
  fetchWishlists();

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

watch(
  () => route.query,
  (newQuery) => {
    syncStateWithQuery(newQuery);
  }
);

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
  window.removeEventListener("wishlist-updated", fetchWishlists);
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
  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
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

  return { qty: promoData.qty, price: finalPrice, curr: finalCurr };
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

// 👇 [PERBAIKAN] LOGIKA FILTER FINAL SALE (URUTAN DISKON) 👇
const filteredProducts = computed(() => {
  let sourceProducts = state.collectionsProducts || [];

  // 1. Filter Koleksi Utama
  if (selectedCategory.value !== "") {
    sourceProducts = sourceProducts.filter(
      (p) => (p.category?.name || p.category_name) === selectedCategory.value
    );
  }

  // 2. Filter Bag Category
  if (selectedBagCategory.value !== "") {
    sourceProducts = sourceProducts.filter(
      (p) => p.bag_category?.name === selectedBagCategory.value
    );
  }

  // 3. Filter "Sale" Normal
  if (showOnlySale.value) {
    sourceProducts = sourceProducts.filter((p) => getDiscountStatus(p).active);
  }

  // 4. Search Filter (FUSE.js)
  if (searchQuery.value.trim() !== "") {
    const fuseOptions = {
      keys: [
        { name: "name", weight: 0.7 },
        { name: "code", weight: 0.2 },
        { name: "category.name", weight: 0.1 },
        { name: "bag_category.name", weight: 0.1 },
      ],
      threshold: 0.3,
      ignoreLocation: true,
    };
    const fuse = new Fuse(sourceProducts, fuseOptions);
    sourceProducts = fuse.search(searchQuery.value).map((result) => result.item);
  }

  // 5. Special Filter: NEW ARRIVALS & FINAL SALE
  if (activeFilter.value === "new-arrivals") {
    sourceProducts = [...sourceProducts]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);
  } else if (activeFilter.value === "final-sale") {
    // 👇 Mengurutkan berdasarkan persentase diskon terbesar (Khas Clearance/Final Sale) 👇
    sourceProducts = [...sourceProducts]
      .filter((p) => getDiscountStatus(p).active)
      .sort((a, b) => calculateDynamicDiscount(b) - calculateDynamicDiscount(a));
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

const goToDetail = (product) => {
  router.push({
    path: `/products/${product.slug || product.id}`,
    state: { productData: JSON.stringify(product) },
  });
};
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-12 pb-24 min-h-screen">
    <!-- Loading Overlay -->
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
      <!-- Header dengan Counter Produk -->
      <div
        class="flex flex-col items-start justify-between mb-8 md:flex-row md:items-end"
      >
        <h1 class="text-3xl font-bold tracking-tight text-black uppercase">
          {{ $t("collection.products") }}
        </h1>
        <p v-if="!isLoading" class="mt-2 text-sm font-medium text-gray-500 md:mt-0">
          Showing {{ filteredProducts.length }} items
        </p>
      </div>

      <!-- Filters & Search -->
      <div class="flex flex-col gap-4 mb-12">
        <!-- Baris Atas: Search & Toggles -->
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
              class="w-full py-3 pl-10 pr-4 text-sm transition bg-white border border-gray-200 rounded-full shadow-sm outline-none focus:border-black focus:ring-1 focus:ring-black"
            />
          </div>

          <div class="flex flex-wrap items-center gap-2">
            <!-- Filter: New Arrivals -->
            <button
              @click="toggleSpecialFilter('new-arrivals')"
              :class="
                activeFilter === 'new-arrivals'
                  ? 'bg-black text-white shadow-md transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-200'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center gap-1.5"
            >
              <span class="text-sm">✨</span> New Arrivals
            </button>

            <!-- Filter: Final Sale -->
            <button
              @click="toggleSpecialFilter('final-sale')"
              :class="
                activeFilter === 'final-sale'
                  ? 'bg-red-700 text-white shadow-md transform scale-105 border-red-700'
                  : 'bg-white text-gray-700 hover:bg-red-50 hover:text-red-700 border-gray-200 hover:border-red-200'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center gap-1.5"
            >
              <span class="text-sm">🔥</span> Final Sale
            </button>

            <!-- Filter: Normal Sale -->
            <button
              @click="toggleSaleFilter"
              :class="
                showOnlySale
                  ? 'bg-red-600 text-white border-red-600 shadow-md transform scale-105'
                  : 'bg-white text-red-500 hover:bg-red-50 border-red-100'
              "
              class="px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest uppercase transition-all duration-300 border rounded-full whitespace-nowrap text-center flex items-center justify-center gap-1"
            >
              <svg
                v-if="!showOnlySale"
                class="w-3 h-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              {{ $t("collection.sale") }}
            </button>
          </div>
        </div>

        <!-- Baris Bawah: Dropdown Kategorisasi Ganda -->
        <div class="flex flex-col gap-4 md:flex-row">
          <!-- Dropdown 1: Koleksi Utama -->
          <div class="relative flex-1">
            <select
              v-model="selectedCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black pr-8 truncate hover:bg-gray-50"
            >
              <option value="">All Collections</option>
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

          <!-- Dropdown 2: Bag Types (Tipe Tas FIsik) -->
          <div class="relative flex-1">
            <select
              v-model="selectedBagCategory"
              @change="handleCategoryChange"
              class="w-full px-5 py-3 text-[10px] sm:text-xs font-bold tracking-widest text-gray-600 uppercase transition bg-white border border-gray-200 rounded-full shadow-sm outline-none appearance-none cursor-pointer focus:border-black focus:ring-1 focus:ring-black pr-8 truncate hover:bg-gray-50"
            >
              <option value="">All Bag Types</option>
              <option v-for="bag in bagCategories" :key="bag.id" :value="bag.name">
                {{ bag.name }}
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

      <!-- 👇 [CRO: WARNING BANNER] Peringatan Ketat Saat Final Sale Aktif 👇 -->
      <transition name="fade">
        <div
          v-if="activeFilter === 'final-sale'"
          class="flex items-start gap-4 p-5 mb-8 border-l-4 border-red-600 bg-red-50 rounded-r-xl"
        >
          <div class="p-2 bg-white rounded-full shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-red-600"
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
          </div>
          <div>
            <h3 class="mb-1 text-sm font-black tracking-widest text-red-800 uppercase">
              Final Sale Policy
            </h3>
            <p class="text-xs leading-relaxed text-red-700 md:max-w-4xl">
              Koleksi di bawah ini dijual dengan diskon pembersihan gudang (Clearance).
              <strong class="font-black text-red-900"
                >Semua pembelian bersifat permanen.</strong
              >
              Kami tidak menerima pengembalian (return), penukaran (exchange), maupun
              pengembalian dana (refund) dengan alasan apa pun.
            </p>
          </div>
        </div>
      </transition>

      <!-- Product Grid -->
      <div v-if="paginatedProducts.length > 0">
        <div
          class="grid grid-cols-2 mx-auto gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12 md:grid-cols-3 lg:grid-cols-4 max-w-7xl"
        >
          <div
            v-for="product in paginatedProducts"
            :key="product.id"
            class="relative cursor-pointer group"
            @click="goToDetail(product)"
          >
            <!-- Product Card Image Container -->
            <div
              class="relative bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 mb-4 rounded-lg aspect-[4/5] overflow-hidden group/slider border border-gray-100/50"
            >
              <!-- Badges Kiri Atas -->
              <div class="absolute z-20 flex flex-col gap-1 top-2 left-2">
                <!-- 👇 [PERBAIKAN] Lencana kini mengecek langsung dari data `is_final_sale` di DB 👇 -->
                <div
                  v-if="
                    getDiscountToDisplay(product) && getDiscountStatus(product).active
                  "
                  :class="product.is_final_sale ? 'bg-red-800' : 'bg-red-600'"
                  class="px-2 py-1 rounded-[4px] font-extrabold text-[10px] text-white uppercase tracking-wider shadow-sm"
                >
                  <!-- Ubah teks badge sesuai flag is_final_sale -->
                  {{ product.is_final_sale ? "FINAL SALE" : "SALE" }} -{{
                    calculateDynamicDiscount(product)
                  }}%
                </div>
                <!-- 👆 ======================================================== 👆 -->

                <div
                  v-if="isNewArrival(product.created_at) && !product.is_final_sale"
                  class="bg-black text-white px-2 py-1 rounded-[4px] font-extrabold text-[9px] uppercase tracking-widest shadow-sm"
                >
                  NEW
                </div>
              </div>

              <!-- Tombol Wishlist (Kanan Atas) -->
              <button
                @click.stop="toggleWishlist(product.id)"
                class="absolute z-20 p-2 transition-transform rounded-full shadow-sm top-2 right-2 bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-110"
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

              <!-- Stock Warnings -->
              <div
                v-if="product.stock <= 5 && product.stock > 0"
                class="bottom-2 left-2 absolute bg-amber-500/90 backdrop-blur-sm px-2 py-1 rounded-md font-bold text-[9px] text-white uppercase tracking-widest z-20 shadow-sm animate-pulse"
              >
                Hurry, Only {{ product.stock }} left!
              </div>

              <div
                v-else-if="product.stock <= 0"
                class="absolute inset-0 bg-white/70 backdrop-blur-[2px] flex justify-center items-center z-20"
              >
                <span
                  class="px-5 py-2 text-xs font-black tracking-[0.2em] text-white uppercase transform bg-black rounded-sm shadow-xl -rotate-12 border border-gray-800"
                >
                  Sold Out
                </span>
              </div>

              <!-- Media Slider -->
              <div
                class="flex w-full h-full transition-transform duration-500 ease-in-out"
                :style="{
                  transform: `translateX(-${(activeSlides[product.id] || 0) * 100}%)`,
                }"
              >
                <template v-for="(media, index) in getMediaArray(product)" :key="index">
                  <div
                    class="relative flex-shrink-0 w-full h-full overflow-hidden bg-gray-100"
                  >
                    <img
                      v-if="media.type === 'image'"
                      :src="media.url || defaultBagIcon"
                      class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
                      loading="lazy"
                      alt="Product Media"
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

              <!-- Slider Controls -->
              <button
                v-if="getMediaArray(product).length > 1"
                @click.stop="prevSlide(product.id, getMediaArray(product).length - 1)"
                class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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
                class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-1.5 rounded-full opacity-0 group-hover/slider:opacity-100 transition z-10 shadow-md text-black"
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

              <!-- Slider Dots -->
              <div
                class="absolute left-0 right-0 z-10 flex justify-center gap-1 bottom-2"
                v-if="getMediaArray(product).length > 1"
              >
                <div
                  v-for="(m, idx) in getMediaArray(product)"
                  :key="idx"
                  :class="
                    (activeSlides[product.id] || 0) === idx
                      ? 'w-4 bg-black'
                      : 'w-1.5 bg-gray-400/80'
                  "
                  class="h-1.5 transition-all duration-300 rounded-full shadow-sm"
                ></div>
              </div>
            </div>

            <!-- Product Details -->
            <div class="flex flex-col px-1 space-y-1 text-left">
              <div class="flex gap-2 items-center mb-0.5">
                <span
                  v-if="product.bag_category"
                  class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
                >
                  {{ product.bag_category.name }}
                </span>
                <span
                  v-else
                  class="text-[9px] font-bold tracking-widest text-gray-400 uppercase"
                >
                  {{ product.category?.name || "Uncategorized" }}
                </span>
              </div>
              <h3
                class="text-sm font-bold tracking-wider text-gray-900 uppercase truncate transition-colors group-hover:text-red-700"
              >
                {{ product.name }}
              </h3>

              <!-- 👇 (CRO: Social Proof) Menampilkan Rating Otomatis Jika Ada 👇 -->
              <div
                v-if="product.rating || product.reviews_avg_rating"
                class="flex items-center gap-1 mt-0.5"
              >
                <div class="flex text-yellow-400">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-3 h-3 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </div>
                <span class="text-[10px] text-gray-500 font-medium"
                  >({{ product.reviews_count || product.rating_count || "10+" }})</span
                >
              </div>

              <!-- Harga -->
              <div class="flex flex-wrap items-center gap-2 mt-1">
                <template
                  v-if="
                    getDiscountToDisplay(product) && !getDiscountStatus(product).expired
                  "
                >
                  <template v-if="getDiscountStatus(product).active">
                    <p class="text-sm font-extrabold text-red-600 md:text-base">
                      {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
                    </p>
                    <p
                      class="text-[11px] text-gray-400 line-through md:text-xs font-medium"
                    >
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

              <!-- Bundle Promo -->
              <div v-if="getBundlePromo(product)" class="pt-2 mt-2">
                <span
                  class="inline-block px-2 py-1 text-[9px] font-black text-blue-700 bg-blue-50 border border-blue-200 rounded-[4px] uppercase tracking-widest shadow-sm"
                >
                  Bundle: Buy {{ getBundlePromo(product).qty }} for
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
        <!-- <div class="flex items-center justify-center gap-4 mt-20">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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
          <span class="text-xs font-bold tracking-widest text-gray-600 uppercase">
            {{ $t("collection.page", { current: currentPage, total: totalPages || 1 }) }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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
                d="M9 5l7 7-7-7"
              />
            </svg>
          </button>
        </div> -->

        <!-- Pagination -->
        <div class="flex items-center justify-center gap-4 mt-20">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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
          <span class="text-xs font-bold tracking-widest text-gray-600 uppercase">
            {{ $t("collection.page", { current: currentPage, total: totalPages || 1 }) }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages || totalPages === 0"
            class="p-2 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:border-black disabled:opacity-30 disabled:cursor-not-allowed"
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

      <!-- Empty State -->
      <div
        v-else-if="!isLoading"
        class="flex flex-col items-center justify-center py-32 border border-gray-200 border-dashed rounded-2xl bg-white/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mb-4 text-gray-300"
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
        <p class="font-serif text-xl italic text-gray-500">
          {{ $t("collection.no_items") }}
        </p>
        <button
          @click="resetAllFilters"
          class="mt-6 px-6 py-2.5 text-xs font-bold tracking-widest text-white transition bg-black rounded-full uppercase shadow-md hover:bg-gray-800"
        >
          {{ $t("collection.reset_filters") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted, computed, watch, onUnmounted } from "vue";
// import { useRoute, useRouter } from "vue-router";
// import Swal from "sweetalert2";
// import { useProductStore } from "../../composables/useProductStore.js";
// import axios from "axios";
// import { BASE_URL } from "../../config/api.js";
// import Fuse from "fuse.js";
// import { useI18n } from "vue-i18n";
// import defaultBagIcon from "../../assets/products/bag_icon.jpg";

import { ref, onMounted, computed, watch, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useProductStore } from "../../composables/useProductStore.js";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import { useI18n } from "vue-i18n";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
// Fuse.js telah dihapus dari sini!

const route = useRoute();
const router = useRouter();

const { state, fetchCollectionsData } = useProductStore();
const categories = computed(() => state.categories);

// 👇 State untuk Bag Categories 👇
const bagCategories = ref([]);

const isLoading = ref(false);

const searchQuery = ref("");
const selectedCategory = ref("");
const selectedBagCategory = ref("");
const showOnlySale = ref(false);
const activeFilter = ref("");

const meilisearchResults = ref(null); // Menyimpan hasil tembakan dari Backend
let searchDebounceTimer = null; // Mencegah spam API saat user mengetik cepat

const currentPage = ref(1);
const itemsPerPage = 12;

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const isFavorited = (id) => userWishlists.value.includes(id);

const activeSlides = ref({});
const { t } = useI18n();

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// Cek produk dibuat dalam 14 hari terakhir
const isNewArrival = (dateString) => {
  if (!dateString) return false;
  const createdDate = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 14;
};

// Tarik data Bag Categories dari endpoint publik
const fetchBagCategories = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/bag-categories`);
    bagCategories.value = res.data.data || res.data;
  } catch (err) {
    console.error("Gagal mengambil Bag Categories:", err);
  }
};

// ==========================================
// LOGIKA SINKRONISASI FILTER DENGAN URL (ROUTER PUSH)
// ==========================================
const pushToRouter = (updates) => {
  const query = {
    search: searchQuery.value || undefined,
    category: selectedCategory.value || undefined,
    bag_category: selectedBagCategory.value || undefined,
    filter: activeFilter.value || undefined,
    sale: showOnlySale.value ? "true" : undefined,
    ...updates,
  };

  Object.keys(query).forEach((key) => query[key] === undefined && delete query[key]);

  router.push({ path: "/collections", query });
};

// 👇 [BARU] FUNGSI PENCARIAN SERVER-SIDE (MEILISEARCH) 👇
const executeSearchEngine = async (keyword) => {
  if (!keyword || keyword.trim() === "") {
    meilisearchResults.value = null; // Kembalikan ke mode Cache Store bawaan
    return;
  }

  isLoading.value = true;
  try {
    const res = await axios.get(
      `${BASE_URL}/products/search?q=${encodeURIComponent(keyword)}`
    );
    meilisearchResults.value = res.data;
  } catch (error) {
    console.error("Meilisearch Error:", error);
  } finally {
    isLoading.value = false;
  }
};

const toggleSaleFilter = () => {
  pushToRouter({
    sale: !showOnlySale.value ? "true" : undefined,
    filter: undefined,
    category: undefined,
    bag_category: undefined,
  });
};

const toggleSpecialFilter = (filterName) => {
  const newFilter = activeFilter.value === filterName ? undefined : filterName;
  pushToRouter({
    filter: newFilter,
    sale: undefined,
  });
};

const handleCategoryChange = () => {
  pushToRouter({
    filter: undefined,
    sale: undefined,
  });
};

const resetAllFilters = () => {
  searchQuery.value = "";
  router.push({ path: "/collections" });
};

// const syncStateWithQuery = (query) => {
//   if (query.search !== undefined) searchQuery.value = query.search;
//   selectedCategory.value = query.category || "";
//   selectedBagCategory.value = query.bag_category || "";
//   activeFilter.value = query.filter || "";
//   showOnlySale.value = query.sale === "true";
//   currentPage.value = 1;
// };

const syncStateWithQuery = (query) => {
  // Hanya panggil backend jika keyword berubah, untuk hindari redundansi
  if (query.search !== undefined && query.search !== searchQuery.value) {
    searchQuery.value = query.search;
    executeSearchEngine(query.search);
  } else if (query.search === undefined) {
    searchQuery.value = "";
    meilisearchResults.value = null;
  }

  selectedCategory.value = query.category || "";
  selectedBagCategory.value = query.bag_category || "";
  activeFilter.value = query.filter || "";
  showOnlySale.value = query.sale === "true";
  currentPage.value = 1;
};

// Mengubah Watcher SearchQuery agar menunggu user selesai mengetik 400ms (Debounce)
watch(searchQuery, (newVal) => {
  clearTimeout(searchDebounceTimer);
  searchDebounceTimer = setTimeout(() => {
    // Sinkronisasi URL diam-diam
    pushToRouter({ search: newVal || undefined });
  }, 400);
});

// // Watcher untuk mendeteksi perubahan dari Router (URL)
// watch(
//   () => route.query,
//   (newQuery) => {
//     syncStateWithQuery(newQuery);
//   }
// );

onMounted(() => {
  syncStateWithQuery(route.query);
  fetchBagCategories();
  initCollections();
  fetchWishlists();

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

watch(
  () => route.query,
  (newQuery) => {
    syncStateWithQuery(newQuery);
  }
);

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
  window.removeEventListener("wishlist-updated", fetchWishlists);
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
  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
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

  return { qty: promoData.qty, price: finalPrice, curr: finalCurr };
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

// 👇 [PERBAIKAN] Modifikasi Logika Komputasi Filter Lanjutan 👇
// const filteredProducts = computed(() => {
//   let sourceProducts = state.collectionsProducts || [];

//   // 1. Filter Koleksi Utama
//   if (selectedCategory.value !== "") {
//     sourceProducts = sourceProducts.filter(
//       (p) => (p.category?.name || p.category_name) === selectedCategory.value
//     );
//   }

//   // 2. Filter Bag Category
//   if (selectedBagCategory.value !== "") {
//     sourceProducts = sourceProducts.filter(
//       (p) => p.bag_category?.name === selectedBagCategory.value
//     );
//   }

//   // 3. Filter "Sale" Normal
//   if (showOnlySale.value) {
//     sourceProducts = sourceProducts.filter((p) => getDiscountStatus(p).active);
//   }

//   // 4. Search Filter (FUSE.js)
//   if (searchQuery.value.trim() !== "") {
//     const fuseOptions = {
//       keys: [
//         { name: "name", weight: 0.7 },
//         { name: "code", weight: 0.2 },
//         { name: "category.name", weight: 0.1 },
//         { name: "bag_category.name", weight: 0.1 },
//       ],
//       threshold: 0.3,
//       ignoreLocation: true,
//     };
//     const fuse = new Fuse(sourceProducts, fuseOptions);
//     sourceProducts = fuse.search(searchQuery.value).map((result) => result.item);
//   }

//   // 5. Special Filter: NEW ARRIVALS & FINAL SALE
//   if (activeFilter.value === "new-arrivals") {
//     sourceProducts = [...sourceProducts]
//       .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
//       .slice(0, 10);
//   } else if (activeFilter.value === "final-sale") {
//     // 👇 [PERBAIKAN] Memfilter HANYA produk yang memiliki flag is_final_sale aktif 👇
//     sourceProducts = [...sourceProducts]
//       .filter((p) => p.is_final_sale)
//       .sort((a, b) => calculateDynamicDiscount(b) - calculateDynamicDiscount(a));
//   }

//   return sourceProducts;
// });

// 👇 [PERBAIKAN] Komputasi menggunakan data dari Meilisearch jika ada 👇
const filteredProducts = computed(() => {
  // Gunakan hasil Meilisearch jika ada, jika tidak, gunakan Store bawaan
  let sourceProducts =
    meilisearchResults.value !== null
      ? meilisearchResults.value
      : state.collectionsProducts || [];

  // 1. Filter Koleksi Utama
  if (selectedCategory.value !== "") {
    sourceProducts = sourceProducts.filter(
      (p) => (p.category?.name || p.category_name) === selectedCategory.value
    );
  }

  // 2. Filter Bag Category
  if (selectedBagCategory.value !== "") {
    sourceProducts = sourceProducts.filter(
      (p) => p.bag_category?.name === selectedBagCategory.value
    );
  }

  // 3. Filter "Sale" Normal
  if (showOnlySale.value) {
    sourceProducts = sourceProducts.filter((p) => getDiscountStatus(p).active);
  }

  // 4. Search Filter (FUSE.js) TELAH DIHAPUS. Teks search sudah ditangani Meilisearch Backend!

  // 5. Special Filter: NEW ARRIVALS & FINAL SALE
  if (activeFilter.value === "new-arrivals") {
    sourceProducts = [...sourceProducts]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 10);
  } else if (activeFilter.value === "final-sale") {
    sourceProducts = [...sourceProducts]
      .filter((p) => p.is_final_sale)
      .sort((a, b) => calculateDynamicDiscount(b) - calculateDynamicDiscount(a));
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

const goToDetail = (product) => {
  router.push({
    path: `/products/${product.slug || product.id}`,
    state: { productData: JSON.stringify(product) },
  });
};
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
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
</style>
