import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }]
  },
  {
    path: '/homeAdmin',
    component: Layout,
    redirect: '/homeAdmin/home',
    name: '网站管理',
    meta: {
      title: '网站管理',
      icon: 'guide'
    },
    children: [
      {
        path: 'banner',
        name: 'banner管理',
        component: () => import('@/views/homeAdmin/banner'),
        meta: { title: 'banner管理', noCache: true }
      },
      {
        path: 'home',
        name: '酒店介绍管理',
        component: () => import('@/views/homeAdmin/home'),
        meta: { title: '酒店介绍管理', noCache: true }
      },
      {
        path: 'stage',
        name: '首页一期一会管理',
        component: () => import('@/views/homeAdmin/stage'),
        meta: { title: '首页一期一会管理', noCache: true }
      },
      {
        path: 'food',
        name: '首页一隅一食管理',
        component: () => import('@/views/homeAdmin/food'),
        meta: { title: '首页一隅一食管理', noCache: true }
      }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'Member',
    children: [{
      path: 'Member',
      component: () => import('@/views/Member/index'),
      name: 'Member',
      meta: { title: '会员管理', icon: 'user', noCache: true }
    }]
  },
  {
    path: '/shoppingAdmin',
    component: Layout,
    redirect: 'shoppingAdmin',
    meta: {
      title: '商城管理',
      icon: 'shoppingCard'
    },
    children: [{
      path: 'footshopping',
      component: () => import('@/views/shopping/footshopping'),
      name: 'footshopping',
      meta: { title: '食品列表' }
    },
    {
      path: 'shopping',
      component: () => import('@/views/shopping/shopping'),
      name: 'shopping',
      meta: { title: '商品列表' }
    },
    {
      path: 'addshopping/:id',
      component: () => import('@/views/shopping/addshopping'),
      name: 'addshopping',
      meta: { title: '商品管理', noCache: true },
      hidden: true
    }
    ]
  },
  {
    path: '/integralshopping',
    component: Layout,
    redirect: 'integralshopping',
    children: [{
      path: 'integralshopping',
      component: () => import('@/views/integralshopping/index'),
      name: 'integralshopping',
      meta: { title: '积分商城管理', icon: 'nested', noCache: true }
    },
    {
      path: 'addintegralshopping/:id',
      component: () => import('@/views/integralshopping/integral'),
      name: 'addintegralshopping',
      meta: { title: '积分商品管理' },
      hidden: true
    }]
  },
  {
    path: '/order',
    component: Layout,
    redirect: '/order/order',
    name: '订单管理',
    meta: {
      title: '订单管理',
      icon: 'form'
    },
    children: [{
      path: 'shopingorder',
      component: () => import('@/views/order/order'),
      name: 'shopingorder',
      meta: { title: '商城订单管理' }
    },
    {
      path: 'integralsorder',
      component: () => import('@/views/order/integralsorder'),
      name: 'integralsorder',
      meta: { title: '积分订单管理' }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'discount',
    children: [{
      path: 'discount',
      component: () => import('@/views/discount/index'),
      name: 'discount',
      meta: { title: '优惠券管理', icon: 'money', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: '/service',
    name: '服务管理',
    meta: {
      title: '服务管理',
      icon: 'email'
    },
    children: [{
      path: 'service',
      component: () => import('@/views/service/reserve'),
      name: 'service',
      meta: { title: '预约管理' }
    },
    {
      path: 'problem',
      component: () => import('@/views/service/problem'),
      name: 'problem',
      meta: { title: '问题管理' }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'admin',
    children: [{
      path: 'admin',
      component: () => import('@/views/admin/index'),
      name: 'admin',
      meta: { title: '管理员管理', icon: 'component', noCache: true }
    }]
  },
  {
    path: '',
    component: Layout,
    redirect: 'system',
    children: [{
      path: 'system',
      component: () => import('@/views/system/index'),
      name: 'system',
      meta: { title: '系统管理', icon: 'lock', noCache: true }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

