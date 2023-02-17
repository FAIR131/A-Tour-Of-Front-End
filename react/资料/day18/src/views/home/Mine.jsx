import React from 'react';
import './mine.scss'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'
import {
    UnorderedListOutline,
    PayCircleOutline,
    SetOutline,
} from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
function Mine(props) {
    let navigate=useNavigate()
    return (
        <>
            <header>
                {props.currentUser.driverName}师傅,欢迎您！
            </header>
            <List header='订单信息'>
                <List.Item prefix={<UnorderedListOutline />} onClick={() => { }}>
                    正在进行
                </List.Item>
                <List.Item prefix={<PayCircleOutline />} onClick={(e) => {
                    navigate("/home/finishOrder")
                }}>
                    已完成
                </List.Item>
            </List>
            <List header='个人信息'>
                <List.Item prefix={<SetOutline />} onClick={() => { }}>
                    银行卡
                </List.Item>
            </List>

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
        }
    }
)(Mine);