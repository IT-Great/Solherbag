<!-- <template>
  <footer
    class="relative bg-[#c1c1c1] mt-auto px-6 pt-16 pb-8 border-gray-300 border-t w-full"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex md:flex-row flex-col justify-between items-start gap-10 mb-6 pb-12 border-gray-400 border-b"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 font-normal text-black text-2xl">
            Join our email list
          </h3>
          <p class="text-gray-600 text-sm">
            Get exclusive deals and early access to new products.
          </p>
        </div>

        <div class="flex sm:flex-row flex-col gap-3 w-full md:w-auto">
          <input
            type="email"
            placeholder="Email address"
            class="bg-gray-100/50 px-4 py-3 border-none outline-none focus:ring-1 focus:ring-black min-w-[300px] text-sm placeholder-gray-700"
          />
          <button
            class="bg-[#1A1A1A] hover:bg-black px-8 py-3 font-semibold text-white text-sm uppercase tracking-widest transition"
          >
            Sign Up
          </button>
        </div>
      </div>

      <div class="text-center">
        <nav
          class="flex justify-center space-x-6 mb-4 font-bold text-xs uppercase tracking-wider"
        >
          <router-link to="/about-us" class="hover:underline"
            >About Us</router-link
          >
          <router-link to="/customer-care" class="hover:underline"
            >Customer Care</router-link
          >
          <router-link to="/faq" class="hover:underline"
            >FAQs</router-link
          >
        </nav>
        <div
          class="flex justify-center space-x-4 text-[10px] text-gray-500 uppercase"
        >
          <span>© 2026 Solher</span>
          <a href="#" class="hover:text-black">Terms and Policies</a>
        </div>
      </div>
    </div>

    <a
      href="https://wa.me/628883888585?text=Hi"
      target="_blank"
      class="right-8 bottom-8 z-[60] fixed hover:scale-110 transition-transform"
    >
      <img src="../../../assets/wa_icon.png" alt="WA" class="w-12 h-12" />
    </a>
  </footer>
</template> -->

<!-- <template>
  <footer
    class="relative bg-[#c1c1c1] mt-auto px-6 pt-16 pb-8 border-gray-300 border-t w-full"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex md:flex-row flex-col justify-between items-start gap-10 mb-6 pb-12 border-gray-400 border-b"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 font-normal text-black text-2xl">
            Join our email list
          </h3>
          <p class="text-gray-600 text-sm">
            Get exclusive deals and early access to new products.
          </p>
        </div>

        <form
          @submit.prevent="handleFooterSignUp"
          class="flex sm:flex-row flex-col gap-3 w-full md:w-auto"
        >
          <input
            v-model="footerEmail"
            type="email"
            placeholder="Email address"
            class="bg-gray-100/50 px-4 py-3 border-none outline-none focus:ring-1 focus:ring-black min-w-[300px] text-sm placeholder-gray-700"
            required
          />
          <button
            type="submit"
            class="bg-[#1A1A1A] hover:bg-black px-8 py-3 font-semibold text-white text-sm uppercase tracking-widest transition"
          >
            Sign Up
          </button>
        </form>
      </div>
      <div class="text-center">
        <nav
          class="flex justify-center space-x-6 mb-4 font-bold text-xs uppercase tracking-wider"
        >
          <router-link to="/about-us" class="hover:underline"
            >About Us</router-link
          >
          <router-link to="/customer-care" class="hover:underline"
            >Customer Care</router-link
          >
          <router-link to="/faq" class="hover:underline">FAQs</router-link>
        </nav>
        <div
          class="flex justify-center space-x-4 text-[10px] text-gray-500 uppercase"
        >
          <span>© 2026 Solher</span>
          <a href="#" class="hover:text-black">Terms and Policies</a>
        </div>
      </div>
    </div>
    <a
      href="https://wa.me/628883888585?text=Hi"
      target="_blank"
      class="right-8 bottom-8 z-[60] fixed hover:scale-110 transition-transform"
    >
      <img src="../../../assets/wa_icon.png" alt="WA" class="w-12 h-12" />
    </a>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const footerEmail = ref("");

const handleFooterSignUp = () => {
  router.push({
    path: "/register",
    query: { email: footerEmail.value },
  });
};
</script> -->

<template>
  <footer
    class="relative bg-[#c1c1c1] mt-auto px-6 pt-16 pb-8 border-gray-300 border-t w-full"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex md:flex-row flex-col justify-between items-start gap-10 mb-6 pb-12 border-gray-400 border-b"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 font-normal text-black text-2xl">
            Join our email list
          </h3>
          <p class="text-gray-600 text-sm">
            Get exclusive deals and early access to new products.
          </p>
        </div>

        <form
          @submit.prevent="handleSubscribe"
          class="flex sm:flex-row flex-col gap-3 w-full md:w-auto"
        >
          <input
            v-model="footerEmail"
            type="email"
            placeholder="Email address"
            class="bg-gray-100/50 px-4 py-3 border-none outline-none focus:ring-1 focus:ring-black min-w-[300px] text-sm placeholder-gray-700 disabled:opacity-50"
            :disabled="isLoading"
            required
          />
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-[#1A1A1A] hover:bg-black disabled:bg-gray-500 px-8 py-3 font-semibold text-white text-sm uppercase tracking-widest transition flex justify-center items-center gap-2"
          >
            <span v-if="!isLoading">Subscribe</span>
            <span v-else class="flex items-center gap-2">
              <div class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              Wait...
            </span>
          </button>
        </form>
      </div>
      <div class="text-center">
        <nav
          class="flex justify-center space-x-6 mb-4 font-bold text-xs uppercase tracking-wider"
        >
          <router-link to="/about-us" class="hover:underline"
            >About Us</router-link
          >
          <router-link to="/customer-care" class="hover:underline"
            >Customer Care</router-link
          >
          <router-link to="/faq" class="hover:underline">FAQs</router-link>
        </nav>
        <div
          class="flex justify-center space-x-4 text-[10px] text-gray-500 uppercase"
        >
          <span>© 2026 Solher</span>
          <a href="#" class="hover:text-black">Terms and Policies</a>
        </div>
      </div>
    </div>
    <a
      href="https://wa.me/628883888585?text=Hi"
      target="_blank"
      class="right-8 bottom-8 z-[60] fixed hover:scale-110 transition-transform"
    >
      <img src="../../../assets/wa_icon.png" alt="WA" class="w-12 h-12" />
    </a>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api"; // Sesuaikan path ini jika perlu

const footerEmail = ref("");
const isLoading = ref(false);

const handleSubscribe = async () => {
  isLoading.value = true;
  try {
    const res = await axios.post(`${BASE_URL}/subscribe`, {
      email: footerEmail.value,
    });

    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: res.data.message || "Thank you for subscribing to our newsletter. Check your inbox!",
      confirmButtonColor: "#000",
    });

    footerEmail.value = ""; // Kosongkan input setelah sukses
  } catch (error) {
    const errorMsg = error.response?.data?.errors?.email?.[0] || error.response?.data?.message || "Failed to subscribe. Please try again.";
    
    Swal.fire({
      icon: "error",
      title: "Invalid Email",
      text: errorMsg,
      confirmButtonColor: "#000",
    });
  } finally {
    isLoading.value = false;
  }
};
</script>