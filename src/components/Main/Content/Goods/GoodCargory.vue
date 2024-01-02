<template>
    <div>
        <div class="form-box">
            <el-form inline class="form">
                <el-form-item>
                    <el-button type="primary" @click="add">新增</el-button>
                </el-form-item>
                <el-form-item style="float: right;">
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
            <el-tree v-loading="loadingTree" class="tree" :data="dataSource" :show-checkbox="false" node-key="id"
                default-expand-all :expand-on-click-node="false">
                <template #default="{ node, data }">
                    <div class="custom-tree-node">
                        <span class="custom-label">{{ data.name }}</span>

                        <div class="custom-tree-op">
                            <el-button text type="primary" size="small" @click="openGoodsDrawer(data)"
                                :loading="data.GoodsDrawerLoading">
                                推荐商品
                            </el-button>

                            <el-switch :modelValue="data.status" :active-value="1" :inactive-value="0"
                                @change="handleStatusChange($event, data)" />
                            <el-button text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>
                            <el-popconfirm title="是否要删除该记录？" confirmButtonText="确认" cancelButtonText="取消"
                                @confirm="handleDelete(data)">
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
    </div>
</template>

<script setup>
import { Refresh } from '@element-plus/icons-vue'
import { computed, reactive, ref } from 'vue'
import { useStateStores } from '@/stores/stateStores'
import FormDrawer from './components/FormDrawer.vue.vue'
import { ElNotification } from 'element-plus'

const useState = useStateStores()
const { getCategory, Category } = useState
getCategory()

const form = reactive({
    name: ""
})

const formDrawerRef = ref(null)

const editId = ref(0);

const loadingTree = ref(false)

const drawerTitle = computed(() => editId.value ? "修改" : "新增");

const handleSubmit = () => {
    if (form.name.length == 0) {
        ElNotification.error({
            message: "分类名称不能为空"
        })
        return
    }

    formDrawerRef.value.showLoading()

    let opt = {}
    // console.log(editId.value);
    const fun = editId.value ? Category(2, opt = { name: form.name, id: editId.value }) : Category(1, opt = { name: form.name });

    fun.then(res => {
        ElNotification({
            title: '成功',
            message: drawerTitle.value + "成功",
            type: 'success',
        })
        formDrawerRef.value.close();
    }).finally(() => {
        formDrawerRef.value.hideLoading();
        reloadPages()
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
    Category(3, opt = { id: data.id })
        .then((res) => {
            ElNotification({
                title: '成功',
                message: "删除分类成功",
                type: 'success',
            })
        }).finally(() => {
            reloadPages()
        })
}

const handleStatusChange = (status, data) => {
    let opt = {}
    Category(4, opt = { id: data.id, status: status })
        .then((res) => {
            ElNotification({
                title: '成功',
                message: "更新分类商品状态成功",
                type: 'success',
            })
        }).finally(() => {
            reloadPages()
        })
}

const reloadPages = () => {
    loadingTree.value = true
    getCategory()
        .finally(() => {
            loadingTree.value = false
        })
}

const dataSource = computed(() => useState.categoryList)
</script>

<style lang="scss" >
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
</style>