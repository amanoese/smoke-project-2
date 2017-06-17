import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'

import socketio from 'socket.io-client';
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio,socketio('http://localhost:4000/'),store);

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
