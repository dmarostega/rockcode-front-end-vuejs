<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'

const hubTools = [
  {
    name: 'Gerador de UUID',
    status: 'Previsto',
    description:
      'Ferramenta gratuita para gerar identificadores UUID de forma rápida, simples e sem cadastro.',
    details:
      'O primeiro espaço do hub fica preparado para receber utilitários pequenos, diretos e independentes do backend institucional.',
  },
]

const relatedProjects = [
  {
    name: 'QRCodeFlow',
    status: 'MVP publicado',
    description:
      'Gerador gratuito de QR Code para links, com fluxo simples para criar, visualizar e baixar códigos rapidamente.',
    url: 'https://qrcodeflow.rockcodelabs.com.br',
  },
]
</script>

<template>
  <LayoutDefault>
    <main class="tools-page">
      <section class="tools-hero">
        <span class="eyebrow">Ferramentas gratuitas</span>

        <h1>Utilitários simples da Rock Code Labs para resolver tarefas rápidas.</h1>

        <p>
          Um hub público para reunir pequenas ferramentas gratuitas, focadas em uso direto, páginas
          leves e evolução gradual dentro do site institucional.
        </p>
      </section>

      <section class="hub-intro" aria-label="Proposta do hub">
        <div>
          <span class="section-label">Hub inicial</span>
          <h2>Ferramentas pequenas, acessíveis e sem fricção.</h2>
        </div>

        <p>
          A estrutura começa enxuta para validar demanda e organizar futuras entregas. Cada
          ferramenta deve ter objetivo claro, interface responsiva e conteúdo suficiente para ser
          encontrada por quem precisa resolver uma tarefa específica.
        </p>
      </section>

      <section class="tools-grid" aria-labelledby="tools-title">
        <div class="section-heading">
          <span class="section-label">Primeira ferramenta</span>
          <h2 id="tools-title">Espaço preparado para o primeiro utilitário do hub.</h2>
        </div>

        <article v-for="tool in hubTools" :key="tool.name" class="tool-card">
          <div class="card-top">
            <span class="tool-icon" aria-hidden="true">ID</span>
            <span class="status-badge">{{ tool.status }}</span>
          </div>

          <h3>{{ tool.name }}</h3>

          <p>{{ tool.description }}</p>
          <p class="card-details">{{ tool.details }}</p>
        </article>
      </section>

      <section class="related-section" aria-labelledby="related-title">
        <div class="section-heading">
          <span class="section-label">Projeto relacionado</span>
          <h2 id="related-title">QRCodeFlow continua como produto separado.</h2>
        </div>

        <a
          v-for="project in relatedProjects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="related-card"
        >
          <div>
            <span class="status-badge">{{ project.status }}</span>
            <h3>{{ project.name }}</h3>
            <p>{{ project.description }}</p>
          </div>

          <strong>Acessar QRCodeFlow -></strong>
        </a>
      </section>

      <section class="future-ad-space" aria-label="Espaço reservado para anúncio futuro">
        <span>Espaço institucional reservado</span>
        <p>
          Área visual desativada para avaliação futura de monetização. Sem script de anúncio, sem
          chamada para clique e afastada dos links principais.
        </p>
      </section>
    </main>

    <NavBoard />
  </LayoutDefault>
</template>

<style scoped>
.tools-page {
  min-height: 100vh;
  padding: 3rem 1.25rem 6rem;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 30rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}

.tools-hero,
.hub-intro,
.tools-grid,
.related-section,
.future-ad-space {
  max-width: 1100px;
  margin: 0 auto;
}

.tools-hero {
  padding: 2rem 0 3rem;
  text-align: center;
}

.eyebrow,
.section-label,
.status-badge {
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

.tools-hero h1 {
  max-width: 880px;
  margin: 1.3rem auto 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.08;
}

.tools-hero p {
  max-width: 760px;
  margin: 1.3rem auto 0;
  color: #cbd5e1;
  font-size: 1.08rem;
  line-height: 1.8;
}

.hub-intro,
.tool-card,
.related-card,
.future-ad-space {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.hub-intro {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 2rem;
  padding: 2rem;
}

.section-label {
  margin-bottom: 1rem;
  padding: 0.32rem 0.7rem;
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
  font-size: 0.72rem;
}

.hub-intro h2,
.section-heading h2,
.tool-card h3,
.related-card h3 {
  margin: 0;
  color: #ffffff;
}

.hub-intro p,
.tool-card p,
.related-card p,
.future-ad-space p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.75;
}

.tools-grid,
.related-section {
  margin-top: 2rem;
}

.section-heading {
  margin-bottom: 1rem;
}

.tool-card,
.related-card {
  padding: 1.7rem;
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.4rem;
}

.tool-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 16px;
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
  font-size: 0.9rem;
  font-weight: 900;
}

.status-badge {
  padding: 0.32rem 0.7rem;
  background: rgba(34, 197, 94, 0.12);
  color: #86efac;
  font-size: 0.72rem;
}

.tool-card h3,
.related-card h3 {
  margin-bottom: 0.8rem;
  font-size: 1.55rem;
}

.card-details {
  margin-top: 0.85rem;
  color: #cbd5e1;
}

.related-card {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2rem;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.related-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.55);
  background: rgba(30, 41, 59, 0.88);
}

.related-card strong {
  flex: 0 0 auto;
  color: #38bdf8;
}

.future-ad-space {
  margin-top: 3rem;
  padding: 1.4rem;
  text-align: center;
}

.future-ad-space span {
  display: block;
  color: #cbd5e1;
  font-size: 0.82rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.future-ad-space p {
  max-width: 720px;
  margin: 0.6rem auto 0;
  font-size: 0.9rem;
}

@media (max-width: 820px) {
  .hub-intro,
  .related-card {
    grid-template-columns: 1fr;
  }

  .hub-intro {
    gap: 1rem;
  }

  .related-card {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>
