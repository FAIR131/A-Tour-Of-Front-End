import { createStore } from 'vuex'

export default createStore({
  state: {
    collect_films:[]
  },
  mutations: {
    add_collect_film:function(state,film){
      state.collect_films.push(film)
    }
  },
  actions: {
  },
  modules: {
  }
})
