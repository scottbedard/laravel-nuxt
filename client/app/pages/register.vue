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
        data-testid="email"
        label="Email"
        type="email" />

      <Input
        v-model="form.password"
        data-testid="password"
        label="Password"
        type="password" />

      <Button
        data-testid="submit"
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

const { refreshIdentity } = useAuth()

const client = useSanctumClient()

const form = ref({
  email: 'alice@example.com',
  password: 'password',
})

const loading = ref(false)

async function onSubmit() {
  loading.value = true

  try {
    await client('register', {
      method: 'POST',
      body: form.value,
    })

    await refreshIdentity()

    await navigateTo('/')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
