<!-- <template>
  <section class="w-full bg-white">
    <div
      class="w-full overflow-hidden cursor-pointer"
      @click="navigateToSpecificProduct('ETERNA RED')"
    >
      <img
        src="../../assets/home_firstimage.jpeg"
        alt="SolHer Product"
        class="object-cover w-full h-auto transition-transform duration-1000 hover:scale-105"
      />
    </div>

    <div class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2
        class="mb-6 text-2xl font-medium tracking-tight text-black md:text-3xl"
      >
        Crafted from Premium Selected Leatherty
      </h2>
      <p class="text-sm font-light leading-relaxed text-gray-700 md:text-base">
        Crafted from carefully selected genuine leather, each SolHer piece
        reflects timeless elegance and refined craftsmanship — a seamless blend
        of beauty, quality, and modern sophistication.
      </p>
    </div>

    <div class="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <img
        src="../../assets/DSCF5814.jpg"
        @click="navigateToSpecificProduct('IMPERIAL RED')"
        class="object-cover w-full h-full transition-transform duration-700 cursor-pointer hover:scale-105"
      />
      <img
        src="../../assets/DSCF5186.jpg"
        @click="navigateToSpecificProduct('MAN TANG HONG')"
        class="object-cover w-full h-full transition-transform duration-700 cursor-pointer hover:scale-105"
      />
    </div>

    <div class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2 class="mb-8 text-xl font-medium leading-snug text-black md:text-2xl">
        Embrace the possibilities with <br />go everywhere bags
      </h2>

      <router-link
        to="/collections"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition"
      >
        Shop New Arrival
      </router-link>
    </div>

    <div class="w-full px-6 py-24">
      <div class="mx-auto max-w-[1600px]">
        <h3
          class="mb-10 font-serif text-3xl italic font-light text-gray-800 md:text-4xl"
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
            <div class="w-1/2 h-3 mb-2 bg-gray-200"></div>
            <div class="w-1/4 h-3 bg-gray-200"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeOne"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="mb-4 overflow-hidden bg-gray-100">
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

    <div class="w-full px-6 pb-24">
      <div class="mx-auto max-w-[1600px]">
        <h3
          class="mb-10 font-serif text-3xl italic font-light text-gray-800 md:text-4xl"
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
            <div class="w-1/2 h-3 mb-2 bg-gray-200"></div>
            <div class="w-1/4 h-3 bg-gray-200"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeTwo"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="mb-4 overflow-hidden bg-gray-100">
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
        class="object-cover w-full h-full"
      />
      <div class="absolute inset-0 flex items-end p-8 bg-black/10 md:p-16">
        <h2
          class="max-w-md font-serif text-2xl font-light text-white md:text-5xl"
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
  <section class="w-full bg-white">
    <div
      class="relative w-full overflow-hidden cursor-pointer"
      @click="navigateToSpecificProduct('ETERNA RED')"
    >
      <img
        src="../../assets/home_firstimage.jpeg"
        alt="SolHer Product"
        class="object-cover w-full h-auto transition-transform duration-1000 hover:scale-105"
      />
      <div class="absolute flex items-center gap-3 px-6 py-3 -translate-x-1/2 rounded-full shadow-2xl bottom-10 left-1/2 bg-white/90 backdrop-blur-sm animate-bounce">
        <span class="relative flex w-3 h-3">
          <span class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
          <span class="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
        </span>
        <p class="text-xs font-bold tracking-widest text-black uppercase">Eterna Red is selling fast!</p>
      </div>
    </div>

    <div class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2 class="mb-6 text-2xl font-medium tracking-tight text-black md:text-3xl">
        Crafted from Premium Selected Leatherty
      </h2>
      <p class="text-sm font-light leading-relaxed text-gray-700 md:text-base">
        Crafted from carefully selected genuine leather, each SolHer piece
        reflects timeless elegance and refined craftsmanship — a seamless blend
        of beauty, quality, and modern sophistication.
      </p>
    </div>

    <div class="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <div class="relative overflow-hidden cursor-pointer group" @click="navigateToSpecificProduct('IMPERIAL RED')">
        <img src="../../assets/DSCF5814.jpg" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
        <div class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100">
          <span class="px-6 py-3 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-full">Discover Imperial</span>
        </div>
      </div>
      <div class="relative overflow-hidden cursor-pointer group" @click="navigateToSpecificProduct('MAN TANG HONG')">
        <img src="../../assets/DSCF5186.jpg" class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
        <div class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100">
          <span class="px-6 py-3 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-full">Shop Man Tang</span>
        </div>
      </div>
    </div>

    <div class="max-w-4xl px-6 py-16 mx-auto text-center border-b border-gray-100 md:py-24">
      <h2 class="mb-8 text-xl font-medium leading-snug text-black md:text-2xl">
        Embrace the possibilities with <br />go everywhere bags
      </h2>

      <router-link
        to="/collections"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition"
      >
        Shop New Arrival
      </router-link>
    </div>

    <div v-if="!isLoading && state.trendingProducts?.length > 0" class="w-full px-6 py-20 border-b border-gray-200 bg-gray-50">
      <div class="mx-auto max-w-[1600px]">
        <div class="flex items-end justify-between mb-10">
          <div>
            <h3 class="font-serif text-3xl italic font-light text-red-700 md:text-4xl">
              Trending Now
            </h3>
            <p class="mt-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Our most loved pieces this week</p>
          </div>
          <router-link to="/collections" class="hidden text-xs font-bold tracking-widest underline uppercase transition md:block hover:text-red-600">View All</router-link>
        </div>

        <div class="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.trendingProducts"
            :key="'trend-'+p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[240px] md:w-[300px] cursor-pointer"
          >
            <div class="relative mb-4 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl">
              <img
                :src="p.image"
                class="w-full h-[300px] md:h-[380px] object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
              />
              <div class="absolute top-3 left-3 bg-black text-white px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest">
                Hot
              </div>
            </div>
            <h4 class="text-xs font-bold tracking-widest text-gray-900 uppercase truncate">
              {{ p.name }}
            </h4>
            <div class="flex items-center gap-2 mt-1">
              <p v-if="p.discount_price" class="text-sm font-bold text-red-600">{{ formatPrice(p.discount_price) }}</p>
              <p :class="p.discount_price ? 'text-[10px] text-gray-400 line-through' : 'font-bold text-sm text-gray-600'">
                {{ formatPrice(p.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full px-6 py-24">
      <div class="mx-auto max-w-[1600px]">
        <h3 class="mb-10 font-serif text-3xl italic font-light text-gray-800 md:text-4xl">
          Volume 1 - Goddess Of The Sun
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div v-for="n in 4" :key="n" class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse">
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="w-1/2 h-3 mb-2 bg-gray-200"></div>
            <div class="w-1/4 h-3 bg-gray-200"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeOne"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="relative mb-4 overflow-hidden bg-gray-100">
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

    <div class="w-full px-6 pb-24">
      <div class="mx-auto max-w-[1600px]">
        <h3 class="mb-10 font-serif text-3xl italic font-light text-gray-800 md:text-4xl">
          Volume 2 - The Red Chapter Collection
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div v-for="n in 4" :key="n" class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse">
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="w-1/2 h-3 mb-2 bg-gray-200"></div>
            <div class="w-1/4 h-3 bg-gray-200"></div>
          </div>
        </div>

        <div v-else class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeTwo"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="relative mb-4 overflow-hidden bg-gray-100">
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
        class="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
      />
      <div class="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/60 to-transparent md:p-16">
        <h2 class="max-w-md font-serif text-2xl font-light text-white transition-transform duration-500 translate-y-4 md:text-5xl group-hover:translate-y-0">
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
  <section class="w-full overflow-x-hidden bg-white">
    <div
      v-reveal
      class="relative w-full overflow-hidden cursor-pointer"
      @click="navigateToSpecificProduct('ETERNA RED')"
    >
      <img
        src="../../assets/home_firstimage.jpeg"
        alt="SolHer Product"
        class="object-cover w-full h-auto transition-transform duration-1000 hover:scale-105"
      />
      <div
        class="absolute flex items-center gap-3 px-6 py-3 -translate-x-1/2 rounded-full shadow-2xl bottom-10 left-1/2 bg-white/90 backdrop-blur-sm animate-bounce"
      >
        <span class="relative flex w-3 h-3">
          <span
            class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"
          ></span>
          <span
            class="relative inline-flex w-3 h-3 bg-red-500 rounded-full"
          ></span>
        </span>
        <p class="text-xs font-bold tracking-widest text-black uppercase">
          Eterna Red is selling fast!
        </p>
      </div>
    </div>

    <div v-reveal class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2
        class="mb-6 text-2xl font-medium tracking-tight text-black md:text-3xl"
      >
        Crafted from Premium Selected Leatherty
      </h2>
      <p class="text-sm font-light leading-relaxed text-gray-700 md:text-base">
        Crafted from carefully selected genuine leather, each SolHer piece
        reflects timeless elegance and refined craftsmanship — a seamless blend
        of beauty, quality, and modern sophistication.
      </p>
    </div>

    <!-- <div
      v-reveal
      class="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2"
    >
      <div
        class="relative overflow-hidden cursor-pointer group"
        @click="navigateToSpecificProduct('IMPERIAL RED')"
      >
        <img
          src="../../assets/DSCF5814.jpg"
          class="w-full h-[400px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100"
        >
          <span
            class="px-6 py-3 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-full shadow-lg"
            >Discover Imperial</span
          >
        </div>
      </div>
      <div
        class="relative overflow-hidden cursor-pointer group"
        @click="navigateToSpecificProduct('MAN TANG HONG')"
      >
        <img
          src="../../assets/DSCF5186.jpg"
          class="w-full h-[400px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100"
        >
          <span
            class="px-6 py-3 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-full shadow-lg"
            >Shop Man Tang</span
          >
        </div>
      </div>
    </div> -->

    <div
      v-reveal
      class="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2"
    >
      <div
        class="relative overflow-hidden cursor-pointer group"
        @click="navigateToSpecificProduct('ZAHARA')"
      >
        <img
          src="../../assets/DSCF2648.jpg"
          class="w-full h-[400px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100"
        >
          <span
            class="px-6 py-3 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-full shadow-lg"
            >Discover Zahara</span
          >
        </div>
      </div>

      <div
        class="relative overflow-hidden group"
      >
        <img
          src="../../assets/home_img_2.png"
          class="w-full h-[400px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100"
        >
          <span
            class="px-6 py-3 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-full shadow-lg"
            >Coming Soon</span
          >
        </div>
      </div>
    </div>

    <div
      v-reveal
      class="max-w-4xl px-6 py-16 mx-auto text-center border-b border-gray-100 md:py-24"
    >
      <h2 class="mb-8 text-xl font-medium leading-snug text-black md:text-2xl">
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
      class="w-full px-6 py-20 border-b border-gray-200 bg-gray-50"
    >
      <div class="mx-auto max-w-[1600px]">
        <div class="flex items-end justify-between mb-10">
          <div>
            <h3
              class="font-serif text-3xl italic font-light text-red-700 md:text-4xl"
            >
              Trending Now
            </h3>
            <p
              class="mt-2 text-xs font-bold tracking-widest text-gray-500 uppercase"
            >
              Our most loved pieces this week
            </p>
          </div>
          <router-link
            to="/collections"
            class="hidden text-xs font-bold tracking-widest underline uppercase transition md:block hover:text-red-600"
            >View All</router-link
          >
        </div>

        <div class="flex gap-4 pb-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.trendingProducts"
            :key="'trend-' + p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[240px] md:w-[300px] cursor-pointer"
          >
            <div
              class="relative mb-4 overflow-hidden bg-white border border-gray-100 shadow-sm rounded-xl"
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
              class="text-xs font-bold tracking-widest text-gray-900 uppercase truncate"
            >
              {{ p.name }}
            </h4>
            <div class="flex items-center gap-2 mt-1">
              <p v-if="p.discount_price" class="text-sm font-bold text-red-600">
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

    <div class="w-full px-6 py-24">
      <div class="mx-auto max-w-[1600px]">
        <h3
          v-reveal
          class="mb-10 font-serif text-3xl italic font-light text-gray-800 md:text-4xl"
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
            <div class="w-1/2 h-3 mb-2 bg-gray-200"></div>
            <div class="w-1/4 h-3 bg-gray-200"></div>
          </div>
        </div>

        <div v-else v-reveal class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeOne"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="relative mb-4 overflow-hidden bg-gray-100">
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

    <div class="w-full px-6 pb-24">
      <div class="mx-auto max-w-[1600px]">
        <h3
          v-reveal
          class="mb-10 font-serif text-3xl italic font-light text-gray-800 md:text-4xl"
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
            <div class="w-1/2 h-3 mb-2 bg-gray-200"></div>
            <div class="w-1/4 h-3 bg-gray-200"></div>
          </div>
        </div>

        <div v-else v-reveal class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeTwo"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="relative mb-4 overflow-hidden bg-gray-100">
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

    <div class="w-full px-6 pb-24">
      <div class="mx-auto max-w-[1600px]">
        <h3
          v-reveal
          class="mb-10 font-serif text-3xl italic font-light text-gray-800 md:text-4xl"
        >
          Volume 3 - The Raya Heirloom
        </h3>

        <div v-if="isLoading" class="flex gap-4 overflow-hidden">
          <div
            v-for="n in 4"
            :key="n"
            class="flex-shrink-0 w-[300px] md:w-[380px] animate-pulse"
          >
            <div class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px]"></div>
            <div class="w-1/2 h-3 mb-2 bg-gray-200"></div>
            <div class="w-1/4 h-3 bg-gray-200"></div>
          </div>
        </div>

        <div v-else v-reveal class="flex gap-4 overflow-x-auto scrollbar-hide">
          <div
            v-for="p in state.volumeThree"
            :key="p.id"
            @click="$router.push(`/product/${p.id}`)"
            class="group flex-shrink-0 w-[300px] md:w-[380px] cursor-pointer"
          >
            <div class="relative mb-4 overflow-hidden bg-gray-100">
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

    <div
      v-reveal
      class="relative w-full h-[300px] md:h-[500px] overflow-hidden cursor-pointer group"
      @click="navigateToSpecificProduct('RED CHARM')"
    >
      <img
        src="../../assets/home_lastimage.jpg"
        alt="Premium Materials"
        class="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 flex items-end p-8 bg-gradient-to-t from-black/60 to-transparent md:p-16"
      >
        <h2
          class="max-w-md font-serif text-2xl font-light text-white transition-transform duration-500 translate-y-4 md:text-5xl group-hover:translate-y-0"
        >
          Premium materials and <br />hand-selected finishing touches
        </h2>
      </div>
    </div>
    <!-- <Transition
      enter-active-class="transition duration-700 ease-out"
      enter-from-class="scale-95 translate-y-10 opacity-0"
      enter-to-class="scale-100 translate-y-0 opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
    >
      <div
        v-if="showPromoPopup"
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        @click.self="closePopup"
      >
        <div
          class="relative flex flex-col w-full max-w-4xl overflow-hidden bg-white rounded-sm shadow-2xl md:flex-row"
        >
          <button
            @click="closePopup"
            class="absolute z-10 text-gray-400 transition top-4 right-4 hover:text-black"
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

          <div class="relative hidden bg-gray-100 md:block md:w-1/2">
            <img
              src="../../assets/DSCF5814.jpg"
              alt="Promo Bags"
              class="object-cover w-full h-full"
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
              class="mb-2 text-4xl font-extrabold tracking-tight text-black md:text-5xl"
            >
              GET 25.000 PTS
            </h2>
            <p class="mb-8 font-serif text-lg italic text-gray-600 md:text-xl">
              for your first order
            </p>

            <p class="max-w-xs mb-8 text-xs leading-relaxed text-gray-500">
              Register now and get 25.000 Loyalty Points (worth Rp 25.000)
              automatically applied to your account.
            </p>

            <div
              class="w-full px-4 py-3 mb-4 text-left bg-white border border-gray-300 shadow-inner"
            >
              <p class="text-sm font-light text-gray-400">
                Claim Code:
                <span class="font-bold tracking-widest text-black"
                  >SOLHERBARU</span
                >
              </p>
            </div>

            <button
              @click="claimPromo"
              class="w-full py-4 text-xs font-bold tracking-widest text-white uppercase transition-all bg-black hover:bg-gray-800 hover:shadow-lg"
            >
              CLAIM REWARD NOW
            </button>
          </div>
        </div>
      </div>
    </Transition> -->
    <Transition
      enter-active-class="transition duration-700 ease-out"
      enter-from-class="scale-95 translate-y-10 opacity-0"
      enter-to-class="scale-100 translate-y-0 opacity-100"
      leave-active-class="transition duration-500 ease-in"
      leave-from-class="scale-100 opacity-100"
      leave-to-class="scale-95 opacity-0"
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
            class="absolute z-10 text-gray-500 transition top-3 right-3 hover:text-black"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div class="relative hidden bg-gray-200 md:block md:w-1/2">
            <img
              src="../../assets/DSCF2551.jpg"
              alt="Solher Bags"
              class="object-cover w-full h-full"
            />
          </div>

          <!-- <div class="flex flex-col items-center justify-center w-full px-8 py-12 text-center md:w-1/2">
            
            <h4 class="font-bold tracking-[0.2em] text-xs uppercase text-[#333] mb-1">
              S O L H E R
            </h4>
            <p class="text-[9px] tracking-widest text-gray-500 uppercase mb-8">Indonesia</p>

            <h2 class="text-[34px] md:text-[38px] font-extrabold text-[#111] mb-2 tracking-tight whitespace-nowrap">
              GET 25.000 OFF
            </h2>
            <p class="mb-8 font-serif text-base text-gray-800">
              your first order
            </p>

            <p class="text-[11px] text-[#444] leading-relaxed mb-6 max-w-[240px]">
              Subscribe now and get notified about new launches, and special offers.
            </p>

            <input
              type="email"
              v-model="promoEmail"
              placeholder="Enter your email address."
              class="w-full border border-black bg-white px-4 py-[14px] mb-3 text-xs focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
            />

            <button
              @click="claimPromo"
              class="w-full bg-black text-white font-bold uppercase tracking-widest text-[11px] py-4 hover:bg-gray-800 transition-colors"
            >
              GET 25.000 OFF
            </button>
          </div> -->

          <!-- <div class="flex flex-col items-center justify-center w-full px-8 py-10 text-center md:w-1/2 md:py-12">
            
            <h4 class="font-bold tracking-[0.2em] text-xs uppercase text-[#333] mb-1">
              S O L H E R
            </h4>
            <p class="text-[9px] tracking-widest text-gray-500 uppercase mb-6">Indonesia</p>

            <h2 class="text-[28px] md:text-[34px] font-serif font-bold text-[#111] mb-2 tracking-tight leading-tight">
              ✨ Enjoy <span class="font-extrabold">Rp 250.000 OFF</span><br />Your First Order
            </h2>
            
            <p class="text-[16px] md:text-[18px] text-gray-800 mb-6 font-serif">
              with minimum purchase of <span class="font-bold">Rp 499.000</span> <br/>
            </p>

            <p class="text-[13px] md:text-[14px] font-sans text-[#444] leading-relaxed mb-8 max-w-[280px]">
              Join our inner circle and be the first to access curated drops, private offers, and elevated essentials made just for you.
            </p>

            <div class="w-full max-w-[320px]">
              <input
                type="email"
                v-model="promoEmail"
                placeholder="Enter your email to unlock your offer…"
                class="w-full border border-black bg-white px-4 py-[14px] mb-3 text-[13px] font-sans focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
              />

              <button
                @click="claimPromo"
                class="w-full bg-black text-white font-bold uppercase tracking-widest text-[14px] md:text-[15px] py-4 hover:bg-gray-800 transition-colors shadow-md"
              >
                Claim My Rp 250.000 OFF
              </button>

              <p class="text-[11px] md:text-[12px] font-sans text-gray-500 mt-3 opacity-70">
                No spam. Only the good stuff.
              </p>
            </div>
          </div> -->

          <div class="flex flex-col items-center justify-center w-full px-6 py-8 overflow-y-auto text-center md:px-8 md:py-10 md:w-1/2 custom-scrollbar">
            
            <img 
              src="../../assets/solherbrandbook.png" 
              alt="Solher Logo" 
              class="object-contain h-5 mb-8 md:h-6 opacity-90"
            />

            <h2 class="text-[28px] md:text-[32px] font-serif font-bold text-[#111] mb-3 tracking-tight leading-snug">
              ✨ Enjoy <br />
              <span class="font-extrabold whitespace-nowrap">Rp 250.000 OFF</span><br />
              Your First Order
            </h2>
            
            <p class="text-[15px] md:text-[16px] text-gray-800 mb-5 font-serif">
              with minimum purchase of <span class="font-bold whitespace-nowrap">Rp 499.000</span> <br/>
              <!-- <span class="text-sm font-bold text-red-600">(Up to 50% OFF)</span> -->
            </p>

            <p class="text-[12px] md:text-[13px] font-sans text-[#444] leading-relaxed mb-6 max-w-[280px]">
              Join our inner circle and be the first to access curated drops, private offers, and elevated essentials made just for you.
            </p>

            <div class="w-full max-w-[320px]">
              <input
                type="email"
                v-model="promoEmail"
                placeholder="Enter your email to unlock your offer…"
                class="w-full border border-black bg-white px-4 py-[12px] mb-3 text-[13px] font-sans focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
              />

              <button
                @click="claimPromo"
                class="w-full bg-black text-white font-bold uppercase tracking-widest text-[13px] md:text-[14px] py-3.5 hover:bg-gray-800 transition-colors shadow-md"
              >
                Claim My Rp 250.000 OFF
              </button>

              <p class="text-[11px] font-sans text-gray-500 mt-3 opacity-70">
                No spam. Only the good stuff.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../config/api.js";
import { useProductStore } from "../../composables/useProductStore";
import Swal from "sweetalert2";

const { state, fetchHomeData } = useProductStore();
const isLoading = ref(false);

// Tambahkan 2 state baru di bawah isLoading
const promoEmail = ref("");
const isClaimingPromo = ref(false);

// [BARU] State untuk mengontrol Pop-up
// Langsung bernilai 'true' agar tidak ada delay saat halaman dimuat (refresh).
// const showPromoPopup = ref(true);
const showPromoPopup = ref(false);

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
// const claimPromo = () => {
//   alert("Success! The promo code has been applied to your account.");
//   closePopup();
//   router.push("/register"); 
// };

// Ubah fungsi claimPromo Anda menjadi ini:
// const claimPromo = async () => {
//   if (!promoEmail.value) {
//     return Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Please enter your email', showConfirmButton: false, timer: 3000 });
//   }

//   isClaimingPromo.value = true;
//   try {
//     const res = await axios.post(`${BASE_URL}/promo/claim`, { email: promoEmail.value });
    
//     Swal.fire({
//       icon: 'success',
//       title: 'Promo Claimed!',
//       text: `Your promo code is ${res.data.promo_code}. You can use it at checkout!`,
//       confirmButtonColor: '#000'
//     });
    
//     closePopup();
    
//     // Jika belum login, tawarkan untuk ke halaman register
//     const isLoggedIn = localStorage.getItem("token");
//     if (!isLoggedIn) {
//       router.push("/register"); 
//     }
//   } catch (error) {
//     Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: error.response?.data?.message || 'Failed to claim promo', showConfirmButton: false, timer: 4000 });
//   } finally {
//     isClaimingPromo.value = false;
//   }
// };

const claimPromo = async () => {
  if (!promoEmail.value) {
    return Swal.fire({ toast: true, position: 'top-end', icon: 'warning', title: 'Please enter your email', showConfirmButton: false, timer: 3000 });
  }

  isClaimingPromo.value = true;
  try {
    const res = await axios.post(`${BASE_URL}/promo/claim`, { email: promoEmail.value });
    
    // [PERBAIKAN] Ubah pesan untuk mengarahkan user mengecek email
    Swal.fire({
      icon: 'success',
      title: 'Promo Claimed!',
      text: `We've sent the exclusive promo code to ${promoEmail.value}. Check your inbox or spam folder!`,
      confirmButtonColor: '#000'
    });
    
    closePopup();
    
    // Jika belum login, tawarkan untuk ke halaman register
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      router.push("/register"); 
    }
  } catch (error) {
    Swal.fire({ toast: true, position: 'top-end', icon: 'error', title: error.response?.data?.message || 'Failed to claim promo', showConfirmButton: false, timer: 4000 });
  } finally {
    isClaimingPromo.value = false;
  }
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

  // Memicu animasi pop-up dengan sangat cepat (seakan-akan tanpa delay)
  // tapi memberikan cukup waktu bagi browser untuk memutar animasi transisi.
  nextTick(() => {
    setTimeout(() => {
      showPromoPopup.value = true;
    }, 50); // Delay 50 milidetik (0.05 detik), sangat cepat tapi animasi tetap jalan
  });
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
