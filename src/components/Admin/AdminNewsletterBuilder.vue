<!-- <template>
  <div
    class="max-w-5xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-3xl animate-fade-in"
  >
    <div class="pb-6 mb-8 border-b">
      <h1 class="text-2xl font-bold text-gray-900">Email Campaign Builder</h1>
      <p class="mt-1 text-sm text-gray-500">
        Buat dan kirimkan newsletter ke seluruh pelanggan aktif.
      </p>
    </div>

    <form @submit.prevent="sendBroadcast" class="space-y-6">
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
          class="w-full px-4 py-3 font-mono text-sm transition border border-gray-300 outline-none resize-y rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black"
        ></textarea>
      </div>

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

      <div class="flex justify-end pt-6 mt-8 border-t border-gray-200">
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
</script> -->

<template>
  <div class="max-w-6xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-3xl animate-fade-in">
    <div class="pb-6 mb-8 border-b">
      <h1 class="text-2xl font-bold text-gray-900">Visual Email Campaign Builder</h1>
      <p class="mt-1 text-sm text-gray-500">
        Desain email buletin Anda layaknya profesional. Tarik dan lepas (Drag & Drop) elemen ke dalam kanvas.
      </p>
    </div>

    <form @submit.prevent="sendBroadcast" class="space-y-6">
      <!-- Input Subject -->
      <div>
        <label class="block mb-2 text-xs font-bold tracking-widest text-gray-700 uppercase">Subjek Email</label>
        <input
          v-model="campaign.subject"
          type="text"
          required
          placeholder="Misal: 📢 Kejutan Spesial: Diskon 50% Hanya Hari Ini!"
          class="w-full px-4 py-3 text-sm transition border border-gray-300 outline-none rounded-xl bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black"
        />
      </div>

      <!-- DRAG AND DROP EDITOR CONTAINER -->
      <div>
        <label class="block mb-2 text-xs font-bold tracking-widest text-gray-700 uppercase">Desain Email</label>
        <div
          id="email-editor"
          class="w-full border border-gray-300 rounded-xl overflow-hidden min-h-[600px] h-[700px] bg-gray-50"
        ></div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end pt-6 mt-8 border-t border-gray-200">
        <button
          type="submit"
          :disabled="isSending"
          class="flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold tracking-[0.2em] text-white uppercase transition-all bg-black rounded-xl hover:bg-gray-800 disabled:bg-gray-400"
        >
          <svg v-if="!isSending" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <div v-else class="w-5 h-5 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
          {{ isSending ? 'Memproses Antrean...' : 'Broadcast ke Semua Subscriber' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const isSending = ref(false);
const campaign = ref({
  subject: "",
  content: ""
});

// Fungsi untuk memuat script Unlayer secara dinamis (Agar tidak perlu install npm)
const loadUnlayerScript = () => {
  return new Promise((resolve, reject) => {
    if (window.unlayer) return resolve();
    const script = document.createElement("script");
    script.src = "https://editor.unlayer.com/embed.js";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// onMounted(async () => {
//   try {
//     // Tunggu script termuat, lalu inisialisasi Editor
//     await loadUnlayerScript();
//     window.unlayer.init({
//       id: "email-editor",
//       displayMode: "email",
//       appearance: {
//         theme: "light",
//       },
//       // Opsional: Anda bisa memuat template kosong atau default di sini
//     });
//   } catch (error) {
//     console.error("Gagal memuat Email Editor:", error);
//     Swal.fire("Error", "Gagal memuat Visual Editor. Pastikan Anda terhubung ke internet.", "error");
//   }
// });

onMounted(async () => {
  try {
    await loadUnlayerScript();
    
    // 1. Inisialisasi Editor
    window.unlayer.init({
      id: "email-editor",
      displayMode: "email",
      appearance: {
        theme: "light",
      },
    });

    // 👇 [PERBAIKAN FINAL] Daftarkan Callback LANGSUNG setelah init (Hapus event editor:ready) 👇
    window.unlayer.registerCallback('image', function (file, done) {
      // Tangkap file yang di-drag
      const formData = new FormData();
      formData.append('file', file.attachments[0]); 

      // Tembak ke API Upload Laravel
      axios.post(`${BASE_URL}/admin/newsletters/upload-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`
        }
      })
      .then(response => {
        // Beritahu Unlayer bahwa upload 100% sukses dan render URL-nya di kanvas
        done({ progress: 100, url: response.data.url });
      })
      .catch(error => {
        console.error("Gagal Upload:", error);
        Swal.fire("Gagal", "Gagal mengunggah gambar ke server. Pastikan ukuran di bawah 5MB.", "error");
        done({ progress: 100, url: '' }); // Batalkan proses render jika gagal
      });
    });

  } catch (error) {
    console.error("Gagal memuat Email Editor:", error);
    Swal.fire("Error", "Gagal memuat Visual Editor. Pastikan Anda terhubung ke internet.", "error");
  }
});

const sendBroadcast = () => {
  if (!campaign.value.subject) {
    return Swal.fire("Peringatan", "Subjek email tidak boleh kosong!", "warning");
  }

  // 1. Ekstrak kode HTML yang sudah jadi dari Unlayer Editor
  window.unlayer.exportHtml(async (data) => {
    const htmlCode = data.html;

    if (!htmlCode || htmlCode.trim() === "") {
      return Swal.fire("Peringatan", "Desain email Anda masih kosong!", "warning");
    }

    campaign.value.content = htmlCode;

    // 2. Konfirmasi Pengiriman ke Admin
    const result = await Swal.fire({
      title: "Kirim Email Massal?",
      text: "Newsletter ini akan dimasukkan ke antrean dan dikirimkan ke seluruh pelanggan aktif.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Broadcast Sekarang!",
      cancelButtonText: "Batal"
    });

    if (!result.isConfirmed) return;

    // 3. Kirim Payload ke API Laravel
    isSending.value = true;
    try {
      const res = await axios.post(`${BASE_URL}/admin/newsletters/broadcast`, campaign.value, {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
      });

      Swal.fire({
        icon: "success",
        title: "Antrean Dibuat!",
        text: res.data.message,
        confirmButtonColor: "#000",
      });

      // Reset input subjek setelah berhasil
      campaign.value.subject = "";
      
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
  });
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
