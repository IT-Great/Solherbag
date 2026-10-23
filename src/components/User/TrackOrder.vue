<template>
  <div class="min-h-[80vh] flex flex-col justify-center items-center px-6 py-24 bg-[#Fdfbf7]">
    <div class="w-full max-w-lg p-10 text-center bg-white border border-gray-100 shadow-2xl rounded-3xl">
      <div class="flex items-center justify-center w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>
      <h1 class="mb-2 font-serif text-3xl tracking-tight text-gray-900">Track Your Order</h1>
      <p class="mb-8 text-xs text-gray-500">Enter your order number or tracking ID below.</p>
      
      <form @submit.prevent="handleTrack" class="flex flex-col gap-4">
        <input 
          v-model="trackingId" 
          type="text" 
          placeholder="e.g., SOL-12345678" 
          class="w-full px-5 py-4 text-sm font-bold tracking-widest text-center text-gray-900 uppercase bg-gray-50 border border-gray-200 rounded-xl focus:ring-black focus:border-black outline-none transition-colors"
          required
        />
        <button 
          type="submit"
          class="w-full px-6 py-4 text-xs font-bold tracking-widest text-white uppercase transition-colors bg-black rounded-xl hover:bg-gray-800"
        >
          Track Package
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const trackingId = ref('');

const handleTrack = () => {
  // TODO: Integrasi dengan API Biteship Tracking
  console.log("Tracking:", trackingId.value);
};
</script>