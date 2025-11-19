<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="q-pa-lg" style="width: 400px">
      <q-card-section>
        <div class="text-h6">Register</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="name" label="Full Name" />
        <q-input v-model="email" label="Email" />
        <q-input v-model="password" label="Password" type="password" />
        <q-input v-model.number="age" label="Age" type="number" />
        <q-select v-model="gender" :options="['Male', 'Female']" label="Gender" />
        <q-input v-model="religion" label="Religion" />
        <q-input v-model="company" label="Company Name" />
        <!--  -->
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
const name = ref('')
const password = ref('')
const age = ref(null)
const gender = ref('')
const religion = ref('')
const company = ref('')
//  age, gender, religion, company, role

const handleRegister = async () => {
  await auth.register(
    email.value,
    password.value,
    name.value,
    age.value,
    gender.value,
    religion.value,
    company.value,
  )
  if (auth.user) router.push({ name: 'emailVerification', query: { email: email.value } })
  // if (auth.user) router.push('/')
  // else router.push('auth/email-verification')
}
</script>
