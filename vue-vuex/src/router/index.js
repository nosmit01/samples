import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'projects',
      component: () => import('@/components/projects/ProjectList')
    },
    {
      path: '/details/:id/',
      name: 'details',
      component: () => import('@/components/projects/ProjectDetail')
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (!from.path || from.path === '/') {
    store.dispatch('routing/startLoading')
  }
  next()
})

router.afterEach(() => {
  store.dispatch('routing/stopLoading')
})

export default router
