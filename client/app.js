import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import App from './components/App'
import router from './router'
import store from './store'
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:4000');

sync(store, router)

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
