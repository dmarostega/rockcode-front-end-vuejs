<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
</script>
<template>
  <LayoutDefault>
<h1 class="page-title">Contato</h1>
<div style="display: flex;
         flex-direction: column;
         justify-content: center;
         align-items: center;
         width: 300px;
         margin: 0 auto">
  <div style="width: 100%;">

    <div style="display: flex; justify-content: space-between; margin-bottom: .5em">
      <label>Telefone:</label>
      <span>(47) 9 9270-6404</span>
    </div>

    <div style="display: flex; justify-content: space-between; margin-bottom: .5em">
      <label>Email:</label>
      <span>dmarostega@gmail.com</span>
    </div>

    <div style="display: flex; justify-content: space-between; margin-bottom: .5em">
      <label>LinkedIn:</label>
      <span>linkedin.com/in/dmarostega</span>
    </div>

    <div style="display: flex; justify-content: space-between; margin-bottom: .5em">
      <label>Github:</label>
      <span>github.com/dmarostega</span>
    </div>

  </div>
</div>
    <NavBoard />
  </LayoutDefault>
</template>
