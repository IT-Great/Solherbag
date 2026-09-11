<template>
  <Teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm sm:p-6">
      <div class="relative w-full max-w-2xl bg-white shadow-2xl rounded-3xl animate-fade-in flex flex-col max-h-[90vh] md:max-h-[85vh]">
        <div class="flex items-center justify-between p-6 border-b border-gray-100 shrink-0 md:p-8 md:pb-6">
          <h3 class="text-xl font-bold text-gray-900">{{ $t("profile.add_new_address") }}</h3>
          <button @click="$emit('close')" class="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-100 hover:text-gray-900 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6 overflow-y-auto custom-scrollbar md:p-8 grow">
          <form @submit.prevent="saveAddress" class="space-y-5">
            <div class="flex items-center gap-3 p-3.5 border border-blue-100 bg-blue-50 rounded-xl">
              <input type="checkbox" v-model="form.is_default" id="def" class="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-blue-500" />
              <label for="def" class="text-sm font-medium text-blue-900 cursor-pointer select-none">
                {{ $t("profile.set_as_default") }}
              </label>
            </div>

            <div class="mb-4">
              <label class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Country / Region</label>
              <select v-model="form.region" @change="fetchProvinces" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required>
                <option v-for="c in countries" :key="c.isoCode" :value="c.name">{{ c.name }}</option>
              </select>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">{{ $t("profile.first_name") }}</label>
                <input v-model="form.first_name_address" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
              </div>
              <div>
                <label class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">{{ $t("profile.last_name") }}</label>
                <input v-model="form.last_name_address" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">{{ $t("profile.province") }}</label>
                <select v-if="filteredProvinces.length > 0" v-model="form.province" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required>
                  <option value="" disabled>{{ $t("profile.select_province") }}</option>
                  <option v-for="p in filteredProvinces" :key="p" :value="p">{{ p }}</option>
                </select>
                <input v-else v-model="form.province" placeholder="State/Province" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 outline-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
              </div>
              <div>
                <label class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">{{ $t("profile.city") }}</label>
                <input v-model="form.city" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
              </div>
            </div>

            <div class="relative overflow-hidden border border-gray-200 rounded-2xl">
              <div class="flex items-start gap-2 px-4 py-3 bg-amber-50 border-b border-amber-100">
                <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 w-4 h-4 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p class="text-[11px] text-amber-800 leading-relaxed">
                  <span class="font-bold">{{ $t("profile.pin_location") }}</span> Ensure the pin matches your exact delivery point.
                </p>
              </div>

              <div class="flex flex-col sm:flex-row items-center justify-between gap-2 p-3 border-b border-gray-200 bg-gray-50">
                <div class="relative w-full sm:flex-1">
                  <input type="text" v-model="searchQuery" @input="handleSearchInput" placeholder="Search area (e.g. Tunjungan Plaza)" class="w-full px-3 py-2.5 text-xs transition-colors border border-gray-300 outline-none rounded-xl focus:ring-1 focus:ring-blue-500 focus:border-blue-500" />
                  <div v-if="searchResults.length > 0" class="absolute z-[999] mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto custom-scrollbar">
                    <div v-for="(result, idx) in searchResults" :key="idx" @click="selectSearchResult(result)" class="px-3 py-2.5 text-xs text-gray-700 border-b cursor-pointer hover:bg-blue-50 last:border-0">
                      {{ result.display_name }}
                    </div>
                  </div>
                </div>
                <button type="button" @click="getCurrentLocation" :disabled="isGettingLocation" class="w-full sm:w-auto px-4 py-2.5 text-[10px] font-bold tracking-wider text-blue-700 uppercase transition-colors bg-blue-100 rounded-xl hover:bg-blue-200 flex items-center justify-center gap-2">
                  <span v-if="isGettingLocation" class="w-3 h-3 border-2 rounded-full border-blue-700 border-t-transparent animate-spin"></span>
                  {{ $t("profile.use_current_loc") }}
                </button>
              </div>

              <div class="relative z-0 w-full h-40 sm:h-56">
                <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false" @click="onMapClick">
                  <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"></l-tile-layer>
                  <l-marker :lat-lng="markerLatLng" draggable @update:latLng="onMarkerDrag"></l-marker>
                </l-map>
                <div class="absolute z-[400] px-2 py-1 font-mono text-[9px] text-gray-600 bg-white/90 rounded shadow bottom-2 right-2 backdrop-blur pointer-events-none border border-gray-200">
                  {{ form.latitude ? parseFloat(form.latitude).toFixed(5) : "-" }},
                  {{ form.longitude ? parseFloat(form.longitude).toFixed(5) : "-" }}
                </div>
              </div>
            </div>

            <div>
              <label class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">{{ $t("profile.complete_address") }}</label>
              <textarea v-model="form.address_location" rows="3" placeholder="Street name, building, house number..." class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 resize-none bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none custom-scrollbar" required></textarea>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">{{ $t("profile.details_opt") }}</label>
                <input v-model="form.location_type" placeholder="Apartment, suite, block" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label class="block mb-1.5 text-[10px] font-bold tracking-widest text-gray-500 uppercase">{{ $t("profile.postal_code") }}</label>
                <input v-model="form.postal_code" placeholder="Postal code" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
              </div>
            </div>

            <div class="h-2"></div>
          </form>
        </div>

        <div class="flex items-center justify-end gap-3 p-6 border-t border-gray-100 shrink-0 md:p-8 md:pt-5 bg-gray-50/50">
          <button type="button" @click="$emit('close')" class="px-5 py-2.5 text-sm font-bold text-gray-600 transition-colors bg-white border border-gray-300 rounded-xl hover:bg-gray-50 hidden sm:block">
            {{ $t("profile.cancel") }}
          </button>
          <button type="button" @click="saveAddress" :disabled="isSubmitting" class="px-6 py-2.5 text-sm font-bold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20">
            {{ isSubmitting ? 'Saving...' : $t("profile.save_address") }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../../config/api.js";
import { Country, State } from "country-state-city";
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
});

const props = defineProps({
  isOpen: Boolean,
  userData: Object
});

const emit = defineEmits(["close", "saved"]);

const isSubmitting = ref(false);
const isGettingLocation = ref(false);

const map = ref(null);
const zoom = ref(13);
const center = ref([-7.250445, 112.768845]);
const markerLatLng = ref([-7.250445, 112.768845]);
const searchQuery = ref("");
const searchResults = ref([]);
let debounceTimeout = null;

const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);

const form = ref({
  region: "Indonesia",
  first_name_address: "",
  last_name_address: "",
  address_location: "",
  location_type: "",
  city: "",
  province: "",
  postal_code: "",
  latitude: null,
  longitude: null,
  is_default: true,
});

const fetchProvinces = () => {
  const selectedCountry = countries.value.find((c) => c.name === form.value.region);
  if (selectedCountry) {
    const states = State.getStatesOfCountry(selectedCountry.isoCode);
    filteredProvinces.value = states.map((s) => s.name);
  } else {
    filteredProvinces.value = [];
  }
};

watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    form.value.first_name_address = props.userData?.first_name || "";
    form.value.last_name_address = props.userData?.last_name || "";
    fetchProvinces();
    setTimeout(() => {
      if (map.value && map.value.leafletObject) {
        map.value.leafletObject.invalidateSize();
      }
    }, 300);
  }
});

const handleSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);
  if (searchQuery.value.length < 3) { searchResults.value = []; return; }
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`);
      searchResults.value = res.data;
    } catch (error) {}
  }, 500);
};

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);
  if (map.value && map.value.leafletObject) {
    map.value.leafletObject.flyTo([lat, lng], 16);
  } else {
    center.value = [lat, lng]; zoom.value = 16;
  }
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  form.value.address_location = result.display_name;
  searchResults.value = [];
  searchQuery.value = "";
};

const onMapClick = (event) => updateLocation(event.latlng.lat, event.latlng.lng);
const onMarkerDrag = (event) => { const { lat, lng } = event.target.getLatLng(); updateLocation(lat, lng); };

const updateLocation = (lat, lng) => {
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocode(lat, lng);
};

const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
    if (res.data && res.data.display_name) {
      form.value.address_location = res.data.display_name;
      if (res.data.address && res.data.address.postcode) form.value.postal_code = res.data.address.postcode;
    }
  } catch (error) {}
};

const getCurrentLocation = () => {
  isGettingLocation.value = true;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        if (map.value && map.value.leafletObject) map.value.leafletObject.flyTo([lat, lng], 16);
        else { center.value = [lat, lng]; zoom.value = 16; }
        updateLocation(lat, lng);
        isGettingLocation.value = false;
      },
      () => { Swal.fire("Error", "Please allow location access.", "error"); isGettingLocation.value = false; },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    Swal.fire("Error", "Geolocation not supported", "error");
    isGettingLocation.value = false;
  }
};

const saveAddress = async () => {
  isSubmitting.value = true;
  try {
    const res = await axios.post(`${BASE_URL}/addresses`, form.value, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }});
    Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Address Saved!", showConfirmButton: false, timer: 1500 });
    emit("saved", res.data.id);
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
</style>