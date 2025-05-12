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
    <!-- <img
      src="../assets/images/logo03.jpg"
      alt="Logo Rockcode labs"
      style="max-width: 200px; max-height: 200px"
    /> -->
    <div class="text-logo">
      <span>< /></span>
      <p>Rockcode labs</p>
    </div>
    <p style="padding: 1em">by Diogo Marostega de Oliveira</p>

    <!-- <h5>Messagens</h5>
    <ul>
      <li v-for="msg in messages" :key="msg.id">
        {{ msg.text }}
      </li>
    </ul> -->
    <div>
      <NavBoard />
    </div>
  </div>
</template>
