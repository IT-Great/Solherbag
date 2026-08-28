<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white">
    <div class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
    <p class="mt-6 text-sm font-bold tracking-widest text-gray-500 uppercase animate-pulse">
      Menghubungkan Akun Anda...
    </p>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();

onMounted(() => {
  const token = route.query.token;
  const userStr = route.query.user;

  if (token && userStr) {
    try {
      const user = JSON.parse(decodeURIComponent(userStr));
      
      // Simpan ke Local Storage seperti login biasa
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Berhasil masuk dengan Google!",
        timer: 1500,
        showConfirmButton: false,
      });

      // Lempar ke halaman utama
      router.push("/");
    } catch (e) {
      router.push("/login?error=InvalidData");
    }
  } else {
    router.push("/login?error=GoogleAuthFailed");
  }
});
</script>