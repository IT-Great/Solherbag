<template>
  <div class="min-h-screen pt-24 pb-12 bg-[#0a0a0a] text-white">
    <div class="max-w-5xl px-6 mx-auto md:px-12 animate-fade-in">
      <!-- Premium Header -->
      <div
        class="flex flex-col items-center text-center mb-12 transition-all duration-700"
        :class="{ 'opacity-0 -translate-y-4': isConnecting }"
      >
        <div class="flex items-center gap-3 mb-6">
          <span class="w-12 h-px bg-yellow-600/50"></span>
          <span class="text-xl text-yellow-500">❈</span>
          <span class="w-12 h-px bg-yellow-600/50"></span>
        </div>
        <h1
          class="text-3xl md:text-5xl font-serif font-black tracking-tight text-white mb-4"
        >
          {{ t('consultation.title') }}
        </h1>
        <p
          class="text-xs md:text-sm font-medium tracking-[0.2em] text-gray-400 uppercase"
        >
          {{ t('consultation.exclusive_for', { name: userData?.first_name || t('consultation.guest_fallback') }) }}
        </p>
      </div>

      <!-- Main Content Container -->
      <div
        class="relative bg-[#111111] border border-[#333333] rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-700"
        :class="{ 'opacity-0 scale-95': isConnecting }"
      >
        <!-- Background Accent -->
        <div
          class="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-600/5 rounded-full mix-blend-screen filter blur-[100px] pointer-events-none"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-900/10 rounded-full mix-blend-screen filter blur-[80px] pointer-events-none"
        ></div>

        <!-- ======================= -->
        <!-- INTAKE FORM (STEP 1 - 4)-->
        <!-- ======================= -->
        <div
          v-if="!isConnecting"
          class="relative z-10 flex flex-col md:flex-row min-h-[500px]"
        >
          <!-- LEFT PANEL: Progress & Info -->
          <div
            class="w-full md:w-1/3 bg-[#0d0d0d] p-8 md:p-10 border-b md:border-b-0 md:border-r border-[#222222] flex flex-col justify-between"
          >
            <div>
              <h2 class="text-lg font-serif font-bold text-white mb-2">
                {{ t('consultation.preparation.title') }}
              </h2>
              <p class="text-xs text-gray-500 leading-relaxed mb-10">
                {{ t('consultation.preparation.subtitle') }}
              </p>

              <!-- Progress Steps -->
              <div class="space-y-6">
                <div
                  v-for="(step, index) in steps"
                  :key="index"
                  class="flex items-center gap-4"
                >
                  <div
                    class="flex items-center justify-center w-8 h-8 rounded-full border text-[10px] font-bold transition-all duration-500"
                    :class="[
                      currentStep > index
                        ? 'bg-yellow-600 border-yellow-600 text-black'
                        : currentStep === index
                          ? 'bg-transparent border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]'
                          : 'bg-transparent border-[#333] text-[#555]',
                    ]"
                  >
                    <svg
                      v-if="currentStep > index"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-4 h-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span v-else>{{ index + 1 }}</span>
                  </div>
                  <span
                    class="text-xs font-bold uppercase tracking-widest transition-colors duration-300"
                    :class="currentStep >= index ? 'text-white' : 'text-[#555]'"
                  >
                    {{ step.title }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Privilege Badge -->
            <div
              class="mt-12 p-4 bg-yellow-900/20 border border-yellow-700/30 rounded-2xl flex items-start gap-3"
            >
              <span class="text-yellow-500 mt-0.5">✦</span>
              <div>
                <p
                  class="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1"
                >
                  {{ t('consultation.priority_lane.title') }}
                </p>
                <p class="text-[10px] text-yellow-500/70 leading-relaxed">
                  {{ t('consultation.priority_lane.desc') }}
                </p>
              </div>
            </div>
          </div>

          <!-- RIGHT PANEL: Dynamic Questions -->
          <div
            class="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-between relative"
          >
            <transition name="slide-fade" mode="out-in">
              <!-- STEP 1: TUJUAN KONSULTASI -->
              <div
                v-if="currentStep === 0"
                key="step1"
                class="space-y-6 max-w-xl mx-auto w-full"
              >
                <h3 class="text-2xl font-serif text-white mb-2">
                  {{ t('consultation.step1.question') }}
                </h3>
                <p class="text-sm text-gray-400 mb-8">
                  {{ t('consultation.step1.desc') }}
                </p>

                <div class="grid grid-cols-1 gap-4">
                  <label
                    v-for="option in formOptions.intents"
                    :key="option.id"
                    :class="
                      form.intent === option.id
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-[#333] hover:border-gray-500 bg-black/50'
                    "
                    class="flex items-start gap-4 p-5 rounded-2xl border cursor-pointer transition-all duration-300 group"
                  >
                    <input
                      type="radio"
                      v-model="form.intent"
                      :value="option.id"
                      class="hidden"
                    />
                    <div
                      class="p-2 rounded-full bg-[#222] text-gray-400 group-hover:text-yellow-500 transition-colors"
                      :class="{
                        'text-yellow-500 bg-yellow-900/30':
                          form.intent === option.id,
                      }"
                    >
                      <component :is="option.icon" class="w-5 h-5" />
                    </div>
                    <div>
                      <p class="text-sm font-bold text-white mb-1">
                        {{ option.title }}
                      </p>
                      <p class="text-xs text-gray-500">{{ option.desc }}</p>
                    </div>
                    <!-- Indicator Active -->
                    <div
                      class="ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
                      :class="
                        form.intent === option.id
                          ? 'border-yellow-500'
                          : 'border-[#444]'
                      "
                    >
                      <div
                        class="w-2.5 h-2.5 rounded-full bg-yellow-500 transform transition-transform"
                        :class="
                          form.intent === option.id ? 'scale-100' : 'scale-0'
                        "
                      ></div>
                    </div>
                  </label>
                </div>
              </div>

              <!-- STEP 2: PREFERENSI GAYA / KENDALA -->
              <div
                v-else-if="currentStep === 1"
                key="step2"
                class="space-y-6 max-w-xl mx-auto w-full"
              >
                <h3 class="text-2xl font-serif text-white mb-2">
                  {{
                    form.intent === "complaint"
                      ? t('consultation.step2.question_complaint')
                      : t('consultation.step2.question_style')
                  }}
                </h3>
                <p class="text-sm text-gray-400 mb-8">
                  {{
                    form.intent === "complaint"
                      ? t('consultation.step2.desc_complaint')
                      : t('consultation.step2.desc_style')
                  }}
                </p>

                <!-- Opsi Gaya (Jika bukan komplain) -->
                <div
                  v-if="form.intent !== 'complaint'"
                  class="grid grid-cols-2 gap-4"
                >
                  <label
                    v-for="style in formOptions.styles"
                    :key="style.id"
                    :class="
                      form.styles.includes(style.id)
                        ? 'border-yellow-500 bg-yellow-500/10'
                        : 'border-[#333] hover:border-gray-500 bg-black/50'
                    "
                    class="flex flex-col items-center text-center gap-3 p-5 rounded-2xl border cursor-pointer transition-all duration-300"
                  >
                    <input
                      type="checkbox"
                      v-model="form.styles"
                      :value="style.id"
                      class="hidden"
                    />
                    <span class="text-2xl">{{ style.emoji }}</span>
                    <span
                      class="text-xs font-bold uppercase tracking-widest"
                      :class="
                        form.styles.includes(style.id)
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      "
                      >{{ style.title }}</span
                    >
                  </label>
                </div>

                <!-- Input Komplain -->
                <div v-else class="space-y-4">
                  <select
                    v-model="form.complaintType"
                    class="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-yellow-500 appearance-none"
                  >
                    <option value="" disabled>{{ t('consultation.step2.complaint_placeholder') }}</option>
                    <option value="kualitas">{{ t('consultation.step2.complaint_categories.quality') }}</option>
                    <option value="pengiriman">{{ t('consultation.step2.complaint_categories.shipping') }}</option>
                    <option value="pelayanan">{{ t('consultation.step2.complaint_categories.service') }}</option>
                    <option value="lainnya">{{ t('consultation.step2.complaint_categories.others') }}</option>
                  </select>
                  <textarea
                    v-model="form.specificNeeds"
                    rows="4"
                    class="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 resize-none"
                    :placeholder="t('consultation.step2.complaint_detail_placeholder')"
                  ></textarea>
                </div>
              </div>

              <!-- STEP 3: DETAIL TAMBAHAN (SPESIFIK) -->
              <div
                v-else-if="currentStep === 2"
                key="step3"
                class="space-y-6 max-w-xl mx-auto w-full"
              >
                <h3 class="text-2xl font-serif text-white mb-2">
                  {{ t('consultation.step3.question') }}
                </h3>
                <p class="text-sm text-gray-400 mb-6">
                  {{ t('consultation.step3.desc') }}
                </p>

                <div class="space-y-5">
                  <div>
                    <label
                      class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                      >{{ t('consultation.step3.bag_type_label') }}</label
                    >
                    <div class="flex flex-wrap gap-2">
                      <button
                        v-for="bag in [
                          'Tote Bag',
                          'Sling Bag',
                          'Shoulder Bag',
                          'Clutch',
                          'Backpack',
                        ]"
                        :key="bag"
                        @click="togglePreference('bagTypes', bag)"
                        type="button"
                        class="px-4 py-2 text-xs border rounded-full transition-colors"
                        :class="
                          form.bagTypes.includes(bag)
                            ? 'bg-white text-black border-white'
                            : 'bg-transparent text-gray-400 border-[#444] hover:border-gray-300'
                        "
                      >
                        {{ bag }}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label
                      class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                      >{{ t('consultation.step3.color_label') }}</label
                    >
                    <div class="flex flex-wrap gap-3">
                      <button
                        v-for="color in formOptions.colors"
                        :key="color.name"
                        @click="togglePreference('colors', color.name)"
                        type="button"
                        class="w-8 h-8 rounded-full border-2 transition-all transform"
                        :class="
                          form.colors.includes(color.name)
                            ? 'border-white scale-110'
                            : 'border-transparent hover:scale-110'
                        "
                        :style="{ backgroundColor: color.hex }"
                        :title="color.name"
                      ></button>
                    </div>
                  </div>

                  <div>
                    <label
                      class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2"
                      >{{ t('consultation.step3.notes_label') }}</label
                    >
                    <textarea
                      v-model="form.specificNeeds"
                      rows="2"
                      class="w-full bg-[#1a1a1a] border border-[#333] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500 resize-none"
                      :placeholder="t('consultation.step3.notes_placeholder')"
                    ></textarea>
                  </div>
                </div>
              </div>

              <!-- STEP 4: REVIEW & CONNECT -->
              <div
                v-else-if="currentStep === 3"
                key="step4"
                class="space-y-6 max-w-xl mx-auto w-full text-center"
              >
                <div
                  class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(234,179,8,0.3)]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 class="text-3xl font-serif text-white mb-2">
                  {{ t('consultation.step4.completed_title') }}
                </h3>
                <p
                  class="text-sm text-gray-400 leading-relaxed mb-8 max-w-sm mx-auto"
                >
                  {{ t('consultation.step4.completed_desc', { name: userData?.first_name }) }}
                </p>

                <div
                  class="bg-[#1a1a1a] border border-[#333] rounded-2xl p-5 text-left mb-8"
                >
                  <p
                    class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
                  >
                    {{ t('consultation.step4.session_topic') }}
                  </p>
                  <p class="text-sm text-white font-medium capitalize">
                    {{ formatIntentDisplay(form.intent) }}
                  </p>
                </div>
              </div>
            </transition>

            <!-- Navigation Buttons -->
            <div
              class="flex items-center justify-between mt-10 pt-6 border-t border-[#222]"
            >
              <button
                v-if="currentStep > 0"
                @click="prevStep"
                class="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-white transition-colors"
              >
                {{ t('consultation.buttons.back') }}
              </button>
              <div v-else></div>

              <button
                v-if="currentStep < steps.length - 1"
                @click="nextStep"
                :disabled="!isStepValid"
                class="px-8 py-3 text-xs font-black uppercase tracking-widest text-black transition-all rounded-xl disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                :class="
                  isStepValid ? 'bg-white hover:bg-gray-200' : 'bg-gray-600'
                "
              >
                {{ t('consultation.buttons.next') }}
              </button>

              <button
                v-else
                @click="startConsultation"
                class="px-8 py-3.5 text-xs font-black uppercase tracking-widest text-black transition-all bg-yellow-500 rounded-xl hover:bg-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.4)] active:scale-95 flex items-center gap-2"
              >
                {{ t('consultation.buttons.submit') }}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- ======================= -->
        <!-- CONNECTING OVERLAY      -->
        <!-- ======================= -->
        <div
          v-if="isConnecting"
          class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#111] animate-fade-in"
        >
          <div class="relative w-24 h-24 flex items-center justify-center mb-8">
            <div
              class="absolute inset-0 border-t-2 border-yellow-500 rounded-full animate-spin"
            ></div>
            <div
              class="absolute inset-2 border-r-2 border-white/50 rounded-full animate-spin-reverse"
            ></div>
            <span class="text-2xl text-yellow-500">❈</span>
          </div>
          <h2 class="text-2xl font-serif text-white mb-2">{{ t('consultation.overlay.connecting') }}</h2>
          <p class="text-sm text-gray-500">
            {{ t('consultation.overlay.secure_channel') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n"; // Import plugin i18n
import Swal from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../config/api"; 

const router = useRouter();
const { t } = useI18n(); // Inisialisasi fungsi translate
const userData = ref(null);

// State Control
const currentStep = ref(0);
const isConnecting = ref(false);

// Gunakan computed property agar terjemahan otomatis menyesuaikan saat bahasa diubah
const steps = computed(() => [
  { title: t('consultation.steps.goal') },
  { title: t('consultation.steps.details') },
  { title: t('consultation.steps.specs') },
  { title: t('consultation.steps.submit') },
]);

// Form Data Model
const form = ref({
  intent: "", 
  styles: [], 
  complaintType: "", 
  bagTypes: [], 
  colors: [], 
  specificNeeds: "", 
});

// Options Data
const formOptions = computed(() => ({
  intents: [
    { id: "style_advice", title: t('consultation.step1.options.style_advice.title'), desc: t('consultation.step1.options.style_advice.desc'), icon: "svg-sparkles" },
    { id: "product_inquiry", title: t('consultation.step1.options.product_inquiry.title'), desc: t('consultation.step1.options.product_inquiry.desc'), icon: "svg-bag" },
    { id: "feedback", title: t('consultation.step1.options.feedback.title'), desc: t('consultation.step1.options.feedback.desc'), icon: "svg-heart" },
    { id: "complaint", title: t('consultation.step1.options.complaint.title'), desc: t('consultation.step1.options.complaint.desc'), icon: "svg-alert" },
  ],
  styles: [
    { id: "minimalist", title: "Minimalist", emoji: "🤍" },
    { id: "elegant", title: "Elegant", emoji: "✨" },
    { id: "casual", title: "Casual Daily", emoji: "☕" },
    { id: "bold", title: "Bold & Edgy", emoji: "🔥" },
  ],
  colors: [
    { name: "Noir (Black)", hex: "#000000" },
    { name: "Blanc (White)", hex: "#ffffff" },
    { name: "Taupe (Brown)", hex: "#8b7355" },
    { name: "Rouge (Red)", hex: "#7a101e" },
    { name: "Marine (Navy)", hex: "#1a2942" },
    { name: "Olive (Green)", hex: "#4a5d23" },
  ],
}));

// Lifecycle
onMounted(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    userData.value = JSON.parse(storedUser);

    const points = userData.value.point || 0;
    if (!userData.value.is_membership || points < 10000) {
      router.push("/profilepage");
    }
  } else {
    router.push("/login");
  }
});

// Logic & Validation
const isStepValid = computed(() => {
  if (currentStep.value === 0) return form.value.intent !== "";
  if (currentStep.value === 1) {
    if (form.value.intent === "complaint") return form.value.complaintType !== "";
    return true;
  }
  return true; 
});

const formatIntentDisplay = (intent) => {
  const found = formOptions.value.intents.find((i) => i.id === intent);
  return found ? found.title : t('consultation.step4.general_consultation');
};

const togglePreference = (type, value) => {
  const array = form.value[type];
  const index = array.indexOf(value);
  if (index === -1) {
    array.push(value);
  } else {
    array.splice(index, 1);
  }
};

const nextStep = () => {
  if (currentStep.value === 0 && form.value.intent === "complaint") {
    // Lewati gaya jika komplain
  }
  if (currentStep.value < steps.value.length - 1) currentStep.value++;
};

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--;
};

const startConsultation = async () => {
  isConnecting.value = true;
  
  try {
    const payload = {
      intent: form.value.intent,
      complaintType: form.value.complaintType || null,
      styles: form.value.styles || [],
      bagTypes: form.value.bagTypes || [],
      colors: form.value.colors || [],
      specificNeeds: form.value.specificNeeds || ''
    };

    // Kirim data ke backend
    await axios.post(`${BASE_URL}/consultation/intake`, payload, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });

    isConnecting.value = false;

    // Tampilkan Pop-up Berhasil (menggunakan fungsi t untuk multi-bahasa)
    Swal.fire({
      icon: 'success',
      title: t('consultation.alerts.success_title'),
      text: t('consultation.alerts.success_text'),
      confirmButtonColor: '#eab308',
    });

  } catch (error) {
    isConnecting.value = false;
    
    console.error("Backend Error Detail:", error);

    Swal.fire({
      icon: 'error',
      title: t('consultation.alerts.error_title'),
      text: error.response?.data?.message || t('consultation.alerts.error_text'),
      confirmButtonColor: '#000',
    });
  }
};
</script>

<script>
// Ikon SVG Kustom di dalam form
import { h } from "vue";

const SvgSparkles = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": 1.5,
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
      }),
    ],
  );
const SvgBag = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": 1.5,
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
      }),
    ],
  );
const SvgHeart = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": 1.5,
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      }),
    ],
  );
const SvgAlert = () =>
  h(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      stroke: "currentColor",
      "stroke-width": 1.5,
    },
    [
      h("path", {
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z",
      }),
    ],
  );

export default {
  components: {
    "svg-sparkles": SvgSparkles,
    "svg-bag": SvgBag,
    "svg-heart": SvgHeart,
    "svg-alert": SvgAlert,
  },
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-spin-reverse {
  animation: spin-reverse 1.5s linear infinite;
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

@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.slide-fade-enter-active {
  transition: all 0.4s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
