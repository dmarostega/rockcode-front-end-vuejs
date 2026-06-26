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

const exampleText = 'https://rockcodelabs.com.br/ferramentas?busca=Vue 3 & tópico=SEO básico'

const inputValue = ref(exampleText)
const mode = ref('encode')
const copyStatus = ref('')
const copyStatusTimeout = ref(null)

const faqItems = [
  {
    question: 'A ferramenta envia minha URL para algum servidor?',
    answer:
      'Não. A codificação e a decodificação acontecem no navegador, sem backend, API externa, login ou histórico.',
  },
  {
    question: 'Qual conversão é usada?',
    answer:
      'A página usa encodeURIComponent para codificar texto de forma segura para URLs e decodeURIComponent para decodificar entradas compatíveis.',
  },
  {
    question: 'Por que uma entrada pode gerar erro ao decodificar?',
    answer:
      'Sequências percentuais incompletas ou inválidas, como %E0%A4%A, não formam uma URL codificada válida e precisam ser corrigidas antes da decodificação.',
  },
]

const privacyItems = [
  'O texto é processado localmente no navegador.',
  'Nenhum campo digitado é enviado para backend, API externa ou upload.',
  'A página não cria histórico e não usa persistência de dados para a entrada.',
]

const isEncodeMode = computed(() => mode.value === 'encode')
const conversionLabel = computed(() => (isEncodeMode.value ? 'Texto codificado' : 'Texto decodificado'))

const conversionResult = computed(() => {
  const value = inputValue.value

  if (!value) {
    return {
      value: '',
      error: '',
    }
  }

  try {
    return {
      value: isEncodeMode.value ? encodeURIComponent(value) : decodeURIComponent(value),
      error: '',
    }
  } catch {
    return {
      value: '',
      error:
        'Não foi possível decodificar a entrada. Confira se os percentuais estão completos e se o texto está em um formato de URL válido.',
    }
  }
})

const resultValue = computed(() => conversionResult.value.value)
const errorMessage = computed(() => conversionResult.value.error)
const canCopyResult = computed(() => resultValue.value.length > 0 && !errorMessage.value)

const resetCopyStatus = () => {
  if (copyStatusTimeout.value) {
    clearTimeout(copyStatusTimeout.value)
  }

  copyStatusTimeout.value = setTimeout(() => {
    copyStatus.value = ''
  }, 2400)
}

const setMode = (nextMode) => {
  mode.value = nextMode
  copyStatus.value = ''
}

const useExample = () => {
  inputValue.value = isEncodeMode.value
    ? exampleText
    : 'https%3A%2F%2Frockcodelabs.com.br%2Fferramentas%3Fbusca%3DVue%203%20%26%20t%C3%B3pico%3DSEO%20b%C3%A1sico'
  copyStatus.value = ''
}

const clearInput = () => {
  inputValue.value = ''
  copyStatus.value = ''
}

const copyWithFallback = () => {
  const temporaryField = document.createElement('textarea')
  temporaryField.value = resultValue.value
  temporaryField.setAttribute('readonly', '')
  temporaryField.style.position = 'fixed'
  temporaryField.style.opacity = '0'

  document.body.appendChild(temporaryField)
  temporaryField.select()

  const copied = document.execCommand('copy')
  document.body.removeChild(temporaryField)

  return copied
}

const copyResult = async () => {
  if (!canCopyResult.value) {
    copyStatus.value = 'Gere um resultado válido antes de copiar.'
    resetCopyStatus()
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(resultValue.value)
    } else if (!copyWithFallback()) {
      throw new Error('Copy command failed')
    }

    copyStatus.value = 'Resultado copiado.'
  } catch {
    copyStatus.value = 'Não foi possível copiar automaticamente.'
  } finally {
    resetCopyStatus()
  }
}
</script>

<template>
  <ToolPageLayout>
    <ToolBackLink />

    <ToolHero
      eyebrow="Ferramenta gratuita"
      title="URL encode e decode online"
      description="Codifique e decodifique URLs, parâmetros e pequenos textos diretamente no navegador, sem login, backend, API externa ou armazenamento."
    />

    <ToolResultCard
      eyebrow="Conversão client-side"
      title="Codifique ou decodifique texto para uso em URLs."
      description="Use para preparar parâmetros de query string, revisar trechos recebidos de APIs ou conferir textos com espaços, acentos e caracteres especiais."
    >
      <div class="url-tool">
        <div class="mode-selector" aria-label="Modo de conversão">
          <button
            type="button"
            :class="{ active: isEncodeMode }"
            :aria-pressed="isEncodeMode"
            @click="setMode('encode')"
          >
            Encode
          </button>
          <button
            type="button"
            :class="{ active: !isEncodeMode }"
            :aria-pressed="!isEncodeMode"
            @click="setMode('decode')"
          >
            Decode
          </button>
        </div>

        <label class="field-label" for="url-input">Texto ou URL</label>
        <textarea
          id="url-input"
          v-model="inputValue"
          rows="6"
          placeholder="Cole uma URL, query string ou texto para converter"
          autocomplete="off"
          spellcheck="false"
        ></textarea>

        <label class="field-label" for="url-result">{{ conversionLabel }}</label>
        <output
          id="url-result"
          class="url-result"
          :class="{ 'url-result--empty': !resultValue }"
          aria-live="polite"
        >
          {{ resultValue || 'O resultado aparecerá aqui' }}
        </output>

        <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>

        <div class="button-row">
          <button type="button" class="primary-action" :disabled="!canCopyResult" @click="copyResult">
            Copiar resultado
          </button>
          <button type="button" class="secondary-action" @click="useExample">Usar exemplo</button>
          <button type="button" class="secondary-action" @click="clearInput">Limpar</button>
        </div>

        <p v-if="copyStatus" class="copy-feedback" role="status">{{ copyStatus }}</p>
      </div>

      <template #footer>
        <p class="example-copy">
          Exemplo:
          <code>{{ exampleText }}</code>
          vira
          <code>
            https%3A%2F%2Frockcodelabs.com.br%2Fferramentas%3Fbusca%3DVue%203%20%26%20t%C3%B3pico%3DSEO%20b%C3%A1sico
          </code>
          no modo encode.
        </p>
      </template>
    </ToolResultCard>

    <section class="content-grid" aria-label="Informações sobre URL encode e decode">
      <article class="info-panel">
        <span class="section-label">Quando usar</span>
        <h2>URLs e parâmetros mais seguros para copiar, testar e compartilhar.</h2>
        <p>
          O encode transforma espaços, acentos e símbolos em uma representação adequada para URLs.
          Isso ajuda em query strings, links com parâmetros e exemplos técnicos.
        </p>
      </article>

      <article class="info-panel">
        <span class="section-label">Como funciona</span>
        <h2>Decode com erro amigável quando a entrada é inválida.</h2>
        <p>
          Ao decodificar, a ferramenta valida sequências percentuais. Se o texto estiver incompleto
          ou quebrado, a página mostra uma mensagem clara sem interromper a navegação.
        </p>
      </article>
    </section>

    <ToolPrivacyNotice
      title="Sua entrada fica somente no navegador."
      description="A ferramenta roda client-side, sem login, sem backend obrigatório, sem API externa, sem upload, sem histórico e sem persistência de dados."
      :items="privacyItems"
    />

    <ToolFaq
      heading-id="url-encode-decode-faq-title"
      title="Dúvidas rápidas sobre URL encode/decode."
      :items="faqItems"
    />
  </ToolPageLayout>
</template>

<style scoped>
.url-tool {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
  padding: 1.3rem;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.48);
}

.mode-selector {
  display: inline-flex;
  width: fit-content;
  padding: 0.25rem;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.72);
}

.mode-selector button {
  min-height: 2.55rem;
  padding: 0.65rem 1rem;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #cbd5e1;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 900;
}

.mode-selector button.active {
  background: #38bdf8;
  color: #082f49;
}

.field-label {
  color: #cbd5e1;
  font-size: 0.86rem;
  font-weight: 900;
}

textarea {
  width: 100%;
  resize: vertical;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  outline: none;
  background: rgba(15, 23, 42, 0.86);
  color: #e0f2fe;
  font:
    0.95rem/1.6 Arial,
    sans-serif;
}

textarea:focus {
  border-color: rgba(56, 189, 248, 0.72);
}

.url-result {
  display: block;
  min-height: 3.35rem;
  overflow-wrap: anywhere;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.86);
  color: #bae6fd;
  font:
    0.95rem/1.6 'Courier New',
    Courier,
    monospace;
}

.url-result--empty {
  color: #64748b;
  font-family: Arial, sans-serif;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.primary-action,
.secondary-action {
  min-height: 2.85rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 900;
}

.primary-action {
  border: 1px solid rgba(56, 189, 248, 0.7);
  background: #38bdf8;
  color: #082f49;
}

.primary-action:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.secondary-action {
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
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
  margin: 0;
  color: #7dd3fc;
  font-size: 0.9rem;
  font-weight: 800;
}

.example-copy {
  color: #94a3b8;
  font-weight: 700;
  line-height: 1.75;
}

.example-copy code {
  color: #bae6fd;
  font-family: 'Courier New', Courier, monospace;
  overflow-wrap: anywhere;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
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

  :global(.tool-hero h1) {
    max-width: 300px;
    margin-right: auto;
    margin-left: auto;
    font-size: 2rem;
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

  .url-tool,
  .info-panel {
    padding: 1rem;
  }

  .mode-selector,
  .mode-selector button,
  .primary-action,
  .secondary-action {
    width: 100%;
  }

  .mode-selector {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .button-row {
    flex-direction: column;
  }
}
</style>
