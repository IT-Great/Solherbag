<template>
  <div class="flex justify-center items-center bg-[#E5E7EB] px-6 min-h-screen">
    <div class="bg-white shadow-sm p-10 border border-gray-300 rounded-[3rem] w-full max-w-md">
      <h2 class="mb-4 font-black text-black text-xl text-center uppercase tracking-widest">
        Reset Password
      </h2>
      <p class="text-sm text-gray-500 text-center mb-8">
        Enter the email address associated with your account, and we'll send you a verification code.
      </p>

      <form @submit.prevent="handleSendCode" class="space-y-6">
        <div class="flex flex-col">
          <label class="mb-2 font-bold text-black text-sm">Email Address</label>
          <input
            type="email"
            v-model="email"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-blue-500 w-full transition"
            required
            :disabled="isLoading"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="bg-[#0066FF] hover:bg-blue-700 disabled:bg-gray-400 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white transition flex justify-center items-center"
        >
          <span v-if="!isLoading">Send Code</span>
          <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>
      </form>
      
      <div class="text-center mt-6">
        <router-link to="/login" class="text-xs text-gray-500 hover:text-black hover:underline transition">Back to Login</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from "../../config/api.js";

const email = ref('');
const isLoading = ref(false);
const router = useRouter();

const handleSendCode = async () => {
  isLoading.value = true;
  try {
    await axios.post(`${BASE_URL}/forgot-password/send-code`, { email: email.value });
    
    // Pindah ke halaman OTP dengan membawa state email
    router.push({
      path: '/verify-code',
      query: { email: email.value }
    });
  } catch (error) {
    Swal.fire('Error', error.response?.data?.message || 'Failed to send code.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>