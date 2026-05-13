<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'

const projects = [
  {
    id: 1,
    name: 'Meu Financeiro',
    description:
      'Sistema para controle financeiro pessoal, com organização de receitas, despesas, contas, cartões e visão geral das movimentações.',
    details:
      'Projeto desenvolvido para estudar e validar recursos comuns de um sistema financeiro, como autenticação, CRUDs, organização de dados e experiência de uso simples.',
    url: 'https://meufinanceiro.rockcodelabs.com.br',
    icon: '💰',
    tag: 'Finanças',
    status: 'MVP publicado',
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade'],
  },
  {
    id: 2,
    name: 'Minha Loteria',
    description:
      'Plataforma experimental para estudos de loterias, análises históricas, rankings estatísticos, geração de jogos e simulações de desempenho.',
    details:
      'Projeto criado para explorar análise de dados, regras de negócio, geração de combinações, filtros estatísticos e visualização de informações.',
    url: 'https://minhaloteria.rockcodelabs.com.br',
    icon: '🍀',
    tag: 'Loterias',
    status: 'Em evolução',
    stack: ['Laravel', 'Vue', 'Inertia', 'MySQL', 'Vide Coding'],
  },
  {
    id: 3,
    name: 'Validade em Dia',
    description:
      'Aplicação para acompanhar validades de produtos, organizar itens por status e evitar perdas com vencimentos esquecidos.',
    details:
      'Projeto criado para validar uma solução simples de controle de validade, com cadastro de itens, alertas visuais e uma rotina mais prática para manter tudo em dia.',
    url: 'https://validadeemdia.rockcodelabs.com.br',
    icon: '📅',
    tag: 'Produtividade',
    status: 'MVP publicado',
    stack: ['Laravel', 'Vue', 'Inertia', 'MySQL', 'Vide Coding'],
  },
  {
    id: 4,
    name: 'Proposta Fácil',
    description:
      'Aplicação para criar, organizar e acompanhar propostas comerciais de forma simples, com foco em agilidade no envio e clareza para o cliente.',
    details:
      'Projeto criado para validar um fluxo prático de geração de propostas, organização de clientes, controle de status e padronização de informações comerciais.',
    url: 'https://propostafacil.rockcodelabs.com.br',
    icon: '📄',
    tag: 'Comercial',
    status: 'Em evolução',
    stack: ['Laravel', 'Vue', 'MySQL', 'Vide Coding'],
  },
]
</script>

<template>
  <LayoutDefault>
    <main class="page-shell">
      <section class="page-hero">
        <span class="eyebrow">Projetos</span>

        <h1>Aplicações próprias, estudos técnicos e MVPs em evolução.</h1>

        <p>
          Projetos criados dentro da Rock Code Labs para validar ideias, estudar tecnologias,
          melhorar arquitetura e transformar experimentos em soluções digitais utilizáveis.
        </p>
      </section>

      <section class="projects-grid">
        <a
          v-for="project in projects"
          :key="project.id"
          :href="project.url"
          target="_blank"
          rel="noopener noreferrer"
          class="project-card"
        >
          <div class="project-top">
            <div class="project-icon">{{ project.icon }}</div>

            <div>
              <span class="project-tag">{{ project.tag }}</span>
              <span class="project-status">{{ project.status }}</span>
            </div>
          </div>

          <h2>{{ project.name }}</h2>

          <p class="project-description">
            {{ project.description }}
          </p>

          <p class="project-details">
            {{ project.details }}
          </p>

          <div class="stack-list">
            <span v-for="item in project.stack" :key="item">
              {{ item }}
            </span>
          </div>

          <strong>Acessar projeto →</strong>
        </a>
      </section>
    </main>

    <NavBoard />
  </LayoutDefault>
</template>

<style scoped>
.page-shell {
  min-height: 100vh;
  padding: 3rem 1.25rem 6rem;
  background:
    radial-gradient(circle at top, rgba(56, 189, 248, 0.14), transparent 30rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}

.page-hero,
.projects-grid {
  max-width: 1100px;
  margin: 0 auto;
}

.page-hero {
  padding: 2rem 0 3rem;
  text-align: center;
}

.eyebrow {
  display: inline-flex;
  width: fit-content;
  padding: 0.42rem 0.8rem;
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.75);
  color: #7dd3fc;
  font-size: 0.78rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.page-hero h1 {
  max-width: 860px;
  margin: 1.3rem auto 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.page-hero p {
  max-width: 760px;
  margin: 1.3rem auto 0;
  color: #cbd5e1;
  font-size: 1.08rem;
  line-height: 1.8;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.2rem;
}

.project-card {
  display: flex;
  min-height: 430px;
  flex-direction: column;
  gap: 1rem;
  padding: 1.7rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.78);
  color: inherit;
  text-decoration: none;
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.project-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.55);
  background: rgba(30, 41, 59, 0.88);
}

.project-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.project-icon {
  font-size: 2.4rem;
}

.project-tag,
.project-status {
  display: block;
  width: fit-content;
  margin-left: auto;
  padding: 0.32rem 0.7rem;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.project-tag {
  background: rgba(56, 189, 248, 0.12);
  color: #7dd3fc;
}

.project-status {
  margin-top: 0.45rem;
  background: rgba(34, 197, 94, 0.12);
  color: #86efac;
}

.project-card h2 {
  margin: 0;
  color: #ffffff;
  font-size: 1.55rem;
}

.project-description,
.project-details {
  margin: 0;
  color: #94a3b8;
  line-height: 1.75;
}

.project-description {
  color: #cbd5e1;
}

.stack-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.stack-list span {
  padding: 0.32rem 0.65rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 999px;
  color: #cbd5e1;
  font-size: 0.78rem;
  font-weight: 700;
}

.project-card strong {
  color: #38bdf8;
}

@media (max-width: 820px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .project-card {
    min-height: auto;
  }
}
</style>
