<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'

const apps = [
  {
    id: 1,
    name: 'Meu Financeiro',
    description: 'Aplicativo para controle financeiro pessoal, com o objetivo de ajudar os usuários a gerenciar suas finanças de forma simples e eficiente.',
    url: 'https://meufinanceiro.rockcodelabs.com.br',
    icon: '💰',
    tag: 'Finanças',
  },
  // Adicione novos apps aqui no futuro
]
</script>

<template>
  <LayoutDefault>
    <div class="mvp-page">
      <div class="mvp-header">
        <h1 class="page-title">Aplicativos <span class="highlight">MVP</span></h1>
        <p class="mvp-subtitle">
          Aplicativos desenvolvidos em fase de MVP
          <em>(Minimum Viable Product)</em>, com o objetivo de validar ideias
          e obter feedback dos usuários.
        </p>
      </div>

      <div class="apps-grid">
        <a
          v-for="app in apps"
          :key="app.id"
          :href="app.url"
          target="_blank"
          rel="noopener noreferrer"
          class="app-card"
        >
          <div class="card-icon">{{ app.icon }}</div>
          <span class="card-tag">{{ app.tag }}</span>
          <h3 class="card-name">{{ app.name }}</h3>
          <p class="card-description">{{ app.description }}</p>
          <div class="card-footer">
            <span class="card-link">Acessar aplicativo →</span>
          </div>
        </a>
      </div>
    </div>

    <NavBoard />
  </LayoutDefault>
</template>

<style scoped>
.mvp-page {
  padding: 2rem 1em;
}

.mvp-header {
  margin-bottom: 2.5rem;
}

.highlight {
  color: var(--color-primary, #4f46e5);
}

.mvp-subtitle {
  color: var(--color-text-muted, #6b7280);
  font-size: 0.975rem;
  /* max-width: 560px; */
  line-height: 1.6;
}

/* Grid escalável: 1 coluna em mobile, mais em telas maiores */
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.app-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1.5rem;
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 12px;
  background: var(--color-surface, #ffffff);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  cursor: pointer;
}

.app-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(79, 70, 229, 0.12);
  border-color: var(--color-primary, #4f46e5);
}

.card-icon {
  font-size: 2rem;
  line-height: 1;
  margin-bottom: 0.25rem;
}

.card-tag {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-primary, #4f46e5);
  background: color-mix(in srgb, var(--color-primary, #4f46e5) 10%, transparent);
  padding: 0.2rem 0.6rem;
  border-radius: 99px;
  width: fit-content;
}

.card-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-heading, #1a1a2e);
  margin: 0.25rem 0 0;
}

.card-description {
  font-size: 0.875rem;
  color: var(--color-text-muted, #6b7280);
  line-height: 1.6;
  flex: 1;
  margin: 0;
}

.card-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--color-border, #e5e7eb);
}

.card-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary, #4f46e5);
}
</style>