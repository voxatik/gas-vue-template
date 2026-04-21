import { ref, provide, inject } from 'vue'
import { serverCall } from '@/utils/gas'

const CONFIG_KEY = Symbol('config')

export function provideConfig() {
  const config = ref(null)
  const configLoaded = ref(false)

  async function loadConfig() {
    config.value = await serverCall('getConfig')
    configLoaded.value = true
  }

  provide(CONFIG_KEY, { config, configLoaded, loadConfig })
  return { config, configLoaded, loadConfig }
}

export function useConfig() {
  const ctx = inject(CONFIG_KEY)
  if (!ctx) throw new Error('useConfig() must be called inside a component under provideConfig()')
  return ctx
}
