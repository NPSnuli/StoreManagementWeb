<template>
  <el-container class="container2">
    <Aside style="width: 200px; height: 100vh"></Aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <Main />
      </el-main>
      <el-footer>
        <Footer />
      </el-footer>
    </el-container>
  </el-container>
</template>

<script setup lang="js">
// style 111
// 111
import { RouterLink, RouterView } from 'vue-router'
import Aside from '@/components/Aside/index.vue'
import Header from '@/components/Header/Header.vue'
import Main from '@/components/Main/Main.vue'
import Footer from '@/components/Footer/Footer.vue'
</script>

<style scoped>
.container2 {
  width: 100vw;
  height: 100vh;
}
</style>
