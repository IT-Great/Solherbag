// src/i18n.js
import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import id from './locales/id.json'

const savedLocale = localStorage.getItem('user_lang') || 'id'

const i18n = createI18n({
  legacy: false, // Penting untuk Composition API
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    id
  }
})

export default i18n