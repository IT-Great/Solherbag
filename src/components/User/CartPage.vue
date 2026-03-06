<template>
  <div class="mx-auto px-6 py-24 max-w-7xl min-h-screen">
    <div class="flex items-center gap-4 mb-10">
      <button @click="$router.push('/catalog')" class="p-2 bg-white rounded-full shadow-sm hover:bg-gray-50 transition">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <h1 class="font-serif text-4xl md:text-5xl uppercase tracking-tighter">Your Bag</h1>
      <span class="font-sans text-gray-400 text-xl ml-2">({{ cartCount }} items)</span>
    </div>

    <div class="flex flex-col lg:flex-row gap-12 lg:gap-20">
      <div class="lg:w-2/3 flex-grow">
        <div v-if="cartItems.length === 0" class="py-20 text-center border-t border-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 mx-auto text-gray-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
          <p class="font-serif text-gray-400 text-2xl italic mb-6">Your bag is currently empty.</p>
          <button @click="$router.push('/catalog')" class="bg-black text-white px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition">
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
              <div class="relative w-full sm:w-48 h-48 shrink-0 cursor-pointer" @click="$router.push(`/product/${item.product.id}`)">
                <img :src="item.product.image" class="bg-gray-50 shadow-sm rounded-2xl w-full h-full object-cover" />
                <div v-if="item.isSyncing" class="absolute inset-0 bg-white/50 backdrop-blur-[2px] rounded-2xl flex justify-center items-center">
                  <div class="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
                </div>
              </div>

              <div class="flex flex-col flex-grow justify-between">
                <div>
                  <div class="flex justify-between items-start">
                    <h3 class="font-bold text-xl uppercase tracking-tight w-2/3 cursor-pointer hover:text-gray-600 transition-colors" @click="$router.push(`/product/${item.product.id}`)">
                      {{ item.product.name }}
                    </h3>
                    <p class="font-bold text-xl text-right">
                      {{ formatPrice(item.gross_amount) }}
                    </p>
                  </div>
                  <p class="mt-1 text-gray-400 text-sm italic tracking-widest">
                    {{ formatPrice(item.product.discount_price ?? item.product.price) }} / piece
                  </p>
                </div>

                <div class="flex justify-between items-end mt-6">
                  <div class="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <button @click="handleQtyChange(item, item.quantity - 1)" class="hover:bg-gray-200 px-5 py-3 transition-colors font-bold text-lg">-</button>
                    <input type="number" v-model.number="item.quantity" @input="handleQtyInput(item)" class="bg-transparent border-none focus:ring-0 w-14 font-bold text-base text-center" />
                    <button @click="handleQtyChange(item, item.quantity + 1)" class="hover:bg-gray-200 px-5 py-3 transition-colors font-bold text-lg">+</button>
                  </div>

                  <button @click="handleOptimisticDelete(item.id)" class="group flex items-center gap-2 font-bold text-gray-400 hover:text-red-500 text-xs uppercase tracking-widest transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                </div>

                <div class="mt-4 min-h-[1.25rem]">
                  <p v-if="item.quantity >= item.product.stock" class="font-bold text-[10px] text-red-600 uppercase tracking-tighter animate-pulse">
                    Out of stock! Maximum {{ item.product.stock }} reached.
                  </p>
                  <p v-else-if="item.product.stock < 5" class="text-[10px] text-amber-600 italic font-medium">
                    Hurry! Only {{ item.product.stock }} left in our collection.
                  </p>
                </div>
              </div>
            </div>
          </TransitionGroup>
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
            <p class="text-[10px] text-gray-400 italic text-right mt-1">Tax and shipping calculated at checkout.</p>
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
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Swal from 'sweetalert2';
import { BASE_URL } from '../../../config/api.js';

// Mengambil fungsi dan state langsung dari memori Global
import { useCart } from '../../../composables/useCart';

const router = useRouter();
const isProcessingCheckout = ref(false);

const { 
  cartItems, 
  cartCount, 
  totalCartAmount, 
  handleQtyChange, 
  handleQtyInput, 
  handleOptimisticDelete 
} = useCart();

const formatPrice = (v) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(v);

const handleCheckout = async () => {
  isProcessingCheckout.value = true;
  try {
    const res = await axios.post(
      `${BASE_URL}/checkout`,
      {},
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );

    const transactionId = res.data.transaction_id || res.data.data?.transaction_id || res.data.id;
    if (!transactionId) throw new Error("Transaction ID not found");

    router.push(`/payment/${transactionId}`);
  } catch (err) {
    Swal.fire({
      icon: "error",
      title: "Checkout Failed",
      text: "Unable to proceed to payment.",
      confirmButtonColor: "#000"
    });
  } finally {
    isProcessingCheckout.value = false;
  }
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
</style>