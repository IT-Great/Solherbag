<!-- <template>
  <div class="bg-[#FAFAFA] min-h-screen pb-24">
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
          @click="handleJoinClick"
          class="px-8 py-3 text-sm font-bold tracking-widest text-black uppercase transition-colors bg-white hover:bg-gray-200 rounded-none"
        >
          Join Now
        </button>
      </div>
    </div>

    <div class="px-6 mx-auto max-w-7xl md:px-12 -mt-12 relative z-30">
      
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

      <div class="mt-32">
        <h2 class="font-serif text-3xl tracking-tighter text-center text-gray-900 uppercase mb-16">Membership Tiers</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
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
// import { ref, onMounted, computed } from "vue";
// import axios from "axios";
// import { BASE_URL } from "../../config/api.js";

// const isAuthenticated = ref(false);
// const userData = ref(null);

// const checkAuth = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) return;

//   try {
//     // Tarik data profil terbaru untuk memastikan poin yang ditampilkan akurat
//     const res = await axios.get(`${BASE_URL}/user`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     userData.value = res.data.data || res.data;
//     isAuthenticated.value = true;
//   } catch (error) {
//     isAuthenticated.value = false;
//   }
// };

// const currentTier = computed(() => {
//   const points = userData.value?.point || 0;
//   if (points < 2500) {
//     return { name: 'Silver', icon: '🥈', next: 2500, nextName: 'Gold' };
//   } else if (points < 10000) {
//     return { name: 'Gold', icon: '🥇', next: 10000, nextName: 'Platinum' };
//   } else {
//     return { name: 'Platinum', icon: '💎', next: null, nextName: null };
//   }
// });

// onMounted(() => {
//   checkAuth();
// });

import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

// 👇 PERBAIKAN 1: Baca langsung dari LocalStorage saat halaman pertama kali dimuat
const tokenLocal = localStorage.getItem("token");
const userLocal = localStorage.getItem("user");

// Mengatur status awal secara sinkron agar UI tidak berkedip (FOUC prevention)
const isAuthenticated = ref(!!tokenLocal);
const userData = ref(userLocal ? JSON.parse(userLocal) : null);

// 👇 PERBAIKAN 2: Tetap panggil API di belakang layar untuk menyegarkan (refresh) poin
const refreshUserData = async () => {
  if (!tokenLocal) return;

  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${tokenLocal}` },
    });
    
    // Perbarui state dengan data terbaru dari server
    userData.value = res.data.data || res.data;
    
    // Perbarui juga data di LocalStorage agar sinkron
    localStorage.setItem("user", JSON.stringify(userData.value));
  } catch (error) {
    // Jika token ternyata sudah expired/tidak valid, paksa logout
    if (error.response && error.response.status === 401) {
      isAuthenticated.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
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
  // Hanya ambil data terbaru di latar belakang (background)
  if (isAuthenticated.value) {
    refreshUserData();
  }
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
</style> -->

<!-- <template>
  <div class="bg-[#FAFAFA] min-h-screen pb-24 font-sans">
    <div class="relative w-full h-[500px] md:h-[600px] bg-black overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
      <img
        src="../../assets/solher_club.jpg" 
        alt="The Solhér Circle"
        class="absolute inset-0 object-cover w-full h-full opacity-50"
      />
      <div class="relative z-20 flex flex-col items-center px-6 text-center text-white max-w-4xl animate-fade-in">
        <h1 class="mb-4 font-serif text-4xl tracking-tighter md:text-6xl uppercase">
          The Solhér Circle
        </h1>
        <p class="text-sm tracking-[0.2em] text-gray-300 uppercase md:text-base mb-8 font-medium">
          More than membership. A place to belong.
        </p>
        <button
          v-if="!isAuthenticated"
          @click="handleJoinClick"
          class="px-10 py-4 text-xs font-black tracking-widest text-black uppercase transition-colors bg-white hover:bg-gray-200 rounded-sm shadow-xl"
        >
          Join The Circle
        </button>
      </div>
    </div>

    <div class="px-6 mx-auto max-w-7xl md:px-12 -mt-16 relative z-30">
      
      <div v-if="isAuthenticated && userData" class="bg-white p-8 md:p-12 shadow-2xl rounded-sm mb-24 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex flex-col gap-2">
          <p class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Your Circle Status</p>
          <div class="flex items-center gap-4">
            <span class="text-3xl text-gray-300">{{ currentTier.icon }}</span>
            <div>
              <h2 class="font-serif text-3xl font-bold tracking-tight text-gray-900 uppercase">{{ currentTier.name }}</h2>
              <p class="text-sm font-medium text-gray-500 mt-1">
                You carry <span class="text-black font-black text-lg">{{ userData.point || 0 }}</span> stories (points)
              </p>
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-1/3 flex flex-col gap-2">
          <div v-if="currentTier.next" class="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <span>{{ currentTier.name }}</span>
            <span>{{ currentTier.nextName }}</span>
          </div>
          <div v-else class="text-[10px] font-bold text-gray-900 uppercase tracking-widest text-right mb-1">
            Highest Circle Reached
          </div>
          
          <div class="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              class="h-full bg-black transition-all duration-1000" 
              :style="{ width: currentTier.next ? `${((userData.point || 0) / currentTier.next) * 100}%` : '100%' }"
            ></div>
          </div>
          <p v-if="currentTier.next" class="text-right text-[10px] text-gray-400 mt-1 font-medium">
            Accumulate {{ currentTier.next - (userData.point || 0) }} more to discover {{ currentTier.nextName }}.
          </p>
        </div>
      </div>

      <div class="text-center mb-20 mt-16 max-w-3xl mx-auto">
        <p class="text-gray-600 leading-relaxed md:text-lg font-serif italic mb-6">
          "Every SOLHÉR piece is made to accompany a woman through the chapters of her life. The SOLHÉR Circle is our way of celebrating the women who choose to carry those stories with us."
        </p>
        <p class="text-sm text-gray-500 leading-loose">
          From your first piece to the ones you keep for years to come, enjoy thoughtful privileges, early access, and invitations created exclusively for our community.
        </p>
      </div>

      <div class="mt-24">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="bg-white border border-gray-200 rounded-sm p-10 flex flex-col hover:shadow-xl transition-all duration-500 relative group">
            <div class="mb-8 border-b border-gray-100 pb-6">
              <span class="text-gray-300 text-2xl mb-4 block">✧</span>
              <h3 class="font-serif text-3xl font-bold uppercase tracking-widest text-gray-900 mb-2">Muse</h3>
              <p class="text-xs text-gray-500 font-serif italic mb-4">"Your beginning with SOLHÉR."</p>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">0 - 2,499 Pts</p>
            </div>
            
            <p class="text-xs text-gray-600 leading-relaxed mb-8 h-12">
              A complimentary membership for every woman who chooses to become part of our story.
            </p>
            
            <ul class="space-y-4 flex-grow mb-8">
              <li v-for="(benefit, i) in musePrivileges" :key="i" class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0 mt-1.5"></span>
                <span class="text-xs text-gray-600">{{ benefit }}</span>
              </li>
            </ul>

            <button v-if="!isAuthenticated" @click="handleJoinClick" class="w-full py-3 border border-black text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Become a Muse
            </button>
            <div v-else-if="currentTier.name === 'Muse'" class="w-full py-3 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest text-center cursor-default">
              Your Current Status
            </div>
          </div>

          <div class="bg-[#FDFBF7] border border-[#E8E2D2] rounded-sm p-10 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group shadow-lg">
            <div class="absolute top-0 left-0 w-full bg-[#E8E2D2] text-[#8B7355] text-[9px] font-black uppercase tracking-widest text-center py-1.5">
              The Next Chapter
            </div>
            <div class="mb-8 border-b border-[#E8E2D2] pb-6 mt-4">
              <span class="text-[#8B7355] text-2xl mb-4 block">✦</span>
              <h3 class="font-serif text-3xl font-bold uppercase tracking-widest text-[#8B7355] mb-2">Élan</h3>
              <p class="text-xs text-gray-500 font-serif italic mb-4">"For the woman in motion."</p>
              <p class="text-[10px] text-[#8B7355]/70 uppercase tracking-widest font-bold">2,500 - 9,999 Pts</p>
            </div>
            
            <p class="text-xs text-gray-600 leading-relaxed mb-8 h-12">
              Created for our returning community — women who continue to evolve, grow, and create their own story.
            </p>
            
            <ul class="space-y-4 flex-grow mb-8">
              <li v-for="(benefit, i) in elanPrivileges" :key="i" class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-[#8B7355]/50 rounded-full shrink-0 mt-1.5"></span>
                <span class="text-xs text-gray-700 font-medium">{{ benefit }}</span>
              </li>
            </ul>

            <button v-if="!isAuthenticated" @click="handleJoinClick" class="w-full py-3 bg-[#8B7355] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#735F46] transition-colors">
              Discover Élan
            </button>
            <div v-else-if="currentTier.name === 'Élan'" class="w-full py-3 bg-[#8B7355]/10 text-[#8B7355] text-[10px] font-black uppercase tracking-widest text-center cursor-default">
              Your Current Status
            </div>
          </div>

          <div class="bg-[#111111] text-white border border-[#333333] rounded-sm p-10 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group">
            <div class="mb-8 border-b border-[#333333] pb-6">
              <span class="text-white/80 text-2xl mb-4 block">❈</span>
              <h3 class="font-serif text-3xl font-bold uppercase tracking-widest text-white mb-2">Héritage</h3>
              <p class="text-xs text-gray-400 font-serif italic mb-4">"For the stories that stay."</p>
              <p class="text-[10px] text-gray-500 uppercase tracking-widest font-bold">10,000+ Pts</p>
            </div>
            
            <p class="text-xs text-gray-400 leading-relaxed mb-8 h-12">
              Our most intimate circle, created for women who have made SOLHÉR part of their journey.
            </p>
            
            <ul class="space-y-4 flex-grow mb-8">
              <li v-for="(benefit, i) in heritagePrivileges" :key="i" class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-white/50 rounded-full shrink-0 mt-1.5"></span>
                <span class="text-xs text-gray-300 font-medium">{{ benefit }}</span>
              </li>
            </ul>

            <button v-if="!isAuthenticated" @click="handleJoinClick" class="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Discover Héritage
            </button>
            <div v-else-if="currentTier.name === 'Héritage'" class="w-full py-3 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest text-center cursor-default">
              Your Current Status
            </div>
          </div>

        </div>
      </div>

      <div class="mt-32 pt-16 border-t border-gray-200 text-center max-w-2xl mx-auto px-6">
        <h2 class="font-serif text-2xl md:text-3xl uppercase tracking-widest text-gray-900 mb-8 leading-relaxed">
          Your Story.<br/>Your Pieces.<br/>Your Circle.
        </h2>
        <p class="text-gray-500 italic font-serif mb-2 text-sm md:text-base">
          Because the most meaningful things we carry are not simply possessions.
        </p>
        <p class="text-gray-500 italic font-serif mb-12 text-sm md:text-base">
          They become part of who we are.
        </p>
        <h3 class="text-xs font-black tracking-[0.3em] uppercase text-black pb-8 border-b border-black inline-block">
          Welcome to the Solhér Circle.
        </h3>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const tokenLocal = localStorage.getItem("token");
const userLocal = localStorage.getItem("user");

const isAuthenticated = ref(!!tokenLocal);
const userData = ref(userLocal ? JSON.parse(userLocal) : null);

// 👇 Array Privileges Sesuai Arahan Boss 👇
const musePrivileges = [
  "Welcome gift",
  "Early access to selected launches",
  "Member-only privileges",
  "Birthday month benefit",
  "Access to SOLHÉR events",
  "First access to limited collections"
];

const elanPrivileges = [
  "All Muse privileges",
  "5% member privilege on selected purchases",
  "Early access to new collections",
  "Complimentary gift wrapping",
  "Exclusive seasonal gifts",
  "Priority access to limited pieces",
  "Birthday month gift",
  "Private event invitations",
  "Priority customer service"
];

const heritagePrivileges = [
  "All Élan privileges",
  "10% member privilege on selected purchases",
  "First access to new collections",
  "Priority reservation of limited pieces",
  "Exclusive Héritage gift",
  "Personal styling & bag consultation",
  "Complimentary care service",
  "Private previews & intimate events",
  "Exclusive Héritage experiences",
  "Special anniversary & birthday gift"
];

const refreshUserData = async () => {
  if (!tokenLocal) return;

  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${tokenLocal}` },
    });
    
    userData.value = res.data.data || res.data;
    localStorage.setItem("user", JSON.stringify(userData.value));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      isAuthenticated.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
};

// 👇 Logika Level Tetap Sama Untuk Menjaga Backend 100% Aman 👇
const currentTier = computed(() => {
  const points = userData.value?.point || 0;
  if (points < 2500) {
    return { name: 'Muse', icon: '✧', next: 2500, nextName: 'Élan' };
  } else if (points < 10000) {
    return { name: 'Élan', icon: '✦', next: 10000, nextName: 'Héritage' };
  } else {
    return { name: 'Héritage', icon: '❈', next: null, nextName: null };
  }
});

onMounted(() => {
  if (isAuthenticated.value) {
    refreshUserData();
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style> -->

<!-- <template>
  <div class="bg-[#FAFAFA] min-h-screen pb-24 font-sans">
    <div class="relative w-full h-[500px] md:h-[600px] bg-black overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
      <img
        src="../../assets/solher_club.jpg" 
        alt="The Solhér Circle"
        class="absolute inset-0 object-cover w-full h-full opacity-50"
      />
      <div class="relative z-20 flex flex-col items-center px-6 text-center text-white max-w-4xl animate-fade-in">
        <h1 class="mb-4 font-serif text-4xl tracking-tighter md:text-6xl uppercase">
          The Solhér Circle
        </h1>
        <p class="text-sm tracking-[0.2em] text-gray-300 uppercase md:text-base mb-8 font-medium">
          More than membership. A place to belong.
        </p>
        <button
          v-if="!isAuthenticated"
          @click="handleJoinClick"
          class="px-10 py-4 text-xs font-black tracking-widest text-black uppercase transition-colors bg-white hover:bg-gray-200 rounded-sm shadow-xl"
        >
          Join The Circle
        </button>
      </div>
    </div>

    <div class="px-6 mx-auto max-w-7xl md:px-12 -mt-16 relative z-30">
      
      <div v-if="isAuthenticated && userData" class="bg-white p-8 md:p-12 shadow-2xl rounded-sm mb-24 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex flex-col gap-2">
          <p class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">Your Circle Status</p>
          <div class="flex items-center gap-4">
            <span class="text-3xl text-gray-300">{{ currentTier.icon }}</span>
            <div>
              <h2 class="font-serif text-3xl font-bold tracking-tight text-gray-900 uppercase">{{ currentTier.name }}</h2>
              <p class="text-sm font-medium text-gray-500 mt-1">
                You carry <span class="text-black font-black text-lg">{{ userData.point || 0 }}</span> stories (points)
              </p>
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-1/3 flex flex-col gap-2">
          <div v-if="currentTier.next" class="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <span>{{ currentTier.name }}</span>
            <span>{{ currentTier.nextName }}</span>
          </div>
          <div v-else class="text-[10px] font-bold text-gray-900 uppercase tracking-widest text-right mb-1">
            Highest Circle Reached
          </div>
          
          <div class="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              class="h-full bg-black transition-all duration-1000" 
              :style="{ width: currentTier.next ? `${((userData.point || 0) / currentTier.next) * 100}%` : '100%' }"
            ></div>
          </div>
          <p v-if="currentTier.next" class="text-right text-[10px] text-gray-400 mt-1 font-medium">
            Accumulate {{ currentTier.next - (userData.point || 0) }} more to discover {{ currentTier.nextName }}.
          </p>
        </div>
      </div>

      <div class="text-center mb-20 mt-16 max-w-3xl mx-auto">
        <p class="text-gray-600 leading-relaxed md:text-lg font-serif italic mb-6">
          "Every SOLHÉR piece is made to accompany a woman through the chapters of her life. The SOLHÉR Circle is our way of celebrating the women who choose to carry those stories with us."
        </p>
        <p class="text-sm text-gray-500 leading-loose">
          From your first piece to the ones you keep for years to come, enjoy thoughtful privileges, early access, and invitations created exclusively for our community.
        </p>
      </div>

      <div class="mt-24">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="bg-white border border-gray-200 rounded-sm p-10 flex flex-col hover:shadow-xl transition-all duration-500 relative group">
            <div class="mb-8 border-b border-gray-100 pb-6">
              <span class="text-gray-300 text-2xl mb-4 block">✧</span>
              <h3 class="font-serif text-3xl font-bold uppercase tracking-widest text-gray-900 mb-2">Muse</h3>
              <p class="text-xs text-gray-500 font-serif italic mb-4">"Your beginning with SOLHÉR."</p>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">0 - 2,499 Pts</p>
            </div>
            
            <p class="text-xs text-gray-600 leading-relaxed mb-8 h-12">
              A complimentary membership for every woman who chooses to become part of our story.
            </p>
            
            <ul class="space-y-4 flex-grow mb-8">
              <li v-for="(benefit, i) in musePrivileges" :key="i" class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0 mt-1.5"></span>
                <span class="text-xs text-gray-600">{{ benefit }}</span>
              </li>
            </ul>

            <button v-if="!isAuthenticated" @click="handleJoinClick" class="w-full py-3 border border-black text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              Become a Muse
            </button>
            <div v-else-if="currentTier.name === 'Muse'" class="w-full py-3 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest text-center cursor-default">
              Your Current Status
            </div>
          </div>

          <div class="bg-[#FDFBF7] border border-[#E8E2D2] rounded-sm p-10 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group shadow-lg">
            <div class="absolute top-0 left-0 w-full bg-[#E8E2D2] text-[#8B7355] text-[9px] font-black uppercase tracking-widest text-center py-1.5">
              The Next Chapter
            </div>
            <div class="mb-8 border-b border-[#E8E2D2] pb-6 mt-4">
              <span class="text-[#8B7355] text-2xl mb-4 block">✦</span>
              <h3 class="font-serif text-3xl font-bold uppercase tracking-widest text-[#8B7355] mb-2">Élan</h3>
              <p class="text-xs text-gray-500 font-serif italic mb-4">"For the woman in motion."</p>
              <p class="text-[10px] text-[#8B7355]/70 uppercase tracking-widest font-bold">2,500 - 9,999 Pts</p>
            </div>
            
            <p class="text-xs text-gray-600 leading-relaxed mb-8 h-12">
              Created for our returning community — women who continue to evolve, grow, and create their own story.
            </p>
            
            <ul class="space-y-4 flex-grow mb-8">
              <li v-for="(benefit, i) in elanPrivileges" :key="i" class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-[#8B7355]/50 rounded-full shrink-0 mt-1.5"></span>
                <span class="text-xs text-gray-700 font-medium">{{ benefit }}</span>
              </li>
            </ul>

            <button v-if="!isAuthenticated" @click="handleJoinClick" class="w-full py-3 bg-[#8B7355] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#735F46] transition-colors">
              Discover Élan
            </button>
            <div v-else-if="currentTier.name === 'Élan'" class="w-full py-3 bg-[#8B7355]/10 text-[#8B7355] text-[10px] font-black uppercase tracking-widest text-center cursor-default">
              Your Current Status
            </div>
          </div>

          <div class="bg-[#111111] text-white border border-[#333333] rounded-sm p-10 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group">
            <div class="mb-8 border-b border-[#333333] pb-6">
              <span class="text-white/80 text-2xl mb-4 block">❈</span>
              <h3 class="font-serif text-3xl font-bold uppercase tracking-widest text-white mb-2">Héritage</h3>
              <p class="text-xs text-gray-400 font-serif italic mb-4">"For the stories that stay."</p>
              <p class="text-[10px] text-gray-500 uppercase tracking-widest font-bold">10,000+ Pts</p>
            </div>
            
            <p class="text-xs text-gray-400 leading-relaxed mb-8 h-12">
              Our most intimate circle, created for women who have made SOLHÉR part of their journey.
            </p>
            
            <ul class="space-y-4 flex-grow mb-8">
              <li v-for="(benefit, i) in heritagePrivileges" :key="i" class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-white/50 rounded-full shrink-0 mt-1.5"></span>
                <span class="text-xs text-gray-300 font-medium">{{ benefit }}</span>
              </li>
            </ul>

            <button v-if="!isAuthenticated" @click="handleJoinClick" class="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
              Discover Héritage
            </button>
            <div v-else-if="currentTier.name === 'Héritage'" class="w-full py-3 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest text-center cursor-default">
              Your Current Status
            </div>
          </div>

        </div>
      </div>

      <div class="max-w-4xl mx-auto mt-32 px-6">
        <h2 class="font-serif text-2xl md:text-3xl tracking-tighter text-center text-gray-900 uppercase mb-12">
          Frequently Asked Questions
        </h2>
        <div class="space-y-2 border-t border-gray-200 pt-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-100 py-6">
            <button @click="toggleFaq(index)" class="flex justify-between items-center w-full text-left focus:outline-none group">
              <h4 class="font-bold text-xs uppercase tracking-widest text-gray-900 group-hover:text-gray-500 transition-colors pr-8 leading-relaxed">
                {{ faq.question }}
              </h4>
              <span class="text-xl font-light text-gray-400 transition-transform duration-300" :class="{ 'rotate-45': activeFaq === index }">+</span>
            </button>
            <transition name="faq-fade">
              <div v-show="activeFaq === index" class="mt-4 text-sm text-gray-600 leading-relaxed font-serif italic pr-8">
                {{ faq.answer }}
              </div>
            </transition>
          </div>
        </div>
      </div>

      <div class="mt-32 pt-16 border-t border-gray-200 text-center max-w-2xl mx-auto px-6">
        <h2 class="font-serif text-2xl md:text-3xl uppercase tracking-widest text-gray-900 mb-8 leading-relaxed">
          Your Story.<br/>Your Pieces.<br/>Your Circle.
        </h2>
        <p class="text-gray-500 italic font-serif mb-2 text-sm md:text-base">
          Because the most meaningful things we carry are not simply possessions.
        </p>
        <p class="text-gray-500 italic font-serif mb-12 text-sm md:text-base">
          They become part of who we are.
        </p>
        <h3 class="text-xs font-black tracking-[0.3em] uppercase text-black pb-8 border-b border-black inline-block">
          Welcome to the Solhér Circle.
        </h3>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const tokenLocal = localStorage.getItem("token");
const userLocal = localStorage.getItem("user");

const isAuthenticated = ref(!!tokenLocal);
const userData = ref(userLocal ? JSON.parse(userLocal) : null);

// 👇 STATE UNTUK FAQ 👇
const activeFaq = ref(null);

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

// Data Pertanyaan FAQ Sesuai Kebutuhan
const faqs = [
  {
    question: "How are Solhér Points calculated?",
    answer: "For every Rp 1.000 spent on our collections, you are rewarded with 1 Point as a Muse. As you ascend, your rewards gracefully multiply: Élan members receive 1.5 Points, and Héritage members receive 2 Points for every Rp 1.000 spent."
  },
  {
    question: "How do I redeem my accumulated Points?",
    answer: "Your points carry tangible value. You may apply them at checkout to reduce your final total. Every 1.000 Points grants you a direct deduction of Rp 1.000."
  },
  {
    question: "Do my Status and Points expire?",
    answer: "Your points and tier status remain valid for 12 months from the date of your last purchase. Continuing your journey with us within the year automatically extends their validity."
  },
  {
    question: "How do I claim my Birthday Month Benefit?",
    answer: "A specially curated birthday privilege will be sent exclusively to your registered email address at the beginning of your birthday month. Please ensure your profile details are complete."
  }
];

const musePrivileges = [
  "Welcome gift",
  "Early access to selected launches",
  "Member-only privileges",
  "Birthday month benefit",
  "Access to SOLHÉR events",
  "First access to limited collections"
];

const elanPrivileges = [
  "All Muse privileges",
  "5% member privilege on selected purchases",
  "Early access to new collections",
  "Complimentary gift wrapping",
  "Exclusive seasonal gifts",
  "Priority access to limited pieces",
  "Birthday month gift",
  "Private event invitations",
  "Priority customer service"
];

const heritagePrivileges = [
  "All Élan privileges",
  "10% member privilege on selected purchases",
  "First access to new collections",
  "Priority reservation of limited pieces",
  "Exclusive Héritage gift",
  "Personal styling & bag consultation",
  "Complimentary care service",
  "Private previews & intimate events",
  "Exclusive Héritage experiences",
  "Special anniversary & birthday gift"
];

const refreshUserData = async () => {
  if (!tokenLocal) return;

  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${tokenLocal}` },
    });
    
    userData.value = res.data.data || res.data;
    localStorage.setItem("user", JSON.stringify(userData.value));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      isAuthenticated.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
};

const currentTier = computed(() => {
  const points = userData.value?.point || 0;
  if (points < 2500) {
    return { name: 'Muse', icon: '✧', next: 2500, nextName: 'Élan' };
  } else if (points < 10000) {
    return { name: 'Élan', icon: '✦', next: 10000, nextName: 'Héritage' };
  } else {
    return { name: 'Héritage', icon: '❈', next: null, nextName: null };
  }
});

onMounted(() => {
  if (isAuthenticated.value) {
    refreshUserData();
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transisi Halus untuk FAQ */
.faq-fade-enter-active,
.faq-fade-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}
.faq-fade-enter-from,
.faq-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style> -->

<template>
  <div class="bg-[#FAFAFA] min-h-screen pb-24 font-sans">
    <!-- Hero Banner -->
    <div class="relative w-full h-[500px] md:h-[600px] bg-black overflow-hidden flex items-center justify-center">
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
      <img
        src="../../assets/solher_club.jpg" 
        alt="The Solhér Circle"
        class="absolute inset-0 object-cover w-full h-full opacity-50"
      />
      <div class="relative z-20 flex flex-col items-center px-6 text-center text-white max-w-4xl animate-fade-in">
        <h1 class="mb-4 font-serif text-4xl tracking-tighter md:text-6xl uppercase">
          {{ $t("solher_club_page.hero_title") }}
        </h1>
        <p class="text-sm tracking-[0.2em] text-gray-300 uppercase md:text-base mb-8 font-medium">
          {{ $t("solher_club_page.hero_subtitle") }}
        </p>
        <button
          v-if="!isAuthenticated"
          @click="handleJoinClick"
          class="px-10 py-4 text-xs font-black tracking-widest text-black uppercase transition-colors bg-white hover:bg-gray-200 rounded-sm shadow-xl"
        >
          {{ $t("solher_club_page.join_btn") }}
        </button>
      </div>
    </div>

    <div class="px-6 mx-auto max-w-7xl md:px-12 -mt-16 relative z-30">
      
      <!-- 👇 STATUS MEMBERSHIP USER (Jika Login) 👇 -->
      <div v-if="isAuthenticated && userData" class="bg-white p-8 md:p-12 shadow-2xl rounded-sm mb-24 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
        <div class="flex flex-col gap-2">
          <p class="text-[10px] font-bold tracking-widest text-gray-400 uppercase">{{ $t("solher_club_page.status_title") }}</p>
          <div class="flex items-center gap-4">
            <span class="text-3xl text-gray-300">{{ currentTier.icon }}</span>
            <div>
              <h2 class="font-serif text-3xl font-bold tracking-tight text-gray-900 uppercase">{{ currentTier.name }}</h2>
              <p class="text-sm font-medium text-gray-500 mt-1">
                {{ $t("solher_club_page.you_carry") }} <span class="text-black font-black text-lg">{{ userData.point || 0 }}</span> {{ $t("solher_club_page.stories") }}
              </p>
            </div>
          </div>
        </div>
        
        <div class="w-full md:w-1/3 flex flex-col gap-2">
          <div v-if="currentTier.next" class="flex justify-between text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            <span>{{ currentTier.name }}</span>
            <span>{{ currentTier.nextName }}</span>
          </div>
          <div v-else class="text-[10px] font-bold text-gray-900 uppercase tracking-widest text-right mb-1">
            {{ $t("solher_club_page.highest_circle") }}
          </div>
          
          <div class="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <div 
              class="h-full bg-black transition-all duration-1000" 
              :style="{ width: currentTier.next ? `${((userData.point || 0) / currentTier.next) * 100}%` : '100%' }"
            ></div>
          </div>
          <p v-if="currentTier.next" class="text-right text-[10px] text-gray-400 mt-1 font-medium">
            {{ $t("solher_club_page.accumulate_1") }} {{ currentTier.next - (userData.point || 0) }} {{ $t("solher_club_page.accumulate_2") }} {{ currentTier.nextName }}.
          </p>
        </div>
      </div>

      <!-- Introduction Section -->
      <div class="text-center mb-20 mt-16 max-w-3xl mx-auto">
        <p class="text-gray-600 leading-relaxed md:text-lg font-serif italic mb-6">
          {{ $t("solher_club_page.intro_quote") }}
        </p>
        <p class="text-sm text-gray-500 leading-loose">
          {{ $t("solher_club_page.intro_desc") }}
        </p>
      </div>

      <!-- Tiers Section -->
      <div class="mt-24">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <!-- Tier 1: MUSE -->
          <div class="bg-white border border-gray-200 rounded-sm p-10 flex flex-col hover:shadow-xl transition-all duration-500 relative group">
            <div class="mb-8 border-b border-gray-100 pb-6">
              <span class="text-gray-300 text-2xl mb-4 block">✧</span>
              <h3 class="font-serif text-3xl font-bold uppercase tracking-widest text-gray-900 mb-2">Muse</h3>
              <p class="text-xs text-gray-500 font-serif italic mb-4">{{ $t("solher_club_page.tier_muse_quote") }}</p>
              <p class="text-[10px] text-gray-400 uppercase tracking-widest font-bold">0 - 2,499 Pts</p>
            </div>
            
            <p class="text-xs text-gray-600 leading-relaxed mb-8 h-12">
              {{ $t("solher_club_page.tier_muse_desc") }}
            </p>
            
            <ul class="space-y-4 flex-grow mb-8">
              <li v-for="(benefit, i) in musePrivileges" :key="i" class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-gray-300 rounded-full shrink-0 mt-1.5"></span>
                <span class="text-xs text-gray-600">{{ benefit }}</span>
              </li>
            </ul>

            <button v-if="!isAuthenticated" @click="handleJoinClick" class="w-full py-3 border border-black text-black text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-colors">
              {{ $t("solher_club_page.btn_become_muse") }}
            </button>
            <div v-else-if="currentTier.name === 'Muse'" class="w-full py-3 bg-gray-100 text-gray-500 text-[10px] font-black uppercase tracking-widest text-center cursor-default">
              {{ $t("solher_club_page.btn_current_status") }}
            </div>
          </div>

          <!-- Tier 2: ÉLAN -->
          <div class="bg-[#FDFBF7] border border-[#E8E2D2] rounded-sm p-10 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group shadow-lg">
            <div class="absolute top-0 left-0 w-full bg-[#E8E2D2] text-[#8B7355] text-[9px] font-black uppercase tracking-widest text-center py-1.5">
              {{ $t("solher_club_page.tier_elan_badge") }}
            </div>
            <div class="mb-8 border-b border-[#E8E2D2] pb-6 mt-4">
              <span class="text-[#8B7355] text-2xl mb-4 block">✦</span>
              <h3 class="font-serif text-3xl font-bold uppercase tracking-widest text-[#8B7355] mb-2">Élan</h3>
              <p class="text-xs text-gray-500 font-serif italic mb-4">{{ $t("solher_club_page.tier_elan_quote") }}</p>
              <p class="text-[10px] text-[#8B7355]/70 uppercase tracking-widest font-bold">2,500 - 9,999 Pts</p>
            </div>
            
            <p class="text-xs text-gray-600 leading-relaxed mb-8 h-12">
              {{ $t("solher_club_page.tier_elan_desc") }}
            </p>
            
            <ul class="space-y-4 flex-grow mb-8">
              <li v-for="(benefit, i) in elanPrivileges" :key="i" class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-[#8B7355]/50 rounded-full shrink-0 mt-1.5"></span>
                <span class="text-xs text-gray-700 font-medium">{{ benefit }}</span>
              </li>
            </ul>

            <button v-if="!isAuthenticated" @click="handleJoinClick" class="w-full py-3 bg-[#8B7355] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#735F46] transition-colors">
              {{ $t("solher_club_page.btn_discover_elan") }}
            </button>
            <div v-else-if="currentTier.name === 'Élan'" class="w-full py-3 bg-[#8B7355]/10 text-[#8B7355] text-[10px] font-black uppercase tracking-widest text-center cursor-default">
              {{ $t("solher_club_page.btn_current_status") }}
            </div>
          </div>

          <!-- Tier 3: HÉRITAGE -->
          <div class="bg-[#111111] text-white border border-[#333333] rounded-sm p-10 flex flex-col hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative group">
            <div class="mb-8 border-b border-[#333333] pb-6">
              <span class="text-white/80 text-2xl mb-4 block">❈</span>
              <h3 class="font-serif text-3xl font-bold uppercase tracking-widest text-white mb-2">Héritage</h3>
              <p class="text-xs text-gray-400 font-serif italic mb-4">{{ $t("solher_club_page.tier_heritage_quote") }}</p>
              <p class="text-[10px] text-gray-500 uppercase tracking-widest font-bold">10,000+ Pts</p>
            </div>
            
            <p class="text-xs text-gray-400 leading-relaxed mb-8 h-12">
              {{ $t("solher_club_page.tier_heritage_desc") }}
            </p>
            
            <ul class="space-y-4 flex-grow mb-8">
              <li v-for="(benefit, i) in heritagePrivileges" :key="i" class="flex items-start gap-3">
                <span class="w-1.5 h-1.5 bg-white/50 rounded-full shrink-0 mt-1.5"></span>
                <span class="text-xs text-gray-300 font-medium">{{ benefit }}</span>
              </li>
            </ul>

            <button v-if="!isAuthenticated" @click="handleJoinClick" class="w-full py-3 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-gray-200 transition-colors">
              {{ $t("solher_club_page.btn_discover_heritage") }}
            </button>
            <div v-else-if="currentTier.name === 'Héritage'" class="w-full py-3 bg-white/10 text-white text-[10px] font-black uppercase tracking-widest text-center cursor-default">
              {{ $t("solher_club_page.btn_current_status") }}
            </div>
          </div>

        </div>
      </div>

      <!-- FAQ SECTION -->
      <div class="max-w-4xl mx-auto mt-32 px-6">
        <h2 class="font-serif text-2xl md:text-3xl tracking-tighter text-center text-gray-900 uppercase mb-12">
          {{ $t("solher_club_page.faq_title") }}
        </h2>
        <div class="space-y-2 border-t border-gray-200 pt-4">
          <div v-for="(faq, index) in faqs" :key="index" class="border-b border-gray-100 py-6">
            <button @click="toggleFaq(index)" class="flex justify-between items-center w-full text-left focus:outline-none group">
              <h4 class="font-bold text-xs uppercase tracking-widest text-gray-900 group-hover:text-gray-500 transition-colors pr-8 leading-relaxed">
                {{ faq.question }}
              </h4>
              <span class="text-xl font-light text-gray-400 transition-transform duration-300" :class="{ 'rotate-45': activeFaq === index }">+</span>
            </button>
            <transition name="faq-fade">
              <div v-show="activeFaq === index" class="mt-4 text-sm text-gray-600 leading-relaxed font-serif italic pr-8">
                {{ faq.answer }}
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Closing Footer Section -->
      <div class="mt-32 pt-16 border-t border-gray-200 text-center max-w-2xl mx-auto px-6">
        <h2 class="font-serif text-2xl md:text-3xl uppercase tracking-widest text-gray-900 mb-8 leading-relaxed">
          {{ $t("solher_club_page.footer_1") }}<br/>{{ $t("solher_club_page.footer_2") }}<br/>{{ $t("solher_club_page.footer_3") }}
        </h2>
        <p class="text-gray-500 italic font-serif mb-2 text-sm md:text-base">
          {{ $t("solher_club_page.footer_desc_1") }}
        </p>
        <p class="text-gray-500 italic font-serif mb-12 text-sm md:text-base">
          {{ $t("solher_club_page.footer_desc_2") }}
        </p>
        <h3 class="text-xs font-black tracking-[0.3em] uppercase text-black pb-8 border-b border-black inline-block">
          {{ $t("solher_club_page.footer_welcome") }}
        </h3>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const { t } = useI18n();

const tokenLocal = localStorage.getItem("token");
const userLocal = localStorage.getItem("user");

const isAuthenticated = ref(!!tokenLocal);
const userData = ref(userLocal ? JSON.parse(userLocal) : null);

// STATE UNTUK FAQ
const activeFaq = ref(null);

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};

// Data List diterjemahkan secara reactive menggunakan computed
const faqs = computed(() => [
  {
    question: t("solher_club_page.faq_q1"),
    answer: t("solher_club_page.faq_a1")
  },
  {
    question: t("solher_club_page.faq_q2"),
    answer: t("solher_club_page.faq_a2")
  },
  {
    question: t("solher_club_page.faq_q3"),
    answer: t("solher_club_page.faq_a3")
  },
  {
    question: t("solher_club_page.faq_q4"),
    answer: t("solher_club_page.faq_a4")
  }
]);

const musePrivileges = computed(() => [
  t("solher_club_page.privileges_muse_1"),
  t("solher_club_page.privileges_muse_2"),
  t("solher_club_page.privileges_muse_3"),
  t("solher_club_page.privileges_muse_4"),
  t("solher_club_page.privileges_muse_5"),
  t("solher_club_page.privileges_muse_6")
]);

const elanPrivileges = computed(() => [
  t("solher_club_page.privileges_elan_1"),
  t("solher_club_page.privileges_elan_2"),
  t("solher_club_page.privileges_elan_3"),
  t("solher_club_page.privileges_elan_4"),
  t("solher_club_page.privileges_elan_5"),
  t("solher_club_page.privileges_elan_6"),
  t("solher_club_page.privileges_elan_7"),
  t("solher_club_page.privileges_elan_8"),
  t("solher_club_page.privileges_elan_9")
]);

const heritagePrivileges = computed(() => [
  t("solher_club_page.privileges_heritage_1"),
  t("solher_club_page.privileges_heritage_2"),
  t("solher_club_page.privileges_heritage_3"),
  t("solher_club_page.privileges_heritage_4"),
  t("solher_club_page.privileges_heritage_5"),
  t("solher_club_page.privileges_heritage_6"),
  t("solher_club_page.privileges_heritage_7"),
  t("solher_club_page.privileges_heritage_8"),
  t("solher_club_page.privileges_heritage_9"),
  t("solher_club_page.privileges_heritage_10")
]);

const refreshUserData = async () => {
  if (!tokenLocal) return;

  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${tokenLocal}` },
    });
    
    userData.value = res.data.data || res.data;
    localStorage.setItem("user", JSON.stringify(userData.value));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      isAuthenticated.value = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }
};

const currentTier = computed(() => {
  const points = userData.value?.point || 0;
  if (points < 2500) {
    return { name: 'Muse', icon: '✧', next: 2500, nextName: 'Élan' };
  } else if (points < 10000) {
    return { name: 'Élan', icon: '✦', next: 10000, nextName: 'Héritage' };
  } else {
    return { name: 'Héritage', icon: '❈', next: null, nextName: null };
  }
});

const handleJoinClick = () => {
  Swal.fire({
    title: 'Create Your Story',
    text: 'Silakan buat akun atau login terlebih dahulu untuk bergabung dengan Solhér Circle.',
    icon: 'info',
    confirmButtonText: 'Lanjutkan',
    confirmButtonColor: '#000000', // Warna hitam elegan
  }).then((result) => {
    if (result.isConfirmed) {
      router.push('/login'); // atau '/register'
    }
  });
};

onMounted(() => {
  if (isAuthenticated.value) {
    refreshUserData();
  }
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Transisi Halus untuk FAQ */
.faq-fade-enter-active,
.faq-fade-leave-active {
  transition: all 0.3s ease;
  transform-origin: top;
}
.faq-fade-enter-from,
.faq-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>