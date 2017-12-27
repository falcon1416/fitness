// import Vue from 'vue'
// import Vonic from 'vonic'

// // Page Components
// import List from './pages/type/List.vue'

// // 引用API文件
// import api from './utils/api.js'
// // 将API方法绑定到全局
// Vue.prototype.$api = api

// // Routes
// const routes = {
//   '/': {
//     component: List
//   }
// }

// Vue.use(Vonic.app, {mode: 'history', routes: routes, defaultRouteUrl: '/'})


import Vue from 'vue'
import Vonic from 'vonic/src/index.js'

// Page Components
import List from './pages/type/List.vue'

// 引用API文件
import api from './utils/api.js'
// 将API方法绑定到全局
Vue.prototype.$api = api

// Routes
const routes = [
  { path: '/', component: List },
]

Vue.use(Vonic.app, {
  mode: 'history', 
  routes: routes
})
