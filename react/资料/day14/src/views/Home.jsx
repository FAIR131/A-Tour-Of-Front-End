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
import InquiryOrder from './order/InquiryOrder';
import UserManage from './system/UserManage';
import RoleManage from './system/RoleManage';
import InputCoach from './coach/InputCoach';
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
                <h1>???????????????????????????</h1>
                <Avatar size={64} src={props.currentUser.avatarUrl} />
                <p>?????????,{props.currentUser.nickName}
                    <Tooltip placement="top" title={"????????????"}><PoweroffOutlined onClick={logout} /></Tooltip>
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
                    <Route path={`${match.path}/inquiry-order`} component={InquiryOrder}></Route>
                    <Route path={`${match.path}/user-manage`} component={UserManage}></Route>
                    <Route path={`${match.path}/role-manage`} component={RoleManage}></Route>
                    <Route path={`${match.path}/input-coach`} component={InputCoach}></Route>
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