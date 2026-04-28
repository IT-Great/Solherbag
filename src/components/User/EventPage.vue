<template>
  <div class="min-h-screen pb-24 overflow-x-hidden bg-[#FAFAFA]">
    <div
      class="px-6 pt-32 pb-16 text-center bg-white md:pt-40 md:pb-24 border-b border-gray-100"
    >
      <h4
        class="font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-6 text-gray-400"
      >
        The Solher Archive
      </h4>
      <h1
        class="max-w-4xl mx-auto mb-8 font-serif text-4xl tracking-tight text-gray-900 md:text-6xl lg:text-7xl leading-tight"
      >
        Moments of <span class="italic text-gray-500">Elegance</span>
      </h1>
      <p
        class="max-w-2xl mx-auto text-sm font-light leading-relaxed text-gray-600 md:text-base"
      >
        A curated visual journey of our campaigns, seasonal lookbooks, and the women who
        bring Solher pieces to life. Explore our timeless collections captured through the
        lens of inspiration.
      </p>
    </div>

    <div class="px-6 py-12 mx-auto max-w-7xl">
      <div
        class="flex flex-col items-center justify-between gap-6 mb-12 md:flex-row md:mb-16"
      >
        <div class="flex flex-wrap justify-center gap-2 md:justify-start">
          <button
            @click="activeSeason = 'All'"
            :class="
              activeSeason === 'All'
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-5 py-2 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
          >
            All Collections
          </button>
          <button
            v-for="season in availableSeasons"
            :key="season"
            @click="activeSeason = season"
            :class="
              activeSeason === season
                ? 'bg-black text-white border-black'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-5 py-2 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
          >
            {{ season }}
          </button>
        </div>

        <div class="relative">
          <select
            v-model="activeYear"
            class="py-2 pl-4 pr-10 text-xs font-bold tracking-widest text-black uppercase bg-transparent border-b-2 border-black outline-none cursor-pointer appearance-none focus:ring-0"
          >
            <option value="All">All Years</option>
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute w-4 h-4 text-black -translate-y-1/2 pointer-events-none right-2 top-1/2"
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

      <div v-if="isLoading" class="flex items-center justify-center py-32">
        <div
          class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
      </div>

      <div
        v-else-if="filteredEvents.length > 0"
        class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 animate-fade-in"
      >
        <div
          v-for="event in filteredEvents"
          :key="event.id"
          class="relative overflow-hidden break-inside-avoid group rounded-xl shadow-sm bg-gray-100"
        >
          <img
            :src="getImgUrl(event.image)"
            :alt="event.title"
            class="object-cover w-full h-auto transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />

          <div
            class="absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:opacity-100"
          >
            <span
              class="inline-block px-3 py-1 mb-3 text-[9px] font-bold tracking-widest text-black uppercase bg-white rounded-full w-max"
            >
              {{ event.season || "Campaign" }} • {{ getYear(event.event_date) }}
            </span>
            <h3 class="font-serif text-2xl text-white md:text-3xl">{{ event.title }}</h3>
            <p
              v-if="event.description"
              class="mt-2 text-xs font-light leading-relaxed text-gray-200 line-clamp-3"
            >
              {{ event.description }}
            </p>
          </div>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-32 text-center animate-fade-in"
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
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p class="font-serif text-xl italic text-gray-400">
          No events found for this selection.
        </p>
        <button
          @click="
            activeSeason = 'All';
            activeYear = 'All';
          "
          class="mt-4 text-xs font-bold tracking-widest text-black underline uppercase hover:text-gray-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const events = ref([]);
const isLoading = ref(true);

// Filters
const activeSeason = ref("All");
const activeYear = ref("All");

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
    // Karena user biasa melihatnya, pastikan Anda membuat endpoint guest/publik untuk ini di backend Laravel Anda (misal route: /api/events)
    const res = await axios.get(`${BASE_URL}/events`);
    events.value = res.data;
  } catch (error) {
    console.error("Gagal menarik data event:", error);
  } finally {
    isLoading.value = false;
  }
};

// Computed Properties untuk Filter Dinamis
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
  return Array.from(years).sort((a, b) => b - a); // Descending (Terbaru di atas)
});

const filteredEvents = computed(() => {
  return events.value.filter((event) => {
    const matchSeason =
      activeSeason.value === "All" || event.season === activeSeason.value;
    const matchYear =
      activeYear.value === "All" || getYear(event.event_date) === activeYear.value;
    return matchSeason && matchYear;
  });
});

onMounted(() => {
  window.scrollTo(0, 0);
  fetchEvents();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
