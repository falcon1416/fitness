import Vue from 'vue'
import Vonic from 'vonic'

// Page Components
import List from './pages/type/List.vue'

// Routes
const routes = {
  '/': {
    component: List
  }
}

Vue.use(Vonic.app, {mode: 'history', routes: routes, defaultRouteUrl: '/'})

