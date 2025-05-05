<template>
  <div>
    <pre>{{ { user } }}</pre>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:auth'],
})

const user = useSanctumUser()
</script>