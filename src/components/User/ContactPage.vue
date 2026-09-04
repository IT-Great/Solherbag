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

<!-- <template>
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
            :class="[
              isLoggedIn
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-transparent'
                : 'bg-white text-black border-gray-300 hover:border-gray-400',
            ]"
            class="p-3.5 text-sm transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
            placeholder="John Doe"
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
            :class="[
              isLoggedIn
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-transparent'
                : 'bg-white text-black border-gray-300 hover:border-gray-400',
            ]"
            class="p-3.5 text-sm transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
            placeholder="john@example.com"
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
            :class="[
              isLoggedIn
                ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-transparent'
                : 'bg-white text-black border-gray-300 hover:border-gray-400',
            ]"
            class="p-3.5 text-sm transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            placeholder="+62 812 3456 7890"
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
            class="p-3.5 text-sm transition-colors bg-white border border-gray-300 resize-none hover:border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
            :placeholder="$t('contact.placeholder_desc')"
          ></textarea>
        </div>

        <div class="flex justify-center pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full md:w-auto bg-[#1A1A1A] hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed shadow-xl shadow-black/20 hover:shadow-black/40 px-12 py-4 font-bold text-white text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300"
          >
            {{ loading ? $t("contact.sending") : $t("contact.send") }}
          </button>
        </div>
      </form>
    </div>

    <Transition name="fade">
      <div
        v-if="showHistoryModal"
        class="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      >
        <div
          class="relative flex flex-col w-full max-w-3xl bg-[#F9FAFB] shadow-2xl rounded-3xl max-h-[90vh] md:max-h-[85vh] overflow-hidden transform transition-all"
        >
          <div
            class="flex items-center justify-between p-6 bg-white border-b border-gray-200 shrink-0 sm:p-8"
          >
            <h2 class="font-serif text-2xl tracking-tighter uppercase sm:text-3xl">
              {{ $t("contact.history_title") }}
            </h2>
            <button
              @click="showHistoryModal = false"
              class="p-2 text-gray-400 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 hover:text-black focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div class="p-4 overflow-y-auto sm:p-8 grow custom-scrollbar">
            <div
              v-if="isLoadingHistory"
              class="flex flex-col items-center justify-center py-20"
            >
              <div
                class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"
              ></div>
              <p
                class="mt-4 text-xs font-bold tracking-widest text-gray-500 uppercase animate-pulse"
              >
                {{ $t("contact.loading_history") }}
              </p>
            </div>

            <div
              v-else-if="histories.length === 0"
              class="flex flex-col items-center justify-center py-20 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-16 h-16 mb-4 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <p class="font-serif text-xl italic text-gray-500">
                {{ $t("contact.no_history") }}
              </p>
            </div>

            <div v-else class="space-y-6">
              <div
                v-for="item in histories"
                :key="item.id"
                class="p-5 bg-white border border-gray-100 shadow-sm sm:p-6 rounded-2xl"
              >
                <div
                  class="flex flex-col items-start justify-between gap-3 mb-4 sm:flex-row sm:items-center sm:gap-0"
                >
                  <span
                    class="text-[10px] text-gray-400 font-bold uppercase tracking-widest"
                  >
                    {{
                      new Date(item.created_at).toLocaleString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    }}
                  </span>
                  <span
                    :class="
                      item.response
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-amber-100 text-amber-700 border-amber-200'
                    "
                    class="px-2.5 py-1 border rounded-md text-[9px] font-black uppercase tracking-wider shadow-sm"
                  >
                    {{ item.response ? $t("contact.answered") : $t("contact.awaiting") }}
                  </span>
                </div>

                <div class="p-4 mb-4 bg-gray-50 rounded-xl">
                  <p class="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
                    "{{ item.description }}"
                  </p>
                </div>

                <div class="p-4 border border-blue-100 sm:p-5 bg-blue-50/50 rounded-xl">
                  <p
                    class="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-blue-100 pb-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 text-blue-600 shrink-0"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"
                      />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {{ $t("contact.reply_from") }}
                  </p>

                  <p
                    v-if="item.response"
                    class="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap"
                  >
                    {{ item.response }}
                  </p>
                  <p v-else class="text-xs italic text-gray-400">
                    {{ $t("contact.no_reply_yet") }}
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

    await axios.post(`${BASE_URL}/contact`, form.value, { headers });

    Swal.fire({
      icon: "success",
      title: t("contact.success_title"),
      text: t("contact.success_text"),
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
</style> -->

<template>
  <section class="min-h-screen px-6 py-16 bg-[#E5E7EB] md:py-24 relative overflow-hidden">
    <!-- Tombol Riwayat (Dipindah ke atas agar tidak mengganggu layout utama) -->
    <div class="relative z-10 max-w-6xl mx-auto mb-8">
      <div v-if="isLoggedIn" class="flex justify-end">
        <button
          @click="showHistoryModal = true"
          class="flex items-center gap-2 px-6 py-3 text-[10px] font-bold tracking-widest text-black uppercase transition-all duration-300 bg-white border border-gray-200 rounded-full shadow-sm hover:shadow-lg hover:border-black group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-gray-400 transition-colors group-hover:text-black"
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

    <div class="relative z-10 grid max-w-6xl grid-cols-1 gap-12 mx-auto lg:grid-cols-2 lg:gap-24 items-center">
      
      <!-- 👇 KOLOM KIRI: EDUKASI & INFORMASI (MENCEGAH ASAL TANYA) 👇 -->
      <div class="flex flex-col space-y-8 lg:pr-8">
        <div>
          <h4 class="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase mb-4">
            {{ $t("contact.concierge") || 'Solher Care' }}
          </h4>
          <h1 class="font-serif text-4xl leading-tight tracking-wide text-black uppercase md:text-5xl lg:text-6xl">
            {{ $t("contact.title") }}
          </h1>
          <p class="mt-6 text-sm font-light leading-relaxed text-gray-600 md:text-base">
            {{ $t("contact.intro_desc") || 'Kami hadir untuk memberikan pengalaman berbelanja yang sempurna. Silakan hubungi kami untuk mendapatkan panduan eksklusif mengenai produk Solher.' }}
          </p>
        </div>

        <div class="w-16 h-px bg-gray-300"></div>

        <div class="space-y-6">
          <h3 class="text-xs font-bold tracking-widest text-black uppercase">
            {{ $t("contact.how_can_we_help") || 'Apa yang bisa kami bantu?' }}
          </h3>

          <!-- Poin Edukasi 1 -->
          <div class="flex items-start gap-4">
            <div class="flex items-center justify-center shrink-0 w-10 h-10 bg-white rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div>
              <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">{{ $t("contact.topic_order_title") || 'Status Pesanan & Pengiriman' }}</h4>
              <p class="text-xs text-gray-500 leading-relaxed">{{ $t("contact.topic_order_desc") || 'Tanyakan posisi paket Anda, perubahan alamat pengiriman, atau konfirmasi pembayaran.' }}</p>
            </div>
          </div>

          <!-- Poin Edukasi 2 -->
          <div class="flex items-start gap-4">
            <div class="flex items-center justify-center shrink-0 w-10 h-10 bg-white rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">{{ $t("contact.topic_product_title") || 'Detail Material & Produk' }}</h4>
              <p class="text-xs text-gray-500 leading-relaxed">{{ $t("contact.topic_product_desc") || 'Butuh informasi lebih detail tentang jenis kulit, ukuran tas, atau cara perawatannya? Kami siap menjelaskan.' }}</p>
            </div>
          </div>

          <!-- Poin Edukasi 3 -->
          <div class="flex items-start gap-4">
            <div class="flex items-center justify-center shrink-0 w-10 h-10 bg-white rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h4 class="text-xs font-bold text-gray-900 uppercase tracking-wider mb-1">{{ $t("contact.topic_style_title") || 'Saran Gaya (Styling)' }}</h4>
              <p class="text-xs text-gray-500 leading-relaxed">{{ $t("contact.topic_style_desc") || 'Bingung memilih tas untuk acara spesial Anda? Ceritakan kebutuhan Anda, dan kami akan memberikan rekomendasi terbaik.' }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 👆 ============================================================== 👆 -->

      <!-- 👇 KOLOM KANAN: FORMULIR KONTAK 👇 -->
      <form
        @submit.prevent="handleSubmit"
        class="relative p-8 space-y-6 bg-white shadow-2xl md:p-12 rounded-3xl"
      >
        <div class="absolute top-0 right-0 p-6">
          <span class="inline-block px-3 py-1 text-[8px] font-bold tracking-widest text-white uppercase bg-black rounded-full shadow-md animate-pulse">
            {{ $t("contact.response_time") || 'Replies within 24H' }}
          </span>
        </div>

        <h3 class="text-xl font-serif text-black mb-8">{{ $t("contact.form_title") || 'Send a Message' }}</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col">
            <label class="mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{{ $t("contact.name") }}</label>
            <input
              v-model="form.name"
              type="text"
              :readonly="isLoggedIn"
              :class="isLoggedIn ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-transparent' : 'bg-white text-black border-gray-300 hover:border-gray-400'"
              class="p-3.5 text-sm transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required placeholder="John Doe"
            />
          </div>

          <div class="flex flex-col">
            <label class="mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{{ $t("contact.email") }}</label>
            <input
              v-model="form.email"
              type="email"
              :readonly="isLoggedIn"
              :class="isLoggedIn ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-transparent' : 'bg-white text-black border-gray-300 hover:border-gray-400'"
              class="p-3.5 text-sm transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              required placeholder="john@example.com"
            />
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="flex flex-col">
            <label class="mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{{ $t("contact.phone") }}</label>
            <input
              v-model="form.phone"
              type="tel"
              :readonly="isLoggedIn"
              :class="isLoggedIn ? 'bg-gray-50 text-gray-500 cursor-not-allowed border-transparent' : 'bg-white text-black border-gray-300 hover:border-gray-400'"
              class="p-3.5 text-sm transition-colors border rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              placeholder="+62 812 3456 7890"
            />
          </div>

          <!-- 👇 [BARU] DROPDOWN TOPIK (Mencegah pesan ngawur) 👇 -->
          <div class="flex flex-col">
            <label class="mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{{ $t("contact.inquiry_type") || 'Inquiry Type' }}</label>
            <select
              v-model="form.type"
              required
              class="p-3.5 text-sm transition-colors bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent cursor-pointer appearance-none"
            >
              <option value="" disabled selected>{{ $t("contact.select_topic") || 'Select a topic...' }}</option>
              <option value="Order & Delivery">{{ $t("contact.opt_order") || 'Order & Delivery' }}</option>
              <option value="Product Details">{{ $t("contact.opt_product") || 'Product Details' }}</option>
              <option value="Returns & Refunds">{{ $t("contact.opt_return") || 'Returns & Refunds' }}</option>
              <option value="Partnership">{{ $t("contact.opt_partner") || 'Partnership / Collab' }}</option>
              <option value="Other">{{ $t("contact.opt_other") || 'Other' }}</option>
            </select>
          </div>
          <!-- 👆 ================================================= 👆 -->
        </div>

        <div class="flex flex-col">
          <label class="mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">{{ $t("contact.description") }}</label>
          <textarea
            v-model="form.description"
            rows="5"
            class="p-4 text-sm leading-relaxed transition-colors bg-white border border-gray-300 resize-none hover:border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
            required
            :placeholder="$t('contact.placeholder_desc')"
          ></textarea>
        </div>

        <div class="pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#1A1A1A] hover:bg-black disabled:bg-gray-400 disabled:cursor-not-allowed shadow-xl shadow-black/20 hover:shadow-black/40 px-12 py-4 font-bold text-white text-[10px] sm:text-xs uppercase tracking-[0.2em] rounded-xl transition-all duration-300"
          >
            {{ loading ? $t("contact.sending") : $t("contact.send") }}
          </button>
        </div>
      </form>
    </div>

    <!-- Modal Riwayat Tetap Utuh -->
    <Transition name="fade">
      <div
        v-if="showHistoryModal"
        class="fixed inset-0 z-[100] flex justify-center items-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm"
      >
        <div
          class="relative flex flex-col w-full max-w-3xl bg-[#F9FAFB] shadow-2xl rounded-3xl max-h-[90vh] md:max-h-[85vh] overflow-hidden transform transition-all"
        >
          <div class="flex items-center justify-between p-6 bg-white border-b border-gray-200 shrink-0 sm:p-8">
            <h2 class="font-serif text-2xl tracking-tighter uppercase sm:text-3xl">
              {{ $t("contact.history_title") }}
            </h2>
            <button
              @click="showHistoryModal = false"
              class="p-2 text-gray-400 transition-colors bg-gray-100 rounded-full hover:bg-gray-200 hover:text-black focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-4 overflow-y-auto sm:p-8 grow custom-scrollbar">
            <div v-if="isLoadingHistory" class="flex flex-col items-center justify-center py-20">
              <div class="w-10 h-10 border-4 border-gray-200 rounded-full border-t-black animate-spin"></div>
              <p class="mt-4 text-xs font-bold tracking-widest text-gray-500 uppercase animate-pulse">
                {{ $t("contact.loading_history") }}
              </p>
            </div>

            <div v-else-if="histories.length === 0" class="flex flex-col items-center justify-center py-20 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <p class="font-serif text-xl italic text-gray-500">
                {{ $t("contact.no_history") }}
              </p>
            </div>

            <div v-else class="space-y-6">
              <div v-for="item in histories" :key="item.id" class="p-5 bg-white border border-gray-100 shadow-sm sm:p-6 rounded-2xl">
                <div class="flex flex-col items-start justify-between gap-3 mb-4 sm:flex-row sm:items-center sm:gap-0">
                  <span class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    {{ new Date(item.created_at).toLocaleString("id-ID", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }) }}
                  </span>
                  <span
                    :class="item.response ? 'bg-green-100 text-green-700 border-green-200' : 'bg-amber-100 text-amber-700 border-amber-200'"
                    class="px-2.5 py-1 border rounded-md text-[9px] font-black uppercase tracking-wider shadow-sm"
                  >
                    {{ item.response ? $t("contact.answered") : $t("contact.awaiting") }}
                  </span>
                </div>

                <div class="p-4 mb-4 bg-gray-50 rounded-xl">
                  <p class="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap">
                    "{{ item.description }}"
                  </p>
                </div>

                <div class="p-4 border border-blue-100 sm:p-5 bg-blue-50/50 rounded-xl">
                  <p class="text-[10px] font-bold text-gray-800 uppercase tracking-widest mb-3 flex items-center gap-2 border-b border-blue-100 pb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    {{ $t("contact.reply_from") }}
                  </p>
                  <p v-if="item.response" class="text-sm leading-relaxed text-gray-700 whitespace-pre-wrap">
                    {{ item.response }}
                  </p>
                  <p v-else class="text-xs italic text-gray-400">
                    {{ $t("contact.no_reply_yet") }}
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
  type: "", // 👈 State baru untuk jenis pertanyaan
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

    // Kita gabungkan kategori (type) ke dalam teks deskripsi agar backend lama Anda 
    // tidak perlu diubah tabel databasenya.
    const payload = {
      ...form.value,
      description: `[Topik: ${form.value.type}]\n\n${form.value.description}`
    };

    await axios.post(`${BASE_URL}/contact`, payload, { headers });

    Swal.fire({
      icon: "success",
      title: t("contact.success_title"),
      text: t("contact.success_text"),
      confirmButtonColor: "#1A1A1A",
    });

    form.value.description = "";
    form.value.type = ""; // Reset dropdown
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