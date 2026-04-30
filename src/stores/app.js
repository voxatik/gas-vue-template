import { defineStore } from 'pinia'
import { ref } from 'vue'
import { serverCall } from '@/utils/gas'

export const useAppStore = defineStore('app', () => {
  const loading = ref(false)
  const config = ref(null)
  const configLoaded = ref(false)

  function setLoading(value) {
    loading.value = value
  }

  async function loadConfig() {
    config.value = await serverCall('getConfig')
    configLoaded.value = true
  }

  return { loading, config, configLoaded, setLoading, loadConfig }
})
