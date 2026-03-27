<!-- <template>
  <section class="bg-white w-full">
    <div
      class="w-full overflow-hidden cursor-pointer"
      @click="navigateToSpecificProduct('ETERNA RED')"
    >
      <img
        src="../../assets/home_firstimage.jpeg"
        alt="SolHer Product"
        class="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
      />
    </div>

    <div class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
      <h2
        class="mb-6 font-medium text-black text-2xl md:text-3xl tracking-tight"
      >
        Crafted from Premium Selected Leatherty
      </h2>
      <p class="font-light text-gray-700 text-sm md:text-base leading-relaxed">
        Crafted from carefully selected genuine leather, each SolHer piece
        reflects timeless elegance and refined craftsmanship — a seamless blend
        of beauty, quality, and modern sophistication.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden">
      <img
        src="../../assets/DSCF5814.jpg"
        @click="navigateToSpecificProduct('IMPERIAL RED')"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
      />
      <img
        src="../../assets/DSCF5186.jpg"
        @click="navigateToSpecificProduct('MAN TANG HONG')"
        class="w-full h-full object-cover hover:scale-105 transition-transform duration-700 cursor-pointer"
      />
    </div>

    <div class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
      <h2 class="mb-8 font-medium text-black text-xl md:text-2xl leading-snug">
        Embrace the possibilities with <br />go everywhere bags
      </h2>

      <router-link
        to="/collections"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition"
      >
        Shop New Arrival
      </router-link>
    </div>

    <div class="px-6 py-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <h3
          class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
        >
          Volume 1 - Goddess Of The Sun
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div
            v-for="n in 4"
            :key="n"
            class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse"
          >
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="bg-gray-200 mb-2 w-1/2 h-3"></div>
            <div class="bg-gray-200 w-1/4 h-3"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeOne"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <h4 class="text-[10px] text-gray-500 uppercase tracking-widest">
              {{ p.name }}
            </h4>
            <p class="font-medium text-black">{{ formatPrice(p.price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 pb-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <h3
          class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
        >
          Volume 2 - The Red Chapter Collection
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div
            v-for="n in 4"
            :key="n"
            class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse"
          >
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="bg-gray-200 mb-2 w-1/2 h-3"></div>
            <div class="bg-gray-200 w-1/4 h-3"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeTwo"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <h4 class="text-[10px] text-gray-500 uppercase tracking-widest">
              {{ p.name }}
            </h4>
            <p class="font-medium text-black">{{ formatPrice(p.price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative w-full h-[300px] md:h-[500px] overflow-hidden cursor-pointer"
      @click="navigateToSpecificProduct('RED CHARM')"
    >
      <img
        src="../../assets/home_lastimage.jpg"
        alt="Premium Materials"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 flex items-end bg-black/10 p-8 md:p-16">
        <h2
          class="max-w-md font-serif font-light text-white text-2xl md:text-5xl"
        >
          Premium materials and <br />hand-selected finishing touches
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../config/api.js";
import { useProductStore } from "../../composables/useProductStore"; // Import Store

const router = useRouter();
const { state, fetchHomeData } = useProductStore();
const isLoading = ref(false);
const volumeOneProducts = ref([]);
const volumeTwoProducts = ref([]);

const initData = async () => {
  // Hanya tampilkan loading jika data belum ada di cache
  if (!state.isHomeLoaded) {
    isLoading.value = true;
    await fetchHomeData();
    isLoading.value = false;
  } else {
    // Jika sudah ada cache, pastikan fetchHomeData dipanggil (akan langsung return)
    fetchHomeData();
  }
};

// Fungsi navigasi berdasarkan pencarian Nama/Kode
const navigateToSpecificProduct = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/home/find-product`, {
      params: { query },
    });
    router.push(`/product/${res.data.id}`);
  } catch (err) {
    console.error("Product link broken or not found");
  }
};

const fetchData = async () => {
  try {
    const [resV1, resV2] = await Promise.all([
      axios.get(`${BASE_URL}/home/category/C001`),
      axios.get(`${BASE_URL}/home/category/C002`),
    ]);
    volumeOneProducts.value = resV1.data;
    volumeTwoProducts.value = resV2.data;
  } catch (err) {
    console.error("Failed to load volume products");
  }
};

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  }).format(value);

onMounted(initData);
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.contain {
  contain: layout paint;
}
</style> -->

<!-- <template>
  <section class="bg-white w-full">
    <div
      class="w-full overflow-hidden cursor-pointer relative"
      @click="navigateToSpecificProduct('ETERNA RED')"
    >
      <img
        src="../../assets/home_firstimage.jpeg"
        alt="SolHer Product"
        class="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
      />
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce">
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
        <p class="font-bold text-xs uppercase tracking-widest text-black">Eterna Red is selling fast!</p>
      </div>
    </div>

    <div class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
      <h2 class="mb-6 font-medium text-black text-2xl md:text-3xl tracking-tight">
        Crafted from Premium Selected Leatherty
      </h2>
      <p class="font-light text-gray-700 text-sm md:text-base leading-relaxed">
        Crafted from carefully selected genuine leather, each SolHer piece
        reflects timeless elegance and refined craftsmanship — a seamless blend
        of beauty, quality, and modern sophistication.
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden">
      <div class="relative overflow-hidden group cursor-pointer" @click="navigateToSpecificProduct('IMPERIAL RED')">
        <img src="../../assets/DSCF5814.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span class="bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest">Discover Imperial</span>
        </div>
      </div>
      <div class="relative overflow-hidden group cursor-pointer" @click="navigateToSpecificProduct('MAN TANG HONG')">
        <img src="../../assets/DSCF5186.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span class="bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest">Shop Man Tang</span>
        </div>
      </div>
    </div>

    <div class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center border-b border-gray-100">
      <h2 class="mb-8 font-medium text-black text-xl md:text-2xl leading-snug">
        Embrace the possibilities with <br />go everywhere bags
      </h2>

      <router-link
        to="/collections"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition"
      >
        Shop New Arrival
      </router-link>
    </div>

    <div v-if="!isLoading && state.trendingProducts?.length > 0" class="px-6 py-20 w-full bg-gray-50 border-b border-gray-200">
      <div class="mx-auto max-w-[1600px]">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h3 class="font-serif font-light text-red-700 text-3xl md:text-4xl italic">
              Trending Now
            </h3>
            <p class="text-xs text-gray-500 uppercase tracking-widest mt-2 font-bold">Our most loved pieces this week</p>
          </div>
          <router-link to="/collections" class="hidden md:block text-xs font-bold uppercase tracking-widest underline hover:text-red-600 transition">View All</router-link>
        </div>

        <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          <div
            v-for="p in state.trendingProducts"
            :key="'trend-'+p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[240px] md:w-[300px] cursor-pointer"
          >
            <div class="relative bg-white mb-4 overflow-hidden rounded-xl shadow-sm border border-gray-100">
              <img
                :src="p.image"
                class="w-full h-[300px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div class="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                Hot
              </div>
            </div>
            <h4 class="font-bold text-xs text-gray-900 uppercase tracking-widest truncate">
              {{ p.name }}
            </h4>
            <div class="flex items-center gap-2 mt-1">
              <p v-if="p.discount_price" class="font-bold text-red-600 text-sm">{{ formatPrice(p.discount_price) }}</p>
              <p :class="p.discount_price ? 'text-[10px] text-gray-400 line-through' : 'font-bold text-sm text-gray-600'">
                {{ formatPrice(p.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 py-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <h3 class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic">
          Volume 1 - Goddess Of The Sun
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div v-for="n in 4" :key="n" class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse">
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="bg-gray-200 mb-2 w-1/2 h-3"></div>
            <div class="bg-gray-200 w-1/4 h-3"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeOne"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden relative">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div v-if="p.stock < 5" class="absolute bottom-3 left-3 bg-amber-100 text-amber-800 px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded">Only {{ p.stock }} left</div>
            </div>
            <h4 class="text-[10px] text-gray-500 uppercase tracking-widest">
              {{ p.name }}
            </h4>
            <p class="font-medium text-black">{{ formatPrice(p.discount_price ?? p.price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 pb-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <h3 class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic">
          Volume 2 - The Red Chapter Collection
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div v-for="n in 4" :key="n" class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse">
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="bg-gray-200 mb-2 w-1/2 h-3"></div>
            <div class="bg-gray-200 w-1/4 h-3"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeTwo"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden relative">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <h4 class="text-[10px] text-gray-500 uppercase tracking-widest">
              {{ p.name }}
            </h4>
            <p class="font-medium text-black">{{ formatPrice(p.discount_price ?? p.price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div
      class="relative w-full h-[300px] md:h-[500px] overflow-hidden cursor-pointer group"
      @click="navigateToSpecificProduct('RED CHARM')"
    >
      <img
        src="../../assets/home_lastimage.jpg"
        alt="Premium Materials"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      <div class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-8 md:p-16">
        <h2 class="max-w-md font-serif font-light text-white text-2xl md:text-5xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          Premium materials and <br />hand-selected finishing touches
        </h2>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../config/api.js";
import { useProductStore } from "../../composables/useProductStore";

const router = useRouter();
const { state, fetchHomeData } = useProductStore();
const isLoading = ref(false);

const initData = async () => {
  if (!state.isHomeLoaded) {
    isLoading.value = true;
    await fetchHomeData();
    isLoading.value = false;
  } else {
    fetchHomeData();
  }
};

const navigateToSpecificProduct = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/home/find-product`, {
      params: { query },
    });
    router.push(`/product/${res.data.id}`);
  } catch (err) {
    console.error("Product link broken or not found");
  }
};

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0, // Dibuat 0 agar tidak mengganggu layout mata (lebih clean)
  }).format(value);

onMounted(initData);
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.contain {
  contain: layout paint;
}
</style> -->

<template>
  <section class="bg-white w-full overflow-x-hidden">
    <div
      v-reveal
      class="w-full overflow-hidden cursor-pointer relative"
      @click="navigateToSpecificProduct('ETERNA RED')"
    >
      <img
        src="../../assets/home_firstimage.jpeg"
        alt="SolHer Product"
        class="w-full h-auto object-cover hover:scale-105 transition-transform duration-1000"
      />
      <div
        class="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-bounce"
      >
        <span class="relative flex h-3 w-3">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"
          ></span>
          <span
            class="relative inline-flex rounded-full h-3 w-3 bg-red-500"
          ></span>
        </span>
        <p class="font-bold text-xs uppercase tracking-widest text-black">
          Eterna Red is selling fast!
        </p>
      </div>
    </div>

    <div v-reveal class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center">
      <h2
        class="mb-6 font-medium text-black text-2xl md:text-3xl tracking-tight"
      >
        Crafted from Premium Selected Leatherty
      </h2>
      <p class="font-light text-gray-700 text-sm md:text-base leading-relaxed">
        Crafted from carefully selected genuine leather, each SolHer piece
        reflects timeless elegance and refined craftsmanship — a seamless blend
        of beauty, quality, and modern sophistication.
      </p>
    </div>

    <div
      v-reveal
      class="grid grid-cols-1 md:grid-cols-2 w-full overflow-hidden"
    >
      <div
        class="relative overflow-hidden group cursor-pointer"
        @click="navigateToSpecificProduct('IMPERIAL RED')"
      >
        <img
          src="../../assets/DSCF5814.jpg"
          class="w-full h-[400px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span
            class="bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg"
            >Discover Imperial</span
          >
        </div>
      </div>
      <div
        class="relative overflow-hidden group cursor-pointer"
        @click="navigateToSpecificProduct('MAN TANG HONG')"
      >
        <img
          src="../../assets/DSCF5186.jpg"
          class="w-full h-[400px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
        >
          <span
            class="bg-white text-black px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest shadow-lg"
            >Shop Man Tang</span
          >
        </div>
      </div>
    </div>

    <div
      v-reveal
      class="mx-auto px-6 py-16 md:py-24 max-w-4xl text-center border-b border-gray-100"
    >
      <h2 class="mb-8 font-medium text-black text-xl md:text-2xl leading-snug">
        Embrace the possibilities with <br />go everywhere bags
      </h2>

      <router-link
        to="/collections"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition shadow-xl"
      >
        Shop New Arrival
      </router-link>
    </div>

    <div
      v-if="!isLoading && state.trendingProducts?.length > 0"
      v-reveal
      class="px-6 py-20 w-full bg-gray-50 border-b border-gray-200"
    >
      <div class="mx-auto max-w-[1600px]">
        <div class="flex justify-between items-end mb-10">
          <div>
            <h3
              class="font-serif font-light text-red-700 text-3xl md:text-4xl italic"
            >
              Trending Now
            </h3>
            <p
              class="text-xs text-gray-500 uppercase tracking-widest mt-2 font-bold"
            >
              Our most loved pieces this week
            </p>
          </div>
          <router-link
            to="/collections"
            class="hidden md:block text-xs font-bold uppercase tracking-widest underline hover:text-red-600 transition"
            >View All</router-link
          >
        </div>

        <div class="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
          <div
            v-for="p in state.trendingProducts"
            :key="'trend-' + p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[240px] md:w-[300px] cursor-pointer"
          >
            <div
              class="relative bg-white mb-4 overflow-hidden rounded-xl shadow-sm border border-gray-100"
            >
              <img
                :src="p.image"
                class="w-full h-[300px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div
                class="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest shadow-md"
              >
                Hot
              </div>
            </div>
            <h4
              class="font-bold text-xs text-gray-900 uppercase tracking-widest truncate"
            >
              {{ p.name }}
            </h4>
            <div class="flex items-center gap-2 mt-1">
              <p v-if="p.discount_price" class="font-bold text-red-600 text-sm">
                {{ formatPrice(p.discount_price) }}
              </p>
              <p
                :class="
                  p.discount_price
                    ? 'text-[10px] text-gray-400 line-through'
                    : 'font-bold text-sm text-gray-600'
                "
              >
                {{ formatPrice(p.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 py-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <h3
          v-reveal
          class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
        >
          Volume 1 - Goddess Of The Sun
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div
            v-for="n in 4"
            :key="n"
            class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse"
          >
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="bg-gray-200 mb-2 w-1/2 h-3"></div>
            <div class="bg-gray-200 w-1/4 h-3"></div>
          </div>
        </div>

        <div v-else v-reveal class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeOne"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden relative">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div
                v-if="p.stock < 5"
                class="absolute bottom-3 left-3 bg-amber-100 text-amber-800 px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded shadow-sm"
              >
                Only {{ p.stock }} left
              </div>
            </div>
            <h4 class="text-[10px] text-gray-500 uppercase tracking-widest">
              {{ p.name }}
            </h4>
            <p class="font-medium text-black">
              {{ formatPrice(p.discount_price ?? p.price) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="px-6 pb-24 w-full">
      <div class="mx-auto max-w-[1600px]">
        <h3
          v-reveal
          class="mb-10 font-serif font-light text-gray-800 text-3xl md:text-4xl italic"
        >
          Volume 2 - The Red Chapter Collection
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div
            v-for="n in 4"
            :key="n"
            class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse"
          >
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="bg-gray-200 mb-2 w-1/2 h-3"></div>
            <div class="bg-gray-200 w-1/4 h-3"></div>
          </div>
        </div>

        <div v-else v-reveal class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeTwo"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="bg-gray-100 mb-4 overflow-hidden relative">
              <img
                :src="p.image"
                class="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
            </div>
            <h4 class="text-[10px] text-gray-500 uppercase tracking-widest">
              {{ p.name }}
            </h4>
            <p class="font-medium text-black">
              {{ formatPrice(p.discount_price ?? p.price) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div
      v-reveal
      class="relative w-full h-[300px] md:h-[500px] overflow-hidden cursor-pointer group"
      @click="navigateToSpecificProduct('RED CHARM')"
    >
      <img
        src="../../assets/home_lastimage.jpg"
        alt="Premium Materials"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      <div
        class="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-8 md:p-16"
      >
        <h2
          class="max-w-md font-serif font-light text-white text-2xl md:text-5xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
        >
          Premium materials and <br />hand-selected finishing touches
        </h2>
      </div>
    </div>
    <!-- <Transition
      enter-active-class="transition ease-out duration-700"
      enter-from-class="opacity-0 scale-95 translate-y-10"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-500"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showPromoPopup"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        @click.self="closePopup"
      >
        <div
          class="bg-white w-full max-w-4xl flex flex-col md:flex-row relative shadow-2xl overflow-hidden rounded-sm"
        >
          <button
            @click="closePopup"
            class="absolute top-4 right-4 z-10 text-gray-400 hover:text-black transition"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div class="hidden md:block md:w-1/2 relative bg-gray-100">
            <img
              src="../../assets/DSCF5814.jpg"
              alt="Promo Bags"
              class="w-full h-full object-cover"
            />
          </div>

          <div
            class="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center items-center text-center bg-[#FAFAFA]"
          >
            <h4
              class="font-bold tracking-[0.3em] text-[10px] uppercase mb-6 text-gray-500"
            >
              S O L H E R
            </h4>

            <h2
              class="text-4xl md:text-5xl font-extrabold text-black mb-2 tracking-tight"
            >
              GET 25.000 PTS
            </h2>
            <p class="text-lg md:text-xl italic font-serif text-gray-600 mb-8">
              for your first order
            </p>

            <p class="text-xs text-gray-500 leading-relaxed mb-8 max-w-xs">
              Register now and get 25.000 Loyalty Points (worth Rp 25.000)
              automatically applied to your account.
            </p>

            <div
              class="w-full bg-white border border-gray-300 px-4 py-3 mb-4 text-left shadow-inner"
            >
              <p class="text-gray-400 text-sm font-light">
                Claim Code:
                <span class="font-bold text-black tracking-widest"
                  >SOLHERBARU</span
                >
              </p>
            </div>

            <button
              @click="claimPromo"
              class="w-full bg-black text-white font-bold uppercase tracking-widest text-xs py-4 hover:bg-gray-800 hover:shadow-lg transition-all"
            >
              CLAIM REWARD NOW
            </button>
          </div>
        </div>
      </div>
    </Transition> -->
    <Transition
      enter-active-class="transition ease-out duration-700"
      enter-from-class="opacity-0 scale-95 translate-y-10"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-500"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="showPromoPopup"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
        @click.self="closePopup"
      >
        <div
          class="bg-[#F8F8F8] w-full max-w-3xl flex flex-col md:flex-row relative shadow-2xl overflow-hidden"
        >
          <button
            @click="closePopup"
            class="absolute top-3 right-3 z-10 text-gray-500 hover:text-black transition"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div class="hidden md:block md:w-1/2 relative bg-gray-200">
            <img
              src="../../assets/DSCF5814.jpg"
              alt="Solher Bags"
              class="w-full h-full object-cover"
            />
          </div>

          <div class="w-full md:w-1/2 px-8 py-12 flex flex-col justify-center items-center text-center">
            
            <h4 class="font-bold tracking-[0.2em] text-xs uppercase text-[#333] mb-1">
              S O L H E R
            </h4>
            <p class="text-[9px] tracking-widest text-gray-500 uppercase mb-8">Indonesia</p>

            <h2 class="text-[34px] md:text-[38px] font-extrabold text-[#111] mb-2 tracking-tight whitespace-nowrap">
              GET 25.000 OFF
            </h2>
            <p class="text-base text-gray-800 mb-8 font-serif">
              your first order
            </p>

            <p class="text-[11px] text-[#444] leading-relaxed mb-6 max-w-[240px]">
              Subscribe now and get notified about new launches, and special offers.
            </p>

            <input
              type="email"
              placeholder="Enter your email address."
              class="w-full border border-black bg-white px-4 py-[14px] mb-3 text-xs focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
            />

            <button
              @click="claimPromo"
              class="w-full bg-black text-white font-bold uppercase tracking-widest text-[11px] py-4 hover:bg-gray-800 transition-colors"
            >
              GET 25.000 OFF
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../config/api.js";
import { useProductStore } from "../../composables/useProductStore";

const { state, fetchHomeData } = useProductStore();
const isLoading = ref(false);

// [BARU] State untuk mengontrol Pop-up
// Langsung bernilai 'true' agar tidak ada delay saat halaman dimuat (refresh).
const showPromoPopup = ref(true);

// =========================================================================
// [BARU] CUSTOM DIRECTIVE: v-reveal
// Menggunakan Intersection Observer untuk mendeteksi elemen masuk ke layar
// =========================================================================
const vReveal = {
  mounted: (el) => {
    // State Awal: Transparan dan bergeser ke bawah (4rem / 64px)
    el.classList.add(
      "opacity-0",
      "translate-y-16",
      "transition-all",
      "duration-[1200ms]",
      "ease-out",
    );

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // State Akhir: Tampil sepenuhnya dan kembali ke posisi asli
            el.classList.remove("opacity-0", "translate-y-16");
            el.classList.add("opacity-100", "translate-y-0");

            // Hentikan pantauan agar animasi hanya berjalan satu kali
            observerInstance.unobserve(el);
          }
        });
      },
      {
        // Akan memicu animasi saat 15% bagian elemen sudah masuk ke layar
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(el);
  },
};

const router = useRouter();
// const { state, fetchHomeData } = useProductStore();
// const isLoading = ref(false);

const initData = async () => {
  if (!state.isHomeLoaded) {
    isLoading.value = true;
    await fetchHomeData();
    isLoading.value = false;
  } else {
    fetchHomeData();
  }
};

const navigateToSpecificProduct = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/home/find-product`, {
      params: { query },
    });
    router.push(`/product/${res.data.id}`);
  } catch (err) {
    console.error("Product link broken or not found");
  }
};

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

// [BARU] Fungsi menutup Pop-up
const closePopup = () => {
  showPromoPopup.value = false;
};

// [BARU] Fungsi jika tombol ditekan
// const claimPromo = () => {
//   closePopup();
//   router.push("/register"); // Lempar ke halaman daftar
// };

// [BARU] Fungsi jika tombol "GET 25.000 OFF" ditekan
const claimPromo = () => {
  alert("Success! The promo code has been applied to your account.");
  closePopup();
  router.push("/register"); 
};

onMounted(() => {
  initData();

  // // [BARU] Logika kemunculan Pop-up
  // const hasSeenPromo = localStorage.getItem("solher_promo_seen");
  // const isLoggedIn = localStorage.getItem("token"); // Cek apakah sudah login

  // // Jika belum pernah lihat DAN belum login, munculkan setelah delay 2.5 detik
  // if (!hasSeenPromo && !isLoggedIn) {
  //   setTimeout(() => {
  //     showPromoPopup.value = true;
  //   }, 2500);
  // }

  // LOGIKA POP-UP DI SPA:
  // Karena 'showPromoPopup' diinisialisasi sebagai 'true', pop-up akan 
  // SELALU MUNCUL SECARA INSTAN saat halaman 'Home' dimuat (termasuk saat refresh).
  
  // TAPI, untuk mencegah pop-up muncul lagi saat user balik dari halaman '/collections' 
  // (tanpa refresh), kita bisa memanfaatkan state Pinia/Vuex jika mau. 
  // Namun, untuk solusi paling cepat sesuai permintaan bos (muncul tiap refresh), 
  // kode sederhana ini sudah memenuhi syarat.
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.contain {
  contain: layout paint;
}
</style>
