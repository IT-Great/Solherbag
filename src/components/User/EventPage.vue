<!-- <template>
  <div class="min-h-screen pb-32 overflow-x-hidden bg-[#Fdfbf7]">
    <div class="relative px-6 pt-40 pb-24 md:pt-48 md:pb-32 overflow-hidden bg-[#Fdfbf7]">
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-100 rounded-full blur-[100px] opacity-60 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      
      <div class="relative z-10 max-w-5xl mx-auto text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-12">
        <div class="md:w-2/3">
          <div class="flex items-center justify-center md:justify-start gap-4 mb-8">
            <div class="w-12 h-[1px] bg-black"></div>
            <h4 class="font-bold tracking-[0.4em] text-[10px] md:text-xs uppercase text-gray-400">
              {{ $t("event.archive") }}
            </h4>
          </div>
          <h1 class="font-serif text-5xl leading-[1.1] tracking-tight text-gray-900 md:text-7xl lg:text-8xl">
            {{ $t("event.moments") }}<br />
            <span class="italic font-light text-gray-400">{{ $t("event.elegance") }}</span>
          </h1>
        </div>
        <div class="md:w-1/3">
          <p class="text-sm font-light leading-relaxed text-gray-500 md:text-base border-l border-gray-200 pl-6 md:pl-8 text-left">
            {{ $t("event.hero_desc") }}
          </p>
        </div>
      </div>
    </div>

    <div class="px-6 py-12 mx-auto max-w-[1400px]">
      <div class="sticky top-20 z-40 bg-[#Fdfbf7]/90 backdrop-blur-md py-6 mb-24 border-b border-gray-200/50 flex flex-col md:flex-row items-center justify-between gap-6 transition-all">
        <div class="flex flex-wrap justify-center gap-2 md:justify-start">
          <button
            @click="activeSeason = 'All'"
            class="px-5 py-2 text-[10px] font-bold tracking-widest uppercase transition-all rounded-full"
            :class="activeSeason === 'All' ? 'bg-black text-white' : 'bg-transparent text-gray-400 hover:text-black hover:bg-gray-100'"
          >
            {{ $t("event.all_collections") }}
          </button>
          <button
            v-for="season in availableSeasons"
            :key="season"
            @click="activeSeason = season"
            class="px-5 py-2 text-[10px] font-bold tracking-widest uppercase transition-all rounded-full"
            :class="activeSeason === season ? 'bg-black text-white' : 'bg-transparent text-gray-400 hover:text-black hover:bg-gray-100'"
          >
            {{ season }}
          </button>
        </div>

        <div class="relative group">
          <select
            v-model="activeYear"
            class="py-2 pl-4 pr-10 text-xs font-bold tracking-widest text-black uppercase bg-transparent border-b border-black/20 group-hover:border-black outline-none appearance-none cursor-pointer focus:ring-0 transition-colors"
          >
            <option value="All">{{ $t("event.all_years") }}</option>
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute w-4 h-4 text-black -translate-y-1/2 pointer-events-none right-2 top-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <div v-if="isLoading" class="flex items-center justify-center py-32">
        <div class="w-10 h-10 border-[3px] border-gray-200 rounded-full border-t-black animate-spin"></div>
      </div>

      <div v-else-if="filteredEvents.length > 0" class="space-y-40 md:space-y-64">
        <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="relative flex flex-col gap-12 lg:gap-0"
          :class="index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'"
        >
          
          <div 
            class="w-full lg:w-5/12 z-20 flex flex-col justify-center animate-fade-in"
            :class="index % 2 === 0 ? 'lg:pr-16 lg:-mr-20' : 'lg:pl-16 lg:-ml-20'"
          >
            <div class="bg-[#Fdfbf7] p-8 lg:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-gray-100/50 rounded-2xl lg:rounded-none lg:shadow-none lg:border-none lg:bg-transparent lg:p-0">
              <div class="flex items-center gap-4 mb-8">
                <span class="text-[10px] font-bold tracking-[0.2em] text-orange-600/80 uppercase">
                  {{ event.season || $t("event.editorial") }}
                </span>
                <div class="w-8 h-[1px] bg-gray-300"></div>
                <span class="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                  {{ getYear(event.event_date) }}
                </span>
                
                <button 
                  @click="shareEvent(event)"
                  class="ml-auto p-2 text-gray-300 transition-colors rounded-full hover:text-black"
                  title="Share Event"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                </button>
              </div>

              <h2 class="mb-8 font-serif text-4xl leading-[1.1] text-gray-900 md:text-5xl lg:text-6xl">
                {{ event.title }}
              </h2>
              
              <p class="text-sm font-light leading-relaxed text-gray-600 md:text-base text-justify md:text-left mb-12">
                {{ event.description || $t("event.no_desc") }}
              </p>

              <div class="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <button 
                  @click="$router.push('/collections')"
                  class="group flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-black uppercase transition-all"
                >
                  <span class="border-b border-black pb-1 group-hover:border-transparent transition-colors">{{ $t("event.shop_collection") || 'Explore Lookbook' }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
                <p class="text-[10px] font-bold tracking-widest text-gray-400 uppercase italic">
                  {{ event.images.length }} {{ $t("event.moments_captured") }}
                </p>
              </div>
            </div>
          </div>

          <div
            class="relative w-full lg:w-7/12 aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/5] overflow-hidden bg-stone-100 shadow-2xl group animate-fade-in"
            @wheel="(e) => handleImageScroll(e, event)"
            @mouseenter="pauseAutoShuffle(event)"
            @mouseleave="resumeAutoShuffle(event)"
          >
            <div
              v-if="event.images.length > 1"
              class="absolute inset-y-0 left-6 z-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            >
              <div class="h-16 w-[1px] bg-white/50 mb-4"></div>
              <span style="writing-mode: vertical-rl;" class="text-[9px] font-bold tracking-[0.3em] text-white uppercase rotate-180 drop-shadow-md">
                {{ $t("event.scroll_shuffle") }}
              </span>
              <div class="h-16 w-[1px] bg-white/50 mt-4"></div>
            </div>

            <transition-group name="cinematic-fade">
              <img
                v-for="(img, imgIdx) in event.images"
                :key="img"
                v-show="event.activeIndex === imgIdx"
                :src="getImgUrl(img)"
                class="absolute inset-0 object-cover w-full h-full transition-transform duration-[10000ms] ease-out hover:scale-110 cursor-pointer"
                loading="lazy"
                @click="nextImageManual(event)"
              />
            </transition-group>

            <div v-if="event.images.length > 1" class="absolute z-20 flex gap-2 bottom-8 right-8">
              <div 
                v-for="(_, idx) in event.images" :key="'dot-'+idx"
                class="h-[2px] transition-all duration-500 cursor-pointer backdrop-blur-sm"
                :class="event.activeIndex === idx ? 'w-8 bg-white shadow-[0_0_5px_rgba(255,255,255,0.5)]' : 'w-2 bg-white/30 hover:bg-white/70'"
                @click.stop="event.activeIndex = idx"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-40 text-center animate-fade-in"
      >
        <span class="text-4xl mb-6 opacity-30">✧</span>
        <p class="font-serif text-2xl italic text-gray-400 font-light tracking-wide mb-6">
          {{ $t("event.no_events") }}
        </p>
        <button
          @click="activeSeason = 'All'; activeYear = 'All';"
          class="text-xs font-bold tracking-[0.2em] text-black uppercase hover:text-gray-400 transition-colors border-b border-black pb-1"
        >
          {{ $t("event.clear_filters") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";

const { t, locale } = useI18n();

const events = ref([]);
const isLoading = ref(true);

const activeSeason = ref("All");
const activeYear = ref("All");

const eventTimers = ref({});
const wheelTimeouts = ref({});

const getImgUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const baseUrlFixed = BASE_URL.replace("/api", "");
  return `${baseUrlFixed}/storage/${path}`;
};

const getYear = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).getFullYear().toString();
};

const fetchEvents = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/events`, {
      headers: { "Accept-Language": locale.value },
    });
    events.value = res.data.map((ev) => ({
      ...ev,
      images: typeof ev.images === "string" ? JSON.parse(ev.images) : ev.images,
      activeIndex: 0,
    }));
    startAutoShuffle();
  } catch (error) {
    console.error("Gagal menarik data event:", error);
  } finally {
    isLoading.value = false;
  }
};

// --- LOGIKA SLIDER & TIMER ---
const startAutoShuffle = () => {
  clearAllTimers();
  filteredEvents.value.forEach((event) => {
    if (event.images && event.images.length > 1) {
      eventTimers.value[event.id] = setInterval(() => {
        event.activeIndex = (event.activeIndex + 1) % event.images.length;
      }, 4000); 
    }
  });
};

const clearAllTimers = () => {
  Object.values(eventTimers.value).forEach((timer) => clearInterval(timer));
};

const pauseAutoShuffle = (eventItem) => {
  if (eventTimers.value[eventItem.id]) {
    clearInterval(eventTimers.value[eventItem.id]);
  }
};

const resumeAutoShuffle = (eventItem) => {
  if (eventItem.images && eventItem.images.length > 1) {
    eventTimers.value[eventItem.id] = setInterval(() => {
      eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
    }, 4000);
  }
};

const nextImageManual = (eventItem) => {
  if (eventItem.images.length > 1) {
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  }
};

// Logika Scroll Mouse yang dikembalikan persis seperti sebelumnya
const handleImageScroll = (e, eventItem) => {
  if (eventItem.images.length <= 1) return;

  e.preventDefault();

  const now = Date.now();
  if (wheelTimeouts.value[eventItem.id] && now - wheelTimeouts.value[eventItem.id] < 600) {
    return;
  }
  wheelTimeouts.value[eventItem.id] = now;

  if (e.deltaY > 0) {
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  } else {
    eventItem.activeIndex = (eventItem.activeIndex - 1 + eventItem.images.length) % eventItem.images.length;
  }
};

const shareEvent = (eventItem) => {
  const url = window.location.href; 
  navigator.clipboard.writeText(url).then(() => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: t("event.link_copied") || 'Link copied to clipboard!',
      showConfirmButton: false,
      timer: 2000
    });
  });
};

const availableSeasons = computed(() => {
  const seasons = new Set();
  events.value.forEach((e) => {
    if (e.season && e.season.trim() !== "") seasons.add(e.season);
  });
  return Array.from(seasons).sort();
});

const availableYears = computed(() => {
  const years = new Set();
  events.value.forEach((e) => {
    if (e.event_date) years.add(getYear(e.event_date));
  });
  return Array.from(years).sort((a, b) => b - a);
});

const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    const matchSeason = activeSeason.value === "All" || event.season === activeSeason.value;
    const matchYear = activeYear.value === "All" || getYear(event.event_date) === activeYear.value;
    return matchSeason && matchYear;
  });
});

watch([activeSeason, activeYear], () => {
  startAutoShuffle();
});

watch(locale, () => {
  fetchEvents();
});

onMounted(() => {
  window.scrollTo(0, 0);
  fetchEvents();
});

onUnmounted(() => {
  clearAllTimers();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transisi Cinematic Fade untuk Slider Gambar */
.cinematic-fade-enter-active,
.cinematic-fade-leave-active {
  transition: opacity 1.2s ease-in-out, transform 1.2s ease-in-out;
}
.cinematic-fade-enter-from {
  opacity: 0;
  transform: scale(1.05); /* Sedikit zoom out saat masuk */
}
.cinematic-fade-leave-to {
  opacity: 0;
}
</style> -->

<template>
  <div class="min-h-screen bg-[#Fdfbf7] selection:bg-black selection:text-white pb-32">
    <!-- ========================================== -->
    <!-- HERO SECTION (Editorial High-Fashion Vibe) -->
    <!-- ========================================== -->
    <div class="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      <!-- Background Ambient -->
      <div class="absolute inset-0 bg-[#Fdfbf7]"></div>
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-stone-200 rounded-full blur-[120px] opacity-40 -translate-y-1/3 translate-x-1/4 pointer-events-none"></div>
      
      <div class="relative z-10 flex flex-col items-center justify-center px-6 text-center animate-fade-in-up">
        <span class="text-[10px] md:text-xs font-bold tracking-[0.4em] text-gray-400 uppercase mb-6 flex items-center gap-4">
          <span class="w-8 h-[1px] bg-gray-300"></span>
          {{ $t("event.archive") }}
          <span class="w-8 h-[1px] bg-gray-300"></span>
        </span>
        <h1 class="font-serif text-6xl leading-[0.9] tracking-tight text-gray-900 md:text-8xl lg:text-[10rem]">
          {{ $t("event.moments") }}
        </h1>
        <p class="font-serif text-3xl italic font-light text-gray-400 md:text-5xl lg:text-7xl mt-2 md:-mt-2">
          {{ $t("event.elegance") }}
        </p>
        <p class="max-w-xl mt-10 text-xs font-medium leading-relaxed tracking-wide text-gray-500 md:text-sm uppercase">
          {{ $t("event.hero_desc") }}
        </p>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute flex flex-col items-center gap-2 bottom-10 animate-bounce-slow">
        <span class="text-[9px] font-bold tracking-[0.3em] uppercase text-black">Scroll</span>
        <div class="w-[1px] h-8 bg-black"></div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- STICKY FILTER SECTION                      -->
    <!-- ========================================== -->
    <div class="sticky top-16 z-40 bg-[#Fdfbf7]/80 backdrop-blur-xl border-y border-gray-200/50 py-4 transition-all">
      <div class="flex flex-col items-center justify-between gap-4 px-6 mx-auto max-w-[1600px] md:flex-row">
        
        <!-- Musim (Seasons) -->
        <div class="flex gap-6 overflow-x-auto scrollbar-hide md:gap-8 mask-edges">
          <button
            @click="activeSeason = 'All'"
            class="relative pb-1 text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap"
            :class="activeSeason === 'All' ? 'text-black' : 'text-gray-400 hover:text-gray-800'"
          >
            {{ $t("event.all_collections") }}
            <span v-if="activeSeason === 'All'" class="absolute bottom-0 left-0 w-full h-[1px] bg-black animate-expand-x"></span>
          </button>
          <button
            v-for="season in availableSeasons"
            :key="season"
            @click="activeSeason = season"
            class="relative pb-1 text-[10px] font-bold tracking-widest uppercase transition-colors whitespace-nowrap"
            :class="activeSeason === season ? 'text-black' : 'text-gray-400 hover:text-gray-800'"
          >
            {{ season }}
            <span v-if="activeSeason === season" class="absolute bottom-0 left-0 w-full h-[1px] bg-black animate-expand-x"></span>
          </button>
        </div>

        <!-- Tahun (Years) -->
        <div class="relative shrink-0">
          <select
            v-model="activeYear"
            class="py-2 pl-4 pr-10 text-[10px] font-bold tracking-[0.2em] text-black uppercase bg-transparent border border-gray-300 rounded-full outline-none appearance-none cursor-pointer focus:border-black transition-colors"
          >
            <option value="All">{{ $t("event.all_years") }}</option>
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" class="absolute w-3 h-3 text-black -translate-y-1/2 pointer-events-none right-4 top-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>

    <!-- ========================================== -->
    <!-- CONTENT SECTION                            -->
    <!-- ========================================== -->
    <div class="px-6 py-20 mx-auto max-w-[1600px] md:py-32">
      <!-- Loading State -->
      <div v-if="isLoading" class="flex flex-col items-center justify-center py-40">
        <div class="w-12 h-12 border-[1px] border-gray-200 rounded-full border-t-black animate-spin-slow"></div>
        <span class="mt-6 text-[10px] tracking-[0.3em] uppercase text-gray-400">Curating Gallery</span>
      </div>

      <!-- Event List (High-Fashion Masonry-like Layout) -->
      <div v-else-if="filteredEvents.length > 0" class="space-y-40 md:space-y-56">
        <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="relative flex flex-col gap-12 lg:gap-24 group"
          :class="index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'"
        >
          <!-- GAMBAR SLIDER (Clean & Borderless) -->
          <div
            class="relative w-full lg:w-[65%] aspect-[3/4] md:aspect-[4/5] lg:aspect-[16/10] overflow-hidden bg-stone-100"
            @wheel="(e) => handleImageScroll(e, event)"
            @mouseenter="pauseAutoShuffle(event)"
            @mouseleave="resumeAutoShuffle(event)"
          >
            <transition-group name="cinematic-fade">
              <img
                v-for="(img, imgIdx) in event.images"
                :key="img"
                v-show="event.activeIndex === imgIdx"
                :src="getImgUrl(img)"
                class="absolute inset-0 object-cover w-full h-full transition-transform duration-[15000ms] ease-out hover:scale-110 cursor-crosshair"
                loading="lazy"
                @click="nextImageManual(event)"
              />
            </transition-group>

            <!-- Custom Cursor Hint (Optional for Desktop) -->
            <div v-if="event.images.length > 1" class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none group-hover:opacity-100 bg-black/10">
               <span class="px-4 py-2 text-[9px] font-bold tracking-[0.3em] text-white uppercase backdrop-blur-md bg-black/30 rounded-full border border-white/20">Click or Scroll</span>
            </div>

            <!-- Dots Indicator -->
            <div v-if="event.images.length > 1" class="absolute z-20 flex gap-2 bottom-6 left-1/2 -translate-x-1/2">
              <div 
                v-for="(_, idx) in event.images" :key="'dot-'+idx"
                class="h-[2px] transition-all duration-500 cursor-pointer"
                :class="event.activeIndex === idx ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/80'"
                @click.stop="event.activeIndex = idx"
              ></div>
            </div>
          </div>

          <!-- TEKS DESKRIPSI (Minimalist Typography) -->
          <div class="flex flex-col justify-center w-full lg:w-[35%] z-20">
            <div class="flex items-center gap-4 mb-6">
              <span class="text-[9px] font-bold tracking-[0.3em] text-gray-500 uppercase">
                {{ event.season || $t("event.editorial") }}
              </span>
              <div class="w-8 h-[1px] bg-gray-300"></div>
              <span class="text-[9px] font-bold tracking-[0.3em] text-black uppercase">
                {{ getYear(event.event_date) }}
              </span>
            </div>

            <h2 class="mb-8 font-serif text-4xl leading-[1.1] text-black md:text-5xl lg:text-6xl tracking-tight">
              {{ event.title }}
            </h2>
            
            <p class="mb-10 text-sm font-light leading-relaxed text-justify text-gray-600 md:text-left">
              {{ event.description || $t("event.no_desc") }}
            </p>

            <div class="flex items-center justify-between pt-8 border-t border-gray-200">
              <button 
                @click="$router.push('/collections')"
                class="group flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-black uppercase"
              >
                <span class="pb-1 transition-colors border-b border-black group-hover:border-transparent">{{ $t("event.shop_collection") || 'Explore Lookbook' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 transition-transform transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>

              <button 
                @click="shareEvent(event)"
                class="p-2 text-gray-400 transition-colors rounded-full hover:text-black hover:bg-gray-100"
                title="Share Event"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-40 text-center animate-fade-in-up">
        <span class="text-6xl italic font-light text-gray-200 font-serif mb-6">Nothing here</span>
        <p class="font-light tracking-widest text-gray-500 uppercase text-[10px] mb-8">
          {{ $t("event.no_events") }}
        </p>
        <button
          @click="activeSeason = 'All'; activeYear = 'All';"
          class="text-[10px] font-bold tracking-[0.2em] text-black uppercase hover:text-gray-500 transition-colors border-b border-black hover:border-gray-500 pb-1"
        >
          {{ $t("event.clear_filters") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { useI18n } from "vue-i18n";
import Swal from "sweetalert2";

const { t, locale } = useI18n();

const events = ref([]);
const isLoading = ref(true);

const activeSeason = ref("All");
const activeYear = ref("All");

const eventTimers = ref({});
const wheelTimeouts = ref({});

const getImgUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const baseUrlFixed = BASE_URL.replace("/api", "");
  return `${baseUrlFixed}/storage/${path}`;
};

const getYear = (dateString) => {
  if (!dateString) return "";
  return new Date(dateString).getFullYear().toString();
};

const fetchEvents = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/events`, {
      headers: { "Accept-Language": locale.value },
    });
    events.value = res.data.map((ev) => ({
      ...ev,
      images: typeof ev.images === "string" ? JSON.parse(ev.images) : ev.images,
      activeIndex: 0,
    }));
    startAutoShuffle();
  } catch (error) {
    console.error("Gagal menarik data event:", error);
  } finally {
    isLoading.value = false;
  }
};

const startAutoShuffle = () => {
  clearAllTimers();
  filteredEvents.value.forEach((event) => {
    if (event.images && event.images.length > 1) {
      eventTimers.value[event.id] = setInterval(() => {
        event.activeIndex = (event.activeIndex + 1) % event.images.length;
      }, 5000); // Diperlambat sedikit agar terasa lebih premium
    }
  });
};

const clearAllTimers = () => {
  Object.values(eventTimers.value).forEach((timer) => clearInterval(timer));
};

const pauseAutoShuffle = (eventItem) => {
  if (eventTimers.value[eventItem.id]) {
    clearInterval(eventTimers.value[eventItem.id]);
  }
};

const resumeAutoShuffle = (eventItem) => {
  if (eventItem.images && eventItem.images.length > 1) {
    eventTimers.value[eventItem.id] = setInterval(() => {
      eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
    }, 5000);
  }
};

const nextImageManual = (eventItem) => {
  if (eventItem.images.length > 1) {
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  }
};

const handleImageScroll = (e, eventItem) => {
  if (eventItem.images.length <= 1) return;
  e.preventDefault();

  const now = Date.now();
  if (wheelTimeouts.value[eventItem.id] && now - wheelTimeouts.value[eventItem.id] < 800) {
    return;
  }
  wheelTimeouts.value[eventItem.id] = now;

  if (e.deltaY > 0) {
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  } else {
    eventItem.activeIndex = (eventItem.activeIndex - 1 + eventItem.images.length) % eventItem.images.length;
  }
};

const shareEvent = (eventItem) => {
  const url = window.location.href; 
  navigator.clipboard.writeText(url).then(() => {
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: t("event.link_copied") || 'Link copied to clipboard!',
      showConfirmButton: false,
      timer: 2000
    });
  });
};

const availableSeasons = computed(() => {
  const seasons = new Set();
  events.value.forEach((e) => {
    if (e.season && e.season.trim() !== "") seasons.add(e.season);
  });
  return Array.from(seasons).sort();
});

const availableYears = computed(() => {
  const years = new Set();
  events.value.forEach((e) => {
    if (e.event_date) years.add(getYear(e.event_date));
  });
  return Array.from(years).sort((a, b) => b - a);
});

const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    const matchSeason = activeSeason.value === "All" || event.season === activeSeason.value;
    const matchYear = activeYear.value === "All" || getYear(event.event_date) === activeYear.value;
    return matchSeason && matchYear;
  });
});

watch([activeSeason, activeYear], () => {
  startAutoShuffle();
});

watch(locale, () => {
  fetchEvents();
});

onMounted(() => {
  window.scrollTo(0, 0);
  fetchEvents();
});

onUnmounted(() => {
  clearAllTimers();
});
</script>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.mask-edges {
  mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 5%, black 95%, transparent);
}

.animate-fade-in-up {
  animation: fadeInUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-expand-x {
  animation: expandX 0.3s ease-out forwards;
}
@keyframes expandX {
  from { width: 0; }
  to { width: 100%; }
}

.animate-spin-slow {
  animation: spin 3s linear infinite;
}

.animate-bounce-slow {
  animation: bounceSlow 3s infinite;
}
@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

/* Transisi Cinematic Fade untuk Slider Gambar */
.cinematic-fade-enter-active,
.cinematic-fade-leave-active {
  transition: opacity 1.5s ease-in-out, transform 1.5s ease-in-out;
}
.cinematic-fade-enter-from {
  opacity: 0;
  transform: scale(1.03); 
}
.cinematic-fade-leave-to {
  opacity: 0;
}
</style>
