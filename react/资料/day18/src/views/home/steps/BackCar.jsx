import React from 'react';
import { Card, Image, ImageUploader } from 'antd-mobile'
import { connect } from 'react-redux'
function BackCar(props) {
    return (
        <Card title="交界车确认">
            <p>双方对上述接车情况确认无疑</p>

            <p>委托人签字</p>
            <Image src={props.currentServiceOrder.backCarCustomerSign}></Image>
            <p>受托人签字</p>
            <Image src={props.currentServiceOrder.backCarDriverSign}></Image>
        </Card>
    );
}

export default connect(
    (state) => {
        return {
            currentUser:state.currentUser,
            currentOrder: state.currentOrder,
            currentServiceOrder:state.currentServiceOrder
        }
    },
    (dispatch) => {
        return {
        }
    }
)(BackCar);