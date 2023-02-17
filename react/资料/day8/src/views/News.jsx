import React, { Component } from 'react';
// import {withRouter} from 'react-router-dom'
import store from '../store'
class News extends Component {
    constructor(){
        super();

        store.subscribe(()=>{
            // console.log("监听函数打印state值",store.getState());
            this.setState({
                num:store.getState().count,
                user:store.getState().user
            })
        })
    }

    state={
        num:store.getState().count,
        user:store.getState().user
    }

    render() {
        // 获取redux状态数据
        // console.log(store.getState());
        return (
            <div>
                redux数据:{this.state.num},
                用户名称:{this.state.user.username}
                <hr />
                <button onClick={()=>{
                    store.dispatch({type:"INCREMENT"})
                }}>修改redux数据</button>
                <button onClick={()=>{
                    store.dispatch({type:"CHANGE_NAME",username:"李四"})
                }}>改名</button>
            </div>
        );
    }
}

export default News;