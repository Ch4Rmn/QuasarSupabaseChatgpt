<template>
  <div class="q-pa-md window-height full-width">
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
      >
        <q-tab name="Notifactions" label="Notifactions" />
        <q-tab name="Promotions" label="Promotions" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <!-- PROMOTIONS TAB -->
        <q-tab-panel name="Promotions">
          <div class="q-gutter-md">
            <!-- 🔥 Loop all rows -->
            <q-card
              v-for="item in rows"
              :key="item.id"
              bordered
              class="q-pa-md"
              @click="goPromotions(item.url)"
            >
              <input type="hidden" :value="item.id" />
              <div
                class="q-mt-sm text-subtitle1 text-weight-medium"
                style="text-decoration: underline"
              >
                {{ item.title }}
              </div>
              <p class="q-mt-sm">{{ item.description }}</p>
            </q-card>
          </div>
        </q-tab-panel>

        <!-- NOTIFICATIONS TAB -->
        <q-tab-panel name="Notifactions">
          <div class="q-gutter-md">
            <q-card bordered class="q-pa-md">
              <div class="text-h6">Login</div>
              <p class="q-mt-sm">Login</p>
              <p class="q-mt-sm">Login</p>
            </q-card>

            <q-card bordered class="q-pa-md">
              <div class="text-h6">Logout</div>
              <p class="q-mt-sm">Logout</p>
              <p class="q-mt-sm">Logout</p>
            </q-card>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
// import { useRouter } from 'vue-router'
import { useUserApiStore } from 'src/stores/user'
// import { usePromoStore } from 'src/stores/promo'

// const promoStore = usePromoStore()

const rows = ref([])
// const countPromo = ref()

const userStore = useUserApiStore()
// const router = useRouter()

const tab = ref('Notifactions')
const loading = ref(false)

// go to promotions page
function goPromotions(url) {
  // alert(url)
  window.open(url)
}

const handleList = async () => {
  loading.value = true
  try {
    const data = await userStore.listWithOutCache('promotions')
    rows.value = Array.isArray(data) ? data : []
    // countPromo.value = rows.value.length
    // promoStore.countPromo = rows.value.length
    // console.log('length', promoStore.countPromo)

    console.log('Fetched rows:', rows.value)
  } catch (err) {
    console.error(err)
    rows.value = []
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  handleList()
})
</script>
