<!-- <template>
  <section class="bg-[#E5E7EB] px-6 py-16 min-h-screen">
    <div class="max-w-2xl mx-auto">
      <h1 class="mb-12 font-serif text-4xl tracking-wide text-center text-black uppercase md:text-5xl">
        Contact Us
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col">
          <label for="name" class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase">Name</label>
          <input 
            type="text" 
            id="name" 
            class="w-full p-3 transition bg-white border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="email" class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase">Email</label>
          <input 
            type="email" 
            id="email" 
            class="w-full p-3 transition bg-white border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="phone" class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            class="w-full p-3 transition bg-white border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div class="flex flex-col">
          <label for="description" class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase">Description</label>
          <textarea 
            id="description" 
            rows="8" 
            class="w-full p-3 transition bg-white border border-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-black"
            required
          ></textarea>
        </div>

        <div class="flex justify-center mt-8">
          <button 
            type="submit" 
            class="bg-[#1A1A1A] hover:bg-black shadow-lg px-12 py-3 font-semibold text-white text-sm uppercase tracking-widest transition-all duration-300"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
const handleSubmit = () => {
  alert("Thank you! Your message has been sent.");
  // Di sini Anda bisa menambahkan logika pengiriman data ke API atau email.
};
</script>

<style scoped>
/* Menambahkan font serif untuk judul agar mirip dengan gambar */
h1 {
  font-family: 'Playfair Display', serif; /* Pastikan font ini diimport atau gunakan font-serif bawaan tailwind */
}
</style> -->

<!-- <template>
  <section class="bg-[#E5E7EB] px-6 py-16 min-h-screen">
    <div class="max-w-2xl mx-auto">
      <h1
        class="mb-12 font-serif text-4xl tracking-wide text-center text-black uppercase md:text-5xl"
      >
        Contact Us
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col">
          <label
            class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase"
            >Name</label
          >
          <input
            v-model="form.name"
            type="text"
            :readonly="isLoggedIn"
            :class="[
              isLoggedIn
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black',
            ]"
            class="w-full p-3 transition border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase"
            >Email</label
          >
          <input
            v-model="form.email"
            type="email"
            :readonly="isLoggedIn"
            :class="[
              isLoggedIn
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black',
            ]"
            class="w-full p-3 transition border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
            required
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase"
            >Phone</label
          >
          <input
            v-model="form.phone"
            type="tel"
            :readonly="isLoggedIn"
            :class="[
              isLoggedIn
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                : 'bg-white text-black',
            ]"
            class="w-full p-3 transition border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="8"
            class="w-full p-3 transition bg-white border border-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-black"
            required
          ></textarea>
        </div>

        <div class="flex justify-center mt-8">
          <button
            type="submit"
            :disabled="loading"
            class="bg-[#1A1A1A] hover:bg-black disabled:bg-gray-400 shadow-lg px-12 py-3 font-semibold text-white text-sm uppercase tracking-widest transition-all duration-300"
          >
            {{ loading ? "Sending..." : "Send Message" }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const isLoggedIn = ref(false);
const loading = ref(false);
const form = ref({
  name: "",
  email: "",
  phone: "",
  description: "",
});

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    const userData = JSON.parse(user);
    isLoggedIn.value = true;
    // Otomatis isi data dari profil user
    form.value.name = `${userData.first_name} ${userData.last_name}`;
    form.value.email = userData.email;
    form.value.phone = userData.phone || "";
  }
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    await axios.post(`${BASE_URL}/contact`, form.value, { headers });

    Swal.fire({
      icon: "success",
      title: "Sent!",
      text: "Thank you! Your message has been sent successfully.",
      confirmButtonColor: "#1A1A1A",
    });

    // Reset hanya deskripsi jika login, reset semua jika guest
    form.value.description = "";
    if (!isLoggedIn.value) {
      form.value.name = "";
      form.value.email = "";
      form.value.phone = "";
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      "Failed to send message. Please try again.";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
      confirmButtonColor: "#1A1A1A",
    });
    // Swal.fire('Error', 'Failed to send message. Please try again.', 'error');
  } finally {
    loading.value = false;
  }
};
</script> -->

<!-- <template>
  <section class="bg-[#E5E7EB] px-6 py-16 min-h-screen">
    <div class="relative max-w-2xl mx-auto">
      
      <div v-if="isLoggedIn" class="absolute top-0 right-0">
        <button @click="showHistoryModal = true" class="text-xs font-bold tracking-widest text-black uppercase transition border-b-2 border-black hover:text-gray-600 hover:border-gray-600">
          My Inquiries History
        </button>
      </div>

      <h1 class="mt-10 mb-12 font-serif text-4xl tracking-wide text-center text-black uppercase md:text-5xl md:mt-0">
        Contact Us
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col">
          <label class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase">Name</label>
          <input v-model="form.name" type="text" :readonly="isLoggedIn" :class="[isLoggedIn ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-black']" class="w-full p-3 transition border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black" required />
        </div>

        <div class="flex flex-col">
          <label class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase">Email</label>
          <input v-model="form.email" type="email" :readonly="isLoggedIn" :class="[isLoggedIn ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-black']" class="w-full p-3 transition border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black" required />
        </div>

        <div class="flex flex-col">
          <label class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase">Phone</label>
          <input v-model="form.phone" type="tel" :readonly="isLoggedIn" :class="[isLoggedIn ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-black']" class="w-full p-3 transition border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black" />
        </div>

        <div class="flex flex-col">
          <label class="mb-2 text-sm tracking-widest text-center text-gray-600 uppercase">Description</label>
          <textarea v-model="form.description" rows="8" class="w-full p-3 transition bg-white border border-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-black" required></textarea>
        </div>

        <div class="flex justify-center mt-8">
          <button type="submit" :disabled="loading" class="bg-[#1A1A1A] hover:bg-black disabled:bg-gray-400 shadow-lg px-12 py-3 font-semibold text-white text-sm uppercase tracking-widest transition-all duration-300">
            {{ loading ? "Sending..." : "Send Message" }}
          </button>
        </div>
      </form>
    </div>

    <div v-if="showHistoryModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/60 backdrop-blur-sm">
      <div class="relative bg-[#E5E7EB] shadow-2xl p-8 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto flex flex-col">
        <div class="flex items-center justify-between pb-4 mb-6 border-b border-gray-300">
          <h2 class="font-serif text-3xl tracking-tighter uppercase">My Inquiries</h2>
          <button @click="showHistoryModal = false" class="text-3xl text-gray-500 hover:text-black">&times;</button>
        </div>

        <div v-if="isLoadingHistory" class="py-10 text-xs font-bold tracking-widest text-center text-gray-500 uppercase animate-pulse">
          Loading history...
        </div>

        <div v-else-if="histories.length === 0" class="py-20 font-serif text-xl italic text-center text-gray-500">
          You haven't sent any messages yet.
        </div>

        <div v-else class="space-y-6">
          <div v-for="item in histories" :key="item.id" class="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div class="flex items-start justify-between mb-4">
              <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ new Date(item.created_at).toLocaleString('id-ID') }}</span>
              <span v-if="!item.response" class="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider">Awaiting Reply</span>
              <span v-else class="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider">Answered</span>
            </div>
            
            <p class="mb-4 text-sm text-gray-800">"{{ item.description }}"</p>

            <div class="p-4 border border-gray-200 bg-gray-50 rounded-xl">
              <p class="text-[10px] font-bold text-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                solherbag@gmail.com
              </p>
              <p v-if="item.response" class="text-sm text-gray-700 whitespace-pre-wrap">{{ item.response }}</p>
              <p v-else class="text-xs italic text-gray-400">Admin has not replied yet. Please check back later.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const isLoggedIn = ref(false);
const loading = ref(false);
const form = ref({
  name: "",
  email: "",
  phone: "",
  description: "",
});

// [BARU] State untuk Modal
const showHistoryModal = ref(false);
const isLoadingHistory = ref(false);
const histories = ref([]);

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

// Watcher untuk mengambil data ketika modal dibuka
watch(showHistoryModal, async (newVal) => {
  if (newVal && isLoggedIn.value) {
    isLoadingHistory.value = true;
    try {
      const res = await axios.get(`${BASE_URL}/user/contact-history`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
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

    await axios.post(`${BASE_URL}/contact`, form.value, { headers });

    Swal.fire({
      icon: "success",
      title: "Sent!",
      text: "Thank you! Your message has been sent successfully.",
      confirmButtonColor: "#1A1A1A",
    });

    form.value.description = "";
    if (!isLoggedIn.value) {
      form.value.name = "";
      form.value.email = "";
      form.value.phone = "";
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Failed to send message. Please try again.";
    Swal.fire({ icon: "error", title: "Error", text: errorMessage, confirmButtonColor: "#1A1A1A" });
  } finally {
    loading.value = false;
  }
};
</script> -->

<template>
  <section class="min-h-screen px-4 py-16 bg-[#E5E7EB] md:px-6 md:py-24">
    <div class="relative max-w-2xl mx-auto">
      <div v-if="isLoggedIn" class="flex justify-end mb-6 md:mb-8">
        <button
          @click="showHistoryModal = true"
          class="flex items-center gap-2 px-5 py-2.5 text-[10px] font-bold tracking-widest text-black uppercase transition-all duration-300 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-md hover:border-black group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-gray-400 transition-colors group-hover:text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {{ $t("contact.history_btn") }}
        </button>
      </div>

      <h1
        class="mb-10 font-serif text-4xl tracking-wide text-center text-black uppercase md:text-5xl md:mb-12"
      >
        {{ $t("contact.title") }}
      </h1>

      <form
        @submit.prevent="handleSubmit"
        class="p-6 space-y-6 bg-white shadow-xl md:p-10 rounded-3xl"
      >
        <div class="flex flex-col">
          <label
            class="mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
            >{{ $t("contact.name") }}</label
          >
          <input
            v-model="form.name"
            type="text"
            :readonly="isLoggedIn"
            :placeholder="$t('contact.placeholder_name')"
            class="p-3.5 text-sm transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
            >{{ $t("contact.email") }}</label
          >
          <input
            v-model="form.email"
            type="email"
            :readonly="isLoggedIn"
            :placeholder="$t('contact.placeholder_email')"
            class="p-3.5 text-sm transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
            >{{ $t("contact.phone") }}</label
          >
          <input
            v-model="form.phone"
            type="tel"
            :readonly="isLoggedIn"
            :placeholder="$t('contact.placeholder_phone')"
            class="p-3.5 text-sm transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest"
            >{{ $t("contact.description") }}</label
          >
          <textarea
            v-model="form.description"
            rows="6"
            :placeholder="$t('contact.placeholder_desc')"
            class="p-3.5 text-sm transition-colors bg-white border border-gray-300 resize-none rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
            required
          ></textarea>
        </div>

        <div class="flex justify-center pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full md:w-auto bg-[#1A1A1A] text-white font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs py-4 px-12 rounded-xl transition-all"
          >
            {{ loading ? $t("contact.sending") : $t("contact.send") }}
          </button>
        </div>
      </form>
    </div>

    <Transition name="fade">
      <div
        v-if="showHistoryModal"
        class="fixed inset-0 z-[100] flex justify-center items-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <div
          class="relative flex flex-col w-full max-w-3xl bg-[#F9FAFB] shadow-2xl rounded-3xl max-h-[90vh] overflow-hidden"
        >
          <div
            class="flex items-center justify-between p-6 bg-white border-b border-gray-200"
          >
            <h2 class="font-serif text-2xl tracking-tighter uppercase">
              {{ $t("contact.history_title") }}
            </h2>
            <button
              @click="showHistoryModal = false"
              class="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              ✕
            </button>
          </div>

          <div class="p-6 overflow-y-auto">
            <div
              v-if="histories.length === 0"
              class="py-20 italic text-center text-gray-500"
            >
              {{ $t("contact.no_history") }}
            </div>
            <div v-else class="space-y-6">
              <div
                v-for="item in histories"
                :key="item.id"
                class="p-5 bg-white border rounded-2xl"
              >
                <div class="flex justify-between mb-4">
                  <span class="text-[10px] text-gray-400 font-bold uppercase">{{
                    new Date(item.created_at).toLocaleDateString()
                  }}</span>
                  <span
                    :class="
                      item.response
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    "
                    class="px-2 py-1 text-[9px] font-black uppercase rounded"
                  >
                    {{ item.response ? $t("contact.answered") : $t("contact.awaiting") }}
                  </span>
                </div>
                <p class="mb-4 text-sm">"{{ item.description }}"</p>
                <div class="p-4 bg-blue-50 rounded-xl">
                  <p class="text-[10px] font-bold text-blue-600 uppercase mb-2">
                    {{ $t("contact.reply_from") }}
                  </p>
                  <p class="text-sm">{{ item.response || $t("contact.no_reply_yet") }}</p>
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

const { t } = useI18n();

const isLoggedIn = ref(false);
const loading = ref(false);
const form = ref({
  name: "",
  email: "",
  phone: "",
  description: "",
});

const showHistoryModal = ref(false);
const isLoadingHistory = ref(false);
const histories = ref([]);

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

    await axios.post(`${BASE_URL}/contact`, form.value, { headers });

    Swal.fire({
      icon: "success",
      title: "Sent!",
      text: "Thank you! Your message has been sent successfully.",
      confirmButtonColor: "#1A1A1A",
    });

    form.value.description = "";
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
      title: "Error",
      text: errorMessage,
      confirmButtonColor: "#1A1A1A",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Animasi Transisi Modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active .transform,
.fade-leave-active .transform {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.fade-enter-from .transform,
.fade-leave-to .transform {
  transform: scale(0.95) translateY(10px);
}

/* Kustomisasi Scrollbar Modal */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>
