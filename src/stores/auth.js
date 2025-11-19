import { defineStore } from 'pinia'
import { supabase } from 'src/boot/supabase'
import { Notify } from 'quasar'

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
        Notify.create({
          progress: true,
          type: 'negative',
          message: error.message,
        })
      } else {
        this.user = data.user
        Notify.create({
          type: 'positive',
          message: 'Login success!',
          caption: 'Welcome back, ' + email,

          // classes: 'full-width text-center',
          timeout: 5000,
          icon: 'check_circle',
        })
        console.log('✅ Login success:', data)
      }
    },

    async register(email, password, name, age, gender, religion, company, role) {
      this.loading = true
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (data?.user) {
        const { error: insertError } = await supabase.from('users').insert({
          user_id: data.user.id,
          email,
          name,
          age,
          gender,
          religion,
          company,
          role,
        })

        if (insertError) {
          console.error('Profile insert error:', insertError.message)
          throw insertError
        }
      }
      this.loading = false

      if (error) {
        console.error('Register error:', error.message)
        // alert('❌ ' + error.message)
        Notify.create({
          progress: true,
          type: 'negative',
          message: error.message,
        })
      } else {
        this.user = data.user
        Notify.create({
          type: 'positive',
          message: 'register',
          caption: 'register ' + email,
          // classes: 'full-width text-center',
          timeout: 10000,
          icon: 'check_circle',
        })
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
      Notify.create({
        type: 'positive',
        message: 'getUser',
        caption: 'getUser ',

        // classes: 'full-width text-center',
        timeout: 3000,
        icon: 'check_circle',
      })
      if (error) {
        // alert(error.message)
        Notify.create({
          progress: true,
          type: 'negative',
          message: error.message,
        })
      }
    },

    async loginWithGoogle() {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      Notify.create({
        type: 'positive',
        message: 'loginWithGoogle',
        caption: 'loginWithGoogle ',

        // classes: 'full-width text-center',
        timeout: 3000,
        icon: 'check_circle',
      })
      if (error) console.error('Google login error:', error)
      Notify.create({
        progress: true,
        type: 'negative',
        message: error.message,
      })
      return data
    },

    // start
    async getSession() {
      const { data, error } = await supabase.auth.getSession()
      if (error) {
        console.error('Get session error:', error.message)
        Notify.create({
          progress: true,
          type: 'negative',
          message: error.message,
        })
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
        Notify.create({
          progress: true,
          type: 'negative',
          message: error.message,
        })
        throw error
      }

      console.log('Reset email sent:', data)
      Notify.create({
        type: 'positive',
        message: 'sendForgetPassword',
        caption: 'sendForgetPassword',

        // classes: 'full-width text-center',
        timeout: 3000,
        icon: 'check_circle',
      })
      return data
    },

    async forgetPasswordUpdate(password) {
      this.loading = true
      const { data, error } = await supabase.auth.updateUser({
        password,
      })
      this.loading = false
      if (error) {
        Notify.create({
          progress: true,
          type: 'negative',
          message: error.message,
        })
        console.error('(Error)Password reset Update error:', error.message)
        throw error
      }
      Notify.create({
        type: 'positive',
        message: 'forgetPasswordUpdate!',
        caption: 'forgetPasswordUpdate, ',

        // classes: 'full-width text-center',
        timeout: 3000,
        icon: 'check_circle',
      })
      console.log('Password reset Update:', data)
      return data
    },
    //     const { data, error } = await supabase.auth.updateUser({
    //   password: new_password
    // })
  },
})
