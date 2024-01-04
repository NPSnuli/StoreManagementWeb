<template>
  <div>
    <div class="form-box">
      <el-form inline class="form">
        <el-form-item>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
        <el-form-item style="float: right">
          <el-tooltip effect="dark" content="刷新数据" placement="top">
            <el-button size="small" text @click="reloadPages">
              <el-icon :size="15">
                <Refresh />
              </el-icon>
            </el-button>
          </el-tooltip>
        </el-form-item>
      </el-form>
    </div>
    <div class="custom-tree-container">
      <el-tree
        v-loading="loadingTree"
        class="tree"
        :data="dataSource"
        :show-checkbox="false"
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <template #default="{ node, data }">
          <div class="custom-tree-node">
            <span class="custom-label">{{ data.name }}</span>

            <div class="custom-tree-op">
              <el-button
                text
                type="primary"
                size="small"
                @click="tuijian(data)"
                :loading="data.GoodsDrawerLoading"
              >
                推荐商品
              </el-button>

              <el-switch
                :modelValue="data.status"
                :active-value="1"
                :inactive-value="0"
                @change="handleStatusChange($event, data)"
              />
              <el-button text type="primary" size="small" @click.stop="handleEdit(data)"
                >修改</el-button
              >
              <el-popconfirm
                title="是否要删除该记录？"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="handleDelete(data)"
              >
                <template #reference>
                  <el-button text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </template>
      </el-tree>
    </div>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" label-width="80px" :inline="false">
        <el-form-item label="分类名称" prop="name">
          <el-input v-model.trim="form.name" placeholder="分类名称"></el-input>
        </el-form-item>
      </el-form>
    </FormDrawer>
    <FormDrawer ref="formDrawerRef2" title="推荐商品" confirmText="关联" @submit="handleSubmit2">
      <el-table v-loading="loading2" :data="tableData" table-layout="auto">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="商品封面" align="center">
          <template #default="scope">
            <el-image style="width: 60px; height: 60px" :src="scope.row.cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="name" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-popconfirm
              title="是否要删除该记录？"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="handleDelete2(scope.row.id)"
            >
              <template #reference>
                <el-button class="px-1" text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </FormDrawer>
    <el-dialog v-model="dialogTableVisible" title="商品">
      <el-table
        v-loading="loading3"
        :data="goodsData"
        border
        height="420"
        @selection-change="handleMultipleSelectionChange"
      >
        <el-table-column type="selection" />
        <el-table-column label="商品" align="center">
          <template #default="scope">
            <div class="shopList">
              <el-image class="image" :src="scope.row.cover" width="80"></el-image>
              <div class="shopContent">
                <p class="shopName">{{ scope.row.desc }}</p>
                <p>
                  <span class="shopPrice1">{{ `￥${scope.row.min_price}` }}</span>
                  <el-divider direction="vertical" />
                  <span class="shopPrice2">{{ `￥${scope.row.min_oprice}` }}</span>
                </p>
                <p class="shopCatergory">{{ `分类:${scope.row.category?.name}` }}</p>
                <p class="shopDate">{{ `创建时间:${scope.row.create_time}` }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="总库存" prop="stock" align="center" width="120"></el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          class="pagination"
          background
          layout="prev, pager, next"
          :total="goodsData.length"
          :page-size="10"
          @current-change="PageChangeHandle"
        />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogTableVisible = false">取消</el-button>
          <el-button type="primary" @click="guanlianwupin"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Refresh } from '@element-plus/icons-vue'
import { computed, reactive, ref } from 'vue'
import { useStateStores } from '@/stores/stateStores'
import FormDrawer from './components/FormDrawer.vue'
import { ElNotification } from 'element-plus'

const useState = useStateStores()
const {
  getGoods,
  getCategory,
  Category,
  getCategoryItemList,
  removeCategoryItemList,
  guanlianCategoryItem
} = useState
getCategory()

const form = reactive({
  name: ''
})

const formDrawerRef = ref(null)
const formDrawerRef2 = ref(null)
const findID = ref('')
const tableData = computed(() => useState.CategoryItemList)
const goodsData = computed(() =>
  useState.shopList.filter((ele) => ele.category_id !== findID.value)
)
const multipleSelection = ref([])
const handleMultipleSelectionChange = (rows) => {
  multipleSelection.value = rows
}

const editId = ref(0)

const loadingTree = ref(false)
const loading2 = ref(false)
const loading3 = ref(false)
const dialogTableVisible = ref(false)

const drawerTitle = computed(() => (editId.value ? '修改' : '新增'))

const handleSubmit = () => {
  if (form.name.length == 0) {
    ElNotification.error({
      message: '分类名称不能为空'
    })
    return
  }

  formDrawerRef.value.showLoading()

  let opt = {}
  // console.log(editId.value);
  const fun = editId.value
    ? Category(2, (opt = { name: form.name, id: editId.value }))
    : Category(1, (opt = { name: form.name }))

  fun
    .then((res) => {
      ElNotification({
        title: '成功',
        message: drawerTitle.value + '成功',
        type: 'success'
      })
      formDrawerRef.value.close()
    })
    .finally(() => {
      formDrawerRef.value.hideLoading()
      reloadPages()
    })
}

const tuijian = (data) => {
  if (!data.id) return
  findID.value = data.id
  refreshCategoryItemList()
}

const refreshCategoryItemList = () => {
  loading2.value = true
  getCategoryItemList(findID.value)
    .then(() => {
      formDrawerRef2.value.open()
    })
    .finally(() => {
      loading2.value = false
    })
}

const handleSubmit2 = () => {
  getGoods('all', null, null, 50, 1).then((res) => {
    dialogTableVisible.value = true
  })
}
const PageChangeHandle = (page) => {
  loading3.value = true
  getGoods('all', null, null, 50, page).finally(() => {
    loading3.value = false
  })
}

const handleDelete2 = (id) => {
  removeCategoryItemList(id).then(() => {
    refreshCategoryItemList()
  })
}

const guanlianwupin = () => {
  guanlianCategoryItem({
    category_id: findID.value,
    goods_ids: multipleSelection.value.map((ele) => ele.id)
  }).then(() => {
    dialogTableVisible.value = false
    refreshCategoryItemList()
  })
}

const add = () => {
  editId.value = 0
  formDrawerRef.value.open()
}

const handleEdit = (data) => {
  editId.value = data.id
  form.name = data.name
  formDrawerRef.value.open()
}

const handleDelete = (data) => {
  let opt = {}
  Category(3, (opt = { id: data.id }))
    .then((res) => {
      ElNotification({
        title: '成功',
        message: '删除分类成功',
        type: 'success'
      })
    })
    .finally(() => {
      reloadPages()
    })
}

const handleStatusChange = (status, data) => {
  let opt = {}
  Category(4, (opt = { id: data.id, status: status }))
    .then((res) => {
      ElNotification({
        title: '成功',
        message: '更新分类商品状态成功',
        type: 'success'
      })
    })
    .finally(() => {
      reloadPages()
    })
}

const reloadPages = () => {
  loadingTree.value = true
  getCategory().finally(() => {
    loadingTree.value = false
  })
}

const dataSource = computed(() => useState.categoryList)
</script>

<style lang="scss">
.el-tree-node__content {
  padding: 20px 0 !important;
}

.custom-tree-container {
  .custom-tree-node {
    @apply text-base flex flex-row w-full items-center;

    .custom-label {
      @apply basis-1/2;
    }

    .custom-tree-op {
      @apply justify-self-end ml-auto;
    }
  }
}

// @apply h-full;
.shopList {
  @apply flex flex-row;
  .image {
    @apply w-[80px] h-[80px] mt-3;
  }
  .shopContent {
    @apply text-left whitespace-nowrap text-ellipsis p-2;

    overflow: hidden;

    .shopName {
      @apply text-gray-800;
    }

    .shopPrice1 {
      @apply text-red-600;
    }

    .shopPrice2 {
      @apply text-gray-600;
    }

    .shopCatergory,
    .shopDate {
      @apply text-gray-400;
    }
  }
}
.pages {
  @apply w-full flex flex-row justify-center mt-5;

  .pagination {
    @apply justify-center;
  }
}
</style>
