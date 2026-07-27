<!-- <template>
  <footer
    class="relative bg-[#c1c1c1] mt-auto px-6 pt-16 pb-8 border-gray-300 border-t w-full"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start justify-between gap-10 pb-12 mb-6 border-b border-gray-400 md:flex-row"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 text-2xl font-normal text-black">
            Join our email list
          </h3>
          <p class="text-sm text-gray-600">
            Get exclusive deals and early access to new products.
          </p>
        </div>

        <div class="flex flex-col w-full gap-3 sm:flex-row md:w-auto">
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
          class="flex justify-center mb-4 space-x-6 text-xs font-bold tracking-wider uppercase"
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
        class="flex flex-col items-start justify-between gap-10 pb-12 mb-6 border-b border-gray-400 md:flex-row"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 text-2xl font-normal text-black">
            Join our email list
          </h3>
          <p class="text-sm text-gray-600">
            Get exclusive deals and early access to new products.
          </p>
        </div>

        <form
          @submit.prevent="handleFooterSignUp"
          class="flex flex-col w-full gap-3 sm:flex-row md:w-auto"
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
          class="flex justify-center mb-4 space-x-6 text-xs font-bold tracking-wider uppercase"
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

<!-- <template>
  <footer
    class="relative bg-[#c1c1c1] mt-auto px-6 pt-16 pb-8 border-gray-300 border-t w-full"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start justify-between gap-10 pb-12 mb-6 border-b border-gray-400 md:flex-row"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 text-2xl font-normal text-black">
            Join our email list
          </h3>
          <p class="text-sm text-gray-600">
            Get exclusive deals and early access to new products.
          </p>
        </div>

        <form
          @submit.prevent="handleSubscribe"
          class="flex flex-col w-full gap-3 sm:flex-row md:w-auto"
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
              <div class="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
              Wait...
            </span>
          </button>
        </form>
      </div>
      <div class="text-center">
        <nav
          class="flex justify-center mb-4 space-x-6 text-xs font-bold tracking-wider uppercase"
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
</script> -->

<!-- <template>
  <footer
    class="relative bg-[#c1c1c1] mt-auto px-6 pt-16 pb-12 border-gray-300 border-t w-full"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start justify-between gap-10 pb-12 mb-12 border-b border-gray-400 md:flex-row"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 text-2xl font-normal text-black">
            Join our email list
          </h3>
          <p class="text-sm text-gray-600">
            Get exclusive deals and early access to new products.
          </p>
        </div>

        <form
          @submit.prevent="handleSubscribe"
          class="flex flex-col w-full gap-3 sm:flex-row md:w-auto"
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
              <div class="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"></div>
              Wait...
            </span>
          </button>
        </form>
      </div>

      <div class="flex flex-col items-start justify-between gap-10 md:flex-row">
        
        <div class="w-full md:w-1/4">
          <h4 class="mb-4 text-lg font-bold tracking-widest text-black uppercase">Solher</h4>
          <p class="pr-4 mb-8 text-xs leading-relaxed text-gray-600">
            Crafted from premium selected leather, each SolHer piece reflects timeless elegance and refined craftsmanship.
          </p>
          <div class="text-[10px] text-gray-500 uppercase tracking-widest">
            <span>© 2026 Solher.<br/>All Rights Reserved.</span>
          </div>
        </div>

        <div class="grid w-full grid-cols-2 gap-8 text-sm md:w-3/4 md:grid-cols-3">
          
          <div class="flex flex-col space-y-4">
            <h4 class="font-bold text-black text-[11px] uppercase tracking-widest mb-2">About Us</h4>
            <router-link to="/about-us" class="text-xs font-medium text-gray-600 transition-colors hover:text-black">About Solher</router-link>
            <router-link to="/contact" class="text-xs font-medium text-gray-600 transition-colors hover:text-black">Contact Us</router-link>
          </div>

          <div class="flex flex-col space-y-4">
            <h4 class="font-bold text-black text-[11px] uppercase tracking-widest mb-2">Support</h4>
            <router-link to="/customer-care" class="text-xs font-medium text-gray-600 transition-colors hover:text-black">Customer Care</router-link>
            <router-link to="/faq" class="text-xs font-medium text-gray-600 transition-colors hover:text-black">FAQs</router-link>
          </div>

          <div class="flex flex-col space-y-4">
            <h4 class="font-bold text-black text-[11px] uppercase tracking-widest mb-2">Policies</h4>
            <router-link to="/terms" class="text-xs font-medium text-gray-600 transition-colors hover:text-black">Terms & Conditions</router-link>
            <router-link to="/privacy" class="text-xs font-medium text-gray-600 transition-colors hover:text-black">Privacy Policy</router-link>
            <router-link to="/shipping-policy" class="text-xs font-medium text-gray-600 transition-colors hover:text-black">Shipping Policy</router-link>
            <router-link to="/refund-policy" class="text-xs font-medium text-gray-600 transition-colors hover:text-black">Refund Policy</router-link>
          </div>
          
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
    class="relative bg-[#c1c1c1] mt-auto px-6 pt-16 pb-12 border-gray-300 border-t w-full"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start justify-between gap-10 pb-12 mb-12 border-b border-gray-400 md:flex-row"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 text-2xl font-normal text-black">
            {{ $t("footer.join_email") }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ $t("footer.sub_text") }}
          </p>
        </div>

        <form
          @submit.prevent="handleSubscribe"
          class="flex flex-col w-full gap-3 sm:flex-row md:w-auto"
        >
          <input
            v-model="footerEmail"
            type="email"
            :placeholder="$t('footer.placeholder')"
            class="bg-gray-100/50 px-4 py-3 border-none outline-none focus:ring-1 focus:ring-black min-w-[300px] text-sm placeholder-gray-700 disabled:opacity-50"
            :disabled="isLoading"
            required
          />
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-[#1A1A1A] hover:bg-black disabled:bg-gray-500 px-8 py-3 font-semibold text-white text-sm uppercase tracking-widest transition flex justify-center items-center gap-2"
          >
            <span v-if="!isLoading">{{ $t("footer.subscribe") }}</span>
            <span v-else class="flex items-center gap-2">
              <div
                class="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"
              ></div>
              {{ $t("footer.wait") }}
            </span>
          </button>
        </form>
      </div>

      <div class="flex flex-col items-start justify-between gap-10 md:flex-row">
        <div class="w-full md:w-1/4">
          <h4 class="mb-4 text-lg font-bold tracking-widest text-black uppercase">
            Solher
          </h4>
          <p class="pr-4 mb-8 text-xs leading-relaxed text-gray-600">
            {{ $t("footer.solher_desc") }}
          </p>
          <div class="text-[10px] text-gray-500 uppercase tracking-widest">
            <span
              >© 2026 Solher. <br />
              {{ $t("footer.rights") }}</span
            >
          </div>
        </div>

        <div class="grid w-full grid-cols-2 gap-8 text-sm md:w-3/4 md:grid-cols-3">
          <div class="flex flex-col space-y-4">
            <h4 class="font-bold text-black text-[11px] uppercase tracking-widest mb-2">
              {{ $t("footer.about_us") }}
            </h4>
            <router-link
              to="/about-us"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.about_solher") }}</router-link
            >
            <router-link
              to="/contact"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.contact_us") }}</router-link
            >

            <router-link to="/affiliate" class="relative flex items-center w-fit group">
              <span
                class="text-xs font-medium text-gray-600 transition-colors group-hover:text-black"
              >
                Solher Ambassador
              </span>
              <span
                class="ml-2 px-1.5 py-0.5 text-[8px] font-bold text-white bg-black rounded-sm tracking-widest uppercase shadow-sm"
              >
                JOIN
              </span>
            </router-link>
          </div>

          <div class="flex flex-col space-y-4">
            <h4 class="font-bold text-black text-[11px] uppercase tracking-widest mb-2">
              {{ $t("footer.support") }}
            </h4>
            <router-link
              to="/customer-care"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.customer_care") }}</router-link
            >
            <router-link
              to="/faq"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.faqs") }}</router-link
            >
          </div>

          <div class="flex flex-col space-y-4">
            <h4 class="font-bold text-black text-[11px] uppercase tracking-widest mb-2">
              {{ $t("footer.policies") }}
            </h4>
            <router-link
              to="/terms"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.terms") }}</router-link
            >
            <router-link
              to="/privacy"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.privacy") }}</router-link
            >
            <router-link
              to="/shipping-policy"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.shipping") }}</router-link
            >
            <router-link
              to="/refund-policy"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.refund") }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api"; // Sesuaikan path ini jika perlu

const footerEmail = ref("");
const { t } = useI18n();
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
      text:
        res.data.message ||
        "Thank you for subscribing to our newsletter. Check your inbox!",
      confirmButtonColor: "#000",
    });

    footerEmail.value = ""; // Kosongkan input setelah sukses
  } catch (error) {
    const errorMsg =
      error.response?.data?.errors?.email?.[0] ||
      error.response?.data?.message ||
      "Failed to subscribe. Please try again.";

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
</script> -->

<template>
  <footer
    class="relative bg-[#c1c1c1] mt-auto px-6 pt-16 pb-12 border-gray-300 border-t w-full"
  >
    <div class="mx-auto max-w-7xl">
      <div
        class="flex flex-col items-start justify-between gap-10 pb-12 mb-12 border-b border-gray-400 md:flex-row"
      >
        <div class="max-w-sm">
          <h3 class="mb-4 text-2xl font-normal text-black">
            {{ $t("footer.join_email") }}
          </h3>
          <p class="text-sm text-gray-600">
            {{ $t("footer.sub_text") }}
          </p>
        </div>

        <form
          @submit.prevent="handleSubscribe"
          class="flex flex-col w-full gap-3 sm:flex-row md:w-auto"
        >
          <input
            v-model="footerEmail"
            type="email"
            :placeholder="$t('footer.placeholder')"
            class="bg-gray-100/50 px-4 py-3 border-none outline-none focus:ring-1 focus:ring-black min-w-[300px] text-sm placeholder-gray-700 disabled:opacity-50"
            :disabled="isLoading"
            required
          />
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-[#1A1A1A] hover:bg-black disabled:bg-gray-500 px-8 py-3 font-semibold text-white text-sm uppercase tracking-widest transition flex justify-center items-center gap-2"
          >
            <span v-if="!isLoading">{{ $t("footer.subscribe") }}</span>
            <span v-else class="flex items-center gap-2">
              <div
                class="w-4 h-4 border-2 rounded-full border-white/30 border-t-white animate-spin"
              ></div>
              {{ $t("footer.wait") }}
            </span>
          </button>
        </form>
      </div>

      <div class="flex flex-col items-start justify-between gap-10 md:flex-row">
        <div class="w-full md:w-1/4">
          <h4 class="mb-4 text-lg font-bold tracking-widest text-black uppercase">
            Solher
          </h4>

          <p class="pr-4 mb-5 text-xs leading-relaxed text-gray-600">
            {{ $t("footer.solher_desc") }}
          </p>

          <!-- 👇 [BARU] Deretan Sosial Media 👇 -->
          <div class="flex items-center gap-5 mb-8">
            <!-- Instagram -->
            <a
              href="https://www.instagram.com/solher.official/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 transition-all duration-300 transform hover:text-black hover:-translate-y-1"
              aria-label="Instagram"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                />
              </svg>
            </a>

            <!-- Threads -->
            <a
              href="https://www.threads.com/@solher.official"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 transition-all duration-300 transform hover:text-black hover:-translate-y-1"
              aria-label="Threads"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 192 192">
                <path
                  d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0113 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0113 16.9405C119.988 17.1113 137.539 24.4614 148.184 38.7407C154.947 47.8136 159.199 59.6827 160.716 74.0041L177.625 72.2307C175.801 54.7618 170.517 40.1691 161.802 28.5134C148.519 10.6698 126.797 2 97.0113 2C67.2255 2 45.4231 10.6481 32.1643 28.461C20.0827 44.6974 13.0645 68.3275 13 96C13.0645 123.672 20.0827 147.303 32.1643 163.539C45.4231 181.352 67.2255 190 97.0113 190C126.839 190 148.643 181.319 161.942 163.469C178.681 141.011 176.711 116.516 166.757 103.224C160.297 94.595 152.025 89.658 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z"
                />
              </svg>
            </a>

            <!-- Facebook -->
            <a
              href="https://www.facebook.com/profile.php?id=61587319854849"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 transition-all duration-300 transform hover:text-black hover:-translate-y-1"
              aria-label="Facebook"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
            </a>

            <!-- TikTok -->
            <a
              href="https://www.tiktok.com/@solher.official/"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 transition-all duration-300 transform hover:text-black hover:-translate-y-1"
              aria-label="TikTok"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"
                />
              </svg>
            </a>

            <!-- WhatsApp -->
            <a
              href="https://wa.me/628883888585"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-600 transition-all duration-300 transform hover:text-black hover:-translate-y-1"
              aria-label="WhatsApp"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"
                />
              </svg>
            </a>
          </div>
          <!-- 👆 ============================= 👆 -->

          <div class="text-[10px] text-gray-500 uppercase tracking-widest">
            <span
              >© 2026 Solher. <br />
              {{ $t("footer.rights") }}</span
            >
          </div>
        </div>

        <div class="grid w-full grid-cols-2 gap-8 text-sm md:w-3/4 md:grid-cols-3">
          <div class="flex flex-col space-y-4">
            <h4 class="font-bold text-black text-[11px] uppercase tracking-widest mb-2">
              {{ $t("footer.about_us") }}
            </h4>
            <router-link
              to="/about-us"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.about_solher") }}</router-link
            >
            <router-link
              to="/contact"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.contact_us") }}</router-link
            >

            <router-link to="/affiliate" class="relative flex items-center w-fit group">
              <span
                class="text-xs font-medium text-gray-600 transition-colors group-hover:text-black"
              >
                Solher Ambassador
              </span>
              <span
                class="ml-2 px-1.5 py-0.5 text-[8px] font-bold text-white bg-black rounded-sm tracking-widest uppercase shadow-sm"
              >
                JOIN
              </span>
            </router-link>
          </div>

          <div class="flex flex-col space-y-4">
            <h4 class="font-bold text-black text-[11px] uppercase tracking-widest mb-2">
              {{ $t("footer.support") }}
            </h4>
            <router-link
              to="/customer-care"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.customer_care") }}</router-link
            >
            <router-link
              to="/faq"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.faqs") }}</router-link
            >
          </div>

          <div class="flex flex-col space-y-4">
            <h4 class="font-bold text-black text-[11px] uppercase tracking-widest mb-2">
              {{ $t("footer.policies") }}
            </h4>
            <router-link
              to="/terms"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.terms") }}</router-link
            >
            <router-link
              to="/privacy"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.privacy") }}</router-link
            >
            <router-link
              to="/shipping-policy"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.shipping") }}</router-link
            >
            <router-link
              to="/refund-policy"
              class="text-xs font-medium text-gray-600 transition-colors hover:text-black"
              >{{ $t("footer.refund") }}</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api"; // Sesuaikan path ini jika perlu

const footerEmail = ref("");
const { t } = useI18n();
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
      text:
        res.data.message ||
        "Thank you for subscribing to our newsletter. Check your inbox!",
      confirmButtonColor: "#000",
    });

    footerEmail.value = ""; // Kosongkan input setelah sukses
  } catch (error) {
    const errorMsg =
      error.response?.data?.errors?.email?.[0] ||
      error.response?.data?.message ||
      "Failed to subscribe. Please try again.";

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
