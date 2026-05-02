<!-- <template>
  <div class="flex justify-center items-center bg-[#1F2937] px-6 min-h-screen">
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
        Admin Login
      </h2>

      <form @submit.prevent="handleAdminLogin" class="space-y-6">
        <div class="flex flex-col">
          <label for="email" class="mb-2 text-sm font-bold text-black"
            >Admin Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-red-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="mb-2 text-sm font-bold text-black"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-red-500 w-full transition"
            required
          />
        </div>

        <div class="pt-4">
          <button
            type="submit"
            class="bg-[#CC0000] hover:bg-red-700 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white transition-colors duration-300"
          >
            Login as Admin
          </button>
        </div>
        <div class="mt-4 text-center">
          <router-link
            to="/admin/forgot-password"
            class="text-xs text-gray-500 transition hover:text-black hover:underline"
          >
            Forgot your password?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const email = ref("");
const password = ref("");

const handleAdminLogin = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("admin_token", response.data.access_token);
    localStorage.setItem("admin", JSON.stringify(response.data.user));
    // [BARU] TAMBAHKAN BARIS INI UNTUK MENCATAT WAKTU LOGIN
    localStorage.setItem("admin_login_time", new Date().getTime().toString());
    localStorage.setItem("role", "admin");

    Swal.fire({
      icon: "success",
      title: "Authorized!",
      text: "Selamat Datang di Panel Admin.",
      timer: 1500,
      showConfirmButton: false,
    });

    router.push("/admin/dashboard");
  } catch (error) {
    let message = "Akses ditolak. Anda bukan admin atau kredensial salah.";
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: message,
      confirmButtonColor: "#CC0000",
    });
  }
};
</script>

<style scoped>
:deep(main) {
  padding: 0 !important;
}
</style> -->

<!-- <template>
  <div class="flex justify-center items-center bg-[#1F2937] px-6 min-h-screen">
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
        Portal Staff
      </h2>

      <form @submit.prevent="handleAdminLogin" class="space-y-6">
        <div class="flex flex-col">
          <label for="email" class="mb-2 text-sm font-bold text-black"
            >Email Karyawan</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-red-500 w-full transition rounded"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="mb-2 text-sm font-bold text-black"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-red-500 w-full transition rounded"
            required
          />
        </div>

        <div class="pt-4">
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-[#CC0000] hover:bg-red-700 disabled:bg-red-400 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white transition-colors duration-300"
          >
            {{ isLoading ? 'Memproses...' : 'Login' }}
          </button>
        </div>
        <div class="mt-4 text-center">
          <router-link
            to="/admin/forgot-password"
            class="text-xs text-gray-500 transition hover:text-black hover:underline"
          >
            Lupa Password?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);

const handleAdminLogin = async () => {
  isLoading.value = true;
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, {
      email: email.value,
      password: password.value,
    });

    const user = response.data.user;

    localStorage.setItem("admin_token", response.data.access_token);
    localStorage.setItem("admin", JSON.stringify(user));
    localStorage.setItem("admin_login_time", new Date().getTime().toString());
    
    // [PERBAIKAN 1] Dinamis menangkap role asli dari database, bukan hardcode "admin"
    localStorage.setItem("role", user.usertype);

    Swal.fire({
      icon: "success",
      title: "Authorized!",
      text: `Selamat Datang, ${user.first_name} (${user.usertype}).`,
      timer: 1500,
      showConfirmButton: false,
    });

    // [PERBAIKAN 2] Smart Redirect berdasarkan Role
    if (user.usertype === 'accounting') {
        router.push("/admin/coas");
    } else if (user.usertype === 'gudang') {
        router.push("/admin/transactions");
    } else {
        // Untuk admin dan superadmin
        router.push("/admin/dashboard");
    }

  } catch (error) {
    let message = error.response?.data?.message || "Akses ditolak. Email/Password salah atau Anda tidak memiliki akses ke panel ini.";
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: message,
      confirmButtonColor: "#CC0000",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
:deep(main) {
  padding: 0 !important;
}
</style> -->

<template>
  <div class="flex justify-center items-center bg-[#1F2937] px-6 min-h-screen">
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
        Portal Staff
      </h2>

      <form @submit.prevent="handleAdminLogin" class="space-y-6">
        <div class="flex flex-col">
          <label for="email" class="mb-2 font-bold text-black text-sm"
            >Email Karyawan</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-red-500 w-full transition rounded"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="mb-2 font-bold text-black text-sm">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-red-500 w-full transition rounded"
            required
          />
        </div>

        <!-- [BARU] Widget reCAPTCHA -->
        <div class="flex justify-center my-4">
          <vue-recaptcha
            :sitekey="siteKey"
            @verify="onCaptchaVerify"
            @expired="onCaptchaExpired"
            @fail="onCaptchaFailed"
          />
        </div>

        <div class="pt-4">
          <button
            type="submit"
            :disabled="isLoading || !captchaToken"
            class="bg-[#CC0000] hover:bg-red-700 disabled:bg-red-400 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white transition-colors duration-300"
          >
            {{ isLoading ? "Memproses..." : "Login" }}
          </button>
        </div>
        <div class="text-center mt-4">
          <router-link
            to="/admin/forgot-password"
            class="text-xs text-gray-500 hover:text-black hover:underline transition"
          >
            Lupa Password?
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import vueRecaptcha from "vue3-recaptcha2"; // [BARU] Import reCAPTCHA

const router = useRouter();
const email = ref("");
const password = ref("");
const isLoading = ref(false);

// [PENTING] Masukkan SITE_KEY dari Google Anda di sini
const siteKey = "6LeQ4tQsAAAAAIpQBqrPw9DSjAlJBQyeuIlKQ2iu";
const captchaToken = ref("");

const onCaptchaVerify = (response) => {
  captchaToken.value = response;
};
const onCaptchaExpired = () => {
  captchaToken.value = "";
};
const onCaptchaFailed = () => {
  Swal.fire("Error", "Gagal memuat reCAPTCHA. Cek koneksi Anda.", "error");
};

const handleAdminLogin = async () => {
  if (!captchaToken.value) {
    Swal.fire("Peringatan", "Harap selesaikan verifikasi CAPTCHA.", "warning");
    return;
  }

  isLoading.value = true;
  try {
    const response = await axios.post(`${BASE_URL}/admin/login`, {
      email: email.value,
      password: password.value,
      captcha_token: captchaToken.value, // [BARU] Kirim token ke backend
    });

    const user = response.data.user;

    localStorage.setItem("admin_token", response.data.access_token);
    localStorage.setItem("admin", JSON.stringify(user));
    localStorage.setItem("admin_login_time", new Date().getTime().toString());
    localStorage.setItem("role", user.usertype);

    Swal.fire({
      icon: "success",
      title: "Authorized!",
      text: `Selamat Datang, ${user.first_name} (${user.usertype}).`,
      timer: 1500,
      showConfirmButton: false,
    });

    if (user.usertype === "accounting") {
      router.push("/admin/coas");
    } else if (user.usertype === "gudang") {
      router.push("/admin/transactions");
    } else {
      router.push("/admin/dashboard");
    }
  } catch (error) {
    let message =
      error.response?.data?.message ||
      "Akses ditolak. Email/Password salah atau Anda tidak memiliki akses ke panel ini.";
    Swal.fire({
      icon: "error",
      title: "Login Gagal",
      text: message,
      confirmButtonColor: "#CC0000",
    });
    captchaToken.value = "";
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
:deep(main) {
  padding: 0 !important;
}
</style>
