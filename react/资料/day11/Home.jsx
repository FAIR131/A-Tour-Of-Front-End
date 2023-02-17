import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux'
import { Layout, Avatar, Tooltip, Menu } from 'antd';
import { RadarChartOutlined,OrderedListOutlined } from '@ant-design/icons';
import './home.scss'
import { PoweroffOutlined } from '@ant-design/icons';
import http from '../utils/request'
const { Sider, Content } = Layout;
function Home(props) {

    let [items,setItems]=useState([])

    let logout = () => {
        sessionStorage.removeItem("current_user");
        props.clear_current_user();
        props.history.push("/login")
    }

    let getIcon=(name)=>{
        switch(name){
            case "RadarChartOutlined":
                return <RadarChartOutlined/>;
            case "OrderedListOutlined":
                return <OrderedListOutlined/>
        }
    }

    useEffect(() => {
        http.get("/sysUser/getUserMenus", {
            params: {
                userId: props.currentUser.id
            }
        }).then(res => {
            let menus=[]
            res.data.object.forEach(({name,id,icon,children})=>{
                let childs=[]
                children.forEach(({name,id,icon})=>{
                    childs.push(getItem(name,id,getIcon(icon)))
                })                
                menus.push(getItem(name,id,getIcon(icon),childs))
            })
            console.log(menus);
            setItems(menus)
        })
    }, [])


    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    
    return (
        <Layout>
            <Sider>
                <h1>好教练后台管理系统</h1>
                <Avatar size={64} src={props.currentUser.avatarUrl} />
                <p>欢迎您,{props.currentUser.nickName}
                    <Tooltip placement="top" title={"点击退出"}><PoweroffOutlined onClick={logout} /></Tooltip>
                </p>

                <Menu
                    mode="inline"
                    openKeys={openKeys}
                    onOpenChange={onOpenChange}
                    items={items}
                />
            </Sider>
            <Content>Content</Content>
        </Layout>
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
            clear_current_user: () => {
                dispatch({ type: "CLEAR_CURRENT_USER" })
            }
        }
    }
)(Home);