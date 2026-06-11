<template>
  <div class="relative bg-[#F3F4F6] px-6 md:px-12 pt-24 pb-24 min-h-screen">
    <div
      v-if="isLoading"
      class="z-40 fixed inset-0 flex flex-col justify-center items-center bg-[#F3F4F6]/60 backdrop-blur-[2px]"
    >
      <div
        class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"
      ></div>
    </div>

    <div class="mx-auto max-w-7xl">
      <div class="flex items-center gap-4 mb-10">
        <button
          @click="$router.push('/profilepage')"
          class="p-2 transition bg-white rounded-full shadow-sm hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 class="text-3xl font-bold tracking-tight text-black uppercase">
          My Favorites
        </h1>
      </div>

      <div
        v-if="wishlists.length > 0"
        class="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-3 lg:grid-cols-4"
      >
        <div
          v-for="item in wishlists"
          :key="item.id"
          class="relative cursor-pointer group"
          @click="$router.push(`/products/${item.product.slug || item.product.id}`)"
        >
          <div
            class="relative bg-white shadow-sm mb-4 rounded-sm aspect-[4/5] overflow-hidden"
          >
            <img
              :src="item.product.image"
              class="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />

            <button
              @click.stop="toggleWishlist(item.product.id)"
              class="absolute z-20 p-2 text-red-500 transition-transform rounded-full shadow-sm top-2 left-2 bg-white/80 hover:bg-white hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
            </button>

            <div
              v-if="item.product.discount_price"
              class="top-2 right-2 absolute bg-red-600 px-2 py-1 rounded-sm font-bold text-[8px] text-white uppercase tracking-tighter z-20"
            >
              SALE
            </div>
          </div>

          <div class="space-y-2 text-center md:text-left">
            <h3
              class="text-xs font-medium tracking-widest text-gray-900 uppercase truncate md:text-sm"
            >
              {{ item.product.name }}
            </h3>
            <div class="flex items-center justify-center gap-2 md:justify-start">
              <template v-if="item.product.discount_price">
                <p class="text-sm font-bold text-red-600 md:text-base">
                  {{ formatPrice(item.product.discount_price) }}
                </p>
                <p class="text-xs text-gray-400 line-through md:text-sm">
                  {{ formatPrice(item.product.price) }}
                </p>
              </template>
              <p v-else class="text-sm font-semibold text-gray-600 md:text-base">
                {{ formatPrice(item.product.price) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="!isLoading" class="py-24 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-16 h-16 mx-auto mb-4 text-gray-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <p class="mb-4 font-serif text-xl italic text-gray-400">
          Your wishlist is empty.
        </p>
        <button
          @click="$router.push('/collections')"
          class="px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-full hover:bg-gray-800"
        >
          Discover Products
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const wishlists = ref([]);
const isLoading = ref(true);

import { formatPrice } from "../../utils/currency";

const fetchWishlists = async () => {
  isLoading.value = true;
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const res = await axios.get(`${BASE_URL}/wishlists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    wishlists.value = res.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const toggleWishlist = async (productId) => {
  // Optimistic Delete
  wishlists.value = wishlists.value.filter((w) => w.product_id !== productId);
  try {
    await axios.post(
      `${BASE_URL}/wishlists/toggle`,
      { product_id: productId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    window.dispatchEvent(new Event("wishlist-updated"));
  } catch (error) {
    fetchWishlists(); // Rollback jika error
  }
};

// const formatPrice = (value) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(value);

onMounted(fetchWishlists);
</script>
