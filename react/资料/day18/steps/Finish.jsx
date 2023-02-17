import React from 'react';
import {Image} from 'antd-mobile'
import { connect } from 'react-redux'

function Finish(props) {
    return (
        <div>
            <p>上传检测费收款截图</p>
            <Image src={props.currentServiceOrder.receiptImg} width={100}></Image>
        </div>
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
)(Finish);