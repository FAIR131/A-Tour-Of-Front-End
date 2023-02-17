import {INCREMENT,DECREMENT,CHANGE_NAME,CHANGE_AGE,ADD_FILM,DEL_FILM} from './actionTypes'
export function add_film(film){
    return {type:ADD_FILM,film}
}
export function del_film(film){
    return {type:DEL_FILM,film}
}