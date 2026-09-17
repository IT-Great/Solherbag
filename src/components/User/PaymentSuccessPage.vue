<!-- <script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";

const route = useRoute();
const router = useRouter();

const externalId = ref(null);
const orderId = ref(null);

onMounted(() => {
  externalId.value = route.query.external_id || null;
  orderId.value = route.query.order_id || null;
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
      
      <div class="flex justify-center mb-6">
        <div class="bg-green-100 p-4 rounded-full">
          <svg
            class="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        Payment Successful 🎉
      </h1>

      <p class="text-gray-600 mb-4">
        Thank you! Your payment has been successfully processed.
      </p>

      <div v-if="externalId || orderId" class="bg-gray-50 rounded-lg p-4 text-sm mb-6 text-left">
        <p v-if="orderId">
          <span class="font-semibold">Order ID:</span> {{ orderId }}
        </p>
        <p v-if="externalId">
          <span class="font-semibold">Payment Ref:</span> {{ externalId }}
        </p>
      </div>

      <div class="space-y-3">
        <button
          @click="router.push('/orderpage')"
          class="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
        >
          View My Orders
        </button>

        <button
          @click="router.push('/')"
          class="w-full border border-gray-300 hover:bg-gray-100 py-3 rounded-lg font-semibold transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  </div>
</template> -->

<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js"; // Sesuaikan path jika berbeda

const route = useRoute();
const router = useRouter();

const externalId = ref(null);
const orderId = ref(null);

// Status Guest / Auth
const isAuthenticated = ref(false);
const guestEmail = ref("");
const isEmailMissing = ref(false); // 👇 TAMBAHKAN INI 👇

// Form State untuk Claim Account
const password = ref("");
const passwordConfirm = ref("");
const isClaiming = ref(false);

// onMounted(() => {
//   externalId.value = route.query.external_id || null;
//   orderId.value = route.query.order_id || null;
  
//   // Cek apakah pengguna sudah memiliki Token Login
//   const token = localStorage.getItem("token");
//   if (token) {
//     isAuthenticated.value = true;
//   } else {
//     isAuthenticated.value = false;
//     // Jika tidak ada token (Guest), kita cari email guest dari LocalStorage
//     // (Berasal dari form guest di halaman checkout sebelumnya)
//     try {
//       const guestCart = JSON.parse(localStorage.getItem("guest_cart") || "[]");
//       // Atau idealnya, Anda menyimpan email guest sementara di localStorage saat checkout
//       const guestData = JSON.parse(localStorage.getItem("last_guest_email") || '""');
//       if (guestData) {
//         guestEmail.value = guestData;
//       }
//     } catch(e) {}
//   }
// });

// onMounted(() => {
//   externalId.value = route.query.external_id || null;
//   orderId.value = route.query.order_id || null;
  
//   // Cek apakah pengguna sudah memiliki Token Login
//   const token = localStorage.getItem("token");
//   if (token) {
//     isAuthenticated.value = true;
//   } else {
//     isAuthenticated.value = false;
    
//     // 👇 PERBAIKAN: Ambil email sebagai teks biasa (tanpa JSON.parse) 👇
//     const guestData = localStorage.getItem("last_guest_email");
//     if (guestData) {
//       guestEmail.value = guestData;
//     }
//   }
// });

onMounted(() => {
  externalId.value = route.query.external_id || null;
  orderId.value = route.query.order_id || null;
  
  // Cek apakah pengguna sudah memiliki Token Login
  const token = localStorage.getItem("token");
  if (token) {
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
    
    // Ambil email sebagai teks biasa
    const guestData = localStorage.getItem("last_guest_email");
    if (guestData) {
      guestEmail.value = guestData;
    } else {
      // 👇 TAMBAHKAN INI JIKA EMAIL TIDAK ADA DI LOCALSTORAGE 👇
      isEmailMissing.value = true; 
    }
  }
});

const claimAccount = async () => {
  if (!guestEmail.value) {
    Swal.fire("Error", "Email tidak terdeteksi. Silakan hubungi Customer Service.", "error");
    return;
  }

  if (password.value.length < 8) {
    Swal.fire({ toast: true, position: "top-end", icon: "warning", title: "Kata sandi minimal 8 karakter.", showConfirmButton: false, timer: 3000 });
    return;
  }

  if (password.value !== passwordConfirm.value) {
    Swal.fire({ toast: true, position: "top-end", icon: "warning", title: "Konfirmasi kata sandi tidak cocok.", showConfirmButton: false, timer: 3000 });
    return;
  }

  isClaiming.value = true;
  try {
    const res = await axios.post(`${BASE_URL}/claim-account`, {
      email: guestEmail.value,
      password: password.value,
      password_confirmation: passwordConfirm.value
    });

    // Simpan Token ke Browser
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
    
    isAuthenticated.value = true; // Mengubah UI agar tombol View Orders muncul
    localStorage.removeItem("last_guest_email"); // Bersihkan jejak

    Swal.fire({
      icon: "success",
      title: "Akun Aktif! 🎉",
      text: "Sekarang Anda bisa melacak pesanan Anda secara Real-Time.",
      confirmButtonColor: "#000"
    });

  } catch (error) {
    Swal.fire("Gagal", error.response?.data?.message || "Terjadi kesalahan sistem.", "error");
  } finally {
    isClaiming.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
    <div class="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
      
      <!-- Icon Success -->
      <div class="flex justify-center mb-6">
        <div class="bg-green-100 p-4 rounded-full">
          <svg
            class="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      <!-- Title -->
      <h1 class="text-2xl font-bold text-gray-800 mb-2">
        Payment Successful 🎉
      </h1>

      <!-- Description -->
      <p class="text-gray-600 mb-4">
        Thank you! Your payment has been successfully processed.
      </p>

      <!-- Optional Info -->
      <div v-if="externalId || orderId" class="bg-gray-50 rounded-lg p-4 text-sm mb-6 text-left border border-gray-100">
        <p v-if="orderId">
          <span class="font-semibold text-gray-500">Order ID:</span> <span class="font-mono font-bold">{{ orderId }}</span>
        </p>
        <p v-if="externalId">
          <span class="font-semibold text-gray-500">Payment Ref:</span> <span class="font-mono font-bold">{{ externalId }}</span>
        </p>
      </div>

      <!-- 👇 OPSI UNTUK MEMBER (SUDAH LOGIN) 👇 -->
      <div v-if="isAuthenticated" class="space-y-3">
        <button
          @click="router.push('/orderpage')"
          class="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-bold tracking-widest uppercase text-xs transition"
        >
          View My Orders
        </button>

        <button
          @click="router.push('/')"
          class="w-full border border-gray-300 hover:bg-gray-50 text-gray-600 py-3 rounded-lg font-bold tracking-widest uppercase text-xs transition"
        >
          Back to Home
        </button>
      </div>

      <!-- 👇 OPSI UNTUK GUEST (BELUM LOGIN) 👇 -->
      <div v-else class="mt-8 border-t border-gray-100 pt-8">
        <div class="flex items-center justify-center mb-4">
          <span class="bg-blue-100 text-blue-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
            Track Your Order
          </span>
        </div>
        <h3 class="font-serif text-lg font-bold text-gray-900 mb-2">Claim Your Account</h3>
        <p class="text-xs text-gray-500 mb-6 leading-relaxed">
          Atur kata sandi untuk email Anda (<span class="font-bold text-black">{{ guestEmail || 'email Anda' }}</span>) agar dapat melacak pesanan ini dan mendapatkan Poin Loyalitas!
        </p>

        <!-- <div v-if="!guestEmail" class="mb-6">
          <input 
            type="email" 
            v-model="guestEmail" 
            placeholder="Masukkan Email Pembelian Anda" 
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-black outline-none mb-3"
          />
        </div> -->

        <!-- 👇 PERBAIKAN: Gunakan isEmailMissing, bukan !guestEmail 👇 -->
        <div v-if="isEmailMissing" class="mb-6">
          <input 
            type="email" 
            v-model="guestEmail" 
            placeholder="Masukkan Email Pembelian Anda" 
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-black outline-none mb-3"
          />
        </div>

        <form @submit.prevent="claimAccount" class="space-y-3 text-left">
          <input 
            type="password" 
            v-model="password" 
            placeholder="Create Password" 
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-black outline-none"
          />
          <input 
            type="password" 
            v-model="passwordConfirm" 
            placeholder="Confirm Password" 
            required
            class="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-black outline-none"
          />

          <button
            type="submit"
            :disabled="isClaiming"
            class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 mt-4 rounded-xl font-bold tracking-widest uppercase text-xs transition flex justify-center items-center shadow-md shadow-blue-500/20"
          >
            <span v-if="!isClaiming">Simpan & Lacak Pesanan</span>
            <div v-else class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </button>
        </form>

        <button
          @click="router.push('/')"
          class="w-full mt-4 text-xs font-bold text-gray-400 hover:text-black transition"
        >
          Lewati, kembali ke Beranda
        </button>
      </div>

    </div>
  </div>
</template>
