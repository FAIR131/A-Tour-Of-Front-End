import { createStore } from 'vuex'

export default createStore({
  state: {
    collect_films:[]
  },
  getters: {
  },
  mutations: {
    add_collect_films(state,film){
      state.collect_films.push(film)
    }
  },
  actions: {
  },
  modules: {
  }
})
