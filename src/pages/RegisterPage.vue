<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="email" label="Email" outlined />
        <q-input v-model="password" label="Password" type="password" outlined />
        <q-btn
          label="Register"
          color="primary"
          class="full-width q-mt-md"
          @click="handleRegister"
          :loading="auth.loading"
        />
        <div class="q-mt-md">
          <router-link to="/auth/login">Already have account?</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')

const handleRegister = async () => {
  await auth.register(email.value, password.value)
  if (auth.user) router.push({ name: 'emailVerification', query: { email: email.value } })
  // if (auth.user) router.push('/')
  // else router.push('auth/email-verification')
}
</script>
