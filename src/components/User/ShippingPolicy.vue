<!-- <template>
  <div class="min-h-screen px-6 py-24 bg-gray-50">
    <div class="max-w-4xl p-10 mx-auto bg-white border border-gray-100 shadow-sm md:p-16 rounded-2xl">
      <div class="mb-12 text-center">
        <p class="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">Solher Indonesia</p>
        <h1 class="font-serif text-3xl tracking-tighter text-gray-900 uppercase md:text-5xl">Shipping Policy</h1>
      </div>
      
      <div class="space-y-8 text-sm leading-relaxed text-gray-600">
        <section>
          <h2 class="mb-3 text-lg font-bold tracking-widest text-black uppercase">1. Processing Time</h2>
          <p>All orders are processed within 1-2 business days (excluding weekends and national holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.</p>
        </section>

        <section>
          <h2 class="mb-3 text-lg font-bold tracking-widest text-black uppercase">2. Shipping Rates & Delivery Estimates</h2>
          <p>We partner with multiple trusted logistics providers to offer you the best rates and delivery times. Shipping charges for your order will be calculated and displayed at checkout based on the volumetric weight of the items and your destination address.</p>
          <ul class="pl-5 mt-2 space-y-1 list-disc">
            <li><strong>Instant/Same Day:</strong> Delivery on the same day if ordered before 14:00 WIB.</li>
            <li><strong>Next Day:</strong> Delivered the next business day.</li>
            <li><strong>Regular:</strong> Typically 2-5 business days depending on your location.</li>
          </ul>
        </section>

        <section>
          <h2 class="mb-3 text-lg font-bold tracking-widest text-black uppercase">3. Order Tracking</h2>
          <p>Once your order is dispatched, you can track its real-time status directly from your "Orders" page in your account dashboard. Please allow up to 24 hours for the tracking portal to update.</p>
        </section>

        <section>
          <h2 class="mb-3 text-lg font-bold tracking-widest text-black uppercase">4. In-Store Pickup</h2>
          <p>You can skip the shipping fees with free local pickup at our physical booth locations or partnered stores (e.g., Kecilung Kitchen & Resto) during special events. After placing your order and selecting local pickup at checkout, your order will be prepared and ready for pick up within 1 business day.</p>
        </section>
      </div>
    </div>
  </div>
</template> -->

<template>
  <div class="bg-gray-50 min-h-screen py-24 px-6">
    <div
      class="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-gray-100"
    >
      <div class="text-center mb-12">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          {{ t("shipping.subtitle") }}
        </p>
        <h1
          class="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-gray-900"
        >
          {{ t("shipping.title") }}
        </h1>
      </div>

      <div class="space-y-8 text-gray-600 text-sm leading-relaxed">
        <section v-for="(section, index) in tm('shipping.sections')" :key="index">
          <h2 class="text-lg font-bold text-black uppercase tracking-widest mb-3">
            {{ section.heading }}
          </h2>
          <p>
            {{ section.content }}
          </p>

          <ul v-if="section.list" class="list-disc pl-5 mt-2 space-y-1">
            <li v-for="(item, i) in section.list" :key="i">
              <strong>{{ item.label }}:</strong> {{ item.desc }}
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";

// Inisialisasi useI18n
const { t, tm } = useI18n();
</script>
