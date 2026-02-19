<template>
  <div
    class="bg-white shadow-sm mx-auto p-8 border border-gray-100 rounded-2xl max-w-4xl"
  >
    <div class="flex justify-between items-center mb-8">
      <h1 class="font-bold text-gray-800 text-2xl">Edit Product</h1>
      <button
        @click="$router.back()"
        class="text-gray-500 hover:text-black transition"
      >
        Back
      </button>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="gap-6 grid grid-cols-1 md:grid-cols-2"
    >
      <div class="space-y-4">
        <div>
          <label class="block mb-1 font-bold text-sm">Product Name</label>
          <input
            v-model="form.name"
            type="text"
            class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
          />
        </div>
        <div>
          <label class="block mb-1 font-bold text-sm">Product Code</label>
          <input
            v-model="form.code"
            type="text"
            class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
          />
        </div>
        <div class="gap-4 grid grid-cols-2">
          <!-- <div>
            <label class="block mb-1 font-bold text-sm">Price</label>
            <input v-model="form.price" type="number" class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full" required />
          </div> -->
          <div class="gap-4 grid grid-cols-2">
            <div>
              <label class="block mb-1 font-bold text-sm">Original Price</label>
              <input
                v-model="form.price"
                type="number"
                class="bg-gray-100 p-3 rounded-xl w-full"
                required
              />
            </div>
            <div>
              <label class="block mb-1 font-bold text-sm"
                >Discount Price (Optional)</label
              >
              <input
                v-model="form.discount_price"
                type="number"
                placeholder="Set if on sale"
                class="bg-gray-100 p-3 rounded-xl w-full"
              />
            </div>
          </div>
          <div>
            <label class="block mb-1 font-bold text-sm">Stock</label>
            <input
              v-model="form.stock"
              type="number"
              class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
          </div>
        </div>
        <div>
          <label class="block mb-1 font-bold text-sm">Category</label>
          <select
            v-model="form.category_id"
            class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full"
            required
          >
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.category_name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block mb-1 font-bold text-sm"
            >Product Image (Leave blank to keep current)</label
          >
          <input
            type="file"
            @change="handleFile"
            class="hover:file:bg-blue-100 file:bg-blue-50 file:mr-4 file:px-4 file:py-2 file:border-0 file:rounded-full w-full file:font-semibold text-gray-500 file:text-blue-700 text-sm file:text-sm"
          />
          <p v-if="currentImage" class="mt-2 text-gray-400 text-xs">
            Current: {{ currentImage }}
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block mb-1 font-bold text-sm">Description</label>
          <textarea
            v-model="form.description"
            class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full h-24"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1 font-bold text-sm">Care Instructions</label>
          <textarea
            v-model="form.care"
            class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full h-24"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1 font-bold text-sm">Design Details</label>
          <textarea
            v-model="form.design"
            class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full h-24"
          ></textarea>
        </div>
      </div>

      <div class="md:col-span-2 pt-4">
        <button
          type="submit"
          class="bg-black hover:bg-gray-800 shadow-lg p-4 rounded-xl w-full font-bold text-white transition-all duration-300"
        >
          Update Product Information
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// import { ref, onMounted } from "vue";
// import axios from "axios";
// import { useRouter, useRoute } from "vue-router";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api.js";

// const router = useRouter();
// const route = useRoute();
// const productId = route.params.id;

// const categories = ref([]);
// const currentImage = ref("");
// const form = ref({
//   name: "",
//   code: "",
//   price: "",
//   stock: "",
//   category_id: "",
//   description: "",
//   care: "",
//   design: "",
//   image: null,
// });

// const axiosConfig = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
// };

// const handleFile = (e) => {
//   form.value.image = e.target.files[0];
// };

// // Ambil Data Kategori & Detail Produk saat halaman dimuat
// onMounted(async () => {
//   try {
//     // 1. Fetch Categories
//     const catRes = await axios.get(`${BASE_URL}/categories`, axiosConfig);
//     categories.value = catRes.data.data;

//     // 2. Fetch Product Detail
//     const prodRes = await axios.get(
//       `${BASE_URL}/products/${productId}`,
//       axiosConfig,
//     );
//     const p = prodRes.data;

//     form.value.name = p.name;
//     form.value.code = p.code;
//     form.value.price = p.price;
//     form.value.stock = p.stock;
//     form.value.category_id = p.category_id;
//     form.value.description = p.description;
//     form.value.care = p.care;
//     form.value.design = p.design;
//     currentImage.value = p.image;
//   } catch (error) {
//     Swal.fire("Error", "Gagal mengambil data produk.", "error");
//   }
// });

// const handleSubmit = async () => {
//   const formData = new FormData();

//   // Trik Laravel: Gunakan POST dengan spoofing _method PUT untuk FormData
//   formData.append("_method", "PUT");

//   Object.keys(form.value).forEach((key) => {
//     if (key === "image") {
//       if (form.value.image instanceof File) {
//         formData.append("image", form.value.image);
//       }
//     } else {
//       formData.append(key, form.value[key]);
//     }
//   });

//   try {
//     // Tetap menggunakan .post karena menyertakan file, tapi method aslinya PUT (via _method)
//     await axios.post(`${BASE_URL}/products/${productId}`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         ...axiosConfig.headers,
//       },
//     });

//     Swal.fire({
//       icon: "success",
//       title: "Updated!",
//       text: "Data produk berhasil diperbarui.",
//       timer: 2000,
//       showConfirmButton: false,
//     });
//     router.push("/admin/products");
//   } catch (error) {
//     console.error(error);
//     Swal.fire(
//       "Error",
//       "Gagal memperbarui produk. Pastikan kode unik tidak duplikat.",
//       "error",
//     );
//   }
// };

import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const categories = ref([]);
const currentImage = ref("");
const form = ref({
  name: "",
  code: "",
  price: "",
  discount_price: "", // Tambahkan ini agar tidak error jika kosong
  stock: "",
  category_id: "",
  description: "",
  care: "",
  design: "",
  image: null,
});

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const handleFile = (e) => {
  form.value.image = e.target.files[0];
};

// Fungsi helper untuk mengisi form dari data produk
const fillFormWithData = (p) => {
  form.value.name = p.name;
  form.value.code = p.code;
  form.value.price = p.price;
  form.value.discount_price = p.discount_price || "";
  form.value.stock = p.stock;
  form.value.category_id = p.category_id;
  form.value.description = p.description;
  form.value.care = p.care;
  form.value.design = p.design;
  currentImage.value = p.image;
};

// Ambil Data saat halaman dimuat
onMounted(async () => {
  // 1. TANGKAP DATA DARI STATE ROUTER (Optimistic Load)
  const stateData = window.history.state?.productData;

  if (stateData) {
    // Isi form LANGSUNG tanpa menunggu API
    fillFormWithData(stateData);
  }

  try {
    // 2. Fetch Categories (Tetap perlu karena dropdown butuh list master kategori)
    const catRes = await axios.get(`${BASE_URL}/categories`, axiosConfig);
    categories.value = catRes.data.data;

    // 3. Fetch Product Detail (Background Sync)
    // Walaupun form sudah terisi dari state, kita tetap ambil data terbaru
    // dari server untuk berjaga-jaga jika ada admin lain yang mengedit stok dll
    const prodRes = await axios.get(
      `${BASE_URL}/products/${productId}`,
      axiosConfig,
    );

    // Timpa form dengan data paling fresh dari database
    fillFormWithData(prodRes.data);
  } catch (error) {
    // Jika stateData tidak ada dan fetch gagal, baru tampilkan error
    if (!stateData) {
      Swal.fire("Error", "Gagal mengambil data produk.", "error");
    }
  }
});

const handleSubmit = async () => {
  const formData = new FormData();
  formData.append("_method", "PUT");

  Object.keys(form.value).forEach((key) => {
    if (key === "image") {
      if (form.value.image instanceof File) {
        formData.append("image", form.value.image);
      }
    } else {
      formData.append(key, form.value[key]);
    }
  });

  try {
    await axios.post(`${BASE_URL}/products/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...axiosConfig.headers,
      },
    });

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: "Data produk berhasil diperbarui.",
      timer: 2000,
      showConfirmButton: false,
    });
    router.push("/admin/products");
  } catch (error) {
    console.error(error);
    Swal.fire(
      "Error",
      "Gagal memperbarui produk. Pastikan kode unik tidak duplikat.",
      "error",
    );
  }
};
</script>
