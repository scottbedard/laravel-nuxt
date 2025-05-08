<template>
  <div>
    <h1 class="text-2xl font-bold text-center">Register</h1>

    <form
      :class="[
        'gap-6 grid max-w-sm mx-auto w-full',
        {
          'opacity-50 pointer-events-none': loading,
        }
      ]"
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

const loading = ref(false)

async function onSubmit() {
  loading.value = true

  try {
    await client('api/register', {
      method: 'POST',
      body: form.value,
    })

    await auth.refreshIdentity()

    await navigateTo('/')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
