<template>
  <LayoutDefault>
    <!-- <div>
      <img style="max-width: 129px; max-height: 120px" src="../assets/images/logo01.png" />
    </div> -->
    <div class="about">
      <h1>Sobre</h1>
      <div>
        <div style="padding: 3em">
          Desenvolvedor web com perfil full-stack, atuando mais recentemente com foco em back-end,
          buscando sempre entregas de qualidade. Tenho experiência no desenvolvimento de APIs
          RESTful utilizando Laravel, seguindo os padrões e estruturas já aplicadas no sistema, com
          práticas alinhadas a princípios como SOLID, POO, arquitetura limpa e padrão MVC. Boa parte
          da minha trajetória com Laravel envolveu também novas manutenções e criações em telas
          Blade e jQuery. Tenho experiência com bancos de dados relacionais. Sou movido por desafios
          e tenho perfil comprometido, com forte interesse por evolução contínua. Minha
          personalidade introspectiva em novos ambientes, mas colaborativo e bem-humorado quando me
          sinto à vontade com o time.
        </div>
      </div>
    </div>
    <div>
      <NavBoard />
    </div>
  </LayoutDefault>
</template>

<style>
@media (min-width: 1024px) {
  /* .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  } */
}
</style>

<script setup>
import LayoutDefault from '../components/defaults/LayoutDefault.vue'
import NavBoard from '../components/defaults/NavBoard.vue'
</script>
