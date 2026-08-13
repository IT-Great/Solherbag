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

<!-- <template>
  <div class="min-h-screen pb-32 overflow-x-hidden bg-[#FAFAFA]">
    <div
      class="px-6 pt-32 pb-16 text-center bg-white border-b border-gray-100 md:pt-40 md:pb-24"
    >
      <h4
        class="font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-6 text-gray-400"
      >
        {{ $t("event.archive") }}
      </h4>
      <h1
        class="max-w-4xl mx-auto mb-8 font-serif text-4xl leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
      >
        {{ $t("event.moments") }}
        <span class="italic text-gray-500">{{ $t("event.elegance") }}</span>
      </h1>
      <p
        class="max-w-2xl mx-auto text-sm font-light leading-relaxed text-gray-600 md:text-base"
      >
        {{ $t("event.hero_desc") }}
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
            {{ $t("event.all_collections") }}
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
            <option value="All">{{ $t("event.all_years") }}</option>
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
                {{ event.season || $t("event.editorial") }} •
                {{ getYear(event.event_date) }}
              </span>
              <h2 class="mb-6 font-serif text-3xl leading-tight text-black md:text-5xl">
                {{ event.title }}
              </h2>
              <div class="w-12 h-1 mb-8 bg-black"></div>
              <p
                class="text-sm font-light leading-relaxed text-justify text-gray-600 md:text-base md:text-left"
              >
                {{ event.description || $t("event.no_desc") }}
              </p>

              <p class="mt-8 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {{ event.images.length }} {{ $t("event.moments_captured") }}
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
                {{ $t("event.scroll_shuffle") }}
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
          {{ $t("event.no_events") }}
        </p>
        <button
          @click="
            activeSeason = 'All';
            activeYear = 'All';
          "
          class="mt-6 text-xs font-bold tracking-widest text-black underline uppercase hover:text-gray-500"
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

import { useI18n } from "vue-i18n"; // [TAMBAHKAN INI]

const { t, locale } = useI18n(); // [TAMBAHKAN INI JUGA]

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
      headers: {
        "Accept-Language": locale.value, // Akan mengirimkan 'en' atau 'id'
      },
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

// [TAMBAHKAN KODE INI]
// Pantau perubahan bahasa. Jika berubah, tarik ulang data dari API!
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
</style> -->

<template>
  <!-- 👇 [CRO 1] READING PROGRESS BAR 👇 -->
  <div class="fixed top-0 left-0 z-[999] h-1.5 bg-gray-200 w-full">
    <div
      class="h-full bg-black transition-all duration-150 ease-out"
      :style="{ width: scrollProgress + '%' }"
    ></div>
  </div>

  <!-- 👇 [CRO 2] FLOATING EXPLORED BADGE 👇 -->
  <div
    class="fixed z-[900] bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-8 transition-all duration-500"
    :class="
      scrollProgress > 5
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-10 pointer-events-none'
    "
  >
    <div
      class="flex items-center gap-3 px-5 py-2.5 bg-black/90 backdrop-blur-md text-white rounded-full shadow-2xl border border-gray-700"
    >
      <div
        class="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center overflow-hidden relative"
      >
        <div
          class="absolute bottom-0 w-full bg-white transition-all duration-300"
          :style="{ height: scrollProgress + '%' }"
        ></div>
      </div>
      <span class="text-[10px] font-black tracking-[0.2em] uppercase">
        Archive Explored: {{ Math.round(scrollProgress) }}%
      </span>
    </div>
  </div>

  <div class="min-h-screen pb-32 overflow-x-hidden bg-[#FAFAFA] relative">
    <div
      class="px-6 pt-32 pb-16 text-center bg-white border-b border-gray-100 md:pt-40 md:pb-24 relative overflow-hidden"
    >
      <!-- Ornamen Dekoratif -->
      <div
        class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gray-50 rounded-full blur-3xl -z-10 opacity-50"
      ></div>

      <h4
        class="font-bold tracking-[0.3em] text-[10px] md:text-xs uppercase mb-6 text-gray-400"
      >
        {{ $t("event.archive") }}
      </h4>
      <h1
        class="max-w-4xl mx-auto mb-8 font-serif text-4xl leading-tight tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
      >
        {{ $t("event.moments") }}
        <span class="italic text-gray-400">{{ $t("event.elegance") }}</span>
      </h1>
      <p
        class="max-w-2xl mx-auto text-sm font-light leading-relaxed text-gray-600 md:text-base"
      >
        {{ $t("event.hero_desc") }}
      </p>

      <!-- 👇 [CRO 3] BOUNCING SCROLL INDICATOR 👇 -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60"
      >
        <span class="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-400"
          >Scroll to Discover</span
        >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </div>

    <div class="px-6 py-12 mx-auto max-w-[1400px]">
      <!-- Filter Controls -->
      <div
        class="flex flex-col items-center justify-between gap-6 mb-16 md:flex-row md:mb-24"
      >
        <div class="flex flex-wrap justify-center gap-3 md:justify-start">
          <button
            @click="activeSeason = 'All'"
            :class="
              activeSeason === 'All'
                ? 'bg-black text-white border-black shadow-lg scale-105'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black hover:bg-gray-50'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border rounded-full"
          >
            {{ $t("event.all_collections") }}
          </button>
          <button
            v-for="season in availableSeasons"
            :key="season"
            @click="activeSeason = season"
            :class="
              activeSeason === season
                ? 'bg-black text-white border-black shadow-lg scale-105'
                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-black hover:bg-gray-50'
            "
            class="px-6 py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border rounded-full"
          >
            {{ season }}
          </button>
        </div>

        <div class="relative group">
          <select
            v-model="activeYear"
            class="py-2.5 pl-5 pr-12 text-xs font-black tracking-[0.2em] text-black uppercase bg-white border-2 border-black rounded-full outline-none appearance-none cursor-pointer focus:ring-0 shadow-sm transition-transform group-hover:scale-105"
          >
            <option value="All">{{ $t("event.all_years") }}</option>
            <option v-for="year in availableYears" :key="year" :value="year">
              {{ year }}
            </option>
          </select>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="absolute w-4 h-4 text-black -translate-y-1/2 pointer-events-none right-4 top-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <!-- Loading State -->
      <div
        v-if="isLoading"
        class="flex flex-col items-center justify-center py-32 opacity-50"
      >
        <div
          class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin mb-4"
        ></div>
        <p
          class="text-xs font-bold tracking-widest uppercase text-gray-400 animate-pulse"
        >
          Unveiling Archives...
        </p>
      </div>

      <!-- Main Event Timeline -->
      <div
        v-else-if="filteredEvents.length > 0"
        class="relative space-y-32 md:space-y-48"
      >
        <!-- 👇 [CRO 4] TIMELINE CONNECTOR 👇 -->
        <div
          class="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-300 to-transparent -translate-x-1/2 -z-10 hidden md:block"
        ></div>

        <div
          v-for="(event, index) in filteredEvents"
          :key="event.id"
          class="flex flex-col gap-10 md:items-center lg:gap-20 reveal-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out"
          :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
        >
          <!-- Ornamen Titik Timeline -->
          <div
            class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-4 border-black rounded-full z-10 shadow-lg"
          ></div>

          <!-- Bagian Teks -->
          <div class="w-full md:w-1/2 lg:w-5/12">
            <div
              class="sticky top-32 p-6 md:p-8 bg-white/40 backdrop-blur-md rounded-3xl border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500"
            >
              <span
                class="inline-block px-4 py-1.5 mb-6 text-[9px] font-black tracking-[0.2em] text-black uppercase bg-gray-100 rounded-full shadow-sm"
              >
                {{ event.season || $t("event.editorial") }} •
                {{ getYear(event.event_date) }}
              </span>
              <h2
                class="mb-6 font-serif text-3xl leading-tight text-gray-900 md:text-5xl group-hover:text-black transition-colors"
              >
                {{ event.title }}
              </h2>
              <div class="w-16 h-1 mb-8 bg-black rounded-full"></div>
              <p
                class="text-sm font-medium leading-relaxed text-gray-600 md:text-base text-justify"
              >
                {{ event.description || $t("event.no_desc") }}
              </p>

              <div class="mt-8 flex items-center gap-3">
                <div class="flex -space-x-3 overflow-hidden">
                  <div
                    v-for="i in Math.min(event.images.length, 3)"
                    :key="i"
                    class="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                  >
                    <img
                      :src="getImgUrl(event.images[i - 1])"
                      class="w-full h-full object-cover grayscale opacity-70"
                    />
                  </div>
                </div>
                <p
                  class="text-[10px] font-black tracking-[0.1em] text-gray-400 uppercase"
                >
                  {{ event.images.length }} {{ $t("event.moments_captured") }}
                </p>
              </div>
            </div>
          </div>

          <!-- Bagian Media (Gambar Slider) -->
          <div
            class="relative w-full md:w-1/2 lg:w-7/12 aspect-[3/4] md:aspect-[4/5] max-h-[85vh] max-w-[600px] mx-auto overflow-hidden bg-gray-100 rounded-2xl shadow-2xl group cursor-ns-resize"
            @wheel="(e) => handleImageScroll(e, event)"
          >
            <transition-group name="crossfade">
              <img
                v-for="(img, imgIdx) in event.images"
                :key="img"
                v-show="event.activeIndex === imgIdx"
                :src="getImgUrl(img)"
                class="absolute inset-0 object-contain w-full h-full transition-transform duration-[3000ms] group-hover:scale-105 bg-gray-50"
                loading="lazy"
              />
            </transition-group>

            <!-- Overlay Instruksi -->
            <div
              v-if="event.images.length > 1"
              class="absolute inset-0 flex items-center justify-center transition-opacity duration-700 opacity-0 pointer-events-none bg-black/20 group-hover:opacity-100 backdrop-blur-[2px]"
            >
              <div class="flex flex-col items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-8 h-8 text-white animate-bounce"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                  />
                </svg>
                <span
                  class="px-5 py-2.5 text-[10px] font-black tracking-[0.3em] text-white uppercase bg-black/60 backdrop-blur-md rounded-full shadow-2xl border border-white/20"
                >
                  {{ $t("event.scroll_shuffle") }}
                </span>
              </div>
            </div>

            <!-- Page Counter -->
            <div
              v-if="event.images.length > 1"
              class="absolute z-10 px-4 py-1.5 font-bold tracking-[0.2em] uppercase rounded-full shadow-lg bottom-5 right-5 bg-white/90 backdrop-blur-md text-[9px] text-black border border-gray-200"
            >
              {{ event.activeIndex + 1 }} / {{ event.images.length }}
            </div>
          </div>
        </div>

        <!-- 👇 [CRO 5] END OF JOURNEY REWARD 👇 -->
        <div
          class="pt-24 pb-12 text-center reveal-on-scroll opacity-0 translate-y-12 transition-all duration-1000 ease-out"
        >
          <h3 class="font-serif text-2xl md:text-4xl text-gray-900 mb-4">
            You've reached the end of the archive.
          </h3>
          <p class="text-gray-500 text-sm md:text-base mb-8">
            Tinggalkan jejak Anda dalam sejarah Solher. Temukan koleksi produk dari event
            di atas.
          </p>
          <button
            @click="$router.push('/collections')"
            class="px-10 py-4 bg-black text-white text-xs font-black uppercase tracking-[0.3em] rounded-full hover:bg-gray-800 transition-all shadow-xl hover:-translate-y-1 hover:shadow-2xl"
          >
            Shop The Collections
          </button>
        </div>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center py-32 text-center animate-fade-in border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50/50 mt-10"
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
        <p class="font-serif text-xl italic text-gray-500">{{ $t("event.no_events") }}</p>
        <button
          @click="
            activeSeason = 'All';
            activeYear = 'All';
          "
          class="mt-6 px-6 py-2.5 text-xs font-bold tracking-widest text-black bg-white border border-gray-200 rounded-full shadow-sm uppercase hover:bg-gray-50 transition-all"
        >
          {{ $t("event.clear_filters") }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed, watch, nextTick } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const events = ref([]);
const isLoading = ref(true);
const scrollProgress = ref(0); // State untuk garis progress
let scrollObserver = null;

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

    // Inisialisasi Intersection Observer setelah elemen di-render
    nextTick(() => {
      initScrollReveal();
    });
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
      }, 3500); // Diperlambat sedikit agar lebih elegan
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
  if (wheelTimeouts.value[eventItem.id] && now - wheelTimeouts.value[eventItem.id] < 600)
    return;
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
  }, 3500);
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

// Update animasi ketika filter diubah
watch([activeSeason, activeYear], () => {
  startAutoShuffle();
  nextTick(() => {
    initScrollReveal();
  });
});

watch(locale, () => {
  fetchEvents();
});

// 👇 LOGIKA PROGRESS BAR SCROLL 👇
const handleScrollProgress = () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  scrollProgress.value = Math.min(scrolled, 100);
};

// 👇 LOGIKA INTERSECTION OBSERVER UNTUK ANIMASI FADE-IN SAAT SCROLL 👇
const initScrollReveal = () => {
  if (scrollObserver) {
    scrollObserver.disconnect();
  }

  scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Hilangkan class opacity-0 dan translate-y-12 untuk memunculkan elemen
          entry.target.classList.remove("opacity-0", "translate-y-12");
          entry.target.classList.add("opacity-100", "translate-y-0");
          // Stop mengamati setelah elemen muncul (muncul 1x saja)
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      threshold: 0.1, // Elemen mulai muncul saat 10% bagiannya terlihat di layar
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const elements = document.querySelectorAll(".reveal-on-scroll");
  elements.forEach((el) => scrollObserver.observe(el));
};

onMounted(() => {
  window.scrollTo(0, 0);
  fetchEvents();
  window.addEventListener("scroll", handleScrollProgress);
});

onUnmounted(() => {
  clearAllTimers();
  window.removeEventListener("scroll", handleScrollProgress);
  if (scrollObserver) {
    scrollObserver.disconnect();
  }
});
</script>

<style scoped>
.crossfade-enter-active,
.crossfade-leave-active {
  transition: opacity 1.2s ease-in-out;
}
.crossfade-enter-from,
.crossfade-leave-to {
  opacity: 0;
}
</style>
