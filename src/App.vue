<script setup>
import Login from './views/login/Login.vue'

// import Baselayout from './layout/Baselayout.vue';
</script>

<template>
  <!-- <Login /> -->
  <router-view />
  <!-- <Baselayout /> -->
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
