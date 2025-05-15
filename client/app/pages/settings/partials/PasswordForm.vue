<template>
  <form
    class="max-w-md space-y-4"
    @submit.prevent="updatePassword">
    <h1 class="text-2xl">Change password</h1>

    <Input
      v-model="form.currentPassword"
      autocomplete="current-password"
      data-testid="current-password"
      label="Current Password"
      placeholder="Enter your current password"
      type="password" />

    <Input
      v-model="form.password"
      autocomplete="off"
      data-testid="new-password"
      label="New Password"
      placeholder="Enter your new password"
      type="password" />

    <Input
      v-model="form.passwordConfirmation"
      autocomplete="off"
      data-testid="new-password-confirmation"
      label="Confirm New Password"
      placeholder="Confirm your new password"
      type="password" />

    <div class="flex justify-end">
      <Button
        data-testid="update-password-button"
        type="submit"
        :disabled="loading">
        Update Password
      </Button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const client = useSanctumClient()

const loading = ref(false)

const form = ref({
  currentPassword: '',
  password: '',
  passwordConfirmation: '',
})

const updatePassword = async () => {
  loading.value = true

  try {
    const { result } = await client<{ result: string }>('/password', {
      body: form.value,
      method: 'post',
    })

    if (result === 'success') {
      form.value = {
        currentPassword: '',
        password: '',
        passwordConfirmation: '',
      }
    }
  } catch (error) {
    console.error('Failed to update password:', error)
  } finally {
    loading.value = false
  }
}
</script>
