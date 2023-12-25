<template>
  <div id="main">
    <router-view id="content"></router-view>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Main'
})
</script>

<style scoped lang="scss">
#main {
  @apply z-0 bg-white backdrop-blur-md shadow-2xl border-0 rounded-lg p-3;
  width: 87vw;
  height: 83vh;
}
</style>
