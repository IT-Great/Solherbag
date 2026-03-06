<!-- <template>
  <section class="bg-[#E5E7EB] px-6 py-16 min-h-screen">
    <div class="mx-auto max-w-2xl">
      <h1 class="mb-12 font-serif text-black text-4xl md:text-5xl text-center uppercase tracking-wide">
        Contact Us
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col">
          <label for="name" class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Name</label>
          <input 
            type="text" 
            id="name" 
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="email" class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Email</label>
          <input 
            type="email" 
            id="email" 
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label for="phone" class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Phone</label>
          <input 
            type="tel" 
            id="phone" 
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
          />
        </div>

        <div class="flex flex-col">
          <label for="description" class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Description</label>
          <textarea 
            id="description" 
            rows="8" 
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition resize-none"
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
    <div class="mx-auto max-w-2xl">
      <h1
        class="mb-12 font-serif text-black text-4xl md:text-5xl text-center uppercase tracking-wide"
      >
        Contact Us
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col">
          <label
            class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest"
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
            class="p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest"
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
            class="p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
            required
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest"
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
            class="p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition"
          />
        </div>

        <div class="flex flex-col">
          <label
            class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest"
            >Description</label
          >
          <textarea
            v-model="form.description"
            rows="8"
            class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition resize-none"
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

<template>
  <section class="bg-[#E5E7EB] px-6 py-16 min-h-screen">
    <div class="mx-auto max-w-2xl relative">
      
      <div v-if="isLoggedIn" class="absolute top-0 right-0">
        <button @click="showHistoryModal = true" class="text-xs font-bold uppercase tracking-widest text-black border-b-2 border-black hover:text-gray-600 hover:border-gray-600 transition">
          My Inquiries History
        </button>
      </div>

      <h1 class="mb-12 font-serif text-black text-4xl md:text-5xl text-center uppercase tracking-wide mt-10 md:mt-0">
        Contact Us
      </h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="flex flex-col">
          <label class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Name</label>
          <input v-model="form.name" type="text" :readonly="isLoggedIn" :class="[isLoggedIn ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-black']" class="p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition" required />
        </div>

        <div class="flex flex-col">
          <label class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Email</label>
          <input v-model="form.email" type="email" :readonly="isLoggedIn" :class="[isLoggedIn ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-black']" class="p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition" required />
        </div>

        <div class="flex flex-col">
          <label class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Phone</label>
          <input v-model="form.phone" type="tel" :readonly="isLoggedIn" :class="[isLoggedIn ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-black']" class="p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition" />
        </div>

        <div class="flex flex-col">
          <label class="mb-2 text-gray-600 text-sm text-center uppercase tracking-widest">Description</label>
          <textarea v-model="form.description" rows="8" class="bg-white p-3 border border-gray-400 focus:outline-none focus:ring-1 focus:ring-black w-full transition resize-none" required></textarea>
        </div>

        <div class="flex justify-center mt-8">
          <button type="submit" :disabled="loading" class="bg-[#1A1A1A] hover:bg-black disabled:bg-gray-400 shadow-lg px-12 py-3 font-semibold text-white text-sm uppercase tracking-widest transition-all duration-300">
            {{ loading ? "Sending..." : "Send Message" }}
          </button>
        </div>
      </form>
    </div>

    <div v-if="showHistoryModal" class="z-50 fixed inset-0 flex justify-center items-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
      <div class="relative bg-[#E5E7EB] shadow-2xl p-8 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto flex flex-col">
        <div class="flex justify-between items-center mb-6 border-b border-gray-300 pb-4">
          <h2 class="font-serif text-3xl uppercase tracking-tighter">My Inquiries</h2>
          <button @click="showHistoryModal = false" class="text-3xl text-gray-500 hover:text-black">&times;</button>
        </div>

        <div v-if="isLoadingHistory" class="py-10 text-center animate-pulse text-gray-500 font-bold uppercase tracking-widest text-xs">
          Loading history...
        </div>

        <div v-else-if="histories.length === 0" class="py-20 text-center font-serif italic text-gray-500 text-xl">
          You haven't sent any messages yet.
        </div>

        <div v-else class="space-y-6">
          <div v-for="item in histories" :key="item.id" class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div class="flex justify-between items-start mb-4">
              <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{{ new Date(item.created_at).toLocaleString('id-ID') }}</span>
              <span v-if="!item.response" class="bg-amber-100 text-amber-700 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider">Awaiting Reply</span>
              <span v-else class="bg-green-100 text-green-700 px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider">Answered</span>
            </div>
            
            <p class="text-gray-800 text-sm mb-4">"{{ item.description }}"</p>

            <div class="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <p class="text-[10px] font-bold text-black uppercase tracking-widest mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                solherbag@gmail.com
              </p>
              <p v-if="item.response" class="text-sm text-gray-700 whitespace-pre-wrap">{{ item.response }}</p>
              <p v-else class="text-xs text-gray-400 italic">Admin has not replied yet. Please check back later.</p>
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
</script>