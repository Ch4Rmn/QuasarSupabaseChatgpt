<template>
  <q-page class="q-pa-md">
    <h4>Welcome, {{ auth.user?.email }}</h4>
    <p>User ID: {{ auth.user?.id }}</p>
    <p>User Created_at: {{ auth.user?.created_at }}</p>
    <p>
      Email status:
      <span v-if="auth.user && auth.user.email_confirmed_at">
        Confirmed
        <!-- ({{ auth.user.email_confirmed_at }}) -->
      </span>
      <span v-else> Need to verify </span>
    </p>
  </q-page>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
const auth = useAuthStore()
</script>
