import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { routerHandler } from '../HOC/RouteHandler';
class TabBar extends Component {
    render() {
        // console.log(this.props.location.pathname);
        return (
            <ul className='tabBar'>
                <li>
                    <NavLink to="/film">
                        {
                            // this.props.location.pathname==='/film'?<img src={require("../assets/tabBar/film_active.png")} alt="" />:<img src={require("../assets/tabBar/film.png")} alt="" />
                            <img src={require(this.props.location.pathname==='/film/hotfilm'||this.props.location.pathname==='/film/newfilm'?"../assets/tabBar/film_active.png":"../assets/tabBar/film.png")} alt="" />
                        }                        
                        电影
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cinema">影院</NavLink>
                </li>
                <li>
                    <NavLink to="/news">资讯</NavLink>
                </li>
                <li>
                    <NavLink to="/mine">我的</NavLink>
                </li>
            </ul>
        );
    }
}

export default routerHandler(TabBar);