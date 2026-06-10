<template>
  <div class="bg-gray-50 min-h-screen py-24 px-6">
    <div
      class="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-2xl shadow-sm border border-gray-100"
    >
      <div class="text-center mb-12">
        <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
          {{ $t("privacy_policy.solher_title") }}
        </p>
        <h1
          class="font-serif text-3xl md:text-5xl uppercase tracking-tighter text-gray-900"
        >
          {{ $t("privacy_policy.privacy_policy") }}
        </h1>
      </div>

      <div class="space-y-8 text-gray-600 text-sm leading-relaxed">
        <p>
          {{ $t("privacy_policy.cta_1") }}
        </p>

        <section>
          <h2 class="text-lg font-bold text-black uppercase tracking-widest mb-3">
            {{ $t("privacy_policy.first_point") }}
          </h2>
          <p>
            {{ $t("privacy_policy.first_desc") }}
          </p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>
              <strong>{{ $t("privacy_policy.identity_data") }}</strong>
              {{ $t("privacy_policy.first_name_and_last_name") }}
            </li>
            <li>
              <strong>{{ $t("privacy_policy.contact_data") }}</strong>
              {{ $t("privacy_policy.data_contact") }}
            </li>
            <li>
              <strong>{{ $t("privacy_policy.financial_data") }}</strong>
              {{ $t("privacy_policy.data_financial") }}
            </li>
            <li>
              <strong>{{ $t("privacy_policy.transaction_data") }}</strong>
              {{ $t("privacy_policy.data_transaction") }}
            </li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-black uppercase tracking-widest mb-3">
            {{ $t("privacy_policy.second_point") }}
          </h2>
          <p>
            {{ $t("privacy_policy.second_desc") }}
          </p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>
              {{ $t("privacy_policy.delivery_process") }}
            </li>
            <li>
              {{ $t("privacy_policy.manage_relationship") }}
            </li>
            <li>{{ $t("privacy_policy.marketing_communication") }}</li>
          </ul>
        </section>

        <section>
          <h2 class="text-lg font-bold text-black uppercase tracking-widest mb-3">
            {{ $t("privacy_policy.third_point") }}
          </h2>
          <p>
            {{ $t("privacy_policy.third_desc") }}
          </p>
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
