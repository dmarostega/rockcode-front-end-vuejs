<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
import { RouterLink } from 'vue-router'

const projects = [
  {
    id: 14,
    name: 'QrCode Flow',
    description:
      'Gerador gratuito de QR Code para links, com fluxo simples para criar, visualizar e baixar codigos rapidamente.',
    details:
      'Projeto criado para validar uma ferramenta publica e direta para geracao de QR Codes, com foco em uso rapido, paginas informativas e evolucao controlada de monetizacao.',
    url: 'https://qrcodeflow.rockcodelabs.com.br',
    icon: '▦',
    tag: 'QR Code',
    status: 'MVP publicado',
    stack: ['Laravel 13', 'Vue', 'Inertia', 'MySQL', 'Codex'],
  },
  {
    id: 9,
    name: 'MarmitaFlow',
    description:
      'Sistema para controle de cardápios, pedidos, clientes, entregas e pagamentos manuais para pequenos vendedores de alimentos.',
    details:
      'Projeto pensado para organizar vendas de marmitas, doces, bolos, salgados e encomendas locais, reduzindo controles manuais por WhatsApp e planilhas.',
    url: 'https://marmitaflow.rockcodelabs.com.br',
    icon: '🍱',
    tag: 'Pedidos',
    status: 'Publicado - Em Andamento',
    stack: ['Laravel 13', 'Vue', 'TypeScript', 'MySQL', 'Codex'],
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
    status: 'MVP publicado',
    stack: ['Laravel 13', 'Vue', 'MySQL', 'Vibe Coding'],
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
    status: 'MVP publicado',
    stack: ['Laravel 12', 'Vue', 'Inertia', 'MySQL', 'Vibe Coding'],
  },
  {
    id: 13,
    name: 'OS Simples',
    description:
      'Sistema para controle de ordens de serviço, clientes, equipamentos, status de atendimento e acompanhamento de serviços.',
    details:
      'Projeto pensado para assistências técnicas, oficinas pequenas e prestadores de manutenção que precisam organizar serviços, prazos, orçamentos e histórico de atendimento.',
    url: 'https://ossimples.rockcodelabs.com.br',
    icon: '🛠️',
    tag: 'Serviços',
    status: 'MVP publicado',
    stack: ['Laravel 13', 'Vue', 'TypeScript', 'MySQL', 'Codex'],
  },
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
    stack: ['Laravel 8', 'PHP', 'MySQL', 'Blade'],
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
    stack: ['Laravel 13', 'Vue', 'Inertia', 'MySQL', 'Vibe Coding'],
  },
  {
    id: 5,
    name: 'Agenda Autônoma',
    description:
      'Aplicação para controle de agenda, clientes, atendimentos, serviços e cobranças manuais para profissionais autônomos.',
    details:
      'Projeto criado para validar uma solução simples de organização de horários, pagamentos pendentes, mensalidades recorrentes e mensagens copiáveis para WhatsApp.',
    url: 'https://agendaautonoma.rockcodelabs.com.br',
    icon: '🗓️',
    tag: 'Agenda',
    status: 'Em preparação',
    stack: ['Laravel 13', 'Vue', 'TypeScript', 'MySQL', 'Codex'],
  },
  {
    id: 6,
    name: 'Atende Simples',
    description:
      'Helpdesk simples para pequenos negócios controlarem solicitações, chamados, clientes, comentários e atendimentos.',
    details:
      'Projeto criado para validar um fluxo leve de suporte, com abertura de chamados, categorias, prioridades, comentários internos e acompanhamento pelo cliente.',
    url: 'https://atendesimples.rockcodelabs.com.br',
    icon: '🎧',
    tag: 'Suporte',
    status: 'Em preparação',
    stack: ['Laravel 13', 'Vue', 'TypeScript', 'MySQL', 'Codex'],
  },
  {
    id: 7,
    name: 'CheckLaudo',
    description:
      'Aplicação para criação de checklists, vistorias simples, relatórios operacionais e registros técnicos não regulados.',
    details:
      'Projeto voltado para prestadores que precisam criar modelos de checklist, preencher relatórios, adicionar fotos e gerar registros organizados de execução.',
    url: 'https://checklaudo.rockcodelabs.com.br',
    icon: '✅',
    tag: 'Relatórios',
    status: 'Em preparação',
    stack: ['Laravel 13', 'Vue', 'TypeScript', 'MySQL', 'Codex'],
  },
  {
    id: 8,
    name: 'ClienteHub',
    description:
      'Portal do cliente para acompanhamento de projetos, etapas, tarefas, aprovações e entregas.',
    details:
      'Projeto voltado para freelancers, desenvolvedores, designers e pequenas agências que precisam organizar a comunicação com clientes e dar visibilidade ao andamento dos projetos.',
    url: 'https://clientehub.rockcodelabs.com.br',
    icon: '🤝',
    tag: 'Projetos',
    status: 'Em preparação',
    stack: ['Laravel 13', 'Vue', 'TypeScript', 'MySQL', 'Codex'],
  },
  {
    id: 10,
    name: 'Mensalidade Fácil',
    description:
      'Sistema para controle de mensalidades, clientes recorrentes, cobranças, pagamentos manuais e inadimplência.',
    details:
      'Projeto pensado para professores, personal trainers, instrutores, consultores e pequenos negócios que recebem valores recorrentes de clientes.',
    url: 'https://mensalidadefacil.rockcodelabs.com.br',
    icon: '🔁',
    tag: 'Assinaturas',
    status: 'Em preparação',
    stack: ['Laravel 13', 'Vue', 'TypeScript', 'MySQL', 'Codex'],
  },
  {
    id: 11,
    name: 'Meu Caixa Simples',
    description:
      'Aplicação para controle financeiro simples de receitas, despesas, categorias, recorrências e fluxo de caixa.',
    details:
      'Projeto voltado para autônomos, freelancers e pequenos prestadores que precisam organizar entradas, saídas, contas pendentes e visão básica do resultado mensal.',
    url: 'https://meucaixasimples.rockcodelabs.com.br',
    icon: '📒',
    tag: 'Finanças',
    status: 'Em preparação',
    stack: ['Laravel 13', 'Vue', 'TypeScript', 'MySQL', 'Codex'],
  },
  // {
  //   id: 12,
  //   name: 'Minha Loteria Lab',
  //   description:
  //     'SaaS experimental para estudo estatístico, histórico de resultados e geração de jogos para loterias.',
  //   details:
  //     'Projeto criado para testar uma versão mais estruturada e SaaS do estudo de loterias, com planos, painel admin, limites de uso e comunicação responsável.',
  //   url: 'https://minhaloterialab.rockcodelabs.com.br',
  //   icon: '🧪',
  //   tag: 'Loterias',
  //   status: 'Em preparação',
  //   stack: ['Laravel 13', 'Vue', 'TypeScript', 'MySQL', 'Codex'],
  // },

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

      <section class="projects-section" aria-labelledby="projects-title">
        <div class="section-heading">
          <span class="section-label">Catálogo público</span>
          <h2 id="projects-title">Projetos publicados e ideias em preparação.</h2>
          <p>
            A lista reúne produtos, MVPs e estudos com status visível para separar o que já pode
            ser acessado do que ainda está em validação.
          </p>
        </div>

        <div class="projects-grid">
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

            <h3>{{ project.name }}</h3>

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
        </div>
      </section>

      <section class="related-tools-section" aria-labelledby="related-tools-title">
        <div>
          <span class="section-label">Ferramentas gratuitas</span>
          <h2 id="related-tools-title">Utilitários menores ficam no hub de ferramentas.</h2>
          <p>
            Além dos projetos e MVPs, a Rock Code Labs mantém ferramentas online simples para
            conversões, cálculos, comparações e tarefas rápidas para uso diário ou desenvolvimento.
          </p>
        </div>

        <RouterLink to="/ferramentas" class="related-tools-link">
          Ver ferramentas gratuitas →
        </RouterLink>
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
.projects-section,
.related-tools-section {
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

.projects-section {
  margin-top: 0.5rem;
}

.section-heading {
  max-width: 760px;
  margin: 0 auto 1.5rem;
  text-align: center;
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

.section-heading h2 {
  margin: 0;
  color: #ffffff;
  font-size: clamp(1.7rem, 4vw, 2.6rem);
  line-height: 1.15;
}

.section-heading p {
  margin: 1rem 0 0;
  color: #94a3b8;
  line-height: 1.7;
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

.project-card h3 {
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

.related-tools-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-top: 2rem;
  padding: 1.7rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 24px;
  background: rgba(15, 23, 42, 0.78);
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

.related-tools-section h2 {
  margin: 0;
  color: #ffffff;
  font-size: 1.55rem;
}

.related-tools-section p {
  max-width: 700px;
  margin: 0.7rem 0 0;
  color: #94a3b8;
  line-height: 1.75;
}

.related-tools-link {
  flex: 0 0 auto;
  color: #38bdf8;
  font-weight: 900;
  text-decoration: none;
}

.related-tools-link:hover {
  text-decoration: underline;
}

@media (max-width: 820px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }

  .related-tools-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .project-card {
    min-height: auto;
  }
}
</style>
