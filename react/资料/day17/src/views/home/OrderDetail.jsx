import React from 'react';
import { NavBar, Space, Toast, Steps } from 'antd-mobile'
import { useNavigate,Outlet } from 'react-router-dom';
import { connect } from 'react-redux'
import { CheckCircleOutline, ClockCircleOutline } from 'antd-mobile-icons'
import './orderDetail.scss'
import { useState } from 'react';
import { useEffect } from 'react';
const { Step } = Steps
function OrderDetail(props) {
    let navigate = useNavigate()
    
    let [current,setCurrent]=useState(0)

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

    useEffect(()=>{
        setCurrent(getCurrent(props.currentOrder));
        navigate("/home/orderDetail/subscribe")
    },[])


    let checkStep=function(type,path){
        setCurrent(type);
        navigate(`/home/orderDetail/${path}`)
    }

    return (
        <>
            <NavBar onBack={() => { navigate(-1) }}>订单详情</NavBar>
            {/* {props.currentOrder.customerName} */}
            <Steps current={current} >
                <Step title={<span onClick={()=>{checkStep(0,'subscribe')}}>预约</span>} icon={getIcon(0)} />
                <Step title={<span onClick={()=>{checkStep(1,'preCheck')}}>预检</span>} icon={getIcon(1)} />
                <Step title={<span onClick={()=>{checkStep(2,'station')}}>送检</span>} icon={getIcon(2)} />
                <Step title={<span onClick={()=>{checkStep(3,'backCar')}}>还车</span>} icon={getIcon(3)} />
                <Step title={<span onClick={()=>{checkStep(4,'finish')}}>归档</span>} icon={getIcon(4)} />
            </Steps>
            <Outlet/>
        </>
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