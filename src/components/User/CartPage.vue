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

<template>
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
        class="flex items-center gap-4 p-4 border rounded-2xl bg-amber-50 border-amber-200 animate-fade-in shadow-sm"
      >
        <span class="text-3xl animate-bounce">🔥</span>
        <div>
          <p class="text-sm font-bold text-amber-900 leading-tight">
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
              v-if="cartSummary && cartSummary.bundle_discount > 0"
              class="flex justify-between text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-2 rounded-xl border border-emerald-100"
            >
              <span class="uppercase tracking-widest text-[10px] mt-0.5"
                >Bundle Saved</span
              >
              <span
                >-
                {{
                  formatCurrencyDisplay({
                    value: cartSummary.bundle_discount,
                    curr: cartSummary.currency,
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
import { useCart, getActivePrice, getBundlePromo } from "../../composables/useCart"; // Import helper Bundle

import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const router = useRouter();
const isProcessingCheckout = ref(false);

const {
  cartItems,
  cartSummary, // <-- Ambil state summary dari Composables
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

// ============================================================================
// 👇 [BARU] LOGIKA MENGHITUNG FOMO ALERT 👇
// ============================================================================
const fomoAlerts = computed(() => {
  const alerts = [];

  // Hanya hitung dari barang yang ada di keranjang
  const groupedByCategory = cartItems.value.reduce((acc, item) => {
    const catId = item.product.category_id;
    if (!acc[catId]) acc[catId] = { category: item.product.category, totalQty: 0 };
    acc[catId].totalQty += item.quantity;
    return acc;
  }, {});

  Object.values(groupedByCategory).forEach((group) => {
    // Memanfaatkan object palsu untuk mengekstrak promo
    const pseudoProduct = { category: group.category };
    const promo = getBundlePromo(pseudoProduct);

    if (promo) {
      const remainder = group.totalQty % promo.qty;
      // Jika sisa pembagian > 0 (Artinya masih ada barang menggantung yang kena harga normal)
      // Hitung berapa barang lagi yang dibutuhkan untuk mencapai paket Bundle selanjutnya
      if (remainder > 0) {
        const neededQty = promo.qty - remainder;
        alerts.push({
          categoryName: group.category.name,
          neededQty: neededQty,
          bundleQty: promo.qty,
          bundlePrice: promo.price,
          bundleCurr: promo.curr,
        });
      }
    }
  });

  return alerts;
});
// ============================================================================

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
  /* KODE TETAP SAMA */
};
const parseColorName = (colorString) => {
  /* KODE TETAP SAMA */ return colorString.includes("|")
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
</script>
