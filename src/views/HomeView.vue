<template>
  <div>
    <h1 class="title">Home</h1>
    <p class="subtitle">{{ message }}</p>

    <BButton type="is-primary" :loading="loading" @click="fetchData"> Fetch from Server </BButton>
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { serverCall } from '@/utils/gas'
  import { useNotify } from '@/composables/useNotify'

  const notify = useNotify()
  const message = ref('Welcome to your GAS app.')
  const loading = ref(false)

  async function fetchData() {
    loading.value = true
    try {
      const data = await serverCall('getServerData')
      message.value = data.message
      notify.success('Data loaded!')
    } catch (err) {
      notify.error(err.message)
    } finally {
      loading.value = false
    }
  }
</script>
