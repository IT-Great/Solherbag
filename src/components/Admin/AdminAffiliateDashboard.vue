<template>
  <div class="px-6 py-8 mx-auto max-w-7xl animate-fade-in">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1
          class="font-serif text-3xl font-bold tracking-tighter text-gray-900 uppercase"
        >
          Manajemen Afiliasi
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          Pantau performa afiliator dan kelola pencairan komisi.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
      <div class="p-6 border border-gray-100 shadow-sm bg-gray-50 rounded-xl">
        <p class="text-xs font-bold tracking-widest text-gray-500 uppercase">
          Total Afiliator Aktif
        </p>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ stats.totalAffiliates }}
          <span class="text-sm font-medium text-gray-500">Orang</span>
        </p>
      </div>
      <div class="p-6 bg-white border border-yellow-100 shadow-sm rounded-xl">
        <div class="flex items-center justify-between">
          <p class="text-xs font-bold tracking-widest text-yellow-600 uppercase">
            Menunggu Pencairan
          </p>
          <span
            v-if="stats.pendingRequests > 0"
            class="flex items-center w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
          ></span>
        </div>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ stats.pendingRequests }}
          <span class="text-sm font-medium text-gray-500">Permintaan</span>
        </p>
      </div>
      <div class="p-6 bg-white border border-green-100 shadow-sm rounded-xl">
        <p class="text-xs font-bold tracking-widest text-green-600 uppercase">
          Total Komisi Ditransfer
        </p>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ formatPrice(stats.totalTransferred) }}
        </p>
      </div>
    </div>

    <div class="flex gap-4 mb-6 border-b border-gray-200">
      <button
        @click="activeTab = 'affiliates'"
        :class="
          activeTab === 'affiliates'
            ? 'border-black text-black'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        "
        class="py-3 text-sm font-bold tracking-widest uppercase transition-colors border-b-2"
      >
        Daftar Afiliator
      </button>
      <button
        @click="activeTab = 'withdrawals'"
        :class="
          activeTab === 'withdrawals'
            ? 'border-black text-black'
            : 'border-transparent text-gray-500 hover:text-gray-700'
        "
        class="py-3 text-sm font-bold tracking-widest uppercase transition-colors border-b-2"
      >
        Pencairan Dana
        <span
          v-if="stats.pendingRequests > 0"
          class="px-2 py-0.5 ml-2 text-xs text-white bg-red-500 rounded-full"
          >{{ stats.pendingRequests }}</span
        >
      </button>
    </div>

    <div
      v-if="activeTab === 'affiliates'"
      class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead
            class="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100"
          >
            <tr>
              <th class="px-6 py-4 font-bold tracking-wider">Nama Afiliator</th>
              <th class="px-6 py-4 font-bold tracking-wider">Kode Referal</th>
              <th class="px-6 py-4 font-bold tracking-wider text-right">
                Saldo Aktif (Belum Ditarik)
              </th>
              <th class="px-6 py-4 font-bold tracking-wider text-right">
                Total Pendapatan (Historis)
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="aff in affiliates"
              :key="aff.id"
              class="transition-colors hover:bg-gray-50"
            >
              <td class="px-6 py-4">
                <p class="font-bold text-gray-900">{{ aff.name }}</p>
                <p class="text-xs text-gray-500">{{ aff.email }}</p>
              </td>
              <td class="px-6 py-4 font-mono font-medium text-blue-600">
                {{ aff.referral_code }}
              </td>
              <td class="px-6 py-4 font-bold text-right text-green-600">
                {{ formatPrice(aff.active_balance) }}
              </td>
              <td class="px-6 py-4 font-bold text-right text-gray-900">
                {{ formatPrice(aff.total_earned) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="activeTab === 'withdrawals'"
      class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead
            class="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-100"
          >
            <tr>
              <th class="px-6 py-4 font-bold tracking-wider">Waktu Request</th>
              <th class="px-6 py-4 font-bold tracking-wider">Afiliator</th>
              <th class="px-6 py-4 font-bold tracking-wider">
                Info Rekening & Transfer Bersih
              </th>
              <th class="px-6 py-4 font-bold tracking-wider">Status</th>
              <th class="px-6 py-4 font-bold tracking-wider text-center">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr
              v-for="req in withdrawals"
              :key="req.id"
              class="transition-colors hover:bg-gray-50"
            >
              <td class="px-6 py-4 text-gray-500">{{ req.date }}</td>
              <td class="px-6 py-4 font-bold text-gray-900">{{ req.affiliate_name }}</td>
              <td class="px-6 py-4">
                <p class="font-bold text-gray-900">
                  {{ req.bank_name }} - {{ req.account_number }}
                </p>
                <p class="text-xs text-gray-500">a.n. {{ req.account_name }}</p>
                <p
                  class="mt-2 text-[10px] font-bold text-blue-700 bg-blue-50 p-1.5 rounded border border-blue-100 w-fit"
                >
                  {{ req.admin_notes }}
                </p>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="
                    req.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                      : 'bg-green-100 text-green-700 border-green-200'
                  "
                  class="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full border"
                >
                  {{ req.status === "pending" ? "Menunggu Transfer" : "Selesai" }}
                </span>
              </td>
              <td class="px-6 py-4 text-center">
                <button
                  v-if="req.status === 'pending'"
                  @click="markAsTransferred(req)"
                  class="px-4 py-2 text-xs font-bold text-white transition-colors bg-black rounded-lg hover:bg-gray-800"
                >
                  Tandai Selesai
                </button>
                <span v-else class="text-xs font-bold text-gray-400">
                  Telah Diproses
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from "vue";
// import Swal from "sweetalert2";

// // State UI
// const activeTab = ref("withdrawals"); // Default buka tab pencairan agar admin langsung lihat yang butuh aksi

// // Utility
// const formatPrice = (value) => {
//   return new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(value);
// };

// // ==========================================
// // DATA MOCKUP (Siap Diformat Ulang API Nanti)
// // ==========================================
// const stats = ref({
//   totalAffiliates: 12,
//   pendingRequests: 2,
//   totalTransferred: 4500000,
// });

// const affiliates = ref([
//   {
//     id: 1,
//     name: "Budi Santoso",
//     email: "budi@example.com",
//     referral_code: "BUDI123",
//     active_balance: 150000,
//     total_earned: 1250000,
//   },
//   {
//     id: 2,
//     name: "Siti Aminah",
//     email: "siti@example.com",
//     referral_code: "SITI_FASHION",
//     active_balance: 45000,
//     total_earned: 850000,
//   },
//   {
//     id: 3,
//     name: "Andi Style",
//     email: "andi@example.com",
//     referral_code: "ANDI_BAGS",
//     active_balance: 0,
//     total_earned: 450000,
//   },
// ]);

// const withdrawals = ref([
//   {
//     id: 101,
//     date: "22 Jun 2026 09:15",
//     affiliate_name: "Budi Santoso",
//     bank_name: "BCA",
//     account_number: "0123456789",
//     account_name: "Budi Santoso",
//     amount: 100000,
//     status: "pending",
//     admin_notes: "Biaya Admin: Rp2.500 | TRANSFER BERSIH: Rp97.500",
//   },
//   {
//     id: 102,
//     date: "22 Jun 2026 10:30",
//     affiliate_name: "Siti Aminah",
//     bank_name: "Mandiri",
//     account_number: "9876543210",
//     account_name: "Siti Aminah",
//     amount: 250000,
//     status: "pending",
//     admin_notes: "Biaya Admin: Rp0 | TRANSFER BERSIH: Rp250.000",
//   },
//   {
//     id: 100,
//     date: "20 Jun 2026 14:20",
//     affiliate_name: "Andi Style",
//     bank_name: "BNI",
//     account_number: "1122334455",
//     account_name: "Andi Darmawan",
//     amount: 450000,
//     status: "completed",
//     admin_notes: "Biaya Admin: Rp2.500 | TRANSFER BERSIH: Rp447.500",
//   },
// ]);

// // ==========================================
// // FUNGSI AKSI ADMIN
// // ==========================================
// const markAsTransferred = (req) => {
//   Swal.fire({
//     title: "Konfirmasi Transfer",
//     html: `Apakah Anda sudah mentransfer uang sebesar <br><strong class="text-xl text-green-600">${
//       req.admin_notes.split("TRANSFER BERSIH: ")[1]
//     }</strong><br> ke rekening <b>${req.bank_name} (${req.account_number})</b>?`,
//     icon: "question",
//     showCancelButton: true,
//     confirmButtonText: "Ya, Sudah Ditransfer",
//     cancelButtonText: "Belum",
//     confirmButtonColor: "#000",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       // Logic Mockup: Ubah status di UI
//       req.status = "completed";
//       stats.value.pendingRequests--;
//       stats.value.totalTransferred += req.amount;

//       Swal.fire({
//         title: "Berhasil!",
//         text: "Status pencairan dana telah diperbarui.",
//         icon: "success",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     }
//   });
// };

import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js"; // Sesuaikan lokasi file api.js Anda

const activeTab = ref("withdrawals");
const isLoading = ref(true);

// State Data Asli
const stats = ref({
  totalAffiliates: 0,
  pendingRequests: 0,
  totalTransferred: 0,
});
const affiliates = ref([]);
const withdrawals = ref([]);

const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);
};

// Tarik data dari API Backend Admin
const fetchAdminDashboard = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/affiliates/dashboard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = res.data.data;
    stats.value = data.stats;
    affiliates.value = data.affiliates;
    withdrawals.value = data.withdrawals;
  } catch (error) {
    console.error("Error fetching admin affiliate data:", error);
    Swal.fire("Error", "Gagal memuat data afiliasi", "error");
  } finally {
    isLoading.value = false;
  }
};

// Tembak API Approve saat bos Anda selesai mentransfer
const markAsTransferred = (req) => {
  // Parsing instruksi admin_notes agar bos Anda tahu persis nominal akhirnya
  const cleanTransferAmount = req.admin_notes
    ? req.admin_notes.split("TRANSFER BERSIH: ")[1]
    : formatPrice(req.amount);

  Swal.fire({
    title: "Konfirmasi Transfer",
    html: `Apakah Anda sudah mentransfer uang sebesar <br><strong class="text-xl text-green-600">${cleanTransferAmount}</strong><br> ke rekening <b>${req.bank_name} (${req.account_number})</b>?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Ya, Sudah Ditransfer",
    cancelButtonText: "Belum",
    confirmButtonColor: "#000",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      try {
        await axios.post(
          `${BASE_URL}/admin/affiliates/withdrawals/${req.id}/approve`,
          {},
          {
            headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
          }
        );
        return true;
      } catch (error) {
        Swal.showValidationMessage(
          `Gagal mengupdate status: ${error.response?.data?.message || "Error Server"}`
        );
      }
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Berhasil!",
        text: "Status pencairan dana telah diperbarui menjadi Selesai.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      // Refresh data agar tabel & statistik langsung ter-update
      fetchAdminDashboard();
    }
  });
};

onMounted(() => {
  fetchAdminDashboard();
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
