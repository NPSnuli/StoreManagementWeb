<template>
  <el-aside width="220px" class="image-aside" v-loading="loading">
    <div class="top">
      <AsideList
        :active="activeId == item.id"
        v-for="(item, index) in list"
        :key="index"
        @edit="handleEdit(item)"
        @delete="handleDelete(item.id)"
        @click="handleChangeActiveId(item.id)"
      >
        {{ item.name }}
      </AsideList>
    </div>
    <div class="bottom">
      <el-pagination
        background
        layout="prev, next"
        :total="total"
        :current-page="currentPage"
        :page-size="limit"
        @current-change="getData"
      />
    </div>
  </el-aside>

  <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" :max="1000" />
      </el-form-item>
    </el-form>
  </FormDrawer>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { computed } from '@vue/reactivity'
import FormDrawer from './FormDrawer.vue'
import AsideList from './AsideList.vue'

import {
  getImageClassList,
  createImageClass,
  updateImageClass,
  deleteImageClass
} from '../api/image_class.js'
import { toast } from '@/components/Main/Content/Goods/util/util.js'

// 加载动画
const loading = ref(false)
const list = ref([])

// 分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

// 获取数据
function getData(p = null) {
  // 判断传入的页码是否为空
  if (typeof p == 'number') {
    currentPage.value = p
  }

  loading.value = true
  getImageClassList(currentPage.value)
    .then((res) => {
      const data = res.data
      total.value = data.totalCount
      list.value = data.list
      // 默认选择第一个
      let item = list.value[0]
      // 激活状态
      if (item) {
        handleChangeActiveId(item.id)
      }
    })
    .finally(() => {
      loading.value = false
    })
}

getData()

const editId = ref(0)
const drawerTitle = computed(() => (editId.value ? '修改' : '新增'))
const formDrawerRef = ref(null)
const form = reactive({
  name: '',
  order: 50
})

const rules = {
  name: [
    {
      required: true,
      message: '图库分类名称不能为空',
      trigger: 'blur'
    }
  ]
}
const formRef = ref(null)
const handleSubmit = () => {
  formRef.value.validate((valid) => {
    if (!valid) return

    formDrawerRef.value.showLoading()

    // 判断是新增还是修改
    const fun = editId.value ? updateImageClass(editId.value, form) : createImageClass(form)

    fun
      .then((res) => {
        toast(drawerTitle.value + '成功')
        getData(editId.value ? currentPage.value : 1)
        formDrawerRef.value.close()
      })
      .finally(() => {
        formDrawerRef.value.hideLoading()
      })
  })
}

// 新增
const handleCreate = () => {
  editId.value = 0
  form.name = ''
  form.order = 50
  formDrawerRef.value.open()
}

// 编辑
const handleEdit = (row) => {
  editId.value = row.id
  form.name = row.name
  form.order = row.order
  formDrawerRef.value.open()
}

// 删除
const handleDelete = (id) => {
  loading.value = true
  deleteImageClass(id)
    .then((res) => {
      toast('删除成功')
      getData()
    })
    .finally(() => {
      loading.value = false
    })
}

// 选中图库分类
const activeId = ref(0)
const emit = defineEmits(['change'])
// 切换分类
function handleChangeActiveId(id) {
  activeId.value = id
  emit('change', id)
}

defineExpose({
  handleCreate
})
</script>
<style>
.image-aside {
  border-right: 1px solid #eeeeee;
  position: relative;
}
.image-aside .top {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-aside .bottom {
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
</style>
