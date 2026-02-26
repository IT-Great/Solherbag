<!-- <template>
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
          <div>
            <label class="block mb-1 font-bold text-sm"
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
            <label class="block mb-1 font-bold text-sm"
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
            <label class="block mb-1 font-bold text-sm"
              >Product Video (Max 5MB)</label
            >
            <input
              type="file"
              @change="handleVideo"
              accept="video/mp4,video/quicktime"
              class="w-full text-sm"
            />
          </div>
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
      <div class="space-y-6">
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

        <div class="gap-4 grid grid-cols-2">
          <div>
            <label class="block mb-1 font-bold text-sm">Stock</label>
            <input
              v-model="form.stock"
              type="number"
              class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full"
              required
            />
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
        </div>

        <div
          class="p-4 border border-gray-200 rounded-2xl bg-gray-50/50 space-y-6"
        >
          <div>
            <label class="block mb-1 font-bold text-sm">Main Image</label>
            <p class="text-[10px] text-gray-500 mb-2">
              Leave blank to keep current image.
            </p>
            <div class="flex items-center gap-4">
              <img
                v-if="currentImage"
                :src="currentImage"
                class="w-16 h-16 object-cover rounded-lg border shadow-sm"
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
                class="w-full text-sm flex-1"
              />
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <label class="block mb-1 font-bold text-sm"
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
              class="w-full text-sm mb-3"
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
              <div class="flex gap-2 overflow-x-auto pb-2">
                <img
                  v-for="(img, idx) in currentVariantImages"
                  :key="idx"
                  :src="img"
                  class="w-12 h-12 object-cover rounded-lg border border-gray-300 shadow-sm shrink-0"
                />
              </div>
            </div>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <label class="block mb-1 font-bold text-sm"
              >Product Video (Max 5MB)</label
            >
            <p class="text-[10px] text-gray-500 mb-2">
              Upload new video to REPLACE the current one.
            </p>

            <input
              type="file"
              @change="handleVideo"
              accept="video/mp4,video/quicktime"
              class="w-full text-sm mb-3"
            />

            <div
              v-if="currentVideo"
              class="mt-2 flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-xs font-medium border border-blue-100 w-fit"
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
          <label class="block mb-1 font-bold text-sm">Description</label>
          <textarea
            v-model="form.description"
            class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full h-32"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1 font-bold text-sm">Care Instructions</label>
          <textarea
            v-model="form.care"
            class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full h-32"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1 font-bold text-sm">Design Details</label>
          <textarea
            v-model="form.design"
            class="bg-gray-100 p-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full h-32"
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
</script>
