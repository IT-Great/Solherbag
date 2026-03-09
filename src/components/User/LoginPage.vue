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
          <label for="email" class="mb-2 font-bold text-black text-sm"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="email"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="mb-2 font-bold text-black text-sm"
            >Password</label
          >
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
        <router-link
          to="/register"
          class="font-bold text-blue-600 hover:underline"
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
</style>
