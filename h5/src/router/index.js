import Vue from 'vue'
import Router from 'vue-router'
import Settiing from '@/pages/setting/setting'

import SetType from '@/pages/setting/set-type'
import SetSubType from '@/pages/setting/set-sub-type'
import SetMotion from '@/pages/setting/set-motion'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/setting',
      name: 'Settiing',
      component: Settiing
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
      path: '/set-motion',
      name: 'SetMotion',
      component: SetMotion
    }
  ]
})
