import { defineStore } from 'pinia'
import request from '@/network/requset'

export const useUserStores = defineStore('userStores', {
  state: () => ({
    user_level: [],
    list: [],
    totalCount: 0
  }),
  getters: {},
  actions: {
    getUserList(page: Number = 1, opt = {}) {
      return new Promise((resolve, reject) => {
        request
          .get(`/user/${page}`, {
            params: {
              limit: opt?.limit,
              keyword: opt?.keyword,
              user_level_id: opt?.user_level_id
            }
          })
          .then((res) => {
            const data = res.data
            if (!data) return
            this.totalCount = data.totalCount
            this.user_level = data.user_level
            this.list = data.list
            resolve()
          })
          .catch((err) => {
            reject()
          })
      })
    },
    // state = 1 增加  2 修改用户 3 修改用户状态 4 删除用户
    user(state = 1, opt = {}) {
      return new Promise((resolve, reject) => {
        let url = `/user`
        switch (state) {
          case 2:
            url = `/user/${opt?.id}`
            break
          case 3:
            url = `/user/${opt?.id}/update_status`
            break
          case 4:
            url = `/user/${opt?.id}/delete`
            break
        }
        request
          .post(url, {
            username: opt?.username,
            password: opt?.password,
            status: opt?.status,
            nickname: opt?.nickname,
            phone: opt?.phone,
            email: opt?.email,
            avatar: opt?.avatar,
            user_level_id: opt?.user_level_id
          })
          .then((res) => {
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
})
