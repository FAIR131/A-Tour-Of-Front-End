import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux'
import { Layout, Avatar, Tooltip, Menu } from 'antd';
import {
    PoweroffOutlined, OrderedListOutlined, RadarChartOutlined,
    ReadOutlined, LogoutOutlined, QuestionCircleOutlined, ExportOutlined,
    UnorderedListOutlined, EditOutlined, AuditOutlined,
    EyeOutlined, UserSwitchOutlined, BankOutlined,LoadingOutlined
} from '@ant-design/icons';
import './home.scss'
import http from '../utils/request'
import { Switch,Route,Redirect, useRouteMatch } from 'react-router-dom'
import CoachList from './coach/CoachList';
const { Sider, Content } = Layout;
function Home(props) {
    let match=useRouteMatch();

    let [items,setItems]=useState([])

    let logout = () => {
        sessionStorage.removeItem("current_user");
        props.clear_current_user();
        props.history.push("/login")
    }

    function getIcon(iconName) {
        switch (iconName) {
            case "OrderedListOutlined":
                return <OrderedListOutlined></OrderedListOutlined>;
            case "QuestionCircleOutlined":
                return <QuestionCircleOutlined></QuestionCircleOutlined>;
            case "ExportOutlined":
                return <ExportOutlined></ExportOutlined>;
            case "UnorderedListOutlined":
                return <UnorderedListOutlined></UnorderedListOutlined>;
            case "RadarChartOutlined":
                return <RadarChartOutlined></RadarChartOutlined>;
            case "EditOutlined":
                return <EditOutlined></EditOutlined>;
            case "AuditOutlined":
                return <AuditOutlined></AuditOutlined>;
            case "UnorderedListOutlined":
                return <UnorderedListOutlined></UnorderedListOutlined>
            case "EyeOutlined":
                return <EyeOutlined></EyeOutlined>
            case "ReadOutlined":
                return <ReadOutlined></ReadOutlined>;
            case "UserSwitchOutlined":
                return <UserSwitchOutlined></UserSwitchOutlined>
            case "BankOutlined":
                return <BankOutlined></BankOutlined>
            default:
                return <LogoutOutlined />
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
            setItems(menus)
        })
    }, [])

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
                    onClick={({  key })=>{
                        props.history.push(`${match.path}/${key}`)                        
                    }}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Content>
                <Switch>
                    <Route path={`${match.path}/coach-list`} component={CoachList}></Route>
                </Switch>
            </Content>
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