<template>
  <div>
    <div v-if="user">
      <h1 class="font-semibold tracking-wide">Current user</h1>

      <pre class="my-3 text-sm">{{ user }}</pre>

      <button
        type="button"
        class="cursor-pointer rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        @click="onLogout">
        Logout
      </button>
    </div>

    <div
      v-else
      class="flex flex-wrap gap-6">
      <form
        class="flex-1 gap-2 grid max-w-64"
        @submit.prevent="onRegister">
        <h2 class="font-semibold tracking-wide">Register</h2>

        <input
          v-model="register.email"
          aria-label="Email" 
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          name="email" 
          placeholder="you@example.com"
          required
          type="email" />
        
        <input
          v-model="register.password"
          aria-label="Password" 
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          name="password"
          required
          type="password" />

        <div class="flex">
          <button
            type="submit"
            class="cursor-pointer rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Register
          </button>
        </div>
      </form>

      <form
        class="flex-1 gap-2 grid max-w-64"
        @submit.prevent="onLogin">
        <h2 class="font-semibold tracking-wide">Login</h2>

        <input
          v-model="login.email"
          aria-label="Email" 
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          name="email" 
          placeholder="you@example.com"
          required
          type="email" />
        
        <input
          v-model="login.password"
          aria-label="Password" 
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          name="password"
          required
          type="password" />

        <div class="flex">
          <button
            type="submit"
            class="cursor-pointer rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
useHead({
  title: 'laravel-nuxt',
  bodyAttrs: {
    class: 'antialiased p-6',
  },
})

const auth = useSanctumAuth();

const client = useSanctumClient();

const user = useSanctumUser();

const register = ref({
  email: 'alice@example.com',
  password: 'password',
})

const login = ref({
  email: 'alice@example.com',
  password: 'password',
})

async function onLogin() {
  await auth.login(login.value)
}

async function onLogout() {
  await auth.logout()
}

async function onRegister() {
  await client('api/register', {
    method: 'POST',
    body: register.value,
  })

  await auth.refreshIdentity()
}
</script>