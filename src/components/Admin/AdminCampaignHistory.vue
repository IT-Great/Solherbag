<template>
  <div class="p-8 mx-auto max-w-7xl animate-fade-in">
    <div
      class="flex items-end justify-between pb-6 mb-8 border-b border-gray-200"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Campaign Analytics</h1>
        <p class="mt-1 text-sm text-gray-500">
          Pantau performa dan tingkat keterbacaan (Open Rate) dari setiap email
          promosi yang dikirim.
        </p>
      </div>
      <router-link
        to="/admin/newsletters/create"
        class="flex items-center gap-2 px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition-all bg-black shadow-sm rounded-xl hover:bg-gray-800"
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
            d="M12 4v16m8-8H4"
          />
        </svg>
        Buat Campaign
      </router-link>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
      <div class="p-6 bg-white border border-gray-100 shadow-sm rounded-2xl">
        <p
          class="mb-1 text-xs font-bold tracking-widest text-gray-400 uppercase"
        >
          Total Kampanye
        </p>
        <p class="text-4xl font-black text-gray-900">
          {{ stats.totalCampaigns }}
        </p>
      </div>
      <div class="p-6 bg-white border border-blue-100 shadow-sm rounded-2xl">
        <p
          class="mb-1 text-xs font-bold tracking-widest text-blue-500 uppercase"
        >
          Total Email Terkirim
        </p>
        <p class="text-4xl font-black text-blue-700">{{ stats.totalSent }}</p>
      </div>
      <div class="p-6 bg-white border shadow-sm border-emerald-100 rounded-2xl">
        <p
          class="mb-1 text-xs font-bold tracking-widest uppercase text-emerald-500"
        >
          Rata-rata Open Rate
        </p>
        <div class="flex items-end gap-2">
          <p class="text-4xl font-black text-emerald-700">
            {{ stats.avgOpenRate }}%
          </p>
          <span
            v-if="stats.avgOpenRate > 20"
            class="mb-1 text-xs font-bold text-emerald-600"
            >Performa Baik 🚀</span
          >
          <span v-else class="mb-1 text-xs font-bold text-amber-500"
            >Perlu Ditingkatkan</span
          >
        </div>
      </div>
    </div>

    <!-- Data Table -->
    <div
      class="overflow-hidden bg-white border border-gray-100 shadow-sm rounded-2xl"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <!-- <thead>
            <tr class="text-[10px] font-bold tracking-widest text-gray-400 uppercase bg-gray-50 border-b border-gray-100">
              <th class="p-5">Tanggal Pengiriman</th>
              <th class="p-5">Subjek / Nama Kampanye</th>
              <th class="p-5 text-center">Penerima</th>
              <th class="p-5 text-center">Dibaca</th>
              <th class="w-48 p-5">Open Rate</th>
            </tr>
          </thead> -->

          <thead>
            <tr
              class="text-[10px] font-bold tracking-widest text-gray-400 uppercase bg-gray-50 border-b border-gray-100"
            >
              <th class="p-5">Tanggal Pengiriman</th>
              <th class="p-5">Subjek / Nama Kampanye</th>
              <th class="p-5 text-center">Penerima</th>
              <th class="p-5 text-center">Dibaca</th>
              <!-- 👇 Kolom Baru CTR 👇 -->
              <th class="p-5 text-center">Diklik (CTR)</th>
              <th class="w-48 p-5">Open Rate</th>
            </tr>
          </thead>

          <tbody v-if="isLoading">
            <tr
              v-for="i in 3"
              :key="'skeleton-' + i"
              class="border-b border-gray-50 animate-pulse"
            >
              <td class="p-5 text-center">
                <span
                  class="px-3 py-1 text-xs font-bold text-blue-700 rounded-lg bg-blue-50"
                >
                  {{ campaign.opened_count }}
                </span>
              </td>
              <!-- 👇 Data Baru CTR 👇 -->
              <td class="p-5 text-center">
                <span
                  class="px-3 py-1 text-xs font-bold rounded-lg text-emerald-700 bg-emerald-50"
                >
                  {{ campaign.clicked_count }} ({{ campaign.click_rate }}%)
                </span>
              </td>
              <!-- 👆 Data Baru CTR 👆 -->
              <td class="p-5">
                <div class="w-24 h-4 bg-gray-200 rounded"></div>
              </td>
              <td class="p-5">
                <div class="w-48 h-4 bg-gray-200 rounded"></div>
              </td>
              <td class="p-5">
                <div class="w-12 h-4 mx-auto bg-gray-200 rounded"></div>
              </td>
              <td class="p-5">
                <div class="w-12 h-4 mx-auto bg-gray-200 rounded"></div>
              </td>
              <td class="p-5">
                <div class="w-full h-4 bg-gray-200 rounded"></div>
              </td>
            </tr>
          </tbody>

          <tbody v-else class="text-sm text-gray-600">
            <tr v-if="campaigns.length === 0">
              <td colspan="5" class="py-12 italic text-center text-gray-400">
                Belum ada kampanye newsletter yang dikirim.
              </td>
            </tr>
            <tr
              v-for="campaign in campaigns"
              :key="campaign.id"
              class="transition-colors border-b border-gray-50 hover:bg-gray-50"
            >
              <td class="p-5 text-xs text-gray-400 whitespace-nowrap">
                {{ campaign.date }}
              </td>
              <td class="p-5 font-medium text-gray-900">
                {{ campaign.subject }}
              </td>
              <td class="p-5 text-center">
                <span
                  class="px-3 py-1 text-xs font-bold text-gray-700 bg-gray-100 rounded-lg"
                >
                  {{ campaign.sent_count }}
                </span>
              </td>
              <td class="p-5 text-center">
                <span
                  class="px-3 py-1 text-xs font-bold text-blue-700 rounded-lg bg-blue-50"
                >
                  {{ campaign.opened_count }}
                </span>
              </td>
              <td class="p-5">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-bold text-gray-700"
                    >{{ campaign.open_rate }}%</span
                  >
                </div>
                <div
                  class="w-full h-2 overflow-hidden bg-gray-100 rounded-full"
                >
                  <div
                    class="h-full transition-all duration-1000 ease-out rounded-full"
                    :class="
                      campaign.open_rate > 20
                        ? 'bg-emerald-500'
                        : 'bg-amber-400'
                    "
                    :style="{ width: campaign.open_rate + '%' }"
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const campaigns = ref([]);
const isLoading = ref(true);

const fetchHistory = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/newsletters/history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });
    campaigns.value = res.data.data;
  } catch (error) {
    console.error("Gagal mengambil riwayat campaign:", error);
    Swal.fire("Error", "Gagal memuat data analitik.", "error");
  } finally {
    setTimeout(() => {
      isLoading.value = false;
    }, 400); // Sedikit delay untuk estetika animasi
  }
};

const stats = computed(() => {
  const totalCampaigns = campaigns.value.length;
  const totalSent = campaigns.value.reduce(
    (sum, item) => sum + item.sent_count,
    0,
  );
  const totalOpened = campaigns.value.reduce(
    (sum, item) => sum + item.opened_count,
    0,
  );

  const avgOpenRate =
    totalSent > 0 ? ((totalOpened / totalSent) * 100).toFixed(1) : 0;

  return { totalCampaigns, totalSent, avgOpenRate };
});

onMounted(() => {
  fetchHistory();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
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
</style>
