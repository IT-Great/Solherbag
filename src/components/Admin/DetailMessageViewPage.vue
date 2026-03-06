<template>
  <div v-if="msg" class="max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between mb-4">
      <button @click="$router.back()" class="text-sm font-bold text-gray-500 hover:text-black transition">
        ← Back to Messages
      </button>
    </div>

    <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-2xl">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h2 class="text-2xl font-bold text-gray-900">{{ msg.name }}</h2>
          <p class="text-gray-500">{{ msg.email }} | {{ msg.phone || 'No Phone' }}</p>
        </div>
        <span class="text-xs text-gray-400 font-medium bg-gray-50 px-3 py-1 rounded-full">
          Received: {{ new Date(msg.created_at).toLocaleString('id-ID') }}
        </span>
      </div>

      <div class="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Inquiry Message</p>
        <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">{{ msg.description }}</p>
      </div>
    </div>

    <div class="bg-white shadow-sm p-8 border border-gray-100 rounded-2xl">
      <h3 class="text-lg font-bold mb-4">Admin Response</h3>
      
      <div v-if="msg.response" class="bg-green-50 border border-green-200 p-6 rounded-xl">
        <div class="flex items-center gap-2 mb-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-xs font-bold uppercase tracking-widest text-green-700">Replied from solherbag@gmail.com</span>
        </div>
        <p class="text-gray-800 leading-relaxed whitespace-pre-wrap">{{ msg.response }}</p>
      </div>

      <form v-else @submit.prevent="sendResponse">
        <p class="text-xs text-gray-500 mb-2">Write a response. This will be sent to <strong>{{ msg.email }}</strong> via <em>solherbag@gmail.com</em>.</p>
        <textarea 
          v-model="responseForm" 
          rows="6" 
          class="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 focus:ring-2 focus:ring-black outline-none transition"
          placeholder="Type your response here..."
          required
        ></textarea>
        <div class="mt-4 flex justify-end">
          <button type="submit" :disabled="isSending" class="bg-black hover:bg-gray-800 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition">
            {{ isSending ? 'Sending...' : 'Send Response' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const msg = ref(null);
const responseForm = ref("");
const isSending = ref(false);

const fetchDetail = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/messages/${route.params.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
    });
    msg.value = res.data;
  } catch (error) {
    Swal.fire("Error", "Message not found", "error");
  }
};

const sendResponse = async () => {
  isSending.value = true;
  try {
    await axios.post(`${BASE_URL}/admin/messages/${msg.value.id}/respond`, 
      { response: responseForm.value },
      { headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }}
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