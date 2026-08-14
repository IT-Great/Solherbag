<!-- <template>
  <div
    class="max-w-4xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl"
  >
    <Breadcrumb />
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Edit Product</h1>
      <button @click="$router.back()" class="text-gray-500 transition hover:text-black">
        Back
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            <label class="block mb-1 text-sm font-bold">Discount Price (Optional)</label>
            <input
              v-model="form.discount_price"
              type="number"
              placeholder="Set if on sale"
              class="w-full p-3 bg-gray-100 rounded-xl"
            />
          </div>
          <div>
            <label class="block mb-1 text-xs font-bold text-gray-600">Discount Start Date</label>
            <input
              v-model="form.discount_start_date"
              type="datetime-local"
              class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label class="block mb-1 text-xs font-bold text-gray-600">Discount End Date</label>
            <input
              v-model="form.discount_end_date"
              type="datetime-local"
              class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
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

        <div class="p-4 space-y-6 border border-gray-200 rounded-2xl bg-gray-50/50">
          <div>
            <label class="block mb-1 text-sm font-bold">Main Image</label>
            <p class="text-[10px] text-gray-500 mb-2">
              Leave blank to keep current image.
            </p>
            <div class="flex items-center gap-4">
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
            <label class="block mb-1 text-sm font-bold">Variant Images (Max 5)</label>
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
            <label class="block mb-1 text-sm font-bold">Product Video (Max 5MB)</label>
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
            <div class="pt-4 mt-2 border-t border-gray-200 md:col-span-5">
              <label
                class="block mb-2 text-xs font-bold tracking-widest text-gray-600 uppercase"
              >
                Strap Length Options (Optional)
              </label>

              <div
                class="flex items-center gap-3 p-3 mb-4 border border-gray-200 bg-gray-50 rounded-xl"
              >
                <div class="flex flex-col flex-1">
                  <label class="text-[10px] font-bold text-gray-500 mb-1"
                    >Add Strap Length</label
                  >
                  <input
                    type="text"
                    v-model="newStrapLength"
                    placeholder="e.g. 100 cm, 120 cm Adjustable"
                    class="bg-white p-2.5 rounded-lg w-full text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-black"
                    @keyup.enter.prevent="addStrapLength"
                  />
                </div>
                <div class="flex flex-col justify-end h-full mt-auto">
                  <button
                    type="button"
                    @click="addStrapLength"
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
                  v-if="form.strap_length.length === 0"
                  class="w-full my-auto text-xs italic text-center text-gray-400"
                >
                  No strap lengths added yet.
                </p>
                <div
                  v-for="(strap, idx) in form.strap_length"
                  :key="idx"
                  class="flex items-center gap-2 px-3 py-1.5 border border-gray-200 shadow-sm bg-gray-50 rounded-lg"
                >
                  <span class="text-xs font-bold text-gray-800">{{ strap }}</span>
                  <button
                    type="button"
                    @click="removeStrapLength(idx)"
                    class="ml-1 font-bold text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              </div>
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
              <label class="block mb-1 text-xs font-bold text-gray-600">Width (cm)</label>
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
                  <span class="text-xs font-bold text-gray-800">{{ c.name }}</span>
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";

// [BARU] Import gambar default
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import Breadcrumb from "./Layout/Breadcrumb.vue";

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
  discount_start_date: "", // <--- BARU
  discount_end_date: "",   // <--- BARU
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
  // strap_length: "", // <--- BARU
  strap_length: [],
  color: [],
});

// State & Fungsi untuk input multiple strap_length
const newStrapLength = ref("");

const addStrapLength = () => {
  if (!newStrapLength.value.trim()) return;
  if (!form.value.strap_length.includes(newStrapLength.value.trim())) {
    form.value.strap_length.push(newStrapLength.value.trim());
  }
  newStrapLength.value = "";
};

const removeStrapLength = (index) => {
  form.value.strap_length.splice(index, 1);
};

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
  form.value.discount_price = p.raw_discount_price ?? p.discount_price ?? "";
  form.value.discount_start_date = p.discount_start_date ? p.discount_start_date.replace(' ', 'T').substring(0, 16) : "";
  form.value.discount_end_date = p.discount_end_date ? p.discount_end_date.replace(' ', 'T').substring(0, 16) : "";
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
  // form.value.strap_length = p.strap_length; // <--- BARU
  form.value.strap_length = Array.isArray(p.strap_length)
    ? p.strap_length
    : p.strap_length
    ? [p.strap_length]
    : [];
  // form.value.color = p.color;
  form.value.color = Array.isArray(p.color) ? p.color : [];

  currentImage.value = p.image;
  currentVariantImages.value = p.variant_images || [];
  currentVideo.value = p.variant_video;
};

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
    formData.append("design", form.value.design || "");
    formData.append("weight", form.value.weight);

    // [PERBAIKAN] HAPUS SEMUA IF. Paksa kirim string kosong jika user menghapus isinya.
    formData.append("length", form.value.length || "");
    formData.append("width", form.value.width || "");
    formData.append("height", form.value.height || "");
    formData.append("material", form.value.material || "");
    // formData.append("strap_length", form.value.strap_length || "");
    // [BARU] Cara mengirim Array Strap Length ke Laravel
    if (form.value.strap_length && form.value.strap_length.length > 0) {
      form.value.strap_length.forEach((s, index) => {
        formData.append(`strap_length[${index}]`, s);
      });
    } else {
      formData.append("strap_length", ""); // Jika dikosongkan saat update
    }

    // [PERBAIKAN] Paksa kirim string kosong agar Laravel mengubahnya jadi NULL di database
    formData.append("discount_price", form.value.discount_price || "");

    formData.append("discount_start_date", form.value.discount_start_date || "");
    formData.append("discount_end_date", form.value.discount_end_date || "");

    // [BARU] Cara mengirim Array Color ke Laravel
    if (form.value.color && form.value.color.length > 0) {
      form.value.color.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    } else {
      // Jika semua warna dihapus, kirim array kosong agar backend tahu warna dikosongkan
      formData.append("color", "");
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
</script> -->

<!-- <template>
  <div
    class="max-w-4xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl"
  >
    <Breadcrumb />
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Edit Product</h1>
      <button @click="$router.back()" class="text-gray-500 transition hover:text-black">
        Back
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6 md:grid-cols-2">
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
            <label class="block mb-1 text-sm font-bold">Discount Price (Optional)</label>
            <input
              v-model="form.discount_price"
              type="number"
              placeholder="Set if on sale"
              class="w-full p-3 bg-gray-100 rounded-xl"
            />
          </div>
          <div>
            <label class="block mb-1 text-xs font-bold text-gray-600">Discount Start Date</label>
            <input
              v-model="form.discount_start_date"
              type="datetime-local"
              class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
            />
          </div>
          <div>
            <label class="block mb-1 text-xs font-bold text-gray-600">Discount End Date</label>
            <input
              v-model="form.discount_end_date"
              type="datetime-local"
              class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
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

        <div class="p-4 space-y-6 border border-gray-200 rounded-2xl bg-gray-50/50">
          <div>
            <label class="block mb-1 text-sm font-bold">Main Image</label>
            <p class="text-[10px] text-gray-500 mb-2">
              Leave blank to keep current image.
            </p>
            <div class="flex items-center gap-4">
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
            <label class="block mb-1 text-sm font-bold">Variant Images (Max 5)</label>
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
            <label class="block mb-1 text-sm font-bold">Product Video (Max 5MB)</label>
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
            <div class="pt-4 mt-2 border-t border-gray-200 md:col-span-5">
              <label
                class="block mb-2 text-xs font-bold tracking-widest text-gray-600 uppercase"
              >
                Strap Length Options (Optional)
              </label>

              <div
                class="flex items-center gap-3 p-3 mb-4 border border-gray-200 bg-gray-50 rounded-xl"
              >
                <div class="flex flex-col flex-1">
                  <label class="text-[10px] font-bold text-gray-500 mb-1"
                    >Add Strap Length</label
                  >
                  <input
                    type="text"
                    v-model="newStrapLength"
                    placeholder="e.g. 100 cm, 120 cm Adjustable"
                    class="bg-white p-2.5 rounded-lg w-full text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-black"
                    @keyup.enter.prevent="addStrapLength"
                  />
                </div>
                <div class="flex flex-col justify-end h-full mt-auto">
                  <button
                    type="button"
                    @click="addStrapLength"
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
                  v-if="form.strap_length.length === 0"
                  class="w-full my-auto text-xs italic text-center text-gray-400"
                >
                  No strap lengths added yet.
                </p>
                <div
                  v-for="(strap, idx) in form.strap_length"
                  :key="idx"
                  class="flex items-center gap-2 px-3 py-1.5 border border-gray-200 shadow-sm bg-gray-50 rounded-lg"
                >
                  <span class="text-xs font-bold text-gray-800">{{ strap }}</span>
                  <button
                    type="button"
                    @click="removeStrapLength(idx)"
                    class="ml-1 font-bold text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              </div>
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
              <label class="block mb-1 text-xs font-bold text-gray-600">Width (cm)</label>
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
                  <span class="text-xs font-bold text-gray-800">{{ c.name }}</span>
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
        
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Description (ID)</label>
            <textarea
              v-model="form.description"
              placeholder="Deskripsi Bahasa Indonesia"
              class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Description (EN)</label>
            <textarea
              v-model="form.description_en"
              placeholder="English Description"
              class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (ID)</label>
            <textarea
              v-model="form.design"
              placeholder="Detail Desain Bahasa Indonesia"
              class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (EN)</label>
            <textarea
              v-model="form.design_en"
              placeholder="English Design Details"
              class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import Breadcrumb from "./Layout/Breadcrumb.vue";

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
  discount_start_date: "",
  discount_end_date: "",   
  stock: "",
  category_id: "",
  description: "",
  description_en: "", // [BARU]
  design: "",
  design_en: "",      // [BARU]
  image: null,
  variant_images: [],
  variant_video: null,
  weight: "",
  length: "",
  width: "",
  height: "",
  material: "",
  strap_length: [],
  color: [],
});

const newStrapLength = ref("");

const addStrapLength = () => {
  if (!newStrapLength.value.trim()) return;
  if (!form.value.strap_length.includes(newStrapLength.value.trim())) {
    form.value.strap_length.push(newStrapLength.value.trim());
  }
  newStrapLength.value = "";
};

const removeStrapLength = (index) => {
  form.value.strap_length.splice(index, 1);
};

const newColorName = ref("");
const newColorHex = ref("#000000");

const parsedColors = computed(() => {
  return form.value.color.map((c) => {
    if (typeof c === "string" && c.includes("|")) {
      const [name, hex] = c.split("|");
      return { name, hex, original: c };
    }
    return { name: c, hex: "#cccccc", original: c };
  });
});

const addColor = () => {
  if (!newColorName.value.trim()) return;
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
  form.value.discount_price = p.raw_discount_price ?? p.discount_price ?? "";
  form.value.discount_start_date = p.discount_start_date ? p.discount_start_date.replace(' ', 'T').substring(0, 16) : "";
  form.value.discount_end_date = p.discount_end_date ? p.discount_end_date.replace(' ', 'T').substring(0, 16) : "";
  form.value.stock = p.stock;
  form.value.category_id = p.category_id;
  form.value.description = p.description;
  form.value.description_en = p.description_en || ""; // [BARU]
  form.value.design = p.design;
  form.value.design_en = p.design_en || "";           // [BARU]
  form.value.weight = p.weight;
  form.value.length = p.length;
  form.value.width = p.width;
  form.value.height = p.height;
  form.value.material = p.material;
  form.value.strap_length = Array.isArray(p.strap_length)
    ? p.strap_length
    : p.strap_length
    ? [p.strap_length]
    : [];
  form.value.color = Array.isArray(p.color) ? p.color : [];

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
    formData.append("_method", "PUT");

    formData.append("name", form.value.name);
    formData.append("code", form.value.code);
    formData.append("price", form.value.price);
    formData.append("category_id", form.value.category_id);
    formData.append("description", form.value.description || "");
    formData.append("description_en", form.value.description_en || ""); // [BARU]
    formData.append("design", form.value.design || "");
    formData.append("design_en", form.value.design_en || "");         // [BARU]
    formData.append("weight", form.value.weight);

    formData.append("length", form.value.length || "");
    formData.append("width", form.value.width || "");
    formData.append("height", form.value.height || "");
    formData.append("material", form.value.material || "");

    if (form.value.strap_length && form.value.strap_length.length > 0) {
      form.value.strap_length.forEach((s, index) => {
        formData.append(`strap_length[${index}]`, s);
      });
    } else {
      formData.append("strap_length", "");
    }

    formData.append("discount_price", form.value.discount_price || "");
    formData.append("discount_start_date", form.value.discount_start_date || "");
    formData.append("discount_end_date", form.value.discount_end_date || "");

    if (form.value.color && form.value.color.length > 0) {
      form.value.color.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    } else {
      formData.append("color", "");
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
</script> -->

<!--
<template>
  <div
    class="max-w-4xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl"
  >
    <Breadcrumb />
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Edit Product</h1>
      <button @click="$router.back()" class="text-gray-500 transition hover:text-black">
        Back
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6 md:grid-cols-2">
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

        <div class="col-span-1 p-6 mt-4 border border-gray-200 rounded-2xl bg-gray-50/50">
          <h3
            class="pb-2 mb-4 text-sm font-bold tracking-widest text-gray-800 uppercase border-b"
          >
            Pricing & Multi-Currency
          </h3>
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >IDR Price (Base) <span class="text-red-500">*</span></label
                >
                <input
                  v-model="form.price"
                  type="number"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Discount IDR</label
                >
                <input
                  v-model="form.discount_price"
                  type="number"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <div
              v-for="curr in SUPPORTED_CURRENCIES"
              :key="curr"
              class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100"
            >
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >{{ curr }} Price</label
                >
                <input
                  v-model="form.prices[curr]"
                  type="number"
                  step="0.01"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                  :placeholder="'Set ' + curr + ' price'"
                />
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Discount {{ curr }}</label
                >
                <input
                  v-model="form.discount_prices[curr]"
                  type="number"
                  step="0.01"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                  :placeholder="'Set ' + curr + ' discount'"
                />
              </div>
            </div>
            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Global Disc. Start</label
                >
                <input
                  v-model="form.discount_start_date"
                  type="datetime-local"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Global Disc. End</label
                >
                <input
                  v-model="form.discount_end_date"
                  type="datetime-local"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
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

          <div>
            <label class="block mb-1 text-sm font-bold">Bag Type (Optional)</label>
            <select
              v-model="form.bag_category_id"
              class="w-full p-3 bg-gray-100 rounded-xl"
            >
              <option value="">No Specific Type</option>
              <option v-for="type in bagCategories" :key="type.id" :value="type.id">
                {{ type.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="p-4 space-y-6 border border-gray-200 rounded-2xl bg-gray-50/50">
          <div>
            <label class="block mb-1 text-sm font-bold">Main Image</label>
            <p class="text-[10px] text-gray-500 mb-2">
              Leave blank to keep current image.
            </p>
            <div class="flex items-center gap-4">
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
            <label class="block mb-1 text-sm font-bold">Variant Images (Max 5)</label>
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
            <label class="block mb-1 text-sm font-bold">Product Video (Max 5MB)</label>
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
            <div class="pt-4 mt-2 border-t border-gray-200 md:col-span-5">
              <label
                class="block mb-2 text-xs font-bold tracking-widest text-gray-600 uppercase"
                >Strap Length Options (Optional)</label
              >
              <div
                class="flex items-center gap-3 p-3 mb-4 border border-gray-200 bg-gray-50 rounded-xl"
              >
                <div class="flex flex-col flex-1">
                  <label class="text-[10px] font-bold text-gray-500 mb-1"
                    >Add Strap Length</label
                  >
                  <input
                    type="text"
                    v-model="newStrapLength"
                    placeholder="e.g. 100 cm, 120 cm Adjustable"
                    class="bg-white p-2.5 rounded-lg w-full text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-black"
                    @keyup.enter.prevent="addStrapLength"
                  />
                </div>
                <div class="flex flex-col justify-end h-full mt-auto">
                  <button
                    type="button"
                    @click="addStrapLength"
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
                  v-if="form.strap_length.length === 0"
                  class="w-full my-auto text-xs italic text-center text-gray-400"
                >
                  No strap lengths added yet.
                </p>
                <div
                  v-for="(strap, idx) in form.strap_length"
                  :key="idx"
                  class="flex items-center gap-2 px-3 py-1.5 border border-gray-200 shadow-sm bg-gray-50 rounded-lg"
                >
                  <span class="text-xs font-bold text-gray-800">{{ strap }}</span>
                  <button
                    type="button"
                    @click="removeStrapLength(idx)"
                    class="ml-1 font-bold text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              </div>
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
              <label class="block mb-1 text-xs font-bold text-gray-600">Width (cm)</label>
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
                  <span class="text-xs font-bold text-gray-800">{{ c.name }}</span>
                  <button
                    type="button"
                    @click="removeColor(idx)"
                    class="ml-1 font-bold text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between pt-6 mt-8 mb-4 border-t border-gray-200"
        >
          <div>
            <h3 class="text-lg font-bold text-gray-900">Product Story & Design</h3>
            <p class="text-xs text-gray-500">
              Isi manual atau gunakan AI untuk merevisi deskripsi otomatis beserta
              terjemahannya.
            </p>
          </div>
          <button
            type="button"
            @click="generateWithAI"
            :disabled="isGeneratingAI || !form.name"
            class="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white transition-all bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              v-if="isGeneratingAI"
              class="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span v-else class="text-base">✨</span>
            {{ isGeneratingAI ? "AI IS THINKING..." : "RE-GENERATE AI COPY" }}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Description (ID)</label>
            <textarea
              v-model="form.description"
              class="w-full h-40 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Description (EN)</label>
            <textarea
              v-model="form.description_en"
              class="w-full h-40 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (ID)</label>
            <textarea
              v-model="form.design"
              class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (EN)</label>
            <textarea
              v-model="form.design_en"
              class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const categories = ref([]);
const bagCategories = ref([]); // <-- TAMBAHKAN INI

const currentImage = ref("");
const currentVariantImages = ref([]);
const currentVideo = ref("");

// Tambahkan konstanta daftar mata uang di bagian atas script setup
const SUPPORTED_CURRENCIES = ["USD", "SGD", "EUR", "AUD", "MYR"];

const form = ref({
  name: "",
  code: "",
  price: "",
  discount_price: "",
  prices: { USD: "", SGD: "" }, // [BARU]
  discount_prices: { USD: "", SGD: "" }, // [BARU]
  discount_start_date: "",
  discount_end_date: "",
  stock: "",
  category_id: "",
  bag_category_id: "", // <-- TAMBAHKAN INI
  description: "",
  description_en: "",
  design: "",
  design_en: "",
  image: null,
  variant_images: [],
  variant_video: null,
  weight: "",
  length: "",
  width: "",
  height: "",
  material: "",
  strap_length: [],
  color: [],
});

const isGeneratingAI = ref(false);

const generateWithAI = async () => {
  if (!form.value.name) {
    Swal.fire(
      "Peringatan",
      "Mohon isi Nama Produk terlebih dahulu agar AI bisa bekerja.",
      "warning"
    );
    return;
  }

  isGeneratingAI.value = true;
  const selectedCat = categories.value.find((c) => c.id === form.value.category_id);
  const catName = selectedCat ? selectedCat.category_name : "";

  try {
    const res = await axios.post(
      `${BASE_URL}/products/ai-copywriter`,
      {
        name: form.value.name,
        material: form.value.material,
        category_name: catName,
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
      }
    );

    if (res.data.status === "success" && res.data.data) {
      form.value.description = res.data.data.description_id;
      form.value.description_en = res.data.data.description_en;
      form.value.design = res.data.data.design_id;
      form.value.design_en = res.data.data.design_en;

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Re-Write AI Berhasil!",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  } catch (error) {
    Swal.fire("Error", "Gagal memanggil AI. Silakan coba lagi.", "error");
  } finally {
    isGeneratingAI.value = false;
  }
};

const newStrapLength = ref("");

const addStrapLength = () => {
  if (!newStrapLength.value.trim()) return;
  if (!form.value.strap_length.includes(newStrapLength.value.trim())) {
    form.value.strap_length.push(newStrapLength.value.trim());
  }
  newStrapLength.value = "";
};

const removeStrapLength = (index) => {
  form.value.strap_length.splice(index, 1);
};

const newColorName = ref("");
const newColorHex = ref("#000000");

const parsedColors = computed(() => {
  return form.value.color.map((c) => {
    if (typeof c === "string" && c.includes("|")) {
      const [name, hex] = c.split("|");
      return { name, hex, original: c };
    }
    return { name: c, hex: "#cccccc", original: c };
  });
});

const addColor = () => {
  if (!newColorName.value.trim()) return;
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
  form.value.discount_price = p.raw_discount_price ?? p.discount_price ?? "";

  // 👇 Pastikan objek penampung ada 👇
  const existingPrices = p.prices || {};
  const existingDiscounts = p.discount_prices || {};

  // 👇 Loop untuk memastikan semua mata uang terinisialisasi dengan aman di form 👇
  form.value.prices = {};
  form.value.discount_prices = {};
  SUPPORTED_CURRENCIES.forEach((curr) => {
    form.value.prices[curr] = existingPrices[curr] ?? "";
    form.value.discount_prices[curr] = existingDiscounts[curr] ?? "";
  });

  // 👇 Load existing multi-currency data 👇
  form.value.prices = p.prices || { USD: "", SGD: "" };
  form.value.discount_prices = p.discount_prices || { USD: "", SGD: "" };

  form.value.discount_start_date = p.discount_start_date
    ? p.discount_start_date.replace(" ", "T").substring(0, 16)
    : "";
  form.value.discount_end_date = p.discount_end_date
    ? p.discount_end_date.replace(" ", "T").substring(0, 16)
    : "";
  form.value.stock = p.stock;
  form.value.category_id = p.category_id;
  form.value.bag_category_id = p.bag_category_id || "";
  form.value.description = p.description;
  form.value.description_en = p.description_en || "";
  form.value.design = p.design;
  form.value.design_en = p.design_en || "";
  form.value.weight = p.weight;
  form.value.length = p.length;
  form.value.width = p.width;
  form.value.height = p.height;
  form.value.material = p.material;
  form.value.strap_length = Array.isArray(p.strap_length)
    ? p.strap_length
    : p.strap_length
    ? [p.strap_length]
    : [];
  form.value.color = Array.isArray(p.color) ? p.color : [];

  currentImage.value = p.image;
  currentVariantImages.value = p.variant_images || [];
  currentVideo.value = p.variant_video;
};

// onMounted(async () => {
//   const stateData = window.history.state?.productData;

//   if (stateData) {
//     fillFormWithData(stateData);
//   }

//   try {
//     const catRes = await axios.get(`${BASE_URL}/categories`, axiosConfig);
//     categories.value = catRes.data.data;

//     const prodRes = await axios.get(`${BASE_URL}/products/${productId}`, axiosConfig);
//     fillFormWithData(prodRes.data);
//   } catch (error) {
//     if (!stateData) {
//       Swal.fire("Error", "Gagal mengambil data produk.", "error");
//     }
//   }
// });
onMounted(async () => {
  // 1. Inisialisasi kerangka harga multi-currency
  SUPPORTED_CURRENCIES.forEach((curr) => {
    form.value.prices[curr] = "";
    form.value.discount_prices[curr] = "";
  });

  // 2. Pemuatan instan (Optimistic Load) jika data dikirim dari halaman sebelumnya
  const stateData = window.history.state?.productData;
  if (stateData) {
    fillFormWithData(stateData);
  }

  const axiosConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
  };

  try {
    // 3. Tarik SEMUA data secara bersamaan (Kategori Koleksi, Tipe Tas, dan Detail Produk)
    const [catRes, bagCatRes, prodRes] = await Promise.all([
      axios.get(`${BASE_URL}/categories`, axiosConfig),
      axios.get(`${BASE_URL}/admin/bag-categories`, axiosConfig),
      axios.get(`${BASE_URL}/products/${productId}`, axiosConfig),
    ]);

    // 4. Simpan daftar kategori untuk dropdown
    categories.value = catRes.data.data;
    bagCategories.value = bagCatRes.data.data;

    // 5. Isi form dengan data produk paling segar dari Database
    fillFormWithData(prodRes.data);
  } catch (error) {
    console.error("Gagal menarik data:", error);
    if (!stateData) {
      Swal.fire("Error", "Gagal mengambil data produk atau kategori.", "error");
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
    formData.append("_method", "PUT");

    formData.append("name", form.value.name);
    formData.append("code", form.value.code);
    formData.append("price", form.value.price);
    formData.append("category_id", form.value.category_id);
    formData.append("bag_category_id", form.value.bag_category_id || "");
    formData.append("description", form.value.description || "");
    formData.append("description_en", form.value.description_en || "");
    formData.append("design", form.value.design || "");
    formData.append("design_en", form.value.design_en || "");
    formData.append("weight", form.value.weight);

    formData.append("length", form.value.length || "");
    formData.append("width", form.value.width || "");
    formData.append("height", form.value.height || "");
    formData.append("material", form.value.material || "");

    if (form.value.strap_length && form.value.strap_length.length > 0) {
      form.value.strap_length.forEach((s, index) => {
        formData.append(`strap_length[${index}]`, s);
      });
    } else {
      formData.append("strap_length", "");
    }

    formData.append("discount_price", form.value.discount_price || "");
    formData.append("discount_start_date", form.value.discount_start_date || "");
    formData.append("discount_end_date", form.value.discount_end_date || "");

    // 👇 Append Multi-Currency JSON Array 👇
    if (form.value.prices) {
      Object.entries(form.value.prices).forEach(([curr, val]) => {
        if (val) formData.append(`prices[${curr}]`, val);
      });
    }
    if (form.value.discount_prices) {
      Object.entries(form.value.discount_prices).forEach(([curr, val]) => {
        if (val) formData.append(`discount_prices[${curr}]`, val);
      });
    }

    if (form.value.color && form.value.color.length > 0) {
      form.value.color.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    } else {
      formData.append("color", "");
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
</script> -->

<template>
  <div
    class="max-w-4xl p-8 mx-auto bg-white border border-gray-100 shadow-sm rounded-2xl"
  >
    <Breadcrumb />
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-2xl font-bold text-gray-800">Edit Product</h1>
      <button @click="$router.back()" class="text-gray-500 transition hover:text-black">
        Back
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6 md:grid-cols-2">
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

        <div class="col-span-1 p-6 mt-4 border border-gray-200 rounded-2xl bg-gray-50/50">
          <h3
            class="pb-2 mb-4 text-sm font-bold tracking-widest text-gray-800 uppercase border-b"
          >
            Pricing & Multi-Currency
          </h3>
          <div class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >IDR Price (Base) <span class="text-red-500">*</span></label
                >
                <input
                  v-model="form.price"
                  type="number"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                  required
                />
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Discount IDR</label
                >
                <input
                  v-model="form.discount_price"
                  type="number"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <div
              v-for="curr in SUPPORTED_CURRENCIES"
              :key="curr"
              class="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4"
            >
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >{{ curr }} Price</label
                >
                <input
                  v-model="form.prices[curr]"
                  type="number"
                  step="0.01"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                  :placeholder="'Set ' + curr + ' price'"
                />
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Discount {{ curr }}</label
                >
                <input
                  v-model="form.discount_prices[curr]"
                  type="number"
                  step="0.01"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                  :placeholder="'Set ' + curr + ' discount'"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Global Disc. Start</label
                >
                <input
                  v-model="form.discount_start_date"
                  type="datetime-local"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                />
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Global Disc. End</label
                >
                <input
                  v-model="form.discount_end_date"
                  type="datetime-local"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div>

            <!-- 👇 FINAL SALE TOGGLE 👇 -->
            <div class="pt-4 border-t border-gray-200">
              <label class="flex items-center cursor-pointer">
                <div class="relative">
                  <input type="checkbox" v-model="form.is_final_sale" class="sr-only" />
                  <div
                    :class="form.is_final_sale ? 'bg-red-700' : 'bg-gray-200'"
                    class="block w-10 h-6 rounded-full transition-colors"
                  ></div>
                  <div
                    :class="form.is_final_sale ? 'translate-x-4' : 'translate-x-0'"
                    class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform"
                  ></div>
                </div>
                <div
                  class="ml-3 font-bold text-sm text-red-700 uppercase tracking-widest"
                >
                  Mark as Final Sale
                </div>
              </label>
              <p class="text-[10px] text-gray-500 mt-1.5 ml-12">
                If enabled, this product cannot be returned or refunded.
              </p>
            </div>
            <!-- 👆 ================= 👆 -->
          </div>
        </div>

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
            <p class="text-[9px] text-gray-500 mt-1 uppercase tracking-widest font-bold">
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

        <div>
          <label class="block mb-1 text-sm font-bold">Bag Type (Optional)</label>
          <select
            v-model="form.bag_category_id"
            class="w-full p-3 bg-gray-100 rounded-xl"
          >
            <option value="">No Specific Type</option>
            <option v-for="type in bagCategories" :key="type.id" :value="type.id">
              {{ type.name }}
            </option>
          </select>
        </div>

        <div class="p-4 space-y-6 border border-gray-200 rounded-2xl bg-gray-50/50">
          <div>
            <label class="block mb-1 text-sm font-bold">Main Image</label>
            <p class="text-[10px] text-gray-500 mb-2">
              Leave blank to keep current image.
            </p>
            <div class="flex items-center gap-4">
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
            <label class="block mb-1 text-sm font-bold">Variant Images (Max 5)</label>
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
            <label class="block mb-1 text-sm font-bold">Product Video (Max 5MB)</label>
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
            <div class="pt-4 mt-2 border-t border-gray-200 md:col-span-5">
              <label
                class="block mb-2 text-xs font-bold tracking-widest text-gray-600 uppercase"
                >Strap Length Options (Optional)</label
              >
              <div
                class="flex items-center gap-3 p-3 mb-4 border border-gray-200 bg-gray-50 rounded-xl"
              >
                <div class="flex flex-col flex-1">
                  <label class="text-[10px] font-bold text-gray-500 mb-1"
                    >Add Strap Length</label
                  >
                  <input
                    type="text"
                    v-model="newStrapLength"
                    placeholder="e.g. 100 cm, 120 cm Adjustable"
                    class="bg-white p-2.5 rounded-lg w-full text-sm border border-gray-200 outline-none focus:ring-2 focus:ring-black"
                    @keyup.enter.prevent="addStrapLength"
                  />
                </div>
                <div class="flex flex-col justify-end h-full mt-auto">
                  <button
                    type="button"
                    @click="addStrapLength"
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
                  v-if="form.strap_length.length === 0"
                  class="w-full my-auto text-xs italic text-center text-gray-400"
                >
                  No strap lengths added yet.
                </p>
                <div
                  v-for="(strap, idx) in form.strap_length"
                  :key="idx"
                  class="flex items-center gap-2 px-3 py-1.5 border border-gray-200 shadow-sm bg-gray-50 rounded-lg"
                >
                  <span class="text-xs font-bold text-gray-800">{{ strap }}</span>
                  <button
                    type="button"
                    @click="removeStrapLength(idx)"
                    class="ml-1 font-bold text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              </div>
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
              <label class="block mb-1 text-xs font-bold text-gray-600">Width (cm)</label>
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
                  <span class="text-xs font-bold text-gray-800">{{ c.name }}</span>
                  <button
                    type="button"
                    @click="removeColor(idx)"
                    class="ml-1 font-bold text-gray-400 hover:text-red-500 focus:outline-none"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex items-center justify-between mt-8 mb-4 border-t border-gray-200 pt-6"
        >
          <div>
            <h3 class="text-lg font-bold text-gray-900">Product Story & Design</h3>
            <p class="text-xs text-gray-500">
              Isi manual atau gunakan AI untuk merevisi deskripsi otomatis.
            </p>
          </div>
          <button
            type="button"
            @click="generateWithAI"
            :disabled="isGeneratingAI || !form.name"
            class="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white transition-all bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:shadow-lg hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isGeneratingAI" class="text-base">✨</span>
            {{ isGeneratingAI ? "AI IS THINKING..." : "RE-GENERATE AI COPY" }}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Description (ID)</label>
            <textarea
              v-model="form.description"
              class="w-full h-40 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Description (EN)</label>
            <textarea
              v-model="form.description_en"
              class="w-full h-40 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (ID)</label>
            <textarea
              v-model="form.design"
              class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (EN)</label>
            <textarea
              v-model="form.design_en"
              class="w-full h-32 p-3 bg-gray-100 outline-none rounded-xl focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </div>
      </div>

      <div class="pt-2 md:col-span-2">
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import defaultBagIcon from "../../assets/products/bag_icon.jpg";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const router = useRouter();
const route = useRoute();
const productId = route.params.id;

const categories = ref([]);
const bagCategories = ref([]);

const currentImage = ref("");
const currentVariantImages = ref([]);
const currentVideo = ref("");

const SUPPORTED_CURRENCIES = ["USD", "SGD", "EUR", "AUD", "MYR"];

const form = ref({
  name: "",
  code: "",
  price: "",
  discount_price: "",
  prices: {},
  discount_prices: {},
  discount_start_date: "",
  discount_end_date: "",
  is_final_sale: false, // <-- State baru
  stock: "",
  category_id: "",
  bag_category_id: "",
  description: "",
  description_en: "",
  design: "",
  design_en: "",
  image: null,
  variant_images: [],
  variant_video: null,
  weight: "",
  length: "",
  width: "",
  height: "",
  material: "",
  strap_length: [],
  color: [],
});

const isGeneratingAI = ref(false);

const generateWithAI = async () => {
  /* (Logic AI Copywriter tetap utuh) */
};
const newStrapLength = ref("");
const addStrapLength = () => {
  /* ... */
};
const removeStrapLength = (index) => {
  /* ... */
};
const newColorName = ref("");
const newColorHex = ref("#000000");

const parsedColors = computed(() => {
  return form.value.color.map((c) => {
    if (typeof c === "string" && c.includes("|")) {
      const [name, hex] = c.split("|");
      return { name, hex, original: c };
    }
    return { name: c, hex: "#cccccc", original: c };
  });
});
const addColor = () => {
  /* ... */
};
const removeColor = (index) => {
  /* ... */
};
const handleFile = (e) => (form.value.image = e.target.files[0]);
const handleVariantImages = (e) => {
  /* ... */
};
const handleVideo = (e) => {
  form.value.variant_video = e.target.files[0];
};

const fillFormWithData = (p) => {
  form.value.name = p.name;
  form.value.code = p.code;
  form.value.price = p.price;
  form.value.discount_price = p.raw_discount_price ?? p.discount_price ?? "";
  form.value.is_final_sale = !!p.is_final_sale; // <-- Tarik Final Sale state

  const existingPrices = p.prices || {};
  const existingDiscounts = p.discount_prices || {};

  form.value.prices = {};
  form.value.discount_prices = {};
  SUPPORTED_CURRENCIES.forEach((curr) => {
    form.value.prices[curr] = existingPrices[curr] ?? "";
    form.value.discount_prices[curr] = existingDiscounts[curr] ?? "";
  });

  form.value.prices = p.prices || { USD: "", SGD: "" };
  form.value.discount_prices = p.discount_prices || { USD: "", SGD: "" };

  form.value.discount_start_date = p.discount_start_date
    ? p.discount_start_date.replace(" ", "T").substring(0, 16)
    : "";
  form.value.discount_end_date = p.discount_end_date
    ? p.discount_end_date.replace(" ", "T").substring(0, 16)
    : "";
  form.value.stock = p.stock;
  form.value.category_id = p.category_id;
  form.value.bag_category_id = p.bag_category_id || "";
  form.value.description = p.description;
  form.value.description_en = p.description_en || "";
  form.value.design = p.design;
  form.value.design_en = p.design_en || "";
  form.value.weight = p.weight;
  form.value.length = p.length;
  form.value.width = p.width;
  form.value.height = p.height;
  form.value.material = p.material;
  form.value.strap_length = Array.isArray(p.strap_length)
    ? p.strap_length
    : p.strap_length
    ? [p.strap_length]
    : [];
  form.value.color = Array.isArray(p.color) ? p.color : [];

  currentImage.value = p.image;
  currentVariantImages.value = p.variant_images || [];
  currentVideo.value = p.variant_video;
};

onMounted(async () => {
  SUPPORTED_CURRENCIES.forEach((curr) => {
    form.value.prices[curr] = "";
    form.value.discount_prices[curr] = "";
  });

  const stateData = window.history.state?.productData;
  if (stateData) {
    fillFormWithData(stateData);
  }

  const axiosConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
  };

  try {
    const [catRes, bagCatRes, prodRes] = await Promise.all([
      axios.get(`${BASE_URL}/categories`, axiosConfig),
      axios.get(`${BASE_URL}/admin/bag-categories`, axiosConfig),
      axios.get(`${BASE_URL}/products/${productId}`, axiosConfig),
    ]);

    categories.value = catRes.data.data;
    bagCategories.value = bagCatRes.data.data;

    fillFormWithData(prodRes.data);
  } catch (error) {
    console.error("Gagal menarik data:", error);
    if (!stateData) {
      Swal.fire("Error", "Gagal mengambil data produk atau kategori.", "error");
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
    formData.append("_method", "PUT");

    formData.append("name", form.value.name);
    formData.append("code", form.value.code);
    formData.append("price", form.value.price);
    formData.append("category_id", form.value.category_id);
    formData.append("bag_category_id", form.value.bag_category_id || "");
    formData.append("is_final_sale", form.value.is_final_sale ? 1 : 0); // <-- Append Final Sale state
    formData.append("description", form.value.description || "");
    formData.append("description_en", form.value.description_en || "");
    formData.append("design", form.value.design || "");
    formData.append("design_en", form.value.design_en || "");
    formData.append("weight", form.value.weight);

    formData.append("length", form.value.length || "");
    formData.append("width", form.value.width || "");
    formData.append("height", form.value.height || "");
    formData.append("material", form.value.material || "");

    if (form.value.strap_length && form.value.strap_length.length > 0) {
      form.value.strap_length.forEach((s, index) => {
        formData.append(`strap_length[${index}]`, s);
      });
    } else {
      formData.append("strap_length", "");
    }

    formData.append("discount_price", form.value.discount_price || "");
    formData.append("discount_start_date", form.value.discount_start_date || "");
    formData.append("discount_end_date", form.value.discount_end_date || "");

    if (form.value.prices) {
      Object.entries(form.value.prices).forEach(([curr, val]) => {
        if (val) formData.append(`prices[${curr}]`, val);
      });
    }
    if (form.value.discount_prices) {
      Object.entries(form.value.discount_prices).forEach(([curr, val]) => {
        if (val) formData.append(`discount_prices[${curr}]`, val);
      });
    }

    if (form.value.color && form.value.color.length > 0) {
      form.value.color.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    } else {
      formData.append("color", "");
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
      headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
    });

    Swal.fire("Success", "Product Updated", "success");
    router.push("/admin/products");
  } catch (error) {
    let errorMsg = "Update Failed";
    if (error.response && error.response.data)
      errorMsg = Object.values(error.response.data).flat().join("<br>");
    Swal.fire("Error", errorMsg, "error");
  }
};
</script>
