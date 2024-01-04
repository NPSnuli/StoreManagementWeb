<template>
  <div>
    <div>
      <el-tabs v-model="tabValue" @tab-change="TabChangeHandle">
        <el-tab-pane
          v-for="(item, index) in tabs"
          :key="index"
          :label="item.name"
          :name="item.value"
        ></el-tab-pane>
      </el-tabs>
    </div>
    <div class="form-box">
      <el-form inline class="form">
        <el-form-item label="关键词">
          <el-input v-model.trim="searchValue" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SearchClickHandle">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">新增商品</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table v-loading="loading" :data="tableData" table-layout="auto" height="600">
        <el-table-column label="商品" width="320" prop="shop">
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
        <el-table-column label="实际销量" prop="sale_count" align="center"></el-table-column>
        <el-table-column label="商品状态" prop="status" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status" class="ml-2" type="success">上架</el-tag>
            <el-tag v-else class="ml-2" type="danger">仓库</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" align="center">
          <template #default="scope">
            <span v-if="scope.row.ischeck == 1">通过</span>
            <span v-else>拒绝</span>
          </template>
        </el-table-column>
        <el-table-column label="总库存" prop="stock" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button class="px-1" type="primary" size="small" text @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-popconfirm
              title="是否要删除该商品？"
              confirmButtonText="确认"
              cancelButtonText="取消"
              @confirm="handleDelete([scope.row.id])"
            >
              <template #reference>
                <el-button class="px-1" text type="primary" size="small">删除</el-button>
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
        v-model:current-page="pages"
        :total="useState.totalSize"
        :page-size="10"
        @current-change="PageChangeHandle"
      />
    </div>
    <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
      <el-form :model="form" ref="formRef" label-width="80px" :inline="false">
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入商品名称,不能超过60个字符"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <ChooseImage v-model="form.cover" />
        </el-form-item>
        <el-form-item label="商品分类" prop="category_id">
          <el-select v-model="form.category_id" placeholder="选择所属商品分类">
            <el-option
              v-for="item in category_list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="form.desc" placeholder="选填，商品卖点"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="unit">
          <el-input v-model="form.unit" placeholder="请输入单位" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="总库存" prop="stock">
          <el-input v-model="form.stock" type="number" style="width: 40%">
            <template #append>件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存预警" prop="min_stock">
          <el-input v-model="form.min_stock" type="number" style="width: 40%">
            <template #append>件</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最低销售价" prop="min_price">
          <el-input v-model="form.min_price" type="number" style="width: 40%">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="最低原价" prop="min_oprice">
          <el-input v-model="form.min_oprice" type="number" style="width: 40%">
            <template #append>元</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存显示" prop="stock_display">
          <el-radio-group v-model="form.stock_display">
            <el-radio :label="0">隐藏</el-radio>
            <el-radio :label="1">显示</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否上架" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">放入仓库</el-radio>
            <el-radio :label="1">立即上架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </FormDrawer>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useStateStores } from '@/stores/stateStores'
import ChooseImage from '@/components/Main/Content/Picture/components/ChooseImage.vue'
import { toast } from './util/util.js'
import FormDrawer from './components/FormDrawer.vue'

const useState = useStateStores()

const { getGoods, goods, getCategory } = useState

getGoods('all', null, null, null, 1)

getCategory()

const pages = ref(1)

const loading = ref(false)

const tabValue = ref('all')

const formDrawerRef = ref(null)

const form = reactive({
  id: 0,
  title: null, //商品名称
  category_id: null, //商品分类
  cover: null, //商品封面
  desc: null, //商品描述
  unit: '件', //商品单位
  stock: 100, //总库存
  min_stock: 10, //库存预警
  status: 1, //是否上架 0仓库1上架
  stock_display: 1, //库存显示 0隐藏1显示
  min_price: 0, //最低销售价
  min_oprice: 0 //最低原价
})

const drawerTitle = ref('修改')

const searchValue = ref('')

const category_list = computed(() => useState.categoryList)

const clearHandler = () => {
  let object = form
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      object[key] = ''
    }
  }
}

const add = () => {
  clearHandler()
  drawerTitle.value = '添加'
  formDrawerRef.value.open()
}

const handleSubmit = () => {
  formDrawerRef.value.showLoading()
  let fun = drawerTitle.value === '修改' ? goods(2, form) : goods(1, form)
  fun
    .then(() => {
      toast(`${drawerTitle.value} 成功`)
      formDrawerRef.value.close()
      refreshData()
    })
    .catch(() => {
      toast(`${drawerTitle.value} 失败`, 'error')
    })
    .finally(() => {
      formDrawerRef.value.hideLoading()
    })
}

const tableData = computed(
  () => useState.shopList
  //   [
  //   {
  //     shop: {
  //       name: '小米14 pro',
  //       xianzaiPrice: '0.06',
  //       yuanPrice: '10.00',
  //       type: '家具生活',
  //       date: new Date().toLocaleString()
  //     },
  //     shopCount: 120,
  //     shopState: 2,
  //     shengheState: 2,
  //     total: 300
  //   }
  // ]
)

const tabs = ref([
  {
    name: '全部',
    value: 'all'
  },
  {
    name: '审核中',
    value: 'checking'
  },
  {
    name: '出售中',
    value: 'saling'
  },
  {
    name: '已下架',
    value: 'off'
  },
  {
    name: '库存预警',
    value: 'min_stock'
  },
  {
    name: '回收站',
    value: 'delete'
  }
])

const handleEdit = (row) => {
  let object = row
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key) && Object.hasOwnProperty.call(form, key)) {
      form[key] = object[key]
    }
  }
  drawerTitle.value = '修改'
  formDrawerRef.value.open()
}

const handleDelete = (ids) => {
  goods(3, { ids: ids }).then(() => {
    toast('删除商品成功')
    refreshData()
  })
}

const refreshData = () => {
  loading.value = true
  getGoods(tabValue.value, null, null, null, pages.value).finally(() => {
    loading.value = false
  })
}

const PageChangeHandle = () => {
  refreshData()
}

const TabChangeHandle = (name) => {
  // console.log(name);
  // getGoods(name, null, null, null, 1)
  refreshData()
}

const SearchClickHandle = () => {
  getGoods(name, searchValue.value, null, null, 1)
}
</script>

<style scope lang="scss">
.form-box {
  padding: 3px 0;
  .form {
    .el-button {
      margin: 0;
      padding: 5;
    }
  }
}
.table-container {
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
}
.pages {
  @apply w-full flex flex-row justify-center mt-5;

  .pagination {
    @apply justify-center;
  }
}
</style>
