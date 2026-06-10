<!-- <template>
  <div class="min-h-screen overflow-x-hidden bg-white">
    <div class="flex flex-col justify-center items-center px-6 py-20 min-h-[70vh]">
      <div class="max-w-3xl text-center">
        <h1 class="mb-8 font-serif text-6xl tracking-tight text-gray-900 md:text-8xl">
          About Us
        </h1>

        <p
          class="px-4 text-sm leading-relaxed tracking-widest text-gray-600 uppercase md:px-12 md:text-base"
        >
          In every stitch and every detail, Solher creates more than just a bag – we craft
          a legacy. Inspired by timeless elegance and the strength of modern women, each
          Solher piece is designed to embody confidence, refined living, and luxury that
          transcends time.
        </p>
      </div>
    </div>

    <div
      class="relative flex py-10 overflow-x-hidden bg-white border-t border-b border-gray-100"
    >
      <div class="absolute flex top-10 whitespace-nowrap animate-marquee2">
        <span
          v-for="n in 10"
          :key="n"
          class="mx-4 text-sm font-medium tracking-tighter text-gray-800 uppercase"
        >
          We make things that work better and last longer. &nbsp;&nbsp; •
        </span>
      </div>
    </div>

      <div class="flex whitespace-nowrap animate-marquee">
        <span v-for="n in 10" :key="n" class="mx-4 text-sm font-medium tracking-tighter text-gray-800 uppercase">
          We make things that work better and last longer. &nbsp;&nbsp; •
        </span>
      </div> 

    <div class="w-full">
      <img
        src="../../../src/assets/about_us_image.png"
        alt="Solher Craftsmanship"
        class="w-full h-auto max-h-[800px] object-cover"
      />
    </div>
  </div>
</template>

<script setup>
// Script tetap kosong
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500&display=swap");

h1 {
  font-family: "Playfair Display", serif;
}

/* Animasi Marquee */
.animate-marquee {
  display: inline-block;
  animation: marquee 35s linear infinite;
}

.animate-marquee2 {
  display: inline-block;
  animation: marquee2 35s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}

.whitespace-nowrap {
  white-space: nowrap;
}
</style> -->

<template>
  <div class="min-h-screen overflow-x-hidden bg-white">
    <div class="flex flex-col justify-center items-center px-6 py-24 min-h-[70vh]">
      <div class="max-w-4xl text-center animate-fade-in">
        <h1
          class="mb-10 font-serif text-4xl leading-tight tracking-tight text-gray-900 md:text-6xl"
        >
          {{ $t("about.title_one") }} <br class="hidden md:block" />
          <span class="italic text-gray-700">{{ $t("about.title_two") }}</span>
        </h1>

        <div
          class="px-4 space-y-6 text-sm font-light leading-loose tracking-wide text-justify text-gray-700 md:px-12 md:text-base md:text-center"
        >
          <p>
            {{ $t("about.paragraph_one") }}
          </p>
          <p>
            {{ $t("about.paragraph_two") }}
          </p>
          <p>
            {{ $t("about.paragraph_three") }}
          </p>
        </div>
      </div>
    </div>

    <div
      class="relative flex py-10 overflow-x-hidden bg-white border-t border-b border-gray-100"
    >
      <div class="absolute flex top-10 whitespace-nowrap animate-marquee2">
        <span
          v-for="n in 10"
          :key="n"
          class="mx-4 text-sm font-medium tracking-tighter text-gray-800 uppercase"
        >
          {{ $t("about.cta_1") }} &nbsp;&nbsp; •
        </span>
      </div>
    </div>

    <div class="w-full">
      <img
        src="../../../src/assets/about_us_image.png"
        alt="Solher Craftsmanship"
        class="w-full h-auto max-h-[800px] object-cover"
      />
    </div>
  </div>
</template>

<script setup>
// Script kosong
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap");

h1 {
  font-family: "Playfair Display", serif;
}

.animate-fade-in {
  animation: fadeIn 0.8s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Animasi Marquee */
.animate-marquee {
  display: inline-block;
  animation: marquee 35s linear infinite;
}

.animate-marquee2 {
  display: inline-block;
  animation: marquee2 35s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes marquee2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}

.whitespace-nowrap {
  white-space: nowrap;
}
</style>
