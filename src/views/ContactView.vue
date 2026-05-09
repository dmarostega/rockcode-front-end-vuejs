<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'

const contacts = [
  {
    label: 'E-mail',
    value: 'dmarostega@gmail.com',
    href: 'mailto:dmarostega@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/dmarostega',
    href: 'https://www.linkedin.com/in/dmarostega',
  },
  {
    label: 'GitHub',
    value: 'github.com/dmarostega',
    href: 'https://github.com/dmarostega',
  },
]
</script>

<template>
  <LayoutDefault>
    <main class="page-shell">
      <section class="page-hero">
        <span class="eyebrow">Contato</span>

        <h1>Vamos conversar sobre projetos, oportunidades ou tecnologia.</h1>

        <p>
          Entre em contato para falar sobre desenvolvimento web, Laravel, Vue, APIs,
          projetos próprios, oportunidades profissionais ou colaboração técnica.
        </p>
      </section>

      <section class="contact-grid">
        <a
          v-for="contact in contacts"
          :key="contact.label"
          :href="contact.href"
          target="_blank"
          rel="noopener noreferrer"
          class="contact-card"
        >
          <span>{{ contact.label }}</span>
          <strong>{{ contact.value }}</strong>
        </a>
      </section>

      <section class="contact-note">
        <h2>Rock Code Labs</h2>

        <p>
          Laboratório pessoal de desenvolvimento web, projetos SaaS, estudos técnicos
          e portfólio profissional de Diogo Marostega.
        </p>
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
.contact-grid,
.contact-note {
  max-width: 900px;
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
  max-width: 780px;
  margin: 1.3rem auto 0;
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.page-hero p {
  max-width: 720px;
  margin: 1.3rem auto 0;
  color: #cbd5e1;
  font-size: 1.08rem;
  line-height: 1.8;
}

.contact-grid {
  display: grid;
  gap: 1rem;
}

.contact-card,
.contact-note {
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 22px;
  background: rgba(15, 23, 42, 0.74);
  box-shadow: 0 18px 45px rgba(0, 0, 0, 0.22);
}

.contact-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.3rem 1.5rem;
  color: inherit;
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
}

.contact-card:hover {
  transform: translateY(-3px);
  border-color: rgba(56, 189, 248, 0.55);
  background: rgba(30, 41, 59, 0.88);
}

.contact-card span {
  color: #7dd3fc;
  font-weight: 900;
}

.contact-card strong {
  color: #f8fafc;
  text-align: right;
}

.contact-note {
  margin-top: 1.5rem;
  padding: 1.6rem;
  text-align: center;
}

.contact-note h2 {
  margin: 0 0 1rem;
  color: #ffffff;
}

.contact-note p {
  margin: 0;
  color: #94a3b8;
  line-height: 1.75;
}

@media (max-width: 640px) {
  .contact-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .contact-card strong {
    text-align: left;
  }
}
</style>