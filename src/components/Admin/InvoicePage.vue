<template>
  <div
    class="relative bg-white shadow-sm p-8 border border-gray-100 rounded-2xl min-h-[600px]"
  >
    <Breadcrumb />
    <div
      v-if="isLoading"
      class="z-20 absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-[2px] rounded-2xl transition-all duration-300"
    >
      <div class="flex flex-col items-center">
        <div
          class="w-12 h-12 border-4 border-gray-200 rounded-full border-t-black animate-spin"
        ></div>
        <p
          class="mt-4 text-xs font-bold tracking-widest text-black uppercase animate-pulse"
        >
          Loading...
        </p>
      </div>
    </div>

    <div
      class="flex flex-col items-start justify-between gap-4 pb-6 mb-8 border-b border-gray-100 md:flex-row md:items-center"
    >
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Supplier Invoices</h1>
        <p class="text-sm text-gray-500">Manage payables and upload proof of payments.</p>
      </div>
      <button
        @click="openModal('add')"
        class="px-6 py-2 text-xs font-bold tracking-widest text-white uppercase transition bg-black hover:bg-gray-800 rounded-xl"
      >
        + Create Invoice
      </button>
    </div>

    <div class="flex flex-col items-center justify-between gap-4 mb-6 md:flex-row">
      <div class="flex items-center w-full gap-4 md:w-auto">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search Invoice No or Supplier..."
          class="w-full px-4 py-2 text-sm transition border border-gray-200 outline-none bg-gray-50 rounded-xl focus:ring-2 focus:ring-black md:w-64"
        />
        <select
          v-model="statusFilter"
          class="px-3 py-2 text-sm border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl focus:ring-2 focus:ring-black"
        >
          <option value="All">All Status</option>
          <option value="Not Yet">Not Yet Paid</option>
          <option value="Paid">Paid</option>
        </select>
      </div>

      <div class="flex items-center gap-2">
        <span class="text-xs font-bold tracking-wide text-gray-400 uppercase">Show:</span>
        <select
          v-model="itemsPerPage"
          class="px-3 py-2 text-sm font-bold border border-gray-200 outline-none cursor-pointer bg-gray-50 rounded-xl"
        >
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr
            class="text-xs tracking-widest text-gray-400 uppercase border-b border-gray-200 bg-gray-50"
          >
            <th class="p-4 rounded-tl-xl">Invoice Info</th>
            <th class="p-4">Supplier</th>
            <th class="p-4 text-right">Amount (Rp)</th>
            <th class="p-4 text-center">Status</th>
            <th class="p-4 text-center rounded-tr-xl">Action</th>
          </tr>
        </thead>
        <tbody class="text-sm text-gray-700">
          <tr
            v-for="inv in paginatedData"
            :key="inv.id"
            class="transition border-b border-gray-50 hover:bg-gray-50"
          >
            <td class="p-4">
              <p class="font-mono font-bold text-blue-600">
                {{ inv.no_invoice }}
              </p>
              <p class="text-[10px] text-gray-400 uppercase tracking-wider">
                Due: {{ formatDate(inv.deadline_invoice) }}
              </p>
            </td>
            <td class="p-4 font-bold text-gray-800">
              {{ inv.supplier?.name }}
            </td>
            <td class="p-4 text-base font-black text-right">
              {{ formatPrice(inv.amount) }}
            </td>
            <td class="p-4 text-center">
              <span
                v-if="inv.payment_status === 'Paid'"
                class="bg-green-100 text-green-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest"
                >Paid</span
              >
              <span
                v-else
                class="bg-red-100 text-red-700 px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest"
                >Not Yet</span
              >
            </td>
            <td class="p-4 space-x-3 text-center">
              <a
                v-if="inv.image_invoice"
                :href="inv.image_invoice"
                target="_blank"
                class="text-xs font-bold text-blue-500 uppercase hover:underline"
                >Doc</a
              >
              <button
                v-if="inv.payment_status === 'Not Yet'"
                @click="openModal('pay', inv)"
                class="text-xs font-bold text-green-600 uppercase hover:underline"
              >
                Pay Now
              </button>
              <a
                v-if="inv.payment_status === 'Paid' && inv.image_proof"
                :href="BASE_URL_ASSET + inv.image_proof"
                target="_blank"
                class="text-xs font-bold text-purple-600 uppercase hover:underline"
                >Proof</a
              >
              <button
                @click="openModal('edit', inv)"
                class="text-xs font-bold uppercase text-amber-500 hover:underline"
              >
                Edit
              </button>
              <button
                @click="confirmDelete(inv.id)"
                class="text-xs font-bold text-red-500 uppercase hover:underline"
              >
                Del
              </button>
            </td>
          </tr>
          <tr v-if="paginatedData.length === 0">
            <td colspan="5" class="py-16 italic text-center text-gray-400">
              No invoices found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      v-if="filteredData.length > 0"
      class="flex flex-col items-center justify-between gap-4 pt-4 mt-6 border-t border-gray-100 md:flex-row"
    >
      <p class="text-sm text-gray-400">
        Showing <span class="font-bold text-black">{{ showingStart }}</span> to
        <span class="font-bold text-black">{{ showingEnd }}</span> of
        <span class="font-bold text-black">{{ filteredData.length }}</span>
      </p>
      <div class="flex gap-2">
        <button
          @click="currentPage--"
          :disabled="currentPage === 1"
          class="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Prev
        </button>
        <div class="flex gap-1">
          <button
            v-for="(page, index) in visiblePages"
            :key="index"
            @click="typeof page === 'number' ? (currentPage = page) : null"
            :disabled="page === '...'"
            :class="[
              currentPage === page
                ? 'bg-black text-white border-black'
                : 'hover:bg-gray-50 border-gray-200',
              page === '...'
                ? 'cursor-default border-transparent hover:bg-transparent'
                : 'border',
            ]"
            class="flex items-center justify-center w-10 h-10 text-sm font-medium transition rounded-xl"
          >
            {{ page }}
          </button>
        </div>
        <button
          @click="currentPage++"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 text-sm font-medium transition border rounded-xl hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>

    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/50 backdrop-blur-sm"
    >
      <div class="w-full max-w-2xl p-8 my-8 bg-white rounded-3xl">
        <h2 class="mb-6 text-xl font-bold">
          {{
            modalMode === "add"
              ? "Create Invoice"
              : modalMode === "edit"
              ? "Edit Invoice"
              : "Process Payment"
          }}
        </h2>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <template v-if="modalMode === 'add' || modalMode === 'edit'">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase">Invoice No</label
                ><input
                  v-model="form.no_invoice"
                  type="text"
                  class="w-full p-3 border outline-none bg-gray-50 rounded-xl"
                  required
                />
              </div>
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase">Supplier</label>
                <select
                  v-model="form.supplier_id"
                  class="w-full p-3 border outline-none bg-gray-50 rounded-xl"
                  required
                >
                  <option v-for="sup in suppliers" :key="sup.id" :value="sup.id">
                    {{ sup.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase">Date</label
                ><input
                  v-model="form.date"
                  type="datetime-local"
                  class="w-full p-3 border outline-none bg-gray-50 rounded-xl"
                />
              </div>
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase">Due Date</label
                ><input
                  v-model="form.deadline_invoice"
                  type="datetime-local"
                  class="w-full p-3 border outline-none bg-gray-50 rounded-xl"
                />
              </div>
            </div>
            <div>
              <label class="text-xs font-bold text-gray-500 uppercase">Amount (Rp)</label
              ><input
                v-model="form.amount"
                type="number"
                class="w-full p-3 text-xl font-black border outline-none bg-gray-50 rounded-xl"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4 p-3 border bg-gray-50/50 rounded-xl">
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase"
                  >Debit Account</label
                >
                <select
                  v-model="form.debit_coa_id"
                  class="w-full p-2 text-sm bg-white border rounded-lg outline-none"
                  required
                >
                  <option v-for="coa in coasList" :key="coa.id" :value="coa.id">
                    [{{ coa.coa_no }}] {{ coa.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase"
                  >Credit Account</label
                >
                <select
                  v-model="form.kredit_coa_id"
                  class="w-full p-2 text-sm bg-white border rounded-lg outline-none"
                  required
                >
                  <option v-for="coa in coasList" :key="coa.id" :value="coa.id">
                    [{{ coa.coa_no }}] {{ coa.name }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-xs font-bold text-gray-500 uppercase"
                >Invoice Document (Image/PDF)</label
              >
              <input
                type="file"
                @change="(e) => (form.image_invoice = e.target.files[0])"
                class="w-full mt-1 text-sm"
                :required="modalMode === 'add'"
              />
            </div>
          </template>

          <template v-if="modalMode === 'pay'">
            <div class="p-4 mb-4 border border-blue-100 bg-blue-50 rounded-xl">
              <p class="text-xs font-bold text-blue-500 uppercase">Paying Invoice</p>
              <p class="text-lg font-black text-blue-700">
                {{ form.no_invoice }} - Rp {{ formatPrice(form.amount) }}
              </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase"
                  >Payment Date</label
                ><input
                  v-model="form.payment_date"
                  type="date"
                  class="w-full p-3 border outline-none bg-gray-50 rounded-xl"
                  required
                />
              </div>
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase"
                  >Payment Method</label
                ><input
                  v-model="form.payment_method"
                  type="text"
                  placeholder="Transfer BCA, Cash, etc."
                  class="w-full p-3 border outline-none bg-gray-50 rounded-xl"
                  required
                />
              </div>
            </div>
            <div>
              <label class="text-xs font-bold text-gray-500 uppercase"
                >Ref Number (Optional)</label
              ><input
                v-model="form.reference_number"
                type="text"
                class="w-full p-3 border outline-none bg-gray-50 rounded-xl"
              />
            </div>
            <div class="grid grid-cols-2 gap-4 p-3 border bg-gray-50/50 rounded-xl">
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase"
                  >Debit Account</label
                ><select
                  v-model="form.debit_coa_id"
                  class="w-full p-2 text-sm bg-white border rounded-lg outline-none"
                  required
                >
                  <option v-for="coa in coasList" :key="coa.id" :value="coa.id">
                    [{{ coa.coa_no }}] {{ coa.name }}
                  </option>
                </select>
              </div>
              <div>
                <label class="text-xs font-bold text-gray-500 uppercase"
                  >Credit Account</label
                ><select
                  v-model="form.kredit_coa_id"
                  class="w-full p-2 text-sm bg-white border rounded-lg outline-none"
                  required
                >
                  <option v-for="coa in coasList" :key="coa.id" :value="coa.id">
                    [{{ coa.coa_no }}] {{ coa.name }}
                  </option>
                </select>
              </div>
            </div>
            <div>
              <label class="text-xs font-bold text-gray-500 uppercase"
                >Proof of Payment</label
              ><input
                type="file"
                @change="(e) => (form.image_proof = e.target.files[0])"
                class="w-full mt-1 text-sm"
                required
              />
            </div>
          </template>

          <div class="flex gap-4 pt-4 mt-4 border-t">
            <button
              type="button"
              @click="showModal = false"
              class="flex-1 py-3 font-bold text-gray-500 transition hover:bg-gray-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSubmitting"
              class="flex-1 py-3 font-bold text-white transition bg-black rounded-xl disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { uploadToS3 } from "../../utils/s3Upload.js";

// Digunakan untuk merender href file karena storage Laravel mereturn path /storage/...
const BASE_URL_ASSET = BASE_URL.replace("/api", "");

const invoices = ref([]);
const suppliers = ref([]);
const coasList = ref([]);
const isLoading = ref(false);

const showModal = ref(false);
const modalMode = ref("add"); // add, edit, pay
const isSubmitting = ref(false);

const searchQuery = ref("");
const statusFilter = ref("All");
const currentPage = ref(1);
const itemsPerPage = ref(10);

const form = ref({});
const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const fetchData = async () => {
  isLoading.value = true;
  try {
    const [invRes, supRes, coaRes] = await Promise.all([
      axios.get(`${BASE_URL}/admin/invoices`, axiosConfig),
      axios.get(`${BASE_URL}/admin/suppliers`, axiosConfig),
      axios.get(`${BASE_URL}/admin/coas`, axiosConfig),
    ]);
    invoices.value = invRes.data;
    suppliers.value = supRes.data.suppliers;
    coasList.value = coaRes.data;
  } catch (e) {
    console.error(e);
  }
  isLoading.value = false;
};

const filteredData = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return invoices.value.filter((inv) => {
    const matchSearch =
      inv.no_invoice.toLowerCase().includes(query) ||
      inv.supplier?.name.toLowerCase().includes(query);
    const matchStatus =
      statusFilter.value === "All" ? true : inv.payment_status === statusFilter.value;
    return matchSearch && matchStatus;
  });
});

const totalPages = computed(() =>
  Math.ceil(filteredData.value.length / itemsPerPage.value)
);
const paginatedData = computed(() =>
  filteredData.value.slice(
    (currentPage.value - 1) * itemsPerPage.value,
    currentPage.value * itemsPerPage.value
  )
);
const showingStart = computed(() =>
  filteredData.value.length === 0 ? 0 : (currentPage.value - 1) * itemsPerPage.value + 1
);
const showingEnd = computed(() =>
  Math.min(currentPage.value * itemsPerPage.value, filteredData.value.length)
);

const visiblePages = computed(() => {
  const current = currentPage.value;
  const total = totalPages.value;
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3)
    return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
});

watch([searchQuery, statusFilter, itemsPerPage], () => {
  currentPage.value = 1;
});

const openModal = (mode, data = null) => {
  modalMode.value = mode;
  if (data) {
    // Format tanggal utk datetime-local jika mode edit, date biasa jika pay
    form.value = { ...data };
    if (form.value.date) form.value.date = form.value.date.slice(0, 16);
    if (form.value.deadline_invoice)
      form.value.deadline_invoice = form.value.deadline_invoice.slice(0, 16);
    if (mode === "pay") {
      form.value.payment_date = new Date().toISOString().split("T")[0];
    }
  } else {
    form.value = { date: "", deadline_invoice: "", amount: "" };
  }
  showModal.value = true;
};

// const handleSubmit = async () => {
//   isSubmitting.value = true;

//   const fd = new FormData();
//   Object.keys(form.value).forEach(k => {
//     if(form.value[k] !== null && form.value[k] !== undefined) {
//       fd.append(k, form.value[k]);
//     }
//   });

//   try {
//     if (modalMode.value === 'add') {
//       await axios.post(`${BASE_URL}/admin/invoices`, fd, { headers: { 'Content-Type': 'multipart/form-data', ...axiosConfig.headers }});
//     } else if (modalMode.value === 'edit') {
//       fd.append('_method', 'PUT'); // Laravel requirement for multipart PUT
//       await axios.post(`${BASE_URL}/admin/invoices/${form.value.id}`, fd, { headers: { 'Content-Type': 'multipart/form-data', ...axiosConfig.headers }});
//     } else if (modalMode.value === 'pay') {
//       await axios.post(`${BASE_URL}/admin/invoices/${form.value.id}/pay`, fd, { headers: { 'Content-Type': 'multipart/form-data', ...axiosConfig.headers }});
//     }

//     showModal.value = false;
//     fetchData();
//     Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Success', showConfirmButton: false, timer: 1500 });
//   } catch (e) {
//     Swal.fire('Error', e.response?.data?.message || 'Validation failed', 'error');
//   }
//   isSubmitting.value = false;
// };

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    let invoiceImageUrl = form.value.image_invoice;
    let proofUrl = form.value.image_proof;

    /*
    =============================
    UPLOAD INVOICE DOC
    =============================
    */
    if (form.value.image_invoice instanceof File) {
      invoiceImageUrl = await uploadToS3(form.value.image_invoice, "invoices");
    }

    /*
    =============================
    UPLOAD PAYMENT PROOF
    =============================
    */
    if (modalMode.value === "pay" && form.value.image_proof instanceof File) {
      proofUrl = await uploadToS3(form.value.image_proof, "payments");
    }

    const payload = {
      ...form.value,
      image_invoice: invoiceImageUrl,
      image_proof: proofUrl,
    };

    if (modalMode.value === "add") {
      await axios.post(`${BASE_URL}/admin/invoices`, payload, axiosConfig);
    } else if (modalMode.value === "edit") {
      await axios.put(
        `${BASE_URL}/admin/invoices/${form.value.id}`,
        payload,
        axiosConfig
      );
    } else if (modalMode.value === "pay") {
      await axios.post(
        `${BASE_URL}/admin/invoices/${form.value.id}/pay`,
        payload,
        axiosConfig
      );
    }

    showModal.value = false;
    fetchData();

    Swal.fire({
      toast: true,
      icon: "success",
      title: "Success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (e) {
    console.error(e);
    Swal.fire("Error", "Operation failed", "error");
  }

  isSubmitting.value = false;
};

const confirmDelete = (id) => {
  Swal.fire({
    title: "Delete?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    confirmButtonText: "Yes",
  }).then(async (res) => {
    if (res.isConfirmed) {
      try {
        await axios.delete(`${BASE_URL}/admin/invoices/${id}`, axiosConfig);
        fetchData();
      } catch (e) {
        Swal.fire("Error", "Delete failed", "error");
      }
    }
  });
};

const formatPrice = (v) =>
  new Intl.NumberFormat("id-ID", { minimumFractionDigits: 0 }).format(v || 0);
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

onMounted(fetchData);
</script>
