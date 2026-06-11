import { useCurrencyStore } from '../stores/currency'

export function formatPrice(basePriceIDR) {
    const store = useCurrencyStore();
    const currentCurrency = store.selectedCurrency; // e.g., 'USD', 'SGD', 'IDR'
    const rates = store.exchangeRates; // Data dari backend Laravel
    
    if (currentCurrency === 'IDR' || !rates[currentCurrency]) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(basePriceIDR);
    }

    // Kalkulasi konversi
    const convertedPrice = basePriceIDR * rates[currentCurrency];
    
    // Format ke mata uang tujuan
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currentCurrency }).format(convertedPrice);
}