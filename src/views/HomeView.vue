<script setup>
import HomeTemplate from '../components/HomeTemplate.vue'
import LayoutDefault from '../components/defaults/LayoutDefault.vue'
import { ref, onMounted } from 'vue'
import api from '../services/api'

const messages = ref([])

onMounted(async () => {
  const res = await api.get('/messages')
  messages.value = res.data
})
</script>

<template>
  <LayoutDefault>
    <HomeTemplate :messages="messages" />
  </LayoutDefault>
</template>
