<template>
  <q-page class="flex flex-center column">
    <div class="text-h5 q-mb-md">Welcome Page</div>
    <div class="text-subtitle1 q-mb-lg">
      သင့်အက်ပ်ကို အသုံးပြုမယ့်အတွက် လမ်းညွှန်ချက်တွေကို ဖော်ပြထားပါတယ်။
    </div>

    <q-image src="../../assets/welcome.png" />

    <!-- <q-carousel v-model="slide" animated arrows navigation infinite> -->
    <!-- <q-carousel-slide name="1" img-src="../../assets/welcome.png" /> -->
    <!-- <q-carousel-slide name="2" img-src="../../assets/welcome.png" /> -->
    <!-- <q-carousel-slide name="3" img-src="../../assets/welcome.png"> -->
    <q-btn label="Get Started" color="primary" @click="finishOnboarding" />
    <!-- </q-carousel-slide> -->
    <!-- </q-carousel> -->
  </q-page>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { LocalStorage } from 'quasar'

const router = useRouter()

function finishOnboarding() {
  LocalStorage.set('onboarding_done', true)
  router.push('/auth/login')
}
</script>
