<!-- <template>
  <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 animate-fade-in">
    <div class="mb-8 sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Access Policy Management</h1>
        <p class="mt-2 text-sm text-gray-500">
          Atur hak akses menu dan fitur untuk setiap peran (Role) staf di sistem Gycora.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="savePolicies"
          :disabled="isSaving"
          class="inline-flex items-center px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          <span
            v-if="isSaving"
            class="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"
          ></span>
          Simpan Pengaturan
        </button>
      </div>
    </div>

    <div class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="w-64 py-4 pl-6 pr-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase border-r border-gray-200"
              >
                Menu / Modul
              </th>
              <th
                v-for="role in roles"
                :key="role.id"
                scope="col"
                class="px-4 py-4 text-xs font-bold tracking-wider text-center text-gray-500 uppercase border-r border-gray-200"
              >
                {{ role.name }}
                <p class="mt-1 text-[9px] font-normal text-gray-400 capitalize">
                  {{ role.desc }}
                </p>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="module in modules"
              :key="module.id"
              class="transition-colors hover:bg-gray-50/50"
            >
              <td
                class="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 border-r border-gray-200 whitespace-nowrap"
              >
                {{ module.name }}
              </td>
              <td
                v-for="role in roles"
                :key="`${module.id}-${role.id}`"
                class="px-4 py-4 text-center border-r border-gray-200 whitespace-nowrap"
              >
                <label class="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    class="sr-only peer"
                    :checked="hasAccess(role.id, module.id)"
                    @change="toggleAccess(role.id, module.id)"
                  />
                  <div
                    class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-gray-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"
                  ></div>
                </label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t border-yellow-100 bg-yellow-50">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.5-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-xs text-yellow-700">
              <strong>Catatan Sistem:</strong> Role
              <span class="font-bold">Superadmin</span> memiliki akses absolut (bypass) ke
              seluruh sistem dan tidak ditampilkan pada matriks ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api"; // Sesuaikan path

const isSaving = ref(false);

// Definisi Role (Selain Superadmin)
const roles = ref([
  { id: "admin", name: "Admin", desc: "General Management" },
  { id: "gudang", name: "Gudang", desc: "Stock & Logistics" },
  { id: "accounting", name: "Accounting", desc: "Finance & Report" },
  { id: "cs", name: "Customer Service", desc: "Chat & Blast Email" }, // [BARU]
]);

// Daftar Modul/Menu di Sistem
const modules = ref([
  { id: "dashboard", name: "Dashboard Analytics" },
  { id: "products", name: "Product Management" },
  { id: "stocks", name: "Stock Management" },
  { id: "transactions", name: "Transactions & Shipping" },
  { id: "messages", name: "Messages & Inbox" },
  { id: "sales_report", name: "Sales Reports" },
  { id: "accounting_mod", name: "Accounting (COA, Invoice)" },
  { id: "affiliates", name: "Affiliate Management" },
]);

// State untuk menyimpan relasi akses: { "admin": ["dashboard", "products", ...], "cs": ["messages"] }
const permissions = ref({
  admin: ["dashboard", "products", "transactions", "sales_report", "affiliates"],
  gudang: ["stocks", "transactions"],
  accounting: ["sales_report", "accounting_mod"],
  cs: ["messages"], // Default CS
});

// Load konfigurasi dari backend saat halaman dibuka
const fetchPolicies = async () => {
  try {
    // Note: Anda harus membuat endpoint GET ini di Laravel nanti
    // const res = await axios.get(`${BASE_URL}/admin/access-policies`, {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
    // });
    // permissions.value = res.data.permissions;
  } catch (error) {
    console.error("Gagal memuat kebijakan akses", error);
  }
};

const hasAccess = (roleId, moduleId) => {
  return permissions.value[roleId]?.includes(moduleId) || false;
};

const toggleAccess = (roleId, moduleId) => {
  const rolePermissions = permissions.value[roleId] || [];
  const index = rolePermissions.indexOf(moduleId);

  if (index > -1) {
    // Hapus akses
    rolePermissions.splice(index, 1);
  } else {
    // Tambah akses
    rolePermissions.push(moduleId);
  }

  permissions.value[roleId] = rolePermissions;
};

const savePolicies = async () => {
  isSaving.value = true;
  try {
    // Note: Anda harus membuat endpoint POST ini di Laravel nanti
    // await axios.post(`${BASE_URL}/admin/access-policies`, {
    //   permissions: permissions.value
    // }, {
    //   headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
    // });

    // Simulasi delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    Swal.fire({
      icon: "success",
      title: "Kebijakan Diperbarui!",
      text: "Hak akses berhasil disimpan dan akan langsung berlaku untuk seluruh staf.",
      confirmButtonColor: "#000",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal Menyimpan",
      text: "Terjadi kesalahan pada server saat memperbarui kebijakan.",
      confirmButtonColor: "#000",
    });
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchPolicies();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> -->

<!-- <template>
  <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 animate-fade-in">
    <div class="mb-8 sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="font-serif text-2xl font-bold text-gray-900">
          Granular Access Policy
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          Atur hak akses spesifik (Create, Read, Update, Delete) untuk setiap peran
          (Role).
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="savePolicies"
          :disabled="isSaving"
          class="inline-flex items-center px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          <span
            v-if="isSaving"
            class="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"
          ></span>
          {{ isSaving ? "Menyimpan..." : "Simpan Pengaturan" }}
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-4 mb-4 text-xs font-medium text-gray-600">
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          C
        </div>
        Create (Buat Baru)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          R
        </div>
        Read (Lihat Data)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          U
        </div>
        Update (Ubah Data)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          D
        </div>
        Delete (Hapus)
      </span>
    </div>

    <div class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="w-64 py-4 pl-6 pr-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase border-r border-gray-200"
              >
                Menu / Modul
              </th>
              <th
                v-for="role in roles"
                :key="role.id"
                scope="col"
                class="px-4 py-4 text-xs font-bold tracking-wider text-center text-gray-500 uppercase border-r border-gray-200 min-w-[140px]"
              >
                {{ role.name }}
                <p class="mt-1 text-[9px] font-normal text-gray-400 capitalize">
                  {{ role.desc }}
                </p>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="module in modules"
              :key="module.id"
              class="transition-colors hover:bg-gray-50/50"
            >
              <td
                class="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 border-r border-gray-200 whitespace-nowrap"
              >
                {{ module.name }}
              </td>
              <td
                v-for="role in roles"
                :key="`${module.id}-${role.id}`"
                class="px-4 py-4 text-center border-r border-gray-200 whitespace-nowrap"
              >
                <div class="flex justify-center gap-1.5">
                  <button
                    v-for="action in crudActions"
                    :key="action.id"
                    @click="togglePermission(role.id, module.id, action.id)"
                    :title="action.title"
                    :class="[
                      'w-7 h-7 flex items-center justify-center rounded transition-all duration-200 text-xs font-bold',
                      hasPermission(role.id, module.id, action.id)
                        ? 'bg-black text-white shadow-md transform scale-110'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600',
                    ]"
                  >
                    {{ action.label }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t border-yellow-100 bg-yellow-50">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.5-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-xs text-yellow-700">
              <strong>Catatan Sistem:</strong> Role
              <span class="font-bold">Superadmin</span> memiliki akses absolut (bypass) ke
              seluruh sistem dan tidak ditampilkan pada matriks ini.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api"; // Sesuaikan path

const isSaving = ref(false);

// Definisi Aksi CRUD
const crudActions = [
  { id: "create", label: "C", title: "Create (Tambah)" },
  { id: "read", label: "R", title: "Read (Lihat)" },
  { id: "update", label: "U", title: "Update (Ubah)" },
  { id: "delete", label: "D", title: "Delete (Hapus)" },
];

// Definisi Role (Selain Superadmin)
const roles = ref([
  { id: "admin", name: "Admin", desc: "General Management" },
  { id: "gudang", name: "Gudang", desc: "Stock & Logistics" },
  { id: "accounting", name: "Accounting", desc: "Finance & Report" },
  { id: "cs", name: "Customer Service", desc: "Chat & Blast Email" },
]);

// Daftar Modul/Menu di Sistem
const modules = ref([
  { id: "dashboard", name: "Dashboard Analytics" },
  { id: "products", name: "Product Management" },
  { id: "stocks", name: "Stock Management" },
  { id: "transactions", name: "Transactions & Shipping" },
  { id: "messages", name: "Messages & Inbox" },
  { id: "sales_report", name: "Sales Reports" },
  { id: "accounting_mod", name: "Accounting (COA, Invoice)" },
  { id: "affiliates", name: "Affiliate Management" },
]);

// State untuk menyimpan relasi akses (Format Nested Object)
// Format yang diharapkan: { role: { module: ['create', 'read', 'update', 'delete'] } }
const permissions = ref({});

// Load konfigurasi dari backend saat halaman dibuka
// const fetchPolicies = async () => {
//   try {
//     const res = await axios.get(`${BASE_URL}/admin/access-policies`, {
//       headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
//     });

//     // Asumsi backend mengembalikan format JSON yang sudah di-group by role & module
//     if (res.data && res.data.permissions) {
//       permissions.value = res.data.permissions;
//     }
//   } catch (error) {
//     console.error("Gagal memuat kebijakan akses", error);
//     Swal.fire({
//       icon: "error",
//       title: "Gagal Memuat Data",
//       text: "Tidak dapat menarik data Access Policy dari server.",
//       confirmButtonColor: "#000",
//     });
//   }
// };

// Load konfigurasi dari backend saat halaman dibuka
const fetchPolicies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/access-policies`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });

    if (res.data && res.data.permissions) {
      const fetchedPerms = res.data.permissions;

      // [PERBAIKAN]: Cek jika yang datang adalah Array kosong [], paksa jadi Object {}
      if (Array.isArray(fetchedPerms) && fetchedPerms.length === 0) {
        permissions.value = {};
      } else {
        permissions.value = fetchedPerms;
      }
    }
  } catch (error) {
    console.error("Gagal memuat kebijakan akses", error);
    Swal.fire({
      icon: "error",
      title: "Gagal Memuat Data",
      text: "Tidak dapat menarik data Access Policy dari server.",
      confirmButtonColor: "#000",
    });
  }
};

// Cek apakah suatu role punya akses tertentu di sebuah modul
const hasPermission = (roleId, moduleId, actionId) => {
  if (!permissions.value[roleId]) return false;
  if (!permissions.value[roleId][moduleId]) return false;
  return permissions.value[roleId][moduleId].includes(actionId);
};

// Toggle (Centang/Hapus) hak akses
const togglePermission = (roleId, moduleId, actionId) => {
  // Inisialisasi object role jika belum ada
  if (!permissions.value[roleId]) {
    permissions.value[roleId] = {};
  }
  // Inisialisasi array modul jika belum ada
  if (!permissions.value[roleId][moduleId]) {
    permissions.value[roleId][moduleId] = [];
  }

  const modulePerms = permissions.value[roleId][moduleId];
  const index = modulePerms.indexOf(actionId);

  if (index > -1) {
    modulePerms.splice(index, 1); // Hapus aksi
  } else {
    modulePerms.push(actionId); // Tambah aksi

    // Logika UX Pintar:
    // Jika user memberikan akses Create, Update, atau Delete, otomatis berikan akses Read.
    // (Karena tidak masuk akal bisa mengubah data jika tidak bisa melihatnya).
    if (actionId !== "read" && !modulePerms.includes("read")) {
      modulePerms.push("read");
    }
  }

  // Logika UX Pintar:
  // Jika akses Read dihapus, hapus juga C, U, D di modul tersebut.
  if (actionId === "read" && index > -1) {
    permissions.value[roleId][moduleId] = [];
  }
};

// Kirim payload (permissions.value) ke backend
const savePolicies = async () => {
  isSaving.value = true;
  try {
    const res = await axios.post(
      `${BASE_URL}/admin/access-policies`,
      {
        permissions: permissions.value,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Kebijakan Diperbarui!",
      text: res.data.message || "Hak akses CRUD berhasil disimpan dan langsung berlaku.",
      confirmButtonColor: "#000",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal Menyimpan",
      text:
        error.response?.data?.message ||
        "Terjadi kesalahan pada server saat memperbarui kebijakan.",
      confirmButtonColor: "#000",
    });
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchPolicies();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> -->

<!-- <template>
  <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 animate-fade-in">
    <div class="mb-8 sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="font-serif text-2xl font-bold text-gray-900">
          Granular Access Policy
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          Atur hak akses menu (Sidebar) dan aksi spesifik (CRUD) untuk setiap peran.
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="savePolicies"
          :disabled="isSaving"
          class="inline-flex items-center px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          <span
            v-if="isSaving"
            class="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"
          ></span>
          {{ isSaving ? "Menyimpan..." : "Simpan Pengaturan" }}
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-4 mb-4 text-xs font-medium text-gray-600">
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-blue-600 text-white rounded text-[10px] font-bold"
        >
          M
        </div>
        Menu (Tampil di Sidebar)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          C
        </div>
        Create (Tambah)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          R
        </div>
        Read (Lihat)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          U
        </div>
        Update (Ubah)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          D
        </div>
        Delete (Hapus)
      </span>
    </div>

    <div class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="w-64 py-4 pl-6 pr-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase border-r border-gray-200"
              >
                Menu / Modul
              </th>
              <th
                v-for="role in roles"
                :key="role.id"
                scope="col"
                class="px-4 py-4 text-xs font-bold tracking-wider text-center text-gray-500 uppercase border-r border-gray-200 min-w-[160px]"
              >
                {{ role.name }}
                <p class="mt-1 text-[9px] font-normal text-gray-400 capitalize">
                  {{ role.desc }}
                </p>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="module in modules"
              :key="module.id"
              class="transition-colors hover:bg-gray-50/50"
            >
              <td
                class="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 border-r border-gray-200 whitespace-nowrap"
              >
                {{ module.name }}
              </td>
              <td
                v-for="role in roles"
                :key="`${module.id}-${role.id}`"
                class="px-4 py-4 text-center border-r border-gray-200 whitespace-nowrap"
              >
                <div class="flex justify-center gap-1">
                  <button
                    v-for="action in crudActions"
                    :key="action.id"
                    @click="togglePermission(role.id, module.id, action.id)"
                    :title="action.title"
                    :class="[
                      'w-7 h-7 flex items-center justify-center rounded transition-all duration-200 text-xs font-bold',
                      hasPermission(role.id, module.id, action.id)
                        ? action.id === 'menu'
                          ? 'bg-blue-600 text-white shadow-md transform scale-110'
                          : 'bg-black text-white shadow-md transform scale-110'
                        : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600',
                    ]"
                  >
                    {{ action.label }}
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t border-yellow-100 bg-yellow-50">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.5-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-xs text-yellow-700">
              <strong>Catatan Sistem:</strong> Role
              <span class="font-bold">Superadmin</span> memiliki akses absolut (bypass) ke
              seluruh sistem.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

const isSaving = ref(false);

// [BARU] Tambahkan Menu (M)
const crudActions = [
  { id: "menu", label: "M", title: "Menu Visibility (Tampil di Sidebar)" },
  { id: "create", label: "C", title: "Create (Tambah)" },
  { id: "read", label: "R", title: "Read (Lihat)" },
  { id: "update", label: "U", title: "Update (Ubah)" },
  { id: "delete", label: "D", title: "Delete (Hapus)" },
];

const roles = ref([
  { id: "admin", name: "Admin", desc: "General Management" },
  { id: "gudang", name: "Gudang", desc: "Stock & Logistics" },
  { id: "accounting", name: "Accounting", desc: "Finance & Report" },
  { id: "cs", name: "Customer Service", desc: "Chat & Blast Email" },
]);

// [BARU] Daftarkan SEMUA menu sidebar agar bisa di-toggle
const modules = ref([
  { id: "dashboard", name: "Dashboard Analytics" },
  { id: "categories", name: "Categories" },
  { id: "products", name: "Product Management" },
  { id: "stocks", name: "Stock Management" },
  { id: "transactions", name: "Transactions & Shipping" },
  { id: "messages", name: "Messages & Inbox" },
  { id: "sales_report", name: "Sales Reports" },
  { id: "users", name: "User Management" },
  { id: "subscribers", name: "Subscribers" },
  { id: "events", name: "Events" },
  { id: "audit_logs", name: "Audit Trail" },
  { id: "affiliates", name: "Affiliate Management" },
  { id: "accounting_mod", name: "Accounting (COA, Invoice, dll)" },
]);

const permissions = ref({});

const fetchPolicies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/access-policies`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });
    if (res.data && res.data.permissions) {
      const fetchedPerms = res.data.permissions;
      if (Array.isArray(fetchedPerms) && fetchedPerms.length === 0) {
        permissions.value = {};
      } else {
        permissions.value = fetchedPerms;
      }
    }
  } catch (error) {
    console.error("Gagal memuat kebijakan akses", error);
  }
};

const hasPermission = (roleId, moduleId, actionId) => {
  if (!permissions.value[roleId]) return false;
  if (!permissions.value[roleId][moduleId]) return false;
  return permissions.value[roleId][moduleId].includes(actionId);
};

const togglePermission = (roleId, moduleId, actionId) => {
  if (!permissions.value[roleId]) permissions.value[roleId] = {};
  if (!permissions.value[roleId][moduleId]) permissions.value[roleId][moduleId] = [];

  const modulePerms = permissions.value[roleId][moduleId];
  const index = modulePerms.indexOf(actionId);

  if (index > -1) {
    modulePerms.splice(index, 1);

    // UX PINTAR (Mencabut Akses):
    // Jika Menu dicabut, cabut juga semua akses C, R, U, D
    if (actionId === "menu") permissions.value[roleId][moduleId] = [];

    // Jika Read dicabut, cabut juga C, U, D
    if (actionId === "read") {
      ["create", "update", "delete"].forEach((act) => {
        const actIndex = modulePerms.indexOf(act);
        if (actIndex > -1) modulePerms.splice(actIndex, 1);
      });
    }
  } else {
    modulePerms.push(actionId);

    // UX PINTAR (Memberikan Akses):
    // Jika dikasih C, U, D -> Otomatis kasih akses Read (R) dan Menu (M)
    if (["create", "update", "delete"].includes(actionId)) {
      if (!modulePerms.includes("read")) modulePerms.push("read");
      if (!modulePerms.includes("menu")) modulePerms.push("menu");
    }
    // Jika dikasih R -> Otomatis tampil di Menu (M)
    if (actionId === "read") {
      if (!modulePerms.includes("menu")) modulePerms.push("menu");
    }
  }
};

const savePolicies = async () => {
  isSaving.value = true;
  try {
    const res = await axios.post(
      `${BASE_URL}/admin/access-policies`,
      { permissions: permissions.value },
      { headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` } }
    );
    Swal.fire({
      icon: "success",
      title: "Kebijakan Diperbarui!",
      confirmButtonColor: "#000",
    });
  } catch (error) {
    Swal.fire({ icon: "error", title: "Gagal Menyimpan", confirmButtonColor: "#000" });
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchPolicies();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> -->
<template>
  <div class="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8 animate-fade-in">
    <div class="mb-8 sm:flex sm:items-center sm:justify-between">
      <div>
        <h1 class="font-serif text-2xl font-bold text-gray-900">
          Granular Access Policy
        </h1>
        <p class="mt-2 text-sm text-gray-500">
          Atur hak akses spesifik (Create, Read, Update, Delete) untuk setiap peran
          (Role).
        </p>
      </div>
      <div class="mt-4 sm:mt-0">
        <button
          @click="savePolicies"
          :disabled="isSaving"
          class="inline-flex items-center px-6 py-3 text-xs font-bold tracking-widest text-white uppercase transition bg-black rounded-lg hover:bg-gray-800 disabled:opacity-50"
        >
          <span
            v-if="isSaving"
            class="w-4 h-4 mr-2 border-2 border-white rounded-full border-t-transparent animate-spin"
          ></span>
          {{ isSaving ? "Menyimpan..." : "Simpan Pengaturan" }}
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-4 mb-4 text-xs font-medium text-gray-600">
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-blue-600 text-white rounded text-[10px] font-bold"
        >
          M
        </div>
        Menu (Tampil di Sidebar)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          C
        </div>
        Create (Tambah)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          R
        </div>
        Read (Lihat Data)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          U
        </div>
        Update (Ubah Data)
      </span>
      <span class="flex items-center gap-1.5">
        <div
          class="w-5 h-5 flex items-center justify-center bg-black text-white rounded text-[10px] font-bold"
        >
          D
        </div>
        Delete (Hapus)
      </span>
    </div>

    <div class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="w-64 py-4 pl-6 pr-3 text-xs font-bold tracking-wider text-left text-gray-500 uppercase border-r border-gray-200"
              >
                Menu / Modul
              </th>
              <th
                v-for="role in roles"
                :key="role.id"
                scope="col"
                class="px-4 py-4 text-xs font-bold tracking-wider text-center text-gray-500 uppercase border-r border-gray-200 min-w-[160px]"
              >
                {{ role.name }}
                <p class="mt-1 text-[9px] font-normal text-gray-400 capitalize">
                  {{ role.desc }}
                </p>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="module in modules"
              :key="module.id"
              class="transition-colors hover:bg-gray-50/50"
            >
              <td
                class="py-4 pl-6 pr-3 text-sm font-medium text-gray-900 whitespace-nowrap border-r border-gray-200"
              >
                {{ module.name }}
              </td>
              <td
                v-for="role in roles"
                :key="`${module.id}-${role.id}`"
                class="px-4 py-4 text-center whitespace-nowrap border-r border-gray-200"
              >
                <div class="flex justify-center gap-1">
                  <template v-for="action in crudActions" :key="action.id">
                    <button
                      v-if="module.availableActions.includes(action.id)"
                      @click="togglePermission(role.id, module.id, action.id)"
                      :title="action.title"
                      :class="[
                        'w-7 h-7 flex items-center justify-center rounded transition-all duration-200 text-xs font-bold',
                        hasPermission(role.id, module.id, action.id)
                          ? action.id === 'menu'
                            ? 'bg-blue-600 text-white shadow-md transform scale-110'
                            : 'bg-black text-white shadow-md transform scale-110'
                          : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600',
                      ]"
                    >
                      {{ action.label }}
                    </button>

                    <div v-else class="w-7 h-7 flex items-center justify-center">
                      <span class="text-gray-200 text-[10px] select-none">-</span>
                    </div>
                  </template>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="p-4 border-t border-yellow-100 bg-yellow-50">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="w-5 h-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.5-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-xs text-yellow-700">
              <strong>Catatan Sistem:</strong> Role
              <span class="font-bold">Superadmin</span> memiliki akses absolut (bypass) ke
              seluruh sistem dan tidak ditampilkan pada matriks ini. Tanda strip (-)
              berarti fitur tidak berlaku untuk modul tersebut.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

const isSaving = ref(false);

const crudActions = [
  { id: "menu", label: "M", title: "Menu Visibility (Tampil di Sidebar)" },
  { id: "create", label: "C", title: "Create (Tambah)" },
  { id: "read", label: "R", title: "Read (Lihat)" },
  { id: "update", label: "U", title: "Update (Ubah)" },
  { id: "delete", label: "D", title: "Delete (Hapus)" },
];

const roles = ref([
  { id: "admin", name: "Admin", desc: "General Management" },
  { id: "gudang", name: "Gudang", desc: "Stock & Logistics" },
  { id: "accounting", name: "Accounting", desc: "Finance & Report" },
  { id: "cs", name: "Customer Service", desc: "Chat & Blast Email" },
]);

// [PERBAIKAN] Tambahkan array 'availableActions' pada setiap modul
const modules = ref([
  { id: "dashboard", name: "Dashboard Analytics", availableActions: ["menu", "read"] },
  {
    id: "categories",
    name: "Categories",
    availableActions: ["menu", "create", "read", "update", "delete"],
  },
  {
    id: "products",
    name: "Product Management",
    availableActions: ["menu", "create", "read", "update", "delete"],
  },
  {
    id: "stocks",
    name: "Stock Management",
    availableActions: ["menu", "read", "update"],
  }, // Stok biasanya tidak didelete/dicreate langsung dari sini
  {
    id: "transactions",
    name: "Transactions & Shipping",
    availableActions: ["menu", "read", "update"],
  }, // Transaksi tidak boleh dihapus
  {
    id: "messages",
    name: "Messages & Inbox",
    availableActions: ["menu", "create", "read", "update", "delete"],
  },
  { id: "sales_report", name: "Sales Reports", availableActions: ["menu", "read"] },
  // {
  //   id: "users",
  //   name: "User Management",
  //   availableActions: ["menu", "create", "read", "update", "delete"],
  // },
  {
    id: "users",
    name: "User Management",
    // [PERBAIKAN] Hanya sediakan akses Menu dan Read
    // Karena pembuatan user dilakukan di frontend publik, dan chat diatur oleh modul messages
    availableActions: ["menu", "read"],
  },
  // {
  //   id: "subscribers",
  //   name: "Subscribers",
  //   availableActions: ["menu", "create", "read", "update", "delete"],
  // },
  {
    id: "subscribers",
    name: "Subscribers",
    // [PERBAIKAN] Hanya sediakan akses Menu dan Read
    // Karena halaman ini hanya untuk melihat daftar dan detail email subscriber
    availableActions: ["menu", "read"],
  },
  {
    id: "events",
    name: "Events",
    availableActions: ["menu", "create", "read", "update", "delete"],
  },
  { id: "audit_logs", name: "Audit Trail", availableActions: ["menu", "read"] }, // Log aktivitas tidak boleh dimodifikasi
  {
    id: "affiliates",
    name: "Affiliate Management",
    availableActions: ["menu", "create", "read", "update", "delete"],
  },
  {
    id: "accounting_mod",
    name: "Accounting (COA, Invoice, dll)",
    availableActions: ["menu", "create", "read", "update", "delete"],
  },
]);

const permissions = ref({});

const fetchPolicies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/admin/access-policies`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });

    if (res.data && res.data.permissions) {
      const fetchedPerms = res.data.permissions;

      if (Array.isArray(fetchedPerms) && fetchedPerms.length === 0) {
        permissions.value = {};
      } else {
        permissions.value = fetchedPerms;
      }
    }
  } catch (error) {
    console.error("Gagal memuat kebijakan akses", error);
    Swal.fire({
      icon: "error",
      title: "Gagal Memuat Data",
      text: "Tidak dapat menarik data Access Policy dari server.",
      confirmButtonColor: "#000",
    });
  }
};

const hasPermission = (roleId, moduleId, actionId) => {
  if (!permissions.value[roleId]) return false;
  if (!permissions.value[roleId][moduleId]) return false;
  return permissions.value[roleId][moduleId].includes(actionId);
};

const togglePermission = (roleId, moduleId, actionId) => {
  if (!permissions.value[roleId]) {
    permissions.value[roleId] = {};
  }
  if (!permissions.value[roleId][moduleId]) {
    permissions.value[roleId][moduleId] = [];
  }

  const modulePerms = permissions.value[roleId][moduleId];
  const index = modulePerms.indexOf(actionId);

  if (index > -1) {
    modulePerms.splice(index, 1);

    if (actionId === "menu") permissions.value[roleId][moduleId] = [];

    if (actionId === "read") {
      ["create", "update", "delete"].forEach((act) => {
        const actIndex = modulePerms.indexOf(act);
        if (actIndex > -1) modulePerms.splice(actIndex, 1);
      });
    }
  } else {
    modulePerms.push(actionId);

    if (["create", "update", "delete"].includes(actionId)) {
      if (!modulePerms.includes("read")) modulePerms.push("read");
      if (!modulePerms.includes("menu")) modulePerms.push("menu");
    }

    if (actionId === "read") {
      if (!modulePerms.includes("menu")) modulePerms.push("menu");
    }
  }
};

const savePolicies = async () => {
  isSaving.value = true;
  try {
    const res = await axios.post(
      `${BASE_URL}/admin/access-policies`,
      {
        permissions: permissions.value,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      }
    );

    Swal.fire({
      icon: "success",
      title: "Kebijakan Diperbarui!",
      text: res.data.message || "Hak akses CRUD berhasil disimpan dan langsung berlaku.",
      confirmButtonColor: "#000",
    });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Gagal Menyimpan",
      text:
        error.response?.data?.message ||
        "Terjadi kesalahan pada server saat memperbarui kebijakan.",
      confirmButtonColor: "#000",
    });
  } finally {
    isSaving.value = false;
  }
};

onMounted(() => {
  fetchPolicies();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
