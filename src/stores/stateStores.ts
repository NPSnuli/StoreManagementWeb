import { defineStore } from 'pinia'
import reuqest from '@/network/requset'
import { getTokenData } from '@/network/localStores'

export const useStateStores = defineStore('stateStore', {
  state: () => ({
    token: getTokenData(),
    cates: [],
    shopList: [],
    categoryList: [],
    totalSize: 0,
    collapse: false,
    activePage: localStorage.getItem('index') ?? ''
  }),
  getters: {},
  actions: {
    collapseToggle() {
      this.collapse = !this.collapse
      console.log('123')
    },
    setActivePage(active: String) {
      this.activePage = active
      localStorage.setItem('index', active)
    },
    login(username: String, password: String) {
      // console.log(username, password);
      return new Promise((resolve, rejects) => {
        reuqest
          .post('/login', {
            username: username,
            password: password
          })
          .then((res) => {
            this.token = res.data.token
            // console.log('res :>> ', this.token)
            resolve(res.data.token)
          })
          .catch((err) => {
            rejects(err)
          })
      })
    },
    getGoods(tab, title, category, limit, page) {
      //   console.log(this.token)
      return new Promise((resolve, rejects) => {
        reuqest
          .get(`/goods/${page}`, {
            params: {
              tab: tab,
              title: title,
              category_id: category,
              limit: limit
            }
          })
          .then((res) => {
            // console.log('res :>> ', res);
            this.cates = res.data.cates
            this.shopList = res.data.list
            this.totalSize = res.data.totalCount
            resolve()
          })
          .catch((err) => {
            rejects()
          })
      })
    },
    // state = 1新增， state = 2修改,  state = 3删除
    goods(state = 1, opt = {}) {
      return new Promise((resolve, rejects) => {
        let url = '/goods'
        switch (state) {
          case 2:
            url = `/goods/${opt?.id}`
            break
          case 3:
            url = '/goods/delete_all'
            break
        }
        reuqest
          .post(url, {
            title: opt?.title,
            category_id: opt?.category_id,
            cover: opt?.cover,
            desc: opt?.desc,
            unit: opt?.unit,
            stock: opt?.stock,
            min_stock: opt?.min_stock,
            status: opt?.status,
            stock_display: opt?.stock_display,
            min_price: opt?.min_price,
            min_oprice: opt?.min_oprice,
            content: opt?.content,
            ids: opt?.ids
          })
          .then((res) => {
            resolve()
          })
          .catch((err) => {
            rejects()
          })
      })
    },
    getCategory() {
      return new Promise((resolve, rejects) => {
        reuqest
          .get(`/category`, {})
          .then((res) => {
            // console.log('res :>> ', res.data)
            this.categoryList = res.data
            resolve()
          })
          .catch((err) => {
            rejects(err)
          })
      })
    },
    // state = 1新增， state = 2修改,  state = 3删除
    Category(state = 1, opt = {}) {
      let url = '/category'
      switch (state) {
        case 1:
          break
        case 2:
          url = `/category/${opt.id}`
          break
        case 3:
          url = `/category/${opt.id}/delete`
          break
        case 4:
          url = `/category/${opt.id}/update_status`
          break
      }
      return new Promise((resolve, rejects) => {
        reuqest({
          url: url,
          method: 'post',
          data: {
            name: opt?.name,
            status: opt?.status
          }
        })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            rejects(err)
          })
      })
    }
  }
})
