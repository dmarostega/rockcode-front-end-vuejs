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
  {
    id: 2,
    name: 'Minha Loteria',
    description: 'Plataforma de estudos de loterias com consulta de resultados, análises históricas, rankings estatísticos, geração de jogos e simulações de desempenho.',
    url: 'https://minhaloteria.rockcodelabs.com.br',
    icon: '🍀',
    tag: 'Loterias',
  },
  // Adicione novos apps aqui no futuro
]
</script>

<template>
  <LayoutDefault>
    <div >
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
  padding: 3rem 1.5rem;
  background-color: #0f172a; /* Slate 900 - dark modern background */
  min-height: 100vh;
  color: #f8fafc; /* Slate 50 */
}

.mvp-header {
  margin-bottom: 3rem;
  text-align: center;
}

.mvp-subtitle {
  color: #94a3b8; /* Slate 400 */
  font-size: 1.1rem;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
}

/* Centralized Flex row for cards */
.apps-grid {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.app-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.75rem;
  border: 1px solid #1e293b; /* Slate 800 */
  border-radius: 16px;
  background: #1e293b; /* Slate 800 */
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  max-width: 340px;
}

.app-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
  border-color: #38bdf8; /* Sky 400 border on hover */
}

.card-icon {
  font-size: 2.5rem;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.card-tag {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #38bdf8;
  background: rgba(56, 189, 248, 0.1);
  padding: 0.3rem 0.8rem;
  border-radius: 99px;
  width: fit-content;
}

.card-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0.5rem 0 0;
}

.card-description {
  font-size: 0.95rem;
  color: #94a3b8;
  line-height: 1.6;
  flex: 1;
  margin: 0;
}

.card-footer {
  margin-top: 1.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid #334155; /* Slate 700 */
}

.card-link {
  font-size: 0.9rem;
  font-weight: 600;
  color: #38bdf8;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>