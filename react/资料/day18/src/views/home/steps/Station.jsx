import React,{useState,useEffect} from 'react';
import { connect } from 'react-redux'
import { Card, Image, ImageUploader } from 'antd-mobile'
function Station(props) {
    const [fileList, setFileList] = useState([])
    useEffect(()=>{
        let result=[]
        JSON.parse(props.currentServiceOrder.testReport).forEach(url=>{
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
        <div style={{ fontSize: "24px", textAlign: "center", margin: "10px auto" }}>
            检测结果:{props.currentServiceOrder.testResult}

            <p>上传行驶证和检测合格标志(不合格上传检测报告)</p>
            <ImageUploader
                value={fileList}
                onChange={setFileList}
                upload={mockUpload}
            />
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