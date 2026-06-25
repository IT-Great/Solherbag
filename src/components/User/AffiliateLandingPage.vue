<template>
  <div class="min-h-screen font-sans bg-[#FAFAFA] animate-fade-in">
    <!-- HERO SECTION -->
    <div
      class="relative flex items-center justify-center px-4 py-32 overflow-hidden bg-black md:py-40"
    >
      <div
        class="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2000')] bg-cover bg-center"
      ></div>
      <div
        class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"
      ></div>

      <div class="relative z-10 max-w-3xl text-center">
        <span
          class="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-white uppercase border border-white/30 rounded-full backdrop-blur-sm"
        >
          Exclusive Program
        </span>
        <h1
          class="mb-6 font-serif text-4xl font-normal leading-tight text-white md:text-6xl"
        >
          Menjadi Wajah <span class="italic text-gray-300">Solher</span>.<br />
          Jadilah Ambassador Kami.
        </h1>
        <p
          class="max-w-xl mx-auto mb-10 text-sm leading-relaxed text-gray-400 md:text-base"
        >
          Bagikan rahasia kecantikan dan kesehatan rambut Anda kepada dunia. Bergabunglah
          dengan program afiliasi kami dan dapatkan komisi eksklusif dari setiap pembelian
          yang Anda inspirasi.
        </p>
        <button
          @click="scrollToForm"
          class="px-10 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase transition-all duration-500 bg-white rounded-none hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          Daftar Sekarang
        </button>
      </div>
    </div>

    <!-- BENEFITS SECTION -->
    <div class="px-6 py-24 mx-auto max-w-7xl">
      <div class="mb-16 text-center">
        <h2 class="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
          Keistimewaan Ambassador
        </h2>
        <div class="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
      </div>

      <div class="grid grid-cols-1 gap-12 md:grid-cols-3">
        <div class="flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black"
          >
            <svg
              class="w-8 h-8 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-lg font-bold tracking-widest text-gray-900 uppercase">
            Komisi Kompetitif
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            Nikmati persentase komisi yang menguntungkan dari setiap produk yang berhasil
            terjual melalui tautan referal unik Anda.
          </p>
        </div>

        <div class="flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black"
          >
            <svg
              class="w-8 h-8 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-lg font-bold tracking-widest text-gray-900 uppercase">
            Akses Eksklusif
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            Jadilah yang pertama mengetahui dan mencoba produk terbaru kami sebelum
            diluncurkan secara resmi ke publik.
          </p>
        </div>

        <div class="flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black"
          >
            <svg
              class="w-8 h-8 text-gray-900"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-lg font-bold tracking-widest text-gray-900 uppercase">
            Dasbor Transparan
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            Pantau setiap klik, penjualan, dan pencairan komisi Anda secara real-time
            melalui dasbor afiliasi cerdas kami.
          </p>
        </div>
      </div>
    </div>

    <!-- FORM SECTION -->
    <div id="apply-form" class="px-6 py-24 bg-white border-t border-gray-200">
      <div class="max-w-4xl mx-auto">
        <div class="p-8 border border-gray-100 shadow-2xl md:p-16 rounded-3xl bg-gray-50">
          <div v-if="alreadyAffiliate" class="py-10 text-center">
            <div
              class="flex items-center justify-center w-20 h-20 mx-auto mb-6 bg-black rounded-full"
            >
              <svg
                class="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 class="mb-4 font-serif text-2xl text-gray-900">
              Anda Telah Menjadi Ambassador!
            </h2>
            <p class="mb-8 text-gray-500">
              Akun Anda saat ini sudah terdaftar sebagai Solher Ambassador aktif.
            </p>
            <button
              @click="router.push('/affiliate-dashboard')"
              class="px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition bg-black hover:bg-gray-800"
            >
              Buka Dasbor Saya
            </button>
          </div>

          <form v-else @submit.prevent="submitApplication" class="space-y-8">
            <div class="mb-12 text-center">
              <h2 class="mb-4 font-serif text-3xl text-gray-900">
                Mulai Perjalanan Anda
              </h2>
              <p class="text-sm text-gray-500">
                Ceritakan sedikit tentang Anda dan platform yang Anda gunakan.
              </p>
            </div>

            <div class="space-y-6">
              <div>
                <label
                  class="block mb-2 text-xs font-bold tracking-widest text-gray-700 uppercase"
                  >Tautan Media Sosial Utama</label
                >
                <input
                  type="url"
                  v-model="formData.social_media_url"
                  required
                  placeholder="https://instagram.com/username"
                  class="w-full px-5 py-4 text-sm placeholder-gray-400 transition-all bg-white border border-gray-300 outline-none rounded-xl focus:ring-1 focus:ring-black focus:border-black"
                />
                <p class="mt-2 text-[10px] text-gray-400">
                  Tautan ke profil Instagram, TikTok, YouTube, atau Blog Anda.
                </p>
              </div>

              <div>
                <label
                  class="block mb-2 text-xs font-bold tracking-widest text-gray-700 uppercase"
                  >Mengapa Anda ingin bergabung?</label
                >
                <textarea
                  v-model="formData.reason"
                  required
                  rows="4"
                  placeholder="Ceritakan alasan Anda mencintai produk kami dan bagaimana Anda berencana mempromosikannya..."
                  class="w-full px-5 py-4 text-sm placeholder-gray-400 transition-all bg-white border border-gray-300 outline-none resize-none rounded-xl focus:ring-1 focus:ring-black focus:border-black"
                ></textarea>
              </div>
            </div>

            <div class="pt-6 border-t border-gray-200">
              <button
                type="submit"
                :disabled="isSubmitting"
                class="flex items-center justify-center w-full px-8 py-5 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all bg-black rounded-xl hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <span v-if="!isSubmitting">Kirim Pendaftaran</span>
                <span v-else class="flex items-center gap-3">
                  <div
                    class="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"
                  ></div>
                  Memproses...
                </span>
              </button>
              <p
                class="mt-4 text-[10px] text-center text-gray-400 uppercase tracking-widest"
              >
                Tim kami akan meninjau aplikasi Anda dalam 1-2 hari kerja.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api"; // Sesuaikan path ini

const router = useRouter();

const isSubmitting = ref(false);
const alreadyAffiliate = ref(false);
const formData = ref({
  social_media_url: "",
  reason: "",
});

onMounted(() => {
  // Cek apakah user sudah login dan apakah dia sudah jadi afiliator
  const userData = localStorage.getItem("token");
  if (userData) {
    try {
      const user = JSON.parse(userData);
      if (user.is_affiliate) {
        alreadyAffiliate.value = true;
      }
    } catch (e) {
      console.error("Gagal membaca data user", e);
    }
  }
});

const scrollToForm = () => {
  const formElement = document.getElementById("apply-form");
  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth" });
  }
};

const submitApplication = async () => {
  const token = localStorage.getItem("user_token");

  if (!token) {
    Swal.fire({
      title: "Harap Login",
      text:
        "Anda harus masuk ke akun Anda terlebih dahulu untuk mendaftar sebagai Ambassador.",
      icon: "info",
      confirmButtonColor: "#000",
      confirmButtonText: "Menuju Halaman Login",
      showCancelButton: true,
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/login"); // Sesuaikan rute login Anda (misal /id/login)
      }
    });
    return;
  }

  isSubmitting.value = true;

  try {
    const res = await axios.post(`${BASE_URL}/affiliate/apply`, formData.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    Swal.fire({
      icon: "success",
      title: "Aplikasi Terkirim!",
      text:
        res.data.message ||
        "Aplikasi kemitraan Anda telah berhasil dikirim. Kami akan meninjaunya segera.",
      confirmButtonColor: "#000",
    });

    // Reset Form
    formData.value = { social_media_url: "", reason: "" };
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal Mengirim",
      text:
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengirim pendaftaran. Silakan coba lagi.",
      confirmButtonColor: "#000",
    });
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
