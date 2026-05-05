<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'

const plannedArticles = [
  {
    title: 'Como publiquei uma aplicação Laravel com Vue em VPS',
    category: 'Deploy',
    description:
      'Anotações práticas sobre publicação, build, servidor, domínio, CloudPanel, Nginx e cuidados em ambiente de produção.',
  },
  {
    title: 'Como estruturar um projeto Laravel com Vue',
    category: 'Arquitetura',
    description:
      'Estudo sobre separação entre back-end, front-end, rotas, APIs, autenticação e organização de arquivos.',
  },
  {
    title: 'Como criar uma página pública sem bloquear pelo login',
    category: 'Laravel',
    description:
      'Registro técnico sobre rotas públicas, páginas protegidas, middleware e organização de acesso em aplicações web.',
  },
  {
    title: 'Como configurei Analytics em projetos próprios',
    category: 'SEO',
    description:
      'Anotações sobre Google Analytics, rastreamento de navegação, métricas básicas e acompanhamento de visitas.',
  },
]
</script>

<template>
  <LayoutDefault>
    <main class="page-shell">
      <section class="page-hero">
        <span class="eyebrow">Artigos</span>

        <h1>Estudos, bastidores técnicos e aprendizados dos projetos.</h1>

        <p>
          Esta área será usada para registrar conteúdos técnicos, decisões de
          desenvolvimento, problemas encontrados, soluções aplicadas e aprendizados
          obtidos durante a construção dos projetos da Rockcode Labs.
        </p>
      </section>

      <section class="intro-card">
        <div>
          <span class="eyebrow">Em construção</span>

          <h2>Conteúdo técnico baseado em experiência prática.</h2>

          <p>
            A ideia não é criar artigos genéricos. O objetivo é publicar conteúdos
            baseados em situações reais: deploy, Laravel, Vue, APIs, SEO, Cloudflare,
            VPS, banco de dados, refatorações e evolução de projetos próprios.
          </p>
        </div>
      </section>

      <section class="articles-grid">
        <article v-for="article in plannedArticles" :key="article.title" class="article-card">
          <span>{{ article.category }}</span>

          <h2>{{ article.title }}</h2>

          <p>{{ article.description }}</p>

          <small>Planejado para publicação</small>
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
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.14), transparent 30rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}

.page-hero,
.intro-card,
.articles-grid {
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
  max-width: 850px;
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

.intro-card,
.article-card {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.intro-card {
  padding: 2rem;
  margin-bottom: 1.5rem;
}

.intro-card .eyebrow {
  margin-bottom: 1rem;
}

.intro-card h2,
.article-card h2 {
  margin: 0 0 1rem;
  color: #ffffff;
}

.intro-card p,
.article-card p {
  color: #94a3b8;
  line-height: 1.75;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.article-card {
  padding: 1.6rem;
}

.article-card span {
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

.article-card small {
  display: block;
  margin-top: 1rem;
  color: #64748b;
  font-weight: 800;
}

@media (max-width: 800px) {
  .articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>