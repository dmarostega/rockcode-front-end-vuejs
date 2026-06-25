<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
</script>

<template>
  <LayoutDefault>
    <main class="tool-page-layout">
      <slot />
    </main>

    <NavBoard />
  </LayoutDefault>
</template>

<style scoped>
.tool-page-layout {
  min-height: 100vh;
  padding: 3rem 1.25rem 6rem;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 30rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}
</style>
