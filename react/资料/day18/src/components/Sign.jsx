import React, { useState } from 'react';
import SignatureCanvas from 'react-signature-canvas'
import { Button, Toast } from 'antd-mobile'
import http from '../utils/request'
function Sign(props) {
    let [ins, setIns] = useState(null)

    let base64ToFile = function (base64) {
        const arr = base64.split(",");
        const type = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], 'png', { type });
    }

    return (
        <>
            <SignatureCanvas canvasProps={{ width: 300, height: 200, className: 'sigCanvas' }}
                ref={(ref) => {
                    setIns(ref)
                }} />
            <Button onClick={() => {
                ins.getCanvas().getContext('2d').clearRect(0, 0, ins.getCanvas().width, ins.getCanvas().height)
            }}>重写</Button>
            <Button onClick={async () => {
                let file = base64ToFile(ins.getCanvas().toDataURL("image/png"))
                let formData = new FormData();
                formData.append("file", file)
                let { data: { object: { url } } } = await http.post("/file/uploadFile", formData, { "Content-Type": null })
                console.log(url);

                http.post("/driverOrder/updateSign",{
                    type:props.type,
                    imgUrl:url,
                    id:props.orderId
                }).then(res=>{
                    if(res.data.code) Toast.show({content:"保存成功"})
                })
            }}>提交</Button>
        </>
    );
}

export default Sign;