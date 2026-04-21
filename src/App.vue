<template>
  <BLoading :is-full-page="true" :active="loading" />

  <nav class="navbar is-primary" role="navigation">
    <div class="navbar-brand">
      <span class="navbar-item has-text-weight-bold">{{ config?.appName ?? 'GAS App' }}</span>
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
  import { provideAppState } from '@/composables/useAppState'
  import { provideConfig } from '@/composables/useConfig'
  import { useNotify } from '@/composables/useNotify'

  const { loading } = provideAppState()
  const { config, loadConfig } = provideConfig()
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
      loading.value = true
      await loadConfig()
    } catch {
      notify.error('Failed to load app configuration')
    } finally {
      loading.value = false
    }
  })
</script>
