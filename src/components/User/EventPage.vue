<!-- <template>
  <div class="min-h-screen pb-32 overflow-x-hidden bg-[#FAFAFA]">
    <div
      class="px-6 pt-32 pb-16 text-center bg-white border-b border-gray-100 md:pt-40 md:pb-24"
    >
      <h4
        class="font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-6 text-gray-400"
      >
        The Solher Archive
      </h4>
      <h1
        class="max-w-4xl mx-auto mb-8 font-serif text-4xl leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
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

    <div class="px-6 py-12 mx-auto max-w-[1400px]">
      <div
        class="flex flex-col items-center justify-between gap-6 mb-16 md:flex-row md:mb-24"
      >
        <div class="flex flex-wrap justify-center gap-3 md:justify-start">
          <button
            @click="activeSeason = 'All'"
            :class="
              activeSeason === 'All'
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
          >
            All Collections
          </button>
          <button
            v-for="season in availableSeasons"
            :key="season"
            @click="activeSeason = season"
            :class="
              activeSeason === season
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
          >
            {{ season }}
          </button>
        </div>

        <div class="relative">
          <select
            v-model="activeYear"
            class="py-2 pl-4 pr-10 text-xs font-bold tracking-widest text-black uppercase bg-transparent border-b-2 border-black outline-none appearance-none cursor-pointer focus:ring-0"
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
          class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
      </div>

      <div v-else-if="filteredEvents.length > 0" class="space-y-32 md:space-y-48">
        <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="flex flex-col gap-10 md:items-center lg:gap-20"
          :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
        >
          <div class="w-full md:w-5/12 lg:w-1/3 animate-fade-in">
            <div class="sticky top-32">
              <span
                class="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-widest text-gray-500 uppercase border border-gray-200 rounded-full"
              >
                {{ event.season || "Editorial" }} • {{ getYear(event.event_date) }}
              </span>
              <h2 class="mb-6 font-serif text-3xl leading-tight text-black md:text-5xl">
                {{ event.title }}
              </h2>
              <div class="w-12 h-1 mb-8 bg-black"></div>
              <p
                class="text-sm font-light leading-relaxed text-justify text-gray-600 md:text-base md:text-left"
              >
                {{
                  event.description ||
                  "Explore the visual narrative of this exclusive collection."
                }}
              </p>

              <p class="mt-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {{ event.images.length }} Moments Captured
              </p>
            </div>
          </div>

          <div class="w-full md:w-7/12 lg:w-2/3 animate-fade-in">
            <div
              v-if="event.images.length === 1"
              class="overflow-hidden bg-gray-100 shadow-lg rounded-xl group"
            >
              <img
                :src="getImgUrl(event.images[0])"
                class="object-cover w-full h-auto min-h-[500px] transition-transform duration-1000 group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <div
              v-else
              class="flex gap-4 pb-6 overflow-x-auto snap-x snap-mandatory custom-scrollbar"
            >
              <div
                v-for="(img, imgIdx) in event.images"
                :key="imgIdx"
                class="relative flex-shrink-0 w-[85%] md:w-[70%] snap-center overflow-hidden bg-gray-100 rounded-xl shadow-md group"
              >
                <img
                  :src="getImgUrl(img)"
                  class="object-cover w-full h-[500px] md:h-[650px] transition-transform duration-1000 group-hover:scale-105"
                  loading="lazy"
                />
                <div
                  class="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
                >
                  {{ imgIdx + 1 }} / {{ event.images.length }}
                </div>
              </div>
            </div>
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
          class="mt-6 text-xs font-bold tracking-widest text-black underline uppercase hover:text-gray-500"
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
    const res = await axios.get(`${BASE_URL}/events`);
    // Parse the JSON string to Array safely
    events.value = res.data.map((ev) => ({
      ...ev,
      images: typeof ev.images === "string" ? JSON.parse(ev.images) : ev.images,
    }));
  } catch (error) {
    console.error("Gagal menarik data event:", error);
  } finally {
    isLoading.value = false;
  }
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
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Custom Scrollbar for the horizontal slider */
.custom-scrollbar::-webkit-scrollbar {
  height: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style> -->

<!-- <template>
  <div class="min-h-screen pb-32 overflow-x-hidden bg-[#FAFAFA]">
    <div
      class="px-6 pt-32 pb-16 text-center bg-white border-b border-gray-100 md:pt-40 md:pb-24"
    >
      <h4
        class="font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-6 text-gray-400"
      >
        The Solher Archive
      </h4>
      <h1
        class="max-w-4xl mx-auto mb-8 font-serif text-4xl leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
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

    <div class="px-6 py-12 mx-auto max-w-[1400px]">
      <div
        class="flex flex-col items-center justify-between gap-6 mb-16 md:flex-row md:mb-24"
      >
        <div class="flex flex-wrap justify-center gap-3 md:justify-start">
          <button
            @click="activeSeason = 'All'"
            :class="
              activeSeason === 'All'
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
          >
            All Collections
          </button>
          <button
            v-for="season in availableSeasons"
            :key="season"
            @click="activeSeason = season"
            :class="
              activeSeason === season
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
          >
            {{ season }}
          </button>
        </div>

        <div class="relative">
          <select
            v-model="activeYear"
            class="py-2 pl-4 pr-10 text-xs font-bold tracking-widest text-black uppercase bg-transparent border-b-2 border-black outline-none appearance-none cursor-pointer focus:ring-0"
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
          class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
      </div>

      <div v-else-if="filteredEvents.length > 0" class="space-y-32 md:space-y-48">
        <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="flex flex-col gap-10 md:items-center lg:gap-20"
          :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
        >
          <div class="w-full md:w-5/12 lg:w-1/3 animate-fade-in">
            <div class="sticky top-32">
              <span
                class="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-widest text-gray-500 uppercase border border-gray-200 rounded-full"
              >
                {{ event.season || "Editorial" }} • {{ getYear(event.event_date) }}
              </span>
              <h2 class="mb-6 font-serif text-3xl leading-tight text-black md:text-5xl">
                {{ event.title }}
              </h2>
              <div class="w-12 h-1 mb-8 bg-black"></div>
              <p
                class="text-sm font-light leading-relaxed text-justify text-gray-600 md:text-base md:text-left"
              >
                {{
                  event.description ||
                  "Explore the visual narrative of this exclusive collection."
                }}
              </p>

              <p class="mt-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {{ event.images.length }} Moments Captured
              </p>
            </div>
          </div>

          <div
            class="relative w-full md:w-7/12 lg:w-2/3 h-[500px] md:h-[700px] overflow-hidden bg-gray-100 rounded-xl shadow-lg group animate-fade-in"
            @wheel="(e) => handleImageScroll(e, event)"
          >
            <transition-group name="crossfade">
              <img
                v-for="(img, imgIdx) in event.images"
                :key="img"
                v-show="event.activeIndex === imgIdx"
                :src="getImgUrl(img)"
                class="absolute inset-0 object-cover w-full h-full transition-transform duration-[2000ms] group-hover:scale-105"
                loading="lazy"
              />
            </transition-group>

            <div
              v-if="event.images.length > 1"
              class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none bg-black/10 group-hover:opacity-100"
            >
              <span
                class="px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase bg-black/50 backdrop-blur-sm rounded-full"
              >
                Scroll to Shuffle
              </span>
            </div>

            <div
              v-if="event.images.length > 1"
              class="absolute z-10 px-3 py-1 font-bold tracking-widest uppercase rounded-full shadow-sm bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[10px] text-black"
            >
              {{ event.activeIndex + 1 }} / {{ event.images.length }}
            </div>
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
          class="mt-6 text-xs font-bold tracking-widest text-black underline uppercase hover:text-gray-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const events = ref([]);
const isLoading = ref(true);

// Filters
const activeSeason = ref("All");
const activeYear = ref("All");

// Timers untuk Auto-Shuffle
const eventTimers = ref({});
const wheelTimeouts = ref({}); // Untuk mencegah scroll terlalu cepat (throttle)

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
    const res = await axios.get(`${BASE_URL}/events`);
    events.value = res.data.map((ev) => ({
      ...ev,
      images: typeof ev.images === "string" ? JSON.parse(ev.images) : ev.images,
      activeIndex: 0, // [BARU] Menambahkan state aktif per event
    }));
    startAutoShuffle(); // Mulai timer setelah data dimuat
  } catch (error) {
    console.error("Gagal menarik data event:", error);
  } finally {
    isLoading.value = false;
  }
};

// =======================================================================
// [BARU] LOGIKA SHUFFLE (AUTO & SCROLL)
// =======================================================================
const startAutoShuffle = () => {
  clearAllTimers();
  filteredEvents.value.forEach((event) => {
    if (event.images && event.images.length > 1) {
      eventTimers.value[event.id] = setInterval(() => {
        event.activeIndex = (event.activeIndex + 1) % event.images.length;
      }, 3000); // Ganti gambar otomatis setiap 3 detik
    }
  });
};

const clearAllTimers = () => {
  Object.values(eventTimers.value).forEach((timer) => clearInterval(timer));
};

const handleImageScroll = (e, eventItem) => {
  if (eventItem.images.length <= 1) return;

  // Menghentikan scroll halaman saat user scroll di atas gambar
  e.preventDefault();

  const now = Date.now();
  // Cooldown 600ms agar gambar tidak berputar seperti mesin slot
  if (
    wheelTimeouts.value[eventItem.id] &&
    now - wheelTimeouts.value[eventItem.id] < 600
  ) {
    return;
  }
  wheelTimeouts.value[eventItem.id] = now;

  // Logika Next/Prev berdasarkan arah scroll mouse
  if (e.deltaY > 0) {
    // Scroll Bawah -> Gambar Selanjutnya
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  } else {
    // Scroll Atas -> Gambar Sebelumnya
    eventItem.activeIndex =
      (eventItem.activeIndex - 1 + eventItem.images.length) % eventItem.images.length;
  }

  // Reset timer auto-shuffle khusus untuk event ini agar tidak ganda
  clearInterval(eventTimers.value[eventItem.id]);
  eventTimers.value[eventItem.id] = setInterval(() => {
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  }, 3000);
};

// =======================================================================

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
    const matchSeason =
      activeSeason.value === "All" || event.season === activeSeason.value;
    const matchYear =
      activeYear.value === "All" || getYear(event.event_date) === activeYear.value;
    return matchSeason && matchYear;
  });
});

// Jika filter diubah, reset timer untuk gambar-gambar yang baru difilter
watch([activeSeason, activeYear], () => {
  startAutoShuffle();
});

onMounted(() => {
  window.scrollTo(0, 0);
  fetchEvents();
});

onUnmounted(() => {
  clearAllTimers(); // Cegah memory leak saat pindah halaman
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* [BARU] Animasi Crossfade untuk Shuffle Gambar */
.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}
</style> -->

<!-- <template>
  <div class="min-h-screen pb-32 overflow-x-hidden bg-[#FAFAFA]">
    <div
      class="px-6 pt-32 pb-16 text-center bg-white border-b border-gray-100 md:pt-40 md:pb-24"
    >
      <h4
        class="font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-6 text-gray-400"
      >
        The Solher Archive
      </h4>
      <h1
        class="max-w-4xl mx-auto mb-8 font-serif text-4xl leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
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

    <div class="px-6 py-12 mx-auto max-w-[1400px]">
      <div
        class="flex flex-col items-center justify-between gap-6 mb-16 md:flex-row md:mb-24"
      >
        <div class="flex flex-wrap justify-center gap-3 md:justify-start">
          <button
            @click="activeSeason = 'All'"
            :class="
              activeSeason === 'All'
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
          >
            All Collections
          </button>
          <button
            v-for="season in availableSeasons"
            :key="season"
            @click="activeSeason = season"
            :class="
              activeSeason === season
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
          >
            {{ season }}
          </button>
        </div>

        <div class="relative">
          <select
            v-model="activeYear"
            class="py-2 pl-4 pr-10 text-xs font-bold tracking-widest text-black uppercase bg-transparent border-b-2 border-black outline-none appearance-none cursor-pointer focus:ring-0"
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
          class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
      </div>

      <div v-else-if="filteredEvents.length > 0" class="space-y-32 md:space-y-48">
        <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="flex flex-col gap-10 md:items-center lg:gap-20"
          :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
        >
          <div class="w-full md:w-5/12 lg:w-1/3 animate-fade-in">
            <div class="sticky top-32">
              <span
                class="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-widest text-gray-500 uppercase border border-gray-200 rounded-full"
              >
                {{ event.season || "Editorial" }} • {{ getYear(event.event_date) }}
              </span>
              <h2 class="mb-6 font-serif text-3xl leading-tight text-black md:text-5xl">
                {{ event.title }}
              </h2>
              <div class="w-12 h-1 mb-8 bg-black"></div>
              <p
                class="text-sm font-light leading-relaxed text-justify text-gray-600 md:text-base md:text-left"
              >
                {{
                  event.description ||
                  "Explore the visual narrative of this exclusive collection."
                }}
              </p>

              <p class="mt-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {{ event.images.length }} Moments Captured
              </p>
            </div>
          </div>

          <div
            class="relative w-full md:w-7/12 lg:w-2/3 aspect-[2/3] overflow-hidden bg-gray-100 rounded-xl shadow-lg group animate-fade-in"
            @wheel="(e) => handleImageScroll(e, event)"
          >
            <transition-group name="crossfade">
              <img
                v-for="(img, imgIdx) in event.images"
                :key="img"
                v-show="event.activeIndex === imgIdx"
                :src="getImgUrl(img)"
                class="absolute inset-0 object-cover w-full h-full transition-transform duration-[2000ms] group-hover:scale-105"
                loading="lazy"
              />
            </transition-group>

            <div
              v-if="event.images.length > 1"
              class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none bg-black/10 group-hover:opacity-100"
            >
              <span
                class="px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase bg-black/50 backdrop-blur-sm rounded-full"
              >
                Scroll to Shuffle
              </span>
            </div>

            <div
              v-if="event.images.length > 1"
              class="absolute z-10 px-3 py-1 font-bold tracking-widest uppercase rounded-full shadow-sm bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[10px] text-black"
            >
              {{ event.activeIndex + 1 }} / {{ event.images.length }}
            </div>
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
          class="mt-6 text-xs font-bold tracking-widest text-black underline uppercase hover:text-gray-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const events = ref([]);
const isLoading = ref(true);

// Filters
const activeSeason = ref("All");
const activeYear = ref("All");

// Timers untuk Auto-Shuffle
const eventTimers = ref({});
const wheelTimeouts = ref({}); // Untuk mencegah scroll terlalu cepat (throttle)

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
    const res = await axios.get(`${BASE_URL}/events`);
    events.value = res.data.map((ev) => ({
      ...ev,
      images: typeof ev.images === "string" ? JSON.parse(ev.images) : ev.images,
      activeIndex: 0, // Menambahkan state aktif per event
    }));
    startAutoShuffle(); // Mulai timer setelah data dimuat
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
      }, 3000); // Ganti gambar otomatis setiap 3 detik
    }
  });
};

const clearAllTimers = () => {
  Object.values(eventTimers.value).forEach((timer) => clearInterval(timer));
};

const handleImageScroll = (e, eventItem) => {
  if (eventItem.images.length <= 1) return;

  // Menghentikan scroll halaman saat user scroll di atas gambar
  e.preventDefault();

  const now = Date.now();
  // Cooldown 600ms agar gambar tidak berputar seperti mesin slot
  if (
    wheelTimeouts.value[eventItem.id] &&
    now - wheelTimeouts.value[eventItem.id] < 600
  ) {
    return;
  }
  wheelTimeouts.value[eventItem.id] = now;

  // Logika Next/Prev berdasarkan arah scroll mouse
  if (e.deltaY > 0) {
    // Scroll Bawah -> Gambar Selanjutnya
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  } else {
    // Scroll Atas -> Gambar Sebelumnya
    eventItem.activeIndex =
      (eventItem.activeIndex - 1 + eventItem.images.length) % eventItem.images.length;
  }

  // Reset timer auto-shuffle khusus untuk event ini agar tidak ganda
  clearInterval(eventTimers.value[eventItem.id]);
  eventTimers.value[eventItem.id] = setInterval(() => {
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  }, 3000);
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
    const matchSeason =
      activeSeason.value === "All" || event.season === activeSeason.value;
    const matchYear =
      activeYear.value === "All" || getYear(event.event_date) === activeYear.value;
    return matchSeason && matchYear;
  });
});

// Jika filter diubah, reset timer untuk gambar-gambar yang baru difilter
watch([activeSeason, activeYear], () => {
  startAutoShuffle();
});

onMounted(() => {
  window.scrollTo(0, 0);
  fetchEvents();
});

onUnmounted(() => {
  clearAllTimers(); // Cegah memory leak saat pindah halaman
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animasi Crossfade untuk Shuffle Gambar */
.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}
</style> -->

<template>
  <div class="min-h-screen pb-32 overflow-x-hidden bg-[#FAFAFA]">
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

    <div class="px-6 py-12 mx-auto max-w-[1400px]">
      <div
        class="flex flex-col items-center justify-between gap-6 mb-16 md:flex-row md:mb-24"
      >
        <div class="flex flex-wrap justify-center gap-3 md:justify-start">
          <button
            @click="activeSeason = 'All'"
            :class="
              activeSeason === 'All'
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
          >
            All Collections
          </button>
          <button
            v-for="season in availableSeasons"
            :key="season"
            @click="activeSeason = season"
            :class="
              activeSeason === season
                ? 'bg-black text-white border-black shadow-md'
                : 'bg-transparent text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all border rounded-full"
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
          class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
      </div>

      <div v-else-if="filteredEvents.length > 0" class="space-y-32 md:space-y-48">
        <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="flex flex-col gap-10 md:items-center lg:gap-16"
          :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
        >
          <div class="w-full md:w-1/2 lg:w-5/12 animate-fade-in">
            <div class="sticky top-32">
              <span
                class="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-widest text-gray-500 uppercase border border-gray-200 rounded-full"
              >
                {{ event.season || "Editorial" }} • {{ getYear(event.event_date) }}
              </span>
              <h2 class="mb-6 font-serif text-3xl leading-tight text-black md:text-5xl">
                {{ event.title }}
              </h2>
              <div class="w-12 h-1 mb-8 bg-black"></div>
              <p
                class="text-sm font-light leading-relaxed text-gray-600 md:text-base text-justify md:text-left"
              >
                {{
                  event.description ||
                  "Explore the visual narrative of this exclusive collection."
                }}
              </p>

              <p class="mt-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {{ event.images.length }} Moments Captured
              </p>
            </div>
          </div>

          <div
            class="relative w-full md:w-1/2 lg:w-7/12 aspect-[3/4] md:aspect-[4/5] max-h-[85vh] max-w-[600px] mx-auto overflow-hidden bg-gray-100 rounded-xl shadow-lg group animate-fade-in"
            @wheel="(e) => handleImageScroll(e, event)"
          >
            <transition-group name="crossfade">
              <img
                v-for="(img, imgIdx) in event.images"
                :key="img"
                v-show="event.activeIndex === imgIdx"
                :src="getImgUrl(img)"
                class="absolute inset-0 object-contain w-full h-full transition-transform duration-[2000ms] group-hover:scale-105"
                loading="lazy"
              />
            </transition-group>

            <div
              v-if="event.images.length > 1"
              class="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 pointer-events-none bg-black/10 group-hover:opacity-100"
            >
              <span
                class="px-4 py-2 text-[10px] font-bold tracking-widest text-white uppercase bg-black/50 backdrop-blur-sm rounded-full"
              >
                Scroll to Shuffle
              </span>
            </div>

            <div
              v-if="event.images.length > 1"
              class="absolute z-10 px-3 py-1 font-bold tracking-widest uppercase rounded-full shadow-sm bottom-4 right-4 bg-white/90 backdrop-blur-sm text-[10px] text-black"
            >
              {{ event.activeIndex + 1 }} / {{ event.images.length }}
            </div>
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
          class="mt-6 text-xs font-bold tracking-widest text-black underline uppercase hover:text-gray-500"
        >
          Clear Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";

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
    const res = await axios.get(`${BASE_URL}/events`);
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
      }, 3000);
    }
  });
};

const clearAllTimers = () => {
  Object.values(eventTimers.value).forEach((timer) => clearInterval(timer));
};

const handleImageScroll = (e, eventItem) => {
  if (eventItem.images.length <= 1) return;

  e.preventDefault();

  const now = Date.now();
  if (
    wheelTimeouts.value[eventItem.id] &&
    now - wheelTimeouts.value[eventItem.id] < 600
  ) {
    return;
  }
  wheelTimeouts.value[eventItem.id] = now;

  if (e.deltaY > 0) {
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  } else {
    eventItem.activeIndex =
      (eventItem.activeIndex - 1 + eventItem.images.length) % eventItem.images.length;
  }

  clearInterval(eventTimers.value[eventItem.id]);
  eventTimers.value[eventItem.id] = setInterval(() => {
    eventItem.activeIndex = (eventItem.activeIndex + 1) % eventItem.images.length;
  }, 3000);
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
    const matchSeason =
      activeSeason.value === "All" || event.season === activeSeason.value;
    const matchYear =
      activeYear.value === "All" || getYear(event.event_date) === activeYear.value;
    return matchSeason && matchYear;
  });
});

watch([activeSeason, activeYear], () => {
  startAutoShuffle();
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
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 0.8s ease-in-out;
}
.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}
</style>
