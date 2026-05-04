<template>
  <nav class="flex mb-6 animate-fade-in" aria-label="Breadcrumb">
    <ol
      class="inline-flex items-center space-x-1 md:space-x-2 text-[10px] sm:text-xs font-bold tracking-widest uppercase"
    >
      <!-- Base / Home (Dashboard) -->
      <li class="inline-flex items-center">
        <router-link
          to="/admin/dashboard"
          class="inline-flex items-center text-gray-400 transition-colors hover:text-black"
        >
          <svg
            class="w-3.5 h-3.5 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
            />
          </svg>
          Dashboard
        </router-link>
      </li>

      <!-- Dynamic Segments -->
      <li v-for="(crumb, index) in breadcrumbs" :key="index">
        <div class="flex items-center">
          <svg
            class="w-3 h-3 mx-1 text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>

          <!-- Jika ini adalah segmen terakhir (Halaman saat ini), jadikan teks biasa (hitam) -->
          <span
            v-if="index === breadcrumbs.length - 1"
            class="ml-1 text-gray-900 md:ml-2"
          >
            {{ crumb.label }}
          </span>

          <!-- Jika bukan yang terakhir, jadikan link yang bisa diklik (abu-abu) -->
          <router-link
            v-else
            :to="crumb.path"
            class="ml-1 text-gray-400 transition-colors hover:text-black md:ml-2"
          >
            {{ crumb.label }}
          </router-link>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Fungsi Cerdas: Memecah URL dan mengubahnya menjadi format Breadcrumb
const breadcrumbs = computed(() => {
  // Ambil URL path saat ini, pisahkan dengan garis miring '/'
  const paths = route.path.split("/").filter((p) => p);
  const crumbs = [];
  let currentPath = "";

  paths.forEach((path) => {
    currentPath += `/${path}`;

    // Skip kata 'admin' dan 'dashboard' karena kita sudah menaruhnya sebagai menu Base (Ikon Rumah)
    if (path.toLowerCase() === "admin" || path.toLowerCase() === "dashboard") {
      return;
    }

    // Ubah format tulisan:
    // Misalnya 'product-stocks' menjadi 'Product Stocks'
    // Misalnya 'audit-logs' menjadi 'Audit Logs'
    const label = path
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    crumbs.push({
      label: label,
      path: currentPath,
    });
  });

  return crumbs;
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
