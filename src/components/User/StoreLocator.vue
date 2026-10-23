<template>
  <div class="min-h-screen bg-white px-6 py-24 md:py-32 border-t border-gray-100">
    <div class="max-w-5xl mx-auto">
      <div class="mb-16 text-center">
        <h1 class="font-serif text-4xl md:text-5xl text-gray-900 mb-4">Our Boutiques</h1>
        <p class="text-xs font-bold tracking-widest text-gray-400 uppercase">Find a Solhér near you</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Surabaya Store -->
        <div class="p-8 border border-gray-200 bg-[#Fdfbf7] rounded-3xl hover:border-black transition-colors">
          <span class="text-[10px] font-bold tracking-[0.2em] text-[#8c3b4a] uppercase mb-4 block">Flagship Store</span>
          <h2 class="text-2xl font-serif mb-2 text-black">Solhér Surabaya</h2>
          <p class="text-sm text-gray-500 mb-6 leading-relaxed">
            Pakuwon Mall, Ground Floor, Unit G-12<br/>
            Surabaya, East Java 60227
          </p>
          <p class="text-xs font-bold text-gray-900 mb-8 uppercase tracking-widest">Open Daily: 10:00 - 22:00</p>
          <a href="#" class="inline-block px-6 py-3 text-[10px] font-bold tracking-widest text-white uppercase bg-black rounded-full hover:bg-gray-800 transition-colors">Get Directions</a>
        </div>

        <!-- Placeholder for Jakarta -->
        <div class="p-8 border border-gray-200 bg-white rounded-3xl opacity-60">
          <span class="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-4 block">Opening Soon</span>
          <h2 class="text-2xl font-serif mb-2 text-gray-800">Solhér Jakarta</h2>
          <p class="text-sm text-gray-400 mb-6 leading-relaxed">
            Plaza Senayan, Level 1<br/>
            Central Jakarta, DKI Jakarta
          </p>
          <p class="text-xs font-bold text-gray-400 mb-8 uppercase tracking-widest">Coming Fall 2026</p>
        </div>
      </div>
    </div>
  </div>
</template>