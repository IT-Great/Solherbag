<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
  >
    <div class="bg-white rounded-3xl p-6 w-full max-w-lg">
      <h2 class="text-xl font-bold mb-4 font-serif">Tulis Ulasan Anda</h2>

      <form @submit.prevent="submitReview">
        <!-- 1. Star Rating UI -->
        <div class="mb-6 flex justify-center gap-2">
          <svg
            v-for="star in 5"
            :key="star"
            @click="form.rating = star"
            @mouseover="hoverRating = star"
            @mouseleave="hoverRating = 0"
            :class="
              (hoverRating || form.rating) >= star ? 'text-yellow-400' : 'text-gray-300'
            "
            class="w-10 h-10 cursor-pointer transition-colors"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </div>

        <!-- 2. Teks Komentar -->
        <div class="mb-4">
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2"
            >Pengalaman Anda</label
          >
          <textarea
            v-model="form.comment"
            rows="4"
            class="w-full border border-gray-200 rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-black"
            placeholder="Ceritakan bagaimana kualitas dan pengiriman barang ini..."
          ></textarea>
        </div>

        <!-- 3. Upload Foto -->
        <div class="mb-6">
          <label
            class="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2"
            >Upload Foto (Maks 3)</label
          >
          <input
            type="file"
            multiple
            accept="image/*"
            @change="handleFileUpload"
            class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-gray-50 file:text-black hover:file:bg-gray-100"
          />
          <!-- Image Previews -->
          <div class="flex gap-2 mt-3" v-if="imagePreviews.length > 0">
            <div
              v-for="(preview, index) in imagePreviews"
              :key="index"
              class="relative w-16 h-16 rounded-xl overflow-hidden border"
            >
              <img :src="preview" class="object-cover w-full h-full" />
              <button
                @click.prevent="removeImage(index)"
                class="absolute top-0 right-0 bg-red-500 text-white rounded-bl-xl w-5 h-5 flex items-center justify-center text-[10px]"
              >
                x
              </button>
            </div>
          </div>
        </div>

        <!-- 4. Tombol -->
        <div class="flex justify-end gap-3 pt-4 border-t">
          <button
            type="button"
            @click="closeModal"
            class="px-5 py-2 text-sm font-bold text-gray-500 hover:bg-gray-100 rounded-xl"
          >
            Batal
          </button>
          <button
            type="submit"
            :disabled="isSubmitting || form.rating === 0"
            class="px-5 py-2 text-sm font-bold text-white bg-black hover:bg-gray-800 disabled:bg-gray-300 rounded-xl flex items-center gap-2"
          >
            <span
              v-if="isSubmitting"
              class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
            ></span>
            Kirim Ulasan
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api.js";

const props = defineProps(["transactionId", "productId"]);
const emit = defineEmits(["close", "success"]);

const isOpen = ref(true);
const isSubmitting = ref(false);
const hoverRating = ref(0);

const form = ref({
  rating: 0,
  comment: "",
});

const files = ref([]);
const imagePreviews = ref([]);

const handleFileUpload = (event) => {
  const selectedFiles = Array.from(event.target.files);
  if (files.value.length + selectedFiles.length > 3) {
    Swal.fire("Peringatan", "Maksimal hanya 3 foto.", "warning");
    return;
  }

  selectedFiles.forEach((file) => {
    files.value.push(file);
    const reader = new FileReader();
    reader.onload = (e) => imagePreviews.value.push(e.target.result);
    reader.readAsDataURL(file);
  });
};

const removeImage = (index) => {
  files.value.splice(index, 1);
  imagePreviews.value.splice(index, 1);
};

const submitReview = async () => {
  isSubmitting.value = true;

  // Wajib pakai FormData untuk upload file di Axios
  const formData = new FormData();
  formData.append("transaction_id", props.transactionId);
  formData.append("product_id", props.productId);
  formData.append("rating", form.value.rating);
  if (form.value.comment) formData.append("comment", form.value.comment);

  files.value.forEach((file) => {
    formData.append("images[]", file);
  });

  try {
    const token = localStorage.getItem("token");
    await axios.post(`${BASE_URL}/reviews`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data", // Penting!
      },
    });

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Ulasan berhasil dikirim!",
      showConfirmButton: false,
      timer: 2000,
    });
    emit("success");
    closeModal();
  } catch (error) {
    Swal.fire("Error", error.response?.data?.message || "Gagal mengirim ulasan", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const closeModal = () => {
  isOpen.value = false;
  emit("close");
};
</script>
