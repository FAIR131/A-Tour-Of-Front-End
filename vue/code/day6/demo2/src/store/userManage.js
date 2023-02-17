export default {
    //开启命名空间
    namespaced:true,
    state: {
        currentUser: {username:'zs',age:18}
    },
    mutations: {
        init_current_user(state, user) {
            state.currentUser = user
        }
    },
    actions:{}
}