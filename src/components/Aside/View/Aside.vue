<template>
  <el-aside class="aside" :style="['height:100vh', `width:${collapse ? 60 : 200}px`]">
    <div class="banner">
      <div class="logo">
        <font-awesome-icon class="svg" :icon="['fas', 'cart-shopping']" />
        <span v-if="!collapse" class="text" @click="clickHandle">商城管理系统</span>
      </div>
    </div>
    <el-menu class="el-menu-vertical-demo" :default-active="useState.activePage" :router="true" :collapse="collapse" :collapse-transition="true" @select="selectActivePage">
      <el-sub-menu v-for="(item, index) in menuList" :key="index" :index="`${index}`">
        <template #title>
          <component :is="item.icon" :size="16" class="icons"></component>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item v-for="(children, cindex) in item.children" :key="cindex" :index="children.path">
          <component :is="children.icon" :size="16" class="icons"></component>
          <span>{{ children.name }}</span>
        </el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup lang="js">
import { ref, computed } from 'vue'
import { Document, Menu as IconMenu, Location, Setting } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import {useStateStores} from '@/stores/stateStores'

const useState = useStateStores()

const router = useRouter()

const collapse = computed(() => useState.collapse)

const selectActivePage = (index, indexPath, item, routeResult) => {
  // console.log(index);
  useState.setActivePage(index)
}

const clickHandle = () => {
  router.replace("/")
  useState.setActivePage("")
}

const menuList = ref([
  {
    name: '商品管理',
    icon: 'Goods',
    children: [
      {
        name: '商品列表',
        icon: 'GoodsFilled',
        path: '/goodlist'
      },
      {
        name: '商品分类',
        icon: 'Menu',
        path: '/goodcategory'
      },
      {
        name: '规格管理',
        icon: 'Aim',
        path: '/goodCatgoryManager'
      },
      {
        name: '优惠券管理',
        icon: 'Ticket',
        path: '/ticketManager'
      }
    ]
  },
  {
    name: '用户管理',
    icon: 'User',
    children: [
      {
        name: '用户等级',
        icon: 'Menu',
        path: '/userLevel'
      },
      {
        name: '用户列表',
        icon: 'Menu',
        path: '/userList'
      }
    ]
  },
  {
    name: '图片管理',
    icon: 'DocumentCopy',
    children: [
      {
        name: '图片分类',
        icon: 'Menu',
        path: '/pictureCatgory'
      },
      {
        name: '图片列表',
        icon: 'Menu',
        path: '/pictureList'
      }
    ]
  }
])
</script>

<style scoped lang="scss">
.aside {
  @apply bg-white shadow-2xl border-0 rounded-lg transition-all ease-out delay-150 duration-300;
}

.banner {
  @apply flex space-x-0.5 justify-center;

  .logo {
    @apply py-5 px-2;

    .svg {
      @apply flex-initial shrink w-7 text-sky-500;
    }

    .text {
      @apply flex-initial w-72 text-2xl font-bold text-sky-500 cursor-pointer;
    }
  }
}

.el-menu {
  @apply border-none text-lg font-bold ;

  .icons {
    @apply w-[20px] h-[20px] mr-2;
  }

  .el-sub-menu {
    .el-sub-menu__title {
      @apply hover:rounded-lg;
    }

    .icons {
      @apply w-[20px] h-[20px] mr-2;
    }
  }

  .el-menu-item {
    @apply px-8 mx-3 hover:rounded-lg transition ease-in-out delay-150 hover:-translate-y-3 hover:scale-110 duration-300;

    &.is-active {
      @apply rounded-lg shadow-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white;
    }
  }
}
</style>
