import { useState,useEffect } from 'react'
import axios from 'axios'
export function useData(){
    let [films,setFilms]=useState([]);
    useEffect(()=>{
        axios.defaults.headers["X-host"]="mall.film-ticket.film.list"
        axios.get("https://m.maizuo.com/gateway?cityId=330100&pageNum=1&pageSize=10&type=1&k=368546").then(res=>{
            setFilms(res.data.data.films)
        })
    },[])
    return [films,setFilms];
}