import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('../components/pages/index'),
      children: [
        {
          path: 'cart',
          component: () => import('../components/pages/cart'),
        },
        {
          path: 'home',
          component: () => import('../components/pages/home'),
        },
        {
          path: 'cate',
          component: () => import('../components/pages/cate'),
        },
        {
          path: 'me',
          component: () => import('../components/pages/me'),
        },
        {
          path: 'goodsList',
          component: () => import('../components/pages/goodsList'),
        },
        {
          path: 'goodsInfo',
          component: () => import('../components/pages/goodsInfo'),
        },
        {
          path: 'login',
          component: () => import('../components/pages/login'),
        },
        {
          path: 'register',
          component: () => import('../components/pages/register'),
        },
        {
          path: '*',
          redirect:'/home'
        }
      ],
    },
    
  ]
})
