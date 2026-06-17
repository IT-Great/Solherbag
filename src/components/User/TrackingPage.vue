<!-- <template>
  <div class="max-w-3xl min-h-screen px-6 py-20 mx-auto">
    
    <div class="mb-8">
      <button @click="$router.push('/orderpage')" class="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-black">
        <span>&larr;</span> Back to Orders
      </button>
      <h1 class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl">Shipment Tracking</h1>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"></div>
      <p class="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">Fetching latest updates...</p>
    </div>

    <div v-else-if="error" class="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
      <p class="font-bold text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl animate-fade-in">
      
      <div class="p-6 border-b border-gray-100 bg-gray-50 md:p-8">
        <div class="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill Number</p>
            <p class="font-mono text-xl font-bold text-black">{{ trackingData.waybill_id }}</p>
          </div>
          <div class="md:text-right">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Courier</p>
            <p class="font-bold text-gray-800 uppercase">{{ trackingData.courier?.company }} - {{ trackingData.courier?.type }}</p>
          </div>
        </div>
        <div class="flex items-center gap-3 mt-6">
          <span class="bg-black text-white px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
            {{ trackingData.status }}
          </span>
        </div>
      </div>

      <div class="p-6 md:p-8">
        <div v-if="trackingData.history && trackingData.history.length > 0" class="relative ml-3 space-y-8 border-l border-gray-200">
          
          <div v-for="(history, index) in trackingData.history" :key="index" class="relative pl-8">
            <span 
              :class="index === 0 ? 'bg-black ring-4 ring-gray-100' : 'bg-gray-300'"
              class="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full"
            ></span>
            
            <div :class="index === 0 ? 'opacity-100' : 'opacity-60'">
              <p class="mb-1 text-sm font-bold text-gray-900">{{ history.note }}</p>
              <p class="text-xs font-medium text-gray-500">{{ formatDate(history.updated_at) }}</p>
            </div>
          </div>

        </div>
        <div v-else class="py-10 italic text-center text-gray-400">
          No tracking history available yet.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from "../../config/api";

const route = useRoute();
const trackingData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const fetchTracking = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/transactions/${route.params.id}/tracking`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    trackingData.value = res.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch tracking data.';
  } finally {
    isLoading.value = false;
  }
};

const formatDate = (dateString) => {
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(fetchTracking);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> -->

<!-- Sebelum Mocking (Simulasi Update Status) -->
<!-- <template>
  <div class="max-w-3xl min-h-screen px-6 py-20 mx-auto">
    
    <div class="mb-8">
      <button @click="$router.push('/orderpage')" class="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-black">
        <span>&larr;</span> Back to Orders
      </button>
      <h1 class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl">Shipment Tracking</h1>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"></div>
      <p class="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">Fetching latest updates...</p>
    </div>

    <div v-else-if="error" class="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
      <p class="font-bold text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="space-y-6 animate-fade-in">
      
      <div class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div class="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill / Resi</p>
            <p class="font-mono text-xl font-bold text-black">
              {{ trackingData.courier?.waybill_id || 'Waiting for Courier...' }}
            </p>
          </div>
          <div class="md:text-right">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Courier Service</p>
            <p class="text-sm font-bold text-gray-800 uppercase">
              {{ trackingData.courier?.company }} - {{ trackingData.courier?.type }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 p-6 text-sm md:p-8 md:grid-cols-2">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origin</p>
            </div>
            <p class="font-bold text-gray-900">{{ trackingData.origin?.contact_name }}</p>
          </div>
          
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 bg-black rounded-full"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Destination</p>
            </div>
            <p class="font-bold text-gray-900">{{ trackingData.destination?.contact_name }}</p>
            <p class="mt-1 leading-relaxed text-gray-500">{{ trackingData.destination?.address }}</p>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl md:p-8">
        <h3 class="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">Tracking Timeline</h3>
        
        <div class="relative ml-3 space-y-8 border-l-2 border-gray-100">
          
          <div v-for="(history, index) in timelineHistory" :key="index" class="relative pl-8">
            <span 
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>
            
            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="mb-2 text-xs text-gray-600">{{ history.note }}</p>
              <p class="text-[10px] text-gray-400 font-medium font-mono">
                {{ formatDate(history.updated_at) }}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from "../../config/api";

const route = useRoute();
const trackingData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const fetchTracking = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/transactions/${route.params.id}/tracking`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    // Response adalah array/object dari Biteship
    trackingData.value = res.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch tracking data.';
  } finally {
    isLoading.value = false;
  }
};

// --- LOGIKA TIMELINE DINAMIS ---
const timelineHistory = computed(() => {
  if (!trackingData.value) return [];
  
  const historyArray = trackingData.value.courier?.history || [];
  
  // Jika kurir sudah mengupdate history perjalanan, gunakan datanya (Dibalik agar terbaru di atas)
  if (historyArray.length > 0) {
    return [...historyArray].reverse();
  }
  
  // Jika history masih KOSONG (seperti saat order baru 'placed'), buat history buatan dari status utama
  return [
    {
      status: trackingData.value.status,
      note: getNoteFromStatus(trackingData.value.status),
      // Gunakan waktu pembuatan saat ini jika tidak ada history
      updated_at: new Date().toISOString() 
    }
  ];
});

// Helper untuk mempercantik judul status
const formatStatusTitle = (status) => {
  if (!status) return 'Processing';
  const formatted = status.replace(/_/g, ' ');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

// Helper untuk memberikan deskripsi text jika history dari kurir kosong
const getNoteFromStatus = (status) => {
  const map = {
    'placed': 'Your order has been recorded and is waiting for courier allocation.',
    'allocated': 'Courier has been allocated to pick up your package.',
    'picking_up': 'Courier is on the way to pick up the package from the origin.',
    'picked': 'Package has been picked up by the courier.',
    'dropping_off': 'Package is on the way to the destination.',
    'delivered': 'Package has been delivered to the recipient.',
    'rejected': 'Delivery was rejected.',
  };
  return map[status] || 'Order is currently being processed by the system.';
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(fetchTracking);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> -->

<!-- Sesudah Mocking (Simulasi Update Status) -->
<!-- <template>
  <div class="max-w-3xl min-h-screen px-6 py-20 mx-auto">
    
    <div class="flex items-center justify-between mb-8">
      <div>
        <button @click="$router.push('/orderpage')" class="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-black">
          <span>&larr;</span> Back to Orders
        </button>
        <h1 class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl">Shipment Tracking</h1>
      </div>

      <button 
        v-if="trackingData"
        @click="simulateNextStatus" 
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition shadow-sm border border-blue-200 flex items-center gap-2"
        title="Biteship Dashboard Bypass Simulator"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        Simulate Update
      </button>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"></div>
      <p class="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">Fetching latest updates...</p>
    </div>

    <div v-else-if="error" class="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
      <p class="font-bold text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="space-y-6 animate-fade-in">
      
      <div class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div class="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill / Resi</p>
            <p class="font-mono text-xl font-bold text-black">
              {{ trackingData.courier?.waybill_id || simulatedWaybill || 'Waiting for Courier...' }}
            </p>
          </div>
          <div class="md:text-right">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Courier Service</p>
            <p class="text-sm font-bold text-gray-800 uppercase">
              {{ trackingData.courier?.company }} - {{ trackingData.courier?.type }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 p-6 text-sm md:p-8 md:grid-cols-2">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origin</p>
            </div>
            <p class="font-bold text-gray-900">{{ trackingData.origin?.contact_name }}</p>
          </div>
          
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 bg-black rounded-full"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Destination</p>
            </div>
            <p class="font-bold text-gray-900">{{ trackingData.destination?.contact_name }}</p>
            <p class="mt-1 leading-relaxed text-gray-500">{{ trackingData.destination?.address }}</p>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl md:p-8">
        <h3 class="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">Tracking Timeline</h3>
        
        <div class="relative ml-3 space-y-8 border-l-2 border-gray-100">
          
          <div v-for="(history, index) in timelineHistory" :key="index" class="relative pl-8">
            <span 
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>
            
            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="mb-2 text-xs text-gray-600">{{ history.note }}</p>
              <p class="text-[10px] text-gray-400 font-medium font-mono">
                {{ formatDate(history.updated_at) }}
              </p>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { BASE_URL } from "../../config/api";

const route = useRoute();
const router = useRouter();
const trackingData = ref(null);
const isLoading = ref(true);
const error = ref(null);

// --- STATE SIMULATOR KHUSUS TESTING ---
const simulatedHistory = ref([]);
const simulatedWaybill = ref(null);

const fetchTracking = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/transactions/${route.params.id}/tracking`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    trackingData.value = res.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch tracking data.';
  } finally {
    isLoading.value = false;
  }
};

// --- LOGIKA SIMULATOR BUTTON ---
const simulateNextStatus = () => {
  // 1. Jika belum punya resi, kita terbitkan resi dummy
  if (!simulatedWaybill.value && !trackingData.value.courier?.waybill_id) {
    simulatedWaybill.value = "TEST-" + Math.floor(Math.random() * 1000000000);
  }

  // 2. Daftar perjalanan kurir standar
  const mockJourney = [
    { status: 'allocated', note: 'Kurir telah ditugaskan untuk menjemput paket Anda.' },
    { status: 'picking_up', note: 'Kurir sedang dalam perjalanan menuju lokasi penjemputan.' },
    { status: 'picked', note: 'Paket telah berhasil dijemput oleh kurir.' },
    { status: 'dropping_off', note: 'Paket Anda sedang dalam perjalanan ke alamat tujuan.' },
    { status: 'delivered', note: 'Paket telah berhasil dikirim ke penerima.' }
  ];

  // 3. Ambil tahap berikutnya
  const currentStep = simulatedHistory.value.length;
  if (currentStep < mockJourney.length) {
    const nextEvent = mockJourney[currentStep];
    
    // Masukkan ke paling depan (unshift) agar yang terbaru di atas
    simulatedHistory.value.unshift({
      status: nextEvent.status,
      note: nextEvent.note,
      updated_at: new Date().toISOString()
    });
  } else {
    alert("Simulasi selesai! Paket sudah terkirim.");
  }
};

// --- LOGIKA TIMELINE DINAMIS ---
const timelineHistory = computed(() => {
  if (!trackingData.value) return [];
  
  const apiHistory = trackingData.value.courier?.history || [];
  
  // Jika sedang mode simulasi, gabungkan data simulasi dengan data awal dari API
  if (simulatedHistory.value.length > 0) {
    return [
      ...simulatedHistory.value,
      {
        status: trackingData.value.status,
        note: getNoteFromStatus(trackingData.value.status),
        updated_at: trackingData.value.delivery?.datetime || new Date().toISOString()
      }
    ];
  }

  if (apiHistory.length > 0) {
    return [...apiHistory].reverse();
  }
  
  return [
    {
      status: trackingData.value.status,
      note: getNoteFromStatus(trackingData.value.status),
      updated_at: trackingData.value.delivery?.datetime || new Date().toISOString() 
    }
  ];
});

const formatStatusTitle = (status) => {
  if (!status) return 'Processing';
  const formatted = status.replace(/_/g, ' ');
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getNoteFromStatus = (status) => {
  const map = {
    'placed': 'Your order has been recorded and is waiting for courier allocation.',
    'allocated': 'Courier has been allocated to pick up your package.',
    'picking_up': 'Courier is on the way to pick up the package from the origin.',
    'picked': 'Package has been picked up by the courier.',
    'dropping_off': 'Package is on the way to the destination.',
    'delivered': 'Package has been delivered to the recipient.',
    'rejected': 'Delivery was rejected.',
  };
  return map[status] || 'Order is currently being processed by the system.';
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

onMounted(fetchTracking);
</script> -->

<!-- <template>
  <div class="max-w-3xl min-h-screen px-6 py-20 mx-auto">
    <div class="flex items-center justify-between mb-8">
      <div>
        <button
          @click="$router.push('/orderpage')"
          class="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-black"
        >
          <span>&larr;</span> Back to Orders
        </button>
        <h1
          class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl"
        >
          Shipment Tracking
        </h1>
      </div>

      <button
        v-if="trackingData"
        @click="simulateNextStatus"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-bold text-[10px] uppercase tracking-widest transition shadow-sm border border-blue-200 flex items-center gap-2"
        title="Biteship Dashboard Bypass Simulator"
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
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
        Simulate Update
      </button>
    </div>

    <div
      v-if="isLoading"
      class="flex flex-col items-center justify-center py-20"
    >
      <div
        class="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"
      ></div>
      <p
        class="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse"
      >
        Fetching latest updates...
      </p>
    </div>

    <div
      v-else-if="error"
      class="p-8 text-center border border-red-100 bg-red-50 rounded-2xl"
    >
      <p class="font-bold text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="space-y-6 animate-fade-in">
      <div
        class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl"
      >
        <div
          class="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center"
        >
          <div>
            <p
              class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
            >
              Waybill / Resi
            </p>
            <p class="font-mono text-xl font-bold text-black">
              {{
                trackingData.courier?.waybill_id ||
                simulatedWaybill ||
                "Waiting for Courier..."
              }}
            </p>
            <div class="flex items-center gap-3 mt-2">
              <span
                class="bg-black text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest"
              >
                {{ trackingData.status }}
              </span>
              <span
                v-if="paymentMethodInfo"
                class="bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest border border-green-200"
              >
                PAID: {{ paymentMethodInfo.replace("_", " ") }}
              </span>
            </div>
          </div>
          <div class="md:text-right">
            <p
              class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
            >
              Courier Service
            </p>
            <p class="text-sm font-bold text-gray-800 uppercase">
              {{ trackingData.courier?.company }} -
              {{ trackingData.courier?.type }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 p-6 text-sm md:p-8 md:grid-cols-2">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
              >
                Origin
              </p>
            </div>
            <p class="font-bold text-gray-900">
              {{ trackingData.origin?.contact_name }}
            </p>
          </div>

          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 bg-black rounded-full"></span>
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
              >
                Destination
              </p>
            </div>
            <p class="font-bold text-gray-900">
              {{ trackingData.destination?.contact_name }}
            </p>
            <p class="mt-1 leading-relaxed text-gray-500">
              {{ trackingData.destination?.address }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl md:p-8"
      >
        <h3
          class="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100"
        >
          Tracking Timeline
        </h3>

        <div class="relative ml-3 space-y-8 border-l-2 border-gray-100">
          <div
            v-for="(history, index) in timelineHistory"
            :key="index"
            class="relative pl-8"
          >
            <span
              :class="
                index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'
              "
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>

            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p
                class="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase"
              >
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="mb-2 text-xs text-gray-600">{{ history.note }}</p>
              <p class="text-[10px] text-gray-400 font-medium font-mono">
                {{ formatDate(history.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const route = useRoute();
const router = useRouter();
const trackingData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const simulatedHistory = ref([]);
const simulatedWaybill = ref(null);

// [BARU] Mengambil state paymentMethod dari router push di halaman sebelumnya
const paymentMethodInfo = ref(history.state?.paymentMethod || "");

const fetchTracking = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/transactions/${route.params.id}/tracking`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    trackingData.value = res.data;
  } catch (err) {
    error.value =
      err.response?.data?.message || "Failed to fetch tracking data.";
  } finally {
    isLoading.value = false;
  }
};

const simulateNextStatus = () => {
  if (!simulatedWaybill.value && !trackingData.value.courier?.waybill_id) {
    simulatedWaybill.value = "TEST-" + Math.floor(Math.random() * 1000000000);
  }
  const mockJourney = [
    {
      status: "allocated",
      note: "Kurir telah ditugaskan untuk menjemput paket Anda.",
    },
    {
      status: "picking_up",
      note: "Kurir sedang dalam perjalanan menuju lokasi penjemputan.",
    },
    { status: "picked", note: "Paket telah berhasil dijemput oleh kurir." },
    {
      status: "dropping_off",
      note: "Paket Anda sedang dalam perjalanan ke alamat tujuan.",
    },
    { status: "delivered", note: "Paket telah berhasil dikirim ke penerima." },
  ];
  const currentStep = simulatedHistory.value.length;
  if (currentStep < mockJourney.length) {
    const nextEvent = mockJourney[currentStep];
    simulatedHistory.value.unshift({
      status: nextEvent.status,
      note: nextEvent.note,
      updated_at: new Date().toISOString(),
    });
  } else {
    alert("Simulasi selesai! Paket sudah terkirim.");
  }
};

const timelineHistory = computed(() => {
  if (!trackingData.value) return [];
  const apiHistory = trackingData.value.courier?.history || [];

  if (simulatedHistory.value.length > 0) {
    return [
      ...simulatedHistory.value,
      {
        status: trackingData.value.status,
        note: getNoteFromStatus(trackingData.value.status),
        updated_at:
          trackingData.value.delivery?.datetime || new Date().toISOString(),
      },
    ];
  }
  if (apiHistory.length > 0) {
    return [...apiHistory].reverse();
  }
  return [
    {
      status: trackingData.value.status,
      note: getNoteFromStatus(trackingData.value.status),
      updated_at:
        trackingData.value.delivery?.datetime || new Date().toISOString(),
    },
  ];
});

const formatStatusTitle = (status) => {
  if (!status) return "Processing";
  const formatted = status.replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getNoteFromStatus = (status) => {
  const map = {
    placed:
      "Your order has been recorded and is waiting for courier allocation.",
    allocated: "Courier has been allocated to pick up your package.",
    picking_up: "Courier is on the way to pick up the package from the origin.",
    picked: "Package has been picked up by the courier.",
    dropping_off: "Package is on the way to the destination.",
    delivered: "Package has been delivered to the recipient.",
    rejected: "Delivery was rejected.",
  };
  return map[status] || "Order is currently being processed by the system.";
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

onMounted(fetchTracking);
</script> -->

<!-- <template>
  <div class="max-w-4xl min-h-screen px-6 py-20 mx-auto">
    <div class="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
      <div>
        <button
          @click="$router.push('/orderpage')"
          class="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-black"
        >
          <span>&larr;</span> Back to Orders
        </button>
        <h1 class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl">
          Shipment Tracking
        </h1>
      </div>

      <button
        v-if="trackingData"
        @click="simulateNextStatus"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition shadow-sm border border-blue-200 flex items-center justify-center gap-2 w-full md:w-auto"
        title="Biteship Dashboard Bypass Simulator"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Simulate Update
      </button>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"></div>
      <p class="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
        Fetching latest updates...
      </p>
    </div>

    <div v-else-if="error" class="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
      <p class="font-bold text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="space-y-6 animate-fade-in">
      
      <div class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div class="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
          
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill / Resi</p>
            <p class="font-mono text-xl font-bold text-black">
              {{ trackingData.courier?.waybill_id || trackingData.tracking_number || simulatedWaybill || "Waiting for Courier..." }}
            </p>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="bg-black text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
                {{ formatStatusTitle(trackingData.status) }}
              </span>
            </div>
          </div>

          <div class="flex items-center w-full gap-6 md:w-auto">
            <div v-if="activePaymentMethod" class="flex flex-col items-start md:items-end">
               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Payment</p>
               <div class="flex items-center gap-3">
                 <div class="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
                   <img v-if="getPaymentLogo(activePaymentMethod)" :src="getPaymentLogo(activePaymentMethod)" class="w-full h-full object-contain p-0.5" />
                   <span v-else class="font-black text-gray-300 text-[8px]">{{ activePaymentMethod.split(' ')[1] || 'PAY' }}</span>
                 </div>
                 <p class="text-xs font-bold text-green-600 uppercase">{{ activePaymentMethod.replace("_", " ") }}</p>
               </div>
            </div>

            <div class="hidden w-px h-8 bg-gray-200 md:block"></div> <div class="flex flex-col items-start md:items-end">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Courier</p>
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
                   <img v-if="getCourierLogo(trackingData.courier?.company || trackingData.courier_company)" :src="getCourierLogo(trackingData.courier?.company || trackingData.courier_company)" class="object-contain w-full h-full p-1" />
                   <span v-else class="font-black text-gray-300 text-[8px]">{{ trackingData.courier?.company || 'N/A' }}</span>
                </div>
                <div class="text-left md:text-right">
                  <p class="text-xs font-bold text-gray-800 uppercase">
                    {{ trackingData.courier?.company || trackingData.courier_company }}
                  </p>
                  <p class="text-[10px] text-gray-500 font-bold uppercase">{{ trackingData.courier?.type || trackingData.courier_type }}</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div class="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origin Details</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Sender Name</p>
              <p class="font-bold text-gray-900">{{ trackingData.origin?.contact_name || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">{{ trackingData.origin?.contact_phone || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Full Address</p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.origin?.address || '-' }}<br/>
                <span v-if="trackingData.origin?.postal_code" class="font-bold">Postal Code: {{ trackingData.origin.postal_code }}</span>
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-black rounded-full"></span>
              <p class="text-[10px] font-bold text-black uppercase tracking-widest">Destination Details</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Recipient Name</p>
              <p class="font-bold text-gray-900">{{ trackingData.destination?.contact_name || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">{{ trackingData.destination?.contact_phone || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Full Address</p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.destination?.address || '-' }}<br/>
                <span v-if="trackingData.destination?.postal_code" class="font-bold">Postal Code: {{ trackingData.destination.postal_code }}</span>
              </p>
            </div>
            <div v-if="trackingData.destination?.note">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Courier Note</p>
              <p class="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">"{{ trackingData.destination.note }}"</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="trackingData.details && trackingData.details.length > 0" class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div class="p-4 border-b border-gray-100 bg-gray-50">
           <h3 class="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Order Summary</h3>
        </div>
        
        <div class="p-6">
          <div class="mb-6 space-y-4">
            <div v-for="detail in trackingData.details" :key="detail.id" class="flex items-center gap-4 py-2">
              <img :src="detail.product.image" class="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg" />
              <div class="flex-grow">
                <h4 class="text-sm font-bold text-gray-900 uppercase">{{ detail.product.name }}</h4>
                <p class="text-xs text-gray-400">{{ detail.quantity }} x {{ formatPrice(detail.price) }}</p>
              </div>
              <p class="text-sm font-bold text-gray-900">{{ formatPrice(detail.quantity * detail.price) }}</p>
            </div>
          </div>

          <div class="pt-4 space-y-2 border-t border-gray-100">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Subtotal for Products</span>
              <span>{{ formatPrice(trackingData.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>Shipping Cost</span>
              <span>{{ formatPrice(trackingData.shipping_cost) }}</span>
            </div>
            <div class="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
              <span class="font-bold text-[10px] uppercase tracking-widest text-black">Grand Total</span>
              <span class="text-xl font-black text-black">{{ formatPrice(getGrandTotal(trackingData)) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl md:p-8">
        <h3 class="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
          Tracking Timeline
        </h3>

        <div class="relative ml-3 space-y-8 border-l-2 border-gray-100">
          <div v-for="(history, index) in timelineHistory" :key="index" class="relative pl-8">
            <span
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>

            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="mb-2 text-xs text-gray-600">{{ history.note }}</p>
              <p class="text-[10px] text-gray-400 font-medium font-mono">
                {{ formatDate(history.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const route = useRoute();
const router = useRouter();
const trackingData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const simulatedHistory = ref([]);
const simulatedWaybill = ref(null);

// Mengambil paymentMethod dari trackingData API atau dari Vue Router History State
const paymentMethodInfo = ref(history.state?.paymentMethod || "");

const activePaymentMethod = computed(() => {
  if (trackingData.value?.payment_method) return trackingData.value.payment_method;
  if (paymentMethodInfo.value) return paymentMethodInfo.value;
  return null;
});

// Helper: Logo Kurir
const getCourierLogo = (company) => {
  if (!company) return null;
  const baseUrl = "../../src/assets/courier_images/"; 
  const map = {
    'jne': "jne.png", 'sicepat': "sicepat.png", 'jnt': "jnt.png",
    'anteraja': "anteraja.png", 'gojek': "gojek.png", 'grab': "grab.png",
    'paxel': "paxel.png", 'ninja': "ninja.png",
  };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
};

// Helper: Logo Payment
const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(' ')[1]?.toLowerCase();
  if (!channel) return null;
  const baseUrl = "../../src/assets/payment_images/"; 
  const map = {
    'bca': 'bca.png', 'bni': 'bni.png', 'bri': 'bri.png', 'mandiri': 'mandiri.png', 'bsi': 'bsi.png', 'permata': 'permata.png',
    'ovo': 'ovo.png', 'dana': 'dana.png', 'linkaja': 'linkaja.png', 'shopeepay': 'shopeepay.png',
    'alfamart': 'alfamart.png', 'indomaret': 'indomaret.png', 'qris': 'qris.png'
  };
  return map[channel] ? baseUrl + map[channel] : null;
};

// Helper: Kalkulasi & Format Harga
const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v || 0);

const getGrandTotal = (order) => {
  const total = parseFloat(order.total_amount || 0);
  const shipping = parseFloat(order.shipping_cost || 0);
  return total + shipping;
};

const fetchTracking = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/transactions/${route.params.id}/tracking`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    trackingData.value = res.data;
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch tracking data.";
  } finally {
    isLoading.value = false;
  }
};

const simulateNextStatus = () => {
  if (!simulatedWaybill.value && !trackingData.value.courier?.waybill_id) {
    simulatedWaybill.value = "TEST-" + Math.floor(Math.random() * 1000000000);
  }
  const mockJourney = [
    { status: "allocated", note: "Kurir telah ditugaskan untuk menjemput paket Anda." },
    { status: "picking_up", note: "Kurir sedang dalam perjalanan menuju lokasi penjemputan." },
    { status: "picked", note: "Paket telah berhasil dijemput oleh kurir." },
    { status: "dropping_off", note: "Paket Anda sedang dalam perjalanan ke alamat tujuan." },
    { status: "delivered", note: "Paket telah berhasil dikirim ke penerima." },
  ];
  
  const currentStep = simulatedHistory.value.length;
  if (currentStep < mockJourney.length) {
    const nextEvent = mockJourney[currentStep];
    simulatedHistory.value.unshift({
      status: nextEvent.status,
      note: nextEvent.note,
      updated_at: new Date().toISOString(),
    });
  } else {
    alert("Simulasi selesai! Paket sudah terkirim.");
  }
};

const timelineHistory = computed(() => {
  if (!trackingData.value) return [];
  const apiHistory = trackingData.value.courier?.history || [];

  if (simulatedHistory.value.length > 0) {
    return [
      ...simulatedHistory.value,
      {
        status: trackingData.value.status,
        note: getNoteFromStatus(trackingData.value.status),
        updated_at: trackingData.value.delivery?.datetime || trackingData.value.created_at || new Date().toISOString(),
      },
    ];
  }
  if (apiHistory.length > 0) {
    return [...apiHistory].reverse();
  }
  return [
    {
      status: trackingData.value.status,
      note: getNoteFromStatus(trackingData.value.status),
      updated_at: trackingData.value.delivery?.datetime || trackingData.value.created_at || new Date().toISOString(),
    },
  ];
});

const formatStatusTitle = (status) => {
  if (!status) return "Processing";
  const formatted = status.replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getNoteFromStatus = (status) => {
  const map = {
    placed: "Your order has been recorded and is waiting for courier allocation.",
    allocated: "Courier has been allocated to pick up your package.",
    picking_up: "Courier is on the way to pick up the package from the origin.",
    picked: "Package has been picked up by the courier.",
    dropping_off: "Package is on the way to the destination.",
    delivered: "Package has been delivered to the recipient.",
    rejected: "Delivery was rejected.",
  };
  return map[status] || "Order is currently being processed by the system.";
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

onMounted(fetchTracking);
</script> -->

<!-- <template>
  <div class="max-w-4xl min-h-screen px-6 py-20 mx-auto">
    <div class="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
      <div>
        <button
          @click="$router.push('/orderpage')"
          class="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-black"
        >
          <span>&larr;</span> Back to Orders
        </button>
        <h1 class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl">
          Shipment Tracking
        </h1>
      </div>

      <button
        v-if="orderData"
        @click="simulateNextStatus"
        class="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest transition shadow-sm border border-blue-200 flex items-center justify-center gap-2 w-full md:w-auto"
        title="Biteship Dashboard Bypass Simulator"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Simulate Update
      </button>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"></div>
      <p class="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse">
        Fetching order details...
      </p>
    </div>

    <div v-else-if="error" class="p-8 text-center border border-red-100 bg-red-50 rounded-2xl">
      <p class="font-bold text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="orderData" class="space-y-6 animate-fade-in">
      
      <div class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div class="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center">
          
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill / Resi</p>
            <p class="font-mono text-xl font-bold text-black">
              {{ trackingData?.courier?.waybill_id || orderData.tracking_number || simulatedWaybill || "Waiting for Courier..." }}
            </p>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span class="bg-black text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
                {{ formatStatusTitle(trackingData?.status || orderData.status) }}
              </span>
            </div>
          </div>

          <div class="flex items-center w-full gap-6 md:w-auto">
            <div v-if="activePaymentMethod" class="flex flex-col items-start md:items-end">
               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Payment</p>
               <div class="flex items-center gap-3">
                 <div class="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0">
                   <img v-if="getPaymentLogo(activePaymentMethod)" :src="getPaymentLogo(activePaymentMethod)" class="w-full h-full object-contain p-0.5" />
                   <span v-else class="font-black text-gray-300 text-[8px]">{{ activePaymentMethod.split(' ')[1] || 'PAY' }}</span>
                 </div>
                 <p class="text-xs font-bold text-green-600 uppercase">{{ activePaymentMethod.replace("_", " ") }}</p>
               </div>
            </div>

            <div class="hidden w-px h-8 bg-gray-200 md:block"></div> 
            
            <div class="flex flex-col items-start md:items-end">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Courier</p>
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0">
                   <img v-if="getCourierLogo(trackingData?.courier?.company || orderData.courier_company)" :src="getCourierLogo(trackingData?.courier?.company || orderData.courier_company)" class="object-contain w-full h-full p-1" />
                   <span v-else class="font-black text-gray-300 text-[8px]">{{ trackingData?.courier?.company || orderData.courier_company || 'N/A' }}</span>
                </div>
                <div class="text-left md:text-right">
                  <p class="text-xs font-bold text-gray-800 uppercase">
                    {{ trackingData?.courier?.company || orderData.courier_company }}
                  </p>
                  <p class="text-[10px] text-gray-500 font-bold uppercase">{{ trackingData?.courier?.type || orderData.courier_type }}</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div v-if="trackingData" class="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2">
          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origin Details</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Sender Name</p>
              <p class="font-bold text-gray-900">{{ trackingData.origin?.contact_name || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">{{ trackingData.origin?.contact_phone || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Full Address</p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.origin?.address || '-' }}<br/>
                <span v-if="trackingData.origin?.postal_code" class="font-bold">Postal Code: {{ trackingData.origin.postal_code }}</span>
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-black rounded-full"></span>
              <p class="text-[10px] font-bold text-black uppercase tracking-widest">Destination Details</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Recipient Name</p>
              <p class="font-bold text-gray-900">{{ trackingData.destination?.contact_name || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">{{ trackingData.destination?.contact_phone || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Full Address</p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.destination?.address || '-' }}<br/>
                <span v-if="trackingData.destination?.postal_code" class="font-bold">Postal Code: {{ trackingData.destination.postal_code }}</span>
              </p>
            </div>
            <div v-if="trackingData.destination?.note">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Courier Note</p>
              <p class="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">"{{ trackingData.destination.note }}"</p>
            </div>
          </div>
        </div>
        <div v-else class="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
          Menunggu data lokasi kurir (Origin & Destination) tersedia dari ekspedisi...
        </div>
      </div>

      <div v-if="orderData.details && orderData.details.length > 0" class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div class="p-4 border-b border-gray-100 bg-gray-50">
           <h3 class="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">Order Summary</h3>
        </div>
        
        <div class="p-6">
          <div class="mb-6 space-y-4">
            <div v-for="detail in orderData.details" :key="detail.id" class="flex items-center gap-4 py-2 pb-4 border-b border-gray-50 last:border-0">
              <img :src="detail.product.image" class="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg" />
              <div class="flex-grow">
                <h4 class="text-sm font-bold text-gray-900 uppercase">{{ detail.product.name }}</h4>
                <p class="text-xs text-gray-400">{{ detail.quantity }} x {{ formatPrice(detail.price) }}</p>
              </div>
              <p class="text-sm font-bold text-gray-900">{{ formatPrice(detail.quantity * detail.price) }}</p>
            </div>
          </div>

          <div class="pt-4 space-y-2 border-t border-gray-100">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Subtotal for Products</span>
              <span>{{ formatPrice(orderData.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>Shipping Cost</span>
              <span>{{ formatPrice(orderData.shipping_cost) }}</span>
            </div>
            <div class="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed">
              <span class="font-bold text-[10px] uppercase tracking-widest text-black">Grand Total</span>
              <span class="text-xl font-black text-black">{{ formatPrice(getGrandTotal(orderData)) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl md:p-8">
        <h3 class="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100">
          Tracking Timeline
        </h3>

        <div class="relative ml-3 space-y-8 border-l-2 border-gray-100">
          <div v-for="(history, index) in timelineHistory" :key="index" class="relative pl-8">
            <span
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>

            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="mb-2 text-xs text-gray-600">{{ history.note }}</p>
              <p class="text-[10px] text-gray-400 font-medium font-mono">
                {{ formatDate(history.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";

const route = useRoute();
const router = useRouter();

// Pisahkan state antara data transaksi Database dan data Tracking Biteship
const orderData = ref(null);
const trackingData = ref(null);

const isLoading = ref(true);
const error = ref(null);

const simulatedHistory = ref([]);
const simulatedWaybill = ref(null);

const paymentMethodInfo = ref(history.state?.paymentMethod || "");

// Mengambil payment method dari Database Laravel, fallback ke history router
const activePaymentMethod = computed(() => {
  if (orderData.value?.payment_method) return orderData.value.payment_method;
  if (paymentMethodInfo.value) return paymentMethodInfo.value;
  return null;
});

const getCourierLogo = (company) => {
  if (!company) return null;
  const baseUrl = "/courier_images/"; 
  const map = {
    'jne': "jne.png", 'sicepat': "sicepat.png", 'jnt': "jnt.png",
    'anteraja': "anteraja.png", 'gojek': "gojek.png", 'grab': "grab.png",
    'paxel': "paxel.png", 'ninja': "ninja.png",
  };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
};

const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(' ')[1]?.toLowerCase();
  if (!channel) return null;
  const baseUrl = "/payment_images/"; 
  const map = {
    'bca': 'bca.png', 'bni': 'bni.png', 'bri': 'bri.png', 'mandiri': 'mandiri.png', 'bsi': 'bsi.png', 'permata': 'permata.png',
    'ovo': 'ovo.png', 'dana': 'dana.png', 'linkaja': 'linkaja.png', 'shopeepay': 'shopeepay.png',
    'alfamart': 'alfamart.png', 'indomaret': 'indomaret.png', 'qris': 'qris.png'
  };
  return map[channel] ? baseUrl + map[channel] : null;
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v || 0);

const getGrandTotal = (order) => {
  if(!order) return 0;
  const total = parseFloat(order.total_amount || 0);
  const shipping = parseFloat(order.shipping_cost || 0);
  return total + shipping;
};

// [PENTING] Fungsi ini sekarang memanggil 2 endpoint secara berurutan
const fetchAllData = async () => {
  isLoading.value = true;
  error.value = null;

  const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } };

  try {
    // 1. Ambil Data Transaksi dari Controller Laravel (Untuk Produk & Harga)
    const orderRes = await axios.get(`${BASE_URL}/transactions/${route.params.id}`, config);
    orderData.value = orderRes.data;

    // 2. Ambil Data Tracking dari Biteship (Bisa gagal jika kurir belum ter-generate)
    try {
      const trackingRes = await axios.get(`${BASE_URL}/transactions/${route.params.id}/tracking`, config);
      trackingData.value = trackingRes.data;
    } catch (trackErr) {
      console.warn("Tracking data is not ready yet:", trackErr);
      // Kita tidak melempar error agar halaman tetap bisa render Order Summary
    }

  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch order details.";
  } finally {
    isLoading.value = false;
  }
};

const simulateNextStatus = () => {
  if (!simulatedWaybill.value && !trackingData.value?.courier?.waybill_id && !orderData.value?.tracking_number) {
    simulatedWaybill.value = "TEST-" + Math.floor(Math.random() * 1000000000);
  }
  const mockJourney = [
    { status: "allocated", note: "Kurir telah ditugaskan untuk menjemput paket Anda." },
    { status: "picking_up", note: "Kurir sedang dalam perjalanan menuju lokasi penjemputan." },
    { status: "picked", note: "Paket telah berhasil dijemput oleh kurir." },
    { status: "dropping_off", note: "Paket Anda sedang dalam perjalanan ke alamat tujuan." },
    { status: "delivered", note: "Paket telah berhasil dikirim ke penerima." },
  ];
  
  const currentStep = simulatedHistory.value.length;
  if (currentStep < mockJourney.length) {
    const nextEvent = mockJourney[currentStep];
    simulatedHistory.value.unshift({
      status: nextEvent.status,
      note: nextEvent.note,
      updated_at: new Date().toISOString(),
    });
  } else {
    alert("Simulasi selesai! Paket sudah terkirim.");
  }
};

const timelineHistory = computed(() => {
  if (simulatedHistory.value.length > 0) {
    return [
      ...simulatedHistory.value,
      {
        status: trackingData.value?.status || orderData.value?.status,
        note: getNoteFromStatus(trackingData.value?.status || orderData.value?.status),
        updated_at: trackingData.value?.delivery?.datetime || orderData.value?.created_at || new Date().toISOString(),
      },
    ];
  }

  const apiHistory = trackingData.value?.courier?.history || [];
  if (apiHistory.length > 0) {
    return [...apiHistory].reverse();
  }
  
  // Default state awal jika histori kosong
  return [
    {
      status: trackingData.value?.status || orderData.value?.status || "Processing",
      note: getNoteFromStatus(trackingData.value?.status || orderData.value?.status),
      updated_at: trackingData.value?.delivery?.datetime || orderData.value?.created_at || new Date().toISOString(),
    },
  ];
});

const formatStatusTitle = (status) => {
  if (!status) return "Processing";
  const formatted = status.replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getNoteFromStatus = (status) => {
  const map = {
    pending: "Waiting for payment.",
    placed: "Your order has been recorded and is waiting for courier allocation.",
    allocated: "Courier has been allocated to pick up your package.",
    picking_up: "Courier is on the way to pick up the package from the origin.",
    picked: "Package has been picked up by the courier.",
    dropping_off: "Package is on the way to the destination.",
    delivered: "Package has been delivered to the recipient.",
    rejected: "Delivery was rejected.",
  };
  return map[status] || "Order is currently being processed by the system.";
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = {
    weekday: "long", year: "numeric", month: "short",
    day: "numeric", hour: "2-digit", minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

// Panggil fungsi fetch data gabungan saat komponen dimuat
onMounted(fetchAllData);
</script> -->

<!-- Tanpa Tombol Simulasi -->
<!-- <template>
  <div class="max-w-4xl min-h-screen px-6 py-20 mx-auto">
    <div class="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
      <div>
        <button
          @click="$router.push('/orderpage')"
          class="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-black"
        >
          <span>&larr;</span> {{ $t("tracking.back_to_order") }}
        </button>
        <h1
          class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl"
        >
          {{ $t("tracking.shipment_tracking") }}
        </h1>
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"
      ></div>
      <p
        class="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse"
      >
        {{ $t("tracking.fetching_order") }}
      </p>
    </div>

    <div
      v-else-if="error"
      class="p-8 text-center border border-red-100 bg-red-50 rounded-2xl"
    >
      <p class="font-bold text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="orderData" class="space-y-6 animate-fade-in">
      <div class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div
          class="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center"
        >
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              {{ $t("tracking.waybill") }}
            </p>
            <p class="font-mono text-xl font-bold text-black">
              {{
                trackingData?.courier?.waybill_id ||
                orderData.tracking_number ||
                $t("tracking.waiting_for_courier")
              }}
            </p>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span
                class="bg-black text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest"
              >
                {{ formatStatusTitle(trackingData?.status || orderData.status) }}
              </span>
            </div>
          </div>

          <div class="flex items-center w-full gap-6 md:w-auto">
            <div
              v-if="activePaymentMethod"
              class="flex flex-col items-start md:items-end"
            >
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
              >
                {{ $t("tracking.payment") }}
              </p>
              <div class="flex items-center gap-3">
                <div
                  class="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0"
                >
                  <img
                    v-if="getPaymentLogo(activePaymentMethod)"
                    :src="getPaymentLogo(activePaymentMethod)"
                    class="w-full h-full object-contain p-0.5"
                  />
                  <span v-else class="font-black text-gray-300 text-[8px]">{{
                    activePaymentMethod.split(" ")[1] || "PAY"
                  }}</span>
                </div>
                <p class="text-xs font-bold text-green-600 uppercase">
                  {{ activePaymentMethod.replace("_", " ") }}
                </p>
              </div>
            </div>

            <div class="hidden w-px h-8 bg-gray-200 md:block"></div>

            <div class="flex flex-col items-start md:items-end">
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
              >
                {{ $t("tracking.courier") }}
              </p>
              <div class="flex items-center gap-3">
                <div
                  class="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0"
                >
                  <img
                    v-if="
                      getCourierLogo(
                        trackingData?.courier?.company || orderData.courier_company
                      )
                    "
                    :src="
                      getCourierLogo(
                        trackingData?.courier?.company || orderData.courier_company
                      )
                    "
                    class="object-contain w-full h-full p-1"
                  />
                  <span v-else class="font-black text-gray-300 text-[8px]">{{
                    trackingData?.courier?.company || orderData.courier_company || "N/A"
                  }}</span>
                </div>
                <div class="text-left md:text-right">
                  <p class="text-xs font-bold text-gray-800 uppercase">
                    {{ trackingData?.courier?.company || orderData.courier_company }}
                  </p>
                  <p class="text-[10px] text-gray-500 font-bold uppercase">
                    {{ trackingData?.courier?.type || orderData.courier_type }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="trackingData"
          class="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2"
        >
          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.origin_detail") }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.sender_name") }}
              </p>
              <p class="font-bold text-gray-900">
                {{ trackingData.origin?.contact_name || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">
                {{ trackingData.origin?.contact_phone || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.full_address") }}
              </p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.origin?.address || "-" }}<br />
                <span v-if="trackingData.origin?.postal_code" class="font-bold"
                  >{{ $t("tracking.postal_code") }}
                  {{ trackingData.origin.postal_code }}</span
                >
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-black rounded-full"></span>
              <p class="text-[10px] font-bold text-black uppercase tracking-widest">
                {{ $t("tracking.destination_details") }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.recipient_name") }}
              </p>
              <p class="font-bold text-gray-900">
                {{ trackingData.destination?.contact_name || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">
                {{ trackingData.destination?.contact_phone || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.full_address") }}
              </p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.destination?.address || "-" }}<br />
                <span v-if="trackingData.destination?.postal_code" class="font-bold"
                  >{{ $t("tracking.postal_code") }}
                  {{ trackingData.destination.postal_code }}</span
                >
              </p>
            </div>
            <div v-if="trackingData.destination?.note">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.courier_note") }}
              </p>
              <p class="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
                "{{ trackingData.destination.note }}"
              </p>
            </div>
          </div>
        </div>
        <div v-else class="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
          {{ $t("tracking.waiting_courier_loc") }}
        </div>
      </div>

      <div
        v-if="orderData.details && orderData.details.length > 0"
        class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl"
      >
        <div class="p-4 border-b border-gray-100 bg-gray-50">
          <h3 class="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
            {{ $t("tracking.order_summary") }}
          </h3>
        </div>

        <div class="p-6">
          <div class="mb-6 space-y-4">
            <div
              v-for="detail in orderData.details"
              :key="detail.id"
              class="flex items-center gap-4 py-2 pb-4 border-b border-gray-50 last:border-0"
            >
              <img
                :src="detail.product.image || defaultBagIcon"
                class="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
              />
              <div class="flex-grow">
                <h4 class="text-sm font-bold text-gray-900 uppercase">
                  {{ detail.product.name }}
                </h4>
                <p
                  v-if="detail.color"
                  class="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5"
                >
                  {{ $t("tracking.color") }}
                  <span class="font-bold text-gray-700">{{ detail.color }}</span>
                </p>
                <p class="mt-1 text-xs text-gray-400">
                  {{ detail.quantity }} x {{ formatPrice(detail.price) }}
                </p>
              </div>
              <p class="text-sm font-bold text-gray-900">
                {{ formatPrice(detail.quantity * detail.price) }}
              </p>
            </div>
          </div>

          <div class="pt-4 space-y-2 border-t border-gray-100">
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ $t("tracking.subtotal_products") }}</span>
              <span>{{ formatPrice(orderData.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ $t("tracking.shipping_cost") }}</span>
              <span>{{ formatPrice(orderData.shipping_cost) }}</span>
            </div>
            <div
              v-if="orderData.promo_discount > 0"
              class="flex justify-between text-xs font-medium text-green-600"
            >
              <span
                >{{ $t("tracking.promo_applied") }} (<span class="font-mono uppercase">{{
                  orderData.promo_code
                }}</span
                >)</span
              >
              <span>- {{ formatPrice(orderData.promo_discount) }}</span>
            </div>

            <div
              v-if="orderData.points_used > 0"
              class="flex justify-between text-xs font-medium text-yellow-600"
            >
              <span
                >{{ $t("tracking.points_redeemed") }} ({{
                  orderData.points_used
                }}
                Pts)</span
              >
              <span>- {{ formatPrice(orderData.points_used * 1000) }}</span>
            </div>
            <div
              class="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed"
            >
              <span class="font-bold text-[10px] uppercase tracking-widest text-black">{{
                $t("tracking.grand_total")
              }}</span>
              <span class="text-xl font-black text-black">{{
                formatPrice(getGrandTotal(orderData))
              }}</span>
            </div>
          </div>

          <div
            v-if="
              userData?.is_membership &&
              orderData.point > 0 &&
              orderData.status === 'completed'
            "
            class="flex items-center justify-between p-4 mt-6 border border-yellow-100 bg-gradient-to-r from-yellow-50 to-white rounded-xl"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 text-white bg-yellow-400 rounded-full shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest"
                >
                  {{ $t("tracking.loyalty_reward") }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5">
                  {{ $t("tracking.points_credited") }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-2xl font-black text-yellow-600"
                >+{{ orderData.point }}</span
              >
              <span class="ml-1 text-xs font-bold text-yellow-800">Pts</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl md:p-8">
        <h3
          class="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100"
        >
          {{ $t("tracking.tracking_timeline") }}
        </h3>

        <div class="relative ml-3 space-y-8 border-l-2 border-gray-100">
          <div
            v-for="(history, index) in timelineHistory"
            :key="index"
            class="relative pl-8"
          >
            <span
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>

            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="mb-2 text-xs text-gray-600">{{ history.note }}</p>
              <p class="text-[10px] text-gray-400 font-medium font-mono">
                {{ formatDate(history.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";

import defaultBagIcon from "../../assets/products/bag_icon.jpg";

import { useI18n } from "vue-i18n";

import { formatPrice } from "../../utils/currency";

const userData = ref(null);

const route = useRoute();
const router = useRouter();

const orderData = ref(null);
const trackingData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const { t } = useI18n();

const paymentMethodInfo = ref(history.state?.paymentMethod || "");

const activePaymentMethod = computed(() => {
  if (orderData.value?.payment_method) return orderData.value.payment_method;
  if (paymentMethodInfo.value) return paymentMethodInfo.value;
  return null;
});

const getCourierLogo = (company) => {
  if (!company) return null;
  const baseUrl = "/courier_images/";
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
  };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
};

const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(" ")[1]?.toLowerCase();
  if (!channel) return null;
  const baseUrl = "/payment_images/";
  const map = {
    bca: "bca.png",
    bni: "bni.png",
    bri: "bri.png",
    mandiri: "mandiri.png",
    bsi: "bsi.png",
    permata: "permata.png",
    ovo: "ovo.png",
    dana: "dana.png",
    linkaja: "linkaja.png",
    shopeepay: "shopeepay.png",
    alfamart: "alfamart.png",
    indomaret: "indomaret.png",
    qris: "qris.png",
  };
  return map[channel] ? baseUrl + map[channel] : null;
};

// const formatPrice = (v) =>
//   new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v || 0);

// const getGrandTotal = (order) => {
//   if (!order) return 0;
//   const total = parseFloat(order.total_amount || 0);
//   const shipping = parseFloat(order.shipping_cost || 0);
//   return total + shipping;
// };

const getGrandTotal = (order) => {
  if (!order) return 0;
  const total = parseFloat(order.total_amount || 0);
  const shipping = parseFloat(order.shipping_cost || 0);
  const promo = parseFloat(order.promo_discount || 0);
  const pointsDiscount = parseFloat((order.points_used || 0) * 1000);
  return total + shipping - promo - pointsDiscount;
};

const fetchAllData = async () => {
  isLoading.value = true;
  error.value = null;

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  try {
    const orderRes = await axios.get(
      `${BASE_URL}/transactions/${route.params.id}`,
      config
    );
    orderData.value = orderRes.data;

    try {
      const trackingRes = await axios.get(
        `${BASE_URL}/transactions/${route.params.id}/tracking`,
        config
      );
      trackingData.value = trackingRes.data;
    } catch (trackErr) {
      console.warn("Tracking data is not ready yet:", trackErr);
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch order details.";
  } finally {
    isLoading.value = false;
  }
};

// Logika Timeline: Murni mengambil dari API
const timelineHistory = computed(() => {
  const apiHistory = trackingData.value?.courier?.history || [];

  if (apiHistory.length > 0) {
    // Balik array agar status terbaru ada di atas
    return [...apiHistory].reverse();
  }

  // Default state awal jika histori kosong dari Biteship (misal: pesanan baru dibuat)
  return [
    {
      status: trackingData.value?.status || orderData.value?.status || "Processing",
      note: getNoteFromStatus(trackingData.value?.status || orderData.value?.status),
      updated_at:
        trackingData.value?.delivery?.datetime ||
        orderData.value?.created_at ||
        new Date().toISOString(),
    },
  ];
});

const formatStatusTitle = (status) => {
  if (!status) return "Processing";
  const formatted = status.replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getNoteFromStatus = (status) => {
  const map = {
    pending: "Waiting for payment.",
    placed: "Your order has been recorded and is waiting for courier allocation.",
    allocated: "Courier has been allocated to pick up your package.",
    picking_up: "Courier is on the way to pick up the package from the origin.",
    picked: "Package has been picked up by the courier.",
    dropping_off: "Package is on the way to the destination.",
    delivered: "Package has been delivered to the recipient.",
    rejected: "Delivery was rejected.",
    cancelled: "Delivery was cancelled.",
  };
  return map[status] || "Order is currently being processed by the system.";
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    userData.value = JSON.parse(user);
  }
  fetchAllData();
});
</script> -->

<template>
  <div class="max-w-4xl min-h-screen px-6 py-20 mx-auto">
    <div class="flex flex-col gap-4 mb-8 md:flex-row md:justify-between md:items-center">
      <div>
        <button
          @click="$router.push('/orderpage')"
          class="flex items-center gap-2 mb-6 text-xs font-bold tracking-widest text-gray-500 uppercase transition hover:text-black"
        >
          <span>&larr;</span> {{ $t("tracking.back_to_order") }}
        </button>
        <h1
          class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-4xl"
        >
          {{ $t("tracking.shipment_tracking") }}
        </h1>
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-100 rounded-full border-t-black animate-spin"
      ></div>
      <p
        class="mt-4 text-xs font-bold tracking-widest text-gray-400 uppercase animate-pulse"
      >
        {{ $t("tracking.fetching_order") }}
      </p>
    </div>

    <div
      v-else-if="error"
      class="p-8 text-center border border-red-100 bg-red-50 rounded-2xl"
    >
      <p class="font-bold text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="orderData" class="space-y-6 animate-fade-in">
      <div class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl">
        <div
          class="flex flex-col items-start justify-between gap-6 p-6 border-b border-gray-100 bg-gray-50 md:p-8 md:flex-row md:items-center"
        >
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              {{ $t("tracking.waybill") }}
            </p>
            <p class="font-mono text-xl font-bold text-black">
              {{
                trackingData?.courier?.waybill_id ||
                orderData.tracking_number ||
                $t("tracking.waiting_for_courier")
              }}
            </p>
            <div class="flex flex-wrap items-center gap-3 mt-3">
              <span
                class="bg-black text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest"
              >
                {{ formatStatusTitle(trackingData?.status || orderData.status) }}
              </span>
            </div>
          </div>

          <div class="flex items-center w-full gap-6 md:w-auto">
            <div
              v-if="activePaymentMethod"
              class="flex flex-col items-start md:items-end"
            >
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
              >
                {{ $t("tracking.payment") }}
              </p>
              <div class="flex items-center gap-3">
                <div
                  class="flex items-center justify-center w-10 h-6 overflow-hidden bg-white border border-gray-200 rounded shrink-0"
                >
                  <img
                    v-if="getPaymentLogo(activePaymentMethod)"
                    :src="getPaymentLogo(activePaymentMethod)"
                    class="w-full h-full object-contain p-0.5"
                  />
                  <span v-else class="font-black text-gray-300 text-[8px]">{{
                    activePaymentMethod.split(" ")[1] || "PAY"
                  }}</span>
                </div>
                <p class="text-xs font-bold text-green-600 uppercase">
                  {{ activePaymentMethod.replace("_", " ") }}
                </p>
              </div>
            </div>

            <div class="hidden w-px h-8 bg-gray-200 md:block"></div>

            <div class="flex flex-col items-start md:items-end">
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2"
              >
                {{ $t("tracking.courier") }}
              </p>
              <div class="flex items-center gap-3">
                <div
                  class="flex items-center justify-center w-8 h-8 overflow-hidden bg-white border border-gray-200 rounded-lg shrink-0"
                >
                  <img
                    v-if="
                      getCourierLogo(
                        trackingData?.courier?.company || orderData.courier_company
                      )
                    "
                    :src="
                      getCourierLogo(
                        trackingData?.courier?.company || orderData.courier_company
                      )
                    "
                    class="object-contain w-full h-full p-1"
                  />
                  <span v-else class="font-black text-gray-300 text-[8px]">{{
                    trackingData?.courier?.company || orderData.courier_company || "N/A"
                  }}</span>
                </div>
                <div class="text-left md:text-right">
                  <p class="text-xs font-bold text-gray-800 uppercase">
                    {{ trackingData?.courier?.company || orderData.courier_company }}
                  </p>
                  <p class="text-[10px] text-gray-500 font-bold uppercase">
                    {{ trackingData?.courier?.type || orderData.courier_type }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="trackingData"
          class="grid grid-cols-1 gap-8 p-6 text-sm bg-white md:p-8 md:grid-cols-2"
        >
          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.origin_detail") }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.sender_name") }}
              </p>
              <p class="font-bold text-gray-900">
                {{ trackingData.origin?.contact_name || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">
                {{ trackingData.origin?.contact_phone || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.full_address") }}
              </p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.origin?.address || "-" }}<br />
                <span v-if="trackingData.origin?.postal_code" class="font-bold"
                  >{{ $t("tracking.postal_code") }}
                  {{ trackingData.origin.postal_code }}</span
                >
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2 pb-2 mb-4 border-b border-gray-100">
              <span class="w-2 h-2 bg-black rounded-full"></span>
              <p class="text-[10px] font-bold text-black uppercase tracking-widest">
                {{ $t("tracking.destination_details") }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.recipient_name") }}
              </p>
              <p class="font-bold text-gray-900">
                {{ trackingData.destination?.contact_name || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-xs text-gray-700">
                {{ trackingData.destination?.contact_phone || "-" }}
              </p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.full_address") }}
              </p>
              <p class="text-xs leading-relaxed text-gray-600">
                {{ trackingData.destination?.address || "-" }}<br />
                <span v-if="trackingData.destination?.postal_code" class="font-bold"
                  >{{ $t("tracking.postal_code") }}
                  {{ trackingData.destination.postal_code }}</span
                >
              </p>
            </div>
            <div v-if="trackingData.destination?.note">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">
                {{ $t("tracking.courier_note") }}
              </p>
              <p class="p-2 text-xs italic text-gray-500 border rounded bg-gray-50">
                "{{ trackingData.destination.note }}"
              </p>
            </div>
          </div>
        </div>
        <div v-else class="p-6 text-xs italic text-center text-gray-400 bg-white md:p-8">
          {{ $t("tracking.waiting_courier_loc") }}
        </div>
      </div>

      <div
        v-if="orderData.details && orderData.details.length > 0"
        class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl"
      >
        <div class="p-4 border-b border-gray-100 bg-gray-50">
          <h3 class="ml-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
            {{ $t("tracking.order_summary") }}
          </h3>
        </div>

        <div class="p-6">
          <div class="mb-6 space-y-4">
            <div
              v-for="detail in orderData.details"
              :key="detail.id"
              class="flex items-center gap-4 py-2 pb-4 border-b border-gray-50 last:border-0"
            >
              <img
                :src="detail.product.image || defaultBagIcon"
                class="object-cover w-16 h-16 bg-gray-100 border border-gray-100 rounded-lg"
              />
              <div class="flex-grow">
                <h4 class="text-sm font-bold text-gray-900 uppercase">
                  {{ detail.product.name }}
                </h4>
                <p
                  v-if="detail.color"
                  class="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5"
                >
                  {{ $t("tracking.color") }}
                  <span class="font-bold text-gray-700">{{ detail.color }}</span>
                </p>
                <p class="mt-1 text-xs text-gray-400">
                  {{ detail.quantity }} x {{ formatLocalPrice(detail.price, orderData) }}
                </p>
              </div>
              <p class="text-sm font-bold text-gray-900">
                {{ formatLocalPrice(detail.quantity * detail.price, orderData) }}
              </p>
            </div>
          </div>

          <div class="pt-4 space-y-2 border-t border-gray-100">
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ $t("tracking.subtotal_products") }}</span>
              <span>{{ formatLocalPrice(orderData.total_amount, orderData) }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>{{ $t("tracking.shipping_cost") }}</span>
              <span>{{ formatLocalPrice(orderData.shipping_cost, orderData) }}</span>
            </div>
            <div
              v-if="orderData.promo_discount > 0"
              class="flex justify-between text-xs font-medium text-green-600"
            >
              <span
                >{{ $t("tracking.promo_applied") }} (<span class="font-mono uppercase">{{
                  orderData.promo_code
                }}</span
                >)</span
              >
              <span>- {{ formatLocalPrice(orderData.promo_discount, orderData) }}</span>
            </div>

            <div
              v-if="orderData.points_used > 0"
              class="flex justify-between text-xs font-medium text-yellow-600"
            >
              <span
                >{{ $t("tracking.points_redeemed") }} ({{
                  orderData.points_used
                }}
                Pts)</span
              >
              <span
                >- {{ formatLocalPrice(orderData.points_used * 1000, orderData) }}</span
              >
            </div>
            <div
              class="flex items-center justify-between pt-4 mt-4 border-t border-gray-200 border-dashed"
            >
              <span class="font-bold text-[10px] uppercase tracking-widest text-black">{{
                $t("tracking.grand_total")
              }}</span>
              <span class="text-xl font-black text-black">{{
                formatLocalPrice(getGrandTotal(orderData), orderData)
              }}</span>
            </div>
          </div>

          <div
            v-if="
              userData?.is_membership &&
              orderData.point > 0 &&
              orderData.status === 'completed'
            "
            class="flex items-center justify-between p-4 mt-6 border border-yellow-100 bg-gradient-to-r from-yellow-50 to-white rounded-xl"
          >
            <div class="flex items-center gap-3">
              <div
                class="flex items-center justify-center w-10 h-10 text-white bg-yellow-400 rounded-full shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
              <div>
                <p
                  class="text-[10px] font-bold text-yellow-800 uppercase tracking-widest"
                >
                  {{ $t("tracking.loyalty_reward") }}
                </p>
                <p class="text-xs text-gray-500 mt-0.5">
                  {{ $t("tracking.points_credited") }}
                </p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-2xl font-black text-yellow-600"
                >+{{ orderData.point }}</span
              >
              <span class="ml-1 text-xs font-bold text-yellow-800">Pts</span>
            </div>
          </div>
        </div>
      </div>

      <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-3xl md:p-8">
        <h3
          class="pb-4 mb-6 text-sm font-bold tracking-widest uppercase border-b border-gray-100"
        >
          {{ $t("tracking.tracking_timeline") }}
        </h3>

        <div class="relative ml-3 space-y-8 border-l-2 border-gray-100">
          <div
            v-for="(history, index) in timelineHistory"
            :key="index"
            class="relative pl-8"
          >
            <span
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>

            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="mb-1 text-sm font-bold tracking-wide text-gray-900 uppercase">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="mb-2 text-xs text-gray-600">{{ history.note }}</p>
              <p class="text-[10px] text-gray-400 font-medium font-mono">
                {{ formatDate(history.updated_at) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api";

import defaultBagIcon from "../../assets/products/bag_icon.jpg";

import { useI18n } from "vue-i18n";

// import { formatPrice } from "../../utils/currency"; // Dihapus karena kita buat lokal

const userData = ref(null);

const route = useRoute();
const router = useRouter();

const orderData = ref(null);
const trackingData = ref(null);
const isLoading = ref(true);
const error = ref(null);

const { t } = useI18n();

const paymentMethodInfo = ref(history.state?.paymentMethod || "");

const activePaymentMethod = computed(() => {
  if (orderData.value?.payment_method) return orderData.value.payment_method;
  if (paymentMethodInfo.value) return paymentMethodInfo.value;
  return null;
});

// [PERBAIKAN 1]: Mengakomodasi DHL Logo
const getCourierLogo = (company) => {
  if (!company) return null;
  const baseUrl = "/courier_images/";
  const map = {
    jne: "jne.png",
    sicepat: "sicepat.png",
    jnt: "jnt.png",
    anteraja: "anteraja.png",
    gojek: "gojek.png",
    grab: "grab.png",
    paxel: "paxel.png",
    ninja: "ninja.png",
    dhl: "dhl.png", // LOGO DHL
  };
  return map[company.toLowerCase()] ? baseUrl + map[company.toLowerCase()] : null;
};

const getPaymentLogo = (methodString) => {
  if (!methodString) return null;
  const channel = methodString.split(" ")[1]?.toLowerCase();
  if (!channel) return null;
  const baseUrl = "/payment_images/";
  const map = {
    bca: "bca.png",
    bni: "bni.png",
    bri: "bri.png",
    mandiri: "mandiri.png",
    bsi: "bsi.png",
    permata: "permata.png",
    ovo: "ovo.png",
    dana: "dana.png",
    linkaja: "linkaja.png",
    shopeepay: "shopeepay.png",
    alfamart: "alfamart.png",
    indomaret: "indomaret.png",
    qris: "qris.png",
  };
  return map[channel] ? baseUrl + map[channel] : null;
};

// [PERBAIKAN 2]: Format Mata Uang Dinamis (Local Price Formatter)
const formatLocalPrice = (value, order) => {
  const code = order.currency_code || "IDR";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: code,
    minimumFractionDigits: code === "IDR" || code === "JPY" ? 0 : 2,
  }).format(value);
};

const getGrandTotal = (order) => {
  if (!order) return 0;
  const total = parseFloat(order.total_amount || 0);
  const shipping = parseFloat(order.shipping_cost || 0);
  const promo = parseFloat(order.promo_discount || 0);
  const pointsDiscount = parseFloat((order.points_used || 0) * 1000);
  return total + shipping - promo - pointsDiscount;
};

const fetchAllData = async () => {
  isLoading.value = true;
  error.value = null;

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  try {
    const orderRes = await axios.get(
      `${BASE_URL}/transactions/${route.params.id}`,
      config
    );
    orderData.value = orderRes.data;

    try {
      const trackingRes = await axios.get(
        `${BASE_URL}/transactions/${route.params.id}/tracking`,
        config
      );
      trackingData.value = trackingRes.data;
    } catch (trackErr) {
      console.warn("Tracking data is not ready yet:", trackErr);

      // [MOCK FALLBACK UNTUK DHL]
      // Jika Backend melempar error karena Mock DHL tidak punya API Tracker yang nyata,
      // kita ciptakan data palsu agar UI Tracking tidak kosong melompong!
      if (orderData.value?.courier_company?.toLowerCase() === "dhl") {
        trackingData.value = {
          courier: {
            company: "DHL",
            type: "Express Worldwide",
            history: [
              {
                status: "processing",
                note: "Order data received by DHL",
                updated_at: orderData.value.created_at,
              },
            ],
          },
          origin: { contact_name: "Solher Store", address: "Surabaya, ID" },
          destination: {
            contact_name: orderData.value.user?.name,
            address: "International Route",
          },
        };
      }
    }
  } catch (err) {
    error.value = err.response?.data?.message || "Failed to fetch order details.";
  } finally {
    isLoading.value = false;
  }
};

// Logika Timeline: Murni mengambil dari API
const timelineHistory = computed(() => {
  const apiHistory = trackingData.value?.courier?.history || [];

  if (apiHistory.length > 0) {
    // Balik array agar status terbaru ada di atas
    return [...apiHistory].reverse();
  }

  // Default state awal jika histori kosong dari Biteship
  return [
    {
      status: trackingData.value?.status || orderData.value?.status || "Processing",
      note: getNoteFromStatus(trackingData.value?.status || orderData.value?.status),
      updated_at:
        trackingData.value?.delivery?.datetime ||
        orderData.value?.created_at ||
        new Date().toISOString(),
    },
  ];
});

const formatStatusTitle = (status) => {
  if (!status) return "Processing";
  const formatted = status.replace(/_/g, " ");
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

const getNoteFromStatus = (status) => {
  const map = {
    pending: "Waiting for payment.",
    placed: "Your order has been recorded and is waiting for courier allocation.",
    allocated: "Courier has been allocated to pick up your package.",
    picking_up: "Courier is on the way to pick up the package from the origin.",
    picked: "Package has been picked up by the courier.",
    dropping_off: "Package is on the way to the destination.",
    delivered: "Package has been delivered to the recipient.",
    rejected: "Delivery was rejected.",
    cancelled: "Delivery was cancelled.",
  };
  return map[status] || "Order is currently being processed by the system.";
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    userData.value = JSON.parse(user);
  }
  fetchAllData();
});
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.leading-relaxed {
  transition: all 0.3s ease;
}

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

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
