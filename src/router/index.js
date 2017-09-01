
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const DevList = r => require.ensure([], () => r(require('@/components/DevList')), 'DevList');
const customerList = r => require.ensure([], () => r(require('@/components/customerList')), 'customerList');
const userInfo = r => require.ensure([], () => r(require('@/components/userInfo')), 'userInfo');
const orderList = r => require.ensure([], () => r(require('@/components/orderList')), 'orderList');
// const devMF = r => require.ensure([], () => r(require('@/components/DeviceManufacturers_mg')), 'devMF');
// const devList = r => require.ensure([], () => r(require('@/components/DeviceList_mg')), 'devList');
// const report = r => require.ensure([], () => r(require('@/components/Report_mg')), 'report');

export default new Router({
  routes: [
    {
      path: '/',
      name: 'plantMg',
      component:DevList
    },
    {
      path: '/customerList',
      name: 'customerList',
      component:customerList
    },
    {
      path: '/orderList',
      name: 'orderList',
      component:orderList
    },
    {
      path: '/userInfo',
      name: 'machineListMg',
      component:userInfo
    },
  ]
})
