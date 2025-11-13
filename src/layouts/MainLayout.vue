<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-avatar square size="40px" class="q-m-sm">
          <img src="../assets/logo.png" alt="user" />
        </q-avatar>
        <q-toolbar-title>DPSMAP</q-toolbar-title>
        <q-space />
        <q-btn
          flat
          round
          dense
          @click="toggleDarkMode"
          :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
          class="q-mr-sm"
        />
        <q-btn-dropdown flat icon="account_circle" label="">
          <q-list>
            <q-item clickable v-close-popup @click="goUser">
              <q-item-section>
                <q-item-label>User</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="logout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup @click="onItemClick">
              <q-item-section>
                <q-item-label>Setting</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>

        <!-- <q-btn flat label="Logout" color="negative" @click="logout" /> -->
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
import { useQuasar } from 'quasar'

const auth = useAuthStore()
const router = useRouter()
const $q = useQuasar()

// Dark mode
function toggleDarkMode() {
  $q.dark.toggle()
  localStorage.setItem('darkMode', $q.dark.isActive)

  // Apply saved dark mode
  if (localStorage.getItem('darkMode') === 'true') $q.dark.set(true)
  else $q.dark.set(false)
}

// route
function goUser() {
  router.push('/profile')
}

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
