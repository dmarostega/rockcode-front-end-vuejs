<script setup>
import { computed, ref } from 'vue'
import {
  ToolBackLink,
  ToolFaq,
  ToolHero,
  ToolPageLayout,
  ToolPrivacyNotice,
  ToolResultCard,
} from '@/components/tools'
import { calculateDiscount, formatCurrency } from '@/utils/discountCalculator'

const originalPrice = ref('199,90')
const discountPercent = ref('15')
const hasCalculated = ref(true)

const faqItems = [
  {
    question: 'A calculadora envia os valores para algum servidor?',
    answer:
      'Não. O cálculo acontece localmente no navegador e não usa login, backend, API externa ou histórico.',
  },
  {
    question: 'Posso usar vírgula no preço ou no desconto?',
    answer:
      'Sim. A ferramenta aceita vírgula e ponto em números, como 199,90 ou 199.90, quando aplicável.',
  },
  {
    question: 'O resultado é uma recomendação financeira?',
    answer:
      'Não. A página apenas calcula desconto percentual, economia e preço final a partir dos valores informados.',
  },
]

const calculation = computed(() => calculateDiscount(originalPrice.value, discountPercent.value))
const hasValidResult = computed(() => !calculation.value.error)
const formattedDiscountAmount = computed(() => formatCurrency(calculation.value.discountAmount))
const formattedFinalPrice = computed(() => formatCurrency(calculation.value.finalPrice))

const calculate = () => {
  hasCalculated.value = true
}

const useExample = () => {
  originalPrice.value = '199,90'
  discountPercent.value = '15'
  hasCalculated.value = true
}
</script>

<template>
  <ToolPageLayout>
    <ToolBackLink />

    <ToolHero
      eyebrow="Ferramenta gratuita"
      title="Calculadora de desconto percentual"
      description="Calcule valor economizado e preço final a partir do preço original e do percentual de desconto, direto no navegador."
    />

    <ToolResultCard
      eyebrow="Cálculo client-side"
      title="Informe o preço original e o percentual de desconto."
      description="Use para conferir promoções, comparar ofertas e entender rapidamente quanto será abatido do preço."
    >
      <div class="discount-tool">
        <div class="input-grid">
          <div class="field-group">
            <label class="field-label" for="original-price">Preço original</label>
            <input
              id="original-price"
              v-model="originalPrice"
              type="text"
              inputmode="decimal"
              autocomplete="off"
              placeholder="199,90"
            />
          </div>

          <div class="field-group">
            <label class="field-label" for="discount-percent">Percentual de desconto</label>
            <div class="percent-field">
              <input
                id="discount-percent"
                v-model="discountPercent"
                type="text"
                inputmode="decimal"
                autocomplete="off"
                placeholder="15"
              />
              <span aria-hidden="true">%</span>
            </div>
          </div>
        </div>

        <p v-if="hasCalculated && calculation.error" class="error-message" role="alert">
          {{ calculation.error }}
        </p>

        <output class="result-grid" aria-live="polite">
          <span>
            <strong>Valor do desconto</strong>
            <b>{{ hasValidResult ? formattedDiscountAmount : 'Preencha os campos' }}</b>
          </span>

          <span>
            <strong>Preço final</strong>
            <b>{{ hasValidResult ? formattedFinalPrice : 'Resultado pendente' }}</b>
          </span>
        </output>

        <div class="button-row">
          <button type="button" class="primary-action" @click="calculate">Calcular desconto</button>
          <button type="button" class="secondary-action" @click="useExample">Usar exemplo</button>
        </div>
      </div>

      <template #footer>
        <p class="example-copy">
          Exemplo: um produto de <code>R$ 199,90</code> com <code>15%</code> de desconto economiza
          <code>R$ 29,99</code> e fica por <code>R$ 169,91</code>.
        </p>
      </template>
    </ToolResultCard>

    <section class="content-grid" aria-label="Informações sobre cálculo de desconto">
      <article class="info-panel">
        <span class="section-label">Quando usar</span>
        <h2>Confira ofertas antes de finalizar uma compra.</h2>
        <p>
          A calculadora ajuda a validar o desconto anunciado, comparar preços promocionais e
          conferir rapidamente a economia real de uma oferta.
        </p>
      </article>

      <article class="info-panel">
        <span class="section-label">Privacidade</span>
        <h2>Processamento local, sem histórico.</h2>
        <p>
          Os valores digitados ficam apenas no navegador durante o uso da página. Não há cadastro,
          API externa, salvamento de compras ou recomendação financeira personalizada.
        </p>
      </article>
    </section>

    <ToolPrivacyNotice />

    <ToolFaq
      heading-id="discount-faq-title"
      title="Dúvidas rápidas sobre cálculo de desconto."
      :items="faqItems"
    />
  </ToolPageLayout>
</template>

<style scoped>
.discount-tool {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
  padding: 1.3rem;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.48);
}

.input-grid,
.result-grid,
.content-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.field-group {
  min-width: 0;
}

.field-label {
  display: block;
  margin-bottom: 0.45rem;
  color: #cbd5e1;
  font-size: 0.86rem;
  font-weight: 900;
}

input {
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

input:focus {
  border-color: rgba(56, 189, 248, 0.72);
}

.percent-field {
  display: flex;
  align-items: center;
  min-width: 0;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.86);
}

.percent-field:focus-within {
  border-color: rgba(56, 189, 248, 0.72);
}

.percent-field input {
  border: 0;
  background: transparent;
}

.percent-field span {
  padding-right: 1rem;
  color: #bae6fd;
  font-weight: 900;
}

.result-grid span {
  min-width: 0;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.86);
}

.result-grid strong,
.result-grid b {
  display: block;
}

.result-grid strong {
  color: #cbd5e1;
  font-size: 0.84rem;
}

.result-grid b {
  margin-top: 0.45rem;
  overflow-wrap: anywhere;
  color: #bae6fd;
  font-size: clamp(1.35rem, 4vw, 2.1rem);
  line-height: 1.2;
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

.secondary-action {
  width: fit-content;
  min-height: 2.85rem;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 900;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.primary-action {
  width: fit-content;
  min-height: 2.85rem;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(56, 189, 248, 0.7);
  border-radius: 12px;
  background: #38bdf8;
  color: #082f49;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 900;
}

.example-copy {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.75;
}

.example-copy code {
  color: #bae6fd;
  font-family: 'Courier New', Courier, monospace;
}

.content-grid {
  max-width: 1100px;
  margin: 2rem auto 0;
}

.info-panel {
  padding: 1.7rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
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

.info-panel h2 {
  margin: 0;
  color: #ffffff;
}

.info-panel p {
  margin: 0.7rem 0 0;
  color: #94a3b8;
  line-height: 1.75;
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
  :global(.tool-faq) {
    padding: 1rem;
    border-radius: 16px;
  }

  .discount-tool,
  .info-panel {
    padding: 1rem;
  }

  .input-grid,
  .result-grid,
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
