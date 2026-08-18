<template>
  <div class="flex flex-col w-full h-screen bg-gray-50">
    <div
      class="flex items-center justify-between p-6 bg-white border-b border-gray-200 shrink-0"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900 font-serif">Telescope Monitor</h1>
        <p class="mt-1 text-xs text-gray-500 uppercase tracking-widest">
          Real-time Application Debugging & Tracing
        </p>
      </div>
      <button
        @click="refreshIframe"
        class="px-5 py-2.5 text-xs font-bold text-white uppercase transition-colors bg-black rounded-xl hover:bg-gray-800 shadow-md"
      >
        Refresh Monitor
      </button>
    </div>

    <div class="flex-grow p-6 overflow-hidden">
      <div
        class="relative w-full h-full overflow-hidden bg-white border border-gray-200 rounded-2xl shadow-sm"
      >
        <!-- Loading Indicator -->
        <div
          v-if="isLoading"
          class="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50/80 backdrop-blur-sm"
        >
          <div
            class="w-10 h-10 mb-4 border-4 border-gray-200 rounded-full border-t-black animate-spin"
          ></div>
          <p
            class="text-xs font-bold tracking-widest text-gray-500 uppercase animate-pulse"
          >
            Connecting to Radar...
          </p>
        </div>

        <!-- Frame Telescope -->
        <iframe
          ref="telescopeFrame"
          :src="telescopeUrl"
          class="w-full h-full border-0"
          @load="isLoading = false"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { BASE_URL } from "../../config/api.js";

// Membersihkan /api dari BASE_URL agar mengarah ke root backend
const backendRoot = BASE_URL.replace(/\/api\/?$/, "");

// Kunci token rahasia agar Laravel membuka pintu (bypass 403)
const secureToken = import.meta.env.VITE_TELESCOPE_TOKEN || "solher-secure-telescope-123";

// Inject token ke URL Iframe
const telescopeUrl = computed(() => `${backendRoot}/telescope?token=${secureToken}`);
const isLoading = ref(true);
const telescopeFrame = ref(null);

const refreshIframe = () => {
  isLoading.value = true;
  if (telescopeFrame.value) {
    telescopeFrame.value.src = telescopeUrl.value;
  }
};
</script>
