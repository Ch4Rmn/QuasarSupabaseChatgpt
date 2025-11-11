<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Login</div>
      </q-card-section>

      <q-card-section>
        <q-input
          v-model="email"
          label="Email"
          outlined
          lazy-rules
          :rules="[(val) => !!val || 'Email is required']"
          type="email"
        />
        <q-input
          v-model="password"
          label="Password"
          type="password"
          outlined
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length > 6) ||
              'Password is required and need to be more than 6 characters',
          ]"
        />
        <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->

        <q-btn
          label="Login"
          color="primary"
          class="full-width q-mt-md"
          @click="handleLogin"
          :loading="auth.loading"
        />
        <q-btn
          label="Login with Google"
          color="red"
          class="full-width q-mt-sm"
          @click="auth.loginWithGoogle"
        />
        <div class="q-mt-md">
          <router-link to="/auth/register">Create account</router-link>
          <router-link to="/auth/forgetPassword" class="float-right">Forget password</router-link>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
// import UseNotify from 'src/composables/UseNotify'
// import useNotify from 'src/composables/UseNotify'

const auth = useAuthStore()
const router = useRouter()
const email = ref('')
const password = ref('')
// const {NotifyError} = UseNotify()

const handleLogin = async () => {
  await auth.login(email.value, password.value)
  // const { NotifyError } = useNotify()
  // NotifyError('Invalid login')
  if (auth.user) router.push({ name: 'home' })
}
</script>
