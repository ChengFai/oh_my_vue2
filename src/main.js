import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import * as echarts from "echarts";
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.prototype.echarts = echarts;

new Vue({
  router,
  store,
  //i18n,
  render: h => h(App)
}).$mount('#app')

Vue.use(ElementUI);
