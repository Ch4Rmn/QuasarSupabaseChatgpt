import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePromoStore = defineStore('promo', () => {
  const countPromo = ref(0)
  return { countPromo }
})
