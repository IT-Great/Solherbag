<template>
  <section class="min-h-screen px-6 py-16 bg-[#e9e9e9] md:py-24 relative overflow-hidden">
    <!-- Ornamen Estetik Background -->
    <div class="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-30">
      <div class="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#e0e0e0] rounded-full blur-3xl"></div>
      <div class="absolute -bottom-[20%] -left-[10%] w-[40%] h-[40%] bg-[#e6e6e5] rounded-full blur-3xl"></div>
    </div>

    <!-- Tombol Riwayat -->
    <div class="relative z-10 max-w-7xl mx-auto mb-12">
      <div v-if="isLoggedIn" class="flex justify-end">
        <button
          @click="showHistoryModal = true"
          class="flex items-center gap-2 px-6 py-2.5 text-[10px] font-bold tracking-[0.2em] text-[#8B7355] uppercase transition-all duration-500 bg-transparent border border-[#8B7355] rounded-full hover:bg-[#8B7355] hover:text-white group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {{ $t("contact.history_btn") }}
        </button>
      </div>
    </div>

    <div class="relative z-10 grid max-w-7xl grid-cols-1 gap-16 mx-auto lg:grid-cols-12 items-start">
      
      <!-- 👇 KOLOM KIRI: EDITORIAL TEXT (5 Kolom) 👇 -->
      <div class="flex flex-col space-y-10 lg:col-span-5 lg:sticky lg:top-32">
        <div class="space-y-4">
          <div class="flex items-center gap-4 mb-6">
            <div class="h-px w-8 bg-[#8B7355]"></div>
            <h4 class="text-[9px] font-bold tracking-[0.3em] text-[#8B7355] uppercase">
              {{ $t("contact.concierge") || 'Solhér Concierge' }}
            </h4>
          </div>
          
          <h1 class="font-serif text-5xl leading-[1.1] tracking-tight text-gray-900 md:text-6xl lg:text-7xl">
            {{ $t("contact.title") || 'Let Us Assist You' }}
          </h1>
          
          <p class="pt-4 text-sm font-light leading-loose text-gray-500 md:text-base max-w-md">
            {{ $t("contact.intro_desc") || 'Kami hadir untuk memastikan pengalaman Anda bersama Solhér berjalan sempurna. Setiap detail cerita Anda sangat berarti bagi kami.' }}
          </p>
        </div>

        <div class="pt-8 space-y-8 border-t border-[#E8E2D2]">
          <h3 class="text-[10px] font-bold tracking-widest text-gray-900 uppercase">
            {{ $t("contact.how_can_we_help") || 'Topik Konsultasi' }}
          </h3>

          <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-1">
            <!-- Poin Edukasi 1 -->
            <div class="flex items-start gap-5 group cursor-default">
              <span class="text-xs font-serif italic text-gray-400 mt-1 transition-colors group-hover:text-[#8B7355]">01</span>
              <div>
                <h4 class="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 transition-colors group-hover:text-[#8B7355]">{{ $t("contact.topic_order_title") || 'Pesanan & Pengiriman' }}</h4>
                <p class="text-xs text-gray-500 leading-relaxed font-light">{{ $t("contact.topic_order_desc") || 'Lacak pengiriman, ubah alamat, atau konfirmasi status pembayaran Anda.' }}</p>
              </div>
            </div>

            <!-- Poin Edukasi 2 -->
            <div class="flex items-start gap-5 group cursor-default">
              <span class="text-xs font-serif italic text-gray-400 mt-1 transition-colors group-hover:text-[#8B7355]">02</span>
              <div>
                <h4 class="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 transition-colors group-hover:text-[#8B7355]">{{ $t("contact.topic_product_title") || 'Detail Produk' }}</h4>
                <p class="text-xs text-gray-500 leading-relaxed font-light">{{ $t("contact.topic_product_desc") || 'Informasi mendalam mengenai material kulit, dimensi, dan cara perawatan.' }}</p>
              </div>
            </div>

            <!-- Poin Edukasi 3 -->
            <div class="flex items-start gap-5 group cursor-default">
              <span class="text-xs font-serif italic text-gray-400 mt-1 transition-colors group-hover:text-[#8B7355]">03</span>
              <div>
                <h4 class="text-xs font-bold text-gray-900 uppercase tracking-widest mb-2 transition-colors group-hover:text-[#8B7355]">{{ $t("contact.topic_style_title") || 'Saran Gaya (Styling)' }}</h4>
                <p class="text-xs text-gray-500 leading-relaxed font-light">{{ $t("contact.topic_style_desc") || 'Rekomendasi koleksi terbaik untuk melengkapi penampilan acara spesial Anda.' }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 👆 ============================================================== 👆 -->

      <!-- 👇 KOLOM KANAN: FORMULIR ELEGAN (7 Kolom) 👇 -->
      <div class="lg:col-span-7 lg:pl-12">
        <form
          @submit.prevent="handleSubmit"
          class="relative p-8 space-y-10 bg-white/60 backdrop-blur-xl border border-white/40 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] md:p-14 rounded-3xl"
        >
          <div class="flex items-center justify-between border-b border-[#E8E2D2] pb-6 mb-8">
            <h3 class="text-lg font-serif italic text-gray-900">{{ $t("contact.form_title") || 'Send a Message' }}</h3>
            <span class="inline-flex items-center gap-2 text-[9px] font-bold tracking-widest text-[#8B7355] uppercase">
              <span class="w-1.5 h-1.5 bg-[#8B7355] rounded-full animate-pulse"></span>
              {{ $t("contact.response_time") || 'Replies within 24H' }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <!-- Style Input: Minimalis Underline -->
            <div class="flex flex-col relative">
              <input
                v-model="form.name"
                type="text"
                :readonly="isLoggedIn"
                id="name"
                class="peer pt-4 pb-2 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 text-gray-900 focus:outline-none focus:border-black focus:ring-0 transition-colors disabled:text-gray-400 placeholder-transparent"
                required placeholder="Name"
              />
              <label for="name" class="absolute left-0 top-0 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black">
                {{ $t("contact.name") || 'Full Name' }}
              </label>
            </div>

            <div class="flex flex-col relative">
              <input
                v-model="form.email"
                type="email"
                :readonly="isLoggedIn"
                id="email"
                class="peer pt-4 pb-2 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 text-gray-900 focus:outline-none focus:border-black focus:ring-0 transition-colors disabled:text-gray-400 placeholder-transparent"
                required placeholder="Email"
              />
              <label for="email" class="absolute left-0 top-0 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black">
                {{ $t("contact.email") || 'Email Address' }}
              </label>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            <div class="flex flex-col relative">
              <input
                v-model="form.phone"
                type="tel"
                :readonly="isLoggedIn"
                id="phone"
                class="peer pt-4 pb-2 w-full text-sm bg-transparent border-0 border-b-2 border-gray-200 text-gray-900 focus:outline-none focus:border-black focus:ring-0 transition-colors disabled:text-gray-400 placeholder-transparent"
                placeholder="Phone"
              />
              <label for="phone" class="absolute left-0 top-0 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black">
                {{ $t("contact.phone") || 'Phone Number' }}
              </label>
            </div>

            <!-- Dropdown Minimalis -->
            <div class="flex flex-col">
              <label class="mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{{ $t("contact.inquiry_type") || 'Inquiry Type' }}</label>
              <select
                v-model="form.type"
                required
                class="w-full pb-2 text-sm bg-transparent border-0 border-b-2 border-gray-200 text-gray-900 focus:outline-none focus:border-black focus:ring-0 transition-colors cursor-pointer"
              >
                <option value="" disabled selected>{{ $t("contact.select_topic") || 'Select a topic...' }}</option>
                <option value="Order & Delivery">{{ $t("contact.opt_order") || 'Order & Delivery' }}</option>
                <option value="Product Details">{{ $t("contact.opt_product") || 'Product Details' }}</option>
                <option value="Returns & Refunds">{{ $t("contact.opt_return") || 'Returns & Refunds' }}</option>
                <option value="Partnership">{{ $t("contact.opt_partner") || 'Partnership / Collab' }}</option>
                <option value="Other">{{ $t("contact.opt_other") || 'Other' }}</option>
              </select>
            </div>
          </div>

          <div class="flex flex-col relative pt-4">
            <textarea
              v-model="form.description"
              id="message"
              rows="4"
              class="peer w-full text-sm leading-relaxed bg-transparent border-0 border-b-2 border-gray-200 text-gray-900 focus:outline-none focus:border-black focus:ring-0 transition-colors resize-none placeholder-transparent"
              required
              placeholder="Message"
            ></textarea>
            <label for="message" class="absolute left-0 top-0 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-normal peer-focus:top-0 peer-focus:text-[10px] peer-focus:font-bold peer-focus:text-black">
              {{ $t("contact.description") || 'Your Message' }}
            </label>
          </div>

          <div class="pt-8">
            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-black hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:-translate-y-1 px-8 py-5 font-bold text-white text-[10px] uppercase tracking-[0.25em] transition-all duration-300 flex justify-center items-center gap-3 group"
            >
              <span v-if="loading" class="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
              <span>{{ loading ? $t("contact.sending") : $t("contact.send") || 'Submit Request' }}</span>
              <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal Riwayat Tetap Utuh -->
    <Transition name="fade">
      <div
        v-if="showHistoryModal"
        class="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 bg-black/40 backdrop-blur-md"
      >
        <div
          class="relative flex flex-col w-full max-w-3xl bg-[#FDFBF7] shadow-2xl rounded-2xl max-h-[90vh] md:max-h-[85vh] overflow-hidden transform transition-all"
        >
          <div class="flex items-center justify-between p-6 bg-white border-b border-[#E8E2D2] shrink-0 sm:p-8">
            <h2 class="font-serif text-2xl tracking-tighter text-gray-900 sm:text-3xl">
              {{ $t("contact.history_title") || 'Inquiry History' }}
            </h2>
            <button
              @click="showHistoryModal = false"
              class="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-black focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-4 overflow-y-auto sm:p-8 grow custom-scrollbar">
            <div v-if="isLoadingHistory" class="flex flex-col items-center justify-center py-20">
              <div class="w-10 h-10 border-2 border-gray-200 rounded-full border-t-black animate-spin"></div>
              <p class="mt-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase animate-pulse">
                {{ $t("contact.loading_history") || 'Retrieving records...' }}
              </p>
            </div>

            <div v-else-if="histories.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
              <p class="font-serif text-xl italic text-gray-400 mb-2">
                {{ $t("contact.no_history") || 'No previous inquiries found.' }}
              </p>
              <p class="text-xs text-gray-400">Silakan kirim pesan melalui formulir jika Anda membutuhkan bantuan.</p>
            </div>

            <div v-else class="space-y-6">
              <div v-for="item in histories" :key="item.id" class="p-6 bg-white border border-[#E8E2D2] shadow-sm rounded-xl">
                <div class="flex flex-col items-start justify-between gap-3 mb-5 sm:flex-row sm:items-center sm:gap-0">
                  <span class="text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em]">
                    {{ new Date(item.created_at).toLocaleString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) }}
                  </span>
                  <span
                    :class="item.response ? 'bg-[#111] text-[#D4AF37]' : 'bg-gray-100 text-gray-500'"
                    class="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm"
                  >
                    {{ item.response ? $t("contact.answered") || 'Responded' : $t("contact.awaiting") || 'Awaiting' }}
                  </span>
                </div>

                <div class="mb-6">
                  <p class="text-sm font-light leading-relaxed text-gray-800 whitespace-pre-wrap">
                    "{{ item.description }}"
                  </p>
                </div>

                <div class="p-5 border border-[#E8E2D2] bg-[#FDFBF7] rounded-xl">
                  <p class="text-[9px] font-bold text-[#8B7355] uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span class="w-1.5 h-1.5 bg-[#8B7355] rounded-full"></span>
                    {{ $t("contact.reply_from") || 'Concierge Reply' }}
                  </p>
                  <p v-if="item.response" class="text-sm font-light leading-relaxed text-gray-900 whitespace-pre-wrap">
                    {{ item.response }}
                  </p>
                  <p v-else class="text-xs italic text-gray-400 font-serif">
                    {{ $t("contact.no_reply_yet") || 'Our concierge team is reviewing your message...' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useI18n } from "vue-i18n";

const isLoggedIn = ref(false);
const loading = ref(false);
const form = ref({
  name: "",
  email: "",
  phone: "",
  type: "",
  description: "",
});

const showHistoryModal = ref(false);
const isLoadingHistory = ref(false);
const histories = ref([]);

const { t } = useI18n();

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    isLoggedIn.value = true;
    form.value.name = `${userData.first_name} ${userData.last_name}`;
    form.value.email = userData.email;
    form.value.phone = userData.phone || "";
  }
});

watch(showHistoryModal, async (newVal) => {
  if (newVal && isLoggedIn.value) {
    isLoadingHistory.value = true;
    try {
      const res = await axios.get(`${BASE_URL}/user/contact-history`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      histories.value = res.data;
    } catch (error) {
      console.error(error);
    } finally {
      isLoadingHistory.value = false;
    }
  }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    const payload = {
      ...form.value,
      description: `[Topik: ${form.value.type}]\n\n${form.value.description}`
    };

    await axios.post(`${BASE_URL}/contact`, payload, { headers });

    Swal.fire({
      icon: "success",
      title: t("contact.success_title") || "Message Sent",
      text: t("contact.success_text") || "Thank you. Our concierge will contact you shortly.",
      confirmButtonColor: "#111",
      background: "#FDFBF7",
      customClass: {
        title: "font-serif text-2xl text-gray-900",
        confirmButton: "font-bold tracking-widest uppercase text-xs rounded-none px-8 py-3"
      }
    });

    form.value.description = "";
    form.value.type = "";
    if (!isLoggedIn.value) {
      form.value.name = "";
      form.value.email = "";
      form.value.phone = "";
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to send message. Please try again.";
    Swal.fire({
      icon: "error",
      title: "Connection Error",
      text: errorMessage,
      confirmButtonColor: "#111",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active .transform,
.fade-leave-active .transform {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-enter-from .transform,
.fade-leave-to .transform {
  transform: scale(0.98) translateY(20px);
}
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #E8E2D2;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #8B7355;
}
</style>