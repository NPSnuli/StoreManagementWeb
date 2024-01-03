import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { getTokenData, setTokenData } from '@/network/localStores'
import Home from '@/components/Main/Content/Home.vue'
import GoodList from '@/components/Main/Content/Goods/GoodList.vue'
import GoodCatgory from '@/components/Main/Content/Goods/GoodCargory.vue'
import GoodCatgoryManager from '@/components/Main/Content/Goods/GoodCatgoryManager.vue'
import TicketManager from '@/components/Main/Content/Goods/ticketManager.vue'
import PictureCatgory from '@/components/Main/Content/Picture/PictureCargory.vue'
import PictureList from '@/components/Main/Content/Picture/PictureList.vue'
import UserLevel from '@/components/Main/Content/User/UserLevel.vue'
import UserList from '@/components/Main/Content/User/UserList.vue'
import Login from '@/components/Login/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: '/goodlist',
          component: GoodList
        },
        {
          path: '/goodcategory',
          component: GoodCatgory
        },
        {
          path: '/goodCatgoryManager',
          component: GoodCatgoryManager
        },
        {
          path: '/ticketManager',
          component: TicketManager
        },
        {
          path: '/userList',
          component: UserList
        },
        {
          path: '/userLevel',
          component: UserLevel
        },
        {
          path: '/pictureCatgory',
          component: PictureCatgory
        },
        {
          path: '/pictureList',
          component: PictureList
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      children: []
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && getTokenData() == null) {
    next({ name: 'login' })
    // router.replace('/login')
  } else {
    next()
  }
})

export default router
