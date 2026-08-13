<!-- <template>
  <div class="max-w-4xl p-8 mx-auto bg-white shadow-sm rounded-2xl">
    <Breadcrumb />
    <h1 class="mb-8 text-2xl font-bold">Add New Product</h1>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6 md:grid-cols-2">
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

        <div>
          <label class="block mb-1 text-sm font-bold">Main Image (Optional)</label>
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
          <p class="text-[10px] text-gray-500 mt-1">Select multiple files at once.</p>
        </div>

        <div>
          <label class="block mb-1 text-sm font-bold">Product Video (Max 5MB)</label>
          <input
            type="file"
            @change="handleVideo"
            accept="video/mp4,video/quicktime"
            class="w-full text-sm"
          />
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
            placeholder="Description"
            class="w-full h-24 p-3 bg-gray-100 rounded-xl"
          ></textarea>
        </div>
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

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
  // strap_length: "", // <--- BARU
  strap_length: [],
  color: [],
  description: "",
  // care: "",
  design: "",
  image: null,
  variant_images: [],
  variant_video: null,
  discount_price: "",
  discount_start_date: "", 
  discount_end_date: "",   
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

    formData.append("discount_start_date", form.value.discount_start_date || "");
    formData.append("discount_end_date", form.value.discount_end_date || "");

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

    // [BARU] Cara mengirim Array Strap Length ke Laravel
    if (form.value.strap_length && form.value.strap_length.length > 0) {
      form.value.strap_length.forEach((s, index) => {
        formData.append(`strap_length[${index}]`, s);
      });
    } else {
      formData.append("strap_length", ""); // Jika dikosongkan saat update
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
</script> -->

<!-- <template>
  <div class="max-w-4xl p-8 mx-auto bg-white shadow-sm rounded-2xl">
    <Breadcrumb />
    <h1 class="mb-8 text-2xl font-bold">Add New Product</h1>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6 md:grid-cols-2">
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

        <div>
          <label class="block mb-1 text-sm font-bold">Main Image (Optional)</label>
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
          <p class="text-[10px] text-gray-500 mt-1">Select multiple files at once.</p>
        </div>

        <div>
          <label class="block mb-1 text-sm font-bold">Product Video (Max 5MB)</label>
          <input
            type="file"
            @change="handleVideo"
            accept="video/mp4,video/quicktime"
            class="w-full text-sm"
          />
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
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Description (EN)</label>
            <textarea
              v-model="form.description_en"
              placeholder="English Description"
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (ID)</label>
            <textarea
              v-model="form.design"
              placeholder="Detail Desain Bahasa Indonesia"
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (EN)</label>
            <textarea
              v-model="form.design_en"
              placeholder="English Design Details"
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const router = useRouter();
const categories = ref([]);
const form = ref({
  name: "",
  code: "",
  price: "",
  stock: "",
  category_id: "",
  weight: 1000,
  length: "",
  width: "",
  height: "",
  material: "",
  strap_length: [],
  color: [],
  description: "",
  description_en: "", // [BARU]
  design: "",
  design_en: "",      // [BARU]
  image: null,
  variant_images: [],
  variant_video: null,
  discount_price: "",
  discount_start_date: "", 
  discount_end_date: "",   
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
    let formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("code", form.value.code);
    formData.append("price", form.value.price);
    formData.append("stock", form.value.stock);
    formData.append("category_id", form.value.category_id);
    formData.append("weight", form.value.weight);
    
    if (form.value.length) formData.append("length", form.value.length);
    if (form.value.width) formData.append("width", form.value.width);
    if (form.value.height) formData.append("height", form.value.height);
    if (form.value.material) formData.append("material", form.value.material);
    
    if (form.value.color && form.value.color.length > 0) {
      form.value.color.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    }
    
    formData.append("description", form.value.description);
    formData.append("description_en", form.value.description_en); // [BARU]
    formData.append("design", form.value.design);
    formData.append("design_en", form.value.design_en);         // [BARU]

    if (form.value.discount_price) {
      formData.append("discount_price", form.value.discount_price);
    }

    formData.append("discount_start_date", form.value.discount_start_date || "");
    formData.append("discount_end_date", form.value.discount_end_date || "");

    if (form.value.image) {
      formData.append("image", form.value.image);
    }

    if (form.value.variant_images.length > 0) {
      form.value.variant_images.forEach((file, index) => {
        formData.append(`variant_images[${index}]`, file);
      });
    }

    if (form.value.variant_video) {
      formData.append("variant_video", form.value.variant_video);
    }

    if (form.value.strap_length && form.value.strap_length.length > 0) {
      form.value.strap_length.forEach((s, index) => {
        formData.append(`strap_length[${index}]`, s);
      });
    } else {
      formData.append("strap_length", "");
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
</script> -->

<template>
  <div class="max-w-4xl p-8 mx-auto bg-white shadow-sm rounded-2xl">
    <Breadcrumb />
    <h1 class="mb-8 text-2xl font-bold">Add New Product</h1>
    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6 md:grid-cols-2">
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

        <!-- 👇 PERBAIKAN: MULTI CURRENCY PRICING SECTION 👇 -->
        <div class="col-span-1 p-6 mt-4 border border-gray-200 rounded-2xl bg-gray-50/50">
          <h3
            class="pb-2 mb-4 text-sm font-bold tracking-widest text-gray-800 uppercase border-b"
          >
            Pricing & Multi-Currency
          </h3>
          <div class="space-y-6">
            <!-- IDR (Base) -->
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
            <!-- USD -->
            <!-- <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >USD Price ($)</label
                >
                <input
                  v-model="form.prices.USD"
                  type="number"
                  step="0.01"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                  placeholder="e.g. 50.00"
                />
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Discount USD ($)</label
                >
                <input
                  v-model="form.discount_prices.USD"
                  type="number"
                  step="0.01"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div> -->
            <!-- SGD -->
            <!-- <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >SGD Price (S$)</label
                >
                <input
                  v-model="form.prices.SGD"
                  type="number"
                  step="0.01"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                  placeholder="e.g. 70.00"
                />
              </div>
              <div>
                <label class="block mb-1 text-xs font-bold text-gray-600"
                  >Discount SGD (S$)</label
                >
                <input
                  v-model="form.discount_prices.SGD"
                  type="number"
                  step="0.01"
                  class="w-full p-3 text-sm bg-white border border-gray-200 rounded-xl"
                />
              </div>
            </div> -->

            <!-- 👇 LOOPING DINAMIS UNTUK USD, SGD, EUR, AUD, MYR 👇 -->
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
            <!-- GLOBAL DISCOUNT DATES -->
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
        <!-- 👆 PERBAIKAN: MULTI CURRENCY PRICING SECTION 👆 -->

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

        <!-- 👇 TAMBAHKAN INI (Dropdown Bag Category) 👇 -->
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
        <!-- 👆 =================================== 👆 -->

        <div>
          <label class="block mb-1 text-sm font-bold">Main Image (Optional)</label>
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
          <p class="text-[10px] text-gray-500 mt-1">Select multiple files at once.</p>
        </div>

        <div>
          <label class="block mb-1 text-sm font-bold">Product Video (Max 5MB)</label>
          <input
            type="file"
            @change="handleVideo"
            accept="video/mp4,video/quicktime"
            class="w-full text-sm"
          />
        </div>
      </div>

      <div class="space-y-4">
        <!-- (Fisik Atribut dan sebagainya TETAP SAMA seperti kode Anda sebelumnya) -->
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
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Description (ID)</label>
            <textarea
              v-model="form.description"
              placeholder="Deskripsi Bahasa Indonesia"
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Description (EN)</label>
            <textarea
              v-model="form.description_en"
              placeholder="English Description"
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (ID)</label>
            <textarea
              v-model="form.design"
              placeholder="Detail Desain Bahasa Indonesia"
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (EN)</label>
            <textarea
              v-model="form.design_en"
              placeholder="English Design Details"
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
        </div> -->

        <!-- 👇 TOMBOL AI COPYWRITER 👇 -->
        <div
          class="flex items-center justify-between mt-8 mb-4 border-t border-gray-200 pt-6"
        >
          <div>
            <h3 class="text-lg font-bold text-gray-900">Product Story & Design</h3>
            <p class="text-xs text-gray-500">
              Isi manual atau gunakan AI untuk membuat deskripsi otomatis beserta
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
            {{ isGeneratingAI ? "AI IS THINKING..." : "GENERATE AI COPY" }}
          </button>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Description (ID)</label>
            <textarea
              v-model="form.description"
              placeholder="Deskripsi Bahasa Indonesia"
              class="w-full h-40 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Description (EN)</label>
            <textarea
              v-model="form.description_en"
              placeholder="English Description"
              class="w-full h-40 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (ID)</label>
            <textarea
              v-model="form.design"
              placeholder="Detail Desain Bahasa Indonesia"
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
          <div>
            <label class="block mb-1 text-sm font-bold">Design Details (EN)</label>
            <textarea
              v-model="form.design_en"
              placeholder="English Design Details"
              class="w-full h-32 p-3 bg-gray-100 rounded-xl"
            ></textarea>
          </div>
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
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api.js";
import Breadcrumb from "./Layout/Breadcrumb.vue";

const router = useRouter();
const categories = ref([]);
const bagCategories = ref([]);

// Tambahkan konstanta daftar mata uang di bagian atas script setup
const SUPPORTED_CURRENCIES = ["USD", "SGD", "EUR", "AUD", "MYR"];

const form = ref({
  name: "",
  code: "",
  price: "",
  discount_price: "",
  // // 👇 Data Khusus Multi Currency 👇
  // prices: { USD: "", SGD: "" },
  // discount_prices: { USD: "", SGD: "" },

  prices: {},
  discount_prices: {},
  // ----------------------------------
  discount_start_date: "",
  discount_end_date: "",
  stock: "",
  category_id: "",
  bag_category_id: "", // <-- TAMBAHKAN INI
  weight: 1000,
  length: "",
  width: "",
  height: "",
  material: "",
  strap_length: [],
  color: [],
  description: "",
  description_en: "",
  design: "",
  design_en: "",
  image: null,
  variant_images: [],
  variant_video: null,
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

  // Dapatkan nama kategori untuk konteks AI
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
        title: "AI Copywriter Berhasil Diterapkan!",
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
    let formData = new FormData();
    formData.append("name", form.value.name);
    formData.append("code", form.value.code);
    formData.append("price", form.value.price);
    formData.append("stock", form.value.stock);
    formData.append("category_id", form.value.category_id);
    formData.append("bag_category_id", form.value.bag_category_id || "");
    formData.append("weight", form.value.weight);

    if (form.value.length) formData.append("length", form.value.length);
    if (form.value.width) formData.append("width", form.value.width);
    if (form.value.height) formData.append("height", form.value.height);
    if (form.value.material) formData.append("material", form.value.material);

    if (form.value.color && form.value.color.length > 0) {
      form.value.color.forEach((c, index) => {
        formData.append(`color[${index}]`, c);
      });
    }

    formData.append("description", form.value.description);
    formData.append("description_en", form.value.description_en);
    formData.append("design", form.value.design);
    formData.append("design_en", form.value.design_en);

    if (form.value.discount_price) {
      formData.append("discount_price", form.value.discount_price);
    }

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

    formData.append("discount_start_date", form.value.discount_start_date || "");
    formData.append("discount_end_date", form.value.discount_end_date || "");

    if (form.value.image) {
      formData.append("image", form.value.image);
    }

    if (form.value.variant_images.length > 0) {
      form.value.variant_images.forEach((file, index) => {
        formData.append(`variant_images[${index}]`, file);
      });
    }

    if (form.value.variant_video) {
      formData.append("variant_video", form.value.variant_video);
    }

    if (form.value.strap_length && form.value.strap_length.length > 0) {
      form.value.strap_length.forEach((s, index) => {
        formData.append(`strap_length[${index}]`, s);
      });
    } else {
      formData.append("strap_length", "");
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

// onMounted(async () => {
//   SUPPORTED_CURRENCIES.forEach((curr) => {
//     form.value.prices[curr] = "";
//     form.value.discount_prices[curr] = "";
//   });

//   const res = await axios.get(`${BASE_URL}/categories`, {
//     headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
//   });
//   categories.value = res.data.data;
// });

onMounted(async () => {
  SUPPORTED_CURRENCIES.forEach((curr) => {
    form.value.prices[curr] = "";
    form.value.discount_prices[curr] = "";
  });

  const axiosConfig = {
    headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` },
  }; // Pastikan axiosConfig terdefinisi

  try {
    const [catRes, bagCatRes] = await Promise.all([
      axios.get(`${BASE_URL}/categories`, axiosConfig),
      axios.get(`${BASE_URL}/admin/bag-categories`, axiosConfig), // <-- TARIK DATA
    ]);

    categories.value = catRes.data.data;
    bagCategories.value = bagCatRes.data.data;
  } catch (error) {
    console.error("Gagal menarik kategori", error);
  }
});
</script>
