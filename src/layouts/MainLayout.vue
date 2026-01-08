<template>
  <!-- <q-pull-to-refresh @refresh="refresh"> -->
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary glossy text-white">
      <q-toolbar>
        <q-avatar square size="40px" class="q-m-sm">
          <img src="../assets/logo.png" alt="user" />
        </q-avatar>
        <q-toolbar-title>
          <!-- <q-tab to="/" clickable> -->
          <!-- DPSMAP -->
          <!-- </q-tab> -->
        </q-toolbar-title>
        <q-space />

        <q-select
          v-model="locale"
          :options="langs"
          dense
          outlined
          emit-value
          map-options
          style="width: 120px"
          @update:model-value="switchLang"
        />
        <q-btn
          flat
          round
          dense
          @click="toggleDarkMode"
          :icon="$q.dark.isActive ? 'dark_mode' : 'light_mode'"
          class="q-mr-sm"
        />
        <!--  -->
        <q-icon
          :name="isOnline ? 'wifi' : 'signal_wifi_off'"
          :color="isOnline ? 'white' : 'red-5'"
          size="28px"
        >
          <q-tooltip>{{ isOnline ? 'Online' : 'Offline' }}</q-tooltip>
        </q-icon>
        <!--  -->
        <q-btn flat @click="goNotifaction" dense color="black" icon="email" class="q-ml-md">
          <q-badge color="red" floating> {{ promoCountStore.countPromo }}</q-badge>
          <!-- <q-badge color="red" floating> 4</q-badge> -->
        </q-btn>
        <q-btn-dropdown flat icon="account_circle" label="">
          <q-list>
            <q-item clickable v-close-popup @click="goUser">
              <q-item-section>
                <q-item-label>User</q-item-label>
              </q-item-section>
            </q-item>

            <q-item clickable v-close-popup :disable="!isOnline" @click="logout">
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

    <q-footer
      bordered
      class="text-white"
      style="background-color: rgba(0, 0, 0, 0.5); backdrop-filter: blur(7px)"
    >
      <q-tabs align="justify" dense active-color="black" indicator-color="transparent">
        <q-route-tab
          icon="home"
          :label="$t('home')"
          to="/"
          exact
          active-class="tab-active"
          ripple
        />

        <q-route-tab
          icon="link"
          :label="$t('links')"
          to="/links"
          active-class="tab-active"
          ripple
        />

        <q-route-tab
          icon="category"
          :label="$t('business')"
          to="/businessList"
          active-class="tab-active"
          ripple
        />

        <q-route-tab
          icon="home work"
          :label="$t('address')"
          to="/addressList"
          active-class="tab-active"
          ripple
        />

        <!-- <q-route-tab
            icon="info"
            :label="$t('about')"
            to="/about"
            active-class="tab-active"
            ripple
          /> -->
        <!-- sds -->

        <q-route-tab
          icon="person"
          :label="$t('user')"
          to="/profile"
          active-class="tab-active"
          ripple
        />
      </q-tabs>
    </q-footer>

    <q-dialog v-model="lockDialog" persistent>
      <q-card style="min-width: 280px">
        <q-card-section>
          <div class="text-h6">App Locked</div>
          <div class="text-caption text-grey-7">Enter passcode to continue.</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="lockInput"
            outlined
            dense
            type="password"
            label="Passcode"
            @keyup.enter="unlockApp"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn color="primary" label="Unlock" @click="unlockApp" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
  <!-- </q-pull-to-refresh> -->
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { onMounted, ref, watch } from 'vue'
import { usePromoCountStore } from 'src/stores/promoCount'
import { useNetwork } from 'src/composables/UseNetwork'

// import { usePromoStore } from 'src/stores/promo'

// const promoStore = usePromoStore()
const promoCountStore = usePromoCountStore()
// console.log(promoCountStore.countPromo)

const { isOnline } = useNetwork()

const { locale } = useI18n()
const auth = useAuthStore()
const router = useRouter()
const $q = useQuasar()

$q.addressbarColor.set('#a2e3fa')

// function refresh(done) {
//   setTimeout(() => {
//     window.location.reload()
//     done()
//   }, 3000)
// }

const goNotifaction = () => {
  promoCountStore.reset()
  router.push('/notifaction')
}

// i18n
const langs = [
  { label: 'English', value: 'en-US' },
  { label: 'မြန်မာ', value: 'mm-MM' },
]

const switchLang = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}
if (localStorage.getItem('lang')) {
  locale.value = localStorage.getItem('lang')
}
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

const lockDialog = ref(false)
const lockInput = ref('')
const lockEnabled = ref(false)
const isUnlocked = ref(false)

const syncLockState = () => {
  lockEnabled.value = localStorage.getItem('appLockEnabled') === 'true'
  if (!lockEnabled.value) {
    isUnlocked.value = true
    lockDialog.value = false
    return
  }
  if (!isUnlocked.value) {
    lockDialog.value = true
  }
}

const unlockApp = () => {
  if (lockInput.value === '1251') {
    isUnlocked.value = true
    lockDialog.value = false
    lockInput.value = ''
    return
  }
  $q.notify({ message: 'Invalid passcode', color: 'negative' })
}

watch(
  () => router.currentRoute.value.fullPath,
  () => {
    syncLockState()
  },
)

onMounted(() => {
  syncLockState()
})
</script>

<style scoped>
.q-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.tab-active {
  /* background: linear-gradient(135deg, #1976d2, #2196f3); */
  background: black;
  color: #fff !important;
  border-radius: px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  padding: 4px 8px;
}
</style>
