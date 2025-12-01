// import { useAuthStore } from 'stores/auth'
import AuthLayout from 'layouts/AuthLayout.vue'
import MainLayout from 'layouts/MainLayout.vue'
import LoginPage from 'pages/LoginPage.vue'
import RegisterPage from 'pages/RegisterPage.vue'
import OnboardingPage from 'pages/subpages/OnboardingPage.vue'
import HomePage from 'pages/HomePage.vue'
import { supabase } from 'src/boot/supabase'
import EmailVertifaction from 'src/pages/EmailVertifaction.vue'
import ForgetPassword from 'src/pages/ForgetPassword.vue'
import ForgetPasswordUpdate from 'src/pages/ForgetPasswordUpdate.vue'
import ProfilePage from 'src/pages/subpages/ProfilePage.vue'
// import AboutPage from 'src/pages/subpages/SavedPage.vue'
import LinksPage from 'src/pages/subpages/LinksPage.vue'
import BusinessPage from 'src/pages/subpages/BusinessPage.vue'
import MapPage from 'src/pages/subpages/MapPage.vue'
import AddressPage from 'src/pages/subpages/AddressPage.vue'
import NotifactionPage from 'src/pages/subpages/NotifactionPage.vue'
// import { LocalStorage } from 'quasar'
// import SearchPage from 'src/pages/subpages/SearchPage.vue'
// import SearchPage from 'src/pages/subpages/SearchPage.vue'

const requireAuth = async (to, from, next) => {
  const { data, error } = await supabase.auth.getSession()

  if (error || !data.session) {
    // const done = LocalStorage.getItem('onboarding_done')
    // if (!done) {
    // next('/auth/onboarding')
    // } else {
    next('/auth/login')
    // }
  } else {
    next()
  }
}

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'onboarding', name: 'onboarding', component: OnboardingPage },
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
      { path: 'email-verification', name: 'emailVerification', component: EmailVertifaction },
      { path: 'forgetPassword', name: 'forgetPassword', component: ForgetPassword },
      {
        path: 'forgetPasswordUpdate',
        name: 'forgetPasswordUpdate',
        component: ForgetPasswordUpdate,
      },
    ],
  },
  {
    path: '/',
    component: MainLayout,
    beforeEnter: requireAuth,
    children: [
      { path: '', name: 'home', component: HomePage },
      // { path: 'about', name: 'about', component: AboutPage },
      { path: 'links', name: 'links', component: LinksPage },
      // { path: 'search', name: 'search', component: SearchPage },
      { path: 'profile', name: 'profile', component: ProfilePage },
      { path: 'businessList', name: 'business', component: BusinessPage },
      { path: 'addressList', name: 'address', component: AddressPage },

      { path: 'map', name: 'map', component: MapPage },
      { path: 'notifaction', name: 'notifaction', component: NotifactionPage },
      // { path: '', name: 'about', component: HomePage },
    ],
  },
]

export default routes
