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
          <el-button type="primary">新增商品</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" table-layout="auto" height="600">
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
        <el-table-column label="操作" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="useState.totalSize"
        :page-size="10"
        @current-change="PageChangeHandle"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStateStores } from '@/stores/stateStores'

const useState = useStateStores()

const { getGoods } = useState

const tabValue = ref('all')

const searchValue = ref('')

getGoods('all', null, null, null, 1)

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

const PageChangeHandle = (page) => {
  getGoods(tabValue.value, null, null, null, page)
}

const TabChangeHandle = (name) => {
  // console.log(name);
  getGoods(name, null, null, null, 1)
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
