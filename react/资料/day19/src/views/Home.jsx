import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux'
import { useNavigate,Outlet } from 'react-router-dom';
import { Badge, TabBar, Image } from 'antd-mobile'
import './home.scss'
function Home(props) {
    let navigate = useNavigate()
    
    // useEffect(()=>{
    //     if(!props.currentUser.token){
    //         let user=sessionStorage.getItem("currentUser");
    //         if(user){
    //             props.init_current_user(JSON.parse(user))
    //         }else{
    //             navigate('/login')
    //         }
    //     }
    // },[])

    const tabs = [
        {
            key: 'order',
            title: (active) => {
                return <span style={{ color: active ? "#ffa500" : "#666" }}>接单</span>
            },
            icon: (active) => {
                return <Image width={24} src={active ? require("../static/tabbar/order_active.png") : require("../static/tabbar/order.png")}></Image>
            }
        },
        {
            key: 'process',
            title: (active) => {
                return <span style={{ color: active ? "#ffa500" : "#666" }}>进行中</span>
            },
            icon: (active) => {
                return <Image width={24} src={active ? require("../static/tabbar/process_active.png") : require("../static/tabbar/process.png")}></Image>
            }
        },
        {
            key: 'mine',
            title: (active) => {
                return <span style={{ color: active ? "#ffa500" : "#666" }}>我的</span>
            },
            icon: (active) => {
                return <Image width={24} src={active ? require("../static/tabbar/mine_active.png") : require("../static/tabbar/mine.png")}></Image>
            },
        },
    ]

    return (
        <>
            {/* 首页:{props.currentUser.driverName} */}
            <Outlet></Outlet>
            <TabBar onChange={(key)=>{
                navigate(`/home/${key}`)
            }}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </>
    );
}

export default connect(
    (state) => {
        return {
            currentUser: state.currentUser
        }
    },
    (dispatch) => {
        return {
            init_current_user: (user) => {
                dispatch({ type: "INIT_CURRENT_USER", user })
            }
        }
    }
)(Home);