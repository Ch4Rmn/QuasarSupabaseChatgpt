import { ref, onMounted, onUnmounted } from 'vue'
import { Network } from '@capacitor/network'

export function useNetwork() {
  const isOnline = ref(true)

  const updateStatus = (status) => {
    isOnline.value = status.connected
  }

  onMounted(async () => {
    const status = await Network.getStatus()
    isOnline.value = status.connected
    Network.addListener('networkStatusChange', updateStatus)
  })

  onUnmounted(() => {
    Network.removeAllListeners()
  })

  return {
    isOnline,
  }
}
