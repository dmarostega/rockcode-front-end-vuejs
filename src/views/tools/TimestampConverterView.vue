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

const timestampInput = ref('1700000000')
const timestampUnit = ref('seconds')
const dateInput = ref('2023-11-14T22:13')
const copyStatus = ref('')
const copyStatusTimeout = ref(null)

const faqItems = [
  {
    question: 'A conversão usa API externa?',
    answer:
      'Não. A conversão usa apenas recursos do navegador e não envia timestamp ou data para servidores.',
  },
  {
    question: 'Qual a diferença entre segundos e milissegundos?',
    answer:
      'Timestamp Unix em segundos tem 10 digitos em datas atuais. Em milissegundos costuma ter 13 digitos.',
  },
  {
    question: 'A data convertida considera meu fuso horario?',
    answer:
      'A data legível mostra uma versão local e uma versão UTC para facilitar comparação com logs e APIs.',
  },
]

const parseTimestamp = () => {
  const normalizedValue = timestampInput.value.trim()

  if (!normalizedValue) {
    return {
      date: null,
      error: 'Informe um timestamp para converter.',
    }
  }

  if (!/^-?\d+$/.test(normalizedValue)) {
    return {
      date: null,
      error: 'Use apenas números inteiros no timestamp.',
    }
  }

  const numericValue = Number(normalizedValue)

  if (!Number.isSafeInteger(numericValue)) {
    return {
      date: null,
      error: 'O timestamp informado é grande demais para converter com segurança.',
    }
  }

  const milliseconds = timestampUnit.value === 'seconds' ? numericValue * 1000 : numericValue
  const date = new Date(milliseconds)

  if (Number.isNaN(date.getTime())) {
    return {
      date: null,
      error: 'Não foi possível converter esse timestamp em uma data válida.',
    }
  }

  return {
    date,
    error: '',
  }
}

const timestampConversion = computed(parseTimestamp)
const timestampError = computed(() => timestampConversion.value.error)
const localDateResult = computed(() =>
  timestampConversion.value.date
    ? timestampConversion.value.date.toLocaleString('pt-BR', {
        dateStyle: 'medium',
        timeStyle: 'medium',
      })
    : '',
)
const utcDateResult = computed(() =>
  timestampConversion.value.date ? timestampConversion.value.date.toISOString() : '',
)

const dateToTimestampConversion = computed(() => {
  if (!dateInput.value) {
    return {
      seconds: '',
      milliseconds: '',
      error: 'Informe uma data para converter.',
    }
  }

  const date = new Date(dateInput.value)

  if (Number.isNaN(date.getTime())) {
    return {
      seconds: '',
      milliseconds: '',
      error: 'Informe uma data válida para gerar o timestamp.',
    }
  }

  return {
    seconds: String(Math.floor(date.getTime() / 1000)),
    milliseconds: String(date.getTime()),
    error: '',
  }
})

const dateError = computed(() => dateToTimestampConversion.value.error)

const resetCopyStatus = () => {
  if (copyStatusTimeout.value) {
    clearTimeout(copyStatusTimeout.value)
  }

  copyStatusTimeout.value = setTimeout(() => {
    copyStatus.value = ''
  }, 2400)
}

const copyWithFallback = (value) => {
  const temporaryField = document.createElement('textarea')
  temporaryField.value = value
  temporaryField.setAttribute('readonly', '')
  temporaryField.style.position = 'fixed'
  temporaryField.style.opacity = '0'

  document.body.appendChild(temporaryField)
  temporaryField.select()

  const copied = document.execCommand('copy')
  document.body.removeChild(temporaryField)

  return copied
}

const copyValue = async (value, label) => {
  if (!value) {
    copyStatus.value = 'Gere um resultado válido antes de copiar.'
    resetCopyStatus()
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(value)
    } else if (!copyWithFallback(value)) {
      throw new Error('Copy command failed')
    }

    copyStatus.value = `${label} copiado.`
  } catch {
    copyStatus.value = 'Não foi possível copiar automaticamente.'
  } finally {
    resetCopyStatus()
  }
}

const useTimestampExample = () => {
  timestampInput.value = '1700000000'
  timestampUnit.value = 'seconds'
  copyStatus.value = ''
}

const useDateExample = () => {
  dateInput.value = '2023-11-14T22:13'
  copyStatus.value = ''
}
</script>

<template>
  <ToolPageLayout>
    <ToolBackLink />

    <ToolHero
      eyebrow="Ferramenta gratuita"
      title="Conversor timestamp Unix e data"
      description="Converta timestamp Unix em data legível e data em timestamp diretamente no navegador, sem login, backend, API externa ou histórico."
    />

    <ToolResultCard
      eyebrow="Conversão client-side"
      title="Confira timestamps de APIs, logs e payloads."
      description="Use segundos ou milissegundos para transformar timestamp em data, ou informe uma data para gerar timestamp Unix."
    >
      <div class="converter-grid">
        <section class="converter-panel" aria-labelledby="timestamp-to-date-title">
          <h3 id="timestamp-to-date-title">Timestamp para data</h3>

          <label class="field-label" for="timestamp-input">Timestamp Unix</label>
          <input
            id="timestamp-input"
            v-model="timestampInput"
            type="text"
            inputmode="numeric"
            autocomplete="off"
            placeholder="1700000000"
          />

          <div class="mode-selector" aria-label="Unidade do timestamp">
            <button
              type="button"
              :class="{ active: timestampUnit === 'seconds' }"
              :aria-pressed="timestampUnit === 'seconds'"
              @click="timestampUnit = 'seconds'"
            >
              Segundos
            </button>
            <button
              type="button"
              :class="{ active: timestampUnit === 'milliseconds' }"
              :aria-pressed="timestampUnit === 'milliseconds'"
              @click="timestampUnit = 'milliseconds'"
            >
              Milissegundos
            </button>
          </div>

          <p v-if="timestampError" class="error-message" role="alert">{{ timestampError }}</p>

          <output id="timestamp-date-result" class="result-box" aria-live="polite">
            <strong>Local</strong>
            <span>{{ localDateResult || 'A data aparecerá aqui' }}</span>
            <strong>UTC</strong>
            <span>{{ utcDateResult || 'A data ISO aparecerá aqui' }}</span>
          </output>

          <div class="button-row">
            <button
              type="button"
              class="primary-action"
              :disabled="!utcDateResult"
              @click="copyValue(utcDateResult, 'Data UTC')"
            >
              Copiar UTC
            </button>
            <button type="button" class="secondary-action" @click="useTimestampExample">
              Usar exemplo
            </button>
          </div>
        </section>

        <section class="converter-panel" aria-labelledby="date-to-timestamp-title">
          <h3 id="date-to-timestamp-title">Data para timestamp</h3>

          <label class="field-label" for="date-input">Data e hora local</label>
          <input id="date-input" v-model="dateInput" type="datetime-local" />

          <p v-if="dateError" class="error-message" role="alert">{{ dateError }}</p>

          <output id="date-timestamp-result" class="result-box" aria-live="polite">
            <strong>Segundos</strong>
            <span>{{ dateToTimestampConversion.seconds || 'O timestamp aparecerá aqui' }}</span>
            <strong>Milissegundos</strong>
            <span>{{ dateToTimestampConversion.milliseconds || 'O timestamp aparecerá aqui' }}</span>
          </output>

          <div class="button-row">
            <button
              type="button"
              class="primary-action"
              :disabled="!dateToTimestampConversion.seconds"
              @click="copyValue(dateToTimestampConversion.seconds, 'Timestamp')"
            >
              Copiar timestamp
            </button>
            <button type="button" class="secondary-action" @click="useDateExample">Usar exemplo</button>
          </div>
        </section>
      </div>

      <p v-if="copyStatus" class="copy-feedback" role="status">{{ copyStatus }}</p>

      <template #footer>
        <p class="example-copy">
          Exemplo: <code>1700000000</code> em segundos equivale a
          <code>2023-11-14T22:13:20.000Z</code> em UTC.
        </p>
      </template>
    </ToolResultCard>

    <section class="content-grid" aria-label="Informações sobre timestamps">
      <article class="info-panel">
        <span class="section-label">Quando usar</span>
        <h2>Datas previsíveis para APIs, logs e testes.</h2>
        <p>
          Timestamps ajudam a comparar eventos, validar payloads e entender datas retornadas por
          sistemas que usam Unix time.
        </p>
      </article>

      <article class="info-panel">
        <span class="section-label">Privacidade</span>
        <h2>Conversão local, sem histórico.</h2>
        <p>
          Os valores digitados ficam apenas no navegador durante o uso da página. Não há login,
          backend obrigatório, API externa ou persistência.
        </p>
      </article>
    </section>

    <ToolPrivacyNotice />

    <ToolFaq
      heading-id="timestamp-faq-title"
      title="Dúvidas rápidas sobre timestamp Unix."
      :items="faqItems"
    />
  </ToolPageLayout>
</template>

<style scoped>
.converter-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.converter-panel,
.info-panel {
  padding: 1.3rem;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.48);
}

.converter-panel {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
}

.converter-panel h3,
.info-panel h2 {
  margin: 0;
  color: #ffffff;
}

.field-label {
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

.mode-selector,
.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.mode-selector button,
.primary-action,
.secondary-action {
  min-height: 2.85rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 900;
}

.mode-selector button,
.secondary-action {
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
}

.mode-selector button.active,
.primary-action {
  border: 1px solid rgba(56, 189, 248, 0.7);
  background: #38bdf8;
  color: #082f49;
}

.primary-action:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.result-box {
  display: grid;
  gap: 0.35rem;
  min-height: 7rem;
  overflow-wrap: anywhere;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.86);
  color: #bae6fd;
  font: 0.94rem/1.6 'Courier New', Courier, monospace;
}

.result-box strong {
  color: #cbd5e1;
  font-family: Arial, sans-serif;
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

.copy-feedback,
.example-copy {
  margin: 1rem 0 0;
  color: #7dd3fc;
  font-size: 0.9rem;
  font-weight: 800;
}

.example-copy {
  color: #94a3b8;
  font-weight: 700;
  line-height: 1.75;
}

.example-copy code,
.info-panel code {
  color: #bae6fd;
  font-family: 'Courier New', Courier, monospace;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
  max-width: 1100px;
  margin: 2rem auto 0;
}

.info-panel p {
  margin: 0.7rem 0 0;
  color: #94a3b8;
  line-height: 1.75;
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
  :global(.tool-faq) {
    padding: 1rem;
    border-radius: 16px;
  }

  .converter-grid,
  .content-grid {
    grid-template-columns: 1fr;
  }

  .converter-panel,
  .info-panel {
    padding: 1rem;
  }

  .mode-selector,
  .mode-selector button,
  .primary-action,
  .secondary-action {
    width: 100%;
  }
}
</style>
