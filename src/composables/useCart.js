// import { ref, computed } from "vue";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { BASE_URL } from "../config/api.js";

// // 1. STATE GLOBAL (Dideklarasikan di luar fungsi agar datanya persisten & dibagi antar halaman)
// const cartItems = ref([]);
// const debounceTimers = new Map();

// export function useCart() {
//     const cartCount = computed(() => {
//         return cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
//     });

//     const totalCartAmount = computed(() => {
//         if (!cartItems.value || cartItems.value.length === 0) return 0;
//         return cartItems.value.reduce((acc, item) => {
//             return acc + (parseFloat(item.gross_amount) || 0);
//         }, 0);
//     });

//     const fetchCarts = async () => {
//         const token = localStorage.getItem("token");
//         if (!token) return;
//         try {
//             const res = await axios.get(`${BASE_URL}/carts`, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             cartItems.value = res.data.map((item) => ({ ...item, isSyncing: false }));
//         } catch (err) {
//             console.error("Failed to load bag", err);
//         }
//     };

//     // const handleOptimisticAdd = async (newProduct, onBounceCallback) => {
//     //     const existingItem = cartItems.value.find((item) => item.product_id === newProduct.id);

//     //     if (existingItem) {
//     //         handleQtyChange(existingItem, existingItem.quantity + 1);
//     //         if (onBounceCallback) onBounceCallback();
//     //         return;
//     //     }

//     //     const tempId = "temp_" + Date.now();
//     //     const unitPrice = parseFloat(newProduct.discount_price ?? newProduct.price);

//     //     const newItem = {
//     //         id: tempId,
//     //         product_id: newProduct.id,
//     //         quantity: 1,
//     //         gross_amount: unitPrice,
//     //         isSyncing: true,
//     //         isCreating: true,
//     //         product: newProduct,
//     //     };

//     //     cartItems.value.unshift(newItem);
//     //     if (onBounceCallback) onBounceCallback();

//     //     try {
//     //         const token = localStorage.getItem("token");
//     //         const res = await axios.post(
//     //             `${BASE_URL}/carts`,
//     //             { product_id: newProduct.id, quantity: 1 },
//     //             { headers: { Authorization: `Bearer ${token}` } }
//     //         );

//     //         const realId = res.data.id || res.data.cart_id || res.data.data?.id;
//     //         const itemInCart = cartItems.value.find((i) => i.id === tempId);

//     //         if (itemInCart) {
//     //             itemInCart.id = realId;
//     //             itemInCart.isCreating = false;

//     //             if (itemInCart.quantity !== 1) {
//     //                 syncQtyToDatabase(itemInCart);
//     //             } else {
//     //                 itemInCart.isSyncing = false;
//     //             }
//     //         } else {
//     //             axios.delete(`${BASE_URL}/carts/${realId}`, {
//     //                 headers: { Authorization: `Bearer ${token}` }
//     //             });
//     //         }
//     //     } catch (error) {
//     //         cartItems.value = cartItems.value.filter((i) => i.id !== tempId);
//     //         Swal.fire("Error", "Gagal menambahkan ke keranjang.", "error");
//     //     }
//     // };

//     // const handleOptimisticAdd = async (newProduct, onBounceCallback) => {
//     //     const existingItem = cartItems.value.find((item) => item.product_id === newProduct.id);

//     //     if (existingItem) {
//     //         handleQtyChange(existingItem, existingItem.quantity + 1);
//     //         if (onBounceCallback) onBounceCallback();
//     //         return;
//     //     }

//     //     const tempId = "temp_" + Date.now();
//     //     const unitPrice = parseFloat(newProduct.discount_price ?? newProduct.price);

//     //     const newItem = {
//     //         id: tempId,
//     //         product_id: newProduct.id,
//     //         quantity: 1,
//     //         gross_amount: unitPrice,
//     //         isSyncing: true,
//     //         isCreating: true,
//     //         product: newProduct,
//     //     };

//     //     cartItems.value.unshift(newItem);
//     //     if (onBounceCallback) onBounceCallback();

//     //     try {
//     //         const token = localStorage.getItem("token");
//     //         const res = await axios.post(
//     //             `${BASE_URL}/carts`,
//     //             { product_id: newProduct.id, quantity: 1 },
//     //             { headers: { Authorization: `Bearer ${token}` } }
//     //         );

//     //         // 1. Ambil ID asli (Sekarang backend sudah mengirimkan cart_id)
//     //         const realId = res.data.cart_id || res.data.id || res.data.data?.id;

//     //         const itemInCart = cartItems.value.find((i) => i.id === tempId);

//     //         if (itemInCart) {
//     //             // 2. SAFETY CHECK: Pastikan realId benar-benar ada dan BUKAN undefined
//     //             if (realId) {
//     //                 itemInCart.id = realId;
//     //                 itemInCart.isCreating = false;

//     //                 // Eksekusi antrean PUT API jika user sudah mengubah qty sebelum POST selesai
//     //                 if (itemInCart.quantity !== 1) {
//     //                     syncQtyToDatabase(itemInCart);
//     //                 } else {
//     //                     itemInCart.isSyncing = false;
//     //                 }
//     //             } else {
//     //                 // Jika entah bagaimana backend gagal kirim ID, lempar ke Error
//     //                 throw new Error("Missing Cart ID from Server!");
//     //             }
//     //         } else {
//     //             // Jika user menghapus barang SEBELUM POST selesai, hapus dari database
//     //             if (realId) {
//     //                 axios.delete(`${BASE_URL}/carts/${realId}`, {
//     //                     headers: { Authorization: `Bearer ${token}` }
//     //                 }).catch(() => { }); // silent catch
//     //             }
//     //         }
//     //     } catch (error) {
//     //         // ROLLBACK: Tarik ulang data asli dari server jika terjadi kepanikan error
//     //         console.error("Optimistic Add Error:", error);
//     //         fetchCarts();
//     //     }
//     // };

//     // Buka src/composables/useCart.js

//     // [PERBAIKAN] Gunakan destructuring object { product, cartId } tepat pada parameter
//     const handleOptimisticAdd = async ({ product, cartId }, onBounceCallback) => {
//         // Cari apakah produk sudah ada di keranjang
//         const existingItem = cartItems.value.find((item) => item.product_id === product.id);

//         if (existingItem) {
//             handleQtyChange(existingItem, existingItem.quantity + 1);
//             if (onBounceCallback) onBounceCallback();
//             return;
//         }

//         // Tentukan ID sementara jika tidak ada cartId yang dioper (kasus dari CartPage.vue)
//         const tempId = cartId || ("temp_" + Date.now());
//         const unitPrice = parseFloat(product.discount_price ?? product.price);

//         const newItem = {
//             id: tempId,
//             product_id: product.id,
//             quantity: 1,
//             gross_amount: unitPrice,
//             // Jika tidak ada cartId (berarti ditambah dari CartPage), nyalakan efek Blur (isSyncing)
//             isSyncing: !cartId,
//             isCreating: !cartId,
//             product: product,
//         };

//         cartItems.value.unshift(newItem);
//         if (onBounceCallback) onBounceCallback();

//         // Jika cartId ADA (artinya dikirim dari ProductDetailPage via Header),
//         // KITA TIDAK PERLU HIT API POST LAGI karena API sudah ditembak di ProductDetailPage.
//         if (cartId) {
//             return; // Berhenti di sini untuk kasus Add to Cart dari halaman produk
//         }

//         // [BARU] JIKA cartId TIDAK ADA (Add to Cart dari Suggested Product di CartPage),
//         // MAKA KITA HARUS TEMBAK API POST DI SINI!
//         try {
//             const token = localStorage.getItem("token");
//             const res = await axios.post(
//                 `${BASE_URL}/carts`,
//                 { product_id: product.id, quantity: 1 },
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             // Ambil ID Asli dari database
//             const realId = res.data.id || res.data.cart_id || res.data.data?.id;
//             const itemInCart = cartItems.value.find((i) => i.id === tempId);

//             if (itemInCart) {
//                 itemInCart.id = realId;
//                 itemInCart.isCreating = false;

//                 // Jika user "gercep" menekan (+) sebelum API selesai
//                 if (itemInCart.quantity !== 1) {
//                     syncQtyToDatabase(itemInCart);
//                 } else {
//                     itemInCart.isSyncing = false;
//                 }
//             } else {
//                 // Jika user menghapus item sebelum API POST selesai
//                 axios.delete(`${BASE_URL}/carts/${realId}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//             }
//         } catch (error) {
//             // Rollback jika server error
//             cartItems.value = cartItems.value.filter((i) => i.id !== tempId);
//             Swal.fire("Error", "Gagal menambahkan ke keranjang.", "error");
//         }
//     };

//     const handleQtyChange = (item, newQty) => {
//         if (newQty < 1) newQty = 1;
//         if (newQty > item.product.stock) {
//             newQty = item.product.stock;
//             Swal.fire({ toast: true, position: "top-end", icon: "warning", title: `Max stock is ${item.product.stock}`, showConfirmButton: false, timer: 2000 });
//         }

//         item.quantity = newQty;
//         item.gross_amount = item.quantity * parseFloat(item.product.discount_price ?? item.product.price);
//         item.isSyncing = true;

//         if (item.isCreating) return;

//         if (debounceTimers.has(item.id)) clearTimeout(debounceTimers.get(item.id));

//         const timerId = setTimeout(() => {
//             syncQtyToDatabase(item);
//             debounceTimers.delete(item.id);
//         }, 600);

//         debounceTimers.set(item.id, timerId);
//     };

//     const syncQtyToDatabase = async (item) => {
//         if (String(item.id).startsWith("temp_")) {
//             setTimeout(() => syncQtyToDatabase(item), 500);
//             return;
//         }
//         try {
//             const res = await axios.put(
//                 `${BASE_URL}/carts/${item.id}`,
//                 { quantity: item.quantity },
//                 { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//             );
//             item.gross_amount = res.data.gross_amount;
//         } catch (error) {
//             fetchCarts();
//         } finally {
//             item.isSyncing = false;
//         }
//     };

//     const handleOptimisticDelete = async (id) => {
//         const backupItems = [...cartItems.value];

//         cartItems.value = cartItems.value.filter((item) => item.id !== id);
//         Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Item Removed", showConfirmButton: false, timer: 2000 });

//         if (String(id).startsWith("temp_")) return;

//         try {
//             await axios.delete(`${BASE_URL}/carts/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//         } catch (error) {
//             cartItems.value = backupItems;
//             Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Failed to remove item", showConfirmButton: false, timer: 3000 });
//         }
//     };

//     // [BARU] FUNGSI UNTUK MENGOSONGKAN KERANJANG DI FRONTEND
//     const clearCart = () => {
//         cartItems.value = [];
//     };

//     return {
//         cartItems,
//         cartCount,
//         totalCartAmount,
//         fetchCarts,
//         handleOptimisticAdd,
//         handleQtyChange,
//         handleOptimisticDelete,
//         clearCart,
//         handleQtyInput: (item) => {
//             if (item.quantity === null || item.quantity === "") return;
//             handleQtyChange(item, item.quantity);
//         }
//     };
// }

import { ref, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../config/api.js";

const cartItems = ref([]);
const debounceTimers = new Map();
// [BARU] State untuk menyimpan ID barang yang dicentang
const selectedItemIds = ref([]);

export function useCart() {
    // Total jumlah kuantitas SEMUA barang (untuk Badge di Header)
    const cartCount = computed(() => {
        return cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
    });

    // [BARU] Total jumlah kuantitas HANYA barang yang DIPILIH (untuk Summary Checkout)
    const checkoutCount = computed(() => {
        return cartItems.value
            .filter(item => selectedItemIds.value.includes(item.id))
            .reduce((acc, item) => acc + item.quantity, 0);
    });

    // [BARU] Total harga HANYA barang yang DIPILIH (untuk Summary Checkout)
    const checkoutTotalAmount = computed(() => {
        return cartItems.value
            .filter(item => selectedItemIds.value.includes(item.id))
            .reduce((acc, item) => acc + (parseFloat(item.gross_amount) || 0), 0);
    });

    // [BARU] Logika V-Model untuk "Select All" Checkbox
    const isAllSelected = computed({
        get: () => cartItems.value.length > 0 && selectedItemIds.value.length === cartItems.value.length,
        set: (val) => {
            if (val) {
                selectedItemIds.value = cartItems.value.map(item => item.id);
            } else {
                selectedItemIds.value = [];
            }
        }
    });

    const fetchCarts = async () => {
        const token = localStorage.getItem("token");
        if (!token) return;
        try {
            const res = await axios.get(`${BASE_URL}/carts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            cartItems.value = res.data.map((item) => ({ ...item, isSyncing: false }));

            // [BARU] Otomatis centang barang yang baru di-fetch dari database jika belum ada di list selected
            res.data.forEach(item => {
                if (!selectedItemIds.value.includes(item.id)) {
                    selectedItemIds.value.push(item.id);
                }
            });
        } catch (err) {
            console.error("Failed to load bag", err);
        }
    };

    // const handleOptimisticAdd = async ({ product, cartId }, onBounceCallback) => {
    //     const existingItem = cartItems.value.find((item) => item.product_id === product.id);

    //     if (existingItem) {
    //         handleQtyChange(existingItem, existingItem.quantity + 1);
    //         if (onBounceCallback) onBounceCallback();

    //         // Otomatis centang barang jika user menambahkannya lagi dari luar
    //         if (!selectedItemIds.value.includes(existingItem.id)) {
    //             selectedItemIds.value.push(existingItem.id);
    //         }
    //         return;
    //     }

    //     const tempId = cartId || ("temp_" + Date.now());
    //     const unitPrice = parseFloat(product.discount_price ?? product.price);

    //     const newItem = {
    //         id: tempId,
    //         product_id: product.id,
    //         quantity: 1,
    //         gross_amount: unitPrice,
    //         isSyncing: !cartId,
    //         isCreating: !cartId,
    //         product: product,
    //     };

    //     cartItems.value.unshift(newItem);
    //     selectedItemIds.value.push(tempId); // [BARU] Otomatis centang barang baru

    //     if (onBounceCallback) onBounceCallback();

    //     if (cartId) return;

    //     try {
    //         const token = localStorage.getItem("token");
    //         const res = await axios.post(
    //             `${BASE_URL}/carts`,
    //             { product_id: product.id, quantity: 1 },
    //             { headers: { Authorization: `Bearer ${token}` } }
    //         );

    //         const realId = res.data.cart_id || res.data.id || res.data.data?.id;
    //         const itemInCart = cartItems.value.find((i) => i.id === tempId);

    //         if (itemInCart) {
    //             if (realId) {
    //                 itemInCart.id = realId;
    //                 itemInCart.isCreating = false;

    //                 // [BARU] Perbarui ID di dalam array selectedItemIds (Dari Temp ID ke Real ID)
    //                 const selIndex = selectedItemIds.value.indexOf(tempId);
    //                 if (selIndex !== -1) {
    //                     selectedItemIds.value[selIndex] = realId;
    //                 }

    //                 if (itemInCart.quantity !== 1) {
    //                     syncQtyToDatabase(itemInCart);
    //                 } else {
    //                     itemInCart.isSyncing = false;
    //                 }
    //             } else {
    //                 throw new Error("Missing Cart ID from Server!");
    //             }
    //         } else {
    //             if (realId) {
    //                 axios.delete(`${BASE_URL}/carts/${realId}`, {
    //                     headers: { Authorization: `Bearer ${token}` }
    //                 }).catch(() => { });
    //             }
    //         }
    //     } catch (error) {
    //         cartItems.value = cartItems.value.filter((i) => i.id !== tempId);
    //         selectedItemIds.value = selectedItemIds.value.filter(id => id !== tempId);
    //         fetchCarts();
    //     }
    // };

    // [PERBAIKAN] Tambahkan 'quantity = 1' di parameter destructuring
    const handleOptimisticAdd = async ({ product, cartId, quantity = 1 }, onBounceCallback) => {
        const existingItem = cartItems.value.find((item) => item.product_id === product.id);

        if (existingItem) {
            // [PERBAIKAN] Tambahkan berdasarkan jumlah yang di-request, bukan sekadar + 1
            handleQtyChange(existingItem, existingItem.quantity + quantity);
            if (onBounceCallback) onBounceCallback();

            if (!selectedItemIds.value.includes(existingItem.id)) {
                selectedItemIds.value.push(existingItem.id);
            }
            return;
        }

        const tempId = cartId || ("temp_" + Date.now());
        const unitPrice = parseFloat(product.discount_price ?? product.price);

        const newItem = {
            id: tempId,
            product_id: product.id,
            quantity: quantity, // [PERBAIKAN] Gunakan variabel quantity
            gross_amount: unitPrice * quantity, // [PERBAIKAN] Harga dikalikan quantity
            isSyncing: !cartId,
            isCreating: !cartId,
            product: product,
        };

        cartItems.value.unshift(newItem);
        selectedItemIds.value.push(tempId); 

        if (onBounceCallback) onBounceCallback();

        if (cartId) return;

        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `${BASE_URL}/carts`,
                // [PERBAIKAN] Kirim quantity aktual ke backend
                { product_id: product.id, quantity: quantity }, 
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const realId = res.data.cart_id || res.data.id || res.data.data?.id;
            const itemInCart = cartItems.value.find((i) => i.id === tempId);

            if (itemInCart) {
                if (realId) {
                    itemInCart.id = realId;
                    itemInCart.isCreating = false;

                    const selIndex = selectedItemIds.value.indexOf(tempId);
                    if (selIndex !== -1) {
                        selectedItemIds.value[selIndex] = realId;
                    }

                    // Hanya sync jika quantity BUKAN seperti yang kita kirim
                    // (misal dibatasi oleh backend karena stok kurang)
                    if (itemInCart.quantity !== quantity) { 
                        syncQtyToDatabase(itemInCart);
                    } else {
                        itemInCart.isSyncing = false;
                    }
                } else {
                    throw new Error("Missing Cart ID from Server!");
                }
            } else {
                if (realId) {
                    axios.delete(`${BASE_URL}/carts/${realId}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    }).catch(() => { });
                }
            }
        } catch (error) {
            cartItems.value = cartItems.value.filter((i) => i.id !== tempId);
            selectedItemIds.value = selectedItemIds.value.filter(id => id !== tempId);
            fetchCarts();
        }
    };

    const handleQtyChange = (item, newQty) => {
        if (newQty < 1) newQty = 1;
        if (newQty > item.product.stock) {
            newQty = item.product.stock;
            Swal.fire({ toast: true, position: "top-end", icon: "warning", title: `Max stock is ${item.product.stock}`, showConfirmButton: false, timer: 2000 });
        }

        item.quantity = newQty;
        item.gross_amount = item.quantity * parseFloat(item.product.discount_price ?? item.product.price);
        item.isSyncing = true;

        // Otomatis centang jika user mengubah qty nya
        if (!selectedItemIds.value.includes(item.id)) {
            selectedItemIds.value.push(item.id);
        }

        if (item.isCreating) return;

        if (debounceTimers.has(item.id)) clearTimeout(debounceTimers.get(item.id));

        const timerId = setTimeout(() => {
            syncQtyToDatabase(item);
            debounceTimers.delete(item.id);
        }, 600);

        debounceTimers.set(item.id, timerId);
    };

    const syncQtyToDatabase = async (item) => {
        if (String(item.id).startsWith("temp_")) {
            setTimeout(() => syncQtyToDatabase(item), 500);
            return;
        }
        try {
            const res = await axios.put(
                `${BASE_URL}/carts/${item.id}`,
                { quantity: item.quantity },
                { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            item.gross_amount = res.data.gross_amount;
        } catch (error) {
            fetchCarts();
        } finally {
            item.isSyncing = false;
        }
    };

    const handleOptimisticDelete = async (id) => {
        const backupItems = [...cartItems.value];

        cartItems.value = cartItems.value.filter((item) => item.id !== id);
        selectedItemIds.value = selectedItemIds.value.filter(selId => selId !== id); // [BARU] Hapus dari daftar centang

        Swal.fire({ toast: true, position: "top-end", icon: "success", title: "Item Removed", showConfirmButton: false, timer: 2000 });

        if (String(id).startsWith("temp_")) return;

        try {
            await axios.delete(`${BASE_URL}/carts/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
        } catch (error) {
            cartItems.value = backupItems;
            if (!selectedItemIds.value.includes(id)) selectedItemIds.value.push(id);
            Swal.fire({ toast: true, position: "top-end", icon: "error", title: "Failed to remove item", showConfirmButton: false, timer: 3000 });
        }
    };

    // [PERBAIKAN BESAR] HANYA HAPUS BARANG YANG DIBELI, BIARKAN YANG TIDAK DIBELI
    const clearSelectedCart = () => {
        cartItems.value = cartItems.value.filter(item => !selectedItemIds.value.includes(item.id));
        selectedItemIds.value = []; // Reset centangan
    };

    return {
        cartItems,
        cartCount,
        checkoutCount, // <-- Export baru
        checkoutTotalAmount, // <-- Export baru
        selectedItemIds, // <-- Export baru
        isAllSelected, // <-- Export baru
        fetchCarts,
        handleOptimisticAdd,
        handleQtyChange,
        handleOptimisticDelete,
        clearSelectedCart, // <-- Nama baru
        handleQtyInput: (item) => {
            if (item.quantity === null || item.quantity === "") return;
            handleQtyChange(item, item.quantity);
        }
    };
}