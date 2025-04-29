<template>
  <div>
    <pre>{{ { user } }}</pre>

    <form @submit.prevent="onRegister">
      <div>Register</div>
      <input type="email" v-model="register.email" />
      <input type="password" v-model="register.password" />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script lang="ts" setup>
const auth = useSanctumAuth();

const client = useSanctumClient();

const user = useSanctumUser();

const register = ref({
  email: 'alice@example.com',
  password: 'password',
})

async function onRegister() {
  await client('http://localhost:80/api/register', {
    method: 'POST',
    body: register.value,
  })
}
</script>