<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'

const mainStacks = [
  {
    name: 'PHP',
    level: 'Avançado',
    description:
      'Experiência sólida no desenvolvimento e manutenção de sistemas web, regras de negócio, integrações e aplicações administrativas.',
  },
  {
    name: 'Laravel',
    level: 'Avançado',
    description:
      'Uso em APIs RESTful, sistemas internos, autenticação, migrations, comandos Artisan, services, controllers e organização de back-end.',
  },
  {
    name: 'MySQL',
    level: 'Intermediário/Avançado',
    description:
      'Modelagem relacional, consultas SQL, relacionamentos, migrations e organização de dados para aplicações web.',
  },
  {
    name: 'JavaScript',
    level: 'Intermediário',
    description:
      'Uso em interfaces web, interações no front-end, consumo de APIs e evolução para frameworks modernos.',
  },
  {
    name: 'Vue 3',
    level: 'Em evolução',
    description:
      'Estudos e aplicação em projetos próprios, componentização, rotas, integração com APIs e interfaces modernas.',
  },
  {
    name: 'Java / Spring Boot',
    level: 'Estudos',
    description:
      'Interesse e estudos para ampliação da atuação em back-end, APIs e arquitetura de aplicações corporativas.',
  },
]

const supportStacks = [
  'HTML',
  'CSS',
  'jQuery',
  'Bootstrap',
  'Git',
  'APIs REST',
  'MVC',
  'POO',
  'SOLID',
  'Clean Code',
]
</script>

<template>
  <LayoutDefault>
    <main class="page-shell">
      <section class="page-hero">
        <span class="eyebrow">Stacks</span>

        <h1>Tecnologias utilizadas em projetos e experiências profissionais.</h1>

        <p>
          Principais tecnologias, práticas e ferramentas usadas no desenvolvimento
          de sistemas web, APIs, interfaces, integrações e projetos próprios da
          Rockcode Labs.
        </p>
      </section>

      <section class="stack-grid">
        <article v-for="stack in mainStacks" :key="stack.name" class="stack-card">
          <span class="stack-level">{{ stack.level }}</span>

          <h2>{{ stack.name }}</h2>

          <p>{{ stack.description }}</p>
        </article>
      </section>

      <section class="support-section">
        <div>
          <span class="eyebrow">Complementares</span>

          <h2>Práticas e tecnologias de apoio</h2>

          <p>
            Além das stacks principais, também fazem parte da rotina de desenvolvimento
            ferramentas e conceitos usados para manter projetos organizados, evolutivos
            e mais fáceis de manter.
          </p>
        </div>

        <div class="support-list">
          <span v-for="item in supportStacks" :key="item">
            {{ item }}
          </span>
        </div>
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
.stack-grid,
.support-section {
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

.stack-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.stack-card,
.support-section {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.stack-card {
  padding: 1.6rem;
}

.stack-level {
  display: inline-flex;
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

.stack-card h2,
.support-section h2 {
  margin: 0 0 1rem;
  color: #ffffff;
}

.stack-card p,
.support-section p {
  color: #94a3b8;
  line-height: 1.75;
}

.support-section {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
  padding: 2rem;
}

.support-section .eyebrow {
  margin-bottom: 1rem;
}

.support-list {
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 0.65rem;
}

.support-list span {
  padding: 0.45rem 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 999px;
  color: #cbd5e1;
  font-size: 0.86rem;
  font-weight: 800;
}

@media (max-width: 900px) {
  .stack-grid,
  .support-section {
    grid-template-columns: 1fr;
  }
}
</style>