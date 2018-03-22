import 'babel-polyfill';
import Vue from 'vue'
import App from './App'
import fastclick from 'fastclick'
import router from './router'
import VueLazyLoad from 'vue-lazyload'
import 'common/style/index.scss'
fastclick.attach(document.body);
Vue.config.productionTip = false
Vue.use(VueLazyLoad)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
