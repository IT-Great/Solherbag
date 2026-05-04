<template>
  <div v-if="user" class="space-y-8">
    <Breadcrumb />
    <div class="flex items-center gap-6 bg-white shadow-sm p-8 rounded-2xl">
      <!-- <img
        :src="
          user.profile_image
            ? `http://localhost:8000/storage/${user.profile_image}`
            : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
        "
        class="rounded-full w-20 h-20 object-cover"
      /> -->
      <img
        :src="
          user.profile_image
            ? `${user.profile_image}`
            : `https://ui-avatars.com/api/?name=${user.first_name}+${user.last_name}`
        "
        class="rounded-full w-20 h-20 object-cover"
      />
      <div>
        <h2 class="font-bold text-2xl">{{ user.first_name }} {{ user.last_name }}</h2>
        <p class="text-gray-400">{{ user.email }}</p>
      </div>
    </div>

    <h3 class="font-bold text-xl">Registered Addresses ({{ user.addresses.length }})</h3>

    <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
      <div
        v-for="addr in user.addresses"
        :key="addr.id"
        class="relative bg-white shadow-sm p-6 border border-gray-200 rounded-xl"
      >
        <span
          v-if="addr.is_default"
          class="top-4 right-4 absolute bg-green-100 px-2 py-1 rounded-full font-bold text-[10px] text-green-700 uppercase"
          >Default</span
        >
        <p class="mb-2 font-bold text-lg">
          {{ addr.first_name_address }} {{ addr.last_name_address }}
        </p>
        <div class="space-y-1 text-gray-600 text-sm">
          <p>{{ addr.address_location }} ({{ addr.location_type }})</p>
          <p>{{ addr.city }}, {{ addr.province }}</p>
          <p>{{ addr.region }} - {{ addr.postal_code }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "../../components/Admin/Layout/Breadcrumb.vue"; // Sesuaikan path-nya
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { BASE_URL } from "../../config/api.js";

const route = useRoute();
const user = ref(null);
const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

onMounted(async () => {
  const res = await axios.get(`${BASE_URL}/admin/users/${route.params.id}`, axiosConfig); //
  user.value = res.data;
});
</script>
