<template>
  <div class="header">
    <div class="content">
      <div class="left">
        <el-icon v-if="!useState.collapse" :size="38" @click="collapseToggle"><Fold /></el-icon>
        <el-icon v-else :size="38" @click="collapseToggle"><Expand /></el-icon>

        <el-icon :size="38" @click="refreshHandle" class="refresh"><Refresh /></el-icon>
      </div>

      <div :span="11" class="right">
        <el-dropdown class="avatar">
          <el-avatar
            :size="54"
            fit="contain"
            class="avater-src"
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
          />
          <!-- <el-icon class="el-icon--right"><arrow-down /></el-icon> -->
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="savePath('users', '个人中心')" :icon="'User'"
                >个人中心</el-dropdown-item
              >
              <!-- <el-divider></el-divider> -->
              <el-dropdown-item @click="logout" :icon="'Close'">退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStateStores } from '@/stores/stateStores'
import { logout } from '@/network/localStores'

const useState = useStateStores()

const { collapseToggle } = useState

const refreshHandle = () => {
  location.reload()
}

defineOptions({
  name: 'Header'
})
</script>

<style scoped lang="scss">
.header {
  @apply bg-white shadow-2xl border-0 rounded-lg w-full h-16 py-1 px-2;

  .content {
    @apply flex items-center;

    .left {
      @apply w-5/12 py-1;

      * {
        @apply ml-3;
      }

      .el-icon {
        @apply cursor-pointer;
        @apply transition origin-center ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300;
      }
    }

    .right {
      @apply flex-initial w-7/12;
      .avatar {
        @apply float-right mr-3;
      }
    }
  }
}
</style>
