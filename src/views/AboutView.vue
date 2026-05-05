<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
</script>

<template>
  <LayoutDefault>
    <main class="page-shell">
      <section class="page-hero">
        <span class="eyebrow">Sobre</span>

        <h1>Rockcode Labs: laboratório pessoal de desenvolvimento web.</h1>

        <p>
          A Rockcode Labs é um espaço criado por Diogo Marostega para centralizar
          projetos próprios, estudos técnicos e aplicações reais desenvolvidas com foco
          em tecnologia, aprendizado contínuo e evolução profissional.
        </p>
      </section>

      <section class="content-grid">
        <article class="content-card large-card">
          <h2>O que é a Rockcode Labs?</h2>

          <p>
            Este site funciona como um laboratório pessoal de desenvolvimento web.
            Aqui são publicados experimentos, aplicações em fase de validação, estudos
            práticos e projetos autorais voltados à área de tecnologia da informação.
          </p>

          <p>
            A proposta é transformar ideias em soluções reais, testando arquitetura,
            usabilidade, integração com APIs, organização de código, SEO, deploy,
            automações e tecnologias modernas usadas no desenvolvimento web.
          </p>
        </article>

        <article class="content-card">
          <h2>Propósito</h2>

          <p>
            Criar um ambiente público para registrar evolução técnica, validar projetos,
            compartilhar aprendizados e apresentar soluções desenvolvidas na prática.
          </p>
        </article>

        <article class="content-card">
          <h2>Abordagem</h2>

          <p>
            Desenvolvimento orientado a aplicações reais, com atenção a boas práticas,
            organização, manutenibilidade, experiência de uso e melhoria contínua.
          </p>
        </article>
      </section>

      <section class="developer-section">
        <div>
          <span class="eyebrow">Desenvolvedor</span>

          <h2>Diogo Marostega</h2>

          <p>
            Desenvolvedor web com perfil full-stack e atuação mais recente focada em
            back-end, especialmente com Laravel, PHP, APIs RESTful e bancos de dados
            relacionais.
          </p>

          <p>
            A Rockcode Labs também funciona como portfólio técnico, reunindo projetos,
            experiências, estudos e tecnologias utilizadas em aplicações próprias.
          </p>
        </div>

        <RouterLink to="/experiences" class="button">
          Ver experiência profissional
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
    radial-gradient(circle at top left, rgba(56, 189, 248, 0.14), transparent 28rem),
    linear-gradient(180deg, #05090d 0%, #0f172a 55%, #111827 100%);
  color: #f8fafc;
}

.page-hero,
.content-grid,
.developer-section {
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
  max-width: 820px;
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

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.content-card,
.developer-section {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.72);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.content-card {
  padding: 1.6rem;
}

.large-card {
  grid-row: span 2;
}

.content-card h2,
.developer-section h2 {
  margin: 0 0 1rem;
  color: #ffffff;
  font-size: 1.45rem;
}

.content-card p,
.developer-section p {
  color: #94a3b8;
  line-height: 1.8;
}

.developer-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-top: 3rem;
  padding: 2rem;
}

.developer-section .eyebrow {
  margin-bottom: 1rem;
}

.button {
  display: inline-flex;
  min-width: 230px;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.2rem;
  border-radius: 12px;
  background: #38bdf8;
  color: #020617;
  font-weight: 900;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  background: #7dd3fc;
}

@media (max-width: 800px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .developer-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .button {
    width: 100%;
  }
}
</style>