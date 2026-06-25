<script setup>
import { computed, ref } from 'vue'
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'

const inputValue = ref('{\n  "project": "Rock Code Labs",\n  "tool": "JSON",\n  "active": true\n}')
const resultValue = ref('')
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

const parseJsonInput = () => {
  if (!inputValue.value.trim()) {
    throw new Error('Empty JSON input')
  }

  return JSON.parse(inputValue.value)
}

const handleJsonAction = (action) => {
  clearFeedback()

  try {
    const parsedJson = parseJsonInput()
    resultValue.value =
      action === 'minify' ? JSON.stringify(parsedJson) : JSON.stringify(parsedJson, null, 2)
  } catch {
    resultValue.value = ''
    errorMessage.value =
      'JSON inválido. Confira chaves, vírgulas, aspas e valores antes de tentar novamente.'
  }
}

const useExample = () => {
  inputValue.value =
    '{\n  "name": "Rock Code Labs",\n  "stack": ["Vue", "Laravel"],\n  "public": true\n}'
  handleJsonAction('format')
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

handleJsonAction('format')
</script>

<template>
  <LayoutDefault>
    <main class="tool-page">
      <section class="tool-hero">
        <span class="eyebrow">Ferramenta gratuita</span>

        <h1>Formatador e validador JSON online</h1>

        <p>
          Formate, valide e minifique JSON diretamente no navegador, com feedback claro quando a
          entrada tiver erro de sintaxe.
        </p>
      </section>

      <section class="tool-panel" aria-labelledby="json-tool-title">
        <div class="tool-copy">
          <span class="section-label">JSON</span>
          <h2 id="json-tool-title">Validação rápida para payloads e configurações.</h2>
          <p>
            Cole um JSON, gere uma versão formatada para leitura ou minifique para transporte. Nada
            é salvo ou enviado para backend.
          </p>
        </div>

        <div class="tool-card">
          <label class="field-label" for="json-input">Entrada JSON</label>
          <textarea
            id="json-input"
            v-model="inputValue"
            rows="9"
            placeholder='Cole algo como {"name":"Rock Code Labs"}'
          ></textarea>

          <div class="button-row">
            <button type="button" class="primary-action" @click="handleJsonAction('format')">
              Formatar JSON
            </button>
            <button type="button" class="secondary-action" @click="handleJsonAction('minify')">
              Minificar JSON
            </button>
            <button type="button" class="secondary-action" @click="useExample">Usar exemplo</button>
          </div>

          <p v-if="errorMessage" class="error-message" role="alert">{{ errorMessage }}</p>

          <label class="field-label" for="json-result">Resultado</label>
          <textarea
            id="json-result"
            :value="resultValue"
            rows="9"
            readonly
            placeholder="O resultado aparecerá aqui"
          ></textarea>

          <button
            type="button"
            class="primary-action copy-action"
            :disabled="!resultIsAvailable"
            @click="copyResult"
          >
            Copiar resultado
          </button>

          <p v-if="copyStatus" class="copy-feedback" role="status">{{ copyStatus }}</p>
        </div>
      </section>

      <section class="content-grid" aria-label="Informações sobre JSON">
        <article class="info-panel">
          <span class="section-label">Exemplo de uso</span>
          <h2>Revisar uma resposta de API.</h2>
          <p>
            Cole uma resposta JSON minificada para visualizar a estrutura, encontrar campos e
            validar se o payload está sintaticamente correto.
          </p>
        </article>

        <article class="info-panel">
          <span class="section-label">Privacidade</span>
          <h2>Sem histórico e sem upload.</h2>
          <p>
            O processamento usa apenas recursos do navegador. A ferramenta não cria conta, não
            mantém histórico e não envia o JSON para serviços externos.
          </p>
        </article>
      </section>

      <section class="faq-section" aria-labelledby="json-faq-title">
        <div class="section-heading">
          <span class="section-label">FAQ</span>
          <h2 id="json-faq-title">Dúvidas rápidas sobre JSON.</h2>
        </div>

        <div class="faq-list">
          <article>
            <h3>O que o validador confere?</h3>
            <p>
              Ele tenta interpretar a entrada com o parser nativo do navegador e mostra erro
              amigável se falhar.
            </p>
          </article>

          <article>
            <h3>Qual a diferença entre formatar e minificar?</h3>
            <p>
              Formatar adiciona quebras e espaços para leitura. Minificar remove espaços extras.
            </p>
          </article>

          <article>
            <h3>O JSON fica salvo?</h3>
            <p>
              Não. O conteúdo fica apenas na tela durante o uso e não é persistido pela aplicação.
            </p>
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

.copy-action {
  width: fit-content;
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
  .tool-panel,
  .content-grid,
  .faq-list {
    grid-template-columns: 1fr;
  }

  .tool-panel {
    gap: 1.2rem;
  }

  .button-row {
    flex-direction: column;
  }

  .copy-action {
    width: 100%;
  }
}
</style>
