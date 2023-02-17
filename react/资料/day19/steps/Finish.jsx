import React,{useState} from 'react';
import { Image, ImageUploader, Button, Toast } from 'antd-mobile'
import { connect } from 'react-redux'
import http from '../../../utils/request'
import { useNavigate } from 'react-router-dom';
function Finish(props) {
    const [fileList, setFileList] = useState([])
    let navigate=useNavigate()
    let mockUpload = async function (file) {
        let formData = new FormData();
        formData.append("file", file)
        let { data: { object: { url } } } = await http.post("/file/uploadFile", formData, { "Content-Type": null })
        let res = await http.post("/driverOrder/receiptImg", {
            imgUrl: url,
            id: props.currentOrder.id
        })
        if (res.data.code) Toast.show({ content: "上传成功" })

        return {
            url
        }
    }

    return (
        <div>
            <p>上传检测费收款截图</p>
            {props.currentOrder.orderState !== '正在进行' && <Image src={props.currentServiceOrder.receiptImg} width={100}></Image>}
            {props.currentOrder.orderState === '正在进行' &&
                <ImageUploader
                    value={fileList}
                    onChange={setFileList}
                    upload={mockUpload}
                />}

            <Button onClick={async () => {
                let res=await http.post("/driverOrder/updateOrderState", {
                    state: "订单完成",
                    id: props.currentOrder.id
                })
                if(res.data.code){
                    Toast.show({
                        content:"恭喜您完成订单,师傅辛苦了！"
                    })
                    navigate("/home/progress")
                }
            }}>完成</Button>
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
)(Finish);