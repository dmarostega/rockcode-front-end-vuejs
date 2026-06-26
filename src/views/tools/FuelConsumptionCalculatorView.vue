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
import {
  calculateFuelConsumption,
  formatFuelCurrency,
  formatFuelDecimal,
} from '@/utils/fuelConsumptionCalculator'

const distance = ref('420')
const liters = ref('35')
const fuelPrice = ref('5,89')
const hasCalculated = ref(true)

const faqItems = [
  {
    question: 'A ferramenta usa localização ou rota real?',
    answer:
      'Não. Você informa apenas distância, litros e preço opcional. A página não pede placa, endereço, localização ou rota.',
  },
  {
    question: 'Preciso informar o preço do combustível?',
    answer:
      'Não. Com distância e litros a ferramenta calcula km/l. O preço serve apenas para estimar custo por km e gasto total.',
  },
  {
    question: 'O resultado é exato?',
    answer:
      'Não. É uma estimativa simples, porque consumo real varia com trânsito, carga, calibragem, trajeto e forma de condução.',
  },
]

const result = computed(() => calculateFuelConsumption(distance.value, liters.value, fuelPrice.value))
const hasValidResult = computed(() => hasCalculated.value && !result.value.error)

const calculate = () => {
  hasCalculated.value = true
}

const useExample = () => {
  distance.value = '420'
  liters.value = '35'
  fuelPrice.value = '5,89'
  hasCalculated.value = true
}
</script>

<template>
  <ToolPageLayout>
    <ToolBackLink />

    <ToolHero
      eyebrow="Ferramenta gratuita"
      title="Calculadora de consumo de combustível"
      description="Calcule consumo médio, custo por quilômetro e gasto estimado com combustível sem informar dados pessoais ou localização."
    />

    <ToolResultCard
      eyebrow="Estimativa client-side"
      title="Informe distância, litros consumidos e preço opcional."
      description="Use para conferir uma média simples de consumo e estimar gasto aproximado em deslocamentos."
    >
      <div class="fuel-tool">
        <div class="input-grid">
          <label class="field-group">
            <span>Distância percorrida (km)</span>
            <input
              v-model="distance"
              type="text"
              inputmode="decimal"
              autocomplete="off"
              placeholder="420"
            />
          </label>

          <label class="field-group">
            <span>Litros consumidos</span>
            <input
              v-model="liters"
              type="text"
              inputmode="decimal"
              autocomplete="off"
              placeholder="35"
            />
          </label>

          <label class="field-group">
            <span>Preço do combustível (opcional)</span>
            <input
              v-model="fuelPrice"
              type="text"
              inputmode="decimal"
              autocomplete="off"
              placeholder="5,89"
            />
          </label>
        </div>

        <p v-if="hasCalculated && result.error" class="error-message" role="alert">
          {{ result.error }}
        </p>

        <output class="result-grid" aria-live="polite">
          <span>
            <strong>Consumo médio</strong>
            <b>{{ hasValidResult ? `${formatFuelDecimal(result.kmPerLiter)} km/l` : 'Pendente' }}</b>
          </span>

          <span>
            <strong>Custo por km</strong>
            <b>
              {{
                hasValidResult && result.costPerKm !== null
                  ? `${formatFuelCurrency(result.costPerKm)} / km`
                  : 'Informe preço'
              }}
            </b>
          </span>

          <span>
            <strong>Gasto estimado</strong>
            <b>
              {{
                hasValidResult && result.totalCost !== null
                  ? formatFuelCurrency(result.totalCost)
                  : 'Informe preço'
              }}
            </b>
          </span>
        </output>

        <p class="estimate-notice">
          Resultado estimado. O consumo real pode variar conforme trânsito, rota, carga, manutenção
          e forma de condução.
        </p>

        <div class="button-row">
          <button type="button" class="primary-action" @click="calculate">Calcular consumo</button>
          <button type="button" class="secondary-action" @click="useExample">Usar exemplo</button>
        </div>
      </div>

      <template #footer>
        <p class="example-copy">
          Exemplo: <code>420 km</code> com <code>35 litros</code> resultam em
          <code>12,00 km/l</code>. Com combustível a <code>R$ 5,89</code>, o gasto estimado é
          <code>R$ 206,15</code>.
        </p>
      </template>
    </ToolResultCard>

    <section class="content-grid" aria-label="Informações sobre consumo de combustível">
      <article class="info-panel">
        <span class="section-label">Quando usar</span>
        <h2>Confira médias sem cadastrar veículo.</h2>
        <p>
          A calculadora ajuda a transformar distância e litros em uma média simples de km/l, útil
          para acompanhar abastecimentos avulsos ou planejar gastos aproximados.
        </p>
      </article>

      <article class="info-panel">
        <span class="section-label">Privacidade</span>
        <h2>Sem placa, localização ou rota.</h2>
        <p>
          A página não usa geolocalização, mapas, backend, cadastro, histórico ou preço oficial de
          combustível. Tudo é calculado localmente no navegador.
        </p>
      </article>
    </section>

    <ToolPrivacyNotice />

    <ToolFaq
      heading-id="fuel-consumption-faq-title"
      title="Dúvidas rápidas sobre consumo de combustível."
      :items="faqItems"
    />
  </ToolPageLayout>
</template>

<style scoped>
.fuel-tool {
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.content-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  max-width: 1100px;
  margin: 2rem auto 0;
}

.field-group {
  min-width: 0;
}

.field-group span {
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

.result-grid span,
.info-panel {
  min-width: 0;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 16px;
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
  font-size: clamp(1.2rem, 3vw, 1.7rem);
  line-height: 1.25;
}

.error-message,
.estimate-notice {
  margin: 0;
  padding: 0.9rem 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.55;
}

.error-message {
  border: 1px solid rgba(248, 113, 113, 0.28);
  background: rgba(127, 29, 29, 0.28);
  color: #fecaca;
}

.estimate-notice {
  border: 1px solid rgba(56, 189, 248, 0.22);
  background: rgba(14, 116, 144, 0.16);
  color: #bae6fd;
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
  margin: 0 0 1rem;
  color: #ffffff;
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
  .fuel-tool,
  .info-panel {
    padding: 1rem;
    border-radius: 16px;
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
