import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTestStore = defineStore('test', () => {
  const test = ref<Array<string>>([])

  const test2 = () => {
    return test
  }

  function testFunc() {}
  return { testFunc, test2 }
})
