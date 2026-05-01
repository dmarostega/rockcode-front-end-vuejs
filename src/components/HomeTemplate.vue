<script setup>
import NavBoard from '../components/defaults/NavBoard.vue'
defineProps({
  messages: Array,
})
</script>

<style>
.text-logo {
  font-family: 'Gill Sans', sans-serif;
  max-width: 350px;
  padding: 0.5em 0;
  margin: 0 auto;
  font-size: 2em;
  text-transform: uppercase;
  border-radius: 0.4em;
  border: 1px solid white;
}
</style>

<template>
  <div>
    <div
      style="width: 100%; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px;">
      <img src="../assets/images/stone.png" alt="Stone logo, Rockcode labs" style="max-width: 230px; max-height: 250px; margin-bottom: 1.3em;" />
      <img src="../assets/images/solo_name.png" alt="Name Logo Rockcode labs" style="max-width: 280px;" />      
    </div>
    <div>
      <NavBoard />
    </div>
  </div>
</template>
