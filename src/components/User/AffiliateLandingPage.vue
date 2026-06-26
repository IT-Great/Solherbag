<!-- <template>
  <div class="min-h-screen font-sans bg-[#FAFAFA] animate-fade-in">
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
  const userData = localStorage.getItem("user");
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
  const token = localStorage.getItem("token");

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
</style> -->

<!-- <template>
  <div class="min-h-screen font-sans bg-[#FAFAFA] animate-fade-in">
    <section
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
    </section>

    <section class="px-6 py-24 mx-auto max-w-7xl">
      <div class="mb-16 text-center">
        <h2 class="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
          Langkah Bergabung
        </h2>
        <div class="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
      </div>

      <div class="grid grid-cols-1 gap-12 md:grid-cols-4">
        <div class="relative flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black group-hover:bg-black group-hover:text-white"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
            Isi Formulir
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            Lengkapi data toko dan estimasi penjualan bulanan Anda melalui formulir
            pendaftaran kami.
          </p>
        </div>

        <div class="relative flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black group-hover:bg-black group-hover:text-white"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
            Proses Kurasi
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            Tim Gycora akan meninjau profil bisnis Anda dalam 1x24 jam kerja untuk
            memastikan standar kemitraan.
          </p>
        </div>

        <div class="relative flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black group-hover:bg-black group-hover:text-white"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
            Akses Terbuka
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            Setelah disetujui, akun Anda otomatis ditingkatkan dan dapat langsung melihat
            Harga Grosir Pabrik.
          </p>
        </div>

        <div class="relative flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black group-hover:bg-black group-hover:text-white"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
            Mulai Berjualan
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            Lakukan pesanan minimal (MOQ) dan nikmati margin keuntungan maksimal untuk
            bisnis Anda.
          </p>
        </div>
      </div>
    </section>

    <section class="py-24 bg-white border-t border-gray-200">
      <div class="max-w-4xl px-6 mx-auto">
        <div class="mb-16 text-center">
          <h2 class="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
            Yang Sering Ditanya Seputar Program Ambassador Solher
          </h2>
          <div class="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl"
          >
            <button
              @click="activeFaq = activeFaq === index ? null : index"
              class="flex items-center justify-between w-full p-6 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <span class="text-sm font-bold text-gray-900">{{ faq.question }}</span>
              <svg
                class="w-5 h-5 text-gray-500 transition-transform duration-300"
                :class="activeFaq === index ? 'rotate-180' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="transition-all duration-300 ease-in-out"
              :class="
                activeFaq === index
                  ? 'max-h-[500px] opacity-100 p-6 bg-white'
                  : 'max-h-0 opacity-0 px-6 py-0'
              "
            >
              <p class="text-sm leading-relaxed text-gray-600">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="px-6 py-24 mx-auto border-t border-gray-200 max-w-7xl">
      <div class="mb-16 text-center">
        <h2 class="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
          Ayo Lihat Testimoni Dari Para Affiliator
        </h2>
        <div class="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div
          v-for="(fb, index) in feedbacks"
          :key="index"
          class="flex flex-col p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl"
        >
          <div class="flex mb-4 text-amber-400">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
          <p class="flex-grow mb-6 text-sm italic leading-relaxed text-gray-600">
            "{{ fb.comment }}"
          </p>
          <div>
            <h4 class="text-sm font-bold text-gray-900">{{ fb.name }}</h4>
            <p class="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">
              {{ fb.platform }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 text-white bg-gray-900 border-t border-gray-800">
      <div class="px-6 mx-auto max-w-7xl">
        <div class="mb-16 text-center">
          <h2 class="font-serif text-3xl font-normal md:text-4xl">
            Keistimewaan Ambassador
          </h2>
          <div class="w-16 h-0.5 mx-auto mt-6 bg-white/50"></div>
        </div>

        <div class="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          <div class="flex flex-col items-center group">
            <div
              class="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white rounded-full group-hover:bg-gray-200"
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
            <h3 class="mb-3 text-lg font-bold tracking-widest uppercase">
              Komisi Kompetitif
            </h3>
            <p class="text-sm leading-relaxed text-gray-400">
              Nikmati persentase komisi yang menguntungkan dari setiap produk yang
              berhasil terjual melalui tautan referal unik Anda.
            </p>
          </div>

          <div class="flex flex-col items-center group">
            <div
              class="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white rounded-full group-hover:bg-gray-200"
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
            <h3 class="mb-3 text-lg font-bold tracking-widest uppercase">
              Akses Eksklusif
            </h3>
            <p class="text-sm leading-relaxed text-gray-400">
              Jadilah yang pertama mengetahui dan mencoba produk terbaru kami sebelum
              diluncurkan secara resmi ke publik.
            </p>
          </div>

          <div class="flex flex-col items-center group">
            <div
              class="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white rounded-full group-hover:bg-gray-200"
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
            <h3 class="mb-3 text-lg font-bold tracking-widest uppercase">
              Dasbor Transparan
            </h3>
            <p class="text-sm leading-relaxed text-gray-400">
              Pantau setiap klik, penjualan, dan pencairan komisi Anda secara real-time
              melalui dasbor afiliasi cerdas kami.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="apply-form" class="px-6 py-24 bg-white border-t border-gray-200">
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
              @click="router.push('/affiliate-demo')"
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
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

const router = useRouter();

const isSubmitting = ref(false);
const alreadyAffiliate = ref(false);
const activeFaq = ref(null);

const formData = ref({
  social_media_url: "",
  reason: "",
});

// --- DATA DUMMY ---
const steps = [
  {
    number: "01",
    title: "Daftar & Lengkapi Profil",
    desc:
      "Isi formulir pendaftaran di bawah ini dengan tautan media sosial dan alasan Anda ingin bergabung.",
  },
  {
    number: "02",
    title: "Proses Kurasi",
    desc:
      "Tim internal Solher akan meninjau profil dan aplikasi Anda dalam waktu 1-2 hari kerja.",
  },
  {
    number: "03",
    title: "Dapatkan Tautan Unik",
    desc:
      "Setelah disetujui, Anda akan mendapatkan akses ke Dasbor Ambassador dan tautan referal khusus.",
  },
  {
    number: "04",
    title: "Raih Komisi",
    desc:
      "Bagikan tautan Anda dan dapatkan komisi kompetitif dari setiap pembelian yang berhasil.",
  },
];

const faqs = [
  {
    question: "Apa saja syarat menjadi Ambassador Solher?",
    answer:
      "Kami mencari individu yang memiliki minat besar pada perawatan rambut dan kecantikan, serta aktif berinteraksi dengan pengikutnya di media sosial (Instagram, TikTok, atau platform lainnya).",
  },
  {
    question: "Bagaimana cara kerja komisi?",
    answer:
      "Setiap pelanggan yang berbelanja melalui tautan unik Anda akan otomatis terekam oleh sistem. Anda akan mendapatkan persentase komisi bersih dari total belanja pelanggan tersebut.",
  },
  {
    question: "Kapan saya bisa menarik komisi?",
    answer:
      "Komisi dapat ditarik kapan saja melalui Dasbor Ambassador Anda setelah mencapai batas minimum penarikan sebesar Rp 50.000.",
  },
];

const feedbacks = [
  {
    name: "Amanda T.",
    platform: "Instagram Creator",
    comment:
      "Menjadi bagian dari Solher adalah keputusan terbaik. Produknya sangat mudah direkomendasikan karena kualitasnya memang luar biasa dan audiens saya sangat menyukainya!",
  },
  {
    name: "Siti Rahma",
    platform: "TikTok Affiliate",
    comment:
      "Dasbornya sangat transparan dan mudah digunakan. Saya bisa memantau klik dan penjualan harian. Pencairan komisi juga sangat cepat dan tanpa ribet.",
  },
  {
    name: "Jessica K.",
    platform: "Beauty Blogger",
    comment:
      "Saya suka bagaimana Solher sangat menghargai ambassador-nya. Komisi kompetitif dan saya selalu mendapat informasi produk lebih awal sebelum rilis resmi.",
  },
];

onMounted(() => {
  const userData = localStorage.getItem("user");
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
  const token = localStorage.getItem("token");

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
        router.push("/login");
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
</style> -->

<template>
  <div class="min-h-screen font-sans bg-[#FAFAFA] animate-fade-in">
    <!-- HERO SECTION -->
    <section
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
          {{ $t('affiliator_user.exclusive_program') }}
        </span>
        <h1
          class="mb-6 font-serif text-4xl font-normal leading-tight text-white md:text-6xl"
        >
          {{ $t('affiliator_user.first_word') }} <span class="italic text-gray-300">{{ $t('affiliator_user.second_word') }}</span>.<br />
          {{ $t('affiliator_user.third_word') }}
        </h1>
        <p
          class="max-w-xl mx-auto mb-10 text-sm leading-relaxed text-gray-400 md:text-base"
        >
          {{ $t('affiliator_user.fourth_word') }}
        </p>
        <button
          @click="scrollToForm"
          class="px-10 py-4 text-xs font-bold tracking-[0.2em] text-black uppercase transition-all duration-500 bg-white rounded-none hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          {{ $t('affiliator_user.register') }}
        </button>
      </div>
    </section>

    <!-- HOW IT WORKS SECTION (DENGAN IKON) -->
    <section class="px-6 py-24 mx-auto max-w-7xl">
      <div class="mb-16 text-center">
        <h2 class="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
          {{ $t('affiliator_user.join_step') }}
        </h2>
        <div class="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
      </div>

      <div class="grid grid-cols-1 gap-12 md:grid-cols-4">
        <!-- Step 1 -->
        <div class="relative flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black group-hover:bg-black group-hover:text-white"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
            {{ $t('affiliator_user.fill_form') }}
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            {{ $t('affiliator_user.shop_data') }}
          </p>
        </div>

        <!-- Step 2 -->
        <div class="relative flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black group-hover:bg-black group-hover:text-white"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
            {{ $t('affiliator_user.process') }}
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            {{ $t('affiliator_user.profile_review') }}
          </p>
        </div>

        <!-- Step 3 -->
        <div class="relative flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black group-hover:bg-black group-hover:text-white"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
            {{ $t('affiliator_user.opened_access') }}
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            {{ $t('affiliator_user.after_accepted') }}
          </p>
        </div>

        <!-- Step 4 -->
        <div class="relative flex flex-col items-center text-center group">
          <div
            class="flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 bg-white border border-gray-200 rounded-full shadow-sm group-hover:border-black group-hover:bg-black group-hover:text-white"
          >
            <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <h3 class="mb-3 text-sm font-bold tracking-widest text-gray-900 uppercase">
            {{ $t('affiliator_user.start_sell') }}
          </h3>
          <p class="text-sm leading-relaxed text-gray-500">
            {{ $t('affiliator_user.do_order') }}
          </p>
        </div>
      </div>
    </section>

    <!-- FAQ SECTION -->
    <section class="py-24 bg-white border-t border-gray-200">
      <div class="max-w-4xl px-6 mx-auto">
        <div class="mb-16 text-center">
          <h2 class="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
            {{ $t('affiliator_user.most_asked') }}
          </h2>
          <div class="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
        </div>

        <div class="space-y-4">
          <div
            v-for="(faq, index) in translatedFaqs"
            :key="index"
            class="overflow-hidden transition-all duration-300 border border-gray-200 rounded-2xl"
          >
            <button
              @click="activeFaq = activeFaq === index ? null : index"
              class="flex items-center justify-between w-full p-6 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none"
            >
              <span class="text-sm font-bold text-gray-900">{{ faq.question }}</span>
              <svg
                class="w-5 h-5 text-gray-500 transition-transform duration-300"
                :class="activeFaq === index ? 'rotate-180' : ''"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              class="transition-all duration-300 ease-in-out"
              :class="
                activeFaq === index
                  ? 'max-h-[500px] opacity-100 p-6 bg-white'
                  : 'max-h-0 opacity-0 px-6 py-0'
              "
            >
              <p class="text-sm leading-relaxed text-gray-600">
                {{ faq.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIAL SECTION -->
    <section class="px-6 py-24 mx-auto border-t border-gray-200 max-w-7xl">
      <div class="mb-16 text-center">
        <h2 class="font-serif text-3xl font-normal text-gray-900 md:text-4xl">
          {{ $t('affiliator_user.testimonial_title') }}
        </h2>
        <div class="w-16 h-0.5 mx-auto mt-6 bg-black"></div>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div
          v-for="(fb, index) in translatedFeedbacks"
          :key="index"
          class="flex flex-col p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-3xl hover:shadow-xl"
        >
          <div class="flex mb-4 text-amber-400">
            <svg v-for="i in 5" :key="i" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
          </div>
          <p class="flex-grow mb-6 text-sm italic leading-relaxed text-gray-600">
            "{{ fb.comment }}"
          </p>
          <div>
            <h4 class="text-sm font-bold text-gray-900">{{ fb.name }}</h4>
            <p class="text-[10px] font-bold tracking-widest text-gray-400 uppercase mt-1">
              {{ fb.platform }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFITS SECTION (Dark Anchor) -->
    <section class="py-24 text-white bg-gray-900 border-t border-gray-800">
      <div class="px-6 mx-auto max-w-7xl">
        <div class="mb-16 text-center">
          <h2 class="font-serif text-3xl font-normal md:text-4xl">
            {{ $t('affiliator_user.benefit_title') }}
          </h2>
          <div class="w-16 h-0.5 mx-auto mt-6 bg-white/50"></div>
        </div>

        <div class="grid grid-cols-1 gap-12 text-center md:grid-cols-3">
          <div class="flex flex-col items-center group">
            <div
              class="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white rounded-full group-hover:bg-gray-200"
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
            <h3 class="mb-3 text-lg font-bold tracking-widest uppercase">
              {{ $t('affiliator_user.benefit_1_title') }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-400">
              {{ $t('affiliator_user.benefit_1_desc') }}
            </p>
          </div>

          <div class="flex flex-col items-center group">
            <div
              class="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white rounded-full group-hover:bg-gray-200"
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
            <h3 class="mb-3 text-lg font-bold tracking-widest uppercase">
              {{ $t('affiliator_user.benefit_2_title') }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-400">
              {{ $t('affiliator_user.benefit_2_desc') }}
            </p>
          </div>

          <div class="flex flex-col items-center group">
            <div
              class="flex items-center justify-center w-20 h-20 mb-6 transition-colors bg-white rounded-full group-hover:bg-gray-200"
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
            <h3 class="mb-3 text-lg font-bold tracking-widest uppercase">
              {{ $t('affiliator_user.benefit_3_title') }}
            </h3>
            <p class="text-sm leading-relaxed text-gray-400">
              {{ $t('affiliator_user.benefit_3_desc') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FORM SECTION -->
    <section id="apply-form" class="px-6 py-24 bg-white border-t border-gray-200">
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
              {{ $t('affiliator_user.already_ambassador') }}
            </h2>
            <p class="mb-8 text-gray-500">
              {{ $t('affiliator_user.already_ambassador_desc') }}
            </p>
            <button
              @click="router.push('/affiliate-demo')"
              class="px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition bg-black hover:bg-gray-800"
            >
              {{ $t('affiliator_user.open_dashboard') }}
            </button>
          </div>

          <form v-else @submit.prevent="submitApplication" class="space-y-8">
            <div class="mb-12 text-center">
              <h2 class="mb-4 font-serif text-3xl text-gray-900">
                {{ $t('affiliator_user.start_journey') }}
              </h2>
              <p class="text-sm text-gray-500">
                {{ $t('affiliator_user.start_journey_desc') }}
              </p>
            </div>

            <div class="space-y-6">
              <div>
                <label
                  class="block mb-2 text-xs font-bold tracking-widest text-gray-700 uppercase"
                  >{{ $t('affiliator_user.social_link_label') }}</label
                >
                <input
                  type="url"
                  v-model="formData.social_media_url"
                  required
                  :placeholder="$t('affiliator_user.social_link_placeholder')"
                  class="w-full px-5 py-4 text-sm placeholder-gray-400 transition-all bg-white border border-gray-300 outline-none rounded-xl focus:ring-1 focus:ring-black focus:border-black"
                />
                <p class="mt-2 text-[10px] text-gray-400">
                  {{ $t('affiliator_user.social_link_hint') }}
                </p>
              </div>

              <div>
                <label
                  class="block mb-2 text-xs font-bold tracking-widest text-gray-700 uppercase"
                  >{{ $t('affiliator_user.reason_label') }}</label
                >
                <textarea
                  v-model="formData.reason"
                  required
                  rows="4"
                  :placeholder="$t('affiliator_user.reason_placeholder')"
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
                <span v-if="!isSubmitting">{{ $t('affiliator_user.submit_btn') }}</span>
                <span v-else class="flex items-center gap-3">
                  <div
                    class="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"
                  ></div>
                  {{ $t('affiliator_user.processing') }}
                </span>
              </button>
              <p
                class="mt-4 text-[10px] text-center text-gray-400 uppercase tracking-widest"
              >
                {{ $t('affiliator_user.review_note') }}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";
import { useI18n } from "vue-i18n"; // Import i18n

const router = useRouter();
const { t } = useI18n(); // Inisialisasi t() dari i18n

const isSubmitting = ref(false);
const alreadyAffiliate = ref(false);
const activeFaq = ref(null);

const formData = ref({
  social_media_url: "",
  reason: "",
});

// Menjadi Computed agar data berubah saat bahasa diubah (Reaktif)
const translatedFaqs = computed(() => [
  {
    question: t('affiliator_user.faq_1_q'),
    answer: t('affiliator_user.faq_1_a'),
  },
  {
    question: t('affiliator_user.faq_2_q'),
    answer: t('affiliator_user.faq_2_a'),
  },
  {
    question: t('affiliator_user.faq_3_q'),
    answer: t('affiliator_user.faq_3_a'),
  },
]);

const translatedFeedbacks = computed(() => [
  {
    name: "Amanda T.",
    platform: "Instagram Creator",
    comment: t('affiliator_user.feedback_1'),
  },
  {
    name: "Siti Rahma",
    platform: "TikTok Affiliate",
    comment: t('affiliator_user.feedback_2'),
  },
  {
    name: "Jessica K.",
    platform: "Beauty Blogger",
    comment: t('affiliator_user.feedback_3'),
  },
]);

onMounted(() => {
  const userData = localStorage.getItem("user");
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
  const token = localStorage.getItem("token");

  if (!token) {
    Swal.fire({
      title: t('affiliator_user.alert_login_title'),
      text: t('affiliator_user.alert_login_text'),
      icon: "info",
      confirmButtonColor: "#000",
      confirmButtonText: t('affiliator_user.btn_to_login'),
      showCancelButton: true,
      cancelButtonText: t('affiliator_user.btn_cancel'),
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/login");
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
      title: t('affiliator_user.alert_success_title'),
      text: res.data.message || t('affiliator_user.alert_success_text'),
      confirmButtonColor: "#000",
    });

    formData.value = { social_media_url: "", reason: "" };
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: t('affiliator_user.alert_error_title'),
      text: error.response?.data?.message || t('affiliator_user.alert_error_text'),
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
