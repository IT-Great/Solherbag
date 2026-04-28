<!-- <template>
  <div
    v-if="isLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div
      class="w-12 h-12 border-4 border-gray-100 rounded-full border-t-black animate-spin"
    ></div>
    <p class="mt-4 font-serif italic text-gray-400 animate-pulse">
      Loading Solher piece...
    </p>
  </div>

  <div
    v-else-if="product"
    class="px-6 py-12 mx-auto md:py-24 max-w-7xl animate-fade-in"
  >
    <div class="flex flex-col gap-12 md:flex-row lg:gap-24">
      <div class="flex flex-col w-full gap-4 select-none md:w-1/2">
        <div class="relative bg-gray-100 aspect-[4/5] overflow-hidden group">
          <div
            class="flex w-full h-full transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
          >
            <template v-for="(media, index) in allMedia" :key="index">
              <div class="relative flex-shrink-0 w-full h-full">
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  class="object-cover w-full h-full main-product-image"
                  alt="Product Image"
                />
                <video
                  v-else-if="media.type === 'video'"
                  :src="media.url"
                  class="object-cover w-full h-full bg-black main-product-image"
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
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
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
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
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
            class="absolute left-0 right-0 z-10 flex justify-center gap-2 bottom-4"
            v-if="allMedia.length > 1"
          >
            <button
              v-for="(m, idx) in allMedia"
              :key="idx"
              @click="activeSlide = idx"
              :class="activeSlide === idx ? 'w-6 bg-black' : 'w-2 bg-white/80'"
              class="h-2 transition-all duration-300 rounded-full shadow-sm"
            ></button>
          </div>
        </div>

        <div
          v-if="allMedia.length > 1"
          class="flex gap-3 pb-2 overflow-x-auto custom-scrollbar"
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
            class="relative w-20 h-24 overflow-hidden transition-all border-2 cursor-pointer shrink-0 bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="object-cover w-full h-full"
            />
            <div
              v-else
              class="relative flex items-center justify-center w-full h-full text-gray-500 bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute z-10 w-8 h-8"
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

      <div class="w-full space-y-8 md:w-1/2">
        <div class="space-y-4 text-center md:text-left">
          <h1
            class="font-serif text-3xl tracking-tighter uppercase md:text-5xl"
          >
            {{ product.name }}
          </h1>
          <button
            @click="toggleWishlist(product.id)"
            class="flex-shrink-0 p-3 transition-colors rounded-full bg-gray-50 hover:bg-red-50"
          >
            <svg
              v-if="isFavorited"
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6 text-red-500 transition-transform transform hover:scale-110"
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
              class="w-6 h-6 text-gray-400 transition-transform transform hover:text-red-500 hover:scale-110"
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
          <div class="flex items-center justify-center gap-4 md:justify-start">
            <template v-if="product.discount_price">
              <p class="text-2xl font-bold text-red-600">
                {{ formatPrice(product.discount_price) }}
              </p>
              <p class="text-lg text-gray-400 line-through">
                {{ formatPrice(product.price) }}
              </p>
              <span
                class="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded"
                >SAVE
                {{
                  calculateDiscount(product.price, product.discount_price)
                }}%</span
              >
            </template>
            <p v-else class="text-2xl text-gray-600">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <div class="flex flex-col gap-4 pt-4 sm:flex-row">
          <button
            @click="handleAction('cart')"
            class="flex-1 py-4 text-xs font-bold tracking-widest uppercase transition border-2 border-black hover:bg-black hover:text-white"
          >
            Add to Cart
          </button>
          <button
            @click="handleAction('buy')"
            class="flex-1 py-4 text-xs font-bold tracking-widest text-white uppercase transition bg-black hover:bg-gray-800"
          >
            Buy It Now
          </button>
        </div>

        <div class="pt-8 border-t border-gray-200 divide-y divide-gray-200">
          <div
            v-for="section in ['Description', 'Care', 'Design']"
            :key="section"
            class="py-4"
          >
            <button
              @click="
                activeSection = activeSection === section ? null : section
              "
              class="flex items-center justify-between w-full text-xs font-medium tracking-widest text-left uppercase group"
            >
              <span class="transition group-hover:text-gray-500">{{
                section
              }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
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
    router.push("/collections");
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

<!-- <template>
  <div
    v-if="isLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div
      class="w-12 h-12 border-4 border-gray-100 rounded-full border-t-black animate-spin"
    ></div>
    <p class="mt-4 font-serif italic text-gray-400 animate-pulse">
      Loading Solher piece...
    </p>
  </div>

  <div
    v-else-if="product"
    class="px-6 py-12 mx-auto md:py-24 max-w-7xl animate-fade-in"
  >
    <div class="flex flex-col gap-12 md:flex-row lg:gap-24">
      <div class="flex flex-col w-full gap-4 select-none md:w-1/2">
        <div class="relative bg-gray-100 aspect-[4/5] overflow-hidden group">
          <div
            class="flex w-full h-full transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
          >
            <template v-for="(media, index) in allMedia" :key="index">
              <div class="relative flex-shrink-0 w-full h-full">
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  class="object-cover w-full h-full main-product-image"
                  alt="Product Image"
                />
                <video
                  v-else-if="media.type === 'video'"
                  :src="media.url"
                  class="object-cover w-full h-full bg-black main-product-image"
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
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
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
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
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
            class="absolute left-0 right-0 z-10 flex justify-center gap-2 bottom-4"
            v-if="allMedia.length > 1"
          >
            <button
              v-for="(m, idx) in allMedia"
              :key="idx"
              @click="activeSlide = idx"
              :class="activeSlide === idx ? 'w-6 bg-black' : 'w-2 bg-white/80'"
              class="h-2 transition-all duration-300 rounded-full shadow-sm"
            ></button>
          </div>
        </div>

        <div
          v-if="allMedia.length > 1"
          class="flex gap-3 pb-2 overflow-x-auto custom-scrollbar"
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
            class="relative w-20 h-24 overflow-hidden transition-all border-2 cursor-pointer shrink-0 bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="object-cover w-full h-full"
            />
            <div
              v-else
              class="relative flex items-center justify-center w-full h-full text-gray-500 bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute z-10 w-8 h-8"
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

      <div class="w-full space-y-8 md:w-1/2">
        <div class="space-y-4 text-center md:text-left">
          <div class="flex items-start justify-center gap-4 md:justify-between">
            <h1
              class="font-serif text-3xl tracking-tighter uppercase md:text-5xl"
            >
              {{ product.name }}
            </h1>

            <button
              @click="toggleWishlist(product.id)"
              class="flex-shrink-0 p-3 transition-colors rounded-full bg-gray-50 hover:bg-red-50"
            >
              <svg
                v-if="isFavorited"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-red-500 transition-transform transform hover:scale-110"
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
                class="w-6 h-6 text-gray-400 transition-transform transform hover:text-red-500 hover:scale-110"
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
          <div class="flex items-center justify-center gap-4 md:justify-start">
            <template v-if="product.discount_price">
              <p class="text-2xl font-bold text-red-600">
                {{ formatPrice(product.discount_price) }}
              </p>
              <p class="text-lg text-gray-400 line-through">
                {{ formatPrice(product.price) }}
              </p>
              <span
                class="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded"
                >SAVE
                {{
                  calculateDiscount(product.price, product.discount_price)
                }}%</span
              >
            </template>
            <p v-else class="text-2xl text-gray-600">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>
        <div
          v-if="
            product.material ||
            product.weight ||
            product.length ||
            (product.color && product.color.length > 0)
          "
          class="p-4 space-y-3 border border-gray-100 bg-gray-50/50 rounded-xl"
        >
          <div
            v-if="product.material"
            class="flex items-start justify-between text-sm"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Material</span
            >
            <span class="font-medium text-right text-gray-900">{{
              product.material
            }}</span>
          </div>

          <div
            v-if="product.strap_length"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Strap Length</span
            >
            <span class="font-medium text-right text-gray-900">{{
              product.strap_length
            }}</span>
          </div>

          <div
            v-if="product.length || product.width || product.height"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Dimensions</span
            >
            <span class="font-mono text-right text-gray-900">
              {{ product.length || "-" }}
              <span class="text-xs text-gray-400">x</span>
              {{ product.width || "-" }}
              <span class="text-xs text-gray-400">x</span>
              {{ product.height || "-" }} <span class="text-xs">cm</span>
            </span>
          </div>

          <div
            v-if="product.weight"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Weight</span
            >
            <span class="font-medium text-right text-gray-900"
              >{{ product.weight }} <span class="text-xs">gram</span></span
            >
          </div>
          <div
            v-if="product.color && product.color.length > 0"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0 mt-1"
              >Colors</span
            >
            <div class="flex flex-col items-end">
              <div class="flex flex-wrap justify-end gap-2">
                <div
                  v-for="(c, idx) in product.color"
                  :key="idx"
                  @click="selectedColor = c"
                  :class="selectedColor === c ? 'ring-2 ring-black border-transparent scale-110 shadow-md' : 'border-gray-200 hover:border-gray-400'"
                  class="flex items-center gap-1.5 bg-white border px-2 py-1 rounded-lg cursor-pointer transition-all duration-200"
                >
                  <div
                    class="w-3 h-3 border border-gray-300 rounded-full"
                    :style="{ backgroundColor: getParsedColorHex(c) }"
                  ></div>
                  <span
                    class="font-bold text-gray-800 text-[10px] uppercase tracking-wider"
                    >{{ getColorName(c) }}</span
                  >
                </div>
              </div>
              <p v-if="colorError" class="text-red-500 text-[9px] font-bold uppercase tracking-widest mt-2 animate-pulse">
                * Please select a color first
              </p>
            </div>
          </div>
        </div>

        <div
          v-if="product.stock > 0"
          class="flex items-center gap-6 pt-4 mt-2 border-t border-gray-100"
        >
          <span
            class="text-[10px] font-bold text-gray-500 uppercase tracking-widest w-24 shrink-0"
            >Quantity</span
          >
          <div
            class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
          >
            <button
              @click="decreaseQuantity"
              class="px-4 py-2 text-lg font-bold text-gray-600 transition-colors hover:bg-gray-200"
            >
              -
            </button>
            <input
              type="number"
              v-model.number="selectedQuantity"
              @change="validateQuantity"
              class="w-12 p-0 text-sm font-bold text-center bg-transparent border-none focus:ring-0"
            />
            <button
              @click="increaseQuantity"
              class="px-4 py-2 text-lg font-bold text-gray-600 transition-colors hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 pt-4 sm:flex-row">
          <button
            @click="handleAction('cart')"
            :disabled="product.stock === 0"
            :class="[
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
                : 'hover:bg-black hover:text-white border-black text-black',
              'flex-1 py-4 border-2 font-bold text-xs uppercase tracking-widest transition',
            ]"
          >
            {{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}
          </button>

          <button
            @click="handleAction('buy')"
            :disabled="product.stock === 0"
            :class="[
              product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800 text-white',
              'flex-1 py-4 font-bold text-xs uppercase tracking-widest transition border-2 border-transparent',
            ]"
          >
            Buy It Now
          </button>
        </div>
        <div class="pt-8 border-t border-gray-200 divide-y divide-gray-200">
          <div
            v-for="section in [
              'Description',
              'Design',
              'Shipping & Returns',
            ]"
            :key="section"
            class="py-4"
          >
            <button
              @click="
                activeSection = activeSection === section ? null : section
              "
              class="flex items-center justify-between w-full text-xs font-medium tracking-widest text-left uppercase group"
            >
              <span class="transition group-hover:text-gray-500">{{
                section
              }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
              >
                <template v-if="section !== 'Shipping & Returns'">
                  {{
                    product[section.toLowerCase()] ||
                    "No information available."
                  }}
                </template>
                <template v-else
                  >Shipping options are available on the payment page through
                  our partnership with Biteship. For product returns, please
                  refer to the contact information on our Customer Care page.
                  Returns can be coordinated following an automatic refund or as
                  part of a manual refund application.</template
                >
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref, onMounted, computed, onUnmounted } from "vue";
// import { useRoute, useRouter } from "vue-router";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api.js";

// // Tambahkan useCart ke daftar import
// import { useCart } from "../../composables/useCart";

// // Ekstrak fungsi dan state yang dibutuhkan
// const { handleOptimisticAdd, selectedItemIds, fetchCarts } = useCart();

// const route = useRoute();
// const router = useRouter();
// const product = ref(null);
// const activeSection = ref("Description");
// const isLoading = ref(true);

// const userWishlists = ref([]);
// const isAuthenticated = !!localStorage.getItem("token");

// const activeSlide = ref(0);

// const allMedia = computed(() => {
//   if (!product.value) return [];
//   let media = [{ type: "image", url: product.value.image }];

//   if (
//     product.value.variant_images &&
//     Array.isArray(product.value.variant_images)
//   ) {
//     product.value.variant_images.forEach((img) => {
//       media.push({ type: "image", url: img });
//     });
//   }

//   if (product.value.variant_video) {
//     media.push({ type: "video", url: product.value.variant_video });
//   }

//   return media;
// });

// const nextSlide = () => {
//   activeSlide.value =
//     activeSlide.value === allMedia.value.length - 1 ? 0 : activeSlide.value + 1;
// };

// const prevSlide = () => {
//   activeSlide.value =
//     activeSlide.value === 0 ? allMedia.value.length - 1 : activeSlide.value - 1;
// };

// const fetchWishlists = async () => {
//   if (!isAuthenticated) return;
//   try {
//     const res = await axios.get(`${BASE_URL}/wishlists`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//     userWishlists.value = res.data.map((w) => w.product_id);
//   } catch (error) {}
// };

// const isFavorited = computed(() => {
//   if (!product.value) return false;
//   return userWishlists.value.includes(product.value.id);
// });

// const toggleWishlist = async (productId) => {
//   if (!isAuthenticated) {
//     Swal.fire({
//       icon: "info",
//       title: "Login Required",
//       confirmButtonColor: "#000",
//     });
//     return;
//   }

//   if (isFavorited.value) {
//     userWishlists.value = userWishlists.value.filter((id) => id !== productId);
//   } else {
//     userWishlists.value.push(productId);
//   }

//   try {
//     await axios.post(
//       `${BASE_URL}/wishlists/toggle`,
//       { product_id: productId },
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       },
//     );
//     window.dispatchEvent(new Event("wishlist-updated"));
//   } catch (error) {
//     fetchWishlists();
//   }
// };

// // const fetchProductDetail = async () => {
// //   isLoading.value = true;
// //   try {
// //     const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
// //     product.value = res.data;

// //     fetchWishlists();

// //     const event = new CustomEvent("track-view", { detail: res.data });
// //     window.dispatchEvent(event);
// //   } catch (error) {
// //     console.error("Error fetching detail:", error);
// //     router.push("/collections");
// //   } finally {
// //     setTimeout(() => {
// //       isLoading.value = false;
// //     }, 600);
// //   }
// // };

// const fetchProductDetail = async () => {
//   isLoading.value = true;
//   try {
//     const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
//     product.value = res.data;

//     fetchWishlists();

//     // =======================================================
//     // [PERBAIKAN] SIMPAN RECENTLY VIEWED LANGSUNG DI SINI
//     // Tidak perlu lagi melempar window.dispatchEvent('track-view')
//     // =======================================================
//     let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");

//     // Hapus jika produk sudah ada di list (agar tidak duplikat)
//     list = list.filter((item) => item.id !== product.value.id);

//     // Tambahkan produk ini ke urutan teratas
//     list.unshift(product.value);

//     // Batasi maksimal 6 item sejarah
//     list = list.slice(0, 6);

//     // Simpan kembali ke localStorage
//     localStorage.setItem("recently_viewed", JSON.stringify(list));
//   } catch (error) {
//     console.error("Error fetching detail:", error);
//     router.push("/collections");
//   } finally {
//     setTimeout(() => {
//       isLoading.value = false;
//     }, 600);
//   }
// };

// // [PERBAIKAN] Logika Action (Cart & Buy) Ditingkatkan
// // const handleAction = async (type) => {
// //   const token = localStorage.getItem("token");
// //   if (!token) {
// //     Swal.fire({
// //       icon: "info",
// //       title: "Login Required",
// //       confirmButtonColor: "#000",
// //     }).then(() => router.push("/login"));
// //     return;
// //   }

// //   if (type === "cart") {
// //     // 1. INSTANT FEEDBACK (Tanpa jeda API)
// //     Swal.fire({
// //       title: "Added to Bag",
// //       icon: "success",
// //       toast: true,
// //       position: "top-center",
// //       showConfirmButton: false,
// //       timer: 2000,
// //     });

// //     // 2. INSTANT ANIMATION
// //     const productImages = document.querySelectorAll(".main-product-image");
// //     const productImage = productImages[activeSlide.value];
// //     const cartIcon = document.querySelector(".cart-icon-header");

// //     if (productImage && cartIcon) {
// //       const imgRect = productImage.getBoundingClientRect();
// //       const cartRect = cartIcon.getBoundingClientRect();

// //       const flyer = productImage.cloneNode(true);
// //       flyer.classList.add("fly-item");

// //       Object.assign(flyer.style, {
// //         position: "fixed",
// //         top: `${imgRect.top}px`,
// //         left: `${imgRect.left}px`,
// //         width: `${imgRect.width}px`,
// //         height: `${imgRect.height}px`,
// //         zIndex: "1000",
// //         transition: "all 0.8s cubic-bezier(0.42, 0, 0.58, 1)",
// //         pointerEvents: "none",
// //       });

// //       document.body.appendChild(flyer);

// //       setTimeout(() => {
// //         Object.assign(flyer.style, {
// //           top: `${cartRect.top}px`,
// //           left: `${cartRect.left}px`,
// //           width: "20px",
// //           height: "20px",
// //           opacity: "0.4",
// //           transform: "rotate(720deg)",
// //         });
// //       }, 10);

// //       flyer.addEventListener(
// //         "transitionend",
// //         () => {
// //           flyer.remove();
// //           // EMIT EVENT AGAR HEADER MENGURUS API DAN STATE!
// //           window.dispatchEvent(
// //             new CustomEvent("optimistic-add-to-cart", {
// //               detail: product.value,
// //             })
// //           );
// //         },
// //         { once: true }
// //       );
// //     } else {
// //       // Jika elemen gambar tidak terdeteksi, tetap jalankan event
// //       window.dispatchEvent(
// //         new CustomEvent("optimistic-add-to-cart", {
// //           detail: product.value,
// //         })
// //       );
// //     }
// //     // STOP DISINI. KITA TIDAK MEMANGGIL API /carts DISINI LAGI.
// //     // HEADER YANG AKAN MENGURUS API /carts DI BACKGROUND.
// //     return;
// //   }

// //   // LOGIKA "BUY NOW" TETAP SAMA KARENA PINDAH HALAMAN
// //   try {
// //     if (type === "buy") {
// //       Swal.fire({
// //         title: "Preparing Order...",
// //         allowOutsideClick: false,
// //         didOpen: () => Swal.showLoading(),
// //       });

// //       await axios.post(
// //         `${BASE_URL}/carts`,
// //         { product_id: product.value.id, quantity: 1 },
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       const checkoutRes = await axios.post(
// //         `${BASE_URL}/checkout`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } }
// //       );

// //       Swal.close();
// //       router.push(`/payment/${checkoutRes.data.transaction_id}`);
// //     }
// //   } catch (error) {
// //     Swal.close();
// //     Swal.fire("Error", error.response?.data?.message || "Action failed", "error");
// //   }
// // };

// // const handleAction = async (type) => {
// //   const token = localStorage.getItem("token");
// //   if (!token) {
// //     Swal.fire({
// //       icon: "info",
// //       title: "Login Required",
// //       confirmButtonColor: "#000",
// //     }).then(() => router.push("/login"));
// //     return;
// //   }

// //   // --- START TRUE OPTIMISTIC UI ---
// //   if (type === "cart") {
// //     // 1. INSTAN 0 MILIDETIK: Tampilkan Notifikasi
// //     Swal.fire({
// //       title: "Added to Bag",
// //       icon: "success",
// //       toast: true,
// //       position: "top-center",
// //       showConfirmButton: false,
// //       timer: 2000,
// //     });

// //     // 2. INSTAN: Lempar data ke Header.vue agar Header yang mengurus API
// //     // window.dispatchEvent(
// //     //   new CustomEvent("optimistic-add-to-cart", {
// //     //     detail: product.value,
// //     //   }),
// //     // );

// //     window.dispatchEvent(
// //       new CustomEvent("optimistic-add-to-cart", {
// //         // [PERBAIKAN] Bungkus ke dalam object dengan cartId: null
// //         detail: { product: product.value, cartId: null },
// //       }),
// //     );

// //     // 3. Jalankan Animasi Terbang tanpa mengganggu proses data
// //     const productImages = document.querySelectorAll(".main-product-image");
// //     const productImage = productImages[activeSlide.value];
// //     const cartIcon = document.querySelector(".cart-icon-header");

// //     if (productImage && cartIcon) {
// //       const imgRect = productImage.getBoundingClientRect();
// //       const cartRect = cartIcon.getBoundingClientRect();

// //       const flyer = productImage.cloneNode(true);
// //       flyer.classList.add("fly-item");

// //       Object.assign(flyer.style, {
// //         position: "fixed",
// //         top: `${imgRect.top}px`,
// //         left: `${imgRect.left}px`,
// //         width: `${imgRect.width}px`,
// //         height: `${imgRect.height}px`,
// //         zIndex: "9999",
// //         transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)", // Animasi lebih smooth & cepat
// //         pointerEvents: "none",
// //         borderRadius: "10%",
// //       });

// //       document.body.appendChild(flyer);

// //       // Gunakan requestAnimationFrame agar browser tidak nge-lag saat merender
// //       requestAnimationFrame(() => {
// //         requestAnimationFrame(() => {
// //           Object.assign(flyer.style, {
// //             top: `${cartRect.top + 10}px`,
// //             left: `${cartRect.left + 10}px`,
// //             width: "15px",
// //             height: "15px",
// //             opacity: "0.2",
// //             transform: "scale(0.5) rotate(360deg)",
// //           });
// //         });
// //       });

// //       flyer.addEventListener("transitionend", () => flyer.remove(), {
// //         once: true,
// //       });
// //     }
// //     return; // STOP! Biarkan Header yang urus database.
// //   }

// //   // --- LOGIKA BUY IT NOW (Tetap sama) ---
// //   try {
// //     if (type === "buy") {
// //       Swal.fire({
// //         title: "Preparing Order...",
// //         allowOutsideClick: false,
// //         didOpen: () => Swal.showLoading(),
// //       });

// //       await axios.post(
// //         `${BASE_URL}/carts`,
// //         { product_id: product.value.id, quantity: 1 },
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );

// //       const checkoutRes = await axios.post(
// //         `${BASE_URL}/checkout`,
// //         {},
// //         { headers: { Authorization: `Bearer ${token}` } },
// //       );

// //       Swal.close();
// //       router.push(`/payment/${checkoutRes.data.transaction_id}`);
// //     }
// //   } catch (error) {
// //     Swal.close();
// //     Swal.fire(
// //       "Error",
// //       error.response?.data?.message || "Action failed",
// //       "error",
// //     );
// //   }
// // };

// // New Implementation
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

//   // --- START TRUE OPTIMISTIC UI (ADD TO CART) ---
//   if (type === "cart") {
//     Swal.fire({
//       title: "Added to Bag",
//       icon: "success",
//       toast: true,
//       position: "top-center",
//       showConfirmButton: false,
//       timer: 2000,
//     });

//     // [PERBAIKAN] Lempar dengan format object { product, cartId }
//     window.dispatchEvent(
//       new CustomEvent("optimistic-add-to-cart", {
//         detail: { product: product.value, cartId: null },
//       }),
//     );

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
//         zIndex: "9999",
//         transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
//         pointerEvents: "none",
//         borderRadius: "10%",
//       });

//       document.body.appendChild(flyer);

//       requestAnimationFrame(() => {
//         requestAnimationFrame(() => {
//           Object.assign(flyer.style, {
//             top: `${cartRect.top + 10}px`,
//             left: `${cartRect.left + 10}px`,
//             width: "15px",
//             height: "15px",
//             opacity: "0.2",
//             transform: "scale(0.5) rotate(360deg)",
//           });
//         });
//       });

//       flyer.addEventListener("transitionend", () => flyer.remove(), {
//         once: true,
//       });
//     }
//     return;
//   }

//   // --- LOGIKA BUY IT NOW YANG BENAR ---
//   try {
//     if (type === "buy") {
//       Swal.fire({
//         title: "Preparing Order...",
//         allowOutsideClick: false,
//         didOpen: () => Swal.showLoading(),
//       });

//       // 1. Masukkan barang ke database Cart
//       const resCart = await axios.post(
//         `${BASE_URL}/carts`,
//         { product_id: product.value.id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } },
//       );

//       const newCartId =
//         resCart.data.cart_id || resCart.data.id || resCart.data.data?.id;

//       // 2. Fetch ulang Global State agar Header dan Memori Sinkron
//       await fetchCarts();

//       // 3. SET Global State: Hanya centang barang yang baru saja dibeli!
//       selectedItemIds.value = [newCartId];

//       Swal.close();

//       // 4. Lempar user langsung ke Halaman Pemilihan Alamat & Kurir
//       router.push(`/payment`);
//     }
//   } catch (error) {
//     Swal.close();
//     Swal.fire(
//       "Error",
//       error.response?.data?.message || "Action failed",
//       "error",
//     );
//   }
// };

// const formatPrice = (value) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(value);
// const calculateDiscount = (price, discountPrice) =>
//   Math.round(((price - discountPrice) / price) * 100);

// onMounted(fetchProductDetail);

import { ref, onMounted, computed, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

// [BARU] Import gambar default
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

// Tambahkan useCart ke daftar import
import { useCart } from "../../composables/useCart";

// Ekstrak fungsi dan state yang dibutuhkan
const { handleOptimisticAdd, selectedItemIds, fetchCarts, cartItems } =
  useCart();

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref("Description");

// [PERBAIKAN] Default isLoading diset false jika ada state dari history
const isLoading = ref(true);

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const activeSlide = ref(0);

// ==========================================
// [BARU] STATE & FUNGSI UNTUK QUANTITY
// ==========================================
const selectedQuantity = ref(1);

const selectedColor = ref("");
const colorError = ref(false);

const decreaseQuantity = () => {
  if (selectedQuantity.value > 1) selectedQuantity.value--;
};

const increaseQuantity = () => {
  if (selectedQuantity.value < product.value.stock) selectedQuantity.value++;
};

const validateQuantity = () => {
  if (selectedQuantity.value < 1 || isNaN(selectedQuantity.value)) {
    selectedQuantity.value = 1;
  } else if (selectedQuantity.value > product.value.stock) {
    selectedQuantity.value = product.value.stock;
  }
};

// Mengecek apakah produk ini sudah ada di keranjang user
// const isInCart = computed(() => {
//   if (!product.value || !cartItems.value) return false;
//   return cartItems.value.some((item) => item.product_id === product.value.id);
// });

// Mengecek apakah produk dengan warna spesifik ini sudah ada di keranjang user
// const isInCart = computed(() => {
//   if (!product.value || !cartItems.value) return false;
  
//   // [PERBAIKAN KUNCI] Jika produk memiliki varian warna
//   if (product.value.color && product.value.color.length > 0) {
//     // Jika belum ada warna yang dipilih, biarkan tombol "Add to Cart" tetap muncul
//     if (!selectedColor.value) return false;
    
//     // Tombol baru akan berubah menjadi "Already in Bag" JIKA kombinasi ID dan Warnanya sudah ada
//     return cartItems.value.some(
//       (item) => item.product_id === product.value.id && item.color === selectedColor.value
//     );
//   }

//   // Jika produk tidak punya varian warna, cukup cek ID produk
//   return cartItems.value.some((item) => item.product_id === product.value.id);
// });
// ==========================================

const allMedia = computed(() => {
  if (!product.value) return [];

  // let media = [{ type: "image", url: product.value.image }];
  // [PERBAIKAN] Gunakan fallback image
  let media = [{ type: "image", url: product.value.image || defaultBagIcon }];

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

const fetchProductDetail = async () => {
  // [PERBAIKAN BESAR] Pengecekan Instant State Router
  // Cek apakah ada data pre-fetched yang dibawa dari halaman Collections
  if (history.state && history.state.productData) {
    product.value = JSON.parse(history.state.productData);
    isLoading.value = false; // Matikan loading INSTAN 0 MILIDETIK!
  } else {
    isLoading.value = true; // Jika user direct link (copas URL), harus loading
  }

  try {
    // Tetap hit API di background untuk memastikan harga/stok tidak basi
    const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
    product.value = res.data; // Timpa dengan data paling fresh dari server

    fetchWishlists();

    // =======================================================
    // SIMPAN RECENTLY VIEWED
    // =======================================================
    let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
    list = list.filter((item) => item.id !== product.value.id);
    list.unshift(product.value);
    list = list.slice(0, 6);
    localStorage.setItem("recently_viewed", JSON.stringify(list));
  } catch (error) {
    console.error("Error fetching detail:", error);
    // Hanya redirect ke collections jika produk benar-benar tidak ada di database
    if (!product.value) router.push("/collections");
  } finally {
    isLoading.value = false;
  }
};

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

  // [BARU] VALIDASI WARNA: Cek apakah produk punya varian warna, tapi user belum memilih
  if (product.value.color && product.value.color.length > 0 && !selectedColor.value) {
    colorError.value = true;
    setTimeout(() => (colorError.value = false), 3000);
    return; // Hentikan eksekusi jika belum pilih warna
  }

  // --- START TRUE OPTIMISTIC UI (ADD TO CART) ---
  if (type === "cart") {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 2000,
    });

    // window.dispatchEvent(
    //   new CustomEvent("optimistic-add-to-cart", {
    //     detail: { product: product.value, cartId: null },
    //   }),
    // );

    // [PERBAIKAN] Sisipkan informasi quantity agar composable useCart mendeteksinya
    // window.dispatchEvent(
    //   new CustomEvent("optimistic-add-to-cart", {
    //     detail: {
    //       product: product.value,
    //       cartId: null,
    //       quantity: selectedQuantity.value,
    //     },
    //   }),
    // );

    // [PERBAIKAN] Sisipkan color ke dalam payload optimistic UI
    window.dispatchEvent(
      new CustomEvent("optimistic-add-to-cart", {
        detail: {
          product: product.value,
          cartId: null,
          quantity: selectedQuantity.value,
          color: selectedColor.value || null, // <--- BARU
        },
      }),
    );

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
        transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
        pointerEvents: "none",
        borderRadius: "10%",
      });

      document.body.appendChild(flyer);

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
    return;
  }

  // --- LOGIKA BUY IT NOW YANG BENAR ---
  try {
    if (type === "buy") {
      Swal.fire({
        title: "Preparing Order...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      // const resCart = await axios.post(
      //   `${BASE_URL}/carts`,
      //   { product_id: product.value.id, quantity: 1 },
      //   { headers: { Authorization: `Bearer ${token}` } },
      // );

      // [PERBAIKAN] Kirim quantity sesuai dengan jumlah yang dipilih user
      // const resCart = await axios.post(
      //   `${BASE_URL}/carts`,
      //   { product_id: product.value.id, quantity: selectedQuantity.value },
      //   { headers: { Authorization: `Bearer ${token}` } },
      // );

      // [PERBAIKAN] Kirim color ke API Carts
      const resCart = await axios.post(
        `${BASE_URL}/carts`,
        { 
            product_id: product.value.id, 
            quantity: selectedQuantity.value,
            color: selectedColor.value || null // <--- BARU
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const newCartId =
        resCart.data.cart_id || resCart.data.id || resCart.data.data?.id;

      await fetchCarts();

      selectedItemIds.value = [newCartId];

      Swal.close();

      router.push(`/payment`);
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

// [BARU] Peta Warna untuk UI
const colorMap = {
  Black: "#000000",
  White: "#FFFFFF",
  Brown: "#8B4513",
  Beige: "#F5F5DC",
  Red: "#DC143C",
  Navy: "#000080",
  Green: "#008000",
  Grey: "#808080",
  Pink: "#FFC0CB",
  Yellow: "#FFD700",
  Blue: "#4169E1",
  Mocca: '#967969', // <--- WARNA BARU
  Cream: '#FFAC68',
  Sage: '#00B46F'
};

const getColorHex = (colorName) => {
  return colorMap[colorName] || "#cccccc";
};

// [BARU] Fungsi pemecah string warna ("Red|#d10000" -> "Red")
const getColorName = (colorString) => {
  if (!colorString) return "";
  if (colorString.includes('|')) return colorString.split('|')[0];
  return colorString;
};

// [BARU] Fungsi pemecah kode HEX ("Red|#d10000" -> "#d10000")
const getParsedColorHex = (colorString) => {
  if (!colorString) return "#cccccc"; // Fallback abu-abu
  if (colorString.includes('|')) return colorString.split('|')[1];
  return getColorHex(colorString); // Fallback ke colorMap lama jika masih ada data lama
};

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

<!-- PEMILIHAN WARNA CARA LAMA -->
<!-- <template>
  <div
    v-if="isLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div
      class="w-12 h-12 border-4 border-gray-100 rounded-full border-t-black animate-spin"
    ></div>
    <p class="mt-4 font-serif italic text-gray-400 animate-pulse">
      Loading Solher piece...
    </p>
  </div>

  <div
    v-else-if="product"
    class="px-6 py-12 mx-auto md:py-24 max-w-7xl animate-fade-in"
  >
    <div class="flex flex-col gap-12 md:flex-row lg:gap-24">
      <div class="flex flex-col w-full gap-4 select-none md:w-1/2">
        <div class="relative bg-gray-100 aspect-[4/5] overflow-hidden group">
          <div
            class="flex w-full h-full transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
          >
            <template v-for="(media, index) in allMedia" :key="index">
              <div class="relative flex-shrink-0 w-full h-full">
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  class="object-cover w-full h-full main-product-image"
                  alt="Product Image"
                />
                <video
                  v-else-if="media.type === 'video'"
                  :src="media.url"
                  class="object-cover w-full h-full bg-black main-product-image"
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
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            v-if="allMedia.length > 1"
            @click="nextSlide"
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div
            class="absolute left-0 right-0 z-10 flex justify-center gap-2 bottom-4"
            v-if="allMedia.length > 1"
          >
            <button
              v-for="(m, idx) in allMedia"
              :key="idx"
              @click="activeSlide = idx"
              :class="activeSlide === idx ? 'w-6 bg-black' : 'w-2 bg-white/80'"
              class="h-2 transition-all duration-300 rounded-full shadow-sm"
            ></button>
          </div>
        </div>

        <div
          v-if="allMedia.length > 1"
          class="flex gap-3 pb-2 overflow-x-auto custom-scrollbar"
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
            class="relative w-20 h-24 overflow-hidden transition-all border-2 cursor-pointer shrink-0 bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="object-cover w-full h-full"
            />
            <div
              v-else
              class="relative flex items-center justify-center w-full h-full text-gray-500 bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="absolute z-10 w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div class="w-full space-y-8 md:w-1/2">
        <div class="space-y-4 text-center md:text-left">
          <div class="flex items-start justify-center gap-4 md:justify-between">
            <h1 class="font-serif text-3xl tracking-tighter uppercase md:text-5xl">
              {{ product.name }}
            </h1>

            <button
              @click="toggleWishlist(product.id)"
              class="flex-shrink-0 p-3 transition-colors rounded-full bg-gray-50 hover:bg-red-50"
            >
              <svg v-if="isFavorited" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-red-500 transition-transform transform hover:scale-110" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-gray-400 transition-transform transform hover:text-red-500 hover:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
          <div class="flex items-center justify-center gap-4 md:justify-start">
            <template v-if="product.discount_price">
              <p class="text-2xl font-bold text-red-600">
                {{ formatPrice(product.discount_price) }}
              </p>
              <p class="text-lg text-gray-400 line-through">
                {{ formatPrice(product.price) }}
              </p>
              <span class="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded">SAVE {{ calculateDiscount(product.price, product.discount_price) }}%</span>
            </template>
            <p v-else class="text-2xl text-gray-600">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <div
          v-if="
            product.material ||
            product.weight ||
            product.length ||
            (product.color && product.color.length > 0)
          "
          class="p-4 space-y-3 border border-gray-100 bg-gray-50/50 rounded-xl"
        >
          <div v-if="product.material" class="flex items-start justify-between text-sm">
            <span class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0">Material</span>
            <span class="font-medium text-right text-gray-900">{{ product.material }}</span>
          </div>

          <div v-if="product.strap_length" class="flex items-start justify-between pt-3 text-sm border-t border-gray-100">
            <span class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0">Strap Length</span>
            <span class="font-medium text-right text-gray-900">{{ product.strap_length }}</span>
          </div>

          <div v-if="product.length || product.width || product.height" class="flex items-start justify-between pt-3 text-sm border-t border-gray-100">
            <span class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0">Dimensions</span>
            <span class="font-mono text-right text-gray-900">
              {{ product.length || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.width || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.height || "-" }} <span class="text-xs">cm</span>
            </span>
          </div>

          <div v-if="product.weight" class="flex items-start justify-between pt-3 text-sm border-t border-gray-100">
            <span class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0">Weight</span>
            <span class="font-medium text-right text-gray-900">{{ product.weight }} <span class="text-xs">gram</span></span>
          </div>

          <div v-if="product.color && product.color.length > 0" class="flex items-start justify-between pt-3 text-sm border-t border-gray-100">
            <span class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0 mt-1">Colors</span>
            <div class="flex flex-col items-end">
              <div class="flex flex-wrap justify-end gap-2">
                <div
                  v-for="(c, idx) in product.color"
                  :key="idx"
                  @click="selectedColor = c"
                  :class="selectedColor === c ? 'ring-2 ring-black border-transparent scale-110 shadow-md' : 'border-gray-200 hover:border-gray-400'"
                  class="flex items-center gap-1.5 bg-white border px-2 py-1 rounded-lg cursor-pointer transition-all duration-200"
                >
                  <div
                    class="w-3 h-3 border border-gray-300 rounded-full"
                    :style="{ backgroundColor: getParsedColorHex(c) }"
                  ></div>
                  <span class="font-bold text-gray-800 text-[10px] uppercase tracking-wider">{{ getColorName(c) }}</span>
                </div>
              </div>
              <p v-if="colorError" class="text-red-500 text-[9px] font-bold uppercase tracking-widest mt-2 animate-pulse">
                * Please select a color first
              </p>
            </div>
          </div>
        </div>

        <div v-if="product.stock > 0" class="flex items-center gap-6 pt-4 mt-2 border-t border-gray-100">
          <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest w-24 shrink-0">Quantity</span>
          <div class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl">
            <button @click="decreaseQuantity" class="px-4 py-2 text-lg font-bold text-gray-600 transition-colors hover:bg-gray-200">-</button>
            <input type="number" v-model.number="selectedQuantity" @change="validateQuantity" class="w-12 p-0 text-sm font-bold text-center bg-transparent border-none focus:ring-0" />
            <button @click="increaseQuantity" class="px-4 py-2 text-lg font-bold text-gray-600 transition-colors hover:bg-gray-200">+</button>
          </div>
        </div>

        <div class="flex flex-col gap-4 pt-4 sm:flex-row">
          <button
            @click="handleAction('cart')"
            :disabled="product.stock === 0"
            :class="[
              product.stock === 0 ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed' : 'hover:bg-black hover:text-white border-black text-black',
              'flex-1 py-4 border-2 font-bold text-xs uppercase tracking-widest transition',
            ]"
          >
            {{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}
          </button>

          <button
            @click="handleAction('buy')"
            :disabled="product.stock === 0"
            :class="[
              product.stock === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800 text-white',
              'flex-1 py-4 font-bold text-xs uppercase tracking-widest transition border-2 border-transparent',
            ]"
          >
            Buy It Now
          </button>
        </div>

        <div class="pt-8 border-t border-gray-200 divide-y divide-gray-200">
          <div v-for="section in ['Description', 'Design', 'Shipping & Returns']" :key="section" class="py-4">
            <button
              @click="activeSection = activeSection === section ? null : section"
              class="flex items-center justify-between w-full text-xs font-medium tracking-widest text-left uppercase group"
            >
              <span class="transition group-hover:text-gray-500">{{ section }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <transition name="fade">
              <div v-show="activeSection === section" class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap">
                <template v-if="section !== 'Shipping & Returns'">
                  {{ product[section.toLowerCase()] || "No information available." }}
                </template>
                <template v-else>Shipping options are available on the payment page through our partnership with Biteship. For product returns, please refer to the contact information on our Customer Care page. Returns can be coordinated following an automatic refund or as part of a manual refund application.</template>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div v-if="recommendedProducts.length > 0" class="pt-16 mt-24 border-t border-gray-200">
      <h2 class="mb-10 font-serif text-2xl tracking-widest text-center text-black uppercase md:text-3xl">
        You May Also Like
      </h2>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        <div 
          v-for="rec in recommendedProducts" 
          :key="rec.id" 
          @click="goToRecommendedProduct(rec.id)"
          class="flex flex-col cursor-pointer group"
        >
          <div class="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-4 rounded-xl">
            <img 
              :src="rec.image || defaultBagIcon" 
              :alt="rec.name" 
              class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div 
              v-if="rec.discount_price" 
              class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 font-bold text-[8px] uppercase tracking-widest rounded-sm z-10"
            >
              SALE
            </div>
          </div>
          <h3 class="mb-1 text-xs font-bold tracking-widest text-gray-900 uppercase truncate">
            {{ rec.name }}
          </h3>
          <div class="flex items-center gap-2">
            <p v-if="rec.discount_price" class="text-sm font-bold text-red-600">
              {{ formatPrice(rec.discount_price) }}
            </p>
            <p :class="rec.discount_price ? 'text-xs text-gray-400 line-through' : 'text-sm text-gray-900 font-medium'">
              {{ formatPrice(rec.price) }}
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import { useCart } from "../../composables/useCart";

const { handleOptimisticAdd, selectedItemIds, fetchCarts, cartItems } = useCart();

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref("Description");
const isLoading = ref(true);

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const activeSlide = ref(0);
const selectedQuantity = ref(1);
const selectedColor = ref("");
const colorError = ref(false);

// [BARU] State untuk Produk Rekomendasi
const recommendedProducts = ref([]);

const decreaseQuantity = () => {
  if (selectedQuantity.value > 1) selectedQuantity.value--;
};

const increaseQuantity = () => {
  if (selectedQuantity.value < product.value.stock) selectedQuantity.value++;
};

const validateQuantity = () => {
  if (selectedQuantity.value < 1 || isNaN(selectedQuantity.value)) {
    selectedQuantity.value = 1;
  } else if (selectedQuantity.value > product.value.stock) {
    selectedQuantity.value = product.value.stock;
  }
};

const allMedia = computed(() => {
  if (!product.value) return [];
  let media = [{ type: "image", url: product.value.image || defaultBagIcon }];
  if (product.value.variant_images && Array.isArray(product.value.variant_images)) {
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
  activeSlide.value = activeSlide.value === allMedia.value.length - 1 ? 0 : activeSlide.value + 1;
};

const prevSlide = () => {
  activeSlide.value = activeSlide.value === 0 ? allMedia.value.length - 1 : activeSlide.value - 1;
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
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    window.dispatchEvent(new Event("wishlist-updated"));
  } catch (error) {
    fetchWishlists();
  }
};

// [BARU] Fungsi Menarik Data Rekomendasi
const fetchRecommendations = async (categoryId, currentProductId) => {
  try {
    // Menarik seluruh data produk dari endpoint guest 
    // (Bisa disesuaikan dengan endpoint API jika Anda memiliki spesifik filter)
    const res = await axios.get(`${BASE_URL}/products`); 
    const allProducts = res.data.data || res.data;

    // Filter agar sesuai dengan kategori produk saat ini & membuang produk yang sedang dilihat
    const filteredProducts = allProducts.filter(
      p => p.category_id === categoryId && p.id !== currentProductId
    );

    // Mengacak susunan produk (Shuffle) dan mengambil maksimal 4 produk
    recommendedProducts.value = filteredProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);

  } catch (error) {
    console.error("Gagal menarik data rekomendasi:", error);
  }
};

// [BARU] Navigasi ke Produk Rekomendasi
const goToRecommendedProduct = (id) => {
  router.push(`/product/${id}`);
};

const fetchProductDetail = async () => {
  if (history.state && history.state.productData) {
    product.value = JSON.parse(history.state.productData);
    isLoading.value = false; 
    // Langsung tarik rekomendasi jika state sudah ada
    fetchRecommendations(product.value.category_id, product.value.id);
  } else {
    isLoading.value = true;
  }

  try {
    const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
    product.value = res.data; 

    fetchWishlists();
    
    // Panggil fetchRecommendations setelah data produk utama valid didapatkan
    fetchRecommendations(product.value.category_id, product.value.id);

    // RESET STATE SAAT PINDAH PRODUK (Misal lewat "You May Also Like")
    activeSlide.value = 0;
    selectedQuantity.value = 1;
    selectedColor.value = "";

    let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
    list = list.filter((item) => item.id !== product.value.id);
    list.unshift(product.value);
    list = list.slice(0, 6);
    localStorage.setItem("recently_viewed", JSON.stringify(list));
  } catch (error) {
    console.error("Error fetching detail:", error);
    if (!product.value) router.push("/collections");
  } finally {
    isLoading.value = false;
  }
};

// [BARU] Watcher untuk memantau perubahan ID di URL. 
// Hal ini WAJIB dilakukan karena jika user mengklik rekomendasi, komponen 
// Vue tidak dirender ulang dari awal, hanya Param URL-nya saja yang berubah.
watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      // Load produk baru dan scroll mulus ke atas
      fetchProductDetail();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
);

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

  if (product.value.color && product.value.color.length > 0 && !selectedColor.value) {
    colorError.value = true;
    setTimeout(() => (colorError.value = false), 3000);
    return; 
  }

  if (type === "cart") {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 2000,
    });

    window.dispatchEvent(
      new CustomEvent("optimistic-add-to-cart", {
        detail: {
          product: product.value,
          cartId: null,
          quantity: selectedQuantity.value,
          color: selectedColor.value || null, 
        },
      }),
    );

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
        transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
        pointerEvents: "none",
        borderRadius: "10%",
      });

      document.body.appendChild(flyer);

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
    return;
  }

  try {
    if (type === "buy") {
      Swal.fire({
        title: "Preparing Order...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const resCart = await axios.post(
        `${BASE_URL}/carts`,
        { 
            product_id: product.value.id, 
            quantity: selectedQuantity.value,
            color: selectedColor.value || null 
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const newCartId = resCart.data.cart_id || resCart.data.id || resCart.data.data?.id;

      await fetchCarts();
      selectedItemIds.value = [newCartId];

      Swal.close();
      router.push(`/payment`);
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

const colorMap = {
  Black: "#000000",
  White: "#FFFFFF",
  Brown: "#8B4513",
  Beige: "#F5F5DC",
  Red: "#DC143C",
  Navy: "#000080",
  Green: "#008000",
  Grey: "#808080",
  Pink: "#FFC0CB",
  Yellow: "#FFD700",
  Blue: "#4169E1",
  Mocca: '#967969', 
  Cream: '#FFAC68',
  Sage: '#00B46F'
};

const getColorHex = (colorName) => {
  return colorMap[colorName] || "#cccccc";
};

const getColorName = (colorString) => {
  if (!colorString) return "";
  if (colorString.includes('|')) return colorString.split('|')[0];
  return colorString;
};

const getParsedColorHex = (colorString) => {
  if (!colorString) return "#cccccc"; 
  if (colorString.includes('|')) return colorString.split('|')[1];
  return getColorHex(colorString); 
};

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

<!-- PEMILIHAN WARNA CARA TERBARU -->
<!-- <template>
  <div
    v-if="isLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div
      class="w-12 h-12 border-4 border-gray-100 rounded-full border-t-black animate-spin"
    ></div>
    <p class="mt-4 font-serif italic text-gray-400 animate-pulse">
      Loading Solher piece...
    </p>
  </div>

  <div v-else-if="product" class="px-6 py-12 mx-auto md:py-24 max-w-7xl animate-fade-in">
    <div class="flex flex-col gap-12 md:flex-row lg:gap-24">
      <div class="flex flex-col w-full gap-4 select-none md:w-1/2">
        <div class="relative bg-gray-100 aspect-[4/5] overflow-hidden group">
          <div
            class="flex w-full h-full transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
          >
            <template v-for="(media, index) in allMedia" :key="index">
              <div class="relative flex-shrink-0 w-full h-full">
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  class="object-cover w-full h-full main-product-image"
                  alt="Product Image"
                />
                <video
                  v-else-if="media.type === 'video'"
                  :src="media.url"
                  class="object-cover w-full h-full bg-black main-product-image"
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
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
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
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
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
            class="absolute left-0 right-0 z-10 flex justify-center gap-2 bottom-4"
            v-if="allMedia.length > 1"
          >
            <button
              v-for="(m, idx) in allMedia"
              :key="idx"
              @click="activeSlide = idx"
              :class="activeSlide === idx ? 'w-6 bg-black' : 'w-2 bg-white/80'"
              class="h-2 transition-all duration-300 rounded-full shadow-sm"
            ></button>
          </div>
        </div>

        <div
          v-if="allMedia.length > 1"
          class="flex gap-3 pb-2 overflow-x-auto custom-scrollbar"
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
            class="relative w-20 h-24 overflow-hidden transition-all border-2 cursor-pointer shrink-0 bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="object-cover w-full h-full"
            />
            <div
              v-else
              class="relative flex items-center justify-center w-full h-full text-gray-500 bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute z-10 w-8 h-8"
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

      <div class="w-full space-y-8 md:w-1/2">
        <div class="space-y-4 text-center md:text-left">
          <div class="flex items-start justify-center gap-4 md:justify-between">
            <h1 class="font-serif text-3xl tracking-tighter uppercase md:text-5xl">
              {{ product.name }}
            </h1>

            <button
              @click="toggleWishlist(product.id)"
              class="flex-shrink-0 p-3 transition-colors rounded-full bg-gray-50 hover:bg-red-50"
            >
              <svg
                v-if="isFavorited"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-red-500 transition-transform transform hover:scale-110"
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
                class="w-6 h-6 text-gray-400 transition-transform transform hover:text-red-500 hover:scale-110"
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
          <div class="flex items-center justify-center gap-4 md:justify-start">
            <template v-if="product.discount_price">
              <p class="text-2xl font-bold text-red-600">
                {{ formatPrice(product.discount_price) }}
              </p>
              <p class="text-lg text-gray-400 line-through">
                {{ formatPrice(product.price) }}
              </p>
              <span class="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded"
                >SAVE
                {{ calculateDiscount(product.price, product.discount_price) }}%</span
              >
            </template>
            <p v-else class="text-2xl text-gray-600">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <div
          v-if="
            product.material ||
            product.weight ||
            product.length ||
            siblingColors.length > 0
          "
          class="p-4 space-y-3 border border-gray-100 bg-gray-50/50 rounded-xl"
        >
          <div v-if="product.material" class="flex items-start justify-between text-sm">
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Material</span
            >
            <span class="font-medium text-right text-gray-900">{{
              product.material
            }}</span>
          </div>

          <div
            v-if="product.strap_length"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Strap Length</span
            >
            <span class="font-medium text-right text-gray-900">{{
              product.strap_length
            }}</span>
          </div>

          <div
            v-if="product.length || product.width || product.height"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Dimensions</span
            >
            <span class="font-mono text-right text-gray-900">
              {{ product.length || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.width || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.height || "-" }} <span class="text-xs">cm</span>
            </span>
          </div>

          <div
            v-if="product.weight"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Weight</span
            >
            <span class="font-medium text-right text-gray-900"
              >{{ product.weight }} <span class="text-xs">gram</span></span
            >
          </div>

          <div
            v-if="siblingColors.length > 0"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0 mt-1"
              >Colors</span
            >
            <div class="flex flex-col items-end">
              <div class="flex flex-wrap justify-end gap-2">
                <div
                  v-for="sibling in siblingColors"
                  :key="sibling.id"
                  @click="goToColorVariant(sibling.id)"
                  :class="
                    product.id === sibling.id
                      ? 'ring-2 ring-black border-transparent scale-110 shadow-md'
                      : 'border-gray-200 hover:border-gray-400'
                  "
                  class="flex items-center gap-1.5 bg-white border px-2 py-1 rounded-lg cursor-pointer transition-all duration-200"
                  :title="sibling.name"
                >
                  <div
                    class="w-3 h-3 border border-gray-300 rounded-full"
                    :style="{ backgroundColor: extractColorHex(sibling.name) }"
                  ></div>
                  <span
                    class="font-bold text-gray-800 text-[10px] uppercase tracking-wider"
                  >
                    {{ extractColorName(sibling.name) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="product.stock > 0"
          class="flex items-center gap-6 pt-4 mt-2 border-t border-gray-100"
        >
          <span
            class="text-[10px] font-bold text-gray-500 uppercase tracking-widest w-24 shrink-0"
            >Quantity</span
          >
          <div
            class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
          >
            <button
              @click="decreaseQuantity"
              class="px-4 py-2 text-lg font-bold text-gray-600 transition-colors hover:bg-gray-200"
            >
              -
            </button>
            <input
              type="number"
              v-model.number="selectedQuantity"
              @change="validateQuantity"
              class="w-12 p-0 text-sm font-bold text-center bg-transparent border-none focus:ring-0"
            />
            <button
              @click="increaseQuantity"
              class="px-4 py-2 text-lg font-bold text-gray-600 transition-colors hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 pt-4 sm:flex-row">
          <button
            @click="handleAction('cart')"
            :disabled="product.stock === 0"
            :class="[
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
                : 'hover:bg-black hover:text-white border-black text-black',
              'flex-1 py-4 border-2 font-bold text-xs uppercase tracking-widest transition',
            ]"
          >
            {{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}
          </button>

          <button
            @click="handleAction('buy')"
            :disabled="product.stock === 0"
            :class="[
              product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800 text-white',
              'flex-1 py-4 font-bold text-xs uppercase tracking-widest transition border-2 border-transparent',
            ]"
          >
            Buy It Now
          </button>
        </div>

        <div class="pt-8 border-t border-gray-200 divide-y divide-gray-200">
          <div
            v-for="section in ['Description', 'Design', 'Shipping & Returns']"
            :key="section"
            class="py-4"
          >
            <button
              @click="activeSection = activeSection === section ? null : section"
              class="flex items-center justify-between w-full text-xs font-medium tracking-widest text-left uppercase group"
            >
              <span class="transition group-hover:text-gray-500">{{ section }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
              >
                <template v-if="section !== 'Shipping & Returns'">
                  {{ product[section.toLowerCase()] || "No information available." }}
                </template>
                <template v-else
                  >Shipping options are available on the payment page through our
                  partnership with Biteship. For product returns, please refer to the
                  contact information on our Customer Care page. Returns can be
                  coordinated following an automatic refund or as part of a manual refund
                  application.</template
                >
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="recommendedProducts.length > 0"
      class="pt-16 mt-24 border-t border-gray-200"
    >
      <h2
        class="mb-10 font-serif text-2xl tracking-widest text-center text-black uppercase md:text-3xl"
      >
        You May Also Like
      </h2>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        <div
          v-for="rec in recommendedProducts"
          :key="rec.id"
          @click="goToRecommendedProduct(rec.id)"
          class="flex flex-col cursor-pointer group"
        >
          <div
            class="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-4 rounded-xl"
          >
            <img
              :src="rec.image || defaultBagIcon"
              :alt="rec.name"
              class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div
              v-if="rec.discount_price"
              class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 font-bold text-[8px] uppercase tracking-widest rounded-sm z-10"
            >
              SALE
            </div>
          </div>
          <h3
            class="mb-1 text-xs font-bold tracking-widest text-gray-900 uppercase truncate"
          >
            {{ rec.name }}
          </h3>
          <div class="flex items-center gap-2">
            <p v-if="rec.discount_price" class="text-sm font-bold text-red-600">
              {{ formatPrice(rec.discount_price) }}
            </p>
            <p
              :class="
                rec.discount_price
                  ? 'text-xs text-gray-400 line-through'
                  : 'text-sm text-gray-900 font-medium'
              "
            >
              {{ formatPrice(rec.price) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import { useCart } from "../../composables/useCart";

const { handleOptimisticAdd, selectedItemIds, fetchCarts, cartItems } = useCart();

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref("Description");
const isLoading = ref(true);

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const activeSlide = ref(0);
const selectedQuantity = ref(1);

const recommendedProducts = ref([]);
// [BARU] Menyimpan daftar ID Produk Saudara (Varian Warna)
const siblingColors = ref([]);

const decreaseQuantity = () => {
  if (selectedQuantity.value > 1) selectedQuantity.value--;
};

const increaseQuantity = () => {
  if (selectedQuantity.value < product.value.stock) selectedQuantity.value++;
};

const validateQuantity = () => {
  if (selectedQuantity.value < 1 || isNaN(selectedQuantity.value)) {
    selectedQuantity.value = 1;
  } else if (selectedQuantity.value > product.value.stock) {
    selectedQuantity.value = product.value.stock;
  }
};

const allMedia = computed(() => {
  if (!product.value) return [];
  let media = [{ type: "image", url: product.value.image || defaultBagIcon }];
  if (product.value.variant_images && Array.isArray(product.value.variant_images)) {
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
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    window.dispatchEvent(new Event("wishlist-updated"));
  } catch (error) {
    fetchWishlists();
  }
};

// ==============================================================================
// [BARU] LOGIKA PENCARIAN VARIAN WARNA BERSAUDARA
// ==============================================================================
const colorMapHex = {
  Black: "#000000",
  White: "#FFFFFF",
  Brown: "#8B4513",
  Beige: "#F5F5DC",
  Red: "#DC143C",
  Navy: "#000080",
  Green: "#008000",
  Grey: "#808080",
  Pink: "#FFC0CB",
  Yellow: "#FFD700",
  Blue: "#4169E1",
  Mocca: "#967969",
  Cream: "#FFAC68",
  Sage: "#00B46F",
  Gold: "#FFD700",
  Silver: "#C0C0C0",
};

// Mengekstrak kata terakhir dari nama produk sebagai warna
const extractColorName = (fullName) => {
  if (!fullName) return "Main";
  const words = fullName.trim().split(" ");
  // Ambil kata terakhir
  return words[words.length - 1];
};

// Mendapatkan kode hex berdasarkan warna yang diekstrak
const extractColorHex = (fullName) => {
  const colorName = extractColorName(fullName);
  // Cari di kamus, jika tidak ada, beri warna default abu-abu
  return colorMapHex[colorName] || "#cccccc";
};

// Mengambil produk bersaudara berdasarkan root nama
const fetchSiblingColors = async (productName) => {
  if (!productName) return;

  try {
    // Cari "Root Name" produk. Misal: "Diamond Tote Merah", ambil "Diamond Tote"
    const words = productName.trim().split(" ");
    let rootName = productName; // Fallback jika cuma 1 kata

    if (words.length > 1) {
      // Gabungkan semua kata kecuali kata terakhir
      words.pop();
      rootName = words.join(" ");
    }

    const res = await axios.get(`${BASE_URL}/products`);
    const allProducts = res.data.data || res.data;

    // Saring semua produk yang namanya mengandung "Root Name"
    const siblings = allProducts.filter((p) =>
      p.name.toLowerCase().includes(rootName.toLowerCase())
    );

    // Jika hanya menemukan dirinya sendiri, berarti tidak punya varian saudara
    if (siblings.length <= 1) {
      siblingColors.value = [];
    } else {
      siblingColors.value = siblings;
    }
  } catch (error) {
    console.error("Gagal menarik data varian warna:", error);
  }
};

const goToColorVariant = (siblingId) => {
  if (product.value.id === siblingId) return; // Jika klik warna yang sedang aktif, diam
  router.push(`/product/${siblingId}`);
};
// ==============================================================================

const fetchRecommendations = async (categoryId, currentProductId) => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    const allProducts = res.data.data || res.data;

    const filteredProducts = allProducts.filter(
      (p) => p.category_id === categoryId && p.id !== currentProductId
    );

    recommendedProducts.value = filteredProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  } catch (error) {
    console.error("Gagal menarik data rekomendasi:", error);
  }
};

const goToRecommendedProduct = (id) => {
  router.push(`/product/${id}`);
};

const fetchProductDetail = async () => {
  if (history.state && history.state.productData) {
    product.value = JSON.parse(history.state.productData);
    isLoading.value = false;
    fetchRecommendations(product.value.category_id, product.value.id);
    fetchSiblingColors(product.value.name); // Panggil fungsi cari warna
  } else {
    isLoading.value = true;
  }

  try {
    const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
    product.value = res.data;

    fetchWishlists();
    fetchRecommendations(product.value.category_id, product.value.id);
    fetchSiblingColors(product.value.name); // Panggil fungsi cari warna

    activeSlide.value = 0;
    selectedQuantity.value = 1;

    let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
    list = list.filter((item) => item.id !== product.value.id);
    list.unshift(product.value);
    list = list.slice(0, 6);
    localStorage.setItem("recently_viewed", JSON.stringify(list));
  } catch (error) {
    console.error("Error fetching detail:", error);
    if (!product.value) router.push("/collections");
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      fetchProductDetail();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
);

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

  if (type === "cart") {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 2000,
    });

    window.dispatchEvent(
      new CustomEvent("optimistic-add-to-cart", {
        detail: {
          product: product.value,
          cartId: null,
          quantity: selectedQuantity.value,
          color: extractColorName(product.value.name), // Kirim warna yang diekstrak ke keranjang
        },
      })
    );

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
        transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
        pointerEvents: "none",
        borderRadius: "10%",
      });

      document.body.appendChild(flyer);

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
    return;
  }

  try {
    if (type === "buy") {
      Swal.fire({
        title: "Preparing Order...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const resCart = await axios.post(
        `${BASE_URL}/carts`,
        {
          product_id: product.value.id,
          quantity: selectedQuantity.value,
          color: extractColorName(product.value.name),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCartId = resCart.data.cart_id || resCart.data.id || resCart.data.data?.id;

      await fetchCarts();
      selectedItemIds.value = [newCartId];

      Swal.close();
      router.push(`/payment`);
    }
  } catch (error) {
    Swal.close();
    Swal.fire("Error", error.response?.data?.message || "Action failed", "error");
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
      class="w-12 h-12 border-4 border-gray-100 rounded-full border-t-black animate-spin"
    ></div>
    <p class="mt-4 font-serif italic text-gray-400 animate-pulse">
      Loading Solher piece...
    </p>
  </div>

  <div v-else-if="product" class="px-6 py-12 mx-auto md:py-24 max-w-7xl animate-fade-in">
    <div class="flex flex-col gap-12 md:flex-row lg:gap-24">
      <div class="flex flex-col w-full gap-4 select-none md:w-1/2">
        <div class="relative bg-gray-100 aspect-[4/5] overflow-hidden group">
          <div
            class="flex w-full h-full transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${activeSlide * 100}%)` }"
          >
            <template v-for="(media, index) in allMedia" :key="index">
              <div class="relative flex-shrink-0 w-full h-full">
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  class="object-cover w-full h-full main-product-image"
                  alt="Product Image"
                />
                <video
                  v-else-if="media.type === 'video'"
                  :src="media.url"
                  class="object-cover w-full h-full bg-black main-product-image"
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
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 left-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
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
            class="absolute z-10 flex items-center justify-center w-10 h-10 text-black transition -translate-y-1/2 rounded-full shadow-lg opacity-0 right-4 top-1/2 bg-white/80 hover:bg-white group-hover:opacity-100"
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
            class="absolute left-0 right-0 z-10 flex justify-center gap-2 bottom-4"
            v-if="allMedia.length > 1"
          >
            <button
              v-for="(m, idx) in allMedia"
              :key="idx"
              @click="activeSlide = idx"
              :class="activeSlide === idx ? 'w-6 bg-black' : 'w-2 bg-white/80'"
              class="h-2 transition-all duration-300 rounded-full shadow-sm"
            ></button>
          </div>
        </div>

        <div
          v-if="allMedia.length > 1"
          class="flex gap-3 pb-2 overflow-x-auto custom-scrollbar"
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
            class="relative w-20 h-24 overflow-hidden transition-all border-2 cursor-pointer shrink-0 bg-gray-50"
          >
            <img
              v-if="media.type === 'image'"
              :src="media.url"
              class="object-cover w-full h-full"
            />
            <div
              v-else
              class="relative flex items-center justify-center w-full h-full text-gray-500 bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="absolute z-10 w-8 h-8"
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

      <div class="w-full space-y-8 md:w-1/2">
        <div class="space-y-4 text-center md:text-left">
          <div class="flex items-start justify-center gap-4 md:justify-between">
            <h1 class="font-serif text-3xl tracking-tighter uppercase md:text-5xl">
              {{ product.name }}
            </h1>

            <button
              @click="toggleWishlist(product.id)"
              class="flex-shrink-0 p-3 transition-colors rounded-full bg-gray-50 hover:bg-red-50"
            >
              <svg
                v-if="isFavorited"
                xmlns="http://www.w3.org/2000/svg"
                class="w-6 h-6 text-red-500 transition-transform transform hover:scale-110"
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
                class="w-6 h-6 text-gray-400 transition-transform transform hover:text-red-500 hover:scale-110"
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
          <div class="flex items-center justify-center gap-4 md:justify-start">
            <template v-if="product.discount_price">
              <p class="text-2xl font-bold text-red-600">
                {{ formatPrice(product.discount_price) }}
              </p>
              <p class="text-lg text-gray-400 line-through">
                {{ formatPrice(product.price) }}
              </p>
              <span class="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded"
                >SAVE
                {{ calculateDiscount(product.price, product.discount_price) }}%</span
              >
            </template>
            <p v-else class="text-2xl text-gray-600">
              {{ formatPrice(product.price) }}
            </p>
          </div>
        </div>

        <div
          v-if="
            product.material ||
            product.weight ||
            product.length ||
            siblingColors.length > 0
          "
          class="p-4 space-y-3 border border-gray-100 bg-gray-50/50 rounded-xl"
        >
          <div v-if="product.material" class="flex items-start justify-between text-sm">
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Material</span
            >
            <span class="font-medium text-right text-gray-900">{{
              product.material
            }}</span>
          </div>

          <div
            v-if="product.strap_length"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Strap Length</span
            >
            <span class="font-medium text-right text-gray-900">{{
              product.strap_length
            }}</span>
          </div>

          <div
            v-if="product.length || product.width || product.height"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Dimensions</span
            >
            <span class="font-mono text-right text-gray-900">
              {{ product.length || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.width || "-" }} <span class="text-xs text-gray-400">x</span>
              {{ product.height || "-" }} <span class="text-xs">cm</span>
            </span>
          </div>

          <div
            v-if="product.weight"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >Weight</span
            >
            <span class="font-medium text-right text-gray-900"
              >{{ product.weight }} <span class="text-xs">gram</span></span
            >
          </div>

          <div
            v-if="siblingColors.length > 0"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0 mt-1"
              >Colors</span
            >
            <div class="flex flex-col items-end">
              <div class="flex flex-wrap justify-end gap-2">
                <div
                  v-for="sibling in siblingColors"
                  :key="sibling.id"
                  @click="goToColorVariant(sibling.id)"
                  :class="
                    product.id === sibling.id
                      ? 'ring-2 ring-black border-transparent scale-110 shadow-md'
                      : 'border-gray-200 hover:border-gray-400'
                  "
                  class="flex items-center gap-1.5 bg-white border px-2 py-1 rounded-lg cursor-pointer transition-all duration-200"
                  :title="sibling.name"
                >
                  <div
                    class="w-3 h-3 border border-gray-300 rounded-full"
                    :style="{ backgroundColor: extractColorHex(sibling.name) }"
                  ></div>
                  <span
                    class="font-bold text-gray-800 text-[10px] uppercase tracking-wider"
                  >
                    {{ extractColorName(sibling.name) }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          v-if="product.stock > 0"
          class="flex items-center gap-6 pt-4 mt-2 border-t border-gray-100"
        >
          <span
            class="text-[10px] font-bold text-gray-500 uppercase tracking-widest w-24 shrink-0"
            >Quantity</span
          >
          <div
            class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
          >
            <button
              @click="decreaseQuantity"
              class="px-4 py-2 text-lg font-bold text-gray-600 transition-colors hover:bg-gray-200"
            >
              -
            </button>
            <input
              type="number"
              v-model.number="selectedQuantity"
              @change="validateQuantity"
              class="w-12 p-0 text-sm font-bold text-center bg-transparent border-none focus:ring-0"
            />
            <button
              @click="increaseQuantity"
              class="px-4 py-2 text-lg font-bold text-gray-600 transition-colors hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-4 pt-4 sm:flex-row">
          <button
            @click="handleAction('cart')"
            :disabled="product.stock === 0"
            :class="[
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed'
                : 'hover:bg-black hover:text-white border-black text-black',
              'flex-1 py-4 border-2 font-bold text-xs uppercase tracking-widest transition',
            ]"
          >
            {{ product.stock === 0 ? "Out of Stock" : "Add to Cart" }}
          </button>

          <button
            @click="handleAction('buy')"
            :disabled="product.stock === 0"
            :class="[
              product.stock === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-black hover:bg-gray-800 text-white',
              'flex-1 py-4 font-bold text-xs uppercase tracking-widest transition border-2 border-transparent',
            ]"
          >
            Buy It Now
          </button>
        </div>

        <div class="pt-8 border-t border-gray-200 divide-y divide-gray-200">
          <div
            v-for="section in ['Description', 'Design', 'Shipping & Returns']"
            :key="section"
            class="py-4"
          >
            <button
              @click="activeSection = activeSection === section ? null : section"
              class="flex items-center justify-between w-full text-xs font-medium tracking-widest text-left uppercase group"
            >
              <span class="transition group-hover:text-gray-500">{{ section }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
              >
                <template v-if="section !== 'Shipping & Returns'">
                  {{ product[section.toLowerCase()] || "No information available." }}
                </template>
                <template v-else
                  >Shipping options are available on the payment page through our
                  partnership with Biteship. For product returns, please refer to the
                  contact information on our Customer Care page. Returns can be
                  coordinated following an automatic refund or as part of a manual refund
                  application.</template
                >
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="recommendedProducts.length > 0"
      class="pt-16 mt-24 border-t border-gray-200"
    >
      <h2
        class="mb-10 font-serif text-2xl tracking-widest text-center text-black uppercase md:text-3xl"
      >
        You May Also Like
      </h2>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        <div
          v-for="rec in recommendedProducts"
          :key="rec.id"
          @click="goToRecommendedProduct(rec.id)"
          class="flex flex-col cursor-pointer group"
        >
          <div
            class="relative w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-4 rounded-xl"
          >
            <img
              :src="rec.image || defaultBagIcon"
              :alt="rec.name"
              class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
            />
            <div
              v-if="rec.discount_price"
              class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 font-bold text-[8px] uppercase tracking-widest rounded-sm z-10"
            >
              SALE
            </div>
          </div>
          <h3
            class="mb-1 text-xs font-bold tracking-widest text-gray-900 uppercase truncate"
          >
            {{ rec.name }}
          </h3>
          <div class="flex items-center gap-2">
            <p v-if="rec.discount_price" class="text-sm font-bold text-red-600">
              {{ formatPrice(rec.discount_price) }}
            </p>
            <p
              :class="
                rec.discount_price
                  ? 'text-xs text-gray-400 line-through'
                  : 'text-sm text-gray-900 font-medium'
              "
            >
              {{ formatPrice(rec.price) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import { useCart } from "../../composables/useCart";

const { handleOptimisticAdd, selectedItemIds, fetchCarts, cartItems } = useCart();

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref("Description");

// [PERBAIKAN] Set initial loading state to true
const isLoading = ref(true);

const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");

const activeSlide = ref(0);
const selectedQuantity = ref(1);

const recommendedProducts = ref([]);
const siblingColors = ref([]);

const decreaseQuantity = () => {
  if (selectedQuantity.value > 1) selectedQuantity.value--;
};

const increaseQuantity = () => {
  if (selectedQuantity.value < product.value.stock) selectedQuantity.value++;
};

const validateQuantity = () => {
  if (selectedQuantity.value < 1 || isNaN(selectedQuantity.value)) {
    selectedQuantity.value = 1;
  } else if (selectedQuantity.value > product.value.stock) {
    selectedQuantity.value = product.value.stock;
  }
};

const allMedia = computed(() => {
  if (!product.value) return [];
  let media = [{ type: "image", url: product.value.image || defaultBagIcon }];
  if (product.value.variant_images && Array.isArray(product.value.variant_images)) {
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
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    window.dispatchEvent(new Event("wishlist-updated"));
  } catch (error) {
    fetchWishlists();
  }
};

// ==============================================================================
// [PERBAIKAN] LOGIKA PENCARIAN VARIAN WARNA BERSAUDARA & MAP WARNA BARU
// ==============================================================================
const colorMapHex = {
  // Warna Dasar
  Black: "#000000",
  White: "#FFFFFF",
  Brown: "#8B4513",
  Beige: "#F5F5DC",
  Red: "#8B0000",
  Navy: "#000080",
  Green: "#008000",
  Grey: "#808080",
  Pink: "#FFC0CB",
  Yellow: "#FFD700",
  Blue: "#4169E1",

  // Warna Spesifik Fashion (Ditambah agar tidak menjadi abu-abu semua)
  Mocca: "#967969",
  Cream: "#FDF4E3",
  Sage: "#9DC183",
  Gold: "#D4AF37",
  Silver: "#C0C0C0",
  Maroon: "#800000",
  Olive: "#808000",
  Taupe: "#483C32",
  Khaki: "#F0E68C",
  Mustard: "#FFDB58",
  Emerald: "#50C878",
  Coral: "#FF7F50",
  Mint: "#98FF98",
  Teal: "#008080",
  Cyan: "#00FFFF",
  Indigo: "#4B0082",
  Violet: "#EE82EE",
  Purple: "#800080",
  Magenta: "#FF00FF",
  Lilac: "#C8A2C8",
  Lavender: "#E6E6FA",
  Rose: "#FF007F",
  Peach: "#FFE5B4",
  Apricot: "#FBCEB1",
  Ivory: "#FFFFF0",
  Tan: "#D2B48C",
  Charcoal: "#36454F",
  Ash: "#555555",
  Platinum: "#E5E4E2",
  Bronze: "#CD7F32",
  Copper: "#B87333",
  Rust: "#B7410E",
  Ochre: "#CC7722",
  Sienna: "#882D17",
  Terracotta: "#E2725B",
  Amber: "#FFBF00",
  Caramel: "#FFD59A",
  Honey: "#FFC30B",
  Chestnut: "#954535",
  Walnut: "#5C4033",
  Mahogany: "#C04000",
  Chocolate: "#7B3F00",
  Cocoa: "#D2691E",
  Coffee: "#6F4E37",
  Mocha: "#493D26",
  Espresso: "#4B3621",
  Cappuccino: "#654321",
  Latte: "#C5A059",
  Macchiato: "#8B5A2B",
  Almond: "#EED9C4",
  Hazelnut: "#C4A484",
  Pecan: "#8A3324",
  Pistachio: "#93C572",
  Mint: "#3EB489",
  Seafoam: "#9FE2BF",
  Turquoise: "#40E0D0",
  Aqua: "#00FFFF",
  Cyan: "#00FFFF",
  Azure: "#00FFFF",
  Sky: "#87CEEB",
  Cerulean: "#007BA7",
  Cobalt: "#0047AB",
  Sapphire: "#0F52BA",
  Ultramarine: "#120A8F",
  Lapis: "#26619C",
  Denim: "#1560BD",
  Steel: "#4682B4",
  Slate: "#708090",
  Gunmetal: "#2a3439",
  Onyx: "#353839",
  Jet: "#343434",
  Ebony: "#555D50",
  Raven: "#050301",
  Pitch: "#000000",
  Obsidian: "#0B0B0B",
  Carbon: "#333333",
  Graphite: "#383838",
  Pewter: "#8E8E8E",
  Zinc: "#8C92AC",
  Lead: "#778899",
  Iron: "#A19D94",
  Titanium: "#878681",
  Chromium: "#C0C0C0",
  Nickel: "#727472",
  Tungsten: "#A0A0A0",
  Tungsten: "#A0A0A0",
  Tungsten: "#A0A0A0",
  Tungsten: "#A0A0A0",
  Fuchsia: "#FF00FF",
  Crimson: "#DC143C",
  Carmine: "#960018",
  Ruby: "#E0115F",
  Scarlet: "#FF2400",
  Vermilion: "#E34234",
  Brick: "#CB4154",
  Tomato: "#FF6347",
  Papaya: "#FFEFD5",
  Melon: "#FDBCB4",
  Mango: "#F4A460",
  Citrus: "#FFA500",
  Lemon: "#FFF700",
  Lime: "#BFFF00",
  Kiwi: "#8EE53F",
  Apple: "#8DB600",
  Pear: "#D1E231",
  Grape: "#6F2DA8",
  Plum: "#8E4585",
  Blackberry: "#4D0135",
  Mulberry: "#C54B8C",
  Raisin: "#652DC1",
  Eggplant: "#614051",
  Aubergine: "#472C4C",
  Amethyst: "#9966CC",
  Orchid: "#DA70D6",
  Heather: "#D473D4",
  Thistle: "#D8BFD8",
  Mauve: "#E0B0FF",
  Wisteria: "#C9A0DC",
  Periwinkle: "#CCCCFF",
  Cornflower: "#6495ED",
  Baby: "#89CFF0",
  Powder: "#B0E0E6",
  Midnight: "#191970",
  Ocean: "#0077BE",
};

// Fungsi membuang sisa array dan mengambil elemen terakhir secara spesifik sebagai nama warna
const extractColorName = (fullName) => {
  if (!fullName) return "Main";
  const words = fullName.trim().split(" ");
  // Capitalize kata terakhir agar konsisten saat pencarian di dictionary
  const lastWord = words[words.length - 1];
  return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
};

const extractColorHex = (fullName) => {
  const colorName = extractColorName(fullName);
  return colorMapHex[colorName] || "#cccccc"; // Fallback ke abu-abu jika warna tidak dikenali
};

const fetchSiblingColors = async (productName) => {
  if (!productName) return;

  try {
    const words = productName.trim().split(" ");
    let rootName = productName;

    if (words.length > 1) {
      words.pop();
      rootName = words.join(" ");
    }

    const res = await axios.get(`${BASE_URL}/products`);
    const allProducts = res.data.data || res.data;

    const siblings = allProducts.filter((p) =>
      p.name.toLowerCase().includes(rootName.toLowerCase())
    );

    if (siblings.length <= 1) {
      siblingColors.value = [];
    } else {
      siblingColors.value = siblings;
    }
  } catch (error) {
    console.error("Gagal menarik data varian warna:", error);
  }
};

// [PERBAIKAN] Pindah Warna Tanpa Animasi Loading Page
const goToColorVariant = async (siblingId) => {
  if (product.value.id === siblingId) return;

  // Jangan ubah isLoading menjadi true saat pindah warna
  // isLoading.value = true; // KITA HAPUS ATAU KOMENTARI INI

  try {
    // Tarik data detail saudara warnanya secara senyap (silently)
    const res = await axios.get(`${BASE_URL}/products/${siblingId}`);

    // Ganti data produk di layar tanpa memunculkan spinner
    product.value = res.data;

    // Tarik ulang rekomendasi & wishlists
    fetchRecommendations(product.value.category_id, product.value.id);
    fetchWishlists();

    // Reset slide ke gambar pertama saudara tersebut
    activeSlide.value = 0;
    selectedQuantity.value = 1;

    // Update History URL tanpa me-refresh halaman (opsional tapi bagus untuk UX)
    window.history.pushState({}, "", `/product/${siblingId}`);
  } catch (error) {
    console.error("Gagal berpindah warna", error);
  }
};
// ==============================================================================

const fetchRecommendations = async (categoryId, currentProductId) => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    const allProducts = res.data.data || res.data;

    const filteredProducts = allProducts.filter(
      (p) => p.category_id === categoryId && p.id !== currentProductId
    );

    recommendedProducts.value = filteredProducts
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
  } catch (error) {
    console.error("Gagal menarik data rekomendasi:", error);
  }
};

const goToRecommendedProduct = (id) => {
  // Jika pindah produk dari rekomendasi, barulah kita munculkan spinner loading
  isLoading.value = true;
  router.push(`/product/${id}`);
};

const fetchProductDetail = async () => {
  // Hanya tunjukkan spinner saat PERTAMA KALI membuka halaman detail
  isLoading.value = true;

  if (history.state && history.state.productData) {
    product.value = JSON.parse(history.state.productData);
    isLoading.value = false;
    fetchRecommendations(product.value.category_id, product.value.id);
    fetchSiblingColors(product.value.name);
  } else {
    try {
      const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
      product.value = res.data;

      fetchWishlists();
      fetchRecommendations(product.value.category_id, product.value.id);
      fetchSiblingColors(product.value.name);

      activeSlide.value = 0;
      selectedQuantity.value = 1;

      let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
      list = list.filter((item) => item.id !== product.value.id);
      list.unshift(product.value);
      list = list.slice(0, 6);
      localStorage.setItem("recently_viewed", JSON.stringify(list));
    } catch (error) {
      console.error("Error fetching detail:", error);
      if (!product.value) router.push("/collections");
    } finally {
      isLoading.value = false;
    }
  }
};

watch(
  () => route.params.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      fetchProductDetail();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
);

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

  if (type === "cart") {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 2000,
    });

    window.dispatchEvent(
      new CustomEvent("optimistic-add-to-cart", {
        detail: {
          product: product.value,
          cartId: null,
          quantity: selectedQuantity.value,
          color: extractColorName(product.value.name),
        },
      })
    );

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
        transition: "all 0.7s cubic-bezier(0.25, 1, 0.5, 1)",
        pointerEvents: "none",
        borderRadius: "10%",
      });

      document.body.appendChild(flyer);

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
    return;
  }

  try {
    if (type === "buy") {
      Swal.fire({
        title: "Preparing Order...",
        allowOutsideClick: false,
        didOpen: () => Swal.showLoading(),
      });

      const resCart = await axios.post(
        `${BASE_URL}/carts`,
        {
          product_id: product.value.id,
          quantity: selectedQuantity.value,
          color: extractColorName(product.value.name),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const newCartId = resCart.data.cart_id || resCart.data.id || resCart.data.data?.id;

      await fetchCarts();
      selectedItemIds.value = [newCartId];

      Swal.close();
      router.push(`/payment`);
    }
  } catch (error) {
    Swal.close();
    Swal.fire("Error", error.response?.data?.message || "Action failed", "error");
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
