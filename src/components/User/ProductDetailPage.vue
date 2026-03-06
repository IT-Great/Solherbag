<!-- <template>
  <div
    v-if="isLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div
      class="border-4 border-gray-100 border-t-black rounded-full w-12 h-12 animate-spin"
    ></div>
    <p class="mt-4 font-serif text-gray-400 italic animate-pulse">
      Loading Solher piece...
    </p>
  </div>

  <div
    v-else-if="product"
    class="mx-auto px-6 py-12 md:py-24 max-w-7xl animate-fade-in"
  >
    <div class="flex md:flex-row flex-col gap-12 lg:gap-24">
      <div class="w-full md:w-1/2 flex flex-col gap-4 select-none">
        <div class="relative bg-gray-100 aspect-[4/5] overflow-hidden group">
          <div
            class="flex w-full h-full transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
          >
            <template v-for="(media, index) in allMedia" :key="index">
              <div class="w-full h-full flex-shrink-0 relative">
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  class="w-full h-full object-cover main-product-image"
                  alt="Product Image"
                />
                <video
                  v-else-if="media.type === 'video'"
                  :src="media.url"
                  class="w-full h-full object-cover bg-black main-product-image"
                  autoplay
                  loop
                  muted
                  playsinline
                  controls
                ></video>
              </div>
            </template>
          </div>

          <div
            v-if="product.discount_price"
            class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 font-bold text-[10px] uppercase tracking-widest shadow-md z-10"
          >
            SALE
          </div>

          <button
            v-if="allMedia.length > 1"
            @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg text-black z-10"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            v-if="allMedia.length > 1"
            @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg text-black z-10"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10"
            v-if="allMedia.length > 1"
          >
            <button
              v-for="(m, idx) in allMedia"
              :key="idx"
              @click="activeSlide = idx"
              :class="activeSlide === idx ? 'w-6 bg-black' : 'w-2 bg-white/80'"
              class="h-2 rounded-full transition-all duration-300 shadow-sm"
            ></button>
          </div>
        </div>

        <div
          v-if="allMedia.length > 1"
          class="flex gap-3 overflow-x-auto pb-2 custom-scrollbar"
        >
          <div
            v-for="(media, idx) in allMedia"
            :key="idx"
            @click="activeSlide = idx"
            :class="
              activeSlide === idx
                ? 'ring-2 ring-black border-transparent opacity-100'
                : 'border-gray-200 opacity-60 hover:opacity-100'
            "
            class="w-20 h-24 shrink-0 overflow-hidden cursor-pointer border-2 transition-all relative bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 absolute z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-8 w-full md:w-1/2">
        <div class="space-y-4 md:text-left text-center">
          <h1
            class="font-serif text-3xl md:text-5xl uppercase tracking-tighter"
          >
            {{ product.name }}
          </h1>
          <button
            @click="toggleWishlist(product.id)"
            class="p-3 bg-gray-50 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
          >
            <svg
              v-if="isFavorited"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-red-500 transform hover:scale-110 transition-transform"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="none"
            >
              <path
                d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-gray-400 hover:text-red-500 transform hover:scale-110 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
          <div class="flex justify-center md:justify-start items-center gap-4">
            <template v-if="product.discount_price">
              <p class="font-bold text-red-600 text-2xl">
                {{ formatPrice(product.discount_price) }}
              </p>
              <p class="text-gray-400 text-lg line-through">
                {{ formatPrice(product.price) }}
              </p>
              <span
                class="bg-red-100 px-2 py-1 rounded font-bold text-red-600 text-xs"
                >SAVE
                {{
                  calculateDiscount(product.price, product.discount_price)
                }}%</span
              >
            </template>
            <p v-else class="text-gray-600 text-2xl">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <div class="flex sm:flex-row flex-col gap-4 pt-4">
          <button
            @click="handleAction('cart')"
            class="flex-1 hover:bg-black py-4 border-2 border-black font-bold hover:text-white text-xs uppercase tracking-widest transition"
          >
            Add to Cart
          </button>
          <button
            @click="handleAction('buy')"
            class="flex-1 bg-black hover:bg-gray-800 py-4 font-bold text-white text-xs uppercase tracking-widest transition"
          >
            Buy It Now
          </button>
        </div>

        <div class="pt-8 border-gray-200 border-t divide-y divide-gray-200">
          <div
            v-for="section in ['Description', 'Care', 'Design']"
            :key="section"
            class="py-4"
          >
            <button
              @click="
                activeSection = activeSection === section ? null : section
              "
              class="group flex justify-between items-center w-full font-medium text-xs text-left uppercase tracking-widest"
            >
              <span class="group-hover:text-gray-500 transition">{{
                section
              }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap"
              >
                {{
                  product[section.toLowerCase()] || "No information available."
                }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref("Description");
const isLoading = ref(true);

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

// [BARU] Slider State
const activeSlide = ref(0);

// [BARU] Gabungkan media
const allMedia = computed(() => {
  if (!product.value) return [];
  let media = [{ type: "image", url: product.value.image }];

  if (
    product.value.variant_images &&
    Array.isArray(product.value.variant_images)
  ) {
    product.value.variant_images.forEach((img) => {
      media.push({ type: "image", url: img });
    });
  }

  if (product.value.variant_video) {
    media.push({ type: "video", url: product.value.variant_video });
  }

  return media;
});

const currentMediaType = computed(
  () => allMedia.value[activeSlide.value]?.type || "image",
);
const currentMediaUrl = computed(
  () => allMedia.value[activeSlide.value]?.url || "",
);

const nextSlide = () => {
  activeSlide.value =
    activeSlide.value === allMedia.value.length - 1 ? 0 : activeSlide.value + 1;
};

const prevSlide = () => {
  activeSlide.value =
    activeSlide.value === 0 ? allMedia.value.length - 1 : activeSlide.value - 1;
};

const fetchWishlists = async () => {
  if (!isAuthenticated) return;
  try {
    const res = await axios.get(`${BASE_URL}/wishlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    userWishlists.value = res.data.map((w) => w.product_id);
  } catch (error) {}
};

const isFavorited = computed(() => {
  if (!product.value) return false;
  return userWishlists.value.includes(product.value.id);
});

const toggleWishlist = async (productId) => {
  if (!isAuthenticated) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      confirmButtonColor: "#000",
    });
    return;
  }

  if (isFavorited.value) {
    userWishlists.value = userWishlists.value.filter((id) => id !== productId);
  } else {
    userWishlists.value.push(productId);
  }

  try {
    await axios.post(
      `${BASE_URL}/wishlists/toggle`,
      { product_id: productId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    window.dispatchEvent(new Event("wishlist-updated"));
  } catch (error) {
    fetchWishlists();
  }
};

const fetchProductDetail = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
    product.value = res.data;

    fetchWishlists(); // Fetch status favorit

    // TRIGGER TRACKING VIEW
    const event = new CustomEvent("track-view", { detail: res.data });
    window.dispatchEvent(event);
  } catch (error) {
    console.error("Error fetching detail:", error);
    router.push("/catalog");
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 600);
  }
};

// const handleAction = async (type) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     Swal.fire({
//       icon: "info",
//       title: "Login Required",
//       confirmButtonColor: "#000",
//     }).then(() => router.push("/login"));
//     return;
//   }

//   // --- START FLY ANIMATION LOGIC ---
//   if (type === "cart") {
//     // Cari elemen dengan class .main-product-image (bisa img atau video)
//     const productImages = document.querySelectorAll(".main-product-image");
//     const productImage = productImages[activeSlide.value]; // Ambil gambar yang sedang dilihat
//     const cartIcon = document.querySelector(".cart-icon-header");

//     if (productImage && cartIcon) {
//       const imgRect = productImage.getBoundingClientRect();
//       const cartRect = cartIcon.getBoundingClientRect();

//       const flyer = productImage.cloneNode(true);
//       flyer.classList.add("fly-item");

//       Object.assign(flyer.style, {
//         position: "fixed",
//         top: `${imgRect.top}px`,
//         left: `${imgRect.left}px`,
//         width: `${imgRect.width}px`,
//         height: `${imgRect.height}px`,
//         zIndex: "1000",
//         transition: "all 0.8s cubic-bezier(0.42, 0, 0.58, 1)",
//         pointerEvents: "none",
//       });

//       document.body.appendChild(flyer);

//       setTimeout(() => {
//         Object.assign(flyer.style, {
//           top: `${cartRect.top}px`,
//           left: `${cartRect.left}px`,
//           width: "20px",
//           height: "20px",
//           opacity: "0.4",
//           transform: "rotate(720deg)",
//         });
//       }, 10);

//       flyer.addEventListener(
//         "transitionend",
//         () => {
//           flyer.remove();
//           const event = new CustomEvent("optimistic-add-to-cart", {
//             detail: product.value,
//           });
//           window.dispatchEvent(event);
//         },
//         { once: true },
//       );
//     }
//   }
//   // --- END FLY ANIMATION LOGIC ---

//   try {
//     await axios.post(
//       `${BASE_URL}/carts`,
//       { product_id: product.value.id, quantity: 1 },
//       { headers: { Authorization: `Bearer ${token}` } },
//     );
//     if (type === "buy") {
//       Swal.fire({
//         title: "Preparing Order...",
//         allowOutsideClick: false,
//         didOpen: () => {
//           Swal.showLoading();
//         },
//       });
//       const checkoutRes = await axios.post(
//         `${BASE_URL}/checkout`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } },
//       );
//       Swal.close();
//       router.push(`/payment/${checkoutRes.data.transaction_id}`);
//     } else {
//       Swal.fire({
//         title: "Added to Bag",
//         icon: "success",
//         toast: true,
//         position: "top-center",
//         showConfirmButton: false,
//         timer: 2000,
//       });
//       window.dispatchEvent(new Event("refresh-cart"));
//     }
//   } catch (error) {
//     Swal.close();
//     Swal.fire(
//       "Error",
//       error.response?.data?.message || "Action failed",
//       "error",
//     );
//     window.dispatchEvent(new Event("refresh-cart"));
//   }
// };

const handleAction = async (type) => {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      confirmButtonColor: "#000",
    }).then(() => router.push("/login"));
    return;
  }

  // --- START FLY ANIMATION & OPTIMISTIC UI LOGIC ---
  // if (type === "cart") {
  //   // 1. Instan Munculkan Notifikasi
  //   Swal.fire({
  //     title: "Added to Bag",
  //     icon: "success",
  //     toast: true,
  //     position: "top-center",
  //     showConfirmButton: false,
  //     timer: 2000,
  //   });

  //   const productImages = document.querySelectorAll(".main-product-image");
  //   const productImage = productImages[activeSlide.value];
  //   const cartIcon = document.querySelector(".cart-icon-header");

  //   if (productImage && cartIcon) {
  //     const imgRect = productImage.getBoundingClientRect();
  //     const cartRect = cartIcon.getBoundingClientRect();

  //     const flyer = productImage.cloneNode(true);
  //     flyer.classList.add("fly-item");

  //     Object.assign(flyer.style, {
  //       position: "fixed",
  //       top: `${imgRect.top}px`,
  //       left: `${imgRect.left}px`,
  //       width: `${imgRect.width}px`,
  //       height: `${imgRect.height}px`,
  //       zIndex: "1000",
  //       transition: "all 0.8s cubic-bezier(0.42, 0, 0.58, 1)",
  //       pointerEvents: "none",
  //     });

  //     document.body.appendChild(flyer);

  //     setTimeout(() => {
  //       Object.assign(flyer.style, {
  //         top: `${cartRect.top}px`,
  //         left: `${cartRect.left}px`,
  //         width: "20px",
  //         height: "20px",
  //         opacity: "0.4",
  //         transform: "rotate(720deg)",
  //       });
  //     }, 10);

  //     flyer.addEventListener(
  //       "transitionend",
  //       () => {
  //         flyer.remove();
  //         // 2. Dispatch event ini sudah cukup untuk mengupdate UI Header
  //         // tanpa perlu memanggil API cart lagi.
  //         const event = new CustomEvent("optimistic-add-to-cart", {
  //           detail: product.value,
  //         });
  //         window.dispatchEvent(event);
  //       },
  //       { once: true }
  //     );
  //   } else {
  //     // Jika animasi gagal/elemen tidak ditemukan, pastikan UI keranjang tetap terupdate
  //     const event = new CustomEvent("optimistic-add-to-cart", {
  //       detail: product.value,
  //     });
  //     window.dispatchEvent(event);
  //   }
  // }

  // --- START FLY ANIMATION & OPTIMISTIC UI LOGIC ---
  if (type === "cart") {
    // 1. Instan Munculkan Notifikasi
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 2000,
    });

    try {
      // 2. Eksekusi API secara background
      const response = await axios.post(
        `${BASE_URL}/carts`,
        { product_id: product.value.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Ambil ID Cart asli dari database
      const realCartId =
        response.data.id || response.data.cart_id || response.data.data?.id;

      // 3. Jalankan animasi terbang
      const productImages = document.querySelectorAll(".main-product-image");
      const productImage = productImages[activeSlide.value];
      const cartIcon = document.querySelector(".cart-icon-header");

      if (productImage && cartIcon) {
        const imgRect = productImage.getBoundingClientRect();
        const cartRect = cartIcon.getBoundingClientRect();

        const flyer = productImage.cloneNode(true);
        flyer.classList.add("fly-item");

        Object.assign(flyer.style, {
          position: "fixed",
          top: `${imgRect.top}px`,
          left: `${imgRect.left}px`,
          width: `${imgRect.width}px`,
          height: `${imgRect.height}px`,
          zIndex: "1000",
          transition: "all 0.8s cubic-bezier(0.42, 0, 0.58, 1)",
          pointerEvents: "none",
        });

        document.body.appendChild(flyer);

        setTimeout(() => {
          Object.assign(flyer.style, {
            top: `${cartRect.top}px`,
            left: `${cartRect.left}px`,
            width: "20px",
            height: "20px",
            opacity: "0.4",
            transform: "rotate(720deg)",
          });
        }, 10);

        flyer.addEventListener(
          "transitionend",
          () => {
            flyer.remove();
            // [PERBAIKAN] Kirim data produk BESERTA Real Cart ID
            window.dispatchEvent(
              new CustomEvent("optimistic-add-to-cart", {
                detail: { product: product.value, cartId: realCartId },
              }),
            );
          },
          { once: true },
        );
      } else {
        // Jika elemen tidak ditemukan, langsung kirim event
        window.dispatchEvent(
          new CustomEvent("optimistic-add-to-cart", {
            detail: { product: product.value, cartId: realCartId },
          }),
        );
      }
    } catch (error) {
      console.error("Cart add error", error);
      Swal.fire("Error", "Could not add item to bag", "error");
    }
  }
  // --- END FLY ANIMATION LOGIC ---

  try {
    if (type === "buy") {
      Swal.fire({
        title: "Preparing Order...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      // Tambahkan ke keranjang dahulu
      await axios.post(
        `${BASE_URL}/carts`,
        { product_id: product.value.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      // Lalu langsung tembak checkout
      const checkoutRes = await axios.post(
        `${BASE_URL}/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      Swal.close();
      router.push(`/payment/${checkoutRes.data.transaction_id}`);
    } else {
      // Jika type "cart", kita hanya POST API di background (Silent API Call)
      // Tidak ada sweetalert success disini karena sudah dimunculkan secara instan di awal
      await axios.post(
        `${BASE_URL}/carts`,
        { product_id: product.value.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    }
  } catch (error) {
    if (type === "buy") Swal.close();

    Swal.fire(
      "Error",
      error.response?.data?.message || "Action failed",
      "error",
    );

    // Jika API add to cart gagal, kita paksa refresh cart untuk mengembalikan ke state asli (Rollback)
    window.dispatchEvent(new Event("refresh-cart"));
  }
};

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
const calculateDiscount = (price, discountPrice) =>
  Math.round(((price - discountPrice) / price) * 100);

onMounted(fetchProductDetail);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
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
  <div
    v-if="isLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div
      class="border-4 border-gray-100 border-t-black rounded-full w-12 h-12 animate-spin"
    ></div>
    <p class="mt-4 font-serif text-gray-400 italic animate-pulse">
      Loading Solher piece...
    </p>
  </div>

  <div
    v-else-if="product"
    class="mx-auto px-6 py-12 md:py-24 max-w-7xl animate-fade-in"
  >
    <div class="flex md:flex-row flex-col gap-12 lg:gap-24">
      <div class="w-full md:w-1/2 flex flex-col gap-4 select-none">
        <div class="relative bg-gray-100 aspect-[4/5] overflow-hidden group">
          <div
            class="flex w-full h-full transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
          >
            <template v-for="(media, index) in allMedia" :key="index">
              <div class="w-full h-full flex-shrink-0 relative">
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  class="w-full h-full object-cover main-product-image"
                  alt="Product Image"
                />
                <video
                  v-else-if="media.type === 'video'"
                  :src="media.url"
                  class="w-full h-full object-cover bg-black main-product-image"
                  autoplay
                  loop
                  muted
                  playsinline
                  controls
                ></video>
              </div>
            </template>
          </div>

          <div
            v-if="product.discount_price"
            class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 font-bold text-[10px] uppercase tracking-widest shadow-md z-10"
          >
            SALE
          </div>

          <button
            v-if="allMedia.length > 1"
            @click="prevSlide"
            class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg text-black z-10"
          >
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            v-if="allMedia.length > 1"
            @click="nextSlide"
            class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg text-black z-10"
          >
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          <div
            class="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10"
            v-if="allMedia.length > 1"
          >
            <button
              v-for="(m, idx) in allMedia"
              :key="idx"
              @click="activeSlide = idx"
              :class="activeSlide === idx ? 'w-6 bg-black' : 'w-2 bg-white/80'"
              class="h-2 rounded-full transition-all duration-300 shadow-sm"
            ></button>
          </div>
        </div>

        <div
          v-if="allMedia.length > 1"
          class="flex gap-3 overflow-x-auto pb-2 custom-scrollbar"
        >
          <div
            v-for="(media, idx) in allMedia"
            :key="idx"
            @click="activeSlide = idx"
            :class="
              activeSlide === idx
                ? 'ring-2 ring-black border-transparent opacity-100'
                : 'border-gray-200 opacity-60 hover:opacity-100'
            "
            class="w-20 h-24 shrink-0 overflow-hidden cursor-pointer border-2 transition-all relative bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="w-full h-full object-cover"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500 relative"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-8 h-8 absolute z-10"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-8 w-full md:w-1/2">
        <div class="space-y-4 md:text-left text-center">
          <div class="flex justify-center md:justify-between items-start gap-4">
            <h1
              class="font-serif text-3xl md:text-5xl uppercase tracking-tighter"
            >
              {{ product.name }}
            </h1>

            <button
              @click="toggleWishlist(product.id)"
              class="p-3 bg-gray-50 hover:bg-red-50 rounded-full transition-colors flex-shrink-0"
            >
              <svg
                v-if="isFavorited"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-red-500 transform hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="none"
              >
                <path
                  d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-gray-400 hover:text-red-500 transform hover:scale-110 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </button>
          </div>
          <div class="flex justify-center md:justify-start items-center gap-4">
            <template v-if="product.discount_price">
              <p class="font-bold text-red-600 text-2xl">
                {{ formatPrice(product.discount_price) }}
              </p>
              <p class="text-gray-400 text-lg line-through">
                {{ formatPrice(product.price) }}
              </p>
              <span
                class="bg-red-100 px-2 py-1 rounded font-bold text-red-600 text-xs"
                >SAVE
                {{
                  calculateDiscount(product.price, product.discount_price)
                }}%</span
              >
            </template>
            <p v-else class="text-gray-600 text-2xl">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <div class="flex sm:flex-row flex-col gap-4 pt-4">
          <button
            @click="handleAction('cart')"
            class="flex-1 hover:bg-black py-4 border-2 border-black font-bold hover:text-white text-xs uppercase tracking-widest transition"
          >
            Add to Cart
          </button>
          <button
            @click="handleAction('buy')"
            class="flex-1 bg-black hover:bg-gray-800 py-4 font-bold text-white text-xs uppercase tracking-widest transition"
          >
            Buy It Now
          </button>
        </div>

        <div class="pt-8 border-gray-200 border-t divide-y divide-gray-200">
          <div
            v-for="section in ['Description', 'Care', 'Design']"
            :key="section"
            class="py-4"
          >
            <button
              @click="
                activeSection = activeSection === section ? null : section
              "
              class="group flex justify-between items-center w-full font-medium text-xs text-left uppercase tracking-widest"
            >
              <span class="group-hover:text-gray-500 transition">{{
                section
              }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap"
              >
                {{
                  product[section.toLowerCase()] || "No information available."
                }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref("Description");
const isLoading = ref(true);

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const activeSlide = ref(0);

const allMedia = computed(() => {
  if (!product.value) return [];
  let media = [{ type: "image", url: product.value.image }];

  if (
    product.value.variant_images &&
    Array.isArray(product.value.variant_images)
  ) {
    product.value.variant_images.forEach((img) => {
      media.push({ type: "image", url: img });
    });
  }

  if (product.value.variant_video) {
    media.push({ type: "video", url: product.value.variant_video });
  }

  return media;
});

const nextSlide = () => {
  activeSlide.value =
    activeSlide.value === allMedia.value.length - 1 ? 0 : activeSlide.value + 1;
};

const prevSlide = () => {
  activeSlide.value =
    activeSlide.value === 0 ? allMedia.value.length - 1 : activeSlide.value - 1;
};

const fetchWishlists = async () => {
  if (!isAuthenticated) return;
  try {
    const res = await axios.get(`${BASE_URL}/wishlists`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    userWishlists.value = res.data.map((w) => w.product_id);
  } catch (error) {}
};

const isFavorited = computed(() => {
  if (!product.value) return false;
  return userWishlists.value.includes(product.value.id);
});

const toggleWishlist = async (productId) => {
  if (!isAuthenticated) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      confirmButtonColor: "#000",
    });
    return;
  }

  if (isFavorited.value) {
    userWishlists.value = userWishlists.value.filter((id) => id !== productId);
  } else {
    userWishlists.value.push(productId);
  }

  try {
    await axios.post(
      `${BASE_URL}/wishlists/toggle`,
      { product_id: productId },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    window.dispatchEvent(new Event("wishlist-updated"));
  } catch (error) {
    fetchWishlists();
  }
};

// const fetchProductDetail = async () => {
//   isLoading.value = true;
//   try {
//     const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
//     product.value = res.data;

//     fetchWishlists();

//     const event = new CustomEvent("track-view", { detail: res.data });
//     window.dispatchEvent(event);
//   } catch (error) {
//     console.error("Error fetching detail:", error);
//     router.push("/catalog");
//   } finally {
//     setTimeout(() => {
//       isLoading.value = false;
//     }, 600);
//   }
// };

const fetchProductDetail = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
    product.value = res.data;

    fetchWishlists();

    // =======================================================
    // [PERBAIKAN] SIMPAN RECENTLY VIEWED LANGSUNG DI SINI
    // Tidak perlu lagi melempar window.dispatchEvent('track-view')
    // =======================================================
    let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");

    // Hapus jika produk sudah ada di list (agar tidak duplikat)
    list = list.filter((item) => item.id !== product.value.id);

    // Tambahkan produk ini ke urutan teratas
    list.unshift(product.value);

    // Batasi maksimal 6 item sejarah
    list = list.slice(0, 6);

    // Simpan kembali ke localStorage
    localStorage.setItem("recently_viewed", JSON.stringify(list));
  } catch (error) {
    console.error("Error fetching detail:", error);
    router.push("/catalog");
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 600);
  }
};

// [PERBAIKAN] Logika Action (Cart & Buy) Ditingkatkan
// const handleAction = async (type) => {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     Swal.fire({
//       icon: "info",
//       title: "Login Required",
//       confirmButtonColor: "#000",
//     }).then(() => router.push("/login"));
//     return;
//   }

//   if (type === "cart") {
//     // 1. INSTANT FEEDBACK (Tanpa jeda API)
//     Swal.fire({
//       title: "Added to Bag",
//       icon: "success",
//       toast: true,
//       position: "top-center",
//       showConfirmButton: false,
//       timer: 2000,
//     });

//     // 2. INSTANT ANIMATION
//     const productImages = document.querySelectorAll(".main-product-image");
//     const productImage = productImages[activeSlide.value];
//     const cartIcon = document.querySelector(".cart-icon-header");

//     if (productImage && cartIcon) {
//       const imgRect = productImage.getBoundingClientRect();
//       const cartRect = cartIcon.getBoundingClientRect();

//       const flyer = productImage.cloneNode(true);
//       flyer.classList.add("fly-item");

//       Object.assign(flyer.style, {
//         position: "fixed",
//         top: `${imgRect.top}px`,
//         left: `${imgRect.left}px`,
//         width: `${imgRect.width}px`,
//         height: `${imgRect.height}px`,
//         zIndex: "1000",
//         transition: "all 0.8s cubic-bezier(0.42, 0, 0.58, 1)",
//         pointerEvents: "none",
//       });

//       document.body.appendChild(flyer);

//       setTimeout(() => {
//         Object.assign(flyer.style, {
//           top: `${cartRect.top}px`,
//           left: `${cartRect.left}px`,
//           width: "20px",
//           height: "20px",
//           opacity: "0.4",
//           transform: "rotate(720deg)",
//         });
//       }, 10);

//       flyer.addEventListener(
//         "transitionend",
//         () => {
//           flyer.remove();
//           // EMIT EVENT AGAR HEADER MENGURUS API DAN STATE!
//           window.dispatchEvent(
//             new CustomEvent("optimistic-add-to-cart", {
//               detail: product.value,
//             })
//           );
//         },
//         { once: true }
//       );
//     } else {
//       // Jika elemen gambar tidak terdeteksi, tetap jalankan event
//       window.dispatchEvent(
//         new CustomEvent("optimistic-add-to-cart", {
//           detail: product.value,
//         })
//       );
//     }
//     // STOP DISINI. KITA TIDAK MEMANGGIL API /carts DISINI LAGI.
//     // HEADER YANG AKAN MENGURUS API /carts DI BACKGROUND.
//     return;
//   }

//   // LOGIKA "BUY NOW" TETAP SAMA KARENA PINDAH HALAMAN
//   try {
//     if (type === "buy") {
//       Swal.fire({
//         title: "Preparing Order...",
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading(),
//       });

//       await axios.post(
//         `${BASE_URL}/carts`,
//         { product_id: product.value.id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const checkoutRes = await axios.post(
//         `${BASE_URL}/checkout`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       Swal.close();
//       router.push(`/payment/${checkoutRes.data.transaction_id}`);
//     }
//   } catch (error) {
//     Swal.close();
//     Swal.fire("Error", error.response?.data?.message || "Action failed", "error");
//   }
// };

const handleAction = async (type) => {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({
      icon: "info",
      title: "Login Required",
      confirmButtonColor: "#000",
    }).then(() => router.push("/login"));
    return;
  }

  // --- START TRUE OPTIMISTIC UI ---
  if (type === "cart") {
    // 1. INSTAN 0 MILIDETIK: Tampilkan Notifikasi
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 2000,
    });

    // 2. INSTAN: Lempar data ke Header.vue agar Header yang mengurus API
    window.dispatchEvent(
      new CustomEvent("optimistic-add-to-cart", {
        detail: product.value,
      }),
    );

    // 3. Jalankan Animasi Terbang tanpa mengganggu proses data
    const productImages = document.querySelectorAll(".main-product-image");
    const productImage = productImages[activeSlide.value];
    const cartIcon = document.querySelector(".cart-icon-header");

    if (productImage && cartIcon) {
      const imgRect = productImage.getBoundingClientRect();
      const cartRect = cartIcon.getBoundingClientRect();

      const flyer = productImage.cloneNode(true);
      flyer.classList.add("fly-item");

      Object.assign(flyer.style, {
        position: "fixed",
        top: `${imgRect.top}px`,
        left: `${imgRect.left}px`,
        width: `${imgRect.width}px`,
        height: `${imgRect.height}px`,
        zIndex: "9999",
        transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)", // Animasi lebih smooth & cepat
        pointerEvents: "none",
        borderRadius: "10%",
      });

      document.body.appendChild(flyer);

      // Gunakan requestAnimationFrame agar browser tidak nge-lag saat merender
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          Object.assign(flyer.style, {
            top: `${cartRect.top + 10}px`,
            left: `${cartRect.left + 10}px`,
            width: "15px",
            height: "15px",
            opacity: "0.2",
            transform: "scale(0.5) rotate(360deg)",
          });
        });
      });

      flyer.addEventListener("transitionend", () => flyer.remove(), {
        once: true,
      });
    }
    return; // STOP! Biarkan Header yang urus database.
  }

  // --- LOGIKA BUY IT NOW (Tetap sama) ---
  try {
    if (type === "buy") {
      Swal.fire({
        title: "Preparing Order...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      await axios.post(
        `${BASE_URL}/carts`,
        { product_id: product.value.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const checkoutRes = await axios.post(
        `${BASE_URL}/checkout`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );

      Swal.close();
      router.push(`/payment/${checkoutRes.data.transaction_id}`);
    }
  } catch (error) {
    Swal.close();
    Swal.fire(
      "Error",
      error.response?.data?.message || "Action failed",
      "error",
    );
  }
};

const formatPrice = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
const calculateDiscount = (price, discountPrice) =>
  Math.round(((price - discountPrice) / price) * 100);

onMounted(fetchProductDetail);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-scrollbar::-webkit-scrollbar {
  height: 6px;
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
