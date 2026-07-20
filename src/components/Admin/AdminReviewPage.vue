<template>
  <div
    class="relative min-h-[600px] p-8 bg-white border border-gray-100 shadow-sm rounded-2xl animate-fade-in"
  >
    <!-- Header -->
    <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Product Reviews</h1>
        <p class="text-sm text-gray-500">Manage and moderate customer product reviews.</p>
      </div>

      <!-- Search Input -->
      <div class="relative w-full md:w-80">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search product or customer..."
          class="w-full py-2 pl-10 pr-4 text-sm transition border border-gray-200 bg-gray-50 rounded-xl focus:ring-2 focus:ring-black outline-none"
        />
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="text-xs tracking-widest text-gray-400 uppercase border-b">
            <th class="pb-4 pl-2 font-medium">Customer & Product</th>
            <th class="pb-4 font-medium text-center">Rating</th>
            <th class="pb-4 font-medium">Review</th>
            <th class="pb-4 font-medium text-center">Date</th>
            <th class="pb-4 font-medium text-center">Status</th>
            <th class="pb-4 pr-2 font-medium text-right">Action</th>
          </tr>
        </thead>

        <!-- Loading Skeleton -->
        <tbody v-if="isLoading" class="text-gray-600">
          <tr
            v-for="i in 5"
            :key="`skeleton-${i}`"
            class="border-b border-gray-50 animate-pulse"
          >
            <td class="py-6 pl-2"><div class="w-48 h-4 bg-gray-200 rounded"></div></td>
            <td class="py-6"><div class="w-16 h-4 mx-auto bg-gray-200 rounded"></div></td>
            <td class="py-6">
              <div class="w-full max-w-xs h-4 bg-gray-200 rounded"></div>
            </td>
            <td class="py-6"><div class="w-24 h-4 mx-auto bg-gray-200 rounded"></div></td>
            <td class="py-6"><div class="w-16 h-4 mx-auto bg-gray-200 rounded"></div></td>
            <td class="py-6 pr-2">
              <div class="w-16 h-6 ml-auto bg-gray-200 rounded"></div>
            </td>
          </tr>
        </tbody>

        <!-- Data Content -->
        <tbody v-else class="text-gray-600">
          <tr
            v-for="review in filteredReviews"
            :key="review.id"
            class="transition border-b border-gray-50 hover:bg-gray-50"
          >
            <td class="py-4 pl-2">
              <p class="font-bold text-gray-900">
                {{ review.user.first_name }} {{ review.user.last_name }}
              </p>
              <p class="text-xs text-gray-500 uppercase tracking-widest mt-0.5">
                {{ review.product.name }}
              </p>
            </td>

            <td class="py-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <span class="font-bold text-gray-800">{{ review.rating }}</span>
                <svg
                  class="w-4 h-4 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </td>

            <td class="py-4 text-sm max-w-[250px]">
              <p class="truncate">{{ review.comment || "No comment provided." }}</p>
              <div
                v-if="review.images && review.images.length > 0"
                class="flex gap-1 mt-1"
              >
                <div
                  v-for="(img, idx) in review.images.slice(0, 3)"
                  :key="idx"
                  class="w-6 h-6 border rounded overflow-hidden"
                >
                  <img :src="img" class="object-cover w-full h-full" />
                </div>
              </div>
            </td>

            <td class="py-4 text-xs text-center text-gray-400">
              {{ new Date(review.created_at).toLocaleDateString("id-ID") }}
            </td>

            <td class="py-4 text-center">
              <span
                v-if="review.is_approved"
                class="px-3 py-1 text-[10px] font-bold tracking-wider text-green-700 uppercase bg-green-100 rounded-full"
                >Visible</span
              >
              <span
                v-else
                class="px-3 py-1 text-[10px] font-bold tracking-wider text-red-700 uppercase bg-red-100 rounded-full"
                >Hidden</span
              >
            </td>

            <td class="py-4 pr-2 text-right">
              <button
                @click="openDetail(review)"
                class="px-3 py-1.5 text-[10px] font-bold text-black transition border border-gray-300 rounded-lg hover:bg-black hover:text-white"
              >
                Detail
              </button>
            </td>
          </tr>

          <tr v-if="filteredReviews.length === 0">
            <td colspan="6" class="py-12 italic text-center text-gray-400">
              No reviews found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Review Detail Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      @click="showModal = false"
    >
      <div
        class="relative w-full max-w-lg p-8 bg-white shadow-2xl rounded-3xl"
        @click.stop
      >
        <button
          @click="showModal = false"
          class="absolute text-gray-400 top-6 right-6 hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
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

        <h2
          class="pb-4 mb-6 text-xl font-bold tracking-widest text-gray-800 uppercase border-b"
        >
          Review Detail
        </h2>

        <div class="space-y-4">
          <div class="flex gap-4">
            <div class="flex-1">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                Customer
              </p>
              <p class="font-bold text-black">
                {{ selectedReview?.user.first_name }} {{ selectedReview?.user.last_name }}
              </p>
            </div>
            <div class="flex-1">
              <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
                Product
              </p>
              <p class="font-bold text-black">{{ selectedReview?.product.name }}</p>
            </div>
          </div>

          <div>
            <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Rating</p>
            <div class="flex gap-1">
              <svg
                v-for="star in 5"
                :key="star"
                :class="
                  star <= selectedReview?.rating ? 'text-yellow-400' : 'text-gray-200'
                "
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </div>
          </div>

          <div>
            <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">
              Comment
            </p>
            <p class="p-3 text-sm italic bg-gray-50 rounded-xl border border-gray-100">
              "{{ selectedReview?.comment || "No comment provided." }}"
            </p>
          </div>

          <div v-if="selectedReview?.images && selectedReview.images.length > 0">
            <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-2">
              Attached Photos
            </p>
            <div class="flex gap-2 overflow-x-auto">
              <a
                v-for="(img, idx) in selectedReview.images"
                :key="idx"
                :href="img"
                target="_blank"
                class="w-20 h-20 border rounded-xl overflow-hidden hover:opacity-80 transition shrink-0 block"
              >
                <img :src="img" class="object-cover w-full h-full" />
              </a>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
          <button
            @click="toggleVisibility(selectedReview)"
            :disabled="isToggling"
            :class="
              selectedReview?.is_approved
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
                : 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
            "
            class="px-6 py-2 text-sm font-bold transition-colors border rounded-xl flex items-center gap-2"
          >
            <span
              v-if="isToggling"
              class="w-4 h-4 border-2 rounded-full animate-spin border-t-transparent"
            ></span>
            {{ selectedReview?.is_approved ? "Hide Review" : "Show Review" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api.js";

const reviews = ref([]);
const isLoading = ref(true);
const isToggling = ref(false);
const searchQuery = ref("");

const showModal = ref(false);
const selectedReview = ref(null);

const fetchReviews = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/reviews`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    reviews.value = res.data;
  } catch (error) {
    console.error("Gagal menarik data review", error);
  } finally {
    isLoading.value = false;
  }
};

const filteredReviews = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return reviews.value.filter((r) => {
    const custName = `${r.user.first_name} ${r.user.last_name}`.toLowerCase();
    const prodName = r.product.name.toLowerCase();
    return custName.includes(query) || prodName.includes(query);
  });
});

const openDetail = (review) => {
  selectedReview.value = review;
  showModal.value = true;
};

const toggleVisibility = async (review) => {
  isToggling.value = true;
  try {
    const res = await axios.patch(
      `${BASE_URL}/admin/reviews/${review.id}/toggle-visibility`,
      {},
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      }
    );

    // Update local state
    review.is_approved = !review.is_approved;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: res.data.message,
      showConfirmButton: false,
      timer: 2000,
    });
  } catch (error) {
    Swal.fire("Error", "Gagal merubah visibilitas review", "error");
  } finally {
    isToggling.value = false;
  }
};

onMounted(fetchReviews);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
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
