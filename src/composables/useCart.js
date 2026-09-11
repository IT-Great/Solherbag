import { ref, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../config/api.js";

const cartItems = ref([]);
const debounceTimers = new Map();
const selectedItemIds = ref([]);

export const convertToWIB = (dateString) => {
  if (!dateString) return null;
  const safeDateString = dateString.replace(" ", "T");
  return new Date(safeDateString);
};

const getCurrentCurrency = () => localStorage.getItem("currency") || "IDR";

export const getPriceToDisplay = (product, currentCurrencyStr = null) => {
  if (!product) return { value: 0, curr: "IDR" };
  const curr = currentCurrencyStr || getCurrentCurrency();
  if (curr === "IDR") return { value: product.price, curr: "IDR" };

  const prices =
    typeof product.prices === "string"
      ? JSON.parse(product.prices)
      : product.prices || {};
  if (prices[curr]) {
    return { value: parseFloat(prices[curr]), curr: curr };
  }
  return { value: product.price, curr: "IDR" };
};

export const getDiscountToDisplay = (product, currentCurrencyStr = null) => {
  if (!product) return null;
  const curr = currentCurrencyStr || getCurrentCurrency();

  if (curr === "IDR") {
    return product.discount_price
      ? { value: product.discount_price, curr: "IDR" }
      : null;
  }

  const discountPrices =
    typeof product.discount_prices === "string"
      ? JSON.parse(product.discount_prices)
      : product.discount_prices || {};
  if (discountPrices[curr]) {
    return { value: parseFloat(discountPrices[curr]), curr: curr };
  }
  return product.discount_price
    ? { value: product.discount_price, curr: "IDR" }
    : null;
};

export const getDiscountStatus = (p, currentCurrencyStr = null) => {
  const discObj = getDiscountToDisplay(p, currentCurrencyStr);
  if (!p || !discObj || !discObj.value)
    return { active: false, upcoming: false, expired: false };

  const now = new Date();
  let active = true,
    upcoming = false,
    expired = false;

  if (p.discount_start_date) {
    const startDate = convertToWIB(p.discount_start_date);
    if (now < startDate) {
      active = false;
      upcoming = true;
    }
  }
  if (p.discount_end_date) {
    const endDate = convertToWIB(p.discount_end_date);
    if (now > endDate) {
      active = false;
      expired = true;
    }
  }
  return { active, upcoming, expired };
};

export const getActivePrice = (product, currentCurrencyStr = null) => {
  if (!product) return 0;
  if (getDiscountStatus(product, currentCurrencyStr).active) {
    const discObj = getDiscountToDisplay(product, currentCurrencyStr);
    return discObj ? discObj.value : 0;
  }
  const priceObj = getPriceToDisplay(product, currentCurrencyStr);
  return priceObj ? priceObj.value : 0;
};

export const getBundlePromo = (product) => {
  if (!product || !product.category) return null;
  const curr = getCurrentCurrency();
  const conf = product.category.promo_config;

  if (!conf) return null;

  const now = new Date();
  const start = conf.start_date ? convertToWIB(conf.start_date) : null;
  const end = conf.end_date ? convertToWIB(conf.end_date) : null;

  if ((start && now < start) || (end && now > end)) return null;
  if (conf.promo_type === "percent") return null;

  const priceObj = conf.price || {};
  const finalPrice =
    priceObj[curr] !== undefined ? priceObj[curr] : priceObj["IDR"] || 0;

  return { qty: Number(conf.qty || 2), price: Number(finalPrice), curr: curr };
};

export function useCart() {
  const localCurrency = ref(getCurrentCurrency());

  const triggerCurrencyUpdate = () => {
    localCurrency.value = getCurrentCurrency();
    fetchCarts();
  };

  const cartCount = computed(() =>
    cartItems.value.reduce((acc, item) => acc + item.quantity, 0),
  );

  const checkoutCount = computed(() => {
    return cartItems.value
      .filter((item) => selectedItemIds.value.includes(item.id))
      .reduce((acc, item) => acc + item.quantity, 0);
  });

  const bundleDiscountAmount = computed(() => {
    let totalDiscount = 0;
    const selected = cartItems.value.filter((item) =>
      selectedItemIds.value.includes(item.id),
    );
    const now = new Date();

    const groupedItems = {};
    selected.forEach((item) => {
      const cat = item.product?.category_id ? item.product.category : null;
      if (!cat) return;
      const conf = cat.promo_config;

      let isActive = false;
      if (conf) {
        const start = conf.start_date ? convertToWIB(conf.start_date) : null;
        const end = conf.end_date ? convertToWIB(conf.end_date) : null;
        isActive = (!start || now >= start) && (!end || now <= end);
      }

      if (isActive) {
        const mixGroup = conf.mix_group || `CAT_${cat.id}`;
        if (!groupedItems[mixGroup]) {
          groupedItems[mixGroup] = {
            config: conf,
            items: [],
            totalQty: 0,
            normalTotal: 0,
          };
        }
        groupedItems[mixGroup].items.push(item);
        groupedItems[mixGroup].totalQty += item.quantity;
        groupedItems[mixGroup].normalTotal +=
          item.quantity * getActivePrice(item.product, localCurrency.value);
      }
    });

    Object.values(groupedItems).forEach((group) => {
      const conf = group.config;
      const type = conf.promo_type || "bundle";

      if (type === "bundle") {
        const bQty = conf.qty || 1;
        const priceObj = conf.price || {};
        const bPrice = priceObj[localCurrency.value] || priceObj["IDR"] || 0;

        if (bPrice > 0 && group.totalQty >= bQty) {
          const bCount = Math.floor(group.totalQty / bQty);
          const rQty = group.totalQty % bQty;
          let groupPromoPrice = bCount * bPrice;

          const sortedItems = [...group.items]
            .map((i) => ({
              ...i,
              singlePrice: getActivePrice(i.product, localCurrency.value),
            }))
            .sort((a, b) => b.singlePrice - a.singlePrice);

          let assignedR = 0;
          sortedItems.forEach((i) => {
            if (assignedR < rQty) {
              const take = Math.min(i.quantity, rQty - assignedR);
              groupPromoPrice += take * i.singlePrice;
              assignedR += take;
            }
          });

          totalDiscount += Math.max(0, group.normalTotal - groupPromoPrice);
        }
      } else if (type === "percent") {
        const minP = conf.min_purchase || 0;
        if (group.normalTotal >= minP) {
          const pct = conf.percent || 0;
          const maxD = conf.max_discount || 0;
          let disc = group.normalTotal * (pct / 100);
          if (maxD > 0 && disc > maxD) disc = maxD;
          if (disc > group.normalTotal) disc = group.normalTotal;
          totalDiscount += disc;
        }
      }
    });

    return totalDiscount;
  });

  const checkoutTotalAmount = computed(() => {
    const rawTotal = cartItems.value
      .filter((item) => selectedItemIds.value.includes(item.id))
      .reduce(
        (acc, item) =>
          acc +
          item.quantity * getActivePrice(item.product, localCurrency.value),
        0,
      );
    return Math.max(0, rawTotal - bundleDiscountAmount.value);
  });

  const fomoAlerts = computed(() => {
    const alerts = [];
    const now = new Date();

    const groupedByCategory = cartItems.value.reduce((acc, item) => {
      const cat = item.product?.category;
      if (!cat) return acc;

      const conf = cat.promo_config;
      if (!conf) return acc;

      const start = conf.start_date ? convertToWIB(conf.start_date) : null;
      const end = conf.end_date ? convertToWIB(conf.end_date) : null;
      if ((start && now < start) || (end && now > end)) return acc;
      if (conf.promo_type !== "bundle") return acc;

      const mixGroup = conf.mix_group || `CAT_${cat.id}`;
      if (!acc[mixGroup]) {
        acc[mixGroup] = {
          categoryName: cat.name || cat.category_name,
          totalQty: 0,
          config: conf,
        };
      }
      acc[mixGroup].totalQty += item.quantity;
      return acc;
    }, {});

    Object.values(groupedByCategory).forEach((group) => {
      const conf = group.config;
      const bQty = conf.qty || 2;
      const priceObj = conf.price || {};
      const bPrice =
        priceObj[localCurrency.value] !== undefined
          ? priceObj[localCurrency.value]
          : priceObj["IDR"] || 0;

      if (bPrice > 0 && group.totalQty > 0 && group.totalQty < bQty) {
        alerts.push({
          categoryName: group.categoryName,
          neededQty: bQty - group.totalQty,
          bundleQty: bQty,
          bundlePrice: bPrice,
          bundleCurr: localCurrency.value,
        });
      }
    });

    return alerts;
  });

  const isAllSelected = computed({
    get: () =>
      cartItems.value.length > 0 &&
      selectedItemIds.value.length === cartItems.value.length,
    set: (val) => {
      if (val) selectedItemIds.value = cartItems.value.map((item) => item.id);
      else selectedItemIds.value = [];
    },
  });

  const fetchCarts = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await axios.get(
        `${BASE_URL}/carts?currency=${localCurrency.value}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      cartItems.value = (res.data.items || res.data).map((item) => {
        const validPrice = getActivePrice(item.product);
        return {
          ...item,
          gross_amount: validPrice * item.quantity,
          isSyncing: false,
        };
      });
      (res.data.items || res.data).forEach((item) => {
        if (!selectedItemIds.value.includes(item.id))
          selectedItemIds.value.push(item.id);
      });
    } catch (err) {}
  };

  const handleOptimisticAdd = async (
    { product, cartId, quantity = 1, color = null },
    onBounceCallback,
  ) => {
    const existingItem = cartItems.value.find(
      (item) => item.product_id === product.id && item.color === color,
    );
    if (existingItem) {
      handleQtyChange(existingItem, existingItem.quantity + quantity);
      if (onBounceCallback) onBounceCallback();
      if (!selectedItemIds.value.includes(existingItem.id))
        selectedItemIds.value.push(existingItem.id);
      return;
    }
    const tempId = cartId || "temp_" + Date.now();
    const unitPrice = getActivePrice(product);
    const newItem = {
      id: tempId,
      product_id: product.id,
      quantity: quantity,
      gross_amount: unitPrice * quantity,
      color: color,
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
        { product_id: product.id, quantity: quantity, color: color },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      const realId = res.data.cart_id || res.data.id || res.data.data?.id;
      const itemInCart = cartItems.value.find((i) => i.id === tempId);
      if (itemInCart) {
        if (realId) {
          itemInCart.id = realId;
          itemInCart.isCreating = false;
          const selIndex = selectedItemIds.value.indexOf(tempId);
          if (selIndex !== -1) selectedItemIds.value[selIndex] = realId;
          if (itemInCart.quantity !== quantity) syncQtyToDatabase(itemInCart);
          else itemInCart.isSyncing = false;
        }
      }
    } catch (error) {
      cartItems.value = cartItems.value.filter((i) => i.id !== tempId);
      selectedItemIds.value = selectedItemIds.value.filter(
        (id) => id !== tempId,
      );
    }
  };

  const handleQtyChange = (item, newQty) => {
    if (newQty < 1) newQty = 1;
    if (newQty > item.product.stock) {
      newQty = item.product.stock;
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: `Max stock is ${item.product.stock}`,
        showConfirmButton: false,
        timer: 2000,
      });
    }
    item.quantity = newQty;
    item.gross_amount =
      item.quantity * getActivePrice(item.product, localCurrency.value);
    item.isSyncing = true;
    if (!selectedItemIds.value.includes(item.id))
      selectedItemIds.value.push(item.id);
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
      await axios.put(
        `${BASE_URL}/carts/${item.id}`,
        { quantity: item.quantity },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      item.gross_amount =
        item.quantity * getActivePrice(item.product, localCurrency.value);
    } catch (error) {
      fetchCarts();
    } finally {
      item.isSyncing = false;
    }
  };

  const handleOptimisticDelete = async (id) => {
    const backupItems = [...cartItems.value];
    cartItems.value = cartItems.value.filter((item) => item.id !== id);
    selectedItemIds.value = selectedItemIds.value.filter(
      (selId) => selId !== id,
    );
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Item Removed",
      showConfirmButton: false,
      timer: 2000,
    });
    if (String(id).startsWith("temp_")) return;

    try {
      await axios.delete(`${BASE_URL}/carts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    } catch (error) {
      cartItems.value = backupItems;
      if (!selectedItemIds.value.includes(id)) selectedItemIds.value.push(id);
    }
  };

  const clearSelectedCart = () => {
    cartItems.value = cartItems.value.filter(
      (item) => !selectedItemIds.value.includes(item.id),
    );
    selectedItemIds.value = [];
  };

  return {
    cartItems,
    bundleDiscountAmount,
    fomoAlerts,
    cartCount,
    checkoutCount,
    checkoutTotalAmount,
    selectedItemIds,
    isAllSelected,
    triggerCurrencyUpdate,
    localCurrency,
    fetchCarts,
    handleOptimisticAdd,
    handleQtyChange,
    handleOptimisticDelete,
    clearSelectedCart,
    handleQtyInput: (item) => {
      if (item.quantity === null || item.quantity === "") return;
      handleQtyChange(item, item.quantity);
    },
  };
}
