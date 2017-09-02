
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const DevManage = r => require.ensure([], () => r(require('@/components/DevManage')), 'DevManage');
const DevList = r => require.ensure([], () => r(require('@/components/DevList')), 'DevList');
const monitor = r => require.ensure([], () => r(require('@/components/Monitor')), 'monitor');
const customerList = r => require.ensure([], () => r(require('@/components/customerList')), 'customerList');
const orderManage = r => require.ensure([], () => r(require('@/components/orderManage')), 'orderManage');
const orderList = r => require.ensure([], () => r(require('@/components/orderList')), 'orderList');
const userInfo = r => require.ensure([], () => r(require('@/components/userInfo')), 'userInfo');
const orderDetail = r => require.ensure([], () => r(require('@/components/orderDetail')), 'orderDetail');
// const report = r => require.ensure([], () => r(require('@/components/Report_mg')), 'report');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'plantMg',
      component:DevManage,
      children:[
        {
          path:'DevList',
          component:DevList
        },
        {
          path:'monitor',
          component:monitor
        },
      ]
    },
    {
      path: '/customerList',
      name: 'customerList',
      component:customerList
    },
    {
      path: '/orderManage',
      name: 'orderManage',
      component:orderManage,
      children:[
        {
          path:'orderList',
          component:orderList
        },
        {
          path:'orderDetail',
          component:orderDetail
        }
      ]
    },
    {
      path: '/userInfo',
      name: 'machineListMg',
      component:userInfo
    },
  ]
})
