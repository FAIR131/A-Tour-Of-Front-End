<template>
    <FilmList :films="films"></FilmList>
</template>

<script>
import axios from 'axios'
import FilmList from '../../components/FilmList.vue'
export default {
    components:{
        FilmList
    },
    data:function(){
        return {
            films:[]
        }
    },
    mounted:function(){
        axios.defaults.headers['X-host']="mall.film-ticket.film.list";
        axios.get("https://m.maizuo.com/gateway?cityId=330100&pageNum=1&pageSize=10&type=1&k=368546").then(res=>{
            this.films=res.data.data.films;
        })
    }
}
</script>

<style>
.poster{
    width:66px;
    height:92px;
}
</style>