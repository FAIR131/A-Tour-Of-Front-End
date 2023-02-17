import Vue from 'vue'
import Vuex from "vuex";
import user from './userManage'
Vue.use(Vuex)
//2.创建实例
const store = new Vuex.Store({
    state:{
        count:0,
        currentUser:{},
        collect_films:[]
    },
    mutations:{
        //mutations中的方法是直接修改state数据，并且立即执行，所以无法正确执行异步操作
        increment(state,num=1){
            state.count+=num
        },
        init_current_user(state,user){
            state.currentUser=user
        },
        add_collect_film(state,film){
          if(state.collect_films.indexOf(film)===-1){
              state.collect_films.push(film)
          }
        },

        del_collect_film(state,filmId){
            state.collect_films.forEach((item,index)=>{
              if( item.filmId ===filmId){
                  state.collect_films.splice(index,1)
              }
            })
        },
    },

    actions: {
        //actions中的方法不能直接修改state数据，需要借助mutation去修改，它可以执行异步操作
        increment(context, num = 1) {
            // console.log(context)
            setTimeout(() => {
                context.commit('increment', num)
            }, 1000)
        }
    },
    getters:{//获取state中的数据，并进行加工
        myCount(state){
            return  state.count+'元'
        }
    },
    modules:{
        user
    }
})

export default  store