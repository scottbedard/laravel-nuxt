<template>
  <div>
    <PasswordForm />
  </div>
</template>

<script lang="ts" setup>
import PasswordForm from './partials/PasswordForm.vue'

definePageMeta({
  middleware: ['sanctum:auth'],
})
</script>
