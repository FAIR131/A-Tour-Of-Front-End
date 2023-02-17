import React, { Component } from 'react';
import { Outlet} from 'react-router-dom'
import { routerHandler } from '../HOC/RouteHandler';
class Film extends Component {

    render() {
        // console.log(this.props);
        return (
            <div>

                {/* 动态路由传参,参数在目标页面路由对象中的match.params中获取 */}
                {/* <NavLink to={"/cinema/abc123"}>去影院</NavLink> <br /> */}
                {/* query传参,参数在目标页面路由对象中的location.query中获取 */}
                {/* <NavLink to={{pathname:"/news",query:{username:"zhangsan",age:20}}}>去新闻页</NavLink> <br /> */}
                {/* state传参,参数在目标页面路由对象中的location.state中获取 */}
                {/* <NavLink to={{pathname:"/mine",state:{weather:"sunshine"}}}>我的</NavLink> */}




                {/* <button onClick={()=>{
                    // 编程式导航
                    // this.props.history.push("/mine")
                    // this.props.history.replace("/mine")

                    // this.props.history.push({pathname:"/mine",state:{abc:123}})
                    // this.props.history.push({pathname:"/cinema/def456"})
                    this.props.navigate("/cinema/def456")
                }}>跳转</button> */}

                {/* 二级路由 */}
                <Outlet/>
            </div>
        );
    }
}

export default routerHandler(Film);