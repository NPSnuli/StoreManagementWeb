import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '@/components/Main/Content/Home.vue'
import GoodList from '@/components/Main/Content/Goods/GoodList.vue'
import GoodCatgory from '@/components/Main/Content/Goods/GoodCargory.vue'
import GoodCatgoryManager from '@/components/Main/Content/Goods/GoodCatgoryManager.vue'
import TicketManager from '@/components/Main/Content/Goods/ticketManager.vue'
import PictureCatgory from '@/components/Main/Content/Picture/PictureCargory.vue'
import PictureList from '@/components/Main/Content/Picture/PictureList.vue'
import UserLevel from '@/components/Main/Content/User/UserLevel.vue'
import UserList from '@/components/Main/Content/User/UserList.vue'

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
    }
  ]
})

export default router
