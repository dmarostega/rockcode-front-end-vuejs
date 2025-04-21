<script setup>
import NavBoard from '../components/defaults/NavBoard.vue'
defineProps({
  messages: Array,
})
</script>

<template>
  <div>
    <h1>Rock Code Labs</h1>
    <p>by Diogo Marostega de Oliveira</p>

    <!-- <h5>Messagens</h5>
    <ul>
      <li v-for="msg in messages" :key="msg.id">
        {{ msg.text }}
      </li>
    </ul> -->
  </div>
  <div>
    <NavBoard />
  </div>
</template>
