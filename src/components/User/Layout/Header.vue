<!-- 
<template>
  <div class="fixed top-0 left-0 z-[60] w-full flex flex-col">
    <div
      class="relative w-full h-[48px] md:h-[40px] bg-[#111] text-white flex items-center justify-center overflow-hidden"
    >
      <button
        @click="prevAnnouncement"
        class="absolute p-2 text-gray-400 transition left-2 md:left-4 hover:text-white focus:outline-none"
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

      <div class="flex items-center justify-center w-full h-full px-10 md:px-12">
        <transition name="fade-slide" mode="out-in">
          <p
            :key="currentAnnouncement"
            @click="$router.push('/collections')"
            class="text-[10px] md:text-sm leading-tight md:leading-normal font-serif tracking-widest text-center cursor-pointer hover:text-gray-300 transition-colors w-full max-w-3xl"
          >
            {{ announcements[currentAnnouncement] }}
          </p>
        </transition>
      </div>

      <button
        @click="nextAnnouncement"
        class="absolute p-2 text-gray-400 transition right-2 md:right-4 hover:text-white focus:outline-none"
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
      class="relative z-50 w-full px-6 py-4 bg-white border-b border-gray-200 shadow-sm"
    >
      <div
        class="relative flex items-center justify-between h-8 mx-auto max-w-7xl md:h-12"
      >
        <div class="flex items-center justify-start flex-1">
          <nav
            class="items-center hidden h-full space-x-6 text-xs font-medium tracking-widest uppercase md:flex"
          >
            <div
              class="relative flex items-center h-full"
              @mouseenter="isHomeDropdownOpen = true"
              @mouseleave="isHomeDropdownOpen = false"
            >
              <router-link
                to="/"
                class="transition cursor-pointer hover:text-gray-500"
                :class="{ 'text-gray-500': isHomeDropdownOpen }"
              >
                {{ $t("header.home") }}
              </router-link>

              <transition name="fade-slide">
                <div
                  v-if="isHomeDropdownOpen"
                  class="absolute left-0 w-48 p-4 mt-2 bg-white border border-gray-100 shadow-xl top-full"
                >
                  <div class="flex flex-col space-y-3">
                    <router-link
                      to="/"
                      class="text-[10px] font-bold tracking-widest text-gray-700 uppercase transition hover:text-black"
                    >
                      {{ $t("header.main_home") }}
                    </router-link>
                    <router-link
                      to="/about-us"
                      class="text-[10px] font-bold tracking-widest text-gray-700 uppercase transition hover:text-black"
                    >
                      {{ $t("header.about_us") }}
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>

            <router-link
              to="/best-sellers"
              class="font-bold text-red-600 transition cursor-pointer hover:text-gray-500"
              >{{ $t("header.best_sellers") }}</router-link
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
                >{{ $t("header.collections") }}</router-link
              >
            </div>

            <router-link
              to="/events"
              class="transition cursor-pointer hover:text-gray-500"
              >{{ $t("header.events") }}</router-link
            >

            <router-link
              to="/contact"
              class="transition cursor-pointer hover:text-gray-500"
              >{{ $t("header.contact") }}</router-link
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
          <div class="items-center hidden gap-3 md:flex">
            <button
              @click="toggleLanguage"
              class="text-[10px] font-bold tracking-widest uppercase transition hover:text-black"
              title="Change Language"
            >
              {{ locale === "en" ? "EN" : "ID" }}
            </button>

            <span class="text-gray-300">|</span>

            <div
              class="relative group"
              @mouseenter="isCurrencyDropdownOpen = true"
              @mouseleave="isCurrencyDropdownOpen = false"
            >
              <button
                class="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase transition hover:text-black"
              >
                {{ currencyStore.selectedCurrency }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <transition name="fade-slide">
                <div
                  v-if="isCurrencyDropdownOpen"
                  class="absolute right-0 w-24 py-2 mt-2 bg-white border border-gray-100 shadow-xl top-full"
                >
                  <button
                    v-for="currency in availableCurrencies"
                    :key="currency"
                    @click="changeCurrency(currency)"
                    :class="
                      currencyStore.selectedCurrency === currency
                        ? 'bg-gray-50 text-black font-black'
                        : 'text-gray-500 hover:text-black hover:bg-gray-50'
                    "
                    class="block w-full px-4 py-2 text-[10px] tracking-widest text-left uppercase transition-colors"
                  >
                    {{ currency }}
                  </button>
                </div>
              </transition>
            </div>
          </div>

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
                  ><span class="font-bold text-[10px] uppercase tracking-wider">{{
                    $t("header.orders")
                  }}</span></router-link
                >
                <router-link
                  to="/profilepage"
                  @click="isDropdownOpen = false"
                  class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                  ><span class="font-bold text-[10px] uppercase tracking-wider">{{
                    $t("header.profile")
                  }}</span></router-link
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
                {{ $t("header.categories") }}
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
                    {{ $t("header.all_bags") }}
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
                  >{{ $t("header.view_all") }}</router-link
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
                  @click="navigateToProduct(product)"
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
                      v-if="product.discount_price && getDiscountStatus(product).active"
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
                    {{
                      formatPrice(
                        product.discount_price && getDiscountStatus(product).active
                          ? product.discount_price
                          : product.price
                      )
                    }}
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
                >{{ $t("header.home") }}</router-link
              >
              <router-link
                to="/best-sellers"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-black tracking-widest text-red-600 uppercase transition-colors border-b border-gray-100 hover:text-red-800"
                >{{ $t("header.best_sellers") }}</router-link
              >

              <div class="pb-4 border-b border-gray-100">
                <div class="flex items-center justify-between w-full">
                  <router-link
                    to="/collections"
                    @click="isMobileMenuOpen = false"
                    class="text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors hover:text-gray-500"
                    >{{ $t("header.collections") }}</router-link
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
                      {{ $t("header.all_bags") }}
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
                to="/events"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
                >{{ $t("header.events") }}</router-link
              >

              <router-link
                to="/contact"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
                >{{ $t("header.contact") }}</router-link
              >

              <div
                class="flex items-center justify-between pb-4 border-b border-gray-100"
              >
                <span class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                  {{ $t("header.language") }}
                </span>
                <button
                  @click="toggleLanguage"
                  class="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
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
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  {{ locale === "en" ? "English" : "Bahasa" }}
                </button>

                <select
                  v-model="currencyStore.selectedCurrency"
                  @change="changeCurrency(currencyStore.selectedCurrency)"
                  class="flex-1 px-4 py-3 text-[10px] font-bold tracking-widest text-center uppercase transition-colors bg-gray-100 rounded-lg outline-none appearance-none hover:bg-gray-200 focus:ring-2 focus:ring-black"
                >
                  <option
                    v-for="currency in availableCurrencies"
                    :key="currency"
                    :value="currency"
                  >
                    {{ currency }}
                  </option>
                </select>
              </div>
            </nav>

            <div class="pt-8 mt-auto">
              <div v-if="isAuthenticated" class="p-4 mb-4 bg-gray-50 rounded-xl">
                <p
                  class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
                >
                  {{ $t("header.logged_in") }}
                </p>
                <p class="text-sm font-bold text-gray-900 truncate">
                  {{ userData?.first_name }} {{ userData?.last_name }}
                </p>
                <div class="flex gap-4 mt-3">
                  <router-link
                    to="/orderpage"
                    @click="isMobileMenuOpen = false"
                    class="text-xs font-bold text-blue-600 hover:underline"
                    >{{ $t("header.orders") }}</router-link
                  >
                  <router-link
                    to="/profilepage"
                    @click="isMobileMenuOpen = false"
                    class="text-xs font-bold text-blue-600 hover:underline"
                    >{{ $t("header.profile") }}</router-link
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
  </div>

  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import SearchModal from "../../User/Layout/SearchModal.vue";

import defaultBagIcon from "../../../assets/products/bag_icon.jpg";
import { useCart } from "../../../composables/useCart";
import { BASE_URL } from "../../../config/api";
import { useProductStore } from "../../../composables/useProductStore";
import { useI18n } from "vue-i18n";

// [BARU] Import Pinia Store & Utilitas Currency Eksternal
import { useCurrencyStore } from "../../../stores/currency";
import { formatPrice } from "../../../utils/currency";

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();

// [BARU] Daftar Mata Uang yang Tersedia
const availableCurrencies = ["IDR", "USD", "SGD", "MYR", "EUR", "AUD"];
const isCurrencyDropdownOpen = ref(false);

const changeCurrency = (currency) => {
  currencyStore.selectedCurrency = currency;
  // localStorage.setItem("user_currency", currency);
  localStorage.setItem("currency", currency);
  isCurrencyDropdownOpen.value = false;
};

// const toggleLanguage = () => {
//   locale.value = locale.value === "en" ? "id" : "en";
//   localStorage.setItem("user_lang", locale.value);
// };

const toggleLanguage = () => {
  locale.value = locale.value === "en" ? "id" : "en";
  localStorage.setItem("user_lang", locale.value);

  // Jika bahasa Inggris gunakan USD, jika Indonesia gunakan IDR
  // currencyStore.selectedCurrency = locale.value === "en" ? "USD" : "IDR";
  // PERBAIKAN: Dihapus logika yang memaksa mata uang berubah saat bahasa diganti.
  // Sekarang Bahasa dan Mata Uang sepenuhnya terpisah (decoupled).
};

const route = useRoute();
const router = useRouter();

const isSearchOpen = ref(false);
const openSearch = () => (isSearchOpen.value = true);
const closeSearch = () => (isSearchOpen.value = false);

const isDropdownOpen = ref(false);
const isHomeDropdownOpen = ref(false);
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

// const announcements = [
//   "An Exclusive Welcome Gift: Rp 250K OFF your first order →",
//   "A Little Extra, On Us — Complimentary Shipping Across Indonesia (Min. Rp 1.000.000) →",
// ];

// const announcements = [
//   // Gunakan \u00A0 sebelum tanda panah agar menempel dengan kata sebelumnya
//   "An Exclusive Welcome Gift: Rp 250K OFF your first order\u00A0→",
//   "A Little Extra, On Us — Complimentary Shipping Across Indonesia (Min. Rp 1.000.000)\u00A0→",
// ];

// const announcements = computed(() => t("announcements", {}, { returnObjects: true }));

const announcements = computed(() => [
  t(
    "header.announcement_1",
    "An Exclusive Welcome Gift: Rp 250K OFF your first order\u00A0→"
  ),
  t(
    "header.announcement_2",
    "A Little Extra, On Us — Complimentary Shipping Across Indonesia (Min. Rp 1.000.000)\u00A0→"
  ),
]);

// const nextAnnouncement = () => {
//   currentAnnouncement.value = (currentAnnouncement.value + 1) % announcements.length;
//   resetAnnouncementTimer();
// };

// const prevAnnouncement = () => {
//   currentAnnouncement.value =
//     (currentAnnouncement.value - 1 + announcements.length) % announcements.length;
//   resetAnnouncementTimer();
// };

// const startAnnouncementTimer = () => {
//   announcementTimer = setInterval(() => {
//     currentAnnouncement.value = (currentAnnouncement.value + 1) % announcements.length;
//   }, 3000);
// };

// const resetAnnouncementTimer = () => {
//   clearInterval(announcementTimer);
//   startAnnouncementTimer();
// };

const nextAnnouncement = () => {
  // Tambahkan .value di sini
  currentAnnouncement.value =
    (currentAnnouncement.value + 1) % announcements.value.length;
  resetAnnouncementTimer();
};

const prevAnnouncement = () => {
  // Tambahkan .value di sini
  currentAnnouncement.value =
    (currentAnnouncement.value - 1 + announcements.value.length) %
    announcements.value.length;
  resetAnnouncementTimer();
};

const startAnnouncementTimer = () => {
  announcementTimer = setInterval(() => {
    // Tambahkan .value di sini
    currentAnnouncement.value =
      (currentAnnouncement.value + 1) % announcements.value.length;
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

// const formatPrice = (v) =>
//   new Intl.NumberFormat("id-ID", {
//     style: "currency",
//     currency: "IDR",
//     minimumFractionDigits: 0,
//   }).format(v);

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

// const navigateToProduct = (id) => {
//   closeMegaMenu();
//   router.push(`/product/${id}`);
// };

const navigateToProduct = (product) => {
  closeMegaMenu();
  router.push(`/products/${product.slug || product.id}`);
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

// onMounted(() => {
//   checkAuth();
//   if (isAuthenticated.value) fetchCarts();

//   fetchCategoriesForMegaMenu();

//   window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);
//   window.addEventListener("click", (e) => {
//     if (!e.target.closest(".relative")) isDropdownOpen.value = false;
//   });
//   window.addEventListener("refresh-cart", fetchCarts);
//   window.addEventListener("refresh-chat-badge", fetchUnreadChats);
//   startAnnouncementTimer();
// });

onMounted(async () => {
  checkAuth();
  if (isAuthenticated.value) fetchCarts();
  fetchCategoriesForMegaMenu();

  // [BARU] Ambil data kurs dari backend Laravel dan simpan ke Pinia
  try {
    const res = await axios.get(`${BASE_URL}/exchange-rates`);
    currencyStore.exchangeRates = res.data.data.rates;
  } catch (error) {
    console.error("Gagal memuat data kurs mata uang:", error);
  }

  // [BARU] Set mata uang default menyesuaikan bahasa yang sedang aktif di device/localstorage
  // currencyStore.selectedCurrency = locale.value === "en" ? "USD" : "IDR";

  // [PERBAIKAN] Set mata uang dari localStorage jika ada, jika tidak default ke IDR
  // const savedCurrency = localStorage.getItem("user_currency");
  const savedCurrency = localStorage.getItem("currency");
  if (savedCurrency && availableCurrencies.includes(savedCurrency)) {
    currencyStore.selectedCurrency = savedCurrency;
  } else {
    // Menghapus logika fallback ke locale agar benar-benar terpisah
    currencyStore.selectedCurrency = "IDR";
  }

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
-->

<!-- <template>
  <div class="fixed top-0 left-0 z-[60] w-full flex flex-col">
    <div
      class="relative w-full h-[48px] md:h-[40px] bg-[#111] text-white flex items-center justify-center overflow-hidden"
    >
      <button
        @click="prevAnnouncement"
        class="absolute p-2 text-gray-400 transition left-2 md:left-4 hover:text-white focus:outline-none"
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

      <div class="flex items-center justify-center w-full h-full px-10 md:px-12">
        <transition name="fade-slide" mode="out-in">
          <p
            :key="currentAnnouncement"
            @click="$router.push('/collections')"
            class="text-[10px] md:text-sm leading-tight md:leading-normal font-serif tracking-widest text-center cursor-pointer hover:text-gray-300 transition-colors w-full max-w-3xl"
          >
            {{ announcements[currentAnnouncement] }}
          </p>
        </transition>
      </div>

      <button
        @click="nextAnnouncement"
        class="absolute p-2 text-gray-400 transition right-2 md:right-4 hover:text-white focus:outline-none"
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
      class="relative z-50 w-full px-6 py-4 bg-white border-b border-gray-200 shadow-sm"
    >
      <div
        class="relative flex items-center justify-between h-8 mx-auto max-w-7xl md:h-12"
      >
        <div class="flex items-center justify-start flex-1">
          <nav
            class="items-center hidden h-full space-x-6 text-xs font-medium tracking-widest uppercase md:flex"
          >
            <div
              class="relative flex items-center h-full"
              @mouseenter="isHomeDropdownOpen = true"
              @mouseleave="isHomeDropdownOpen = false"
            >
              <router-link
                to="/"
                class="transition cursor-pointer hover:text-gray-500"
                :class="{ 'text-gray-500': isHomeDropdownOpen }"
              >
                {{ $t("header.home") }}
              </router-link>

              <transition name="fade-slide">
                <div
                  v-if="isHomeDropdownOpen"
                  class="absolute left-0 w-48 p-4 mt-2 bg-white border border-gray-100 shadow-xl top-full"
                >
                  <div class="flex flex-col space-y-3">
                    <router-link
                      to="/"
                      class="text-[10px] font-bold tracking-widest text-gray-700 uppercase transition hover:text-black"
                    >
                      {{ $t("header.main_home") }}
                    </router-link>
                    <router-link
                      to="/about-us"
                      class="text-[10px] font-bold tracking-widest text-gray-700 uppercase transition hover:text-black"
                    >
                      {{ $t("header.about_us") }}
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>

            <router-link
              to="/best-sellers"
              class="font-bold text-red-600 transition cursor-pointer hover:text-gray-500"
              >{{ $t("header.best_sellers") }}</router-link
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
                >{{ $t("header.collections") }}</router-link
              >
            </div>

            <router-link
              to="/events"
              class="transition cursor-pointer hover:text-gray-500"
              >{{ $t("header.events") }}</router-link
            >

            <router-link
              to="/contact"
              class="transition cursor-pointer hover:text-gray-500"
              >{{ $t("header.contact") }}</router-link
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
          <div class="items-center hidden gap-3 md:flex">
            <button
              @click="toggleLanguage"
              class="text-[10px] font-bold tracking-widest uppercase transition hover:text-black"
              title="Change Language"
            >
              {{ locale === "en" ? "EN" : "ID" }}
            </button>

            <span class="text-gray-300">|</span>

            <div
              class="relative group"
              @mouseenter="isCurrencyDropdownOpen = true"
              @mouseleave="isCurrencyDropdownOpen = false"
            >
              <button
                class="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase transition hover:text-black"
              >
                {{ currentCurrency }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <transition name="fade-slide">
                <div
                  v-if="isCurrencyDropdownOpen"
                  class="absolute right-0 w-24 py-2 mt-2 bg-white border border-gray-100 shadow-xl top-full"
                >
                  <button
                    v-for="currency in availableCurrencies"
                    :key="currency"
                    @click="changeCurrency(currency)"
                    :class="
                      currentCurrency === currency
                        ? 'bg-gray-50 text-black font-black'
                        : 'text-gray-500 hover:text-black hover:bg-gray-50'
                    "
                    class="block w-full px-4 py-2 text-[10px] tracking-widest text-left uppercase transition-colors"
                  >
                    {{ currency }}
                  </button>
                </div>
              </transition>
            </div>
          </div>

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
                  ><span class="font-bold text-[10px] uppercase tracking-wider">{{
                    $t("header.orders")
                  }}</span></router-link
                >
                <router-link
                  to="/profilepage"
                  @click="isDropdownOpen = false"
                  class="flex items-center justify-center py-3 space-x-2 transition bg-gray-100 hover:bg-gray-200"
                  ><span class="font-bold text-[10px] uppercase tracking-wider">{{
                    $t("header.profile")
                  }}</span></router-link
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
                {{ $t("header.categories") }}
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
                    {{ $t("header.all_bags") }}
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
                  >{{ $t("header.view_all") }}</router-link
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
                  @click="navigateToProduct(product)"
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
                      v-if="
                        getDiscountToDisplay(product) && getDiscountStatus(product).active
                      "
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
                    {{
                      formatCurrencyDisplay(
                        getDiscountToDisplay(product) && getDiscountStatus(product).active
                          ? getDiscountToDisplay(product)
                          : getPriceToDisplay(product)
                      )
                    }}
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
                >{{ $t("header.home") }}</router-link
              >
              <router-link
                to="/best-sellers"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-black tracking-widest text-red-600 uppercase transition-colors border-b border-gray-100 hover:text-red-800"
                >{{ $t("header.best_sellers") }}</router-link
              >

              <div class="pb-4 border-b border-gray-100">
                <div class="flex items-center justify-between w-full">
                  <router-link
                    to="/collections"
                    @click="isMobileMenuOpen = false"
                    class="text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors hover:text-gray-500"
                    >{{ $t("header.collections") }}</router-link
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
                      {{ $t("header.all_bags") }}
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
                to="/events"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
                >{{ $t("header.events") }}</router-link
              >

              <router-link
                to="/contact"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
                >{{ $t("header.contact") }}</router-link
              >

              <div
                class="flex items-center justify-between pb-4 border-b border-gray-100"
              >
                <span class="text-sm font-bold tracking-widest text-gray-900 uppercase">
                  {{ $t("header.language") }}
                </span>
                <button
                  @click="toggleLanguage"
                  class="flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
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
                      d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
                    />
                  </svg>
                  {{ locale === "en" ? "English" : "Bahasa" }}
                </button>

                <select
                  v-model="currentCurrency"
                  @change="changeCurrency(currentCurrency)"
                  class="flex-1 px-4 py-3 text-[10px] font-bold tracking-widest text-center uppercase transition-colors bg-gray-100 rounded-lg outline-none appearance-none hover:bg-gray-200 focus:ring-2 focus:ring-black ml-2"
                >
                  <option
                    v-for="currency in availableCurrencies"
                    :key="currency"
                    :value="currency"
                  >
                    {{ currency }}
                  </option>
                </select>
              </div>
            </nav>

            <div class="pt-8 mt-auto">
              <div v-if="isAuthenticated" class="p-4 mb-4 bg-gray-50 rounded-xl">
                <p
                  class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1"
                >
                  {{ $t("header.logged_in") }}
                </p>
                <p class="text-sm font-bold text-gray-900 truncate">
                  {{ userData?.first_name }} {{ userData?.last_name }}
                </p>
                <div class="flex gap-4 mt-3">
                  <router-link
                    to="/orderpage"
                    @click="isMobileMenuOpen = false"
                    class="text-xs font-bold text-blue-600 hover:underline"
                    >{{ $t("header.orders") }}</router-link
                  >
                  <router-link
                    to="/profilepage"
                    @click="isMobileMenuOpen = false"
                    class="text-xs font-bold text-blue-600 hover:underline"
                    >{{ $t("header.profile") }}</router-link
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
  </div>

  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import SearchModal from "../../User/Layout/SearchModal.vue";

import defaultBagIcon from "../../../assets/products/bag_icon.jpg";
import { useCart } from "../../../composables/useCart";
import { BASE_URL } from "../../../config/api";
import { useProductStore } from "../../../composables/useProductStore";
import { useI18n } from "vue-i18n";
import { useCurrencyStore } from "../../../stores/currency";

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();

const availableCurrencies = ["IDR", "USD", "SGD", "MYR", "EUR", "AUD"];
const isCurrencyDropdownOpen = ref(false);

// 👇 [BARU] Setup state currentCurrency yang reaktif 👇
const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
  currencyStore.selectedCurrency = currentCurrency.value;
};

const changeCurrency = (currency) => {
  currentCurrency.value = currency;
  currencyStore.selectedCurrency = currency;
  localStorage.setItem("currency", currency);
  isCurrencyDropdownOpen.value = false;

  // Pancarkan event agar semua komponen yang memantau ikut berubah
  window.dispatchEvent(new Event("currency-changed"));
};

const toggleLanguage = () => {
  locale.value = locale.value === "en" ? "id" : "en";
  localStorage.setItem("user_lang", locale.value);
};

const route = useRoute();
const router = useRouter();

const isSearchOpen = ref(false);
const openSearch = () => (isSearchOpen.value = true);
const closeSearch = () => (isSearchOpen.value = false);

const isDropdownOpen = ref(false);
const isHomeDropdownOpen = ref(false);
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
  } catch (error) {}
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

const currentAnnouncement = ref(0);
let announcementTimer = null;

const announcements = computed(() => [
  t(
    "header.announcement_1",
    "An Exclusive Welcome Gift: Rp 250K OFF your first order\u00A0→"
  ),
  t(
    "header.announcement_2",
    "A Little Extra, On Us — Complimentary Shipping Across Indonesia (Min. Rp 1.000.000)\u00A0→"
  ),
]);

const nextAnnouncement = () => {
  currentAnnouncement.value =
    (currentAnnouncement.value + 1) % announcements.value.length;
  resetAnnouncementTimer();
};

const prevAnnouncement = () => {
  currentAnnouncement.value =
    (currentAnnouncement.value - 1 + announcements.value.length) %
    announcements.value.length;
  resetAnnouncementTimer();
};

const startAnnouncementTimer = () => {
  announcementTimer = setInterval(() => {
    currentAnnouncement.value =
      (currentAnnouncement.value + 1) % announcements.value.length;
  }, 3000);
};

const resetAnnouncementTimer = () => {
  clearInterval(announcementTimer);
  startAnnouncementTimer();
};

const isMegaMenuOpen = ref(false);
const megaMenuTimer = ref(null);
const activeMegaCategory = ref("all");
const categories = ref([]);
const isMegaMenuLoading = ref(false);
const randomMegaProducts = ref([]);

// ==========================================
// [BARU] FUNGSI HELPER MULTI-CURRENCY
// ==========================================
const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setHours(date.getHours() - 7);
  return date;
};

const getPriceToDisplay = (product) => {
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

const getDiscountToDisplay = (product) => {
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

const getDiscountStatus = (p) => {
  const discObj = getDiscountToDisplay(p);
  if (!p || !discObj || !discObj.value)
    return { active: false, upcoming: false, expired: false };

  const now = new Date();
  let active = true;
  let upcoming = false;
  let expired = false;

  if (p.discount_start_date) {
    const startDate = convertToWIB(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }
  if (p.discount_end_date) {
    const endDate = convertToWIB(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }

  return { active, upcoming, expired };
};

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
// ==========================================

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

const navigateToProduct = (product) => {
  closeMegaMenu();
  router.push(`/products/${product.slug || product.id}`);
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

onMounted(async () => {
  checkAuth();
  if (isAuthenticated.value) fetchCarts();
  fetchCategoriesForMegaMenu();

  try {
    const res = await axios.get(`${BASE_URL}/exchange-rates`);
    currencyStore.exchangeRates = res.data.data.rates;
  } catch (error) {}

  updateCurrencyState();

  // Mencegat (Intercept) setItem di localStorage
  if (!window.isLocalStorageOverride) {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "currency") {
        window.dispatchEvent(new Event("currency-changed"));
      }
    };
    window.isLocalStorageOverride = true;
  }

  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });

  window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });
  window.addEventListener("refresh-cart", fetchCarts);
  window.addEventListener("refresh-chat-badge", fetchUnreadChats);
  startAnnouncementTimer();
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
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
</style> -->

<template>
  <div class="fixed top-0 left-0 z-[60] w-full flex flex-col">
    <!-- Announcement Bar -->
    <div
      class="relative w-full h-[48px] md:h-[40px] bg-[#111] text-white flex items-center justify-center overflow-hidden"
    >
      <button
        @click="prevAnnouncement"
        class="absolute p-2 text-gray-400 transition left-2 md:left-4 hover:text-white focus:outline-none"
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

      <div class="flex items-center justify-center w-full h-full px-10 md:px-12">
        <transition name="fade-slide" mode="out-in">
          <p
            :key="currentAnnouncement"
            @click="$router.push('/collections')"
            class="text-[10px] md:text-sm leading-tight md:leading-normal font-serif tracking-widest text-center cursor-pointer hover:text-gray-300 transition-colors w-full max-w-3xl"
          >
            {{ announcements[currentAnnouncement] }}
          </p>
        </transition>
      </div>

      <button
        @click="nextAnnouncement"
        class="absolute p-2 text-gray-400 transition right-2 md:right-4 hover:text-white focus:outline-none"
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

    <!-- Main Navigation Header -->
    <header
      class="relative z-50 w-full px-6 py-4 bg-white border-b border-gray-200 shadow-sm"
    >
      <div
        class="relative flex items-center justify-between h-8 mx-auto max-w-7xl md:h-12"
      >
        <!-- Left: Nav Links -->
        <div class="flex items-center justify-start flex-1">
          <nav
            class="items-center hidden h-full space-x-6 text-[10px] font-bold tracking-widest uppercase md:flex"
          >
            <!-- Home -->
            <div
              class="relative flex items-center h-full"
              @mouseenter="isHomeDropdownOpen = true"
              @mouseleave="isHomeDropdownOpen = false"
            >
              <router-link
                to="/"
                class="transition cursor-pointer hover:text-gray-500"
                :class="{ 'text-gray-500': isHomeDropdownOpen }"
              >
                {{ $t("header.home") }}
              </router-link>
              <transition name="fade-slide">
                <div
                  v-if="isHomeDropdownOpen"
                  class="absolute left-0 w-48 p-4 mt-2 bg-white border border-gray-100 shadow-xl top-full"
                >
                  <div class="flex flex-col space-y-3">
                    <router-link
                      to="/"
                      class="text-[10px] font-bold tracking-widest text-gray-700 uppercase transition hover:text-black"
                    >
                      {{ $t("header.main_home") }}
                    </router-link>
                    <router-link
                      to="/about-us"
                      class="text-[10px] font-bold tracking-widest text-gray-700 uppercase transition hover:text-black"
                    >
                      {{ $t("header.about_us") }}
                    </router-link>
                  </div>
                </div>
              </transition>
            </div>

            <!-- Collections (Mega Menu Trigger) -->
            <div
              class="relative flex items-center h-full"
              @mouseenter="openMegaMenu"
              @mouseleave="closeMegaMenu"
            >
              <span
                class="transition cursor-pointer hover:text-gray-500"
                :class="{ 'text-gray-500': isMegaMenuOpen }"
              >
                {{ $t("header.collections") }}
              </span>
            </div>

            <router-link
              to="/events"
              class="transition cursor-pointer hover:text-gray-500"
            >
              {{ $t("header.events") }}
            </router-link>

            <router-link
              to="/contact"
              class="transition cursor-pointer hover:text-gray-500"
            >
              {{ $t("header.contact") }}
            </router-link>
          </nav>

          <!-- Mobile Hamburger -->
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

        <!-- Center: Logo -->
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

        <!-- Right: Actions (Language, Currency, Search, User, Cart) -->
        <div
          class="flex items-center justify-end flex-1 space-x-4 text-gray-700 md:space-x-5"
        >
          <div class="items-center hidden gap-3 md:flex">
            <button
              @click="toggleLanguage"
              class="text-[10px] font-bold tracking-widest uppercase transition hover:text-black"
              title="Change Language"
            >
              {{ locale === "en" ? "EN" : "ID" }}
            </button>
            <span class="text-gray-300">|</span>
            <div
              class="relative group"
              @mouseenter="isCurrencyDropdownOpen = true"
              @mouseleave="isCurrencyDropdownOpen = false"
            >
              <button
                class="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase transition hover:text-black"
              >
                {{ currentCurrency }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <transition name="fade-slide">
                <div
                  v-if="isCurrencyDropdownOpen"
                  class="absolute right-0 w-24 py-2 mt-2 bg-white border border-gray-100 shadow-xl top-full"
                >
                  <button
                    v-for="currency in availableCurrencies"
                    :key="currency"
                    @click="changeCurrency(currency)"
                    :class="
                      currentCurrency === currency
                        ? 'bg-gray-50 text-black font-black'
                        : 'text-gray-500 hover:text-black hover:bg-gray-50'
                    "
                    class="block w-full px-4 py-2 text-[10px] tracking-widest text-left uppercase transition-colors"
                  >
                    {{ currency }}
                  </button>
                </div>
              </transition>
            </div>
          </div>

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
            <!-- User Dropdown (Omitted for brevity, assuming standard from original code) -->
            <div
              v-if="isDropdownOpen"
              class="top-full right-0 z-[60] absolute bg-white shadow-xl mt-4 p-6 border border-gray-100 w-64 animate-fade-in"
            >
              <div v-if="isAuthenticated" class="text-left">
                <h3
                  class="text-sm font-bold tracking-tight text-black uppercase truncate"
                >
                  HI {{ userData?.first_name }}
                </h3>
                <p class="mb-4 text-xs text-gray-500 truncate">{{ userData?.email }}</p>
              </div>
              <div v-else>
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
                  class="flex items-center justify-center py-3 transition bg-gray-100 hover:bg-gray-200"
                  ><span class="font-bold text-[10px] uppercase tracking-wider"
                    >Orders</span
                  ></router-link
                >
                <router-link
                  to="/profilepage"
                  @click="isDropdownOpen = false"
                  class="flex items-center justify-center py-3 transition bg-gray-100 hover:bg-gray-200"
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
        </div>
      </div>

      <!-- 👇 EDITORIAL MEGA MENU (CRO) 👇 -->
      <transition name="mega-menu-fade">
        <div
          v-if="isMegaMenuOpen"
          class="absolute left-0 hidden w-full bg-white border-t border-gray-100 shadow-2xl top-full md:block"
          @mouseenter="keepMegaMenuOpen"
          @mouseleave="closeMegaMenu"
        >
          <div
            class="mx-auto max-w-[1400px] flex px-8 py-12 justify-between min-h-[400px]"
          >
            <div
              v-if="isMegaMenuLoading"
              class="absolute inset-0 z-10 flex items-center justify-center bg-white/80"
            >
              <div
                class="w-8 h-8 border-2 border-gray-200 rounded-full border-t-black animate-spin"
              ></div>
            </div>

            <!-- Links Grid (70% Width) -->
            <div class="grid grid-cols-4 gap-12 w-2/3">
              <!-- Column 1: Featured -->
              <div class="flex flex-col space-y-4">
                <h3 class="font-serif text-base text-gray-900 mb-2">Featured</h3>
                <router-link
                  to="/best-sellers"
                  @click="closeMegaMenu"
                  class="text-[13px] text-gray-500 hover:text-black transition-colors"
                  >Best Sellers</router-link
                >
                <router-link
                  to="/collections?filter=new-arrivals"
                  @click="closeMegaMenu"
                  class="text-[13px] text-gray-500 hover:text-black transition-colors"
                  >New Arrivals</router-link
                >
                <router-link
                  to="/collections?filter=final-sale"
                  @click="closeMegaMenu"
                  class="text-[13px] text-gray-500 hover:text-black transition-colors"
                  >Final Sale</router-link
                >
              </div>

              <!-- Column 2: Bags (Dari tabel bag_categories) -->
              <div class="flex flex-col space-y-4">
                <h3 class="font-serif text-base text-gray-900 mb-2">Bags</h3>
                <button
                  @click="goToCollection('all')"
                  class="text-[13px] text-left text-gray-500 hover:text-black transition-colors"
                >
                  All Bags
                </button>
                <button
                  v-for="bag in bagCategories"
                  :key="bag.id"
                  @click="goToBagCategory(bag.name)"
                  class="text-[13px] text-left text-gray-500 hover:text-black transition-colors"
                >
                  {{ bag.name }}
                </button>
              </div>

              <!-- Column 3: Collections (Dari tabel categories, excl C005) -->
              <div class="flex flex-col space-y-4">
                <h3 class="font-serif text-base text-gray-900 mb-2">Collections</h3>
                <button
                  v-for="cat in normalCategories"
                  :key="cat.id"
                  @click="goToCollection(cat.category_name)"
                  class="text-[13px] text-left text-gray-500 hover:text-black transition-colors"
                >
                  {{ cat.category_name }}
                </button>
              </div>

              <!-- Column 4: Accessories (Hanya C005) -->
              <div class="flex flex-col space-y-4">
                <h3 class="font-serif text-base text-gray-900 mb-2">Accessories</h3>
                <button
                  @click="
                    goToCollection(accessoriesCategory?.category_name || 'Accessories')
                  "
                  class="text-[13px] text-left text-gray-500 hover:text-black transition-colors"
                >
                  All Accessories
                </button>
              </div>
            </div>

            <!-- Highlight Image (30% Width) -->
            <div class="w-1/3 flex justify-end pl-10 border-l border-gray-100">
              <div
                class="relative w-full max-w-[320px] h-[380px] bg-gray-100 cursor-pointer overflow-hidden group"
                @click="
                  randomMegaProduct
                    ? navigateToProduct(randomMegaProduct)
                    : goToCollection('all')
                "
              >
                <img
                  :src="randomMegaProduct?.image || defaultBagIcon"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <!-- Gradient Overlay & Text -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                ></div>
                <div
                  class="absolute bottom-6 left-6 text-white font-serif text-2xl tracking-wide opacity-90 drop-shadow-md"
                >
                  {{ randomMegaProduct?.category?.name || "Latest Collection" }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <!-- 👆 AKHIR MEGA MENU 👆 -->

      <!-- Mobile Menu (Diringkas agar sinkron) -->
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
                >{{ $t("header.home") }}</router-link
              >
              <router-link
                to="/best-sellers"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-black tracking-widest text-red-600 uppercase transition-colors border-b border-gray-100 hover:text-red-800"
                >{{ $t("header.best_sellers") }}</router-link
              >
              <router-link
                to="/collections"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
                >{{ $t("header.collections") }}</router-link
              >
              <router-link
                to="/events"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
                >{{ $t("header.events") }}</router-link
              >
              <router-link
                to="/contact"
                @click="isMobileMenuOpen = false"
                class="pb-4 text-sm font-bold tracking-widest text-gray-900 uppercase transition-colors border-b border-gray-100 hover:text-gray-500"
                >{{ $t("header.contact") }}</router-link
              >
            </nav>
          </div>
        </div>
      </transition>
    </header>
  </div>

  <SearchModal v-if="isSearchOpen" @close="closeSearch" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import axios from "axios";
import SearchModal from "../../User/Layout/SearchModal.vue";
import defaultBagIcon from "../../../assets/products/bag_icon.jpg";
import { useCart } from "../../../composables/useCart";
import { BASE_URL } from "../../../config/api";
import { useProductStore } from "../../../composables/useProductStore";
import { useI18n } from "vue-i18n";
import { useCurrencyStore } from "../../../stores/currency";

const { t, locale } = useI18n();
const currencyStore = useCurrencyStore();

const availableCurrencies = ["IDR", "USD", "SGD", "MYR", "EUR", "AUD"];
const isCurrencyDropdownOpen = ref(false);

const currentCurrency = ref(localStorage.getItem("currency") || "IDR");

const updateCurrencyState = () => {
  currentCurrency.value = localStorage.getItem("currency") || "IDR";
  currencyStore.selectedCurrency = currentCurrency.value;
};

const changeCurrency = (currency) => {
  currentCurrency.value = currency;
  currencyStore.selectedCurrency = currency;
  localStorage.setItem("currency", currency);
  isCurrencyDropdownOpen.value = false;
  window.dispatchEvent(new Event("currency-changed"));
};

const toggleLanguage = () => {
  locale.value = locale.value === "en" ? "id" : "en";
  localStorage.setItem("user_lang", locale.value);
};

const route = useRoute();
const router = useRouter();

const isSearchOpen = ref(false);
const openSearch = () => (isSearchOpen.value = true);
const closeSearch = () => (isSearchOpen.value = false);

const isDropdownOpen = ref(false);
const isHomeDropdownOpen = ref(false);
const isAuthenticated = ref(false);
const userData = ref(null);
const isMobileMenuOpen = ref(false);

const { cartCount, fetchCarts, handleOptimisticAdd } = useCart();
const { state: productState, fetchCollectionsData } = useProductStore();
const isBadgePopping = ref(false);

const totalUnreadChats = ref(0);

const currentAnnouncement = ref(0);
let announcementTimer = null;

const announcements = computed(() => [
  t("header.announcement_1", "An Exclusive Welcome Gift: Rp 250K OFF your first order →"),
  t(
    "header.announcement_2",
    "A Little Extra, On Us — Complimentary Shipping Across Indonesia (Min. Rp 1.000.000) →"
  ),
]);

const nextAnnouncement = () => {
  currentAnnouncement.value =
    (currentAnnouncement.value + 1) % announcements.value.length;
  resetAnnouncementTimer();
};

const prevAnnouncement = () => {
  currentAnnouncement.value =
    (currentAnnouncement.value - 1 + announcements.value.length) %
    announcements.value.length;
  resetAnnouncementTimer();
};

const startAnnouncementTimer = () => {
  announcementTimer = setInterval(() => {
    currentAnnouncement.value =
      (currentAnnouncement.value + 1) % announcements.value.length;
  }, 3000);
};

const resetAnnouncementTimer = () => {
  clearInterval(announcementTimer);
  startAnnouncementTimer();
};

// ==========================================
// LOGIKA MEGA MENU BARU (CRO)
// ==========================================
const isMegaMenuOpen = ref(false);
const megaMenuTimer = ref(null);
const categories = ref([]);
const bagCategories = ref([]);
const isMegaMenuLoading = ref(false);

// Filter Kategorisasi
const normalCategories = computed(() => {
  return categories.value.filter((c) => c.code !== "C005");
});

const accessoriesCategory = computed(() => {
  return categories.value.find((c) => c.code === "C005");
});

// Pilih satu produk acak untuk gambar kanan
const randomMegaProduct = computed(() => {
  if (!productState.collectionsProducts || productState.collectionsProducts.length === 0)
    return null;
  const products = productState.collectionsProducts;
  return products[Math.floor(Math.random() * products.length)];
});

const fetchCategoriesForMegaMenu = async () => {
  if (categories.value.length > 0 && bagCategories.value.length > 0) return;
  isMegaMenuLoading.value = true;
  try {
    const [catRes, bagCatRes] = await Promise.all([
      axios.get(`${BASE_URL}/guest/categories`),
      // Hit endpoint publik bag-categories (asumsikan endpoint ini sudah dibuat di rute public/guest)
      // Jika belum tersedia, tambahkan catch agar tidak merusak render categories biasa
      axios.get(`${BASE_URL}/bag-categories`).catch(() => ({ data: { data: [] } })),
    ]);

    categories.value = catRes.data.data || catRes.data;
    bagCategories.value = bagCatRes.data.data || bagCatRes.data;
  } catch (error) {
    console.error("Gagal menarik kategori menu:", error);
  } finally {
    isMegaMenuLoading.value = false;
  }
};

const openMegaMenu = async () => {
  clearTimeout(megaMenuTimer.value);
  isMegaMenuOpen.value = true;
  isDropdownOpen.value = false;
  fetchCategoriesForMegaMenu();
  if (!productState.isCollectionsLoaded) {
    try {
      await fetchCollectionsData();
    } catch (e) {}
  }
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

// Fungsi Baru: Navigasi Bag Categories
const goToBagCategory = (bagName) => {
  closeMegaMenu();
  router.push({ path: "/collections", query: { bag_category: bagName } });
};

const navigateToProduct = (product) => {
  closeMegaMenu();
  router.push(`/products/${product.slug || product.id}`);
};

// ==========================================

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

onMounted(async () => {
  checkAuth();
  if (isAuthenticated.value) fetchCarts();
  fetchCategoriesForMegaMenu();

  try {
    const res = await axios.get(`${BASE_URL}/exchange-rates`);
    currencyStore.exchangeRates = res.data.data.rates;
  } catch (error) {}

  updateCurrencyState();

  if (!window.isLocalStorageOverride) {
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function (key, value) {
      originalSetItem.apply(this, arguments);
      if (key === "currency") {
        window.dispatchEvent(new Event("currency-changed"));
      }
    };
    window.isLocalStorageOverride = true;
  }

  window.addEventListener("currency-changed", updateCurrencyState);
  window.addEventListener("storage", (e) => {
    if (e.key === "currency") updateCurrencyState();
  });

  window.addEventListener("optimistic-add-to-cart", onAddToCartEvent);
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".relative")) isDropdownOpen.value = false;
  });
  window.addEventListener("refresh-cart", fetchCarts);
  startAnnouncementTimer();
});

onUnmounted(() => {
  window.removeEventListener("currency-changed", updateCurrencyState);
  window.removeEventListener("optimistic-add-to-cart", onAddToCartEvent);
  clearInterval(announcementTimer);
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
  transition: opacity 0.3s ease, transform 0.3s ease;
  transform-origin: top;
}
.mega-menu-fade-enter-from,
.mega-menu-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px) scaleY(0.98);
}
</style>
