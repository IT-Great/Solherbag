<!-- <template>
  <div class="mx-auto px-6 py-24 max-w-7xl min-h-screen">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
        class="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
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
      <h1 class="font-serif text-4xl md:text-5xl uppercase tracking-tighter">
        Your Bag
      </h1>
      <span class="font-sans text-gray-400 text-xl ml-2"
        >({{ cartCount }} items)</span
      >
    </div>

    <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
      <div class="lg:w-2/3 flex-grow">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 mx-auto text-gray-200 mb-4"
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
          <p class="font-serif text-gray-400 text-2xl italic mb-6">
            Your bag is currently empty.
          </p>
          <button
            @click="$router.push('/collections')"
            class="bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>

        <div v-else class="space-y-8">
          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex sm:flex-row flex-col gap-8 pb-8 border-b border-gray-100 last:border-0 relative"
            >
              <div
                class="relative w-full sm:w-48 h-48 shrink-0 cursor-pointer"
                @click="$router.push(`/product/${item.product.id}`)"
              >
                <img
                  :src="item.product.image"
                  class="bg-gray-50 shadow-sm rounded-2xl w-full h-full object-cover"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                  ></div>
                </div>
              </div>

              <div class="flex flex-col flex-grow justify-between">
                <div>
                  <div class="flex justify-between items-start">
                    <h3
                      class="font-bold text-xl uppercase tracking-tight w-2/3 cursor-pointer hover:text-gray-600 transition-colors"
                      @click="$router.push(`/product/${item.product.id}`)"
                    >
                      {{ item.product.name }}
                    </h3>
                    <p class="font-bold text-xl text-right">
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>
                  <p class="mt-1 text-gray-400 text-sm italic tracking-widest">
                    {{
                      formatPrice(
                        item.product.discount_price ?? item.product.price,
                      )
                    }}
                    / piece
                  </p>
                </div>

                <div class="flex justify-between items-end mt-6">
                  <div
                    class="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="hover:bg-gray-200 px-5 py-3 transition-colors font-bold text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="bg-transparent border-none focus:ring-0 w-14 font-bold text-base text-center"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="hover:bg-gray-200 px-5 py-3 transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    @click="handleOptimisticDelete(item.id)"
                    class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-xs uppercase tracking-widest transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 group-hover:rotate-12 transition-transform"
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
            class="mb-8 font-bold text-gray-900 text-lg uppercase tracking-widest border-b border-gray-200 pb-4"
          >
            Order Summary
          </h2>

          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-gray-600 text-sm">
              <span>Total Items</span>
              <span class="font-bold text-black">{{ cartCount }}</span>
            </div>
            <div
              class="flex justify-between items-end pt-4 border-t border-gray-200"
            >
              <span
                class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
                >Estimated Total</span
              >
              <span class="font-black text-black text-2xl">{{
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
                class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
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
  <div class="mx-auto px-6 py-24 max-w-7xl min-h-screen">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
        class="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
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
      <h1 class="font-serif text-4xl md:text-5xl uppercase tracking-tighter">
        Your Bag
      </h1>
      <span class="font-sans text-gray-400 text-xl ml-2"
        >({{ cartCount }} items)</span
      >
    </div>

    <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
      <div class="lg:w-2/3 flex-grow">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-16 h-16 mx-auto text-gray-200 mb-4"
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
          <p class="font-serif text-gray-400 text-2xl italic mb-6">
            Your bag is currently empty.
          </p>
          <button
            @click="$router.push('/collections')"
            class="bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>

        <div v-else class="space-y-8">
          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex sm:flex-row flex-col gap-8 pb-8 border-b border-gray-100 last:border-0 relative"
            >
              <div
                class="relative w-full sm:w-48 h-48 shrink-0 cursor-pointer"
                @click="$router.push(`/product/${item.product.id}`)"
              >
                <img
                  :src="item.product.image"
                  class="bg-gray-50 shadow-sm rounded-2xl w-full h-full object-cover"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                  ></div>
                </div>
              </div>

              <div class="flex flex-col flex-grow justify-between">
                <div>
                  <div class="flex justify-between items-start">
                    <h3
                      class="font-bold text-xl uppercase tracking-tight w-2/3 cursor-pointer hover:text-gray-600 transition-colors"
                      @click="$router.push(`/product/${item.product.id}`)"
                    >
                      {{ item.product.name }}
                    </h3>
                    <p class="font-bold text-xl text-right">
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>
                  <p class="mt-1 text-gray-400 text-sm italic tracking-widest">
                    {{
                      formatPrice(
                        item.product.discount_price ?? item.product.price,
                      )
                    }}
                    / piece
                  </p>
                </div>

                <div class="flex justify-between items-end mt-6">
                  <div
                    class="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="hover:bg-gray-200 px-5 py-3 transition-colors font-bold text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="bg-transparent border-none focus:ring-0 w-14 font-bold text-base text-center"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="hover:bg-gray-200 px-5 py-3 transition-colors font-bold text-lg"
                    >
                      +
                    </button>
                  </div>

                  <button
                    @click="handleOptimisticDelete(item.id)"
                    class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-xs uppercase tracking-widest transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5 group-hover:rotate-12 transition-transform"
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
            <h3 class="font-bold text-sm uppercase tracking-widest text-gray-800 mb-6">
              You May Also Like
            </h3>
            
            <TransitionGroup name="list" tag="div" class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div 
                v-for="product in suggestedProducts" 
                :key="product.id" 
                class="group flex flex-col"
              >
                <div 
                  class="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 mb-3 cursor-pointer"
                  @click="$router.push(`/product/${product.id}`)"
                >
                  <img 
                    :src="product.image" 
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                    alt="Suggested Product"
                  />
                  <div v-if="product.discount_price" class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm">
                    SALE
                  </div>
                </div>
                
                <h4 class="font-bold text-[10px] uppercase truncate tracking-wide text-gray-900 mb-1">
                  {{ product.name }}
                </h4>
                <p class="text-xs font-medium text-gray-600 mb-3">
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
          <h2 class="mb-8 font-bold text-gray-900 text-lg uppercase tracking-widest border-b border-gray-200 pb-4">
            Order Summary
          </h2>

          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-gray-600 text-sm">
              <span>Total Items</span>
              <span class="font-bold text-black">{{ cartCount }}</span>
            </div>
            <div class="flex justify-between items-end pt-4 border-t border-gray-200">
              <span class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]">Estimated Total</span>
              <span class="font-black text-black text-2xl">{{ formatPrice(totalCartAmount) }}</span>
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
              <div class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
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
    const res = await axios.get(`${BASE_URL}/products`);
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
  <div class="mx-auto px-6 py-24 max-w-7xl min-h-screen">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
        class="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
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
      <h1 class="font-serif text-4xl md:text-5xl uppercase tracking-tighter">
        Your Bag
      </h1>
      <span class="font-sans text-gray-400 text-xl ml-2"
        >({{ cartCount }} items)</span
      >
    </div>

    <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
      <div class="lg:w-2/3 flex-grow">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <p class="font-serif text-gray-400 text-2xl italic mb-6">
            Your bag is currently empty.
          </p>
          <button
            @click="$router.push('/collections')"
            class="bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>

        <div v-else class="space-y-4">
          <div
            class="flex items-center gap-4 pb-4 border-b border-gray-200 mb-4 px-2"
          >
            <input
              type="checkbox"
              v-model="isAllSelected"
              id="selectAll"
              class="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer shadow-sm transition"
            />
            <label
              for="selectAll"
              class="font-bold text-xs uppercase tracking-widest cursor-pointer select-none text-gray-800"
              >Select All Items</label
            >
          </div>

          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-start gap-4 sm:gap-6 pb-8 border-b border-gray-100 last:border-0 relative"
            >
              <div class="pt-3 sm:pt-16">
                <input
                  type="checkbox"
                  :value="item.id"
                  v-model="selectedItemIds"
                  class="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer shadow-sm transition"
                />
              </div>

              <div
                class="relative w-24 h-24 sm:w-48 sm:h-48 shrink-0 cursor-pointer"
                @click="$router.push(`/product/${item.product.id}`)"
              >
                <img
                  :src="item.product.image"
                  class="bg-gray-50 shadow-sm rounded-2xl w-full h-full object-cover"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col flex-grow justify-between min-h-[6rem] sm:min-h-[12rem]"
              >
                <div>
                  <div class="flex justify-between items-start gap-2">
                    <h3
                      class="font-bold text-sm sm:text-xl uppercase tracking-tight w-2/3 cursor-pointer hover:text-gray-600 transition-colors line-clamp-2"
                      @click="$router.push(`/product/${item.product.id}`)"
                    >
                      {{ item.product.name }}
                    </h3>
                    <p
                      class="font-bold text-sm sm:text-xl text-right whitespace-nowrap"
                    >
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>
                  <p class="mt-1 text-gray-400 text-xs italic tracking-widest">
                    {{
                      formatPrice(
                        item.product.discount_price ?? item.product.price,
                      )
                    }}
                    / pc
                  </p>
                </div>

                <div
                  class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 mt-4 sm:mt-6"
                >
                  <div
                    class="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="hover:bg-gray-200 px-4 py-2 sm:px-5 sm:py-3 transition-colors font-bold text-base sm:text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="bg-transparent border-none focus:ring-0 w-10 sm:w-14 font-bold text-sm sm:text-base text-center"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="hover:bg-gray-200 px-4 py-2 sm:px-5 sm:py-3 transition-colors font-bold text-base sm:text-lg"
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
                      class="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform"
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
              class="font-bold text-sm uppercase tracking-widest text-gray-800 mb-6"
            >
              You May Also Like
            </h3>

            <TransitionGroup
              name="list"
              tag="div"
              class="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div
                v-for="product in suggestedProducts"
                :key="product.id"
                class="group flex flex-col"
              >
                <div
                  class="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 mb-3 cursor-pointer"
                  @click="$router.push(`/product/${product.id}`)"
                >
                  <img
                    :src="product.image"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                <p class="text-xs font-medium text-gray-600 mb-3">
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
            class="mb-8 font-bold text-gray-900 text-lg uppercase tracking-widest border-b border-gray-200 pb-4"
          >
            Order Summary
          </h2>

          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-gray-600 text-sm">
              <span>Selected Items</span>
              <span class="font-bold text-black">{{ checkoutCount }}</span>
            </div>
            <div
              class="flex justify-between items-end pt-4 border-t border-gray-200"
            >
              <span
                class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
                >Estimated Total</span
              >
              <span class="font-black text-black text-2xl">{{
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
                class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
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
    const res = await axios.get(`${BASE_URL}/products`);
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

<template>
  <div class="mx-auto px-6 py-24 max-w-7xl min-h-screen">
    <div class="flex items-center gap-4 mb-10">
      <button
        @click="$router.push('/collections')"
        class="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition"
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
      <h1 class="font-serif text-4xl md:text-5xl uppercase tracking-tighter">
        Your Bag
      </h1>
      <span class="font-sans text-gray-400 text-xl ml-2"
        >({{ cartCount }} items)</span
      >
    </div>

    <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
      <div class="lg:w-2/3 flex-grow">
        <div
          v-if="cartItems.length === 0"
          class="py-20 text-center border-t border-gray-100"
        >
          <p class="font-serif text-gray-400 text-2xl italic mb-6">
            Your bag is currently empty.
          </p>
          <button
            @click="$router.push('/collections')"
            class="bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition"
          >
            Continue Shopping
          </button>
        </div>

        <div v-else class="space-y-4">
          <div
            class="flex items-center gap-4 pb-4 border-b border-gray-200 mb-4 px-2"
          >
            <input
              type="checkbox"
              v-model="isAllSelected"
              id="selectAll"
              class="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer shadow-sm transition"
            />
            <label
              for="selectAll"
              class="font-bold text-xs uppercase tracking-widest cursor-pointer select-none text-gray-800"
              >Select All Items</label
            >
          </div>

          <TransitionGroup name="list">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="flex items-start gap-4 sm:gap-6 pb-8 border-b border-gray-100 last:border-0 relative"
            >
              <div class="pt-3 sm:pt-16">
                <input
                  type="checkbox"
                  :value="item.id"
                  v-model="selectedItemIds"
                  class="w-5 h-5 rounded border-gray-300 text-black focus:ring-black cursor-pointer shadow-sm transition"
                />
              </div>

              <div
                class="relative w-24 h-24 sm:w-48 sm:h-48 shrink-0 cursor-pointer"
                @click="$router.push(`/product/${item.product.id}`)"
              >
                <img
                  :src="item.product.image|| defaultBagIcon"
                  class="bg-gray-50 shadow-sm rounded-2xl w-full h-full object-cover"
                />
                <div
                  v-if="item.isSyncing"
                  class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center"
                >
                  <div
                    class="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"
                  ></div>
                </div>
              </div>

              <div
                class="flex flex-col flex-grow justify-between min-h-[6rem] sm:min-h-[12rem]"
              >
                <!-- <div>
                  <div class="flex justify-between items-start gap-2">
                    <h3
                      class="font-bold text-sm sm:text-xl uppercase tracking-tight w-2/3 cursor-pointer hover:text-gray-600 transition-colors line-clamp-2"
                      @click="$router.push(`/product/${item.product.id}`)"
                    >
                      {{ item.product.name }}
                    </h3>
                    <p
                      class="font-bold text-sm sm:text-xl text-right whitespace-nowrap"
                    >
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>
                  <p class="mt-1 text-gray-400 text-xs italic tracking-widest">
                    {{
                      formatPrice(
                        item.product.discount_price ?? item.product.price,
                      )
                    }}
                    / pc
                  </p>
                </div> -->

                <div>
                  <div class="flex justify-between items-start gap-2">
                    <h3
                      class="font-bold text-sm sm:text-xl uppercase tracking-tight w-2/3 cursor-pointer hover:text-gray-600 transition-colors line-clamp-2"
                      @click="$router.push(`/product/${item.product.id}`)"
                    >
                      {{ item.product.name }}
                    </h3>
                    <p
                      class="font-bold text-sm sm:text-xl text-right whitespace-nowrap"
                    >
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>
                  
                  <div class="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <p class="text-gray-400 text-xs italic tracking-widest">
                      {{
                        formatPrice(
                          item.product.discount_price ?? item.product.price,
                        )
                      }}
                      / pc
                    </p>
                    
                    <span class="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></span>
                    
                    <p class="text-gray-500 text-[10px] font-bold uppercase tracking-widest">
                      Avail. Stock: <span class="text-black">{{ item.product.stock }}</span>
                    </p>
                  </div>
                </div>

                <div
                  class="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end gap-4 mt-4 sm:mt-6"
                >
                  <div
                    class="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                  >
                    <button
                      @click="handleQtyChange(item, item.quantity - 1)"
                      class="hover:bg-gray-200 px-4 py-2 sm:px-5 sm:py-3 transition-colors font-bold text-base sm:text-lg"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      v-model.number="item.quantity"
                      @input="handleQtyInput(item)"
                      class="bg-transparent border-none focus:ring-0 w-10 sm:w-14 font-bold text-sm sm:text-base text-center"
                    />
                    <button
                      @click="handleQtyChange(item, item.quantity + 1)"
                      class="hover:bg-gray-200 px-4 py-2 sm:px-5 sm:py-3 transition-colors font-bold text-base sm:text-lg"
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
                      class="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform"
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
            class="pt-12 border-t border-gray-100"
          >
            <h3
              class="font-bold text-sm uppercase tracking-widest text-gray-800 mb-6"
            >
              You May Also Like
            </h3>

            <div v-if="isLoadingProducts" class="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div v-for="i in 4" :key="`skel-${i}`" class="flex flex-col gap-2">
                <div class="bg-gray-200 aspect-square rounded-2xl animate-pulse"></div>
                <div class="bg-gray-200 h-3 w-3/4 rounded animate-pulse mt-1"></div>
                <div class="bg-gray-200 h-3 w-1/2 rounded animate-pulse"></div>
                <div class="bg-gray-200 h-8 w-full rounded-xl animate-pulse mt-auto pt-2"></div>
              </div>
            </div>

            <TransitionGroup
              v-else-if="suggestedProducts.length > 0"
              name="list"
              tag="div"
              class="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              <div
                v-for="product in suggestedProducts"
                :key="product.id"
                class="group flex flex-col"
              >
                <div
                  class="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 mb-3 cursor-pointer"
                  @click="$router.push(`/product/${product.id}`)"
                >
                  <img
                    :src="product.image || defaultBagIcon"
                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
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
                <p class="text-xs font-medium text-gray-600 mb-3">
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
            class="mb-8 font-bold text-gray-900 text-lg uppercase tracking-widest border-b border-gray-200 pb-4"
          >
            Order Summary
          </h2>

          <div class="space-y-4 mb-8">
            <div class="flex justify-between text-gray-600 text-sm">
              <span>Selected Items</span>
              <span class="font-bold text-black">{{ checkoutCount }}</span>
            </div>
            <div
              class="flex justify-between items-end pt-4 border-t border-gray-200"
            >
              <span
                class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
                >Estimated Total</span
              >
              <span class="font-black text-black text-2xl">{{
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
                class="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
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
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { useCart } from "../../composables/useCart";

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
    (p) => !cartProductIds.includes(p.id) && p.stock > 0,
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

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const handleCheckout = () => {
  if (selectedItemIds.value.length === 0) return;
  router.push("/payment");
};

onMounted(() => {
  fetchAllProducts();
});
</script>
