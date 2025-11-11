<template>
  <router-view />
</template>

<script setup>
//
import { onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { useAuthStore } from 'stores/auth'

const auth = useAuthStore()
// const router = useRouter()

onMounted(() => {
  auth.getSession()
  auth.listenToAuth()
})
</script>
