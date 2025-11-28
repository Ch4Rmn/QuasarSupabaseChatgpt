import { defineStore } from 'pinia'
import { supabase } from 'src/boot/supabase'
import { Notify } from 'quasar'
import { useAuthStore } from './auth'

export const useUserApiStore = defineStore('userapi', {
  state: () => ({
    data: null,
    loading: false,
    cache: {},
  }),

  actions: {
    async list(table) {
      try {
        const cached = localStorage.getItem(`cache_${table}`)
        if (cached) {
          // this.cache[table] = JSON.parse(cached)
          const parsed = JSON.parse(cached)
          const now = Date.now()

          // Check if cache is still valid (20 minutes = 1200000 ms)
          if (parsed.timestamp && now - parsed.timestamp < 5 * 60 * 1000) {
            this.cache[table] = parsed.data
          }

          Notify.create({
            progress: true,
            type: 'positive',
            message: 'Loaded from cache!',
          })

          return this.cache[table]
        }

        this.loading = true
        const { data, error } = await supabase.from(table).select('*')
        this.loading = false

        if (error) throw new Error(error.message)

        Notify.create({
          progress: true,
          type: 'positive',
          message: 'Loaded from Supabase!',
        })

        this.cache[table] = data
        localStorage.setItem(`cache_${table}`, JSON.stringify(data))

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

    async listWithOutCache(table) {
      try {
        const cached = localStorage.getItem(`cache_${table}`)
        if (cached) {
          // this.cache[table] = JSON.parse(cached)
          const parsed = JSON.parse(cached)
          const now = Date.now()

          // Check if cache is still valid (20 minutes = 1200000 ms)
          if (parsed.timestamp && now - parsed.timestamp < 5 * 60 * 1000) {
            this.cache[table] = parsed.data
          }

          Notify.create({
            progress: true,
            type: 'positive',
            message: 'Loaded from cache!',
          })

          return this.cache[table]
        }

        this.loading = true
        const { data, error } = await supabase.from(table).select('*')
        this.loading = false

        if (error) throw new Error(error.message)

        Notify.create({
          progress: true,
          type: 'positive',
          message: 'Loaded from Supabase!',
        })

        this.cache[table] = data
        localStorage.setItem(`cache_${table}`, JSON.stringify(data))

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

    async clearCache(table) {
      delete this.cache[table]
      localStorage.removeItem(`cache_${table}`)
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
