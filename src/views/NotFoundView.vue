<template>
  <main class="not-found">
    <section>
      <h1>404</h1>
      <h2>Página não encontrada</h2>

      <p>
        A página que você tentou acessar não existe ou foi removida.
      </p>

      <RouterLink to="/" class="button">
        Voltar para a página inicial
      </RouterLink>
    </section>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 5rem;
  margin: 0;
  line-height: 1;
}

h2 {
  margin-top: 1rem;
  font-size: 1.8rem;
}

p {
  margin-top: 1rem;
  color: #666;
}

.button {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.75rem 1.2rem;
  border-radius: 8px;
  background: #111827;
  color: white;
  text-decoration: none;
}
</style>