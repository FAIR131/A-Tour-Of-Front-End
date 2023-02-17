import React, { useState } from 'react';
import { useEffect } from 'react';
import http from '../../utils/request'
import { connect } from 'react-redux'
import { Card, Toast, Button } from 'antd-mobile'
import './order.scss'
function Order(props) {
    let [orders, setOrders] = useState([])
    useEffect(() => {
        http.get("/driverOrder/findSendOrders", {
            params: {
                province: props.currentUser.province,
                city: props.currentUser.city,
                driverId: props.currentUser.id
            }
        }).then(res => {
            setOrders(res.data.object.filter(item => item.orderState === '待开始' && item.orderSituation === '显示'))
        })
    }, [])
    return (
        <ul>
            {
                orders.map(item => {
                    return (
                        <li key={item.id}><Card title={item.carPlate} onClick={() => { }}>
                            <p>客户姓名:{item.customerName}</p>
                            <p>客户电话:{item.customerPhone}</p>
                            <p>取车时间:{item.placeTestTime}</p>
                            <p>取车地址:{item.province + item.city + item.area + item.address}</p>
                            <Button color='primary'>接单</Button>
                        </Card></li>
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
        }
    }
)(Order);