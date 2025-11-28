import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useUserApiStore } from 'src/stores/user'

export const usePromoCountStore = defineStore('promoCount', () => {
  const countPromo = ref(0)
  const rows = ref([])

  const userStore = useUserApiStore()

  async function load() {
    const data = await userStore.list('promotions')
    rows.value = Array.isArray(data) ? data : []
    countPromo.value = rows.value.length
  }

  function reset() {
    countPromo.value = 0
    rows.value = []
  }

  // auto load
  load()

  return { countPromo, load, reset }
})
