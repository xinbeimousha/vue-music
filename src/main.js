import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import 'common/style/index.scss'
import store from './store'
fastclick.attach(document.body);
Vue.config.productionTip = false
Vue.use(VueLazyLoad)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
