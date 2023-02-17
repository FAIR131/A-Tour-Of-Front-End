<template>
  <div>
    <div>
      我的
    </div>
    <button @click="toNews">去新闻页</button>
    <!--获取vuex中的数据-->
    <!--    <p>count : {{ $store.state.count }}</p>-->
    <hr>
    <!--    <p>主模块中的user:{{ $store.state.user.currentUser.username }}-->
    <p>主模块中的user:{{ currentUser.username }}</p>
    <!--    <p>子模块中的user:{{ $store.state.user.currentUser.username }}-->
    <p>子模块中的user:{{ myUser.username }}</p>
    <hr>
    <button @click="changeCount">修改值</button>
    <button @click="updateUser">修改current值</button>
    <hr>
    <!--    <ul class="filmList">
          <li v-for="item in $store.state.collect_films" :key="item.filmId">
            <img :src="item.poster" alt="" class="poster">
            <div>
              <h2>{{ item.name }}</h2>
              <p>观众评分 {{ item.grade }}</p>
              <p class="actorName">
                主演:
                <span v-for="(actor,index) in item.actors" :key="index"> {{ actor.name }} </span>
              </p>
              <p>{{ item.nation }} | {{ item.runtime }}</p>
            </div>
            <button class="btn" @click="addFilms(item)">收藏</button>
          </li>
        </ul>

      -->
    <!--    <FilmList :films="$store.state.collect_films" :mode="2"></FilmList>-->
    <FilmList :films="collect_films" :mode="2"></FilmList>
    <p>count的值：{{ count }}</p>
  </div>
</template>

<script>
import FilmList from "@/components/FilmList";
import {mapState, mapMutations} from 'vuex'

export default {
  name: "Mine",
  components: {
    FilmList
  },
  computed: {
    //  数组写法
    ...mapState(['collect_films', 'count', 'currentUser']),
    // 对象写法
    ...mapState('user', {
      myUser: (state) => {
        return state.currentUser
      },
    }),
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapMutations('user', ['init_current_user']),
    toNews() {
      // this.$router.push('/news')
      // this.$router.push('/news/abc456')

      //  通过命名路由也可以跳转
      //   this.$router.push({name:'xinwen'})
      // this.$router.push({name: 'xinwen', params: {id: 'haha123'}})

      // 通过query方式跳转到目标页面后,可以通过路由对象中的currentRoute中的query去获取
      // console.log(this.$router.currentRoute.query);

      console.log(this.collect_films)
    },
    changeCount() {
      /*     console.log(this.$store)
           //  通过store上的commit方法可以调用mutation函数
           this.$store.commit('increment', 10)*/

      this.increment(10)
    },
    updateUser() {
      // 调用主模块中的方法
      // this.$store.commit("init_current_user",{username:"lisi",age:30})
      // 调用子模块中的方法,在方法名前加上模块名称
      // this.$store.commit('user/init_current_user', {username: 'ls', age: 20})
      this.init_current_user({username: 'ls', age: 30})
    }
  }
}
</script>

<style scoped>
.filmList {
  position: absolute;
  width: 100%;
  bottom: 53px;
  top: 153px;
  overflow: scroll;
}
</style>