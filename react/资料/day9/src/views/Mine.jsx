import React from 'react';
import {useLocation,useHistory,useRouteMatch} from 'react-router-dom'
function Mine(props) {
    /**
     * useHistory获取路由中的history对象,用于编程式导航
     * useLocation获取路由中的location对象,用于获取跳转时的传参
     * useParams获取动态url跳转的传参
     * useRouteMatch获取当前页面的url地址,一般用在配置子路由地址时
     */
    let location=useLocation()
    let history=useHistory()
    let match=useRouteMatch()
    console.log(match);
    return (
        <div>
            我的
            <button onClick={()=>{
                history.push("/cinema/haha456")
            }}>跳转cinema</button>
        </div>
    );
}

export default Mine;