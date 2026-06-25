<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: 'Ferramenta gratuita',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <section class="tool-hero">
    <span class="tool-hero__eyebrow">{{ eyebrow }}</span>

    <h1>{{ title }}</h1>

    <p>{{ description }}</p>
  </section>
</template>

<style scoped>
.tool-hero {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 0 3rem;
  text-align: center;
}

.tool-hero__eyebrow {
  display: inline-flex;
  width: fit-content;
  padding: 0.42rem 0.8rem;
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.75);
  color: #7dd3fc;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.tool-hero h1 {
  max-width: 880px;
  margin: 1.3rem auto 0;
  color: #ffffff;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.08;
}

.tool-hero p {
  max-width: 720px;
  margin: 1.3rem auto 0;
  color: #cbd5e1;
  font-size: 1.08rem;
  line-height: 1.8;
}
</style>
