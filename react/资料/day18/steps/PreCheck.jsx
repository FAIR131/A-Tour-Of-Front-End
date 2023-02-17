import React, { useState } from 'react';
import { Card, Image, ImageUploader } from 'antd-mobile'
import { connect } from 'react-redux'
import { useEffect } from 'react';
function PreCheck(props) {
    const [fileList, setFileList] = useState([])

    useEffect(()=>{
        let result=[]
        JSON.parse(props.currentServiceOrder.pickCarImages).forEach(url=>{
            result.push({url})
        })
        setFileList(result)
    },[])

    let mockUpload = async function (file) {
        return {
            url: URL.createObjectURL(file),
        }
    }
    return (
        <>
            <Card title="车辆信息">
                <p>客户姓名:{props.currentOrder.customerName}</p>
                <p>客户电话:{props.currentOrder.customerPhone}</p>
                <p>车牌号:{props.currentOrder.carPlate}</p>
                <p>车型:{props.currentOrder.carType}</p>

                <p>上传车辆图片【车前拍照,车后拍照】</p>

                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                />
            </Card>

            <Card title="约定事项">
                <p>兹授权 {props.currentUser.driverName}(身份证号:{props.currentUser.idCard})委托办理
                车牌号码{props.currentOrder.carPlate}的机动车年检业务;</p>
            </Card>

            <Card title="交界车确认">
                <p>双方对上述接车情况确认无疑</p>

                <p>委托人签字</p>
                <Image src={props.currentServiceOrder.pickCarCustomerSign}></Image>
                <p>受托人签字</p>
                <Image src={props.currentServiceOrder.pickCarDriverSign}></Image>
            </Card>
        </>
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
)(PreCheck);