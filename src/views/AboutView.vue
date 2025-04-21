<template>
  <LayoutDefault noNav>
    <div class="about">
      <h1>This is an about page</h1>
    </div>
  </LayoutDefault>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

<script setup>
import LayoutDefault from '../components/defaults/LayoutDefault.vue'
</script>
