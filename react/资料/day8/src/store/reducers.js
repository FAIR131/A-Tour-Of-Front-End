import {INCREMENT,DECREMENT,CHANGE_NAME,CHANGE_AGE,ADD_FILM,DEL_FILM} from './actionTypes'
import {combineReducers} from 'redux'
function countReducer(state = 0, action) {
    switch (action.type) {
        case INCREMENT:
            state += 1;
            return state;
        case DECREMENT:
            state -= 1;
            return state;
        default:
            return state;
    }
}

function userReducer(state = {username: "zhangsan",age: 20},action) {
    let newState=JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case CHANGE_NAME:
            newState.username=action.username;
            return newState;
        case CHANGE_AGE:
            newState.age=action.age;
            return newState;
        default:
            return newState;
    }
}

function filmReducer(state=[],action){
    let newState=JSON.parse(JSON.stringify(state))
    switch (action.type) {
        case ADD_FILM:
            newState.push(action.film);
            return newState;
        case DEL_FILM:
            newState.splice(state.indexOf(action.film),1)
            return newState;
        default:
            return newState;
    }
}

function initFilmReducer(state=[],action){
    let newState=JSON.parse(JSON.stringify(state))
    switch(action.type){
        case "INIT_FILMS":
            newState=action.films
            return newState;
        default:
            return newState;
    }
}

// 合并子reducer
export default combineReducers({
    count:countReducer,
    user:userReducer,
    collect_films:filmReducer,
    init_films:initFilmReducer
})