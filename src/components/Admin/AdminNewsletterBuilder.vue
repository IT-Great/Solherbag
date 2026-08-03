<template>
  <div
    class="p-8 mx-auto max-w-5xl bg-white border border-gray-100 shadow-sm rounded-3xl animate-fade-in"
  >
    <div class="mb-8 border-b pb-6">
      <h1 class="text-2xl font-bold text-gray-900">Email Campaign Builder</h1>
      <p class="text-sm text-gray-500 mt-1">
        Buat dan kirimkan newsletter ke seluruh pelanggan aktif.
      </p>
    </div>

    <form @submit.prevent="sendBroadcast" class="space-y-6">
      <!-- Input Subject -->
      <div>
        <label
          class="block mb-2 text-xs font-bold tracking-widest text-gray-700 uppercase"
          >Subjek Email</label
        >
        <input
          v-model="campaign.subject"
          type="text"
          required
          placeholder="Misal: 📢 Diskon Spesial Gajian 50% Menanti Anda!"
          class="w-full px-4 py-3 text-sm transition border border-gray-300 outline-none rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black"
        />
      </div>

      <!-- HTML / Rich Text Editor -->
      <div>
        <label
          class="block mb-2 text-xs font-bold tracking-widest text-gray-700 uppercase"
          >Isi Pesan (Mendukung Tag HTML)</label
        >
        <p class="text-[10px] text-gray-400 mb-2">
          Gunakan tag &lt;h2&gt;, &lt;p&gt;, &lt;br&gt;, atau &lt;b&gt; untuk menebalkan
          teks.
        </p>
        <textarea
          v-model="campaign.content"
          required
          rows="12"
          placeholder="<h2>Halo Sahabat Solher!</h2><p>Bulan ini kami punya promo spesial...</p>"
          class="w-full px-4 py-3 text-sm font-mono transition border border-gray-300 outline-none resize-y rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black"
        ></textarea>
      </div>

      <!-- Preview Box -->
      <div
        v-if="campaign.content"
        class="p-6 mt-4 border border-gray-200 rounded-xl bg-gray-50"
      >
        <h3 class="mb-4 text-xs font-bold tracking-widest text-gray-400 uppercase">
          Preview Tampilan Email
        </h3>
        <div
          class="p-6 bg-white border border-gray-300 rounded-lg shadow-sm"
          v-html="campaign.content"
        ></div>
      </div>

      <!-- Submit Button -->
      <div class="pt-6 mt-8 border-t border-gray-200 flex justify-end">
        <button
          type="submit"
          :disabled="isSending"
          class="flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all bg-black rounded-xl hover:bg-gray-800 disabled:bg-gray-400"
        >
          <svg
            v-if="!isSending"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <div
            v-else
            class="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"
          ></div>
          {{ isSending ? "Memasukkan ke Antrean..." : "Broadcast ke Semua Subscriber" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const isSending = ref(false);
const campaign = ref({
  subject: "",
  content: "",
});

const sendBroadcast = async () => {
  const result = await Swal.fire({
    title: "Kirim Email Massal?",
    text:
      "Pesan ini akan dikirimkan ke seluruh daftar subscriber aktif. Tindakan ini tidak dapat dibatalkan.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya, Kirim Sekarang!",
    cancelButtonText: "Batal",
  });

  if (!result.isConfirmed) return;

  isSending.value = true;
  try {
    const res = await axios.post(
      `${BASE_URL}/admin/newsletters/broadcast`,
      campaign.value,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Antrean Dibuat!",
      text: res.data.message,
      confirmButtonColor: "#000",
    });

    // Reset Form
    campaign.value.subject = "";
    campaign.value.content = "";
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal Broadcast",
      text: error.response?.data?.message || "Terjadi kesalahan sistem",
      confirmButtonColor: "#000",
    });
  } finally {
    isSending.value = false;
  }
};
</script>
