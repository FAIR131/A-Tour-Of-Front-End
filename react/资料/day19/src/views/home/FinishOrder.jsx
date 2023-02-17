import React,{useState,useEffect} from 'react';
import { NavBar, Space, Toast } from 'antd-mobile'
import { useNavigate } from 'react-router-dom';
import OrderList from '../../components/OrderList';
import { connect } from 'react-redux'
import http from '../../utils/request'
function FinishOrder(props) {
    let navigate=useNavigate()

    let [orders, setOrders] = useState([])
    useEffect(() => {
        http.get("/driverOrder/getDriverOrders", {
            params: { driverId: props.currentUser.id }
        }).then(res => {
            setOrders(res.data.object.filter(item => item.orderState === '订单完成' && item.orderSituation === '显示'))
        })
    }, [])

    return (
        <>
            <NavBar onBack={()=>{navigate(-1)}}>已完成订单</NavBar>
            <OrderList orders={orders}></OrderList>
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
)(FinishOrder);