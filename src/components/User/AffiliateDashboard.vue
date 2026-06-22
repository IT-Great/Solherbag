<template>
  <div class="px-6 py-12 mx-auto max-w-7xl">
    <div class="flex items-center justify-between mb-10">
      <div>
        <h1
          class="font-serif text-3xl font-bold tracking-tighter text-gray-900 uppercase"
        >
          Dasbor Afiliator (Fitur Dalam Pengembangan)
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          Pantau tautan, performa penjualan, dan cairkan komisi Anda di sini.
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
      <div class="p-6 border border-gray-100 shadow-sm bg-gray-50 rounded-xl">
        <p class="text-xs font-bold tracking-widest text-gray-500 uppercase">
          Total Pendapatan
        </p>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ formatPrice(totalEarned) }}
        </p>
      </div>

      <div class="p-6 bg-white border border-yellow-100 shadow-sm rounded-xl">
        <div class="flex items-center justify-between">
          <p class="text-xs font-bold tracking-widest text-yellow-600 uppercase">
            Komisi Tertunda
          </p>
          <span
            class="flex items-center w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
          ></span>
        </div>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ formatPrice(pendingBalance) }}
        </p>
        <p class="mt-1 text-xs text-gray-400">Pesanan masih dalam pengiriman</p>
      </div>

      <div class="p-6 bg-white border border-green-100 shadow-sm rounded-xl">
        <div class="flex items-center justify-between">
          <p class="text-xs font-bold tracking-widest text-green-600 uppercase">
            Saldo Aktif (Siap Tarik)
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p class="mt-2 text-3xl font-bold text-gray-900">
          {{ formatPrice(activeBalance) }}
        </p>
        <button
          @click="openWithdrawalModal"
          :disabled="activeBalance <= 0"
          :class="
            activeBalance > 0
              ? 'bg-black hover:bg-gray-800 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          "
          class="w-full py-2 mt-4 text-xs font-bold tracking-widest uppercase transition-colors rounded-lg"
        >
          Tarik Dana
        </button>
      </div>
    </div>

    <div class="p-6 mb-10 bg-white border border-gray-200 shadow-sm rounded-xl">
      <h2 class="mb-4 text-sm font-bold tracking-widest text-gray-900 uppercase">
        Tautan Khusus Anda
      </h2>
      <p class="mb-4 text-sm text-gray-500">
        Bagikan tautan ini ke media sosial Anda. Semua transaksi yang berasal dari tautan
        ini akan otomatis masuk ke komisi Anda.
      </p>
      <div class="flex flex-col gap-3 md:flex-row">
        <input
          type="text"
          readonly
          v-model="affiliateLink"
          class="flex-1 px-4 py-3 text-sm text-gray-600 bg-gray-100 border-none rounded-lg focus:ring-0"
        />
        <button
          @click="copyLink"
          class="px-6 py-3 text-sm font-bold tracking-widest text-black uppercase transition-colors border-2 border-black rounded-lg hover:bg-black hover:text-white shrink-0"
        >
          Salin Tautan
        </button>
      </div>
    </div>

    <div class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
          Riwayat Transaksi Afiliasi
        </h2>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead
            class="text-xs text-gray-500 uppercase bg-white border-b border-gray-100"
          >
            <tr>
              <th class="px-6 py-4 font-bold tracking-wider">ID Pesanan</th>
              <th class="px-6 py-4 font-bold tracking-wider">Tanggal</th>
              <th class="px-6 py-4 font-bold tracking-wider">Produk Utama</th>
              <th class="px-6 py-4 font-bold tracking-wider">Status Komisi</th>
              <th class="px-6 py-4 font-bold tracking-wider text-right">Komisi Anda</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-for="trx in transactionHistory" :key="trx.id" class="hover:bg-gray-50">
              <td class="px-6 py-4 font-mono font-medium text-gray-900">
                #{{ trx.order_id }}
              </td>
              <td class="px-6 py-4 text-gray-500">{{ trx.date }}</td>
              <td class="px-6 py-4 text-gray-600">{{ trx.product_name }}</td>
              <td class="px-6 py-4">
                <span
                  :class="{
                    'bg-green-100 text-green-700': trx.status === 'settled',
                    'bg-yellow-100 text-yellow-700': trx.status === 'pending',
                    'bg-red-100 text-red-700': trx.status === 'void',
                  }"
                  class="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full"
                >
                  {{ trx.status }}
                </span>
              </td>
              <td class="px-6 py-4 font-bold text-right text-gray-900">
                {{ formatPrice(trx.commission) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Swal from "sweetalert2";

// FUNGSI FORMAT UANG (Mockup)
const formatPrice = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

// ==========================================
// DATA MOCKUP (Untuk ditunjukkan ke bos hari ini)
// Nanti diganti dengan Axios GET request di hari Senin
// ==========================================
const totalEarned = ref(1250000); // Total historis
const activeBalance = ref(450000); // Siap ditarik
const pendingBalance = ref(150000); // Sedang dikirim
const affiliateLink = ref("https://solher.com/?ref=melisa_jagoan123");

const transactionHistory = ref([
  {
    id: 1,
    order_id: "ORD-8821",
    date: "20 Jun 2026",
    product_name: "Premium Leather Tote",
    status: "pending",
    commission: 50000,
  },
  {
    id: 2,
    order_id: "ORD-8710",
    date: "18 Jun 2026",
    product_name: "Canvas Weekender Bag",
    status: "settled",
    commission: 75000,
  },
  {
    id: 3,
    order_id: "ORD-8655",
    date: "15 Jun 2026",
    product_name: "Minimalist Crossbody",
    status: "void",
    commission: 25000,
  },
]);

// ==========================================
// FUNGSI INTERAKTIF
// ==========================================
const copyLink = () => {
  navigator.clipboard.writeText(affiliateLink.value).then(() => {
    Swal.fire({
      icon: "success",
      title: "Tautan Tersalin!",
      text: "Bagikan ke audiens Anda untuk mulai mendapatkan komisi.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  });
};

const openWithdrawalModal = () => {
  Swal.fire({
    title: "Tarik Komisi",
    html: `
      <div class="text-left">
        <p class="mb-4 text-sm text-gray-500">Dana yang bisa ditarik: <strong>${formatPrice(
          activeBalance.value
        )}</strong></p>
        <div class="mb-3">
          <label class="block mb-1 text-xs font-bold text-gray-700 uppercase">Nama Bank</label>
          <input id="swal-bank" class="w-full px-3 py-2 border rounded-lg" placeholder="Contoh: BCA / Mandiri">
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-xs font-bold text-gray-700 uppercase">Nomor Rekening</label>
          <input id="swal-acc-num" type="number" class="w-full px-3 py-2 border rounded-lg" placeholder="0123456789">
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-xs font-bold text-gray-700 uppercase">Atas Nama</label>
          <input id="swal-acc-name" class="w-full px-3 py-2 border rounded-lg" placeholder="Nama sesuai buku tabungan">
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-xs font-bold text-gray-700 uppercase">Nominal Tarik</label>
          <input id="swal-amount" type="number" class="w-full px-3 py-2 border rounded-lg" value="${
            activeBalance.value
          }">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Ajukan Pencairan",
    cancelButtonText: "Batal",
    confirmButtonColor: "#000",
    preConfirm: () => {
      const bank = document.getElementById("swal-bank").value;
      const accNum = document.getElementById("swal-acc-num").value;
      const amount = document.getElementById("swal-amount").value;
      if (!bank || !accNum || !amount) {
        Swal.showValidationMessage("Semua kolom wajib diisi");
      }
      return { bank, accNum, amount };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Mockup sukses
      activeBalance.value -= result.value.amount;
      Swal.fire(
        "Berhasil Diajukan!",
        "Permintaan penarikan dana Anda sedang diproses oleh admin.",
        "success"
      );
    }
  });
};
</script>

<!-- <template>
  <div class="px-6 py-12 mx-auto max-w-7xl">
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div
        class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-blue-600 animate-spin"
      ></div>
      <p
        class="mt-4 text-sm font-medium tracking-widest text-gray-500 uppercase animate-pulse"
      >
        Memuat Data Afiliasi...
      </p>
    </div>

    <div v-else>
      <div class="flex items-center justify-between mb-10">
        <div>
          <h1
            class="font-serif text-3xl font-bold tracking-tighter text-gray-900 uppercase"
          >
            Dasbor Afiliator
          </h1>
          <p class="mt-2 text-sm text-gray-500">
            Pantau tautan, performa penjualan, dan cairkan komisi Anda di sini.
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 mb-10 md:grid-cols-3">
        <div class="p-6 border border-gray-100 shadow-sm bg-gray-50 rounded-xl">
          <p class="text-xs font-bold tracking-widest text-gray-500 uppercase">
            Total Pendapatan
          </p>
          <p class="mt-2 text-3xl font-bold text-gray-900">
            {{ formatPrice(totalEarned) }}
          </p>
        </div>

        <div class="p-6 bg-white border border-yellow-100 shadow-sm rounded-xl">
          <div class="flex items-center justify-between">
            <p class="text-xs font-bold tracking-widest text-yellow-600 uppercase">
              Komisi Tertunda
            </p>
            <span
              v-if="pendingBalance > 0"
              class="flex items-center w-2 h-2 bg-yellow-400 rounded-full animate-pulse"
            ></span>
          </div>
          <p class="mt-2 text-3xl font-bold text-gray-900">
            {{ formatPrice(pendingBalance) }}
          </p>
          <p class="mt-1 text-xs text-gray-400">Pesanan masih dalam pengiriman</p>
        </div>

        <div class="p-6 bg-white border border-green-100 shadow-sm rounded-xl">
          <div class="flex items-center justify-between">
            <p class="text-xs font-bold tracking-widest text-green-600 uppercase">
              Saldo Aktif (Siap Tarik)
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p class="mt-2 text-3xl font-bold text-gray-900">
            {{ formatPrice(activeBalance) }}
          </p>
          <button
            @click="openWithdrawalModal"
            :disabled="activeBalance <= 0"
            :class="
              activeBalance > 0
                ? 'bg-black hover:bg-gray-800 text-white shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            "
            class="w-full py-3 mt-4 text-xs font-bold tracking-widest uppercase transition-colors rounded-lg"
          >
            Tarik Dana
          </button>
        </div>
      </div>

      <div class="p-6 mb-10 bg-white border border-gray-200 shadow-sm rounded-xl">
        <h2 class="mb-4 text-sm font-bold tracking-widest text-gray-900 uppercase">
          Tautan Khusus Anda
        </h2>
        <p class="mb-4 text-sm text-gray-500">
          Bagikan tautan ini ke media sosial Anda. Semua transaksi yang berasal dari
          tautan ini akan otomatis masuk ke komisi Anda.
        </p>
        <div class="flex flex-col gap-3 md:flex-row">
          <input
            type="text"
            readonly
            :value="affiliateLink"
            class="flex-1 px-4 py-3 text-sm font-medium text-blue-700 border-blue-100 rounded-lg bg-blue-50 focus:ring-0"
          />
          <button
            @click="copyLink"
            class="px-6 py-3 text-sm font-bold tracking-widest text-black uppercase transition-colors border-2 border-black rounded-lg hover:bg-black hover:text-white shrink-0"
          >
            Salin Tautan
          </button>
        </div>
      </div>

      <div class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
        <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 class="text-sm font-bold tracking-widest text-gray-900 uppercase">
            Riwayat Transaksi Afiliasi
          </h2>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left">
            <thead
              class="text-xs text-gray-500 uppercase bg-white border-b border-gray-100"
            >
              <tr>
                <th class="px-6 py-4 font-bold tracking-wider">ID Pesanan</th>
                <th class="px-6 py-4 font-bold tracking-wider">Tanggal</th>
                <th class="px-6 py-4 font-bold tracking-wider">Status Komisi</th>
                <th class="px-6 py-4 font-bold tracking-wider text-right">Komisi Anda</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="transactionHistory.length === 0">
                <td colspan="4" class="px-6 py-8 text-center text-gray-500">
                  Belum ada transaksi dari tautan referal Anda.
                </td>
              </tr>
              <tr
                v-for="trx in transactionHistory"
                :key="trx.id"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 font-mono font-medium text-gray-900">
                  #{{ trx.id }}
                </td>
                <td class="px-6 py-4 text-gray-500">{{ formatDate(trx.created_at) }}</td>
                <td class="px-6 py-4">
                  <span
                    :class="{
                      'bg-green-100 text-green-700 border border-green-200':
                        trx.commission_status === 'settled',
                      'bg-yellow-100 text-yellow-700 border border-yellow-200':
                        trx.commission_status === 'pending',
                      'bg-red-100 text-red-700 border border-red-200':
                        trx.commission_status === 'void',
                    }"
                    class="px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full"
                  >
                    {{ trx.commission_status }}
                  </span>
                </td>
                <td class="px-6 py-4 font-bold text-right text-gray-900">
                  + {{ formatPrice(trx.commission_earned) }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js"; // Pastikan path ini sesuai dengan struktur folder Anda

// ==========================================
// STATE MANAGEMENT (Reaktif)
// ==========================================
const isLoading = ref(true);
const activeBalance = ref(0);
const pendingBalance = ref(0);
const totalEarned = ref(0);
const referralCode = ref("");
const transactionHistory = ref([]);

// Menghasilkan link dinamis sesuai domain saat ini
const affiliateLink = computed(() => {
  if (!referralCode.value) return "";
  return `${window.location.origin}/?ref=${referralCode.value}`;
});

// ==========================================
// UTILITY FORMATTERS
// ==========================================
const formatPrice = (value) => {
  const num = parseFloat(value) || 0;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(num);
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// ==========================================
// API CALLS
// ==========================================
const fetchDashboardData = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/affiliate/dashboard`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    const data = res.data.data || res.data;
    activeBalance.value = parseFloat(data.active_balance || 0);
    pendingBalance.value = parseFloat(data.pending_balance || 0);
    totalEarned.value = parseFloat(data.total_earned || 0);
    referralCode.value = data.referral_code;
    transactionHistory.value = data.transactions || [];
  } catch (error) {
    console.error("Gagal menarik data afiliasi:", error);
    Swal.fire({
      icon: "error",
      title: "Koneksi Gagal",
      text: "Gagal memuat data dasbor afiliasi dari server.",
      confirmButtonColor: "#000",
    });
  } finally {
    isLoading.value = false;
  }
};

const copyLink = () => {
  navigator.clipboard.writeText(affiliateLink.value).then(() => {
    Swal.fire({
      icon: "success",
      title: "Tautan Tersalin!",
      text: "Bagikan ke audiens Anda untuk mulai mendapatkan komisi.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  });
};

const openWithdrawalModal = () => {
  Swal.fire({
    title: "Tarik Komisi",
    html: `
      <div class="text-left">
        <p class="mb-4 text-sm text-gray-500">Dana yang bisa ditarik: <strong>${formatPrice(
          activeBalance.value
        )}</strong></p>
        <div class="p-3 mb-4 text-[11px] leading-relaxed text-amber-800 bg-amber-50 border border-amber-200 rounded-lg">
          <strong>Informasi Potongan:</strong><br/>
          Pencairan ke rekening <strong>Bank Mandiri tidak dikenakan biaya</strong> (Gratis). Pencairan ke bank selain Mandiri akan dikenakan biaya transfer antarbank (BI-FAST) sebesar <strong>Rp2.500</strong> yang dipotong otomatis dari nominal penarikan.
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-xs font-bold text-gray-700 uppercase">Nama Bank</label>
          <input id="swal-bank" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" placeholder="Contoh: BCA / Mandiri">
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-xs font-bold text-gray-700 uppercase">Nomor Rekening</label>
          <input id="swal-acc-num" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" placeholder="0123456789">
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-xs font-bold text-gray-700 uppercase">Atas Nama</label>
          <input id="swal-acc-name" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" placeholder="Nama sesuai buku tabungan">
        </div>
        <div class="mb-3">
          <label class="block mb-1 text-xs font-bold text-gray-700 uppercase">Nominal Tarik</label>
          <input id="swal-amount" type="number" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-black focus:border-black" value="${
            activeBalance.value
          }" max="${activeBalance.value}">
        </div>
      </div>
    `,
    showCancelButton: true,
    confirmButtonText: "Ajukan Pencairan",
    cancelButtonText: "Batal",
    confirmButtonColor: "#000",
    showLoaderOnConfirm: true,
    preConfirm: async () => {
      const bank_name = document.getElementById("swal-bank").value;
      const account_number = document.getElementById("swal-acc-num").value;
      const account_name = document.getElementById("swal-acc-name").value;
      const amount = document.getElementById("swal-amount").value;

      if (!bank_name || !account_number || !account_name || !amount) {
        Swal.showValidationMessage("Semua kolom perbankan wajib diisi");
        return false;
      }
      if (amount <= 0 || amount > activeBalance.value) {
        Swal.showValidationMessage("Nominal tarikan tidak valid");
        return false;
      }

      try {
        const payload = { bank_name, account_number, account_name, amount };
        const res = await axios.post(`${BASE_URL}/affiliate/withdraw`, payload, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        return res.data;
      } catch (error) {
        Swal.showValidationMessage(
          `Pengajuan gagal: ${
            error.response?.data?.message || "Terjadi kesalahan server"
          }`
        );
      }
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      // Perbarui saldo secara instan di layar tanpa harus refresh
      activeBalance.value -=
        result.value.data?.amount || document.getElementById("swal-amount").value;

      Swal.fire({
        title: "Berhasil Diajukan!",
        text:
          "Permintaan penarikan dana Anda sudah masuk ke sistem dan akan diproses oleh admin.",
        icon: "success",
        confirmButtonColor: "#000",
      });
    }
  });
};

// Panggil data saat komponen dimuat pertama kali
onMounted(() => {
  fetchDashboardData();
});
</script>
-->
