<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="flex gap-x-6 justify-end">
      <template v-if="user">
        <Button
          @click="auth.logout"
          variant="ghost">
          Log out
        </Button>
      </template>

      <template v-else>
        <Button
          to="/login"
          variant="ghost">
          Log in
      </Button>

      <Button
          to="/register"
          variant="secondary">
          Register
        </Button>
      </template>
    </div>

    <main class="mt-12">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const auth = useSanctumAuth()

const user = useSanctumUser()
</script>