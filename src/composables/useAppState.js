import { ref, provide, inject } from 'vue'

const APP_STATE_KEY = Symbol('appState')

export function provideAppState() {
  const loading = ref(false)
  provide(APP_STATE_KEY, { loading })
  return { loading }
}

export function useAppState() {
  const state = inject(APP_STATE_KEY)
  if (!state) throw new Error('useAppState() must be called inside a component under provideAppState()')
  return state
}
