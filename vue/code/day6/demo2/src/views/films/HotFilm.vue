<template>
  <!--- <div>
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
        <button class="btn" @click="addFilms(item)">收藏</button>
      </li>
    </ul>

  </div>-->
  <FilmList :films="films"></FilmList>
</template>

<script>
import axios from 'axios'
import FilmList from "@/components/FilmList";
export default {
  name: "HotFilm",
  components:{
    FilmList
  },
  data(){
    return {
      films:[]
    }
  },
  mounted() {
    axios.defaults.headers['x-host']='mall.film-ticket.film.list'
    axios.get('https://m.maizuo.com/gateway?cityId=330100&pageNum=1&pageSize=10&type=1&k=8339285').then(res=>{
      this.films=res.data.data.films;
      // console.log(this.films)
    })
  },
}
</script>

<style scoped>
/*.filmList{
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
  width: 50px;
  height: 25px;
  border: 1px solid #ff5f16;
  background-color: white;
  color: #ff5f16;
  margin-right: 15px;
}*/

</style>