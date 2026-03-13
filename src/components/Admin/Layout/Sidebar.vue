<!-- <template>
  <aside
    :class="[isCollapsed ? 'w-20' : 'w-64']"
    class="top-0 z-40 relative sticky flex flex-col bg-white shadow-lg border-gray-200 border-r h-screen transition-all duration-300 ease-in-out"
  >
    <button
      @click="toggleSidebar"
      class="top-6 -right-3 absolute bg-white hover:bg-gray-100 shadow-md p-1 border border-gray-200 rounded-full text-gray-600 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        :class="{ 'rotate-180': isCollapsed }"
        class="w-4 h-4 transition-transform duration-300"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>

    <div
      class="flex justify-center p-6 border-gray-100 border-b overflow-hidden"
    >
      <img
        src="../../../assets/solherbrandbook.png"
        alt="Logo"
        :class="[isCollapsed ? 'h-8' : 'h-16']"
        class="w-auto transition-all duration-300"
      />
    </div>

    <div
      v-show="!isCollapsed"
      class="mt-4 text-center transition-opacity duration-300"
    >
      <p class="text-gray-400 text-xs uppercase tracking-widest">
        Administrator
      </p>
      <h4 class="font-bold text-black text-sm">Hi, {{ userName }}</h4>
    </div>

    <nav class="flex-grow mt-6">
      <ul class="space-y-2 px-3">
        <li v-for="item in menuItems" :key="item.path">
          <router-link
            :to="item.path"
            class="group flex items-center hover:bg-gray-100 p-3 rounded-xl text-gray-700 transition-colors"
            active-class="bg-blue-50 text-blue-600"
          >
            <div class="flex-shrink-0" v-html="item.icon"></div>
            <span
              v-show="!isCollapsed"
              class="ml-4 font-medium whitespace-nowrap transition-opacity duration-300"
            >
              {{ item.name }}
            </span>
          </router-link>
        </li>
      </ul>
    </nav>

    <div class="p-4 border-gray-100 border-t">
      <button
        @click="handleLogout"
        class="group flex items-center hover:bg-red-50 p-3 rounded-xl w-full text-red-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        <span v-show="!isCollapsed" class="ml-4 font-medium whitespace-nowrap"
          >Logout Admin</span
        >
      </button>
    </div>
  </aside>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isCollapsed = ref(false);
const userName = ref("Admin"); // Default value

// Ambil Nama dari LocalStorage saat komponen dimuat
const getUserData = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    userName.value = parsedUser.first_name;
  }
};

// Definisi Menu dengan Ikon SVG
const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path></svg>',
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>',
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>',
  },
  {
    name: "Sales Reports",
    path: "/admin/salesreports",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
  },
  {
    name: "Transactions",
    path: "/admin/transactions",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>',
  },
  // --- [BARU] MENU ACCOUNTING ---
  {
    name: "COA",
    path: "/admin/coas",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>',
  },
  {
    name: "Payments",
    path: "/admin/payments",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>',
  },
  {
    name: "Suppliers",
    path: "/admin/suppliers",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',
  },
  {
    name: "Invoices",
    path: "/admin/invoices",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
  },
  // -----------------------------
  {
    name: "Users",
    path: "/admin/user_list",
    icon: '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
  },
];

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

const checkOrientation = () => {
  if (window.innerHeight > window.innerWidth) {
    isCollapsed.value = true;
  } else {
    isCollapsed.value = false;
  }
};

onMounted(() => {
  getUserData();
  checkOrientation();
  window.addEventListener("resize", checkOrientation);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkOrientation);
});

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out from the admin panel.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000", // Warna hitam sesuai tema Solher
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // [3] Eksekusi Logout jika user klik Yes
      localStorage.clear();

      // Opsional: Tampilkan feedback logout sukses
      Swal.fire({
        title: "Logged Out!",
        text: "See you again.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/loginadmin");
      });
    }
  });
};
</script> -->

<!-- <template>
  <aside
    :class="[isCollapsed ? 'w-20' : 'w-64']"
    class="top-0 z-40 relative sticky flex flex-col bg-white shadow-lg border-gray-200 border-r h-screen transition-all duration-300 ease-in-out overflow-hidden"
  >
    <div
      class="flex justify-center p-6 border-gray-100 border-b overflow-hidden shrink-0"
    >
      <img
        src="../../../assets/solherbrandbook.png"
        alt="Logo"
        :class="[isCollapsed ? 'h-8' : 'h-16']"
        class="w-auto transition-all duration-300"
      />
    </div>

    <div
      v-show="!isCollapsed"
      class="mt-4 text-center transition-opacity duration-300 shrink-0"
    >
      <p class="text-gray-400 text-xs uppercase tracking-widest">
        Administrator
      </p>
      <h4 class="font-bold text-black text-sm">Hi, {{ userName }}</h4>
    </div>

    <nav class="flex-grow mt-6 overflow-y-auto custom-scrollbar pb-4">
      <ul class="space-y-1 px-3">
        <template v-for="(item, index) in menuItems" :key="index">
          <li v-if="item.type === 'label'" class="pt-4 pb-1 pl-3">
            <span
              v-show="!isCollapsed"
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest transition-opacity duration-300"
            >
              {{ item.name }}
            </span>
            <div v-show="isCollapsed" class="h-px bg-gray-200 mx-2 mt-4"></div>
          </li>

          <li v-else>
            <router-link
              :to="item.path"
              class="group flex items-center hover:bg-gray-100 p-3 rounded-xl text-gray-700 transition-colors"
              active-class="bg-blue-50 text-blue-600 font-semibold"
            >
              <div class="flex-shrink-0" v-html="item.icon"></div>
              <span
                v-show="!isCollapsed"
                class="ml-4 text-sm whitespace-nowrap transition-opacity duration-300"
              >
                {{ item.name }}
              </span>
            </router-link>
          </li>
        </template>
      </ul>
    </nav>

    <div class="p-4 border-gray-100 border-t shrink-0">
      <button
        @click="handleLogout"
        class="group flex items-center hover:bg-red-50 p-3 rounded-xl w-full text-red-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        <span v-show="!isCollapsed" class="ml-4 font-medium whitespace-nowrap"
          >Logout Admin</span
        >
      </button>
    </div>
  </aside>
</template>

<script setup>
import Swal from "sweetalert2";
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const isCollapsed = ref(false);
const userName = ref("Admin");

const getUserData = () => {
  const user = localStorage.getItem("user");
  if (user) {
    const parsedUser = JSON.parse(user);
    userName.value = parsedUser.first_name;
  }
};

// [PERBAIKAN] Struktur Menu dengan Objek Label
const menuItems = [
  // --- GRUP 1: MENU UTAMA ---
  { type: "label", name: "Menu" },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path></svg>',
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>',
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>',
  },
  {
    name: "Sales Reports",
    path: "/admin/salesreports",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
  },
  {
    name: "Transactions",
    path: "/admin/transactions",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>',
  },
  {
    name: "Users",
    path: "/admin/user_list",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
  },

  {
    name: "Subscribers",
    path: "/admin/subscribers",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
  },

  // --- GRUP 2: ACCOUNTING ---
  { type: "label", name: "Accounting" },
  {
    name: "COA",
    path: "/admin/coas",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>',
  },
  {
    name: "Payments",
    path: "/admin/payments",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>',
  },
  {
    name: "Suppliers",
    path: "/admin/suppliers",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',
  },
  {
    name: "Invoices",
    path: "/admin/invoices",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
  },
];

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

// [BARU] Menangkap event dari Header
const handleExternalToggle = () => {
  toggleSidebar();
};

const checkOrientation = () => {
  if (window.innerHeight > window.innerWidth) {
    isCollapsed.value = true;
  } else {
    isCollapsed.value = false;
  }
};

onMounted(() => {
  getUserData();
  checkOrientation();
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("toggle-admin-sidebar", handleExternalToggle);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkOrientation);
  window.removeEventListener("toggle-admin-sidebar", handleExternalToggle);
});

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out from the admin panel.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.clear();
      Swal.fire({
        title: "Logged Out!",
        text: "See you again.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/loginadmin");
      });
    }
  });
};
</script>

<style scoped>
/* Optional: mempercantik scrollbar jika menu sudah terlalu panjang */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style> -->

<template>
  <aside
    :class="[isCollapsed ? 'w-20' : 'w-64']"
    class="top-0 z-40 relative sticky flex flex-col bg-white shadow-lg border-gray-200 border-r h-screen transition-all duration-300 ease-in-out overflow-hidden"
  >
    <div
      class="flex justify-center p-6 border-gray-100 border-b overflow-hidden shrink-0"
    >
      <img
        src="../../../assets/solherbrandbook.png"
        alt="Logo"
        :class="[isCollapsed ? 'h-8' : 'h-16']"
        class="w-auto transition-all duration-300"
      />
    </div>

    <div
      v-show="!isCollapsed"
      class="mt-4 text-center transition-opacity duration-300 shrink-0"
    >
      <p class="text-gray-400 text-xs uppercase tracking-widest">
        Administrator
      </p>
      <h4 class="font-bold text-black text-sm">Hi, {{ userName }}</h4>
    </div>

    <nav class="flex-grow mt-6 overflow-y-auto custom-scrollbar pb-4">
      <ul class="space-y-1 px-3">
        <template v-for="(item, index) in filteredMenuItems" :key="index">
          
          <li v-if="item.type === 'label'" class="pt-4 pb-1 pl-3">
            <span
              v-show="!isCollapsed"
              class="text-[10px] font-black text-gray-400 uppercase tracking-widest transition-opacity duration-300"
            >
              {{ item.name }}
            </span>
            <div v-show="isCollapsed" class="h-px bg-gray-200 mx-2 mt-4"></div>
          </li>

          <li v-else-if="item.children">
            <button
              @click="toggleDropdown(item.name)"
              :class="[
                'group flex items-center justify-between w-full p-3 rounded-xl text-gray-700 transition-colors hover:bg-gray-100',
                isDropdownOpen(item.name) ? 'bg-gray-50' : ''
              ]"
            >
              <div class="flex items-center">
                <div class="flex-shrink-0" v-html="item.icon"></div>
                <span
                  v-show="!isCollapsed"
                  class="ml-4 text-sm whitespace-nowrap transition-opacity duration-300 font-medium"
                >
                  {{ item.name }}
                </span>
              </div>
              <svg 
                v-show="!isCollapsed"
                :class="isDropdownOpen(item.name) ? 'rotate-180' : ''" 
                class="w-4 h-4 text-gray-400 transition-transform duration-200" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <ul 
              v-show="!isCollapsed && isDropdownOpen(item.name)" 
              class="mt-1 mb-2 space-y-1 pl-11 pr-2 relative"
            >
              <div class="absolute left-6 top-0 bottom-2 w-px bg-gray-200"></div>

              <li v-for="(child, childIndex) in item.children" :key="childIndex" class="relative">
                <div class="absolute left-[-20px] top-1/2 w-3 h-px bg-gray-200"></div>
                <router-link
                  :to="child.path"
                  class="flex items-center py-2 px-3 rounded-lg text-xs text-gray-500 hover:text-black hover:bg-gray-100 transition-colors"
                  active-class="bg-blue-50 text-blue-600 font-bold"
                >
                  {{ child.name }}
                </router-link>
              </li>
            </ul>
          </li>

          <li v-else>
            <router-link
              :to="item.path"
              class="group flex items-center hover:bg-gray-100 p-3 rounded-xl text-gray-700 transition-colors"
              active-class="bg-blue-50 text-blue-600 font-semibold"
            >
              <div class="flex-shrink-0" v-html="item.icon"></div>
              <span
                v-show="!isCollapsed"
                class="ml-4 text-sm whitespace-nowrap transition-opacity duration-300"
              >
                {{ item.name }}
              </span>
            </router-link>
          </li>

        </template>
      </ul>
    </nav>

    <div class="p-4 border-gray-100 border-t shrink-0">
      <button
        @click="handleLogout"
        class="group flex items-center hover:bg-red-50 p-3 rounded-xl w-full text-red-500 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke="currentColor"
          class="w-6 h-6 shrink-0"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
          />
        </svg>
        <span v-show="!isCollapsed" class="ml-4 font-medium whitespace-nowrap"
          >Logout Admin</span
        >
      </button>
    </div>
  </aside>
</template>

<script setup>
// import Swal from "sweetalert2";
// import { ref, onMounted, onUnmounted } from "vue";
// import { useRouter, useRoute } from "vue-router";

// const router = useRouter();
// const route = useRoute(); // Dibutuhkan untuk mendeteksi active route
// const isCollapsed = ref(false);
// const userName = ref("Admin");

// // State untuk melacak dropdown mana yang terbuka (bisa diset multiple jika menggunakan array, di sini kita gunakan array of string)
// const openDropdowns = ref([]); 

// const getUserData = () => {
//   const user = localStorage.getItem("user");
//   if (user) {
//     const parsedUser = JSON.parse(user);
//     userName.value = parsedUser.first_name;
//   }
// };

// const menuItems = [
//   // --- GRUP 1: MENU UTAMA ---
//   { type: "label", name: "Menu" },
//   {
//     name: "Dashboard",
//     path: "/admin/dashboard",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path></svg>',
//   },
//   {
//     name: "Categories",
//     path: "/admin/categories",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>',
//   },
//   // [PERBAIKAN] Mengubah objek Products menjadi Parent dengan Children
//   {
//     name: "Products",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>',
//     children: [
//       { name: "Product Management", path: "/admin/products" },
//       { name: "Stock Management", path: "/admin/stocks" }
//     ]
//   },
//   {
//     name: "Sales Reports",
//     path: "/admin/salesreports",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
//   },
//   {
//     name: "Transactions",
//     path: "/admin/transactions",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>',
//   },
//   {
//     name: "Users",
//     path: "/admin/user_list",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
//   },
//   {
//     name: "Subscribers",
//     path: "/admin/subscribers",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
//   },

//   // --- GRUP 2: ACCOUNTING ---
//   { type: "label", name: "Accounting" },
//   {
//     name: "COA",
//     path: "/admin/coas",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>',
//   },
//   {
//     name: "Payments",
//     path: "/admin/payments",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>',
//   },
//   {
//     name: "Suppliers",
//     path: "/admin/suppliers",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',
//   },
//   {
//     name: "Invoices",
//     path: "/admin/invoices",
//     icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
//   },
// ];

// // --- [BARU] Fungsi Logika Dropdown ---
// const toggleDropdown = (name) => {
//   if (isCollapsed.value) {
//     toggleSidebar(); // Buka sidebar dulu jika sedang menciut
//   }

//   const index = openDropdowns.value.indexOf(name);
//   if (index > -1) {
//     openDropdowns.value.splice(index, 1); // Tutup
//   } else {
//     openDropdowns.value.push(name); // Buka
//   }
// };

// const isDropdownOpen = (name) => {
//   return openDropdowns.value.includes(name);
// };

// // --- Fungsi Bawaan ---
// const toggleSidebar = () => {
//   isCollapsed.value = !isCollapsed.value;
//   // Jika sidebar diciutkan, otomatis tutup semua dropdown agar rapi
//   if (isCollapsed.value) {
//     openDropdowns.value = [];
//   }
// };

// const handleExternalToggle = () => {
//   toggleSidebar();
// };

// const checkOrientation = () => {
//   if (window.innerHeight > window.innerWidth) {
//     isCollapsed.value = true;
//     openDropdowns.value = [];
//   } else {
//     isCollapsed.value = false;
//   }
// };

// // [BARU] Auto-expand menu jika sedang berada di salah satu anak halamannya
// const checkActiveRoute = () => {
//   const currentPath = route.path;
//   menuItems.forEach(item => {
//     if (item.children) {
//       const isActiveChild = item.children.some(child => currentPath.startsWith(child.path));
//       if (isActiveChild && !openDropdowns.value.includes(item.name)) {
//         openDropdowns.value.push(item.name);
//       }
//     }
//   });
// };

// onMounted(() => {
//   getUserData();
//   checkOrientation();
//   checkActiveRoute(); // Cek saat pertama kali dimuat
//   window.addEventListener("resize", checkOrientation);
//   window.addEventListener("toggle-admin-sidebar", handleExternalToggle);
// });

// onUnmounted(() => {
//   window.removeEventListener("resize", checkOrientation);
//   window.removeEventListener("toggle-admin-sidebar", handleExternalToggle);
// });

// const handleLogout = () => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You will be logged out from the admin panel.",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#000",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, Logout!",
//     cancelButtonText: "Cancel",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       localStorage.clear();
//       Swal.fire({
//         title: "Logged Out!",
//         text: "See you again.",
//         icon: "success",
//         timer: 1500,
//         showConfirmButton: false,
//       }).then(() => {
//         router.push("/loginadmin");
//       });
//     }
//   });
// };

import Swal from "sweetalert2";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();
const isCollapsed = ref(false);
const userName = ref("Admin");
const userRole = ref(""); // Tambahkan state untuk menyimpan role user

const openDropdowns = ref([]); 

// const getUserData = () => {
//   const user = localStorage.getItem("user");
//   if (user) {
//     const parsedUser = JSON.parse(user);
//     userName.value = parsedUser.first_name;
//     userRole.value = parsedUser.usertype; // Simpan role dari local storage
//   }
// };

const getUserData = () => {
  // [PERBAIKAN 1]: Ambil data dari key "admin", BUKAN "user"
  const adminData = localStorage.getItem("admin");
  
  if (adminData) {
    const parsedAdmin = JSON.parse(adminData);
    userName.value = parsedAdmin.first_name;
    userRole.value = parsedAdmin.usertype; // Menyimpan role yang benar (superadmin/gudang/dll)
  } else {
    // Fallback keamanan jika objek admin terhapus tapi token masih ada
    userRole.value = localStorage.getItem("role") || "";
  }
};

// [PERBAIKAN] Struktur Menu dengan properti 'roles'
const menuItems = [
  // --- GRUP 1: MENU UTAMA ---
  { 
    type: "label", 
    name: "Menu", 
    roles: ['superadmin', 'admin', 'gudang'] // Label hanya muncul jika ada isi menunya
  },
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z"></path></svg>',
    roles: ['superadmin', 'admin'] // Gudang dan Accounting mungkin tidak perlu lihat dashboard utama
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path></svg>',
    roles: ['superadmin', 'admin']
  },
  {
    name: "Products",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>',
    roles: ['superadmin', 'admin', 'gudang'], // Gudang perlu akses ini
    children: [
      { name: "Product Management", path: "/admin/products", roles: ['superadmin', 'admin'] }, // Hanya admin yang bisa tambah/edit produk
      { name: "Stock Management", path: "/admin/stocks", roles: ['superadmin', 'admin', 'gudang'] } // Gudang bisa manajemen stok
    ]
  },
  {
    name: "Transactions",
    path: "/admin/transactions",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>',
    roles: ['superadmin', 'admin', 'gudang'] // Gudang perlu lihat transaksi untuk pengiriman
  },
  {
    name: "Sales Reports",
    path: "/admin/salesreports",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>',
    roles: ['superadmin', 'admin', 'accounting'] // Accounting perlu akses report
  },
  {
    name: "Users",
    path: "/admin/user_list",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>',
    roles: ['superadmin', 'admin']
  },
  {
    name: "Subscribers",
    path: "/admin/subscribers",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>',
    roles: ['superadmin', 'admin']
  },

  // --- GRUP 2: ACCOUNTING ---
  { 
    type: "label", 
    name: "Accounting",
    roles: ['superadmin', 'accounting'] 
  },
  {
    name: "COA",
    path: "/admin/coas",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z"></path></svg>',
    roles: ['superadmin', 'accounting']
  },
  {
    name: "Payments",
    path: "/admin/payments",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>',
    roles: ['superadmin', 'accounting']
  },
  {
    name: "Suppliers",
    path: "/admin/suppliers",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>',
    roles: ['superadmin', 'accounting']
  },
  {
    name: "Invoices",
    path: "/admin/invoices",
    icon: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>',
    roles: ['superadmin', 'accounting']
  },
];

// [BARU] Computed property untuk memfilter menu berdasarkan role
// const filteredMenuItems = computed(() => {
//   return menuItems.filter(item => {
//     // Jika tidak ada batasan role, tampilkan untuk semua
//     if (!item.roles) return true;

//     // Cek apakah role user saat ini ada di dalam daftar roles menu
//     const hasAccess = item.roles.includes(userRole.value);

//     // Jika punya akses dan memiliki children, filter juga children-nya
//     if (hasAccess && item.children) {
//       item.children = item.children.filter(child => {
//         if(!child.roles) return true;
//         return child.roles.includes(userRole.value);
//       });
//       // Jangan tampilkan parent jika semua anaknya disembunyikan
//       return item.children.length > 0; 
//     }

//     return hasAccess;
//   });
// });

// [PERBAIKAN 2]: Hindari mutasi (perubahan) pada array asli `menuItems`
const filteredMenuItems = computed(() => {
  // Kita harus melakukan "Deep Copy" (Kloning) array agar item.children tidak rusak permanen
  const clonedMenuItems = JSON.parse(JSON.stringify(menuItems));

  return clonedMenuItems.filter(item => {
    // Jika tidak ada batasan role, tampilkan untuk semua
    if (!item.roles) return true;

    // Cek apakah role user saat ini ada di dalam daftar roles menu
    const hasAccess = item.roles.includes(userRole.value);

    // Jika punya akses dan memiliki children, filter juga children-nya
    if (hasAccess && item.children) {
      item.children = item.children.filter(child => {
        if (!child.roles) return true;
        return child.roles.includes(userRole.value);
      });
      // Jangan tampilkan parent jika semua anaknya disembunyikan
      return item.children.length > 0; 
    }

    return hasAccess;
  });
});

const toggleDropdown = (name) => {
  if (isCollapsed.value) {
    toggleSidebar(); 
  }

  const index = openDropdowns.value.indexOf(name);
  if (index > -1) {
    openDropdowns.value.splice(index, 1); 
  } else {
    openDropdowns.value.push(name); 
  }
};

const isDropdownOpen = (name) => {
  return openDropdowns.value.includes(name);
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
  if (isCollapsed.value) {
    openDropdowns.value = [];
  }
};

const handleExternalToggle = () => {
  toggleSidebar();
};

const checkOrientation = () => {
  if (window.innerHeight > window.innerWidth) {
    isCollapsed.value = true;
    openDropdowns.value = [];
  } else {
    isCollapsed.value = false;
  }
};

const checkActiveRoute = () => {
  const currentPath = route.path;
  filteredMenuItems.value.forEach(item => { // Ganti ke filteredMenuItems
    if (item.children) {
      const isActiveChild = item.children.some(child => currentPath.startsWith(child.path));
      if (isActiveChild && !openDropdowns.value.includes(item.name)) {
        openDropdowns.value.push(item.name);
      }
    }
  });
};

onMounted(() => {
  getUserData();
  checkOrientation();
  checkActiveRoute(); 
  window.addEventListener("resize", checkOrientation);
  window.addEventListener("toggle-admin-sidebar", handleExternalToggle);
});

onUnmounted(() => {
  window.removeEventListener("resize", checkOrientation);
  window.removeEventListener("toggle-admin-sidebar", handleExternalToggle);
});

// const handleLogout = () => {
//   Swal.fire({
//     // ... konfigurasi Swal tetap sama
//   }).then((result) => {
//     if (result.isConfirmed) {
//       localStorage.clear();
//       Swal.fire({
//         title: "Logged Out!",
//         text: "See you again.",
//         icon: "success",
//         timer: 1500,
//         showConfirmButton: false,
//       }).then(() => {
//         router.push("/loginadmin");
//       });
//     }
//   });
// };

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out from the staff panel.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // Hapus data sesi admin
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin");
      localStorage.removeItem("admin_login_time");
      localStorage.removeItem("role");

      Swal.fire({
        title: "Logged Out!",
        text: "See you again.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/loginadmin");
      });
    }
  });
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: #d1d5db;
}
</style>