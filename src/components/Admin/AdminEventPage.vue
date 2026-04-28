<template>
  <div class="p-6 md:p-10 animate-fade-in">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
          Event Management
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage Solher's event galleries, campaigns, and lookbooks.
        </p>
      </div>
      <button
        @click="openModal()"
        class="px-5 py-2.5 text-sm font-bold tracking-widest text-white uppercase transition-colors bg-black rounded-lg shadow-md hover:bg-gray-800"
      >
        + Add Event
      </button>
    </div>

    <div class="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-xl">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="text-[10px] tracking-widest text-gray-500 uppercase border-b border-gray-200 bg-gray-50/50"
            >
              <th class="px-6 py-4 font-bold">Image</th>
              <th class="px-6 py-4 font-bold">Event Details</th>
              <th class="px-6 py-4 font-bold">Season</th>
              <th class="px-6 py-4 font-bold">Date</th>
              <th class="px-6 py-4 font-bold">Status</th>
              <th class="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading" class="animate-pulse">
              <td colspan="6" class="py-10 text-center text-gray-400">
                Loading events...
              </td>
            </tr>
            <tr v-else-if="events.length === 0">
              <td colspan="6" class="py-10 text-center text-gray-400">
                No events found.
              </td>
            </tr>
            <tr
              v-else
              v-for="event in events"
              :key="event.id"
              class="transition-colors hover:bg-gray-50"
            >
              <td class="px-6 py-4">
                <img
                  :src="getImgUrl(event.image)"
                  class="object-cover w-16 h-16 rounded-lg shadow-sm"
                />
              </td>
              <td class="px-6 py-4">
                <p class="text-sm font-bold text-gray-900">{{ event.title }}</p>
                <p class="text-xs text-gray-500 truncate max-w-[200px]">
                  {{ event.description || "-" }}
                </p>
              </td>
              <td class="px-6 py-4">
                <span
                  class="px-2.5 py-1 text-[10px] font-bold tracking-widest text-blue-700 uppercase bg-blue-100 rounded-md"
                >
                  {{ event.season || "Any" }}
                </span>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ event.event_date }}</td>
              <td class="px-6 py-4">
                <span
                  :class="
                    event.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-200 text-gray-700'
                  "
                  class="px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase rounded-md"
                >
                  {{ event.status }}
                </span>
              </td>
              <td class="px-6 py-4 text-right">
                <button
                  @click="openModal(event)"
                  class="p-2 text-blue-600 transition-colors hover:text-blue-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </button>
                <button
                  @click="deleteEvent(event.id)"
                  class="p-2 ml-2 text-red-600 transition-colors hover:text-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div
      v-if="isModalOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div class="w-full max-w-xl overflow-hidden bg-white shadow-2xl rounded-2xl">
        <div class="px-6 py-4 border-b border-gray-100">
          <h3 class="text-lg font-bold text-gray-900">
            {{ isEditing ? "Edit Event" : "Add New Event" }}
          </h3>
        </div>
        <form @submit.prevent="saveEvent" class="p-6 space-y-4">
          <div>
            <label
              class="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase"
              >Event Title</label
            >
            <input
              v-model="form.title"
              type="text"
              required
              class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label
                class="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase"
                >Date</label
              >
              <input
                v-model="form.event_date"
                type="date"
                required
                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
              />
            </div>
            <div>
              <label
                class="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase"
                >Season/Category</label
              >
              <select
                v-model="form.season"
                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
              >
                <option value="">Any</option>
                <option value="Spring">Spring</option>
                <option value="Summer">Summer</option>
                <option value="Autumn">Autumn</option>
                <option value="Winter">Winter</option>
                <option value="Raya">Raya Collection</option>
                <option value="Campaign">Campaign</option>
              </select>
            </div>
          </div>
          <div>
            <label
              class="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase"
              >Copywriting / Description</label
            >
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:outline-none placeholder-gray-400"
              placeholder="Add an elegant description..."
            ></textarea>
          </div>
          <div>
            <label
              class="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase"
              >Image</label
            >
            <input
              type="file"
              @change="handleFileUpload"
              accept="image/*"
              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg"
            />
            <img
              v-if="imagePreview"
              :src="imagePreview"
              class="object-cover h-32 mt-3 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label
              class="block mb-1 text-xs font-bold tracking-widest text-gray-500 uppercase"
              >Status</label
            >
            <select
              v-model="form.status"
              class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-black focus:outline-none"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          <div class="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-100">
            <button
              type="button"
              @click="closeModal"
              class="px-5 py-2.5 text-sm font-bold tracking-widest text-gray-600 uppercase transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              :disabled="isSaving"
              class="px-5 py-2.5 text-sm font-bold tracking-widest text-white uppercase transition-colors bg-black rounded-lg shadow-md hover:bg-gray-800 disabled:opacity-50"
            >
              {{ isSaving ? "Saving..." : "Save Event" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config/api";

const events = ref([]);
const isLoading = ref(true);
const isModalOpen = ref(false);
const isEditing = ref(false);
const isSaving = ref(false);
const selectedFile = ref(null);
const imagePreview = ref(null);

const form = ref({
  id: null,
  title: "",
  description: "",
  event_date: "",
  season: "",
  status: "published",
});

const token = localStorage.getItem("admin_token") || localStorage.getItem("token");

const getImgUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const baseUrlFixed = BASE_URL.replace("/api", "");
  return `${baseUrlFixed}/storage/${path}`;
};

const fetchEvents = async () => {
  isLoading.value = true;
  try {
    const res = await axios.get(`${BASE_URL}/admin/events`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    events.value = res.data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  selectedFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
};

const openModal = (event = null) => {
  isEditing.value = !!event;
  if (event) {
    form.value = { ...event };
    imagePreview.value = getImgUrl(event.image);
  } else {
    form.value = {
      id: null,
      title: "",
      description: "",
      event_date: "",
      season: "",
      status: "published",
    };
    imagePreview.value = null;
  }
  selectedFile.value = null;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const saveEvent = async () => {
  isSaving.value = true;
  const formData = new FormData();
  formData.append("title", form.value.title);
  formData.append("description", form.value.description || "");
  formData.append("event_date", form.value.event_date);
  formData.append("season", form.value.season || "");
  formData.append("status", form.value.status);

  if (selectedFile.value) {
    formData.append("image", selectedFile.value);
  }

  try {
    let url = `${BASE_URL}/admin/events`;
    if (isEditing.value) {
      url = `${BASE_URL}/admin/events/${form.value.id}`;
      formData.append("_method", "PUT"); // Laravel requirement for form-data PUT
    }

    await axios.post(url, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Saved successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    closeModal();
    fetchEvents();
  } catch (error) {
    Swal.fire("Error", "Failed to save event.", "error");
  } finally {
    isSaving.value = false;
  }
};

const deleteEvent = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#000",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`${BASE_URL}/admin/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Deleted!", "Event has been deleted.", "success");
      fetchEvents();
    } catch (error) {
      Swal.fire("Error!", "Failed to delete event.", "error");
    }
  }
};

onMounted(fetchEvents);
</script>
