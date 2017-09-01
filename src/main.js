import Vue from 'vue'
import App from './App'
// import iview from './App'
import router from './router'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';



// Vue.use(ElementUI)
Vue.use(iView)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
  // render: h => h(iview)
})
