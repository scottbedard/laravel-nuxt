<template>
  <div>
    <h1 class="text-2xl font-bold text-center">Register</h1>

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
        Register
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:guest'],
})

const auth = useSanctumAuth()

const client = useSanctumClient()

const form = ref({
  email: 'alice@example.com',
  password: 'password',
})

async function onSubmit() {
  await client('api/register', {
    method: 'POST',
    body: form.value,
  })

  await auth.refreshIdentity()

  await navigateTo('/')
}
</script>