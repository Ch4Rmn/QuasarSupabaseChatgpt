<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Forget Password</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="password" label="Password" outlined />
        <q-btn
          label="Send"
          color="primary"
          class="full-width q-mt-md"
          @click="handleForgetPasswordUpdate"
          :loading="auth.loading"
        />
        <div class="q-mt-md">
          <router-link to="/auth/login">Back to Login</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'stores/auth'
// import { useRouter } from 'vue-router'

const auth = useAuthStore()
// const router = useRouter()
const password = ref('')

const handleForgetPasswordUpdate = async () => {
  try {
    await auth.forgetPasswordUpdate(password.value)
    alert(`Password reset link sent to ${password.value}`)
  } catch (err) {
    alert('Error sending reset email: ' + err.message)
  }
}

// alert('sd')
</script>
