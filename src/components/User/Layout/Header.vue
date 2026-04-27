<!-- <template>
  <header
    class="fixed top-0 left-0 z-50 w-full px-6 py-4 bg-white border-b border-gray-200"
  >
    <div class="flex items-center justify-between mx-auto max-w-7xl">
      <div class="flex items-center">
        <nav
          class="hidden space-x-6 text-xs font-medium tracking-widest uppercase md:flex"
        >
          <router-link
            to="/"
            class="transition cursor-pointer hover:text-gray-500"
            >Home</router-link
          >
          <router-link
            to="/collections"
            class="transition cursor-pointer hover:text-gray-500"
            >Collections</router-link
          >
          <router-link
            to="/contact"
            class="transition cursor-pointer hover:text-gray-500"
            >Contact</router-link
          >
        </nav>

        <button
          @click="isMobileMenuOpen = true"
          class="flex items-center justify-center text-gray-700 md:hidden focus:outline-none hover:text-black"
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
              stroke-width="1.5"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div class="flex-shrink-0">
        <img
          src="../../../assets/solherbrandbook.png"
          alt="Solher Logo"
          class="object-contain w-auto h-8 md:h-12"
        />
      </div>

      <div class="flex items-center space-x-4 text-gray-700 md:space-x-5">
        <button
          @click="openSearch"
          class="flex items-center justify-center transition-colors focus:outline-none hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
        <div class="relative flex items-center justify-center">
          <button @click="toggleDropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
          <div
            v-if="isDropdownOpen"
            class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in"
          >
            <div v-if="isAuthenticated" class="text-left">
              <h3
                class="text-sm font-bold tracking-tight text-black uppercase truncate"
              >
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-xs text-gray-500 truncate">
                {{ userData?.email }}
              </p>
            </div>
            <div v-else>
              <h3
                class="mb-4 text-xs font-bold tracking-widest text-left text-black uppercase"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block w-full py-3 mb-4 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black hover:bg-gray-800"
                >Sign In</router-link
              >
            </div>
            <div class="grid grid-cols-2 gap-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                ></router-link
              >
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                ></router-link
              >
            </div>
          </div>
        </div>

        <button
          @click="openCart"
          class="relative transition-colors hover:text-black cart-icon-header"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span
            v-if="cartCount > 0"
            :class="[
              isBadgePopping ? 'scale-150 bg-red-600' : 'scale-100 bg-black',
            ]"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] text-white transition-all duration-300 pointer-events-none"
            >{{ cartCount }}</span
          >
        </button>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="z-[200] fixed inset-0 flex">
        <div
          @click="isMobileMenuOpen = false"
          class="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
        ></div>

        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          <div
            class="flex items-center justify-between pb-6 mb-10 border-b border-gray-100"
          >
            <img
              src="../../../assets/solherbrandbook.png"
              alt="Logo"
              class="object-contain w-auto h-6"
            />
            <button
              @click="isMobileMenuOpen = false"
              class="p-2 text-gray-500 hover:text-black"
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
          </div>

          <nav class="flex flex-col space-y-6 font-serif text-2xl">
            <router-link
              to="/"
              class="pb-4 transition-colors border-b border-gray-50 hover:text-gray-500"
              @click="isMobileMenuOpen = false"
              >Home</router-link
            >
            <router-link
              to="/collections"
              class="pb-4 transition-colors border-b border-gray-50 hover:text-gray-500"
              @click="isMobileMenuOpen = false"
              >Collections</router-link
            >
            <router-link
              to="/contact"
              class="pb-4 transition-colors border-b border-gray-50 hover:text-gray-500"
              @click="isMobileMenuOpen = false"
              >Contact</router-link
            >
          </nav>

          <div
            class="pt-10 mt-auto text-xs tracking-widest text-gray-400 uppercase"
          >
            <p>© 2026 Solher</p>
          </div>
        </div>
      </div>
    </transition>

    <div
      v-if="isCartOpen"
      class="z-[100] fixed inset-0 flex justify-center items-center p-4"
    >
      <div
        @click="isCartOpen = false"
        class="absolute inset-0 transition-opacity bg-black/60 backdrop-blur-sm"
      ></div>

      <div
        class="relative flex flex-col bg-white shadow-2xl rounded-3xl w-full max-w-xl max-h-[85vh] overflow-hidden animate-modal-in"
      >
        <div class="flex items-center justify-between p-8 border-b">
          <h2 class="font-serif text-3xl">
            Your Bag
            <span class="ml-2 font-sans text-lg text-gray-400"
              >({{ cartItems.length }} items)</span
            >
          </h2>
          <button
            @click="isCartOpen = false"
            class="text-3xl text-gray-400 transition-colors focus:outline-none hover:text-black"
          >
            &times;
          </button>
        </div>

        <div class="flex-grow p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div
            v-if="cartItems.length === 0"
            class="py-20 font-serif text-xl italic text-center text-gray-400"
          >
            Your bag is currently empty.
          </div>

          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex flex-col gap-6 pb-6 border-b sm:flex-row last:border-0"
          >
            <img
              :src="item.product.image"
              class="object-cover w-full h-32 bg-gray-100 shadow-sm rounded-2xl sm:w-32"
            />

            <div class="flex flex-col justify-between flex-grow">
              <div>
                <div
                  class="flex items-start justify-between text-base font-bold uppercase"
                >
                  <h3 class="max-w-[200px] truncate leading-tight">
                    {{ item.product.name }}
                  </h3>
                  <p
                    :class="[
                      'transition-all duration-300 text-lg',
                      item.isSyncing
                        ? 'blur-[3px] opacity-50 animate-shimmer'
                        : '',
                    ]"
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
                  / piece
                </p>
              </div>

              <div class="flex items-center justify-between mt-6">
                <div
                  class="flex items-center overflow-hidden border border-gray-100 bg-gray-50 rounded-xl"
                >
                  <button
                    @click="handleQtyChange(item, item.quantity - 1)"
                    class="px-4 py-2 transition-colors hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    v-model.number="item.quantity"
                    @input="handleQtyInput(item)"
                    class="w-12 text-sm font-bold text-center bg-transparent border-none focus:ring-0"
                  />
                  <button
                    @click="handleQtyChange(item, item.quantity + 1)"
                    class="px-4 py-2 transition-colors hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  @click="handleOptimisticDelete(item.id)"
                  class="flex items-center gap-2 text-xs font-bold tracking-tighter text-gray-400 uppercase transition-colors group hover:text-red-500"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              </div>

              <div class="mt-3 min-h-[1.25rem]">
                <p
                  v-if="item.quantity >= item.product.stock"
                  class="font-bold text-[10px] text-red-600 uppercase tracking-tighter animate-pulse"
                >
                  Out of stock! Maximum {{ item.product.stock }} reached.
                </p>
                <p
                  v-else-if="item.product.stock < 5"
                  class="text-[10px] text-amber-600 italic"
                >
                  Hurry! Only {{ item.product.stock }} left in our collection.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-8 border-t bg-gray-50">
          <div class="flex items-end justify-between mb-6">
            <span
              class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
              >Estimated Total</span
            >
            <div class="text-right">
              <span class="block text-2xl font-bold text-black"
                >{{ formatPrice(totalCartAmount) }} IDR</span
              >
              <p class="mt-1 text-[10px] text-gray-400 italic leading-relaxed">
                Tax and shipping will be calculated during checkout.
              </p>
            </div>
          </div>

          <button
            @click="handleCheckout"
            class="bg-black hover:bg-gray-800 shadow-xl hover:shadow-black/20 py-5 rounded-2xl w-full font-bold text-white text-sm uppercase tracking-[0.3em] transition-all duration-500"
          >
            Proceed to Check Out
          </button>
        </div>
      </div>
    </div>
  </header>
  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api";
import SearchModal from "../../User/Layout/SearchModal.vue";

const isSearchOpen = ref(false);

const openSearch = () => {
  isSearchOpen.value = true;
};

const closeSearch = () => {
  isSearchOpen.value = false;
};

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const route = useRoute();
const router = useRouter();

const isCartOpen = ref(false);
const cartItems = ref([]);
// const cartCount = computed(() => cartItems.value.length);
const cartCount = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
});
const isBadgePopping = ref(false);
// let debounceTimer = null;
const debounceTimers = new Map();

// const isSearchOpen = ref(false);
const searchInput = ref("");
const searchInputRef = ref(null);
const recentlyViewed = ref([]);
const randomProducts = ref([]);
const allProducts = ref([]); // Untuk penampung semua produk dari API
const isMobileMenuOpen = ref(false);

// 1. Logic Recently Viewed
const loadRecentlyViewed = () => {
  const data = localStorage.getItem("recently_viewed");
  recentlyViewed.value = data ? JSON.parse(data) : [];
};

const clearRecentlyViewed = () => {
  localStorage.removeItem("recently_viewed");
  recentlyViewed.value = [];
};

// 2. Logic Random Products
const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    allProducts.value = res.data;
  } catch (err) {
    console.error("Search fetch failed", err);
  }
};

const getRandomProducts = () => {
  if (allProducts.value.length === 0) return;
  const shuffled = [...allProducts.value].sort(() => 0.5 - Math.random());
  randomProducts.value = shuffled.slice(0, 6);
};

const totalCartAmount = computed(() => {
  if (!cartItems.value || cartItems.value.length === 0) return 0;
  return cartItems.value.reduce((acc, item) => {
    const amount = parseFloat(item.gross_amount) || 0;
    return acc + amount;
  }, 0);
});

// const handleQtyChange = (item, newQty) => {
//   if (newQty < 1) newQty = 1;
//   if (newQty > item.product.stock) {
//     newQty = item.product.stock;
//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon: "warning",
//       title: `Max stock is ${item.product.stock}`,
//       showConfirmButton: false,
//       timer: 2000,
//     });
//   }

//   item.isSyncing = true;
//   item.quantity = newQty;
//   const unitPrice = parseFloat(
//     item.product.discount_price ?? item.product.price,
//   );
//   item.gross_amount = item.quantity * unitPrice;

//   clearTimeout(debounceTimer);
//   debounceTimer = setTimeout(() => {
//     syncQtyToDatabase(item);
//   }, 500);
// };

const handleQtyChange = (item, newQty) => {
  // 1. Validasi Input
  if (newQty < 1) newQty = 1;
  if (newQty > item.product.stock) {
    newQty = item.product.stock;
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "warning",
      title: `Max stock is ${item.product.stock}`,
      showConfirmButton: false,
      timer: 2000,
    });
  }

  // 2. Update Tampilan Secara Langsung (Optimistic UI)
  // User melihat angka berubah instan, meski API belum dipanggil
  item.quantity = newQty;

  // Hitung ulang total harga tampilan lokal
  const unitPrice = parseFloat(
    item.product.discount_price ?? item.product.price,
  );
  item.gross_amount = item.quantity * unitPrice;

  // Set status syncing agar UI terlihat sedang "memproses" (blur effect)
  item.isSyncing = true;

  // 3. LOGIKA DEBOUNCE (PENUNDAAN)
  // Jika ada timer pending untuk item INI, batalkan timer tersebut
  if (debounceTimers.has(item.id)) {
    clearTimeout(debounceTimers.get(item.id));
  }

  // Buat timer baru selama 1 Detik (1000ms)
  const timerId = setTimeout(() => {
    syncQtyToDatabase(item);
    // Hapus timer dari Map setelah dieksekusi
    debounceTimers.delete(item.id);
  }, 1000); // <--- Waktu tunda 1 detik sesuai permintaan

  // Simpan timer ID ke Map
  debounceTimers.set(item.id, timerId);
};

const handleQtyInput = (item) => {
  if (item.quantity === null || item.quantity === "") return;
  handleQtyChange(item, item.quantity);
};

const syncQtyToDatabase = async (item) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/carts/${item.id}`,
      { quantity: item.quantity },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    item.gross_amount = res.data.gross_amount;
  } catch (error) {
    console.error("Sync failed:", error);
    fetchCarts();
  } finally {
    item.isSyncing = false;
  }
};

// const handleOptimisticDelete = async (id) => {
//   const backupItems = [...cartItems.value];
//   cartItems.value = cartItems.value.filter((item) => item.id !== id);

//   try {
//     await axios.delete(`${BASE_URL}/carts/${id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//   } catch (error) {
//     cartItems.value = backupItems;
//     Swal.fire({
//       icon: "error",
//       title: "Action Failed",
//       text: "Could not remove item. Please check your connection.",
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//     });
//   }
// };

// const handleOptimisticDelete = async (id) => {
//   // Simpan data asli untuk berjaga-jaga jika API gagal (rollback)
//   const backupItems = [...cartItems.value];

//   // Hapus dari tampilan secara instan (Optimistic UI)
//   cartItems.value = cartItems.value.filter((item) => item.id !== id);

//   try {
//     // Panggil API untuk menghapus di database
//     await axios.delete(`${BASE_URL}/carts/${id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });

//     // [PERBAIKAN 1] Tampilkan popup modal jika berhasil
//     Swal.fire({
//       icon: "success",
//       title: "Removed",
//       text: "Item has been removed from your bag.",
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 2000,
//     });
//   } catch (error) {
//     // Jika API gagal, kembalikan item ke dalam cart (Rollback)
//     cartItems.value = backupItems;
//     Swal.fire({
//       icon: "error",
//       title: "Action Failed",
//       text: "Could not remove item. Please check your connection.",
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//     });
//   }
// };

const handleOptimisticDelete = async (id) => {
  // 1. Simpan data asli untuk berjaga-jaga jika API gagal (rollback)
  const backupItems = [...cartItems.value];

  // 2. Hapus dari tampilan secara instan (Optimistic UI)
  cartItems.value = cartItems.value.filter((item) => item.id !== id);

  // 3. [PERBAIKAN] Tampilkan popup modal "Removed" SEGERA (Instant Feedback)
  Swal.fire({
    icon: "success",
    title: "Removed",
    text: "Item has been removed from your bag.",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
  });

  try {
    // 4. Panggil API untuk menghapus di database (Berjalan secara background/silent)
    await axios.delete(`${BASE_URL}/carts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    // Jika sukses, tidak perlu melakukan apa-apa karena UI sudah terupdate di langkah 2
  } catch (error) {
    // 5. Jika API gagal, kembalikan item ke dalam cart (Rollback) dan beritahu user
    cartItems.value = backupItems;
    Swal.fire({
      icon: "error",
      title: "Action Failed",
      text: "Could not remove item. Please check your connection.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
  }
};

// const handleOptimisticAdd = (event) => {
//   const newProduct = event.detail;

//   const existingItem = cartItems.value.find(
//     (item) => item.product_id === newProduct.id,
//   );

//   if (existingItem) {
//     existingItem.quantity += 1;
//     const unitPrice = parseFloat(
//       existingItem.product.discount_price ?? existingItem.product.price,
//     );
//     existingItem.gross_amount = existingItem.quantity * unitPrice;
//   } else {
//     cartItems.value.push({
//       id: Date.now(),
//       product_id: newProduct.id,
//       quantity: 1,
//       gross_amount: parseFloat(newProduct.discount_price ?? newProduct.price),
//       isSyncing: false,
//       product: newProduct,
//     });
//   }

//   isBadgePopping.value = true;
//   setTimeout(() => (isBadgePopping.value = false), 300);
// };

const handleOptimisticAdd = (event) => {
  // [PERBAIKAN] Terima payload yang sudah diubah dari ProductDetail
  const newProduct = event.detail.product;
  const realCartId = event.detail.cartId;

  const existingItem = cartItems.value.find(
    (item) => item.product_id === newProduct.id,
  );

  if (existingItem) {
    existingItem.quantity += 1;
    const unitPrice = parseFloat(
      existingItem.product.discount_price ?? existingItem.product.price,
    );
    existingItem.gross_amount = existingItem.quantity * unitPrice;
  } else {
    cartItems.value.push({
      id: realCartId, // <--- GUNAKAN ID ASLI DARI DATABASE, BUKAN Date.now()
      product_id: newProduct.id,
      quantity: 1,
      gross_amount: parseFloat(newProduct.discount_price ?? newProduct.price),
      isSyncing: false,
      product: newProduct,
    });
  }

  isBadgePopping.value = true;
  setTimeout(() => (isBadgePopping.value = false), 300);
};

// const handleCheckout = async () => {
//   try {
//     const res = await axios.post(
//       `${BASE_URL}/checkout`,
//       {},
//       {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       },
//     );

//     isCartOpen.value = false;
//     Swal.fire({
//       title: "Order Placed!",
//       text: `Your order ${res.data.order_id} is being processed.`,
//       icon: "success",
//       confirmButtonColor: "#000",
//     }).then(() => {
//       window.location.href = "/orderpage";
//     });
//   } catch (error) {
//     Swal.fire(
//       "Error",
//       error.response?.data?.message || "Checkout failed",
//       "error",
//     );
//   }
// };

// const handleCheckout = async () => {
//   const res = await axios.post(
//     `${BASE_URL}/checkout`,
//     {},
//     {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     },
//   );

//   router.push(`/payment/${res.data.transaction_id}`);
// };

// const handleCheckout = async () => {
//   try {
//     const res = await axios.post(
//       `${BASE_URL}/checkout`,
//       {},
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       },
//     );

//     const transactionId =
//       res.data.transaction_id ?? res.data.data?.transaction_id;

//     if (!transactionId) {
//       throw new Error("Transaction ID not found");
//     }

//     router.push(`/payment/${transactionId}`);
//   } catch (err) {
//     console.error(err);
//     Swal.fire({
//       icon: "error",
//       title: "Checkout Failed",
//       text: "Unable to proceed to payment.",
//     });
//   }
// };

const handleCheckout = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/checkout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );

    // const transactionId =
    //   res.data.transaction_id ?? res.data.data?.transaction_id;

    // if (!transactionId) {
    //   throw new Error("Transaction ID not found");
    // }

    const transactionId =
      res.data.transaction_id || res.data.data?.transaction_id || res.data.id;

    if (!transactionId) {
      throw new Error("Transaction ID not found in response");
    }

    // TUTUP MODAL CART
    // isCartOpen.value = false;

    watch(
      () => route.path,
      () => {
        isCartOpen.value = false;
      },
    );

    // Optional: reset badge animation state
    isBadgePopping.value = false;

    // router.push(`/payment/${transactionId}`);
    setTimeout(() => {
      router.push(`/payment/${transactionId}`);
    }, 300); // sesuaikan dengan durasi animasi modal
  } catch (err) {
    console.error(err);
    Swal.fire({
      icon: "error",
      title: "Checkout Failed",
      text: "Unable to proceed to payment.",
    });
  }
};

const fetchCarts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/carts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    cartItems.value = res.data.map((item) => ({ ...item, isSyncing: false }));
  } catch (err) {
    console.error("Failed to load bag", err);
  }
};

const openCart = () => {
  if (!isAuthenticated.value) {
    Swal.fire({
      icon: "info",
      title: "Sign In Required",
      text: "Please login to see your shopping bag.",
      confirmButtonColor: "#000",
    });
    return;
  }
  isCartOpen.value = true;
};

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    isAuthenticated.value = true;
    userData.value = JSON.parse(user);
  } else {
    isAuthenticated.value = false;
    userData.value = null;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(
    v,
  );

const toggleDropdown = () => {
  checkAuth();
  isDropdownOpen.value = !isDropdownOpen.value;
};

onMounted(() => {
  checkAuth();
  fetchAllProducts();
  if (isAuthenticated.value) fetchCarts();
  window.addEventListener("optimistic-add-to-cart", handleOptimisticAdd);

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });

  window.addEventListener("refresh-cart", fetchCarts);
});

onMounted(() => {
  window.addEventListener("track-view", (e) => {
    const product = e.detail;
    let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");

    list = list.filter((item) => item.id !== product.id);

    list.unshift(product);

    list = list.slice(0, 6);

    localStorage.setItem("recently_viewed", JSON.stringify(list));
  });
});

onUnmounted(() => {
  window.removeEventListener("optimistic-add-to-cart", handleOptimisticAdd);
});

watch(
  () => route.params.id,
  async (newId) => {
    if (route.name === "ProductDetail" && newId) {
    }
  },
);

watch(
  () => route.path,
  () => {
    isDropdownOpen.value = false;
    isMobileMenuOpen.value = false;
    checkAuth();
    if (isAuthenticated.value) fetchCarts();
  },
);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

.animate-modal-in {
  animation: modalIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
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

.animate-shimmer {
  animation: shimmerPulse 1.2s infinite;
}

.animate-shimmer {
  animation: shimmerPulse 1.2s infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shimmerPulse {
  0% {
    filter: blur(2px);
    opacity: 0.5;
  }
  50% {
    filter: blur(4px);
    opacity: 0.3;
  }
  100% {
    filter: blur(2px);
    opacity: 0.5;
  }
}

.overflow-y-auto {
  scrollbar-width: thin;
  scrollbar-color: #e5e7eb transparent;
}

.animate-slide-down {
  animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-30px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style> -->

<!-- <template>
  <header
    class="fixed top-0 left-0 z-50 w-full px-6 py-4 bg-white border-b border-gray-200"
  >
    <div class="flex items-center justify-between mx-auto max-w-7xl">
      <div class="flex items-center">
        <nav
          class="hidden space-x-6 text-xs font-medium tracking-widest uppercase md:flex"
        >
          <router-link
            to="/"
            class="transition cursor-pointer hover:text-gray-500"
            >Home</router-link
          >
          <router-link
            to="/collections"
            class="transition cursor-pointer hover:text-gray-500"
            >Collections</router-link
          >
          <router-link
            to="/contact"
            class="transition cursor-pointer hover:text-gray-500"
            >Contact</router-link
          >
        </nav>

        <button
          @click="isMobileMenuOpen = true"
          class="flex items-center justify-center text-gray-700 md:hidden focus:outline-none hover:text-black"
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
              stroke-width="1.5"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div class="flex-shrink-0">
        <img
          src="../../../assets/solherbrandbook.png"
          alt="Solher Logo"
          class="object-contain w-auto h-8 md:h-12"
        />
      </div>

      <div class="flex items-center space-x-4 text-gray-700 md:space-x-5">
        <button
          @click="openSearch"
          class="flex items-center justify-center transition-colors focus:outline-none hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>
        <div class="relative flex items-center justify-center">
          <button @click="toggleDropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>
          <div
            v-if="isDropdownOpen"
            class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in"
          >
            <div v-if="isAuthenticated" class="text-left">
              <h3
                class="text-sm font-bold tracking-tight text-black uppercase truncate"
              >
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-xs text-gray-500 truncate">
                {{ userData?.email }}
              </p>
            </div>
            <div v-else>
              <h3
                class="mb-4 text-xs font-bold tracking-widest text-left text-black uppercase"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block w-full py-3 mb-4 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black hover:bg-gray-800"
                >Sign In</router-link
              >
            </div>
            <div class="grid grid-cols-2 gap-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                ></router-link
              >
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                ></router-link
              >
            </div>
          </div>
        </div>

        <button
          @click="openCart"
          class="relative transition-colors hover:text-black cart-icon-header"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span
            v-if="cartCount > 0"
            :class="[
              isBadgePopping ? 'scale-150 bg-red-600' : 'scale-100 bg-black',
            ]"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] text-white transition-all duration-300 pointer-events-none"
            >{{ cartCount }}</span
          >
        </button>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="z-[200] fixed inset-0 flex">
        <div
          @click="isMobileMenuOpen = false"
          class="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
        ></div>

        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          <div
            class="flex items-center justify-between pb-6 mb-10 border-b border-gray-100"
          >
            <img
              src="../../../assets/solherbrandbook.png"
              alt="Logo"
              class="object-contain w-auto h-6"
            />
            <button
              @click="isMobileMenuOpen = false"
              class="p-2 text-gray-500 hover:text-black"
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
          </div>

          <nav class="flex flex-col space-y-6 font-serif text-2xl">
            <router-link
              to="/"
              class="pb-4 transition-colors border-b border-gray-50 hover:text-gray-500"
              @click="isMobileMenuOpen = false"
              >Home</router-link
            >
            <router-link
              to="/collections"
              class="pb-4 transition-colors border-b border-gray-50 hover:text-gray-500"
              @click="isMobileMenuOpen = false"
              >Collections</router-link
            >
            <router-link
              to="/contact"
              class="pb-4 transition-colors border-b border-gray-50 hover:text-gray-500"
              @click="isMobileMenuOpen = false"
              >Contact</router-link
            >
          </nav>

          <div
            class="pt-10 mt-auto text-xs tracking-widest text-gray-400 uppercase"
          >
            <p>© 2026 Solher</p>
          </div>
        </div>
      </div>
    </transition>

    <div
      v-if="isCartOpen"
      class="z-[100] fixed inset-0 flex justify-center items-center p-4"
    >
      <div
        @click="isCartOpen = false"
        class="absolute inset-0 transition-opacity bg-black/60 backdrop-blur-sm"
      ></div>

      <div
        class="relative flex flex-col bg-white shadow-2xl rounded-3xl w-full max-w-xl max-h-[85vh] overflow-hidden animate-modal-in"
      >
        <div class="flex items-center justify-between p-8 border-b">
          <h2 class="font-serif text-3xl">
            Your Bag
            <span class="ml-2 font-sans text-lg text-gray-400"
              >({{ cartItems.length }} items)</span
            >
          </h2>
          <button
            @click="isCartOpen = false"
            class="text-3xl text-gray-400 transition-colors focus:outline-none hover:text-black"
          >
            &times;
          </button>
        </div>

        <div class="flex-grow p-8 space-y-6 overflow-y-auto custom-scrollbar">
          <div
            v-if="cartItems.length === 0"
            class="py-20 font-serif text-xl italic text-center text-gray-400"
          >
            Your bag is currently empty.
          </div>

          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex flex-col gap-6 pb-6 border-b sm:flex-row last:border-0"
          >
            <img
              :src="item.product.image"
              class="object-cover w-full h-32 bg-gray-100 shadow-sm rounded-2xl sm:w-32"
            />

            <div class="flex flex-col justify-between flex-grow">
              <div>
                <div
                  class="flex items-start justify-between text-base font-bold uppercase"
                >
                  <h3 class="max-w-[200px] truncate leading-tight">
                    {{ item.product.name }}
                  </h3>
                  <p
                    :class="[
                      'transition-all duration-300 text-lg',
                      item.isSyncing
                        ? 'blur-[3px] opacity-50 animate-shimmer'
                        : '',
                    ]"
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
                  / piece
                </p>
              </div>

              <div class="flex items-center justify-between mt-6">
                <div
                  class="flex items-center overflow-hidden border border-gray-100 bg-gray-50 rounded-xl"
                >
                  <button
                    @click="handleQtyChange(item, item.quantity - 1)"
                    class="px-4 py-2 transition-colors hover:bg-gray-200"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    v-model.number="item.quantity"
                    @input="handleQtyInput(item)"
                    class="w-12 text-sm font-bold text-center bg-transparent border-none focus:ring-0"
                  />
                  <button
                    @click="handleQtyChange(item, item.quantity + 1)"
                    class="px-4 py-2 transition-colors hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>

                <button
                  @click="handleOptimisticDelete(item.id)"
                  class="flex items-center gap-2 text-xs font-bold tracking-tighter text-gray-400 uppercase transition-colors group hover:text-red-500"
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
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              </div>

              <div class="mt-3 min-h-[1.25rem]">
                <p
                  v-if="item.quantity >= item.product.stock"
                  class="font-bold text-[10px] text-red-600 uppercase tracking-tighter animate-pulse"
                >
                  Out of stock! Maximum {{ item.product.stock }} reached.
                </p>
                <p
                  v-else-if="item.product.stock < 5"
                  class="text-[10px] text-amber-600 italic"
                >
                  Hurry! Only {{ item.product.stock }} left in our collection.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="p-8 border-t bg-gray-50">
          <div class="flex items-end justify-between mb-6">
            <span
              class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
              >Estimated Total</span
            >
            <div class="text-right">
              <span class="block text-2xl font-bold text-black"
                >{{ formatPrice(totalCartAmount) }} IDR</span
              >
              <p class="mt-1 text-[10px] text-gray-400 italic leading-relaxed">
                Tax and shipping will be calculated during checkout.
              </p>
            </div>
          </div>

          <button
            @click="handleCheckout"
            class="bg-black hover:bg-gray-800 shadow-xl hover:shadow-black/20 py-5 rounded-2xl w-full font-bold text-white text-sm uppercase tracking-[0.3em] transition-all duration-500"
          >
            Proceed to Check Out
          </button>
        </div>
      </div>
    </div>
  </header>
  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api";
import SearchModal from "../../User/Layout/SearchModal.vue";

const isSearchOpen = ref(false);

const openSearch = () => {
  isSearchOpen.value = true;
};

const closeSearch = () => {
  isSearchOpen.value = false;
};

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const route = useRoute();
const router = useRouter();

const isCartOpen = ref(false);
const cartItems = ref([]);

const cartCount = computed(() => {
  return cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
});

const isBadgePopping = ref(false);
const debounceTimers = new Map();

const searchInput = ref("");
const searchInputRef = ref(null);
const recentlyViewed = ref([]);
const randomProducts = ref([]);
const allProducts = ref([]); 
const isMobileMenuOpen = ref(false);

const loadRecentlyViewed = () => {
  const data = localStorage.getItem("recently_viewed");
  recentlyViewed.value = data ? JSON.parse(data) : [];
};

const clearRecentlyViewed = () => {
  localStorage.removeItem("recently_viewed");
  recentlyViewed.value = [];
};

const fetchAllProducts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    allProducts.value = res.data;
  } catch (err) {
    console.error("Search fetch failed", err);
  }
};

const getRandomProducts = () => {
  if (allProducts.value.length === 0) return;
  const shuffled = [...allProducts.value].sort(() => 0.5 - Math.random());
  randomProducts.value = shuffled.slice(0, 6);
};

const totalCartAmount = computed(() => {
  if (!cartItems.value || cartItems.value.length === 0) return 0;
  return cartItems.value.reduce((acc, item) => {
    const amount = parseFloat(item.gross_amount) || 0;
    return acc + amount;
  }, 0);
});

// [PERBAIKAN 1] Logika Tambah/Kurang Kuantitas Tanpa Lag
// const handleQtyChange = (item, newQty) => {
//   if (newQty < 1) newQty = 1;
//   if (newQty > item.product.stock) {
//     newQty = item.product.stock;
//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon: "warning",
//       title: `Max stock is ${item.product.stock}`,
//       showConfirmButton: false,
//       timer: 2000,
//     });
//   }

//   // 1. UPDATE STATE LOKAL SECARA INSTAN
//   item.quantity = newQty;
//   const unitPrice = parseFloat(item.product.discount_price ?? item.product.price);
//   item.gross_amount = item.quantity * unitPrice;
//   item.isSyncing = true;

//   // 2. ANTRIKAN KE DATABASE (DEBOUNCE 500ms)
//   if (debounceTimers.has(item.id)) {
//     clearTimeout(debounceTimers.get(item.id));
//   }

//   const timerId = setTimeout(() => {
//     syncQtyToDatabase(item);
//     debounceTimers.delete(item.id);
//   }, 500); 

//   debounceTimers.set(item.id, timerId);
// };

const handleQtyInput = (item) => {
  if (item.quantity === null || item.quantity === "") return;
  handleQtyChange(item, item.quantity);
};

// // [PERBAIKAN 2] Penanganan ID Sementara (Temp ID)
// const syncQtyToDatabase = async (item) => {
//   // Jika ID masih 'temp_', berarti API ADD TO CART di background belum selesai.
//   // Kita antrikan ulang agar tidak menembak endpoint PUT /carts/temp_... yang pasti 404
//   if (String(item.id).startsWith("temp_")) {
//     setTimeout(() => syncQtyToDatabase(item), 500);
//     return;
//   }

//   try {
//     const res = await axios.put(
//       `${BASE_URL}/carts/${item.id}`,
//       { quantity: item.quantity },
//       { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
//     );
//     item.gross_amount = res.data.gross_amount;
//   } catch (error) {
//     console.error("Sync failed:", error);
//     fetchCarts(); // Jika benar-benar gagal, baru reset dari server
//   } finally {
//     item.isSyncing = false;
//   }
// };

// // [PERBAIKAN 3] Logika Hapus Instan yang Kuat
// const handleOptimisticDelete = async (id) => {
//   const backupItems = [...cartItems.value];
  
//   // 1. HAPUS DARI UI SEKETIKA
//   cartItems.value = cartItems.value.filter((item) => item.id !== id);

//   // 2. TAMPILKAN POPUP SEKETIKA
//   Swal.fire({
//     icon: "success",
//     title: "Removed",
//     text: "Item has been removed from your bag.",
//     toast: true,
//     position: "top-end",
//     showConfirmButton: false,
//     timer: 2000,
//   });

//   // 3. ABAIKAN JIKA INI BARANG SEMENTARA (Belum Terekam di DB)
//   if (String(id).startsWith("temp_")) return;

//   try {
//     // 4. HAPUS DI DATABASE SECARA BACKGROUND
//     await axios.delete(`${BASE_URL}/carts/${id}`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//     });
//   } catch (error) {
//     // 5. ROLLBACK JIKA GAGAL
//     cartItems.value = backupItems;
//     Swal.fire({
//       icon: "error",
//       title: "Action Failed",
//       text: "Could not remove item. Please check your connection.",
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//     });
//   }
// };

// // [PERBAIKAN 4] Logika Add To Cart Berbasis Event + Background API
// const handleOptimisticAdd = async (event) => {
//   const newProduct = event.detail;
//   const existingItem = cartItems.value.find((item) => item.product_id === newProduct.id);

//   if (existingItem) {
//     // Jika barang sudah ada, panggil handleQtyChange agar diurus debouncenya
//     handleQtyChange(existingItem, existingItem.quantity + 1);
//   } else {
//     // Jika barang BARU, buat ID SEMENTARA
//     const tempId = "temp_" + Date.now();
//     const newItem = {
//       id: tempId,
//       product_id: newProduct.id,
//       quantity: 1,
//       gross_amount: parseFloat(newProduct.discount_price ?? newProduct.price),
//       isSyncing: true, // Berikan efek blur selama memproses di background
//       product: newProduct,
//     };
    
//     // MASUKKAN KE KERANJANG SECARA INSTAN
//     cartItems.value.unshift(newItem); // Pakai unshift agar barang baru muncul paling atas
    
//     isBadgePopping.value = true;
//     setTimeout(() => (isBadgePopping.value = false), 300);

//     // EKSEKUSI API DI LATAR BELAKANG
//     try {
//       const token = localStorage.getItem("token");
//       const res = await axios.post(
//         `${BASE_URL}/carts`,
//         { product_id: newProduct.id, quantity: 1 },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
      
//       // SETELAH API BERHASIL, GANTI ID SEMENTARA DENGAN ID ASLI DARI DATABASE
//       const realId = res.data.id || res.data.cart_id || res.data.data?.id;
//       const index = cartItems.value.findIndex(i => i.id === tempId);
//       if(index !== -1) {
//         cartItems.value[index].id = realId;
//         cartItems.value[index].isSyncing = false; // Matikan efek blur
//       }
//     } catch (error) {
//       // ROLLBACK JIKA GAGAL ADD TO CART
//       cartItems.value = cartItems.value.filter((i) => i.id !== tempId);
//       Swal.fire("Error", "Could not add item to bag. Check connection.", "error");
//     }
//   }
// };

// =========================================================
// THE SENIOR DEV LOGIC: RACE CONDITION HANDLERS
// =========================================================

const handleOptimisticAdd = async (event) => {
  const newProduct = event.detail;
  const existingItem = cartItems.value.find((item) => item.product_id === newProduct.id);

  if (existingItem) {
    // Jika barang sudah ada di keranjang, tambah qty saja
    handleQtyChange(existingItem, existingItem.quantity + 1);
    triggerCartBounce();
    return;
  }

  // 1. Buat Barang dengan ID Sementara (Fake ID)
  const tempId = "temp_" + Date.now();
  const unitPrice = parseFloat(newProduct.discount_price ?? newProduct.price);
  
  const newItem = {
    id: tempId,
    product_id: newProduct.id,
    quantity: 1,
    gross_amount: unitPrice,
    isSyncing: true, // Blur effect menyala
    isCreating: true, // KUNCI UTAMA: Sedang diproses database
    product: newProduct,
  };

  // 2. Masukkan ke UI Seketika (Unshift agar muncul paling atas)
  cartItems.value.unshift(newItem);
  triggerCartBounce();

  // 3. Eksekusi API di Latar Belakang secara diam-diam
  try {
    const res = await axios.post(
      `${BASE_URL}/carts`,
      { product_id: newProduct.id, quantity: 1 },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    // Ambil ID Asli
    const realId = res.data.id || res.data.cart_id || res.data.data?.id;
    
    // Cari barang tadi di memori UI (karena bisa saja user sedang iseng mengubah QTY-nya)
    const itemInCart = cartItems.value.find((i) => i.id === tempId);

    if (itemInCart) {
      // Ganti ID Palsu dengan ID Asli, buka kunci.
      itemInCart.id = realId;
      itemInCart.isCreating = false;

      // CEK APAKAH USER MENEKAN TOMBOL '+' SAAT API SEDANG LOADING TADI?
      if (itemInCart.quantity !== 1) {
        // Jika ya, user sangat cepat! Langsung tembak API Update sekarang.
        syncQtyToDatabase(itemInCart);
      } else {
        // Jika tidak, proses selesai. Matikan blur.
        itemInCart.isSyncing = false;
      }
    } else {
      // EDGE CASE DEWA: User klik 'Add to Cart', lalu sepersekian detik dia buka cart dan klik 'Remove'
      // padahal API POST belum selesai!
      // Karena POST sukses, barang ada di database. Kita harus menghapusnya diam-diam.
      axios.delete(`${BASE_URL}/carts/${realId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
    }

  } catch (error) {
    // Rollback jika server error
    cartItems.value = cartItems.value.filter((i) => i.id !== tempId);
    Swal.fire("Error", "Gagal menambahkan ke keranjang.", "error");
  }
};

const handleQtyChange = (item, newQty) => {
  // 1. Validasi Batas
  if (newQty < 1) newQty = 1;
  if (newQty > item.product.stock) {
    newQty = item.product.stock;
    Swal.fire({ toast: true, position: "top-end", icon: "warning", title: `Max stock is ${item.product.stock}`, showConfirmButton: false, timer: 2000 });
  }

  // 2. Update UI Seketika
  item.quantity = newQty;
  item.gross_amount = item.quantity * parseFloat(item.product.discount_price ?? item.product.price);
  item.isSyncing = true;

  // 3. JIKA BARANG MASIH STATUS "isCreating" (POST API BELUM SELESAI), JANGAN TEMBAK PUT API!
  // Biarkan block `handleOptimisticAdd` yang akan mengeksekusi PUT saat POST selesai.
  if (item.isCreating) return;

  // 4. Debounce Normal (Beri waktu user klik berkali-kali)
  if (debounceTimers.has(item.id)) clearTimeout(debounceTimers.get(item.id));

  const timerId = setTimeout(() => {
    syncQtyToDatabase(item);
    debounceTimers.delete(item.id);
  }, 600); 

  debounceTimers.set(item.id, timerId);
};

const syncQtyToDatabase = async (item) => {
  try {
    const res = await axios.put(
      `${BASE_URL}/carts/${item.id}`,
      { quantity: item.quantity },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    item.gross_amount = res.data.gross_amount;
  } catch (error) {
    console.error("Sync failed:", error);
    fetchCarts(); // Hanya refresh jika ada error koneksi sungguhan
  } finally {
    item.isSyncing = false;
  }
};

const handleOptimisticDelete = async (id) => {
  const backupItems = [...cartItems.value];
  
  // 1. HAPUS DARI UI INSTAN & MUNCULKAN POPUP INSTAN
  cartItems.value = cartItems.value.filter((item) => item.id !== id);
  Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Item Removed", showConfirmButton: false, timer: 2000 });

  // 2. Jika ID adalah Temp ID (Barang sedang di-POST), biarkan edge case di atas yang menghapusnya.
  if (String(id).startsWith("temp_")) return;

  try {
    // 3. Hapus di database secara background
    await axios.delete(`${BASE_URL}/carts/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
  } catch (error) {
    // Rollback
    cartItems.value = backupItems;
    Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Failed to remove item", showConfirmButton: false, timer: 3000 });
  }
};

const triggerCartBounce = () => {
  isBadgePopping.value = true;
  setTimeout(() => (isBadgePopping.value = false), 300);
};

// =========================================================

const handleCheckout = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/checkout`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );

    const transactionId = res.data.transaction_id || res.data.data?.transaction_id || res.data.id;
    if (!transactionId) throw new Error("Transaction ID not found in response");

    watch(() => route.path, () => { isCartOpen.value = false; });
    isBadgePopping.value = false;

    setTimeout(() => {
      router.push(`/payment/${transactionId}`);
    }, 300); 
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Checkout Failed",
      text: "Unable to proceed to payment.",
    });
  }
};

const fetchCarts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/carts`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    cartItems.value = res.data.map((item) => ({ ...item, isSyncing: false }));
  } catch (err) {
    console.error("Failed to load bag", err);
  }
};

const openCart = () => {
  if (!isAuthenticated.value) {
    Swal.fire({
      icon: "info",
      title: "Sign In Required",
      text: "Please login to see your shopping bag.",
      confirmButtonColor: "#000",
    });
    return;
  }
  isCartOpen.value = true;
};

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    isAuthenticated.value = true;
    userData.value = JSON.parse(user);
  } else {
    isAuthenticated.value = false;
    userData.value = null;
  }
};

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(v);

const toggleDropdown = () => {
  checkAuth();
  isDropdownOpen.value = !isDropdownOpen.value;
};

onMounted(() => {
  checkAuth();
  fetchAllProducts();
  if (isAuthenticated.value) fetchCarts();
  window.addEventListener("optimistic-add-to-cart", handleOptimisticAdd);

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });

  window.addEventListener("refresh-cart", fetchCarts);
});

onMounted(() => {
  window.addEventListener("track-view", (e) => {
    const product = e.detail;
    let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
    list = list.filter((item) => item.id !== product.id);
    list.unshift(product);
    list = list.slice(0, 6);
    localStorage.setItem("recently_viewed", JSON.stringify(list));
  });
});

onUnmounted(() => {
  window.removeEventListener("optimistic-add-to-cart", handleOptimisticAdd);
});

watch(
  () => route.path,
  () => {
    isDropdownOpen.value = false;
    isMobileMenuOpen.value = false;
    checkAuth();
    if (isAuthenticated.value) fetchCarts();
  },
);
</script> -->

<!-- <template>
  <header
    class="fixed top-0 left-0 z-50 w-full px-6 py-4 bg-white border-b border-gray-200"
  >
    <div
      class="relative flex items-center justify-between h-8 mx-auto max-w-7xl md:h-12"
    >
      <div class="flex items-center justify-start flex-1">
        <nav
          class="hidden space-x-6 text-xs font-medium tracking-widest uppercase md:flex"
        >
          <router-link
            to="/"
            class="transition cursor-pointer hover:text-gray-500"
            >Home</router-link
          >
          <router-link
            to="/best-sellers"
            class="font-bold text-red-600 transition cursor-pointer hover:text-gray-500"
            >Best Sellers</router-link
          >
          <router-link
            to="/collections"
            class="transition cursor-pointer hover:text-gray-500"
            >Collections</router-link
          >
          <router-link
            to="/contact"
            class="transition cursor-pointer hover:text-gray-500"
            >Contact</router-link
          >
        </nav>
        <button
          @click="isMobileMenuOpen = true"
          class="flex items-center justify-center text-gray-700 md:hidden focus:outline-none hover:text-black"
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
              stroke-width="1.5"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div
        class="absolute flex justify-center flex-shrink-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 top-1/2"
      >
        <img
          src="../../../assets/solherbrandbook.png"
          alt="Solher Logo"
          class="object-contain w-auto h-8 cursor-pointer pointer-events-auto md:h-12"
          @click="$router.push('/')"
        />
      </div>

      <div
        class="flex items-center justify-end flex-1 space-x-4 text-gray-700 md:space-x-5"
      >
        <button
          @click="openSearch"
          class="flex items-center justify-center transition-colors focus:outline-none hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <div class="relative flex items-center justify-center">
          <button @click="toggleDropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>

          <div
            v-if="isDropdownOpen"
            class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in"
          >
            <div v-if="isAuthenticated" class="text-left">
              <h3
                class="text-sm font-bold tracking-tight text-black uppercase truncate"
              >
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-xs text-gray-500 truncate">
                {{ userData?.email }}
              </p>
            </div>
            <div v-else>
              <h3
                class="mb-4 text-xs font-bold tracking-widest text-left text-black uppercase"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block w-full py-3 mb-4 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black hover:bg-gray-800"
                >Sign In</router-link
              >
            </div>
            <div class="grid grid-cols-2 gap-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                ></router-link
              >
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                ></router-link
              >
            </div>
          </div>
        </div>

        <button
          @click="openCartPage"
          class="relative transition-colors hover:text-black cart-icon-header"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span
            v-if="cartCount > 0"
            :class="[
              isBadgePopping ? 'scale-150 bg-red-600' : 'scale-100 bg-black',
            ]"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] text-white transition-all duration-300 pointer-events-none"
            >{{ cartCount }}</span
          >
        </button>
      </div>
    </div>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="z-[200] fixed inset-0 flex">
        <div
          @click="isMobileMenuOpen = false"
          class="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
        ></div>
        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          <div
            class="flex items-center justify-between pb-6 mb-10 border-b border-gray-100"
          >
            <img
              src="../../../assets/solherbrandbook.png"
              alt="Logo"
              class="object-contain w-auto h-6"
            />
            <button
              @click="isMobileMenuOpen = false"
              class="p-2 text-gray-500 hover:text-black"
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
          </div>
          <nav class="flex flex-col space-y-6 font-serif text-2xl">
            <router-link
              to="/"
              class="pb-4 transition-colors border-b border-gray-50 hover:text-gray-500"
              @click="isMobileMenuOpen = false"
              >Home</router-link
            >
            <router-link
              to="/best-sellers"
              class="pb-4 font-bold text-red-600 transition-colors border-b border-gray-50 hover:text-red-800"
              @click="isMobileMenuOpen = false"
              >Best Sellers</router-link
            >
            <router-link
              to="/collections"
              class="pb-4 transition-colors border-b border-gray-50 hover:text-gray-500"
              @click="isMobileMenuOpen = false"
              >Collections</router-link
            >
            <router-link
              to="/contact"
              class="pb-4 transition-colors border-b border-gray-50 hover:text-gray-500"
              @click="isMobileMenuOpen = false"
              >Contact</router-link
            >
          </nav>
          <div
            class="pt-10 mt-auto text-xs tracking-widest text-gray-400 uppercase"
          >
            <p>© 2026 Solher</p>
          </div>
        </div>
      </div>
    </transition>
  </header>
  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import SearchModal from "../../User/Layout/SearchModal.vue";

// [BARU] Import Global Cart State
import { useCart } from "../../../composables/useCart";

const route = useRoute();
const router = useRouter();

const isSearchOpen = ref(false);
const openSearch = () => (isSearchOpen.value = true);
const closeSearch = () => (isSearchOpen.value = false);

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const isMobileMenuOpen = ref(false);

// Menggunakan State Global untuk Header
const { cartCount, fetchCarts, handleOptimisticAdd } = useCart();
const isBadgePopping = ref(false);

const openCartPage = () => {
  if (!isAuthenticated.value) {
    Swal.fire({
      icon: "info",
      title: "Sign In Required",
      text: "Please login to see your shopping bag.",
      confirmButtonColor: "#000",
    });
    return;
  }
  router.push("/cart");
};

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    isAuthenticated.value = true;
    userData.value = JSON.parse(user);
  } else {
    isAuthenticated.value = false;
    userData.value = null;
  }
};

const toggleDropdown = () => {
  checkAuth();
  isDropdownOpen.value = !isDropdownOpen.value;
};

// Menangkap Event Fly Animation dari Product Detail
const onAddToCartEvent = (e) => {
  handleOptimisticAdd(e.detail, () => {
    isBadgePopping.value = true;
    setTimeout(() => (isBadgePopping.value = false), 300);
  });
};

onMounted(() => {
  checkAuth();
  if (isAuthenticated.value) fetchCarts(); // Ambil data diam-diam di background!

  window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });
  window.addEventListener("refresh-cart", fetchCarts);
});

onUnmounted(() => {
  window.removeEventListener("optimistic-add-to-cart", onAddToCartEvent);
});

watch(
  () => route.path,
  () => {
    isDropdownOpen.value = false;
    isMobileMenuOpen.value = false;
    checkAuth();
  },
);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style> -->

<!-- <template>
  <header
    class="fixed top-0 left-0 z-50 w-full px-6 py-4 bg-white border-b border-gray-200"
  >
    <div
      class="relative flex items-center justify-between h-8 mx-auto max-w-7xl md:h-12"
    >
      <div class="flex items-center justify-start flex-1">
        <nav
          class="items-center hidden h-full space-x-6 text-xs font-medium tracking-widest uppercase md:flex"
        >
          <router-link
            to="/"
            class="transition cursor-pointer hover:text-gray-500"
            >Home</router-link
          >
          <router-link
            to="/best-sellers"
            class="font-bold text-red-600 transition cursor-pointer hover:text-gray-500"
            >Best Sellers</router-link
          >
          
          <div 
            class="relative flex items-center h-full"
            @mouseenter="openMegaMenu"
            @mouseleave="closeMegaMenu"
          >
            <router-link
              to="/collections"
              class="transition cursor-pointer hover:text-gray-500"
              :class="{'text-gray-500': isMegaMenuOpen}"
              >Collections</router-link
            >
          </div>

          <router-link
            to="/contact"
            class="transition cursor-pointer hover:text-gray-500"
            >Contact</router-link
          >
        </nav>
        
        <button
          @click="isMobileMenuOpen = true"
          class="flex items-center justify-center text-gray-700 md:hidden focus:outline-none hover:text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      <div class="absolute flex justify-center flex-shrink-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 top-1/2">
        <img src="../../../assets/solherbrandbook.png" alt="Solher Logo" class="object-contain w-auto h-8 cursor-pointer pointer-events-auto md:h-12" @click="$router.push('/')" />
      </div>

      <div class="flex items-center justify-end flex-1 space-x-4 text-gray-700 md:space-x-5">
         <button @click="openSearch" class="flex items-center justify-center transition-colors focus:outline-none hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
        </button>

        <div class="relative flex items-center justify-center">
          <button @click="toggleDropdown">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
          </button>
          
          <div v-if="isDropdownOpen" class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in">
             <div v-if="isAuthenticated" class="text-left">
              <h3 class="text-sm font-bold tracking-tight text-black uppercase truncate">HI {{ userData?.first_name }} {{ userData?.last_name }}</h3>
              <p class="mb-4 text-xs text-gray-500 truncate">{{ userData?.email }}</p>
            </div>
            <div v-else>
              <h3 class="mb-4 text-xs font-bold tracking-widest text-left text-black uppercase">Account</h3>
              <router-link to="/login" @click="isDropdownOpen = false" class="block w-full py-3 mb-4 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black hover:bg-gray-800">Sign In</router-link>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <router-link to="/orderpage" @click="isDropdownOpen = false" class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"><span class="font-bold text-[10px] uppercase tracking-wider">Orders</span></router-link>
              <router-link to="/profilepage" @click="isDropdownOpen = false" class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"><span class="font-bold text-[10px] uppercase tracking-wider">Profile</span></router-link>
            </div>
          </div>
        </div>

        <button @click="openCartPage" class="relative transition-colors hover:text-black cart-icon-header">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>
          <span v-if="cartCount > 0" :class="[isBadgePopping ? 'scale-150 bg-red-600' : 'scale-100 bg-black']" class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] text-white transition-all duration-300 pointer-events-none">{{ cartCount }}</span>
        </button>
      </div>
    </div>

    <transition name="mega-menu-fade">
      <div 
        v-if="isMegaMenuOpen" 
        class="absolute left-0 hidden w-full overflow-hidden bg-white border-t border-gray-100 shadow-xl top-full md:block"
        @mouseenter="keepMegaMenuOpen"
        @mouseleave="closeMegaMenu"
      >
        <div class="mx-auto max-w-7xl flex h-[400px]">
          
          <div class="w-1/4 px-6 py-8 overflow-y-auto border-r border-gray-100 bg-gray-50/50">
            <h3 class="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6">Categories</h3>
            <ul class="space-y-4">
              <li>
                <button 
                  @click="selectMegaMenuCategory('all')"
                  @mouseenter="selectMegaMenuCategory('all')"
                  :class="activeMegaCategory === 'all' ? 'text-black font-bold' : 'text-gray-500 hover:text-black'"
                  class="w-full text-xs tracking-widest text-left uppercase transition-colors"
                >
                  All Bags
                </button>
              </li>
              <li v-for="cat in categories" :key="cat.id">
                <button 
                  @click="selectMegaMenuCategory(cat.id)"
                  @mouseenter="selectMegaMenuCategory(cat.id)"
                  :class="activeMegaCategory === cat.id ? 'text-black font-bold' : 'text-gray-500 hover:text-black'"
                  class="w-full text-xs tracking-widest text-left uppercase transition-colors"
                >
                  {{ cat.category_name }}
                </button>
              </li>
            </ul>
          </div>

          <div class="relative w-3/4 px-10 py-8">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400">
                {{ activeMegaCategory === 'all' ? 'Featured Picks' : 'Category Highlights' }}
              </h3>
              <router-link to="/collections" class="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-500 transition-colors">
                View All Collection
              </router-link>
            </div>

            <div v-if="isMegaMenuLoading" class="absolute inset-0 z-10 flex items-center justify-center bg-white/80">
              <div class="w-8 h-8 border-2 border-gray-200 rounded-full border-t-black animate-spin"></div>
            </div>

            <div class="grid grid-cols-4 gap-x-6 gap-y-8">
              <div 
                v-for="product in randomMegaProducts" 
                :key="product.id"
                @click="navigateToProduct(product.id)"
                class="cursor-pointer group"
              >
                <div class="relative mb-3 overflow-hidden bg-gray-100 rounded-lg aspect-square">
                  <img :src="product.image || defaultBagIcon" class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                  <div v-if="product.discount_price" class="absolute top-2 left-2 bg-red-600 text-white px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm">Sale</div>
                </div>
                <h4 class="font-bold text-[10px] uppercase tracking-widest text-gray-900 truncate">{{ product.name }}</h4>
                <p class="text-[10px] text-gray-500 mt-0.5">{{ formatPrice(product.discount_price ?? product.price) }}</p>
              </div>
            </div>

            <div v-if="!isMegaMenuLoading && randomMegaProducts.length === 0" class="flex flex-col items-center justify-center h-48 font-serif italic text-gray-400">
              No products found in this category.
            </div>

          </div>

        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="z-[200] fixed inset-0 flex">
        <div
          @click="isMobileMenuOpen = false"
          class="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
        ></div>
        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          </div>
      </div>
    </transition>

  </header>
  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios"; // Tambahkan axios jika belum ada
import SearchModal from "../../User/Layout/SearchModal.vue";

// [BARU] Import gambar default untuk fallback
import defaultBagIcon from "../../../assets/products/bag_icon.jpg";

// [BARU] Import Global Cart State
import { useCart } from "../../../composables/useCart";
import { BASE_URL } from "../../../config/api"; // Pastikan path benar

// [BARU] Import Product Store untuk akses data katalog tanpa hit API terus menerus
import { useProductStore } from "../../../composables/useProductStore";

const route = useRoute();
const router = useRouter();

const isSearchOpen = ref(false);
const openSearch = () => (isSearchOpen.value = true);
const closeSearch = () => (isSearchOpen.value = false);

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const isMobileMenuOpen = ref(false);

// Menggunakan State Global untuk Header
const { cartCount, fetchCarts, handleOptimisticAdd } = useCart();
const { state: productState, fetchCollectionsData } = useProductStore(); // Inisialisasi Store
const isBadgePopping = ref(false);

// =======================================================
// [BARU] STATE & LOGIKA MEGA MENU
// =======================================================
const isMegaMenuOpen = ref(false);
const megaMenuTimer = ref(null);
const activeMegaCategory = ref('all');
const categories = ref([]);
const isMegaMenuLoading = ref(false);
const randomMegaProducts = ref([]);

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

// Fungsi mengacak array (Fisher-Yates Shuffle)
const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

// Filter dan Acak Produk
// const generateRandomProducts = () => {
//   if (!productState.allProducts || productState.allProducts.length === 0) return;
  
//   isMegaMenuLoading.value = true;
  
//   // Kasih delay super kecil agar loading UI sempat merender (memberi kesan sistem sedang bekerja)
//   setTimeout(() => {
//     let filtered = [];
//     if (activeMegaCategory.value === 'all') {
//       filtered = [...productState.allProducts];
//     } else {
//       filtered = productState.allProducts.filter(p => p.category_id === activeMegaCategory.value);
//     }

//     // Acak dan ambil maksimal 8
//     randomMegaProducts.value = shuffleArray(filtered).slice(0, 8);
//     isMegaMenuLoading.value = false;
//   }, 100);
// };

// const generateRandomProducts = () => {
//   // Fallback check: if it's STILL empty after awaiting, log it so we know the store is the issue
//   if (!productState.allProducts || productState.allProducts.length === 0) {
//     console.warn("Mega Menu: productState.allProducts is empty even after fetching.");
//     isMegaMenuLoading.value = false;
//     randomMegaProducts.value = [];
//     return;
//   }
  
//   isMegaMenuLoading.value = true;
  
//   setTimeout(() => {
//     let filtered = [];
//     if (activeMegaCategory.value === 'all') {
//       filtered = [...productState.allProducts];
//     } else {
//       // NOTE: Ensure the data types match! 
//       // Sometimes API returns category_id as String, but activeMegaCategory is an Integer (or vice versa).
//       // Using '==' instead of '===' prevents type mismatch bugs here.
//       filtered = productState.allProducts.filter(p => p.category_id == activeMegaCategory.value);
//     }

//     randomMegaProducts.value = shuffleArray(filtered).slice(0, 8);
//     isMegaMenuLoading.value = false;
//   }, 100);
// };

const generateRandomProducts = () => {
  if (!productState.collectionsProducts || productState.collectionsProducts.length === 0) {
    console.warn("Mega Menu: productState.collectionsProducts is empty even after fetching.");
    isMegaMenuLoading.value = false;
    randomMegaProducts.value = [];
    return;
  }
  
  isMegaMenuLoading.value = true;
  
  setTimeout(() => {
    let filtered = [];
    if (activeMegaCategory.value === 'all') {
      filtered = [...productState.collectionsProducts];
    } else {
      // Gunakan '==' agar aman jika tipe datanya beda (String vs Integer)
      filtered = productState.collectionsProducts.filter(p => p.category_id == activeMegaCategory.value);
    }

    randomMegaProducts.value = shuffleArray(filtered).slice(0, 4);
    isMegaMenuLoading.value = false;
  }, 100);
};

// Ambil Kategori (Dari API atau dari Store jika Anda sudah menyimpannya di Store)
const fetchCategoriesForMegaMenu = async () => {
  if (categories.value.length > 0) return; // Jangan panggil lagi jika sudah ada
  try {
    const res = await axios.get(`${BASE_URL}/guest/categories`);
    categories.value = res.data.data || res.data;
  } catch (error) {
    console.error("Failed to load categories for Mega Menu", error);
  }
};

// const openMegaMenu = async () => {
//   clearTimeout(megaMenuTimer.value);
//   isMegaMenuOpen.value = true;
//   isDropdownOpen.value = false; // Tutup dropdown profile jika sedang buka
  
//   // Pastikan data katalog sudah ada di Global Store
//   if (!productState.isHomeLoaded) {
//     await fetchHomeData();
//   }
  
//   fetchCategoriesForMegaMenu();
//   generateRandomProducts(); // Acak saat pertama dibuka
// };

const openMegaMenu = async () => {
  clearTimeout(megaMenuTimer.value);
  isMegaMenuOpen.value = true;
  isDropdownOpen.value = false;
  
  // 1. Show loading state immediately
  isMegaMenuLoading.value = true;

  // 2. Fetch categories
  fetchCategoriesForMegaMenu();

  // 3. Ensure product data exists
  // if (!productState.isHomeLoaded || !productState.allProducts || productState.allProducts.length === 0) {
  //   try {
  //     await fetchHomeData();
  //   } catch (e) {
  //     console.error("Failed to fetch home data for Mega Menu", e);
  //   }
  // }

  // [PERBAIKAN 3]: Gunakan isCollectionsLoaded dan fetchCollectionsData()
  if (!productState.isCollectionsLoaded || !productState.collectionsProducts || productState.collectionsProducts.length === 0) {
    try {
      await fetchCollectionsData();
    } catch (e) {
      console.error("Failed to fetch collections data for Mega Menu", e);
    }
  }
  
  // 4. Generate random products (it will now definitely have data)
  generateRandomProducts();
};

const keepMegaMenuOpen = () => {
  clearTimeout(megaMenuTimer.value);
};

const closeMegaMenu = () => {
  // Beri sedikit jeda (debounce) agar menu tidak langsung hilang saat mouse meleset sedikit
  megaMenuTimer.value = setTimeout(() => {
    isMegaMenuOpen.value = false;
  }, 150); 
};

const selectMegaMenuCategory = (catId) => {
  if (activeMegaCategory.value !== catId) {
    activeMegaCategory.value = catId;
    generateRandomProducts(); // Acak ulang setiap kali ganti kategori
  }
};

const navigateToProduct = (id) => {
  closeMegaMenu(); // Tutup menu langsung
  router.push(`/product/${id}`);
};
// =======================================================

const openCartPage = () => {
  if (!isAuthenticated.value) {
    Swal.fire({
      icon: "info",
      title: "Sign In Required",
      text: "Please login to see your shopping bag.",
      confirmButtonColor: "#000",
    });
    return;
  }
  router.push("/cart");
};

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    isAuthenticated.value = true;
    userData.value = JSON.parse(user);
  } else {
    isAuthenticated.value = false;
    userData.value = null;
  }
};

const toggleDropdown = () => {
  checkAuth();
  isDropdownOpen.value = !isDropdownOpen.value;
  isMegaMenuOpen.value = false; // Tutup mega menu jika buka profile
};

// Menangkap Event Fly Animation dari Product Detail
const onAddToCartEvent = (e) => {
  handleOptimisticAdd(e.detail, () => {
    isBadgePopping.value = true;
    setTimeout(() => (isBadgePopping.value = false), 300);
  });
};

onMounted(() => {
  checkAuth();
  if (isAuthenticated.value) fetchCarts(); // Ambil data diam-diam di background!

  window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });
  window.addEventListener("refresh-cart", fetchCarts);
});

onUnmounted(() => {
  window.removeEventListener("optimistic-add-to-cart", onAddToCartEvent);
});

watch(
  () => route.path,
  () => {
    isDropdownOpen.value = false;
    isMobileMenuOpen.value = false;
    checkAuth();
  },
);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
/* [BARU] Animasi untuk Mega Menu */
.mega-menu-fade-enter-active,
.mega-menu-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}
.mega-menu-fade-enter-from,
.mega-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px) scaleY(0.98);
}
</style> -->

<!-- <template>
  <div
    :class="isAtTop ? 'translate-y-0' : '-translate-y-full'"
    class="fixed top-0 left-0 w-full h-[40px] bg-[#111] text-white z-[60] flex items-center justify-center transition-transform duration-300"
  >
    <button
      @click="prevAnnouncement"
      class="absolute p-2 text-gray-400 transition left-4 hover:text-white focus:outline-none"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <transition name="fade-slide" mode="out-in">
      <p
        :key="currentAnnouncement"
        @click="$router.push('/collections')"
        class="text-[10px] md:text-xs font-serif tracking-widest text-center px-12 cursor-pointer hover:text-gray-300 transition-colors truncate w-full max-w-3xl"
      >
        {{ announcements[currentAnnouncement] }}
      </p>
    </transition>

    <button
      @click="nextAnnouncement"
      class="absolute p-2 text-gray-400 transition right-4 hover:text-white focus:outline-none"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>

  <header
    :class="isAtTop ? 'top-[40px]' : 'top-0'"
    class="fixed left-0 z-50 w-full px-6 py-4 transition-all duration-300 bg-white border-b border-gray-200"
  >
    <div
      class="relative flex items-center justify-between h-8 mx-auto max-w-7xl md:h-12"
    >
      <div class="flex items-center justify-start flex-1">
        <nav
          class="items-center hidden h-full space-x-6 text-xs font-medium tracking-widest uppercase md:flex"
        >
          <router-link
            to="/"
            class="transition cursor-pointer hover:text-gray-500"
            >Home</router-link
          >
          <router-link
            to="/best-sellers"
            class="font-bold text-red-600 transition cursor-pointer hover:text-gray-500"
            >Best Sellers</router-link
          >

          <div
            class="relative flex items-center h-full"
            @mouseenter="openMegaMenu"
            @mouseleave="closeMegaMenu"
          >
            <router-link
              to="/collections"
              class="transition cursor-pointer hover:text-gray-500"
              :class="{ 'text-gray-500': isMegaMenuOpen }"
              >Collections</router-link
            >
          </div>

          <router-link
            to="/contact"
            class="transition cursor-pointer hover:text-gray-500"
            >Contact</router-link
          >
        </nav>

        <button
          @click="isMobileMenuOpen = true"
          class="flex items-center justify-center text-gray-700 md:hidden focus:outline-none hover:text-black"
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
              stroke-width="1.5"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div
        class="absolute flex justify-center flex-shrink-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 top-1/2"
      >
        <img
          src="../../../assets/solherbrandbook.png"
          alt="Solher Logo"
          class="object-contain w-auto h-8 cursor-pointer pointer-events-auto md:h-12"
          @click="$router.push('/')"
        />
      </div>

      <div
        class="flex items-center justify-end flex-1 space-x-4 text-gray-700 md:space-x-5"
      >
        <button
          @click="openSearch"
          class="flex items-center justify-center transition-colors focus:outline-none hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <div class="relative flex items-center justify-center">
          <button @click="toggleDropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>

          <div
            v-if="isDropdownOpen"
            class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in"
          >
            <div v-if="isAuthenticated" class="text-left">
              <h3
                class="text-sm font-bold tracking-tight text-black uppercase truncate"
              >
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-xs text-gray-500 truncate">
                {{ userData?.email }}
              </p>
            </div>
            <div v-else>
              <h3
                class="mb-4 text-xs font-bold tracking-widest text-left text-black uppercase"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block w-full py-3 mb-4 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black hover:bg-gray-800"
                >Sign In</router-link
              >
            </div>
            <div class="grid grid-cols-2 gap-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                ></router-link
              >
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                ></router-link
              >
            </div>
          </div>
        </div>

        <button
          @click="openCartPage"
          class="relative transition-colors hover:text-black cart-icon-header"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span
            v-if="cartCount > 0"
            :class="[
              isBadgePopping ? 'scale-150 bg-red-600' : 'scale-100 bg-black',
            ]"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] text-white transition-all duration-300 pointer-events-none"
            >{{ cartCount }}</span
          >
        </button>
        <button
          @click="isAuthenticated ? $router.push('/chat-list') : toggleDropdown()"
          class="relative flex items-center justify-center transition-colors focus:outline-none hover:text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          <span
            v-if="totalUnreadChats > 0"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] font-bold text-white bg-red-600 transition-all duration-300 pointer-events-none shadow-sm"
          >
            {{ totalUnreadChats > 99 ? '99+' : totalUnreadChats }}
          </span>
        </button>
      </div>
    </div>

    <transition name="mega-menu-fade">
      <div
        v-if="isMegaMenuOpen"
        class="absolute left-0 hidden w-full overflow-hidden bg-white border-t border-gray-100 shadow-xl top-full md:block"
        @mouseenter="keepMegaMenuOpen"
        @mouseleave="closeMegaMenu"
      >
        <div class="mx-auto max-w-7xl flex h-[400px]">
          <div
            class="w-1/4 px-6 py-8 overflow-y-auto border-r border-gray-100 bg-gray-50/50"
          >
            <h3
              class="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6"
            >
              Categories
            </h3>
            <ul class="space-y-4">
              <li>
                <button
                  @click="goToCollection('all')"
                  @mouseenter="selectMegaMenuCategory('all')"
                  :class="
                    activeMegaCategory === 'all'
                      ? 'text-black font-bold'
                      : 'text-gray-500 hover:text-black'
                  "
                  class="w-full text-xs tracking-widest text-left uppercase transition-colors"
                >
                  All Bags
                </button>
              </li>
              <li v-for="cat in categories" :key="cat.id">
                <button
                  @click="goToCollection(cat.category_name)"
                  @mouseenter="selectMegaMenuCategory(cat.id)"
                  :class="
                    activeMegaCategory === cat.id
                      ? 'text-black font-bold'
                      : 'text-gray-500 hover:text-black'
                  "
                  class="w-full text-xs tracking-widest text-left uppercase transition-colors"
                >
                  {{ cat.category_name }}
                </button>
              </li>
            </ul>
          </div>

          <div class="relative w-3/4 px-10 py-8">
            <div class="flex items-center justify-between mb-6">
              <h3
                class="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400"
              >
                {{
                  activeMegaCategory === "all"
                    ? "Featured Picks"
                    : "Category Highlights"
                }}
              </h3>
              <router-link
                to="/collections"
                class="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-500 transition-colors"
              >
                View All Collection
              </router-link>
            </div>

            <div
              v-if="isMegaMenuLoading"
              class="absolute inset-0 z-10 flex items-center justify-center bg-white/80"
            >
              <div
                class="w-8 h-8 border-2 border-gray-200 rounded-full border-t-black animate-spin"
              ></div>
            </div>

            <div class="grid grid-cols-4 gap-x-6 gap-y-8">
              <div
                v-for="product in randomMegaProducts"
                :key="product.id"
                @click="navigateToProduct(product.id)"
                class="cursor-pointer group"
              >
                <div
                  class="relative mb-3 overflow-hidden bg-gray-100 rounded-lg aspect-square"
                >
                  <img
                    :src="product.image || defaultBagIcon"
                    class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    v-if="product.discount_price"
                    class="absolute top-2 left-2 bg-red-600 text-white px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm"
                  >
                    Sale
                  </div>
                </div>
                <h4
                  class="font-bold text-[10px] uppercase tracking-widest text-gray-900 truncate"
                >
                  {{ product.name }}
                </h4>
                <p class="text-[10px] text-gray-500 mt-0.5">
                  {{ formatPrice(product.discount_price ?? product.price) }}
                </p>
              </div>
            </div>

            <div
              v-if="!isMegaMenuLoading && randomMegaProducts.length === 0"
              class="flex flex-col items-center justify-center h-48 font-serif italic text-gray-400"
            >
              No products found in this category.
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="z-[200] fixed inset-0 flex">
        <div
          @click="isMobileMenuOpen = false"
          class="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
        ></div>
        
        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          <div class="flex items-center justify-between mb-10">
            <img src="../../../assets/solherbrandbook.png" alt="Solher Logo" class="object-contain w-auto h-6" />
            <button @click="isMobileMenuOpen = false" class="text-gray-400 transition-colors hover:text-black focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav class="flex flex-col space-y-6">
            <router-link
              to="/"
              @click="isMobileMenuOpen = false"
              class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
            >
              Home
            </router-link>
            <router-link
              to="/best-sellers"
              @click="isMobileMenuOpen = false"
              class="pb-4 text-sm font-black tracking-widest text-red-600 uppercase transition-colors border-b border-gray-100 hover:text-red-800"
            >
              Best Sellers
            </router-link>
            
            <div class="pb-4 border-b border-gray-100">
              <div class="flex items-center justify-between w-full">
                <router-link
                  to="/collections"
                  @click="isMobileMenuOpen = false"
                  class="text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors hover:text-gray-500"
                >
                  Collections
                </router-link>
              </div>
              <ul class="pl-4 mt-4 space-y-4 border-l-2 border-gray-100">
                <li>
                  <button 
                    @click="goToCollection('all'); isMobileMenuOpen = false"
                    class="w-full text-xs font-medium tracking-widest text-left text-gray-500 uppercase transition-colors hover:text-black"
                  >
                    All Bags
                  </button>
                </li>
                <li v-for="cat in categories" :key="cat.id">
                  <button 
                    @click="goToCollection(cat.category_name); isMobileMenuOpen = false"
                    class="w-full text-xs font-medium tracking-widest text-left text-gray-500 uppercase transition-colors hover:text-black"
                  >
                    {{ cat.category_name }}
                  </button>
                </li>
              </ul>
            </div>

            <router-link
              to="/contact"
              @click="isMobileMenuOpen = false"
              class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
            >
              Contact
            </router-link>
          </nav>

          <div class="pt-8 mt-auto">
            <div v-if="isAuthenticated" class="p-4 mb-4 bg-gray-50 rounded-xl">
               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Logged in as</p>
               <p class="text-sm font-bold text-gray-900 truncate">{{ userData?.first_name }} {{ userData?.last_name }}</p>
               <div class="flex gap-4 mt-3">
                 <router-link to="/orderpage" @click="isMobileMenuOpen = false" class="text-xs font-bold text-blue-600 hover:underline">Orders</router-link>
                 <router-link to="/profilepage" @click="isMobileMenuOpen = false" class="text-xs font-bold text-blue-600 hover:underline">Profile</router-link>
               </div>
            </div>
            <div v-else class="mb-6">
              <router-link 
                to="/login" 
                @click="isMobileMenuOpen = false"
                class="block w-full py-3 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black rounded-lg hover:bg-gray-800"
              >
                Sign In / Register
              </router-link>
            </div>
            
            <p class="text-[9px] text-center text-gray-400 uppercase tracking-widest">
              © {{ new Date().getFullYear() }} Solher Official
            </p>
          </div>

        </div>
      </div>
    </transition>
  </header>
  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import SearchModal from "../../User/Layout/SearchModal.vue";

import defaultBagIcon from "../../../assets/products/bag_icon.jpg";
import { useCart } from "../../../composables/useCart";
import { BASE_URL } from "../../../config/api";
import { useProductStore } from "../../../composables/useProductStore";

const route = useRoute();
const router = useRouter();

const isSearchOpen = ref(false);
const openSearch = () => (isSearchOpen.value = true);
const closeSearch = () => (isSearchOpen.value = false);

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const isMobileMenuOpen = ref(false);

const { cartCount, fetchCarts, handleOptimisticAdd } = useCart();
const { state: productState, fetchCollectionsData } = useProductStore();
const isBadgePopping = ref(false);

// [BARU] State untuk menyimpan jumlah chat yang belum dibaca
const totalUnreadChats = ref(0);

// [BARU] Fungsi untuk mengambil data chat yang belum dibaca
const fetchUnreadChats = async () => {
  if (!isAuthenticated.value) return;
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    // Menjumlahkan semua unread_count dari setiap admin
    totalUnreadChats.value = res.data.reduce((sum, admin) => sum + (admin.unread_count || 0), 0);
  } catch (error) {
    console.error("Gagal mengambil badge chat:", error);
  }
};

// =======================================================
// [BARU] STATE & LOGIKA ANNOUNCEMENT BAR
// =======================================================
const isAtTop = ref(true);
const currentAnnouncement = ref(0);
let announcementTimer = null;

// Teks yang diberikan oleh bos Anda
const announcements = [
  "An Exclusive Welcome Gift: Rp 250K OFF your first order →",
  "A Little Extra, On Us — Complimentary Shipping Across Indonesia (Min. Rp 1.000.000) →",
];

// Pindah ke pesan selanjutnya
const nextAnnouncement = () => {
  currentAnnouncement.value =
    (currentAnnouncement.value + 1) % announcements.length;
  resetAnnouncementTimer();
};

// Pindah ke pesan sebelumnya
const prevAnnouncement = () => {
  currentAnnouncement.value =
    (currentAnnouncement.value - 1 + announcements.length) %
    announcements.length;
  resetAnnouncementTimer();
};

// Timer shuffle otomatis 3 detik
const startAnnouncementTimer = () => {
  announcementTimer = setInterval(() => {
    currentAnnouncement.value =
      (currentAnnouncement.value + 1) % announcements.length;
  }, 3000);
};

// Reset timer agar tidak double hit saat user menekan tombol manual
const resetAnnouncementTimer = () => {
  clearInterval(announcementTimer);
  startAnnouncementTimer();
};

// Logika Deteksi Scroll untuk hide/show Bar
const handleScroll = () => {
  // Jika posisi scroll benar-benar di paling atas (titik nol)
  isAtTop.value = window.scrollY <= 0;
};
// =======================================================

const isMegaMenuOpen = ref(false);
const megaMenuTimer = ref(null);
const activeMegaCategory = ref("all");
const categories = ref([]);
const isMegaMenuLoading = ref(false);
const randomMegaProducts = ref([]);

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const generateRandomProducts = () => {
  if (
    !productState.collectionsProducts ||
    productState.collectionsProducts.length === 0
  ) {
    console.warn(
      "Mega Menu: productState.collectionsProducts is empty even after fetching.",
    );
    isMegaMenuLoading.value = false;
    randomMegaProducts.value = [];
    return;
  }

  isMegaMenuLoading.value = true;

  setTimeout(() => {
    let filtered = [];
    if (activeMegaCategory.value === "all") {
      filtered = [...productState.collectionsProducts];
    } else {
      filtered = productState.collectionsProducts.filter(
        (p) => p.category_id == activeMegaCategory.value,
      );
    }

    randomMegaProducts.value = shuffleArray(filtered).slice(0, 4);
    isMegaMenuLoading.value = false;
  }, 100);
};

// const fetchCategoriesForMegaMenu = async () => {
//   if (categories.value.length > 0) return;
//   try {
//     const res = await axios.get(`${BASE_URL}/guest/categories`);
//     categories.value = res.data.data || res.data;
//   } catch (error) {
//     console.error("Failed to load categories for Mega Menu", error);
//   }
// };

const fetchCategoriesForMegaMenu = async () => {
  if (categories.value.length > 0) return;
  try {
    const res = await axios.get(`${BASE_URL}/guest/categories`);
    
    // [PERBAIKAN] Mengurutkan kategori berdasarkan ID dari terkecil ke terbesar
    const data = res.data.data || res.data;
    categories.value = data.sort((a, b) => a.id - b.id);
    
  } catch (error) {
    console.error("Failed to load categories for Mega Menu", error);
  }
};

const openMegaMenu = async () => {
  clearTimeout(megaMenuTimer.value);
  isMegaMenuOpen.value = true;
  isDropdownOpen.value = false;

  isMegaMenuLoading.value = true;
  fetchCategoriesForMegaMenu();

  if (
    !productState.isCollectionsLoaded ||
    !productState.collectionsProducts ||
    productState.collectionsProducts.length === 0
  ) {
    try {
      await fetchCollectionsData();
    } catch (e) {
      console.error("Failed to fetch collections data for Mega Menu", e);
    }
  }

  generateRandomProducts();
};

const keepMegaMenuOpen = () => {
  clearTimeout(megaMenuTimer.value);
};

const closeMegaMenu = () => {
  megaMenuTimer.value = setTimeout(() => {
    isMegaMenuOpen.value = false;
  }, 150);
};

// [BARU] Navigasi ke halaman Collection beserta Parameter Kategori
const goToCollection = (categoryName) => {
  closeMegaMenu(); 
  if (categoryName === 'all') {
    router.push('/collections');
  } else {
    // Lempar nama kategori ke URL
    router.push({ path: '/collections', query: { category: categoryName } });
  }
};

const selectMegaMenuCategory = (catId) => {
  if (activeMegaCategory.value !== catId) {
    activeMegaCategory.value = catId;
    generateRandomProducts();
  }
};

const navigateToProduct = (id) => {
  closeMegaMenu();
  router.push(`/product/${id}`);
};

const openCartPage = () => {
  if (!isAuthenticated.value) {
    Swal.fire({
      icon: "info",
      title: "Sign In Required",
      text: "Please login to see your shopping bag.",
      confirmButtonColor: "#000",
    });
    return;
  }
  router.push("/cart");
};

// const checkAuth = () => {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");
//   if (token && user) {
//     isAuthenticated.value = true;
//     userData.value = JSON.parse(user);
//   } else {
//     isAuthenticated.value = false;
//     userData.value = null;
//   }
// };

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  if (token && user) {
    isAuthenticated.value = true;
    userData.value = JSON.parse(user);
    // Panggil jumlah chat jika sudah login
    fetchUnreadChats();
  } else {
    isAuthenticated.value = false;
    userData.value = null;
    totalUnreadChats.value = 0;
  }
};

const toggleDropdown = () => {
  checkAuth();
  isDropdownOpen.value = !isDropdownOpen.value;
  isMegaMenuOpen.value = false;
};

const onAddToCartEvent = (e) => {
  handleOptimisticAdd(e.detail, () => {
    isBadgePopping.value = true;
    setTimeout(() => (isBadgePopping.value = false), 300);
  });
};

onMounted(() => {
  checkAuth();
  if (isAuthenticated.value) fetchCarts();

  // [BARU] Ambil kategori sejak awal untuk mengisi menu Mobile
  fetchCategoriesForMegaMenu();

  // Mengaktifkan Event Listeners
  window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });
  window.addEventListener("refresh-cart", fetchCarts);

  // [BARU] Event listener untuk mereset badge saat chat dibaca di halaman lain
  window.addEventListener("refresh-chat-badge", fetchUnreadChats);

  // Mengaktifkan Scroll Listener untuk Announcement Bar
  window.addEventListener("scroll", handleScroll);
  // Mulai Timer Shuffle
  startAnnouncementTimer();
});

onUnmounted(() => {
  window.removeEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("refresh-chat-badge", fetchUnreadChats); // Hapus listener
  clearInterval(announcementTimer);
});

watch(
  () => route.path,
  () => {
    isDropdownOpen.value = false;
    isMobileMenuOpen.value = false;
    checkAuth();
  },
);
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transisi untuk teks Announcement Bar agar soft */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
.mega-menu-fade-enter-active,
.mega-menu-fade-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
  transform-origin: top;
}
.mega-menu-fade-enter-from,
.mega-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px) scaleY(0.98);
}
</style> -->

<!-- <template>
  <div
    :class="isAtTop ? 'translate-y-0' : '-translate-y-full'"
    class="fixed top-0 left-0 w-full h-[40px] bg-[#111] text-white z-[60] flex items-center justify-center transition-transform duration-300"
  >
    <button
      @click="prevAnnouncement"
      class="absolute p-2 text-gray-400 transition left-4 hover:text-white focus:outline-none"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <transition name="fade-slide" mode="out-in">
      <p
        :key="currentAnnouncement"
        @click="$router.push('/collections')"
        class="text-[10px] md:text-xs font-serif tracking-widest text-center px-12 cursor-pointer hover:text-gray-300 transition-colors truncate w-full max-w-3xl"
      >
        {{ announcements[currentAnnouncement] }}
      </p>
    </transition>

    <button
      @click="nextAnnouncement"
      class="absolute p-2 text-gray-400 transition right-4 hover:text-white focus:outline-none"
    >
      <svg
        class="w-4 h-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>

  <header
    :class="isAtTop ? 'top-[40px]' : 'top-0'"
    class="fixed left-0 z-50 w-full px-6 py-4 transition-all duration-300 bg-white border-b border-gray-200"
  >
    <div
      class="relative flex items-center justify-between h-8 mx-auto max-w-7xl md:h-12"
    >
      <div class="flex items-center justify-start flex-1">
        <nav
          class="items-center hidden h-full space-x-6 text-xs font-medium tracking-widest uppercase md:flex"
        >
          <router-link
            to="/"
            class="transition cursor-pointer hover:text-gray-500"
            >Home</router-link
          >
          <router-link
            to="/best-sellers"
            class="font-bold text-red-600 transition cursor-pointer hover:text-gray-500"
            >Best Sellers</router-link
          >

          <div
            class="relative flex items-center h-full"
            @mouseenter="openMegaMenu"
            @mouseleave="closeMegaMenu"
          >
            <router-link
              to="/collections"
              class="transition cursor-pointer hover:text-gray-500"
              :class="{ 'text-gray-500': isMegaMenuOpen }"
              >Collections</router-link
            >
          </div>

          <router-link
            to="/contact"
            class="transition cursor-pointer hover:text-gray-500"
            >Contact</router-link
          >
        </nav>

        <button
          @click="isMobileMenuOpen = true"
          class="flex items-center justify-center text-gray-700 md:hidden focus:outline-none hover:text-black"
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
              stroke-width="1.5"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div
        class="absolute flex justify-center flex-shrink-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 top-1/2"
      >
        <img
          src="../../../assets/solherbrandbook.png"
          alt="Solher Logo"
          class="object-contain w-auto h-8 cursor-pointer pointer-events-auto md:h-12"
          @click="$router.push('/')"
        />
      </div>

      <div
        class="flex items-center justify-end flex-1 space-x-4 text-gray-700 md:space-x-5"
      >
        <button
          @click="openSearch"
          class="flex items-center justify-center transition-colors focus:outline-none hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <div class="relative flex items-center justify-center">
          <button @click="toggleDropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>

          <div
            v-if="isDropdownOpen"
            class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in"
          >
            <div v-if="isAuthenticated" class="text-left">
              <h3
                class="text-sm font-bold tracking-tight text-black uppercase truncate"
              >
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-xs text-gray-500 truncate">
                {{ userData?.email }}
              </p>
            </div>
            <div v-else>
              <h3
                class="mb-4 text-xs font-bold tracking-widest text-left text-black uppercase"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block w-full py-3 mb-4 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black hover:bg-gray-800"
                >Sign In</router-link
              >
            </div>
            <div class="grid grid-cols-2 gap-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                ></router-link
              >
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                ></router-link
              >
            </div>
          </div>
        </div>

        <button
          @click="openCartPage"
          class="relative transition-colors hover:text-black cart-icon-header"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span
            v-if="cartCount > 0"
            :class="[
              isBadgePopping ? 'scale-150 bg-red-600' : 'scale-100 bg-black',
            ]"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] text-white transition-all duration-300 pointer-events-none"
            >{{ cartCount }}</span
          >
        </button>

        <button
          @click="isAuthenticated ? $router.push('/chat-list') : toggleDropdown()"
          class="relative flex items-center justify-center transition-colors focus:outline-none hover:text-black"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
          <transition name="pop">
            <span
              v-if="totalUnreadChats > 0"
              class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] font-bold text-white bg-red-600 shadow-sm pointer-events-none"
            >
              {{ totalUnreadChats > 99 ? '99+' : totalUnreadChats }}
            </span>
          </transition>
        </button>
      </div>
    </div>

    <transition name="mega-menu-fade">
      <div
        v-if="isMegaMenuOpen"
        class="absolute left-0 hidden w-full overflow-hidden bg-white border-t border-gray-100 shadow-xl top-full md:block"
        @mouseenter="keepMegaMenuOpen"
        @mouseleave="closeMegaMenu"
      >
        <div class="mx-auto max-w-7xl flex h-[400px]">
          <div
            class="w-1/4 px-6 py-8 overflow-y-auto border-r border-gray-100 bg-gray-50/50"
          >
            <h3
              class="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6"
            >
              Categories
            </h3>
            <ul class="space-y-4">
              <li>
                <button
                  @click="goToCollection('all')"
                  @mouseenter="selectMegaMenuCategory('all')"
                  :class="
                    activeMegaCategory === 'all'
                      ? 'text-black font-bold'
                      : 'text-gray-500 hover:text-black'
                  "
                  class="w-full text-xs tracking-widest text-left uppercase transition-colors"
                >
                  All Bags
                </button>
              </li>
              <li v-for="cat in categories" :key="cat.id">
                <button
                  @click="goToCollection(cat.category_name)"
                  @mouseenter="selectMegaMenuCategory(cat.id)"
                  :class="
                    activeMegaCategory === cat.id
                      ? 'text-black font-bold'
                      : 'text-gray-500 hover:text-black'
                  "
                  class="w-full text-xs tracking-widest text-left uppercase transition-colors"
                >
                  {{ cat.category_name }}
                </button>
              </li>
            </ul>
          </div>

          <div class="relative w-3/4 px-10 py-8">
            <div class="flex items-center justify-between mb-6">
              <h3
                class="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400"
              >
                {{
                  activeMegaCategory === "all"
                    ? "Featured Picks"
                    : "Category Highlights"
                }}
              </h3>
              <router-link
                to="/collections"
                class="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-500 transition-colors"
              >
                View All Collection
              </router-link>
            </div>

            <div
              v-if="isMegaMenuLoading"
              class="absolute inset-0 z-10 flex items-center justify-center bg-white/80"
            >
              <div
                class="w-8 h-8 border-2 border-gray-200 rounded-full border-t-black animate-spin"
              ></div>
            </div>

            <div class="grid grid-cols-4 gap-x-6 gap-y-8">
              <div
                v-for="product in randomMegaProducts"
                :key="product.id"
                @click="navigateToProduct(product.id)"
                class="cursor-pointer group"
              >
                <div
                  class="relative mb-3 overflow-hidden bg-gray-100 rounded-lg aspect-square"
                >
                  <img
                    :src="product.image || defaultBagIcon"
                    class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    v-if="product.discount_price"
                    class="absolute top-2 left-2 bg-red-600 text-white px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm"
                  >
                    Sale
                  </div>
                </div>
                <h4
                  class="font-bold text-[10px] uppercase tracking-widest text-gray-900 truncate"
                >
                  {{ product.name }}
                </h4>
                <p class="text-[10px] text-gray-500 mt-0.5">
                  {{ formatPrice(product.discount_price ?? product.price) }}
                </p>
              </div>
            </div>

            <div
              v-if="!isMegaMenuLoading && randomMegaProducts.length === 0"
              class="flex flex-col items-center justify-center h-48 font-serif italic text-gray-400"
            >
              No products found in this category.
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="z-[200] fixed inset-0 flex">
        <div
          @click="isMobileMenuOpen = false"
          class="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
        ></div>
        
        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          <div class="flex items-center justify-between mb-10">
            <img src="../../../assets/solherbrandbook.png" alt="Solher Logo" class="object-contain w-auto h-6" />
            <button @click="isMobileMenuOpen = false" class="text-gray-400 transition-colors hover:text-black focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav class="flex flex-col space-y-6">
            <router-link
              to="/"
              @click="isMobileMenuOpen = false"
              class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
            >
              Home
            </router-link>
            <router-link
              to="/best-sellers"
              @click="isMobileMenuOpen = false"
              class="pb-4 text-sm font-black tracking-widest text-red-600 uppercase transition-colors border-b border-gray-100 hover:text-red-800"
            >
              Best Sellers
            </router-link>
            
            <div class="pb-4 border-b border-gray-100">
              <div class="flex items-center justify-between w-full">
                <router-link
                  to="/collections"
                  @click="isMobileMenuOpen = false"
                  class="text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors hover:text-gray-500"
                >
                  Collections
                </router-link>
              </div>
              <ul class="pl-4 mt-4 space-y-4 border-l-2 border-gray-100">
                <li>
                  <button 
                    @click="goToCollection('all'); isMobileMenuOpen = false"
                    class="w-full text-xs font-medium tracking-widest text-left text-gray-500 uppercase transition-colors hover:text-black"
                  >
                    All Bags
                  </button>
                </li>
                <li v-for="cat in categories" :key="cat.id">
                  <button 
                    @click="goToCollection(cat.category_name); isMobileMenuOpen = false"
                    class="w-full text-xs font-medium tracking-widest text-left text-gray-500 uppercase transition-colors hover:text-black"
                  >
                    {{ cat.category_name }}
                  </button>
                </li>
              </ul>
            </div>

            <router-link
              to="/contact"
              @click="isMobileMenuOpen = false"
              class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
            >
              Contact
            </router-link>
          </nav>

          <div class="pt-8 mt-auto">
            <div v-if="isAuthenticated" class="p-4 mb-4 bg-gray-50 rounded-xl">
               <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Logged in as</p>
               <p class="text-sm font-bold text-gray-900 truncate">{{ userData?.first_name }} {{ userData?.last_name }}</p>
               <div class="flex gap-4 mt-3">
                 <router-link to="/orderpage" @click="isMobileMenuOpen = false" class="text-xs font-bold text-blue-600 hover:underline">Orders</router-link>
                 <router-link to="/profilepage" @click="isMobileMenuOpen = false" class="text-xs font-bold text-blue-600 hover:underline">Profile</router-link>
               </div>
            </div>
            <div v-else class="mb-6">
              <router-link 
                to="/login" 
                @click="isMobileMenuOpen = false"
                class="block w-full py-3 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black rounded-lg hover:bg-gray-800"
              >
                Sign In / Register
              </router-link>
            </div>
            
            <p class="text-[9px] text-center text-gray-400 uppercase tracking-widest">
              © {{ new Date().getFullYear() }} Solher Official
            </p>
          </div>
        </div>
      </div>
    </transition>
  </header>
  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import SearchModal from "../../User/Layout/SearchModal.vue";

import defaultBagIcon from "../../../assets/products/bag_icon.jpg";
import { useCart } from "../../../composables/useCart";
import { BASE_URL } from "../../../config/api";
import { useProductStore } from "../../../composables/useProductStore";

const route = useRoute();
const router = useRouter();

const isSearchOpen = ref(false);
const openSearch = () => (isSearchOpen.value = true);
const closeSearch = () => (isSearchOpen.value = false);

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const isMobileMenuOpen = ref(false);

const { cartCount, fetchCarts, handleOptimisticAdd } = useCart();
const { state: productState, fetchCollectionsData } = useProductStore();
const isBadgePopping = ref(false);

// State untuk menyimpan jumlah chat yang belum dibaca
const totalUnreadChats = ref(0);

const fetchUnreadChats = async () => {
  if (!isAuthenticated.value) return;
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    totalUnreadChats.value = res.data.reduce((sum, admin) => sum + (admin.unread_count || 0), 0);
  } catch (error) {
    console.error("Gagal mengambil badge chat:", error);
  }
};

// // ====================================================================================
// // [PERBAIKAN] Mencegah Multiple Listeners dengan variabel penanda (flag)
// // ====================================================================================
// let isEchoConnected = false;

// const setupRealTimeListeners = () => {
//   if (isAuthenticated.value && userData.value && window.Echo && !isEchoConnected) {
//     window.Echo.private(`chat.${userData.value.id}`)
//       .listen('.message.sent', (e) => {
//         // 1. Tambah angka di badge header
//         totalUnreadChats.value++;
        
//         // 2. Pancarkan sinyal lokal ke halaman lain (misal: ChatListPage)
//         window.dispatchEvent(new CustomEvent('new-chat-message', { detail: e.message }));
//       });
      
//     isEchoConnected = true; // Tandai bahwa soket sudah menyala
//   }
// };

// // ====================================================================================
// // [PERBAIKAN] Mencegah Multiple Listeners dengan variabel penanda (flag)
// // ====================================================================================
// const setupRealTimeListeners = () => {
//   if (isAuthenticated.value && userData.value && window.Echo && !isEchoConnected) {
//     window.Echo.private(`chat.${userData.value.id}`)
//       .listen('.message.sent', (e) => {
//         // 1. Tambah angka di badge header
//         totalUnreadChats.value++;
        
//         // 2. Pancarkan sinyal lokal ke halaman lain (misal: ChatListPage)
//         window.dispatchEvent(new CustomEvent('new-chat-message', { detail: e.message }));
//       });
      
//     isEchoConnected = true; // Tandai bahwa soket sudah menyala
//   }
// };

// ====================================================================================
// [PERBAIKAN] Mencegah Multiple Listeners dengan variabel penanda (flag)
// ====================================================================================
// ⚠️ BARIS INI WAJIB ADA! Jangan dihapus.
let isEchoConnected = false; 

const setupRealTimeListeners = () => {
  if (isAuthenticated.value && userData.value && window.Echo && !isEchoConnected) {
    window.Echo.private(`chat.${userData.value.id}`)
      .listen('.message.sent', (e) => {
        // 1. Tambah angka di badge header
        totalUnreadChats.value++;
        
        // 2. Pancarkan sinyal lokal ke halaman lain (misal: ChatListPage)
        window.dispatchEvent(new CustomEvent('new-chat-message', { detail: e.message }));
      });
      
    isEchoConnected = true; // Tandai bahwa soket sudah menyala
  }
};

// =======================================================
// STATE & LOGIKA ANNOUNCEMENT BAR
// =======================================================
const isAtTop = ref(true);
const currentAnnouncement = ref(0);
let announcementTimer = null;

const announcements = [
  "An Exclusive Welcome Gift: Rp 250K OFF your first order →",
  "A Little Extra, On Us — Complimentary Shipping Across Indonesia (Min. Rp 1.000.000) →",
];

const nextAnnouncement = () => {
  currentAnnouncement.value = (currentAnnouncement.value + 1) % announcements.length;
  resetAnnouncementTimer();
};

const prevAnnouncement = () => {
  currentAnnouncement.value = (currentAnnouncement.value - 1 + announcements.length) % announcements.length;
  resetAnnouncementTimer();
};

const startAnnouncementTimer = () => {
  announcementTimer = setInterval(() => {
    currentAnnouncement.value = (currentAnnouncement.value + 1) % announcements.length;
  }, 3000);
};

const resetAnnouncementTimer = () => {
  clearInterval(announcementTimer);
  startAnnouncementTimer();
};

const handleScroll = () => {
  isAtTop.value = window.scrollY <= 0;
};
// =======================================================

const isMegaMenuOpen = ref(false);
const megaMenuTimer = ref(null);
const activeMegaCategory = ref("all");
const categories = ref([]);
const isMegaMenuLoading = ref(false);
const randomMegaProducts = ref([]);

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const generateRandomProducts = () => {
  if (!productState.collectionsProducts || productState.collectionsProducts.length === 0) {
    isMegaMenuLoading.value = false;
    randomMegaProducts.value = [];
    return;
  }

  isMegaMenuLoading.value = true;

  setTimeout(() => {
    let filtered = [];
    if (activeMegaCategory.value === "all") {
      filtered = [...productState.collectionsProducts];
    } else {
      filtered = productState.collectionsProducts.filter(p => p.category_id == activeMegaCategory.value);
    }

    randomMegaProducts.value = shuffleArray(filtered).slice(0, 4);
    isMegaMenuLoading.value = false;
  }, 100);
};

const fetchCategoriesForMegaMenu = async () => {
  if (categories.value.length > 0) return;
  try {
    const res = await axios.get(`${BASE_URL}/guest/categories`);
    const data = res.data.data || res.data;
    categories.value = data.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Failed to load categories for Mega Menu", error);
  }
};

const openMegaMenu = async () => {
  clearTimeout(megaMenuTimer.value);
  isMegaMenuOpen.value = true;
  isDropdownOpen.value = false;

  isMegaMenuLoading.value = true;
  fetchCategoriesForMegaMenu();

  if (!productState.isCollectionsLoaded || !productState.collectionsProducts || productState.collectionsProducts.length === 0) {
    try { await fetchCollectionsData(); } catch (e) {}
  }

  generateRandomProducts();
};

const keepMegaMenuOpen = () => { clearTimeout(megaMenuTimer.value); };
const closeMegaMenu = () => { megaMenuTimer.value = setTimeout(() => { isMegaMenuOpen.value = false; }, 150); };

const goToCollection = (categoryName) => {
  closeMegaMenu(); 
  if (categoryName === 'all') router.push('/collections');
  else router.push({ path: '/collections', query: { category: categoryName } });
};

const selectMegaMenuCategory = (catId) => {
  if (activeMegaCategory.value !== catId) {
    activeMegaCategory.value = catId;
    generateRandomProducts();
  }
};

const navigateToProduct = (id) => {
  closeMegaMenu();
  router.push(`/product/${id}`);
};

const openCartPage = () => {
  if (!isAuthenticated.value) {
    Swal.fire({ icon: "info", title: "Sign In Required", text: "Please login to see your shopping bag.", confirmButtonColor: "#000" });
    return;
  }
  router.push("/cart");
};

// const checkAuth = () => {
//   const token = localStorage.getItem("token");
//   const user = localStorage.getItem("user");
//   if (token && user) {
//     isAuthenticated.value = true;
//     userData.value = JSON.parse(user);
    
//     // Tarik notifikasi awal dari API
//     fetchUnreadChats();
//     // Nyalakan soket untuk mendengarkan perubahan secara instan
//     setupRealTimeListeners();
//   } else {
//     isAuthenticated.value = false;
//     userData.value = null;
//     totalUnreadChats.value = 0;
//   }
// };

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  if (token && user) {
    const wasNotAuthenticated = !isAuthenticated.value;
    isAuthenticated.value = true;
    userData.value = JSON.parse(user);
    
    if (wasNotAuthenticated) {
        fetchUnreadChats();
        setupRealTimeListeners();
    }
  } else {
    // Logika Pembersihan saat Logout
    if (typeof isEchoConnected !== 'undefined' && isEchoConnected && userData.value && window.Echo) {
        window.Echo.leave(`chat.${userData.value.id}`);
        isEchoConnected = false;
    }
    isAuthenticated.value = false;
    userData.value = null;
    totalUnreadChats.value = 0;
  }
};

const toggleDropdown = () => {
  checkAuth();
  isDropdownOpen.value = !isDropdownOpen.value;
  isMegaMenuOpen.value = false;
};

const onAddToCartEvent = (e) => {
  handleOptimisticAdd(e.detail, () => {
    isBadgePopping.value = true;
    setTimeout(() => (isBadgePopping.value = false), 300);
  });
};

onMounted(() => {
  checkAuth();
  if (isAuthenticated.value) fetchCarts();

  fetchCategoriesForMegaMenu();

  window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });
  window.addEventListener("refresh-cart", fetchCarts);
  window.addEventListener("refresh-chat-badge", fetchUnreadChats);
  window.addEventListener("scroll", handleScroll);
  startAnnouncementTimer();
});

onUnmounted(() => {
  window.removeEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("refresh-chat-badge", fetchUnreadChats); 
  clearInterval(announcementTimer);

  // [BARU] Bersihkan memori dan soket saat navigasi pindah
  if (userData.value && window.Echo) {
    window.Echo.leave(`chat.${userData.value.id}`);
  }
});

watch(() => route.path, () => {
  isDropdownOpen.value = false;
  isMobileMenuOpen.value = false;
  checkAuth();
});
</script>

<style scoped>
/* Transisi Pop untuk badge */
.pop-enter-active, .pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from, .pop-leave-to {
  transform: scale(0);
}

.animate-fade-in { animation: fadeIn 0.2s ease-out; }
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from { opacity: 0; transform: translateY(5px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-5px); }

.slide-fade-enter-active, .slide-fade-leave-active { transition: all 0.3s ease; }
.slide-fade-enter-from, .slide-fade-leave-to { opacity: 0; transform: translateX(-20px); }

.mega-menu-fade-enter-active, .mega-menu-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease; transform-origin: top;
}
.mega-menu-fade-enter-from, .mega-menu-fade-leave-to {
  opacity: 0; transform: translateY(-5px) scaleY(0.98);
}
</style> -->

<template>
  <div
    class="fixed top-0 left-0 w-full h-[40px] bg-[#111] text-white z-[60] flex items-center justify-center"
  >
    <button
      @click="prevAnnouncement"
      class="absolute p-2 text-gray-400 transition left-4 hover:text-white focus:outline-none"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>

    <transition name="fade-slide" mode="out-in">
      <p
        :key="currentAnnouncement"
        @click="$router.push('/collections')"
        class="text-[10px] md:text-xs font-serif tracking-widest text-center px-12 cursor-pointer hover:text-gray-300 transition-colors truncate w-full max-w-3xl"
      >
        {{ announcements[currentAnnouncement] }}
      </p>
    </transition>

    <button
      @click="nextAnnouncement"
      class="absolute p-2 text-gray-400 transition right-4 hover:text-white focus:outline-none"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="1.5"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  </div>

  <header
    class="fixed top-[40px] left-0 z-50 w-full px-6 py-4 bg-white border-b border-gray-200 shadow-sm"
  >
    <div class="relative flex items-center justify-between h-8 mx-auto max-w-7xl md:h-12">
      <div class="flex items-center justify-start flex-1">
        <nav
          class="items-center hidden h-full space-x-6 text-xs font-medium tracking-widest uppercase md:flex"
        >
          <router-link to="/" class="transition cursor-pointer hover:text-gray-500"
            >Home</router-link
          >
          <router-link
            to="/best-sellers"
            class="font-bold text-red-600 transition cursor-pointer hover:text-gray-500"
            >Best Sellers</router-link
          >

          <div
            class="relative flex items-center h-full"
            @mouseenter="openMegaMenu"
            @mouseleave="closeMegaMenu"
          >
            <router-link
              to="/collections"
              class="transition cursor-pointer hover:text-gray-500"
              :class="{ 'text-gray-500': isMegaMenuOpen }"
              >Collections</router-link
            >
          </div>

          <router-link to="/contact" class="transition cursor-pointer hover:text-gray-500"
            >Contact</router-link
          >
        </nav>

        <button
          @click="isMobileMenuOpen = true"
          class="flex items-center justify-center text-gray-700 md:hidden focus:outline-none hover:text-black"
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
              stroke-width="1.5"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>

      <div
        class="absolute flex justify-center flex-shrink-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none left-1/2 top-1/2"
      >
        <img
          src="../../../assets/solherbrandbook.png"
          alt="Solher Logo"
          class="object-contain w-auto h-8 cursor-pointer pointer-events-auto md:h-12"
          @click="$router.push('/')"
        />
      </div>

      <div
        class="flex items-center justify-end flex-1 space-x-4 text-gray-700 md:space-x-5"
      >
        <button
          @click="openSearch"
          class="flex items-center justify-center transition-colors focus:outline-none hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </button>

        <div class="relative flex items-center justify-center">
          <button @click="toggleDropdown">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
          </button>

          <div
            v-if="isDropdownOpen"
            class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in"
          >
            <div v-if="isAuthenticated" class="text-left">
              <h3 class="text-sm font-bold tracking-tight text-black uppercase truncate">
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-xs text-gray-500 truncate">{{ userData?.email }}</p>
            </div>
            <div v-else>
              <h3
                class="mb-4 text-xs font-bold tracking-widest text-left text-black uppercase"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block w-full py-3 mb-4 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black hover:bg-gray-800"
                >Sign In</router-link
              >
            </div>
            <div class="grid grid-cols-2 gap-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                ></router-link
              >
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                ></router-link
              >
            </div>
          </div>
        </div>

        <button
          @click="openCartPage"
          class="relative transition-colors hover:text-black cart-icon-header"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          <span
            v-if="cartCount > 0"
            :class="[isBadgePopping ? 'scale-150 bg-red-600' : 'scale-100 bg-black']"
            class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] text-white transition-all duration-300 pointer-events-none"
            >{{ cartCount }}</span
          >
        </button>

        <button
          @click="isAuthenticated ? $router.push('/chat-list') : toggleDropdown()"
          class="relative flex items-center justify-center transition-colors focus:outline-none hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
            />
          </svg>
          <transition name="pop">
            <span
              v-if="totalUnreadChats > 0"
              class="-top-2 -right-2 absolute flex justify-center items-center rounded-full w-4 h-4 text-[10px] font-bold text-white bg-red-600 shadow-sm pointer-events-none"
            >
              {{ totalUnreadChats > 99 ? "99+" : totalUnreadChats }}
            </span>
          </transition>
        </button>
      </div>
    </div>

    <transition name="mega-menu-fade">
      <div
        v-if="isMegaMenuOpen"
        class="absolute left-0 hidden w-full overflow-hidden bg-white border-t border-gray-100 shadow-xl top-full md:block"
        @mouseenter="keepMegaMenuOpen"
        @mouseleave="closeMegaMenu"
      >
        <div class="mx-auto max-w-7xl flex h-[400px]">
          <div
            class="w-1/4 px-6 py-8 overflow-y-auto border-r border-gray-100 bg-gray-50/50"
          >
            <h3
              class="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-6"
            >
              Categories
            </h3>
            <ul class="space-y-4">
              <li>
                <button
                  @click="goToCollection('all')"
                  @mouseenter="selectMegaMenuCategory('all')"
                  :class="
                    activeMegaCategory === 'all'
                      ? 'text-black font-bold'
                      : 'text-gray-500 hover:text-black'
                  "
                  class="w-full text-xs tracking-widest text-left uppercase transition-colors"
                >
                  All Bags
                </button>
              </li>
              <li v-for="cat in categories" :key="cat.id">
                <button
                  @click="goToCollection(cat.category_name)"
                  @mouseenter="selectMegaMenuCategory(cat.id)"
                  :class="
                    activeMegaCategory === cat.id
                      ? 'text-black font-bold'
                      : 'text-gray-500 hover:text-black'
                  "
                  class="w-full text-xs tracking-widest text-left uppercase transition-colors"
                >
                  {{ cat.category_name }}
                </button>
              </li>
            </ul>
          </div>

          <div class="relative w-3/4 px-10 py-8">
            <div class="flex items-center justify-between mb-6">
              <h3 class="font-bold text-[10px] uppercase tracking-[0.2em] text-gray-400">
                {{
                  activeMegaCategory === "all" ? "Featured Picks" : "Category Highlights"
                }}
              </h3>
              <router-link
                to="/collections"
                class="text-[10px] font-bold uppercase tracking-widest border-b border-black pb-0.5 hover:text-gray-500 transition-colors"
                >View All Collection</router-link
              >
            </div>

            <div
              v-if="isMegaMenuLoading"
              class="absolute inset-0 z-10 flex items-center justify-center bg-white/80"
            >
              <div
                class="w-8 h-8 border-2 border-gray-200 rounded-full border-t-black animate-spin"
              ></div>
            </div>

            <div class="grid grid-cols-4 gap-x-6 gap-y-8">
              <div
                v-for="product in randomMegaProducts"
                :key="product.id"
                @click="navigateToProduct(product.id)"
                class="cursor-pointer group"
              >
                <div
                  class="relative mb-3 overflow-hidden bg-gray-100 rounded-lg aspect-square"
                >
                  <img
                    :src="product.image || defaultBagIcon"
                    class="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    v-if="product.discount_price"
                    class="absolute top-2 left-2 bg-red-600 text-white px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest rounded-sm"
                  >
                    Sale
                  </div>
                </div>
                <h4
                  class="font-bold text-[10px] uppercase tracking-widest text-gray-900 truncate"
                >
                  {{ product.name }}
                </h4>
                <p class="text-[10px] text-gray-500 mt-0.5">
                  {{ formatPrice(product.discount_price ?? product.price) }}
                </p>
              </div>
            </div>

            <div
              v-if="!isMegaMenuLoading && randomMegaProducts.length === 0"
              class="flex flex-col items-center justify-center h-48 font-serif italic text-gray-400"
            >
              No products found in this category.
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-fade">
      <div v-if="isMobileMenuOpen" class="z-[200] fixed inset-0 flex">
        <div
          @click="isMobileMenuOpen = false"
          class="absolute inset-0 transition-opacity bg-black/50 backdrop-blur-sm"
        ></div>

        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          <div class="flex items-center justify-between mb-10">
            <img
              src="../../../assets/solherbrandbook.png"
              alt="Solher Logo"
              class="object-contain w-auto h-6"
            />
            <button
              @click="isMobileMenuOpen = false"
              class="text-gray-400 transition-colors hover:text-black focus:outline-none"
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
                  stroke-width="1.5"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <nav class="flex flex-col space-y-6">
            <router-link
              to="/"
              @click="isMobileMenuOpen = false"
              class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
              >Home</router-link
            >
            <router-link
              to="/best-sellers"
              @click="isMobileMenuOpen = false"
              class="pb-4 text-sm font-black tracking-widest text-red-600 uppercase transition-colors border-b border-gray-100 hover:text-red-800"
              >Best Sellers</router-link
            >

            <div class="pb-4 border-b border-gray-100">
              <div class="flex items-center justify-between w-full">
                <router-link
                  to="/collections"
                  @click="isMobileMenuOpen = false"
                  class="text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors hover:text-gray-500"
                  >Collections</router-link
                >
              </div>
              <ul class="pl-4 mt-4 space-y-4 border-l-2 border-gray-100">
                <li>
                  <button
                    @click="
                      goToCollection('all');
                      isMobileMenuOpen = false;
                    "
                    class="w-full text-xs font-medium tracking-widest text-left text-gray-500 uppercase transition-colors hover:text-black"
                  >
                    All Bags
                  </button>
                </li>
                <li v-for="cat in categories" :key="cat.id">
                  <button
                    @click="
                      goToCollection(cat.category_name);
                      isMobileMenuOpen = false;
                    "
                    class="w-full text-xs font-medium tracking-widest text-left text-gray-500 uppercase transition-colors hover:text-black"
                  >
                    {{ cat.category_name }}
                  </button>
                </li>
              </ul>
            </div>

            <router-link
              to="/contact"
              @click="isMobileMenuOpen = false"
              class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
              >Contact</router-link
            >
          </nav>

          <div class="pt-8 mt-auto">
            <div v-if="isAuthenticated" class="p-4 mb-4 bg-gray-50 rounded-xl">
              <p
                class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
              >
                Logged in as
              </p>
              <p class="text-sm font-bold text-gray-900 truncate">
                {{ userData?.first_name }} {{ userData?.last_name }}
              </p>
              <div class="flex gap-4 mt-3">
                <router-link
                  to="/orderpage"
                  @click="isMobileMenuOpen = false"
                  class="text-xs font-bold text-blue-600 hover:underline"
                  >Orders</router-link
                >
                <router-link
                  to="/profilepage"
                  @click="isMobileMenuOpen = false"
                  class="text-xs font-bold text-blue-600 hover:underline"
                  >Profile</router-link
                >
              </div>
            </div>
            <div v-else class="mb-6">
              <router-link
                to="/login"
                @click="isMobileMenuOpen = false"
                class="block w-full py-3 text-xs font-bold tracking-widest text-center text-white uppercase transition bg-black rounded-lg hover:bg-gray-800"
                >Sign In / Register</router-link
              >
            </div>

            <p class="text-[9px] text-center text-gray-400 uppercase tracking-widest">
              © {{ new Date().getFullYear() }} Solher Official
            </p>
          </div>
        </div>
      </div>
    </transition>
  </header>
  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import SearchModal from "../../User/Layout/SearchModal.vue";

import defaultBagIcon from "../../../assets/products/bag_icon.jpg";
import { useCart } from "../../../composables/useCart";
import { BASE_URL } from "../../../config/api";
import { useProductStore } from "../../../composables/useProductStore";

const route = useRoute();
const router = useRouter();

const isSearchOpen = ref(false);
const openSearch = () => (isSearchOpen.value = true);
const closeSearch = () => (isSearchOpen.value = false);

const isDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const isMobileMenuOpen = ref(false);

const { cartCount, fetchCarts, handleOptimisticAdd } = useCart();
const { state: productState, fetchCollectionsData } = useProductStore();
const isBadgePopping = ref(false);

const totalUnreadChats = ref(0);

const fetchUnreadChats = async () => {
  if (!isAuthenticated.value) return;
  try {
    const res = await axios.get(`${BASE_URL}/chat/admins`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    totalUnreadChats.value = res.data.reduce(
      (sum, admin) => sum + (admin.unread_count || 0),
      0
    );
  } catch (error) {
    console.error("Gagal mengambil badge chat:", error);
  }
};

let isEchoConnected = false;

const setupRealTimeListeners = () => {
  if (isAuthenticated.value && userData.value && window.Echo && !isEchoConnected) {
    window.Echo.private(`chat.${userData.value.id}`).listen(".message.sent", (e) => {
      totalUnreadChats.value++;
      window.dispatchEvent(new CustomEvent("new-chat-message", { detail: e.message }));
    });

    isEchoConnected = true;
  }
};

// =======================================================
// STATE & LOGIKA ANNOUNCEMENT BAR
// =======================================================
// [PERBAIKAN] Hapus fungsi scroll, kita paksa selalu True agar menempel.
const currentAnnouncement = ref(0);
let announcementTimer = null;

const announcements = [
  "An Exclusive Welcome Gift: Rp 250K OFF your first order →",
  "A Little Extra, On Us — Complimentary Shipping Across Indonesia (Min. Rp 1.000.000) →",
];

const nextAnnouncement = () => {
  currentAnnouncement.value = (currentAnnouncement.value + 1) % announcements.length;
  resetAnnouncementTimer();
};

const prevAnnouncement = () => {
  currentAnnouncement.value =
    (currentAnnouncement.value - 1 + announcements.length) % announcements.length;
  resetAnnouncementTimer();
};

const startAnnouncementTimer = () => {
  announcementTimer = setInterval(() => {
    currentAnnouncement.value = (currentAnnouncement.value + 1) % announcements.length;
  }, 3000);
};

const resetAnnouncementTimer = () => {
  clearInterval(announcementTimer);
  startAnnouncementTimer();
};
// =======================================================

const isMegaMenuOpen = ref(false);
const megaMenuTimer = ref(null);
const activeMegaCategory = ref("all");
const categories = ref([]);
const isMegaMenuLoading = ref(false);
const randomMegaProducts = ref([]);

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const shuffleArray = (array) => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

const generateRandomProducts = () => {
  if (
    !productState.collectionsProducts ||
    productState.collectionsProducts.length === 0
  ) {
    isMegaMenuLoading.value = false;
    randomMegaProducts.value = [];
    return;
  }

  isMegaMenuLoading.value = true;

  setTimeout(() => {
    let filtered = [];
    if (activeMegaCategory.value === "all") {
      filtered = [...productState.collectionsProducts];
    } else {
      filtered = productState.collectionsProducts.filter(
        (p) => p.category_id == activeMegaCategory.value
      );
    }

    randomMegaProducts.value = shuffleArray(filtered).slice(0, 4);
    isMegaMenuLoading.value = false;
  }, 100);
};

const fetchCategoriesForMegaMenu = async () => {
  if (categories.value.length > 0) return;
  try {
    const res = await axios.get(`${BASE_URL}/guest/categories`);
    const data = res.data.data || res.data;
    categories.value = data.sort((a, b) => a.id - b.id);
  } catch (error) {}
};

const openMegaMenu = async () => {
  clearTimeout(megaMenuTimer.value);
  isMegaMenuOpen.value = true;
  isDropdownOpen.value = false;

  isMegaMenuLoading.value = true;
  fetchCategoriesForMegaMenu();

  if (
    !productState.isCollectionsLoaded ||
    !productState.collectionsProducts ||
    productState.collectionsProducts.length === 0
  ) {
    try {
      await fetchCollectionsData();
    } catch (e) {}
  }

  generateRandomProducts();
};

const keepMegaMenuOpen = () => {
  clearTimeout(megaMenuTimer.value);
};
const closeMegaMenu = () => {
  megaMenuTimer.value = setTimeout(() => {
    isMegaMenuOpen.value = false;
  }, 150);
};

const goToCollection = (categoryName) => {
  closeMegaMenu();
  if (categoryName === "all") router.push("/collections");
  else router.push({ path: "/collections", query: { category: categoryName } });
};

const selectMegaMenuCategory = (catId) => {
  if (activeMegaCategory.value !== catId) {
    activeMegaCategory.value = catId;
    generateRandomProducts();
  }
};

const navigateToProduct = (id) => {
  closeMegaMenu();
  router.push(`/product/${id}`);
};

const openCartPage = () => {
  if (!isAuthenticated.value) {
    Swal.fire({
      icon: "info",
      title: "Sign In Required",
      text: "Please login to see your shopping bag.",
      confirmButtonColor: "#000",
    });
    return;
  }
  router.push("/cart");
};

const checkAuth = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    const wasNotAuthenticated = !isAuthenticated.value;
    isAuthenticated.value = true;
    userData.value = JSON.parse(user);

    if (wasNotAuthenticated) {
      fetchUnreadChats();
      setupRealTimeListeners();
    }
  } else {
    // Logika Pembersihan saat Logout
    if (
      typeof isEchoConnected !== "undefined" &&
      isEchoConnected &&
      userData.value &&
      window.Echo
    ) {
      window.Echo.leave(`chat.${userData.value.id}`);
      isEchoConnected = false;
    }
    isAuthenticated.value = false;
    userData.value = null;
    totalUnreadChats.value = 0;
  }
};

const toggleDropdown = () => {
  checkAuth();
  isDropdownOpen.value = !isDropdownOpen.value;
  isMegaMenuOpen.value = false;
};

const onAddToCartEvent = (e) => {
  handleOptimisticAdd(e.detail, () => {
    isBadgePopping.value = true;
    setTimeout(() => (isBadgePopping.value = false), 300);
  });
};

onMounted(() => {
  checkAuth();
  if (isAuthenticated.value) fetchCarts();

  fetchCategoriesForMegaMenu();

  window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });
  window.addEventListener("refresh-cart", fetchCarts);
  window.addEventListener("refresh-chat-badge", fetchUnreadChats);
  startAnnouncementTimer();
});

onUnmounted(() => {
  window.removeEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.removeEventListener("refresh-chat-badge", fetchUnreadChats);
  clearInterval(announcementTimer);

  if (userData.value && window.Echo) {
    window.Echo.leave(`chat.${userData.value.id}`);
  }
});

watch(
  () => route.path,
  () => {
    isDropdownOpen.value = false;
    isMobileMenuOpen.value = false;
    checkAuth();
  }
);
</script>

<style scoped>
.pop-enter-active,
.pop-leave-active {
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.pop-enter-from,
.pop-leave-to {
  transform: scale(0);
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(5px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.mega-menu-fade-enter-active,
.mega-menu-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top;
}
.mega-menu-fade-enter-from,
.mega-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px) scaleY(0.98);
}
</style>
