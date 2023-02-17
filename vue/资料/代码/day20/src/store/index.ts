import { createStore } from 'vuex'
import {filmType,stateType} from '../types'
export default createStore({
  state: {
    collect_films:[]
  } as stateType,
  mutations: {
    add_collect_film:function(state,film:filmType){
      state.collect_films.push(film)
    }
  },
  actions: {
  },
  modules: {
  }
})
