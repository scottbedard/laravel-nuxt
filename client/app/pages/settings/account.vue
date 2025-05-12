<template>
  <div>
    <h1 class="text-2xl">Change password</h1>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: ['sanctum:auth'],
})
</script>
