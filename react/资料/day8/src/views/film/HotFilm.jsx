import React, { Component } from 'react';
// import http from '../../utils/request'
import './hotFilm.css'
import {add_film,init_films} from '../../store/actions'
import {connect} from 'react-redux'
class HotFilm extends Component {

    componentDidMount(){
        this.props.page_init_films(init_films())
    }
    render() {

        return (
            <>
                <ul className='film-list'>
                    {
                        this.props.films.map(item=>{
                            return  (<li key={item.filmId} style={{margin:"10px auto"}}>
                                <img src={item.poster} alt="" width={66}/>
                                <p>
                                    {item.name}
                                </p>
                                <button onClick={()=>{
                                    // store.dispatch(add_film(item))
                                    this.props.add_collect_film(item)
                                }}>收藏</button>
                            </li>)
                        })
                    }
                </ul>
            </>
        );
    }
}

export default connect(
    (state)=>{
        return {
            films:state.init_films
        }
    },
    (dispatch)=>{
        return {
            add_collect_film:(film)=>{
                dispatch(add_film(film))
            },
            page_init_films:()=>{
                dispatch(init_films())
            }
        }
    }
)(HotFilm); 