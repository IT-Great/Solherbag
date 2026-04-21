<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-4xl">
    <div class="bg-white shadow-sm p-8 border border-gray-200 rounded-2xl">
      <h1 class="mb-8 font-bold text-3xl">Your Profile</h1>

      <div v-if="userData" class="flex md:flex-row flex-col gap-10">
        <div class="flex flex-col items-center gap-4">
          <div class="group relative">
            <img
              :key="userData.profile_image"
              :src="userData.profile_image"
              class="shadow-sm border-4 border-gray-50 rounded-full w-32 h-32 object-cover"
              alt="Profile Avatar"
              @error="handleImageError"
            />
            <label
              class="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer"
            >
              <span class="font-bold text-white text-xs">Change</span>
              <input
                type="file"
                class="hidden"
                @change="handleImageUpdate"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div class="flex-grow space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Full Name & Email</label
              >
              <p class="font-medium text-xl">
                {{ userData.first_name }} {{ userData.last_name }}
              </p>
              <p class="text-gray-400">{{ userData.email }}</p>
              <p class="text-gray-400 text-sm italic">
                {{ userData.phone || "No phone number added" }}
              </p>
            </div>
            <button
              @click="openInfoModal"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          <div
            class="flex justify-between items-start pt-4 border-gray-50 border-t"
          >
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Your Password</label
              >
              <p class="text-xl tracking-widest">••••••••</p>
            </div>
            <button
              @click="showPasswordModal = true"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-10 pt-6 border-gray-100 border-t">
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 shadow-sm px-6 py-2 rounded-xl font-semibold text-white transition duration-200"
      >
        Logout
      </button>
    </div>

    <div
      v-if="showInfoModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Info</h3>
        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <input
            v-model="infoForm.first_name"
            placeholder="First Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.last_name"
            placeholder="Last Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.email"
            type="email"
            placeholder="Email"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.phone"
            type="tel"
            placeholder="Phone Number (e.g. 0812345678)"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showInfoModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-black py-3 rounded-xl font-bold text-white"
            >
              Save Info
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showPasswordModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Password</h3>
        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <input
            v-model="passForm.old_password"
            type="password"
            placeholder="Old Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password"
            type="password"
            placeholder="New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password_confirmation"
            type="password"
            placeholder="Confirm New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="mt-12 pt-12 border-gray-100 border-t">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-bold text-2xl">Addresses</h2>

        <button
          @click="openModal()"
          class="font-medium text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div
          v-for="addr in addresses"
          :key="addr.id"
          class="relative bg-gray-50/50 p-6 border border-gray-100 rounded-xl"
        >
          <div v-if="addr.is_default" class="mb-2 text-gray-400 text-xs">
            Default address
          </div>

          <button
            @click="openModal(addr)"
            class="top-4 right-4 absolute text-blue-500 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>

          <p class="mb-1 font-bold">
            {{ addr.receiver.first_name }} {{ addr.receiver.last_name }}
          </p>

          <p class="text-gray-600 text-sm">{{ addr.details.location }}</p>

          <p class="text-gray-600 text-sm">{{ addr.details.type || "-" }}</p>

          <p class="text-gray-600 text-sm">{{ addr.details.city }}</p>

          <p class="text-gray-600 text-sm">
            {{ addr.details.province }} {{ addr.details.postal_code }}
          </p>

          <p class="text-gray-600 text-sm">{{ addr.details.region }}</p>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="relative bg-white shadow-2xl p-8 rounded-3xl w-full max-w-xl">
        <button
          @click="showModal = false"
          class="top-6 right-6 absolute text-gray-400 hover:text-black"
        >
          ✕
        </button>

        <h3 class="mb-6 font-bold text-2xl">
          {{ isEdit ? "Edit address" : "Add address" }}
        </h3>

        <form @submit.prevent="saveAddress" class="space-y-4">
          <div class="flex items-center gap-2 mb-4">
            <input type="checkbox" v-model="form.is_default" id="def" />

            <label for="def" class="text-sm">This is my default address</label>
          </div>

          <div class="space-y-4">
            <div class="flex flex-col">
              <label class="mb-1 text-gray-400 text-xs">Country/region</label>

              <select
                v-model="form.region"
                @change="fetchProvinces"
                class="bg-gray-50 p-3 border rounded-xl outline-none focus:ring-1 focus:ring-blue-500 w-full"
              >
                <option v-for="c in countries" :key="c.name" :value="c.name">
                  {{ c.name }}
                </option>
              </select>
            </div>

            <div class="gap-4 grid grid-cols-2">
              <input
                v-model="form.first_name_address"
                placeholder="First name"
                class="bg-gray-50 p-3 border rounded-xl outline-none"
                required
              />

              <input
                v-model="form.last_name_address"
                placeholder="Last name"
                class="bg-gray-50 p-3 border rounded-xl outline-none"
                required
              />
            </div>

            <input
              v-model="form.address_location"
              placeholder="Address"
              class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
              required
            />

            <input
              v-model="form.location_type"
              placeholder="Apartment, suite, etc (optional)"
              class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            />

            <input
              v-model="form.city"
              placeholder="City"
              class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
              required
            />

            <div class="gap-4 grid grid-cols-2">
              <select
                v-model="form.province"
                class="bg-gray-50 p-3 border rounded-xl outline-none"
              >
                <option value="" disabled>Select Province</option>

                <option v-for="p in filteredProvinces" :key="p" :value="p">
                  {{ p }}
                </option>
              </select>

              <input
                v-model="form.postal_code"
                placeholder="Postal code"
                class="bg-gray-50 p-3 border rounded-xl outline-none"
                required
              />
            </div>
          </div>

          <div class="flex justify-between items-center pt-6">
            <button
              v-if="isEdit"
              type="button"
              @click="deleteAddress"
              class="text-red-500 hover:underline"
            >
              Delete
            </button>

            <div class="flex gap-4 ml-auto">
              <button
                type="button"
                @click="showModal = false"
                class="text-blue-600"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="bg-blue-600 px-8 py-3 rounded-xl font-bold text-white"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Country, State } from "country-state-city";
import { BASE_URL } from "../../config/api.js";

const addresses = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const router = useRouter();
const userData = ref(null);
const showInfoModal = ref(false);
const showPasswordModal = ref(false);

const infoForm = ref({ first_name: "", last_name: "", email: "", phone: "" });
const passForm = ref({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const openInfoModal = () => {
  infoForm.value = {
    first_name: userData.value.first_name,
    last_name: userData.value.last_name,
    email: userData.value.email,
    phone: userData.value.phone || "",
  };
  showInfoModal.value = true;
};

const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 1. OPTIMISTIC UPDATE (Tampilkan gambar lokal secara instan)
  // Membuat URL sementara dari file yang dipilih
  const objectUrl = URL.createObjectURL(file);

  // Simpan URL gambar lama untuk rollback jika upload gagal
  const oldImage = userData.value.profile_image;

  // Update state gambar secara lokal
  userData.value.profile_image = objectUrl;

  // 2. PROSES UPLOAD KE SERVER (Background Process)
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/user/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.user) {
      // 3. SYNC DENGAN DATA SERVER (Setelah sukses)
      const newUser = res.data.user;

      // Tambahkan timestamp agar browser tidak mengambil cache lama
      if (newUser.profile_image) {
        const separator = newUser.profile_image.includes("?") ? "&" : "?";
        newUser.profile_image = `${newUser.profile_image}${separator}t=${new Date().getTime()}`;
      }

      updateUserData(newUser);

      // Hapus URL object sementara dari memori browser
      URL.revokeObjectURL(objectUrl);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Foto profil diperbarui!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (err) {
    // 4. ROLLBACK (Jika gagal)
    console.error("Upload failed", err);
    userData.value.profile_image = oldImage; // Kembalikan ke gambar lama
    URL.revokeObjectURL(objectUrl); // Bersihkan memori

    Swal.fire(
      "Gagal",
      "Tidak dapat mengunggah foto. Silakan coba lagi.",
      "error",
    );
  }
};

const handleImageError = (e) => {
  // Jika gambar gagal load, ganti ke UI Avatars
  e.target.src = `https://ui-avatars.com/api/?name=${userData.value.first_name}+${userData.value.last_name}&background=random`;
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user/update-info`,
      infoForm.value,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    updateUserData(res.data.user);
    showInfoModal.value = false;
    Swal.fire("Success", "Info profil diperbarui!", "success");
  } catch (err) {
    Swal.fire("Error", "Gagal memperbarui info", "error");
  }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/user/update-password`, passForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showPasswordModal.value = false;
    passForm.value = {
      old_password: "",
      password: "",
      password_confirmation: "",
    };
    Swal.fire("Success", "Password berhasil diubah!", "success");
  } catch (err) {
    Swal.fire(
      "Error",
      err.response.data.message || "Gagal mengubah password",
      "error",
    );
  }
};

const updateUserData = (user) => {
  if (!user) return;

  userData.value = Object.assign({}, userData.value, user);
  localStorage.setItem("user", JSON.stringify(userData.value));
};

const editForm = ref({
  first_name: "",

  last_name: "",

  password: "",

  image: null,
});

const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    updateUserData(res.data);
  } catch (err) {
    console.error("Failed to sync user profile", err);

    if (err.response && err.response.status === 401) {
      handleLogout();
    }
  }
};

onMounted(() => {
  const user = localStorage.getItem("user");

  if (user) {
    userData.value = JSON.parse(user);

    editForm.value.first_name = userData.value.first_name;

    editForm.value.last_name = userData.value.last_name;
  }

  fetchAddresses();

  fetchProvinces();

  fetchUserProfile();
});

const form = ref({
  id: null,
  region: "Indonesia",
  ffirst_name_address: "",
  last_name_address: "",
  address_location: "",
  location_type: "",
  city: "",
  province: "",
  postal_code: "",
  is_default: false,
});

const fetchAddresses = async () => {
  const res = await axios.get(`${BASE_URL}/addresses`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  addresses.value = res.data.data;
};

const fetchProvinces = () => {
  const selectedCountry = countries.value.find(
    (c) => c.name === form.value.region,
  );

  if (selectedCountry) {
    filteredProvinces.value = State.getStatesOfCountry(
      selectedCountry.isoCode,
    ).map((s) => s.name);
  }
};

const openModal = (data = null) => {
  isEdit.value = !!data;

  if (data) {
    form.value = {
      id: data.id,
      region: data.details.region,
      first_name_address: data.receiver.first_name,
      last_name_address: data.receiver.last_name,
      address_location: data.details.location,
      location_type: data.details.type === "other" ? "" : data.details.type,
      city: data.details.city,
      province: data.details.province,
      postal_code: data.details.postal_code,
      is_default: data.is_default,
    };

    fetchProvinces();
  } else {
    // Reset form untuk Add Baru
    form.value = {
      region: "Indonesia",
      is_default: false,
      first_name_address: "",
      last_name_address: "",
      address_location: "",
      location_type: "",
      city: "",
      province: "",
      postal_code: "",
    };
  }

  showModal.value = true;
};

const saveAddress = async () => {
  const url = isEdit.value
    ? `${BASE_URL}/addresses/${form.value.id}`
    : `${BASE_URL}/addresses`;

  const method = isEdit.value ? "put" : "post";

  await axios[method](url, form.value, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  showModal.value = false;

  fetchAddresses();

  Swal.fire("Success", "Address updated!", "success");
};

// const handleLogout = () => {
//   localStorage.removeItem("token");

//   localStorage.removeItem("user");

//   Swal.fire({
//     icon: "info",
//     title: "Logged Out",
//     text: "Sesi Anda telah berakhir.",
//     timer: 1500,
//   });

//   router.push("/login");
// };

const handleLogout = () => {
  // Tampilkan Pop-up Konfirmasi
  Swal.fire({
    title: "Are you sure?",
    text: "You will be signed out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33", 
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "See you again soon!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/login");
      });
    }
  });
};
</script> -->

<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-4xl">
    <div class="bg-white shadow-sm p-8 border border-gray-200 rounded-2xl">
      <h1 class="mb-8 font-bold text-3xl">Your Profile</h1>

      <div v-if="userData" class="flex md:flex-row flex-col gap-10">
        <div class="flex flex-col items-center gap-4">
          <div class="group relative">
            <img
              :key="userData.profile_image"
              :src="userData.profile_image"
              class="shadow-sm border-4 border-gray-50 rounded-full w-32 h-32 object-cover"
              alt="Profile Avatar"
              @error="handleImageError"
            />
            <label
              class="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer"
            >
              <span class="font-bold text-white text-xs">Change</span>
              <input
                type="file"
                class="hidden"
                @change="handleImageUpdate"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div class="flex-grow space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Full Name & Email</label
              >
              <p class="font-medium text-xl">
                {{ userData.first_name }} {{ userData.last_name }}
              </p>
              <p class="text-gray-400">{{ userData.email }}</p>
              <p class="text-gray-400 text-sm italic">
                {{ userData.phone || "No phone number added" }}
              </p>
            </div>
            <button
              @click="openInfoModal"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          <div
            class="flex justify-between items-start pt-4 border-gray-50 border-t"
          >
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Your Password</label
              >
              <p class="text-xl tracking-widest">••••••••</p>
            </div>
            <button
              @click="showPasswordModal = true"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end mt-10 pt-6 border-gray-100 border-t">
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 shadow-sm px-6 py-2 rounded-xl font-semibold text-white transition duration-200"
      >
        Logout
      </button>
    </div>

    <div
      v-if="showInfoModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Info</h3>
        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <input
            v-model="infoForm.first_name"
            placeholder="First Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.last_name"
            placeholder="Last Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.email"
            type="email"
            placeholder="Email"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.phone"
            type="tel"
            placeholder="Phone Number (e.g. 0812345678)"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showInfoModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-black py-3 rounded-xl font-bold text-white"
            >
              Save Info
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showPasswordModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Password</h3>
        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <input
            v-model="passForm.old_password"
            type="password"
            placeholder="Old Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password"
            type="password"
            placeholder="New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password_confirmation"
            type="password"
            placeholder="Confirm New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
    <div class="mt-12 pt-12 border-gray-100 border-t">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-bold text-2xl">Addresses</h2>
        <button
          @click="openModal()"
          class="font-medium text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div
          v-for="addr in addresses"
          :key="addr.id"
          class="relative bg-gray-50/50 p-6 border border-gray-100 rounded-xl"
        >
          <div v-if="addr.is_default" class="mb-2 text-gray-400 text-xs">
            Default address
          </div>
          <button
            @click="openModal(addr)"
            class="top-4 right-4 absolute text-blue-500 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <p class="mb-1 font-bold">
            {{ addr.receiver.first_name }} {{ addr.receiver.last_name }}
          </p>
          <p class="text-gray-600 text-sm">{{ addr.details.location }}</p>
          <p class="text-gray-600 text-sm">
            {{ addr.details.city }}, {{ addr.details.province }}
            {{ addr.details.postal_code }}
          </p>

          <div
            v-if="addr.details.latitude && addr.details.longitude"
            class="mt-3 flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-widest"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Pin Pinned
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div
        class="relative bg-white shadow-2xl p-8 rounded-3xl w-full max-w-2xl my-8"
      >
        <button
          @click="showModal = false"
          class="top-6 right-6 absolute text-gray-400 hover:text-black"
        >
          ✕
        </button>
        <h3 class="mb-6 font-bold text-2xl">
          {{ isEdit ? "Edit address" : "Add address" }}
        </h3>

        <form @submit.prevent="saveAddress" class="space-y-4">
          <div class="flex items-center gap-2 mb-4">
            <input type="checkbox" v-model="form.is_default" id="def" />
            <label for="def" class="text-sm">This is my default address</label>
          </div>

          <div class="gap-4 grid grid-cols-2">
            <input
              v-model="form.first_name_address"
              placeholder="First name"
              class="bg-gray-50 p-3 border rounded-xl outline-none"
              required
            />
            <input
              v-model="form.last_name_address"
              placeholder="Last name"
              class="bg-gray-50 p-3 border rounded-xl outline-none"
              required
            />
          </div>

          <div class="gap-4 grid grid-cols-2">
            <select
              v-model="form.province"
              class="bg-gray-50 p-3 border rounded-xl outline-none"
              required
            >
              <option value="" disabled>Select Province</option>
              <option v-for="p in filteredProvinces" :key="p" :value="p">
                {{ p }}
              </option>
            </select>
            <input
              v-model="form.city"
              placeholder="City"
              class="bg-gray-50 p-3 border rounded-xl outline-none"
              required
            />
          </div>

          <div class="border border-gray-200 rounded-xl overflow-hidden mt-4">
            <div
              class="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center"
            >
              <p
                class="text-xs font-bold text-gray-500 uppercase tracking-widest"
              >
                Pin Location
              </p>
              <button
                type="button"
                @click="getCurrentLocation"
                class="text-[10px] bg-blue-100 text-blue-700 px-3 py-1 rounded font-bold hover:bg-blue-200 transition"
              >
                Use Current Location
              </button>
            </div>

            <div class="h-64 w-full relative">
              <GoogleMap
                :api-key="'AIzaSyARS90mnbPt6vOKbpJja_CM3MsZiOvdqEw'"
                :center="mapCenter"
                :zoom="15"
                class="w-full h-full"
                @click="onMapClick"
              >
                <Marker
                  :options="{ position: mapCenter, draggable: true }"
                  @dragend="onMarkerDrag"
                />
              </GoogleMap>

              <div
                class="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow text-[10px] font-mono text-gray-600 pointer-events-none"
              >
                {{
                  form.latitude ? parseFloat(form.latitude).toFixed(5) : "-"
                }},
                {{
                  form.longitude ? parseFloat(form.longitude).toFixed(5) : "-"
                }}
              </div>
            </div>
          </div>

          <div class="relative">
            <textarea
              v-model="form.address_location"
              rows="2"
              placeholder="Full street address (auto-filled from map)"
              class="bg-gray-50 p-3 border rounded-xl outline-none w-full resize-none"
              required
            ></textarea>
            <p class="text-[10px] text-gray-400 mt-1">
              *Drag the pin on the map to automatically fill this address, or
              type manually.
            </p>
          </div>

          <div class="gap-4 grid grid-cols-2">
            <input
              v-model="form.location_type"
              placeholder="Apartment, suite (optional)"
              class="bg-gray-50 p-3 border rounded-xl outline-none"
            />
            <input
              v-model="form.postal_code"
              placeholder="Postal code"
              class="bg-gray-50 p-3 border rounded-xl outline-none"
              required
            />
          </div>

          <div class="flex justify-between items-center pt-6">
            <button
              v-if="isEdit"
              type="button"
              @click="deleteAddress"
              class="text-red-500 hover:underline"
            >
              Delete
            </button>
            <div class="flex gap-4 ml-auto">
              <button
                type="button"
                @click="showModal = false"
                class="text-blue-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-blue-600 px-8 py-3 rounded-xl font-bold text-white shadow-md shadow-blue-500/30"
              >
                Save Address
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Country, State } from "country-state-city";
import { BASE_URL } from "../../config/api.js";
// Import pustaka vue3-google-map
import { GoogleMap, Marker } from "vue3-google-map";

// ... (Inisialisasi state addresses, user, dsb persis sama seperti sebelumnya) ...
const addresses = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const router = useRouter();
const userData = ref(null);
const showInfoModal = ref(false);
const showPasswordModal = ref(false);

const mapRef = ref(null);

const form = ref({
  id: null,
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
  is_default: false,
});

// --- GOOGLE MAPS LOGIC ---
const GOOGLE_API_KEY = "AIzaSyARS90mnbPt6vOKbpJja_CM3MsZiOvdqEw"; // Ganti dengan key asli Anda
// Set default map ke tengah Indonesia (atau Jakarta/Surabaya)
const mapCenter = ref({ lat: -7.250445, lng: 112.768845 }); // Default Surabaya

// Geocoding: Mengubah Koordinat menjadi Nama Jalan
const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`,
    );
    if (res.data.status === "OK" && res.data.results[0]) {
      // Ambil nama jalan terformat dan otomatis masukkan ke text area
      form.value.address_location = res.data.results[0].formatted_address;
    }
  } catch (error) {
    console.error("Geocoding error", error);
  }
};

// FUNGSI BARU: Menggunakan Geocoder Native (Bukan Axios)
// const reverseGeocodeNative = (lat, lng) => {
//   // Cek apakah Google Maps API sudah terload
//   if (!window.google || !window.google.maps) return;

//   const geocoder = new window.google.maps.Geocoder();
//   const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };

//   geocoder.geocode({ location: latlng }, (results, status) => {
//     if (status === "OK") {
//       if (results[0]) {
//         // Update form address secara reaktif
//         form.value.address_location = results[0].formatted_address;

//         // Opsional: Coba ekstrak kodepos/kota jika perlu presisi
//         // console.log(results[0]);
//       } else {
//         console.warn("No results found");
//       }
//     } else {
//       console.error("Geocoder failed due to: " + status);
//       // Jika status REQUEST_DENIED, berarti API Key bermasalah (Billing/Enabled API)
//       if (status === "REQUEST_DENIED" || status === "OVER_QUERY_LIMIT") {
//         Swal.fire(
//           "Map Error",
//           "Gagal memuat alamat. Pastikan API Key valid & Geocoding API aktif.",
//           "error",
//         );
//       }
//     }
//   });
// };

// Event saat pengguna klik sembarang tempat di peta
const onMapClick = (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  mapCenter.value = { lat, lng };
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();

  // form.value.latitude = lat;
  // form.value.longitude = lng;

  reverseGeocode(lat, lng);
  // reverseGeocodeNative(lat, lng);
};

// Event saat Marker/Pin digeser
const onMarkerDrag = (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();

  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  // form.value.latitude = lat;
  // form.value.longitude = lng;

  reverseGeocode(lat, lng);
  // reverseGeocodeNative(lat, lng);
};

// Tombol "Use Current Location" menggunakan GPS Browser
const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        mapCenter.value = { lat, lng };
        form.value.latitude = lat.toString();
        form.value.longitude = lng.toString();
        reverseGeocode(lat, lng);
        // reverseGeocodeNative(lat, lng);
      },
      (error) => {
        Swal.fire(
          "Error",
          "Please allow location access in your browser.",
          "error",
        );
      },
    );
  }
};

// --- CORE LOGIC ---
const openModal = (data = null) => {
  isEdit.value = !!data;
  if (data) {
    form.value = {
      id: data.id,
      region: data.details.region,
      first_name_address: data.receiver.first_name,
      last_name_address: data.receiver.last_name,
      address_location: data.details.location,
      location_type: data.details.type === "other" ? "" : data.details.type,
      city: data.details.city,
      province: data.details.province,
      postal_code: data.details.postal_code,
      latitude: data.details.latitude,
      longitude: data.details.longitude,
      is_default: data.is_default,
    };

    // Jika ada koordinat di DB, arahkan map ke sana
    if (data.details.latitude && data.details.longitude) {
      mapCenter.value = {
        lat: parseFloat(data.details.latitude),
        lng: parseFloat(data.details.longitude),
      };
    }
    fetchProvinces();
  } else {
    form.value = {
      region: "Indonesia",
      is_default: false,
      first_name_address: "",
      last_name_address: "",
      address_location: "",
      location_type: "",
      city: "",
      province: "",
      postal_code: "",
      latitude: null,
      longitude: null,
    };
  }
  showModal.value = true;
};

const fetchProvinces = () => {
  const selectedCountry = countries.value.find(
    (c) => c.name === form.value.region,
  );

  if (selectedCountry) {
    filteredProvinces.value = State.getStatesOfCountry(
      selectedCountry.isoCode,
    ).map((s) => s.name);
  }
};

// ... (Fungsi fetchAddresses, saveAddress, deleteAddress tetap sama)
const fetchAddresses = async () => {
  const res = await axios.get(`${BASE_URL}/addresses`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  addresses.value = res.data.data;
};

const saveAddress = async () => {
  const url = isEdit.value
    ? `${BASE_URL}/addresses/${form.value.id}`
    : `${BASE_URL}/addresses`;

  const method = isEdit.value ? "put" : "post";

  await axios[method](url, form.value, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

  showModal.value = false;

  fetchAddresses();

  Swal.fire("Success", "Address updated!", "success");
};

const infoForm = ref({ first_name: "", last_name: "", email: "", phone: "" });
const passForm = ref({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const openInfoModal = () => {
  infoForm.value = {
    first_name: userData.value.first_name,
    last_name: userData.value.last_name,
    email: userData.value.email,
    phone: userData.value.phone || "",
  };
  showInfoModal.value = true;
};

const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 1. OPTIMISTIC UPDATE (Tampilkan gambar lokal secara instan)
  // Membuat URL sementara dari file yang dipilih
  const objectUrl = URL.createObjectURL(file);

  // Simpan URL gambar lama untuk rollback jika upload gagal
  const oldImage = userData.value.profile_image;

  // Update state gambar secara lokal
  userData.value.profile_image = objectUrl;

  // 2. PROSES UPLOAD KE SERVER (Background Process)
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/user/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.user) {
      // 3. SYNC DENGAN DATA SERVER (Setelah sukses)
      const newUser = res.data.user;

      // Tambahkan timestamp agar browser tidak mengambil cache lama
      if (newUser.profile_image) {
        const separator = newUser.profile_image.includes("?") ? "&" : "?";
        newUser.profile_image = `${newUser.profile_image}${separator}t=${new Date().getTime()}`;
      }

      updateUserData(newUser);

      // Hapus URL object sementara dari memori browser
      URL.revokeObjectURL(objectUrl);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Foto profil diperbarui!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (err) {
    // 4. ROLLBACK (Jika gagal)
    console.error("Upload failed", err);
    userData.value.profile_image = oldImage; // Kembalikan ke gambar lama
    URL.revokeObjectURL(objectUrl); // Bersihkan memori

    Swal.fire(
      "Gagal",
      "Tidak dapat mengunggah foto. Silakan coba lagi.",
      "error",
    );
  }
};

const handleImageError = (e) => {
  // Jika gambar gagal load, ganti ke UI Avatars
  e.target.src = `https://ui-avatars.com/api/?name=${userData.value.first_name}+${userData.value.last_name}&background=random`;
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user/update-info`,
      infoForm.value,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    updateUserData(res.data.user);
    showInfoModal.value = false;
    Swal.fire("Success", "Info profil diperbarui!", "success");
  } catch (err) {
    Swal.fire("Error", "Gagal memperbarui info", "error");
  }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/user/update-password`, passForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showPasswordModal.value = false;
    passForm.value = {
      old_password: "",
      password: "",
      password_confirmation: "",
    };
    Swal.fire("Success", "Password berhasil diubah!", "success");
  } catch (err) {
    Swal.fire(
      "Error",
      err.response.data.message || "Gagal mengubah password",
      "error",
    );
  }
};

const updateUserData = (user) => {
  if (!user) return;

  userData.value = Object.assign({}, userData.value, user);
  localStorage.setItem("user", JSON.stringify(userData.value));
};

const editForm = ref({
  first_name: "",

  last_name: "",

  password: "",

  image: null,
});

const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    updateUserData(res.data);
  } catch (err) {
    console.error("Failed to sync user profile", err);

    if (err.response && err.response.status === 401) {
      handleLogout();
    }
  }
};

onMounted(() => {
  const user = localStorage.getItem("user");

  if (user) {
    userData.value = JSON.parse(user);

    editForm.value.first_name = userData.value.first_name;

    editForm.value.last_name = userData.value.last_name;
  }

  fetchAddresses();

  fetchProvinces();

  fetchUserProfile();
});

// const handleLogout = () => {
//   localStorage.removeItem("token");

//   localStorage.removeItem("user");

//   Swal.fire({
//     icon: "info",
//     title: "Logged Out",
//     text: "Sesi Anda telah berakhir.",
//     timer: 1500,
//   });

//   router.push("/login");
// };

const handleLogout = () => {
  // Tampilkan Pop-up Konfirmasi
  Swal.fire({
    title: "Are you sure?",
    text: "You will be signed out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Logout",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "See you again soon!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push("/login");
      });
    }
  });
};
</script> -->

<!-- Google Map -->
<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-4xl">
    <div class="bg-white shadow-sm p-8 border border-gray-200 rounded-2xl">
      <h1 class="mb-8 font-bold text-3xl">Your Profile</h1>

      <div v-if="userData" class="flex md:flex-row flex-col gap-10">
        <div class="flex flex-col items-center gap-4">
          <div class="group relative">
            <img :key="userData.profile_image" :src="userData.profile_image" class="shadow-sm border-4 border-gray-50 rounded-full w-32 h-32 object-cover" alt="Profile Avatar" @error="handleImageError" />
            <label class="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer">
              <span class="font-bold text-white text-xs">Change</span>
              <input type="file" class="hidden" @change="handleImageUpdate" accept="image/*" />
            </label>
          </div>
        </div>

        <div class="flex-grow space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <label class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest">Full Name & Email</label>
              <p class="font-medium text-xl">{{ userData.first_name }} {{ userData.last_name }}</p>
              <p class="text-gray-400">{{ userData.email }}</p>
              <p class="text-gray-400 text-sm italic">{{ userData.phone || "No phone number added" }}</p>
            </div>
            <button @click="openInfoModal" class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </div>
          <div class="flex justify-between items-start pt-4 border-gray-50 border-t">
            <div>
              <label class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest">Your Password</label>
              <p class="text-xl tracking-widest">••••••••</p>
            </div>
            <button @click="showPasswordModal = true" class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="flex justify-end mt-10 pt-6 border-gray-100 border-t">
      <button @click="handleLogout" class="bg-red-500 hover:bg-red-600 shadow-sm px-6 py-2 rounded-xl font-semibold text-white transition duration-200">Logout</button>
    </div>

    <div v-if="showInfoModal" class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4">
       <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Info</h3>
        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <input v-model="infoForm.first_name" placeholder="First Name" class="bg-gray-50 p-3 border rounded-xl outline-none w-full" required />
          <input v-model="infoForm.last_name" placeholder="Last Name" class="bg-gray-50 p-3 border rounded-xl outline-none w-full" required />
          <input v-model="infoForm.email" type="email" placeholder="Email" class="bg-gray-50 p-3 border rounded-xl outline-none w-full" required />
          <input v-model="infoForm.phone" type="tel" placeholder="Phone Number" class="bg-gray-50 p-3 border rounded-xl outline-none w-full" />
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showInfoModal = false" class="flex-1 text-gray-500">Cancel</button>
            <button type="submit" class="flex-1 bg-black py-3 rounded-xl font-bold text-white">Save Info</button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showPasswordModal" class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4">
       <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Password</h3>
        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <input v-model="passForm.old_password" type="password" placeholder="Old Password" class="bg-gray-50 p-3 border rounded-xl outline-none w-full" required />
          <input v-model="passForm.password" type="password" placeholder="New Password" class="bg-gray-50 p-3 border rounded-xl outline-none w-full" required />
          <input v-model="passForm.password_confirmation" type="password" placeholder="Confirm New Password" class="bg-gray-50 p-3 border rounded-xl outline-none w-full" required />
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showPasswordModal = false" class="flex-1 text-gray-500">Cancel</button>
            <button type="submit" class="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-white">Update</button>
          </div>
        </form>
      </div>
    </div>

    <div class="mt-12 pt-12 border-gray-100 border-t">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-bold text-2xl">Addresses</h2>
        <button @click="openModal()" class="font-medium text-blue-600 hover:underline">+ Add</button>
      </div>

      <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div v-for="addr in addresses" :key="addr.id" class="relative bg-gray-50/50 p-6 border border-gray-100 rounded-xl">
          <div v-if="addr.is_default" class="mb-2 text-gray-400 text-xs">Default address</div>
          <button @click="openModal(addr)" class="top-4 right-4 absolute text-blue-500 hover:text-blue-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
          </button>
          <p class="mb-1 font-bold">{{ addr.receiver.first_name }} {{ addr.receiver.last_name }}</p>
          <p class="text-gray-600 text-sm">{{ addr.details.location }}</p>
          <p class="text-gray-600 text-sm">{{ addr.details.city }}, {{ addr.details.province }} {{ addr.details.postal_code }}</p>
          <div v-if="addr.details.latitude && addr.details.longitude" class="mt-3 flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-widest">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Pin Pinned
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div class="relative bg-white shadow-2xl p-8 rounded-3xl w-full max-w-2xl my-8">
        <button @click="showModal = false" class="top-6 right-6 absolute text-gray-400 hover:text-black">✕</button>
        <h3 class="mb-6 font-bold text-2xl">{{ isEdit ? "Edit address" : "Add address" }}</h3>

        <form @submit.prevent="saveAddress" class="space-y-4">
          <div class="flex items-center gap-2 mb-4">
            <input type="checkbox" v-model="form.is_default" id="def" />
            <label for="def" class="text-sm">This is my default address</label>
          </div>

          <div class="gap-4 grid grid-cols-2">
            <input v-model="form.first_name_address" placeholder="First name" class="bg-gray-50 p-3 border rounded-xl outline-none" required />
            <input v-model="form.last_name_address" placeholder="Last name" class="bg-gray-50 p-3 border rounded-xl outline-none" required />
          </div>

          <div class="gap-4 grid grid-cols-2">
            <select v-model="form.province" class="bg-gray-50 p-3 border rounded-xl outline-none" required>
              <option value="" disabled>Select Province</option>
              <option v-for="p in filteredProvinces" :key="p" :value="p">{{ p }}</option>
            </select>
            <input v-model="form.city" placeholder="City" class="bg-gray-50 p-3 border rounded-xl outline-none" required />
          </div>

          <div class="border border-gray-200 rounded-xl overflow-hidden mt-4">
            <div class="bg-gray-50 p-3 border-b border-gray-200 flex justify-between items-center gap-2">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest hidden sm:block">Pin Location</p>
              
              <input 
                ref="searchRef"
                type="text" 
                placeholder="Search places..." 
                class="flex-1 text-sm px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <button type="button" @click="getCurrentLocation" class="text-[10px] bg-blue-100 text-blue-700 px-3 py-1.5 rounded font-bold hover:bg-blue-200 transition whitespace-nowrap">
                Current Loc
              </button>
            </div>
            
            <div class="h-64 w-full relative">
              <GoogleMap 
                :api-key="GOOGLE_API_KEY" 
                :center="mapCenter" 
                :zoom="15" 
                :libraries="['places']"
                class="w-full h-full"
                @click="onMapClick"
              >
                <Marker :options="{ position: mapCenter, draggable: true }" @dragend="onMarkerDrag" />
              </GoogleMap>
              
              <div class="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow text-[10px] font-mono text-gray-600 pointer-events-none">
                {{ form.latitude ? parseFloat(form.latitude).toFixed(5) : '-' }}, {{ form.longitude ? parseFloat(form.longitude).toFixed(5) : '-' }}
              </div>
            </div>
          </div>

          <div class="relative">
            <textarea v-model="form.address_location" rows="2" placeholder="Full street address (auto-filled from map)" class="bg-gray-50 p-3 border rounded-xl outline-none w-full resize-none" required></textarea>
            <p class="text-[10px] text-gray-400 mt-1">*Drag pin or search location to auto-fill address.</p>
          </div>

          <div class="gap-4 grid grid-cols-2">
            <input v-model="form.location_type" placeholder="Apartment, suite (optional)" class="bg-gray-50 p-3 border rounded-xl outline-none" />
            <input v-model="form.postal_code" placeholder="Postal code" class="bg-gray-50 p-3 border rounded-xl outline-none" required />
          </div>

          <div class="flex justify-between items-center pt-6">
            <button v-if="isEdit" type="button" @click="deleteAddress" class="text-red-500 hover:underline">Delete</button>
            <div class="flex gap-4 ml-auto">
              <button type="button" @click="showModal = false" class="text-blue-600">Cancel</button>
              <button type="submit" class="bg-blue-600 px-8 py-3 rounded-xl font-bold text-white shadow-md shadow-blue-500/30">Save Address</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Country, State } from "country-state-city";
import { BASE_URL } from "../../config/api.js";
import { GoogleMap, Marker } from "vue3-google-map";

const GOOGLE_API_KEY = "AIzaSyARS90mnbPt6vOKbpJja_CM3MsZiOvdqEw"; // Pastikan Billing & Places API Enabled

// State
const addresses = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const router = useRouter();
const userData = ref(null);
const showInfoModal = ref(false);
const showPasswordModal = ref(false);
const searchRef = ref(null); // Ref untuk input search

const mapCenter = ref({ lat: -7.250445, lng: 112.768845 }); // Default Surabaya

const form = ref({
  id: null,
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
  is_default: false,
});

const infoForm = ref({ first_name: "", last_name: "", email: "", phone: "" });
const passForm = ref({ old_password: "", password: "", password_confirmation: "" });

// --- GOOGLE MAPS LOGIC (Native) ---

// 1. Fungsi Reverse Geocoding (Koordinat -> Alamat)
const reverseGeocodeNative = (lat, lng) => {
  if (!window.google || !window.google.maps) return;
  
  const geocoder = new window.google.maps.Geocoder();
  const latlng = { lat: parseFloat(lat), lng: parseFloat(lng) };

  geocoder.geocode({ location: latlng }, (results, status) => {
    if (status === "OK" && results[0]) {
      form.value.address_location = results[0].formatted_address;
      
      // (Opsional) Coba ekstrak kodepos jika ada
      const postalComp = results[0].address_components.find(c => c.types.includes('postal_code'));
      if(postalComp) form.value.postal_code = postalComp.long_name;
      
    } else {
      console.warn("Geocoder not found or failed: " + status);
    }
  });
};

// 2. Fungsi Init Autocomplete (Search Bar)
const initAutocomplete = () => {
  // Cek berkala sampai library 'places' dimuat oleh vue3-google-map
  const checkGoogle = setInterval(() => {
    if (window.google && window.google.maps && window.google.maps.places && searchRef.value) {
      clearInterval(checkGoogle);
      
      const autocomplete = new window.google.maps.places.Autocomplete(searchRef.value, {
        fields: ["geometry", "formatted_address", "address_components"],
        strictBounds: false,
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry || !place.geometry.location) {
          return; // User enter tapi belum pilih suggestion
        }

        // Update Map Center & Marker
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        
        mapCenter.value = { lat, lng };
        form.value.latitude = lat;
        form.value.longitude = lng;
        form.value.address_location = place.formatted_address;

        // (Opsional) Parse component lain jika perlu
      });
    }
  }, 500); // Cek setiap 500ms
};

// Event Handler Map
const onMapClick = (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  mapCenter.value = { lat, lng };
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocodeNative(lat, lng);
};

const onMarkerDrag = (event) => {
  const lat = event.latLng.lat();
  const lng = event.latLng.lng();
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocodeNative(lat, lng);
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      mapCenter.value = { lat, lng };
      form.value.latitude = lat.toString();
      form.value.longitude = lng.toString();
      reverseGeocodeNative(lat, lng);
    }, () => {
      Swal.fire("Error", "Please allow location access.", "error");
    });
  }
};

// --- CORE LOGIC ---
const openModal = (data = null) => {
  isEdit.value = !!data;
  if (data) {
    form.value = {
      id: data.id,
      region: data.details.region,
      first_name_address: data.receiver.first_name,
      last_name_address: data.receiver.last_name,
      address_location: data.details.location,
      location_type: data.details.type === "other" ? "" : data.details.type,
      city: data.details.city,
      province: data.details.province,
      postal_code: data.details.postal_code,
      latitude: data.details.latitude,
      longitude: data.details.longitude,
      is_default: data.is_default,
    };
    if (data.details.latitude && data.details.longitude) {
      mapCenter.value = { lat: parseFloat(data.details.latitude), lng: parseFloat(data.details.longitude) };
    }
    fetchProvinces();
  } else {
    form.value = { region: "Indonesia", is_default: false, first_name_address: "", last_name_address: "", address_location: "", location_type: "", city: "", province: "", postal_code: "", latitude: null, longitude: null };
  }
  showModal.value = true;
  
  // Panggil init autocomplete saat modal dibuka
  initAutocomplete();
};

// ... (Fungsi CRUD Address, User Profile, & Logout TETAP SAMA) ...
const fetchAddresses = async () => {
  const res = await axios.get(`${BASE_URL}/addresses`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
  addresses.value = res.data.data;
};

const fetchProvinces = () => {
  const selectedCountry = countries.value.find((c) => c.name === form.value.region);
  if (selectedCountry) {
    filteredProvinces.value = State.getStatesOfCountry(selectedCountry.isoCode).map((s) => s.name);
  }
};

const saveAddress = async () => {
  const url = isEdit.value ? `${BASE_URL}/addresses/${form.value.id}` : `${BASE_URL}/addresses`;
  const method = isEdit.value ? "put" : "post";
  try {
    await axios[method](url, form.value, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    showModal.value = false;
    fetchAddresses();
    Swal.fire("Success", "Address updated!", "success");
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  }
};

const deleteAddress = async () => {
  if(!confirm("Delete this address?")) return;
  try {
    await axios.delete(`${BASE_URL}/addresses/${form.value.id}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    showModal.value = false;
    fetchAddresses();
    Swal.fire("Deleted", "Address removed", "success");
  } catch(e) { Swal.fire("Error", "Failed to delete", "error"); }
};

const handleLogout = () => {
  Swal.fire({ title: "Are you sure?", icon: "warning", showCancelButton: true, confirmButtonColor: "#000", confirmButtonText: "Yes, Logout" }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
    }
  });
};

const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    updateUserData(res.data);
  } catch (err) { if (err.response && err.response.status === 401) handleLogout(); }
};

const updateUserData = (user) => {
  if (!user) return;
  userData.value = Object.assign({}, userData.value, user);
  localStorage.setItem("user", JSON.stringify(userData.value));
};

const openInfoModal = () => {
  infoForm.value = { first_name: userData.value.first_name, last_name: userData.value.last_name, email: userData.value.email, phone: userData.value.phone || "" };
  showInfoModal.value = true;
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/user/update-info`, infoForm.value, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    updateUserData(res.data.user);
    showInfoModal.value = false;
    Swal.fire("Success", "Info updated!", "success");
  } catch (err) { Swal.fire("Error", "Failed update", "error"); }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/user/update-password`, passForm.value, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    showPasswordModal.value = false;
    passForm.value = { old_password: "", password: "", password_confirmation: "" };
    Swal.fire("Success", "Password updated!", "success");
  } catch (err) { Swal.fire("Error", err.response.data.message, "error"); }
};

const handleImageUpdate = async (e) => {
  // ... (Kode upload gambar sama persis)
};
const handleImageError = (e) => { e.target.src = `https://ui-avatars.com/api/?name=${userData.value.first_name}+${userData.value.last_name}&background=random`; };

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    userData.value = JSON.parse(user);
    // ... init form
  }
  fetchAddresses();
  fetchProvinces();
  fetchUserProfile();
});
</script> -->

<!-- Tanpa Google Map -->
<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-4xl">
    <div class="bg-white shadow-sm p-8 border border-gray-200 rounded-2xl">
      <h1 class="mb-8 font-bold text-3xl">Your Profile</h1>

      <div v-if="userData" class="flex md:flex-row flex-col gap-10">
        <div class="flex flex-col items-center gap-4">
          <div class="group relative">
            <img
              :key="userData.profile_image || 'default'"
              :src="userData.profile_image || defaultProfile"
              class="shadow-sm border-4 border-gray-50 rounded-full w-32 h-32 object-cover"
              alt="Profile Avatar"
              @error="handleImageError"
            />
            <label
              class="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer"
            >
              <span class="font-bold text-white text-xs">Change</span>
              <input
                type="file"
                class="hidden"
                @change="handleImageUpdate"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div class="flex-grow space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Full Name & Email</label
              >
              <p class="font-medium text-xl">
                {{ userData.first_name }} {{ userData.last_name }}
              </p>
              <p class="text-gray-400">{{ userData.email }}</p>
              <p class="text-gray-400 text-sm italic">
                {{ userData.phone || "No phone number added" }}
              </p>
            </div>
            <button
              @click="openInfoModal"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex justify-between items-start pt-4 border-gray-50 border-t"
          >
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Your Password</label
              >
              <p class="text-xl tracking-widest">••••••••</p>
            </div>
            <button
              @click="showPasswordModal = true"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <div class="mt-8 pt-8 border-gray-100 border-t">
            <router-link
              to="/favorites"
              class="group flex justify-between items-center bg-gray-50 hover:bg-red-50 p-6 rounded-3xl border border-gray-100 hover:border-red-100 transition-all cursor-pointer"
            >
              <div class="flex items-center gap-5">
                <div
                  class="w-12 h-12 bg-white group-hover:bg-red-100 text-red-500 rounded-full flex justify-center items-center shadow-sm transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="none"
                  >
                    <path
                      d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                    />
                  </svg>
                </div>
                <div>
                  <h2
                    class="font-bold text-xl text-gray-900 group-hover:text-red-600 transition-colors"
                  >
                    My Favorites
                  </h2>
                  <p class="text-xs text-gray-500 mt-1">
                    View and manage your wishlist items
                  </p>
                </div>
              </div>
              <div
                class="text-gray-400 group-hover:text-red-500 group-hover:translate-x-2 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </router-link>
          </div>

          <div class="pt-6 border-gray-50 border-t mt-6">
            <div
              class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
            >
              <svg
                class="absolute -right-4 -top-4 w-24 h-24 text-yellow-500 opacity-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>

              <div class="flex justify-between items-center relative z-10">
                <div>
                  <h3
                    class="font-bold text-lg text-yellow-400 tracking-wide uppercase"
                  >
                    Solher Club Member
                  </h3>

                  <template v-if="userData.is_membership">
                    <p class="text-xs text-gray-300 mt-1">
                      You are an exclusive member. Keep shopping to earn points!
                    </p>
                    <div class="mt-4">
                      <p
                        class="text-[10px] text-gray-400 uppercase tracking-widest"
                      >
                        Total Points
                      </p>
                      <p class="text-3xl font-black text-white">
                        {{ userData.point || 0 }}
                        <span class="text-sm font-normal text-yellow-500"
                          >Pts</span
                        >
                      </p>
                    </div>
                  </template>

                  <template v-else>
                    <p
                      class="text-xs text-gray-300 mt-1 max-w-[200px] leading-relaxed"
                    >
                      Spend a total of
                      <strong class="text-white">Rp 100.000</strong> to
                      automatically unlock your membership and start earning
                      points!
                    </p>
                  </template>
                </div>

                <div class="flex flex-col items-end">
                  <div
                    :class="
                      userData.is_membership
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-700 text-gray-300'
                    "
                    class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-inner"
                  >
                    {{ userData.is_membership ? "Active" : "Locked" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-10 pt-6 border-gray-100 border-t">
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 shadow-sm px-6 py-2 rounded-xl font-semibold text-white transition duration-200"
      >
        Logout
      </button>
    </div>

    <div
      v-if="showInfoModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Info</h3>
        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <input
            v-model="infoForm.first_name"
            placeholder="First Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.last_name"
            placeholder="Last Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.email"
            type="email"
            placeholder="Email"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.phone"
            type="tel"
            placeholder="Phone Number"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showInfoModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-black py-3 rounded-xl font-bold text-white"
            >
              Save Info
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showPasswordModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Password</h3>
        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <input
            v-model="passForm.old_password"
            type="password"
            placeholder="Old Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password"
            type="password"
            placeholder="New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password_confirmation"
            type="password"
            placeholder="Confirm New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="mt-12 pt-12 border-gray-100 border-t">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-bold text-2xl">Addresses</h2>
        <button
          @click="openModal()"
          class="font-medium text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      <div class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div
          v-for="addr in addresses"
          :key="addr.id"
          class="relative bg-gray-50/50 p-6 border border-gray-100 rounded-xl"
        >
          <div v-if="addr.is_default" class="mb-2 text-gray-400 text-xs">
            Default address
          </div>
          <button
            @click="openModal(addr)"
            class="top-4 right-4 absolute text-blue-500 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <p class="mb-1 font-bold">
            {{ addr.receiver.first_name }} {{ addr.receiver.last_name }}
          </p>
          <p class="text-gray-600 text-sm">{{ addr.details.location }}</p>
          <p class="text-gray-600 text-sm">
            {{ addr.details.city }}, {{ addr.details.province }}
            {{ addr.details.postal_code }}
          </p>
          <div
            v-if="addr.details.latitude && addr.details.longitude"
            class="mt-3 flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-widest"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Pin Pinned
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div
        class="relative bg-white shadow-2xl p-6 rounded-2xl w-full max-w-2xl my-4"
      >
        <button
          @click="showModal = false"
          class="top-4 right-5 absolute text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>
        <h3 class="mb-4 font-bold text-xl">
          {{ isEdit ? "Edit address" : "Add address" }}
        </h3>

        <form @submit.prevent="saveAddress" class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <input type="checkbox" v-model="form.is_default" id="def" />
            <label for="def" class="text-sm">This is my default address</label>
          </div>

          <div class="gap-3 grid grid-cols-2">
            <input
              v-model="form.first_name_address"
              placeholder="First name"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
            <input
              v-model="form.last_name_address"
              placeholder="Last name"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
          </div>

          <div class="gap-3 grid grid-cols-2">
            <select
              v-model="form.province"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            >
              <option value="" disabled>Select Province</option>
              <option v-for="p in filteredProvinces" :key="p" :value="p">
                {{ p }}
              </option>
            </select>
            <input
              v-model="form.city"
              placeholder="City"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
          </div>

          <div
            class="border border-gray-200 rounded-xl overflow-hidden mt-2 relative"
          >
            <div
              class="bg-amber-50 border-b border-amber-100 py-1.5 px-3 flex items-start gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p class="text-[10px] text-amber-700 leading-tight">
                <span class="font-bold">Important:</span> Ensure the blue pin on
                the map is accurately placed exactly at your location to prevent
                delivery failures.
              </p>
            </div>

            <div
              class="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center gap-2"
            >
              <div class="relative flex-1">
                <input
                  type="text"
                  v-model="searchQuery"
                  @input="handleSearchInput"
                  placeholder="Search area (e.g. Tunjungan Plaza)"
                  class="w-full text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div
                  v-if="searchResults.length > 0"
                  class="absolute z-[999] mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto"
                >
                  <div
                    v-for="(result, idx) in searchResults"
                    :key="idx"
                    @click="selectSearchResult(result)"
                    class="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer border-b last:border-0 text-gray-700"
                  >
                    {{ result.display_name }}
                  </div>
                </div>
              </div>

              <button
                type="button"
                @click="getCurrentLocation"
                class="text-[10px] bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-200 transition whitespace-nowrap"
              >
                Current Loc
              </button>
            </div>

            <div class="h-40 sm:h-48 w-full relative z-0">
              <l-map
                ref="map"
                v-model:zoom="zoom"
                :center="center"
                :use-global-leaflet="false"
                @click="onMapClick"
              >
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>

                <l-marker
                  :lat-lng="markerLatLng"
                  draggable
                  @update:latLng="onMarkerDrag"
                ></l-marker>
              </l-map>

              <div
                class="absolute bottom-2 right-2 z-[400] bg-white/90 backdrop-blur px-2 py-1 rounded shadow text-[9px] font-mono text-gray-600 pointer-events-none"
              >
                {{
                  form.latitude ? parseFloat(form.latitude).toFixed(5) : "-"
                }},
                {{
                  form.longitude ? parseFloat(form.longitude).toFixed(5) : "-"
                }}
              </div>
            </div>
          </div>

          <div class="relative pt-1">
            <div class="flex justify-between items-end mb-1">
              <label
                class="font-bold text-gray-700 text-[10px] uppercase tracking-widest"
                >Detail Address</label
              >
              <span
                class="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium"
                >Editable</span
              >
            </div>
            <p class="text-[9px] text-gray-500 mb-1.5 leading-tight">
              Auto-filled from map, but you can edit this text to add specific
              details (e.g., Block B No. 15).
            </p>

            <textarea
              v-model="form.address_location"
              rows="2"
              placeholder="Enter full street address and specific details..."
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none w-full resize-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            ></textarea>
          </div>

          <div class="gap-3 grid grid-cols-2 pt-1">
            <input
              v-model="form.location_type"
              placeholder="Apartment, suite (optional)"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
            />
            <input
              v-model="form.postal_code"
              placeholder="Postal code"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
          </div>

          <div class="flex justify-between items-center pt-4">
            <button
              v-if="isEdit"
              type="button"
              @click="deleteAddress"
              class="text-red-500 hover:underline font-bold text-xs"
            >
              Delete
            </button>
            <div class="flex gap-3 ml-auto">
              <button
                type="button"
                @click="showModal = false"
                class="text-gray-500 hover:text-gray-800 font-bold px-3 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold text-white shadow-md shadow-blue-500/30 transition-colors text-sm"
              >
                Save Address
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Country, State } from "country-state-city";
import { BASE_URL } from "../../config/api.js";

import defaultProfile from "../../../src/assets/profile.png";

// Import Leaflet
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url,
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

// State Umum
const addresses = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const router = useRouter();
const userData = ref(null);
const showInfoModal = ref(false);
const showPasswordModal = ref(false);

const form = ref({
  id: null,
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
  is_default: false,
});

// Deklarasikan ref untuk elemen l-map
const map = ref(null);

// --- LEAFLET MAP STATE & LOGIC ---
const zoom = ref(13);
const center = ref([-7.250445, 112.768845]); // Default Surabaya
const markerLatLng = ref([-7.250445, 112.768845]);
const searchQuery = ref("");
const searchResults = ref([]);
let debounceTimeout = null;

// 1. REVERSE GEOCODING (Nominatim API - FREE)
const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    if (res.data && res.data.display_name) {
      form.value.address_location = res.data.display_name;

      // Auto-fill Postcode jika ada
      if (res.data.address && res.data.address.postcode) {
        form.value.postal_code = res.data.address.postcode;
      }
    }
  } catch (error) {
    console.error("Reverse Geocode Error", error);
  }
};

// 2. SEARCH / AUTOCOMPLETE (Nominatim API - FREE)
const handleSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }

  // Debounce agar tidak spam API
  debounceTimeout = setTimeout(async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`,
      );
      searchResults.value = res.data;
    } catch (error) {
      console.error("Search Error", error);
    }
  }, 500);
};

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);

  // Pindahkan peta & marker
  // center.value = [lat, lng];
  // markerLatLng.value = [lat, lng];
  // zoom.value = 16;

  // Paksa Leaflet untuk memindahkan view kamera
  if (map.value && map.value.leafletObject) {
    map.value.leafletObject.flyTo([lat, lng], 16);
  } else {
    center.value = [lat, lng];
    zoom.value = 16;
  }

  markerLatLng.value = [lat, lng];

  // Update Form
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  form.value.address_location = result.display_name;

  // Bersihkan search
  searchResults.value = [];
  searchQuery.value = "";
};

// 3. MAP EVENTS
const onMapClick = (event) => {
  // Leaflet event returns latlng object
  const { lat, lng } = event.latlng;
  updateLocation(lat, lng);
};

const onMarkerDrag = (event) => {
  const { lat, lng } = event.target.getLatLng(); // Ambil koordinat marker setelah di-drag
  updateLocation(lat, lng);
};

const updateLocation = (lat, lng) => {
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocode(lat, lng);
};

// const getCurrentLocation = () => {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const lng = position.coords.longitude;
//         center.value = [lat, lng];
//         updateLocation(lat, lng);
//         zoom.value = 16;
//       },
//       () => {
//         Swal.fire("Error", "Please allow location access.", "error");
//       },
//     );
//   }
// };

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        // Paksa Leaflet untuk memindahkan view kamera ke lokasi user
        if (map.value && map.value.leafletObject) {
          map.value.leafletObject.flyTo([lat, lng], 16);
        } else {
          center.value = [lat, lng];
          zoom.value = 16;
        }

        updateLocation(lat, lng);
      },
      () => {
        Swal.fire("Error", "Please allow location access.", "error");
      },
    );
  }
};

// --- CORE LOGIC (Sama seperti sebelumnya) ---
const openModal = (data = null) => {
  isEdit.value = !!data;
  if (data) {
    // ... Copy data ...
    form.value = {
      id: data.id,
      region: data.details.region,
      first_name_address: data.receiver.first_name,
      last_name_address: data.receiver.last_name,
      address_location: data.details.location,
      location_type: data.details.type === "other" ? "" : data.details.type,
      city: data.details.city,
      province: data.details.province,
      postal_code: data.details.postal_code,
      latitude: data.details.latitude,
      longitude: data.details.longitude,
      is_default: data.is_default,
    };

    if (data.details.latitude && data.details.longitude) {
      const lat = parseFloat(data.details.latitude);
      const lng = parseFloat(data.details.longitude);
      center.value = [lat, lng];
      markerLatLng.value = [lat, lng];
    }
    fetchProvinces();
  } else {
    // Reset
    form.value = {
      region: "Indonesia",
      is_default: false,
      first_name_address: "",
      last_name_address: "",
      address_location: "",
      location_type: "",
      city: "",
      province: "",
      postal_code: "",
      latitude: null,
      longitude: null,
    };
    // Reset Map ke default center
    center.value = [-7.250445, 112.768845];
    markerLatLng.value = [-7.250445, 112.768845];
  }
  showModal.value = true;
};

// ... (Fungsi API fetchAddresses, saveAddress, dll tetap sama) ...
const fetchAddresses = async () => {
  const res = await axios.get(`${BASE_URL}/addresses`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  addresses.value = res.data.data;
};

const fetchProvinces = () => {
  const selectedCountry = countries.value.find(
    (c) => c.name === form.value.region,
  );
  if (selectedCountry) {
    filteredProvinces.value = State.getStatesOfCountry(
      selectedCountry.isoCode,
    ).map((s) => s.name);
  }
};

const saveAddress = async () => {
  const url = isEdit.value
    ? `${BASE_URL}/addresses/${form.value.id}`
    : `${BASE_URL}/addresses`;
  const method = isEdit.value ? "put" : "post";
  try {
    await axios[method](url, form.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showModal.value = false;
    fetchAddresses();
    Swal.fire("Success", "Address updated!", "success");
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  }
};

const deleteAddress = async () => {
  if (!confirm("Delete this address?")) return;
  try {
    await axios.delete(`${BASE_URL}/addresses/${form.value.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showModal.value = false;
    fetchAddresses();
    Swal.fire("Deleted", "Address removed", "success");
  } catch (e) {
    Swal.fire("Error", "Failed to delete", "error");
  }
};

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    }
  });
};

const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    updateUserData(res.data);
  } catch (err) {
    if (err.response && err.response.status === 401) handleLogout();
  }
};

// const updateUserData = (user) => {
//   if (!user) return;
//   userData.value = Object.assign({}, userData.value, user);
//   localStorage.setItem("user", JSON.stringify(userData.value));
// };

const updateUserData = (user) => {
  if (!user) return;

  // [PERBAIKAN] Paksa konversi is_membership menjadi Boolean asli
  // Menggunakan !! akan mengubah 1 menjadi true, dan 0 menjadi false.
  if (user.hasOwnProperty("is_membership")) {
    user.is_membership = !!user.is_membership;
  }

  userData.value = Object.assign({}, userData.value, user);
  localStorage.setItem("user", JSON.stringify(userData.value));
};

const openInfoModal = () => {
  infoForm.value = {
    first_name: userData.value.first_name,
    last_name: userData.value.last_name,
    email: userData.value.email,
    phone: userData.value.phone || "",
  };
  showInfoModal.value = true;
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user/update-info`,
      infoForm.value,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    updateUserData(res.data.user);
    showInfoModal.value = false;
    Swal.fire("Success", "Info updated!", "success");
  } catch (err) {
    Swal.fire("Error", "Failed update", "error");
  }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/user/update-password`, passForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showPasswordModal.value = false;
    passForm.value = {
      old_password: "",
      password: "",
      password_confirmation: "",
    };
    Swal.fire("Success", "Password updated!", "success");
  } catch (err) {
    Swal.fire("Error", err.response.data.message, "error");
  }
};

// const toggleMembership = async () => {
//   try {
//     const res = await axios.post(
//       `${BASE_URL}/user/toggle-membership`,
//       { is_membership: userData.value.is_membership },
//       { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
//     );
//     updateUserData(res.data.user);
//     Swal.fire({
//       toast: true,
//       position: "top-end",
//       icon: "success",
//       title: userData.value.is_membership
//         ? "Membership Activated!"
//         : "Membership Deactivated",
//       showConfirmButton: false,
//       timer: 3000,
//     });
//   } catch (err) {
//     // Revert jika gagal
//     userData.value.is_membership = !userData.value.is_membership;
//     Swal.fire("Error", "Failed to update membership status", "error");
//   }
// };

const infoForm = ref({ first_name: "", last_name: "", email: "", phone: "" });
const passForm = ref({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 1. OPTIMISTIC UPDATE (Tampilkan gambar lokal secara instan)
  // Membuat URL sementara dari file yang dipilih
  const objectUrl = URL.createObjectURL(file);

  // Simpan URL gambar lama untuk rollback jika upload gagal
  const oldImage = userData.value.profile_image;

  // Update state gambar secara lokal
  userData.value.profile_image = objectUrl;

  // 2. PROSES UPLOAD KE SERVER (Background Process)
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/user/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.user) {
      // 3. SYNC DENGAN DATA SERVER (Setelah sukses)
      const newUser = res.data.user;

      // Tambahkan timestamp agar browser tidak mengambil cache lama
      if (newUser.profile_image) {
        const separator = newUser.profile_image.includes("?") ? "&" : "?";
        newUser.profile_image = `${newUser.profile_image}${separator}t=${new Date().getTime()}`;
      }

      updateUserData(newUser);

      // Hapus URL object sementara dari memori browser
      URL.revokeObjectURL(objectUrl);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Foto profil diperbarui!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (err) {
    // 4. ROLLBACK (Jika gagal)
    console.error("Upload failed", err);
    userData.value.profile_image = oldImage; // Kembalikan ke gambar lama
    URL.revokeObjectURL(objectUrl); // Bersihkan memori

    Swal.fire(
      "Gagal",
      "Tidak dapat mengunggah foto. Silakan coba lagi.",
      "error",
    );
  }
};

// [PERBAIKAN] Ubah Fallback Error ke Gambar Default Lokal
const handleImageError = (e) => {
  // Mencegah infinite loop jika defaultProfile juga gagal dimuat
  if (e.target.src !== new URL(defaultProfile, import.meta.url).href) {
    e.target.src = defaultProfile;
  }
};

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    userData.value = JSON.parse(user);
  }
  fetchAddresses();
  fetchProvinces();
  fetchUserProfile();
});
</script> -->

<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-4xl">
    <div class="bg-white shadow-sm p-8 border border-gray-200 rounded-2xl">
      <h1 class="mb-8 font-bold text-3xl">Your Profile</h1>

      <div v-if="userData" class="flex md:flex-row flex-col gap-10">
        <div class="flex flex-col items-center gap-4">
          <div class="group relative">
            <img
              :key="userData.profile_image || 'default'"
              :src="userData.profile_image || defaultProfile"
              class="shadow-sm border-4 border-gray-50 rounded-full w-32 h-32 object-cover"
              alt="Profile Avatar"
              @error="handleImageError"
            />
            <label
              class="absolute inset-0 flex justify-center items-center bg-black/40 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer"
            >
              <span class="font-bold text-white text-xs">Change</span>
              <input
                type="file"
                class="hidden"
                @change="handleImageUpdate"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <div class="flex-grow space-y-6">
          <div class="flex justify-between items-start">
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Full Name & Email</label
              >
              <p class="font-medium text-xl">
                {{ userData.first_name }} {{ userData.last_name }}
              </p>
              <p class="text-gray-400">{{ userData.email }}</p>
              <p class="text-gray-400 text-sm italic">
                {{ userData.phone || "No phone number added" }}
              </p>
            </div>
            <button
              @click="openInfoModal"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>
          <div
            class="flex justify-between items-start pt-4 border-gray-50 border-t"
          >
            <div>
              <label
                class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest"
                >Your Password</label
              >
              <p class="text-xl tracking-widest">••••••••</p>
            </div>
            <button
              @click="showPasswordModal = true"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </button>
          </div>

          <div class="mt-8 pt-8 border-gray-100 border-t">
            <router-link
              to="/favorites"
              class="group flex justify-between items-center bg-gray-50 hover:bg-red-50 p-6 rounded-3xl border border-gray-100 hover:border-red-100 transition-all cursor-pointer"
            >
              <div class="flex items-center gap-5">
                <div
                  class="w-12 h-12 bg-white group-hover:bg-red-100 text-red-500 rounded-full flex justify-center items-center shadow-sm transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    stroke="none"
                  >
                    <path
                      d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
                    />
                  </svg>
                </div>
                <div>
                  <h2
                    class="font-bold text-xl text-gray-900 group-hover:text-red-600 transition-colors"
                  >
                    My Favorites
                  </h2>
                  <p class="text-xs text-gray-500 mt-1">
                    View and manage your wishlist items
                  </p>
                </div>
              </div>
              <div
                class="text-gray-400 group-hover:text-red-500 group-hover:translate-x-2 transition-all"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </router-link>
          </div>

          <div class="pt-6 border-gray-50 border-t mt-6">
            <div
              class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
            >
              <svg
                class="absolute -right-4 -top-4 w-24 h-24 text-yellow-500 opacity-20"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>

              <div class="flex justify-between items-center relative z-10">
                <div>
                  <h3
                    class="font-bold text-lg text-yellow-400 tracking-wide uppercase"
                  >
                    Solher Club Member
                  </h3>

                  <template v-if="userData.is_membership">
                    <p class="text-xs text-gray-300 mt-1">
                      You are an exclusive member. Keep shopping to earn points!
                    </p>
                    <div class="mt-4">
                      <p
                        class="text-[10px] text-gray-400 uppercase tracking-widest"
                      >
                        Total Points
                      </p>
                      <p class="text-3xl font-black text-white">
                        {{ userData.point || 0 }}
                        <span class="text-sm font-normal text-yellow-500"
                          >Pts</span
                        >
                      </p>
                    </div>
                  </template>

                  <template v-else>
                    <p
                      class="text-xs text-gray-300 mt-1 max-w-[200px] leading-relaxed"
                    >
                      Spend a total of
                      <strong class="text-white">Rp 100.000</strong> to
                      automatically unlock your membership and start earning
                      points!
                    </p>
                  </template>
                </div>

                <div class="flex flex-col items-end">
                  <div
                    :class="
                      userData.is_membership
                        ? 'bg-yellow-500 text-black'
                        : 'bg-gray-700 text-gray-300'
                    "
                    class="px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest shadow-inner"
                  >
                    {{ userData.is_membership ? "Active" : "Locked" }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-10 pt-6 border-gray-100 border-t">
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 shadow-sm px-6 py-2 rounded-xl font-semibold text-white transition duration-200"
      >
        Logout
      </button>
    </div>

    <div
      v-if="showInfoModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Info</h3>
        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <input
            v-model="infoForm.first_name"
            placeholder="First Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.last_name"
            placeholder="Last Name"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.email"
            type="email"
            placeholder="Email"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="infoForm.phone"
            type="tel"
            placeholder="Phone Number"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showInfoModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-black py-3 rounded-xl font-bold text-white"
            >
              Save Info
            </button>
          </div>
        </form>
      </div>
    </div>

    <div
      v-if="showPasswordModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4"
    >
      <div class="bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md">
        <h3 class="mb-6 font-bold text-2xl">Update Password</h3>
        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <input
            v-model="passForm.old_password"
            type="password"
            placeholder="Old Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password"
            type="password"
            placeholder="New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <input
            v-model="passForm.password_confirmation"
            type="password"
            placeholder="Confirm New Password"
            class="bg-gray-50 p-3 border rounded-xl outline-none w-full"
            required
          />
          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="showPasswordModal = false"
              class="flex-1 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="mt-12 pt-12 border-gray-100 border-t">
      <div class="flex justify-between items-center mb-6">
        <h2 class="font-bold text-2xl">Addresses</h2>
        <button
          @click="openModal()"
          class="font-medium text-blue-600 hover:underline"
        >
          + Add
        </button>
      </div>

      <div v-if="isLoadingAddresses" class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div v-for="i in 2" :key="i" class="bg-gray-50/50 p-6 border border-gray-100 rounded-xl space-y-3 animate-pulse">
          <div class="h-4 w-24 bg-gray-200 rounded"></div>
          <div class="h-5 w-40 bg-gray-300 rounded"></div>
          <div class="h-3 w-full bg-gray-200 rounded"></div>
          <div class="h-3 w-2/3 bg-gray-200 rounded"></div>
          <div class="h-4 w-32 bg-gray-300 rounded mt-4"></div>
        </div>
      </div>

      <div v-else-if="addresses.length > 0" class="gap-6 grid grid-cols-1 md:grid-cols-2">
        <div
          v-for="addr in addresses"
          :key="addr.id"
          class="relative bg-gray-50/50 p-6 border border-gray-100 rounded-xl"
        >
          <div v-if="addr.is_default" class="mb-2 text-gray-400 text-xs">
            Default address
          </div>
          <button
            @click="openModal(addr)"
            class="top-4 right-4 absolute text-blue-500 hover:text-blue-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <p class="mb-1 font-bold">
            {{ addr.receiver.first_name }} {{ addr.receiver.last_name }}
          </p>
          <p class="text-gray-600 text-sm">{{ addr.details.location }}</p>
          <p class="text-gray-600 text-sm">
            {{ addr.details.city }}, {{ addr.details.province }}
            {{ addr.details.postal_code }}
          </p>
          <div
            v-if="addr.details.latitude && addr.details.longitude"
            class="mt-3 flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase tracking-widest"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Pin Pinned
          </div>
        </div>
      </div>

      <div v-else class="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-300">
        <p class="text-gray-500 italic text-sm">No saved addresses.</p>
      </div>

    </div>

    <div
      v-if="showModal"
      class="z-50 fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 overflow-y-auto"
    >
      <div
        class="relative bg-white shadow-2xl p-6 rounded-2xl w-full max-w-2xl my-4"
      >
        <button
          @click="showModal = false"
          class="top-4 right-5 absolute text-gray-400 hover:text-black text-xl"
        >
          ✕
        </button>
        <h3 class="mb-4 font-bold text-xl">
          {{ isEdit ? "Edit address" : "Add address" }}
        </h3>

        <form @submit.prevent="saveAddress" class="space-y-3">
          <div class="flex items-center gap-2 mb-2">
            <input type="checkbox" v-model="form.is_default" id="def" />
            <label for="def" class="text-sm">This is my default address</label>
          </div>

          <div class="gap-3 grid grid-cols-2">
            <input
              v-model="form.first_name_address"
              placeholder="First name"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
            <input
              v-model="form.last_name_address"
              placeholder="Last name"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
          </div>

          <div class="gap-3 grid grid-cols-2">
            <select
              v-model="form.province"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            >
              <option value="" disabled>Select Province</option>
              <option v-for="p in filteredProvinces" :key="p" :value="p">
                {{ p }}
              </option>
            </select>
            <input
              v-model="form.city"
              placeholder="City"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
          </div>

          <div
            class="border border-gray-200 rounded-xl overflow-hidden mt-2 relative"
          >
            <div
              class="bg-amber-50 border-b border-amber-100 py-1.5 px-3 flex items-start gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-amber-500 shrink-0 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p class="text-[10px] text-amber-700 leading-tight">
                <span class="font-bold">Important:</span> Ensure the blue pin on
                the map is accurately placed exactly at your location to prevent
                delivery failures.
              </p>
            </div>

            <div
              class="bg-gray-50 p-2 border-b border-gray-200 flex justify-between items-center gap-2"
            >
              <div class="relative flex-1">
                <input
                  type="text"
                  v-model="searchQuery"
                  @input="handleSearchInput"
                  placeholder="Search area (e.g. Tunjungan Plaza)"
                  class="w-full text-xs px-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
                <div
                  v-if="searchResults.length > 0"
                  class="absolute z-[999] mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-32 overflow-y-auto"
                >
                  <div
                    v-for="(result, idx) in searchResults"
                    :key="idx"
                    @click="selectSearchResult(result)"
                    class="px-3 py-2 text-xs hover:bg-blue-50 cursor-pointer border-b last:border-0 text-gray-700"
                  >
                    {{ result.display_name }}
                  </div>
                </div>
              </div>
              <button
                type="button"
                @click="getCurrentLocation"
                class="text-[10px] bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg font-bold hover:bg-blue-200 transition whitespace-nowrap"
              >
                Current Loc
              </button>
            </div>

            <div class="h-40 sm:h-48 w-full relative z-0">
              <l-map
                ref="map"
                v-model:zoom="zoom"
                :center="center"
                :use-global-leaflet="false"
                @click="onMapClick"
              >
                <l-tile-layer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  layer-type="base"
                  name="OpenStreetMap"
                ></l-tile-layer>

                <l-marker
                  :lat-lng="markerLatLng"
                  draggable
                  @update:latLng="onMarkerDrag"
                ></l-marker>
              </l-map>

              <div
                class="absolute bottom-2 right-2 z-[400] bg-white/90 backdrop-blur px-2 py-1 rounded shadow text-[9px] font-mono text-gray-600 pointer-events-none"
              >
                {{
                  form.latitude ? parseFloat(form.latitude).toFixed(5) : "-"
                }},
                {{
                  form.longitude ? parseFloat(form.longitude).toFixed(5) : "-"
                }}
              </div>
            </div>
          </div>

          <div class="relative pt-1">
            <div class="flex justify-between items-end mb-1">
              <label
                class="font-bold text-gray-700 text-[10px] uppercase tracking-widest"
                >Detail Address</label
              >
              <span
                class="text-[9px] text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-medium"
                >Editable</span
              >
            </div>
            <textarea
              v-model="form.address_location"
              rows="2"
              placeholder="Enter full street address and specific details..."
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none w-full resize-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            ></textarea>
          </div>

          <div class="gap-3 grid grid-cols-2 pt-1">
            <input
              v-model="form.location_type"
              placeholder="Apartment, suite (optional)"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
            />
            <input
              v-model="form.postal_code"
              placeholder="Postal code"
              class="bg-gray-50 py-2 px-3 border rounded-xl outline-none text-sm"
              required
            />
          </div>

          <div class="flex justify-between items-center pt-4">
            <button
              v-if="isEdit"
              type="button"
              @click="deleteAddress"
              class="text-red-500 hover:underline font-bold text-xs"
            >
              Delete
            </button>
            <div class="flex gap-3 ml-auto">
              <button
                type="button"
                @click="showModal = false"
                class="text-gray-500 hover:text-gray-800 font-bold px-3 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-xl font-bold text-white shadow-md shadow-blue-500/30 transition-colors text-sm"
              >
                Save Address
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Country, State } from "country-state-city";
import { BASE_URL } from "../../config/api.js";

import defaultProfile from "../../../src/assets/profile.png";

// Import Leaflet
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url,
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

// State Umum
const addresses = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const router = useRouter();
const userData = ref(null);
const showInfoModal = ref(false);
const showPasswordModal = ref(false);

// [BARU] State loading khusus untuk alamat
const isLoadingAddresses = ref(true);

const form = ref({
  id: null,
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
  is_default: false,
});

// Deklarasikan ref untuk elemen l-map
const map = ref(null);

// --- LEAFLET MAP STATE & LOGIC ---
const zoom = ref(13);
const center = ref([-7.250445, 112.768845]); // Default Surabaya
const markerLatLng = ref([-7.250445, 112.768845]);
const searchQuery = ref("");
const searchResults = ref([]);
let debounceTimeout = null;

// 1. REVERSE GEOCODING (Nominatim API - FREE)
const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    if (res.data && res.data.display_name) {
      form.value.address_location = res.data.display_name;

      if (res.data.address && res.data.address.postcode) {
        form.value.postal_code = res.data.address.postcode;
      }
    }
  } catch (error) {
    console.error("Reverse Geocode Error", error);
  }
};

// 2. SEARCH / AUTOCOMPLETE (Nominatim API - FREE)
const handleSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }

  debounceTimeout = setTimeout(async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`,
      );
      searchResults.value = res.data;
    } catch (error) {
      console.error("Search Error", error);
    }
  }, 500);
};

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);

  if (map.value && map.value.leafletObject) {
    map.value.leafletObject.flyTo([lat, lng], 16);
  } else {
    center.value = [lat, lng];
    zoom.value = 16;
  }

  markerLatLng.value = [lat, lng];

  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  form.value.address_location = result.display_name;

  searchResults.value = [];
  searchQuery.value = "";
};

// 3. MAP EVENTS
const onMapClick = (event) => {
  const { lat, lng } = event.latlng;
  updateLocation(lat, lng);
};

const onMarkerDrag = (event) => {
  const { lat, lng } = event.target.getLatLng();
  updateLocation(lat, lng);
};

const updateLocation = (lat, lng) => {
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocode(lat, lng);
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (map.value && map.value.leafletObject) {
          map.value.leafletObject.flyTo([lat, lng], 16);
        } else {
          center.value = [lat, lng];
          zoom.value = 16;
        }

        updateLocation(lat, lng);
      },
      () => {
        Swal.fire("Error", "Please allow location access.", "error");
      },
    );
  }
};

// --- CORE LOGIC ---
const openModal = (data = null) => {
  isEdit.value = !!data;
  if (data) {
    form.value = {
      id: data.id,
      region: data.details.region,
      first_name_address: data.receiver.first_name,
      last_name_address: data.receiver.last_name,
      address_location: data.details.location,
      location_type: data.details.type === "other" ? "" : data.details.type,
      city: data.details.city,
      province: data.details.province,
      postal_code: data.details.postal_code,
      latitude: data.details.latitude,
      longitude: data.details.longitude,
      is_default: data.is_default,
    };

    if (data.details.latitude && data.details.longitude) {
      const lat = parseFloat(data.details.latitude);
      const lng = parseFloat(data.details.longitude);
      center.value = [lat, lng];
      markerLatLng.value = [lat, lng];
    }
    fetchProvinces();
  } else {
    form.value = {
      region: "Indonesia",
      is_default: false,
      first_name_address: "",
      last_name_address: "",
      address_location: "",
      location_type: "",
      city: "",
      province: "",
      postal_code: "",
      latitude: null,
      longitude: null,
    };
    center.value = [-7.250445, 112.768845];
    markerLatLng.value = [-7.250445, 112.768845];
  }
  showModal.value = true;
};

// [PERBAIKAN] Modifikasi fungsi fetchAddresses untuk menambahkan delay animasi Skeleton
const fetchAddresses = async () => {
  isLoadingAddresses.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/addresses`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    addresses.value = res.data.data;
  } catch (error) {
    console.error("Failed to fetch addresses");
  } finally {
    // Sedikit delay agar skeleton loading terasa lebih alami / smooth
    setTimeout(() => {
      isLoadingAddresses.value = false;
    }, 400); 
  }
};

const fetchProvinces = () => {
  const selectedCountry = countries.value.find(
    (c) => c.name === form.value.region,
  );
  if (selectedCountry) {
    filteredProvinces.value = State.getStatesOfCountry(
      selectedCountry.isoCode,
    ).map((s) => s.name);
  }
};

const saveAddress = async () => {
  const url = isEdit.value
    ? `${BASE_URL}/addresses/${form.value.id}`
    : `${BASE_URL}/addresses`;
  const method = isEdit.value ? "put" : "post";
  try {
    await axios[method](url, form.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showModal.value = false;
    fetchAddresses();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Address saved!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  }
};

const deleteAddress = async () => {
  if (!confirm("Delete this address?")) return;
  try {
    await axios.delete(`${BASE_URL}/addresses/${form.value.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showModal.value = false;
    fetchAddresses();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Address deleted",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    Swal.fire("Error", "Failed to delete", "error");
  }
};

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    }
  });
};

const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    updateUserData(res.data);
  } catch (err) {
    if (err.response && err.response.status === 401) handleLogout();
  }
};

const updateUserData = (user) => {
  if (!user) return;

  if (user.hasOwnProperty("is_membership")) {
    user.is_membership = !!user.is_membership;
  }

  userData.value = Object.assign({}, userData.value, user);
  localStorage.setItem("user", JSON.stringify(userData.value));
};

const openInfoModal = () => {
  infoForm.value = {
    first_name: userData.value.first_name,
    last_name: userData.value.last_name,
    email: userData.value.email,
    phone: userData.value.phone || "",
  };
  showInfoModal.value = true;
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user/update-info`,
      infoForm.value,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    updateUserData(res.data.user);
    showInfoModal.value = false;
    Swal.fire("Success", "Info updated!", "success");
  } catch (err) {
    Swal.fire("Error", "Failed update", "error");
  }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/user/update-password`, passForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showPasswordModal.value = false;
    passForm.value = {
      old_password: "",
      password: "",
      password_confirmation: "",
    };
    Swal.fire("Success", "Password updated!", "success");
  } catch (err) {
    Swal.fire("Error", err.response.data.message, "error");
  }
};

const infoForm = ref({ first_name: "", last_name: "", email: "", phone: "" });
const passForm = ref({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  const oldImage = userData.value.profile_image;
  userData.value.profile_image = objectUrl;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/user/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.user) {
      const newUser = res.data.user;
      if (newUser.profile_image) {
        const separator = newUser.profile_image.includes("?") ? "&" : "?";
        newUser.profile_image = `${newUser.profile_image}${separator}t=${new Date().getTime()}`;
      }

      updateUserData(newUser);
      URL.revokeObjectURL(objectUrl);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Foto profil diperbarui!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (err) {
    console.error("Upload failed", err);
    userData.value.profile_image = oldImage; 
    URL.revokeObjectURL(objectUrl); 
    Swal.fire(
      "Gagal",
      "Tidak dapat mengunggah foto. Silakan coba lagi.",
      "error",
    );
  }
};

const handleImageError = (e) => {
  if (e.target.src !== new URL(defaultProfile, import.meta.url).href) {
    e.target.src = defaultProfile;
  }
};

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    userData.value = JSON.parse(user);
  }
  fetchAddresses();
  fetchProvinces();
  fetchUserProfile();
});
</script> -->

<template>
  <div class="max-w-5xl px-4 py-12 mx-auto sm:px-6 lg:py-16 animate-fade-in">
    
    <div class="mb-10">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">My Account</h1>
      <p class="mt-2 text-sm text-gray-500">Manage your personal information, security, and addresses.</p>
    </div>

    <div v-if="userData" class="grid grid-cols-1 gap-8 lg:grid-cols-12">
      
      <div class="lg:col-span-4 space-y-6">
        
        <div class="p-8 text-center bg-white border border-gray-100 shadow-sm rounded-3xl">
          <div class="relative inline-block group">
            <div class="absolute inset-0 transition-transform duration-300 transform scale-105 rounded-full bg-gradient-to-tr from-blue-100 to-blue-50 opacity-20 group-hover:scale-110"></div>
            <img
              :key="userData.profile_image || 'default'"
              :src="userData.profile_image || defaultProfile"
              class="relative object-cover w-32 h-32 border-4 border-white rounded-full shadow-md"
              alt="Profile Avatar"
              @error="handleImageError"
            />
            <label class="absolute inset-0 flex items-center justify-center transition-all duration-300 rounded-full opacity-0 cursor-pointer bg-black/50 group-hover:opacity-100 backdrop-blur-sm">
              <div class="flex flex-col items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span class="text-xs font-semibold tracking-wider uppercase">Change</span>
              </div>
              <input type="file" class="hidden" @change="handleImageUpdate" accept="image/*" />
            </label>
          </div>
          
          <h2 class="mt-5 text-xl font-bold text-gray-900">{{ userData.first_name }} {{ userData.last_name }}</h2>
          <p class="text-sm text-gray-500">{{ userData.email }}</p>
          
          <div class="flex justify-center gap-3 mt-6">
            <button @click="openInfoModal" class="flex items-center justify-center w-10 h-10 text-blue-600 transition-colors bg-blue-50 rounded-xl hover:bg-blue-100" title="Edit Info">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
            <button @click="showPasswordModal = true" class="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-gray-100 rounded-xl hover:bg-gray-200" title="Change Password">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </button>
            <button @click="handleLogout" class="flex items-center justify-center w-10 h-10 text-red-600 transition-colors bg-red-50 rounded-xl hover:bg-red-100" title="Logout">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>

        <div class="relative overflow-hidden text-white shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-7">
          <svg class="absolute w-32 h-32 text-yellow-500 opacity-10 -right-8 -top-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>

          <div class="relative z-10">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="text-sm font-black tracking-widest text-yellow-400 uppercase">Solher Club</h3>
                <div class="inline-block px-3 py-1 mt-2 text-[10px] font-bold tracking-widest uppercase rounded-full shadow-inner" :class="userData.is_membership ? 'bg-yellow-500 text-black' : 'bg-gray-700/50 border border-gray-600 text-gray-300'">
                  {{ userData.is_membership ? "Active Member" : "Locked" }}
                </div>
              </div>
            </div>

            <div class="mt-8">
              <template v-if="userData.is_membership">
                <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Available Points</p>
                <div class="flex items-baseline gap-1">
                  <p class="text-4xl font-black text-white">{{ userData.point || 0 }}</p>
                  <span class="text-sm font-bold text-yellow-500">Pts</span>
                </div>
              </template>

              <template v-else>
                <p class="text-xs leading-relaxed text-gray-300">
                  Spend a total of <strong class="text-white">Rp 100.000</strong> to automatically unlock your membership and start earning points!
                </p>
              </template>
            </div>
          </div>
        </div>

        <router-link to="/favorites" class="flex items-center justify-between p-5 transition-all bg-white border border-gray-100 shadow-sm group hover:border-red-100 hover:shadow-md rounded-2xl">
          <div class="flex items-center gap-4">
            <div class="flex items-center justify-center w-10 h-10 text-red-500 transition-colors bg-red-50 rounded-xl group-hover:bg-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" stroke="none"><path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" /></svg>
            </div>
            <div>
              <h2 class="text-sm font-bold text-gray-900 transition-colors group-hover:text-red-600">My Wishlist</h2>
              <p class="text-xs text-gray-500">View saved items</p>
            </div>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-300 transition-all group-hover:text-red-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </router-link>
      </div>

      <div class="lg:col-span-8">
        <div class="p-8 bg-white border border-gray-100 shadow-sm rounded-3xl min-h-[500px]">
          
          <div class="flex items-center justify-between pb-6 mb-6 border-b border-gray-100">
            <div>
              <h2 class="text-xl font-bold text-gray-900">Shipping Addresses</h2>
              <p class="text-xs text-gray-500 mt-0.5">Manage where your orders are delivered.</p>
            </div>
            <button @click="openModal()" class="flex items-center gap-2 px-4 py-2 text-sm font-bold text-blue-600 transition-colors bg-blue-50 rounded-xl hover:bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" /></svg>
              Add New
            </button>
          </div>

          <div v-if="isLoadingAddresses" class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div v-for="i in 4" :key="i" class="p-5 border border-gray-100 bg-gray-50/50 rounded-2xl animate-pulse">
              <div class="w-20 h-3 mb-3 bg-gray-200 rounded"></div>
              <div class="w-32 h-4 mb-2 bg-gray-300 rounded"></div>
              <div class="w-full h-3 mb-1 bg-gray-200 rounded"></div>
              <div class="w-2/3 h-3 bg-gray-200 rounded"></div>
            </div>
          </div>

          <div v-else-if="addresses.length > 0" class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div
              v-for="addr in addresses"
              :key="addr.id"
              class="relative p-5 transition-all bg-white border rounded-2xl group hover:shadow-md"
              :class="addr.is_default ? 'border-blue-200 shadow-sm ring-1 ring-blue-50' : 'border-gray-200'"
            >
              <div v-if="addr.is_default" class="absolute px-2 py-1 text-[9px] font-bold tracking-widest text-blue-700 uppercase bg-blue-100 rounded-lg top-4 right-4">
                Default
              </div>
              
              <button @click="openModal(addr)" class="absolute p-2 text-gray-400 transition-colors bg-gray-100 rounded-lg opacity-0 top-4 right-4 group-hover:opacity-100 hover:text-blue-600 hover:bg-blue-50" :class="{'right-16': addr.is_default}">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
              </button>

              <div class="flex items-center gap-2 mb-3">
                <div class="flex items-center justify-center w-8 h-8 text-gray-500 bg-gray-100 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <h3 class="text-sm font-bold text-gray-900">{{ addr.receiver.first_name }} {{ addr.receiver.last_name }}</h3>
              </div>
              
              <div class="pl-10 space-y-1 text-xs text-gray-600">
                <p class="font-medium text-gray-800">{{ addr.details.location }}</p>
                <p>{{ addr.details.city }}, {{ addr.details.province }} {{ addr.details.postal_code }}</p>
                
                <div v-if="addr.details.latitude && addr.details.longitude" class="inline-flex items-center gap-1 px-2 py-1 mt-2 text-[9px] font-bold tracking-widest text-green-700 uppercase bg-green-50 rounded-md border border-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
                  Map Pinned
                </div>
              </div>
            </div>
          </div>

          <div v-else class="flex flex-col items-center justify-center py-16 text-center border-2 border-gray-200 border-dashed rounded-2xl bg-gray-50/50">
            <div class="flex items-center justify-center w-12 h-12 mb-3 text-gray-400 bg-white rounded-full shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            </div>
            <h3 class="text-sm font-bold text-gray-900">No addresses found</h3>
            <p class="mt-1 text-xs text-gray-500">Add an address to ensure smooth delivery.</p>
            <button @click="openModal()" class="px-4 py-2 mt-4 text-xs font-bold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">Add First Address</button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showInfoModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div class="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl animate-fade-in">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Update Profile</h3>
          <button @click="showInfoModal = false" class="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-1.5 text-xs font-bold text-gray-500">First Name</label>
              <input v-model="infoForm.first_name" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
            </div>
            <div>
              <label class="block mb-1.5 text-xs font-bold text-gray-500">Last Name</label>
              <input v-model="infoForm.last_name" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
            </div>
          </div>
          <div>
            <label class="block mb-1.5 text-xs font-bold text-gray-500">Email Address</label>
            <input v-model="infoForm.email" type="email" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
          </div>
          <div>
            <label class="block mb-1.5 text-xs font-bold text-gray-500">Phone Number</label>
            <input v-model="infoForm.phone" type="tel" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
          </div>
          <button type="submit" class="w-full py-3.5 mt-2 font-bold text-white transition-colors bg-gray-900 rounded-xl hover:bg-black">Save Changes</button>
        </form>
      </div>
    </div>

    <div v-if="showPasswordModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
      <div class="w-full max-w-md p-8 bg-white shadow-2xl rounded-3xl animate-fade-in">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">Change Password</h3>
          <button @click="showPasswordModal = false" class="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600">✕</button>
        </div>
        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <div>
            <label class="block mb-1.5 text-xs font-bold text-gray-500">Current Password</label>
            <input v-model="passForm.old_password" type="password" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
          </div>
          <div>
            <label class="block mb-1.5 text-xs font-bold text-gray-500">New Password</label>
            <input v-model="passForm.password" type="password" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
          </div>
          <div>
            <label class="block mb-1.5 text-xs font-bold text-gray-500">Confirm New Password</label>
            <input v-model="passForm.password_confirmation" type="password" class="w-full px-4 py-3 text-sm transition-colors border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" required />
          </div>
          <button type="submit" class="w-full py-3.5 mt-2 font-bold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20">Update Password</button>
        </form>
      </div>
    </div>

    <div v-if="showModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto bg-gray-900/40 backdrop-blur-sm">
      <div class="relative w-full max-w-2xl p-6 bg-white shadow-2xl md:p-8 rounded-3xl my-8 animate-fade-in">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">{{ isEdit ? "Edit Address" : "Add New Address" }}</h3>
          <button @click="showModal = false" class="p-2 text-gray-400 rounded-full hover:bg-gray-100 hover:text-gray-600">✕</button>
        </div>

        <form @submit.prevent="saveAddress" class="space-y-4">
          <div class="flex items-center gap-3 p-3 mb-2 border border-blue-100 bg-blue-50 rounded-xl">
            <input type="checkbox" v-model="form.is_default" id="def" class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
            <label for="def" class="text-sm font-medium text-blue-900 cursor-pointer">Set as default shipping address</label>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">First Name</label>
              <input v-model="form.first_name_address" class="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 outline-none" required />
            </div>
            <div>
              <label class="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Last Name</label>
              <input v-model="form.last_name_address" class="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 outline-none" required />
            </div>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Province</label>
              <select v-model="form.province" class="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 outline-none" required>
                <option value="" disabled>Select Province</option>
                <option v-for="p in filteredProvinces" :key="p" :value="p">{{ p }}</option>
              </select>
            </div>
            <div>
              <label class="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">City</label>
              <input v-model="form.city" class="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 outline-none" required />
            </div>
          </div>

          <div class="relative mt-2 overflow-hidden border border-gray-200 rounded-2xl">
            <div class="flex items-start gap-2 px-4 py-2.5 bg-amber-50 border-b border-amber-100">
              <svg xmlns="http://www.w3.org/2000/svg" class="shrink-0 w-4 h-4 mt-0.5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              <p class="text-[11px] text-amber-800 leading-relaxed">
                <span class="font-bold">Pin Location:</span> Drag the map marker exactly to your location to ensure accurate delivery.
              </p>
            </div>

            <div class="flex items-center justify-between gap-2 p-2 border-b border-gray-200 bg-gray-50">
              <div class="relative flex-1">
                <input type="text" v-model="searchQuery" @input="handleSearchInput" placeholder="Search area (e.g. Tunjungan Plaza)" class="w-full px-3 py-2 text-xs border border-gray-300 outline-none rounded-xl focus:ring-1 focus:ring-blue-500" />
                <div v-if="searchResults.length > 0" class="absolute z-[999] mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-40 overflow-y-auto">
                  <div v-for="(result, idx) in searchResults" :key="idx" @click="selectSearchResult(result)" class="px-3 py-2.5 text-xs text-gray-700 border-b cursor-pointer hover:bg-blue-50 last:border-0">
                    {{ result.display_name }}
                  </div>
                </div>
              </div>
              <button type="button" @click="getCurrentLocation" class="px-3 py-2 text-[10px] font-bold text-blue-700 whitespace-nowrap transition-colors bg-blue-100 rounded-xl hover:bg-blue-200">
                Current Loc
              </button>
            </div>

            <div class="relative z-0 w-full h-48 sm:h-56">
              <l-map ref="map" v-model:zoom="zoom" :center="center" :use-global-leaflet="false" @click="onMapClick">
                <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap"></l-tile-layer>
                <l-marker :lat-lng="markerLatLng" draggable @update:latLng="onMarkerDrag"></l-marker>
              </l-map>
              <div class="absolute z-[400] px-2 py-1 font-mono text-[9px] text-gray-600 bg-white/90 rounded shadow bottom-2 right-2 backdrop-blur pointer-events-none border border-gray-200">
                {{ form.latitude ? parseFloat(form.latitude).toFixed(5) : "-" }}, {{ form.longitude ? parseFloat(form.longitude).toFixed(5) : "-" }}
              </div>
            </div>
          </div>

          <div>
            <label class="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Complete Address</label>
            <textarea v-model="form.address_location" rows="3" placeholder="Street name, building, house number..." class="w-full px-4 py-3 text-sm border border-gray-200 resize-none bg-gray-50 rounded-xl focus:border-blue-500 outline-none" required></textarea>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Details (Opt)</label>
              <input v-model="form.location_type" placeholder="Apartment, suite, block" class="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 outline-none" />
            </div>
            <div>
              <label class="block mb-1 text-[10px] font-bold tracking-widest text-gray-500 uppercase">Postal Code</label>
              <input v-model="form.postal_code" placeholder="Postal code" class="w-full px-4 py-2.5 text-sm border border-gray-200 bg-gray-50 rounded-xl focus:border-blue-500 outline-none" required />
            </div>
          </div>

          <div class="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
            <button v-if="isEdit" type="button" @click="deleteAddress" class="text-xs font-bold text-red-500 transition-colors hover:text-red-700">Delete Address</button>
            <div class="flex gap-3 ml-auto">
              <button type="submit" class="px-6 py-2.5 text-sm font-bold text-white transition-colors bg-blue-600 rounded-xl hover:bg-blue-700 shadow-md shadow-blue-500/20">
                Save Address
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { Country, State } from "country-state-city";
import { BASE_URL } from "../../config/api.js";

import defaultProfile from "../../../src/assets/profile.png";

// Import Leaflet
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: new URL(
    "leaflet/dist/images/marker-icon-2x.png",
    import.meta.url,
  ).href,
  iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
  shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url)
    .href,
});

// State Umum
const addresses = ref([]);
const showModal = ref(false);
const isEdit = ref(false);
const countries = ref(Country.getAllCountries());
const filteredProvinces = ref([]);
const router = useRouter();
const userData = ref(null);
const showInfoModal = ref(false);
const showPasswordModal = ref(false);

// [BARU] State loading khusus untuk alamat
const isLoadingAddresses = ref(true);

const form = ref({
  id: null,
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
  is_default: false,
});

// Deklarasikan ref untuk elemen l-map
const map = ref(null);

// --- LEAFLET MAP STATE & LOGIC ---
const zoom = ref(13);
const center = ref([-7.250445, 112.768845]); // Default Surabaya
const markerLatLng = ref([-7.250445, 112.768845]);
const searchQuery = ref("");
const searchResults = ref([]);
let debounceTimeout = null;

// 1. REVERSE GEOCODING (Nominatim API - FREE)
const reverseGeocode = async (lat, lng) => {
  try {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,
    );
    if (res.data && res.data.display_name) {
      form.value.address_location = res.data.display_name;

      if (res.data.address && res.data.address.postcode) {
        form.value.postal_code = res.data.address.postcode;
      }
    }
  } catch (error) {
    console.error("Reverse Geocode Error", error);
  }
};

// 2. SEARCH / AUTOCOMPLETE (Nominatim API - FREE)
const handleSearchInput = () => {
  if (debounceTimeout) clearTimeout(debounceTimeout);

  if (searchQuery.value.length < 3) {
    searchResults.value = [];
    return;
  }

  debounceTimeout = setTimeout(async () => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}&countrycodes=id&limit=5`,
      );
      searchResults.value = res.data;
    } catch (error) {
      console.error("Search Error", error);
    }
  }, 500);
};

const selectSearchResult = (result) => {
  const lat = parseFloat(result.lat);
  const lng = parseFloat(result.lon);

  if (map.value && map.value.leafletObject) {
    map.value.leafletObject.flyTo([lat, lng], 16);
  } else {
    center.value = [lat, lng];
    zoom.value = 16;
  }

  markerLatLng.value = [lat, lng];

  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  form.value.address_location = result.display_name;

  searchResults.value = [];
  searchQuery.value = "";
};

// 3. MAP EVENTS
const onMapClick = (event) => {
  const { lat, lng } = event.latlng;
  updateLocation(lat, lng);
};

const onMarkerDrag = (event) => {
  const { lat, lng } = event.target.getLatLng();
  updateLocation(lat, lng);
};

const updateLocation = (lat, lng) => {
  markerLatLng.value = [lat, lng];
  form.value.latitude = lat.toString();
  form.value.longitude = lng.toString();
  reverseGeocode(lat, lng);
};

const getCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (map.value && map.value.leafletObject) {
          map.value.leafletObject.flyTo([lat, lng], 16);
        } else {
          center.value = [lat, lng];
          zoom.value = 16;
        }

        updateLocation(lat, lng);
      },
      () => {
        Swal.fire("Error", "Please allow location access.", "error");
      },
    );
  }
};

// --- CORE LOGIC ---
const openModal = (data = null) => {
  isEdit.value = !!data;
  if (data) {
    form.value = {
      id: data.id,
      region: data.details.region,
      first_name_address: data.receiver.first_name,
      last_name_address: data.receiver.last_name,
      address_location: data.details.location,
      location_type: data.details.type === "other" ? "" : data.details.type,
      city: data.details.city,
      province: data.details.province,
      postal_code: data.details.postal_code,
      latitude: data.details.latitude,
      longitude: data.details.longitude,
      is_default: data.is_default,
    };

    if (data.details.latitude && data.details.longitude) {
      const lat = parseFloat(data.details.latitude);
      const lng = parseFloat(data.details.longitude);
      center.value = [lat, lng];
      markerLatLng.value = [lat, lng];
    }
    fetchProvinces();
  } else {
    form.value = {
      region: "Indonesia",
      is_default: false,
      first_name_address: "",
      last_name_address: "",
      address_location: "",
      location_type: "",
      city: "",
      province: "",
      postal_code: "",
      latitude: null,
      longitude: null,
    };
    center.value = [-7.250445, 112.768845];
    markerLatLng.value = [-7.250445, 112.768845];
  }
  showModal.value = true;
};

// [PERBAIKAN] Modifikasi fungsi fetchAddresses untuk menambahkan delay animasi Skeleton
const fetchAddresses = async () => {
  isLoadingAddresses.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/addresses`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    addresses.value = res.data.data;
  } catch (error) {
    console.error("Failed to fetch addresses");
  } finally {
    // Sedikit delay agar skeleton loading terasa lebih alami / smooth
    setTimeout(() => {
      isLoadingAddresses.value = false;
    }, 400); 
  }
};

const fetchProvinces = () => {
  const selectedCountry = countries.value.find(
    (c) => c.name === form.value.region,
  );
  if (selectedCountry) {
    filteredProvinces.value = State.getStatesOfCountry(
      selectedCountry.isoCode,
    ).map((s) => s.name);
  }
};

const saveAddress = async () => {
  const url = isEdit.value
    ? `${BASE_URL}/addresses/${form.value.id}`
    : `${BASE_URL}/addresses`;
  const method = isEdit.value ? "put" : "post";
  try {
    await axios[method](url, form.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showModal.value = false;
    fetchAddresses();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Address saved!",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    Swal.fire("Error", "Failed to save address", "error");
  }
};

const deleteAddress = async () => {
  if (!confirm("Delete this address?")) return;
  try {
    await axios.delete(`${BASE_URL}/addresses/${form.value.id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showModal.value = false;
    fetchAddresses();
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Address deleted",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (e) {
    Swal.fire("Error", "Failed to delete", "error");
  }
};

const handleLogout = () => {
  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    confirmButtonText: "Yes, Logout",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
    }
  });
};

const fetchUserProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/user`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    updateUserData(res.data);
  } catch (err) {
    if (err.response && err.response.status === 401) handleLogout();
  }
};

const updateUserData = (user) => {
  if (!user) return;

  if (user.hasOwnProperty("is_membership")) {
    user.is_membership = !!user.is_membership;
  }

  userData.value = Object.assign({}, userData.value, user);
  localStorage.setItem("user", JSON.stringify(userData.value));
};

const openInfoModal = () => {
  infoForm.value = {
    first_name: userData.value.first_name,
    last_name: userData.value.last_name,
    email: userData.value.email,
    phone: userData.value.phone || "",
  };
  showInfoModal.value = true;
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(
      `${BASE_URL}/user/update-info`,
      infoForm.value,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } },
    );
    updateUserData(res.data.user);
    showInfoModal.value = false;
    Swal.fire("Success", "Info updated!", "success");
  } catch (err) {
    Swal.fire("Error", "Failed update", "error");
  }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/user/update-password`, passForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    showPasswordModal.value = false;
    passForm.value = {
      old_password: "",
      password: "",
      password_confirmation: "",
    };
    Swal.fire("Success", "Password updated!", "success");
  } catch (err) {
    Swal.fire("Error", err.response.data.message, "error");
  }
};

const infoForm = ref({ first_name: "", last_name: "", email: "", phone: "" });
const passForm = ref({
  old_password: "",
  password: "",
  password_confirmation: "",
});

const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  const oldImage = userData.value.profile_image;
  userData.value.profile_image = objectUrl;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/user/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.user) {
      const newUser = res.data.user;
      if (newUser.profile_image) {
        const separator = newUser.profile_image.includes("?") ? "&" : "?";
        newUser.profile_image = `${newUser.profile_image}${separator}t=${new Date().getTime()}`;
      }

      updateUserData(newUser);
      URL.revokeObjectURL(objectUrl);

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Foto profil diperbarui!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (err) {
    console.error("Upload failed", err);
    userData.value.profile_image = oldImage; 
    URL.revokeObjectURL(objectUrl); 
    Swal.fire(
      "Gagal",
      "Tidak dapat mengunggah foto. Silakan coba lagi.",
      "error",
    );
  }
};

const handleImageError = (e) => {
  if (e.target.src !== new URL(defaultProfile, import.meta.url).href) {
    e.target.src = defaultProfile;
  }
};

onMounted(() => {
  const user = localStorage.getItem("user");
  if (user) {
    userData.value = JSON.parse(user);
  }
  fetchAddresses();
  fetchProvinces();
  fetchUserProfile();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

/* Hindari map leaflet bentrok dengan modal z-index */
:deep(.leaflet-container) {
  z-index: 1 !important;
}
</style>
