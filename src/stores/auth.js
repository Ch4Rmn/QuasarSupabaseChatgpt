import { defineStore } from 'pinia'
import { supabase } from 'src/boot/supabase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    loading: false,
  }),

  actions: {
    async login(email, password) {
      this.loading = true
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      this.loading = false

      if (error) {
        console.error('Login error:', error.message)
        alert('❌ ' + error.message)
      } else {
        this.user = data.user
        console.log('✅ Login success:', data)
      }
    },

    async register(email, password) {
      this.loading = true
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      this.loading = false

      if (error) {
        console.error('Register error:', error.message)
        alert('❌ ' + error.message)
      } else {
        this.user = data.user
        console.log('✅ Register success:', data)
      }
    },

    async logout() {
      await supabase.auth.signOut()
      this.user = null
    },

    async getUser() {
      const { data, error } = await supabase.auth.getUser()
      if (data?.user) {
        this.user = data.user
      }
      if (error) {
        alert(error.message)
      }
    },

    async loginWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      if (error) console.error('Google login error:', error)
      return data
    },

    // start
    async getSession() {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Get session error:', error.message)
        return null
      }
      return data.session
    },

    async listenToAuth() {
      // This will keep user data even after refresh
      supabase.auth.onAuthStateChange((_event, session) => {
        this.user = session?.user || null
      })
    },
    // end

    async sendForgetPassword(email) {
      this.loading = true
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:9001/auth/forgetPasswordUpdate',
      })
      this.loading = false

      if (error) {
        console.error('Password reset error:', error.message)
        throw error
      }

      console.log('Reset email sent:', data)
      return data
    },

    async forgetPasswordUpdate(password) {
      this.loading = true
      const { data, error } = await supabase.auth.updateUser({
        password,
      })
      this.loading = false
      if (error) {
        console.error('(Error)Password reset Update error:', error.message)
        throw error
      }

      console.log('Password reset Update:', data)
      return data
    },
    //     const { data, error } = await supabase.auth.updateUser({
    //   password: new_password
    // })
  },
})
