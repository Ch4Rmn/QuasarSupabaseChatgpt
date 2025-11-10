<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Main Layout</q-toolbar-title>
        <q-space />
        <q-btn flat label="Logout" color="negative" @click="logout" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = async () => {
  await auth.logout()
  router.push('/auth/login')
}
</script>
