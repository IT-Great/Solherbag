<template>
  <div class="p-6 md:p-8">
    <div class="flex flex-col items-start justify-between mb-8 sm:flex-row sm:items-center">
      <div>
        <h1 class="font-serif text-3xl font-black text-gray-900 tracking-tight">Promos</h1>
        <p class="mt-1 text-sm text-gray-500">
          Kelola kode diskon, kampanye otomatis, dan subsidi pengiriman.
        </p>
      </div>
      <button
        @click="openModal()"
        class="flex items-center px-4 py-2 mt-4 text-sm font-bold tracking-widest text-white uppercase transition-colors bg-black border border-black rounded-lg sm:mt-0 hover:bg-gray-800 focus:ring-4 focus:ring-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
        </svg>
        New Promo
      </button>
    </div>

    <!-- Error State -->
    <div v-if="error" class="p-4 mb-6 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100">
      <div class="flex items-center">
        <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>
        <span class="font-bold">Gagal memuat data:</span>
      </div>
      <p class="mt-1 ml-7">{{ error }}</p>
    </div>

    <!-- Data Table -->
    <div class="bg-white border border-gray-200 shadow-sm rounded-2xl overflow-hidden">
      <div v-if="loading" class="flex flex-col items-center justify-center p-16">
        <div class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
        <p class="mt-4 text-sm font-bold text-gray-400 animate-pulse tracking-widest uppercase">Memuat Data...</p>
      </div>

      <div v-else-if="promos.length === 0" class="flex flex-col items-center justify-center p-16 text-center">
        <div class="p-4 bg-gray-50 rounded-full mb-4">
          <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900">Belum Ada Promo</h3>
        <p class="mt-1 text-sm text-gray-500">Buat kode diskon pertama Anda untuk meningkatkan penjualan.</p>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-gray-50 border-b border-gray-200">
              <th class="p-4 text-xs font-black tracking-widest text-gray-500 uppercase whitespace-nowrap">Status</th>
              <th class="p-4 text-xs font-black tracking-widest text-gray-500 uppercase whitespace-nowrap">Code & Title</th>
              <th class="p-4 text-xs font-black tracking-widest text-gray-500 uppercase whitespace-nowrap">Value</th>
              <th class="p-4 text-xs font-black tracking-widest text-gray-500 uppercase whitespace-nowrap">Usage</th>
              <th class="p-4 text-xs font-black tracking-widest text-gray-500 uppercase whitespace-nowrap text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="promo in promos" :key="promo.id" class="transition-colors hover:bg-gray-50/50">
              <td class="p-4 whitespace-nowrap">
                <span :class="promo.is_active ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'" class="px-2.5 py-1 text-[10px] font-black tracking-widest uppercase border rounded-lg">
                  {{ promo.is_active ? 'Active' : 'Draft' }}
                </span>
                <div v-if="isExpired(promo.end_date)" class="mt-2">
                  <span class="px-2 py-0.5 text-[9px] font-bold text-gray-500 bg-gray-100 rounded">EXPIRED</span>
                </div>
              </td>
              <td class="p-4">
                <div class="font-mono text-sm font-black tracking-wider text-black bg-gray-100 px-2 py-0.5 rounded w-max mb-1">{{ promo.code }}</div>
                <div class="text-xs font-medium text-gray-600 truncate max-w-[200px]">{{ promo.title }}</div>
                <div class="flex gap-1 mt-1">
                  <span v-if="promo.is_member_only" class="text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 rounded border border-amber-100">VIP ONLY</span>
                  <span v-if="promo.is_first_order_only" class="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 rounded border border-blue-100">NEW USER</span>
                </div>
              </td>
              <td class="p-4 whitespace-nowrap">
                <div class="text-sm font-bold text-gray-900">
                  <span v-if="promo.discount_type === 'percentage'">{{ parseFloat(promo.discount_value) }}% OFF</span>
                  <span v-else-if="promo.discount_type === 'fixed'">{{ formatCurrency(promo.discount_value) }}</span>
                  <span v-else class="text-teal-600">FREE SHIPPING</span>
                </div>
                <div class="text-[10px] text-gray-500 mt-1">
                  Min: {{ formatCurrency(promo.min_purchase) }}
                </div>
              </td>
              <td class="p-4 whitespace-nowrap">
                <div class="flex items-center gap-2">
                  <div class="text-xs font-bold text-gray-700">{{ promo.used_count }} / {{ promo.quota || '∞' }}</div>
                  <div v-if="promo.quota" class="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div class="h-full bg-blue-500 rounded-full" :style="{ width: `${(promo.used_count / promo.quota) * 100}%` }"></div>
                  </div>
                </div>
              </td>
              <td class="p-4 text-right whitespace-nowrap">
                <button @click="openModal(promo)" class="p-2 text-blue-600 transition-colors bg-blue-50 rounded-lg hover:bg-blue-100 hover:text-blue-800 mr-2" title="Edit">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
                <button @click="confirmDelete(promo.id)" class="p-2 text-red-600 transition-colors bg-red-50 rounded-lg hover:bg-red-100 hover:text-red-800" title="Delete">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Promo Modal -->
    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div class="w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <h2 class="text-xl font-bold font-serif text-gray-900">{{ isEditing ? 'Edit Promo' : 'Create New Promo' }}</h2>
          <button @click="closeModal" class="p-2 text-gray-400 hover:text-black hover:bg-gray-200 rounded-full transition">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <!-- Modal Body (Form) -->
        <div class="p-6 overflow-y-auto custom-scrollbar flex-grow bg-white">
          <form @submit.prevent="savePromo" class="space-y-6">
            
            <!-- Basic Info Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Promo Code <span class="text-red-500">*</span></label>
                <input v-model="form.code" type="text" required placeholder="e.g. SOLHER17" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black font-mono uppercase" style="text-transform: uppercase;">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Internal Title <span class="text-red-500">*</span></label>
                <input v-model="form.title" type="text" required placeholder="e.g. Kemerdekaan Flash Sale" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Terms / Description</label>
              <textarea v-model="form.description" rows="2" placeholder="Brief terms and conditions..." class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black"></textarea>
            </div>

            <!-- Divider -->
            <div class="h-px bg-gray-100 my-8"></div>
            
            <h3 class="text-sm font-black text-black uppercase tracking-widest mb-4">Value & Logic</h3>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Type</label>
                <select v-model="form.discount_type" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
                  <option value="fixed">Fixed Amount (Rp)</option>
                  <option value="percentage">Percentage (%)</option>
                  <option value="free_shipping">Free Shipping</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Discount Value</label>
                <input v-model="form.discount_value" type="number" step="0.01" min="0" :disabled="form.discount_type === 'free_shipping'" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black disabled:opacity-50">
              </div>
              <div v-if="form.discount_type === 'percentage'">
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Max Discount (Rp)</label>
                <input v-model="form.max_discount" type="number" min="0" placeholder="e.g. 500000" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
              </div>
              <div :class="form.discount_type !== 'percentage' ? 'md:col-span-1' : ''">
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Min. Purchase (Rp)</label>
                <input v-model="form.min_purchase" type="number" min="0" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
              </div>
            </div>

            <!-- Divider -->
            <div class="h-px bg-gray-100 my-8"></div>
            
            <h3 class="text-sm font-black text-black uppercase tracking-widest mb-4">Target & Constraints</h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Global Quota</label>
                <input v-model="form.quota" type="number" min="1" placeholder="Empty = Unlimited" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Usage Per User</label>
                <input v-model="form.max_usage_per_user" type="number" min="1" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
              </div>
              
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">Start Date</label>
                <input v-model="form.start_date" type="datetime-local" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-700 uppercase tracking-widest mb-2">End Date</label>
                <input v-model="form.end_date" type="datetime-local" class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black focus:border-black">
              </div>
            </div>

            <div class="flex flex-wrap gap-6 mt-6 p-5 bg-gray-50 rounded-xl border border-gray-200">
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" v-model="form.is_member_only" class="w-5 h-5 text-black border-gray-300 rounded focus:ring-black">
                <span class="text-sm font-bold text-gray-700">VIP Member Only</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" v-model="form.is_first_order_only" class="w-5 h-5 text-black border-gray-300 rounded focus:ring-black">
                <span class="text-sm font-bold text-gray-700">First Order Only</span>
              </label>
              <label class="flex items-center space-x-3 cursor-pointer">
                <input type="checkbox" v-model="form.is_active" class="w-5 h-5 text-black border-gray-300 rounded focus:ring-black">
                <span class="text-sm font-bold text-green-700">Status Active</span>
              </label>
            </div>

          </form>
        </div>

        <!-- Modal Footer -->
        <div class="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <button @click="closeModal" type="button" class="px-6 py-2.5 text-sm font-bold text-gray-700 uppercase tracking-widest transition-colors bg-white border border-gray-300 rounded-xl hover:bg-gray-50">Cancel</button>
          <button @click="savePromo" :disabled="isSubmitting" class="px-6 py-2.5 text-sm font-bold text-white uppercase tracking-widest transition-colors bg-black rounded-xl hover:bg-gray-800 disabled:opacity-50 flex items-center">
            <svg v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            Save Promo
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../config/api';

const promos = ref([]);
const loading = ref(true);
const error = ref(null);
const isModalOpen = ref(false);
const isEditing = ref(false);
const isSubmitting = ref(false);

const token = localStorage.getItem('admin_token');

const initialFormState = {
  id: null,
  code: '',
  title: '',
  description: '',
  discount_type: 'fixed',
  discount_value: 0,
  max_discount: null,
  min_purchase: 0,
  quota: null,
  max_usage_per_user: 1,
  start_date: '',
  end_date: '',
  is_member_only: false,
  is_first_order_only: false,
  is_active: true,
};

const form = ref({ ...initialFormState });

const formatCurrency = (value) => {
  if (!value) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0
  }).format(value);
};

const isExpired = (endDateStr) => {
  if (!endDateStr) return false;
  return new Date(endDateStr) < new Date();
};

const formatForInput = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  // Mengonversi ke format YYYY-MM-DDThh:mm untuk input datetime-local
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
};

const fetchPromos = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await axios.get(`${BASE_URL}/admin/promos`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    promos.value = response.data.data;
  } catch (err) {
    error.value = err.response?.data?.message || 'Terjadi kesalahan saat memuat data promo.';
  } finally {
    loading.value = false;
  }
};

const openModal = (promo = null) => {
  if (promo) {
    isEditing.value = true;
    form.value = { 
      ...promo,
      start_date: formatForInput(promo.start_date),
      end_date: formatForInput(promo.end_date)
    };
  } else {
    isEditing.value = false;
    form.value = { ...initialFormState };
  }
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    form.value = { ...initialFormState };
  }, 300);
};

const savePromo = async () => {
  if (!form.value.code || !form.value.title) return;
  
  isSubmitting.value = true;
  form.value.code = form.value.code.toUpperCase().replace(/\s+/g, ''); // Hapus spasi dan uppercase

  // Konversi string kosong menjadi null agar lolos validasi Laravel
  const payload = { ...form.value };
  if (!payload.quota) payload.quota = null;
  if (!payload.max_discount) payload.max_discount = null;
  if (!payload.start_date) payload.start_date = null;
  if (!payload.end_date) payload.end_date = null;

  try {
    if (isEditing.value) {
      await axios.put(`${BASE_URL}/admin/promos/${form.value.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire({ icon: 'success', title: 'Updated!', text: 'Promo berhasil diperbarui.', timer: 1500, showConfirmButton: false });
    } else {
      await axios.post(`${BASE_URL}/admin/promos`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Swal.fire({ icon: 'success', title: 'Created!', text: 'Promo baru berhasil dibuat.', timer: 1500, showConfirmButton: false });
    }
    closeModal();
    fetchPromos();
  } catch (err) {
    const errorMsg = err.response?.data?.message || 'Terjadi kesalahan sistem.';
    Swal.fire({ icon: 'error', title: 'Oops...', text: errorMsg });
  } finally {
    isSubmitting.value = false;
  }
};

const confirmDelete = (id) => {
  Swal.fire({
    title: 'Hapus Promo?',
    text: "Tindakan ini tidak dapat dibatalkan!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#000',
    confirmButtonText: 'Ya, Hapus!'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/admin/promos/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        Swal.fire('Deleted!', 'Promo berhasil dihapus.', 'success');
        fetchPromos();
      } catch (err) {
        Swal.fire('Gagal!', err.response?.data?.message || 'Promo ini tidak bisa dihapus.', 'error');
      }
    }
  });
};

onMounted(() => {
  fetchPromos();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #d1d5db; }

.animate-fade-in { animation: fadeIn 0.2s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px) scale(0.98); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
</style>