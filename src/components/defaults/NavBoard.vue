<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <nav class="nav-footer">
    <div v-if="isOpen" class="mobile-menu">
      <RouterLink to="/" class="nav-link" @click="closeMenu">Início</RouterLink>
      <RouterLink to="/about" class="nav-link" @click="closeMenu">Sobre</RouterLink>
      <RouterLink to="/apps" class="nav-link" @click="closeMenu">Projetos</RouterLink>
      <RouterLink to="/ferramentas" class="nav-link" @click="closeMenu">Ferramentas</RouterLink>
      <RouterLink to="/experiences" class="nav-link" @click="closeMenu">Experiência</RouterLink>
      <RouterLink to="/stacks" class="nav-link" @click="closeMenu">Stacks</RouterLink>
      <RouterLink to="/articles" class="nav-link" @click="closeMenu">Artigos</RouterLink>
      <RouterLink to="/contact" class="nav-link" @click="closeMenu">Contato</RouterLink>
    </div>

    <div class="nav-container">
      <RouterLink to="/" class="brand" @click="closeMenu"> Rock Code </RouterLink>

      <button class="menu-toggle" type="button" @click="isOpen = !isOpen" aria-label="Abrir menu">
        <span v-if="!isOpen">&#9650;</span>
        <span v-else>&#9660;</span>
      </button>

      <div class="menu">
        <RouterLink to="/" class="nav-link">Início</RouterLink>
        <RouterLink to="/about" class="nav-link">Sobre</RouterLink>
        <RouterLink to="/apps" class="nav-link">Projetos</RouterLink>
        <RouterLink to="/ferramentas" class="nav-link">Ferramentas</RouterLink>
        <RouterLink to="/experiences" class="nav-link">Experiência</RouterLink>
        <RouterLink to="/stacks" class="nav-link">Stacks</RouterLink>
        <RouterLink to="/articles" class="nav-link">Artigos</RouterLink>
        <RouterLink to="/contact" class="nav-link">Contato</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-footer {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
  color: #e2e8f0;
}

.nav-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-top: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(5, 9, 13, 0.88);
  backdrop-filter: blur(12px);
}

.brand {
  color: #f8fafc;
  font-size: 1.05rem;
  font-weight: 800;
  text-decoration: none;
}

.menu-toggle {
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 10px;
  background: rgba(15, 23, 42, 0.7);
  color: #e2e8f0;
  cursor: pointer;
  font-size: 0.95rem;
  padding: 0.45rem 0.7rem;
}

.menu {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #cbd5e1;
  font-size: 0.92rem;
  font-weight: 700;
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover,
.nav-link.router-link-exact-active {
  color: #38bdf8;
}

.mobile-menu {
  position: absolute;
  right: 0;
  bottom: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  padding: 1.2rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.16);
  background: rgba(5, 9, 13, 0.96);
  backdrop-filter: blur(12px);
}

@media (max-width: 768px) {
  .menu {
    display: none;
  }

  .mobile-menu .nav-link {
    font-size: 1.05rem;
  }
}

@media (min-width: 769px) {
  .brand,
  .menu-toggle {
    display: none;
  }

  .nav-container {
    justify-content: center;
  }
}
</style>
