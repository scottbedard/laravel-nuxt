<template>
  <div>
    <pre>{{ { user } }}</pre>

    <form @submit.prevent="onRegister">
      <div>Register</div>
      <input type="email" v-model="register.email" />
      <input type="password" v-model="register.password" />
      <button type="submit">Register</button>
    </form>

    <br>

    <form @submit.prevent="onLogin">
      <div>Login</div>
      <input type="email" v-model="login.email" />
      <input type="password" v-model="login.password" />
      <button type="submit">Login</button>
    </form>

    <br>

    <button @click="onLogout">Logout</button>
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

const login = ref({
  email: 'alice@example.com',
  password: 'password',
})

async function onRegister() {
  await client('api/register', {
    method: 'POST',
    body: register.value,
  })

  await auth.refreshIdentity()
}

async function onLogin() {
  await auth.login(login.value)
}

async function onLogout() {
  await auth.logout()
}
</script>