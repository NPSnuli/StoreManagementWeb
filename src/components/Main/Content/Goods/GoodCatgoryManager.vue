<template>
    <div>
        <div class="form-box">
            <el-form inline class="form">
                <el-form-item>
                    <el-button type="primary" @click="add">新增</el-button>
                </el-form-item>
                <el-form-item style="float: right;">
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
            <el-table v-loading="loading" :data="tableData" table-layout="auto" height="600">
                <el-table-column type="selection" label="规格名称"></el-table-column>
                <el-table-column label="规格名称" prop="name"></el-table-column>
                <el-table-column label="规格值" width="320" prop="default" align="center"></el-table-column>
                <el-table-column label="排序" prop="order" align="center"></el-table-column>
                <el-table-column label="状态" prop="status" align="center">
                    <template #default="scope">
                        <el-switch :modelValue="scope.row.status" :active-value="1" :inactive-value="0"
                            @change="handleStatusChange($event, data)" />
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button type="text" size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button type="text" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="pages">
            <el-pagination class="pagination" background layout="prev, pager, next" :total="totalSize" :page-size="10"
                @current-change="PageChangeHandle" />
        </div>
    </div>

    <el-drawer ref="drawerRef" v-model="dialog" title="新增" direction="rtl" class="demo-drawer">
        <div class="demo-drawer__content">
            <el-form :model="form">
                <el-form-item label="规格名称" label-width="120">
                    <el-input v-model="form.name" autocomplete="off" />
                </el-form-item>
                <el-form-item label="排序" label-width="120">
                    <el-input-number v-model="form.num" :min="0" :max="999999" @change="handleChange" />
                </el-form-item>
                <el-form-item label="状态" label-width="120">
                    <el-switch v-model="form.status" />
                </el-form-item>
                <el-form-item label="规格值" label-width="120">
                    <el-tag v-for="tag in dynamicTags" :key="tag" class="mx-1" closable :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="ml-1 w-20" size="small"
                        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                    <el-button v-else class="button-new-tag ml-1" size="small" @click="showInput">
                        + New Tag
                    </el-button>
                </el-form-item>
            </el-form>
            <div class="demo-drawer__footer">
                <el-button type="primary" :loading="loading" @click="onClick">
                    {{ loading ? '提交中 ...' : '提交' }}</el-button>
                <el-button @click="cancelForm">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
import { useSkusStores } from '@/stores/skusStores'
import { computed, ref } from 'vue'

defineOptions({
    name: "goodCatgoryManager"
})

const useSkus = useSkusStores()

const loading = ref(false)

const dialog = ref(false)

const { getKusList, kusList } = useSkus

getKusList()

const tableData = computed(() => useSkus.skusList)

const totalSize = computed(() => useSkus.totalCount)

const refreshPage = () => {
    loading.value = true
    getKusList()
        .then(() => {
            loading.value = false
        })
}

const PageChangeHandle = (page) => {
    getKusList(page)
    refreshPage()
}

const add = () => {
    let opt = {}
    kusList(1, opt = {
        status: 1
    })
        .then((res) => {

        })
        .catch((err) => {

        })
}
</script>

<style></style>