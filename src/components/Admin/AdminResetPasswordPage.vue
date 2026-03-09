<template>
  <div class="flex justify-center items-center bg-[#1F2937] px-6 min-h-screen">
    <div class="bg-white shadow-sm p-10 border border-gray-300 rounded-[3rem] w-full max-w-md">
      <h2 class="mb-8 font-black text-black text-xl text-center uppercase tracking-widest">
        Create New Admin Password
      </h2>

      <form @submit.prevent="handleResetPassword" class="space-y-6">
        <div class="flex flex-col">
          <label class="mb-2 font-bold text-black text-sm">New Password</label>
          <input
            type="password"
            v-model="password"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-red-500 w-full transition"
            required
            :disabled="isLoading"
          />
        </div>
        
        <div class="flex flex-col">
          <label class="mb-2 font-bold text-black text-sm">Confirm Password</label>
          <input
            type="password"
            v-model="password_confirmation"
            class="bg-[#D9D9D9] p-3 border-none outline-none focus:ring-1 focus:ring-red-500 w-full transition"
            required
            :disabled="isLoading"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="bg-[#CC0000] hover:bg-red-700 disabled:bg-gray-400 shadow-md px-4 py-3 rounded-sm w-full font-bold text-white transition flex justify-center items-center mt-8"
        >
          <span v-if="!isLoading">Update Password</span>
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

const password = ref('');
const password_confirmation = ref('');
const email = ref('');
const code = ref('');
const isLoading = ref(false);

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (!route.query.email || !route.query.code) {
    router.push('/loginadmin');
  } else {
    email.value = route.query.email;
    code.value = route.query.code;
  }
});

const handleResetPassword = async () => {
  if (password.value !== password_confirmation.value) {
    Swal.fire('Error', 'Passwords do not match.', 'error');
    return;
  }

  isLoading.value = true;
  try {
    await axios.post(`${BASE_URL}/admin/forgot-password/reset`, { 
      email: email.value,
      code: code.value,
      password: password.value,
      password_confirmation: password_confirmation.value
    });
    
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Admin password has been changed. Please login.',
      timer: 2000,
      showConfirmButton: false
    });
    
    router.push('/loginadmin');
  } catch (error) {
    Swal.fire('Error', error.response?.data?.message || 'Failed to reset password.', 'error');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
:deep(main) { padding: 0 !important; }
</style>