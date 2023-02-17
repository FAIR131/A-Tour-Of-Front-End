<template>
    <ul class="film-list">
        <li v-for="item in films" :key="item.filmId">
            <img :src="item.poster" alt="" class="poster">
            <div>
                <h2>{{item.name}}</h2>
                <p>观众评分 {{item.grade}}</p>
                <p class="actor-name">
                    主演:
                    <span v-for="subItem,index in item.actors" :key="index"> {{subItem.name}} </span>
                </p>
                <p>{{item.nation}} | {{item.runtime}}分钟</p>
            </div>
            <button>购票</button>
        </li>
    </ul>
</template>

<script>
import axios from 'axios'
export default {
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