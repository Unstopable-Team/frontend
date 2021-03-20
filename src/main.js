import constants from "@/constants";

import Vue from 'vue'
import App from './App.vue'

//https://github.com/dmtrbrl/vue-trend-chart
import TrendChart from "vue-trend-chart";


//https://www.npmjs.com/package/vue-axios-jwt
//import VueAxiosJwt from 'vue-axios-jwt';

//Vue.use(VueAxiosJwt);

//set up axios JWT Handler
//const axiosJwtHandler = new VueAxiosJwt({refresh_endpoint: '/api/v1/auth/token/refresh/'});

import VueRouter from 'vue-router'

//Data store
import store from './store/store.js';

//Style
import './assets/styles/index.css';

//Pages
import Homepage from "./views/HomePage";
import LoginPage from './views/LoginPage.vue'

 //SOCKETS IMPLEMENTATION

//https://www.npmjs.com/package/vue-socket.io
//import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
if(constants.USE_WEBSOCKETS) {

  //localStorage.debug = '*';

  const socketConnection = SocketIO(constants.SOCKETIO_ENDPOINT,{
    path: "/socket.io"
  });

  socketConnection.on("connect", () => {
    console.log("connected", socketConnection.id); // x8WIv7-mJelg7on_ALbx
    socketConnection.emit("hello", "world");
  });

  socketConnection.on("data", (data) => {
    console.log("received",data)
  });

  socketConnection.on("disconnect", () => {
    console.log("disconnect", socketConnection.id); // x8WIv7-mJelg7on_ALbx

  });

  /*socketConnection.on('connect', function (msg) {
    console.log("connected",msg);
  })*/

  /*Vue.use(new VueSocketIO({
    debug: true,
    connection: socketConnection,
    vuex: {
      store,
      //actionPrefix: 'SOCKET_',
      //mutationPrefix: 'SOCKET_'
    },
    //options: {path: "/forecast"} //Optional options
  }))*/
}

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
