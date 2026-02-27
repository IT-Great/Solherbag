<!-- <template>
  <header
    class="top-0 z-30 sticky flex justify-end items-center bg-gray-300 px-8 border-gray-200 border-b h-16"
  >
    <div class="flex items-center gap-6">
      <button
        @click="$router.push('/admin/messages')"
        class="relative text-gray-500 hover:text-black transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-10.5a3 3 0 0 0-3-3H6.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3Z"
          />
        </svg>
        <span class="-top-1 -right-1 absolute flex w-2 h-2">
          <span
            class="inline-flex absolute bg-red-400 opacity-75 rounded-full w-full h-full animate-ping"
          ></span>
          <span
            class="inline-flex relative bg-red-500 rounded-full w-2 h-2"
          ></span>
        </span>
      </button>

      <router-link
        to="/admin/profile"
        class="group flex items-center gap-3 cursor-pointer"
      >
        <div class="hidden sm:block text-right">
          <p
            class="font-bold text-gray-900 group-hover:text-blue-600 text-xs transition"
          >
            Administrator
          </p>
        </div>
        <img
          :src="profileImage"
          @error="handleImageError"
          alt="Admin Profile"
          class="border border-gray-200 group-hover:border-blue-500 rounded-full w-9 h-9 object-cover transition"
        />
      </router-link>
    </div>
  </header>
</template>

<script setup>
import Swal from "sweetalert2";
import { computed, onMounted, ref } from "vue";

import { useRouter } from "vue-router";
// import defaultProfile from "../../../../src/assets/profile.png"; 
import defaultProfile from "../../../../src/assets/profile.png"; 

const router = useRouter();
const adminData = ref(null);

const updateHeaderImage = (e) => {
  if (adminData.value) {
    adminData.value.profile_image = e.detail;
  }
};

onMounted(() => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    adminData.value = JSON.parse(admin);
  }

  // Dengarkan perubahan gambar dari Profile Page
  window.addEventListener("admin-image-updated", updateHeaderImage);
});

const profileImage = computed(() => {
  return adminData.value?.profile_image || defaultProfile;
});

const handleImageError = (event) => {
  event.target.src = defaultProfile;
};

const showAlert = (message) => {
  Swal.fire({
    text: message,
    icon: "info",
    confirmButtonColor: "#000",
    timer: 2000,
  });
};
</script> -->

<template>
  <header
    class="top-0 z-30 sticky flex justify-between items-center bg-gray-300 px-8 border-gray-200 border-b h-16"
  >
    <div>
      <button
        @click="toggleSidebarGlobal"
        class="text-black hover:bg-gray-400 p-2 rounded-lg transition-colors focus:outline-none"
        title="Toggle Sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-6">
      <button
        @click="$router.push('/admin/messages')"
        class="relative text-gray-500 hover:text-black transition"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-10.5a3 3 0 0 0-3-3H6.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3Z" />
        </svg>
        <span class="-top-1 -right-1 absolute flex w-2 h-2">
          <span class="inline-flex absolute bg-red-400 opacity-75 rounded-full w-full h-full animate-ping"></span>
          <span class="inline-flex relative bg-red-500 rounded-full w-2 h-2"></span>
        </span>
      </button>

      <router-link to="/admin/profile" class="group flex items-center gap-3 cursor-pointer">
        <div class="hidden sm:block text-right">
          <p class="font-bold text-gray-900 group-hover:text-blue-600 text-xs transition">Administrator</p>
        </div>
        <img :src="profileImage" @error="handleImageError" alt="Admin Profile" class="border border-gray-200 group-hover:border-blue-500 rounded-full w-9 h-9 object-cover transition" />
      </router-link>
    </div>
  </header>
</template>

<script setup>
import Swal from "sweetalert2";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import defaultProfile from "../../../../src/assets/profile.png"; 

const router = useRouter();
const adminData = ref(null);

// [BARU] Fungsi memancarkan event untuk membuka/tutup Sidebar
const toggleSidebarGlobal = () => {
  window.dispatchEvent(new Event("toggle-admin-sidebar"));
};

const updateHeaderImage = (e) => {
  if (adminData.value) {
    adminData.value.profile_image = e.detail;
  }
};

onMounted(() => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    adminData.value = JSON.parse(admin);
  }
  window.addEventListener("admin-image-updated", updateHeaderImage);
});

const profileImage = computed(() => {
  return adminData.value?.profile_image || defaultProfile;
});

const handleImageError = (event) => {
  event.target.src = defaultProfile;
};
</script>
