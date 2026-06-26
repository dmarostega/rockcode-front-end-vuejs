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

const textInput = ref('Rock Code Labs')
const algorithm = ref('SHA-256')
const hashResult = ref('')
const errorMessage = ref('')
const copyStatus = ref('')
const copyStatusTimeout = ref(null)
const isGenerating = ref(false)

const faqItems = [
  {
    question: 'O texto digitado e enviado para algum servidor?',
    answer:
      'Nao. A geracao usa a Web Crypto API no navegador e nao envia o texto para backend ou API externa.',
  },
  {
    question: 'Posso usar SHA-256 simples para armazenar senhas?',
    answer:
      'Nao e uma recomendacao segura para senhas. Para senhas, use algoritmos apropriados com salt e custo, como Argon2, bcrypt ou scrypt.',
  },
  {
    question: 'Para que esta ferramenta e util?',
    answer:
      'Ela ajuda em testes, documentacao, exemplos tecnicos, verificacao didatica e comparacao de hashes em desenvolvimento.',
  },
]

const canGenerateHash = computed(() => textInput.value.length > 0 && !isGenerating.value)
const canCopyHash = computed(() => hashResult.value.length > 0)

const formatDigestAsHex = (digest) =>
  Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')

const setAlgorithm = (nextAlgorithm) => {
  algorithm.value = nextAlgorithm
  hashResult.value = ''
  errorMessage.value = ''
  copyStatus.value = ''
}

const generateHash = async () => {
  if (!textInput.value) {
    errorMessage.value = 'Digite um texto para gerar o hash.'
    hashResult.value = ''
    return
  }

  if (!globalThis.crypto?.subtle) {
    errorMessage.value = 'Seu navegador nao disponibilizou a Web Crypto API para gerar hashes.'
    hashResult.value = ''
    return
  }

  isGenerating.value = true
  errorMessage.value = ''
  copyStatus.value = ''

  try {
    const encodedText = new TextEncoder().encode(textInput.value)
    const digest = await globalThis.crypto.subtle.digest(algorithm.value, encodedText)

    hashResult.value = formatDigestAsHex(digest)
  } catch {
    errorMessage.value = 'Nao foi possivel gerar o hash neste navegador.'
    hashResult.value = ''
  } finally {
    isGenerating.value = false
  }
}

const resetCopyStatus = () => {
  if (copyStatusTimeout.value) {
    clearTimeout(copyStatusTimeout.value)
  }

  copyStatusTimeout.value = setTimeout(() => {
    copyStatus.value = ''
  }, 2400)
}

const copyWithFallback = () => {
  const temporaryField = document.createElement('textarea')
  temporaryField.value = hashResult.value
  temporaryField.setAttribute('readonly', '')
  temporaryField.style.position = 'fixed'
  temporaryField.style.opacity = '0'

  document.body.appendChild(temporaryField)
  temporaryField.select()

  const copied = document.execCommand('copy')
  document.body.removeChild(temporaryField)

  return copied
}

const copyHash = async () => {
  if (!canCopyHash.value) {
    copyStatus.value = 'Gere um hash antes de copiar.'
    resetCopyStatus()
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(hashResult.value)
    } else if (!copyWithFallback()) {
      throw new Error('Copy command failed')
    }

    copyStatus.value = 'Hash copiado.'
  } catch {
    copyStatus.value = 'Nao foi possivel copiar automaticamente.'
  } finally {
    resetCopyStatus()
  }
}

const useExample = async () => {
  textInput.value = 'Rock Code Labs'
  algorithm.value = 'SHA-256'
  await generateHash()
}
</script>

<template>
  <ToolPageLayout>
    <ToolBackLink />

    <ToolHero
      eyebrow="Ferramenta gratuita"
      title="Gerador de hash SHA-256 e SHA-512"
      description="Gere hashes localmente no navegador para testes, exemplos e uso didatico/dev, sem login, backend, API externa ou historico."
    />

    <ToolResultCard
      eyebrow="Processamento local"
      title="Digite um texto e gere um hash."
      description="A ferramenta usa a Web Crypto API do navegador. O texto digitado nao deve ser capturado por analytics e nao e enviado para servidores."
    >
      <div class="hash-tool">
        <label class="field-label" for="hash-input">Texto para gerar hash</label>
        <textarea
          id="hash-input"
          v-model="textInput"
          rows="5"
          autocomplete="off"
          spellcheck="false"
          placeholder="Digite um texto para gerar SHA-256 ou SHA-512"
        ></textarea>

        <div class="mode-selector" aria-label="Algoritmo de hash">
          <button
            type="button"
            :class="{ active: algorithm === 'SHA-256' }"
            :aria-pressed="algorithm === 'SHA-256'"
            @click="setAlgorithm('SHA-256')"
          >
            SHA-256
          </button>
          <button
            type="button"
            :class="{ active: algorithm === 'SHA-512' }"
            :aria-pressed="algorithm === 'SHA-512'"
            @click="setAlgorithm('SHA-512')"
          >
            SHA-512
          </button>
        </div>

        <p class="security-note">
          Uso local, didatico e de desenvolvimento. Hash simples nao e recomendacao para
          armazenamento moderno de senhas.
        </p>

        <label class="field-label" for="hash-result">Resultado {{ algorithm }}</label>
        <output id="hash-result" class="hash-result" aria-live="polite">
          {{ hashResult || 'O hash aparecera aqui apos gerar' }}
        </output>

        <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>

        <div class="button-row">
          <button
            type="button"
            class="primary-action"
            :disabled="!canGenerateHash"
            @click="generateHash"
          >
            {{ isGenerating ? 'Gerando...' : 'Gerar hash' }}
          </button>
          <button type="button" class="secondary-action" :disabled="!canCopyHash" @click="copyHash">
            Copiar resultado
          </button>
          <button type="button" class="secondary-action" @click="useExample">Usar exemplo</button>
        </div>

        <p v-if="copyStatus" class="copy-feedback" role="status">{{ copyStatus }}</p>
      </div>

      <template #footer>
        <p class="example-copy">
          Exemplo: <code>Rock Code Labs</code> pode ser usado para comparar resultados entre
          SHA-256 e SHA-512.
        </p>
      </template>
    </ToolResultCard>

    <section class="content-grid" aria-label="Informacoes sobre hashes">
      <article class="info-panel">
        <span class="section-label">Quando usar</span>
        <h2>Comparacao rapida para testes e documentacao.</h2>
        <p>
          Hashes sao uteis para exemplos tecnicos, conferencias didaticas e validacao de pequenos
          textos em ambiente de desenvolvimento.
        </p>
      </article>

      <article class="info-panel">
        <span class="section-label">Seguranca</span>
        <h2>Nao substitui estrategia segura de senha.</h2>
        <p>
          Para senhas, use solucoes apropriadas com salt e fator de custo. Esta pagina nao vende
          SHA simples como solucao moderna para armazenamento de credenciais.
        </p>
      </article>
    </section>

    <ToolPrivacyNotice />

    <ToolFaq heading-id="hash-faq-title" title="Duvidas rapidas sobre hashes." :items="faqItems" />
  </ToolPageLayout>
</template>

<style scoped>
.hash-tool {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
  padding: 1.3rem;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.48);
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
  font: 0.95rem/1.6 Arial, sans-serif;
}

textarea:focus {
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

.primary-action:disabled,
.secondary-action:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}

.security-note {
  margin: 0;
  padding: 0.9rem 1rem;
  border: 1px solid rgba(251, 191, 36, 0.3);
  border-radius: 12px;
  background: rgba(120, 53, 15, 0.26);
  color: #fde68a;
  font-size: 0.9rem;
  font-weight: 800;
  line-height: 1.55;
}

.hash-result {
  display: block;
  min-height: 5.2rem;
  overflow-wrap: anywhere;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.86);
  color: #bae6fd;
  font: 0.94rem/1.6 'Courier New', Courier, monospace;
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

  .hash-tool,
  .info-panel {
    padding: 1rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .mode-selector,
  .mode-selector button,
  .primary-action,
  .secondary-action {
    width: 100%;
  }
}
</style>
