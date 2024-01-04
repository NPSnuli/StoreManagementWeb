<template>
  <div class="footer">
    <a class="text-black-50" target="_blank" href="https://space.bilibili.com/402587095">我的B站</a>
    <span>武汉软件工程职业学院 课程设计 ©2023-2024</span>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Footer'
})
</script>

<style lang="scss">
.footer {
  @apply h-full w-full py-4 flex flex-row justify-end;
  * {
    @apply flex-initial w-3/12 mx-2 text-right text-sky-500 text-lg font-bold;
  }
}
</style>
