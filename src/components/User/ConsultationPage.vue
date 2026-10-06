<template>
  <div class="min-h-screen pt-24 pb-12 bg-[#0a0a0a] text-white">
    <div class="max-w-4xl px-6 mx-auto md:px-12 animate-fade-in">
      
      <!-- Premium Header -->
      <div class="flex flex-col items-center text-center mb-16">
        <div class="flex items-center gap-3 mb-6">
          <span class="w-12 h-px bg-yellow-600/50"></span>
          <span class="text-xl text-yellow-500">❈</span>
          <span class="w-12 h-px bg-yellow-600/50"></span>
        </div>
        <h1 class="text-4xl md:text-5xl font-serif font-black tracking-tight text-white mb-4">
          Héritage Concierge
        </h1>
        <p class="text-sm font-medium tracking-widest text-gray-400 uppercase">
          Eksklusif untuk {{ userData?.first_name || 'Member' }}
        </p>
      </div>

      <!-- Main Content / Consultation Interface -->
      <div class="bg-[#111111] border border-[#333333] rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
        
        <!-- Background Accent -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-600/10 rounded-full mix-blend-screen filter blur-[80px] pointer-events-none"></div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          
          <!-- Left: Greeting & Info -->
          <div class="space-y-6">
            <h2 class="text-2xl font-serif font-black text-white">Layanan Personal Anda.</h2>
            <p class="text-gray-400 text-sm leading-relaxed">
              Sebagai member Héritage, Anda memiliki akses prioritas ke Personal Shopper kami. Konsultasikan gaya Anda, tanyakan detail material spesifik, atau jadwalkan *private viewing* koleksi terbaru sebelum rilis publik.
            </p>
            
            <div class="pt-6 border-t border-[#333333]">
              <h3 class="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">Layanan Tersedia</h3>
              <ul class="space-y-4">
                <li class="flex items-center gap-3 text-sm text-gray-300">
                  <div class="p-1.5 bg-yellow-900/30 text-yellow-500 rounded-full">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  Prioritas Respon (< 15 Menit)
                </li>
                <li class="flex items-center gap-3 text-sm text-gray-300">
                  <div class="p-1.5 bg-yellow-900/30 text-yellow-500 rounded-full">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  Kurasi Gaya Personal
                </li>
                <li class="flex items-center gap-3 text-sm text-gray-300">
                  <div class="p-1.5 bg-yellow-900/30 text-yellow-500 rounded-full">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  Bantuan *Pre-Order* Spesial
                </li>
              </ul>
            </div>
          </div>

          <!-- Right: CTA to Chat -->
          <div class="flex flex-col justify-center items-center text-center p-8 bg-black rounded-3xl border border-[#222222]">
            <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(234,179,8,0.3)]">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-2">Mulai Konsultasi</h3>
            <p class="text-xs text-gray-500 mb-8">Personal shopper Anda sedang *online* dan siap membantu.</p>
            
            <button 
              @click="startConsultation"
              class="w-full py-4 px-6 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:bg-gray-200 transition-colors shadow-lg active:scale-95"
            >
              Hubungi Concierge
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const userData = ref(null);

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    userData.value = JSON.parse(storedUser);
    
    // Keamanan Ganda (Double-check di sisi klien jika rute bocor)
    const points = userData.value.point || 0;
    if (!userData.value.is_membership || points < 10000) {
      router.push('/profilepage'); // Tendang kembali ke profil
    }
  } else {
    router.push('/login');
  }
});

const startConsultation = () => {
  // Animasi elegan sebelum dialihkan ke chat
  Swal.fire({
    title: 'Menghubungkan...',
    text: 'Menyiapkan jalur komunikasi aman dengan Personal Shopper Anda.',
    allowOutsideClick: false,
    showConfirmButton: false,
    timer: 1500,
    didOpen: () => {
      Swal.showLoading();
    }
  }).then(() => {
    // Alihkan user langsung ke halaman Chat khusus
    router.push('/chat-list'); 
  });
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>