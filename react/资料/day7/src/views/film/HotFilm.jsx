import React, { Component } from 'react';
import http from '../../utils/request'
import './hotFilm.css'
import {add_film} from '../../store/actions'
import {connect} from 'react-redux'
class HotFilm extends Component {

    state={
        films:[]
    }

    componentDidMount(){
        http.get("/?cityId=330100&pageNum=1&pageSize=10&type=1&k=368546").then(res=>{
            this.setState({
                films:res.data.data.films
            })
        })
    }
    render() {

        return (
            <>
                <ul className='film-list'>
                    {
                        this.state.films.map(item=>{
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
    ()=>{
        return {

        }
    },
    (dispatch)=>{
        return {
            add_collect_film:(film)=>{
                dispatch(add_film(film))
            }
        }
    }
)(HotFilm); 