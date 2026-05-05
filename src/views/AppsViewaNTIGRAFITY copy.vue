<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
</script>

<template>
  <LayoutDefault>
    <h2>Aplicativos (MVP´s)</h2>
    <p>Aplicativos desenvolvidos em fase de MVP (Minimum Viable Product), com o objetivo de validar ideias e obter feedback dos usuários.</p>
    <div class="apps-grid">
      <div class="app-card">
        <div class="app-card-content">
          <h3>Meu Financeiro</h3>
          <p>Aplicativo para controle financeiro pessoal, com o objetivo de ajudar os usuários a gerenciar suas finanças de forma simples e eficiente.</p>
        </div>
        <a class="app-card-action" href="https://meufinanceiro.rockcodelabs.com.br" target="_blank">Acessar</a>
      </div>
    </div>
    <NavBoard />
  </LayoutDefault>
</template>

<style scoped>
.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.app-card {
  background: var(--color-background-mute, #ffffff);
  border: 1px solid var(--color-border, #e5e7eb);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

@media (prefers-color-scheme: dark) {
  .app-card {
    background: var(--color-background-mute, #1f2937);
    border-color: var(--color-border, #374151);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
  }
}

.app-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.app-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: transparent;
}

@media (prefers-color-scheme: dark) {
  .app-card:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
  }
}

.app-card:hover::before {
  opacity: 1;
}

.app-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-heading, inherit);
}

.app-card p {
  font-size: 0.95rem;
  color: var(--color-text, inherit);
  opacity: 0.8;
  line-height: 1.5;
  margin: 0 0 1.5rem 0;
}

.app-card-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.2rem;
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.9rem;
  transition: opacity 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
  align-self: flex-start;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.4);
}

.app-card-action:hover {
  opacity: 0.9;
  transform: translateY(-1px);
  box-shadow: 0 6px 8px -1px rgba(59, 130, 246, 0.5);
  color: white;
}
</style>
