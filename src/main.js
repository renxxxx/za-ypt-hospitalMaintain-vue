// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import common from './components/common.js'
import './assets/rest.css'
import axios from 'axios' 
import qs from 'qs';  
moment.locale('zh-cn');
Vue.prototype.moment = moment;
Vue.prototype.$version = '1.0.2009191433'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios,axios);
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$common = common


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
