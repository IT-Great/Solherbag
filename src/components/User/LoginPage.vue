<!-- <template>
  <div class="flex justify-center items-center bg-[#E5E7EB] px-6 min-h-screen">
    <div
      class="bg-white shadow-sm p-10 border border-gray-300 rounded-[3rem] w-full max-w-md"
    >
      <div class="flex justify-center mb-6">
        <img
          src="../../assets/solherbrandbook.png"
          alt="SolHer Logo"
          class="object-contain w-auto h-16"
        />
      </div>

      <h2
        class="mb-10 text-xl font-black tracking-widest text-center text-black uppercase"
      >
        Login
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="flex flex-col">
          <label for="email" class="mb-2 text-sm font-bold text-black">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="mb-2 text-sm font-bold text-black">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="pt-4">
          <button
            type="submit"
            class="bg-[#0066FF] hover:bg-blue-700 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white transition-colors duration-300"
          >
            Login
          </button>
        </div>
        <div class="mt-4 text-center">
          <router-link
            to="/forgot-password"
            class="text-xs text-gray-500 transition hover:text-black hover:underline"
          >
            Forgot your password?
          </router-link>
        </div>
      </form>

      <p class="mt-6 text-xs text-center text-gray-600">
        Don't have any account?
        <router-link to="/register" class="font-bold text-blue-600 hover:underline"
          >Register here</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue';

// const email = ref('');
// const password = ref('');

// const handleLogin = () => {
//   console.log('Logging in with:', email.value, password.value);
//   // Tambahkan logika autentikasi Anda di sini
//   alert(`Mencoba login dengan: ${email.value}`);
// };

import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: email.value,
      password: password.value,
    });

    // Simpan token dan data user ke localStorage
    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Login Berhasil, Selamat Datang!",
      timer: 1500,
      showConfirmButton: false,
    });

    // Arahkan ke halaman home
    router.push("/");
  } catch (error) {
    let message = "Terjadi kesalahan pada server.";
    if (error.response && error.response.status === 401) {
      message = "Email atau Password salah.";
    }

    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: message,
      confirmButtonColor: "#0066FF",
    });
  }
};
</script>

<style scoped>
/* Menghilangkan padding dari main container jika LoginPage dipanggil di App.vue */
:deep(main) {
  padding: 0 !important;
}
</style> -->

<template>
  <div class="flex justify-center items-center bg-[#E5E7EB] px-6 min-h-screen">
    <div
      class="bg-white shadow-sm p-10 border border-gray-300 rounded-[3rem] w-full max-w-md"
    >
      <div class="flex justify-center mb-6">
        <img
          src="../../assets/solherbrandbook.png"
          alt="SolHer Logo"
          class="w-auto h-16 object-contain"
        />
      </div>

      <h2
        class="mb-10 font-black text-black text-xl text-center uppercase tracking-widest"
      >
        Login
      </h2>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div class="flex flex-col">
          <label for="email" class="mb-2 font-bold text-black text-sm">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="mb-2 font-bold text-black text-sm">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="pt-4">
          <!-- Tombol tidak lagi di-disable oleh status captcha -->
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-[#0066FF] hover:bg-blue-700 disabled:bg-blue-400 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white transition-colors duration-300"
          >
            {{ isLoading ? "Memproses..." : "Login" }}
          </button>
        </div>

        <div class="text-center mt-4">
          <router-link
            to="/forgot-password"
            class="text-xs text-gray-500 hover:text-black hover:underline transition"
          >
            Forgot your password?
          </router-link>
        </div>
      </form>

      <p class="mt-6 text-gray-600 text-xs text-center">
        Don't have any account?
        <router-link to="/register" class="font-bold text-blue-600 hover:underline"
          >Register here</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);

// [PENTING] Masukkan SITE_KEY reCAPTCHA v3 Anda di sini
const siteKey = "6Ldc7NQsAAAAAKyL9iRCRWG41KoOl2-lWdOTJhk0";

// Fungsi Helper untuk memanggil API grecaptcha secara programatik
const executeRecaptcha = (siteKey, actionName) => {
  return new Promise((resolve) => {
    if (typeof window.grecaptcha !== "undefined") {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action: actionName });
          resolve(token);
        } catch (e) {
          console.error("reCAPTCHA execution error:", e);
          resolve(null);
        }
      });
    } else {
      console.error("reCAPTCHA script is not loaded in index.html.");
      resolve(null);
    }
  });
};

const handleLogin = async () => {
  isLoading.value = true;

  try {
    // 1. Dapatkan token dari Google secara invisible
    const token = await executeRecaptcha(siteKey, "login");

    if (!token) {
      throw new Error(
        "Gagal menginisiasi keamanan sistem (reCAPTCHA). Silakan muat ulang halaman."
      );
    }

    // 2. Kirim data login beserta token reCAPTCHA v3 ke Backend
    const response = await axios.post(`${BASE_URL}/login`, {
      email: email.value,
      password: password.value,
      captcha_token: token,
    });

    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: "Login Berhasil, Selamat Datang!",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push("/");
  } catch (error) {
    let message =
      error.response?.data?.message || error.message || "Terjadi kesalahan pada server.";
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: message,
      confirmButtonColor: "#0066FF",
    });
  } finally {
    isLoading.value = false;
  }
};

// ==========================================
// LOGIKA SAKLAR reCAPTCHA BADGE
// ==========================================
onMounted(() => {
  // Saat halaman login dimuat, tambahkan class ke body untuk memunculkan logo
  document.body.classList.add("show-recaptcha");
});

onUnmounted(() => {
  // Saat user pindah ke halaman lain (meninggalkan login), hapus class-nya
  document.body.classList.remove("show-recaptcha");
});
</script>

<style scoped>
:deep(main) {
  padding: 0 !important;
}
</style>
