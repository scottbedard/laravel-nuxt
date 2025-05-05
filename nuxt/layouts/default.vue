<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="flex items-center justify-between">
      <NuxtLink
        class="cursor-pointer flex gap-x-2 group items-center"
        to="/">
        <svg class="w-5 group-hover:text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>

        laravel-nuxt.dev
      </NuxtLink>

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