<template>
  <el-aside class="aside" style="height: 100vh">
    <div class="banner">
        <div class="logo">
          <font-awesome-icon class="svg" :icon="['fas', 'cart-shopping']" />
          <span class="text">商城管理系统</span>
        </div>
    </div>
    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen"
      @close="handleClose">
      <el-sub-menu index="1">
        <template #title>
          <el-icon>
            <location />
          </el-icon>
          <span>Navigator One</span>
        </template>
        <el-menu-item-group>
          <template #title><span>Group One</span></template>
          <el-menu-item index="1-1">item one</el-menu-item>
          <el-menu-item index="1-2">item two</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="Group Two">
          <el-menu-item index="1-3">item three</el-menu-item>
        </el-menu-item-group>
        <el-sub-menu index="1-4">
          <template #title><span>item four</span></template>
          <el-menu-item index="1-4-1">item one</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="2">
        <el-icon>
          <location />
        </el-icon>
        <template #title>Navigator Two</template>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <el-icon>
          <document />
        </el-icon>
        <template #title>Navigator Three</template>
      </el-menu-item>
      <el-menu-item index="4">
        <el-icon>
          <setting />
        </el-icon>
        <template #title>Navigator Four</template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'

const isCollapse = ref(false)

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
.aside {
  @apply bg-white shadow-2xl border-0 rounded-lg ;
}

.banner {
  @apply flex space-x-0.5 justify-center;

  .logo {
      @apply py-5 px-2;
      .svg {
        @apply flex-initial shrink w-7 text-sky-500;
      }

      .text {
        @apply flex-initial w-72 text-2xl font-bold text-sky-500;
      }
  }
}

.el-menu {
  @apply border-none text-lg font-bold;

  .el-sub-menu {
    .el-sub-menu__title {
      @apply hover:rounded-lg;
    }
  }

  .el-menu-item {
    @apply px-8 mx-3 hover:rounded-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300;

    &.is-active {
      @apply rounded-lg shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white;
    }
  }
}
</style>
