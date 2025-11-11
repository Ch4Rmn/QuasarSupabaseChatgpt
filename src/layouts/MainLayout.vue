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

    <!-- Footer Bar -->
    <q-footer bordered class="bg-white text-primary">
      <q-tabs align="justify" dense active-color="primary" indicator-color="transparent">
        <!-- Home -->
        <q-route-tab icon="home" label="Home" to="/" exact />

        <!-- Links -->
        <q-route-tab icon="link" label="Links" to="/links" />

        <!-- Search -->
        <q-route-tab icon="search" label="Search" to="/search" />

        <!-- About -->
        <q-route-tab icon="info" label="About" to="/about" />

        <!-- Profile -->
        <q-route-tab icon="person" label="Profile" to="/profile" />
      </q-tabs>
    </q-footer>
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

<style scoped>
.q-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
