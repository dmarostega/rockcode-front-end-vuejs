<script setup>
import LayoutDefault from '@/components/defaults/LayoutDefault.vue'
import NavBoard from '@/components/defaults/NavBoard.vue'
</script>

<template>
  <LayoutDefault>
    <h3>Stacks</h3>
    <div
      style="
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: 300px;
        margin: 0 auto;
        flex-wrap: wrap;
      "
    >
      <div class="stack-icon-component">
        <img src="../assets/logos/PHP-logo.svg" alt="" />
        <span>IV</span>
      </div>
      <div class="stack-icon-component">
        <img src="../assets/icons/Laravel.svg" alt="" />
        <span>IV</span>
      </div>
      <div class="stack-icon-component">
        <img src="../assets/icons/mysql.svg" alt="" />
        <span>III</span>
      </div>
      <div class="stack-icon-component">
        <img src="../assets/icons/javascript.svg" alt="" />
        <span>III</span>
      </div>
      <div class="stack-icon-component">
        <img src="../assets/icons/jquery.svg" alt="" />
        <span>III</span>
      </div>
      <div class="stack-icon-component">
        <img src="../assets/icons/bootstrap.svg" alt="" />
        <span>II</span>
      </div>
      <div class="stack-icon-component">
        <img src="../assets/logos/Official_CSS_Logo.svg" alt="" />
        <span>II</span>
      </div>
      <div class="stack-icon-component">
        <img src="../assets/icons/HTML5_logo_and_wordmark.svg" alt="" />
        <span>IV</span>
      </div>
    </div>
    <NavBoard />
  </LayoutDefault>
</template>
