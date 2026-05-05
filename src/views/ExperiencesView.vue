<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'

const technicalSkills = [
  {
    group: 'Back-end',
    items: ['PHP', 'Laravel', 'APIs RESTful', 'MySQL'],
  },
  {
    group: 'Front-end',
    items: ['Blade', 'JavaScript', 'jQuery', 'AJAX', 'CSS', 'HTML'],
  },
  {
    group: 'Arquitetura e boas práticas',
    items: ['POO', 'MVC', 'SOLID'],
  },
  {
    group: 'Ferramentas e processos',
    items: ['Git', 'GitHub', 'Jira', 'Scrum', 'VS Code', 'Cursor'],
  },
  {
    group: 'Vivência adicional',
    items: ['C#', 'C++', 'Google Calendar API'],
  },
  {
    group: 'Em desenvolvimento técnico',
    items: ['Java', 'Spring Boot', 'Vue.js', 'React', 'Node.js'],
  },
]

const experiences = [
  {
    company: 'SETI Tecnologia',
    location: 'Jaraguá do Sul, SC',
    role: 'Desenvolvedor Full-stack PHP / C++',
    period: 'Nov/2025 – Mar/2026',
    description:
      'Atuação em equipe responsável por sistema web voltado a soluções de cibersegurança e controle de acesso à internet. Manutenção e suporte em sistemas desenvolvidos em PHP, C++ e Vue.js, além de apoio em rotinas técnicas do ambiente.',
    stack: ['PHP', 'C++', 'Vue.js', 'jQuery', 'Git', 'Jira', 'VS Code'],
  },
  {
    company: 'Liber Sistemas e Automação',
    location: 'Jaraguá do Sul, SC',
    role: 'Desenvolvedor Full-stack PHP',
    period: 'Mai/2025 – Out/2025',
    description:
      'Desenvolvimento e manutenção em sistema legado de automação com módulos voltados para chão de fábrica, fluxo de trabalho e qualidade. Implementação de estruturas inspiradas no Laravel para facilitar a criação de módulos e a manutenção dos existentes.',
    stack: ['PHP', 'JavaScript', 'jQuery', 'CSS', 'Cursor'],
  },
  {
    company: 'Multiplier Sales Tech',
    location: 'Jaraguá do Sul, SC',
    role: 'Desenvolvedor Back-end / Full-stack Laravel',
    period: 'Out/2020 – Abr/2025',
    description:
      'Desenvolvimento e manutenção de sistemas em Laravel, com foco em back-end. Correção de bugs, manutenção evolutiva de funcionalidades em Blade e jQuery, criação e evolução de APIs RESTful e participação na integração entre agenda do sistema e Google Calendar.',
    stack: [
      'Laravel',
      'PHP',
      'Blade',
      'jQuery',
      'JavaScript',
      'CSS',
      'APIs RESTful',
      'Git',
      'Jira',
      'Scrum',
      'SOLID',
      'VS Code',
    ],
  },
  {
    company: 'Megaweb IT Solutions',
    location: 'Balneário Camboriú, SC',
    role: 'Desenvolvedor Web Full-stack',
    period: 'Jun/2019 – Set/2020',
    description:
      'Desenvolvimento de sistema de gerenciamento em Laravel/PHP, criação de novas funcionalidades e manutenção em sistemas PHP e C#. Atuação também no front-end com JavaScript, jQuery, CSS e AJAX.',
    stack: ['Laravel', 'PHP', 'C#', 'MySQL', 'JavaScript', 'jQuery', 'AJAX', 'CSS'],
  },
  {
    company: 'Ingresso Nacional',
    location: 'Balneário Camboriú, SC',
    role: 'Desenvolvedor PHP / POS (NAVS)',
    period: 'Mar/2016 – Out/2017',
    description:
      'Desenvolvimento de aplicações para venda de ingressos e tickets em terminais POS, além de manutenção e desenvolvimento do site da empresa em PHP, CSS e JavaScript. Criação de ferramentas para análise de acessos.',
    stack: ['PHP', 'JavaScript', 'CSS', 'Lua', 'NAVS', 'MySQL'],
  },
  {
    company: 'NetMídia Design',
    location: 'Itajaí, SC',
    role: 'Desenvolvedor PHP / MySQL',
    period: 'Fev/2014 – Mar/2016',
    description:
      'Manutenção e desenvolvimento de sites e sistemas administrativos, criação de módulos com PHP e JavaScript e participação no desenvolvimento de framework MVC interno utilizado em diferentes projetos.',
    stack: ['PHP', 'MySQL', 'JavaScript', 'AJAX', 'JSON', 'MVC'],
  },
  {
    company: 'Videosoft',
    location: 'Balneário Camboriú, SC',
    role: 'Suporte Específico e Desenvolvedor PHP',
    period: 'Mar/2012 – Nov/2012',
    description:
      'Atendimento técnico, alterações em banco de dados por ferramenta interna e manutenção de funcionalidades em sistemas PHP da empresa e de clientes.',
    stack: ['PHP', 'MySQL'],
  },
]

const previousExperiences = [
  {
    company: 'Top TI',
    location: 'Itajaí, SC',
    role: 'Programador Java (JSF)',
    period: 'Set/2010 – Nov/2010',
    description: 'Atuação na migração de sistemas legados para aplicações web em Java.',
  },
  {
    company: 'Suprimento.com',
    location: 'Balneário Camboriú, SC',
    role: 'Técnico em Informática',
    period: 'Abr/2010 – Set/2010',
    description: 'Montagem, manutenção e suporte técnico a usuários.',
  },
  {
    company: 'NetSystem Informática',
    location: 'Balneário Camboriú, SC',
    role: 'Técnico em Informática / Auxiliar em Desenvolvimento Delphi',
    period: 'Abr/2009 – Jun/2009',
    description: 'Suporte técnico e apoio em desenvolvimento de funcionalidades.',
  },
  {
    company: 'Office Shop Informática',
    location: 'Balneário Camboriú, SC',
    role: 'Técnico em Informática e Vendas',
    period: 'Out/2004 – Ago/2007',
    description: 'Manutenção, instalação de computadores e atendimento técnico-comercial.',
  },
]

const education = [
  {
    title: 'Bacharelado em Ciência da Computação',
    institution: 'UNIVALI',
    period: 'Conclusão em 2013',
    details: 'TCC: Apoio à Gestão de Projetos Scrum através de Dispositivos Móveis.',
  },
]

const courses = [
  'C# .NET (280h) – Geração TEC / Univali',
  'Cursos Udemy: PHP 7, C#, Programação Orientada a Objetos, entre outros',
]

const improvement = [
  'Estudos em Java e Spring Boot, com foco em desenvolvimento back-end e APIs REST.',
  'Interesse em ampliar atuação em arquiteturas modernas e integração entre sistemas.',
]
</script>

<template>
  <LayoutDefault>
    <main class="page-shell">
      <section class="page-hero">
        <span class="eyebrow">Experiência profissional</span>

        <h1>Desenvolvedor Back-end PHP/Laravel com atuação full-stack.</h1>

        <p>
          Experiência em manutenção e evolução de sistemas legados e modernos, criação e
          sustentação de APIs RESTful, correção de bugs, melhorias evolutivas e integração
          entre sistemas.
        </p>

        <div class="hero-tags">
          <span>PHP</span>
          <span>Laravel</span>
          <span>APIs RESTful</span>
          <span>MySQL</span>
          <span>Java / Spring Boot</span>
        </div>
      </section>

      <section class="summary-grid">
        <article class="summary-card large-card">
          <span class="section-label">Resumo profissional</span>

          <h2>Perfil técnico</h2>

          <p>
            Desenvolvedor web com sólida experiência em PHP e Laravel, com atuação mais
            recente focada em back-end, além de vivência em desenvolvimento full-stack.
          </p>

          <p>
            Ao longo da carreira, atuei com Laravel, PHP, MySQL, Blade, jQuery,
            JavaScript e CSS, participando de ambientes com produtos internos, sistemas
            administrativos, automação e soluções corporativas.
          </p>

          <p>
            Tenho familiaridade com boas práticas de desenvolvimento, como POO, MVC e
            SOLID, e atualmente direciono meus estudos para Java e Spring Boot, com foco
            em desenvolvimento back-end e APIs REST.
          </p>
        </article>

        <article class="summary-card">
          <span class="section-label">Atuação</span>

          <h2>Disponibilidade</h2>

          <p>
            Disponibilidade para atuação remota, híbrida ou presencial em Santa Catarina.
          </p>
        </article>

        <article class="summary-card">
          <span class="section-label">Foco atual</span>

          <h2>Back-end e APIs</h2>

          <p>
            Forte interesse em back-end, integração entre sistemas, APIs RESTful,
            arquitetura de aplicações e evolução técnica com Java/Spring Boot.
          </p>
        </article>
      </section>

      <section class="content-section">
        <div class="section-header">
          <span class="section-label">Competências técnicas</span>
          <h2>Stacks, ferramentas e práticas utilizadas</h2>
        </div>

        <div class="skills-grid">
          <article v-for="skill in technicalSkills" :key="skill.group" class="skill-card">
            <h3>{{ skill.group }}</h3>

            <div class="chip-list">
              <span v-for="item in skill.items" :key="item">
                {{ item }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section class="content-section">
        <div class="section-header">
          <span class="section-label">Experiência profissional</span>
          <h2>Principais experiências</h2>
        </div>

        <div class="timeline">
          <article
            v-for="experience in experiences"
            :key="`${experience.company}-${experience.period}`"
            class="experience-card"
          >
            <div class="experience-header">
              <div>
                <h3>{{ experience.company }}</h3>
                <p>{{ experience.role }}</p>
              </div>

              <div class="experience-meta">
                <span>{{ experience.period }}</span>
                <small>{{ experience.location }}</small>
              </div>
            </div>

            <p class="experience-description">
              {{ experience.description }}
            </p>

            <div class="chip-list">
              <span v-for="item in experience.stack" :key="item">
                {{ item }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <section class="content-section">
        <div class="section-header">
          <span class="section-label">Experiências anteriores</span>
          <h2>Base técnica e início de carreira</h2>
        </div>

        <div class="previous-grid">
          <article
            v-for="experience in previousExperiences"
            :key="`${experience.company}-${experience.period}`"
            class="previous-card"
          >
            <h3>{{ experience.company }}</h3>

            <strong>{{ experience.role }}</strong>

            <span>{{ experience.period }} • {{ experience.location }}</span>

            <p>{{ experience.description }}</p>
          </article>
        </div>
      </section>

      <section class="final-grid">
        <article class="final-card">
          <span class="section-label">Formação acadêmica</span>

          <div v-for="item in education" :key="item.title">
            <h2>{{ item.title }}</h2>
            <p>{{ item.institution }} • {{ item.period }}</p>
            <small>{{ item.details }}</small>
          </div>
        </article>

        <article class="final-card">
          <span class="section-label">Cursos complementares</span>

          <ul>
            <li v-for="course in courses" :key="course">
              {{ course }}
            </li>
          </ul>
        </article>

        <article class="final-card">
          <span class="section-label">Aperfeiçoamento técnico</span>

          <ul>
            <li v-for="item in improvement" :key="item">
              {{ item }}
            </li>
          </ul>
        </article>
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
    radial-gradient(circle at top right, rgba(56, 189, 248, 0.14), transparent 30rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}

.page-hero,
.summary-grid,
.content-section,
.final-grid {
  max-width: 1100px;
  margin: 0 auto;
}

.page-hero {
  padding: 2rem 0 3rem;
  text-align: center;
}

.eyebrow,
.section-label {
  display: inline-flex;
  width: fit-content;
  padding: 0.42rem 0.8rem;
  border: 1px solid rgba(56, 189, 248, 0.35);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.75);
  color: #7dd3fc;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

.page-hero h1 {
  max-width: 900px;
  margin: 1.3rem auto 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.page-hero p {
  max-width: 780px;
  margin: 1.3rem auto 0;
  color: #cbd5e1;
  font-size: 1.08rem;
  line-height: 1.8;
}

.hero-tags,
.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.hero-tags {
  justify-content: center;
  margin-top: 1.5rem;
}

.hero-tags span,
.chip-list span {
  padding: 0.38rem 0.72rem;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.55);
  color: #cbd5e1;
  font-size: 0.8rem;
  font-weight: 800;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 1rem;
  margin-bottom: 3rem;
}

.summary-card,
.skill-card,
.experience-card,
.previous-card,
.final-card {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.summary-card {
  padding: 1.7rem;
}

.large-card {
  grid-row: span 2;
}

.summary-card h2,
.section-header h2,
.final-card h2 {
  margin: 1rem 0;
  color: #ffffff;
}

.summary-card p,
.experience-description,
.previous-card p,
.final-card p,
.final-card li,
.final-card small {
  color: #94a3b8;
  line-height: 1.75;
}

.content-section {
  margin-bottom: 3rem;
}

.section-header {
  margin-bottom: 1.4rem;
}

.section-header h2 {
  font-size: clamp(1.5rem, 4vw, 2.4rem);
  line-height: 1.15;
  letter-spacing: -0.035em;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.skill-card {
  padding: 1.5rem;
}

.skill-card h3 {
  margin: 0 0 1rem;
  color: #ffffff;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.experience-card {
  padding: 1.7rem;
}

.experience-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 1rem;
}

.experience-header h3 {
  margin: 0 0 0.35rem;
  color: #ffffff;
  font-size: 1.28rem;
}

.experience-header p {
  margin: 0;
  color: #94a3b8;
}

.experience-meta {
  min-width: 190px;
  text-align: right;
}

.experience-meta span,
.experience-meta small {
  display: block;
}

.experience-meta span {
  color: #7dd3fc;
  font-weight: 900;
}

.experience-meta small {
  margin-top: 0.35rem;
  color: #94a3b8;
}

.experience-description {
  margin-bottom: 1rem;
}

.previous-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.previous-card {
  padding: 1.5rem;
}

.previous-card h3 {
  margin: 0 0 0.5rem;
  color: #ffffff;
}

.previous-card strong,
.previous-card span {
  display: block;
}

.previous-card strong {
  color: #cbd5e1;
}

.previous-card span {
  margin-top: 0.5rem;
  color: #7dd3fc;
  font-size: 0.85rem;
  font-weight: 900;
}

.final-grid {
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 1rem;
}

.final-card {
  padding: 1.6rem;
}

.final-card ul {
  margin: 1rem 0 0;
  padding-left: 1.2rem;
}

.final-card small {
  display: block;
}

@media (max-width: 950px) {
  .summary-grid,
  .skills-grid,
  .previous-grid,
  .final-grid {
    grid-template-columns: 1fr;
  }

  .large-card {
    grid-row: auto;
  }
}

@media (max-width: 720px) {
  .experience-header {
    flex-direction: column;
  }

  .experience-meta {
    min-width: auto;
    text-align: left;
  }
}
</style>