<template>
  <div class="bg-gray-50 min-h-screen py-24 px-6">
    <div
      class="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-gray-100"
    >
      <div class="text-center mb-12">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          {{ t("refund.subtitle") }}
        </p>
        <h1
          class="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-gray-900"
        >
          {{ t("refund.title") }}
        </h1>
      </div>

      <div class="space-y-8 text-gray-600 text-sm leading-relaxed">
        <section v-for="(section, index) in tm('refund.sections')" :key="index">
          <h2 class="text-lg font-bold text-black uppercase tracking-widest mb-3">
            {{ section.heading }}
          </h2>

          <p
            v-for="(paragraph, pIndex) in section.paragraphs"
            :key="pIndex"
            v-html="paragraph"
            :class="{ 'mt-2': pIndex > 0 }"
          ></p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { t, tm } = useI18n();
</script>
