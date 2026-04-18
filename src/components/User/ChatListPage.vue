<template>
  <div class="max-w-4xl min-h-screen px-6 py-24 mx-auto animate-fade-in">
    <div class="mb-10 text-center">
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">Customer Support</h1>
      <p class="mt-4 font-serif italic text-gray-500">Select an admin below to start a conversation.</p>
    </div>

    <div v-if="isLoading" class="flex justify-center py-20">
      <div class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
    </div>

    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div 
        v-for="admin in admins" 
        :key="admin.id"
        @click="$router.push(`/chat/${admin.id}`)"
        class="flex items-center p-6 transition-all duration-300 bg-white border border-gray-200 cursor-pointer rounded-2xl hover:shadow-lg hover:border-black group"
      >
        <img 
          :src="admin.profile_image || `https://ui-avatars.com/api/?name=${admin.first_name}+${admin.last_name}&background=000&color=fff`" 
          class="object-cover w-16 h-16 rounded-full shadow-sm"
        />
        <div class="flex-grow ml-4">
          <h3 class="text-lg font-bold tracking-widest text-gray-900 uppercase group-hover:text-black">{{ admin.first_name }} {{ admin.last_name }}</h3>
          <p class="text-xs font-bold tracking-widest text-gray-400 uppercase">{{ admin.usertype }} Support</p>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-300 transition-transform transform group-hover:translate-x-2 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../../config/api';

const admins = ref([]);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    admins.value = res.data;
  } catch (e) {
    console.error(e);
  } finally {
    isLoading.value = false;
  }
});
</script>