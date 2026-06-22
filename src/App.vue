<script setup>
// import { useRoute } from "vue-router";
// import Header from "./components/Layout/Header.vue";
// import Footer from "./components/Layout/Footer.vue";

// const route = useRoute();

// import { onMounted } from "vue";
import { watch } from "vue"; // [GANTI: gunakan watch alih-alih onMounted]
import { useRoute } from "vue-router";
import Header from "./components/User/Layout/Header.vue";
import Footer from "./components/User/Layout/Footer.vue";
import Sidebar from "./components/Admin/Layout/Sidebar.vue";
import AdminHeader from "./components/Admin/Layout/AdminHeader.vue";

const route = useRoute();

// onMounted(() => {
//   const urlParams = new URLSearchParams(window.location.search);
//   const refCode = urlParams.get("ref");

//   if (refCode) {
//     // Simpan ke brankas browser. Akan bertahan meskipun user menutup tab.
//     localStorage.setItem("affiliate_ref", refCode);
//   }
// });

// [BARU] Logika pelacak yang 100% responsif terhadap Vue Router
watch(
  () => route.query.ref,
  (newRef) => {
    if (newRef) {
      // Jika mendeteksi ada ?ref= di URL, langsung kunci di brankas browser
      localStorage.setItem("affiliate_ref", newRef);
      console.log("Kode Referal ditangkap:", newRef); // Anda bisa cek di Console nanti
    }
  },
  { immediate: true } // Mengeksekusi pengecekan langsung saat halaman pertama kali dimuat
);
</script>

<template>
  <!-- <div class="flex flex-col bg-[#F3F4F6] min-h-screen">
    <Header v-if="!route.meta.hideHeaderFooter" />

    <main
      class="flex-grow"
      :class="[!route.meta.hideHeaderFooter ? 'pt-20 md:pt-24' : '']"
    >
      <router-view />
    </main>

    <Footer v-if="!route.meta.hideHeaderFooter" />
  </div> -->

  <!-- <div class="flex flex-col bg-[#F3F4F6] min-h-screen">
    <Header v-if="!route.meta.hideHeaderFooter" />

    <div v-if="route.meta.isAdmin" class="flex min-h-screen">
      <Sidebar class="flex-shrink-0 w-64" />

      <main class="flex-grow bg-gray-100 p-8 overflow-y-auto">
        <router-view />
      </main>
    </div>

    <main
      v-else
      class="flex-grow"
      :class="[!route.meta.hideHeaderFooter ? 'pt-20 md:pt-24' : '']"
    >
      <router-view />
    </main>

    <Footer v-if="!route.meta.hideHeaderFooter" />
  </div> -->

  <div class="flex flex-col bg-[#F3F4F6] min-h-screen">
    <Header v-if="!route.meta.hideHeaderFooter" />

    <div v-if="route.meta.isAdmin" class="flex min-h-screen">
      <Sidebar class="flex-shrink-0" />

      <div class="flex flex-col flex-grow min-w-0">
        <AdminHeader />
        <main class="flex-grow bg-gray-100 p-8 overflow-y-auto">
          <router-view />
        </main>
      </div>
    </div>

    <main
      v-else
      class="flex-grow"
      :class="[!route.meta.hideHeaderFooter ? 'pt-20 md:pt-24' : '']"
    >
      <router-view />
    </main>

    <Footer v-if="!route.meta.hideHeaderFooter" />
  </div>
</template>

<style>
/* Reset margin/padding default */
body {
  margin: 0;
  padding: 0;
  font-family: "Inter", sans-serif; /* Pastikan font sesuai keinginan */
}

#app {
  max-width: none !important;
  width: 100%;
}
</style>
