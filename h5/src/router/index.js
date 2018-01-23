import Vue from 'vue'
import Router from 'vue-router'
import Settiing from '@/pages/setting/setting'

import SetType from '@/pages/setting/set-type'
import SetSubType from '@/pages/setting/set-sub-type'
import SetMotion from '@/pages/setting/set-motion'
import AddType from '@/pages/setting/add-type'
import AddMotion from '@/pages/setting/add-motion'
import UserList from '@/pages/user/list'
import UserInfo from '@/pages/user/info'
import AddBody from '@/pages/user/add-body'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/setting',
      name: 'Settiing',
      component: Settiing
    },
    {
      path: '/add-type',
      name: 'AddType',
      component: AddType
    },
    {
      path: '/set-type',
      name: 'SetType',
      component: SetType
    },
    {
      path: '/set-sub-type',
      name: 'SetSubType',
      component: SetSubType
    },
    {
      path: '/add-motion',
      name: 'AddMotion',
      component: AddMotion
    },
    {
      path: '/set-motion',
      name: 'SetMotion',
      component: SetMotion
    },
    {
      path: '/user-list',
      name: 'UserList',
      component: UserList
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      component: UserInfo
    },
    {
      path: '/user-add-body',
      name: 'AddBody',
      component: AddBody
    }
  ]
})
