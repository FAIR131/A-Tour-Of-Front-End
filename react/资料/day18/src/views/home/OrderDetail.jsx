import React from 'react';
import { NavBar, Space, Toast, Steps } from 'antd-mobile'
import { useNavigate, Outlet } from 'react-router-dom';
import { connect } from 'react-redux'
import { CheckCircleOutline, ClockCircleOutline } from 'antd-mobile-icons'
import './orderDetail.scss'
import { useState } from 'react';
import { useEffect } from 'react';
import http from '../../utils/request'
const { Step } = Steps
function OrderDetail(props) {
    let navigate = useNavigate()

    let [current, setCurrent] = useState(0)

    let getCurrent = function (order) {
        if (order.orderState === '正在进行') {
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
        } else if (order.orderState === '订单完成') {
            return 4
        }
    }

    let getIcon = function (index) {
        return current >= index ? <CheckCircleOutline /> : <ClockCircleOutline />
    }

    useEffect(() => {
        let tmp=getCurrent(props.currentOrder)
        setCurrent(tmp);
        switch (tmp) {
            case 0:
                navigate("/home/orderDetail/subscribe");
                break;
            case 1:
                navigate("/home/orderDetail/preCheck");
                break;
            case 2:
                navigate("/home/orderDetail/station");
                break;
            case 3:
                navigate("/home/orderDetail/backCar");
                break;
            case 4:
                navigate("/home/orderDetail/finish");
                break;
        }
    }, [])

    // useEffect(() => {
    //     http.get("/driverOrder/findDriverServiceById", { params: { id: props.currentOrder.id } }).then(res => {
    //         props.init_current_service_order(res.data.object)
    //     })
    // }, [])


    let checkStep = function (type, path) {
        if (props.currentOrder.orderState === '正在进行') {
            Toast.show({
                content: "请按步骤操作"
            })
        } else {
            setCurrent(type);
            navigate(`/home/orderDetail/${path}`)
        }
    }

    return (
        <div style={{ padding: "0 0 80px" }}>
            <NavBar onBack={() => {
                props.currentOrder.orderState === '正在进行' ? navigate("/home/process") : navigate("/home/finishOrder")
            }}>订单详情</NavBar>
            <Steps current={current} >
                <Step title={<span onClick={() => { checkStep(0, 'subscribe') }}>预约</span>} icon={getIcon(0)} />
                <Step title={<span onClick={() => { checkStep(1, 'preCheck') }}>预检</span>} icon={getIcon(1)} />
                <Step title={<span onClick={() => { checkStep(2, 'station') }}>送检</span>} icon={getIcon(2)} />
                <Step title={<span onClick={() => { checkStep(3, 'backCar') }}>还车</span>} icon={getIcon(3)} />
                <Step title={<span onClick={() => { checkStep(4, 'finish') }}>归档</span>} icon={getIcon(4)} />
            </Steps>
            <Outlet />
        </div>
    );
}

export default connect(
    (state) => {
        return {
            currentOrder: state.currentOrder
        }
    },
    (dispatch) => {
        return {
        }
    }
)(OrderDetail);