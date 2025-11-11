// src/composables/useNotify.js
import { useQuasar } from 'quasar'

export default function useNotify() {
  const $q = useQuasar()

  function NotifySuccess(message = 'Success') {
    $q.notify({
      type: 'positive',
      message,
    })
  }

  function NotifyError(message = 'Error') {
    $q.notify({
      type: 'negative',
      message,
    })
  }

  return { NotifySuccess, NotifyError }
}
