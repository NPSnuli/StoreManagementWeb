import { defineStore } from 'pinia'
import request from '@/network/requset'

export const useSkusStores = defineStore("stateSkus", {
    state: () => (
        {
            skusList: [],
            totalCount: 0
        }
    ),
    getters: {

    },
    actions: {
        async getKusList(page = 1) {
            await request.get(`/skus/${page}`)
                .then((res) => {
                    const data = res.data
                    this.skusList = data.list
                    this.totalCount = data.totalCount
                })
        },
        // state : 1 = 增加 2 = 修改商品规格 3 = 修改商品规格状态 4 = 删除
        async kusList(state = 1, opt = {}) {
            let url = "/skus"
            switch (state) {
                case 1:
                    break;
                case 2:
                    url = "/skus/223"
                    break;
                case 3:
                    url = "/skus/214/update_status"
                    break;
                case 4:
                    url = "/skus/delete_all"
                    break;
            }
            await request.post(url, {
                status: opt?.status,
                name: opt?.name,
                order: opt?.order,
                default: opt?.default,
                ids: opt?.ids
            })
            .then((res) => {
                return Promise.resolve(res)
            })
            .catch((err) => {
                return Promise.reject(err)
            })
        }
    }
})