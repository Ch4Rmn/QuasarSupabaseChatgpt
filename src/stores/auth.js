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
  },

  async getSession() {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Get session error:', error.message)
      return null
    }
    return data.session
  },
})
