<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: {
    type: String,
    default: '/ferramentas',
  },
  label: {
    type: String,
    default: 'Voltar para ferramentas',
  },
})
</script>

<template>
  <div class="tool-back-link">
    <RouterLink :to="to">
      <span aria-hidden="true">&lt;-</span>
      {{ label }}
    </RouterLink>
  </div>
</template>

<style scoped>
.tool-back-link {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  text-align: left;
}

.tool-back-link a {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: #7dd3fc;
  font-size: 0.9rem;
  font-weight: 900;
  text-decoration: none;
}

.tool-back-link a:hover {
  color: #bae6fd;
}
</style>
