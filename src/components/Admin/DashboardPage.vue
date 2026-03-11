<!-- <template>
  <div class="space-y-8">
    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Sales</p>
        <p class="font-black text-gray-900 text-2xl">Rp 12.500.000</p>
        <span class="font-medium text-green-500 text-xs">↑ 12% from last month</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Products</p>
        <p class="font-black text-gray-900 text-2xl">48</p>
        <span class="text-gray-400 text-xs">Active in catalog</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Transactions</p>
        <p class="font-black text-gray-900 text-2xl">1,240</p>
        <span class="font-medium text-green-500 text-xs">↑ 5.4%</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Users</p>
        <p class="font-black text-gray-900 text-2xl">856</p>
        <span class="font-medium text-blue-500 text-xs">Registered members</span>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
      <div class="lg:col-span-2 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
        <div class="h-[300px]">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Popular Products</h3>
        <div class="flex justify-center h-[300px]">
          <Pie :data="pieData" :options="pieOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Line, Pie } from 'vue-chartjs';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const revenueData = ref({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    label: 'Revenue (Million Rp)',
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    data: [5, 8, 7, 12.5, 10, 15],
    tension: 0.4, 
    fill: false
  }]
});

const pieData = ref({
  labels: ['Helia Bag', 'Eterna Bag', 'Solenne Bag', 'Others'],
  datasets: [{
    backgroundColor: ['#1e1e1e', '#3b82f6', '#10b981', '#f3f4f6'],
    data: [40, 25, 20, 15]
  }]
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
};

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: 'bottom' }
  }
};
</script> -->

<!-- <template>
  <div class="space-y-8 animate-fade-in">
    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p
          class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider"
        >
          Total Sales
        </p>
        <p class="font-black text-gray-900 text-2xl">
          {{ formatPrice(stats.total_sales) }}
        </p>
        <span class="font-medium text-green-500 text-xs"
          >Completed payments</span
        >
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p
          class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider"
        >
          Total Products
        </p>
        <p class="font-black text-gray-900 text-2xl">
          {{ stats.total_products }}
        </p>
        <span class="text-gray-400 text-xs">Active pieces in catalog</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p
          class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider"
        >
          Total Transactions
        </p>
        <p class="font-black text-gray-900 text-2xl">
          {{ stats.total_transactions }}
        </p>
        <span class="text-gray-400 text-xs">All time orders</span>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p
          class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider"
        >
          Total Users
        </p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_users }}</p>
        <span class="font-medium text-blue-500 text-xs"
          >Registered members</span
        >
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
      <div
        class="lg:col-span-2 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl"
      >
        <h3 class="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
        <div class="h-[300px]" v-if="!isLoading">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Popular Products</h3>
        <div class="flex justify-center h-[300px]" v-if="!isLoading">
          <Pie :data="pieData" :options="pieOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const stats = ref({
  total_sales: 0,
  total_products: 0,
  total_transactions: 0,
  total_users: 0,
});
const revenueData = ref({ labels: [], datasets: [] });
const pieData = ref({ labels: [], datasets: [] });
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resStats, resRevenue, resPopular] = await Promise.all([
      axios.get(`${BASE_URL}/admin/dashboard/stats`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/revenue-chart`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/popular-products`, axiosConfig),
    ]);

    // Set Statistik
    stats.value = resStats.data;

    // Set Revenue Chart
    revenueData.value = {
      labels: resRevenue.data.map((item) => item.month),
      datasets: [
        {
          label: "Revenue (IDR)",
          backgroundColor: "#000",
          borderColor: "#000",
          data: resRevenue.data.map((item) => item.total),
          tension: 0.4,
          fill: false,
        },
      ],
    };

    // Set Popular Products Chart
    pieData.value = {
      labels: resPopular.data.map((item) => item.name),
      datasets: [
        {
          backgroundColor: [
            "#1e1e1e",
            "#3b82f6",
            "#10b981",
            "#f59e0b",
            "#ef4444",
          ],
          data: resPopular.data.map((item) => item.total_sold),
        },
      ],
    };
  } catch (err) {
    console.error("Dashboard data failed", err);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);
const chartOptions = { responsive: true, maintainAspectRatio: false };
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "bottom" } },
};

onMounted(fetchData);
</script> -->

<!-- <template>
  <div class="space-y-8 animate-fade-in">
    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Sales</p>
        <p class="font-black text-gray-900 text-2xl">{{ formatPrice(stats.total_sales) }}</p>
        <span class="font-medium text-green-500 text-xs">Completed payments</span>
      </div>
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Products</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_products }}</p>
        <span class="text-gray-400 text-xs">Active pieces in catalog</span>
      </div>
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Transactions</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_transactions }}</p>
        <span class="text-gray-400 text-xs">All time orders</span>
      </div>
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Users</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_users }}</p>
        <span class="font-medium text-blue-500 text-xs">Registered members</span>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
      <div class="lg:col-span-2 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
        <div class="h-[300px]" v-if="!isLoading">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl"></div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Historical Best Sellers</h3>
        <div class="flex justify-center h-[300px]" v-if="!isLoading">
          <Pie :data="pieData" :options="pieOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    </div>

    <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
      <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h3 class="font-bold text-gray-800 text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            AI Sales Prediction (C4.5 Algorithm)
          </h3>
          <p class="text-xs text-gray-500 mt-1">Predicting future bestsellers based on category trends, pricing, and scarcity rules.</p>
        </div>
      </div>

      <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="bg-gray-100 h-32 rounded-xl animate-pulse"></div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          v-for="item in predictedProducts" 
          :key="item.id"
          class="border border-gray-100 rounded-xl p-4 hover:shadow-md transition bg-gray-50/50 flex flex-col"
        >
          <div class="flex items-start gap-4 mb-4">
            <img :src="item.image" class="w-16 h-16 object-cover rounded-lg shadow-sm" />
            <div>
              <p class="font-bold text-gray-900 text-sm line-clamp-2 leading-tight">{{ item.name }}</p>
              <p :class="item.color" class="font-black text-[10px] uppercase tracking-widest mt-1">{{ item.label }}</p>
            </div>
          </div>
          
          <div class="mt-auto pt-3 border-t border-gray-200 border-dashed">
            <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Prediction Factors:</p>
            <p class="text-xs text-gray-600 italic">{{ item.reasons || 'No specific factors' }}</p>
            
            <div class="mt-3 w-full bg-gray-200 rounded-full h-1.5">
              <div class="bg-purple-600 h-1.5 rounded-full" :style="{ width: item.score + '%' }"></div>
            </div>
            <p class="text-right text-[10px] text-gray-500 mt-1 font-bold">{{ item.score }}% Match</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const stats = ref({
  total_sales: 0,
  total_products: 0,
  total_transactions: 0,
  total_users: 0,
});
const revenueData = ref({ labels: [], datasets: [] });
const pieData = ref({ labels: [], datasets: [] });
const predictedProducts = ref([]); // [BARU] State untuk Prediksi
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resStats, resRevenue, resPopular, resPredict] = await Promise.all([
      axios.get(`${BASE_URL}/admin/dashboard/stats`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/revenue-chart`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/popular-products`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/predicted-bestsellers`, axiosConfig), // [BARU] Hit API Prediksi
    ]);

    stats.value = resStats.data;
    
    predictedProducts.value = resPredict.data; // [BARU] Simpan hasil prediksi

    revenueData.value = {
      labels: resRevenue.data.map((item) => item.month),
      datasets: [
        {
          label: "Revenue (IDR)",
          backgroundColor: "#000",
          borderColor: "#000",
          data: resRevenue.data.map((item) => item.total),
          tension: 0.4,
          fill: false,
        },
      ],
    };

    pieData.value = {
      labels: resPopular.data.map((item) => item.name),
      datasets: [
        {
          backgroundColor: ["#1e1e1e", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
          data: resPopular.data.map((item) => item.total_sold),
        },
      ],
    };
  } catch (err) {
    console.error("Dashboard data failed", err);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const chartOptions = { responsive: true, maintainAspectRatio: false };
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "bottom" } },
};

onMounted(fetchData);
</script> -->

<!-- <template>
  <div class="space-y-8 animate-fade-in">
    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Sales</p>
        <p class="font-black text-gray-900 text-2xl">{{ formatPrice(stats.total_sales) }}</p>
        <span class="font-medium text-green-500 text-xs">Completed payments</span>
      </div>
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Products</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_products }}</p>
        <span class="text-gray-400 text-xs">Active pieces in catalog</span>
      </div>
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Transactions</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_transactions }}</p>
        <span class="text-gray-400 text-xs">All time orders</span>
      </div>
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Users</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_users }}</p>
        <span class="font-medium text-blue-500 text-xs">Registered members</span>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
      <div class="lg:col-span-2 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
        <div class="h-[300px]" v-if="!isLoading">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl"></div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Historical Best Sellers</h3>
        <div class="flex justify-center h-[300px]" v-if="!isLoading">
          <Pie :data="pieData" :options="pieOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    </div>

    <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
      <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
        <div>
          <h3 class="font-bold text-gray-800 text-lg flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Sales Prediction
          </h3>
          <p class="text-xs text-gray-500 mt-1">Predicting future bestsellers based on category trends, pricing, and scarcity rules.</p>
        </div>
      </div>

      <div v-if="isLoading" class="flex flex-col gap-4">
        <div v-for="i in 4" :key="`skel-${i}`" class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div class="w-16 h-16 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
          <div class="flex-grow space-y-2">
            <div class="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div v-else class="flex flex-col gap-4">
        <div 
          v-for="(item, index) in predictedProducts" 
          :key="item.id"
          class="flex flex-col md:flex-row items-start md:items-center gap-4 border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition bg-white"
        >
          <div class="hidden md:flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-400 font-bold rounded-full shrink-0 text-sm">
            #{{ index + 1 }}
          </div>

          <img :src="item.image" class="w-16 h-16 object-cover rounded-lg shadow-sm shrink-0 border border-gray-100" />
          
          <div class="flex-grow min-w-0">
            <div class="flex items-center gap-3 mb-1">
              <p class="font-bold text-gray-900 text-base truncate">{{ item.name }}</p>
              <span :class="item.color" class="font-black text-[9px] uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                {{ item.label }}
              </span>
            </div>
            
            <div class="text-xs text-gray-600 mt-1 flex gap-2">
              <span class="font-bold text-[10px] text-gray-400 uppercase tracking-widest shrink-0 mt-0.5">Factors:</span> 
              <span class="italic text-gray-500 break-words">{{ item.reasons || 'No specific factors' }}</span>
            </div>
          </div>
          
          <div class="w-full md:w-48 shrink-0 mt-3 md:mt-0 flex flex-col justify-center">
            <div class="flex justify-between items-center mb-1">
              <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Match Score</span>
              <span class="text-xs font-black text-purple-700">{{ item.score }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div class="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-1000" :style="{ width: item.score + '%' }"></div>
            </div>
          </div>

        </div>
        
        <div v-if="predictedProducts.length === 0" class="py-10 text-center text-gray-400 italic text-sm">
          Not enough historical data to generate predictions.
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const stats = ref({
  total_sales: 0,
  total_products: 0,
  total_transactions: 0,
  total_users: 0,
});
const revenueData = ref({ labels: [], datasets: [] });
const pieData = ref({ labels: [], datasets: [] });
const predictedProducts = ref([]);
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resStats, resRevenue, resPopular, resPredict] = await Promise.all([
      axios.get(`${BASE_URL}/admin/dashboard/stats`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/revenue-chart`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/popular-products`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/predicted-bestsellers`, axiosConfig), 
    ]);

    stats.value = resStats.data;
    
    // Data dari backend (DashboardController) sudah kita urutkan (usort) dari skor tertinggi ke terendah.
    predictedProducts.value = resPredict.data;

    revenueData.value = {
      labels: resRevenue.data.map((item) => item.month),
      datasets: [
        {
          label: "Revenue (IDR)",
          backgroundColor: "#000",
          borderColor: "#000",
          data: resRevenue.data.map((item) => item.total),
          tension: 0.4,
          fill: false,
        },
      ],
    };

    pieData.value = {
      labels: resPopular.data.map((item) => item.name),
      datasets: [
        {
          backgroundColor: ["#1e1e1e", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
          data: resPopular.data.map((item) => item.total_sold),
        },
      ],
    };
  } catch (err) {
    console.error("Dashboard data failed", err);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const chartOptions = { responsive: true, maintainAspectRatio: false };
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "bottom" } },
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
</style> -->

<!-- <template>
  <div class="space-y-8 animate-fade-in pb-10">
    
    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Sales</p>
        <p class="font-black text-gray-900 text-2xl">{{ formatPrice(stats.total_sales) }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span :class="stats.sales_growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1">
            <svg v-if="stats.sales_growth >= 0" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
            {{ Math.abs(stats.sales_growth) }}%
          </span>
          <span class="text-[10px] text-gray-400">vs last month</span>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Active Products</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_products }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold text-[10px]">
            +{{ stats.new_products_growth }} new
          </span>
          <span class="text-[10px] text-gray-400">added this month</span>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Orders</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_transactions }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span :class="stats.transaction_growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1">
            <svg v-if="stats.transaction_growth >= 0" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
            {{ Math.abs(stats.transaction_growth) }}%
          </span>
          <span class="text-[10px] text-gray-400">vs last month</span>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Registered Users</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_users }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold text-[10px]">
            +{{ stats.new_users_growth }} joined
          </span>
          <span class="text-[10px] text-gray-400">this month</span>
        </div>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
      
      <div class="lg:col-span-2 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
        <div class="h-[300px]" v-if="!isLoading">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl"></div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-gray-800">Recent Live Orders</h3>
          <router-link to="/admin/transactions" class="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">View All</router-link>
        </div>
        
        <div class="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <div v-if="isLoading" class="space-y-4">
            <div v-for="i in 5" :key="i" class="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
          </div>
          
          <div v-else-if="recentActivities.length > 0" class="space-y-4">
            <div v-for="act in recentActivities" :key="act.id" class="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <div>
                <p class="font-bold text-xs text-gray-900">{{ act.customer }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[9px] text-gray-400 font-mono">{{ act.order_id }}</span>
                  <span class="text-[8px] text-gray-300">•</span>
                  <span class="text-[9px] text-gray-400">{{ act.time_ago }}</span>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-sm text-gray-900">{{ formatPrice(act.amount) }}</p>
                <span 
                  :class="{
                    'text-amber-500 bg-amber-50': act.status === 'pending' || act.status === 'awaiting_payment',
                    'text-blue-500 bg-blue-50': act.status === 'processing',
                    'text-green-600 bg-green-50': act.status === 'completed',
                    'text-red-500 bg-red-50': act.status === 'cancelled' || act.status === 'refunded'
                  }"
                  class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest inline-block mt-1"
                >
                  {{ act.status.replace('_', ' ') }}
                </span>
              </div>
            </div>
          </div>
          
          <div v-else class="h-full flex items-center justify-center text-gray-400 italic text-sm">
            No recent activities.
          </div>
        </div>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
      
      <div class="lg:col-span-2 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl flex flex-col">
        <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div>
            <h3 class="font-bold text-gray-800 text-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Sales Prediction (C4.5 Algorithm)
            </h3>
            <p class="text-xs text-gray-500 mt-1">Predicting future bestsellers based on category trends, pricing, and scarcity rules.</p>
          </div>
        </div>

        <div v-if="isLoading" class="flex flex-col gap-4">
          <div v-for="i in 4" :key="`skel-${i}`" class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div class="w-16 h-16 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
            <div class="flex-grow space-y-2">
              <div class="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div v-else class="flex flex-col gap-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
          <div 
            v-for="(item, index) in predictedProducts" 
            :key="item.id"
            class="flex flex-col md:flex-row items-start md:items-center gap-4 border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition bg-white"
          >
            <div class="hidden md:flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-400 font-bold rounded-full shrink-0 text-sm">
              #{{ index + 1 }}
            </div>
            <img :src="item.image" class="w-16 h-16 object-cover rounded-lg shadow-sm shrink-0 border border-gray-100" />
            
            <div class="flex-grow min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <p class="font-bold text-gray-900 text-base truncate">{{ item.name }}</p>
                <span :class="item.color" class="font-black text-[9px] uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                  {{ item.label }}
                </span>
              </div>
              <div class="text-xs text-gray-600 mt-1 flex gap-2">
                <span class="font-bold text-[10px] text-gray-400 uppercase tracking-widest shrink-0 mt-0.5">Factors:</span> 
                <span class="italic text-gray-500 break-words">{{ item.reasons || 'No specific factors' }}</span>
              </div>
            </div>
            
            <div class="w-full md:w-48 shrink-0 mt-3 md:mt-0 flex flex-col justify-center">
              <div class="flex justify-between items-center mb-1">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Match Score</span>
                <span class="text-xs font-black text-purple-700">{{ item.score }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-1000" :style="{ width: item.score + '%' }"></div>
              </div>
            </div>
          </div>
          
          <div v-if="predictedProducts.length === 0" class="py-10 text-center text-gray-400 italic text-sm">
            Not enough historical data to generate predictions.
          </div>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl flex flex-col">
        <h3 class="mb-6 font-bold text-gray-800">Historical Best Sellers</h3>
        <div class="flex justify-center h-[300px] flex-grow items-center" v-if="!isLoading">
          <Pie :data="pieData" :options="pieOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl mt-auto"></div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const stats = ref({
  total_sales: 0,
  sales_growth: 0,
  total_products: 0,
  new_products_growth: 0,
  total_transactions: 0,
  transaction_growth: 0,
  total_users: 0,
  new_users_growth: 0
});
const revenueData = ref({ labels: [], datasets: [] });
const pieData = ref({ labels: [], datasets: [] });
const predictedProducts = ref([]);
const recentActivities = ref([]); // [BARU] Data aktivitas terbaru
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [resStats, resRevenue, resPopular, resPredict, resActivities] = await Promise.all([
      axios.get(`${BASE_URL}/admin/dashboard/stats`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/revenue-chart`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/popular-products`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/predicted-bestsellers`, axiosConfig),
      axios.get(`${BASE_URL}/admin/dashboard/recent-activities`, axiosConfig), // [BARU]
    ]);

    stats.value = resStats.data;
    predictedProducts.value = resPredict.data;
    recentActivities.value = resActivities.data; // [BARU]

    revenueData.value = {
      labels: resRevenue.data.map((item) => item.month),
      datasets: [
        {
          label: "Revenue (IDR)",
          backgroundColor: "#000",
          borderColor: "#000",
          data: resRevenue.data.map((item) => item.total),
          tension: 0.4,
          fill: false,
        },
      ],
    };

    pieData.value = {
      labels: resPopular.data.map((item) => item.name),
      datasets: [
        {
          backgroundColor: ["#1e1e1e", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
          data: resPopular.data.map((item) => item.total_sold),
        },
      ],
    };
  } catch (err) {
    console.error("Dashboard data failed", err);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const chartOptions = { responsive: true, maintainAspectRatio: false };
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "bottom" } },
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Custom Scrollbar for inner elements */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
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
</style> -->

<template>
  <!-- <div class="space-y-8 animate-fade-in pb-10">
    
    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Sales</p>
        <p class="font-black text-gray-900 text-2xl">{{ formatPrice(stats.total_sales) }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span :class="stats.sales_growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1">
            <svg v-if="stats.sales_growth >= 0" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
            {{ Math.abs(stats.sales_growth) }}%
          </span>
          <span class="text-[10px] text-gray-400">vs last month</span>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Active Products</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_products }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold text-[10px]">
            +{{ stats.new_products_growth }} new
          </span>
          <span class="text-[10px] text-gray-400">added this month</span>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Orders</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_transactions }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span :class="stats.transaction_growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1">
            <svg v-if="stats.transaction_growth >= 0" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
            {{ Math.abs(stats.transaction_growth) }}%
          </span>
          <span class="text-[10px] text-gray-400">vs last month</span>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Registered Users</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_users }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold text-[10px]">
            +{{ stats.new_users_growth }} joined
          </span>
          <span class="text-[10px] text-gray-400">this month</span>
        </div>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-2">
      
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
        <div class="h-[300px]" v-if="!isLoading">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl"></div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="font-bold text-gray-800">Average Daily Revenue</h3>
            <p class="text-xs text-gray-500 mt-1">Historically, which day generates the most sales?</p>
          </div>
        </div>
        <div class="h-[300px]" v-if="!isLoading">
          <Bar :data="dailyAverageData" :options="barOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl"></div>
      </div>

    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-3">
      
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-gray-800">Recent Live Orders</h3>
          <router-link to="/admin/transactions" class="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">View All</router-link>
        </div>
        
        <div class="flex-grow overflow-y-auto pr-2 custom-scrollbar">
          <div v-if="isLoading" class="space-y-4">
            <div v-for="i in 5" :key="i" class="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
          </div>
          
          <div v-else-if="recentActivities.length > 0" class="space-y-4">
            <div v-for="act in recentActivities" :key="act.id" class="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <div>
                <p class="font-bold text-xs text-gray-900">{{ act.customer }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[9px] text-gray-400 font-mono">{{ act.order_id }}</span>
                  <span class="text-[8px] text-gray-300">•</span>
                  <span class="text-[9px] text-gray-400">{{ act.time_ago }}</span>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-sm text-gray-900">{{ formatPrice(act.amount) }}</p>
                <span 
                  :class="{
                    'text-amber-500 bg-amber-50': act.status === 'pending' || act.status === 'awaiting_payment',
                    'text-blue-500 bg-blue-50': act.status === 'processing',
                    'text-green-600 bg-green-50': act.status === 'completed',
                    'text-red-500 bg-red-50': act.status === 'cancelled' || act.status === 'refunded'
                  }"
                  class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest inline-block mt-1"
                >
                  {{ act.status.replace('_', ' ') }}
                </span>
              </div>
            </div>
          </div>
          
          <div v-else class="h-full flex items-center justify-center text-gray-400 italic text-sm">
            No recent activities.
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 bg-white shadow-sm p-6 border border-gray-100 rounded-2xl flex flex-col">
        <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div>
            <h3 class="font-bold text-gray-800 text-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Sales Prediction (C4.5 Algorithm)
            </h3>
            <p class="text-xs text-gray-500 mt-1">Predicting future bestsellers based on category trends, pricing, and scarcity rules.</p>
          </div>
        </div>

        <div v-if="isLoading" class="flex flex-col gap-4">
          <div v-for="i in 4" :key="`skel-${i}`" class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div class="w-16 h-16 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
            <div class="flex-grow space-y-2">
              <div class="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div v-else class="flex flex-col gap-4 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
          <div 
            v-for="(item, index) in predictedProducts" 
            :key="item.id"
            class="flex flex-col md:flex-row items-start md:items-center gap-4 border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition bg-white"
          >
            <div class="hidden md:flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-400 font-bold rounded-full shrink-0 text-sm">
              #{{ index + 1 }}
            </div>
            <img :src="item.image" class="w-16 h-16 object-cover rounded-lg shadow-sm shrink-0 border border-gray-100" />
            
            <div class="flex-grow min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <p class="font-bold text-gray-900 text-base truncate">{{ item.name }}</p>
                <span :class="item.color" class="font-black text-[9px] uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                  {{ item.label }}
                </span>
              </div>
              <div class="text-xs text-gray-600 mt-1 flex gap-2">
                <span class="font-bold text-[10px] text-gray-400 uppercase tracking-widest shrink-0 mt-0.5">Factors:</span> 
                <span class="italic text-gray-500 break-words">{{ item.reasons || 'No specific factors' }}</span>
              </div>
            </div>
            
            <div class="w-full md:w-48 shrink-0 mt-3 md:mt-0 flex flex-col justify-center">
              <div class="flex justify-between items-center mb-1">
                <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Match Score</span>
                <span class="text-xs font-black text-purple-700">{{ item.score }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div class="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-1000" :style="{ width: item.score + '%' }"></div>
              </div>
            </div>
          </div>
          
          <div v-if="predictedProducts.length === 0" class="py-10 text-center text-gray-400 italic text-sm">
            Not enough historical data to generate predictions.
          </div>
        </div>
      </div>
    </div>
  </div> -->
  <div class="space-y-8 animate-fade-in pb-10">
    
    <div class="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Sales</p>
        <p class="font-black text-gray-900 text-2xl">{{ formatPrice(stats.total_sales) }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span :class="stats.sales_growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1">
            <svg v-if="stats.sales_growth >= 0" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
            {{ Math.abs(stats.sales_growth) }}%
          </span>
          <span class="text-[10px] text-gray-400">vs last month</span>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Active Products</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_products }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-bold text-[10px]">
            +{{ stats.new_products_growth }} new
          </span>
          <span class="text-[10px] text-gray-400">added this month</span>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Total Orders</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_transactions }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span :class="stats.transaction_growth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'" class="px-2 py-0.5 rounded font-bold text-[10px] flex items-center gap-1">
            <svg v-if="stats.transaction_growth >= 0" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg>
            {{ Math.abs(stats.transaction_growth) }}%
          </span>
          <span class="text-[10px] text-gray-400">vs last month</span>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl relative overflow-hidden">
        <p class="mb-1 font-bold text-gray-400 text-xs uppercase tracking-wider">Registered Users</p>
        <p class="font-black text-gray-900 text-2xl">{{ stats.total_users }}</p>
        <div class="flex items-center gap-2 mt-2">
          <span class="bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold text-[10px]">
            +{{ stats.new_users_growth }} joined
          </span>
          <span class="text-[10px] text-gray-400">this month</span>
        </div>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-2">
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <h3 class="mb-6 font-bold text-gray-800">Monthly Revenue Overview</h3>
        <div class="h-[300px]" v-if="!isLoading">
          <Line :data="revenueData" :options="chartOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl"></div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h3 class="font-bold text-gray-800">Average Daily Revenue</h3>
            <p class="text-xs text-gray-500 mt-1">Historically, which day generates the most sales?</p>
          </div>
        </div>
        <div class="h-[300px]" v-if="!isLoading">
          <Bar :data="dailyAverageData" :options="barOptions" />
        </div>
        <div v-else class="h-[300px] bg-gray-100 animate-pulse rounded-xl"></div>
      </div>
    </div>

    <div class="gap-6 grid grid-cols-1 lg:grid-cols-4">
      
      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl flex flex-col lg:col-span-1">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-gray-800">Recent Live Orders</h3>
          <router-link to="/admin/transactions" class="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">View All</router-link>
        </div>
        
        <div class="flex-grow overflow-y-auto pr-2 custom-scrollbar max-h-[350px]">
          <div v-if="isLoading" class="space-y-4">
            <div v-for="i in 5" :key="i" class="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
          </div>
          
          <div v-else-if="recentActivities.length > 0" class="space-y-4">
            <div v-for="act in recentActivities" :key="act.id" class="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
              <div>
                <p class="font-bold text-xs text-gray-900">{{ act.customer }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-[9px] text-gray-400 font-mono">{{ act.order_id }}</span>
                  <span class="text-[8px] text-gray-300">•</span>
                  <span class="text-[9px] text-gray-400">{{ act.time_ago }}</span>
                </div>
              </div>
              <div class="text-right">
                <p class="font-bold text-sm text-gray-900">{{ formatPrice(act.amount) }}</p>
                <span 
                  :class="{
                    'text-amber-500 bg-amber-50': act.status === 'pending' || act.status === 'awaiting_payment',
                    'text-blue-500 bg-blue-50': act.status === 'processing',
                    'text-green-600 bg-green-50': act.status === 'completed',
                    'text-red-500 bg-red-50': act.status === 'cancelled' || act.status === 'refunded'
                  }"
                  class="px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-widest inline-block mt-1"
                >
                  {{ act.status.replace('_', ' ') }}
                </span>
              </div>
            </div>
          </div>
          
          <div v-else class="h-full flex items-center justify-center text-gray-400 italic text-sm">
            No recent activities.
          </div>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl flex flex-col lg:col-span-2">
        <div class="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
          <div>
            <h3 class="font-bold text-gray-800 text-lg flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI Sales Prediction (C4.5)
            </h3>
            <p class="text-xs text-gray-500 mt-1">Predicting future bestsellers based on categories & pricing.</p>
          </div>
        </div>

        <div v-if="isLoading" class="flex flex-col gap-4">
          <div v-for="i in 4" :key="`skel-${i}`" class="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div class="w-16 h-16 bg-gray-200 rounded-lg animate-pulse shrink-0"></div>
            <div class="flex-grow space-y-2">
              <div class="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-3 w-1/2 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div class="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <div v-else class="flex flex-col gap-4 overflow-y-auto max-h-[350px] pr-2 custom-scrollbar">
          <div 
            v-for="(item, index) in predictedProducts" 
            :key="item.id"
            class="flex flex-col md:flex-row items-start md:items-center gap-4 border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition bg-white"
          >
            <div class="hidden md:flex items-center justify-center w-8 h-8 bg-gray-100 text-gray-400 font-bold rounded-full shrink-0 text-sm">
              #{{ index + 1 }}
            </div>
            <img :src="item.image" class="w-16 h-16 object-cover rounded-lg shadow-sm shrink-0 border border-gray-100" />
            
            <div class="flex-grow min-w-0">
              <div class="flex items-center gap-3 mb-1">
                <p class="font-bold text-gray-900 text-sm truncate">{{ item.name }}</p>
                <span :class="item.color" class="font-black text-[9px] uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
                  {{ item.label }}
                </span>
              </div>
              <div class="text-[10px] text-gray-600 mt-1 flex gap-2">
                <span class="font-bold text-gray-400 uppercase tracking-widest shrink-0 mt-0.5">Factors:</span> 
                <span class="italic text-gray-500 break-words line-clamp-2">{{ item.reasons || 'No specific factors' }}</span>
              </div>
            </div>
            
            <div class="w-full md:w-32 shrink-0 mt-3 md:mt-0 flex flex-col justify-center">
              <div class="flex justify-between items-center mb-1">
                <span class="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Match</span>
                <span class="text-xs font-black text-purple-700">{{ item.score }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="bg-gradient-to-r from-purple-400 to-purple-600 h-1.5 rounded-full transition-all duration-1000" :style="{ width: item.score + '%' }"></div>
              </div>
            </div>
          </div>
          
          <div v-if="predictedProducts.length === 0" class="py-10 text-center text-gray-400 italic text-sm">
            Not enough historical data to generate predictions.
          </div>
        </div>
      </div>

      <div class="bg-white shadow-sm p-6 border border-gray-100 rounded-2xl flex flex-col lg:col-span-1">
        <h3 class="mb-2 font-bold text-gray-800 text-center md:text-left">Historical Best Sellers</h3>
        <p class="text-xs text-gray-500 mb-6 text-center md:text-left">Top 5 items</p>
        <div class="flex justify-center h-[250px] flex-grow items-center" v-if="!isLoading">
          <Pie :data="pieData" :options="pieOptions" />
        </div>
        <div v-else class="h-[250px] bg-gray-100 animate-pulse rounded-xl mt-auto"></div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // [BARU] Import BarElement
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie, Bar } from "vue-chartjs"; // [BARU] Import Bar Component

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement, // [BARU] Register BarElement
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

const stats = ref({
  total_sales: 0,
  sales_growth: 0,
  total_products: 0,
  new_products_growth: 0,
  total_transactions: 0,
  transaction_growth: 0,
  total_users: 0,
  new_users_growth: 0
});

const revenueData = ref({ labels: [], datasets: [] });
const dailyAverageData = ref({ labels: [], datasets: [] }); // [BARU] State untuk grafik bar
const pieData = ref({ labels: [], datasets: [] });

const predictedProducts = ref([]);
const recentActivities = ref([]); 
const isLoading = ref(true);

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// const fetchData = async () => {
//   isLoading.value = true;
//   try {
//     const [resStats, resRevenue, resPopular, resPredict, resActivities, resDaily] = await Promise.all([
//       axios.get(`${BASE_URL}/admin/dashboard/stats`, axiosConfig),
//       axios.get(`${BASE_URL}/admin/dashboard/revenue-chart`, axiosConfig),
//       axios.get(`${BASE_URL}/admin/dashboard/popular-products`, axiosConfig),
//       axios.get(`${BASE_URL}/admin/dashboard/predicted-bestsellers`, axiosConfig),
//       axios.get(`${BASE_URL}/admin/dashboard/recent-activities`, axiosConfig),
//       axios.get(`${BASE_URL}/admin/dashboard/daily-average`, axiosConfig), // [BARU] Tembak API baru
//     ]);

//     stats.value = resStats.data;
//     predictedProducts.value = resPredict.data;
//     recentActivities.value = resActivities.data; 

//     revenueData.value = {
//       labels: resRevenue.data.map((item) => item.month),
//       datasets: [
//         {
//           label: "Revenue (IDR)",
//           backgroundColor: "#000",
//           borderColor: "#000",
//           data: resRevenue.data.map((item) => item.total),
//           tension: 0.4,
//           fill: false,
//         },
//       ],
//     };

//     // [BARU] Set Data untuk Grafik Batang (Average Daily)
//     dailyAverageData.value = {
//       labels: resDaily.data.map(item => item.day),
//       datasets: [
//         {
//           label: "Avg Daily Sales (IDR)",
//           backgroundColor: "#3b82f6", // Biru profesional
//           borderRadius: 6, // Ujung batang membulat (estetika)
//           data: resDaily.data.map(item => item.average),
//         }
//       ]
//     };

//     pieData.value = {
//       labels: resPopular.data.map((item) => item.name),
//       datasets: [
//         {
//           backgroundColor: ["#1e1e1e", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
//           data: resPopular.data.map((item) => item.total_sold),
//         },
//       ],
//     };
//   } catch (err) {
//     console.error("Dashboard data failed", err);
//   } finally {
//     isLoading.value = false;
//   }
// };

const fetchData = async () => {
  isLoading.value = true;
  try {
    // [PERBAIKAN BESAR] KITA HANYA MENEMBAK 1 API SEKARANG!
    // Ini menghemat koneksi database dan sangat aman dari Max Connection Error.
    const res = await axios.get(`${BASE_URL}/admin/dashboard/master-data`, axiosConfig);
    
    const data = res.data; // Ambil master object-nya

    // 1. Mapping Stats
    stats.value = data.stats;
    
    // 2. Mapping C4.5 Predictions
    predictedProducts.value = data.predicted;
    
    // 3. Mapping Recent Activities
    recentActivities.value = data.activities; 

    // 4. Mapping Line Chart (Monthly Revenue)
    revenueData.value = {
      labels: data.revenue.map((item) => item.month),
      datasets: [
        {
          label: "Revenue (IDR)",
          backgroundColor: "#000",
          borderColor: "#000",
          data: data.revenue.map((item) => item.total),
          tension: 0.4,
          fill: false,
        },
      ],
    };

    // 5. Mapping Bar Chart (Average Daily)
    dailyAverageData.value = {
      labels: data.daily.map(item => item.day),
      datasets: [
        {
          label: "Avg Daily Sales (IDR)",
          backgroundColor: "#3b82f6", 
          borderRadius: 6, 
          data: data.daily.map(item => item.average),
        }
      ]
    };

    // 6. Mapping Pie Chart (Popular Products)
    pieData.value = {
      labels: data.popular.map((item) => item.name),
      datasets: [
        {
          backgroundColor: ["#1e1e1e", "#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
          data: data.popular.map((item) => item.total_sold),
        },
      ],
    };
    
  } catch (err) {
    console.error("Dashboard data failed", err);
  } finally {
    isLoading.value = false;
  }
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(v);

const chartOptions = { responsive: true, maintainAspectRatio: false };
const barOptions = { 
  responsive: true, 
  maintainAspectRatio: false,
  plugins: { legend: { display: false } }, // Sembunyikan legend agar grafik lebih luas
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function(value) {
          // Format Y-axis agar jadi IDR / K (misal 100K) agar tidak kepanjangan
          if (value >= 1000000) return (value / 1000000).toFixed(1) + 'M';
          if (value >= 1000) return (value / 1000).toFixed(0) + 'K';
          return value;
        }
      }
    }
  }
};
const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { position: "bottom" } },
};

onMounted(fetchData);
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
</style>