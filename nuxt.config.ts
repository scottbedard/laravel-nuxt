import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    'nuxt-auth-sanctum',
  ],
  srcDir: 'nuxt',
  vite: {
    plugins: [tailwindcss()],
  },
})