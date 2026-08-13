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
            @click="$router.push(`/products/${p.id}`)"
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
            @click="$router.push(`/products/${p.id}`)"
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
    router.push(`/products/${res.data.id}`);
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
            @click="$router.push(`/products/${p.id}`)"
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
            @click="$router.push(`/products/${p.id}`)"
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
            @click="$router.push(`/products/${p.id}`)"
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
    router.push(`/products/${res.data.id}`);
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

<!-- <template>
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
          <span class="relative inline-flex w-3 h-3 bg-red-500 rounded-full"></span>
        </span>
        <p class="text-xs font-bold tracking-widest text-black uppercase">
          Eterna Red is selling fast!
        </p>
      </div>
    </div>

    <div v-reveal class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2 class="mb-6 text-2xl font-medium tracking-tight text-black md:text-3xl">
        Crafted from Premium Selected Leatherty
      </h2>
      <p class="text-sm font-light leading-relaxed text-gray-700 md:text-base">
        Crafted from carefully selected genuine leather, each SolHer piece reflects
        timeless elegance and refined craftsmanship — a seamless blend of beauty, quality,
        and modern sophistication.
      </p>
    </div>

    <div v-reveal class="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2">
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

      <div class="relative overflow-hidden group">
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
        Shop Now
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
            <h3 class="font-serif text-3xl italic font-light text-red-700 md:text-4xl">
              Trending Now
            </h3>
            <p class="mt-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
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
            @click="$router.push(`/products/${p.id}`)"
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
            @click="$router.push(`/products/${p.id}`)"
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
            @click="$router.push(`/products/${p.id}`)"
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
            @click="$router.push(`/products/${p.id}`)"
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
          class="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row"
        >
          <button
            @click="closePopup"
            class="absolute z-10 text-gray-500 transition top-3 right-3 hover:text-black"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div class="relative hidden bg-gray-200 md:block md:w-1/2">
            <img
              src="../../assets/DSCF2551.jpg"
              alt="Solher Bags"
              class="object-cover w-full h-full"
            />
          </div>

          <div
            class="flex flex-col items-center justify-center w-full px-6 py-8 overflow-y-auto text-center md:px-8 md:py-10 md:w-1/2 custom-scrollbar"
          >
            <img
              src="../../assets/solherbrandbook.png"
              alt="Solher Logo"
              class="object-contain h-8 mb-8 md:h-10 opacity-90"
            />

            <h2
              class="text-[28px] md:text-[34px] font-serif text-[#111] mb-4 tracking-tight leading-tight"
            >
              <span class="font-bold">✨ Enjoy</span> <br />
              <span class="font-extrabold whitespace-nowrap"
                >Rp&nbsp;250.000&nbsp;OFF</span
              ><br />
              <span class="font-bold">Your First Order</span>
            </h2>

            <p class="text-[15px] md:text-[16px] text-gray-800 mb-6 font-serif">
              with minimum purchase of
              <span class="font-bold whitespace-nowrap">Rp&nbsp;499.000</span>
            </p>

            <p
              class="text-[12px] md:text-[13px] font-sans text-[#444] leading-relaxed mb-6 max-w-[280px]"
            >
              Join our inner circle and be the first to access curated drops, private
              offers, and elevated essentials made just for you.
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
                class="w-full bg-black text-white font-bold uppercase tracking-widest text-[13px] md:text-[14px] py-4 hover:bg-gray-800 transition-colors shadow-md"
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
      "ease-out"
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
      }
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
    router.push(`/products/${res.data.id}`);
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
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Please enter your email",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  isClaimingPromo.value = true;
  try {
    const res = await axios.post(`${BASE_URL}/promo/claim`, {
      email: promoEmail.value,
    });

    // [PERBAIKAN] Ubah pesan untuk mengarahkan user mengecek email
    Swal.fire({
      icon: "success",
      title: "Promo Claimed!",
      text: `We've sent the exclusive promo code to ${promoEmail.value}. Check your inbox or spam folder!`,
      confirmButtonColor: "#000",
    });

    closePopup();

    // Jika belum login, tawarkan untuk ke halaman register
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      router.push("/register");
    }
  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: error.response?.data?.message || "Failed to claim promo",
      showConfirmButton: false,
      timer: 4000,
    });
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
</style> -->

<!--
<template>
  <section class="w-full overflow-x-hidden bg-white">
    <div
      v-reveal
      class="relative w-full max-w-[1600px] mx-auto aspect-[2/1] overflow-hidden cursor-pointer bg-gray-100 mt-[20px]"
      @click="$router.push('/collections')"
    >
      <Transition name="banner-fade">
        <img
          :key="currentBanner"
          :src="currentBanner"
          alt="SolHer Product"
          class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 hover:scale-105"
        />
      </Transition>
    </div>

    <div v-reveal class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2 class="mb-6 text-2xl font-bold tracking-tight text-black md:text-3xl">
        {{ $t("home.title_one") }}
      </h2>
      <p class="text-sm font-light leading-relaxed text-gray-700 md:text-base">
        {{ $t("home.description_one") }}
      </p>
    </div>

    <div v-reveal class="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <div
        class="relative overflow-hidden cursor-pointer group"
        @click="navigateToSpecificProduct('ZAHARA MOCCA')"
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
            >{{ $t("home.discover_product_one") }}</span
          >
        </div>
      </div>

      <div class="relative overflow-hidden group">
        <img
          src="../../assets/DSCF7586.jpg"
          class="w-full h-[400px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100"
        >
          <span
            class="px-6 py-3 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-full shadow-lg"
            >{{ $t("home.coming_soon") }}</span
          >
        </div>
      </div>
    </div>

    <div
      v-reveal
      class="max-w-4xl px-6 py-16 mx-auto text-center border-b border-gray-100 md:py-24"
    >
      <h2 class="mb-8 text-xl font-medium leading-snug text-black md:text-2xl">
        {{ $t("home.title_two_first") }} <br />{{ $t("home.title_two_two") }}
      </h2>

      <router-link
        to="/collections"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition shadow-xl"
      >
        {{ $t("home.shop_now_btn") }}
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
            <h3 class="font-serif text-3xl italic font-light text-red-700 md:text-4xl">
              Trending Now
            </h3>
            <p class="mt-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
              <template v-if="getDiscountStatus(p).active">
                <p class="text-sm font-bold text-red-600 md:text-base">
                  {{ formatPrice(p.discount_price) }}
                </p>
                <p class="text-xs text-gray-400 line-through md:text-sm">
                  {{ formatPrice(p.price) }}
                </p>
              </template>
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
          Volume 4 - In Between Us
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
            v-for="p in state.volumeFour"
            :key="p.id"
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
          {{ $t("home.cta_section_one") }} <br />{{ $t("home.cta_section_two") }}
        </h2>
      </div>
    </div>

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
          class="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row"
        >
          <button
            @click="closePopup"
            class="absolute z-10 text-gray-500 transition top-3 right-3 hover:text-black"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div class="relative hidden bg-gray-200 md:block md:w-1/2">
            <img
              src="../../assets/DSCF2551.jpg"
              alt="Solher Bags"
              class="object-cover w-full h-full"
            />
          </div>

          <div
            class="flex flex-col items-center justify-center w-full px-6 py-8 overflow-y-auto text-center md:px-8 md:py-10 md:w-1/2 custom-scrollbar"
          >
            <img
              src="../../assets/solherbrandbook.png"
              alt="Solher Logo"
              class="object-contain h-8 mb-8 md:h-10 opacity-90"
            />

            <h2
              class="text-[28px] md:text-[34px] font-serif text-[#111] mb-4 tracking-tight leading-tight"
            >
              <span class="font-bold">{{ $t("home.popup_first_cta") }}</span> <br />
              <span class="font-extrabold whitespace-nowrap"
                >{{ $t("home.popup_price_section_one") }}&nbsp;{{
                  $t("home.popup_price_section_two")
                }}&nbsp;{{ $t("home.popup_price_section_three") }}</span
              ><br />
              <span class="font-bold">{{ $t("home.popup_second_cta") }}</span>
            </h2>

            <p class="text-[15px] md:text-[16px] text-gray-800 mb-6 font-serif">
              {{ $t("home.popup_second_cta_section_two") }}
              <span class="font-bold whitespace-nowrap"
                >{{ $t("home.popup_minimum_price_first_section") }}&nbsp;{{
                  $t("home.popup_minimum_price_second_section")
                }}</span
              >
            </p>

            <p
              class="text-[12px] md:text-[13px] font-sans text-[#444] leading-relaxed mb-6 max-w-[280px]"
            >
              {{ $t("home.popup_third_cta") }}
            </p>

            <div class="w-full max-w-[320px]">
              <input
                type="email"
                v-model="promoEmail"
                :placeholder="$t('home.popup_enter_email')"
                class="w-full border border-black bg-white px-4 py-[14px] mb-3 text-[13px] font-sans focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
              />

              <button
                @click="claimPromo"
                class="w-full bg-black text-white font-bold uppercase tracking-widest text-[13px] md:text-[14px] py-4 hover:bg-gray-800 transition-colors shadow-md"
              >
                {{ $t("home.popup_claim_btn") }}
              </button>

              <p class="text-[11px] font-sans text-gray-500 mt-3 opacity-70">
                {{ $t("home.popup_fourth_cta") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../config/api.js";
import { useProductStore } from "../../composables/useProductStore";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

import banner1 from "../../assets/first_banner.png";
import banner2 from "../../assets/second_banner.png";

import { formatPrice } from "../../utils/currency";

// [BARU] Logika Auto-Slide Banner
const banners = [banner1, banner2];
const currentBannerIndex = ref(0);
const currentBanner = computed(() => banners[currentBannerIndex.value]);
let slideInterval = null;

const { state, fetchHomeData } = useProductStore();
const isLoading = ref(false);

// const banners = [banner1, banner2];
// const currentBanner = ref(banners[Math.floor(Math.random() * banners.length)]);

const promoEmail = ref("");
const isClaimingPromo = ref(false);

const showPromoPopup = ref(false);
const { t } = useI18n();

// =========================================================================
// CUSTOM DIRECTIVE: v-reveal
// Menggunakan Intersection Observer untuk mendeteksi elemen masuk ke layar
// =========================================================================
const vReveal = {
  mounted: (el) => {
    el.classList.add(
      "opacity-0",
      "translate-y-16",
      "transition-all",
      "duration-[1200ms]",
      "ease-out"
    );

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove("opacity-0", "translate-y-16");
            el.classList.add("opacity-100", "translate-y-0");

            observerInstance.unobserve(el);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
  },
};

const router = useRouter();

const initData = async () => {
  if (!state.isHomeLoaded) {
    isLoading.value = true;
    await fetchHomeData();
    isLoading.value = false;
  } else {
    fetchHomeData();
  }
};

// const navigateToSpecificProduct = async (query) => {
//   try {
//     const res = await axios.get(`${BASE_URL}/home/find-product`, {
//       params: { query },
//     });
//     router.push(`/products/${res.data.id}`);
//   } catch (err) {
//     console.error("Product link broken or not found");
//   }
// };

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

const navigateToSpecificProduct = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/home/find-product`, {
      params: { query },
    });
    // [PERBAIKAN] Gunakan slug sebagai prioritas URL
    router.push(`/products/${res.data.slug || res.data.id}`);
  } catch (err) {
    console.error("Product link broken or not found");
  }
};

// const formatPrice = (value) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(value);

const closePopup = () => {
  showPromoPopup.value = false;
};

const claimPromo = async () => {
  if (!promoEmail.value) {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Please enter your email",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  isClaimingPromo.value = true;
  try {
    const res = await axios.post(`${BASE_URL}/promo/claim`, {
      email: promoEmail.value,
    });

    Swal.fire({
      icon: "success",
      title: "Promo Claimed!",
      text: `We've sent the exclusive promo code to ${promoEmail.value}. Check your inbox or spam folder!`,
      confirmButtonColor: "#000",
    });

    closePopup();

    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      router.push("/register");
    }
  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: error.response?.data?.message || "Failed to claim promo",
      showConfirmButton: false,
      timer: 4000,
    });
  } finally {
    isClaimingPromo.value = false;
  }
};

onMounted(() => {
  initData();

  // Jalankan auto-slide setiap 4000 milidetik (4 detik)
  slideInterval = setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.length;
  }, 4000);

  nextTick(() => {
    setTimeout(() => {
      showPromoPopup.value = true;
    }, 50);
  });
});

// Bersihkan interval saat user pindah halaman agar memori browser tidak bocor (Best Practice)
onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
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

/* [BARU] Transisi halus untuk auto-slide banner */
.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0;
}
</style> -->

<!-- <template>
  <section class="w-full overflow-x-hidden bg-white">
    <div
      v-reveal
      class="relative w-full max-w-[1600px] mx-auto aspect-[2/1] overflow-hidden cursor-pointer bg-gray-100 mt-[20px]"
      @click="$router.push('/collections')"
    >
      <Transition name="banner-fade">
        <img
          :key="currentBanner"
          :src="currentBanner"
          alt="SolHer Product"
          class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 hover:scale-105"
        />
      </Transition>
    </div>

    <div v-reveal class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2 class="mb-6 text-2xl font-bold tracking-tight text-black md:text-3xl">
        {{ $t("home.title_one") }}
      </h2>
      <p class="text-sm font-light leading-relaxed text-gray-700 md:text-base">
        {{ $t("home.description_one") }}
      </p>
    </div>

    <div v-reveal class="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <div
        class="relative overflow-hidden cursor-pointer group"
        @click="navigateToSpecificProduct('ZAHARA MOCCA')"
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
            >{{ $t("home.discover_product_one") }}</span
          >
        </div>
      </div>

      <div class="relative overflow-hidden group">
        <img
          src="../../assets/DSCF7586.jpg"
          class="w-full h-[400px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100"
        >
          <span
            class="px-6 py-3 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-full shadow-lg"
            >{{ $t("home.coming_soon") }}</span
          >
        </div>
      </div>
    </div>

    <div
      v-reveal
      class="max-w-4xl px-6 py-16 mx-auto text-center border-b border-gray-100 md:py-24"
    >
      <h2 class="mb-8 text-xl font-medium leading-snug text-black md:text-2xl">
        {{ $t("home.title_two_first") }} <br />{{ $t("home.title_two_two") }}
      </h2>

      <router-link
        to="/collections"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition shadow-xl"
      >
        {{ $t("home.shop_now_btn") }}
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
            <h3 class="font-serif text-3xl italic font-light text-red-700 md:text-4xl">
              Trending Now
            </h3>
            <p class="mt-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
              <p
                :class="
                  p.discount_price
                    ? 'text-[10px] text-gray-400 line-through'
                    : 'font-bold text-sm text-gray-600'
                "
              >
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
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
          Volume 4 - In Between Us
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
            v-for="p in state.volumeFour"
            :key="p.id"
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
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
          Leather Belt
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
            v-for="p in state.leatherBelt"
            :key="p.id"
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
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
          {{ $t("home.cta_section_one") }} <br />{{ $t("home.cta_section_two") }}
        </h2>
      </div>
    </div>

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
          class="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row"
        >
          <button
            @click="closePopup"
            class="absolute z-10 text-gray-500 transition top-3 right-3 hover:text-black"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div class="relative hidden bg-gray-200 md:block md:w-1/2">
            <img
              src="../../assets/DSCF2551.jpg"
              alt="Solher Bags"
              class="object-cover w-full h-full"
            />
          </div>

          <div
            class="flex flex-col items-center justify-center w-full px-6 py-8 overflow-y-auto text-center md:px-8 md:py-10 md:w-1/2 custom-scrollbar"
          >
            <img
              src="../../assets/solherbrandbook.png"
              alt="Solher Logo"
              class="object-contain h-8 mb-8 md:h-10 opacity-90"
            />

            <h2
              class="text-[28px] md:text-[34px] font-serif text-[#111] mb-4 tracking-tight leading-tight"
            >
              <span class="font-bold">{{ $t("home.popup_first_cta") }}</span> <br />
              <span class="font-extrabold whitespace-nowrap"
                >{{ $t("home.popup_price_section_one") }}&nbsp;{{
                  $t("home.popup_price_section_two")
                }}&nbsp;{{ $t("home.popup_price_section_three") }}</span
              ><br />
              <span class="font-bold">{{ $t("home.popup_second_cta") }}</span>
            </h2>

            <p class="text-[15px] md:text-[16px] text-gray-800 mb-6 font-serif">
              {{ $t("home.popup_second_cta_section_two") }}
              <span class="font-bold whitespace-nowrap"
                >{{ $t("home.popup_minimum_price_first_section") }}&nbsp;{{
                  $t("home.popup_minimum_price_second_section")
                }}</span
              >
            </p>

            <p
              class="text-[12px] md:text-[13px] font-sans text-[#444] leading-relaxed mb-6 max-w-[280px]"
            >
              {{ $t("home.popup_third_cta") }}
            </p>

            <div class="w-full max-w-[320px]">
              <input
                type="email"
                v-model="promoEmail"
                :placeholder="$t('home.popup_enter_email')"
                class="w-full border border-black bg-white px-4 py-[14px] mb-3 text-[13px] font-sans focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
              />

              <button
                @click="claimPromo"
                class="w-full bg-black text-white font-bold uppercase tracking-widest text-[13px] md:text-[14px] py-4 hover:bg-gray-800 transition-colors shadow-md"
              >
                {{ $t("home.popup_claim_btn") }}
              </button>

              <p class="text-[11px] font-sans text-gray-500 mt-3 opacity-70">
                {{ $t("home.popup_fourth_cta") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../config/api.js";
import { useProductStore } from "../../composables/useProductStore";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

import banner1 from "../../assets/first_banner.png";
import banner2 from "../../assets/second_banner.png";

import { formatPrice } from "../../utils/currency";

const banners = [banner1, banner2];
const currentBannerIndex = ref(0);
const currentBanner = computed(() => banners[currentBannerIndex.value]);
let slideInterval = null;

const { state, fetchHomeData } = useProductStore();
const isLoading = ref(false);

const promoEmail = ref("");
const isClaimingPromo = ref(false);

const showPromoPopup = ref(false);
const { t } = useI18n();

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

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// const getDiscountStatus = (p) => {
//   if (!p || !p.discount_price) return { active: false, upcoming: false, expired: false };

//   // Waktu perangkat lokal pengguna saat membuka web
//   const now = new Date();
//   let active = true;
//   let upcoming = false;
//   let expired = false;

//   if (p.discount_start_date) {
//     const startDate = convertToWIB(p.discount_start_date);
//     if (now < startDate) {
//       active = false;
//       upcoming = true;
//     }
//   }
//   if (p.discount_end_date) {
//     const endDate = convertToWIB(p.discount_end_date);
//     if (now > endDate) {
//       active = false;
//       expired = true;
//     }
//   }

//   return { active, upcoming, expired };
// };

const getDiscountStatus = (p) => {
  // 👇 PERBAIKAN 1: Gunakan helper multi-currency untuk mengecek diskon
  const discObj = getDiscountToDisplay(p);

  if (!p || !discObj || !discObj.value) {
    return { active: false, upcoming: false, expired: false };
  }

  const now = new Date();
  let active = true;
  let upcoming = false;
  let expired = false;

  // 👇 PERBAIKAN 2: Gunakan convertToWIB agar akurat
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

// Mengambil harga dasar sesuai mata uang
const getPriceToDisplay = (product) => {
  if (!product) return { value: 0, curr: "IDR" };
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

// Mengambil harga diskon sesuai mata uang
const getDiscountToDisplay = (product) => {
  if (!product) return null;
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

// Memformat angka menjadi string (Misal: 10 => $10.00)
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

// Menghitung persentase diskon dinamis
const calculateDynamicDiscount = (product) => {
  const priceObj = getPriceToDisplay(product);
  const discObj = getDiscountToDisplay(product);
  if (!priceObj || !discObj) return 0;

  return Math.round(((priceObj.value - discObj.value) / priceObj.value) * 100);
};

// Anda juga harus mengubah currentActivePrice agar membaca harga dinamis (penting untuk analytics)
const currentActivePrice = computed(() => {
  if (!product.value) return 0;
  if (product.value.discount_price && getDiscountStatus(product.value).active) {
    const discObj = getDiscountToDisplay(product.value);
    return discObj ? discObj.value : 0;
  }
  const priceObj = getPriceToDisplay(product.value);
  return priceObj ? priceObj.value : 0;
});

const vReveal = {
  mounted: (el) => {
    el.classList.add(
      "opacity-0",
      "translate-y-16",
      "transition-all",
      "duration-[1200ms]",
      "ease-out"
    );

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove("opacity-0", "translate-y-16");
            el.classList.add("opacity-100", "translate-y-0");

            observerInstance.unobserve(el);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
  },
};

const router = useRouter();

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
    router.push(`/products/${res.data.slug || res.data.id}`);
  } catch (err) {
    console.error("Product link broken or not found");
  }
};

const closePopup = () => {
  showPromoPopup.value = false;
};

const claimPromo = async () => {
  if (!promoEmail.value) {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Please enter your email",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  isClaimingPromo.value = true;
  try {
    const res = await axios.post(`${BASE_URL}/promo/claim`, {
      email: promoEmail.value,
    });

    Swal.fire({
      icon: "success",
      title: "Promo Claimed!",
      text: `We've sent the exclusive promo code to ${promoEmail.value}. Check your inbox or spam folder!`,
      confirmButtonColor: "#000",
    });

    closePopup();

    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      router.push("/register");
    }
  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: error.response?.data?.message || "Failed to claim promo",
      showConfirmButton: false,
      timer: 4000,
    });
  } finally {
    isClaimingPromo.value = false;
  }
};

onMounted(() => {
  initData();

  slideInterval = setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.length;
  }, 4000);

  nextTick(() => {
    setTimeout(() => {
      showPromoPopup.value = true;
    }, 50);
  });

  // Dengarkan perubahan mata uang
  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
  window.removeEventListener("currency-changed", updateCurrencyState);
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

.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0;
}
</style> -->

<!-- <template>
  <section class="w-full overflow-x-hidden bg-white">
    <div
      v-reveal
      class="relative w-full max-w-[1600px] mx-auto aspect-[2/1] overflow-hidden cursor-pointer bg-gray-100 mt-[20px]"
      @click="$router.push('/collections')"
    >
      <Transition name="banner-fade">
        <img
          :key="currentBanner"
          :src="currentBanner"
          alt="SolHer Product"
          class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 hover:scale-105"
        />
      </Transition>
    </div>

    <div v-reveal class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2 class="mb-6 text-2xl font-bold tracking-tight text-black md:text-3xl">
        {{ $t("home.title_one") }}
      </h2>
      <p class="text-sm font-light leading-relaxed text-gray-700 md:text-base">
        {{ $t("home.description_one") }}
      </p>
    </div>

    <div v-reveal class="grid w-full grid-cols-1 overflow-hidden md:grid-cols-2">
      <div
        class="relative overflow-hidden cursor-pointer group"
        @click="navigateToSpecificProduct('ZAHARA MOCCA')"
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
            >{{ $t("home.discover_product_one") }}</span
          >
        </div>
      </div>

      <div class="relative overflow-hidden group">
        <img
          src="../../assets/DSCF7586.jpg"
          class="w-full h-[400px] md:h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div
          class="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/20 group-hover:opacity-100"
        >
          <span
            class="px-6 py-3 text-xs font-bold tracking-widest text-black uppercase bg-white rounded-full shadow-lg"
            >{{ $t("home.coming_soon") }}</span
          >
        </div>
      </div>
    </div>

    <div
      v-reveal
      class="max-w-4xl px-6 py-16 mx-auto text-center border-b border-gray-100 md:py-24"
    >
      <h2 class="mb-8 text-xl font-medium leading-snug text-black md:text-2xl">
        {{ $t("home.title_two_first") }} <br />{{ $t("home.title_two_two") }}
      </h2>

      <router-link
        to="/collections"
        class="inline-block bg-[#1A1A1A] hover:bg-black px-10 py-4 font-semibold text-white text-xs uppercase tracking-[0.2em] transition shadow-xl"
      >
        {{ $t("home.shop_now_btn") }}
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
            <h3 class="font-serif text-3xl italic font-light text-red-700 md:text-4xl">
              Trending Now
            </h3>
            <p class="mt-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
              <p
                :class="
                  p.discount_price
                    ? 'text-[10px] text-gray-400 line-through'
                    : 'font-bold text-sm text-gray-600'
                "
              >
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
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
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
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
          Volume 4 - In Between Us
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
            v-for="p in state.volumeFour"
            :key="p.id"
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
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
          Leather Belt
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
            v-for="p in state.leatherBelt"
            :key="p.id"
            @click="$router.push(`/products/${p.slug || p.id}`)"
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
            <div v-if="getDiscountStatus(p).active">
              <p class="text-sm font-bold text-red-600 md:text-base">
                {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
              </p>
            </div>
            <div v-else>
              <p class="font-medium text-black">
                {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="publicReviews.length > 0"
      class="w-full px-6 py-24 bg-[#FAFAFA] border-t border-gray-100"
    >
      <div class="mx-auto max-w-[1600px]">
        <div v-reveal class="flex flex-col items-center justify-center mb-12 text-center">
          <h3
            class="mb-4 font-serif text-3xl italic font-light text-gray-800 md:text-4xl"
          >
            Loved By Our Clients
          </h3>
          <p class="text-xs font-bold tracking-widest text-gray-500 uppercase">
            Discover what they say about our premium pieces
          </p>
        </div>

        <div v-if="isLoadingReviews" class="flex justify-center w-full">
          <div
            class="w-8 h-8 border-4 border-gray-300 rounded-full border-t-black animate-spin"
          ></div>
        </div>

        <div
          v-else
          v-reveal
          class="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          <div
            v-for="review in publicReviews"
            :key="'rev-' + review.id"
            class="flex-shrink-0 w-[300px] md:w-[380px] p-8 bg-white border border-gray-100 shadow-sm snap-center rounded-xl flex flex-col justify-between"
          >
            <div>
              <div class="flex items-center gap-1 mb-4 text-yellow-400">
                <svg
                  v-for="i in 5"
                  :key="i"
                  :class="
                    i <= review.rating ? 'fill-current' : 'text-gray-200 fill-current'
                  "
                  class="w-4 h-4"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p
                class="mb-6 text-sm italic font-light leading-relaxed text-gray-700 line-clamp-4"
              >
                "{{ review.comment }}"
              </p>

              <div
                v-if="review.images && review.images.length > 0"
                class="flex gap-2 mb-6"
              >
                <img
                  v-for="(img, index) in review.images.slice(0, 3)"
                  :key="index"
                  :src="img"
                  class="object-cover w-12 h-12 border border-gray-200 rounded-md cursor-pointer hover:opacity-80"
                  alt="Review picture"
                />
              </div>
            </div>

            <div class="flex items-center gap-3 pt-4 border-t border-gray-100">
              <div
                class="flex items-center justify-center w-10 h-10 font-serif text-lg font-bold text-gray-800 bg-gray-100 rounded-full"
              >
                {{
                  review.user?.first_name ? review.user.first_name.charAt(0).toUpperCase() : "S"
                }}
              </div>
              <div class="flex-1 overflow-hidden">
                <p class="text-xs font-bold text-gray-900 uppercase truncate">
                  {{ review.user?.first_name || "Verified Buyer" }}
                </p>
                <p class="text-[10px] text-gray-500 truncate mt-0.5">
                  Purchased:
                  <span
                    class="font-medium text-gray-700 cursor-pointer hover:underline"
                    @click="$router.push(`/products/${review.product?.slug}`)"
                    >{{ review.product?.name }}</span
                  >
                </p>
              </div>
            </div>
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
          {{ $t("home.cta_section_one") }} <br />{{ $t("home.cta_section_two") }}
        </h2>
      </div>
    </div>

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
          class="relative flex flex-col w-full max-w-3xl overflow-hidden bg-white shadow-2xl md:flex-row"
        >
          <button
            @click="closePopup"
            class="absolute z-10 text-gray-500 transition top-3 right-3 hover:text-black"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div class="relative hidden bg-gray-200 md:block md:w-1/2">
            <img
              src="../../assets/DSCF2551.jpg"
              alt="Solher Bags"
              class="object-cover w-full h-full"
            />
          </div>

          <div
            class="flex flex-col items-center justify-center w-full px-6 py-8 overflow-y-auto text-center md:px-8 md:py-10 md:w-1/2 custom-scrollbar"
          >
            <img
              src="../../assets/solherbrandbook.png"
              alt="Solher Logo"
              class="object-contain h-8 mb-8 md:h-10 opacity-90"
            />

            <h2
              class="text-[28px] md:text-[34px] font-serif text-[#111] mb-4 tracking-tight leading-tight"
            >
              <span class="font-bold">{{ $t("home.popup_first_cta") }}</span> <br />
              <span class="font-extrabold whitespace-nowrap"
                >{{ $t("home.popup_price_section_one") }}&nbsp;{{
                  $t("home.popup_price_section_two")
                }}&nbsp;{{ $t("home.popup_price_section_three") }}</span
              ><br />
              <span class="font-bold">{{ $t("home.popup_second_cta") }}</span>
            </h2>

            <p class="text-[15px] md:text-[16px] text-gray-800 mb-6 font-serif">
              {{ $t("home.popup_second_cta_section_two") }}
              <span class="font-bold whitespace-nowrap"
                >{{ $t("home.popup_minimum_price_first_section") }}&nbsp;{{
                  $t("home.popup_minimum_price_second_section")
                }}</span
              >
            </p>

            <p
              class="text-[12px] md:text-[13px] font-sans text-[#444] leading-relaxed mb-6 max-w-[280px]"
            >
              {{ $t("home.popup_third_cta") }}
            </p>

            <div class="w-full max-w-[320px]">
              <input
                type="email"
                v-model="promoEmail"
                :placeholder="$t('home.popup_enter_email')"
                class="w-full border border-black bg-white px-4 py-[14px] mb-3 text-[13px] font-sans focus:outline-none focus:ring-1 focus:ring-black placeholder-gray-400"
              />

              <button
                @click="claimPromo"
                class="w-full bg-black text-white font-bold uppercase tracking-widest text-[13px] md:text-[14px] py-4 hover:bg-gray-800 transition-colors shadow-md"
              >
                {{ $t("home.popup_claim_btn") }}
              </button>

              <p class="text-[11px] font-sans text-gray-500 mt-3 opacity-70">
                {{ $t("home.popup_fourth_cta") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../config/api.js";
import { useProductStore } from "../../composables/useProductStore";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

import banner1 from "../../assets/first_banner.png";
import banner2 from "../../assets/second_banner.png";

import { formatPrice } from "../../utils/currency";

const banners = [banner1, banner2];
const currentBannerIndex = ref(0);
const currentBanner = computed(() => banners[currentBannerIndex.value]);
let slideInterval = null;

const { state, fetchHomeData } = useProductStore();
const isLoading = ref(false);

// 👇 [BARU] STATE UNTUK REVIEWS 👇
const publicReviews = ref([]);
const isLoadingReviews = ref(false);

const promoEmail = ref("");
const isClaimingPromo = ref(false);

const showPromoPopup = ref(false);
const { t } = useI18n();

const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(date.getHours() - 7);
  return date;
};

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

const getDiscountStatus = (p) => {
  const discObj = getDiscountToDisplay(p);

  if (!p || !discObj || !discObj.value) {
    return { active: false, upcoming: false, expired: false };
  }

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

const getPriceToDisplay = (product) => {
  if (!product) return { value: 0, curr: "IDR" };
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
  if (!product) return null;
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

const currentActivePrice = computed(() => {
  if (!product.value) return 0;
  if (product.value.discount_price && getDiscountStatus(product.value).active) {
    const discObj = getDiscountToDisplay(product.value);
    return discObj ? discObj.value : 0;
  }
  const priceObj = getPriceToDisplay(product.value);
  return priceObj ? priceObj.value : 0;
});

const vReveal = {
  mounted: (el) => {
    el.classList.add(
      "opacity-0",
      "translate-y-16",
      "transition-all",
      "duration-[1200ms]",
      "ease-out"
    );

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove("opacity-0", "translate-y-16");
            el.classList.add("opacity-100", "translate-y-0");
            observerInstance.unobserve(el);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);
  },
};

const router = useRouter();

// 👇 [BARU] FUNGSI FETCH REVIEWS 👇
const fetchLatestReviews = async () => {
  isLoadingReviews.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/home/reviews`);
    publicReviews.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil data review:", error);
  } finally {
    isLoadingReviews.value = false;
  }
};

const initData = async () => {
  if (!state.isHomeLoaded) {
    isLoading.value = true;
    await fetchHomeData();
    isLoading.value = false;
  } else {
    fetchHomeData();
  }

  // Panggil fetch review saat inisialisasi halaman
  fetchLatestReviews();
};

const navigateToSpecificProduct = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/home/find-product`, {
      params: { query },
    });
    router.push(`/products/${res.data.slug || res.data.id}`);
  } catch (err) {
    console.error("Product link broken or not found");
  }
};

const closePopup = () => {
  showPromoPopup.value = false;
};

const claimPromo = async () => {
  if (!promoEmail.value) {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Please enter your email",
      showConfirmButton: false,
      timer: 3000,
    });
  }

  isClaimingPromo.value = true;
  try {
    const res = await axios.post(`${BASE_URL}/promo/claim`, {
      email: promoEmail.value,
    });

    Swal.fire({
      icon: "success",
      title: "Promo Claimed!",
      text: `We've sent the exclusive promo code to ${promoEmail.value}. Check your inbox or spam folder!`,
      confirmButtonColor: "#000",
    });

    closePopup();

    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      router.push("/register");
    }
  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: error.response?.data?.message || "Failed to claim promo",
      showConfirmButton: false,
      timer: 4000,
    });
  } finally {
    isClaimingPromo.value = false;
  }
};

onMounted(() => {
  initData();

  slideInterval = setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.length;
  }, 4000);

  nextTick(() => {
    setTimeout(() => {
      showPromoPopup.value = true;
    }, 50);
  });

  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
  window.removeEventListener("currency-changed", updateCurrencyState);
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

.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 1s ease-in-out;
}
.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0;
}
</style> -->

<template>
  <section class="w-full overflow-x-hidden bg-[#FAFAFA]">
    <!-- Banner Utama -->
    <div
      v-reveal
      class="relative w-full max-w-[1600px] mx-auto aspect-[2/1] overflow-hidden cursor-pointer bg-gray-100 mt-[20px]"
      @click="$router.push('/collections')"
    >
      <Transition name="banner-fade">
        <img
          :key="currentBanner"
          :src="currentBanner"
          alt="SolHer Product"
          class="absolute inset-0 object-cover w-full h-full transition-transform duration-1000 hover:scale-105"
        />
      </Transition>
      <!-- Gradient Overlay untuk kemewahan -->
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
      ></div>
    </div>

    <!-- 👇 [CRO 1] PREMIUM MARQUEE (Membangun Persepsi Eksklusif) 👇 -->
    <div
      class="w-full py-2.5 bg-black border-y border-gray-800 overflow-hidden flex items-center shadow-lg"
    >
      <div
        class="whitespace-nowrap flex animate-marquee text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-white"
      >
        <span class="mx-4 text-yellow-500">✦</span> LIMITED STOCKS AVAILABLE
        <span class="mx-4 text-yellow-500">✦</span> JOIN SOLHER CLUB FOR EXCLUSIVE REWARDS
        <span class="mx-4 text-yellow-500">✦</span> PREMIUM CRAFTSMANSHIP
        <span class="mx-4 text-yellow-500">✦</span> WORLDWIDE SECURE SHIPPING
        <span class="mx-4 text-yellow-500">✦</span> LIMITED STOCKS AVAILABLE
        <span class="mx-4 text-yellow-500">✦</span> JOIN SOLHER CLUB FOR EXCLUSIVE REWARDS
        <span class="mx-4 text-yellow-500">✦</span> PREMIUM CRAFTSMANSHIP
        <span class="mx-4 text-yellow-500">✦</span> WORLDWIDE SECURE SHIPPING
        <span class="mx-4 text-yellow-500">✦</span> LIMITED STOCKS AVAILABLE
        <span class="mx-4 text-yellow-500">✦</span> JOIN SOLHER CLUB FOR EXCLUSIVE REWARDS
      </div>
    </div>

    <!-- Title & Description -->
    <div v-reveal class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2
        class="mb-6 font-serif text-3xl md:text-5xl tracking-tight text-gray-900 leading-tight"
      >
        {{ $t("home.title_one") }}
      </h2>
      <p
        class="text-sm font-light leading-relaxed text-gray-600 md:text-base max-w-2xl mx-auto"
      >
        {{ $t("home.description_one") }}
      </p>
    </div>

    <!-- 2 Featured Split Banners -->
    <div
      v-reveal
      class="grid w-full max-w-[1600px] mx-auto grid-cols-1 overflow-hidden md:grid-cols-2 gap-4 px-4"
    >
      <div
        class="relative overflow-hidden cursor-pointer group rounded-2xl shadow-md"
        @click="navigateToSpecificProduct('ZAHARA MOCCA')"
      >
        <img
          src="../../assets/DSCF2648.jpg"
          class="w-full h-[400px] md:h-[600px] object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500"
        ></div>
        <div
          class="absolute inset-0 flex flex-col items-center justify-end pb-12 transition-transform duration-500 translate-y-4 group-hover:translate-y-0"
        >
          <span
            class="px-8 py-3.5 text-xs font-black tracking-widest text-black uppercase bg-white/90 backdrop-blur-sm rounded-full shadow-2xl hover:bg-white transition-colors"
          >
            {{ $t("home.discover_product_one") }}
          </span>
        </div>
      </div>

      <div class="relative overflow-hidden group rounded-2xl shadow-md">
        <img
          src="../../assets/DSCF7586.jpg"
          class="w-full h-[400px] md:h-[600px] object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500"
        ></div>
        <div
          class="absolute inset-0 flex flex-col items-center justify-end pb-12 transition-transform duration-500 translate-y-4 group-hover:translate-y-0"
        >
          <span
            class="px-8 py-3.5 text-xs font-black tracking-widest text-white uppercase border-2 border-white/50 bg-black/30 backdrop-blur-md rounded-full shadow-2xl"
          >
            {{ $t("home.coming_soon") }}
          </span>
        </div>
      </div>
    </div>

    <div v-reveal class="max-w-4xl px-6 py-16 mx-auto text-center md:py-24">
      <h2 class="mb-8 font-serif text-2xl md:text-4xl text-gray-900 leading-tight">
        {{ $t("home.title_two_first") }} <br />
        <span class="italic text-gray-500">{{ $t("home.title_two_two") }}</span>
      </h2>

      <router-link
        to="/collections"
        class="inline-block bg-black hover:bg-gray-800 hover:-translate-y-1 px-12 py-4 font-black text-white text-xs uppercase tracking-[0.3em] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] rounded-full"
      >
        {{ $t("home.shop_now_btn") }}
      </router-link>
    </div>

    <!-- 👇 [CRO 2] TRENDING DENGAN REAL SCARCITY 👇 -->
    <div
      v-if="!isLoading && state.trendingProducts?.length > 0"
      v-reveal
      class="w-full px-6 py-24 bg-white border-y border-gray-100 shadow-sm relative overflow-hidden"
    >
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-red-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2 pointer-events-none"
      ></div>

      <div class="mx-auto max-w-[1600px] relative z-10">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h3
              class="font-serif text-4xl italic font-light text-red-700 md:text-5xl drop-shadow-sm"
            >
              Trending Now
            </h3>
            <p class="mt-3 text-xs font-bold tracking-widest text-gray-500 uppercase">
              Our most loved pieces this week
            </p>
          </div>
          <router-link
            to="/collections"
            class="hidden text-xs font-bold tracking-widest underline uppercase transition md:block hover:text-red-600"
            >View All</router-link
          >
        </div>

        <div class="flex gap-6 pb-8 overflow-x-auto scrollbar-hide snap-x">
          <div
            v-for="p in state.trendingProducts"
            :key="'trend-' + p.id"
            @click="$router.push(`/products/${p.slug || p.id}`)"
            class="group flex-shrink-0 w-[260px] md:w-[320px] cursor-pointer snap-start flex flex-col"
          >
            <div
              class="relative mb-5 overflow-hidden bg-gray-50 border border-gray-100 shadow-sm rounded-2xl group-hover:shadow-xl transition-shadow duration-500"
            >
              <img
                :src="p.image"
                class="w-full h-[320px] md:h-[420px] object-cover group-hover:scale-110 transition-transform duration-1000"
                loading="lazy"
              />

              <!-- Hot Badge -->
              <div
                class="absolute top-3 left-3 bg-black/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg"
              >
                🔥 Hot
              </div>

              <!-- 👇 Scarcity Alert (REAL DATA) 👇 -->
              <div
                v-if="p.stock > 0 && p.stock <= 5"
                class="absolute bottom-3 left-3 right-3 bg-amber-500/90 backdrop-blur-md text-white px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg animate-pulse flex justify-between items-center"
              >
                <span>Almost Gone</span>
                <span class="bg-white text-amber-600 px-1.5 py-0.5 rounded-md"
                  >{{ p.stock }} Left</span
                >
              </div>
            </div>

            <h4
              class="text-sm font-bold tracking-widest text-gray-900 uppercase truncate group-hover:text-red-700 transition-colors"
            >
              {{ p.name }}
            </h4>

            <!-- 👇 Loss Aversion (Save X%) 👇 -->
            <div class="flex items-center gap-2 mt-2">
              <template v-if="getDiscountStatus(p).active">
                <p class="text-base font-black text-red-600">
                  {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
                </p>
                <p class="text-xs font-medium text-gray-400 line-through">
                  {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
                </p>
                <span
                  class="ml-auto text-[9px] font-black text-red-600 bg-red-50 px-2 py-1 rounded-md uppercase tracking-wider"
                >
                  Save {{ calculateDynamicDiscount(p) }}%
                </span>
              </template>
              <template v-else>
                <p class="font-bold text-base text-gray-900">
                  {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
                </p>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reusable Component for Volumes -->
    <template
      v-for="(volume, idx) in [
        { data: state.volumeOne, title: 'Volume 1 - Goddess Of The Sun' },
        { data: state.volumeTwo, title: 'Volume 2 - The Red Chapter' },
        { data: state.volumeThree, title: 'Volume 3 - The Raya Heirloom' },
        { data: state.volumeFour, title: 'Volume 4 - In Between Us' },
        { data: state.leatherBelt, title: 'Leather Belt Collection' },
      ]"
      :key="idx"
    >
      <div
        v-if="volume.data?.length > 0 || isLoading"
        class="w-full px-6 py-20 border-b border-gray-100"
      >
        <div class="mx-auto max-w-[1600px]">
          <h3
            v-reveal
            class="mb-10 font-serif text-3xl italic font-light text-gray-900 md:text-4xl"
          >
            {{ volume.title }}
          </h3>

          <div v-if="isLoading" class="flex gap-6 overflow-hidden">
            <div
              v-for="n in 4"
              :key="n"
              class="flex-shrink-0 w-[280px] md:w-[360px] animate-pulse"
            >
              <div
                class="bg-gray-200 mb-4 w-full h-[350px] md:h-[450px] rounded-2xl"
              ></div>
              <div class="w-2/3 h-4 mb-2 bg-gray-200 rounded-full"></div>
              <div class="w-1/3 h-4 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          <div
            v-else
            v-reveal
            class="flex gap-6 overflow-x-auto scrollbar-hide snap-x pb-4"
          >
            <div
              v-for="p in volume.data"
              :key="p.id"
              @click="$router.push(`/products/${p.slug || p.id}`)"
              class="group flex-shrink-0 w-[280px] md:w-[360px] cursor-pointer snap-start flex flex-col"
            >
              <div
                class="relative mb-5 overflow-hidden bg-gray-50 rounded-2xl shadow-sm group-hover:shadow-lg transition-all duration-500"
              >
                <img
                  :src="p.image"
                  class="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-110 transition-transform duration-1000"
                  loading="lazy"
                />

                <!-- Sale Badge -->
                <div
                  v-if="getDiscountStatus(p).active"
                  class="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-md shadow-md"
                >
                  SALE
                </div>

                <!-- Low Stock Alert -->
                <div
                  v-if="p.stock > 0 && p.stock <= 5"
                  class="absolute bottom-3 right-3 bg-amber-100/90 backdrop-blur-sm border border-amber-200 text-amber-800 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest rounded shadow-sm animate-pulse"
                >
                  Only {{ p.stock }} Left
                </div>
              </div>

              <h4
                class="text-xs font-bold text-gray-900 uppercase tracking-widest truncate group-hover:text-gray-500 transition-colors"
              >
                {{ p.name }}
              </h4>

              <div class="flex items-center gap-2 mt-1.5">
                <template v-if="getDiscountStatus(p).active">
                  <p class="text-sm font-black text-red-600">
                    {{ formatCurrencyDisplay(getDiscountToDisplay(p)) }}
                  </p>
                  <p class="text-[10px] font-medium text-gray-400 line-through">
                    {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
                  </p>
                </template>
                <template v-else>
                  <p class="font-bold text-sm text-gray-900">
                    {{ formatCurrencyDisplay(getPriceToDisplay(p)) }}
                  </p>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- CUSTOMER REVIEWS SECTION -->
    <div
      v-if="publicReviews.length > 0"
      class="w-full px-6 py-24 bg-white border-t border-gray-100"
    >
      <div class="mx-auto max-w-[1600px]">
        <div v-reveal class="flex flex-col items-center justify-center mb-16 text-center">
          <h3
            class="mb-4 font-serif text-3xl italic font-light text-gray-900 md:text-5xl"
          >
            Loved By Our Clients
          </h3>
          <p class="text-xs font-bold tracking-widest text-gray-500 uppercase">
            Discover what they say about our premium pieces
          </p>
        </div>

        <div v-if="isLoadingReviews" class="flex justify-center w-full">
          <div
            class="w-8 h-8 border-4 border-gray-200 rounded-full border-t-black animate-spin"
          ></div>
        </div>

        <div
          v-else
          v-reveal
          class="flex gap-6 pb-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        >
          <div
            v-for="review in publicReviews"
            :key="'rev-' + review.id"
            class="flex-shrink-0 w-[320px] md:w-[400px] p-8 bg-gray-50 border border-gray-100 shadow-sm snap-center rounded-2xl flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <!-- Bintang -->
              <div class="flex items-center gap-1 mb-5 text-yellow-500">
                <svg
                  v-for="i in 5"
                  :key="i"
                  :class="
                    i <= review.rating ? 'fill-current' : 'text-gray-300 fill-current'
                  "
                  class="w-4 h-4"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <p
                class="mb-6 text-sm italic font-medium leading-relaxed text-gray-700 line-clamp-4"
              >
                "{{ review.comment }}"
              </p>

              <div
                v-if="review.images && review.images.length > 0"
                class="flex gap-2 mb-6"
              >
                <img
                  v-for="(img, index) in review.images.slice(0, 3)"
                  :key="index"
                  :src="img"
                  class="object-cover w-14 h-14 border border-gray-200 rounded-lg shadow-sm"
                />
              </div>
            </div>

            <div class="flex items-center gap-4 pt-5 border-t border-gray-200">
              <div
                class="flex items-center justify-center w-12 h-12 font-serif text-xl font-bold text-gray-800 bg-white border border-gray-200 rounded-full shadow-sm"
              >
                {{
                  review.user?.first_name
                    ? review.user.first_name.charAt(0).toUpperCase()
                    : "S"
                }}
              </div>
              <div class="flex-1 overflow-hidden">
                <p class="text-xs font-bold text-gray-900 uppercase truncate">
                  {{ review.user?.first_name || "Verified Buyer" }}
                </p>
                <p class="text-[10px] text-gray-500 truncate mt-1">
                  Purchased:
                  <span
                    class="font-bold text-gray-800 cursor-pointer hover:text-black hover:underline"
                    @click="$router.push(`/products/${review.product?.slug}`)"
                    >{{ review.product?.name }}</span
                  >
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Final CTA Banner -->
    <div
      v-reveal
      class="relative w-full h-[400px] md:h-[600px] overflow-hidden cursor-pointer group"
      @click="navigateToSpecificProduct('RED CHARM')"
    >
      <img
        src="../../assets/home_lastimage.jpg"
        alt="Premium Materials"
        class="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
      />
      <div
        class="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-t from-black/80 via-black/40 to-black/10 text-center"
      >
        <h2
          class="max-w-2xl font-serif text-3xl font-light text-white md:text-6xl leading-tight mb-8"
        >
          {{ $t("home.cta_section_one") }} <br />{{ $t("home.cta_section_two") }}
        </h2>
        <span
          class="px-10 py-4 text-xs font-black tracking-[0.2em] text-black uppercase bg-white rounded-full shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          Shop The Look
        </span>
      </div>
    </div>

    <!-- 👇 [CRO 3] Promo Popup (Loss Aversion Focus) 👇 -->
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
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
        @click.self="closePopup"
      >
        <div
          class="relative flex flex-col w-full max-w-4xl overflow-hidden bg-white shadow-2xl rounded-2xl md:flex-row"
        >
          <button
            @click="closePopup"
            class="absolute z-10 text-gray-500 bg-white/50 backdrop-blur-sm rounded-full p-2 transition top-4 right-4 hover:text-black hover:bg-gray-100"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>

          <div class="relative hidden bg-gray-900 md:block md:w-1/2 overflow-hidden">
            <img
              src="../../assets/DSCF2551.jpg"
              alt="Solher Bags"
              class="object-cover w-full h-full opacity-90 hover:scale-105 transition-transform duration-1000"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-8"
            >
              <p class="text-white font-serif italic text-2xl">
                "Elegance is the only beauty that never fades."
              </p>
            </div>
          </div>

          <div
            class="flex flex-col items-center justify-center w-full px-8 py-12 overflow-y-auto text-center md:px-10 md:py-14 md:w-1/2 custom-scrollbar bg-[#FAFAFA]"
          >
            <span
              class="px-3 py-1 mb-6 text-[9px] font-black tracking-widest text-red-600 uppercase bg-red-100 rounded-full"
              >VIP Invitation</span
            >

            <h2
              class="text-3xl md:text-4xl font-serif text-gray-900 mb-4 tracking-tight leading-tight"
            >
              <span class="font-bold">{{ $t("home.popup_first_cta") }}</span> <br />
              <span class="font-black text-red-600 whitespace-nowrap"
                >{{ $t("home.popup_price_section_one") }}&nbsp;{{
                  $t("home.popup_price_section_two")
                }}&nbsp;{{ $t("home.popup_price_section_three") }}</span
              ><br />
              <span class="font-bold">{{ $t("home.popup_second_cta") }}</span>
            </h2>

            <p class="text-sm text-gray-600 mb-8 font-medium px-4">
              Jangan tinggalkan halaman ini tanpa mengklaim voucher eksklusif Anda. Kuota
              sangat terbatas!
            </p>

            <div class="w-full max-w-[320px]">
              <input
                type="email"
                v-model="promoEmail"
                :placeholder="$t('home.popup_enter_email')"
                class="w-full border-2 border-gray-200 bg-white px-5 py-4 mb-3 text-sm font-medium rounded-xl focus:outline-none focus:border-black focus:ring-0 transition-colors placeholder-gray-400 text-center"
              />

              <button
                @click="claimPromo"
                class="w-full bg-black text-white font-black uppercase tracking-[0.2em] text-xs py-4 rounded-xl hover:bg-gray-800 transition-all duration-300 shadow-[0_8px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
              >
                {{ $t("home.popup_claim_btn") }}
              </button>

              <button
                @click="closePopup"
                class="mt-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-gray-800 underline transition-colors"
              >
                No thanks, I prefer paying full price
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, nextTick } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../config/api.js";
import { useProductStore } from "../../composables/useProductStore";
import Swal from "sweetalert2";
import { useI18n } from "vue-i18n";

import banner1 from "../../assets/first_banner.png";
import banner2 from "../../assets/second_banner.png";

const banners = [banner1, banner2];
const currentBannerIndex = ref(0);
const currentBanner = computed(() => banners[currentBannerIndex.value]);
let slideInterval = null;

const { state, fetchHomeData } = useProductStore();
const isLoading = ref(false);

const publicReviews = ref([]);
const isLoadingReviews = ref(false);

const promoEmail = ref("");
const isClaimingPromo = ref(false);
const showPromoPopup = ref(false);
const { t } = useI18n();

const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(date.getHours() - 7);
  return date;
};

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

const getDiscountStatus = (p) => {
  const discObj = getDiscountToDisplay(p);
  if (!p || !discObj || !discObj.value) {
    return { active: false, upcoming: false, expired: false };
  }

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

const getPriceToDisplay = (product) => {
  if (!product) return { value: 0, curr: "IDR" };
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
  if (!product) return null;
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

const vReveal = {
  mounted: (el) => {
    el.classList.add(
      "opacity-0",
      "translate-y-16",
      "transition-all",
      "duration-[1200ms]",
      "ease-out"
    );
    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.remove("opacity-0", "translate-y-16");
            el.classList.add("opacity-100", "translate-y-0");
            observerInstance.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(el);
  },
};

const router = useRouter();

const fetchLatestReviews = async () => {
  isLoadingReviews.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/home/reviews`);
    publicReviews.value = res.data;
  } catch (error) {
    console.error("Gagal mengambil data review:", error);
  } finally {
    isLoadingReviews.value = false;
  }
};

const initData = async () => {
  if (!state.isHomeLoaded) {
    isLoading.value = true;
    await fetchHomeData();
    isLoading.value = false;
  } else {
    fetchHomeData();
  }
  fetchLatestReviews();
};

const navigateToSpecificProduct = async (query) => {
  try {
    const res = await axios.get(`${BASE_URL}/home/find-product`, { params: { query } });
    router.push(`/products/${res.data.slug || res.data.id}`);
  } catch (err) {
    console.error("Product link broken or not found");
  }
};

const closePopup = () => {
  showPromoPopup.value = false;
};

const claimPromo = async () => {
  if (!promoEmail.value) {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Please enter your email",
      showConfirmButton: false,
      timer: 3000,
    });
  }
  isClaimingPromo.value = true;
  try {
    await axios.post(`${BASE_URL}/promo/claim`, { email: promoEmail.value });
    Swal.fire({
      icon: "success",
      title: "Promo Claimed!",
      text: `We've sent the exclusive promo code to ${promoEmail.value}. Check your inbox or spam folder!`,
      confirmButtonColor: "#000",
    });
    closePopup();
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      router.push("/register");
    }
  } catch (error) {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: error.response?.data?.message || "Failed to claim promo",
      showConfirmButton: false,
      timer: 4000,
    });
  } finally {
    isClaimingPromo.value = false;
  }
};

onMounted(() => {
  initData();
  slideInterval = setInterval(() => {
    currentBannerIndex.value = (currentBannerIndex.value + 1) % banners.length;
  }, 5000);
  nextTick(() => {
    setTimeout(() => {
      showPromoPopup.value = true;
    }, 3000);
  }); // Delay popup sedikit agar tidak terlalu agresif
  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
});

onUnmounted(() => {
  if (slideInterval) clearInterval(slideInterval);
  window.removeEventListener("currency-changed", updateCurrencyState);
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

.banner-fade-enter-active,
.banner-fade-leave-active {
  transition: opacity 1.5s ease-in-out;
}
.banner-fade-enter-from,
.banner-fade-leave-to {
  opacity: 0;
}

/* Marquee Animation */
@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}
.animate-marquee {
  display: inline-block;
  white-space: nowrap;
  animation: marquee 25s linear infinite;
}
/* Pause on hover for Marquee */
.animate-marquee:hover {
  animation-play-state: paused;
}
</style>
