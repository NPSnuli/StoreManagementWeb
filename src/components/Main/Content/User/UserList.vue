<template>
  <div>
    <!-- 搜索 -->
    <div class="form-box">
      <el-form inline class="form">
        <el-form-item label="关键词">
          <el-input v-model.trim="searchValue" placeholder="手机号/邮箱/会员昵称" />
        </el-form-item>
        <el-form-item label="会员等级">
          <el-select v-model="userLevel" class="m-2" placeholder="请选择会员等级">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="SearchClickHandle" v-loading="loading">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="ResetClickInput">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="form-box">
      <el-form inline class="form">
        <el-form-item>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 列表 -->
    <div>
      <el-table v-loading="loading" :data="tableData" stripe table-layout="auto" height="600">
        <el-table-column label="会员" width="200">
          <template #default="scoped">
            <div class="tableUserAvatar">
              <el-avatar :size="40" :src="scoped.row.avatar"> </el-avatar>
              <div class="ml-3">
                <h6>{{ scoped.row.username }}</h6>
                <small>ID:{{ scoped.row.id }}</small>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="会员等级" align="center">
          <template #default="scoped">
            {{ scoped.row.user_level?.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="登录注册" align="center">
          <template #default="scoped">
            <p v-if="scoped.row.last_login_time">最后登录 : {{ scoped.row.last_login_time }}</p>
            <p>注册时间 : {{ scoped.row.create_time }}</p>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template #default="scoped">
            <el-switch
              :modelValue="scoped.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="handleStatusChange($event, scoped.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <small v-if="scope.row.super == 1" class="text-sm text-gray-500">暂无操作</small>
            <div v-else>
              <el-button type="primary" size="small" text @click="handleEdit(scope.row)"
                >修改</el-button
              >

              <el-popconfirm
                title="是否要删除该管理员？"
                confirmButtonText="确认"
                cancelButtonText="取消"
                @confirm="handleDelete(scope.row.id)"
              >
                <template #reference>
                  <el-button text type="primary" size="small">删除</el-button>
                </template>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pages">
      <el-pagination
        background
        class="pagination"
        v-model:current-page="pages"
        :total="totalCount"
        layout="prev,pager,next"
        :page-size="10"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>

    <!-- 抽屉：添加\修改用户 -->
    <el-drawer
      :close-on-click-modal="false"
      v-model="showFrom"
      :title="title"
      :with-header="true"
      size="40%"
    >
      <el-form :model="form" ref="formDom" :rules="rules" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="头像" prop="avatar">
          <!-- <ChooseImage v-model="form.avatar" /> -->
        </el-form-item>
        <el-form-item label="会员等级" prop="user_level_id">
          <el-select v-model="form.user_level_id" class="m-2" placeholder="选择会员等级">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="form.phone" placeholder="手机"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0"> </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitData">确认</el-button>
          <el-button type="primary" @click="showFrom = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { toast } from '@/components/Main/Content/Goods/util/util.js'
import { useUserStores } from '@/stores/userStores.ts'

const useState = useUserStores()

const { getUserList, user } = useState

const loading = ref(false)

const pages = ref(1)

const showFrom = ref(false)

const formDom = ref(null)

const title = ref('')

const searchValue = ref('')

const userLevel = ref('')

const SearchClickHandle = () => {
  loading.value = true
  getUserList(pages.value, {
    keyword: searchValue.value.length <= 0 ? '' : searchValue.value,
    user_level_id: userLevel.value
  })
    .then((res) => {})
    .catch((err) => {
      const data = err?.response?.data?.msg
      if (data) toast(data, 'error', true)
    })
    .finally(() => {
      loading.value = false
    })
}

const ResetClickInput = () => {
  searchValue.value = ''
  userLevel.value = ''
  refreshPage()
}

const form = reactive({
  username: '',
  password: '',
  status: 1,
  nickname: '',
  phone: '',
  email: '',
  avatar: '',
  user_level_id: ''
})

const rules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号码',
      trigger: 'blur'
    }
    // {
    //   pattern: /^1[3456789]\d{9}$/,
    //   message: '手机号格式不正确',
    //   trigger: 'blur'
    // }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱地址',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: '邮箱地址格式不正确',
      trigger: ['blur', 'change']
    }
  ],
  user_level_id: [{ required: true, message: '请选择会员等级', trigger: 'change' }]
}

getUserList()

const handleCurrentChange = (page) => {
  pages.value = page
  refreshPage()
}

const refreshPage = () => {
  loading.value = true
  getUserList(pages.value).finally(() => {
    loading.value = false
  })
}

const clearFormData = () => {
  let object = form
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key)) {
      object[key] = ''
    }
  }
}

const handleStatusChange = (status, row) => {
  user(3, {
    id: row?.id,
    status: status
  })
    .then(() => {
      refreshPage()
    })
    .catch((err) => {
      const data = err?.response?.data?.msg
      if (data) toast(data, 'error', true)
    })
}

const add = () => {
  clearFormData()
  title.value = '添加用户'
  showFrom.value = true
}

const handleEdit = (row) => {
  let object = row
  for (const key in object) {
    if (Object.hasOwnProperty.call(object, key) && Object.hasOwnProperty.call(form, key)) {
      form[key] = object[key]
    }
  }
  title.value = '修改用户'
  showFrom.value = true
}

const handleDelete = (id) => {
  user(4, {
    id: id
  })
    .then(() => {
      toast('删除用户成功')
    })
    .catch((err) => {
      const data = err?.response?.data?.msg
      if (data) toast(data, 'error', true)
    })
}

const submitData = () => {
  formDom.value.validate((ok) => {
    if (ok) {
      const fun = title.value === '添加用户' ? user(1, form) : user(2, form)
      fun
        .then(() => {
          toast(`${title.value} 成功`)
          showFrom.value = false
          refreshPage()
        })
        .catch((err) => {
          toast(`${title.value} 失败`, 'error')
        })
    }
  })
}

const totalCount = computed(() => useState.totalCount)

const options = computed(() => useState.user_level)

const tableData = computed(() => useState.list)
</script>

<style scoped lang="scss">
.tableUserAvatar {
  @apply flex items-center;
}

.pages {
  @apply w-full flex flex-row justify-center mt-5;

  .pagination {
    @apply justify-center;
  }
}
</style>
