<!-- 
<template>
  <div class="min-h-screen px-6 py-20 bg-white md:px-12 lg:px-24">
    <div class="mx-auto max-w-7xl">
      <h1 class="mb-12 font-serif text-5xl tracking-tight text-gray-900 md:text-6xl">
        Frequently asked questions
      </h1>

      <div class="relative max-w-md mb-16">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search questions..."
          class="w-full py-3 pl-10 pr-4 text-sm transition-all border border-gray-200 outline-none bg-gray-50 focus:bg-white rounded-xl focus:ring-1 focus:ring-black"
        />
      </div>

      <div class="border-t border-gray-200">
        <div
          v-for="(faq, index) in filteredFaqs"
          :key="index"
          class="border-b border-gray-200"
        >
          <button
            @click="toggleFaq(index)"
            class="flex items-center justify-between w-full py-6 text-left group focus:outline-none"
          >
            <span
              class="text-xs font-bold tracking-widest text-gray-900 uppercase transition-colors group-hover:text-gray-500 md:text-sm"
            >
              {{ faq.question }}
            </span>
            <span
              class="text-gray-400 transition-transform duration-500 ease-in-out"
              :class="{ 'rotate-180': activeIndex === index }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>

          <transition name="expand">
            <div v-show="activeIndex === index" class="overflow-hidden">
              <div class="pb-8 pr-12">
                <p class="max-w-3xl text-sm leading-relaxed text-gray-600 md:text-base">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </transition>
        </div>

        <div
          v-if="filteredFaqs.length === 0"
          class="py-20 font-serif italic text-center text-gray-400"
        >
          No questions found matching "{{ searchQuery }}"
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const activeIndex = ref(null);
const searchQuery = ref("");

const faqs = ref([
  {
    question: "What is the return policy?",
    answer:
      "Our goal is for every customer to be totally satisfied with their purchase. If this isn't the case, let us know and we'll do our best to work with you to make it right.",
  },
  {
    question: "Are any purchases final sale?",
    answer:
      "We are unable to accept returns on certain items. These will be carefully marked before purchase.",
  },
  {
    question: "When will I get my order?",
    answer:
      "We will work quickly to ship your order as soon as possible. Once your order has shipped, you will receive an email with further information. Delivery times vary depending on your location.",
  },
  {
    question: "Where are your products manufactured?",
    answer:
      "Our products are manufactured both locally and globally. We carefully select our manufacturing partners to ensure our products are high quality and a fair value.",
  },
  {
    question: "How much does shipping cost?",
    answer:
      "Shipping is calculated based on your location and the items in your order. You will always know the shipping price before you purchase.",
  },
]);

// Logika Pencarian
const filteredFaqs = computed(() => {
  return faqs.value.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&display=swap");

h1 {
  font-family: "Playfair Display", serif;
}

/* --- Animasi Expand (Slide Down/Up) --- */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px; /* Nilai maksimal yang cukup tinggi */
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style> -->

<template>
  <div class="bg-white px-6 md:px-12 lg:px-24 py-20 min-h-screen">
    <div class="mx-auto max-w-7xl">
      <h1 class="mb-12 font-serif text-gray-900 text-5xl md:text-6xl tracking-tight">
        {{ t("faq.title") }}
      </h1>

      <div class="relative mb-16 max-w-md">
        <span class="left-0 absolute inset-y-0 flex items-center pl-3 text-gray-400">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </span>
        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('faq.search_placeholder')"
          class="bg-gray-50 focus:bg-white py-3 pr-4 pl-10 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-black w-full text-sm transition-all"
        />
      </div>

      <div class="border-gray-200 border-t">
        <div
          v-for="(faq, index) in filteredFaqs"
          :key="index"
          class="border-gray-200 border-b"
        >
          <button
            @click="toggleFaq(index)"
            class="group flex justify-between items-center py-6 focus:outline-none w-full text-left"
          >
            <span
              class="font-bold text-gray-900 group-hover:text-gray-500 text-xs md:text-sm uppercase tracking-widest transition-colors"
            >
              {{ faq.question }}
            </span>
            <span
              class="text-gray-400 transition-transform duration-500 ease-in-out"
              :class="{ 'rotate-180': activeIndex === index }"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-4 h-4"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>

          <transition name="expand">
            <div v-show="activeIndex === index" class="overflow-hidden">
              <div class="pr-12 pb-8">
                <p class="max-w-3xl text-gray-600 text-sm md:text-base leading-relaxed">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </transition>
        </div>

        <div
          v-if="filteredFaqs.length === 0"
          class="py-20 font-serif text-gray-400 text-center italic"
        >
          {{ t("faq.no_results") }} "{{ searchQuery }}"
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";

// Inisialisasi i18n (t untuk text string, tm untuk mengambil array/object)
const { t, tm } = useI18n();

const activeIndex = ref(null);
const searchQuery = ref("");

// Mengambil array "items" dari file JSON secara reaktif
const faqs = computed(() => tm("faq.items"));

// Logika Pencarian yang disesuaikan
const filteredFaqs = computed(() => {
  // Pastikan faqs.value adalah array sebelum di-filter
  const currentFaqs = faqs.value || [];

  return currentFaqs.filter((faq) => {
    // Handling antisipasi jika data question/answer undefined
    const q = faq.question ? faq.question.toLowerCase() : "";
    const a = faq.answer ? faq.answer.toLowerCase() : "";
    const search = searchQuery.value.toLowerCase();

    return q.includes(search) || a.includes(search);
  });
});

const toggleFaq = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index;
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&display=swap");

h1 {
  font-family: "Playfair Display", serif;
}

/* --- Animasi Expand (Slide Down/Up) --- */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-10px);
}
</style>
