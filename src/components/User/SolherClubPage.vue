<template>
  <div class="bg-[#FAFAFA] min-h-screen pb-24">
    <!-- Hero Banner -->
    <div class="relative w-full h-[400px] md:h-[500px] bg-black overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-black/30 z-10"></div>
      <img
        src="../../assets/solher_club.jpg" 
        alt="Solher Club"
        class="absolute inset-0 object-cover w-full h-full opacity-60"
      />
      <div class="relative z-20 flex flex-col items-center px-6 text-center text-white max-w-4xl">
        <h1 class="mb-4 font-serif text-4xl tracking-tighter md:text-6xl uppercase">
          Welcome to Solher Club
        </h1>
        <p class="text-sm tracking-widest text-gray-300 uppercase md:text-base mb-8">
          Elevate your everyday style and earn exclusive rewards.
        </p>
        <button
          v-if="!isAuthenticated"
          @click="$router.push('/login')"
          class="px-8 py-3 text-sm font-bold tracking-widest text-black uppercase transition-colors bg-white hover:bg-gray-200 rounded-none"
        >
          Join Now
        </button>
      </div>
    </div>

    <div class="px-6 mx-auto max-w-7xl md:px-12 -mt-12 relative z-30">
      
      <!-- 👇 STATUS MEMBERSHIP USER (Jika Login) 👇 -->
      <div v-if="isAuthenticated && userData" class="bg-white p-8 md:p-12 shadow-2xl rounded-2xl mb-24 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex flex-col gap-2">
          <p class="text-xs font-bold tracking-widest text-gray-400 uppercase">Your Status</p>
          <div class="flex items-center gap-4">
            <span class="text-4xl">{{ currentTier.icon }}</span>
            <div>
              <h2 class="font-serif text-3xl font-bold tracking-tight text-gray-900 uppercase">{{ currentTier.name }} Member</h2>
              <p class="text-sm font-bold text-gray-500 mt-1">
                You have <span class="text-black font-black text-lg">{{ userData.point || 0 }}</span> Points
              </p>
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-1/3 flex flex-col gap-2">
          <div v-if="currentTier.next" class="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
            <span>{{ currentTier.name }}</span>
            <span>{{ currentTier.nextName }}</span>
          </div>
          <div v-else class="text-xs font-bold text-indigo-600 uppercase tracking-widest text-right mb-1">
            Maximum Tier Reached
          </div>
          
          <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              class="h-full bg-black transition-all duration-1000" 
              :style="{ width: currentTier.next ? `${((userData.point || 0) / currentTier.next) * 100}%` : '100%' }"
            ></div>
          </div>
          <p v-if="currentTier.next" class="text-right text-[10px] text-gray-400 mt-1 font-medium">
            Earn {{ currentTier.next - (userData.point || 0) }} more points to unlock {{ currentTier.nextName }}.
          </p>
        </div>
      </div>

      <!-- How It Works Section -->
      <div class="text-center mb-20 mt-16">
        <h2 class="font-serif text-3xl tracking-tighter text-gray-900 uppercase mb-4">How It Works</h2>
        <p class="text-gray-500 max-w-2xl mx-auto">It's simple. Shop your favorite items, earn points, and unlock exclusive rewards designed just for you.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16">
          <div class="flex flex-col items-center">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </div>
            <h3 class="font-bold uppercase tracking-widest text-sm mb-2">1. Join</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Create an account to automatically become a Solher Club member. It's completely free.</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
            <h3 class="font-bold uppercase tracking-widest text-sm mb-2">2. Earn</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Earn points every time you shop. Reach higher tiers for accelerated earning rates.</p>
          </div>
          <div class="flex flex-col items-center">
            <div class="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 11.25v8.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 1 0 9.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1 1 14.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
              </svg>
            </div>
            <h3 class="font-bold uppercase tracking-widest text-sm mb-2">3. Redeem</h3>
            <p class="text-xs text-gray-500 leading-relaxed">Use your points at checkout for discounts on your favorite items.</p>
          </div>
        </div>
      </div>

      <!-- Tiers Section -->
      <div class="mt-32">
        <h2 class="font-serif text-3xl tracking-tighter text-center text-gray-900 uppercase mb-16">Membership Tiers</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Silver Tier -->
          <div class="bg-white border border-gray-200 rounded-xl p-8 flex flex-col hover:shadow-xl transition-shadow duration-300 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gray-100 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
            <div class="text-4xl mb-4">🥈</div>
            <h3 class="font-serif text-2xl font-bold uppercase tracking-widest text-gray-700 mb-1">Silver</h3>
            <p class="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">0 - 2,499 Pts</p>
            
            <ul class="space-y-4 flex-grow">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-800 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span class="text-sm text-gray-600">Earn 1 Point per Rp 1.000 spent</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-gray-800 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span class="text-sm text-gray-600">Standard Birthday Reward</span>
              </li>
            </ul>
          </div>

          <!-- Gold Tier -->
          <div class="bg-gradient-to-b from-[#FFFDF0] to-white border border-[#FBEB9F] rounded-xl p-8 flex flex-col hover:shadow-xl transition-shadow duration-300 relative overflow-hidden transform md:-translate-y-4 shadow-lg">
            <div class="absolute top-0 right-0 w-32 h-32 bg-amber-100 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
            <div class="absolute top-0 left-0 w-full bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest text-center py-1.5">Most Popular</div>
            
            <div class="text-4xl mb-4 mt-4">🥇</div>
            <h3 class="font-serif text-2xl font-bold uppercase tracking-widest text-amber-600 mb-1">Gold</h3>
            <p class="text-xs text-amber-400 font-bold uppercase tracking-widest mb-8">2,500 - 9,999 Pts</p>
            
            <ul class="space-y-4 flex-grow">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span class="text-sm text-gray-700 font-medium">Earn 1.5 Points per Rp 1.000 spent</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span class="text-sm text-gray-700">Premium Birthday Reward</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-amber-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span class="text-sm text-gray-700">Early Access to Sales</span>
              </li>
            </ul>
          </div>

          <!-- Platinum Tier -->
          <div class="bg-gray-900 text-white border border-gray-800 rounded-xl p-8 flex flex-col hover:shadow-2xl hover:shadow-indigo-900/20 transition-shadow duration-300 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-gray-800 rounded-bl-full -mr-16 -mt-16 opacity-50"></div>
            <div class="text-4xl mb-4">💎</div>
            <h3 class="font-serif text-2xl font-bold uppercase tracking-widest text-indigo-200 mb-1">Platinum</h3>
            <p class="text-xs text-indigo-400 font-bold uppercase tracking-widest mb-8">10,000+ Pts</p>
            
            <ul class="space-y-4 flex-grow">
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span class="text-sm text-gray-300 font-medium">Earn 2 Points per Rp 1.000 spent</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span class="text-sm text-gray-300">Exclusive Birthday Gift</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span class="text-sm text-gray-300">Priority VIP Customer Care</span>
              </li>
              <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                <span class="text-sm text-gray-300">Free Shipping on All Orders</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const isAuthenticated = ref(false);
const userData = ref(null);

const checkAuth = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    // Tarik data profil terbaru untuk memastikan poin yang ditampilkan akurat
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    userData.value = res.data.data || res.data;
    isAuthenticated.value = true;
  } catch (error) {
    isAuthenticated.value = false;
  }
};

const currentTier = computed(() => {
  const points = userData.value?.point || 0;
  if (points < 2500) {
    return { name: 'Silver', icon: '🥈', next: 2500, nextName: 'Gold' };
  } else if (points < 10000) {
    return { name: 'Gold', icon: '🥇', next: 10000, nextName: 'Platinum' };
  } else {
    return { name: 'Platinum', icon: '💎', next: null, nextName: null };
  }
});

onMounted(() => {
  checkAuth();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>