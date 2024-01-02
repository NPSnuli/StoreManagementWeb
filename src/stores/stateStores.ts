import { defineStore } from 'pinia'
import reuqest from '@/network/requset'
import { getTokenData } from '@/network/localStores'

export const useStateStores = defineStore("stateStore", {
    state: () => (
        {
            token: getTokenData(),
            cates: [],
            shopList: [],
            categoryList: [],
            totalSize: 0,
            collapse: false,
            activePage: localStorage.getItem("index") ?? ""
        }
    ),
    getters: {

    },
    actions: {
        collapseToggle() {
            this.collapse = !this.collapse
            console.log("123")
        },
        setActivePage(active: String) {
            this.activePage = active
            localStorage.setItem("index", active)
        },
        async login(username: String, password: String) {
            // console.log(username, password);            
            await reuqest.post("/login", {
                username: username,
                password: password
            })
                .then((res) => {
                    this.token = res.data.token
                    // console.log('res :>> ', this.token);
                })
        },
        async getGoods(tab, title, category, limit, page) {
            console.log(this.token);

            await reuqest.get(`/goods/${page}`, {
                params: {
                    tab: tab,
                    title: title,
                    category_id: category,
                    limit: limit,
                },
                headers: {
                    'token': this.token
                }
            })
                .then((res) => {
                    // console.log('res :>> ', res);
                    this.cates = res.data.cates
                    this.shopList = res.data.list
                    this.totalSize = res.data.totalCount
                })
        },
        async getCategory() {
            await reuqest.get(`/category`, {
                headers: {
                    'token': this.token
                }
            })
                .then((res) => {
                    console.log('res :>> ', res.data);
                    this.categoryList = res.data
                })
        },
        // state = 1新增， state = 2修改,  state = 3删除
        async Category(state = 1, opt = {}) {
            let url = "/category"
            switch (state) {
                case 1:            
                    break;
                case 2:
                    url = `/category/${opt.id}`
                    break;
                case 3:
                    url = `/category/${opt.id}/delete`
                    break;
                case 4:
                    url = `/category/${opt.id}/update_status`
                    break;
            }
            await reuqest({
                url: url,
                method: "post",
                data: {
                    name: opt?.name,
                    status: opt?.status
                },
                headers: {
                    'token': this.token
                }
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