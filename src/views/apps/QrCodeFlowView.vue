<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
import { RouterLink } from 'vue-router'

const features = [
  'Geração de QR Code para links.',
  'Pré-visualização antes de baixar.',
  'Fluxo direto para criar, revisar e usar o código rapidamente.',
  'Página pública separada para validar demanda e evolução do produto.',
]

const audience = [
  'Criadores, freelancers e pequenos negócios que precisam compartilhar links em materiais digitais ou impressos.',
  'Usuários que querem gerar um QR Code sem instalar aplicativo e sem passar por um fluxo complexo.',
  'Projetos da Rock Code Labs que precisam de uma ferramenta pública simples para campanhas, páginas e testes.',
]

const stack = ['Laravel 13', 'Vue', 'Inertia', 'MySQL', 'Codex']

const relatedLinks = [
  {
    label: 'Hub de ferramentas',
    description: 'Veja outras ferramentas gratuitas da Rock Code Labs para tarefas rápidas.',
    to: '/ferramentas',
  },
  {
    label: 'URL Encode/Decode',
    description: 'Prepare ou confira links e parâmetros antes de gerar um QR Code.',
    to: '/ferramentas/url-encode-decode',
  },
]
</script>

<template>
  <LayoutDefault>
    <main class="app-page">
      <section class="hero-section">
        <RouterLink to="/apps" class="back-link">← Voltar para apps</RouterLink>

        <span class="eyebrow">App piloto</span>
        <h1>QRCodeFlow</h1>
        <p>
          Gerador público de QR Code para links, criado para transformar uma URL em código
          escaneável com um fluxo simples, direto e sem etapas desnecessárias.
        </p>

        <div class="hero-actions">
          <a
            href="https://qrcodeflow.rockcodelabs.com.br"
            target="_blank"
            rel="noopener noreferrer"
            class="button button-primary"
          >
            Acessar QRCodeFlow
          </a>

          <RouterLink to="/ferramentas" class="button button-secondary">
            Ver ferramentas relacionadas
          </RouterLink>
        </div>
      </section>

      <section class="content-grid" aria-label="Resumo do QRCodeFlow">
        <article class="info-panel">
          <span class="section-label">Problema</span>
          <h2>Links precisam circular fora da tela.</h2>
          <p>
            Em materiais impressos, apresentações, balcões e redes sociais, digitar uma URL longa
            cria atrito. O QRCodeFlow reduz esse caminho ao transformar links em QR Codes prontos
            para compartilhar.
          </p>
        </article>

        <article class="info-panel">
          <span class="section-label">Status</span>
          <h2>MVP publicado em subdomínio próprio.</h2>
          <p>
            O produto continua separado em <code>qrcodeflow.rockcodelabs.com.br</code>. Esta página
            explica o projeto dentro do domínio principal sem migrar a aplicação.
          </p>
        </article>
      </section>

      <section class="list-section" aria-labelledby="audience-title">
        <div class="section-heading">
          <span class="section-label">Público</span>
          <h2 id="audience-title">Para quem precisa gerar QR Codes sem complicar o processo.</h2>
        </div>

        <ul>
          <li v-for="item in audience" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section class="list-section" aria-labelledby="features-title">
        <div class="section-heading">
          <span class="section-label">Funcionalidades</span>
          <h2 id="features-title">O escopo atual é enxuto e focado no uso rápido.</h2>
        </div>

        <ul>
          <li v-for="feature in features" :key="feature">{{ feature }}</li>
        </ul>
      </section>

      <section class="stack-section" aria-labelledby="stack-title">
        <div>
          <span class="section-label">Stack</span>
          <h2 id="stack-title">Projeto Laravel/Vue em evolução controlada.</h2>
          <p>
            A stack reflete o padrão de projetos recentes da Rock Code Labs, com foco em entrega
            incremental, páginas públicas úteis e validação real de uso.
          </p>
        </div>

        <div class="stack-list">
          <span v-for="item in stack" :key="item">{{ item }}</span>
        </div>
      </section>

      <section class="related-section" aria-labelledby="related-title">
        <div class="section-heading">
          <span class="section-label">Links relacionados</span>
          <h2 id="related-title">Continue por caminhos úteis e existentes.</h2>
        </div>

        <div class="related-grid">
          <RouterLink
            v-for="link in relatedLinks"
            :key="link.to"
            :to="link.to"
            class="related-card"
          >
            <strong>{{ link.label }}</strong>
            <p>{{ link.description }}</p>
          </RouterLink>
        </div>
      </section>
    </main>

    <NavBoard />
  </LayoutDefault>
</template>

<style scoped>
.app-page {
  min-height: 100vh;
  padding: 3rem 1.25rem 6rem;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 30rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}

.hero-section,
.content-grid,
.list-section,
.stack-section,
.related-section {
  max-width: 1100px;
  margin: 0 auto;
}

.hero-section {
  padding: 2rem 0 3rem;
  text-align: center;
}

.back-link {
  display: inline-flex;
  margin-bottom: 1.4rem;
  color: #7dd3fc;
  font-weight: 900;
  text-decoration: none;
}

.back-link:hover,
.related-card:hover {
  text-decoration: underline;
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

.hero-section h1 {
  max-width: 880px;
  margin: 1.3rem auto 0;
  color: #ffffff;
  font-size: clamp(2.4rem, 6vw, 4.8rem);
  line-height: 1.05;
}

.hero-section p {
  max-width: 760px;
  margin: 1.3rem auto 0;
  color: #cbd5e1;
  font-size: 1.08rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  font-weight: 900;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  background: #38bdf8;
  color: #020617;
}

.button-secondary {
  border: 1px solid rgba(148, 163, 184, 0.45);
  background: rgba(15, 23, 42, 0.65);
  color: #e2e8f0;
}

.content-grid,
.related-grid {
  display: grid;
  gap: 1rem;
}

.content-grid,
.related-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.info-panel,
.list-section,
.stack-section,
.related-card {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.info-panel,
.list-section,
.stack-section,
.related-card {
  padding: 1.7rem;
}

.list-section,
.stack-section,
.related-section {
  margin-top: 2rem;
}

.section-label {
  margin-bottom: 1rem;
  padding: 0.32rem 0.7rem;
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
  font-size: 0.72rem;
}

.info-panel h2,
.section-heading h2,
.stack-section h2 {
  margin: 0;
  color: #ffffff;
}

.info-panel p,
.stack-section p,
.related-card p,
.list-section li {
  color: #94a3b8;
  line-height: 1.75;
}

.info-panel p,
.stack-section p,
.related-card p {
  margin: 0.7rem 0 0;
}

.info-panel code {
  color: #bae6fd;
  font-family: 'Courier New', Courier, monospace;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 1rem;
}

.list-section ul {
  display: grid;
  gap: 0.85rem;
  margin: 1rem 0 0;
  padding-left: 1.2rem;
}

.stack-section {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 1.5rem;
  align-items: center;
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.stack-list span {
  padding: 0.42rem 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 999px;
  color: #cbd5e1;
  font-size: 0.82rem;
  font-weight: 800;
}

.related-card {
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.related-card:hover {
  transform: translateY(-3px);
  border-color: rgba(56, 189, 248, 0.55);
  background: rgba(30, 41, 59, 0.88);
}

.related-card strong {
  color: #bae6fd;
  font-size: 1.12rem;
}

@media (max-width: 820px) {
  .content-grid,
  .related-grid,
  .stack-section {
    grid-template-columns: 1fr;
  }

  .button {
    width: 100%;
  }
}
</style>
