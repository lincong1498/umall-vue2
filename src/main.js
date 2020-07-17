// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
Vue.use(Mint);
import "mint-ui/lib/style.css"
import axios from 'axios'
import store from './store'
import http from './common/js/http'
Vue.prototype.axios = axios;
Vue.prototype.http = http;

Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  // watch: {
  //   '$route':function(to){
  //     if(to.path=='/cart'){
  //       this.getCartList();
  //     }
  //   }
  // },
})
