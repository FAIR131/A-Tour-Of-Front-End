import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {

  const login = reactive({ token: '', username: '' })

  return { login }
})
