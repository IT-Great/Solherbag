<!-- <template>
  <div
    class="max-w-4xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl"
  >
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Edit Product</h1>
      <button
        @click="$router.back()"
        class="text-gray-500 transition hover:text-black"
      >
        Back
      </button>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <div class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-bold">Product Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold">Product Code</label>
          <input
            v-model="form.code"
            type="text"
            class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block mb-1 text-sm font-bold">Original Price</label>
              <input
                v-model="form.price"
                type="number"
                class="w-full p-3 bg-gray-100 rounded-xl"
                required
              />
            </div>
            <div>
              <label class="block mb-1 text-sm font-bold"
                >Discount Price (Optional)</label
              >
              <input
                v-model="form.discount_price"
                type="number"
                placeholder="Set if on sale"
                class="w-full p-3 bg-gray-100 rounded-xl"
              />
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Stock</label>
            <input
              v-model="form.stock"
              type="number"
              class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold">Category</label>
          <select
            v-model="form.category_id"
            class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.category_name }}
            </option>
          </select>
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold"
            >Product Image (Leave blank to keep current)</label
          >
          <div>
            <label class="block mb-1 text-sm font-bold"
              >Main Image (Required)</label
            >
            <input
              type="file"
              @change="handleFile"
              accept="image/*"
              class="w-full text-sm"
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-bold"
              >Variant Images (Max 5, 2MB each)</label
            >
            <input
              type="file"
              @change="handleVariantImages"
              accept="image/*"
              multiple
              class="w-full text-sm"
            />
            <p class="text-[10px] text-gray-500 mt-1">
              Select multiple files at once.
            </p>
          </div>

          <div>
            <label class="block mb-1 text-sm font-bold"
              >Product Video (Max 5MB)</label
            >
            <input
              type="file"
              @change="handleVideo"
              accept="video/mp4,video/quicktime"
              class="w-full text-sm"
            />
          </div>
          <p v-if="currentImage" class="mt-2 text-xs text-gray-400">
            Current: {{ currentImage }}
          </p>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-bold">Description</label>
          <textarea
            v-model="form.description"
            class="w-full h-24 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold">Care Instructions</label>
          <textarea
            v-model="form.care"
            class="w-full h-24 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold">Design Details</label>
          <textarea
            v-model="form.design"
            class="w-full h-24 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div class="pt-4 md:col-span-2">
        <button
          type="submit"
          class="w-full p-4 font-bold text-white transition-all duration-300 bg-black shadow-lg hover:bg-gray-800 rounded-xl"
        >
          Update Product Information
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
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
  variant_images: [],
  variant_video: null,
});

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const handleFile = (e) => {
  form.value.image = e.target.files[0];
};

const handleVariantImages = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 5) {
    Swal.fire("Warning", "Maximum 5 variant images allowed", "warning");
    e.target.value = "";
    return;
  }
  form.value.variant_images = files;
};

const handleVideo = (e) => {
  const file = e.target.files[0];
  if (file && file.size > 5 * 1024 * 1024) {
    Swal.fire("Warning", "Video must be less than 5MB", "warning");
    e.target.value = "";
    return;
  }
  form.value.variant_video = file;
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
    if (key === "variant_images") {
      form.value.variant_images.forEach((file) =>
        formData.append("variant_images[]", file),
      );
    } else if (key === "variant_video") {
      if (form.value[key]) {
        formData.append(key, form.value[key]);
      }
    } else if (form.value[key] !== null) {
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
</script> -->

<!-- <template>
  <div
    class="max-w-4xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl"
  >
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Edit Product</h1>
      <button
        @click="$router.back()"
        class="text-gray-500 transition hover:text-black"
      >
        Back
      </button>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <div class="space-y-6">
        <div>
          <label class="block mb-1 text-sm font-bold">Product Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold">Product Code</label>
          <input
            v-model="form.code"
            type="text"
            class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Original Price</label>
            <input
              v-model="form.price"
              type="number"
              class="w-full p-3 bg-gray-100 rounded-xl"
              required
            />
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold"
              >Discount Price (Optional)</label
            >
            <input
              v-model="form.discount_price"
              type="number"
              placeholder="Set if on sale"
              class="w-full p-3 bg-gray-100 rounded-xl"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Stock</label>
            <input
              v-model="form.stock"
              type="number"
              class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Category</label>
            <select
              v-model="form.category_id"
              class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.category_name }}
              </option>
            </select>
          </div>
        </div>

        <div
          class="p-4 space-y-6 border border-gray-200 rounded-2xl bg-gray-50/50"
        >
          <div>
            <label class="block mb-1 text-sm font-bold">Main Image</label>
            <p class="text-[10px] text-gray-500 mb-2">
              Leave blank to keep current image.
            </p>
            <div class="flex items-center gap-4">
              <img
                v-if="currentImage"
                :src="currentImage"
                class="object-cover w-16 h-16 border rounded-lg shadow-sm"
                alt="Current Main Image"
              />
              <div
                v-else
                class="w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center text-[10px] text-gray-400"
              >
                No Img
              </div>

              <input
                type="file"
                @change="handleFile"
                accept="image/*"
                class="flex-1 w-full text-sm"
              />
            </div>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <label class="block mb-1 text-sm font-bold"
              >Variant Images (Max 5)</label
            >
            <p class="text-[10px] text-gray-500 mb-2">
              Upload new files to REPLACE all current variant images.
            </p>

            <input
              type="file"
              @change="handleVariantImages"
              accept="image/*"
              multiple
              class="w-full mb-3 text-sm"
            />

            <div
              v-if="currentVariantImages && currentVariantImages.length > 0"
              class="mt-2"
            >
              <p
                class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
              >
                Current Variants:
              </p>
              <div class="flex gap-2 pb-2 overflow-x-auto">
                <img
                  v-for="(img, idx) in currentVariantImages"
                  :key="idx"
                  :src="img"
                  class="object-cover w-12 h-12 border border-gray-300 rounded-lg shadow-sm shrink-0"
                />
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <label class="block mb-1 text-sm font-bold"
              >Product Video (Max 5MB)</label
            >
            <p class="text-[10px] text-gray-500 mb-2">
              Upload new video to REPLACE the current one.
            </p>

            <input
              type="file"
              @change="handleVideo"
              accept="video/mp4,video/quicktime"
              class="w-full mb-3 text-sm"
            />

            <div
              v-if="currentVideo"
              class="flex items-center gap-2 px-3 py-2 mt-2 text-xs font-medium text-blue-700 border border-blue-100 rounded-lg bg-blue-50 w-fit"
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Current Video Exists
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-bold">Description</label>
          <textarea
            v-model="form.description"
            class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold">Care Instructions</label>
          <textarea
            v-model="form.care"
            class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold">Design Details</label>
          <textarea
            v-model="form.design"
            class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div class="pt-4 md:col-span-2">
        <button
          type="submit"
          class="w-full p-4 font-bold text-white transition-all duration-300 bg-black shadow-lg hover:bg-gray-800 rounded-xl"
        >
          Update Product Information
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { uploadToS3 } from "../../utils/s3Upload.js";

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const categories = ref([]);

// State Khusus Pratinjau (Data Murni dari DB)
const currentImage = ref("");
const currentVariantImages = ref([]);
const currentVideo = ref("");

// State Input Form (Hanya terisi jika admin MENGUNGGAH file BARU)
const form = ref({
  name: "",
  code: "",
  price: "",
  discount_price: "",
  stock: "",
  category_id: "",
  description: "",
  care: "",
  design: "",
  image: null, // File object
  variant_images: [], // Array File object
  variant_video: null, // File object
});

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

// Handlers untuk input file baru
const handleFile = (e) => {
  form.value.image = e.target.files[0];
};

const handleVariantImages = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 5) {
    Swal.fire("Warning", "Maximum 5 variant images allowed", "warning");
    e.target.value = "";
    return;
  }
  form.value.variant_images = files;
};

const handleVideo = (e) => {
  const file = e.target.files[0];
  // if (file && file.size > 5 * 1024 * 1024) {
  //   Swal.fire("Warning", "Video must be less than 5MB", "warning");
  //   e.target.value = "";
  //   return;
  // }
  form.value.variant_video = file;
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

  // Set ke state pratinjau (BUKAN form.value.image, dll)
  currentImage.value = p.image;
  currentVariantImages.value = p.variant_images || [];
  currentVideo.value = p.variant_video;
};

onMounted(async () => {
  const stateData = window.history.state?.productData;

  if (stateData) {
    fillFormWithData(stateData);
  }

  try {
    const catRes = await axios.get(`${BASE_URL}/categories`, axiosConfig);
    categories.value = catRes.data.data;

    const prodRes = await axios.get(
      `${BASE_URL}/products/${productId}`,
      axiosConfig,
    );
    fillFormWithData(prodRes.data);
  } catch (error) {
    if (!stateData) {
      Swal.fire("Error", "Gagal mengambil data produk.", "error");
    }
  }
});

// const handleSubmit = async () => {
//   const formData = new FormData();
//   formData.append("_method", "PUT"); // Fake PUT request untuk Laravel FormData

//   Object.keys(form.value).forEach((key) => {
//     // Penanganan khusus untuk file / array file
//     if (key === "variant_images") {
//       if (form.value.variant_images && form.value.variant_images.length > 0) {
//         form.value.variant_images.forEach((file) => formData.append("variant_images[]", file));
//       }
//     }
//     else if (key === "image" || key === "variant_video") {
//       if (form.value[key] instanceof File) { // Hanya append jika ada file baru
//         formData.append(key, form.value[key]);
//       }
//     }
//     // Data teks biasa
//     else if (form.value[key] !== null && form.value[key] !== undefined) {
//       formData.append(key, form.value[key]);
//     }
//   });

//   // Tampilkan loading spinner agar admin tahu sistem sedang upload (penting untuk video)
//   Swal.fire({
//     title: 'Updating Product...',
//     text: 'Please wait while files are being uploaded.',
//     allowOutsideClick: false,
//     didOpen: () => {
//       Swal.showLoading();
//     }
//   });

//   try {
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
//     Swal.fire("Error", "Gagal memperbarui produk. Pastikan kode unik tidak duplikat.", "error");
//   }
// };

const handleSubmit = async () => {
  Swal.fire({
    title: "Updating...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    let imageUrl = currentImage.value;
    let variantUrls = currentVariantImages.value;
    let videoUrl = currentVideo.value;

    /*
    ==========================
    MAIN IMAGE
    ==========================
    */
    if (form.value.image instanceof File) {
      imageUrl = await uploadToS3(form.value.image, "products");
    }

    /*
    ==========================
    VARIANT IMAGES
    ==========================
    */
    if (form.value.variant_images.length > 0) {
      variantUrls = [];

      for (const file of form.value.variant_images) {
        const url = await uploadToS3(file, "products/variants");
        variantUrls.push(url);
      }
    }

    /*
    ==========================
    VIDEO
    ==========================
    */
    if (form.value.variant_video instanceof File) {
      videoUrl = await uploadToS3(form.value.variant_video, "products/videos");
    }

    await axios.put(
      `${BASE_URL}/products/${productId}`,
      {
        ...form.value,
        image: imageUrl,
        variant_images: variantUrls,
        variant_video: videoUrl,
      },
      axiosConfig,
    );

    Swal.fire("Success", "Product Updated", "success");

    router.push("/admin/products");
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Update Failed", "error");
  }
};
</script> -->

<template>
  <div
    class="max-w-4xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl"
  >
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Edit Product</h1>
      <button
        @click="$router.back()"
        class="text-gray-500 transition hover:text-black"
      >
        Back
      </button>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <div class="space-y-6">
        <div>
          <label class="block mb-1 text-sm font-bold"
            >Product Name <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.name"
            type="text"
            class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold"
            >Product Code <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.code"
            type="text"
            class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold"
              >Original Price <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.price"
              type="number"
              class="w-full p-3 bg-gray-100 rounded-xl"
              required
            />
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold"
              >Discount Price (Optional)</label
            >
            <input
              v-model="form.discount_price"
              type="number"
              placeholder="Set if on sale"
              class="w-full p-3 bg-gray-100 rounded-xl"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <!-- <div>
            <label class="block mb-1 text-sm font-bold">Stock <span class="text-red-500">*</span></label>
            <input
              v-model="form.stock"
              type="number"
              class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            />
          </div> -->
          <div>
            <label class="block mb-1 text-sm font-bold"
              >Stock <span class="text-red-500">*</span></label
            >
            <div class="relative">
              <input
                v-model="form.stock"
                type="number"
                class="w-full p-3 text-gray-500 bg-gray-200 cursor-not-allowed rounded-xl"
                readonly
                title="Stock must be managed via Stock Management Menu"
              />
              <p
                class="text-[9px] text-gray-500 mt-1 uppercase tracking-widest font-bold"
              >
                ⚠️ Manage stock via Stock Menu
              </p>
            </div>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold"
              >Category <span class="text-red-500">*</span></label
            >
            <select
              v-model="form.category_id"
              class="w-full p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.category_name }}
              </option>
            </select>
          </div>
        </div>

        <div
          class="p-4 space-y-6 border border-gray-200 rounded-2xl bg-gray-50/50"
        >
          <div>
            <label class="block mb-1 text-sm font-bold">Main Image</label>
            <p class="text-[10px] text-gray-500 mb-2">
              Leave blank to keep current image.
            </p>
            <div class="flex items-center gap-4">
              <!-- <img
                v-if="currentImage"
                :src="currentImage"
                class="object-cover w-16 h-16 border rounded-lg shadow-sm"
                alt="Current Main Image"
              />
              <div
                v-else
                class="w-16 h-16 bg-gray-200 rounded-lg flex justify-center items-center text-[10px] text-gray-400"
              >
                No Img
              </div> -->

              <img
                :src="currentImage || defaultBagIcon"
                class="object-cover w-16 h-16 border rounded-lg shadow-sm"
                alt="Main Image Preview"
              />

              <input
                type="file"
                @change="handleFile"
                accept="image/*"
                class="flex-1 w-full text-sm"
              />
            </div>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <label class="block mb-1 text-sm font-bold"
              >Variant Images (Max 5)</label
            >
            <p class="text-[10px] text-gray-500 mb-2">
              Upload new files to REPLACE all current variant images.
            </p>

            <input
              type="file"
              @change="handleVariantImages"
              accept="image/*"
              multiple
              class="w-full mb-3 text-sm"
            />

            <div
              v-if="currentVariantImages && currentVariantImages.length > 0"
              class="mt-2"
            >
              <p
                class="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1"
              >
                Current Variants:
              </p>
              <div class="flex gap-2 pb-2 overflow-x-auto">
                <img
                  v-for="(img, idx) in currentVariantImages"
                  :key="idx"
                  :src="img"
                  class="object-cover w-12 h-12 border border-gray-300 rounded-lg shadow-sm shrink-0"
                />
              </div>
            </div>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <label class="block mb-1 text-sm font-bold"
              >Product Video (Max 5MB)</label
            >
            <p class="text-[10px] text-gray-500 mb-2">
              Upload new video to REPLACE the current one.
            </p>

            <input
              type="file"
              @change="handleVideo"
              accept="video/mp4,video/quicktime"
              class="w-full mb-3 text-sm"
            />

            <div
              v-if="currentVideo"
              class="flex items-center gap-2 px-3 py-2 mt-2 text-xs font-medium text-blue-700 border border-blue-100 rounded-lg bg-blue-50 w-fit"
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
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              Current Video Exists
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div
          class="col-span-1 p-6 mt-4 mb-2 border border-gray-200 md:col-span-2 rounded-2xl bg-gray-50/50"
        >
          <h3
            class="pb-2 mb-4 text-sm font-bold tracking-widest text-gray-800 uppercase border-b"
          >
            Physical Attributes
          </h3>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-5">
            <div>
              <label class="block mb-1 text-xs font-bold text-gray-600"
                >Weight (Grams) <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.weight"
                type="number"
                placeholder="e.g. 1000"
                class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                required
              />
            </div>
            <div class="mt-2 md:col-span-2">
              <label class="block mb-1 text-xs font-bold text-gray-600"
                >Strap Length (Optional)</label
              >
              <input
                v-model="form.strap_length"
                type="text"
                placeholder="e.g. 100 - 120 cm Adjustable"
                class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label class="block mb-1 text-xs font-bold text-gray-600"
                >Length (cm)</label
              >
              <input
                v-model="form.length"
                type="number"
                step="0.01"
                class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label class="block mb-1 text-xs font-bold text-gray-600"
                >Width (cm)</label
              >
              <input
                v-model="form.width"
                type="number"
                step="0.01"
                class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
              />
            </div>
            <div>
              <label class="block mb-1 text-xs font-bold text-gray-600"
                >Height (cm)</label
              >
              <input
                v-model="form.height"
                type="number"
                step="0.01"
                class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
              />
            </div>
            <div class="mt-2 md:col-span-5">
              <label class="block mb-1 text-xs font-bold text-gray-600"
                >Material (Optional)</label
              >
              <input
                v-model="form.material"
                type="text"
                placeholder="e.g. 100% Genuine Cowhide Leather"
                class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
              />
            </div>

            <div class="pt-4 mt-2 border-t border-gray-200 md:col-span-5">
              <label
                class="block mb-2 text-xs font-bold tracking-widest text-gray-600 uppercase"
                >Product Colors</label
              >

              <div
                class="flex items-center gap-3 p-3 mb-4 border border-gray-200 bg-gray-50 rounded-xl"
              >
                <div class="flex flex-col">
                  <label class="text-[10px] font-bold text-gray-500 mb-1"
                    >Pick Color</label
                  >
                  <input
                    type="color"
                    v-model="newColorHex"
                    class="w-10 h-10 p-0 bg-transparent border-0 rounded cursor-pointer"
                  />
                </div>
                <div class="flex flex-col flex-1">
                  <label class="text-[10px] font-bold text-gray-500 mb-1"
                    >Color Name</label
                  >
                  <input
                    type="text"
                    v-model="newColorName"
                    placeholder="e.g. Midnight Blue"
                    class="bg-white p-2.5 rounded-lg w-full text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-black"
                    @keyup.enter.prevent="addColor"
                  />
                </div>
                <div class="flex flex-col justify-end h-full mt-auto">
                  <button
                    type="button"
                    @click="addColor"
                    class="bg-black text-white px-4 py-2.5 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition"
                  >
                    Add
                  </button>
                </div>
              </div>

              <div
                class="flex flex-wrap gap-2 p-4 bg-white border border-gray-200 rounded-xl min-h-[60px]"
              >
                <p
                  v-if="parsedColors.length === 0"
                  class="w-full my-auto text-xs italic text-center text-gray-400"
                >
                  No colors added yet.
                </p>
                <div
                  v-for="(c, idx) in parsedColors"
                  :key="idx"
                  class="flex items-center gap-2 px-3 py-1.5 border border-gray-200 shadow-sm bg-gray-50 rounded-lg"
                >
                  <div
                    class="w-4 h-4 border border-gray-300 rounded-full"
                    :style="{ backgroundColor: c.hex }"
                  ></div>
                  <span class="text-xs font-bold text-gray-800">{{
                    c.name
                  }}</span>
                  <button
                    type="button"
                    @click="removeColor(idx)"
                    class="ml-1 font-bold text-gray-400 hover:text-red-500 focus:outline-none"
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
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <label class="block mb-1 text-sm font-bold">Description</label>
          <textarea
            v-model="form.description"
            class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <!-- <div>
          <label class="block mb-1 text-sm font-bold">Care Instructions</label>
          <textarea
            v-model="form.care"
            class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div> -->
        <div>
          <label class="block mb-1 text-sm font-bold">Design Details</label>
          <textarea
            v-model="form.design"
            class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </div>

      <div class="pt-4 md:col-span-2">
        <button
          type="submit"
          class="w-full p-4 font-bold text-white transition-all duration-300 bg-black shadow-lg hover:bg-gray-800 rounded-xl"
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
// import { uploadToS3 } from "../../utils/s3Upload.js";

// const router = useRouter();
// const route = useRoute();
// const productId = route.params.id;

// const categories = ref([]);

// // State Khusus Pratinjau (Data Murni dari DB)
// const currentImage = ref("");
// const currentVariantImages = ref([]);
// const currentVideo = ref("");

// // State Input Form (Hanya terisi jika admin MENGUNGGAH file BARU)
// const form = ref({
//   name: "",
//   code: "",
//   price: "",
//   discount_price: "",
//   stock: "",
//   category_id: "",
//   description: "",
//   care: "",
//   design: "",
//   image: null, // File object
//   variant_images: [], // Array File object
//   variant_video: null, // File object
// });

// const axiosConfig = {
//   headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
// };

// // Handlers untuk input file baru
// const handleFile = (e) => {
//   form.value.image = e.target.files[0];
// };

// const handleVariantImages = (e) => {
//   const files = Array.from(e.target.files);
//   if (files.length > 5) {
//     Swal.fire("Warning", "Maximum 5 variant images allowed", "warning");
//     e.target.value = "";
//     return;
//   }
//   form.value.variant_images = files;
// };

// const handleVideo = (e) => {
//   const file = e.target.files[0];
//   form.value.variant_video = file;
// };

// // Fungsi helper untuk mengisi form dari data produk
// const fillFormWithData = (p) => {
//   form.value.name = p.name;
//   form.value.code = p.code;
//   form.value.price = p.price;
//   form.value.discount_price = p.discount_price || "";
//   form.value.stock = p.stock;
//   form.value.category_id = p.category_id;
//   form.value.description = p.description;
//   form.value.care = p.care;
//   form.value.design = p.design;

//   // Set ke state pratinjau (BUKAN form.value.image, dll)
//   currentImage.value = p.image;
//   currentVariantImages.value = p.variant_images || [];
//   currentVideo.value = p.variant_video;
// };

// // onMounted(async () => {
// //   const stateData = window.history.state?.productData;

// //   if (stateData) {
// //     fillFormWithData(stateData);
// //   }

// //   try {
// //     const catRes = await axios.get(`${BASE_URL}/categories`, axiosConfig);
// //     categories.value = catRes.data.data;

// //     const prodRes = await axios.get(
// //       `${BASE_URL}/products/${productId}`,
// //       axiosConfig,
// //     );
// //     fillFormWithData(prodRes.data);
// //   } catch (error) {
// //     if (!stateData) {
// //       Swal.fire("Error", "Gagal mengambil data produk.", "error");
// //     }
// //   }
// // });

// onMounted(async () => {
//   // 1. TANGKAP DATA STATE INSTAN (OPTISTIC UI)
//   const stateDataStr = window.history.state?.productData;
//   let stateData = null;

//   if (stateDataStr) {
//     try {
//       stateData = JSON.parse(stateDataStr);
//       // Langsung isi form detik itu juga tanpa delay API
//       fillFormWithData(stateData);
//     } catch (e) {
//       console.error("Gagal parsing state data", e);
//     }
//   }

//   // 2. FETCH KATEGORI (Tetap diperlukan untuk mengisi Dropdown Option)
//   try {
//     const catRes = await axios.get(`${BASE_URL}/categories`, axiosConfig);
//     categories.value = catRes.data.data;

//     // 3. BACKGROUND FETCH (Self-Healing)
//     // Walaupun data sudah muncul secara instan, kita tetap tembak API secara diam-diam (background)
//     // untuk memastikan jika ada admin lain yang mengedit data ini 1 detik yang lalu,
//     // data yang sedang kita edit adalah data yang paling mutakhir (sinkronisasi).
//     const prodRes = await axios.get(
//       `${BASE_URL}/products/${productId}`,
//       axiosConfig,
//     );

//     // Timpa form dengan data paling fresh dari database (biasanya sangat cepat dan user tidak akan sadar)
//     fillFormWithData(prodRes.data);
//   } catch (error) {
//     if (!stateData) {
//       Swal.fire("Error", "Gagal mengambil data produk.", "error");
//     }
//   }
// });

// const handleSubmit = async () => {
//   Swal.fire({
//     title: "Updating...",
//     allowOutsideClick: false,
//     didOpen: () => Swal.showLoading(),
//   });

//   try {
//     let imageUrl = currentImage.value;
//     let variantUrls = currentVariantImages.value;
//     let videoUrl = currentVideo.value;

//     /*
//     ==========================
//     MAIN IMAGE
//     ==========================
//     */
//     if (form.value.image instanceof File) {
//       imageUrl = await uploadToS3(form.value.image, "products");
//     }

//     /*
//     ==========================
//     VARIANT IMAGES
//     ==========================
//     */
//     if (form.value.variant_images.length > 0) {
//       variantUrls = [];

//       for (const file of form.value.variant_images) {
//         const url = await uploadToS3(file, "products/variants");
//         variantUrls.push(url);
//       }
//     }

//     /*
//     ==========================
//     VIDEO
//     ==========================
//     */
//     if (form.value.variant_video instanceof File) {
//       videoUrl = await uploadToS3(form.value.variant_video, "products/videos");
//     }

//     await axios.put(
//       `${BASE_URL}/products/${productId}`,
//       {
//         ...form.value,
//         image: imageUrl,
//         variant_images: variantUrls,
//         variant_video: videoUrl,
//       },
//       axiosConfig,
//     );

//     Swal.fire("Success", "Product Updated", "success");

//     router.push("/admin/products");
//   } catch (err) {
//     console.error(err);
//     Swal.fire("Error", "Update Failed", "error");
//   }
// };

import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

// [BARU] Import gambar default
import defaultBagIcon from "../../assets/products/bag_icon.jpg";

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const categories = ref([]);

const currentImage = ref("");
const currentVariantImages = ref([]);
const currentVideo = ref("");

const form = ref({
  name: "",
  code: "",
  price: "",
  discount_price: "",
  stock: "",
  category_id: "",
  description: "",
  // care: "",
  design: "",
  image: null,
  variant_images: [],
  variant_video: null,
  weight: "",
  length: "",
  width: "",
  height: "",
  material: "",
  strap_length: "", // <--- BARU
  color: [],
});

// // [BARU] Daftar Warna Standar
// const colorOptions = [
//   { name: "Black", hex: "#000000" },
//   { name: "White", hex: "#FFFFFF" },
//   { name: "Brown", hex: "#8B4513" },
//   { name: "Beige", hex: "#F5F5DC" },
//   { name: "Red", hex: "#DC143C" },
//   { name: "Navy", hex: "#000080" },
//   { name: "Green", hex: "#008000" },
//   { name: "Grey", hex: "#808080" },
//   { name: "Pink", hex: "#FFC0CB" },
//   { name: "Yellow", hex: "#FFD700" },
//   { name: "Blue", hex: "#4169E1" },
// ];

// [BARU] Daftar Warna Standar
// const colorOptions = [
//   { name: "Black", hex: "#000000" },
//   { name: "White", hex: "#FFFFFF" },
//   { name: "Brown", hex: "#8B4513" },
//   { name: "Beige", hex: "#F5F5DC" },
//   { name: "Red", hex: "#DC143C" },
//   { name: "Navy", hex: "#000080" },
//   { name: "Green", hex: "#008000" },
//   { name: "Grey", hex: "#808080" },
//   { name: "Pink", hex: "#FFC0CB" },
//   { name: "Yellow", hex: "#FFD700" },
//   { name: "Blue", hex: "#4169E1" },
//   { name: "Cream", hex: "#FFFDD0" }, // <--- Warna Baru
//   { name: "Sage", hex: "#9DC183" },  // <--- Warna Baru
//   { name: "Mocca", hex: "#967969" }, // <--- WARNA BARU
// ];

// const isColorDropdownOpen = ref(false);

// const toggleColorDropdown = () => {
//   isColorDropdownOpen.value = !isColorDropdownOpen.value;
// };

// // const selectColor = (colorName) => {
// //   form.value.color = colorName;
// //   isColorDropdownOpen.value = false;
// // };

// // 2. Ubah fungsi selectColor menjadi toggle (bisa tambah/hapus)
// const selectColor = (colorName) => {
//   // Jika "None" dipilih, kosongkan semua
//   if (colorName === "") {
//     form.value.color = [];
//     isColorDropdownOpen.value = false;
//     return;
//   }

//   // Jika warna sudah ada, hapus. Jika belum, tambahkan.
//   const index = form.value.color.indexOf(colorName);
//   if (index > -1) {
//     form.value.color.splice(index, 1);
//   } else {
//     form.value.color.push(colorName);
//   }
//   // Catatan: isColorDropdownOpen tidak di-false-kan agar admin bisa pilih warna lain sekaligus
// };

// [BARU] State untuk Dynamic Color
const newColorName = ref("");
const newColorHex = ref("#000000");

const parsedColors = computed(() => {
  return form.value.color.map((c) => {
    if (typeof c === "string" && c.includes("|")) {
      const [name, hex] = c.split("|");
      return { name, hex, original: c };
    }
    // Fallback aman untuk data lama yang sudah ada di database
    return { name: c, hex: "#cccccc", original: c };
  });
});

const addColor = () => {
  if (!newColorName.value.trim()) return;
  // Format penyimpanan rahasia ke backend: "NamaWarna|#HexCode"
  const colorString = `${newColorName.value.trim()}|${newColorHex.value}`;
  if (!form.value.color.includes(colorString)) {
    form.value.color.push(colorString);
  }
  newColorName.value = "";
  newColorHex.value = "#000000";
};

const removeColor = (index) => {
  form.value.color.splice(index, 1);
};

const axiosConfig = {
  headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
};

const handleFile = (e) => {
  form.value.image = e.target.files[0];
};

const handleVariantImages = (e) => {
  const files = Array.from(e.target.files);
  if (files.length > 5) {
    Swal.fire("Warning", "Maximum 5 variant images allowed", "warning");
    e.target.value = "";
    return;
  }
  form.value.variant_images = files;
};

const handleVideo = (e) => {
  form.value.variant_video = e.target.files[0];
};

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
  form.value.weight = p.weight;
  form.value.length = p.length;
  form.value.width = p.width;
  form.value.height = p.height;
  form.value.material = p.material;
  form.value.strap_length = p.strap_length; // <--- BARU
  // form.value.color = p.color;
  form.value.color = Array.isArray(p.color) ? p.color : [];

  currentImage.value = p.image;
  currentVariantImages.value = p.variant_images || [];
  currentVideo.value = p.variant_video;
};

// onMounted(async () => {
//   const stateDataStr = window.history.state?.productData;
//   let stateData = null;

//   if (stateDataStr) {
//     try {
//       stateData = JSON.parse(stateDataStr);
//       fillFormWithData(stateData);
//     } catch (e) {
//       console.error("Gagal parsing state data", e);
//     }
//   }

//   try {
//     const catRes = await axios.get(`${BASE_URL}/categories`, axiosConfig);
//     categories.value = catRes.data.data;

//     const prodRes = await axios.get(
//       `${BASE_URL}/products/${productId}`,
//       axiosConfig,
//     );
//     fillFormWithData(prodRes.data);
//   } catch (error) {
//     if (!stateData) {
//       Swal.fire("Error", "Gagal mengambil data produk.", "error");
//     }
//   }
// });

onMounted(async () => {
  // [PERBAIKAN] Ambil data langsung dari history state tanpa JSON.parse
  const stateData = window.history.state?.productData;

  if (stateData) {
    fillFormWithData(stateData);
  }

  try {
    const catRes = await axios.get(`${BASE_URL}/categories`, axiosConfig);
    categories.value = catRes.data.data;

    const prodRes = await axios.get(`${BASE_URL}/products/${productId}`, axiosConfig);
    fillFormWithData(prodRes.data);
  } catch (error) {
    if (!stateData) {
      Swal.fire("Error", "Gagal mengambil data produk.", "error");
    }
  }
});

const handleSubmit = async () => {
  Swal.fire({
    title: "Updating...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    let formData = new FormData();
    // Penting di Laravel jika ingin PUT lewat FormData
    formData.append("_method", "PUT");

    formData.append("name", form.value.name);
    formData.append("code", form.value.code);
    formData.append("price", form.value.price);
    formData.append("category_id", form.value.category_id);
    formData.append("description", form.value.description || "");
    // formData.append("care", form.value.care || "");
    formData.append("design", form.value.design || "");

    formData.append("weight", form.value.weight);
    if (form.value.length) formData.append("length", form.value.length);
    if (form.value.width) formData.append("width", form.value.width);
    if (form.value.height) formData.append("height", form.value.height);
    if (form.value.material) formData.append("material", form.value.material);
    if (form.value.strap_length)
      formData.append("strap_length", form.value.strap_length); // <--- BARU
    if (form.value.strap_length)
      formData.append("strap_length", form.value.strap_length); // <--- BARU
    // formData.append("color", form.value.color || "");
    // [BARU] Cara mengirim Array Color ke Laravel
    if (form.value.color && form.value.color.length > 0) {
      form.value.color.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    }

    if (form.value.discount_price) {
      formData.append("discount_price", form.value.discount_price);
    }

    if (form.value.image instanceof File) {
      formData.append("image", form.value.image);
    }

    if (form.value.variant_images.length > 0) {
      form.value.variant_images.forEach((file, index) => {
        formData.append(`variant_images[${index}]`, file);
      });
    }

    if (form.value.variant_video instanceof File) {
      formData.append("variant_video", form.value.variant_video);
    }

    await axios.post(`${BASE_URL}/products/${productId}`, formData, {
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    Swal.fire("Success", "Product Updated", "success");
    router.push("/admin/products");
  } catch (error) {
    let errorMsg = "Update Failed";
    if (error.response && error.response.data) {
      errorMsg = Object.values(error.response.data).flat().join("<br>");
    }
    Swal.fire("Error", errorMsg, "error");
  }
};
</script>
