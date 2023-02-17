import React from 'react';
import { Card, Image, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { useState } from 'react';
import http from '../../../utils/request'
import { useNavigate } from 'react-router-dom';
function Subscribe(props) {
    let [isCall, setIsCall] = useState(false)
    let navigate=useNavigate();
    return (
        <>
            <Card title="车辆信息">
                <p>车牌:{props.currentOrder.carPlate}</p>
                <p>车型:{props.currentOrder.carType}</p>
                {/* <p>年检月:</p> */}
            </Card>
            <Card title="行驶证信息">
                <div className='horizontal'>

                    {
                        props.currentOrder.merchantLicenseImg && JSON.parse(props.currentOrder.merchantLicenseImg).map(item => {
                            return <Image key={item} src={item} width={100} fit='fill' />
                        })
                    }
                </div>
            </Card>
            <Card title="客户信息">
                <p>客户姓名:{props.currentOrder.customerName}</p>
                <p>客户电话:{props.currentOrder.customerPhone}</p>
                <p>客户地址:{props.currentOrder.address}</p>
            </Card>
            <Card title="订单信息">
                <p>取车时间:{props.currentOrder.placeTestTime}</p>
                <p>订单备注:{props.currentOrder.remarks}</p>
            </Card>
            {/* <Button>联系客户</Button> */}
            {!isCall&&<a href="tel:110"
                style={{ display: "block", width: "80%", height: "40px", background: "#3d588d", textDecoration: "none", color: "white", textAlign: "center" }}
                onTouchStart={() => { setIsCall(true) }}
            >联系客户</a>}
            {
                isCall&&<Button color='primary' onClick={()=>{
                    http.post("/driverOrder/updateOrderServiceState",{
                        state:"预检",
                        id:props.currentOrder.id
                    }).then(res=>{
                        if(res.data.code){
                            // 修改current值
                            navigate("/home/orderDetail/preCheck")
                        }
                    })
                }}>去取车</Button>
            }
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
)(Subscribe);