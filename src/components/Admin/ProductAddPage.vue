<!-- <template>
  <div class="bg-white shadow-sm mx-auto p-8 rounded-2xl max-w-4xl">
    <h1 class="mb-8 font-bold text-2xl">Add New Product</h1>
    <form
      @submit.prevent="handleSubmit"
      class="gap-6 grid grid-cols-1 md:grid-cols-2"
    >
      <div class="space-y-4">
        <input
          v-model="form.name"
          placeholder="Product Name"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        />
        <input
          v-model="form.code"
          placeholder="Product Code (Unique)"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        />
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
        <input
          v-model="form.stock"
          type="number"
          placeholder="Stock Amount"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        />
        <select
          v-model="form.category_id"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        >
          <option value="" disabled>Select Category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.category_name }}
          </option>
        </select>
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
      </div>
      <div class="space-y-4">
        <textarea
          v-model="form.description"
          placeholder="Description"
          class="bg-gray-100 p-3 rounded-xl w-full h-24"
        ></textarea>
        <textarea
          v-model="form.care"
          placeholder="Care Instructions"
          class="bg-gray-100 p-3 rounded-xl w-full h-24"
        ></textarea>
        <textarea
          v-model="form.design"
          placeholder="Design Details"
          class="bg-gray-100 p-3 rounded-xl w-full h-24"
        ></textarea>
      </div>
      <div class="md:col-span-2">
        <button
          type="submit"
          class="bg-black hover:bg-gray-800 p-4 rounded-xl w-full font-bold text-white transition"
        >
          Save Product
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import { uploadToS3 } from "../../utils/s3Upload.js";

const router = useRouter();
const categories = ref([]);
const form = ref({
  name: "",
  code: "",
  price: "",
  stock: "",
  category_id: "",
  description: "",
  care: "",
  design: "",
  image: null,
  variant_images: [],
  variant_video: null,
});

const handleFile = (e) => (form.value.image = e.target.files[0]);

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

// const handleSubmit = async () => {
//   const formData = new FormData();
//   Object.keys(form.value).forEach((key) => {
//     // formData.append(key, form.value[key]),
//     if (key === "variant_images") {
//       form.value.variant_images.forEach((file) =>
//         formData.append("variant_images[]", file),
//       );
//     } else if (key === "variant_video") {
//       if (form.value[key]) {
//         formData.append(key, form.value[key]);
//       }
//     } else if (form.value[key] !== null) {
//       formData.append(key, form.value[key]);
//     }
//   });

//   try {
//     await axios.post(`${BASE_URL}/products`, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${localStorage.getItem("token")}`,
//       },
//     });
//     Swal.fire("Success", "Product Added", "success");
//     router.push("/admin/products");
//   } catch (e) {
//     Swal.fire("Error", "Check Duplicate Code", "error");
//   }
// };

const handleSubmit = async () => {
  Swal.fire({ title: "Uploading...", allowOutsideClick: false });
  Swal.showLoading();

  try {
    // upload main image
    const imageUrl = await uploadToS3(form.value.image, "products");

    // variant images
    let variantUrls = [];

    for (const file of form.value.variant_images) {
      const url = await uploadToS3(file, "products/variants");
      variantUrls.push(url);
    }

    // video
    let videoUrl = null;

    if (form.value.variant_video) {
      videoUrl = await uploadToS3(form.value.variant_video, "products/videos");
    }

    await axios.post(
      `${BASE_URL}/products`,
      {
        ...form.value,
        image: imageUrl,
        variant_images: variantUrls,
        variant_video: videoUrl,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
          Accept: "application/json",
        },
      },
    );

    Swal.fire("Success", "Product Added", "success");
    router.push("/admin/products");
  } catch (e) {
    Swal.fire("Upload Failed", "", "error");
  }
};

onMounted(async () => {
  const res = await axios.get(`${BASE_URL}/categories`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
  });
  categories.value = res.data.data;
});
</script> -->

<template>
  <div class="bg-white shadow-sm mx-auto p-8 rounded-2xl max-w-4xl">
    <h1 class="mb-8 font-bold text-2xl">Add New Product</h1>
    <form
      @submit.prevent="handleSubmit"
      class="gap-6 grid grid-cols-1 md:grid-cols-2"
    >
      <div class="space-y-4">
        <div>
          <label class="block mb-1 font-bold text-sm"
            >Product Name <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.name"
            placeholder="Product Name"
            class="bg-gray-100 p-3 rounded-xl w-full"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-bold text-sm"
            >Product Code (Unique) <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.code"
            placeholder="Product Code"
            class="bg-gray-100 p-3 rounded-xl w-full"
            required
          />
        </div>

        <div class="gap-4 grid grid-cols-2">
          <div>
            <label class="block mb-1 font-bold text-sm"
              >Original Price <span class="text-red-500">*</span></label
            >
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
          <label class="block mb-1 font-bold text-sm"
            >Stock <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.stock"
            type="number"
            placeholder="Stock Amount"
            class="bg-gray-100 p-3 rounded-xl w-full"
            required
          />
        </div>

        <div>
          <label class="block mb-1 font-bold text-sm"
            >Category <span class="text-red-500">*</span></label
          >
          <select
            v-model="form.category_id"
            class="bg-gray-100 p-3 rounded-xl w-full"
            required
          >
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.category_name }}
            </option>
          </select>
        </div>

        <!-- <div>
          <label class="block mb-1 font-bold text-sm"
            >Main Image <span class="text-red-500">*</span></label
          >
          <input
            type="file"
            @change="handleFile"
            accept="image/*"
            class="w-full text-sm"
            required
          />
        </div> -->

        <div>
          <label class="block mb-1 font-bold text-sm"
            >Main Image (Optional)</label
          >
          <input
            type="file"
            @change="handleFile"
            accept="image/*"
            class="w-full text-sm"
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
      </div>

      <div class="space-y-4">
        <!-- <div
        class="col-span-1 md:col-span-2 p-6 border border-gray-200 rounded-2xl bg-gray-50/50 mt-4 mb-2"
      >
        <h3
          class="font-bold text-gray-800 text-sm mb-4 uppercase tracking-widest border-b pb-2"
        >
          Physical Attributes
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <div>
            <label class="block mb-1 font-bold text-xs text-gray-600"
              >Weight (Grams) <span class="text-red-500">*</span></label
            >
            <input
              v-model="form.weight"
              type="number"
              placeholder="e.g. 1000"
              class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
              required
            />
          </div>
          <div>
            <label class="block mb-1 font-bold text-xs text-gray-600"
              >Length (cm)</label
            >
            <input
              v-model="form.length"
              type="number"
              step="0.01"
              placeholder="e.g. 25.5"
              class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
            />
          </div>
          <div>
            <label class="block mb-1 font-bold text-xs text-gray-600"
              >Width (cm)</label
            >
            <input
              v-model="form.width"
              type="number"
              step="0.01"
              placeholder="e.g. 10"
              class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
            />
          </div>
          <div>
            <label class="block mb-1 font-bold text-xs text-gray-600"
              >Height (cm)</label
            >
            <input
              v-model="form.height"
              type="number"
              step="0.01"
              placeholder="e.g. 15"
              class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
            />
          </div>
          <div class="md:col-span-4 mt-2">
            <label class="block mb-1 font-bold text-xs text-gray-600"
              >Material (Optional)</label
            >
            <input
              v-model="form.material"
              type="text"
              placeholder="e.g. 100% Genuine Cowhide Leather"
              class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
            />
          </div>
        </div>
      </div> -->
        <div
          class="col-span-1 md:col-span-2 p-6 border border-gray-200 rounded-2xl bg-gray-50/50 mt-4 mb-2"
        >
          <h3
            class="font-bold text-gray-800 text-sm mb-4 uppercase tracking-widest border-b pb-2"
          >
            Physical Attributes
          </h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            <div>
              <label class="block mb-1 font-bold text-xs text-gray-600"
                >Weight (Grams) <span class="text-red-500">*</span></label
              >
              <input
                v-model="form.weight"
                type="number"
                placeholder="e.g. 1000"
                class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
                required
              />
            </div>
            <div class="md:col-span-2 mt-2">
              <label class="block mb-1 font-bold text-xs text-gray-600"
                >Strap Length (Optional)</label
              >
              <input
                v-model="form.strap_length"
                type="text"
                placeholder="e.g. 100 - 120 cm Adjustable"
                class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
              />
            </div>
            <div>
              <label class="block mb-1 font-bold text-xs text-gray-600"
                >Length (cm)</label
              >
              <input
                v-model="form.length"
                type="number"
                step="0.01"
                class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
              />
            </div>
            <div>
              <label class="block mb-1 font-bold text-xs text-gray-600"
                >Width (cm)</label
              >
              <input
                v-model="form.width"
                type="number"
                step="0.01"
                class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
              />
            </div>
            <div>
              <label class="block mb-1 font-bold text-xs text-gray-600"
                >Height (cm)</label
              >
              <input
                v-model="form.height"
                type="number"
                step="0.01"
                class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
              />
            </div>

            <!-- <div class="relative">
              <label class="block mb-1 font-bold text-xs text-gray-600"
                >Color</label
              >
              <div
                @click="toggleColorDropdown"
                class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm cursor-pointer flex justify-between items-center"
              >
                <div class="flex items-center gap-2">
                  <div
                    v-if="form.color"
                    class="w-4 h-4 rounded-full border border-gray-300 shadow-sm"
                    :style="{
                      backgroundColor:
                        colorOptions.find((c) => c.name === form.color)?.hex ||
                        '#ccc',
                    }"
                  ></div>
                  <span :class="form.color ? 'text-gray-900' : 'text-gray-400'">
                    {{ form.color || "Select Color" }}
                  </span>
                </div>
                <span class="text-gray-400 text-xs">▼</span>
              </div>

              <div
                v-if="isColorDropdownOpen"
                class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto"
              >
                <div
                  @click="selectColor('')"
                  class="p-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-500 border-b border-gray-100"
                >
                  None / Unspecified
                </div>
                <div
                  v-for="color in colorOptions"
                  :key="color.name"
                  @click="selectColor(color.name)"
                  class="p-3 hover:bg-gray-50 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-0"
                >
                  <div
                    class="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
                    :style="{ backgroundColor: color.hex }"
                  ></div>
                  <span class="text-sm font-medium text-gray-700">{{
                    color.name
                  }}</span>
                </div>
              </div>
            </div> -->
            <div class="relative">
              <label class="block mb-1 font-bold text-xs text-gray-600">Colors</label>
              <div 
                @click="toggleColorDropdown"
                class="bg-white p-3 rounded-xl w-full border border-gray-200 min-h-[46px] text-sm cursor-pointer flex justify-between items-center"
              >
                <div class="flex flex-wrap items-center gap-2">
                  <template v-if="form.color.length > 0">
                    <div 
                      v-for="(selColor, idx) in form.color" :key="idx"
                      class="w-5 h-5 rounded-full border border-gray-300 shadow-sm"
                      :style="{ backgroundColor: colorOptions.find(c => c.name === selColor)?.hex || '#ccc' }"
                      :title="selColor"
                    ></div>
                  </template>
                  <span v-else class="text-gray-400">Select Colors</span>
                </div>
                <span class="text-gray-400 text-xs">▼</span>
              </div>

              <div 
                v-if="isColorDropdownOpen" 
                class="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-56 overflow-y-auto"
              >
                <div 
                  @click="selectColor('')"
                  class="p-3 hover:bg-red-50 cursor-pointer text-sm font-bold text-red-500 border-b border-gray-100 flex items-center justify-center"
                >
                  Clear All Colors
                </div>
                <div 
                  v-for="color in colorOptions" 
                  :key="color.name"
                  @click="selectColor(color.name)"
                  class="p-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center border-b border-gray-50 last:border-0 transition-colors"
                  :class="form.color.includes(color.name) ? 'bg-blue-50/50' : ''"
                >
                  <div class="flex items-center gap-3">
                    <div 
                      class="w-5 h-5 rounded-full border border-gray-300 shadow-sm" 
                      :style="{ backgroundColor: color.hex }"
                    ></div>
                    <span class="text-sm font-medium" :class="form.color.includes(color.name) ? 'text-blue-700' : 'text-gray-700'">
                      {{ color.name }}
                    </span>
                  </div>
                  <svg v-if="form.color.includes(color.name)" class="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
            <div class="md:col-span-5 mt-2">
              <label class="block mb-1 font-bold text-xs text-gray-600"
                >Material (Optional)</label
              >
              <input
                v-model="form.material"
                type="text"
                placeholder="e.g. 100% Genuine Cowhide Leather"
                class="bg-white p-3 rounded-xl w-full border border-gray-200 text-sm"
              />
            </div>
          </div>
        </div>
        <div>
          <label class="block mb-1 font-bold text-sm">Description</label>
          <textarea
            v-model="form.description"
            placeholder="Description"
            class="bg-gray-100 p-3 rounded-xl w-full h-24"
          ></textarea>
        </div>
        <!-- <div>
          <label class="block mb-1 font-bold text-sm">Care Instructions</label>
          <textarea
            v-model="form.care"
            placeholder="Care Instructions"
            class="bg-gray-100 p-3 rounded-xl w-full h-24"
          ></textarea>
        </div> -->
        <div>
          <label class="block mb-1 font-bold text-sm">Design Details</label>
          <textarea
            v-model="form.design"
            placeholder="Design Details"
            class="bg-gray-100 p-3 rounded-xl w-full h-24"
          ></textarea>
        </div>
      </div>

      <div class="md:col-span-2 pt-2">
        <button
          type="submit"
          class="bg-black hover:bg-gray-800 p-4 rounded-xl w-full font-bold text-white transition"
        >
          Save Product
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
// import { ref, onMounted } from "vue";
// import axios from "axios";
// import { useRouter } from "vue-router";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../../config/api.js";
// import { uploadToS3 } from "../../utils/s3Upload.js";

// const router = useRouter();
// const categories = ref([]);
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
//   variant_images: [],
//   variant_video: null,
// });

// const handleFile = (e) => (form.value.image = e.target.files[0]);

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

// const handleSubmit = async () => {
//   Swal.fire({ title: "Uploading...", allowOutsideClick: false });
//   Swal.showLoading();

//   try {
//     // upload main image
//     const imageUrl = await uploadToS3(form.value.image, "products");

//     // variant images
//     let variantUrls = [];

//     for (const file of form.value.variant_images) {
//       const url = await uploadToS3(file, "products/variants");
//       variantUrls.push(url);
//     }

//     // video
//     let videoUrl = null;

//     if (form.value.variant_video) {
//       videoUrl = await uploadToS3(form.value.variant_video, "products/videos");
//     }

//     await axios.post(
//       `${BASE_URL}/products`,
//       {
//         ...form.value,
//         image: imageUrl,
//         variant_images: variantUrls,
//         variant_video: videoUrl,
//       },
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
//           Accept: "application/json",
//         },
//       },
//     );

//     Swal.fire("Success", "Product Added", "success");
//     router.push("/admin/products");
//   } catch (e) {
//     Swal.fire("Upload Failed", "", "error");
//   }
// };

// onMounted(async () => {
//   const res = await axios.get(`${BASE_URL}/categories`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
//   });
//   categories.value = res.data.data;
// });

import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

const router = useRouter();
const categories = ref([]);
const form = ref({
  name: "",
  code: "",
  price: "",
  stock: "",
  category_id: "",
  // [BARU] Atribut Fisik
  weight: 1000,
  length: "",
  width: "",
  height: "",
  material: "",
  strap_length: "", // <--- BARU
  color: [],
  description: "",
  // care: "",
  design: "",
  image: null,
  variant_images: [],
  variant_video: null,
  discount_price: "",
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
const colorOptions = [
  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
  { name: "Brown", hex: "#8B4513" },
  { name: "Beige", hex: "#F5F5DC" },
  { name: "Red", hex: "#DC143C" },
  { name: "Navy", hex: "#000080" },
  { name: "Green", hex: "#008000" },
  { name: "Grey", hex: "#808080" },
  { name: "Pink", hex: "#FFC0CB" },
  { name: "Yellow", hex: "#FFD700" },
  { name: "Blue", hex: "#4169E1" },
  { name: "Cream", hex: "#FFFDD0" }, // <--- Warna Baru
  { name: "Sage", hex: "#9DC183" },  // <--- Warna Baru
];

const isColorDropdownOpen = ref(false);

const toggleColorDropdown = () => {
  isColorDropdownOpen.value = !isColorDropdownOpen.value;
};

// const selectColor = (colorName) => {
//   form.value.color = colorName;
//   isColorDropdownOpen.value = false;
// };

// 2. Ubah fungsi selectColor menjadi toggle (bisa tambah/hapus)
const selectColor = (colorName) => {
  // Jika "None" dipilih, kosongkan semua
  if (colorName === "") {
    form.value.color = [];
    isColorDropdownOpen.value = false;
    return;
  }

  // Jika warna sudah ada, hapus. Jika belum, tambahkan.
  const index = form.value.color.indexOf(colorName);
  if (index > -1) {
    form.value.color.splice(index, 1);
  } else {
    form.value.color.push(colorName);
  }
  // Catatan: isColorDropdownOpen tidak di-false-kan agar admin bisa pilih warna lain sekaligus
};

const handleFile = (e) => (form.value.image = e.target.files[0]);

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
  form.value.variant_video = file;
};

const handleSubmit = async () => {
  Swal.fire({
    title: "Uploading...",
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
  });

  try {
    // Gunakan FormData untuk mengirim file
    let formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("code", form.value.code);
    formData.append("price", form.value.price);
    formData.append("stock", form.value.stock);
    formData.append("category_id", form.value.category_id);
    // [BARU] Append Atribut Fisik
    formData.append("weight", form.value.weight);
    if (form.value.length) formData.append("length", form.value.length);
    if (form.value.width) formData.append("width", form.value.width);
    if (form.value.height) formData.append("height", form.value.height);
    if (form.value.material) formData.append("material", form.value.material);
    // [BARU] Cara mengirim Array Color ke Laravel
    if (form.value.color && form.value.color.length > 0) {
      form.value.color.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    }
    formData.append("description", form.value.description);
    formData.append("care", form.value.care);
    formData.append("design", form.value.design);

    if (form.value.discount_price) {
      formData.append("discount_price", form.value.discount_price);
    }

    // if (form.value.image) {
    //   formData.append("image", form.value.image);
    // } else {
    //   throw new Error("Main image is required");
    // }

    if (form.value.image) {
      formData.append("image", form.value.image);
    }
    // else block dihapus, sehingga form tetap terkirim meskipun image tidak ada

    if (form.value.variant_images.length > 0) {
      form.value.variant_images.forEach((file, index) => {
        formData.append(`variant_images[${index}]`, file);
      });
    }

    if (form.value.variant_video) {
      formData.append("variant_video", form.value.variant_video);
    }

    await axios.post(`${BASE_URL}/products`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
      },
    });

    Swal.fire("Success", "Product Added", "success");
    router.push("/admin/products");
  } catch (error) {
    let errorMsg = "Upload Failed";
    if (error.response && error.response.data) {
      errorMsg = Object.values(error.response.data).flat().join("<br>");
    } else if (error.message) {
      errorMsg = error.message;
    }
    Swal.fire("Error", errorMsg, "error");
  }
};

onMounted(async () => {
  const res = await axios.get(`${BASE_URL}/categories`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
  });
  categories.value = res.data.data;
});
</script>
