<template>
  <q-pull-to-refresh @refresh="refresh">
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary glossy text-white">
        <q-toolbar>
          <q-avatar square size="40px" class="q-m-sm">
            <img src="../assets/logo.png" alt="user" />
          </q-avatar>
          <q-toolbar-title>
            <!-- <q-tab to="/" clickable> -->
            DPSMAP
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

      <q-footer bordered class="bg-white text-primary">
        <q-tabs align="justify" dense active-color="white" indicator-color="transparent">
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
    </q-layout>
  </q-pull-to-refresh>
</template>

<script setup>
import { useAuthStore } from 'stores/auth'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const auth = useAuthStore()
const router = useRouter()
const $q = useQuasar()

$q.addressbarColor.set('#a2e3fa')

function refresh(done) {
  setTimeout(() => {
    window.location.reload()
    done()
  }, 3000)
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
