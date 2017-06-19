import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  count: 0,
  connect : false,
  hello : '',
  temperature : 0
}

const mutations = {
  INCREMENT (state) {
    state.count++
  },
  DECREMENT (state) {
    state.count--
  },
  SOCKET_CONNECT : (state,  status ) => {
    state.connect = true;
  },
  SOCKET_HELLO : (state,  status ) => {
    state.hello = status
  },
  SOCKET_TEMPERATURE : (state,  status ) => {
    state.temperature =  status
  }
}

let intervalId;
const actions = {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('INCREMENT')
    }, 300)
  },
  autoIncrement({ commit }) {
    intervalId = setInterval(() => {
      commit('INCREMENT')
    }, 300)
  },
  autoIncrementStop({ commit }) {
    clearInterval(intervalId);
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions
})

export default store
