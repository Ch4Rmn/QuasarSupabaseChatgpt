import { defineStore } from 'pinia'
import { supabase } from 'src/boot/supabase'
import { Notify } from 'quasar'

export const userApi = defineStore('userapi', {
  state: () => ({
    data: null,
    loading: false,
  }),
  actions: {
    async list(table) {
      try {
        this.loading = true
        const { data, error } = await supabase.from(table).select('*')
        // this.data = data
        this.loading = false

        if (error) {
          Notify.create({
            progress: true,
            type: 'negative',
            message: error.message,
          })
          throw new Error(error.message)
        } else {
          Notify.create({
            progress: true,
            type: 'positive',
            message: 'Data loaded successfully!',
          })
          return data
        }
      } catch (err) {
        this.loading = false
        Notify.create({
          progress: true,
          type: 'negative',
          message: err.message || 'Something went wrong',
        })
      }
    },

    async getById(table, id) {
      try {
        this.loading = true
        const { data, error } = await supabase.from(table).select('*').eq('id', id)
        this.loading = false
        if (error) {
          Notify.create({
            progress: true,
            type: 'negative',
            message: error.message,
          })
          throw new Error(error.message)
        } else {
          Notify.create({
            progress: true,
            type: 'positive',
            message: 'Data loaded successfully!',
          })
          return data
        }
      } catch (err) {
        this.loading = false
        Notify.create({
          progress: true,
          type: 'negative',
          message: err.message || 'Something went wrong',
        })
      }
    },
  },
})
