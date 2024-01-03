<template>
  <el-container class="container2">
    <Aside style="height: 100vh"></Aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view id="home"></router-view>
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useStateStores } from '@/stores/stateStores'
import Aside from '@/components/Aside/index.vue'
import Header from '@/components/Header/Header.vue'
import Footer from '@/components/Footer/Footer.vue'
defineOptions({
  name: 'Home'
})

const useState = useStateStores()
</script>

<style scope lang="scss">
#home {
  @apply z-0 bg-white backdrop-blur-md shadow-2xl border-0 rounded-lg p-3;
  width: 100%;
  height: 100%;
}
</style>
