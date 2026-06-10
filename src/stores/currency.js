// src/stores/currency.js

import { defineStore } from 'pinia';

export const useCurrencyStore = defineStore('currency', {
  state: () => ({
    // Menyimpan mata uang yang dipilih user (default: IDR)
    selectedCurrency: 'IDR',
    
    // Menyimpan data kurs dari Laravel (default IDR ke IDR = 1)
    exchangeRates: {
      IDR: 1
    }
  }),
  
  actions: {
    // Opsional: Actions jika Anda butuh logika yang lebih kompleks saat mengubah state
    setCurrency(currency) {
      this.selectedCurrency = currency;
    },
    setExchangeRates(rates) {
      this.exchangeRates = rates;
    }
  }
});