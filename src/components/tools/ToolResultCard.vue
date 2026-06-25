<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <section class="tool-result-card">
    <div v-if="eyebrow || title || description" class="tool-result-card__header">
      <span v-if="eyebrow" class="tool-result-card__eyebrow">{{ eyebrow }}</span>
      <h2>{{ title }}</h2>
      <p v-if="description">{{ description }}</p>
    </div>

    <div class="tool-result-card__body">
      <slot />
    </div>

    <footer v-if="$slots.footer" class="tool-result-card__footer">
      <slot name="footer" />
    </footer>
  </section>
</template>

<style scoped>
.tool-result-card {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.tool-result-card__header {
  max-width: 720px;
  margin-bottom: 1.3rem;
}

.tool-result-card__eyebrow {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 1rem;
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.tool-result-card h2 {
  margin: 0;
  color: #ffffff;
}

.tool-result-card p {
  margin: 0.7rem 0 0;
  color: #94a3b8;
  line-height: 1.75;
}

.tool-result-card__body {
  min-width: 0;
}

.tool-result-card__footer {
  margin-top: 1.2rem;
}
</style>
