<template>
  <div>
    <h1 class="text-2xl font-bold text-center">Login</h1>

    <form
      :class="[
        'gap-6 grid max-w-sm mx-auto w-full',
        {
          'opacity-50 pointer-events-none': loading,
        },
      ]"
      @submit.prevent="onSubmit">
      <Input
        v-model="form.email"
        autofocus
        data-testid="email"
        label="Email"
        type="email"
        :disabled="loading" />

      <Input
        v-model="form.password"
        data-testid="password"
        label="Password"
        type="text"
        :disabled="loading" />

      <Button
        data-testid="submit"
        type="submit"
        variant="primary"
        :disabled="loading">
        Log in
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['sanctum:guest'],
})

const { login } = useAuth()

const form = ref({
  email: '',
  password: '',
})

const loading = ref(false)

async function onSubmit() {
  loading.value = true

  try {
    const res1 = await login(form.value)

    console.log({ res1 })

    await navigateTo('/')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>
