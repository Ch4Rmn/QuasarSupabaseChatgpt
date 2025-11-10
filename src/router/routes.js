// import { useAuthStore } from 'stores/auth'
import AuthLayout from 'layouts/AuthLayout.vue'
import MainLayout from 'layouts/MainLayout.vue'
import LoginPage from 'pages/LoginPage.vue'
import RegisterPage from 'pages/RegisterPage.vue'
import HomePage from 'pages/HomePage.vue'
import { supabase } from 'src/boot/supabase'
import EmailVertifaction from 'src/pages/EmailVertifaction.vue'

const requireAuth = async (to, from, next) => {
  const { data, error } = await supabase.auth.getSession()

  if (error || !data.session) {
    next('/auth/login')
  } else {
    next()
  }
}

const routes = [
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'register', component: RegisterPage },
      { path: 'email-verification', name: 'emailVerification', component: EmailVertifaction },
    ],
  },
  {
    path: '/',
    component: MainLayout,
    beforeEnter: requireAuth,
    children: [
      { path: '', name: 'home', component: HomePage },
      // { path: '', name: 'about', component: HomePage },
    ],
  },
]

export default routes
