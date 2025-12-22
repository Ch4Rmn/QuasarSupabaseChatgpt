import { boot } from 'quasar/wrappers'
import OneSignal from 'onesignal-cordova-plugin'

export default boot(() => {
  // Mobile Device ပေါ်ရောက်မှသာ အလုပ်လုပ်စေရန် listener ထည့်ခြင်း
  document.addEventListener(
    'deviceready',
    () => {
      // OneSignal Debugging (လိုအပ်ရင်ဖွင့်ပါ)
      // OneSignal.Debug.setLogLevel(6);

      // OneSignal ကို Initialize လုပ်ခြင်း
      OneSignal.initialize('08f7928e-f578-4a1f-9463-456b38d1f62b')

      // Notification တက်ဖို့အတွက် User ဆီက Permission တောင်းခြင်း
      OneSignal.Notifications.requestPermission(true)

      // Optional: Register for notification received events
      OneSignal.Notifications.addEventListener('received', (event) => {
        console.log('OneSignal: notification received', event)
      })

      // Optional: Register for notification opened events
      OneSignal.Notifications.addEventListener('opened', (event) => {
        console.log('OneSignal: notification opened', event)
      })
    },
    false,
  )
})

// boot
