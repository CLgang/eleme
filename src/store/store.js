import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);
var eventHub = new Vue();
const store = new Vuex.Store({
  state: {
    addElement: ''
  },
  mutations: {
    addCart(state, el){
      state.addElement = el
    }
  },
  actions: {
    addCart(context, el){
      context.commit('addCart', el)
    }
  }
});

export default {
  store,
  eventHub
}
