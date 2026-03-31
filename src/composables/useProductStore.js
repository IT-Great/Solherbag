// // src/composables/useProductStore.js
// import { reactive } from 'vue';
// import axios from 'axios';
// import { BASE_URL } from '../config/api';

// // State global (di luar fungsi agar persistent)
// const state = reactive({
//     volumeOne: [],
//     volumeTwo: [],
//     collectionsProducts: [],
//     categories: [],
//     isHomeLoaded: false,
//     isCollectionsLoaded: false
// });

// export function useProductStore() {

//     // Fetch Data Home (Hanya jika belum loaded)
//     const fetchHomeData = async () => {
//         if (state.isHomeLoaded) return; // Return cached data

//         try {
//             const [resV1, resV2] = await Promise.all([
//                 axios.get(`${BASE_URL}/home/category/C001`),
//                 axios.get(`${BASE_URL}/home/category/C002`)
//             ]);
//             state.volumeOne = resV1.data;
//             state.volumeTwo = resV2.data;
//             state.isHomeLoaded = true;
//         } catch (err) {
//             console.error("Failed to load home data");
//         }
//     };

//     // Fetch Data Collections (Hanya jika belum loaded)
//     const fetchCollectionsData = async () => {
//         if (state.isCollectionsLoaded) return;

//         try {
//             const [prodRes, catRes] = await Promise.all([
//                 axios.get(`${BASE_URL}/products`),
//                 axios.get(`${BASE_URL}/guest/categories`)
//             ]);
//             state.collectionsProducts = prodRes.data;
//             state.categories = catRes.data.data; // Sesuaikan dengan struktur respons API
//             state.isCollectionsLoaded = true;
//         } catch (error) {
//             console.error("Error loading collections:", error);
//         }
//     };

//     return {
//         state,
//         fetchHomeData,
//         fetchCollectionsData
//     };
// }

// src/composables/useProductStore.js
import { reactive } from 'vue';
import axios from 'axios';
import { BASE_URL } from '../config/api';

const state = reactive({
    volumeOne: [],
    volumeTwo: [],
    volumeThree: [], // <--- [BARU] Tambahkan state untuk Volume 3
    collectionsProducts: [],
    categories: [],
    isHomeLoaded: false,
    isCollectionsLoaded: false
});

export function useProductStore() {
    const fetchHomeData = async () => {
        if (state.isHomeLoaded) return; 

        try {
            // [PERBAIKAN] Panggil 3 API sekaligus secara paralel
            const [resV1, resV2, resV3] = await Promise.all([
                axios.get(`${BASE_URL}/home/category/C001`),
                axios.get(`${BASE_URL}/home/category/C002`),
                axios.get(`${BASE_URL}/home/category/C003`) // <--- [BARU] API C003
            ]);
            
            state.volumeOne = resV1.data;
            state.volumeTwo = resV2.data;
            state.volumeThree = resV3.data; // <--- [BARU] Simpan ke state
            
            state.isHomeLoaded = true;
        } catch (err) {
            console.error("Failed to load home data");
        }
    };

    const fetchCollectionsData = async () => {
        if (state.isCollectionsLoaded) return;

        try {
            const [prodRes, catRes] = await Promise.all([
                axios.get(`${BASE_URL}/products`),
                axios.get(`${BASE_URL}/guest/categories`)
            ]);
            state.collectionsProducts = prodRes.data;
            state.categories = catRes.data.data;
            state.isCollectionsLoaded = true;
        } catch (error) {
            console.error("Error loading collections:", error);
        }
    };

    return {
        state,
        fetchHomeData,
        fetchCollectionsData
    };
}