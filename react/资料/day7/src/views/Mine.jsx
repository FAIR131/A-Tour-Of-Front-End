import React, { Component } from 'react';
import {del_film} from '../store/actions'
import {connect} from 'react-redux'
class Mine extends Component {


    render() {
        return (
            <div>
                redux数据:{this.props.count} <br />
                用户名称:{this.props.user.username} <br />
                用户年龄:{this.props.user.age} <br />

                <button onClick={()=>{
                    this.props.change_age()
                }}>修改年龄</button>
                
                <ul className='film-list'>
                    {
                        this.props.collect_films.map(item=>{
                            return  (<li key={item.filmId} style={{margin:"10px auto"}}>
                                <img src={item.poster} alt="" width={66}/>
                                <p>
                                    {item.name}
                                </p>
                                <button onClick={()=>{
                                    // store.dispatch(del_film(item))
                                    this.props.del_collect_film(item)
                                }}>取消收藏</button>
                            </li>)
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default connect((state)=>{
    return {
        collect_films:state.collect_films,
        count:state.count,
        user:state.user
    }
},(dispatch)=>{
    return {
        del_collect_film:(film)=>{
            dispatch(del_film(film))
        },
        change_age:()=>{
            dispatch({type:"CHANGE_AGE",age:30})
        }
    }
})(Mine);