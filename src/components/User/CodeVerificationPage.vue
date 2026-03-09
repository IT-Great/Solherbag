<template>
  <div class="flex justify-center items-center bg-[#E5E7EB] px-6 min-h-screen">
    <div class="bg-white shadow-sm p-10 border border-gray-300 rounded-[3rem] w-full max-w-md">
      <h2 class="mb-4 font-black text-black text-xl text-center uppercase tracking-widest">
        Verify Code
      </h2>
      <p class="text-sm text-gray-500 text-center mb-8">
        We have sent a 6-digit code to <strong class="text-black">{{ email }}</strong>.
      </p>

      <form @submit.prevent="handleVerifyCode" class="space-y-6">
        <div class="flex flex-col">
          <label class="mb-2 font-bold text-black text-sm text-center">Enter 6-Digit Code</label>
          <input
            type="text"
            v-model="code"
            maxlength="6"
            autocomplete="one-time-code" 
            class="bg-[#D9D9D9] p-4 border-none outline-none focus:ring-2 focus:ring-blue-500 w-full transition text-center text-2xl font-mono tracking-[1em]"
            required
            :disabled="isLoading"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading || code.length !== 6"
          class="bg-black hover:bg-gray-800 disabled:bg-gray-400 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white transition flex justify-center items-center"
        >
          <span v-if="!isLoading">Verify</span>
          <div v-else class="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from "../../config/api.js";

const code = ref('');
const email = ref('');
const isLoading = ref(false);
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (!route.query.email) {
    router.push('/forgot-password');
  } else {
    email.value = route.query.email;
  }
});

const handleVerifyCode = async () => {
  isLoading.value = true;
  try {
    await axios.post(`${BASE_URL}/forgot-password/verify-code`, { 
      email: email.value,
      code: code.value 
    });
    
    // Lanjut ke reset password
    router.push({
      path: '/reset-password',
      query: { email: email.value, code: code.value }
    });
  } catch (error) {
    Swal.fire('Error', error.response?.data?.message || 'Invalid code.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>