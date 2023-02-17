import { INCREMENT, DECREMENT, CHANGE_NAME, CHANGE_AGE, ADD_FILM, DEL_FILM } from './actionTypes'
import http from '../utils/request'
export function add_film(film) {
    return { type: ADD_FILM, film }
}
export function del_film(film) {
    return { type: DEL_FILM, film }
}

export function init_films() {
    return (dispatch) => {
        http.get("/?cityId=330100&pageNum=1&pageSize=10&type=1&k=368546").then(res => {
            dispatch({type:"INIT_FILMS",films:res.data.data.films})
        })
    }
}