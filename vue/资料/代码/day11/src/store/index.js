import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser:{}
  },
  getters: {
  },
  mutations: {
    init_current_user:function(state,user){
      // state.currentUser=user;
      for (const key in user) {
        state.currentUser[key]=user[key]
      }
    },
    clear_current_user:function(state){
      state.currentUser={};
    }
  },
  actions: {
  },
  modules: {
  }
})
