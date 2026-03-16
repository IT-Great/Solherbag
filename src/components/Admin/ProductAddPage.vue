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

        <div>
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
        <div>
          <label class="block mb-1 font-bold text-sm">Description</label>
          <textarea
            v-model="form.description"
            placeholder="Description"
            class="bg-gray-100 p-3 rounded-xl w-full h-24"
          ></textarea>
        </div>
        <div>
          <label class="block mb-1 font-bold text-sm">Care Instructions</label>
          <textarea
            v-model="form.care"
            placeholder="Care Instructions"
            class="bg-gray-100 p-3 rounded-xl w-full h-24"
          ></textarea>
        </div>
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
  description: "",
  care: "",
  design: "",
  image: null,
  variant_images: [],
  variant_video: null,
  discount_price: ""
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
  form.value.variant_video = file;
};

const handleSubmit = async () => {
  Swal.fire({ title: "Uploading...", allowOutsideClick: false, didOpen: () => Swal.showLoading() });

  try {
    // Gunakan FormData untuk mengirim file
    let formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("code", form.value.code);
    formData.append("price", form.value.price);
    formData.append("stock", form.value.stock);
    formData.append("category_id", form.value.category_id);
    formData.append("description", form.value.description);
    formData.append("care", form.value.care);
    formData.append("design", form.value.design);
    
    if(form.value.discount_price) {
        formData.append("discount_price", form.value.discount_price);
    }

    if (form.value.image) {
      formData.append("image", form.value.image);
    } else {
      throw new Error("Main image is required");
    }

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
        errorMsg = Object.values(error.response.data).flat().join('<br>');
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
