<template>
  <div>
    <pre class="text-sm" data-testid="user">{{ { user } }}</pre>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:auth'],
})

const user = useSanctumUser()
</script>
