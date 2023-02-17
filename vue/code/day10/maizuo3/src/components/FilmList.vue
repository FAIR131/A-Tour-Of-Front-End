<template>
  <ul class="filmList">
    <li v-for="item in films" :key="item.filmId" >
      <img :src="item.poster" alt="" class="poster">
      <div>
        <h2>{{item.name}}</h2>
        <p>观众评分 {{item.grade}}</p>
        <p class="actorName">
          主演:
          <span v-for="(actor,index) in item.actors" :key="index"> {{actor.name}} </span>
        </p>
        <p>{{item.nation}} | {{item.runtime}}</p>
      </div>
      <button class="btn" @click="addFilms(item)" v-if="mode===1">收藏</button>
      <button class="btn" @click="delFilms(item.filmId)" v-else>取消收藏</button>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Filmstste",
  props:{
    films:{
      type:Array,
      default:[]
    },
    mode:{
      type:Number,
      default: 1
    }
  },
  methods:{
    addFilms(film) {
      this.$store.commit('add_collect_film',film)
    },
    delFilms(filmId) {
      this.$store.commit('del_collect_film',filmId)
    },
  }
}
</script>

<style scoped>
.filmList{
  position: absolute;
  width: 100%;
  bottom: 53px;
  top: 53px;
  overflow: scroll;
}
.poster{
  margin-left: 10px;
  margin-right: 0;
  width: 66px;
  height: 92px;
}

.filmList li{
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 15px;
}

.filmList li .actorName{
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.filmList li div{
  width:210px;
  color: #797d82;
}

.filmList li h2{
  font-size: 16px;
  font-weight: normal;
  text-align: left;
  color: #000;
}

.filmList li p{
  font-size: 12px;
  text-align: left;
}

.btn{
  width: 70px;
  height: 25px;
  border: 1px solid #ff5f16;
  background-color: white;
  color: #ff5f16;
  margin-right: 15px;
}
</style>