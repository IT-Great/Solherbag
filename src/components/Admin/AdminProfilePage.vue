<!-- <template>
  <div class="mx-auto px-6 py-20 max-w-4xl">
    <div class="bg-white shadow-sm p-8 border border-gray-200 rounded-2xl">
      <h1 class="mb-8 font-bold text-3xl">Admin Profile</h1>

      <div v-if="adminData" class="flex md:flex-row flex-col gap-10">
        <div class="flex flex-col items-center gap-4">
          <div class="group relative">
            <img
              :key="adminData.profile_image"
              :src="adminData.profile_image"
              class="shadow-sm border-4 border-gray-50 rounded-full w-32 h-32 object-cover"
              alt="Admin Avatar"
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
              <label class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest">
                Full Name & Email
              </label>
              <p class="font-medium text-xl">
                {{ adminData.first_name }} {{ adminData.last_name }}
              </p>
              <p class="text-gray-400">{{ adminData.email }}</p>
            </div>
            <button
              @click="openInfoModal"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              ✎
            </button>
          </div>

          <div class="flex justify-between items-start pt-4 border-gray-50 border-t">
            <div>
              <label class="block mb-1 font-bold text-gray-500 text-xs uppercase tracking-widest">
                Password
              </label>
              <p class="text-xl tracking-widest">••••••••</p>
            </div>
            <button
              @click="showPasswordModal = true"
              class="hover:bg-gray-100 p-2 rounded-full text-blue-600 transition"
            >
              ✎
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end mt-10 pt-6 border-gray-100 border-t">
      <button
        @click="handleLogout"
        class="bg-red-500 hover:bg-red-600 shadow-sm px-6 py-2 rounded-xl font-semibold text-white transition"
      >
        Logout
      </button>
    </div>

    <div v-if="showInfoModal" class="modal">
      <div class="modal-card">
        <h3 class="mb-6 font-bold text-2xl">Update Info</h3>
        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <input v-model="infoForm.first_name" placeholder="First Name" class="input" required />
          <input v-model="infoForm.last_name" placeholder="Last Name" class="input" required />
          <input v-model="infoForm.email" type="email" placeholder="Email" class="input" required />
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showInfoModal = false" class="flex-1 text-gray-500">
              Cancel
            </button>
            <button type="submit" class="flex-1 bg-black py-3 rounded-xl font-bold text-white">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showPasswordModal" class="modal">
      <div class="modal-card">
        <h3 class="mb-6 font-bold text-2xl">Update Password</h3>
        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <input v-model="passForm.old_password" type="password" placeholder="Old Password" class="input" required />
          <input v-model="passForm.password" type="password" placeholder="New Password" class="input" required />
          <input v-model="passForm.password_confirmation" type="password" placeholder="Confirm Password" class="input" required />
          <div class="flex gap-3 pt-4">
            <button type="button" @click="showPasswordModal = false" class="flex-1 text-gray-500">
              Cancel
            </button>
            <button type="submit" class="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-white">
              Update
            </button>
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
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const adminData = ref(null);

const showInfoModal = ref(false);
const showPasswordModal = ref(false);

const infoForm = ref({ first_name: "", last_name: "", email: "" });
const passForm = ref({ old_password: "", password: "", password_confirmation: "" });

const openInfoModal = () => {
  infoForm.value = { ...adminData.value };
  showInfoModal.value = true;
};

const updateAdminData = (admin) => {
  adminData.value = { ...adminData.value, ...admin };
  localStorage.setItem("admin", JSON.stringify(adminData.value));
};

const fetchAdminProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    updateAdminData(res.data);
  } catch (err) {
    if (err.response?.status === 401) handleLogout();
  }
};

// const handleImageUpdate = async (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("image", file);

//   try {
//     const res = await axios.post(`${BASE_URL}/admin/update-image`, formData, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     updateAdminData(res.data.admin);
//     Swal.fire("Success", "Profile image updated!", "success");
//   } catch {
//     Swal.fire("Error", "Failed to upload image", "error");
//   }
// };

const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 1. OPTIMISTIC UPDATE (Tampilan Instan)
  const objectUrl = URL.createObjectURL(file);
  const oldImage = adminData.value.profile_image;
  
  // Update state lokal
  adminData.value.profile_image = objectUrl;

  // Trigger event global agar AdminHeader.vue ikut berubah secara instan
  window.dispatchEvent(new CustomEvent("admin-image-updated", { 
    detail: objectUrl 
  }));

  // 2. PROSES UPLOAD (Background)
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/admin/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.admin) {
      // Sync data permanen dari server
      updateAdminData(res.data.admin);
      URL.revokeObjectURL(objectUrl); // Bersihkan memori browser
    }
  } catch (err) {
    // 3. ROLLBACK (Jika Gagal)
    adminData.value.profile_image = oldImage;
    
    // Kembalikan gambar di Header ke semula
    window.dispatchEvent(new CustomEvent("admin-image-updated", { 
      detail: oldImage 
    }));

    Swal.fire("Error", "Failed to upload image to server", "error");
  }
};

const handleImageError = (e) => {
  e.target.src = `https://ui-avatars.com/api/?name=${adminData.value.first_name}+${adminData.value.last_name}&background=random`;
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/update-info`, infoForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    updateAdminData(res.data.admin);
    showInfoModal.value = false;
    Swal.fire("Success", "Profile updated!", "success");
  } catch {
    Swal.fire("Error", "Failed to update profile", "error");
  }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/admin/update-password`, passForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    showPasswordModal.value = false;
    Swal.fire("Success", "Password updated!", "success");
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Failed", "error");
  }
};

const handleLogout = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin");
  router.push("/loginadmin");
};

onMounted(() => {
  const admin = localStorage.getItem("admin");
  if (admin) adminData.value = JSON.parse(admin);
  fetchAdminProfile();
});
</script>

<style scoped>
.modal {
  @apply fixed inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4;
}
.modal-card {
  @apply bg-white shadow-2xl p-8 rounded-3xl w-full max-w-md;
}
.input {
  @apply bg-gray-50 p-3 border rounded-xl outline-none w-full;
}
</style> -->

<template>
  <div class="mx-auto px-6 py-12 lg:py-20 max-w-5xl animate-fade-in">
    <div class="bg-white shadow-sm p-8 lg:p-12 border border-gray-100 rounded-3xl">
      <div class="flex justify-between items-center mb-10 border-b border-gray-100 pb-6">
        <h1 class="font-bold text-3xl text-gray-900 tracking-tight">Admin Profile</h1>
        <span class="bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest">
          Administrator
        </span>
      </div>

      <div v-if="adminData" class="flex flex-col lg:flex-row gap-12">
        <div class="flex flex-col items-center gap-6 lg:w-1/3">
          <div class="group relative">
            <div class="absolute inset-0 bg-black/5 rounded-full -m-2"></div>
            <img
              :key="adminData.profile_image"
              :src="adminData.profile_image"
              class="relative shadow-md border-4 border-white rounded-full w-40 h-40 object-cover z-10"
              alt="Admin Avatar"
              @error="handleImageError"
            />
            <label
              class="absolute inset-0 flex justify-center items-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer z-20"
            >
              <div class="flex flex-col items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span class="font-bold text-[10px] uppercase tracking-widest">Change</span>
              </div>
              <input
                type="file"
                class="hidden"
                @change="handleImageUpdate"
                accept="image/*"
              />
            </label>
          </div>
          <div class="text-center">
            <p class="font-black text-xl text-gray-900">{{ adminData.first_name }}</p>
            <p class="text-xs text-gray-400 uppercase tracking-widest mt-1">System Admin</p>
          </div>
        </div>

        <div class="flex-grow space-y-8">
          
          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative">
            <button
              @click="openInfoModal"
              class="absolute top-4 right-4 hover:bg-gray-200 p-2 rounded-full text-gray-500 hover:text-black transition"
              title="Edit Personal Info"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
            
            <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Personal Information</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">First Name</p>
                <p class="font-semibold text-gray-900">{{ adminData.first_name }}</p>
              </div>
              <div>
                <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Last Name</p>
                <p class="font-semibold text-gray-900">{{ adminData.last_name }}</p>
              </div>
              <div>
                <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Email Address</p>
                <p class="font-semibold text-gray-900">{{ adminData.email }}</p>
              </div>
              <div>
                <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Phone Number</p>
                <p class="font-semibold" :class="adminData.phone ? 'text-gray-900' : 'text-gray-400 italic'">
                  {{ adminData.phone || "Not provided" }}
                </p>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 rounded-2xl p-6 border border-gray-100 relative">
            <button
              @click="showPasswordModal = true"
              class="absolute top-4 right-4 hover:bg-gray-200 p-2 rounded-full text-gray-500 hover:text-black transition"
              title="Change Password"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>

            <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Security Settings</h3>
            
            <div>
              <p class="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Account Password</p>
              <p class="text-2xl tracking-[0.3em] text-gray-800 translate-y-1">••••••••</p>
            </div>
          </div>

          <div class="flex items-center justify-between px-2">
             <div>
                <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Account Status</p>
                <div class="flex items-center gap-2">
                  <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span class="text-sm font-medium text-gray-700">Active & Verified</span>
                </div>
             </div>
             <div>
                <p class="text-[10px] text-gray-400 uppercase tracking-widest mb-1 text-right">Joined At</p>
                <p class="text-sm font-medium text-gray-700">{{ new Date(adminData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
             </div>
          </div>

        </div>
      </div>
    </div>

    <div class="flex justify-end mt-8">
      <button
        @click="handleLogout"
        class="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-xs transition duration-200 border border-red-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
        Sign Out
      </button>
    </div>

    <div v-if="showInfoModal" class="modal">
      <div class="modal-card">
        <button @click="showInfoModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-black">✕</button>
        <h3 class="mb-2 font-bold text-2xl text-gray-900">Edit Personal Info</h3>
        <p class="text-gray-500 text-xs mb-6">Update your administrative contact details.</p>

        <form @submit.prevent="submitInfoUpdate" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">First Name</label>
              <input v-model="infoForm.first_name" class="input mt-1" required />
            </div>
            <div>
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Last Name</label>
              <input v-model="infoForm.last_name" class="input mt-1" required />
            </div>
          </div>
          <div>
            <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
            <input v-model="infoForm.email" type="email" class="input mt-1" required />
          </div>
          <div>
            <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Phone Number</label>
            <input v-model="infoForm.phone" type="tel" placeholder="+62..." class="input mt-1" />
          </div>

          <div class="flex gap-3 pt-6">
            <button type="button" @click="showInfoModal = false" class="flex-1 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition">
              Cancel
            </button>
            <button type="submit" class="flex-1 bg-black py-3 rounded-xl font-bold text-white hover:bg-gray-800 transition shadow-md shadow-black/20">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>

    <div v-if="showPasswordModal" class="modal">
      <div class="modal-card">
        <button @click="showPasswordModal = false" class="absolute top-6 right-6 text-gray-400 hover:text-black">✕</button>
        <h3 class="mb-2 font-bold text-2xl text-gray-900">Security Update</h3>
        <p class="text-gray-500 text-xs mb-6">Ensure your new password is at least 8 characters long.</p>

        <form @submit.prevent="submitPasswordUpdate" class="space-y-4">
          <div>
            <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Current Password</label>
            <input v-model="passForm.old_password" type="password" class="input mt-1" required />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">New Password</label>
              <input v-model="passForm.password" type="password" class="input mt-1" required />
            </div>
            <div>
              <label class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Confirm Password</label>
              <input v-model="passForm.password_confirmation" type="password" class="input mt-1" required />
            </div>
          </div>

          <div class="flex gap-3 pt-6">
            <button type="button" @click="showPasswordModal = false" class="flex-1 text-gray-500 font-bold hover:bg-gray-50 rounded-xl transition">
              Cancel
            </button>
            <button type="submit" class="flex-1 bg-blue-600 py-3 rounded-xl font-bold text-white hover:bg-blue-700 transition shadow-md shadow-blue-500/30">
              Update Password
            </button>
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
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const adminData = ref(null);

const showInfoModal = ref(false);
const showPasswordModal = ref(false);

// [PERBAIKAN] Tambahkan 'phone' ke inisiasi form
const infoForm = ref({ first_name: "", last_name: "", email: "", phone: "" });
const passForm = ref({ old_password: "", password: "", password_confirmation: "" });

const openInfoModal = () => {
  // [PERBAIKAN] Copy properti yang dibutuhkan termasuk phone
  infoForm.value = {
      first_name: adminData.value.first_name,
      last_name: adminData.value.last_name,
      email: adminData.value.email,
      phone: adminData.value.phone || ""
  };
  showInfoModal.value = true;
};

const updateAdminData = (admin) => {
  adminData.value = { ...adminData.value, ...admin };
  localStorage.setItem("admin", JSON.stringify(adminData.value));
};

const fetchAdminProfile = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    updateAdminData(res.data);
  } catch (err) {
    if (err.response?.status === 401) handleLogout();
  }
};

const handleImageUpdate = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const objectUrl = URL.createObjectURL(file);
  const oldImage = adminData.value.profile_image;
  
  adminData.value.profile_image = objectUrl;

  window.dispatchEvent(new CustomEvent("admin-image-updated", { 
    detail: objectUrl 
  }));

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await axios.post(`${BASE_URL}/admin/update-image`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.admin) {
      updateAdminData(res.data.admin);
      URL.revokeObjectURL(objectUrl); 
    }
  } catch (err) {
    adminData.value.profile_image = oldImage;
    window.dispatchEvent(new CustomEvent("admin-image-updated", { 
      detail: oldImage 
    }));
    Swal.fire("Error", "Failed to upload image to server", "error");
  }
};

const handleImageError = (e) => {
  e.target.src = `https://ui-avatars.com/api/?name=${adminData.value.first_name}+${adminData.value.last_name}&background=random`;
};

const submitInfoUpdate = async () => {
  try {
    const res = await axios.post(`${BASE_URL}/admin/update-info`, infoForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    updateAdminData(res.data.admin);
    showInfoModal.value = false;
    Swal.fire({ toast: true, position: 'top-end', icon: "success", title: "Profile updated!", showConfirmButton: false, timer: 2000});
  } catch {
    Swal.fire("Error", "Failed to update profile", "error");
  }
};

const submitPasswordUpdate = async () => {
  try {
    await axios.post(`${BASE_URL}/admin/update-password`, passForm.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    showPasswordModal.value = false;
    passForm.value = { old_password: "", password: "", password_confirmation: "" };
    Swal.fire("Success", "Password updated! Please remember your new password.", "success");
  } catch (err) {
    Swal.fire("Error", err.response?.data?.message || "Failed to update password", "error");
  }
};

const handleLogout = () => {
  localStorage.removeItem("admin_token");
  localStorage.removeItem("admin");
  localStorage.removeItem("admin_login_time"); // Pastikan timer session juga dihapus
  router.push("/loginadmin");
};

onMounted(() => {
  const admin = localStorage.getItem("admin");
  if (admin) adminData.value = JSON.parse(admin);
  fetchAdminProfile();
});
</script>

<style scoped>
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.modal {
  @apply fixed inset-0 z-50 flex justify-center items-center bg-black/40 backdrop-blur-sm p-4 transition-opacity;
}
.modal-card {
  @apply relative bg-white shadow-2xl p-8 rounded-[2rem] w-full max-w-lg;
}
.input {
  @apply bg-gray-50 p-3 border border-gray-200 rounded-xl outline-none w-full focus:ring-2 focus:ring-black text-sm transition;
}
</style>
