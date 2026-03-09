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
        Admin Login
      </h2>

      <form @submit.prevent="handleAdminLogin" class="space-y-6">
        <div class="flex flex-col">
          <label for="email" class="mb-2 font-bold text-black text-sm"
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
          <label for="password" class="mb-2 font-bold text-black text-sm"
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
        <div class="text-center mt-4">
          <router-link
            to="/admin/forgot-password"
            class="text-xs text-gray-500 hover:text-black hover:underline transition"
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
</style>
