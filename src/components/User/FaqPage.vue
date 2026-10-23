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
