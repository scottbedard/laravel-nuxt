<template>
  <div>
    <pre>{{ { user } }}</pre>
  </div>
</template>

<script setup lang="ts">
const user = useSanctumUser()
</script>