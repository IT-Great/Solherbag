<template>
  <div class="p-6 md:p-10 animate-fade-in">
    <Breadcrumb />
    <div class="flex items-center gap-4 mb-8">
      <button
        @click="$router.push('/admin/events')"
        class="flex items-center justify-center w-10 h-10 transition-colors bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-600"
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
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Event Details
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Review information and image gallery for this event.
        </p>
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col gap-6 lg:flex-row">
      <div class="w-full lg:w-1/3 h-[400px] bg-gray-100 rounded-2xl animate-pulse"></div>
      <div class="w-full lg:w-2/3 h-[600px] bg-gray-100 rounded-2xl animate-pulse"></div>
    </div>

    <div v-else-if="event" class="flex flex-col gap-6 lg:flex-row items-start">
      <div class="w-full lg:w-1/3 lg:sticky lg:top-24 space-y-6">
        <div class="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
          <div class="flex items-center justify-between mb-6">
            <span
              :class="
                event.status === 'published'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-200 text-gray-700'
              "
              class="px-3 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-lg"
            >
              {{ event.status }}
            </span>
            <span class="text-xs font-medium text-gray-500">{{ event.event_date }}</span>
          </div>

          <h2 class="mb-4 text-2xl font-bold text-gray-900 leading-snug">
            {{ event.title }}
          </h2>

          <div class="py-4 border-t border-b border-gray-100 my-4">
            <p class="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
              Category / Season
            </p>
            <p class="text-sm font-medium text-gray-800">
              {{ event.season || "Not Specified" }}
            </p>
          </div>

          <div>
            <p class="text-xs font-bold tracking-widest text-gray-400 uppercase mb-2">
              Copywriting / Description
            </p>
            <p class="text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">
              {{ event.description || "No description provided." }}
            </p>
          </div>
        </div>

        <div class="p-6 bg-gray-50 border border-gray-200 rounded-2xl">
          <h3 class="mb-4 text-xs font-bold tracking-widest text-gray-500 uppercase">
            System Info
          </h3>
          <ul class="space-y-3 text-sm text-gray-600">
            <li class="flex justify-between">
              <span class="text-gray-400">Event ID</span>
              <span class="font-mono font-medium text-gray-900">#{{ event.id }}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-gray-400">Total Photos</span>
              <span class="font-bold text-gray-900">{{ parsedImages.length }}</span>
            </li>
            <li class="flex justify-between">
              <span class="text-gray-400">Created At</span>
              <span class="text-right">{{
                new Date(event.created_at).toLocaleString()
              }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="w-full lg:w-2/3">
        <div class="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-base font-bold text-gray-900">Event Gallery</h3>
            <span class="text-xs text-gray-500">{{ parsedImages.length }} Photos</span>
          </div>

          <div
            v-if="parsedImages.length > 0"
            class="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div
              v-for="(img, idx) in parsedImages"
              :key="idx"
              class="relative overflow-hidden bg-gray-100 rounded-xl group aspect-[4/5]"
            >
              <img
                :src="getImgUrl(img)"
                class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                alt="Event photo"
              />
              <div
                class="absolute top-3 left-3 px-2 py-1 text-[10px] font-bold text-white bg-black/50 backdrop-blur-sm rounded-md shadow-sm pointer-events-none"
              >
                #{{ idx + 1 }}
              </div>
            </div>
          </div>

          <div
            v-else
            class="flex flex-col items-center justify-center py-24 bg-gray-50 border border-gray-100 border-dashed rounded-xl"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-12 h-12 mb-3 text-gray-300"
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
            <p class="text-sm font-medium text-gray-400">
              No images attached to this event.
            </p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-32 text-center">
      <p class="text-lg font-bold text-gray-800">Event not found.</p>
      <p class="mt-2 text-sm text-gray-500">
        The event might have been deleted or the ID is incorrect.
      </p>
      <button
        @click="$router.push('/admin/events')"
        class="px-6 py-2 mt-6 text-sm font-bold text-white bg-black rounded-lg hover:bg-gray-800"
      >
        Return to Events
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api"; // Sesuaikan path-nya
import Breadcrumb from "./Layout/Breadcrumb.vue";

const route = useRoute();
const router = useRouter();
const event = ref(null);
const isLoading = ref(true);

const getImgUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const baseUrlFixed = BASE_URL.replace("/api", "");
  return `${baseUrlFixed}/storage/${path}`;
};

// Computed property untuk memastikan images adalah array yang valid
const parsedImages = computed(() => {
  if (!event.value || !event.value.images) return [];
  if (typeof event.value.images === "string") {
    try {
      return JSON.parse(event.value.images);
    } catch (e) {
      return [];
    }
  }
  return event.value.images;
});

const fetchEventDetail = async () => {
  try {
    const token = localStorage.getItem("admin_token") || localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/admin/events/${route.params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    event.value = res.data;
  } catch (error) {
    console.error("Error fetching event details:", error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchEventDetail();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
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
</style>
