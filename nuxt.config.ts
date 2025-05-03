// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    'nuxt-auth-sanctum',
  ],
  sanctum: {
    baseUrl: 'http://localhost:80',
  },
  srcDir: 'nuxt',
})