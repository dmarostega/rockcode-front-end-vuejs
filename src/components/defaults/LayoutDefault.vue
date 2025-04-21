import { RouterLink, RouterView } from 'vue-router'

<template>
  <main :class="['container', { 'full-height': noNav }]">
    <slot />
  </main>
</template>
<script setup>
defineProps({
  noNav: {
    type: Boolean,
    default: false,
  },
})
</script>
