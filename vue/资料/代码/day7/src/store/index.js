// 1、引入并挂载
import Vue from 'vue'
import Vuex from 'vuex'
import user from './userManage'
Vue.use(Vuex)

// 2、创建实例
export default new Vuex.Store({
    state:{
      count:0,
      currentUser:{}
    },
    mutations:{
        // mutations中的方法是直接修改state数据,并且是立即执行,所以无法正确执行异步操作
      increment:function(state,num=1){
        // setTimeout(()=>{
            state.count+=num;
        // },1000)
      },
      init_current_user:function(state,user){
        state.currentUser=user
      }
    },
    actions:{
        // actions中的方法不能直接修改state数据,需要借助mutations函数去修改,它可以执行异步操作
        increment:function(context,num=1){
            console.log(context);
            setTimeout(()=>{
                context.commit("increment",num)
            },1000)
        }
    },
    getters:{//获取state中的数据,并进行进一步加工
        myCount:function(state){
            return state.count+"元"
        }
    },
    modules:{
        user
    }
  })
  