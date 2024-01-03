<template>
  <div>
    <div>
      <div class="form-box">
        <el-form inline class="form">
          <el-form-item>
            <el-button type="primary" @click="add">新增</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="removeAll">批量删除</el-button>
          </el-form-item>
          <el-form-item style="float: right">
            <el-tooltip effect="dark" content="刷新数据" placement="top">
              <el-button size="small" text @click="refreshPage">
                <el-icon :size="15">
                  <Refresh />
                </el-icon>
              </el-button>
            </el-tooltip>
          </el-form-item>
        </el-form>
      </div>
      <div class="table-container">
        <el-table
          v-loading="loading"
          :data="tableData"
          table-layout="auto"
          height="600"
          @selection-change="(val) => (multipleSelection = val)"
        >
          <el-table-column type="selection" label="规格名称"></el-table-column>
          <el-table-column label="规格名称" prop="name"></el-table-column>
          <el-table-column
            label="规格值"
            width="320"
            prop="default"
            align="center"
          ></el-table-column>
          <el-table-column label="排序" prop="order" align="center"></el-table-column>
          <el-table-column label="状态" prop="status" align="center">
            <template #default="scope">
              <el-switch
                v-model:modelValue="scope.row.status"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange($event, scope.row)"
              />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template #default="scope">
              <el-button
                text
                type="primary"
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >修改</el-button
              >

              <el-popconfirm
                title="是否要删除该记录？"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="handleDelete(scope.$index, scope.row)"
              >
                <template #reference>
                  <el-button text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pages">
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :total="totalSize"
          :page-size="10"
          @current-change="PageChangeHandle"
        />
      </div>
    </div>

    <el-drawer
      v-model="dialog"
      :title="title"
      direction="rtl"
      class="demo-drawer"
      @close="cancelForm"
    >
      <div class="formDrawer">
        <div class="body">
          <el-form :model="form" label-position="left">
            <el-form-item label="规格名称">
              <el-input v-model.trim="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="排序">
              <el-input-number v-model.number="form.num" :min="0" :max="999999" />
            </el-form-item>
            <el-form-item label="状态">
              <el-switch v-model.number="form.status" :active-value="1" :inactive-value="0" />
            </el-form-item>
            <el-form-item label="规格值" label-width="60">
              <el-tag
                v-for="tag in form.dynamicTags"
                :key="tag"
                class="mx-1"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >
                {{ tag }}
              </el-tag>
              <el-input
                v-if="inputVisible"
                ref="InputRef"
                v-model="inputValue"
                class="ml-1 w-20"
                size="small"
                @keyup.enter="handleInputConfirm"
                @blur="handleInputConfirm"
              />
              <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                + New Tag
              </el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="actions">
          <el-button type="primary" :loading="loading" @click="addSubmitHandle">
            {{ loading ? '提交中 ...' : '提交' }}</el-button
          >
          <el-button @click="cancelForm">取消</el-button>
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { useSkusStores } from '@/stores/skusStores'
import { computed, ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { toast } from './util/util.js'

defineOptions({
  name: 'goodCatgoryManager'
})

const title = ref('新增')
const titleID = ref(0)

const form = ref({
  name: '',
  num: 0,
  status: 0,
  dynamicTags: []
})

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref(null)
const handleInputConfirm = () => {
  if (inputValue.value) {
    form.value.dynamicTags.push(inputValue.value)
  }
  inputVisible.value = false
  inputValue.value = ''
}
const handleClose = (tag) => {
  if (!form.value.dynamicTags) return
  const index = form.value.dynamicTags.findIndex((err) => err == tag)
  form.value.dynamicTags.splice(index, 1)
}

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value?.input?.focus()
  })
}

const useSkus = useSkusStores()

const loading = ref(false)

const dialog = ref(false)

const { getKusList, kusList } = useSkus

getKusList()

const tableData = computed(() => useSkus.skusList)

const multipleSelection = ref([])

const totalSize = computed(() => useSkus.totalCount)

const refreshPage = () => {
  loading.value = true
  getKusList().then(() => {
    loading.value = false
  })
}

const PageChangeHandle = (page) => {
  getKusList(page)
  refreshPage()
}

const add = () => {
  dialog.value = true
  title.value = '新增'
  titleID.value = 0
}

const removeAll = () => {
  if (multipleSelection.value.length <= 0) {
    toast('没有选中数据', 'error')
    return
  }
  let idList = multipleSelection.value.map((ele) => ele.id)
  kusList(4, {
    ids: idList
  })
    .then((res) => {
      toast('删除商品规格成功')
      refreshPage()
    })
    .catch((err) => {
      const data = err?.response?.data?.msg
      if (data) toast(data, 'error', true)
    })
}

const handleStatusChange = (status, row) => {
  kusList(3, {
    id: row.id,
    status: status
  })
    .then((res) => {
      toast('修改状态成功')
      refreshPage()
    })
    .catch((err) => {
      const data = err?.response?.data?.msg
      if (data) toast(data, 'error', true)
    })
}

const handleEdit = (index, row) => {
  let object = form.value
  let slist = row.default.split(',')
  titleID.value = row.id
  let rowValues = [row.name, row.order, row.status, slist]
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key) && rowValues.length > 0) {
      object[key] = rowValues.shift()
    }
  }
  dialog.value = true
  title.value = '修改'
}

const handleDelete = (index, row) => {
  kusList(4, {
    ids: [row.id]
  })
    .then((res) => {
      toast('删除商品规格成功')
      refreshPage()
    })
    .catch((err) => {
      const data = err?.response?.data?.msg
      if (data) toast(data, 'error', true)
    })
}

const cancelForm = () => {
  dialog.value = false
  const object = form.value
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      const element = object[key]
      if (typeof element == 'string') {
        object[key] = ''
      } else if (typeof element == 'number') {
        object[key] = 0
      } else {
        object[key] = []
      }
    }
  }
}

const addSubmitHandle = () => {
  if (form.value.name.length == 0 || form.value.dynamicTags.length == 0) {
    ElMessage.error('信息不能为空')
    return
  }
  loading.value = true
  let opt = {}
  let guigeValue = form.value.dynamicTags.join(',')

  let fun = titleID.value
    ? kusList(
        2,
        (opt = {
          id: titleID.value,
          status: form.value.status,
          name: form.value.name,
          order: form.value.num,
          default: guigeValue
        })
      )
    : kusList(
        1,
        (opt = {
          status: form.value.status,
          name: form.value.name,
          order: form.value.num,
          default: guigeValue
        })
      )

  fun
    .then((res) => {
      dialog.value = false
      cancelForm()
      refreshPage()
      ElMessage.success('新增商品规格成功')
    })
    .catch((err) => {
      const data = err?.response?.data?.msg
      if (data) toast(data, 'error', true)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>

<style>
.formDrawer {
  width: 100%;
  height: 100%;
  position: relative;
  @apply flex flex-col;
}

.formDrawer .body {
  flex: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;
  overflow-y: auto;
}

.formDrawer .actions {
  height: 50px;
  @apply mt-auto flex items-center;
}
</style>
