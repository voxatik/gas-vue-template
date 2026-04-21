import { getCurrentInstance } from 'vue'

export function useNotify(position = 'is-bottom-right') {
  const instance = getCurrentInstance()

  function toast(message, type = 'is-info', duration = 3500) {
    instance?.proxy?.$buefy?.toast.open({ message, type, duration, position, queue: false })
  }

  return {
    success: msg => toast(msg, 'is-success'),
    error: (msg, duration = 5000) => toast(msg, 'is-danger', duration),
    warn: msg => toast(msg, 'is-warning'),
    info: msg => toast(msg, 'is-info'),
  }
}
