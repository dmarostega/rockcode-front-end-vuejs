<script setup>
import NavBoard from '../components/defaults/NavBoard.vue'

defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
})

const featuredProjects = [
  // {
  //   name: 'Meu Financeiro',
  //   tag: 'Finanças',
  //   description:
  //     'Sistema para controle financeiro pessoal, organização de receitas, despesas, contas e visão geral das movimentações.',
  //   url: 'https://meufinanceiro.rockcodelabs.com.br',
  // },
  {
    name: 'Proposta Fácil',
    description:
      'Aplicação para criar, organizar e acompanhar propostas comerciais de forma simples, com foco em agilidade no envio e clareza para o cliente.',
    details:
      'Projeto criado para validar um fluxo prático de geração de propostas, organização de clientes, controle de status e padronização de informações comerciais.',
    url: 'https://propostafacil.rockcodelabs.com.br',
    icon: '📄',
    tag: 'Comercial',
  },
  {
    name: 'Minha Loteria',
    tag: 'Loterias',
    description:
      'Plataforma experimental para estudos de loterias, análises históricas, rankings estatísticos, geração de jogos e simulações.',
    url: 'https://minhaloteria.rockcodelabs.com.br',
  },
]
</script>

<template>
  <main class="home-page">
    <section class="hero-section">
      <div class="hero-logo">
        <img
          src="../assets/images/stone-home.png"
          alt="Ícone da Rock Code Labs"
          class="stone-logo"
          width="340"
          height="353"
          decoding="async"
          loading="eager"
          fetchpriority="high"
        />

        <img
          src="../assets/images/solo-name-home.png"
          alt="Rock Code Labs"
          class="name-logo"
          width="520"
          height="127"
          decoding="async"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      <p class="eyebrow">Laboratório pessoal • Projetos web • Portfólio técnico</p>

      <h1>Desenvolvimento web aplicado em projetos reais.</h1>

      <p class="hero-description">
        A Rock Code Labs é o laboratório pessoal de Diogo Marostega, criado para centralizar
        projetos próprios, estudos técnicos e aplicações reais desenvolvidas com Laravel, Vue, PHP,
        JavaScript, APIs REST e bancos de dados relacionais.
      </p>

      <div class="hero-actions">
        <RouterLink to="/apps" class="button button-primary"> Ver projetos </RouterLink>

        <RouterLink to="/about" class="button button-secondary">
          Sobre a Rock Code Labs
        </RouterLink>

        <RouterLink to="/ferramentas" class="button button-secondary">
          Usar ferramentas gratuitas
        </RouterLink>
      </div>
    </section>

    <section class="content-section">
      <div class="section-header">
        <span class="section-kicker">Propósito</span>
        <h2>Um espaço para criar, testar e evoluir soluções digitais.</h2>
      </div>

      <div class="info-grid">
        <article class="info-card">
          <span class="card-number">01</span>
          <h3>Projetos próprios</h3>
          <p>
            Aplicações criadas para validar ideias, estudar arquitetura, melhorar experiência de uso
            e transformar experimentos em produtos utilizáveis.
          </p>
        </article>

        <article class="info-card">
          <span class="card-number">02</span>
          <h3>Experiência técnica</h3>
          <p>
            Desenvolvimento web com foco em Laravel, PHP, APIs RESTful, bancos de dados relacionais,
            JavaScript e evolução para interfaces modernas com Vue.
          </p>
        </article>

        <article class="info-card">
          <span class="card-number">03</span>
          <h3>Aprendizado contínuo</h3>
          <p>
            Registro prático de estudos, melhorias, ideias de micro SaaS, integrações, automações e
            decisões técnicas tomadas durante o desenvolvimento dos projetos.
          </p>
        </article>
      </div>
    </section>

    <section class="content-section">
      <div class="section-header">
        <span class="section-kicker">Aplicações</span>
        <h2>Projetos em destaque</h2>
        <p>Alguns projetos publicados ou em fase de evolução dentro da Rock Code Labs.</p>
      </div>

      <div class="projects-grid">
        <a
          v-for="project in featuredProjects"
          :key="project.name"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card"
        >
          <span class="project-tag">{{ project.tag }}</span>
          <h3>{{ project.name }}</h3>
          <p>{{ project.description }}</p>
          <strong>Acessar projeto →</strong>
        </a>
      </div>

      <div class="section-action">
        <RouterLink to="/apps" class="text-link"> Ver todos os aplicativos </RouterLink>
      </div>
    </section>

    <section class="resume-callout">
      <div>
        <span class="section-kicker">Portfólio profissional</span>
        <h2>
          Além dos projetos, este espaço também apresenta minha trajetória como desenvolvedor.
        </h2>
        <p>
          A ideia é unir laboratório pessoal, currículo técnico e vitrine de projetos em um único
          lugar, mostrando experiência prática e evolução profissional.
        </p>
      </div>

      <RouterLink to="/experiences" class="button button-primary">
        Ver experiência profissional
      </RouterLink>
    </section>

    <NavBoard />
  </main>
</template>

<style scoped>
.home-page {
  min-height: 100vh;
  padding: 2rem 1.25rem 6rem;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.16), transparent 32rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 48%, #111827 100%);
  color: #f8fafc;
}

.hero-section {
  max-width: 920px;
  min-height: 760px;
  margin: 0 auto;
  padding: 2rem 0 4rem;
  text-align: center;
}

.hero-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  min-height: 246px;
  margin-bottom: 2rem;
}

.stone-logo {
  display: block;
  width: min(170px, 42vw);
  height: auto;
  aspect-ratio: 340 / 353;
}

.name-logo {
  display: block;
  width: min(260px, 68vw);
  height: auto;
  aspect-ratio: 520 / 127;
}

.eyebrow,
.section-kicker {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-height: 36px;
  margin: 0 auto;
  padding: 0.45rem 0.85rem;
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.75);
  color: #7dd3fc;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-section h1 {
  max-width: 780px;
  margin: 1.4rem auto 0;
  color: #ffffff;
  font-size: clamp(2.2rem, 6vw, 4.4rem);
  line-height: 1.05;
  letter-spacing: -0.055em;
}

.hero-description {
  max-width: 760px;
  margin: 1.5rem auto 0;
  color: #cbd5e1;
  font-size: 1.08rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 46px;
  padding: 0.85rem 1.25rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 800;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
}

.button-primary {
  background: #38bdf8;
  color: #020617;
}

.button-primary:hover {
  background: #7dd3fc;
  color: #020617;
}

.button-secondary {
  border: 1px solid rgba(148, 163, 184, 0.45);
  color: #e2e8f0;
  background: rgba(15, 23, 42, 0.65);
}

.button-secondary:hover {
  border-color: #38bdf8;
  color: #ffffff;
}

.content-section,
.resume-callout {
  max-width: 1100px;
  margin: 0 auto 4rem;
}

.content-section:first-of-type {
  min-height: 360px;
}

.section-header {
  max-width: 760px;
  margin: 0 auto 1.5rem;
  text-align: center;
}

.section-header .section-kicker {
  margin: 0 auto 1rem;
}

.section-header h2,
.resume-callout h2 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  line-height: 1.15;
  letter-spacing: -0.035em;
}

.section-header p,
.resume-callout p {
  margin-top: 1rem;
  color: #94a3b8;
  line-height: 1.7;
}

.info-grid,
.projects-grid {
  display: grid;
  gap: 1rem;
}

.info-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.projects-grid {
  grid-template-columns: repeat(auto-fit, minmax(260px, 360px));
  justify-content: center;
}

.info-card,
.project-card,
.resume-callout {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.72);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
  backdrop-filter: blur(10px);
}

.info-card {
  padding: 1.5rem;
  text-align: center;
}

.card-number {
  display: block;
  margin-bottom: 1rem;
  color: #38bdf8;
  font-size: 0.85rem;
  font-weight: 900;
}

.info-card h3,
.project-card h3 {
  margin: 0;
  color: #f8fafc;
  font-size: 1.18rem;
}

.info-card p,
.project-card p {
  color: #94a3b8;
  line-height: 1.7;
}

.project-card {
  display: flex;
  flex-direction: column;
  min-height: 250px;
  padding: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.55);
  background: rgba(30, 41, 59, 0.85);
}

.project-tag {
  width: fit-content;
  margin: 0 auto 1.1rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
  font-size: 0.74rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-card strong {
  margin-top: auto;
  color: #38bdf8;
}

.section-action {
  margin-top: 1.5rem;
  text-align: center;
}

.text-link {
  color: #7dd3fc;
  font-weight: 800;
  text-decoration: none;
}

.text-link:hover {
  text-decoration: underline;
}

.resume-callout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 2rem;
  text-align: center;
}

.resume-callout .section-kicker {
  margin: 0 auto 1rem;
}

.resume-callout p {
  max-width: 720px;
  margin-right: auto;
  margin-left: auto;
}

.resume-callout .button {
  width: fit-content;
  min-width: 260px;
  border-radius: 999px;
  white-space: nowrap;
}

@media (max-width: 900px) {
  .info-grid,
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .resume-callout {
    align-items: center;
  }
}

@media (max-width: 640px) {
  .home-page {
    padding: 1.25rem 1rem 5.5rem;
  }

  .hero-section {
    min-height: auto;
    padding-top: 1rem;
  }

  .hero-logo {
    min-height: 195px;
  }

  .stone-logo {
    width: min(130px, 42vw);
  }

  .name-logo {
    width: min(220px, 68vw);
  }

  .hero-description {
    font-size: 1rem;
  }

  .button {
    width: 100%;
  }

  .hero-actions {
    width: 100%;
  }
}
</style>
