<template>
  <div>
    <h1 class="text-2xl font-bold text-center">Login</h1>

    <form
      class="gap-6 grid max-w-sm mx-auto w-full"
      @submit.prevent="onSubmit">
      <Input
        v-model="form.email"
        autofocus
        label="Email"
        type="email" />

      <Input
        v-model="form.password"
        label="Password"
        type="password" />

      <Button
        type="submit"
        variant="primary">
        Log in
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:guest'],
})

const auth = useSanctumAuth()

const form = ref({
  email: 'alice@example.com',
  password: 'password',
})

async function onSubmit() {
  await auth.login(form.value)

  await navigateTo('/')
}
</script>