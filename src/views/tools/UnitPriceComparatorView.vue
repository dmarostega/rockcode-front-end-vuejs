<script setup>
import { computed, ref } from 'vue'
import {
  ToolBackLink,
  ToolFaq,
  ToolHero,
  ToolPageLayout,
  ToolPrivacyNotice,
  ToolRelatedLinks,
  ToolResultCard,
} from '@/components/tools'
import { compareUnitPrices, formatUnitPrice, unitOptions } from '@/utils/priceUnitComparator'

const items = ref([
  {
    name: 'Arroz pacote 1',
    price: '22,90',
    quantity: '5',
    unit: 'kg',
  },
  {
    name: 'Arroz pacote 2',
    price: '5,20',
    quantity: '1',
    unit: 'kg',
  },
])
const hasCalculated = ref(true)

const faqItems = [
  {
    question: 'Posso comparar gramas com quilos?',
    answer:
      'Sim. A ferramenta converte unidades compatíveis para uma base comum, como gramas para quilos e ml para litros.',
  },
  {
    question: 'Por que unidades diferentes geram erro?',
    answer:
      'Comparar litro com unidade ou metro com quilo pode induzir a uma decisão errada. A página bloqueia esse tipo de comparação.',
  },
  {
    question: 'Os valores são salvos?',
    answer:
      'Não. O cálculo acontece no navegador, sem login, backend, histórico, cadastro de produtos ou integração com preços reais.',
  },
]

const relatedTools = [
  {
    kicker: 'Compras',
    title: 'Calculadora de desconto percentual',
    description:
      'Calcule preço final e economia quando uma das opções comparadas estiver em promoção.',
    to: '/ferramentas/calculadora-desconto',
  },
]

const comparison = computed(() => compareUnitPrices(items.value))
const hasValidResult = computed(() => hasCalculated.value && !comparison.value.error)

const calculate = () => {
  hasCalculated.value = true
}

const useMarketExample = () => {
  items.value = [
    {
      name: 'Arroz 5 kg',
      price: '22,90',
      quantity: '5',
      unit: 'kg',
    },
    {
      name: 'Arroz 1 kg',
      price: '5,20',
      quantity: '1',
      unit: 'kg',
    },
  ]
  hasCalculated.value = true
}

const usePharmacyExample = () => {
  items.value = [
    {
      name: 'Shampoo 400 ml',
      price: '18,90',
      quantity: '400',
      unit: 'ml',
    },
    {
      name: 'Shampoo 250 ml',
      price: '13,50',
      quantity: '250',
      unit: 'ml',
    },
  ]
  hasCalculated.value = true
}

const useConstructionExample = () => {
  items.value = [
    {
      name: 'Cabo 10 m',
      price: '34,90',
      quantity: '10',
      unit: 'm',
    },
    {
      name: 'Cabo 500 cm',
      price: '19,90',
      quantity: '500',
      unit: 'cm',
    },
  ]
  hasCalculated.value = true
}
</script>

<template>
  <ToolPageLayout>
    <ToolBackLink />

    <ToolHero
      eyebrow="Ferramenta gratuita"
      title="Comparador de preço por unidade"
      description="Compare produtos por unidade, quilo, litro ou metro para entender qual opção compensa mais antes de comprar."
    />

    <ToolResultCard
      eyebrow="Cálculo local"
      title="Informe duas opções comparáveis."
      description="Use preço, quantidade e unidade para calcular o custo unitário e evitar comparações enganosas."
    >
      <div class="unit-tool">
        <div class="item-grid">
          <article v-for="(item, index) in items" :key="index" class="item-panel">
            <h3>Opção {{ index + 1 }}</h3>

            <label class="field-group">
              <span>Nome opcional</span>
              <input
                v-model="item.name"
                type="text"
                autocomplete="off"
                :placeholder="`Produto ${index + 1}`"
              />
            </label>

            <label class="field-group">
              <span>Preço</span>
              <input
                v-model="item.price"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                placeholder="22,90"
              />
            </label>

            <div class="quantity-row">
              <label class="field-group">
                <span>Quantidade</span>
                <input
                  v-model="item.quantity"
                  type="text"
                  inputmode="decimal"
                  autocomplete="off"
                  placeholder="5"
                />
              </label>

              <label class="field-group">
                <span>Unidade</span>
                <select v-model="item.unit">
                  <option v-for="unit in unitOptions" :key="unit.value" :value="unit.value">
                    {{ unit.label }}
                  </option>
                </select>
              </label>
            </div>
          </article>
        </div>

        <p v-if="hasCalculated && comparison.error" class="error-message" role="alert">
          {{ comparison.error }}
        </p>

        <output class="result-panel" aria-live="polite">
          <div class="result-summary">
            <strong>Resultado</strong>
            <b>{{ hasValidResult ? comparison.summary : 'Preencha opções comparáveis' }}</b>
            <span v-if="hasValidResult">{{ comparison.differenceLabel }}</span>
          </div>

          <div class="unit-results">
            <span v-for="item in comparison.items" :key="item.name">
              <strong>{{ item.name }}</strong>
              <b>{{ formatUnitPrice(item) }}</b>
            </span>
          </div>
        </output>

        <div class="button-row">
          <button type="button" class="primary-action" @click="calculate">Comparar preços</button>
          <button type="button" class="secondary-action" @click="useMarketExample">
            Mercado
          </button>
          <button type="button" class="secondary-action" @click="usePharmacyExample">
            Farmácia
          </button>
          <button type="button" class="secondary-action" @click="useConstructionExample">
            Construção
          </button>
        </div>
      </div>

      <template #footer>
        <p class="example-copy">
          Exemplo: compare um pacote de arroz de <code>5 kg</code> com outro de
          <code>1 kg</code> para descobrir o custo por quilo antes de escolher.
        </p>
      </template>
    </ToolResultCard>

    <section class="content-grid" aria-label="Informações sobre comparação por unidade">
      <article class="info-panel">
        <span class="section-label">Quando usar</span>
        <h2>Mercado, farmácia e material de construção.</h2>
        <p>
          A comparação por unidade ajuda quando embalagens têm tamanhos diferentes e o menor preço
          da etiqueta não representa necessariamente a opção mais econômica.
        </p>
      </article>

      <article class="info-panel">
        <span class="section-label">Privacidade</span>
        <h2>Comparação local, sem histórico.</h2>
        <p>
          Os valores digitados ficam apenas no navegador durante o uso da página. Não há cadastro,
          histórico de produtos, integração com preços reais ou envio para servidores.
        </p>
      </article>
    </section>

    <ToolPrivacyNotice estimate />

    <ToolRelatedLinks
      title="Confira promoções antes de decidir."
      description="Quando uma das opções tiver desconto, calcule o preço final antes de comparar o custo unitário."
      :links="relatedTools"
    />

    <ToolFaq
      heading-id="unit-price-faq-title"
      title="Dúvidas rápidas sobre comparação por unidade."
      :items="faqItems"
    />
  </ToolPageLayout>
</template>

<style scoped>
.unit-tool {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  padding: 1.3rem;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.48);
}

.item-grid,
.quantity-row,
.unit-results,
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.item-panel,
.result-panel,
.info-panel {
  min-width: 0;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.86);
}

.item-panel h3,
.info-panel h2 {
  margin: 0 0 1rem;
  color: #ffffff;
}

.field-group {
  display: block;
  min-width: 0;
  margin-top: 0.85rem;
}

.field-group span {
  display: block;
  margin-bottom: 0.45rem;
  color: #cbd5e1;
  font-size: 0.86rem;
  font-weight: 900;
}

input,
select {
  width: 100%;
  min-height: 3rem;
  padding: 0.8rem 1rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  outline: none;
  background: rgba(15, 23, 42, 0.86);
  color: #e0f2fe;
  font: 0.95rem/1.5 Arial, sans-serif;
}

input:focus,
select:focus {
  border-color: rgba(56, 189, 248, 0.72);
}

.result-panel {
  display: grid;
  gap: 1rem;
}

.result-summary strong,
.result-summary b,
.result-summary span,
.unit-results strong,
.unit-results b {
  display: block;
}

.result-summary strong,
.unit-results strong {
  color: #cbd5e1;
  font-size: 0.84rem;
}

.result-summary b,
.unit-results b {
  margin-top: 0.4rem;
  overflow-wrap: anywhere;
  color: #bae6fd;
  font-size: clamp(1.2rem, 3vw, 1.65rem);
  line-height: 1.25;
}

.result-summary span {
  margin-top: 0.55rem;
  color: #94a3b8;
  line-height: 1.65;
}

.unit-results span {
  min-width: 0;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 14px;
  background: rgba(2, 6, 23, 0.32);
}

.error-message {
  margin: 0;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(248, 113, 113, 0.28);
  border-radius: 12px;
  background: rgba(127, 29, 29, 0.28);
  color: #fecaca;
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.55;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.primary-action,
.secondary-action {
  width: fit-content;
  min-height: 2.85rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 900;
}

.primary-action {
  border: 1px solid rgba(56, 189, 248, 0.7);
  background: #38bdf8;
  color: #082f49;
}

.secondary-action {
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
}

.example-copy,
.info-panel p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.75;
}

.example-copy {
  font-size: 0.9rem;
  font-weight: 700;
}

.example-copy code {
  color: #bae6fd;
}

.content-grid {
  max-width: 1100px;
  margin: 2rem auto 0;
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

@media (max-width: 820px) {
  :global(.tool-page-layout) {
    overflow-x: hidden;
    padding-right: 0.75rem;
    padding-left: 0.75rem;
  }

  :global(.tool-back-link),
  :global(.tool-hero),
  :global(.tool-result-card),
  :global(.tool-privacy-notice),
  :global(.tool-faq),
  .content-grid {
    width: min(100%, 300px);
    max-width: 300px;
    margin-right: auto;
    margin-left: auto;
  }

  :global(.tool-result-card),
  :global(.tool-privacy-notice),
  :global(.tool-faq),
  .unit-tool,
  .info-panel {
    padding: 1rem;
    border-radius: 16px;
  }

  .item-grid,
  .quantity-row,
  .unit-results,
  .content-grid {
    grid-template-columns: 1fr;
  }

  .button-row,
  .primary-action,
  .secondary-action {
    width: 100%;
  }
}
</style>
