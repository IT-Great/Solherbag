<template>
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
        <!-- <input
          v-model="form.price"
          type="number"
          placeholder="Price"
          class="bg-gray-100 p-3 rounded-xl w-full"
          required
        /> -->
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
        <!-- <input type="file" @change="handleFile" class="w-full" /> -->
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
  if (file && file.size > 5 * 1024 * 1024) {
    Swal.fire("Warning", "Video must be less than 5MB", "warning");
    e.target.value = "";
    return;
  }
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
        },
      },
    );

    Swal.fire("Success", "Product Added", "success");
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
</script>
