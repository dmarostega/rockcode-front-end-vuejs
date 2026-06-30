<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  ToolBackLink,
  ToolFaq,
  ToolHero,
  ToolPageLayout,
  ToolPrivacyNotice,
  ToolResultCard,
} from '@/components/tools'
import { trackEvent } from '@/utils/tracking'

const exampleText = 'Guia rápido: Como criar páginas Vue com SEO básico'
const trackingPayload = {
  feature: 'slug_generator',
}

const inputValue = ref(exampleText)
const copyStatus = ref('')
const copyStatusTimeout = ref(null)

const faqItems = [
  {
    question: 'O slug gerado fica salvo?',
    answer: 'Não. O texto digitado e o resultado ficam apenas no navegador durante o uso da página.',
  },
  {
    question: 'A ferramenta remove acentos?',
    answer:
      'Sim. A conversão normaliza caracteres acentuados para letras simples antes de montar o slug.',
  },
  {
    question: 'Posso usar em URLs públicas?',
    answer:
      'Sim. O resultado usa letras minúsculas, números e hífens, um formato comum para URLs amigáveis.',
  },
]

const normalizeSlugInput = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-')

const slugValue = computed(() => normalizeSlugInput(inputValue.value))
const slugIsAvailable = computed(() => slugValue.value.length > 0)

const resetCopyStatus = () => {
  if (copyStatusTimeout.value) {
    clearTimeout(copyStatusTimeout.value)
  }

  copyStatusTimeout.value = setTimeout(() => {
    copyStatus.value = ''
  }, 2400)
}

const useExample = () => {
  inputValue.value = exampleText
  copyStatus.value = ''
  trackEvent('tool_example_used', trackingPayload)
}

const clearInput = () => {
  inputValue.value = ''
  copyStatus.value = ''
  trackEvent('tool_cleared', trackingPayload)
}

const copyWithFallback = () => {
  const temporaryField = document.createElement('textarea')
  temporaryField.value = slugValue.value
  temporaryField.setAttribute('readonly', '')
  temporaryField.style.position = 'fixed'
  temporaryField.style.opacity = '0'

  document.body.appendChild(temporaryField)
  temporaryField.select()

  const copied = document.execCommand('copy')
  document.body.removeChild(temporaryField)

  return copied
}

const copySlug = async () => {
  if (!slugIsAvailable.value) {
    copyStatus.value = 'Digite um texto para gerar um slug antes de copiar.'
    resetCopyStatus()
    return
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(slugValue.value)
    } else if (!copyWithFallback()) {
      throw new Error('Copy command failed')
    }

    copyStatus.value = 'Slug copiado.'
    trackEvent('tool_result_copied', trackingPayload)
  } catch {
    copyStatus.value = 'Não foi possível copiar automaticamente.'
  } finally {
    resetCopyStatus()
  }
}

onMounted(() => {
  trackEvent('tool_opened', trackingPayload)
})
</script>

<template>
  <ToolPageLayout>
    <ToolBackLink />

    <ToolHero
      eyebrow="Ferramenta gratuita"
      title="Gerador de slug online"
      description="Transforme títulos, frases e nomes de páginas em slugs amigáveis para URLs, com conversão local no navegador e sem salvar o texto digitado."
    />

    <ToolResultCard
      eyebrow="Slug amigável"
      title="Converta texto em URL limpa."
      description="Digite uma frase com espaços, acentos, pontuação ou letras maiúsculas. O resultado é normalizado para letras minúsculas, números e hífens."
    >
      <div class="slug-tool">
        <label class="field-label" for="slug-input">Texto original</label>
        <textarea
          id="slug-input"
          v-model="inputValue"
          rows="5"
          placeholder="Exemplo: Como criar uma página pública com Vue?"
        ></textarea>

        <label class="field-label" for="slug-result">Slug gerado</label>
        <output id="slug-result" class="slug-result" aria-live="polite">
          {{ slugValue || 'O slug aparecerá aqui' }}
        </output>

        <div class="button-row">
          <button type="button" class="primary-action" :disabled="!slugIsAvailable" @click="copySlug">
            Copiar slug
          </button>
          <button type="button" class="secondary-action" @click="useExample">Usar exemplo</button>
          <button type="button" class="secondary-action" @click="clearInput">Limpar</button>
        </div>

        <p v-if="copyStatus" class="copy-feedback" role="status">{{ copyStatus }}</p>
      </div>

      <template #footer>
        <p class="example-copy">
          Exemplo:
          <code>Guia rápido: Como criar páginas Vue com SEO básico</code>
          vira
          <code>guia-rapido-como-criar-paginas-vue-com-seo-basico</code>.
        </p>
      </template>
    </ToolResultCard>

    <section class="content-grid" aria-label="Informações sobre geração de slug">
      <article class="info-panel">
        <span class="section-label">Quando usar</span>
        <h2>URLs legíveis para páginas, artigos e recursos.</h2>
        <p>
          Slugs ajudam a transformar nomes longos em endereços curtos e previsíveis, úteis para
          rotas públicas, documentação, artigos e protótipos.
        </p>
      </article>

      <article class="info-panel">
        <span class="section-label">Formato</span>
        <h2>Resultado simples e compatível.</h2>
        <p>
          A ferramenta remove acentos, troca grupos de caracteres especiais por hífens e evita
          hífens duplicados no começo, no meio ou no fim do slug.
        </p>
      </article>
    </section>

    <ToolPrivacyNotice />

    <ToolFaq
      heading-id="slug-faq-title"
      title="Dúvidas rápidas sobre slugs."
      :items="faqItems"
    />
  </ToolPageLayout>
</template>

<style scoped>
.slug-tool {
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

.slug-result {
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

  :global(.tool-hero h1) {
    max-width: 280px;
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
    width: min(100%, 280px);
    max-width: 280px;
    margin-right: auto;
    margin-left: auto;
  }

  :global(.tool-result-card),
  :global(.tool-privacy-notice),
  :global(.tool-faq) {
    padding: 1rem;
    border-radius: 16px;
  }

  .slug-tool,
  .info-panel {
    padding: 1rem;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .button-row {
    flex-direction: column;
  }

  .primary-action,
  .secondary-action {
    width: 100%;
  }
}
</style>
