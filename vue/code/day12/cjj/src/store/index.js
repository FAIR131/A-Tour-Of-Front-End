import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentUser: {}
    },
    getters: {},
    mutations: {
        init_current_users(state, user) {
            // state.currentUser=user
            //  把属性一个个拿出来，方便后面增加属性
            for (const key in user) {
                state.currentUser[key] = user[key]
            }
        },
        clear_current_users(state) {
          state.currentUser={}
        }
    },
    actions: {},
    modules: {}
})
