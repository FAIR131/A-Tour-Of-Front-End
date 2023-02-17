import React, { useState } from 'react';
import { useEffect } from 'react';
import http from '../../utils/request'
import { connect } from 'react-redux'
import OrderList from '../../components/OrderList';
function Process(props) {
    let [orders, setOrders] = useState([])
    useEffect(() => {
        http.get("/driverOrder/getDriverOrders", {
            params: { driverId: props.currentUser.id }
        }).then(res => {
            setOrders(res.data.object.filter(item => item.orderState === '正在进行' && item.orderSituation === '显示'))
        })
    }, [])

    
    return (
        <OrderList orders={orders}></OrderList>
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
)(Process);