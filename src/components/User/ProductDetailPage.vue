<template>
  <div
    v-if="isLoading"
    class="z-[100] fixed inset-0 flex flex-col justify-center items-center bg-white"
  >
    <div
      class="w-12 h-12 border-4 border-gray-100 rounded-full border-t-black animate-spin"
    ></div>
    <p class="mt-4 font-serif italic text-gray-400 animate-pulse">
      {{ $t("product_detail.loading_solher") }}
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
              <div
                class="relative flex-shrink-0 w-full h-full"
                @mousemove="handleZoom"
                @mouseleave="resetZoom"
              >
                <img
                  v-if="media.type === 'image'"
                  :src="media.url"
                  class="object-cover w-full h-full main-product-image transition-transform duration-500 hover:scale-[2] cursor-zoom-in"
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

          <!-- <div
            v-if="product.discount_price && getDiscountStatus(product).active"
            class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 font-bold text-[10px] uppercase tracking-widest shadow-md z-10"
          >
            SALE
          </div> -->

          <div
            v-if="getDiscountToDisplay(product) && getDiscountStatus(product).active"
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

          <!-- <div
            class="flex flex-wrap items-center justify-center w-full gap-4 md:justify-start"
          >
            <template
              v-if="product.discount_price && !getDiscountStatus(product).expired"
            >
              <template v-if="getDiscountStatus(product).active">
                <p class="text-2xl font-bold text-red-600">
                  {{ formatPrice(product.discount_price) }}
                </p>
                <p class="text-lg text-gray-400 line-through">
                  {{ formatPrice(product.price) }}
                </p>
                <span class="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded">
                  {{ $t("product_detail.save") }}
                  {{ calculateDiscount(product.price, product.discount_price) }}%
                </span>
              </template>

              <template v-else-if="getDiscountStatus(product).upcoming">
                <p class="text-2xl text-gray-600">
                  {{ formatPrice(product.price) }}
                </p>
                <div class="w-full mt-2">
                  <span
                    class="flex items-center gap-2 px-3 py-2 text-xs font-bold border rounded-lg text-amber-700 bg-amber-50 border-amber-200 w-fit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {{ $t("product_detail.upcoming") }}
                    {{ formatPrice(product.discount_price) }}
                    {{ $t("product_detail.starts_on") }}
                    {{ formatUpcomingDate(product.discount_start_date) }}
                  </span>
                </div>
              </template>
            </template>
            <template v-else>
              <p class="text-2xl text-gray-600">
                {{ formatPrice(product.price) }}
              </p>
            </template>
          </div> -->

          <div
            class="flex flex-wrap items-center justify-center w-full gap-4 md:justify-start"
          >
            <template
              v-if="getDiscountToDisplay(product) && !getDiscountStatus(product).expired"
            >
              <template v-if="getDiscountStatus(product).active">
                <p class="text-2xl font-bold text-red-600">
                  {{ formatCurrencyDisplay(getDiscountToDisplay(product)) }}
                </p>
                <p class="text-lg text-gray-400 line-through">
                  {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
                </p>
                <span class="px-2 py-1 text-xs font-bold text-red-600 bg-red-100 rounded">
                  {{ $t("product_detail.save") }} {{ calculateDynamicDiscount(product) }}%
                </span>
              </template>
              <template v-else-if="getDiscountStatus(product).upcoming"> </template>
            </template>
            <template v-else>
              <p class="text-2xl text-gray-600">
                {{ formatCurrencyDisplay(getPriceToDisplay(product)) }}
              </p>
            </template>
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
              >{{ $t("product_detail.material") }}</span
            >
            <span class="font-medium text-right text-gray-900">{{
              product.material
            }}</span>
          </div>

          <div
            v-if="product.strap_length && product.strap_length.length > 0"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0 mt-1"
              >{{ $t("product_detail.strap_length") }}</span
            >

            <div class="flex flex-col items-end">
              <template v-if="Array.isArray(product.strap_length)">
                <div class="flex flex-wrap justify-end gap-2">
                  <span
                    v-for="(strap, idx) in product.strap_length"
                    :key="idx"
                    class="px-2 py-1 text-[10px] font-bold tracking-wider text-gray-800 uppercase bg-white border border-gray-200 rounded-lg shadow-sm"
                  >
                    {{ strap }}
                  </span>
                </div>
              </template>

              <span v-else class="font-medium text-right text-gray-900">
                {{ product.strap_length }}
              </span>
            </div>
          </div>

          <div
            v-if="product.length || product.width || product.height"
            class="flex items-start justify-between pt-3 text-sm border-t border-gray-100"
          >
            <span
              class="text-gray-500 font-bold uppercase tracking-widest text-[10px] w-24 shrink-0"
              >{{ $t("product_detail.dimensions") }}</span
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
              >{{ $t("product_detail.weight") }}</span
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
              >{{ $t("product_detail.colors") }}</span
            >
            <div class="flex flex-col items-end">
              <div class="flex flex-wrap justify-end gap-2">
                <div
                  v-for="sibling in siblingColors"
                  :key="sibling.id"
                  @click="goToColorVariant(sibling)"
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
            >{{ $t("product_detail.quantity") }}</span
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
            {{
              product.stock === 0
                ? $t("product_detail.out_of_stock")
                : $t("product_detail.add_to_cart")
            }}
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
            {{ $t("product_detail.buy_it_now") }}
          </button>
        </div>

        <!-- <div class="pt-8 border-t border-gray-200 divide-y divide-gray-200">
          <div
            v-for="section in ['description', 'design', 'shipping_and_returns']"
            :key="section"
            class="py-4"
          >
            <button
              @click="activeSection = activeSection === section ? null : section"
              class="flex items-center justify-between w-full text-xs font-medium tracking-widest text-left uppercase group"
            >
              <span class="transition group-hover:text-gray-500">{{ $t(`product_detail.${section}`) }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
              >
                <template v-if="section !== 'shipping_and_returns'">
                  {{ product[section] || $t('product_detail.no_information') }}
                </template>
                <template v-else>
                  {{ $t('product_detail.shipping_desc') }}
                </template>
              </div>
            </transition>
          </div>
        </div> -->
        <div class="pt-8 border-t border-gray-200 divide-y divide-gray-200">
          <div
            v-for="section in ['description', 'design', 'shipping_and_returns']"
            :key="section"
            class="py-4"
          >
            <button
              @click="activeSection = activeSection === section ? null : section"
              class="flex items-center justify-between w-full text-xs font-medium tracking-widest text-left uppercase group"
            >
              <span class="transition group-hover:text-gray-500">{{
                $t(`product_detail.${section}`)
              }}</span>
              <span>{{ activeSection === section ? "−" : "+" }}</span>
            </button>
            <!-- <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
              >
                <template v-if="section === 'description'">
                  {{ (locale === 'en' && product.description_en) ? product.description_en : (product.description || $t('product_detail.no_information')) }}
                </template>
                <template v-else-if="section === 'design'">
                  {{ (locale === 'en' && product.design_en) ? product.design_en : (product.design || $t('product_detail.no_information')) }}
                </template>
                <template v-else-if="section === 'shipping_and_returns'">
                  {{ $t('product_detail.shipping_desc') }}
                </template>
              </div>
            </transition> -->
            <transition name="fade">
              <div
                v-show="activeSection === section"
                class="mt-4 text-sm leading-relaxed text-gray-600 whitespace-pre-wrap"
              >
                <template v-if="section === 'description'">
                  {{
                    $i18n.locale === "en" && product.description_en
                      ? product.description_en
                      : product.description || $t("product_detail.no_information")
                  }}
                </template>
                <template v-else-if="section === 'design'">
                  {{
                    $i18n.locale === "en" && product.design_en
                      ? product.design_en
                      : product.design || $t("product_detail.no_information")
                  }}
                </template>
                <template v-else-if="section === 'shipping_and_returns'">
                  {{ $t("product_detail.shipping_desc") }}
                </template>
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
        {{ $t("product_detail.you_may_also_like") }}
      </h2>

      <div class="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
        <div
          v-for="rec in recommendedProducts"
          :key="rec.id"
          @click="goToRecommendedProduct(rec)"
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
            <!-- <div
              v-if="rec.discount_price && getDiscountStatus(rec).active"
              class="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 font-bold text-[8px] uppercase tracking-widest rounded-sm z-10"
            >
              SALE
            </div> -->
            <div
              v-if="getDiscountToDisplay(product) && getDiscountStatus(product).active"
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
          <!-- <div class="flex items-center gap-2">
            <template v-if="rec.discount_price && getDiscountStatus(rec).active">
              <p class="text-sm font-bold text-red-600">
                {{ formatPrice(rec.discount_price) }}
              </p>
              <p class="text-xs text-gray-400 line-through">
                {{ formatPrice(rec.price) }}
              </p>
            </template>
            <template v-else>
              <p class="text-sm font-medium text-gray-900">
                {{ formatPrice(rec.price) }}
              </p>
            </template>
          </div> -->
          <div class="flex items-center gap-2">
            <template v-if="getDiscountToDisplay(rec) && getDiscountStatus(rec).active">
              <p class="text-sm font-bold text-red-600">
                {{ formatCurrencyDisplay(getDiscountToDisplay(rec)) }}
              </p>
              <p class="text-xs text-gray-400 line-through">
                {{ formatCurrencyDisplay(getPriceToDisplay(rec)) }}
              </p>
            </template>
            <template v-else>
              <p class="text-sm font-medium text-gray-900">
                {{ formatCurrencyDisplay(getPriceToDisplay(rec)) }}
              </p>
            </template>
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
import { formatPrice } from "../../utils/currency";
import { useI18n } from "vue-i18n";

// [BARU] Inisialisasi useI18n untuk fungsi translation $t
const { t, locale } = useI18n();

const { handleOptimisticAdd, selectedItemIds, fetchCarts, cartItems } = useCart();

const route = useRoute();
const router = useRouter();
const product = ref(null);
const activeSection = ref("description"); // [PERBAIKAN] Mengubah default dari 'Description' ke 'description'
const isLoading = ref(true);
const userWishlists = ref([]);
const isAuthenticated = !!localStorage.getItem("token");
const activeSlide = ref(0);
const selectedQuantity = ref(1);
const recommendedProducts = ref([]);
const siblingColors = ref([]);

// 1. Tambahkan state untuk mata uang saat ini
const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
};

// [BARU] Menyimpan data pengguna yang sedang login (untuk mengecek status afiliasi)
const currentUser = ref(null);

// ==========================================
// [BARU] FUNGSI MENARIK DATA PROFIL USER
// ==========================================
const fetchUserProfile = async () => {
  if (!isAuthenticated) return;
  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      // Sesuaikan endpoint user Anda, biasanya /user atau /profile
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    currentUser.value = res.data.data || res.data;
  } catch (error) {
    console.error("Gagal menarik data profil pengguna:", error);
  }
};

// ==========================================
// [BARU] FUNGSI MEMBAGIKAN TAUTAN AFILIASI
// ==========================================
const handleShare = () => {
  let linkToShare = window.location.href; // Ambil URL produk saat ini

  // Jika yang login adalah afiliator, sisipkan parameter referral-nya
  if (
    currentUser.value &&
    currentUser.value.is_affiliate &&
    currentUser.value.referral_code
  ) {
    const url = new URL(linkToShare);
    url.searchParams.set("ref", currentUser.value.referral_code);
    linkToShare = url.toString();
  }

  // Salin ke Clipboard (Papan Klip)
  navigator.clipboard
    .writeText(linkToShare)
    .then(() => {
      Swal.fire({
        icon: "success",
        title: "Tautan Tersalin!",
        text: currentUser.value?.is_affiliate
          ? "Tautan afiliasi siap disebar untuk mendapat komisi."
          : "Bagikan produk ini ke teman Anda.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    })
    .catch((err) => {
      console.error("Gagal menyalin teks: ", err);
      Swal.fire({
        icon: "error",
        title: "Gagal menyalin tautan",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
    });
};

// ==========================================
// LOGIKA STATUS DISKON (TIME-BASED)
// ==========================================
const getDiscountStatus = (p) => {
  if (!p || !p.discount_price) return { active: false, upcoming: false, expired: false };

  const now = new Date();
  let active = true;
  let upcoming = false;
  let expired = false;

  if (p.discount_start_date) {
    const startDate = new Date(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }
  if (p.discount_end_date) {
    const endDate = new Date(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }

  return { active, upcoming, expired };
};

// Mengambil harga dasar sesuai mata uang
const getPriceToDisplay = (product) => {
  if (!product) return { value: 0, curr: "IDR" };
  const curr = currentCurrency.value;
  if (curr === "IDR") return { value: product.price, curr: "IDR" };

  const prices =
    typeof product.prices === "string"
      ? JSON.parse(product.prices)
      : product.prices || {};

  if (prices[curr]) {
    return { value: parseFloat(prices[curr]), curr: curr };
  }
  return { value: product.price, curr: "IDR" };
};

// Mengambil harga diskon sesuai mata uang
const getDiscountToDisplay = (product) => {
  if (!product) return null;
  const curr = currentCurrency.value;

  if (curr === "IDR") {
    return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
  }

  const discountPrices =
    typeof product.discount_prices === "string"
      ? JSON.parse(product.discount_prices)
      : product.discount_prices || {};

  if (discountPrices[curr]) {
    return { value: parseFloat(discountPrices[curr]), curr: curr };
  }
  return product.discount_price ? { value: product.discount_price, curr: "IDR" } : null;
};

// Memformat angka menjadi string (Misal: 10 => $10.00)
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

// Menghitung persentase diskon dinamis
const calculateDynamicDiscount = (product) => {
  const priceObj = getPriceToDisplay(product);
  const discObj = getDiscountToDisplay(product);
  if (!priceObj || !discObj) return 0;

  return Math.round(((priceObj.value - discObj.value) / priceObj.value) * 100);
};

// Anda juga harus mengubah currentActivePrice agar membaca harga dinamis (penting untuk analytics)
const currentActivePrice = computed(() => {
  if (!product.value) return 0;
  if (product.value.discount_price && getDiscountStatus(product.value).active) {
    const discObj = getDiscountToDisplay(product.value);
    return discObj ? discObj.value : 0;
  }
  const priceObj = getPriceToDisplay(product.value);
  return priceObj ? priceObj.value : 0;
});

const formatUpcomingDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const updateRecentlyViewedAndTrack = (prod) => {
  let list = JSON.parse(localStorage.getItem("recently_viewed") || "[]");
  list = list.filter((item) => item.id !== prod.id);
  list.unshift(prod);
  list = list.slice(0, 6);
  localStorage.setItem("recently_viewed", JSON.stringify(list));

  const activePrice =
    prod.discount_price && getDiscountStatus(prod).active
      ? parseFloat(prod.discount_price)
      : parseFloat(prod.price);

  trackGtmEvent("view_item", {
    ecommerce: {
      currency: "IDR",
      value: activePrice,
      items: [
        {
          item_id: prod.id,
          item_name: prod.name,
          price: activePrice,
          item_category: prod.category?.name || "Accessories",
          quantity: 1,
        },
      ],
    },
  });
};

const trackGtmEvent = (eventName, data) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...data,
  });
};

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
    Swal.fire({ icon: "info", title: "Login Required", confirmButtonColor: "#000" });
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
  Seafoam: "#9FE2BF",
  Turquoise: "#40E0D0",
  Aqua: "#00FFFF",
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

const extractColorName = (fullName) => {
  if (!fullName) return "Main";
  const words = fullName.trim().split(" ");
  const lastWord = words[words.length - 1];
  return lastWord.charAt(0).toUpperCase() + lastWord.slice(1).toLowerCase();
};

const extractColorHex = (fullName) => {
  const colorName = extractColorName(fullName);
  return colorMapHex[colorName] || "#cccccc";
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

const goToColorVariant = async (sibling) => {
  const identifier = sibling.slug || sibling.id;

  if (product.value.id === sibling.id || product.value.slug === sibling.slug) return;
  try {
    const res = await axios.get(`${BASE_URL}/products/${identifier}`);
    product.value = res.data;
    fetchRecommendations(product.value.category_id, product.value.id);
    fetchWishlists();
    activeSlide.value = 0;
    selectedQuantity.value = 1;
    window.history.pushState({}, "", `/product/${identifier}`);
  } catch (error) {
    console.error("Gagal berpindah warna", error);
  }
};

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

const goToRecommendedProduct = (rec) => {
  isLoading.value = true;
  const identifier = rec.slug || rec.id;
  router.push(`/products/${identifier}`);
};

const fetchProductDetail = async () => {
  isLoading.value = true;

  if (history.state && history.state.productData) {
    product.value = JSON.parse(history.state.productData);
    isLoading.value = false;

    fetchRecommendations(product.value.category_id, product.value.id);
    fetchSiblingColors(product.value.name);
    activeSlide.value = 0;
    selectedQuantity.value = 1;

    updateRecentlyViewedAndTrack(product.value);
  } else {
    try {
      const res = await axios.get(`${BASE_URL}/products/${route.params.id}`);
      product.value = res.data;

      fetchWishlists();
      fetchRecommendations(product.value.category_id, product.value.id);
      fetchSiblingColors(product.value.name);
      activeSlide.value = 0;
      selectedQuantity.value = 1;

      updateRecentlyViewedAndTrack(product.value);
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
          product: {
            ...product.value,
            discount_price: getDiscountStatus(product.value).active
              ? product.value.discount_price
              : null,
          },
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
      flyer.addEventListener("transitionend", () => flyer.remove(), { once: true });
    }

    trackGtmEvent("add_to_cart", {
      ecommerce: {
        currency: "IDR",
        value: currentActivePrice.value * selectedQuantity.value,
        items: [
          {
            item_id: product.value.id,
            item_name: product.value.name,
            price: currentActivePrice.value,
            item_category: product.value.category?.name || "Accessories",
            item_variant: extractColorName(product.value.name),
            quantity: selectedQuantity.value,
          },
        ],
      },
    });

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

const calculateDiscount = (price, discountPrice) =>
  Math.round(((price - discountPrice) / price) * 100);

const handleZoom = (e) => {
  const img = e.currentTarget.querySelector(".main-product-image");
  if (!img) return;

  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;

  img.style.transformOrigin = `${x}% ${y}%`;
};

const resetZoom = (e) => {
  const img = e.currentTarget.querySelector(".main-product-image");
  if (img) img.style.transformOrigin = "center center";
};

const currentActivePrice = computed(() => {
  if (
    product.value &&
    product.value.discount_price &&
    getDiscountStatus(product.value).active
  ) {
    return parseFloat(product.value.discount_price);
  }
  return parseFloat(product.value ? product.value.price : 0);
});

// onMounted(fetchProductDetail);
onMounted(() => {
  fetchProductDetail();
  fetchUserProfile(); // [BARU] Panggil fungsi untuk mengambil data profil saat komponen dimuat

  // Dengarkan perubahan mata uang
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
