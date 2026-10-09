<template>
  <div class="p-6 md:p-8 min-h-screen bg-gray-50/50">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-black text-gray-900 tracking-tight uppercase">Consultation Intakes</h1>
        <p class="text-sm text-gray-500 mt-1">Kelola permohonan konsultasi dari Member VIP (Héritage).</p>
      </div>
      <button @click="fetchIntakes" class="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>

    <!-- Filter / Tabs -->
    <div class="flex gap-4 mb-6 border-b border-gray-200">
      <button @click="activeTab = 'pending'" :class="activeTab === 'pending' ? 'border-black text-black' : 'border-transparent text-gray-400'" class="px-4 py-3 font-bold text-[11px] tracking-widest uppercase border-b-2 transition-colors">Menunggu (Pending)</button>
      <button @click="activeTab = 'resolved'" :class="activeTab === 'resolved' ? 'border-black text-black' : 'border-transparent text-gray-400'" class="px-4 py-3 font-bold text-[11px] tracking-widest uppercase border-b-2 transition-colors">Selesai (Resolved)</button>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div v-if="isLoading" class="p-12 flex justify-center items-center">
        <div class="animate-spin w-8 h-8 border-4 border-gray-200 border-t-black rounded-full"></div>
      </div>

      <div v-else-if="filteredIntakes.length === 0" class="p-16 text-center">
        <span class="text-4xl">📬</span>
        <h3 class="mt-4 text-sm font-bold text-gray-900 uppercase tracking-widest">Kosong</h3>
        <p class="text-xs text-gray-500 mt-2">Belum ada data konsultasi di kategori ini.</p>
      </div>

      <div v-else class="overflow-x-auto custom-scrollbar">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50/80 border-b border-gray-100">
              <th class="px-6 py-4 text-[10px] font-black tracking-widest text-gray-500 uppercase">Waktu</th>
              <th class="px-6 py-4 text-[10px] font-black tracking-widest text-gray-500 uppercase">Klien</th>
              <th class="px-6 py-4 text-[10px] font-black tracking-widest text-gray-500 uppercase">Tujuan / Keluhan</th>
              <th class="px-6 py-4 text-[10px] font-black tracking-widest text-gray-500 uppercase text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="intake in filteredIntakes" :key="intake.id" class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
              <td class="px-6 py-4 text-xs font-medium text-gray-900 whitespace-nowrap">
                {{ formatDate(intake.created_at) }}
              </td>
              <td class="px-6 py-4">
                <p class="text-xs font-bold text-gray-900 truncate">{{ intake.user?.first_name || 'Guest' }}</p>
                <p class="text-[10px] text-gray-500 truncate">{{ intake.user?.email }}</p>
              </td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center px-2 py-1 mb-1 text-[9px] font-black uppercase tracking-widest rounded bg-gray-100 text-gray-600">
                  {{ formatIntent(intake.intent) }}
                </span>
                <p class="text-xs text-gray-500 truncate max-w-[200px]" :title="intake.specific_needs">{{ intake.specific_needs || 'Tidak ada catatan spesifik.' }}</p>
              </td>
              <td class="px-6 py-4 text-center">
                <button @click="openDetail(intake)" class="px-4 py-2 text-[10px] font-bold text-white uppercase tracking-widest bg-black rounded-lg hover:bg-gray-800 transition">Lihat Profil</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Profil Konsultasi -->
    <div v-if="selectedIntake" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" @click.self="closeDetail">
      <div class="bg-white w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <div>
            <h2 class="text-sm font-black text-gray-900 uppercase tracking-widest">Intake Profile</h2>
            <p class="text-[10px] text-gray-500">{{ formatDate(selectedIntake.created_at) }}</p>
          </div>
          <button @click="closeDetail" class="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-200 transition">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div class="p-8 overflow-y-auto custom-scrollbar flex-grow space-y-6">
          <!-- User Details -->
          <div class="flex items-center gap-4 pb-6 border-b border-gray-100">
            <div class="w-12 h-12 bg-yellow-100 text-yellow-800 rounded-full flex justify-center items-center font-serif text-xl font-bold">
              {{ selectedIntake.user?.first_name?.charAt(0) || 'C' }}
            </div>
            <div>
              <p class="text-sm font-bold text-gray-900 uppercase tracking-wide">{{ selectedIntake.user?.first_name }} {{ selectedIntake.user?.last_name || '' }}</p>
              <p class="text-xs text-gray-500">{{ selectedIntake.user?.email }} • {{ selectedIntake.user?.phone }}</p>
            </div>
          </div>

          <!-- Topik Utama -->
          <div>
            <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Topik Konsultasi</h4>
            <div class="bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span class="px-2 py-1 text-[10px] font-black text-gray-800 bg-white border border-gray-200 rounded uppercase tracking-widest shadow-sm">
                {{ formatIntent(selectedIntake.intent) }}
              </span>
              <p v-if="selectedIntake.intent === 'complaint'" class="mt-3 text-xs text-red-600 font-bold uppercase tracking-widest">
                Kategori: {{ selectedIntake.complaint_type || 'Umum' }}
              </p>
            </div>
          </div>

          <!-- Preferensi Gaya (Jika ada) -->
          <div v-if="selectedIntake.preferred_styles && selectedIntake.preferred_styles.length > 0">
            <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Preferensi Style & Tas</h4>
            <div class="flex flex-wrap gap-2 mb-3">
              <span v-for="style in selectedIntake.preferred_styles" :key="style" class="px-3 py-1.5 text-[10px] font-bold text-blue-800 bg-blue-50 rounded-lg capitalize border border-blue-100">{{ style }}</span>
              <span v-for="bag in selectedIntake.preferred_bag_types" :key="bag" class="px-3 py-1.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 rounded-lg capitalize border border-emerald-100">{{ bag }}</span>
            </div>
            
            <div v-if="selectedIntake.preferred_colors && selectedIntake.preferred_colors.length > 0" class="flex flex-wrap gap-2 items-center">
              <span class="text-xs text-gray-500 mr-1">Warna Favorit:</span>
              <span v-for="color in selectedIntake.preferred_colors" :key="color" class="px-2 py-1 text-[9px] font-bold uppercase tracking-widest bg-gray-100 border border-gray-200 rounded text-gray-600">{{ color }}</span>
            </div>
          </div>

          <!-- Catatan -->
          <div>
            <h4 class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Catatan Klien</h4>
            <div class="bg-[#111] text-white p-5 rounded-2xl">
              <p class="text-sm font-light leading-relaxed italic">"{{ selectedIntake.specific_needs || 'Tidak ada pesan khusus.' }}"</p>
            </div>
          </div>

        </div>

        <!-- Footer Actions -->
        <div class="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4">
          <button v-if="selectedIntake.status === 'pending'" @click="markAsResolved(selectedIntake.id)" class="px-6 py-3 text-xs font-bold text-gray-500 uppercase tracking-widest bg-white border border-gray-200 rounded-xl hover:bg-gray-100 hover:text-black transition flex-1">
            Tandai Selesai
          </button>
          
          <button @click="openChat(selectedIntake.user_id)" class="px-6 py-3 text-xs font-black text-white uppercase tracking-widest bg-blue-600 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition flex-1 flex justify-center items-center gap-2">
            Balas Via Chat
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from "../../../config/api";

const router = useRouter();
const intakes = ref([]);
const isLoading = ref(false);
const activeTab = ref('pending');
const selectedIntake = ref(null);
const adminToken = localStorage.getItem('admin_token');

const filteredIntakes = computed(() => {
  return intakes.value.filter(i => i.status === activeTab.value);
});

const formatIntent = (intent) => {
  const map = {
    'style_advice': 'Kurasi Gaya',
    'product_inquiry': 'Pertanyaan Produk',
    'feedback': 'Saran & Ulasan',
    'complaint': 'Keluhan'
  };
  return map[intent] || 'Konsultasi';
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  const d = new Date(dateString);
  return d.toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const fetchIntakes = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/consultations`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    intakes.value = res.data.data;
  } catch (error) {
    console.error("Gagal menarik data intake:", error);
  } finally {
    isLoading.value = false;
  }
};

const openDetail = (intake) => {
  selectedIntake.value = intake;
};

const closeDetail = () => {
  selectedIntake.value = null;
};

const openChat = (userId) => {
  closeDetail();
  // Navigasi ke halaman chat khusus pengguna tersebut (sesuaikan path Anda)
  router.push(`/admin/chat/${userId}`);
};

const markAsResolved = async (id) => {
  try {
    // Optimistic Update
    const idx = intakes.value.findIndex(i => i.id === id);
    if (idx !== -1) intakes.value[idx].status = 'resolved';
    
    await axios.post(`${BASE_URL}/admin/consultations/${id}/resolve`, {}, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    
    closeDetail();
  } catch (e) {
    fetchIntakes(); // revert
    Swal.fire('Error', 'Gagal merubah status', 'error');
  }
};

onMounted(() => {
  fetchIntakes();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>