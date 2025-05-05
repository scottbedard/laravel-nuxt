<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
useHead({
  title: 'laravel-nuxt',
  bodyAttrs: {
    class: 'antialiased h-full',
  },
  htmlAttrs: {
    class: 'h-full',
  },
})
</script>
