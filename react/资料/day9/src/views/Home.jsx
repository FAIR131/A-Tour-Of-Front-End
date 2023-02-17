import React from 'react';
import {  Switch, Route,Redirect,useRouteMatch } from 'react-router-dom'
import HotFilm from '../components/HotFilm';
import NewFilm from '../components/NewFilm';
function Home(props) {
    // component渲染的函数式组件,props中也直接有路由对象
    // console.log(props);
    let match=useRouteMatch();
    return (
        <div>
            <Switch>
                <Route path={`${match.url}/hotFilm`} component={HotFilm}></Route>
                <Route path={`${match.url}/newFilm`} component={NewFilm}></Route>
            </Switch>
        </div>
    );
}

export default Home;