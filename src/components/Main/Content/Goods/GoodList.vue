<template>
  <div>
    <div>
      <el-tabs>
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
          <el-input />
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">新增商品</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-container">
      <el-table :data="tableData" table-layout="auto">
        <el-table-column label="商品" width="320" prop="shop">
          <template #default="scope">
            <div class="shopList">
              <el-image class="image"></el-image>
              <div class="shopContent">
                <p class="shopName">{{ scope.row.shop.name }}</p>
                <p>
                  <span class="shopPrice1">{{ `￥${scope.row.shop.xianzaiPrice}` }}</span>
                  <el-divider direction="vertical" />
                  <span class="shopPrice2">{{ `￥${scope.row.shop.yuanPrice}` }}</span>
                </p>
                <p class="shopCatergory">{{ `分类:${scope.row.shop.type}` }}</p>
                <p class="shopDate">{{ `创建时间:${scope.row.shop.date}` }}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="实际销量" prop="shopCount" align="center"></el-table-column>
        <el-table-column label="商品状态" prop="shopState" align="center"></el-table-column>
        <el-table-column label="审核状态" prop="shengheState" align="center"></el-table-column>
        <el-table-column label="总库存" prop="total" align="center"></el-table-column>
        <el-table-column label="操作" align="center"></el-table-column>
      </el-table>
    </div>
    <div class="pages">
      <el-pagination
        class="pagination"
        background
        layout="prev, pager, next"
        :total="5"
        :page-size="5"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([
  {
    shop: {
      name: '小米14 pro',
      xianzaiPrice: '0.06',
      yuanPrice: '10.00',
      type: '家具生活',
      date: new Date().toLocaleString()
    },
    shopCount: 120,
    shopState: 2,
    shengheState: 2,
    total: 300
  }
])

const tabs = ref([
  {
    name: '全部',
    value: '全部'
  },
  {
    name: '审核中',
    value: '审核中'
  },
  {
    name: '出售中',
    value: '出售中'
  },
  {
    name: '已下架',
    value: '已下架'
  },
  {
    name: '库存预警',
    value: '库存预警'
  },
  {
    name: '回收站',
    value: '回收站'
  }
])
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
  @apply h-[25vh];
  .shopList {
    @apply flex flex-row;
    .image {
      @apply w-[80px] h-[80px] mt-3;
    }
    .shopContent {
      @apply text-left p-2;

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
  @apply w-full h-full flex flex-row justify-center;

  .pagination {
    @apply justify-center;
  }
}
</style>
