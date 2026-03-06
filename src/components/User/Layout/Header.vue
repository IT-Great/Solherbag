<!-- <template>
  <header
    class="top-0 left-0 z-50 fixed bg-white px-6 py-4 border-gray-200 border-b w-full"
  >
    <div class="flex justify-between items-center mx-auto max-w-7xl">
      <div class="flex items-center">
        <nav
          class="hidden md:flex space-x-6 font-medium text-xs uppercase tracking-widest"
        >
          <router-link
            to="/"
            class="hover:text-gray-500 transition cursor-pointer"
            >Home</router-link
          >
          <router-link
            to="/catalog"
            class="hover:text-gray-500 transition cursor-pointer"
            >Catalog</router-link
          >
          <router-link
            to="/contact"
            class="hover:text-gray-500 transition cursor-pointer"
            >Contact</router-link
          >
        </nav>

        <button
          @click="isMobileMenuOpen = true"
          class="md:hidden flex justify-center items-center focus:outline-none text-gray-700 hover:text-black"
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
          class="w-auto h-8 md:h-12 object-contain"
        />
      </div>

      <div class="flex items-center space-x-4 md:space-x-5 text-gray-700">
        <button
          @click="openSearch"
          class="flex justify-center items-center focus:outline-none hover:text-black transition-colors"
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
        <div class="relative flex justify-center items-center">
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
                class="font-bold text-black text-sm truncate uppercase tracking-tight"
              >
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-gray-500 text-xs truncate">
                {{ userData?.email }}
              </p>
            </div>
            <div v-else>
              <h3
                class="mb-4 font-bold text-black text-xs text-left uppercase tracking-widest"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block bg-black hover:bg-gray-800 mb-4 py-3 w-full font-bold text-white text-xs text-center uppercase tracking-widest transition"
                >Sign In</router-link
              >
            </div>
            <div class="gap-2 grid grid-cols-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                ></router-link
              >
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                ></router-link
              >
            </div>
          </div>
        </div>

        <button
          @click="openCart"
          class="relative hover:text-black transition-colors cart-icon-header"
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
          class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        ></div>

        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          <div
            class="flex justify-between items-center mb-10 pb-6 border-gray-100 border-b"
          >
            <img
              src="../../../assets/solherbrandbook.png"
              alt="Logo"
              class="w-auto h-6 object-contain"
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
              class="pb-4 border-gray-50 border-b hover:text-gray-500 transition-colors"
              @click="isMobileMenuOpen = false"
              >Home</router-link
            >
            <router-link
              to="/catalog"
              class="pb-4 border-gray-50 border-b hover:text-gray-500 transition-colors"
              @click="isMobileMenuOpen = false"
              >Catalog</router-link
            >
            <router-link
              to="/contact"
              class="pb-4 border-gray-50 border-b hover:text-gray-500 transition-colors"
              @click="isMobileMenuOpen = false"
              >Contact</router-link
            >
          </nav>

          <div
            class="mt-auto pt-10 text-gray-400 text-xs uppercase tracking-widest"
          >
            <p>© 2026 Solher Bag</p>
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
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div
        class="relative flex flex-col bg-white shadow-2xl rounded-3xl w-full max-w-xl max-h-[85vh] overflow-hidden animate-modal-in"
      >
        <div class="flex justify-between items-center p-8 border-b">
          <h2 class="font-serif text-3xl">
            Your Bag
            <span class="ml-2 font-sans text-gray-400 text-lg"
              >({{ cartItems.length }} items)</span
            >
          </h2>
          <button
            @click="isCartOpen = false"
            class="focus:outline-none text-3xl text-gray-400 hover:text-black transition-colors"
          >
            &times;
          </button>
        </div>

        <div class="flex-grow space-y-6 p-8 overflow-y-auto custom-scrollbar">
          <div
            v-if="cartItems.length === 0"
            class="py-20 font-serif text-gray-400 text-xl text-center italic"
          >
            Your bag is currently empty.
          </div>

          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex sm:flex-row flex-col gap-6 pb-6 last:border-0 border-b"
          >
            <img
              :src="item.product.image"
              class="bg-gray-100 shadow-sm rounded-2xl w-full sm:w-32 h-32 object-cover"
            />

            <div class="flex flex-col flex-grow justify-between">
              <div>
                <div
                  class="flex justify-between items-start font-bold text-base uppercase"
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
                <p class="mt-1 text-gray-400 text-xs italic tracking-widest">
                  {{
                    formatPrice(
                      item.product.discount_price ?? item.product.price,
                    )
                  }}
                  / piece
                </p>
              </div>

              <div class="flex justify-between items-center mt-6">
                <div
                  class="flex items-center bg-gray-50 border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    @click="handleQtyChange(item, item.quantity - 1)"
                    class="hover:bg-gray-200 px-4 py-2 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    v-model.number="item.quantity"
                    @input="handleQtyInput(item)"
                    class="bg-transparent border-none focus:ring-0 w-12 font-bold text-sm text-center"
                  />
                  <button
                    @click="handleQtyChange(item, item.quantity + 1)"
                    class="hover:bg-gray-200 px-4 py-2 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  @click="handleOptimisticDelete(item.id)"
                  class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-xs uppercase tracking-tighter transition-colors"
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

        <div class="bg-gray-50 p-8 border-t">
          <div class="flex justify-between items-end mb-6">
            <span
              class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
              >Estimated Total</span
            >
            <div class="text-right">
              <span class="block font-bold text-black text-2xl"
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
    class="top-0 left-0 z-50 fixed bg-white px-6 py-4 border-gray-200 border-b w-full"
  >
    <div class="flex justify-between items-center mx-auto max-w-7xl">
      <div class="flex items-center">
        <nav
          class="hidden md:flex space-x-6 font-medium text-xs uppercase tracking-widest"
        >
          <router-link
            to="/"
            class="hover:text-gray-500 transition cursor-pointer"
            >Home</router-link
          >
          <router-link
            to="/catalog"
            class="hover:text-gray-500 transition cursor-pointer"
            >Catalog</router-link
          >
          <router-link
            to="/contact"
            class="hover:text-gray-500 transition cursor-pointer"
            >Contact</router-link
          >
        </nav>

        <button
          @click="isMobileMenuOpen = true"
          class="md:hidden flex justify-center items-center focus:outline-none text-gray-700 hover:text-black"
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
          class="w-auto h-8 md:h-12 object-contain"
        />
      </div>

      <div class="flex items-center space-x-4 md:space-x-5 text-gray-700">
        <button
          @click="openSearch"
          class="flex justify-center items-center focus:outline-none hover:text-black transition-colors"
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
        <div class="relative flex justify-center items-center">
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
                class="font-bold text-black text-sm truncate uppercase tracking-tight"
              >
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-gray-500 text-xs truncate">
                {{ userData?.email }}
              </p>
            </div>
            <div v-else>
              <h3
                class="mb-4 font-bold text-black text-xs text-left uppercase tracking-widest"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block bg-black hover:bg-gray-800 mb-4 py-3 w-full font-bold text-white text-xs text-center uppercase tracking-widest transition"
                >Sign In</router-link
              >
            </div>
            <div class="gap-2 grid grid-cols-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                ></router-link
              >
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                ></router-link
              >
            </div>
          </div>
        </div>

        <button
          @click="openCart"
          class="relative hover:text-black transition-colors cart-icon-header"
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
          class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        ></div>

        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          <div
            class="flex justify-between items-center mb-10 pb-6 border-gray-100 border-b"
          >
            <img
              src="../../../assets/solherbrandbook.png"
              alt="Logo"
              class="w-auto h-6 object-contain"
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
              class="pb-4 border-gray-50 border-b hover:text-gray-500 transition-colors"
              @click="isMobileMenuOpen = false"
              >Home</router-link
            >
            <router-link
              to="/catalog"
              class="pb-4 border-gray-50 border-b hover:text-gray-500 transition-colors"
              @click="isMobileMenuOpen = false"
              >Catalog</router-link
            >
            <router-link
              to="/contact"
              class="pb-4 border-gray-50 border-b hover:text-gray-500 transition-colors"
              @click="isMobileMenuOpen = false"
              >Contact</router-link
            >
          </nav>

          <div
            class="mt-auto pt-10 text-gray-400 text-xs uppercase tracking-widest"
          >
            <p>© 2026 Solher Bag</p>
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
        class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div
        class="relative flex flex-col bg-white shadow-2xl rounded-3xl w-full max-w-xl max-h-[85vh] overflow-hidden animate-modal-in"
      >
        <div class="flex justify-between items-center p-8 border-b">
          <h2 class="font-serif text-3xl">
            Your Bag
            <span class="ml-2 font-sans text-gray-400 text-lg"
              >({{ cartItems.length }} items)</span
            >
          </h2>
          <button
            @click="isCartOpen = false"
            class="focus:outline-none text-3xl text-gray-400 hover:text-black transition-colors"
          >
            &times;
          </button>
        </div>

        <div class="flex-grow space-y-6 p-8 overflow-y-auto custom-scrollbar">
          <div
            v-if="cartItems.length === 0"
            class="py-20 font-serif text-gray-400 text-xl text-center italic"
          >
            Your bag is currently empty.
          </div>

          <div
            v-for="item in cartItems"
            :key="item.id"
            class="flex sm:flex-row flex-col gap-6 pb-6 last:border-0 border-b"
          >
            <img
              :src="item.product.image"
              class="bg-gray-100 shadow-sm rounded-2xl w-full sm:w-32 h-32 object-cover"
            />

            <div class="flex flex-col flex-grow justify-between">
              <div>
                <div
                  class="flex justify-between items-start font-bold text-base uppercase"
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
                <p class="mt-1 text-gray-400 text-xs italic tracking-widest">
                  {{
                    formatPrice(
                      item.product.discount_price ?? item.product.price,
                    )
                  }}
                  / piece
                </p>
              </div>

              <div class="flex justify-between items-center mt-6">
                <div
                  class="flex items-center bg-gray-50 border border-gray-100 rounded-xl overflow-hidden"
                >
                  <button
                    @click="handleQtyChange(item, item.quantity - 1)"
                    class="hover:bg-gray-200 px-4 py-2 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    v-model.number="item.quantity"
                    @input="handleQtyInput(item)"
                    class="bg-transparent border-none focus:ring-0 w-12 font-bold text-sm text-center"
                  />
                  <button
                    @click="handleQtyChange(item, item.quantity + 1)"
                    class="hover:bg-gray-200 px-4 py-2 transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  @click="handleOptimisticDelete(item.id)"
                  class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-xs uppercase tracking-tighter transition-colors"
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

        <div class="bg-gray-50 p-8 border-t">
          <div class="flex justify-between items-end mb-6">
            <span
              class="font-bold text-gray-500 text-xs uppercase tracking-[0.2em]"
              >Estimated Total</span
            >
            <div class="text-right">
              <span class="block font-bold text-black text-2xl"
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

<template>
  <header
    class="top-0 left-0 z-50 fixed bg-white px-6 py-4 border-gray-200 border-b w-full"
  >
    <div class="flex justify-between items-center mx-auto max-w-7xl">
      <div class="flex items-center">
        <nav
          class="hidden md:flex space-x-6 font-medium text-xs uppercase tracking-widest"
        >
          <router-link
            to="/"
            class="hover:text-gray-500 transition cursor-pointer"
            >Home</router-link
          >
          <router-link
            to="/catalog"
            class="hover:text-gray-500 transition cursor-pointer"
            >Catalog</router-link
          >
          <router-link
            to="/contact"
            class="hover:text-gray-500 transition cursor-pointer"
            >Contact</router-link
          >
        </nav>
        <button
          @click="isMobileMenuOpen = true"
          class="md:hidden flex justify-center items-center focus:outline-none text-gray-700 hover:text-black"
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
          class="w-auto h-8 md:h-12 object-contain"
        />
      </div>

      <div class="flex items-center space-x-4 md:space-x-5 text-gray-700">
        <button
          @click="openSearch"
          class="flex justify-center items-center focus:outline-none hover:text-black transition-colors"
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

        <div class="relative flex justify-center items-center">
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
                class="font-bold text-black text-sm truncate uppercase tracking-tight"
              >
                HI {{ userData?.first_name }} {{ userData?.last_name }}
              </h3>
              <p class="mb-4 text-gray-500 text-xs truncate">
                {{ userData?.email }}
              </p>
            </div>
            <div v-else>
              <h3
                class="mb-4 font-bold text-black text-xs text-left uppercase tracking-widest"
              >
                Account
              </h3>
              <router-link
                to="/login"
                @click="isDropdownOpen = false"
                class="block bg-black hover:bg-gray-800 mb-4 py-3 w-full font-bold text-white text-xs text-center uppercase tracking-widest transition"
                >Sign In</router-link
              >
            </div>
            <div class="gap-2 grid grid-cols-2">
              <router-link
                to="/orderpage"
                @click="isDropdownOpen = false"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Orders</span
                ></router-link
              >
              <router-link
                to="/profilepage"
                @click="isDropdownOpen = false"
                class="flex justify-center items-center space-x-2 bg-gray-100 hover:bg-gray-200 py-3 transition"
                ><span class="font-bold text-[10px] uppercase tracking-wider"
                  >Profile</span
                ></router-link
              >
            </div>
          </div>
        </div>

        <button
          @click="openCartPage"
          class="relative hover:text-black transition-colors cart-icon-header"
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
          class="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        ></div>
        <div
          class="relative flex flex-col bg-white shadow-2xl p-8 w-[80%] max-w-sm h-full overflow-y-auto"
        >
          <div
            class="flex justify-between items-center mb-10 pb-6 border-gray-100 border-b"
          >
            <img
              src="../../../assets/solherbrandbook.png"
              alt="Logo"
              class="w-auto h-6 object-contain"
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
              class="pb-4 border-gray-50 border-b hover:text-gray-500 transition-colors"
              @click="isMobileMenuOpen = false"
              >Home</router-link
            >
            <router-link
              to="/catalog"
              class="pb-4 border-gray-50 border-b hover:text-gray-500 transition-colors"
              @click="isMobileMenuOpen = false"
              >Catalog</router-link
            >
            <router-link
              to="/contact"
              class="pb-4 border-gray-50 border-b hover:text-gray-500 transition-colors"
              @click="isMobileMenuOpen = false"
              >Contact</router-link
            >
          </nav>
          <div
            class="mt-auto pt-10 text-gray-400 text-xs uppercase tracking-widest"
          >
            <p>© 2026 Solher Bag</p>
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

// onMounted(() => {
//   checkAuth();
//   if (isAuthenticated.value) fetchCarts(); // Ambil data diam-diam di background!

//   window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);
//   window.addEventListener("click", (e) => {
//     if (!e.target.closest(".relative")) isDropdownOpen.value = false;
//   });
//   window.addEventListener("refresh-cart", fetchCarts);
// });

onMounted(() => {
  checkAuth();
  fetchAllProducts();
  if (isAuthenticated.value) fetchCarts(); 
  window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);

  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });

  window.addEventListener("refresh-cart", fetchCarts);

  // ==============================================================
  // [BARU] BFCache Handler (Menangkap User Saat Tekan Tombol Back)
  // ==============================================================
  window.addEventListener("pageshow", (event) => {
    // Event.persisted bernilai TRUE jika browser me-load halaman dari BFCache (Tombol Back)
    if (event.persisted || sessionStorage.getItem('checkout_completed') === 'true') {
      
      // Hapus bendera karena kita sudah tahu
      sessionStorage.removeItem('checkout_completed');
      
      // Paksa fetch ulang dari database untuk memastikan sinkronisasi sempurna!
      if (isAuthenticated.value) {
        fetchCarts();
      }
    }
  });
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
</style>
