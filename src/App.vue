<script setup>
import Login from './pages/login/Login.vue';
</script>

<template>
  <a-watermark class="full-page" content="emoWoo hotel admin">
    <Login />
  </a-watermark>
</template>

<style scoped>
html,
body,
#app {
  margin: 0;
  padding: 0;
  height: 100%;
}

/* 让 watermark 容器撑满屏幕 */
.full-page {
  display: block;
  width: 100vw;
  height: 100vh;
}
</style>
