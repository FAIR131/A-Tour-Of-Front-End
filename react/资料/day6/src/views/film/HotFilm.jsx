import React, { Component } from 'react';
import http from '../../utils/request'
import './hotFilm.css'
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
                            return  (<li key={item.filmId}>
                                <img src={item.poster} alt="" width={66}/>
                                <p>
                                    {item.name}
                                </p>
                            </li>)
                        })
                    }
                </ul>
            </>
        );
    }
}

export default HotFilm; 