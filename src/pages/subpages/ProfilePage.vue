<template>
  <q-page class="bg-grey-1 q-pa-md">
    <!-- Header Section -->
    <div class="column items-center q-mb-lg">
      <q-avatar size="80px" class="q-mb-sm">
        <img src="../../assets/logo.png" alt="user" />
      </q-avatar>
      <!-- <div class="text-h6 text-primary">{{ auth.user?.id }}</div> -->
      <div class="text-h6 text-primary">{{ auth.user?.email }}</div>
      <p>
        Email status:
        <span v-if="auth.user && auth.user.email_confirmed_at">
          Confirmed
          <!-- ({{ auth.user.email_confirmed_at }}) -->
        </span>
        <span v-else> Need to verify </span>
      </p>
      <!-- <div class="text-caption text-grey">{{ auth.user?.created_at }}</div> -->
    </div>

    <!-- Settings List -->
    <q-card flat bordered class="q-pa-none shadow-2 rounded-borders">
      <q-list separator>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="manage_accounts" color="primary" />
          </q-item-section>
          <q-item-section>Account</q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="lock" color="primary" />
          </q-item-section>
          <q-item-section>Privacy</q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="language" color="primary" />
          </q-item-section>
          <q-item-section>Language</q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="info" color="primary" />
          </q-item-section>
          <q-item-section>About Us</q-item-section>
          <q-item-section side>
            <q-icon name="chevron_right" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>

    <!-- <q-card flat bordered class="q-mt-md q-pa-md shadow-2 rounded-borders">
      <div class="text-subtitle1 text-weight-bold q-mb-sm">Daily Rewards</div>
      <div class="text-caption text-grey-7 q-mb-md">
        Claim your daily reward once per day.
      </div>
      <q-btn
        color="primary"
        class="full-width"
        :disable="hasClaimedToday"
        @click="claimReward"
        label="Claim Reward"
      />
      <div class="text-caption text-grey-7 q-mt-sm">
        {{ hasClaimedToday ? 'Reward claimed for today.' : 'Not claimed yet.' }}
      </div>
    </q-card> -->

    <q-card flat bordered class="q-mt-md q-pa-md shadow-2 rounded-borders">
      <!-- <div class="text-subtitle1 text-weight-bold q-mb-sm">Display</div> -->
      <div class="row items-center">
        <div class="col">
          <div class="text-body2">Dark mode</div>
          <!-- <div class="text-caption text-grey-7">Toggle app theme</div> -->
        </div>
        <q-toggle v-model="darkMode" color="primary" />
      </div>
    </q-card>

    <q-card flat bordered class="q-mt-md q-pa-md shadow-2 rounded-borders">
      <div class="text-subtitle1 text-weight-bold q-mb-sm">App Lock</div>
      <div class="text-caption text-grey-7 q-mb-md">
        Require passcode to open the app. Passcode is fixed: 1251.
      </div>
      <div class="row items-center">
        <div class="col">
          <div class="text-body2">Enable lock</div>
          <div class="text-caption text-grey-7">Ask for passcode on app open</div>
        </div>
        <q-toggle v-model="appLockEnabled" color="primary" />
      </div>
    </q-card>

    <h5 class="text-center">copyright by dpsmap</h5>
  </q-page>
</template>
/var/www/frontend/QuasarSupabaseChatgpt/src-capacitor/android/app/build/outputs/apk/debug/app-debug.apk
<script setup>
// import { computed, ref, watch } from 'vue'
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'stores/auth'
const auth = useAuthStore()
// const data = ref();

const $q = useQuasar()

// const todayKey = computed(() => {
//   const today = new Date()
//   return today.toISOString().slice(0, 10)
// })

// const lastClaimKey = 'dailyRewardLastClaim'
// const hasClaimedToday = computed(() => localStorage.getItem(lastClaimKey) === todayKey.value)

// const claimReward = () => {
//   localStorage.setItem(lastClaimKey, todayKey.value)
//   $q.notify({ message: 'Reward claimed!', color: 'positive' })
// }

const darkMode = ref($q.dark.isActive)
watch(darkMode, (val) => {
  $q.dark.set(val)
  localStorage.setItem('darkMode', val)
})

const appLockEnabled = ref(localStorage.getItem('appLockEnabled') === 'true')
watch(appLockEnabled, (val) => {
  localStorage.setItem('appLockEnabled', val)
})
</script>
