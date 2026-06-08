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
