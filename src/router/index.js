
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const devManage = r => require.ensure([], () => r(require('@/components/DevManage')), 'DevManage');
const devList = r => require.ensure([], () => r(require('@/components/DevList')), 'DevList');
const monitor = r => require.ensure([], () => r(require('@/components/Monitor')), 'monitor');
const customerList = r => require.ensure([], () => r(require('@/components/customerList')), 'customerList');
const orderManage = r => require.ensure([], () => r(require('@/components/orderManage')), 'orderManage');
const orderList = r => require.ensure([], () => r(require('@/components/orderList')), 'orderList');
const userInfo = r => require.ensure([], () => r(require('@/components/userInfo')), 'userInfo');
const orderDetail = r => require.ensure([], () => r(require('@/components/orderDetail')), 'orderDetail');
const mapNav = r => require.ensure([], () => r(require('@/components/mapNav')), 'mapNav');
const addOrder = r => require.ensure([], () => r(require('@/components/addOrder')), 'addOrder');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'plantMg',
      component:devManage,
      children:[
        {
          path:'devList',
          component:devList
        },
        {
          path:'monitor/:devID',
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
          path:'orderDetail/:orderID',
          component:orderDetail
        },
        {
          path:'addOrder',
          component:addOrder
        }
      ]
    },
    {
      path: '/mapNav',
      name: 'mapNav',
      component:mapNav
    },
    {
      path: '/userInfo',
      name: 'machineListMg',
      component:userInfo
    },
  ]
})
