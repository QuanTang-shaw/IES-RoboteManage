import Vue from 'vue'
import App from './App'
import router from './router'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import AMap from 'vue-amap';
Vue.use(AMap);
AMap.initAMapApiLoader({
  key: '1bb84eaae0945bcbba7876db7e167a01',
  plugin: [
	  'AMap.Autocomplete',
	  'AMap.PlaceSearch',
	  'AMap.Scale',
	  'AMap.OverView',
	  'AMap.ToolBar',
	  'AMap.MapType',
	  'AMap.PolyEditor',
	  'AMap.CircleEditor',
	  'MarkerClusterer'
  ]
});


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // render: h => h(iview)
})
