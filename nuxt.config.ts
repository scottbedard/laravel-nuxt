import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '#playwright/*': fileURLToPath(new URL('./tests/Playwright', import.meta.url)),
  },
  compatibilityDate: '2024-11-01',
  css: [
    '@/assets/css/tailwind.css',
  ],
  devtools: {
    enabled: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    '@nuxt/eslint',
    'nuxt-auth-sanctum',
  ],
  srcDir: 'nuxt',
  vite: {
    plugins: [tailwindcss()],
  },
})
