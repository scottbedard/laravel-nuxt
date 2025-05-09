<template>
  <div class="max-w-7xl mx-auto p-6 text-sm">
    <div class="border-b border-gray-200 flex items-center justify-between pb-6">
      <NuxtLink
        class="cursor-pointer flex gap-x-2 items-center text-gray-800 hover:text-blue-500"
        to="/">
        laravel-nuxt.dev
      </NuxtLink>

      <div class="flex gap-x-6 justify-end">
        <div
          v-if="user"
          class="flex items-center gap-x-12 text-sm">
          <div class="flex gap-x-2 items-center text-gray-800">
            <div class="bg-gray-100 flex items-center justify-center rounded-full w-7 h-7 text-gray-500">
              <svg class="w-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />

                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <span v-text="user.email" />
          </div>

          <button
            class="cursor-pointer flex items-center gap-x-2 text-gray-800 hover:text-blue-500"
            data-testid="logout"
            @click="logout">
            <svg class="w-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />

              <polyline points="16 17 21 12 16 7" />

              <line x1="21" x2="9" y1="12" y2="12" />
            </svg>
            Log out
          </button>
        </div>

        <div
          v-else
          class="flex gap-x-12 text-sm">
          <NuxtLink
            class="text-gray-800 hover:text-blue-500"
            to="/login"
            variant="ghost">
            Log in
          </NuxtLink>

          <NuxtLink
            class="text-gray-800 hover:text-blue-500"
            to="/register"
            variant="secondary">
            Register
          </NuxtLink>
        </div>
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
