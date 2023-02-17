<template>
  <ul class="film-list">
    <li v-for="item in films" :key="item.filmId">
      <img :src="item.poster" alt="" class="poster" />
      <div>
        <h2>{{ item.name }}</h2>
        <p>观众评分 {{ item.grade }}</p>
        <p class="actor-name">
          主演:
          <span v-for="(subItem, index) in item.actors" :key="index">
            {{ subItem.name }}
          </span>
        </p>
        <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
      </div>
      <button @click="addFilm(item)" v-if="mode===1">收藏</button>
      <button @click="delFilm(item.filmId)" v-else>取消收藏</button>
    </li>
  </ul>
</template>

<script>
export default {
    props:{
        films:{
            type:Array,
            default:[]
        },
        mode:{
            type:Number,
            default:1
        }
    },
    methods:{
        addFilm:function(film){
            this.$store.commit("add_collect_film",film)
        },
        delFilm:function(filmId){
            this.$store.commit("del_collect_film",filmId)
        }
    }
};
</script>

<style>
.film-list li{
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom:10px;
}
.film-list li div{
    width:210px;
}
.film-list li .actor-name{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.film-list li h2{
    font-size: 16px;
    text-align: left;
}
.film-list li p{
    font-size:13px;
    text-align: left;
}
</style>