import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { Picker, Button, Space, Toast,ImageUploader } from 'antd-mobile'
import http from '../../../utils/request'
import {useNavigate} from 'react-router-dom'
function Station(props) {
    const [fileList, setFileList] = useState([])
    const [value, setValue] = useState(["通过"])
    let navigate=useNavigate()
    useEffect(() => {
        let result = []
        props.currentServiceOrder.testReport && JSON.parse(props.currentServiceOrder.testReport).forEach(url => {
            result.push({ url })
        })
        setFileList(result)
    }, [])

    let mockUpload = async function (file) {
        let formData = new FormData();
        formData.append("file", file)
        let { data: { object: { url } } } = await http.post("/file/uploadFile", formData, { "Content-Type": null })
        let res = await http.post("/driverOrder/result", {
            imgUrl: url,
            id: props.currentOrder.id,
            result:value[0]
        })
        if (res.data.code) Toast.show({ content: "上传成功" })

        return {
            url
        }
    }

    const basicColumns = [
        [
            { label: '通过', value: '通过' },
            { label: '未通过', value: '未通过' }
        ]
    ]

    return (
        <div style={{ fontSize: "16px", textAlign: "center", margin: "10px auto", background: "white" }}>
            {props.currentOrder.orderState !== '正在进行' && <p>检测结果:{props.currentServiceOrder.testResult}</p>}
            {props.currentOrder.orderState === '正在进行' && <Picker
                columns={basicColumns}
                value={value}
                onConfirm={setValue}
                onSelect={(val, extend) => {
                    console.log('onSelect', val, extend.items)
                }}
            >
                {(items, { open }) => {
                    return (
                        <Space align='center'>
                            <Button onClick={open}>检测结果</Button>
                            {/* {items.every(item => item === null)? '未选择': items.map(item => item?.label ?? '未选择').join(' - ')} */}
                            {items[0] && items[0].label}
                        </Space>
                    )
                }}
            </Picker>}

            <p>上传行驶证和检测合格标志(不合格上传检测报告)</p>
            <ImageUploader
                value={fileList}
                onChange={setFileList}
                upload={mockUpload}
            />
            <Button onClick={async ()=>{
                let res=await http.post("/driverOrder/updateOrderServiceState",{
                    state:"还车",
                    id:props.currentOrder.id
                })
                if(res.data.code){
                    Toast.show({
                        content:"提交成功"
                    })
                    navigate("/home/orderDetail/backCar")
                }
            }}>去还车</Button>
        </div>
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
)(Station);