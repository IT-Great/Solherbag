<!-- <template>
  <div class="min-h-screen px-6 py-24 mx-auto max-w-7xl">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
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
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        Your Bag
      </h1>
      <span class="ml-2 font-sans text-xl text-gray-400"
        >({{ cartCount }} items)</span
      >
    </div>

    <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
      <div class="flex-grow lg:w-2/3">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 mx-auto mb-4 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p class="mb-6 font-serif text-2xl italic text-gray-400">
            Your bag is currently empty.
          </p>
          <button
            @click="$router.push('/collections')"
            class="px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-full hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>

        <div v-else class="space-y-8">
          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="relative flex flex-col gap-8 pb-8 border-b border-gray-100 sm:flex-row last:border-0"
            >
              <div
                class="relative w-full h-48 cursor-pointer sm:w-48 shrink-0"
                @click="$router.push(`/products/${item.product.id}`)"
              >
                <img
                  :src="item.product.image"
                  class="object-cover w-full h-full shadow-sm bg-gray-50 rounded-2xl"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 rounded-full border-t-black animate-spin"
                  ></div>
                </div>
              </div>

              <div class="flex flex-col justify-between flex-grow">
                <div>
                  <div class="flex items-start justify-between">
                    <h3
                      class="w-2/3 text-xl font-bold tracking-tight uppercase transition-colors cursor-pointer hover:text-gray-600"
                      @click="$router.push(`/products/${item.product.id}`)"
                    >
                      {{ item.product.name }}
                    </h3>
                    <p class="text-xl font-bold text-right">
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>
                  <p class="mt-1 text-sm italic tracking-widest text-gray-400">
                    {{
                      formatPrice(
                        item.product.discount_price ?? item.product.price,
                      )
                    }}
                    / piece
                  </p>
                </div>

                <div class="flex items-end justify-between mt-6">
                  <div
                    class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="px-5 py-3 text-lg font-bold transition-colors hover:bg-gray-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="text-base font-bold text-center bg-transparent border-none focus:ring-0 w-14"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="px-5 py-3 text-lg font-bold transition-colors hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    @click="handleOptimisticDelete(item.id)"
                    class="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 transition-transform group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove
                  </button>
                </div>

                <div class="mt-4 min-h-[1.25rem]">
                  <p
                    v-if="item.quantity >= item.product.stock"
                    class="font-bold text-[10px] text-red-600 uppercase tracking-tighter animate-pulse"
                  >
                    Out of stock! Maximum {{ item.product.stock }} reached.
                  </p>
                  <p
                    v-else-if="item.product.stock < 5"
                    class="text-[10px] text-amber-600 italic font-medium"
                  >
                    Hurry! Only {{ item.product.stock }} left in our collection.
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="lg:w-1/3">
        <div
          class="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 sticky top-32"
        >
          <h2
            class="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200"
          >
            Order Summary
          </h2>

          <div class="mb-8 space-y-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Total Items</span>
              <span class="font-bold text-black">{{ cartCount }}</span>
            </div>
            <div
              class="flex items-end justify-between pt-4 border-t border-gray-200"
            >
              <span
                class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
                >Estimated Total</span
              >
              <span class="text-2xl font-black text-black">{{
                formatPrice(totalCartAmount)
              }}</span>
            </div>
            <p class="text-[10px] text-gray-400 italic text-right mt-1">
              Tax and shipping calculated at checkout.
            </p>
          </div>

          <button
            @click="handleCheckout"
            :disabled="isProcessingCheckout"
            class="bg-black hover:bg-gray-800 disabled:bg-gray-300 shadow-xl hover:shadow-black/20 py-5 rounded-2xl w-full font-bold text-white text-sm uppercase tracking-[0.3em] transition-all duration-300 flex justify-center items-center gap-3"
          >
            <span v-if="!isProcessingCheckout">Checkout</span>
            <span v-else class="flex items-center gap-2">
              <div
                class="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"
              ></div>
              Processing...
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

// Mengambil fungsi dan state langsung dari memori Global
import { useCart } from "../../composables/useCart";

const router = useRouter();
const isProcessingCheckout = ref(false);

const {
  cartItems,
  cartCount,
  totalCartAmount,
  handleQtyChange,
  handleQtyInput,
  handleOptimisticDelete,
} = useCart();

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

// const handleCheckout = async () => {
//   isProcessingCheckout.value = true;
//   try {
//     const res = await axios.post(
//       `${BASE_URL}/checkout`,
//       {},
//       { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
//     );

//     const transactionId =
//       res.data.transaction_id || res.data.data?.transaction_id || res.data.id;
//     if (!transactionId) throw new Error("Transaction ID not found");

//     router.push(`/payment/${transactionId}`);
//   } catch (err) {
//     Swal.fire({
//       icon: "error",
//       title: "Checkout Failed",
//       text: "Unable to proceed to payment.",
//       confirmButtonColor: "#000",
//     });
//   } finally {
//     isProcessingCheckout.value = false;
//   }
// };

const handleCheckout = () => {
  // Hanya berpindah halaman, datanya sudah ada di memori useCart!
  router.push('/payment');
};
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style> -->

<!-- <template>
  <div class="min-h-screen px-6 py-24 mx-auto max-w-7xl">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
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
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        Your Bag
      </h1>
      <span class="ml-2 font-sans text-xl text-gray-400"
        >({{ cartCount }} items)</span
      >
    </div>

    <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
      <div class="flex-grow lg:w-2/3">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 mx-auto mb-4 text-gray-200"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <p class="mb-6 font-serif text-2xl italic text-gray-400">
            Your bag is currently empty.
          </p>
          <button
            @click="$router.push('/collections')"
            class="px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-full hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>

        <div v-else class="space-y-8">
          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="relative flex flex-col gap-8 pb-8 border-b border-gray-100 sm:flex-row last:border-0"
            >
              <div
                class="relative w-full h-48 cursor-pointer sm:w-48 shrink-0"
                @click="$router.push(`/products/${item.product.id}`)"
              >
                <img
                  :src="item.product.image"
                  class="object-cover w-full h-full shadow-sm bg-gray-50 rounded-2xl"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 rounded-full border-t-black animate-spin"
                  ></div>
                </div>
              </div>

              <div class="flex flex-col justify-between flex-grow">
                <div>
                  <div class="flex items-start justify-between">
                    <h3
                      class="w-2/3 text-xl font-bold tracking-tight uppercase transition-colors cursor-pointer hover:text-gray-600"
                      @click="$router.push(`/products/${item.product.id}`)"
                    >
                      {{ item.product.name }}
                    </h3>
                    <p class="text-xl font-bold text-right">
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>
                  <p class="mt-1 text-sm italic tracking-widest text-gray-400">
                    {{
                      formatPrice(
                        item.product.discount_price ?? item.product.price,
                      )
                    }}
                    / piece
                  </p>
                </div>

                <div class="flex items-end justify-between mt-6">
                  <div
                    class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="px-5 py-3 text-lg font-bold transition-colors hover:bg-gray-200"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="text-base font-bold text-center bg-transparent border-none focus:ring-0 w-14"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="px-5 py-3 text-lg font-bold transition-colors hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>

                  <button
                    @click="handleOptimisticDelete(item.id)"
                    class="flex items-center gap-2 text-xs font-bold tracking-widest text-gray-400 uppercase transition-colors group hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 transition-transform group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove
                  </button>
                </div>

                <div class="mt-4 min-h-[1.25rem]">
                  <p
                    v-if="item.quantity >= item.product.stock"
                    class="font-bold text-[10px] text-red-600 uppercase tracking-tighter animate-pulse"
                  >
                    Out of stock! Maximum {{ item.product.stock }} reached.
                  </p>
                  <p
                    v-else-if="item.product.stock < 5"
                    class="text-[10px] text-amber-600 italic font-medium"
                  >
                    Hurry! Only {{ item.product.stock }} left in our collection.
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <div v-if="suggestedProducts.length > 0" class="pt-12 border-t border-gray-100">
            <h3 class="mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase">
              You May Also Like
            </h3>
            
            <TransitionGroup name="list" tag="div" class="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div 
                v-for="product in suggestedProducts" 
                :key="product.id" 
                class="flex flex-col group"
              >
                <div 
                  class="relative mb-3 overflow-hidden cursor-pointer aspect-square rounded-2xl bg-gray-50"
                  @click="$router.push(`/products/${product.id}`)"
                >
                  <img 
                    :src="product.image" 
                    class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" 
                    alt="Suggested Product"
                  />
                  <div v-if="product.discount_price" class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm">
                    SALE
                  </div>
                </div>
                
                <h4 class="font-bold text-[10px] uppercase truncate tracking-wide text-gray-900 mb-1">
                  {{ product.name }}
                </h4>
                <p class="mb-3 text-xs font-medium text-gray-600">
                  {{ formatPrice(product.discount_price ?? product.price) }}
                </p>
                
                <button 
                  @click="addSuggestedProduct(product)"
                  class="mt-auto border border-gray-200 hover:border-black hover:bg-black hover:text-white rounded-xl py-2 px-3 text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                >
                  Add This Product
                </button>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="lg:w-1/3">
        <div class="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 sticky top-32">
          <h2 class="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200">
            Order Summary
          </h2>

          <div class="mb-8 space-y-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Total Items</span>
              <span class="font-bold text-black">{{ cartCount }}</span>
            </div>
            <div class="flex items-end justify-between pt-4 border-t border-gray-200">
              <span class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]">Estimated Total</span>
              <span class="text-2xl font-black text-black">{{ formatPrice(totalCartAmount) }}</span>
            </div>
            <p class="text-[10px] text-gray-400 italic text-right mt-1">
              Tax and shipping calculated at checkout.
            </p>
          </div>

          <button
            @click="handleCheckout"
            :disabled="isProcessingCheckout"
            class="bg-black hover:bg-gray-800 disabled:bg-gray-300 shadow-xl hover:shadow-black/20 py-5 rounded-2xl w-full font-bold text-white text-sm uppercase tracking-[0.3em] transition-all duration-300 flex justify-center items-center gap-3"
          >
            <span v-if="!isProcessingCheckout">Checkout</span>
            <span v-else class="flex items-center gap-2">
              <div class="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"></div>
              Processing...
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

// Mengambil fungsi dan state langsung dari memori Global
import { useCart } from "../../composables/useCart";

const router = useRouter();
const isProcessingCheckout = ref(false);

const {
  cartItems,
  cartCount,
  totalCartAmount,
  handleQtyChange,
  handleQtyInput,
  handleOptimisticDelete,
  handleOptimisticAdd, // [BARU] Ambil fungsi Add untuk menambahkan barang Suggested
} = useCart();

// --- LOGIKA YOU MAY ALSO LIKE ---
const allProducts = ref([]);

const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/productss`);
    // Dukung format standard laravel pagination maupun json biasa
    const data = res.data?.data?.data || res.data?.data || res.data;
    if (Array.isArray(data)) {
      allProducts.value = data;
    }
  } catch (err) {
    console.error("Gagal mengambil daftar produk", err);
  }
};

// Computed property yang SANGAT cerdas:
// Setiap kali cartItems berubah (bertambah/berkurang), computed ini akan mengeksekusi ulang secara otomatis!
const suggestedProducts = computed(() => {
  if (allProducts.value.length === 0) return [];

  // 1. Ambil ID semua produk yang SAAT INI ada di keranjang
  const cartProductIds = cartItems.value.map(item => item.product_id);

  // 2. Filter allProducts, buang yang ID nya ada di cartProductIds, 
  // serta pastikan stok > 0
  let availableProducts = allProducts.value.filter(p => 
    !cartProductIds.includes(p.id) && p.stock > 0
  );

  // 3. Acak (Shuffle) produk yang tersisa
  availableProducts.sort(() => 0.5 - Math.random());

  // 4. Ambil maksimal 4 produk teratas
  return availableProducts.slice(0, 4);
});

// Aksi ketika tombol "Add this Product" ditekan
const addSuggestedProduct = (product) => {
  // Kita meniru struktur Event yang dipakai di Header.vue saat menangkap emit dari ProductDetailPage.vue
  // (Pastikan fungsi handleOptimisticAdd di useCart.js Anda mendukung format ini)
  handleOptimisticAdd({ product: product, cartId: null }, () => {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 1500,
    });
  });
};
// --------------------------------

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const handleCheckout = () => {
  // Hanya berpindah halaman, datanya sudah ada di memori useCart!
  router.push('/payment');
};

onMounted(() => {
  fetchAllProducts();
});
</script>

<style scoped>
/* Transisi List yang Halus untuk Cart Items & Suggested Products */
.list-enter-active,
.list-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.list-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

/* Menangani elemen yang tersisa agar posisinya bergeser secara halus (Animasi Move) */
.list-move {
  transition: transform 0.4s ease;
}
/* Memastikan elemen yang di-remove tidak mengganggu animasi pindah elemen lain */
.list-leave-active {
  position: absolute;
}
</style> -->

<!-- <template>
  <div class="min-h-screen px-6 py-24 mx-auto max-w-7xl">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
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
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        Your Bag
      </h1>
      <span class="ml-2 font-sans text-xl text-gray-400"
        >({{ cartCount }} items)</span
      >
    </div>

    <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
      <div class="flex-grow lg:w-2/3">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <p class="mb-6 font-serif text-2xl italic text-gray-400">
            Your bag is currently empty.
          </p>
          <button
            @click="$router.push('/collections')"
            class="px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-full hover:bg-gray-800"
          >
            Continue Shopping
          </button>
        </div>

        <div v-else class="space-y-4">
          <div
            class="flex items-center gap-4 px-2 pb-4 mb-4 border-b border-gray-200"
          >
            <input
              type="checkbox"
              v-model="isAllSelected"
              id="selectAll"
              class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
            />
            <label
              for="selectAll"
              class="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none"
              >Select All Items</label
            >
          </div>

          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="relative flex items-start gap-4 pb-8 border-b border-gray-100 sm:gap-6 last:border-0"
            >
              <div class="pt-3 sm:pt-16">
                <input
                  type="checkbox"
                  :value="item.id"
                  v-model="selectedItemIds"
                  class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
                />
              </div>

              <div
                class="relative w-24 h-24 cursor-pointer sm:w-48 sm:h-48 shrink-0"
                @click="$router.push(`/products/${item.product.id}`)"
              >
                <img
                  :src="item.product.image"
                  class="object-cover w-full h-full shadow-sm bg-gray-50 rounded-2xl"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 rounded-full border-t-black animate-spin"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col flex-grow justify-between min-h-[6rem] sm:min-h-[12rem]"
              >
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <h3
                      class="w-2/3 text-sm font-bold tracking-tight uppercase transition-colors cursor-pointer sm:text-xl hover:text-gray-600 line-clamp-2"
                      @click="$router.push(`/products/${item.product.id}`)"
                    >
                      {{ item.product.name }}
                    </h3>
                    <p
                      class="text-sm font-bold text-right sm:text-xl whitespace-nowrap"
                    >
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>
                  <p class="mt-1 text-xs italic tracking-widest text-gray-400">
                    {{
                      formatPrice(
                        item.product.discount_price ?? item.product.price,
                      )
                    }}
                    / pc
                  </p>
                </div>

                <div
                  class="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6"
                >
                  <div
                    class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="px-4 py-2 text-base font-bold transition-colors hover:bg-gray-200 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="w-10 text-sm font-bold text-center bg-transparent border-none focus:ring-0 sm:w-14 sm:text-base"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="px-4 py-2 text-base font-bold transition-colors hover:bg-gray-200 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="handleOptimisticDelete(item.id)"
                    class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-[10px] sm:text-xs uppercase tracking-widest transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Remove
                  </button>
                </div>

                <div class="mt-2 min-h-[1.25rem]">
                  <p
                    v-if="item.quantity >= item.product.stock"
                    class="font-bold text-[9px] sm:text-[10px] text-red-600 uppercase tracking-tighter animate-pulse"
                  >
                    Out of stock! Maximum {{ item.product.stock }} reached.
                  </p>
                  <p
                    v-else-if="item.product.stock < 5"
                    class="text-[9px] sm:text-[10px] text-amber-600 italic font-medium"
                  >
                    Hurry! Only {{ item.product.stock }} left.
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>
          <div
            v-if="suggestedProducts.length > 0"
            class="pt-12 border-t border-gray-100"
          >
            <h3
              class="mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase"
            >
              You May Also Like
            </h3>

            <TransitionGroup
              name="list"
              tag="div"
              class="grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              <div
                v-for="product in suggestedProducts"
                :key="product.id"
                class="flex flex-col group"
              >
                <div
                  class="relative mb-3 overflow-hidden cursor-pointer aspect-square rounded-2xl bg-gray-50"
                  @click="$router.push(`/products/${product.id}`)"
                >
                  <img
                    :src="product.image"
                    class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    alt="Suggested Product"
                  />
                  <div
                    v-if="product.discount_price"
                    class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm"
                  >
                    SALE
                  </div>
                </div>

                <h4
                  class="font-bold text-[10px] uppercase truncate tracking-wide text-gray-900 mb-1"
                >
                  {{ product.name }}
                </h4>
                <p class="mb-3 text-xs font-medium text-gray-600">
                  {{ formatPrice(product.discount_price ?? product.price) }}
                </p>

                <button
                  @click="addSuggestedProduct(product)"
                  class="mt-auto border border-gray-200 hover:border-black hover:bg-black hover:text-white rounded-xl py-2 px-3 text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                >
                  Add This Product
                </button>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="lg:w-1/3">
        <div
          class="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 sticky top-32"
        >
          <h2
            class="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200"
          >
            Order Summary
          </h2>

          <div class="mb-8 space-y-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>Selected Items</span>
              <span class="font-bold text-black">{{ checkoutCount }}</span>
            </div>
            <div
              class="flex items-end justify-between pt-4 border-t border-gray-200"
            >
              <span
                class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
                >Estimated Total</span
              >
              <span class="text-2xl font-black text-black">{{
                formatPrice(checkoutTotalAmount)
              }}</span>
            </div>
            <p class="text-[10px] text-gray-400 italic text-right mt-1">
              Tax and shipping calculated at checkout.
            </p>
          </div>

          <button
            @click="handleCheckout"
            :disabled="isProcessingCheckout || selectedItemIds.length === 0"
            class="bg-black hover:bg-gray-800 disabled:bg-gray-300 shadow-xl hover:shadow-black/20 py-5 rounded-2xl w-full font-bold text-white text-sm uppercase tracking-[0.3em] transition-all duration-300 flex justify-center items-center gap-3"
          >
            <span v-if="!isProcessingCheckout"
              >Checkout ({{ selectedItemIds.length }})</span
            >
            <span v-else class="flex items-center gap-2"
              ><div
                class="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"
              ></div>
              Processing...</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// [PERBAIKAN] Impor Variable Baru yang Diekspos oleh useCart.js
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useCart } from "../../composables/useCart";

const router = useRouter();
const isProcessingCheckout = ref(false);

const {
  cartItems,
  cartCount,
  checkoutCount, // <-- BARU
  checkoutTotalAmount, // <-- BARU
  selectedItemIds, // <-- BARU
  isAllSelected, // <-- BARU
  handleQtyChange,
  handleQtyInput,
  handleOptimisticDelete,
  handleOptimisticAdd,
} = useCart();

// ... (logika allProducts, fetchAllProducts, suggestedProducts tetap sama persis)
const allProducts = ref([]);

const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/productss`);
    // Dukung format standard laravel pagination maupun json biasa
    const data = res.data?.data?.data || res.data?.data || res.data;
    if (Array.isArray(data)) {
      allProducts.value = data;
    }
  } catch (err) {
    console.error("Gagal mengambil daftar produk", err);
  }
};

// Computed property yang SANGAT cerdas:
// Setiap kali cartItems berubah (bertambah/berkurang), computed ini akan mengeksekusi ulang secara otomatis!
const suggestedProducts = computed(() => {
  if (allProducts.value.length === 0) return [];

  // 1. Ambil ID semua produk yang SAAT INI ada di keranjang
  const cartProductIds = cartItems.value.map((item) => item.product_id);

  // 2. Filter allProducts, buang yang ID nya ada di cartProductIds,
  // serta pastikan stok > 0
  let availableProducts = allProducts.value.filter(
    (p) => !cartProductIds.includes(p.id) && p.stock > 0,
  );

  // 3. Acak (Shuffle) produk yang tersisa
  availableProducts.sort(() => 0.5 - Math.random());

  // 4. Ambil maksimal 4 produk teratas
  return availableProducts.slice(0, 4);
});

// Aksi ketika tombol "Add this Product" ditekan
const addSuggestedProduct = (product) => {
  // Kita meniru struktur Event yang dipakai di Header.vue saat menangkap emit dari ProductDetailPage.vue
  // (Pastikan fungsi handleOptimisticAdd di useCart.js Anda mendukung format ini)
  handleOptimisticAdd({ product: product, cartId: null }, () => {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 1500,
    });
  });
};
// --------------------------------

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const handleCheckout = () => {
  // Hanya bisa checkout jika ada item yang dicentang
  if (selectedItemIds.value.length === 0) return;
  router.push("/payment");
};

onMounted(() => {
  fetchAllProducts();
});
</script> -->

<!-- <template>
  <div class="min-h-screen px-6 py-24 mx-auto max-w-7xl">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
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
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        {{ $t("cart.your_bag") }}
      </h1>
      <span class="ml-2 font-sans text-xl text-gray-400">({{ cartCount }} items)</span>
    </div>

    <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
      <div class="flex-grow lg:w-2/3">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <p class="mb-6 font-serif text-2xl italic text-gray-400">
            {{ $t("cart.your_bag_empty") }}
          </p>
          <button
            @click="$router.push('/collections')"
            class="px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-full hover:bg-gray-800"
          >
            {{ $t("cart.continue_shopping") }}
          </button>
        </div>

        <div v-else class="space-y-4">
          <div class="flex items-center gap-4 px-2 pb-4 mb-4 border-b border-gray-200">
            <input
              type="checkbox"
              v-model="isAllSelected"
              id="selectAll"
              class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
            />
            <label
              for="selectAll"
              class="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none"
              >{{ $t("cart.select_all_items") }}</label
            >
          </div>

          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="relative flex items-start gap-4 pb-8 border-b border-gray-100 sm:gap-6 last:border-0"
            >
              <div class="pt-3 sm:pt-16">
                <input
                  type="checkbox"
                  :value="item.id"
                  v-model="selectedItemIds"
                  class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
                />
              </div>

              <div
                class="relative w-24 h-24 cursor-pointer sm:w-48 sm:h-48 shrink-0"
                @click="$router.push(`/products/${item.product.slug || item.product.id}`)"
              >
                <img
                  :src="item.product.image || defaultBagIcon"
                  class="object-cover w-full h-full shadow-sm bg-gray-50 rounded-2xl"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 rounded-full border-t-black animate-spin"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col flex-grow justify-between min-h-[6rem] sm:min-h-[12rem]"
              >
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <h3
                      class="w-2/3 text-sm font-bold tracking-tight uppercase transition-colors cursor-pointer sm:text-xl hover:text-gray-600 line-clamp-2"
                      @click="
                        $router.push(`/products/${item.product.slug || item.product.id}`)
                      "
                    >
                      {{ item.product.name }}
                    </h3>

                    <p
                      v-if="item.color"
                      class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1"
                    >
                      {{ $t("cart.color") }}
                      <span class="font-bold text-gray-800">{{
                        parseColorName(item.color)
                      }}</span>
                    </p>
                    <p class="text-sm font-bold text-right sm:text-xl whitespace-nowrap">
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>

                  <div class="flex flex-wrap items-center mt-1 gap-x-3 gap-y-1">
                    <p class="text-xs italic tracking-widest text-gray-400">
                      {{ formatPrice(getActivePrice(item.product)) }}
                      / pc
                    </p>

                    <span class="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
                  </div>
                </div>

                <div
                  class="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6"
                >
                  <div
                    class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="px-4 py-2 text-base font-bold transition-colors hover:bg-gray-200 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="w-10 text-sm font-bold text-center bg-transparent border-none focus:ring-0 sm:w-14 sm:text-base"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="px-4 py-2 text-base font-bold transition-colors hover:bg-gray-200 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="handleOptimisticDelete(item.id)"
                    class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-[10px] sm:text-xs uppercase tracking-widest transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {{ $t("cart.remove") }}
                  </button>
                </div>

                <div class="mt-2 min-h-[1.25rem]">
                  <p
                    v-if="item.quantity >= item.product.stock"
                    class="font-bold text-[9px] sm:text-[10px] text-red-600 uppercase tracking-tighter animate-pulse"
                  >
                    {{ $t("cart.out_of_stock_1") }} {{ item.product.stock }}
                    {{ $t("cart.out_of_stock_2") }}
                  </p>
                  <p
                    v-else-if="item.product.stock < 5"
                    class="text-[9px] sm:text-[10px] text-amber-600 italic font-medium"
                  >
                    {{ $t("cart.stock_left_1") }} {{ item.product.stock }}
                    {{ $t("cart.stock_left_2") }}.
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <div class="pt-12 border-t border-gray-100">
            <h3 class="mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase">
              {{ $t("cart.you_may_also_like") }}
            </h3>

            <div v-if="isLoadingProducts" class="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div v-for="i in 4" :key="`skel-${i}`" class="flex flex-col gap-2">
                <div class="bg-gray-200 aspect-square rounded-2xl animate-pulse"></div>
                <div class="w-3/4 h-3 mt-1 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
                <div
                  class="w-full h-8 pt-2 mt-auto bg-gray-200 rounded-xl animate-pulse"
                ></div>
              </div>
            </div>

            <TransitionGroup
              v-else-if="suggestedProducts.length > 0"
              name="list"
              tag="div"
              class="grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              <div
                v-for="product in suggestedProducts"
                :key="product.id"
                class="flex flex-col group"
              >
                <div
                  class="relative mb-3 overflow-hidden cursor-pointer aspect-square rounded-2xl bg-gray-50"
                  @click="$router.push(`/products/${product.slug || product.id}`)"
                >
                  <img
                    :src="product.image || defaultBagIcon"
                    class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    alt="Suggested Product"
                  />
                  
                  <div
                    v-if="getDiscountStatus(product).active"
                    class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm"
                  >
                    SALE
                  </div>
                </div>

                <h4
                  class="font-bold text-[10px] uppercase truncate tracking-wide text-gray-900 mb-1"
                >
                  {{ product.name }}
                </h4>
                <p class="mb-3 text-xs font-medium text-gray-600">
                  {{ formatPrice(getActivePrice(product)) }}
                </p>

                <button
                  @click="addSuggestedProduct(product)"
                  class="mt-auto border border-gray-200 hover:border-black hover:bg-black hover:text-white rounded-xl py-2 px-3 text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                >
                  {{ $t("cart.add_this_product") }}
                </button>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="lg:w-1/3">
        <div class="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 sticky top-32">
          <h2
            class="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200"
          >
            {{ $t("cart.order_summary") }}
          </h2>

          <div class="mb-8 space-y-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>{{ $t("cart.select_items") }}</span>
              <span class="font-bold text-black">{{ checkoutCount }}</span>
            </div>
            <div class="flex items-end justify-between pt-4 border-t border-gray-200">
              <span class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]">{{
                $t("cart.estimated_total")
              }}</span>
              <span class="text-2xl font-black text-black">{{
                formatPrice(checkoutTotalAmount)
              }}</span>
            </div>
            <p class="text-[10px] text-gray-400 italic text-right mt-1">
              {{ $t("cart.tax_and_shipping") }}
            </p>
          </div>

          <button
            @click="handleCheckout"
            :disabled="isProcessingCheckout || selectedItemIds.length === 0"
            class="bg-black hover:bg-gray-800 disabled:bg-gray-300 shadow-xl hover:shadow-black/20 py-5 rounded-2xl w-full font-bold text-white text-sm uppercase tracking-[0.3em] transition-all duration-300 flex justify-center items-center gap-3"
          >
            <span v-if="!isProcessingCheckout"
              >{{ $t("cart.checkout") }} ({{ selectedItemIds.length }})</span
            >
            <span v-else class="flex items-center gap-2"
              ><div
                class="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"
              ></div>
              {{ $t("cart.processing") }}</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
// import { useCart } from "../../composables/useCart";
import { useCart, getActivePrice, getDiscountStatus } from "../../composables/useCart";

import { formatPrice } from "../../utils/currency";

// [BARU] Import gambar default
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const router = useRouter();
const isProcessingCheckout = ref(false);

const {
  cartItems,
  cartCount,
  checkoutCount,
  checkoutTotalAmount,
  selectedItemIds,
  isAllSelected,
  handleQtyChange,
  handleQtyInput,
  handleOptimisticDelete,
  handleOptimisticAdd,
} = useCart();

const allProducts = ref([]);
const isLoadingProducts = ref(true); // [BARU] State loading untuk produk

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// ==========================================
// [PERBAIKAN] LOGIKA STATUS DISKON & ZONA WAKTU
// ==========================================
const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(date.getHours() + 7);
  return date;
};

const fetchAllProducts = async () => {
  isLoadingProducts.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    const data = res.data?.data?.data || res.data?.data || res.data;
    if (Array.isArray(data)) {
      allProducts.value = data;
    }
  } catch (err) {
    console.error("Gagal mengambil daftar produk", err);
  } finally {
    // Sedikit delay agar animasi skeleton terlihat smooth
    setTimeout(() => {
      isLoadingProducts.value = false;
    }, 500);
  }
};

const suggestedProducts = computed(() => {
  if (allProducts.value.length === 0) return [];

  const cartProductIds = cartItems.value.map((item) => item.product_id);

  let availableProducts = allProducts.value.filter(
    (p) => !cartProductIds.includes(p.id) && p.stock > 0
  );

  availableProducts.sort(() => 0.5 - Math.random());

  return availableProducts.slice(0, 4);
});

// [BARU] Fungsi pemecah string warna untuk tampilan Cart
const parseColorName = (colorString) => {
  if (!colorString) return "";
  return colorString.includes("|") ? colorString.split("|")[0] : colorString;
};

const addSuggestedProduct = (product) => {
  handleOptimisticAdd({ product: product, cartId: null }, () => {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 1500,
    });
  });
};

// const formatPrice = (v) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(v);

const handleCheckout = () => {
  if (selectedItemIds.value.length === 0) return;
  router.push("/payment");
};

onMounted(() => {
  fetchAllProducts();

  // Dengarkan perubahan mata uang
  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
});
</script> -->

<!-- <template>
  <div class="min-h-screen px-6 py-24 mx-auto max-w-7xl">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
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
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        {{ $t("cart.your_bag") }}
      </h1>
      <span class="ml-2 font-sans text-xl text-gray-400">({{ cartCount }} items)</span>
    </div>

    <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
      <div class="flex-grow lg:w-2/3">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <p class="mb-6 font-serif text-2xl italic text-gray-400">
            {{ $t("cart.your_bag_empty") }}
          </p>
          <button
            @click="$router.push('/collections')"
            class="px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-full hover:bg-gray-800"
          >
            {{ $t("cart.continue_shopping") }}
          </button>
        </div>

        <div v-else class="space-y-4">
          <div class="flex items-center gap-4 px-2 pb-4 mb-4 border-b border-gray-200">
            <input
              type="checkbox"
              v-model="isAllSelected"
              id="selectAll"
              class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
            />
            <label
              for="selectAll"
              class="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none"
              >{{ $t("cart.select_all_items") }}</label
            >
          </div>

          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="relative flex items-start gap-4 pb-8 border-b border-gray-100 sm:gap-6 last:border-0"
            >
              <div class="pt-3 sm:pt-16">
                <input
                  type="checkbox"
                  :value="item.id"
                  v-model="selectedItemIds"
                  class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
                />
              </div>

              <div
                class="relative w-24 h-24 cursor-pointer sm:w-48 sm:h-48 shrink-0"
                @click="$router.push(`/products/${item.product.slug || item.product.id}`)"
              >
                <img
                  :src="item.product.image || defaultBagIcon"
                  class="object-cover w-full h-full shadow-sm bg-gray-50 rounded-2xl"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 rounded-full border-t-black animate-spin"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col flex-grow justify-between min-h-[6rem] sm:min-h-[12rem]"
              >
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <h3
                      class="w-2/3 text-sm font-bold tracking-tight uppercase transition-colors cursor-pointer sm:text-xl hover:text-gray-600 line-clamp-2"
                      @click="
                        $router.push(`/products/${item.product.slug || item.product.id}`)
                      "
                    >
                      {{ item.product.name }}
                    </h3>

                    <p
                      v-if="item.color"
                      class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1"
                    >
                      {{ $t("cart.color") }}
                      <span class="font-bold text-gray-800">{{
                        parseColorName(item.color)
                      }}</span>
                    </p>

                    <p class="text-sm font-bold text-right sm:text-xl whitespace-nowrap">
                      {{
                        formatCurrencyDisplay({
                          value:
                            item.quantity * getActivePrice(item.product, currentCurrency),
                          curr: currentCurrency,
                        })
                      }}
                    </p>
                  </div>

                  <div class="flex flex-wrap items-center mt-1 gap-x-3 gap-y-1">
                    <p class="text-xs italic tracking-widest text-gray-400">
                      {{
                        formatCurrencyDisplay({
                          value: getActivePrice(item.product, currentCurrency),
                          curr: currentCurrency,
                        })
                      }}
                      / pc
                    </p>
                    <span class="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
                  </div>
                </div>

                <div
                  class="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6"
                >
                  <div
                    class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="px-4 py-2 text-base font-bold transition-colors hover:bg-gray-200 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="w-10 text-sm font-bold text-center bg-transparent border-none focus:ring-0 sm:w-14 sm:text-base"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="px-4 py-2 text-base font-bold transition-colors hover:bg-gray-200 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="handleOptimisticDelete(item.id)"
                    class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-[10px] sm:text-xs uppercase tracking-widest transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {{ $t("cart.remove") }}
                  </button>
                </div>

                <div class="mt-2 min-h-[1.25rem]">
                  <p
                    v-if="item.quantity >= item.product.stock"
                    class="font-bold text-[9px] sm:text-[10px] text-red-600 uppercase tracking-tighter animate-pulse"
                  >
                    {{ $t("cart.out_of_stock_1") }} {{ item.product.stock }}
                    {{ $t("cart.out_of_stock_2") }}
                  </p>
                  <p
                    v-else-if="item.product.stock < 5"
                    class="text-[9px] sm:text-[10px] text-amber-600 italic font-medium"
                  >
                    {{ $t("cart.stock_left_1") }} {{ item.product.stock }}
                    {{ $t("cart.stock_left_2") }}.
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <div class="pt-12 border-t border-gray-100">
            <h3 class="mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase">
              {{ $t("cart.you_may_also_like") }}
            </h3>

            <div v-if="isLoadingProducts" class="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div v-for="i in 4" :key="`skel-${i}`" class="flex flex-col gap-2">
                <div class="bg-gray-200 aspect-square rounded-2xl animate-pulse"></div>
                <div class="w-3/4 h-3 mt-1 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
                <div
                  class="w-full h-8 pt-2 mt-auto bg-gray-200 rounded-xl animate-pulse"
                ></div>
              </div>
            </div>

            <TransitionGroup
              v-else-if="suggestedProducts.length > 0"
              name="list"
              tag="div"
              class="grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              <div
                v-for="product in suggestedProducts"
                :key="product.id"
                class="flex flex-col group"
              >
                <div
                  class="relative mb-3 overflow-hidden cursor-pointer aspect-square rounded-2xl bg-gray-50"
                  @click="$router.push(`/products/${product.slug || product.id}`)"
                >
                  <img
                    :src="product.image || defaultBagIcon"
                    class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    alt="Suggested Product"
                  />

                  <div
                    v-if="getDiscountStatus(product, currentCurrency).active"
                    class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm"
                  >
                    SALE
                  </div>
                </div>

                <h4
                  class="font-bold text-[10px] uppercase truncate tracking-wide text-gray-900 mb-1"
                >
                  {{ product.name }}
                </h4>

                <p class="mb-3 text-xs font-medium text-gray-600">
                  {{
                    formatCurrencyDisplay({
                      value: getActivePrice(product, currentCurrency),
                      curr: currentCurrency,
                    })
                  }}
                </p>

                <button
                  @click="addSuggestedProduct(product)"
                  class="mt-auto border border-gray-200 hover:border-black hover:bg-black hover:text-white rounded-xl py-2 px-3 text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                >
                  {{ $t("cart.add_this_product") }}
                </button>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="lg:w-1/3">
        <div class="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 sticky top-32">
          <h2
            class="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200"
          >
            {{ $t("cart.order_summary") }}
          </h2>

          <div class="mb-8 space-y-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>{{ $t("cart.select_items") }}</span>
              <span class="font-bold text-black">{{ checkoutCount }}</span>
            </div>
            <div class="flex items-end justify-between pt-4 border-t border-gray-200">
              <span class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]">{{
                $t("cart.estimated_total")
              }}</span>

              <span class="text-2xl font-black text-black">{{
                formatCurrencyDisplay({
                  value: checkoutTotalAmount,
                  curr: currentCurrency,
                })
              }}</span>
            </div>
            <p class="text-[10px] text-gray-400 italic text-right mt-1">
              {{ $t("cart.tax_and_shipping") }}
            </p>
          </div>

          <button
            @click="handleCheckout"
            :disabled="isProcessingCheckout || selectedItemIds.length === 0"
            class="bg-black hover:bg-gray-800 disabled:bg-gray-300 shadow-xl hover:shadow-black/20 py-5 rounded-2xl w-full font-bold text-white text-sm uppercase tracking-[0.3em] transition-all duration-300 flex justify-center items-center gap-3"
          >
            <span v-if="!isProcessingCheckout"
              >{{ $t("cart.checkout") }} ({{ selectedItemIds.length }})</span
            >
            <span v-else class="flex items-center gap-2"
              ><div
                class="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"
              ></div>
              {{ $t("cart.processing") }}</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useCart, getActivePrice, getDiscountStatus } from "../../composables/useCart";

import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const router = useRouter();
const isProcessingCheckout = ref(false);

const {
  cartItems,
  cartCount,
  checkoutCount,
  checkoutTotalAmount,
  selectedItemIds,
  isAllSelected,
  triggerCurrencyUpdate,
  handleQtyChange,
  handleQtyInput,
  handleOptimisticDelete,
  handleOptimisticAdd,
} = useCart();

const allProducts = ref([]);
const isLoadingProducts = ref(true);

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
  triggerCurrencyUpdate(); // Beritahu composable kalau currency ganti
};

// Helper Format Currency khusus
const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;

  const symbols = {
    USD: "$",
    SGD: "S$",
    EUR: "€",
    AUD: "A$",
    MYR: "RM",
    IDR: "Rp ",
  };

  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });

  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

const fetchAllProducts = async () => {
  isLoadingProducts.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    const data = res.data?.data?.data || res.data?.data || res.data;
    if (Array.isArray(data)) {
      allProducts.value = data;
    }
  } catch (err) {
    console.error("Gagal mengambil daftar produk", err);
  } finally {
    setTimeout(() => {
      isLoadingProducts.value = false;
    }, 500);
  }
};

const suggestedProducts = computed(() => {
  if (allProducts.value.length === 0) return [];

  const cartProductIds = cartItems.value.map((item) => item.product_id);

  let availableProducts = allProducts.value.filter(
    (p) => !cartProductIds.includes(p.id) && p.stock > 0
  );

  availableProducts.sort(() => 0.5 - Math.random());

  return availableProducts.slice(0, 4);
});

const parseColorName = (colorString) => {
  if (!colorString) return "";
  return colorString.includes("|") ? colorString.split("|")[0] : colorString;
};

const addSuggestedProduct = (product) => {
  handleOptimisticAdd({ product: product, cartId: null }, () => {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 1500,
    });
  });
};

const handleCheckout = () => {
  if (selectedItemIds.value.length === 0) return;
  router.push("/payment");
};

onMounted(() => {
  fetchAllProducts();

  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
});
</script> -->

<!-- <template>
  <div class="min-h-screen px-6 py-24 mx-auto max-w-7xl">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
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
      <h1 class="font-serif text-4xl tracking-tighter uppercase md:text-5xl">
        {{ $t("cart.your_bag") }}
      </h1>
      <span class="ml-2 font-sans text-xl text-gray-400">({{ cartCount }} items)</span>
    </div>

    <div v-if="fomoAlerts.length > 0" class="mb-8 space-y-3">
      <div
        v-for="(alert, index) in fomoAlerts"
        :key="index"
        class="flex items-center gap-4 p-4 border shadow-sm rounded-2xl bg-amber-50 border-amber-200 animate-fade-in"
      >
        <span class="text-3xl animate-bounce">🔥</span>
        <div>
          <p class="text-sm font-bold leading-tight text-amber-900">
            Add
            <span class="font-black text-red-600">{{ alert.neededQty }} more</span>
            item(s) from the
            <strong class="uppercase">{{ alert.categoryName }}</strong> collection!
          </p>
          <p class="text-xs text-amber-700 mt-0.5">
            To unlock the bundle deal:
            <strong class="text-black"
              >{{ alert.bundleQty }} items for
              {{
                formatCurrencyDisplay({
                  value: alert.bundlePrice,
                  curr: alert.bundleCurr,
                })
              }}</strong
            >.
          </p>
        </div>
        <button
          @click="$router.push('/collections?category=' + alert.categoryName)"
          class="px-4 py-2 ml-auto text-xs font-bold tracking-widest text-white uppercase transition-colors bg-black rounded-full hover:bg-gray-800 shrink-0"
        >
          Shop Now
        </button>
      </div>
    </div>
    <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
      <div class="flex-grow lg:w-2/3">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <p class="mb-6 font-serif text-2xl italic text-gray-400">
            {{ $t("cart.your_bag_empty") }}
          </p>
          <button
            @click="$router.push('/collections')"
            class="px-8 py-4 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-full hover:bg-gray-800"
          >
            {{ $t("cart.continue_shopping") }}
          </button>
        </div>

        <div v-else class="space-y-4">
          <div class="flex items-center gap-4 px-2 pb-4 mb-4 border-b border-gray-200">
            <input
              type="checkbox"
              v-model="isAllSelected"
              id="selectAll"
              class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
            />
            <label
              for="selectAll"
              class="text-xs font-bold tracking-widest text-gray-800 uppercase cursor-pointer select-none"
            >
              {{ $t("cart.select_all_items") }}
            </label>
          </div>

          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="relative flex items-start gap-4 pb-8 border-b border-gray-100 sm:gap-6 last:border-0"
            >
              <div class="pt-3 sm:pt-16">
                <input
                  type="checkbox"
                  :value="item.id"
                  v-model="selectedItemIds"
                  class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
                />
              </div>

              <div
                class="relative w-24 h-24 cursor-pointer sm:w-48 sm:h-48 shrink-0"
                @click="$router.push(`/products/${item.product.slug || item.product.id}`)"
              >
                <img
                  :src="item.product.image || defaultBagIcon"
                  class="object-cover w-full h-full shadow-sm bg-gray-50 rounded-2xl"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 rounded-full border-t-black animate-spin"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col flex-grow justify-between min-h-[6rem] sm:min-h-[12rem]"
              >
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <h3
                      class="w-2/3 text-sm font-bold tracking-tight uppercase transition-colors cursor-pointer sm:text-xl hover:text-gray-600 line-clamp-2"
                      @click="
                        $router.push(`/products/${item.product.slug || item.product.id}`)
                      "
                    >
                      {{ item.product.name }}
                    </h3>

                    <p
                      v-if="item.color"
                      class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1"
                    >
                      {{ $t("cart.color") }}
                      <span class="font-bold text-gray-800">{{
                        parseColorName(item.color)
                      }}</span>
                    </p>

                    <p class="text-sm font-bold text-right sm:text-xl whitespace-nowrap">
                      {{
                        formatCurrencyDisplay({
                          value:
                            item.quantity * getActivePrice(item.product, currentCurrency),
                          curr: currentCurrency,
                        })
                      }}
                    </p>
                  </div>

                  <div class="flex flex-wrap items-center mt-1 gap-x-3 gap-y-1">
                    <p class="text-xs italic tracking-widest text-gray-400">
                      {{
                        formatCurrencyDisplay({
                          value: getActivePrice(item.product, currentCurrency),
                          curr: currentCurrency,
                        })
                      }}
                      / pc
                    </p>
                    <span class="hidden w-1 h-1 bg-gray-300 rounded-full sm:block"></span>
                  </div>
                </div>

                <div
                  class="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end sm:mt-6"
                >
                  <div
                    class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-gray-50 rounded-xl"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="px-4 py-2 text-base font-bold transition-colors hover:bg-gray-200 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="w-10 text-sm font-bold text-center bg-transparent border-none focus:ring-0 sm:w-14 sm:text-base"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="px-4 py-2 text-base font-bold transition-colors hover:bg-gray-200 sm:px-5 sm:py-3 sm:text-lg"
                    >
                      +
                    </button>
                  </div>
                  <button
                    @click="handleOptimisticDelete(item.id)"
                    class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-[10px] sm:text-xs uppercase tracking-widest transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 transition-transform sm:w-5 sm:h-5 group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {{ $t("cart.remove") }}
                  </button>
                </div>

                <div class="mt-2 min-h-[1.25rem]">
                  <p
                    v-if="item.quantity >= item.product.stock"
                    class="font-bold text-[9px] sm:text-[10px] text-red-600 uppercase tracking-tighter animate-pulse"
                  >
                    {{ $t("cart.out_of_stock_1") }} {{ item.product.stock }}
                    {{ $t("cart.out_of_stock_2") }}
                  </p>
                  <p
                    v-else-if="item.product.stock < 5"
                    class="text-[9px] sm:text-[10px] text-amber-600 italic font-medium"
                  >
                    {{ $t("cart.stock_left_1") }} {{ item.product.stock }}
                    {{ $t("cart.stock_left_2") }}.
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>
          <div class="pt-12 border-t border-gray-100">
            <h3 class="mb-6 text-sm font-bold tracking-widest text-gray-800 uppercase">
              {{ $t("cart.you_may_also_like") }}
            </h3>

            <div v-if="isLoadingProducts" class="grid grid-cols-2 gap-6 md:grid-cols-4">
              <div v-for="i in 4" :key="`skel-${i}`" class="flex flex-col gap-2">
                <div class="bg-gray-200 aspect-square rounded-2xl animate-pulse"></div>
                <div class="w-3/4 h-3 mt-1 bg-gray-200 rounded animate-pulse"></div>
                <div class="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
                <div
                  class="w-full h-8 pt-2 mt-auto bg-gray-200 rounded-xl animate-pulse"
                ></div>
              </div>
            </div>

            <TransitionGroup
              v-else-if="suggestedProducts.length > 0"
              name="list"
              tag="div"
              class="grid grid-cols-2 gap-6 md:grid-cols-4"
            >
              <div
                v-for="product in suggestedProducts"
                :key="product.id"
                class="flex flex-col group"
              >
                <div
                  class="relative mb-3 overflow-hidden cursor-pointer aspect-square rounded-2xl bg-gray-50"
                  @click="$router.push(`/products/${product.slug || product.id}`)"
                >
                  <img
                    :src="product.image || defaultBagIcon"
                    class="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                    alt="Suggested Product"
                  />

                  <div
                    v-if="getDiscountStatus(product, currentCurrency).active"
                    class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm"
                  >
                    SALE
                  </div>
                </div>

                <h4
                  class="font-bold text-[10px] uppercase truncate tracking-wide text-gray-900 mb-1"
                >
                  {{ product.name }}
                </h4>

                <p class="mb-3 text-xs font-medium text-gray-600">
                  {{
                    formatCurrencyDisplay({
                      value: getActivePrice(product, currentCurrency),
                      curr: currentCurrency,
                    })
                  }}
                </p>

                <button
                  @click="addSuggestedProduct(product)"
                  class="mt-auto border border-gray-200 hover:border-black hover:bg-black hover:text-white rounded-xl py-2 px-3 text-[9px] font-bold uppercase tracking-widest transition-all duration-300"
                >
                  {{ $t("cart.add_this_product") }}
                </button>
              </div>
            </TransitionGroup>
          </div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="lg:w-1/3">
        <div class="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 sticky top-32">
          <h2
            class="pb-4 mb-8 text-lg font-bold tracking-widest text-gray-900 uppercase border-b border-gray-200"
          >
            {{ $t("cart.order_summary") }}
          </h2>

          <div class="mb-8 space-y-4">
            <div class="flex justify-between text-sm text-gray-600">
              <span>{{ $t("cart.select_items") }}</span>
              <span class="font-bold text-black">{{ checkoutCount }}</span>
            </div>

            <div
              v-if="bundleDiscountAmount > 0"
              class="flex justify-between px-3 py-2 text-sm font-bold border text-emerald-600 bg-emerald-50 rounded-xl border-emerald-100"
            >
              <span class="uppercase tracking-widest text-[10px] mt-0.5"
                >Bundle Saved</span
              >
              <span
                >-
                {{
                  formatCurrencyDisplay({
                    value: bundleDiscountAmount,
                    curr: currentCurrency,
                  })
                }}</span
              >
            </div>
            <div class="flex items-end justify-between pt-4 border-t border-gray-200">
              <span class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]">{{
                $t("cart.estimated_total")
              }}</span>
              <span class="text-2xl font-black text-black">
                {{
                  formatCurrencyDisplay({
                    value: checkoutTotalAmount,
                    curr: currentCurrency,
                  })
                }}
              </span>
            </div>
            <p class="text-[10px] text-gray-400 italic text-right mt-1">
              {{ $t("cart.tax_and_shipping") }}
            </p>
          </div>

          <button
            @click="handleCheckout"
            :disabled="isProcessingCheckout || selectedItemIds.length === 0"
            class="bg-black hover:bg-gray-800 disabled:bg-gray-300 shadow-xl hover:shadow-black/20 py-5 rounded-2xl w-full font-bold text-white text-sm uppercase tracking-[0.3em] transition-all duration-300 flex justify-center items-center gap-3"
          >
            <span v-if="!isProcessingCheckout"
              >{{ $t("cart.checkout") }} ({{ selectedItemIds.length }})</span
            >
            <span v-else class="flex items-center gap-2"
              ><div
                class="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin"
              ></div>
              {{ $t("cart.processing") }}</span
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useCart, getActivePrice, getDiscountStatus } from "../../composables/useCart"; 

import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const router = useRouter();
const isProcessingCheckout = ref(false);

const {
  cartItems,
  bundleDiscountAmount,
  fomoAlerts,
  cartCount,
  checkoutCount,
  checkoutTotalAmount,
  selectedItemIds,
  isAllSelected,
  triggerCurrencyUpdate,
  handleQtyChange,
  handleQtyInput,
  handleOptimisticDelete,
  handleOptimisticAdd,
} = useCart();

const allProducts = ref([]);

const isLoadingProducts = ref(true);

const suggestedProducts = computed(() => {
  if (allProducts.value.length === 0) return [];

  const cartProductIds = cartItems.value.map((item) => item.product_id);

  let availableProducts = allProducts.value.filter(
    (p) => !cartProductIds.includes(p.id) && p.stock > 0
  );

  availableProducts.sort(() => 0.5 - Math.random());

  return availableProducts.slice(0, 4);
});

const addSuggestedProduct = (product) => {
  handleOptimisticAdd({ product: product, cartId: null }, () => {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 1500,
    });
  });
};

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
  triggerCurrencyUpdate();
};

const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;

  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });

  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

const fetchAllProducts = async () => {
  isLoadingProducts.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    const data = res.data?.data?.data || res.data?.data || res.data;
    if (Array.isArray(data)) {
      allProducts.value = data;
    }
  } catch (err) {
    console.error("Gagal mengambil daftar produk", err);
  } finally {
    setTimeout(() => {
      isLoadingProducts.value = false;
    }, 500);
  }
};

const parseColorName = (colorString) => {
  return colorString && colorString.includes("|")
    ? colorString.split("|")[0]
    : colorString;
};

const handleCheckout = () => {
  if (selectedItemIds.value.length === 0) return;
  router.push("/payment");
};

onMounted(() => {
  fetchAllProducts();
  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
});
</script> -->

<template>
  <div class="min-h-screen px-6 py-12 mx-auto md:py-24 max-w-7xl animate-fade-in">
    <!-- Header -->
    <div class="flex items-center gap-4 mb-8 md:mb-10">
      <button
        @click="$router.push('/collections')"
        class="p-2.5 transition bg-white border border-gray-200 rounded-full shadow-sm hover:bg-gray-50 hover:scale-105"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5 text-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1
        class="font-serif text-3xl tracking-tighter uppercase md:text-5xl text-gray-900"
      >
        {{ $t("cart.your_bag") }}
      </h1>
      <span class="ml-2 font-sans text-lg md:text-xl font-bold text-gray-400"
        >({{ cartCount }})</span
      >
    </div>

    <!-- 👇 [CRO 1] URGENCY BANNER (Real Data Scarcity) 👇 -->
    <div
      v-if="hasLowStockItems"
      class="flex items-center gap-3 p-4 mb-8 text-amber-900 bg-amber-50 border border-amber-200 rounded-2xl shadow-sm"
    >
      <span
        class="flex items-center justify-center w-8 h-8 text-lg bg-amber-100 rounded-full animate-pulse shrink-0"
        >⏳</span
      >
      <div>
        <p class="text-[11px] font-black tracking-widest uppercase text-amber-800">
          High Demand
        </p>
        <p class="text-sm font-medium">
          Beberapa barang di keranjang Anda hampir habis. Selesaikan pesanan sebelum
          kehabisan!
        </p>
      </div>
    </div>

    <!-- 👇 [CRO 2] FOMO ALERTS (Bundle Deals) 👇 -->
    <div v-if="fomoAlerts.length > 0" class="mb-8 space-y-3">
      <div
        v-for="(alert, index) in fomoAlerts"
        :key="index"
        class="flex flex-col sm:flex-row sm:items-center gap-4 p-5 border shadow-md rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-100"
      >
        <div class="flex items-start gap-4 flex-grow">
          <span class="text-3xl animate-bounce">🎁</span>
          <div>
            <p class="text-sm font-bold leading-tight text-indigo-900">
              Tambah
              <span class="font-black text-red-600 bg-white px-2 py-0.5 rounded shadow-sm"
                >{{ alert.neededQty }} lagi</span
              >
              dari koleksi <strong class="uppercase">{{ alert.categoryName }}</strong
              >!
            </p>
            <p class="text-xs text-indigo-700 mt-1.5 font-medium">
              Aktifkan Harga Bundle:
              <strong class="text-indigo-900 bg-indigo-100 px-1.5 py-0.5 rounded">
                {{ alert.bundleQty }} items for
                {{
                  formatCurrencyDisplay({
                    value: alert.bundlePrice,
                    curr: alert.bundleCurr,
                  })
                }}
              </strong>
            </p>
          </div>
        </div>
        <button
          @click="$router.push('/collections?category=' + alert.categoryName)"
          class="w-full sm:w-auto px-6 py-2.5 text-xs font-black tracking-widest text-white uppercase transition-all bg-indigo-600 rounded-full hover:bg-indigo-700 shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0"
        >
          Klaim Promo
        </button>
      </div>
    </div>

    <div class="flex flex-col gap-10 lg:flex-row lg:gap-16">
      <!-- KIRI: DAFTAR KERANJANG -->
      <div class="flex-grow lg:w-3/5 xl:w-2/3">
        <div
          v-if="cartItems.length === 0"
          class="py-24 text-center border-t border-gray-100 bg-gray-50/50 rounded-3xl border-dashed border-2"
        >
          <div
            class="w-20 h-20 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-10 h-10 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
          <p class="mb-2 font-serif text-2xl font-bold text-gray-900">
            {{ $t("cart.your_bag_empty") }}
          </p>
          <p class="mb-8 text-sm text-gray-500">
            Temukan gaya baru untuk melengkapi penampilan Anda.
          </p>
          <button
            @click="$router.push('/collections')"
            class="px-8 py-4 text-xs font-black tracking-widest text-white uppercase transition-all bg-black rounded-full hover:bg-gray-800 shadow-xl hover:scale-105"
          >
            {{ $t("cart.continue_shopping") }}
          </button>
        </div>

        <div v-else class="space-y-2">
          <div
            class="flex items-center justify-between px-2 pb-4 mb-2 border-b border-gray-200"
          >
            <div class="flex items-center gap-3">
              <input
                type="checkbox"
                v-model="isAllSelected"
                id="selectAll"
                class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
              />
              <label
                for="selectAll"
                class="text-[10px] font-black tracking-widest text-gray-800 uppercase cursor-pointer select-none"
              >
                {{ $t("cart.select_all_items") }}
              </label>
            </div>
            <button
              @click="deleteSelectedItems"
              v-if="selectedItemIds.length > 0"
              class="text-[10px] font-bold tracking-widest text-red-500 uppercase hover:text-red-700 transition-colors"
            >
              Hapus Terpilih
            </button>
          </div>

          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="relative flex items-start gap-4 py-6 border-b border-gray-100 sm:gap-6 last:border-0 group"
            >
              <div class="pt-8 sm:pt-16">
                <input
                  type="checkbox"
                  :value="item.id"
                  v-model="selectedItemIds"
                  class="w-5 h-5 text-black transition border-gray-300 rounded shadow-sm cursor-pointer focus:ring-black"
                />
              </div>

              <div
                class="relative w-28 h-32 sm:w-40 sm:h-48 cursor-pointer shrink-0 rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-transform group-hover:shadow-md"
                @click="$router.push(`/products/${item.product.slug || item.product.id}`)"
              >
                <img
                  :src="item.product.image || defaultBagIcon"
                  class="object-cover w-full h-full bg-gray-50 transition-transform duration-700 group-hover:scale-110"
                />

                <div
                  v-if="getDiscountStatus(item.product, currentCurrency).active"
                  class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded shadow-sm"
                >
                  SALE
                </div>

                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 rounded-full border-t-black animate-spin"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col flex-grow justify-between min-h-[8rem] sm:min-h-[12rem] py-1"
              >
                <div>
                  <div class="flex items-start justify-between gap-2">
                    <h3
                      class="w-2/3 text-sm font-bold tracking-wide uppercase transition-colors cursor-pointer sm:text-lg hover:text-red-700 line-clamp-2"
                      @click="
                        $router.push(`/products/${item.product.slug || item.product.id}`)
                      "
                    >
                      {{ item.product.name }}
                    </h3>

                    <div class="flex flex-col items-end">
                      <p
                        class="text-sm font-black text-right sm:text-xl text-gray-900 whitespace-nowrap"
                      >
                        {{
                          formatCurrencyDisplay({
                            value:
                              item.quantity *
                              getActivePrice(item.product, currentCurrency),
                            curr: currentCurrency,
                          })
                        }}
                      </p>
                      <!-- Tampilkan Harga Coret Jika Ada Diskon (Murni Real Data) -->
                      <p
                        v-if="getDiscountStatus(item.product, currentCurrency).active"
                        class="text-[10px] sm:text-xs text-gray-400 line-through mt-0.5 font-medium"
                      >
                        {{
                          formatCurrencyDisplay({
                            value: item.quantity * getPriceToDisplay(item.product).value,
                            curr: currentCurrency,
                          })
                        }}
                      </p>
                    </div>
                  </div>

                  <p
                    v-if="item.color"
                    class="text-[10px] sm:text-xs text-gray-500 uppercase tracking-widest mt-1.5 flex items-center gap-1.5"
                  >
                    <span
                      class="w-3 h-3 rounded-full border border-gray-300 shadow-inner block"
                      :style="{ backgroundColor: extractColorHex(item.color) }"
                    ></span>
                    <span class="font-bold text-gray-800">{{
                      parseColorName(item.color)
                    }}</span>
                  </p>
                </div>

                <div
                  class="flex flex-col items-start gap-4 mt-4 sm:flex-row sm:justify-between sm:items-end"
                >
                  <!-- Stepper Qty Mewah -->
                  <div
                    class="flex items-center overflow-hidden border border-gray-200 shadow-sm bg-white rounded-xl"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="w-10 h-10 text-lg font-medium transition-colors hover:bg-gray-100 flex justify-center items-center text-gray-600"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="w-10 p-0 text-sm font-black text-center bg-transparent border-none focus:ring-0"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="w-10 h-10 text-lg font-medium transition-colors hover:bg-gray-100 flex justify-center items-center text-gray-600"
                    >
                      +
                    </button>
                  </div>

                  <button
                    @click="handleOptimisticDelete(item.id)"
                    class="group flex items-center gap-1.5 font-bold text-gray-400 hover:text-red-600 text-[10px] uppercase tracking-widest transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4 transition-transform group-hover:rotate-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    {{ $t("cart.remove") }}
                  </button>
                </div>

                <div class="mt-3 min-h-[1.25rem]">
                  <p
                    v-if="item.quantity >= item.product.stock"
                    class="font-black text-[9px] sm:text-[10px] text-red-600 uppercase tracking-widest bg-red-50 inline-block px-2 py-1 rounded"
                  >
                    Max Stock Reached: {{ item.product.stock }}
                  </p>
                  <p
                    v-else-if="item.product.stock <= 5"
                    class="text-[9px] sm:text-[10px] text-amber-600 font-bold uppercase tracking-widest bg-amber-50 inline-block px-2 py-1 rounded animate-pulse"
                  >
                    Selling Fast! Only {{ item.product.stock }} left.
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>

        <!-- REKOMENDASI PRODUK CROSS-SELL -->
        <div class="pt-12 mt-12 border-t border-gray-200">
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-sm font-black tracking-widest text-gray-900 uppercase">
              Lengkapi Gaya Anda
            </h3>
          </div>

          <div
            v-if="isLoadingProducts"
            class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
          >
            <div v-for="i in 4" :key="`skel-${i}`" class="flex flex-col gap-2">
              <div class="bg-gray-200 aspect-[4/5] rounded-2xl animate-pulse"></div>
              <div class="w-3/4 h-3 mt-2 bg-gray-200 rounded animate-pulse"></div>
              <div class="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          <TransitionGroup
            v-else-if="suggestedProducts.length > 0"
            name="list"
            tag="div"
            class="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4"
          >
            <div
              v-for="product in suggestedProducts"
              :key="product.id"
              class="flex flex-col group"
            >
              <div
                class="relative mb-3 overflow-hidden cursor-pointer aspect-[4/5] rounded-2xl bg-gray-50 border border-gray-100"
                @click="$router.push(`/products/${product.slug || product.id}`)"
              >
                <img
                  :src="product.image || defaultBagIcon"
                  class="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                />
                <div
                  v-if="getDiscountStatus(product, currentCurrency).active"
                  class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded-sm"
                >
                  SALE
                </div>
                <!-- Quick Add Action -->
                <div
                  class="absolute inset-x-0 bottom-0 p-3 transition-transform duration-300 translate-y-full bg-gradient-to-t from-black/80 to-transparent group-hover:translate-y-0"
                >
                  <button
                    @click.stop="addSuggestedProduct(product)"
                    class="w-full py-2 text-[9px] font-black text-black uppercase tracking-widest bg-white rounded-full hover:bg-gray-100 transition-colors"
                  >
                    + Quick Add
                  </button>
                </div>
              </div>
              <h4
                class="font-bold text-[10px] uppercase truncate tracking-widest text-gray-900 mb-1 group-hover:text-red-700 transition-colors"
              >
                {{ product.name }}
              </h4>
              <p class="text-xs font-black text-gray-900">
                {{
                  formatCurrencyDisplay({
                    value: getActivePrice(product, currentCurrency),
                    curr: currentCurrency,
                  })
                }}
              </p>
            </div>
          </TransitionGroup>
        </div>
      </div>

      <!-- KANAN: ORDER SUMMARY & CHECKOUT -->
      <div v-if="cartItems.length > 0" class="w-full lg:w-2/5 xl:w-1/3">
        <div
          class="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-200 shadow-2xl shadow-gray-200/50 sticky top-32"
        >
          <h2
            class="pb-5 mb-6 text-base font-black tracking-widest text-gray-900 uppercase border-b border-gray-100"
          >
            {{ $t("cart.order_summary") }}
          </h2>

          <!-- 👇 [CRO 3] LOYALTY REWARDS ESTIMATION (Solher Club) 👇 -->
          <div
            v-if="checkoutTotalAmount > 0"
            class="p-5 mb-8 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl relative overflow-hidden text-white shadow-xl group"
          >
            <!-- Animasi Shimmer -->
            <div
              class="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"
            ></div>

            <!-- Ornamen Blur Emas -->
            <div
              class="absolute -right-4 -top-4 w-24 h-24 bg-yellow-500 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"
            ></div>

            <div class="relative z-10 flex items-center gap-4">
              <!-- Ikon Bintang Solher Club -->
              <div
                class="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-600 rounded-full shadow-inner shrink-0 text-black border border-yellow-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>

              <div>
                <h3
                  class="text-[10px] font-black tracking-widest uppercase text-yellow-500 mb-0.5"
                >
                  Solher Club Reward
                </h3>
                <p class="text-xs font-medium text-gray-300 leading-snug">
                  Selesaikan pesanan ini untuk mendapatkan estimasi
                  <strong class="text-white text-sm tracking-wide"
                    >+{{ estimatedPoints }} Poin</strong
                  >!
                </p>
              </div>
            </div>
          </div>
          <!-- 👆 AKHIR CRO 3 👆 -->

          <div class="mb-8 space-y-4">
            <div class="flex justify-between text-sm text-gray-600 font-medium">
              <span>{{ $t("cart.select_items") }} ({{ checkoutCount }})</span>
              <span class="font-bold text-black">{{
                formatCurrencyDisplay({
                  value: subtotalOriginalAmount,
                  curr: currentCurrency,
                })
              }}</span>
            </div>

            <!-- 👇 [CRO 4] LOSS AVERSION (Tampilkan Total Hemat Murni) 👇 -->
            <div
              v-if="totalSavings > 0"
              class="flex justify-between px-4 py-3 text-sm font-bold border text-emerald-700 bg-emerald-50 rounded-xl border-emerald-200 shadow-sm items-center"
            >
              <div class="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                  />
                </svg>
                <span class="uppercase tracking-widest text-[10px] font-black"
                  >Total Saved</span
                >
              </div>
              <span class="text-base"
                >-
                {{
                  formatCurrencyDisplay({ value: totalSavings, curr: currentCurrency })
                }}</span
              >
            </div>

            <div class="flex items-end justify-between pt-5 border-t border-gray-200">
              <span class="font-black text-gray-900 text-xs uppercase tracking-[0.2em]">{{
                $t("cart.estimated_total")
              }}</span>
              <span class="text-3xl font-black text-black tracking-tight">
                {{
                  formatCurrencyDisplay({
                    value: checkoutTotalAmount,
                    curr: currentCurrency,
                  })
                }}
              </span>
            </div>
            <p
              class="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right mt-1"
            >
              {{ $t("cart.tax_and_shipping") }}
            </p>
          </div>

          <!-- Checkout Button with Sticky Mobile Behavior -->
          <div
            class="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-200 lg:relative lg:p-0 lg:bg-transparent lg:border-t-0 z-50"
          >
            <button
              @click="handleCheckout"
              :disabled="isProcessingCheckout || selectedItemIds.length === 0"
              class="relative overflow-hidden bg-black hover:bg-gray-800 disabled:bg-gray-300 shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.3)] hover:-translate-y-1 py-5 rounded-2xl w-full font-black text-white text-xs uppercase tracking-[0.3em] transition-all duration-300 flex justify-center items-center gap-3 group"
            >
              <div
                v-if="!isProcessingCheckout"
                class="flex items-center gap-3 relative z-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 text-gray-400 group-hover:text-white transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>{{ $t("cart.checkout") }} ({{ selectedItemIds.length }})</span>
              </div>
              <div v-else class="flex items-center gap-3 relative z-10">
                <div
                  class="w-5 h-5 border-2 rounded-full border-white/40 border-t-white animate-spin"
                ></div>
                <span>Securing Order...</span>
              </div>
              <!-- Button Shine Effect -->
              <div
                class="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]"
              ></div>
            </button>
            <p
              class="text-center text-[9px] font-medium text-gray-400 mt-3 hidden lg:block"
            >
              Harga dan ketersediaan stok dapat berubah sewaktu-waktu.
            </p>
          </div>

          <!-- Trust Badges -->
          <div class="flex justify-center gap-6 mt-6 opacity-60 grayscale pb-20 lg:pb-0">
            <svg
              class="h-6"
              viewBox="0 0 38 24"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              width="38"
              height="24"
              aria-labelledby="pi-visa"
            >
              <title id="pi-visa">Visa</title>
              <path
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
              />
              <path
                fill="#fff"
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              />
              <path
                d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-1.1.6-2.1.6-1.1 0-2.5-.2-3.1-.5zm1.5-5.9c-.2 0-.4 0-.5.2l-1.5 6.4c0 .1-.1.2-.2.2h-2.1l1.8-6.5c.1-.2.2-.2.5-.2h2zm-5.1 6.5H12c-.1 0-.2 0-.2-.2L9.4 8.6c0-.2.1-.2.3-.2h2.2c.1 0 .2 0 .2.2l1.1 4c.1.2.2.4.2.5.1-.2.2-.4.3-.6l1.2-3.9c0-.2.1-.2.2-.2h2.1c.1 0 .2 0 .2.2l-3.3 7.5z"
                fill="#1A1F71"
              />
            </svg>
            <svg
              class="h-6"
              viewBox="0 0 38 24"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              width="38"
              height="24"
              aria-labelledby="pi-master"
            >
              <title id="pi-master">Mastercard</title>
              <path
                opacity=".07"
                d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
              />
              <path
                fill="#fff"
                d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
              />
              <path
                fill="#FF5F00"
                d="M22 16.6c-2.8 0-5.4-1.5-6.6-3.8-1.2-2.3-1.2-5.1 0-7.4 1.2-2.3 3.8-3.8 6.6-3.8 2.8 0 5.4 1.5 6.6 3.8 1.2 2.3 1.2 5.1 0 7.4-1.2 2.3-3.8 3.8-6.6 3.8z"
              />
              <path
                fill="#EB001B"
                d="M16 16.6c-2.8 0-5.4-1.5-6.6-3.8-1.2-2.3-1.2-5.1 0-7.4 1.2-2.3 3.8-3.8 6.6-3.8 2.8 0 5.4 1.5 6.6 3.8 1.2 2.3 1.2 5.1 0 7.4-1.2 2.3-3.8 3.8-6.6 3.8z"
              />
              <path
                fill="#F79E1B"
                d="M19 16.2c-2.2-1.3-3.5-3.6-3.5-6.1s1.3-4.8 3.5-6.1c2.2 1.3 3.5 3.6 3.5 6.1s-1.4 4.8-3.5 6.1z"
              />
            </svg>
            <div
              class="flex items-center gap-1 font-black text-[9px] uppercase tracking-widest text-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              Secure
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useCart, getActivePrice, getDiscountStatus } from "../../composables/useCart";

import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const router = useRouter();
const isProcessingCheckout = ref(false);

const {
  cartItems,
  bundleDiscountAmount,
  fomoAlerts,
  cartCount,
  checkoutCount,
  checkoutTotalAmount,
  selectedItemIds,
  isAllSelected,
  triggerCurrencyUpdate,
  handleQtyChange,
  handleQtyInput,
  handleOptimisticDelete,
  handleOptimisticAdd,
} = useCart();

const allProducts = ref([]);
const isLoadingProducts = ref(true);

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
  triggerCurrencyUpdate();
};

const formatCurrencyDisplay = (priceObj) => {
  if (!priceObj) return "";
  const { value, curr } = priceObj;

  const symbols = { USD: "$", SGD: "S$", EUR: "€", AUD: "A$", MYR: "RM", IDR: "Rp " };
  const formatter = new Intl.NumberFormat(curr === "IDR" ? "id-ID" : "en-US", {
    minimumFractionDigits: curr === "IDR" ? 0 : 2,
    maximumFractionDigits: curr === "IDR" ? 0 : 2,
  });

  return `${symbols[curr] || curr + " "}${formatter.format(value)}`;
};

const getPriceToDisplay = (product) => {
  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: product.price, curr: "IDR" };
  const prices =
    typeof product.prices === "string"
      ? JSON.parse(product.prices)
      : product.prices || {};
  return { value: prices[curr] ? parseFloat(prices[curr]) : product.price, curr: "IDR" };
};

// 👇 [CRO LOGIC 1] HITUNG TOTAL PENGHEMATAN MURNI (Loss Aversion) 👇
const subtotalOriginalAmount = computed(() => {
  return cartItems.value.reduce((total, item) => {
    if (selectedItemIds.value.includes(item.id)) {
      return total + getPriceToDisplay(item.product).value * item.quantity;
    }
    return total;
  }, 0);
});

const totalSavings = computed(() => {
  let discountSavings = 0;
  cartItems.value.forEach((item) => {
    if (selectedItemIds.value.includes(item.id)) {
      const originalPrice = getPriceToDisplay(item.product).value;
      const activePrice = getActivePrice(item.product, currentCurrency.value);
      if (originalPrice > activePrice) {
        discountSavings += (originalPrice - activePrice) * item.quantity;
      }
    }
  });
  return discountSavings + bundleDiscountAmount.value;
});

// 👇 [CRO LOGIC 2] ESTIMASI POIN LOYALTY (GAMIFIKASI) 👇
const estimatedPoints = computed(() => {
  if (checkoutTotalAmount.value === 0) return 0;

  // Jika IDR, misal setiap kelipatan Rp 10.000 dapat 1 Poin (Atur sesuai kebijakan Anda)
  if (currentCurrency.value === "IDR") {
    return Math.floor(checkoutTotalAmount.value / 10000);
  }

  // Jika USD/EUR, misal setiap $1 dapat 1 Poin
  return Math.floor(checkoutTotalAmount.value);
});

// 👇 [CRO LOGIC 3] URGENCY SCARCITY 👇
const hasLowStockItems = computed(() => {
  return cartItems.value.some(
    (item) =>
      selectedItemIds.value.includes(item.id) &&
      item.product.stock <= 5 &&
      item.product.stock > 0
  );
});

const suggestedProducts = computed(() => {
  if (allProducts.value.length === 0) return [];
  const cartProductIds = cartItems.value.map((item) => item.product_id);
  let availableProducts = allProducts.value.filter(
    (p) => !cartProductIds.includes(p.id) && p.stock > 0
  );
  availableProducts.sort(() => 0.5 - Math.random());
  return availableProducts.slice(0, 4);
});

const addSuggestedProduct = (product) => {
  handleOptimisticAdd({ product: product, cartId: null }, () => {
    Swal.fire({
      title: "Added to Bag",
      icon: "success",
      toast: true,
      position: "top-center",
      showConfirmButton: false,
      timer: 1500,
    });
  });
};

const fetchAllProducts = async () => {
  isLoadingProducts.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    const data = res.data?.data?.data || res.data?.data || res.data;
    if (Array.isArray(data)) {
      allProducts.value = data;
    }
  } catch (err) {
    console.error("Gagal mengambil daftar produk", err);
  } finally {
    setTimeout(() => {
      isLoadingProducts.value = false;
    }, 500);
  }
};

const parseColorName = (colorString) => {
  return colorString && colorString.includes("|")
    ? colorString.split("|")[0]
    : colorString;
};

const extractColorHex = (colorName) => {
  const colorMapHex = {
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
    Mocca: "#967969",
    Cream: "#FDF4E3",
    Sage: "#9DC183",
    Gold: "#D4AF37",
    Silver: "#C0C0C0",
    Maroon: "#800000",
    Olive: "#808000",
  };
  return colorMapHex[parseColorName(colorName)] || "#e5e7eb";
};

const deleteSelectedItems = () => {
  Swal.fire({
    title: "Hapus item terpilih?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Ya, Hapus",
  }).then((result) => {
    if (result.isConfirmed) {
      selectedItemIds.value.forEach((id) => handleOptimisticDelete(id));
      selectedItemIds.value = [];
    }
  });
};

const handleCheckout = () => {
  if (selectedItemIds.value.length === 0) return;
  router.push("/payment");
};

onMounted(() => {
  fetchAllProducts();
  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.6s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.custom-scrollbar::-webkit-scrollbar {
  height: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #9ca3af;
}
</style>
