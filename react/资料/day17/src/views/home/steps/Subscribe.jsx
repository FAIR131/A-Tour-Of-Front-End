import React from 'react';
import { Card, Image } from 'antd-mobile'
import { connect } from 'react-redux'
function Subscribe(props) {
    return (
        <>
            <Card title="车辆信息">
                <p>车牌:{props.currentOrder.carPlate}</p>
                <p>车型:{props.currentOrder.carType}</p>
                <p>年检月:</p>
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