import { fileURLToPath } from 'url'
import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  alias: {
    '#tests/*': fileURLToPath(new URL('./tests', import.meta.url)),
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
  pages: {
    pattern: [
      '**/*.vue',
      '!**/partials/**',
    ],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
