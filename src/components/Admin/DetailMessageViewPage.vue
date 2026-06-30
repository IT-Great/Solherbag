<!-- 
<template>
  <div v-if="msg" class="max-w-4xl mx-auto space-y-6">
    <Breadcrumb />
    <div class="flex items-center justify-between mb-4">
      <button
        @click="$router.back()"
        class="text-sm font-bold text-gray-500 transition hover:text-black"
      >
        ← Back to Messages
      </button>
    </div>

    <div class="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <div class="flex items-start justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ msg.name }}</h2>
          <p class="text-gray-500">{{ msg.email }} | {{ msg.phone || "No Phone" }}</p>
        </div>
        <span class="px-3 py-1 text-xs font-medium text-gray-400 rounded-full bg-gray-50">
          Received: {{ new Date(msg.created_at).toLocaleString("id-ID") }}
        </span>
      </div>

      <div class="p-6 border border-gray-200 bg-gray-50 rounded-xl">
        <p class="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
          Inquiry Message
        </p>
        <p class="leading-relaxed text-gray-800 whitespace-pre-wrap">
          {{ msg.description }}
        </p>
      </div>
    </div>

    <div class="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <h3 class="mb-4 text-lg font-bold">Admin Response</h3>

      <div v-if="msg.response" class="p-6 border border-green-200 bg-green-50 rounded-xl">
        <div class="flex items-center gap-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-xs font-bold tracking-widest text-green-700 uppercase"
            >Replied from solherbag@gmail.com</span
          >
        </div>
        <p class="leading-relaxed text-gray-800 whitespace-pre-wrap">
          {{ msg.response }}
        </p>
      </div>

      <form v-else @submit.prevent="sendResponse">
        <p class="mb-2 text-xs text-gray-500">
          Write a response. This will be sent to <strong>{{ msg.email }}</strong> via
          <em>solherbag@gmail.com</em>.
        </p>
        <textarea
          v-model="responseForm"
          rows="6"
          class="w-full p-4 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
          placeholder="Type your response here..."
          required
        ></textarea>
        <div class="flex justify-end mt-4">
          <button
            type="submit"
            :disabled="isSending"
            class="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition bg-black hover:bg-gray-800 disabled:bg-gray-400 rounded-xl"
          >
            {{ isSending ? "Sending..." : "Send Response" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const route = useRoute();
const msg = ref(null);
const responseForm = ref("");
const isSending = ref(false);

const fetchDetail = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/messages/${route.params.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    msg.value = res.data;
  } catch (error) {
    Swal.fire("Error", "Message not found", "error");
  }
};

const sendResponse = async () => {
  isSending.value = true;
  try {
    await axios.post(
      `${BASE_URL}/admin/messages/${msg.value.id}/respond`,
      { response: responseForm.value },
      { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } }
    );
    Swal.fire("Success", "Response sent to user's email!", "success");
    fetchDetail(); // Refresh data untuk menampilkan status Replied
  } catch (error) {
    Swal.fire("Error", "Failed to send response", "error");
  } finally {
    isSending.value = false;
  }
};

onMounted(fetchDetail);
</script>
-->

<template>
  <div v-if="msg" class="max-w-4xl mx-auto space-y-6">
    <Breadcrumb />
    <div class="flex items-center justify-between mb-4">
      <button
        @click="$router.back()"
        class="text-sm font-bold text-gray-500 transition hover:text-black"
      >
        ← Back to Messages
      </button>
    </div>

    <!-- Info Pesan Masuk (Read-Only) -->
    <div class="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <div class="flex items-start justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ msg.name }}</h2>
          <p class="text-gray-500">{{ msg.email }} | {{ msg.phone || "No Phone" }}</p>
        </div>
        <span class="px-3 py-1 text-xs font-medium text-gray-400 bg-gray-50 rounded-full">
          Received: {{ new Date(msg.created_at).toLocaleString("id-ID") }}
        </span>
      </div>

      <div class="p-6 border border-gray-200 bg-gray-50 rounded-xl">
        <p class="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
          Inquiry Message
        </p>
        <p class="leading-relaxed text-gray-800 whitespace-pre-wrap">
          {{ msg.description }}
        </p>
      </div>
    </div>

    <!-- Bagian Respons Admin -->
    <div class="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
      <h3 class="mb-4 text-lg font-bold">Admin Response</h3>

      <!-- Jika Sudah Dibalas -->
      <div v-if="msg.response" class="p-6 border border-green-200 bg-green-50 rounded-xl">
        <div class="flex items-center gap-2 mb-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5 text-green-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-xs font-bold tracking-widest text-green-700 uppercase"
            >Replied</span
          >
        </div>
        <p class="leading-relaxed text-gray-800 whitespace-pre-wrap">
          {{ msg.response }}
        </p>
      </div>

      <!-- Form Balas Pesan (Dilindungi Policy 'Update') -->
      <template v-else>
        <form v-if="canUpdate || isSuperAdmin" @submit.prevent="sendResponse">
          <p class="mb-2 text-xs text-gray-500">
            Write a response. This will be sent to <strong>{{ msg.email }}</strong
            >.
          </p>
          <textarea
            v-model="responseForm"
            rows="6"
            class="w-full p-4 transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
            placeholder="Type your response here..."
            required
          ></textarea>
          <div class="flex justify-end mt-4">
            <button
              type="submit"
              :disabled="isSending"
              class="px-8 py-3 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-xl hover:bg-gray-800 disabled:bg-gray-400"
            >
              {{ isSending ? "Sending..." : "Send Response" }}
            </button>
          </div>
        </form>

        <!-- Pesan jika tidak punya izin Update -->
        <div v-else class="p-6 text-center border border-gray-100 bg-gray-50 rounded-xl">
          <p class="text-sm font-medium text-gray-500">
            Anda tidak memiliki izin (Update) untuk membalas pesan ini. Hubungi
            Superadmin.
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const route = useRoute();
const msg = ref(null);
const responseForm = ref("");
const isSending = ref(false);

// --- STATE PERMISSIONS ---
const userRole = ref("");
const isSuperAdmin = computed(() => userRole.value === "superadmin");
const myPermissions = ref({ update: false });
const canUpdate = computed(() => myPermissions.value.update);

// Fetch Permissions
const fetchUserPermissions = async () => {
  const adminStr = localStorage.getItem("admin");
  if (adminStr) {
    const admin = JSON.parse(adminStr);
    userRole.value = admin.usertype;
  }
  if (isSuperAdmin.value) return;

  try {
    const cachedPerms = localStorage.getItem("admin_permissions");
    const policies = cachedPerms
      ? JSON.parse(cachedPerms)
      : (
          await axios.get(`${BASE_URL}/admin/access-policies`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
          })
        ).data.permissions;

    const msgTerms = policies[userRole.value]?.messages || [];
    myPermissions.value = {
      update: msgTerms.includes("update"),
    };
  } catch (error) {
    console.error("Gagal mengambil kebijakan akses", error);
  }
};

// Fetch Detail Pesan
const fetchDetail = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/messages/${route.params.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    msg.value = res.data;
  } catch (error) {
    Swal.fire("Error", "Message not found", "error");
  }
};

// Eksekusi Balas Pesan
const sendResponse = async () => {
  isSending.value = true;
  try {
    await axios.post(
      `${BASE_URL}/admin/messages/${msg.value.id}/respond`,
      { response: responseForm.value },
      { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } }
    );
    Swal.fire("Success", "Response sent to user's email!", "success");
    fetchDetail(); // Refresh data untuk menampilkan status Replied
  } catch (error) {
    Swal.fire("Error", "Failed to send response", "error");
  } finally {
    isSending.value = false;
  }
};

onMounted(() => {
  fetchUserPermissions().then(() => {
    fetchDetail();
  });
});
</script>
