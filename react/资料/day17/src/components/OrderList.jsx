import React from 'react';
import { Card, Toast, Button, Steps } from 'antd-mobile'
import { CheckCircleOutline, ClockCircleOutline } from 'antd-mobile-icons'
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux'
const { Step } = Steps
function OrderList(props) {
    let navigate=useNavigate()
    let getCurrent = function (order) {
        if(order.orderState==='正在进行'){
            switch (order.serviceState) {
                case "预约":
                    return 0;
                case "预检":
                    return 1;
                case "送检":
                    return 2;
                case "还车":
                    return 3;
                case "归档":
                    return 4;
                default:
                    return 0;
            }
        }else if(order.orderState==='订单完成'){
            return 4
        }
    }
    let getIcon = function (current, index) {
        return current >= index ? <CheckCircleOutline /> : <ClockCircleOutline />
    }
    return (
        <ul>
            {
                props.orders.map(item => {
                    let current = getCurrent(item)
                    return (
                        <li key={item.id} onClick={()=>{
                            props.init_current_order(item);
                            navigate("/home/orderDetail")
                        }}>
                            <Card title={<span>订单号:{item.id}</span>}>
                                <p>车牌号:{item.carPlate}</p>
                                <p>车主姓名:{item.customerName}</p>
                                <p>取车地址:{item.province + item.city + item.area + item.address}</p>
                                <Steps current={current}>
                                    <Step title='预约' icon={getIcon(current, 0)} />
                                    <Step title='预检' icon={getIcon(current, 1)} />
                                    <Step title='送检' icon={getIcon(current, 2)} />
                                    <Step title='还车' icon={getIcon(current, 3)} />
                                    <Step title='归档' icon={getIcon(current, 4)} />
                                </Steps>
                            </Card>
                        </li>
                    )
                })
            }
        </ul>
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
            init_current_order:(order)=>{
                dispatch({type:"INIT_CURRENT_ORDER",order})
            }
        }
    }
)(OrderList);