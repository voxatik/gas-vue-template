<template>
  <BLoading :is-full-page="true" :active="app.loading" />

  <nav class="navbar is-primary" role="navigation">
    <div class="navbar-brand">
      <span class="navbar-item has-text-weight-bold">{{ app.config?.appName ?? 'GAS App' }}</span>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <RouterLink class="navbar-item" to="/">Home</RouterLink>
        <RouterLink class="navbar-item" to="/about">About</RouterLink>
      </div>
    </div>
  </nav>

  <main class="section">
    <div class="container">
      <RouterView />
    </div>
  </main>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { useAppStore } from '@/stores/app'
  import { useNotify } from '@/composables/useNotify'

  const app = useAppStore()
  const notify = useNotify()

  onMounted(async () => {
    window.onerror = (msg, _src, _line, _col, err) => {
      notify.error(err?.message ?? String(msg))
      return true
    }
    window.onunhandledrejection = event => {
      notify.error(event.reason?.message ?? 'An unexpected error occurred')
    }

    try {
      app.setLoading(true)
      await app.loadConfig()
    } catch {
      notify.error('Failed to load app configuration')
    } finally {
      app.setLoading(false)
    }
  })
</script>
