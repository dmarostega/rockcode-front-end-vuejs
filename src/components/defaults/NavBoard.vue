<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const isOpen = ref(false)
</script>

<template>
  <nav class="nav-footer">
    <!-- Menu móvel (abre para cima) -->
    <div v-if="isOpen" class="mobile-menu">
      <RouterLink to="/" class="nav-link">Inicio</RouterLink>
      <RouterLink to="/about" class="nav-link">Sobre</RouterLink>
      <RouterLink to="/stacks" class="nav-link">Stacks</RouterLink>
      <RouterLink to="/experiences" class="nav-link">Experiências</RouterLink>
      <RouterLink to="/infos" class="nav-link">Informações</RouterLink>
      <RouterLink to="/apps" class="nav-link">Aplicativos</RouterLink>
      <RouterLink to="/contact" class="nav-link">Contato</RouterLink>
    </div>

    <!-- Container principal -->
    <div class="nav-container">
      <div class="brand">Rockcode</div>

      <button class="menu-toggle" @click="isOpen = !isOpen">
        <span v-if="!isOpen">&#9650;</span>
        <!-- seta para cima -->
        <span v-else>&#9660;</span>
        <!-- seta para baixo -->
      </button>

      <!-- Menu horizontal (desktop) -->
      <div class="menu">
        <RouterLink to="/" class="nav-link">Inicio</RouterLink>
        <RouterLink to="/about" class="nav-link">Sobre</RouterLink>
        <RouterLink to="/stacks" class="nav-link">Stacks</RouterLink>
        <RouterLink to="/experiences" class="nav-link">Experiências</RouterLink>
        <RouterLink to="/infos" class="nav-link">Informações</RouterLink>
        <RouterLink to="/apps" class="nav-link">Aplicativos</RouterLink>
        <RouterLink to="/contact" class="nav-link">Contato</RouterLink>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  color: white;
  z-index: 10;
}

/* Container da navbar */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

/* Marca */
.brand {
  font-size: 1.2rem;
  color: white;
}

/* Botão de menu mobile */
.menu-toggle {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: white;
  cursor: pointer;
}

/* Links do menu normal (desktop) */
.menu {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: white;
  text-decoration: none;
}

.nav-link:hover {
  text-decoration: underline;
}

/* Menu móvel (abre para cima do footer) */
.mobile-menu {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  background-color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 0;
}

/* Responsividade */
@media (max-width: 768px) {
  .menu {
    display: none;
  }

  .menu-toggle {
    display: block;
  }

  .mobile-menu .nav-link {
    font-size: 1.1rem;
  }
}

@media (min-width: 768px) {
  .brand,
  .menu-toggle {
    display: none;
  }
}
</style>
