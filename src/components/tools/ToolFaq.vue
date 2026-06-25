<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: 'FAQ',
  },
  title: {
    type: String,
    default: 'Perguntas frequentes.',
  },
  items: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <section class="tool-faq" aria-labelledby="tool-faq-title">
    <div class="tool-faq__heading">
      <span class="tool-faq__eyebrow">{{ eyebrow }}</span>
      <h2 id="tool-faq-title">{{ title }}</h2>
    </div>

    <div class="tool-faq__list">
      <article v-for="item in items" :key="item.question">
        <h3>{{ item.question }}</h3>
        <p>{{ item.answer }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.tool-faq {
  max-width: 1100px;
  margin: 2rem auto 0;
  padding: 1.7rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.tool-faq__heading {
  margin-bottom: 1rem;
}

.tool-faq__eyebrow {
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

.tool-faq h2,
.tool-faq h3 {
  margin: 0;
  color: #ffffff;
}

.tool-faq__list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.tool-faq article {
  padding: 1.2rem;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 16px;
  background: rgba(2, 6, 23, 0.32);
}

.tool-faq h3 {
  margin-bottom: 0.55rem;
  font-size: 1rem;
}

.tool-faq p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.75;
}

@media (max-width: 820px) {
  .tool-faq__list {
    grid-template-columns: 1fr;
  }
}
</style>
