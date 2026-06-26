<script setup>
import { computed, ref } from 'vue'
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
import { ToolBackLink } from '@/components/tools'

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder('utf-8', { fatal: true })

const inputValue = ref('Olá, Rock Code Labs!')
const resultValue = ref('')
const selectedMode = ref('encode')
const errorMessage = ref('')
const copyStatus = ref('')
const copyStatusTimeout = ref(null)

const resultIsAvailable = computed(() => resultValue.value.length > 0 && !errorMessage.value)

const clearFeedback = () => {
  errorMessage.value = ''
  copyStatus.value = ''
}

const resetCopyStatus = () => {
  if (copyStatusTimeout.value) {
    clearTimeout(copyStatusTimeout.value)
  }

  copyStatusTimeout.value = setTimeout(() => {
    copyStatus.value = ''
  }, 2400)
}

const encodeTextToBase64 = (value) => {
  const bytes = textEncoder.encode(value)
  let binaryValue = ''

  bytes.forEach((byte) => {
    binaryValue += String.fromCharCode(byte)
  })

  return btoa(binaryValue)
}

const decodeBase64ToText = (value) => {
  const normalizedValue = value.replace(/\s/g, '')

  if (
    !normalizedValue ||
    normalizedValue.length % 4 === 1 ||
    !/^[A-Za-z0-9+/]*={0,2}$/.test(normalizedValue)
  ) {
    throw new Error('Invalid Base64 input')
  }

  const binaryValue = atob(normalizedValue)
  const bytes = Uint8Array.from(binaryValue, (character) => character.charCodeAt(0))

  return textDecoder.decode(bytes)
}

const convertInput = () => {
  clearFeedback()

  try {
    resultValue.value =
      selectedMode.value === 'encode'
        ? encodeTextToBase64(inputValue.value)
        : decodeBase64ToText(inputValue.value)
  } catch {
    resultValue.value = ''
    errorMessage.value =
      'Não foi possível decodificar este Base64. Confira se o conteúdo está completo e válido.'
  }
}

const useExample = () => {
  selectedMode.value = 'encode'
  inputValue.value = 'exemplo para API'
  convertInput()
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
  if (!resultIsAvailable.value) {
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

convertInput()
</script>

<template>
  <LayoutDefault>
    <main class="tool-page">
      <ToolBackLink />

      <section class="tool-hero">
        <span class="eyebrow">Ferramenta gratuita</span>

        <h1>Conversor Base64 online</h1>

        <p>
          Converta texto para Base64 ou decodifique Base64 para texto diretamente no navegador, sem
          login, sem API externa e sem salvar dados.
        </p>
      </section>

      <section class="tool-panel" aria-labelledby="base64-tool-title">
        <div class="tool-copy">
          <span class="section-label">Encode e decode</span>
          <h2 id="base64-tool-title">Conversão rápida para pequenos textos.</h2>
          <p>
            Escolha o modo, cole o conteúdo e gere o resultado localmente. A ferramenta não envia o
            texto digitado para servidores.
          </p>
        </div>

        <div class="tool-card">
          <div class="mode-switch" aria-label="Modo de conversão">
            <label>
              <input v-model="selectedMode" type="radio" value="encode" @change="convertInput" />
              Texto para Base64
            </label>
            <label>
              <input v-model="selectedMode" type="radio" value="decode" @change="convertInput" />
              Base64 para texto
            </label>
          </div>

          <label class="field-label" for="base64-input">Entrada</label>
          <textarea
            id="base64-input"
            v-model="inputValue"
            rows="7"
            placeholder="Digite ou cole o conteúdo aqui"
            @input="convertInput"
          ></textarea>

          <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>

          <label class="field-label" for="base64-result">Resultado</label>
          <textarea
            id="base64-result"
            :value="resultValue"
            rows="5"
            readonly
            placeholder="O resultado aparecerá aqui"
          ></textarea>

          <div class="button-row">
            <button type="button" class="secondary-action" @click="useExample">Usar exemplo</button>
            <button
              type="button"
              class="primary-action"
              :disabled="!resultIsAvailable"
              @click="copyResult"
            >
              Copiar resultado
            </button>
          </div>

          <p v-if="copyStatus" class="copy-feedback" role="status">{{ copyStatus }}</p>
        </div>
      </section>

      <section class="content-grid" aria-label="Informações sobre Base64">
        <article class="info-panel">
          <span class="section-label">Exemplo de uso</span>
          <h2>Payload simples para documentação ou testes.</h2>
          <p>
            Um texto como <code>exemplo para API</code> pode ser convertido para Base64 antes de ser
            usado em uma prova de conceito ou anotação técnica.
          </p>
        </article>

        <article class="info-panel">
          <span class="section-label">Privacidade</span>
          <h2>Processamento apenas no navegador.</h2>
          <p>
            A conversão acontece localmente. A página não cria histórico, não exige conta e não
            salva o conteúdo digitado em banco ou storage remoto.
          </p>
        </article>
      </section>

      <section class="faq-section" aria-labelledby="base64-faq-title">
        <div class="section-heading">
          <span class="section-label">FAQ</span>
          <h2 id="base64-faq-title">Dúvidas rápidas sobre Base64.</h2>
        </div>

        <div class="faq-list">
          <article>
            <h3>Base64 é criptografia?</h3>
            <p>
              Não. Base64 é uma codificação reversível e não deve ser usado para proteger dados.
            </p>
          </article>

          <article>
            <h3>Posso usar com acentos?</h3>
            <p>Sim. A ferramenta trata o texto como UTF-8 para preservar caracteres acentuados.</p>
          </article>

          <article>
            <h3>Os dados são enviados?</h3>
            <p>Não. A conversão roda no navegador e não depende de backend ou API externa.</p>
          </article>
        </div>
      </section>

    </main>

    <NavBoard />
  </LayoutDefault>
</template>

<style scoped>
.tool-page {
  min-height: 100vh;
  padding: 3rem 1.25rem 6rem;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 30rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}

.tool-hero,
.tool-panel,
.content-grid,
.faq-section {
  max-width: 1100px;
  margin: 0 auto;
}

.tool-hero {
  padding: 2rem 0 3rem;
  text-align: center;
}

.eyebrow,
.section-label {
  display: inline-flex;
  width: fit-content;
  border-radius: 999px;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.eyebrow {
  padding: 0.42rem 0.8rem;
  border: 1px solid rgba(56, 189, 248, 0.35);
  background: rgba(15, 23, 42, 0.75);
  color: #7dd3fc;
  font-size: 0.78rem;
}

.section-label {
  margin-bottom: 1rem;
  padding: 0.32rem 0.7rem;
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
  font-size: 0.72rem;
}

.tool-hero h1 {
  max-width: 880px;
  margin: 1.3rem auto 0;
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

.tool-panel,
.info-panel,
.faq-section {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.tool-panel {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 2rem;
  padding: 2rem;
}

.tool-copy h2,
.section-heading h2,
.info-panel h2,
.faq-list h3 {
  margin: 0;
  color: #ffffff;
}

.tool-copy p,
.info-panel p,
.faq-list p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.75;
}

.tool-card {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  min-width: 0;
  padding: 1.3rem;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.48);
}

.mode-switch {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
}

.mode-switch label {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 2.8rem;
  padding: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.74);
  color: #e2e8f0;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 800;
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
    0.95rem/1.6 'Courier New',
    Courier,
    monospace;
}

textarea:focus {
  border-color: rgba(56, 189, 248, 0.72);
}

.error-message {
  margin: 0;
  color: #fca5a5;
  font-size: 0.9rem;
  font-weight: 800;
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

.copy-feedback {
  margin: 0;
  color: #7dd3fc;
  font-size: 0.9rem;
  font-weight: 800;
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
  margin-top: 2rem;
}

.info-panel {
  padding: 1.7rem;
}

.info-panel code {
  color: #bae6fd;
  font-family: 'Courier New', Courier, monospace;
}

.faq-section {
  margin-top: 2rem;
  padding: 1.7rem;
}

.section-heading {
  margin-bottom: 1rem;
}

.faq-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.faq-list article {
  padding: 1.2rem;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 16px;
  background: rgba(2, 6, 23, 0.32);
}

.faq-list h3 {
  margin-bottom: 0.55rem;
  font-size: 1rem;
}

@media (max-width: 820px) {
  :global(.tool-back-link) {
    max-width: 100%;
  }

  .tool-panel,
  .content-grid,
  .faq-list,
  .mode-switch {
    grid-template-columns: 1fr;
  }

  .tool-panel {
    gap: 1.2rem;
  }

  .button-row {
    flex-direction: column;
  }
}
</style>
