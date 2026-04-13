<!-- <template>
  <div class="max-w-4xl p-8 mx-auto bg-white shadow-sm rounded-2xl">
    <h1 class="mb-8 text-2xl font-bold">Add New Product</h1>
    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <div class="space-y-4">
        <input
          v-model="form.name"
          placeholder="Product Name"
          class="w-full p-3 bg-gray-100 rounded-xl"
          required
        />
        <input
          v-model="form.code"
          placeholder="Product Code (Unique)"
          class="w-full p-3 bg-gray-100 rounded-xl"
          required
        />
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
        <input
          v-model="form.stock"
          type="number"
          placeholder="Stock Amount"
          class="w-full p-3 bg-gray-100 rounded-xl"
          required
        />
        <select
          v-model="form.category_id"
          class="w-full p-3 bg-gray-100 rounded-xl"
          required
        >
          <option value="" disabled>Select Category</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.category_name }}
          </option>
        </select>
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
      </div>
      <div class="space-y-4">
        <textarea
          v-model="form.description"
          placeholder="Description"
          class="w-full h-24 p-3 bg-gray-100 rounded-xl"
        ></textarea>
        <textarea
          v-model="form.care"
          placeholder="Care Instructions"
          class="w-full h-24 p-3 bg-gray-100 rounded-xl"
        ></textarea>
        <textarea
          v-model="form.design"
          placeholder="Design Details"
          class="w-full h-24 p-3 bg-gray-100 rounded-xl"
        ></textarea>
      </div>
      <div class="md:col-span-2">
        <button
          type="submit"
          class="w-full p-4 font-bold text-white transition bg-black hover:bg-gray-800 rounded-xl"
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
  <div class="max-w-4xl p-8 mx-auto bg-white shadow-sm rounded-2xl">
    <h1 class="mb-8 text-2xl font-bold">Add New Product</h1>
    <form
      @submit.prevent="handleSubmit"
      class="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <div class="space-y-4">
        <div>
          <label class="block mb-1 text-sm font-bold"
            >Product Name <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.name"
            placeholder="Product Name"
            class="w-full p-3 bg-gray-100 rounded-xl"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-bold"
            >Product Code (Unique) <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.code"
            placeholder="Product Code"
            class="w-full p-3 bg-gray-100 rounded-xl"
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

        <div>
          <label class="block mb-1 text-sm font-bold"
            >Stock <span class="text-red-500">*</span></label
          >
          <input
            v-model="form.stock"
            type="number"
            placeholder="Stock Amount"
            class="w-full p-3 bg-gray-100 rounded-xl"
            required
          />
        </div>

        <div>
          <label class="block mb-1 text-sm font-bold"
            >Category <span class="text-red-500">*</span></label
          >
          <select
            v-model="form.category_id"
            class="w-full p-3 bg-gray-100 rounded-xl"
            required
          >
            <option value="" disabled>Select Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">
              {{ cat.category_name }}
            </option>
          </select>
        </div>

        <!-- <div>
          <label class="block mb-1 text-sm font-bold"
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
          <label class="block mb-1 text-sm font-bold"
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
      </div>

      <div class="space-y-4">
        <!-- <div
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
          <div>
            <label class="block mb-1 text-xs font-bold text-gray-600"
              >Length (cm)</label
            >
            <input
              v-model="form.length"
              type="number"
              step="0.01"
              placeholder="e.g. 25.5"
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
              placeholder="e.g. 10"
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
              placeholder="e.g. 15"
              class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div class="mt-2 md:col-span-4">
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
        </div>
      </div> -->
        <div
          class="col-span-1 p-6 mt-4 mb-2 border border-gray-200 md:col-span-2 rounded-2xl bg-gray-50/50"
        >
          <!-- <h3
            class="pb-2 mb-4 text-sm font-bold tracking-widest text-gray-800 uppercase border-b"
          >
            Physical Attributes
          </h3>
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
                class="flex items-center gap-2 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg shadow-sm"
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
          </div> -->
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
            placeholder="Description"
            class="w-full h-24 p-3 bg-gray-100 rounded-xl"
          ></textarea>
        </div>
        <!-- <div>
          <label class="block mb-1 text-sm font-bold">Care Instructions</label>
          <textarea
            v-model="form.care"
            placeholder="Care Instructions"
            class="w-full h-24 p-3 bg-gray-100 rounded-xl"
          ></textarea>
        </div> -->
        <div>
          <label class="block mb-1 text-sm font-bold">Design Details</label>
          <textarea
            v-model="form.design"
            placeholder="Design Details"
            class="w-full h-24 p-3 bg-gray-100 rounded-xl"
          ></textarea>
        </div>
      </div>

      <div class="pt-2 md:col-span-2">
        <button
          type="submit"
          class="w-full p-4 font-bold text-white transition bg-black hover:bg-gray-800 rounded-xl"
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

import { ref, onMounted, computed } from "vue";
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
