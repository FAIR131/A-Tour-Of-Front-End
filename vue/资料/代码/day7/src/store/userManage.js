export default {
    namespaced:true,//开启命名空间
    state:{
        currentUser:{username:"zhangsan",age:20}
    },
    mutations:{
        init_current_user:function(state,user){
            state.currentUser=user;
        }
    },
    actions:{

    }
}
