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

<template>
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
</style>