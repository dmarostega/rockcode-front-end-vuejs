<script setup>
defineProps({
  eyebrow: {
    type: String,
    default: 'Privacidade',
  },
  title: {
    type: String,
    default: 'Processamento local no navegador.',
  },
  description: {
    type: String,
    default:
      'Os dados digitados ficam no seu navegador enquanto você usa esta página. Eles não são salvos em histórico nem enviados para backend ou APIs externas.',
  },
  estimate: {
    type: Boolean,
    default: false,
  },
  estimateTitle: {
    type: String,
    default: 'Resultado estimado.',
  },
  estimateDescription: {
    type: String,
    default:
      'Use o resultado como referência. Valores finais podem variar conforme preços, condições de compra, arredondamentos ou informações digitadas.',
  },
  items: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <article class="tool-privacy-notice">
    <span class="tool-privacy-notice__eyebrow">{{ eyebrow }}</span>
    <h2>{{ title }}</h2>
    <p>{{ description }}</p>

    <ul v-if="items.length" class="tool-privacy-notice__list">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </ul>

    <div v-if="estimate" class="tool-privacy-notice__estimate">
      <strong>{{ estimateTitle }}</strong>
      <span>{{ estimateDescription }}</span>
    </div>
  </article>
</template>

<style scoped>
.tool-privacy-notice {
  max-width: 1100px;
  margin: 2rem auto 0;
  padding: 1.7rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.tool-privacy-notice__eyebrow {
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

.tool-privacy-notice h2 {
  margin: 0;
  color: #ffffff;
}

.tool-privacy-notice p,
.tool-privacy-notice li {
  color: #94a3b8;
  line-height: 1.75;
}

.tool-privacy-notice p {
  margin: 0.7rem 0 0;
}

.tool-privacy-notice__list {
  display: grid;
  gap: 0.45rem;
  margin: 1rem 0 0;
  padding-left: 1.2rem;
}

.tool-privacy-notice__estimate {
  display: grid;
  gap: 0.35rem;
  margin-top: 1rem;
  padding: 0.95rem 1rem;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 14px;
  background: rgba(14, 116, 144, 0.16);
}

.tool-privacy-notice__estimate strong {
  color: #e0f2fe;
  font-size: 0.92rem;
}

.tool-privacy-notice__estimate span {
  color: #bae6fd;
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
