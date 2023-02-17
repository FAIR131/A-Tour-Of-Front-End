import React, { useState } from 'react';
import { Card, Image, ImageUploader, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import { useEffect } from 'react';
import http from '../../../utils/request'
import Sign from '../../../components/Sign';
function PreCheck(props) {
    const [fileList, setFileList] = useState([])

    useEffect(() => {
        let result = []
        props.currentServiceOrder.pickCarImages && JSON.parse(props.currentServiceOrder.pickCarImages).forEach(url => {
            result.push({ url })
        })
        setFileList(result)
    }, [])

    let mockUpload = async function (file) {
        let formData = new FormData();
        formData.append("file", file)
        let { data: { object: { url } } } = await http.post("/file/uploadFile", formData, { "Content-Type": null })
        let res = await http.post("/driverOrder/addPickCarImg", {
            imgUrl: url,
            id: props.currentOrder.id
        })
        if (res.data.code) Toast.show({ content: "上传成功" })

        return {
            url
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

                {/* 图片渲染时加载顺序问题 */}
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
                {props.currentOrder.orderState === '订单完成' && <Image src={props.currentServiceOrder.pickCarCustomerSign}></Image>}
                {props.currentOrder.orderState === '正在进行' &&<Sign type={1} orderId={props.currentOrder.id}></Sign>}

                <p>受托人签字</p>
                {props.currentOrder.orderState === '订单完成' && <Image src={props.currentServiceOrder.pickCarDriverSign}></Image>}
                {props.currentOrder.orderState === '正在进行' &&<Sign type={2} orderId={props.currentOrder.id}></Sign>}
            </Card>
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
)(PreCheck);