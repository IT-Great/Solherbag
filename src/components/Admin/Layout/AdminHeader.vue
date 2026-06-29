<!-- <template>
  <header
    class="sticky top-0 z-30 flex items-center justify-end h-16 px-8 bg-gray-300 border-b border-gray-200"
  >
    <div class="flex items-center gap-6">
      <button
        @click="$router.push('/admin/messages')"
        class="relative text-gray-500 transition hover:text-black"
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
        <span class="absolute flex w-2 h-2 -top-1 -right-1">
          <span
            class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"
          ></span>
          <span
            class="relative inline-flex w-2 h-2 bg-red-500 rounded-full"
          ></span>
        </span>
      </button>

      <router-link
        to="/admin/profile"
        class="flex items-center gap-3 cursor-pointer group"
      >
        <div class="hidden text-right sm:block">
          <p
            class="text-xs font-bold text-gray-900 transition group-hover:text-blue-600"
          >
            Administrator
          </p>
        </div>
        <img
          :src="profileImage"
          @error="handleImageError"
          alt="Admin Profile"
          class="object-cover transition border border-gray-200 rounded-full group-hover:border-blue-500 w-9 h-9"
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

<!-- <template>
  <header
    class="sticky top-0 z-30 flex items-center justify-between h-16 px-8 bg-gray-300 border-b border-gray-200"
  >
    <div>
      <button
        @click="toggleSidebarGlobal"
        class="p-2 text-black transition-colors rounded-lg hover:bg-gray-400 focus:outline-none"
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
        class="relative text-gray-500 transition hover:text-black"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 8.25h9m-9 3h9m-9 3h3m-6.75 4.125a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-10.5a3 3 0 0 0-3-3H6.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3Z" />
        </svg>
        <span class="absolute flex w-2 h-2 -top-1 -right-1">
          <span class="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
          <span class="relative inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
        </span>
      </button>

      <router-link to="/admin/profile" class="flex items-center gap-3 cursor-pointer group">
        <div class="hidden text-right sm:block">
          <p class="text-xs font-bold text-gray-900 transition group-hover:text-blue-600">Administrator</p>
        </div>
        <img :src="profileImage" @error="handleImageError" alt="Admin Profile" class="object-cover transition border border-gray-200 rounded-full group-hover:border-blue-500 w-9 h-9" />
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
</script> -->

<!-- <template>
  <header
    class="sticky top-0 z-30 flex items-center justify-between h-16 px-8 bg-gray-300 border-b border-gray-200"
  >
    <div>
      <button
        @click="toggleSidebarGlobal"
        class="p-2 text-black transition-colors rounded-lg hover:bg-gray-400 focus:outline-none"
        title="Toggle Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-6">
      <button
        @click="$router.push('/admin/messages')"
        class="relative text-gray-500 transition hover:text-black"
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

        <transition name="pop">
          <span
            v-if="unreadCount > 0"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] font-bold text-white bg-red-600 shadow-sm pointer-events-none"
          >
            {{ unreadCount > 99 ? "99+" : unreadCount }}
          </span>
        </transition>
      </button>

      <router-link
        to="/admin/profile"
        class="flex items-center gap-3 cursor-pointer group"
      >
        <div class="hidden text-right sm:block">
          <p class="text-xs font-bold text-gray-900 transition group-hover:text-blue-600">
            Administrator
          </p>
        </div>
        <img
          :src="profileImage"
          @error="handleImageError"
          alt="Admin Profile"
          class="object-cover transition border border-gray-200 rounded-full group-hover:border-blue-500 w-9 h-9"
        />
      </router-link>
    </div>
  </header>
</template>

<script setup>
import Swal from "sweetalert2";
import axios from "axios";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
// Sesuaikan import BASE_URL dengan struktur folder Anda
import { BASE_URL } from "../../../config/api.js";
import defaultProfile from "../../../../src/assets/profile.png";

const router = useRouter();
const adminData = ref(null);
const unreadCount = ref(0); // [BARU] State untuk menyimpan jumlah pesan belum dibaca

const toggleSidebarGlobal = () => {
  window.dispatchEvent(new Event("toggle-admin-sidebar"));
};

const updateHeaderImage = (e) => {
  if (adminData.value) {
    adminData.value.profile_image = e.detail;
  }
};

// [BARU] Fungsi menarik data angka belum dibaca dari server
const fetchUnreadCount = async () => {
  try {
    const token = localStorage.getItem("admin_token") || localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/admin/messages/unread-count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    unreadCount.value = res.data.unread_count;
  } catch (error) {
    console.error("Gagal mengambil badge pesan:", error);
  }
};

onMounted(() => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    adminData.value = JSON.parse(admin);
  }

  fetchUnreadCount(); // Panggil saat header dimuat

  window.addEventListener("admin-image-updated", updateHeaderImage);

  // [BARU] Listen ke event global agar badge bisa diperbarui otomatis dari halaman lain (misal saat pesan dibuka/dibalas)
  window.addEventListener("refresh-message-badge", fetchUnreadCount);
});

onUnmounted(() => {
  window.removeEventListener("admin-image-updated", updateHeaderImage);
  window.removeEventListener("refresh-message-badge", fetchUnreadCount);
});

const profileImage = computed(() => {
  return adminData.value?.profile_image || defaultProfile;
});

const handleImageError = (event) => {
  event.target.src = defaultProfile;
};
</script>

<style scoped>
/* [BARU] Animasi pop elegan saat badge muncul/berubah angka */
.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}
</style> -->

<!-- <template>
  <header
    class="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-gray-300 border-b border-gray-200 shadow-sm md:px-8"
  >
    <div>
      <button
        @click="toggleSidebarGlobal"
        class="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-200 hover:text-black focus:outline-none"
        title="Toggle Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-4 md:gap-6">
      <button
        @click="$router.push('/admin/messages')"
        class="relative text-gray-500 transition hover:text-black"
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

        <transition name="pop">
          <span
            v-if="unreadCount > 0"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] font-bold text-white bg-red-600 shadow-sm pointer-events-none"
          >
            {{ unreadCount > 99 ? "99+" : unreadCount }}
          </span>
        </transition>
      </button>

      <router-link
        to="/admin/profile"
        class="flex items-center gap-3 cursor-pointer group"
      >
        <div class="hidden text-right sm:block">
          <p class="text-xs font-bold text-gray-900 transition group-hover:text-blue-600">
            Administrator
          </p>
        </div>
        <img
          :src="profileImage"
          @error="handleImageError"
          alt="Admin Profile"
          class="object-cover w-8 h-8 transition border border-gray-200 rounded-full shadow-sm group-hover:border-blue-500 md:w-9 md:h-9"
        />
      </router-link>
    </div>
  </header>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../../config/api.js";
import defaultProfile from "../../../../src/assets/profile.png";

const router = useRouter();
const adminData = ref(null);
const unreadCount = ref(0);

const toggleSidebarGlobal = () => {
  // Event ini ditangkap oleh Sidebar.vue
  window.dispatchEvent(new Event("toggle-admin-sidebar"));
};

const updateHeaderImage = (e) => {
  if (adminData.value) {
    adminData.value.profile_image = e.detail;
  }
};

const fetchUnreadCount = async () => {
  try {
    const token = localStorage.getItem("admin_token") || localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/admin/messages/unread-count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    unreadCount.value = res.data.unread_count;
  } catch (error) {
    console.error("Gagal mengambil badge pesan:", error);
  }
};

onMounted(() => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    adminData.value = JSON.parse(admin);
  }

  fetchUnreadCount();
  window.addEventListener("admin-image-updated", updateHeaderImage);
  window.addEventListener("refresh-message-badge", fetchUnreadCount);
});

onUnmounted(() => {
  window.removeEventListener("admin-image-updated", updateHeaderImage);
  window.removeEventListener("refresh-message-badge", fetchUnreadCount);
});

const profileImage = computed(() => {
  return adminData.value?.profile_image || defaultProfile;
});

const handleImageError = (event) => {
  event.target.src = defaultProfile;
};
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}
</style> -->

<template>
  <header
    class="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-gray-300 border-b border-gray-200 shadow-sm md:px-8"
  >
    <div>
      <button
        @click="toggleSidebarGlobal"
        class="p-2 text-gray-600 transition-colors rounded-lg hover:bg-gray-200 hover:text-black focus:outline-none"
        title="Toggle Sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-4 md:gap-6">
      <button
        v-if="canViewMessages"
        @click="$router.push('/admin/messages')"
        class="relative text-gray-500 transition hover:text-black"
        title="Messages"
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

        <transition name="pop">
          <span
            v-if="unreadCount > 0"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] font-bold text-white bg-red-600 shadow-sm pointer-events-none"
          >
            {{ unreadCount > 99 ? "99+" : unreadCount }}
          </span>
        </transition>
      </button>

      <router-link
        to="/admin/profile"
        class="flex items-center gap-3 cursor-pointer group"
      >
        <div class="hidden text-right sm:block">
          <p class="text-xs font-bold text-gray-900 transition group-hover:text-blue-600">
            Administrator
          </p>
        </div>
        <img
          :src="profileImage"
          @error="handleImageError"
          alt="Admin Profile"
          class="object-cover w-8 h-8 transition border border-gray-200 rounded-full shadow-sm group-hover:border-blue-500 md:w-9 md:h-9"
        />
      </router-link>
    </div>
  </header>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";
import { BASE_URL } from "../../../config/api.js";
import defaultProfile from "../../../../src/assets/profile.png";

const router = useRouter();
const adminData = ref(null);
const unreadCount = ref(0);

// [BARU] State untuk pengecekan akses
const userRole = ref("");
const canViewMessages = ref(false);

const toggleSidebarGlobal = () => {
  window.dispatchEvent(new Event("toggle-admin-sidebar"));
};

const updateHeaderImage = (e) => {
  if (adminData.value) {
    adminData.value.profile_image = e.detail;
  }
};

// [BARU] Fungsi untuk mengecek hak akses tombol pesan
const checkMessagePermission = () => {
  // Superadmin selalu bisa melihatnya
  if (userRole.value === "superadmin") {
    canViewMessages.value = true;
    return;
  }

  // Tarik cache permission yang sudah disimpan oleh Router saat login
  const cachedPerms = localStorage.getItem("admin_permissions");
  
  if (cachedPerms) {
    const permissions = JSON.parse(cachedPerms);
    const myPerms = permissions[userRole.value] || {};
    const messagePerms = myPerms["messages"] || [];
    
    // Jika punya akses "Menu" atau "Read" di modul messages, tampilkan tombolnya
    if (messagePerms.includes("menu") || messagePerms.includes("read")) {
      canViewMessages.value = true;
    } else {
      canViewMessages.value = false;
    }
  } else {
    // Fallback jika tidak ada cache: Sembunyikan untuk keamanan
    canViewMessages.value = false;
  }
};

const fetchUnreadCount = async () => {
  // Jika tidak punya akses melihat pesan, jangan tembak API unread-count!
  // Ini menghemat resource server dari request yang tidak berguna (Error 403)
  if (!canViewMessages.value) return;

  try {
    const token = localStorage.getItem("admin_token") || localStorage.getItem("token");
    const res = await axios.get(`${BASE_URL}/admin/messages/unread-count`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    unreadCount.value = res.data.unread_count;
  } catch (error) {
    console.error("Gagal mengambil badge pesan:", error);
  }
};

onMounted(() => {
  const admin = localStorage.getItem("admin");
  if (admin) {
    adminData.value = JSON.parse(admin);
    userRole.value = adminData.value.usertype;
  }

  // 1. Cek Permission dulu
  checkMessagePermission();
  
  // 2. Baru fetch jumlah unread (jika diizinkan)
  fetchUnreadCount();
  
  window.addEventListener("admin-image-updated", updateHeaderImage);
  window.addEventListener("refresh-message-badge", fetchUnreadCount);
});

onUnmounted(() => {
  window.removeEventListener("admin-image-updated", updateHeaderImage);
  window.removeEventListener("refresh-message-badge", fetchUnreadCount);
});

const profileImage = computed(() => {
  return adminData.value?.profile_image || defaultProfile;
});

const handleImageError = (event) => {
  event.target.src = defaultProfile;
};
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}
</style>
