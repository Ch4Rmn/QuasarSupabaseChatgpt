import { defineStore } from 'pinia'
import { supabase } from 'src/boot/supabase'
import { Notify } from 'quasar'
import { useAuthStore } from './auth'

export const useUserApiStore = defineStore('userapi', {
  state: () => ({
    data: null,
    loading: false,
  }),

  actions: {
    async list(table) {
      try {
        this.loading = true
        const { data, error } = await supabase.from(table).select('*')
        this.loading = false
        if (data) this.channel(table)

        if (error) throw new Error(error.message)

        Notify.create({
          progress: true,
          type: 'positive',
          message: 'Data loaded successfully!',
        })
        return data
      } catch (err) {
        this.loading = false
        Notify.create({
          progress: true,
          type: 'negative',
          message: err.message || 'Something went wrong',
        })
      }
    },

    async channel(table) {
      try {
        supabase
          .channel('poi-channel')
          .on('postgres_changes', { event: '*', schema: 'public', table: table }, (payload) => {
            console.log('Change received!', payload)
            this.data = payload.new
          })
          .subscribe()
      } catch (error) {
        Notify.create({
          progress: true,
          type: 'negative',
          message: error.message || 'Something went wrong',
        })
      }
    },

    // async getRole (table,id) {
    //   try {
    //     this.loading = true
    //     // const { data, error } = await supabase.from(table).select('*').eq('id', id).single()

    //   } catch (error) {

    //   }
    // }

    async getById(table, id) {
      try {
        this.loading = true
        const { data, error } = await supabase.from(table).select('*').eq('id', id).single()
        this.loading = false

        if (error) throw new Error(error.message)

        Notify.create({
          progress: true,
          type: 'positive',
          message: 'Data loaded successfully!',
        })
        return data
      } catch (err) {
        this.loading = false
        Notify.create({
          progress: true,
          type: 'negative',
          message: err.message || 'Something went wrong',
        })
      }
    },

    async getByIdForColumns(table, id, fields = '*') {
      try {
        this.loading = true
        const { data, error } = await supabase.from(table).select(fields).eq('user_id', id).single()

        this.loading = false

        if (error) throw new Error(error.message)

        return data
      } catch (err) {
        this.loading = false
        Notify.create({
          progress: true,
          type: 'negative',
          message: err.message || 'Something went wrong',
        })
      }
    },

    // async getByRole(table, id) {
    //   try {
    //     this.loading = true
    //     const { data, error } = await supabase.from(table).select('role').eq('id', id).single()
    //     this.loading = false

    //     if (error) throw new Error(error.message)

    //     Notify.create({
    //       progress: true,
    //       type: 'positive',
    //       message: 'Data loaded successfully!',
    //     })
    //     return data
    //   } catch (err) {
    //     this.loading = false
    //     Notify.create({
    //       progress: true,
    //       type: 'negative',
    //       message: err.message || 'Something went wrong',
    //     })
    //   }
    // },

    async post(table, form) {
      try {
        this.loading = true
        const auth = useAuthStore()
        const user = auth.user

        const { data, error } = await supabase.from(table).insert([{ ...form, user_id: user?.id }])

        this.loading = false
        if (error) throw new Error(error.message)

        Notify.create({
          progress: true,
          type: 'positive',
          message: 'Data pushed successfully!',
        })
        return data
      } catch (err) {
        this.loading = false
        Notify.create({
          progress: true,
          type: 'negative',
          message: err.message || 'Data push went wrong',
        })
      }
    },

    async update(table, form) {
      try {
        this.loading = true
        const { data, error } = await supabase
          .from(table)
          .update({ ...form })
          .eq('id', form.id)

        this.loading = false
        if (error) throw new Error(error.message)

        Notify.create({
          progress: true,
          type: 'positive',
          message: 'Data updated successfully!',
        })
        return data
      } catch (err) {
        this.loading = false
        Notify.create({
          progress: true,
          type: 'negative',
          message: err.message || 'Data update went wrong',
        })
      }
    },

    async destroy(table, id) {
      try {
        this.loading = true
        const { data, error } = await supabase.from(table).delete().eq('id', id)

        this.loading = false
        if (error) throw new Error(error.message)

        Notify.create({
          progress: true,
          type: 'positive',
          message: 'Data deleted successfully!',
        })
        return data
      } catch (err) {
        this.loading = false
        Notify.create({
          progress: true,
          type: 'negative',
          message: err.message || 'Data delete went wrong',
        })
      }
    },
  },
})
