<template>
    <div class="header">
        <div class="content">
            <div class="left">
                <el-icon :size="38"><Fold /></el-icon>
                <el-icon :size="38"><Refresh /></el-icon>
            </div>

            <div :span="11" class="right">
                <el-avatar class="avatar" :size="60" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
            </div>
        </div>
    </div>
</template>

<script setup>
defineOptions({
    name: "Header"
})
</script>

<style scoped lang="scss">
.header {
    @apply bg-white shadow-2xl border-0 rounded-lg w-full py-1 px-2;

    .content {
        @apply flex items-center;

        .left {
            @apply w-5/12 py-1;

            * {
                @apply ml-3 ;
            }
        }
    
        .right {
            @apply  flex-initial w-7/12 ;
            .avatar {
                @apply float-right mr-3;
            }
        }
    }


}
</style>