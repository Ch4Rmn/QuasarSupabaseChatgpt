import { LocalStorage } from 'quasar'

export default ({ router }) => {
  const done = LocalStorage.getItem('onboarding_done')
  if (!done) {
    router.replace('/onboarding')
  }
}
