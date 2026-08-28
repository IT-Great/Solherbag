<template>
  <div
    class="flex justify-center items-center bg-[#E5E7EB] px-6 py-12 min-h-screen"
  >
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
        Register
      </h2>

      <form @submit.prevent="handleRegister" class="space-y-4">
        <div class="flex flex-col">
          <label for="email" class="mb-1 font-bold text-black text-sm"
            >Email</label
          >
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="firstName" class="mb-1 font-bold text-black text-sm"
            >First Name</label
          >
          <input
            type="text"
            id="firstName"
            v-model="form.firstName"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="lastName" class="mb-1 font-bold text-black text-sm"
            >Last Name</label
          >
          <input
            type="text"
            id="lastName"
            v-model="form.lastName"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="password" class="mb-1 font-bold text-black text-sm"
            >Password</label
          >
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="confirmPassword" class="mb-1 font-bold text-black text-sm"
            >Confirm Password</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
          />
        </div>

        <div class="pt-6">
          <button
            type="submit"
            class="bg-[#0066FF] hover:bg-blue-700 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white uppercase tracking-wider transition-colors duration-300"
          >
            Register
          </button>
        </div>

        <!-- 👇 AREA TOMBOL GOOGLE LOGIN BARU 👇 -->
        <div class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
          <p class="mx-4 mb-0 text-center font-bold text-gray-400 text-[10px] uppercase tracking-widest">Atau</p>
        </div>

        <button
          type="button"
          @click="loginWithGoogle"
          class="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-700 font-bold px-4 py-3 rounded-sm shadow-sm hover:bg-gray-50 transition-colors duration-300"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" class="w-5 h-5 mr-3" />
          Lanjutkan dengan Google
        </button>
        <!-- 👆 ============================== 👆 -->
      </form>

      <p class="mt-6 text-gray-600 text-xs text-center">
        Already have an account?
        <router-link to="/login" class="font-bold text-blue-600 hover:underline"
          >Login here</router-link
        >
      </p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2"; // Import SweetAlert2
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();

const form = reactive({
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
});

const handleRegister = async () => {
  if (form.password !== form.confirmPassword) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Passwords do not match!",
      confirmButtonColor: "#0066FF",
    });
    return;
  }

  if (form.password.length < 8) {
    Swal.fire({
      icon: "warning",
      title: "Weak Password",
      text: "Password must be at least 8 characters long.",
      confirmButtonColor: "#0066FF",
    });
    return;
  }

  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      first_name: form.firstName,
      last_name: form.lastName,
      email: form.email,
      password: form.password,
    });

    Swal.fire({
      icon: "success",
      title: "Success!",
      text: response.data.message,
      showConfirmButton: false,
      timer: 2000,
    });

    router.push("/login");
  } catch (error) {
    if (error.response && error.response.status === 422) {
      const errors = error.response.data;
      let errorMessages = "";

      Object.values(errors).forEach((err) => {
        errorMessages += `${err}<br>`;
      });

      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        html: errorMessages,
        confirmButtonColor: "#0066FF",
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong on the server side.",
        confirmButtonColor: "#0066FF",
      });
    }
    console.error(error);
  }
};

const loginWithGoogle = () => {
  window.location.href = `${BASE_URL}/auth/google/redirect`;
};

// Logic untuk menangkap email dari query parameter
onMounted(() => {
  if (route.query.email) {
    form.email = route.query.email;
  }
});
</script>
