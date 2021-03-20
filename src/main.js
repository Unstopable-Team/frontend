import Vue from 'vue'
import App from './App.vue'
//https://github.com/dmtrbrl/vue-trend-chart
import TrendChart from "vue-trend-chart";

import VueRouter from 'vue-router'
//Data store
import store from './store/store.js';
//Style
import './assets/styles/index.css';
//Pages
import Homepage from "./views/HomePage";
import LoginPage from './views/LoginPage.vue'

Vue.use(VueRouter);
Vue.use(TrendChart);

Vue.config.productionTip = false

//page routes
const routes = [
  { path: '/', component: Homepage },
  { path: '/login', component: LoginPage }
]

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
