<script setup>
import { computed, ref } from 'vue'
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
import { ToolBackLink } from '@/components/tools'

const UUID_VERSION_4_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

const createUuidFallback = () => {
  const randomValues = new Uint8Array(16)
  globalThis.crypto.getRandomValues(randomValues)

  randomValues[6] = (randomValues[6] & 0x0f) | 0x40
  randomValues[8] = (randomValues[8] & 0x3f) | 0x80

  const hexadecimalValues = [...randomValues].map((value) => value.toString(16).padStart(2, '0'))

  return [
    hexadecimalValues.slice(0, 4).join(''),
    hexadecimalValues.slice(4, 6).join(''),
    hexadecimalValues.slice(6, 8).join(''),
    hexadecimalValues.slice(8, 10).join(''),
    hexadecimalValues.slice(10, 16).join(''),
  ].join('-')
}

const createUuid = () => {
  if (typeof globalThis.crypto?.randomUUID === 'function') {
    return globalThis.crypto.randomUUID()
  }

  return createUuidFallback()
}

const uuid = ref(createUuid())
const copyStatus = ref('')
const copyStatusTimeout = ref(null)

const uuidIsValid = computed(() => UUID_VERSION_4_PATTERN.test(uuid.value))

const resetCopyStatus = () => {
  if (copyStatusTimeout.value) {
    clearTimeout(copyStatusTimeout.value)
  }

  copyStatusTimeout.value = setTimeout(() => {
    copyStatus.value = ''
  }, 2400)
}

const generateUuid = () => {
  uuid.value = createUuid()
  copyStatus.value = ''
}

const copyWithFallback = () => {
  const temporaryField = document.createElement('textarea')
  temporaryField.value = uuid.value
  temporaryField.setAttribute('readonly', '')
  temporaryField.style.position = 'fixed'
  temporaryField.style.opacity = '0'

  document.body.appendChild(temporaryField)
  temporaryField.select()

  const copied = document.execCommand('copy')
  document.body.removeChild(temporaryField)

  return copied
}

const copyUuid = async () => {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(uuid.value)
    } else if (!copyWithFallback()) {
      throw new Error('Copy command failed')
    }

    copyStatus.value = 'UUID copiado.'
  } catch {
    copyStatus.value = 'Não foi possível copiar automaticamente.'
  } finally {
    resetCopyStatus()
  }
}
</script>

<template>
  <LayoutDefault>
    <main class="uuid-page">
      <ToolBackLink />

      <section class="uuid-hero">
        <span class="eyebrow">Ferramenta gratuita</span>

        <h1>Gerador UUID online</h1>

        <p>
          Gere UUIDs v4 diretamente no navegador, sem login, sem API externa e sem armazenar dados.
        </p>
      </section>

      <section class="generator-panel" aria-labelledby="generated-uuid-title">
        <div class="generator-copy">
          <span class="section-label">UUID v4</span>
          <h2 id="generated-uuid-title">Identificador gerado no seu navegador.</h2>
          <p>
            Use em testes, protótipos, chaves temporárias, seeds ou qualquer contexto em que você
            precise de um identificador único no formato UUID.
          </p>
        </div>

        <div class="generator-card">
          <span class="uuid-value" aria-live="polite">{{ uuid }}</span>

          <div class="uuid-status" :class="{ valid: uuidIsValid }">
            <span aria-hidden="true"></span>
            {{ uuidIsValid ? 'Formato UUID válido' : 'Formato UUID inválido' }}
          </div>

          <div class="button-row">
            <button type="button" class="primary-action" @click="generateUuid">
              Gerar novo UUID
            </button>
            <button type="button" class="secondary-action" @click="copyUuid">Copiar UUID</button>
          </div>

          <p v-if="copyStatus" class="copy-feedback" role="status">{{ copyStatus }}</p>
        </div>
      </section>

      <section class="content-grid" aria-label="Informações sobre UUID">
        <article class="info-panel">
          <span class="section-label">Exemplo de uso</span>
          <h2>Chave única para dados de teste.</h2>
          <p>
            Um UUID pode identificar um registro temporário, uma requisição de teste, uma referência
            em planilhas ou uma entidade criada durante o desenvolvimento.
          </p>

          <code>request_id: "{{ uuid }}"</code>
        </article>

        <article class="info-panel">
          <span class="section-label">Privacidade</span>
          <h2>Nada é enviado para servidores.</h2>
          <p>
            A geração acontece apenas no navegador. A página não cria histórico, não exige conta e
            não salva os UUIDs gerados em banco ou storage remoto.
          </p>
        </article>
      </section>

      <section class="faq-section" aria-labelledby="uuid-faq-title">
        <div class="section-heading">
          <span class="section-label">FAQ</span>
          <h2 id="uuid-faq-title">Dúvidas rápidas sobre UUID.</h2>
        </div>

        <div class="faq-list">
          <article>
            <h3>O que é um UUID?</h3>
            <p>
              UUID é um identificador padronizado com 36 caracteres, usado para diferenciar itens
              sem depender de uma sequência centralizada.
            </p>
          </article>

          <article>
            <h3>Este gerador usa backend?</h3>
            <p>
              Não. A ferramenta roda no navegador e usa a API nativa de criptografia quando ela está
              disponível.
            </p>
          </article>

          <article>
            <h3>Os UUIDs ficam salvos?</h3>
            <p>
              Não. A página mostra apenas o UUID atual e não mantém histórico dos valores gerados.
            </p>
          </article>
        </div>
      </section>

    </main>

    <NavBoard />
  </LayoutDefault>
</template>

<style scoped>
.uuid-page {
  min-height: 100vh;
  padding: 3rem 1.25rem 6rem;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 30rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}

.uuid-hero,
.generator-panel,
.content-grid,
.faq-section {
  max-width: 1100px;
  margin: 0 auto;
}

.uuid-hero {
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

.uuid-hero h1 {
  max-width: 880px;
  margin: 1.3rem auto 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.08;
}

.uuid-hero p {
  max-width: 720px;
  margin: 1.3rem auto 0;
  color: #cbd5e1;
  font-size: 1.08rem;
  line-height: 1.8;
}

.generator-panel,
.info-panel,
.faq-section {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.generator-panel {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 2rem;
  padding: 2rem;
}

.generator-copy h2,
.section-heading h2,
.info-panel h2,
.faq-list h3 {
  margin: 0;
  color: #ffffff;
}

.generator-copy p,
.info-panel p,
.faq-list p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.75;
}

.generator-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  min-width: 0;
  padding: 1.3rem;
  border: 1px solid rgba(56, 189, 248, 0.22);
  border-radius: 18px;
  background: rgba(2, 6, 23, 0.48);
}

.uuid-value {
  display: block;
  overflow-wrap: anywhere;
  padding: 1rem;
  border-radius: 14px;
  background: rgba(15, 23, 42, 0.86);
  color: #e0f2fe;
  font-family: 'Courier New', Courier, monospace;
  font-size: clamp(1rem, 2.4vw, 1.45rem);
  font-weight: 800;
  line-height: 1.5;
}

.uuid-status {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  color: #fca5a5;
  font-size: 0.88rem;
  font-weight: 800;
}

.uuid-status span {
  width: 0.62rem;
  height: 0.62rem;
  border-radius: 999px;
  background: currentcolor;
}

.uuid-status.valid {
  color: #86efac;
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

.secondary-action {
  border: 1px solid rgba(148, 163, 184, 0.28);
  background: rgba(15, 23, 42, 0.9);
  color: #e2e8f0;
}

.primary-action:hover,
.secondary-action:hover {
  transform: translateY(-1px);
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
  display: block;
  overflow-wrap: anywhere;
  margin-top: 1rem;
  padding: 0.9rem;
  border-radius: 12px;
  background: rgba(2, 6, 23, 0.52);
  color: #bae6fd;
  font-size: 0.9rem;
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

  .generator-panel,
  .content-grid,
  .faq-list {
    grid-template-columns: 1fr;
  }

  .generator-panel {
    gap: 1.2rem;
  }

  .button-row {
    flex-direction: column;
  }
}
</style>
