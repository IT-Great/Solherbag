<template>
  <div class="bg-white px-6 md:px-12 lg:px-24 py-20 min-h-screen">
    <div class="mx-auto max-w-4xl">
      <div class="mb-16">
        <h1 class="font-serif text-gray-900 text-5xl md:text-7xl lg:text-8xl leading-tight tracking-tight">
          Welcome to <br />
          SolHer <br />
          Customer Care!
        </h1>
      </div>

      <div class="mb-12">
        <p class="font-light text-gray-600 text-lg md:text-xl">
          We are here to help you discover the best natural solutions for your health and well-being.
        </p>
      </div>

      <div class="space-y-12">
        <section>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-pink-500">📞</span>
            <h2 class="font-bold text-gray-900 text-lg uppercase tracking-wider">Contact Us</h2>
          </div>
          <div class="space-y-1 font-medium text-gray-800">
            <p>Phone / WhatsApp: <span class="font-bold">+62 888 388 8585</span></p>
            <p>Email: <a href="mailto:care@solherbag.com" class="font-bold hover:underline">care@solherbag.com</a></p>
            <p class="mt-2">↗</p>
          </div>
        </section>

        <section>
          <div class="flex items-center gap-2 mb-4">
            <span class="text-gray-500">🕒</span>
            <h2 class="font-bold text-gray-900 text-lg uppercase tracking-wider">Operating Hours</h2>
          </div>
          <p class="mb-4 text-gray-600">Our customer service is available every day:</p>
          
          <div class="space-y-2 text-gray-900">
            <p><span class="font-bold">Monday – Friday:</span> 8:00 AM – 5:00 PM (WIB)</p>
            <p><span class="font-bold">Saturday:</span> 9:00 AM – 2:00 PM (WIB)</p>
            <p><span class="font-bold">Sunday & Public Holidays:</span> <span class="text-gray-500">Closed</span></p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
// Tidak memerlukan logika rumit, hanya komponen statis untuk informasi
</script>

<style scoped>
/* Pastikan untuk menggunakan font serif yang elegan di main.js atau import di sini */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&display=swap');

h1 {
  font-family: 'Playfair Display', serif;
}

section h2 {
  font-size: 0.9rem;
}

/* Mengatur spacing agar mirip dengan layout gambar */
p {
  line-height: 1.6;
}
</style>