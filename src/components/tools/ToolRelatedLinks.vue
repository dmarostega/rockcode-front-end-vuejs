<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  title: {
    type: String,
    default: 'Ferramentas relacionadas',
  },
  description: {
    type: String,
    default: 'Continue com ferramentas que ajudam na mesma tarefa.',
  },
  links: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section v-if="links.length" class="tool-related-links" aria-label="Ferramentas relacionadas">
    <div class="related-heading">
      <span class="section-label">Ferramentas relacionadas</span>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>

    <div class="related-grid">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to" class="related-card">
        <span class="related-kicker">{{ link.kicker }}</span>
        <strong>{{ link.title }}</strong>
        <p>{{ link.description }}</p>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.tool-related-links {
  width: 100%;
  max-width: 1100px;
  margin: 2rem auto 0;
}

.related-heading {
  margin-bottom: 1rem;
}

.section-label {
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

.related-heading h2 {
  margin: 0;
  color: #ffffff;
}

.related-heading p {
  max-width: 720px;
  margin: 0.7rem 0 0;
  color: #94a3b8;
  line-height: 1.75;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
  gap: 1rem;
}

.related-card {
  min-width: 0;
  padding: 1.3rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18px;
  background: rgba(15, 23, 42, 0.74);
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.related-card:hover {
  transform: translateY(-3px);
  border-color: rgba(56, 189, 248, 0.55);
  background: rgba(30, 41, 59, 0.88);
}

.related-kicker {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 0.85rem;
  padding: 0.28rem 0.62rem;
  border-radius: 999px;
  background: rgba(34, 197, 94, 0.12);
  color: #86efac;
  font-size: 0.7rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.related-card strong {
  display: block;
  color: #bae6fd;
  font-size: 1.12rem;
  line-height: 1.35;
}

.related-card p {
  margin: 0.6rem 0 0;
  color: #94a3b8;
  line-height: 1.65;
}

@media (max-width: 820px) {
  .tool-related-links {
    width: min(100%, 300px);
    max-width: 300px;
  }

  .related-card {
    padding: 1rem;
    border-radius: 16px;
  }
}
</style>
