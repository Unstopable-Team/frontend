import constants from "@/constants";

import Vue from 'vue'
import App from './App.vue'

//https://github.com/dmtrbrl/vue-trend-chart
import TrendChart from "vue-trend-chart";
//https://www.npmjs.com/package/vue-socket.io
import VueSocketIO from 'vue-socket.io'


import VueRouter from 'vue-router'
//Data store
import store from './store/store.js';
//Style
import './assets/styles/index.css';
//Pages
import Homepage from "./views/HomePage";
import LoginPage from './views/LoginPage.vue'


Vue.use(new VueSocketIO({
  debug: true,
  connection: constants.SOCKETIO_ENDPOINT,
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  },
  options: { path: "/" } //Optional options
}))

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
