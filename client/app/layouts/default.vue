<template>
  <div class="max-w-7xl mx-auto p-6">
    <div class="flex items-center justify-between">
      <NuxtLink
        class="cursor-pointer flex gap-x-2 group items-center"
        to="/">
        <svg class="w-5 group-hover:text-blue-500" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />

        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>

        laravel-nuxt.dev
      </NuxtLink>

      <div class="flex gap-x-6 justify-end">
        <div
          v-if="user"
          class="flex items-center gap-x-12 text-sm">
          <div class="flex gap-x-2 items-center text-gray-500">
            <div class="bg-gray-100 flex items-center justify-center rounded-full w-8 h-8 text-gray-500">
              <svg class="w-5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />

                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            {{ user.email }}
          </div>

          <button
            class="cursor-pointer text-gray-500 hover:text-gray-700"
            @click="logout">
            Log out
          </button>
        </div>

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
const { user, logout } = useAuth()
</script>
