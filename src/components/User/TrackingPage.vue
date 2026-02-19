<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-3xl min-h-screen">
    
    <div class="mb-8">
      <button @click="$router.push('/orderpage')" class="text-gray-500 hover:text-black font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 mb-6">
        <span>&larr;</span> Back to Orders
      </button>
      <h1 class="font-serif text-3xl md:text-4xl uppercase tracking-tighter text-gray-900">Shipment Tracking</h1>
    </div>

    <div v-if="isLoading" class="flex flex-col justify-center items-center py-20">
      <div class="border-4 border-gray-100 border-t-black rounded-full w-10 h-10 animate-spin"></div>
      <p class="mt-4 font-bold text-gray-400 text-xs uppercase tracking-widest animate-pulse">Fetching latest updates...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-8 rounded-2xl text-center border border-red-100">
      <p class="text-red-600 font-bold">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden animate-fade-in">
      
      <div class="bg-gray-50 p-6 md:p-8 border-b border-gray-100">
        <div class="flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill Number</p>
            <p class="font-mono font-bold text-xl text-black">{{ trackingData.waybill_id }}</p>
          </div>
          <div class="md:text-right">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Courier</p>
            <p class="font-bold text-gray-800 uppercase">{{ trackingData.courier?.company }} - {{ trackingData.courier?.type }}</p>
          </div>
        </div>
        <div class="mt-6 flex items-center gap-3">
          <span class="bg-black text-white px-4 py-1.5 rounded-full font-bold text-[10px] uppercase tracking-widest">
            {{ trackingData.status }}
          </span>
        </div>
      </div>

      <div class="p-6 md:p-8">
        <div v-if="trackingData.history && trackingData.history.length > 0" class="relative border-l border-gray-200 ml-3 space-y-8">
          
          <div v-for="(history, index) in trackingData.history" :key="index" class="relative pl-8">
            <span 
              :class="index === 0 ? 'bg-black ring-4 ring-gray-100' : 'bg-gray-300'"
              class="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full"
            ></span>
            
            <div :class="index === 0 ? 'opacity-100' : 'opacity-60'">
              <p class="font-bold text-gray-900 text-sm mb-1">{{ history.note }}</p>
              <p class="text-xs text-gray-500 font-medium">{{ formatDate(history.updated_at) }}</p>
            </div>
          </div>

        </div>
        <div v-else class="text-center py-10 text-gray-400 italic">
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
  <div class="mx-auto px-6 py-20 max-w-3xl min-h-screen">
    
    <div class="mb-8">
      <button @click="$router.push('/orderpage')" class="text-gray-500 hover:text-black font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 mb-6">
        <span>&larr;</span> Back to Orders
      </button>
      <h1 class="font-serif text-3xl md:text-4xl uppercase tracking-tighter text-gray-900">Shipment Tracking</h1>
    </div>

    <div v-if="isLoading" class="flex flex-col justify-center items-center py-20">
      <div class="border-4 border-gray-100 border-t-black rounded-full w-10 h-10 animate-spin"></div>
      <p class="mt-4 font-bold text-gray-400 text-xs uppercase tracking-widest animate-pulse">Fetching latest updates...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-8 rounded-2xl text-center border border-red-100">
      <p class="text-red-600 font-bold">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="space-y-6 animate-fade-in">
      
      <div class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
        <div class="bg-gray-50 p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill / Resi</p>
            <p class="font-mono font-bold text-xl text-black">
              {{ trackingData.courier?.waybill_id || 'Waiting for Courier...' }}
            </p>
          </div>
          <div class="md:text-right">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Courier Service</p>
            <p class="font-bold text-gray-800 uppercase text-sm">
              {{ trackingData.courier?.company }} - {{ trackingData.courier?.type }}
            </p>
          </div>
        </div>

        <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full bg-gray-300"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origin</p>
            </div>
            <p class="font-bold text-gray-900">{{ trackingData.origin?.contact_name }}</p>
          </div>
          
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full bg-black"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Destination</p>
            </div>
            <p class="font-bold text-gray-900">{{ trackingData.destination?.contact_name }}</p>
            <p class="text-gray-500 mt-1 leading-relaxed">{{ trackingData.destination?.address }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 md:p-8">
        <h3 class="font-bold text-sm uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">Tracking Timeline</h3>
        
        <div class="relative border-l-2 border-gray-100 ml-3 space-y-8">
          
          <div v-for="(history, index) in timelineHistory" :key="index" class="relative pl-8">
            <span 
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>
            
            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="text-gray-600 text-xs mb-2">{{ history.note }}</p>
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
  <div class="mx-auto px-6 py-20 max-w-3xl min-h-screen">
    
    <div class="mb-8 flex justify-between items-center">
      <div>
        <button @click="$router.push('/orderpage')" class="text-gray-500 hover:text-black font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 mb-6">
          <span>&larr;</span> Back to Orders
        </button>
        <h1 class="font-serif text-3xl md:text-4xl uppercase tracking-tighter text-gray-900">Shipment Tracking</h1>
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

    <div v-if="isLoading" class="flex flex-col justify-center items-center py-20">
      <div class="border-4 border-gray-100 border-t-black rounded-full w-10 h-10 animate-spin"></div>
      <p class="mt-4 font-bold text-gray-400 text-xs uppercase tracking-widest animate-pulse">Fetching latest updates...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-8 rounded-2xl text-center border border-red-100">
      <p class="text-red-600 font-bold">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="space-y-6 animate-fade-in">
      
      <div class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
        <div class="bg-gray-50 p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill / Resi</p>
            <p class="font-mono font-bold text-xl text-black">
              {{ trackingData.courier?.waybill_id || simulatedWaybill || 'Waiting for Courier...' }}
            </p>
          </div>
          <div class="md:text-right">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Courier Service</p>
            <p class="font-bold text-gray-800 uppercase text-sm">
              {{ trackingData.courier?.company }} - {{ trackingData.courier?.type }}
            </p>
          </div>
        </div>

        <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full bg-gray-300"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origin</p>
            </div>
            <p class="font-bold text-gray-900">{{ trackingData.origin?.contact_name }}</p>
          </div>
          
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full bg-black"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Destination</p>
            </div>
            <p class="font-bold text-gray-900">{{ trackingData.destination?.contact_name }}</p>
            <p class="text-gray-500 mt-1 leading-relaxed">{{ trackingData.destination?.address }}</p>
          </div>
        </div>
      </div>

      <div class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 md:p-8">
        <h3 class="font-bold text-sm uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">Tracking Timeline</h3>
        
        <div class="relative border-l-2 border-gray-100 ml-3 space-y-8">
          
          <div v-for="(history, index) in timelineHistory" :key="index" class="relative pl-8">
            <span 
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>
            
            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="text-gray-600 text-xs mb-2">{{ history.note }}</p>
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
  <div class="mx-auto px-6 py-20 max-w-3xl min-h-screen">
    <div class="mb-8 flex justify-between items-center">
      <div>
        <button
          @click="$router.push('/orderpage')"
          class="text-gray-500 hover:text-black font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 mb-6"
        >
          <span>&larr;</span> Back to Orders
        </button>
        <h1
          class="font-serif text-3xl md:text-4xl uppercase tracking-tighter text-gray-900"
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
      class="flex flex-col justify-center items-center py-20"
    >
      <div
        class="border-4 border-gray-100 border-t-black rounded-full w-10 h-10 animate-spin"
      ></div>
      <p
        class="mt-4 font-bold text-gray-400 text-xs uppercase tracking-widest animate-pulse"
      >
        Fetching latest updates...
      </p>
    </div>

    <div
      v-else-if="error"
      class="bg-red-50 p-8 rounded-2xl text-center border border-red-100"
    >
      <p class="text-red-600 font-bold">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="space-y-6 animate-fade-in">
      <div
        class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden"
      >
        <div
          class="bg-gray-50 p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
          <div>
            <p
              class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
            >
              Waybill / Resi
            </p>
            <p class="font-mono font-bold text-xl text-black">
              {{
                trackingData.courier?.waybill_id ||
                simulatedWaybill ||
                "Waiting for Courier..."
              }}
            </p>
            <div class="mt-2 flex items-center gap-3">
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
            <p class="font-bold text-gray-800 uppercase text-sm">
              {{ trackingData.courier?.company }} -
              {{ trackingData.courier?.type }}
            </p>
          </div>
        </div>

        <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
          <div>
            <div class="flex items-center gap-2 mb-2">
              <span class="w-2 h-2 rounded-full bg-gray-300"></span>
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
              <span class="w-2 h-2 rounded-full bg-black"></span>
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest"
              >
                Destination
              </p>
            </div>
            <p class="font-bold text-gray-900">
              {{ trackingData.destination?.contact_name }}
            </p>
            <p class="text-gray-500 mt-1 leading-relaxed">
              {{ trackingData.destination?.address }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 md:p-8"
      >
        <h3
          class="font-bold text-sm uppercase tracking-widest border-b border-gray-100 pb-4 mb-6"
        >
          Tracking Timeline
        </h3>

        <div class="relative border-l-2 border-gray-100 ml-3 space-y-8">
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
                class="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1"
              >
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="text-gray-600 text-xs mb-2">{{ history.note }}</p>
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
  <div class="mx-auto px-6 py-20 max-w-4xl min-h-screen">
    <div class="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <button
          @click="$router.push('/orderpage')"
          class="text-gray-500 hover:text-black font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 mb-6"
        >
          <span>&larr;</span> Back to Orders
        </button>
        <h1 class="font-serif text-3xl md:text-4xl uppercase tracking-tighter text-gray-900">
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

    <div v-if="isLoading" class="flex flex-col justify-center items-center py-20">
      <div class="border-4 border-gray-100 border-t-black rounded-full w-10 h-10 animate-spin"></div>
      <p class="mt-4 font-bold text-gray-400 text-xs uppercase tracking-widest animate-pulse">
        Fetching latest updates...
      </p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-8 rounded-2xl text-center border border-red-100">
      <p class="text-red-600 font-bold">{{ error }}</p>
    </div>

    <div v-else-if="trackingData" class="space-y-6 animate-fade-in">
      
      <div class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
        <div class="bg-gray-50 p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill / Resi</p>
            <p class="font-mono font-bold text-xl text-black">
              {{ trackingData.courier?.waybill_id || trackingData.tracking_number || simulatedWaybill || "Waiting for Courier..." }}
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-3">
              <span class="bg-black text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
                {{ formatStatusTitle(trackingData.status) }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-6 w-full md:w-auto">
            <div v-if="activePaymentMethod" class="flex flex-col items-start md:items-end">
               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Payment</p>
               <div class="flex items-center gap-3">
                 <div class="w-10 h-6 bg-white border border-gray-200 rounded flex justify-center items-center overflow-hidden shrink-0">
                   <img v-if="getPaymentLogo(activePaymentMethod)" :src="getPaymentLogo(activePaymentMethod)" class="w-full h-full object-contain p-0.5" />
                   <span v-else class="font-black text-gray-300 text-[8px]">{{ activePaymentMethod.split(' ')[1] || 'PAY' }}</span>
                 </div>
                 <p class="font-bold text-green-600 text-xs uppercase">{{ activePaymentMethod.replace("_", " ") }}</p>
               </div>
            </div>

            <div class="w-px h-8 bg-gray-200 hidden md:block"></div> <div class="flex flex-col items-start md:items-end">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Courier</p>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-white border border-gray-200 rounded-lg flex justify-center items-center overflow-hidden shrink-0">
                   <img v-if="getCourierLogo(trackingData.courier?.company || trackingData.courier_company)" :src="getCourierLogo(trackingData.courier?.company || trackingData.courier_company)" class="w-full h-full object-contain p-1" />
                   <span v-else class="font-black text-gray-300 text-[8px]">{{ trackingData.courier?.company || 'N/A' }}</span>
                </div>
                <div class="text-left md:text-right">
                  <p class="font-bold text-gray-800 uppercase text-xs">
                    {{ trackingData.courier?.company || trackingData.courier_company }}
                  </p>
                  <p class="text-[10px] text-gray-500 font-bold uppercase">{{ trackingData.courier?.type || trackingData.courier_type }}</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm bg-white">
          <div class="space-y-3">
            <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <span class="w-2 h-2 rounded-full bg-gray-300"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origin Details</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Sender Name</p>
              <p class="font-bold text-gray-900">{{ trackingData.origin?.contact_name || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-gray-700 text-xs">{{ trackingData.origin?.contact_phone || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Full Address</p>
              <p class="text-gray-600 leading-relaxed text-xs">
                {{ trackingData.origin?.address || '-' }}<br/>
                <span v-if="trackingData.origin?.postal_code" class="font-bold">Postal Code: {{ trackingData.origin.postal_code }}</span>
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <span class="w-2 h-2 rounded-full bg-black"></span>
              <p class="text-[10px] font-bold text-black uppercase tracking-widest">Destination Details</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Recipient Name</p>
              <p class="font-bold text-gray-900">{{ trackingData.destination?.contact_name || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-gray-700 text-xs">{{ trackingData.destination?.contact_phone || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Full Address</p>
              <p class="text-gray-600 leading-relaxed text-xs">
                {{ trackingData.destination?.address || '-' }}<br/>
                <span v-if="trackingData.destination?.postal_code" class="font-bold">Postal Code: {{ trackingData.destination.postal_code }}</span>
              </p>
            </div>
            <div v-if="trackingData.destination?.note">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Courier Note</p>
              <p class="text-gray-500 italic text-xs bg-gray-50 p-2 rounded border">"{{ trackingData.destination.note }}"</p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="trackingData.details && trackingData.details.length > 0" class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
        <div class="bg-gray-50 p-4 border-b border-gray-100">
           <h3 class="font-bold text-xs uppercase tracking-widest text-gray-500 ml-2">Order Summary</h3>
        </div>
        
        <div class="p-6">
          <div class="space-y-4 mb-6">
            <div v-for="detail in trackingData.details" :key="detail.id" class="flex items-center gap-4 py-2">
              <img :src="detail.product.image" class="bg-gray-100 border border-gray-100 rounded-lg w-16 h-16 object-cover" />
              <div class="flex-grow">
                <h4 class="font-bold text-gray-900 text-sm uppercase">{{ detail.product.name }}</h4>
                <p class="text-gray-400 text-xs">{{ detail.quantity }} x {{ formatPrice(detail.price) }}</p>
              </div>
              <p class="font-bold text-gray-900 text-sm">{{ formatPrice(detail.quantity * detail.price) }}</p>
            </div>
          </div>

          <div class="border-t border-gray-100 pt-4 space-y-2">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Subtotal for Products</span>
              <span>{{ formatPrice(trackingData.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>Shipping Cost</span>
              <span>{{ formatPrice(trackingData.shipping_cost) }}</span>
            </div>
            <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 border-dashed">
              <span class="font-bold text-[10px] uppercase tracking-widest text-black">Grand Total</span>
              <span class="font-black text-xl text-black">{{ formatPrice(getGrandTotal(trackingData)) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 md:p-8">
        <h3 class="font-bold text-sm uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">
          Tracking Timeline
        </h3>

        <div class="relative border-l-2 border-gray-100 ml-3 space-y-8">
          <div v-for="(history, index) in timelineHistory" :key="index" class="relative pl-8">
            <span
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>

            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="text-gray-600 text-xs mb-2">{{ history.note }}</p>
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

<template>
  <div class="mx-auto px-6 py-20 max-w-4xl min-h-screen">
    <div class="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
      <div>
        <button
          @click="$router.push('/orderpage')"
          class="text-gray-500 hover:text-black font-bold text-xs uppercase tracking-widest transition flex items-center gap-2 mb-6"
        >
          <span>&larr;</span> Back to Orders
        </button>
        <h1 class="font-serif text-3xl md:text-4xl uppercase tracking-tighter text-gray-900">
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

    <div v-if="isLoading" class="flex flex-col justify-center items-center py-20">
      <div class="border-4 border-gray-100 border-t-black rounded-full w-10 h-10 animate-spin"></div>
      <p class="mt-4 font-bold text-gray-400 text-xs uppercase tracking-widest animate-pulse">
        Fetching order details...
      </p>
    </div>

    <div v-else-if="error" class="bg-red-50 p-8 rounded-2xl text-center border border-red-100">
      <p class="text-red-600 font-bold">{{ error }}</p>
    </div>

    <div v-else-if="orderData" class="space-y-6 animate-fade-in">
      
      <div class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
        <div class="bg-gray-50 p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Waybill / Resi</p>
            <p class="font-mono font-bold text-xl text-black">
              {{ trackingData?.courier?.waybill_id || orderData.tracking_number || simulatedWaybill || "Waiting for Courier..." }}
            </p>
            <div class="mt-3 flex flex-wrap items-center gap-3">
              <span class="bg-black text-white px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-widest">
                {{ formatStatusTitle(trackingData?.status || orderData.status) }}
              </span>
            </div>
          </div>

          <div class="flex items-center gap-6 w-full md:w-auto">
            <div v-if="activePaymentMethod" class="flex flex-col items-start md:items-end">
               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Payment</p>
               <div class="flex items-center gap-3">
                 <div class="w-10 h-6 bg-white border border-gray-200 rounded flex justify-center items-center overflow-hidden shrink-0">
                   <img v-if="getPaymentLogo(activePaymentMethod)" :src="getPaymentLogo(activePaymentMethod)" class="w-full h-full object-contain p-0.5" />
                   <span v-else class="font-black text-gray-300 text-[8px]">{{ activePaymentMethod.split(' ')[1] || 'PAY' }}</span>
                 </div>
                 <p class="font-bold text-green-600 text-xs uppercase">{{ activePaymentMethod.replace("_", " ") }}</p>
               </div>
            </div>

            <div class="w-px h-8 bg-gray-200 hidden md:block"></div> 
            
            <div class="flex flex-col items-start md:items-end">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Courier</p>
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-white border border-gray-200 rounded-lg flex justify-center items-center overflow-hidden shrink-0">
                   <img v-if="getCourierLogo(trackingData?.courier?.company || orderData.courier_company)" :src="getCourierLogo(trackingData?.courier?.company || orderData.courier_company)" class="w-full h-full object-contain p-1" />
                   <span v-else class="font-black text-gray-300 text-[8px]">{{ trackingData?.courier?.company || orderData.courier_company || 'N/A' }}</span>
                </div>
                <div class="text-left md:text-right">
                  <p class="font-bold text-gray-800 uppercase text-xs">
                    {{ trackingData?.courier?.company || orderData.courier_company }}
                  </p>
                  <p class="text-[10px] text-gray-500 font-bold uppercase">{{ trackingData?.courier?.type || orderData.courier_type }}</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>

        <div v-if="trackingData" class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm bg-white">
          <div class="space-y-3">
            <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <span class="w-2 h-2 rounded-full bg-gray-300"></span>
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Origin Details</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Sender Name</p>
              <p class="font-bold text-gray-900">{{ trackingData.origin?.contact_name || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-gray-700 text-xs">{{ trackingData.origin?.contact_phone || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Full Address</p>
              <p class="text-gray-600 leading-relaxed text-xs">
                {{ trackingData.origin?.address || '-' }}<br/>
                <span v-if="trackingData.origin?.postal_code" class="font-bold">Postal Code: {{ trackingData.origin.postal_code }}</span>
              </p>
            </div>
          </div>

          <div class="space-y-3">
            <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
              <span class="w-2 h-2 rounded-full bg-black"></span>
              <p class="text-[10px] font-bold text-black uppercase tracking-widest">Destination Details</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Recipient Name</p>
              <p class="font-bold text-gray-900">{{ trackingData.destination?.contact_name || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Phone</p>
              <p class="font-mono text-gray-700 text-xs">{{ trackingData.destination?.contact_phone || '-' }}</p>
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Full Address</p>
              <p class="text-gray-600 leading-relaxed text-xs">
                {{ trackingData.destination?.address || '-' }}<br/>
                <span v-if="trackingData.destination?.postal_code" class="font-bold">Postal Code: {{ trackingData.destination.postal_code }}</span>
              </p>
            </div>
            <div v-if="trackingData.destination?.note">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest">Courier Note</p>
              <p class="text-gray-500 italic text-xs bg-gray-50 p-2 rounded border">"{{ trackingData.destination.note }}"</p>
            </div>
          </div>
        </div>
        <div v-else class="p-6 md:p-8 text-center bg-white text-gray-400 text-xs italic">
          Menunggu data lokasi kurir (Origin & Destination) tersedia dari ekspedisi...
        </div>
      </div>

      <div v-if="orderData.details && orderData.details.length > 0" class="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden">
        <div class="bg-gray-50 p-4 border-b border-gray-100">
           <h3 class="font-bold text-xs uppercase tracking-widest text-gray-500 ml-2">Order Summary</h3>
        </div>
        
        <div class="p-6">
          <div class="space-y-4 mb-6">
            <div v-for="detail in orderData.details" :key="detail.id" class="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0 pb-4">
              <img :src="detail.product.image" class="bg-gray-100 border border-gray-100 rounded-lg w-16 h-16 object-cover" />
              <div class="flex-grow">
                <h4 class="font-bold text-gray-900 text-sm uppercase">{{ detail.product.name }}</h4>
                <p class="text-gray-400 text-xs">{{ detail.quantity }} x {{ formatPrice(detail.price) }}</p>
              </div>
              <p class="font-bold text-gray-900 text-sm">{{ formatPrice(detail.quantity * detail.price) }}</p>
            </div>
          </div>

          <div class="border-t border-gray-100 pt-4 space-y-2">
            <div class="flex justify-between text-xs text-gray-500">
              <span>Subtotal for Products</span>
              <span>{{ formatPrice(orderData.total_amount) }}</span>
            </div>
            <div class="flex justify-between text-xs text-gray-500">
              <span>Shipping Cost</span>
              <span>{{ formatPrice(orderData.shipping_cost) }}</span>
            </div>
            <div class="flex justify-between items-center mt-4 pt-4 border-t border-gray-200 border-dashed">
              <span class="font-bold text-[10px] uppercase tracking-widest text-black">Grand Total</span>
              <span class="font-black text-xl text-black">{{ formatPrice(getGrandTotal(orderData)) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white shadow-sm border border-gray-100 rounded-3xl p-6 md:p-8">
        <h3 class="font-bold text-sm uppercase tracking-widest border-b border-gray-100 pb-4 mb-6">
          Tracking Timeline
        </h3>

        <div class="relative border-l-2 border-gray-100 ml-3 space-y-8">
          <div v-for="(history, index) in timelineHistory" :key="index" class="relative pl-8">
            <span
              :class="index === 0 ? 'bg-black ring-4 ring-gray-50' : 'bg-gray-300'"
              class="absolute -left-[9px] top-1 w-4 h-4 rounded-full transition-all"
            ></span>

            <div :class="index === 0 ? 'opacity-100' : 'opacity-50'">
              <p class="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">
                {{ formatStatusTitle(history.status) }}
              </p>
              <p class="text-gray-600 text-xs mb-2">{{ history.note }}</p>
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
</script>
