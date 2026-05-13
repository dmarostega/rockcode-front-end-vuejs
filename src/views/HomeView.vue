<script setup>
import HomeTemplate from '../components/HomeTemplate.vue'
import LayoutDefault from '../components/defaults/LayoutDefault.vue'
import { ref, onMounted } from 'vue'

const messages = ref([])

onMounted(async () => {
  // console.log("onMounted init!!");
  // const res = await api.get('/messages')
  // messages.value = res.data;
  // console.log("onMounted end!!");
})
</script>

<template>
  <LayoutDefault>
    <HomeTemplate :messages="messages" />
  </LayoutDefault>
</template>
