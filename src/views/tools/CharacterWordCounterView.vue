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

const exampleText =
  'Rock Code Labs publica ferramentas gratuitas.\nEste contador ajuda a revisar textos curtos antes de enviar.'

const inputValue = ref('')

const faqItems = [
  {
    question: 'O texto digitado fica salvo?',
    answer:
      'Não. A contagem acontece no navegador, sem histórico, sem login e sem persistir o conteúdo.',
  },
  {
    question: 'A contagem usa alguma API externa?',
    answer:
      'Não. A ferramenta usa apenas JavaScript no navegador e não envia o texto para backend ou serviço externo.',
  },
  {
    question: 'Linhas vazias entram na contagem?',
    answer:
      'Sim. Quando há texto, a contagem de linhas considera as quebras de linha presentes no campo.',
  },
]

const characterCount = computed(() => Array.from(inputValue.value).length)
const characterCountWithoutSpaces = computed(
  () => Array.from(inputValue.value.replace(/\s/g, '')).length,
)
const wordCount = computed(() => {
  const words = inputValue.value.trim().match(/\S+/g)

  return words?.length ?? 0
})
const lineCount = computed(() => {
  if (!inputValue.value) {
    return 0
  }

  return inputValue.value.split(/\r\n|\r|\n/).length
})

const countCards = computed(() => [
  {
    label: 'Caracteres',
    value: characterCount.value,
    description: 'Total digitado, incluindo espaços e quebras de linha.',
  },
  {
    label: 'Palavras',
    value: wordCount.value,
    description: 'Sequências separadas por espaços, tabs ou quebras de linha.',
  },
  {
    label: 'Linhas',
    value: lineCount.value,
    description: 'Quantidade de linhas identificadas no campo de texto.',
  },
  {
    label: 'Sem espaços',
    value: characterCountWithoutSpaces.value,
    description: 'Caracteres restantes ao desconsiderar espaços e quebras.',
  },
])

const useExample = () => {
  inputValue.value = exampleText
}

const clearInput = () => {
  inputValue.value = ''
}
</script>

<template>
  <ToolPageLayout>
    <ToolBackLink />

    <ToolHero
      eyebrow="Ferramenta gratuita"
      title="Contador de caracteres e palavras online"
      description="Conte caracteres, palavras e linhas em tempo real no navegador, sem login, sem backend e sem salvar o texto digitado."
    />

    <ToolResultCard
      eyebrow="Contagem em tempo real"
      title="Cole ou digite um texto para medir tamanho e estrutura."
      description="Use o contador para revisar títulos, descrições, mensagens, rascunhos de posts, trechos técnicos e textos curtos antes de publicar ou enviar."
    >
      <div class="counter-tool">
        <label class="field-label" for="counter-input">Texto para contagem</label>
        <textarea
          id="counter-input"
          v-model="inputValue"
          rows="9"
          placeholder="Digite ou cole seu texto aqui"
          autocomplete="off"
          spellcheck="true"
        ></textarea>

        <div class="stats-grid" aria-live="polite">
          <article v-for="card in countCards" :key="card.label" class="stat-card">
            <span>{{ card.label }}</span>
            <strong>{{ card.value }}</strong>
            <p>{{ card.description }}</p>
          </article>
        </div>

        <div class="button-row">
          <button type="button" class="secondary-action" @click="useExample">Usar exemplo</button>
          <button type="button" class="secondary-action" @click="clearInput">Limpar</button>
        </div>
      </div>

      <template #footer>
        <p class="example-copy">
          Exemplo: um texto com duas frases e uma quebra de linha atualiza caracteres, palavras e
          linhas imediatamente enquanto você digita.
        </p>
      </template>
    </ToolResultCard>

    <section class="content-grid" aria-label="Informações sobre contagem de texto">
      <article class="info-panel">
        <span class="section-label">Quando usar</span>
        <h2>Revisão rápida para textos de páginas, posts e mensagens.</h2>
        <p>
          O contador ajuda a conferir tamanho de meta descriptions, rascunhos de artigos, mensagens
          para clientes, exemplos técnicos e pequenos blocos de conteúdo antes de publicar.
        </p>
      </article>

      <article class="info-panel">
        <span class="section-label">Como funciona</span>
        <h2>Resultados atualizados a cada alteração.</h2>
        <p>
          A página recalcula os números conforme o campo muda. Não há botão de envio, upload,
          backend obrigatório, histórico ou armazenamento do texto informado.
        </p>
      </article>
    </section>

    <ToolPrivacyNotice />

    <ToolFaq
      heading-id="character-counter-faq-title"
      title="Dúvidas rápidas sobre o contador."
      :items="faqItems"
    />
  </ToolPageLayout>
</template>

<style scoped>
.counter-tool {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
    0.95rem/1.6 Arial,
    sans-serif;
}

textarea:focus {
  border-color: rgba(56, 189, 248, 0.72);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
}

.stat-card {
  min-height: 8.6rem;
  padding: 1rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 16px;
  background: rgba(15, 23, 42, 0.72);
}

.stat-card span {
  display: block;
  color: #7dd3fc;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.stat-card strong {
  display: block;
  margin-top: 0.45rem;
  color: #ffffff;
  font-size: 2rem;
  line-height: 1;
}

.stat-card p {
  margin: 0.8rem 0 0;
  color: #94a3b8;
  font-size: 0.84rem;
  line-height: 1.55;
}

.button-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.secondary-action {
  min-height: 2.85rem;
  padding: 0.75rem 1rem;
  border: 1px solid rgba(148, 163, 184, 0.28);
  border-radius: 12px;
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 900;
}

.example-copy {
  margin: 0;
  color: #94a3b8;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.75;
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

@media (max-width: 900px) {
  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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

  .counter-tool,
  .info-panel {
    padding: 1rem;
  }

  .content-grid,
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .button-row {
    flex-direction: column;
  }

  .secondary-action {
    width: 100%;
  }
}
</style>
