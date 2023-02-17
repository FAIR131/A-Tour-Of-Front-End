import React from 'react';
import { Card, Image, Button,Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import Sign from '../../../components/Sign';
import http from '../../../utils/request'
import {useNavigate} from 'react-router-dom'
function BackCar(props) {
    let navigate=useNavigate()
    return (
        <>
            <Card title="交界车确认">
                <p>双方对上述接车情况确认无疑</p>

                <p>委托人签字</p>
                {props.currentOrder.orderState === '订单完成' && <Image src={props.currentServiceOrder.pickCarCustomerSign}></Image>}
                {props.currentOrder.orderState === '正在进行' && <Sign type={3} orderId={props.currentOrder.id}></Sign>}

                <p>受托人签字</p>
                {props.currentOrder.orderState === '订单完成' && <Image src={props.currentServiceOrder.pickCarDriverSign}></Image>}
                {props.currentOrder.orderState === '正在进行' && <Sign type={4} orderId={props.currentOrder.id}></Sign>}
            </Card>
            <Button onClick={async ()=>{

                    let res=await http.post("/driverOrder/updateOrderServiceState",{
                        state:"归档",
                        id:props.currentOrder.id
                    })
                    if(res.data.code){
                        Toast.show({
                            content:"提交成功"
                        })
                        navigate("/home/orderDetail/finish")
                    }
                }
            } color="primary">提交</Button>
        </>
    );
}

export default connect(
    (state) => {
        return {
            currentUser: state.currentUser,
            currentOrder: state.currentOrder,
            currentServiceOrder: state.currentServiceOrder
        }
    },
    (dispatch) => {
        return {
        }
    }
)(BackCar);