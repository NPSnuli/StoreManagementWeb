<template>
  <component id="Aside" :is="Aside" style="height: 100vh" class="aside"></component>
</template>

<script setup lang="js">
import Aside from './View/Aside.vue'

defineOptions({
  name: 'Aside'
})
</script>

<style>
.aside {
  @apply bg-white;
}
</style>
